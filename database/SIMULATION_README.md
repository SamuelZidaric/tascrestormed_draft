# EU Projects Database - Simulation Environment

**A self-contained, portable database simulation for demonstrating the EU Projects Portal**

This is a **simulation/demo environment** that runs entirely within this repository. It uses SQLite (file-based database) and includes mock data generation for realistic testing without requiring external database servers.

## 🎯 Purpose

This simulation provides a fully functional database backend for:
- **Frontend development** - Test your UI without a production database
- **Demonstrations** - Show the portal to stakeholders
- **Testing** - Validate search, filtering, and data display features
- **Education** - Learn the database structure and API design

## ⚡ Quick Start

### One-Command Setup

```bash
chmod +x setup_simulation.sh
./setup_simulation.sh
```

This will:
1. ✅ Check Python installation
2. ✅ Install dependencies (Flask, flask-cors)
3. ✅ Generate SQLite database with 950+ projects
4. ✅ Create realistic mock data (partners, deliverables, publications)

### Start the API Server

```bash
python3 api_server.py
```

The API will be available at: **http://localhost:5000**

## 📦 What's Included

### Files

| File | Purpose |
|------|---------|
| `schema_sqlite.sql` | SQLite database schema (converted from MySQL) |
| `generate_mock_data.py` | Python script to generate realistic mock data |
| `api_server.py` | Flask REST API server |
| `requirements.txt` | Python dependencies |
| `setup_simulation.sh` | Automated setup script |
| `eu_projects_simulation.db` | SQLite database (created by setup) |

### Generated Data

After running setup, you'll have:

- **950+ Projects** across multiple EU programmes:
  - Horizon 2020 (35%)
  - Horizon Europe (30%)
  - LIFE Programme (15%)
  - Interreg Mediterranean (10%)
  - ERDF (10%)

- **4,000+ Partners** from 18 Mediterranean countries
- **3,000+ Deliverables** (reports, software, datasets, guidelines)
- **500+ Publications** in scientific journals
- **30 Keywords** for categorization

### Database Size

The simulation database is approximately **15-25 MB** - small enough to commit to Git if needed.

## 🔌 API Endpoints

### Projects

```bash
# List all projects (with pagination)
GET /api/projects
GET /api/projects?page=1&per_page=20
GET /api/projects?status=Active
GET /api/projects?programme=Horizon%202020

# Get specific project
GET /api/projects/{id}

# Get project related data
GET /api/projects/{id}/partners
GET /api/projects/{id}/deliverables
GET /api/projects/{id}/publications
GET /api/projects/{id}/reports
```

### Search

```bash
# Full-text search
GET /api/search?q=marine+biodiversity
GET /api/search?q=ocean&page=1&per_page=20
```

### Other Endpoints

```bash
# Statistics
GET /api/stats

# Partners
GET /api/partners
GET /api/partners?country=Italy

# Reference data
GET /api/programmes
GET /api/keywords
GET /api/filters
```

### Example Response

```json
{
  "projects": [
    {
      "project_id": 1,
      "project_acronym": "OCEAN-PLUS",
      "title": "OCEAN-PLUS: Sustainable Ocean Management...",
      "eu_programme": "Horizon 2020",
      "total_cost": 5000000.0,
      "status": "Active",
      "start_date": "2022-01-01",
      "end_date": "2025-12-31",
      "coordinator_name": "Barcelona Institute of Marine Sciences",
      "coordinator_country": "Spain"
    }
  ],
  "total": 950,
  "page": 1,
  "per_page": 20
}
```

## 🎨 Frontend Integration

### React Example

```javascript
// Fetch projects
const response = await fetch('http://localhost:5000/api/projects');
const data = await response.json();
console.log(data.projects);

// Search projects
const searchResponse = await fetch('http://localhost:5000/api/search?q=marine');
const searchData = await searchResponse.json();
console.log(searchData.results);
```

### Update React Mock

Replace the mock data in `react_mock_elazem/data.ts` with API calls:

```typescript
// Before: Static data
import { projects } from './data';

// After: API calls
const fetchProjects = async () => {
  const response = await fetch('http://localhost:5000/api/projects');
  return await response.json();
};
```

## 🗄️ Database Structure

### Core Tables

1. **projects** - 70+ fields covering all EU project data
2. **partners** - Partner/beneficiary information
3. **deliverables** - Project deliverables
4. **publications** - Scientific publications
5. **reports** - Project reports

### Reference Tables

- **programmes** - Funding programmes
- **topics** - H2020/HE topics
- **keywords** - Searchable keywords

### Junction Tables

- **project_topics** - Project-topic relationships
- **project_keywords** - Project-keyword relationships

## 🔍 Search Features

The simulation includes **full-text search** using SQLite FTS5:

```bash
# Search in project titles, abstracts, and objectives
GET /api/search?q=marine+restoration
GET /api/search?q="blue economy"
GET /api/search?q=biodiversity+conservation
```

Results are ranked by relevance and include highlighted snippets.

## 📊 Testing the API

### Using cURL

```bash
# Get statistics
curl http://localhost:5000/api/stats

# List projects
curl http://localhost:5000/api/projects

# Search
curl "http://localhost:5000/api/search?q=marine"

# Get project details
curl http://localhost:5000/api/projects/1

# Get project partners
curl http://localhost:5000/api/projects/1/partners
```

### Using Browser

Simply open these URLs in your browser:

- http://localhost:5000/ - API documentation
- http://localhost:5000/api/projects - List projects
- http://localhost:5000/api/stats - View statistics

## 🛠️ Development

### Regenerate Data

To regenerate the database with fresh mock data:

```bash
# Delete existing database
rm eu_projects_simulation.db

# Regenerate
python3 generate_mock_data.py
```

### Customize Mock Data

Edit `generate_mock_data.py` to:

- Change number of projects (`NUM_PROJECTS = 950`)
- Modify data pools (countries, programmes, keywords)
- Adjust data generation logic
- Add custom fields

### Database Queries

Connect to the database directly:

```bash
sqlite3 eu_projects_simulation.db

# Run queries
sqlite> SELECT COUNT(*) FROM projects;
sqlite> SELECT * FROM projects LIMIT 5;
sqlite> .schema projects
```

## 📈 Performance

The simulation is optimized for development/demo use:

- **Fast startup** - Database loads in < 1 second
- **Quick queries** - Most queries return in < 100ms
- **Efficient search** - Full-text search uses FTS5 indexes
- **Small footprint** - Entire database < 25 MB

## 🔐 Security Note

**This is a SIMULATION for development/testing only!**

- No authentication/authorization
- No input validation/sanitization
- No production-grade security
- Not intended for real data
- CORS is wide open

For production, implement proper security measures.

## 🚀 Deployment Options

### Local Development
```bash
python3 api_server.py
```

### With Gunicorn (Production-like)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 api_server:app
```

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python3", "api_server.py"]
```

## 📝 Notes

### Differences from Production MySQL Schema

The SQLite version has minor differences:

- `AUTO_INCREMENT` → `AUTOINCREMENT`
- `BOOLEAN` → `INTEGER` (0/1)
- `DECIMAL` → `REAL`
- `TIMESTAMP` → `TEXT` (ISO 8601 format)
- `ENUM` → `TEXT` with check constraints

These differences don't affect functionality for simulation purposes.

### Limitations

- No concurrent write operations (SQLite limitation)
- No stored procedures or complex triggers
- Limited to ~1TB database size (not an issue for simulation)
- Single-file database (easier for demos!)

### Advantages

- ✅ No database server installation needed
- ✅ Portable - entire database is one file
- ✅ Easy to backup and version control
- ✅ Perfect for demonstrations
- ✅ Fast setup and teardown

## 🤝 Contributing

To improve the simulation:

1. Add more realistic data generation
2. Implement additional API endpoints
3. Add data validation
4. Create integration tests
5. Improve documentation

## 📖 Additional Resources

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Full-text Search in SQLite](https://www.sqlite.org/fts5.html)

---

## Quick Reference

```bash
# Setup
./setup_simulation.sh

# Start API
python3 api_server.py

# Test API
curl http://localhost:5000/api/stats

# Regenerate data
python3 generate_mock_data.py

# Query database
sqlite3 eu_projects_simulation.db
```

**API Base URL**: `http://localhost:5000`

**Database File**: `eu_projects_simulation.db`

**Port**: 5000 (configurable in api_server.py)

---

**Version**: 1.0
**Type**: Simulation/Demo
**Purpose**: Development and demonstration of EU Projects Portal
