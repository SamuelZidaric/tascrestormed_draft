#!/bin/bash

###############################################################################
# EU Projects Portal - Unified Launcher
# Choose between HTML or React version
###############################################################################

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  EU PROJECTS PORTAL - LOCAL SIMULATION                    ║${NC}"
echo -e "${BLUE}║  Choose your preferred version                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📦 Simulation Data:${NC}"
echo "   • 950 realistic EU projects"
echo "   • 6,000+ partners from Mediterranean countries"
echo "   • 1,500+ deliverables"
echo "   • 500+ publications"
echo ""
echo -e "${CYAN}Choose a version to run:${NC}"
echo ""
echo -e "${YELLOW}1)${NC} HTML Version (Pure HTML/JS/CSS)"
echo "   └─ Simple, no build step needed"
echo "   └─ Opens directly in browser"
echo "   └─ Starts a local web server"
echo ""
echo -e "${YELLOW}2)${NC} React Version (Modern React + TypeScript)"
echo "   └─ Full featured with better UX"
echo "   └─ Hot reload during development"
echo "   └─ Requires Node.js"
echo ""
echo -e "${YELLOW}3)${NC} Exit"
echo ""
read -p "Enter your choice (1-3): " choice
echo ""

case $choice in
  1)
    echo -e "${GREEN}Starting HTML version...${NC}"
    echo ""

    # Check if Python is available
    if command -v python3 &> /dev/null; then
      PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
      PYTHON_CMD="python"
    else
      echo -e "${YELLOW}Error: Python is not installed${NC}"
      echo "Please install Python from https://www.python.org/"
      exit 1
    fi

    echo -e "${BLUE}Starting local web server...${NC}"
    echo -e "${GREEN}URL: http://localhost:8000${NC}"
    echo ""
    echo -e "${YELLOW}Press CTRL+C to stop the server${NC}"
    echo ""

    cd html_mock_elazem
    $PYTHON_CMD -m http.server 8000
    ;;

  2)
    echo -e "${GREEN}Starting React version...${NC}"
    echo ""

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

    echo -e "${BLUE}Starting development server...${NC}"
    echo -e "${GREEN}URL: http://localhost:5173${NC}"
    echo ""
    echo -e "${YELLOW}Press CTRL+C to stop the server${NC}"
    echo ""

    npm run dev
    ;;

  3)
    echo -e "${GREEN}Goodbye!${NC}"
    exit 0
    ;;

  *)
    echo -e "${YELLOW}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac
