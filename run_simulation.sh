#!/bin/bash

###############################################################################
# EU Projects Portal - Local Simulation Runner
# Starts the React app with 950+ realistic projects
###############################################################################

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  EU PROJECTS PORTAL - LOCAL SIMULATION                    ║${NC}"
echo -e "${BLUE}║  Self-contained demo with 950+ realistic projects          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "react_mock_elazem" ]; then
    echo -e "${YELLOW}Error: Please run this script from the repository root${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}Error: Node.js/npm is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

cd react_mock_elazem

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
fi

echo -e "${GREEN}📦 Simulation Data:${NC}"
echo "   • 950 projects across all EU programmes"
echo "   • 6,215 partners from Mediterranean countries"
echo "   • 1,470 deliverables"
echo "   • 541 publications"
echo ""
echo -e "${YELLOW}🚀 Starting development server...${NC}"
echo ""
echo -e "${BLUE}The app will open automatically in your browser${NC}"
echo -e "${BLUE}URL: http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}Press CTRL+C to stop the server${NC}"
echo ""

# Start the development server
npm run dev
