#!/usr/bin/env python3
"""
Generate realistic mock data for EU Projects Database simulation
Creates 10 varied projects with partners, deliverables, publications, and reports
Optimized for testing and simulation with diverse, representative data
"""

import sqlite3
import random
import json
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
NUM_PROJECTS = 10  # Generate 10 varied projects for stable testing and simulation
DB_PATH = Path(__file__).parent / 'eu_projects_simulation.db'

# Data pools for realistic generation
PROGRAMMES = [
    ('Horizon 2020', 0.35),
    ('Horizon Europe', 0.30),
    ('LIFE Programme', 0.15),
    ('Interreg Mediterranean', 0.10),
    ('ERDF', 0.10)
]

PROJECT_PREFIXES = [
    'OCEAN', 'MARINE', 'BLUE', 'SEA', 'COASTAL', 'AQUA', 'BIO', 'ECO',
    'SUSTAIN', 'GREEN', 'CLEAN', 'RESTORE', 'PROTECT', 'CONSERVE', 'INNOVATE',
    'SMART', 'DIGITAL', 'TECH', 'FUTURE', 'EURO', 'MED', 'ADRIATIC', 'AEGEAN'
]

PROJECT_SUFFIXES = [
    'PLUS', 'PRO', 'NEXT', 'FUTURE', 'VISION', 'ACTION', 'PLAN', 'STRATEGY',
    'ALLIANCE', 'NETWORK', 'HUB', 'LAB', 'CENTER', '2030', '4OCEAN', 'CONNECT'
]

ACTION_TYPES = [
    'Research and Innovation Action',
    'Innovation Action',
    'Coordination and Support Action',
    'Standard Project',
    'LIFE Nature',
    'LIFE Environment',
    'Regional Cooperation'
]

COUNTRIES = [
    'Italy', 'Spain', 'France', 'Greece', 'Croatia', 'Portugal', 'Slovenia',
    'Malta', 'Cyprus', 'Albania', 'Turkey', 'Tunisia', 'Morocco', 'Egypt',
    'Lebanon', 'Israel', 'Bosnia and Herzegovina', 'Montenegro'
]

CITIES = {
    'Italy': ['Rome', 'Venice', 'Naples', 'Genoa', 'Trieste', 'Bari', 'Palermo'],
    'Spain': ['Barcelona', 'Valencia', 'Malaga', 'Seville', 'Alicante'],
    'France': ['Marseille', 'Nice', 'Toulon', 'Montpellier'],
    'Greece': ['Athens', 'Thessaloniki', 'Piraeus', 'Heraklion'],
    'Croatia': ['Split', 'Dubrovnik', 'Rijeka', 'Zadar'],
    'Portugal': ['Lisbon', 'Porto', 'Faro'],
    'Slovenia': ['Ljubljana', 'Koper', 'Piran'],
    'Malta': ['Valletta', 'Sliema'],
    'Cyprus': ['Limassol', 'Nicosia', 'Larnaca'],
    'Albania': ['Tirana', 'Durres', 'Vlore'],
    'Turkey': ['Istanbul', 'Izmir', 'Antalya'],
    'Tunisia': ['Tunis', 'Sfax'],
    'Morocco': ['Tangier', 'Casablanca'],
    'Egypt': ['Alexandria', 'Cairo'],
    'Lebanon': ['Beirut', 'Tripoli'],
    'Israel': ['Tel Aviv', 'Haifa'],
    'Bosnia and Herzegovina': ['Sarajevo', 'Mostar'],
    'Montenegro': ['Podgorica', 'Kotor']
}

ORG_TYPES = [
    'University', 'Research Institute', 'Technology Center', 'NGO',
    'Government Agency', 'Private Company', 'SME', 'Foundation',
    'Regional Authority', 'Municipality', 'Association', 'Cooperative'
]

KEYWORDS = [
    'marine biodiversity', 'ocean restoration', 'blue economy', 'sustainable fisheries',
    'aquaculture', 'coastal management', 'marine pollution', 'plastic waste',
    'climate change', 'ecosystem services', 'marine protected areas', 'conservation',
    'renewable energy', 'maritime transport', 'blue growth', 'circular economy',
    'water quality', 'coastal erosion', 'marine habitats', 'species protection',
    'sustainable tourism', 'stakeholder engagement', 'innovation', 'digitalization',
    'monitoring systems', 'data management', 'policy development', 'capacity building',
    'nature-based solutions', 'green infrastructure'
]

DELIVERABLE_TYPES = [
    'Report', 'Software', 'Dataset', 'Prototype', 'Guidelines', 'Toolkit',
    'Platform', 'Training Material', 'Policy Brief', 'Best Practice Guide'
]

STATUSES = [
    ('Active', 0.60),
    ('Completed', 0.30),
    ('Planned', 0.05),
    ('Suspended', 0.03),
    ('Closed', 0.02)
]


def weighted_choice(choices):
    """Select item based on weights"""
    items, weights = zip(*choices)
    return random.choices(items, weights=weights, k=1)[0]


def random_date(start_year=2014, end_year=2027):
    """Generate random date"""
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime('%Y-%m-%d')


def generate_project_acronym():
    """Generate realistic project acronym"""
    prefix = random.choice(PROJECT_PREFIXES)
    if random.random() > 0.5:
        suffix = random.choice(PROJECT_SUFFIXES)
        return f"{prefix}-{suffix}"
    elif random.random() > 0.7:
        number = random.randint(1, 99)
        return f"{prefix}{number}"
    return prefix


def generate_organization_name(country, org_type):
    """Generate organization name"""
    city = random.choice(CITIES.get(country, ['Capital']))

    templates = [
        f"{city} {org_type}",
        f"{country} Institute of Marine Sciences",
        f"{city} Center for Ocean Research",
        f"Mediterranean {org_type} - {country}",
        f"{country} {org_type} for Blue Economy",
        f"{city} Innovation Hub",
        f"{country} Coastal Development Agency",
        f"{city} Maritime Technology Center"
    ]

    return random.choice(templates)


def generate_project_title(acronym):
    """Generate project title"""
    themes = [
        'Sustainable Ocean Management and Blue Economy Development',
        'Marine Biodiversity Conservation and Ecosystem Restoration',
        'Innovative Solutions for Marine Pollution Reduction',
        'Climate Adaptation Strategies for Coastal Communities',
        'Digital Transformation of Maritime Industries',
        'Sustainable Fisheries and Aquaculture Innovation',
        'Coastal Resilience and Natural Hazard Prevention',
        'Marine Renewable Energy Development',
        'Integrated Coastal Zone Management',
        'Blue Biotechnology and Marine Resources'
    ]

    return f"{acronym}: {random.choice(themes)} in the Mediterranean Region"


def generate_abstract(title):
    """Generate project abstract"""
    templates = [
        f"This project aims to address critical challenges in the Mediterranean through innovative approaches. {title} focuses on developing sustainable solutions that benefit both the environment and local communities. Through collaborative research and stakeholder engagement, the project will deliver practical tools and knowledge for long-term impact.",

        f"The {title} initiative brings together leading organizations to tackle pressing environmental and socio-economic issues. By combining cutting-edge technology with traditional knowledge, the project will create innovative pathways for sustainable development in coastal and marine areas.",

        f"Addressing the urgent need for sustainable development, this project develops comprehensive strategies for {title.lower()}. Through interdisciplinary collaboration and community participation, the initiative will contribute to achieving EU environmental and blue economy objectives."
    ]

    return random.choice(templates)


def create_database():
    """Create and initialize database"""
    # Remove existing database
    if DB_PATH.exists():
        DB_PATH.unlink()

    # Create new database with schema
    conn = sqlite3.connect(DB_PATH)

    # Read and execute schema
    schema_path = Path(__file__).parent / 'schema_sqlite.sql'
    with open(schema_path, 'r') as f:
        schema = f.read()

    conn.executescript(schema)
    conn.commit()

    return conn


def generate_projects(conn, num_projects):
    """Generate mock projects"""
    cursor = conn.cursor()

    print(f"Generating {num_projects} projects...")

    for i in range(num_projects):
        acronym = generate_project_acronym()
        title = generate_project_title(acronym)
        programme = weighted_choice(PROGRAMMES)
        status = weighted_choice(STATUSES)
        action_type = random.choice(ACTION_TYPES)

        # Dates
        start_date = random_date(2015, 2024)
        start = datetime.strptime(start_date, '%Y-%m-%d')
        duration_months = random.randint(24, 60)
        end = start + timedelta(days=duration_months * 30)
        end_date = end.strftime('%Y-%m-%d')

        # Budget
        total_cost = random.randint(500000, 10000000)
        ec_contribution = total_cost * random.uniform(0.70, 0.95)

        cursor.execute('''
            INSERT INTO projects (
                external_project_id, project_acronym, rcn, title, abstract,
                objectives, eu_programme, type_of_action, total_cost,
                ec_max_contribution, start_date, end_date, status,
                project_url, year
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            f'PRJ{100000 + i}',
            acronym,
            f'RCN{200000 + i}',
            title,
            generate_abstract(title),
            f'To develop innovative solutions; To engage stakeholders; To ensure sustainability; To transfer knowledge',
            programme,
            action_type,
            total_cost,
            ec_contribution,
            start_date,
            end_date,
            status,
            f'https://{acronym.lower().replace("-", "")}-project.eu',
            str(start.year)
        ))

        if (i + 1) % 100 == 0:
            print(f"  Generated {i + 1} projects")

    conn.commit()
    print(f"✓ Created {num_projects} projects")

    return cursor.lastrowid


def generate_partners(conn):
    """Generate partners for each project"""
    cursor = conn.cursor()

    # Get all projects
    cursor.execute('SELECT project_id, project_acronym, external_project_id FROM projects')
    projects = cursor.fetchall()

    print(f"Generating partners for {len(projects)} projects...")

    partner_count = 0
    for project_id, acronym, external_id in projects:
        # Each project has 3-10 partners
        num_partners = random.randint(3, 10)

        for i in range(num_partners):
            country = random.choice(COUNTRIES)
            org_type = random.choice(ORG_TYPES)
            org_name = generate_organization_name(country, org_type)
            city = random.choice(CITIES.get(country, ['Capital']))

            role = 'Coordinator' if i == 0 else 'Partner'

            # Budget distribution
            partner_budget = random.randint(100000, 2000000)
            ec_contribution = partner_budget * random.uniform(0.70, 0.90)

            cursor.execute('''
                INSERT INTO partners (
                    project_id, external_project_id, project_acronym,
                    organization_id, name, short_name, role, country, city,
                    activity_type, total_cost, ec_contribution, sme, order_number
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                project_id,
                external_id,
                acronym,
                f'ORG{100000 + partner_count}',
                org_name,
                ''.join(word[0] for word in org_name.split()[:3]),
                role,
                country,
                city,
                org_type,
                partner_budget,
                ec_contribution,
                1 if org_type == 'SME' else 0,
                i + 1
            ))

            partner_count += 1

    conn.commit()
    print(f"✓ Created {partner_count} partners")


def generate_deliverables(conn):
    """Generate deliverables for projects"""
    cursor = conn.cursor()

    cursor.execute('SELECT project_id, project_acronym, external_project_id FROM projects')
    projects = cursor.fetchall()

    print(f"Generating deliverables for {len(projects)} projects...")

    deliverable_count = 0
    for project_id, acronym, external_id in projects:
        # Each project has 2-8 deliverables
        num_deliverables = random.randint(2, 8)

        for i in range(num_deliverables):
            del_type = random.choice(DELIVERABLE_TYPES)

            cursor.execute('''
                INSERT INTO deliverables (
                    project_id, external_project_id, project_acronym,
                    external_deliverable_id, title, description,
                    deliverable_type, url
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                project_id,
                external_id,
                acronym,
                f'D{i+1}.{random.randint(1,5)}',
                f'{del_type} - {random.choice(["Project Results", "Methodology", "Implementation Plan", "Best Practices", "Technical Specifications"])}',
                f'Comprehensive {del_type.lower()} documenting project outcomes and methodology',
                del_type,
                f'https://{acronym.lower()}-project.eu/deliverables/d{i+1}'
            ))

            deliverable_count += 1

    conn.commit()
    print(f"✓ Created {deliverable_count} deliverables")


def generate_publications(conn):
    """Generate publications"""
    cursor = conn.cursor()

    cursor.execute('SELECT project_id, project_acronym, external_project_id FROM projects WHERE status = "Completed" OR status = "Active"')
    projects = cursor.fetchall()

    print(f"Generating publications for {len(projects)} projects...")

    journals = [
        'Marine Ecology Progress Series', 'Ocean & Coastal Management',
        'Conservation Biology', 'Environmental Science & Technology',
        'Marine Pollution Bulletin', 'Marine Policy', 'Sustainability',
        'Journal of Environmental Management', 'Aquaculture Research'
    ]

    publication_count = 0
    for project_id, acronym, external_id in projects:
        # 40% of projects have publications
        if random.random() < 0.4:
            num_pubs = random.randint(1, 4)

            for i in range(num_pubs):
                year = random.randint(2018, 2024)

                cursor.execute('''
                    INSERT INTO publications (
                        project_id, external_project_id, project_acronym,
                        title, authors, journal_title, published_year,
                        doi, is_published_as
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    project_id,
                    external_id,
                    acronym,
                    f'Innovative Approaches in {random.choice(["Marine Conservation", "Blue Economy", "Coastal Management", "Sustainable Development"])}',
                    f'{random.choice(["Smith", "Garcia", "Mueller", "Rossi"])}, {random.choice(["J.", "M.", "A.", "L."])} et al.',
                    random.choice(journals),
                    str(year),
                    f'10.{random.randint(1000,9999)}/{acronym.lower()}.{year}.{random.randint(100,999)}',
                    'Journal Article'
                ))

                publication_count += 1

    conn.commit()
    print(f"✓ Created {publication_count} publications")


def generate_keywords(conn):
    """Generate and assign keywords"""
    cursor = conn.cursor()

    print("Creating keywords...")

    # Insert keywords
    for keyword in KEYWORDS:
        cursor.execute('INSERT INTO keywords (keyword_text, keyword_category) VALUES (?, ?)',
                      (keyword, 'General'))

    conn.commit()

    # Assign keywords to projects
    cursor.execute('SELECT project_id FROM projects')
    projects = [row[0] for row in cursor.fetchall()]

    cursor.execute('SELECT keyword_id FROM keywords')
    keyword_ids = [row[0] for row in cursor.fetchall()]

    print(f"Assigning keywords to {len(projects)} projects...")

    for project_id in projects:
        # Each project gets 3-7 keywords
        num_keywords = random.randint(3, 7)
        selected_keywords = random.sample(keyword_ids, num_keywords)

        for keyword_id in selected_keywords:
            cursor.execute('''
                INSERT OR IGNORE INTO project_keywords (project_id, keyword_id, source)
                VALUES (?, ?, ?)
            ''', (project_id, keyword_id, random.choice(['Original', 'Manual', 'AI-Generated'])))

    conn.commit()
    print(f"✓ Created {len(KEYWORDS)} keywords and assigned to projects")


def generate_statistics(conn):
    """Display generation statistics"""
    cursor = conn.cursor()

    stats = {}
    stats['projects'] = cursor.execute('SELECT COUNT(*) FROM projects').fetchone()[0]
    stats['partners'] = cursor.execute('SELECT COUNT(*) FROM partners').fetchone()[0]
    stats['deliverables'] = cursor.execute('SELECT COUNT(*) FROM deliverables').fetchone()[0]
    stats['publications'] = cursor.execute('SELECT COUNT(*) FROM publications').fetchone()[0]
    stats['keywords'] = cursor.execute('SELECT COUNT(*) FROM keywords').fetchone()[0]

    print("\n" + "="*50)
    print("DATABASE GENERATION COMPLETE")
    print("="*50)
    print(f"Projects:      {stats['projects']:,}")
    print(f"Partners:      {stats['partners']:,}")
    print(f"Deliverables:  {stats['deliverables']:,}")
    print(f"Publications:  {stats['publications']:,}")
    print(f"Keywords:      {stats['keywords']}")
    print("="*50)
    print(f"\nDatabase saved to: {DB_PATH}")
    print(f"Database size: {DB_PATH.stat().st_size / 1024 / 1024:.2f} MB")


def main():
    """Main execution"""
    print("\n" + "="*50)
    print("EU PROJECTS DATABASE - MOCK DATA GENERATOR")
    print("="*50 + "\n")

    # Create database
    conn = create_database()

    # Generate data
    generate_projects(conn, NUM_PROJECTS)
    generate_partners(conn)
    generate_deliverables(conn)
    generate_publications(conn)
    generate_keywords(conn)

    # Show statistics
    generate_statistics(conn)

    # Close connection
    conn.close()

    print("\n✓ Mock data generation completed successfully!\n")


if __name__ == '__main__':
    main()
