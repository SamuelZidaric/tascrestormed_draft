#!/bin/bash

###############################################################################
# EU Projects Database - Simulation Setup Script
# One-command setup for the complete simulation environment
###############################################################################

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  EU PROJECTS DATABASE - SIMULATION SETUP                  ║${NC}"
    echo -e "${BLUE}║  Self-contained demo environment                          ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${YELLOW}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

check_python() {
    print_step "Checking Python installation..."

    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version | cut -d ' ' -f 2)
        print_success "Python 3 found (version $PYTHON_VERSION)"
        return 0
    else
        print_error "Python 3 is not installed"
        echo "Please install Python 3.7 or higher from https://www.python.org/"
        return 1
    fi
}

install_dependencies() {
    print_step "Installing Python dependencies..."

    if python3 -m pip install -q -r requirements.txt; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        echo "Try manually: pip3 install -r requirements.txt"
        return 1
    fi
}

generate_database() {
    print_step "Generating mock database with 950+ projects..."

    if python3 generate_mock_data.py; then
        print_success "Database generated successfully"
    else
        print_error "Failed to generate database"
        return 1
    fi
}

print_instructions() {
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  SETUP COMPLETE! 🎉                                        ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📦 Database created:${NC} eu_projects_simulation.db"
    echo -e "${BLUE}📊 Contains:${NC}"
    echo "   • 950+ mock EU projects"
    echo "   • 4,000+ partners/beneficiaries"
    echo "   • 3,000+ deliverables"
    echo "   • 500+ publications"
    echo "   • 30+ keywords"
    echo ""
    echo -e "${YELLOW}🚀 To start the API server:${NC}"
    echo "   python3 api_server.py"
    echo ""
    echo -e "${YELLOW}🌐 API will be available at:${NC}"
    echo "   http://localhost:5000"
    echo ""
    echo -e "${YELLOW}📖 API Documentation:${NC}"
    echo "   http://localhost:5000/"
    echo ""
    echo -e "${YELLOW}🔍 Example API calls:${NC}"
    echo "   • List projects: http://localhost:5000/api/projects"
    echo "   • Get stats: http://localhost:5000/api/stats"
    echo "   • Search: http://localhost:5000/api/search?q=marine"
    echo ""
    echo -e "${BLUE}💡 Next steps:${NC}"
    echo "   1. Start the API server (python3 api_server.py)"
    echo "   2. Configure your frontend to use http://localhost:5000"
    echo "   3. Test the API endpoints"
    echo ""
}

main() {
    print_header

    # Check Python
    if ! check_python; then
        exit 1
    fi

    echo ""

    # Install dependencies
    if ! install_dependencies; then
        exit 1
    fi

    echo ""

    # Generate database
    if ! generate_database; then
        exit 1
    fi

    # Print instructions
    print_instructions
}

# Run main function
main
