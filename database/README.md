# EU Projects Database

A comprehensive MySQL database for managing EU-funded project data from multiple programmes including Horizon 2020, Horizon Europe, Interreg, LIFE, and ERDF.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Structure](#database-structure)
- [Quick Start](#quick-start)
- [Files Description](#files-description)
- [Installation](#installation)
- [Usage](#usage)
- [Data Import](#data-import)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

## Overview

This database is designed to store and manage comprehensive information about EU-funded projects, including:

- **Project Information**: Basic details, objectives, timelines, budgets, and outcomes
- **Partners/Beneficiaries**: Organizations involved in projects with their roles and contributions
- **Deliverables**: Project deliverables and outputs
- **Publications**: Scientific publications resulting from projects
- **Reports**: Project reports and documentation

### Key Features

✅ **Multi-Programme Support**: H2020, Horizon Europe, Interreg, LIFE, ERDF, and more
✅ **Flexible Schema**: Handles projects from 2014-2020 and 2021-2027 funding periods
✅ **Full-Text Search**: Optimized for searching projects by keywords
✅ **Comprehensive Relationships**: Properly normalized with junction tables
✅ **UTF-8 Support**: Full Unicode support including special characters
✅ **Performance Optimized**: Strategic indexing for fast queries
✅ **Well Documented**: Complete field mappings and usage examples

## Database Structure

### Core Tables

| Table | Purpose | Records Expected |
|-------|---------|------------------|
| `projects` | Main project information | 1000+ |
| `partners` | Project partners/beneficiaries | 5000+ |
| `deliverables` | Project deliverables | 3000+ |
| `publications` | Scientific publications | 2000+ |
| `reports` | Project reports | 1000+ |

### Reference Tables

| Table | Purpose |
|-------|---------|
| `programmes` | Funding programmes reference |
| `topics` | H2020/HE topic codes |
| `keywords` | Searchable keywords/tags |

### Junction Tables

| Table | Purpose |
|-------|---------|
| `project_topics` | Links projects to topics |
| `project_keywords` | Links projects to keywords |

### Database Views

| View | Purpose |
|------|---------|
| `projects_with_coordinator` | Projects with their main coordinator info |
| `project_summary` | Projects with counts of related records |

## Quick Start

### Prerequisites

- MySQL 5.7.4 or higher
- Bash shell (for setup script)
- Appropriate MySQL user privileges (CREATE, INSERT, SELECT, etc.)

### 3-Step Setup

```bash
# 1. Navigate to database directory
cd database/

# 2. Run setup script
chmod +x setup_database.sh
./setup_database.sh

# 3. Load sample data (optional)
mysql -u root -p eu_projects_db < sample_data.sql
```

That's it! Your database is ready to use.

## Files Description

### Core Files

| File | Description |
|------|-------------|
| `schema_enhanced.sql` | Complete database schema with all tables and indexes |
| `setup_database.sh` | Automated setup script for database creation |
| `sample_data.sql` | Sample data for testing and development |
| `DATA_DICTIONARY.md` | Comprehensive field documentation and mappings |
| `README.md` | This file - usage guide and documentation |

### Schema File Details

**schema_enhanced.sql** contains:
- Table definitions for all core, reference, and junction tables
- Primary and foreign key constraints
- Strategic indexes for performance
- Full-text search indexes
- Database views
- Initial reference data (programmes)

## Installation

### Option 1: Using Setup Script (Recommended)

The easiest way to set up the database:

```bash
# Basic setup with defaults
./setup_database.sh

# Custom configuration
./setup_database.sh --db-name my_projects --db-user myuser --db-host localhost
```

**Setup Script Options:**
- `--db-name`: Database name (default: eu_projects_db)
- `--db-user`: MySQL user (default: root)
- `--db-host`: MySQL host (default: localhost)
- `--db-port`: MySQL port (default: 3306)
- `--help`: Show help message

### Option 2: Manual Setup

If you prefer manual setup:

```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE eu_projects_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Run schema
mysql -u root -p eu_projects_db < schema_enhanced.sql

# 3. (Optional) Load sample data
mysql -u root -p eu_projects_db < sample_data.sql

# 4. Verify installation
mysql -u root -p eu_projects_db -e "SHOW TABLES;"
```

### Docker Setup (Alternative)

If using Docker:

```bash
# Start MySQL container
docker run --name mysql-projects \
    -e MYSQL_ROOT_PASSWORD=yourpassword \
    -e MYSQL_DATABASE=eu_projects_db \
    -p 3306:3306 \
    -d mysql:8.0 \
    --character-set-server=utf8mb4 \
    --collation-server=utf8mb4_unicode_ci

# Wait for MySQL to start (about 30 seconds)
sleep 30

# Run schema
docker exec -i mysql-projects mysql -u root -pyourpassword eu_projects_db < schema_enhanced.sql

# Load sample data (optional)
docker exec -i mysql-projects mysql -u root -pyourpassword eu_projects_db < sample_data.sql
```

## Usage

### Connecting to the Database

#### MySQL Command Line

```bash
mysql -u root -p eu_projects_db
```

#### Python

```python
import mysql.connector

connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='yourpassword',
    database='eu_projects_db',
    charset='utf8mb4'
)

cursor = connection.cursor(dictionary=True)
cursor.execute("SELECT * FROM projects LIMIT 10")
projects = cursor.fetchall()
```

#### Node.js

```javascript
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'eu_projects_db',
    charset: 'utf8mb4'
});

const [projects] = await connection.execute('SELECT * FROM projects LIMIT 10');
```

### Common Queries

#### Get all projects with coordinators

```sql
SELECT
    p.project_acronym,
    p.title,
    p.total_cost,
    part.name AS coordinator_name,
    part.country AS coordinator_country
FROM projects p
LEFT JOIN partners part ON p.project_id = part.project_id
    AND part.role = 'Coordinator'
ORDER BY p.start_date DESC;
```

#### Search projects by keyword

```sql
SELECT DISTINCT p.*
FROM projects p
INNER JOIN project_keywords pk ON p.project_id = pk.project_id
INNER JOIN keywords k ON pk.keyword_id = k.keyword_id
WHERE k.keyword_text IN ('marine', 'biodiversity', 'restoration')
ORDER BY p.start_date DESC;
```

#### Get project summary with counts

```sql
SELECT * FROM project_summary
WHERE project_acronym = 'OCEANBLUE';
```

#### Full-text search

```sql
SELECT
    project_acronym,
    title,
    MATCH(title, abstract, objectives) AGAINST('ocean restoration') AS relevance
FROM projects
WHERE MATCH(title, abstract, objectives) AGAINST('ocean restoration' IN NATURAL LANGUAGE MODE)
ORDER BY relevance DESC;
```

More examples available in [DATA_DICTIONARY.md](DATA_DICTIONARY.md).

## Data Import

### Importing Your Project Data

#### From CSV Files

```bash
# Example: Import projects from CSV
mysql -u root -p eu_projects_db \
    -e "LOAD DATA LOCAL INFILE 'projects.csv'
        INTO TABLE projects
        FIELDS TERMINATED BY ','
        ENCLOSED BY '\"'
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS;"
```

#### From Excel

1. Export Excel to CSV (UTF-8)
2. Use MySQL LOAD DATA or import tool
3. Or use a script (Python, Node.js) to read Excel and insert

#### Using Python Script

```python
import pandas as pd
import mysql.connector

# Read Excel file
df = pd.read_excel('projects.xlsx')

# Connect to database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='yourpassword',
    database='eu_projects_db'
)

# Import data
df.to_sql('projects', conn, if_exists='append', index=False)
```

### Import Order

To maintain referential integrity, import in this order:

1. `programmes` (reference data)
2. `topics` (reference data)
3. `keywords` (reference data)
4. `projects` (main table)
5. `partners` (depends on projects)
6. `deliverables` (depends on projects)
7. `publications` (depends on projects)
8. `reports` (depends on projects)
9. `project_topics` (junction table)
10. `project_keywords` (junction table)

### Field Mapping

See [DATA_DICTIONARY.md](DATA_DICTIONARY.md) for complete field mappings from your source data to database fields.

## Maintenance

### Backup

#### Create Backup

```bash
# Full backup
mysqldump -u root -p eu_projects_db > backup_$(date +%Y%m%d).sql

# Structure only
mysqldump -u root -p --no-data eu_projects_db > schema_backup.sql

# Specific tables
mysqldump -u root -p eu_projects_db projects partners > projects_backup.sql
```

#### Restore Backup

```bash
mysql -u root -p eu_projects_db < backup_20251119.sql
```

### Optimization

#### Update Statistics

```sql
ANALYZE TABLE projects, partners, deliverables, publications, reports;
```

#### Rebuild Indexes

```sql
OPTIMIZE TABLE projects;
OPTIMIZE TABLE partners;
```

#### Check Table Health

```sql
CHECK TABLE projects;
CHECK TABLE partners;
```

### Regular Maintenance Tasks

**Weekly:**
- Review and approve new keywords
- Check for duplicate entries
- Verify data quality

**Monthly:**
- Update keyword usage counts
- Archive old search logs
- Optimize tables

**Quarterly:**
- Full database backup
- Review and update indexes
- Check for orphaned records

## Troubleshooting

### Common Issues

#### Cannot create database

**Error:** `Access denied for user`

**Solution:**
```bash
# Grant privileges to user
mysql -u root -p -e "GRANT ALL PRIVILEGES ON eu_projects_db.* TO 'youruser'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

#### Character encoding issues

**Error:** Special characters not displaying correctly

**Solution:**
```sql
-- Check current encoding
SHOW VARIABLES LIKE 'character_set%';

-- Set to UTF-8
ALTER DATABASE eu_projects_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Foreign key constraint fails

**Error:** `Cannot add or update a child row`

**Solution:**
- Ensure parent records exist before inserting child records
- Follow the import order specified above
- Check that foreign key values match parent primary keys

#### Slow queries

**Problem:** Queries taking too long

**Solution:**
```sql
-- Check query execution plan
EXPLAIN SELECT * FROM projects WHERE ...;

-- Add missing indexes
CREATE INDEX idx_field_name ON table_name(field_name);

-- Update statistics
ANALYZE TABLE projects;
```

### Getting Help

If you encounter issues:

1. Check [DATA_DICTIONARY.md](DATA_DICTIONARY.md) for field definitions
2. Review the error message carefully
3. Check MySQL error log: `/var/log/mysql/error.log`
4. Verify MySQL version compatibility
5. Contact your database administrator

## Performance Tips

1. **Use Indexes**: All foreign keys and commonly searched fields are indexed
2. **Limit Results**: Use `LIMIT` clause for large result sets
3. **Use Views**: Pre-defined views for common queries
4. **Full-Text Search**: Use MATCH...AGAINST for text searches instead of LIKE
5. **Connection Pooling**: Use connection pools in your application
6. **Regular Maintenance**: Run ANALYZE and OPTIMIZE regularly

## Security Recommendations

1. **User Access**: Create separate users with minimal required privileges
2. **Passwords**: Use strong passwords and store securely
3. **Backups**: Encrypt backup files
4. **SSL/TLS**: Use encrypted connections for remote access
5. **Audit Logs**: Enable MySQL audit logging
6. **Updates**: Keep MySQL server updated with security patches

## Next Steps

After setting up the database:

1. ✅ Import your project data using import scripts
2. ✅ Configure your application to connect to the database
3. ✅ Set up regular backups
4. ✅ Review and optimize queries
5. ✅ Implement access control
6. ✅ Create database documentation for your team

## Additional Resources

- [DATA_DICTIONARY.md](DATA_DICTIONARY.md) - Complete field reference
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

## License

This database schema is part of the EU Projects Management System.

---

**Version:** 2.0
**Last Updated:** 2025-11-19
**Maintained By:** Database Team

For questions or issues, please contact the database administrator.
