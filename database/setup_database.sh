#!/bin/bash

###############################################################################
# Database Setup Script for EU Projects Database
# This script creates the database and initializes the schema
###############################################################################

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
DB_NAME="eu_projects_db"
DB_USER="root"
DB_HOST="localhost"
DB_PORT="3306"

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if MySQL is installed
check_mysql() {
    if ! command -v mysql &> /dev/null; then
        print_message "$RED" "ERROR: MySQL is not installed or not in PATH"
        exit 1
    fi
    print_message "$GREEN" "✓ MySQL found"
}

# Function to create database
create_database() {
    print_message "$YELLOW" "Creating database: $DB_NAME"

    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
EOF

    if [ $? -eq 0 ]; then
        print_message "$GREEN" "✓ Database created successfully"
    else
        print_message "$RED" "ERROR: Failed to create database"
        exit 1
    fi
}

# Function to run schema
run_schema() {
    print_message "$YELLOW" "Running database schema..."

    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p "$DB_NAME" < schema_enhanced.sql

    if [ $? -eq 0 ]; then
        print_message "$GREEN" "✓ Schema created successfully"
    else
        print_message "$RED" "ERROR: Failed to create schema"
        exit 1
    fi
}

# Function to verify tables
verify_tables() {
    print_message "$YELLOW" "Verifying tables..."

    TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p -N -B -e "USE $DB_NAME; SHOW TABLES;" | wc -l)

    print_message "$GREEN" "✓ Created $TABLE_COUNT tables"

    # List all tables
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p -e "USE $DB_NAME; SHOW TABLES;"
}

# Function to display statistics
show_stats() {
    print_message "$YELLOW" "Database Statistics:"

    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p "$DB_NAME" <<EOF
SELECT
    TABLE_NAME as 'Table',
    TABLE_ROWS as 'Rows',
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) as 'Size (MB)'
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = '$DB_NAME'
ORDER BY TABLE_NAME;
EOF
}

# Main script
main() {
    print_message "$GREEN" "========================================="
    print_message "$GREEN" "EU Projects Database Setup"
    print_message "$GREEN" "========================================="
    echo ""

    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --db-name)
                DB_NAME="$2"
                shift 2
                ;;
            --db-user)
                DB_USER="$2"
                shift 2
                ;;
            --db-host)
                DB_HOST="$2"
                shift 2
                ;;
            --db-port)
                DB_PORT="$2"
                shift 2
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --db-name   Database name (default: eu_projects_db)"
                echo "  --db-user   Database user (default: root)"
                echo "  --db-host   Database host (default: localhost)"
                echo "  --db-port   Database port (default: 3306)"
                echo "  --help      Show this help message"
                exit 0
                ;;
            *)
                print_message "$RED" "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done

    print_message "$YELLOW" "Configuration:"
    echo "  Database: $DB_NAME"
    echo "  User: $DB_USER"
    echo "  Host: $DB_HOST"
    echo "  Port: $DB_PORT"
    echo ""

    # Run setup steps
    check_mysql
    create_database
    run_schema
    verify_tables
    show_stats

    echo ""
    print_message "$GREEN" "========================================="
    print_message "$GREEN" "Setup completed successfully!"
    print_message "$GREEN" "========================================="
    echo ""
    print_message "$YELLOW" "Next steps:"
    echo "  1. Import your project data using import_data.sh"
    echo "  2. Review the data using the sample queries in DATA_DICTIONARY.md"
    echo "  3. Configure your application to connect to: $DB_NAME"
}

# Run main function
main "$@"
