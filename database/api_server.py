#!/usr/bin/env python3
"""
Simple Flask API server for EU Projects Database simulation
Provides RESTful endpoints for the frontend to consume
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from pathlib import Path
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

DB_PATH = Path(__file__).parent / 'eu_projects_simulation.db'


def get_db_connection():
    """Create database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn


def dict_from_row(row):
    """Convert sqlite3.Row to dictionary"""
    return {k: row[k] for k in row.keys()}


@app.route('/')
def index():
    """API information"""
    return jsonify({
        'name': 'EU Projects Database API',
        'version': '1.0',
        'description': 'Simulation API for EU-funded projects portal',
        'endpoints': {
            'GET /api/projects': 'List all projects with pagination',
            'GET /api/projects/<id>': 'Get project details',
            'GET /api/projects/<id>/partners': 'Get project partners',
            'GET /api/projects/<id>/deliverables': 'Get project deliverables',
            'GET /api/projects/<id>/publications': 'Get project publications',
            'GET /api/projects/<id>/reports': 'Get project reports',
            'GET /api/search': 'Search projects',
            'GET /api/partners': 'List all partners',
            'GET /api/stats': 'Get database statistics',
            'GET /api/programmes': 'List all programmes',
            'GET /api/keywords': 'List all keywords'
        }
    })


@app.route('/api/stats')
def get_stats():
    """Get database statistics"""
    conn = get_db_connection()
    cursor = conn.cursor()

    stats = {
        'total_projects': cursor.execute('SELECT COUNT(*) FROM projects').fetchone()[0],
        'total_partners': cursor.execute('SELECT COUNT(*) FROM partners').fetchone()[0],
        'total_deliverables': cursor.execute('SELECT COUNT(*) FROM deliverables').fetchone()[0],
        'total_publications': cursor.execute('SELECT COUNT(*) FROM publications').fetchone()[0],
        'total_reports': cursor.execute('SELECT COUNT(*) FROM reports').fetchone()[0],
        'projects_by_status': {},
        'projects_by_programme': {},
        'projects_by_country': {}
    }

    # Projects by status
    result = cursor.execute('SELECT status, COUNT(*) as count FROM projects GROUP BY status')
    stats['projects_by_status'] = {row['status']: row['count'] for row in result}

    # Projects by programme
    result = cursor.execute('SELECT eu_programme, COUNT(*) as count FROM projects GROUP BY eu_programme')
    stats['projects_by_programme'] = {row['eu_programme']: row['count'] for row in result}

    # Projects by country (coordinator country)
    result = cursor.execute('''
        SELECT p.country, COUNT(DISTINCT partners.project_id) as count
        FROM partners p
        WHERE p.role = "Coordinator"
        GROUP BY p.country
        ORDER BY count DESC
        LIMIT 20
    ''')
    stats['projects_by_country'] = {row['country']: row['count'] for row in result}

    conn.close()
    return jsonify(stats)


@app.route('/api/projects')
def get_projects():
    """Get all projects with pagination and filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    status = request.args.get('status', None)
    programme = request.args.get('programme', None)
    country = request.args.get('country', None)
    year = request.args.get('year', None)

    conn = get_db_connection()
    cursor = conn.cursor()

    # Build query
    query = 'SELECT * FROM projects_with_coordinator WHERE 1=1'
    params = []

    if status:
        query += ' AND status = ?'
        params.append(status)

    if programme:
        query += ' AND eu_programme = ?'
        params.append(programme)

    if country:
        query += ' AND coordinator_country = ?'
        params.append(country)

    if year:
        query += ' AND year = ?'
        params.append(year)

    # Get total count
    count_query = f'SELECT COUNT(*) as total FROM ({query})'
    total = cursor.execute(count_query, params).fetchone()['total']

    # Add pagination
    query += ' ORDER BY start_date DESC LIMIT ? OFFSET ?'
    params.extend([per_page, (page - 1) * per_page])

    # Execute query
    result = cursor.execute(query, params)
    projects = [dict_from_row(row) for row in result.fetchall()]

    conn.close()

    return jsonify({
        'projects': projects,
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': (total + per_page - 1) // per_page
    })


@app.route('/api/projects/<int:project_id>')
def get_project(project_id):
    """Get project details"""
    conn = get_db_connection()
    cursor = conn.cursor()

    project = cursor.execute(
        'SELECT * FROM projects_with_coordinator WHERE project_id = ?',
        (project_id,)
    ).fetchone()

    if not project:
        conn.close()
        return jsonify({'error': 'Project not found'}), 404

    # Get project keywords
    keywords = cursor.execute('''
        SELECT k.keyword_text
        FROM project_keywords pk
        JOIN keywords k ON pk.keyword_id = k.keyword_id
        WHERE pk.project_id = ?
    ''', (project_id,)).fetchall()

    result = dict_from_row(project)
    result['keywords'] = [row['keyword_text'] for row in keywords]

    conn.close()
    return jsonify(result)


@app.route('/api/projects/<int:project_id>/partners')
def get_project_partners(project_id):
    """Get project partners"""
    conn = get_db_connection()
    cursor = conn.cursor()

    partners = cursor.execute(
        'SELECT * FROM partners WHERE project_id = ? ORDER BY order_number',
        (project_id,)
    ).fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in partners])


@app.route('/api/projects/<int:project_id>/deliverables')
def get_project_deliverables(project_id):
    """Get project deliverables"""
    conn = get_db_connection()
    cursor = conn.cursor()

    deliverables = cursor.execute(
        'SELECT * FROM deliverables WHERE project_id = ?',
        (project_id,)
    ).fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in deliverables])


@app.route('/api/projects/<int:project_id>/publications')
def get_project_publications(project_id):
    """Get project publications"""
    conn = get_db_connection()
    cursor = conn.cursor()

    publications = cursor.execute(
        'SELECT * FROM publications WHERE project_id = ? ORDER BY published_year DESC',
        (project_id,)
    ).fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in publications])


@app.route('/api/projects/<int:project_id>/reports')
def get_project_reports(project_id):
    """Get project reports"""
    conn = get_db_connection()
    cursor = conn.cursor()

    reports = cursor.execute(
        'SELECT * FROM reports WHERE project_id = ?',
        (project_id,)
    ).fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in reports])


@app.route('/api/search')
def search_projects():
    """Search projects using full-text search"""
    query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    if not query:
        return jsonify({'error': 'Query parameter "q" is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Full-text search
    search_query = '''
        SELECT p.*, snippet(projects_fts, 0, '<mark>', '</mark>', '...', 32) as snippet
        FROM projects_fts
        JOIN projects p ON projects_fts.rowid = p.project_id
        WHERE projects_fts MATCH ?
        ORDER BY rank
        LIMIT ? OFFSET ?
    '''

    results = cursor.execute(
        search_query,
        (query, per_page, (page - 1) * per_page)
    ).fetchall()

    # Get total count
    total = cursor.execute(
        'SELECT COUNT(*) as total FROM projects_fts WHERE projects_fts MATCH ?',
        (query,)
    ).fetchone()['total']

    conn.close()

    return jsonify({
        'results': [dict_from_row(row) for row in results],
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': (total + per_page - 1) // per_page,
        'query': query
    })


@app.route('/api/partners')
def get_partners():
    """Get all partners"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)
    country = request.args.get('country', None)

    conn = get_db_connection()
    cursor = conn.cursor()

    query = 'SELECT * FROM partners WHERE 1=1'
    params = []

    if country:
        query += ' AND country = ?'
        params.append(country)

    # Get total count
    total = cursor.execute(f'SELECT COUNT(*) as total FROM ({query})', params).fetchone()['total']

    # Add pagination
    query += ' ORDER BY name LIMIT ? OFFSET ?'
    params.extend([per_page, (page - 1) * per_page])

    partners = cursor.execute(query, params).fetchall()

    conn.close()

    return jsonify({
        'partners': [dict_from_row(row) for row in partners],
        'total': total,
        'page': page,
        'per_page': per_page
    })


@app.route('/api/programmes')
def get_programmes():
    """Get all programmes"""
    conn = get_db_connection()
    cursor = conn.cursor()

    programmes = cursor.execute('SELECT * FROM programmes ORDER BY programme_name').fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in programmes])


@app.route('/api/keywords')
def get_keywords():
    """Get all keywords"""
    conn = get_db_connection()
    cursor = conn.cursor()

    keywords = cursor.execute('''
        SELECT k.*, COUNT(pk.project_id) as project_count
        FROM keywords k
        LEFT JOIN project_keywords pk ON k.keyword_id = pk.keyword_id
        GROUP BY k.keyword_id
        ORDER BY project_count DESC
    ''').fetchall()

    conn.close()
    return jsonify([dict_from_row(row) for row in keywords])


@app.route('/api/filters')
def get_filter_options():
    """Get available filter options"""
    conn = get_db_connection()
    cursor = conn.cursor()

    filters = {
        'statuses': [],
        'programmes': [],
        'countries': [],
        'years': []
    }

    # Get unique statuses
    result = cursor.execute('SELECT DISTINCT status FROM projects WHERE status IS NOT NULL ORDER BY status')
    filters['statuses'] = [row['status'] for row in result]

    # Get unique programmes
    result = cursor.execute('SELECT DISTINCT eu_programme FROM projects WHERE eu_programme IS NOT NULL ORDER BY eu_programme')
    filters['programmes'] = [row['eu_programme'] for row in result]

    # Get unique countries
    result = cursor.execute('SELECT DISTINCT country FROM partners WHERE country IS NOT NULL ORDER BY country')
    filters['countries'] = [row['country'] for row in result]

    # Get unique years
    result = cursor.execute('SELECT DISTINCT year FROM projects WHERE year IS NOT NULL ORDER BY year DESC')
    filters['years'] = [row['year'] for row in result]

    conn.close()
    return jsonify(filters)


@app.errorhandler(404)
def not_found(error):
    """404 handler"""
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """500 handler"""
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    if not DB_PATH.exists():
        print(f"\n❌ Database not found at {DB_PATH}")
        print("Please run: python generate_mock_data.py\n")
        exit(1)

    print("\n" + "="*60)
    print("EU PROJECTS DATABASE - SIMULATION API SERVER")
    print("="*60)
    print(f"Database: {DB_PATH}")
    print(f"Database size: {DB_PATH.stat().st_size / 1024 / 1024:.2f} MB")
    print("\nAPI running on: http://localhost:5000")
    print("API docs: http://localhost:5000/")
    print("\nPress CTRL+C to stop the server")
    print("="*60 + "\n")

    app.run(debug=True, port=5000)
