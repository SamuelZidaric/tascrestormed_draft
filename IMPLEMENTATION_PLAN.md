# TASC-RestoreMed Portal - Implementation Plan

**Project:** Interactive Dashboard Simulation for Task 4.1
**Type:** High-fidelity working prototype
**Technology:** React + TypeScript + FastAPI + MySQL
**Timeline:** 2-3 weeks (15 executable steps)
**End Goal:** Working simulation at `http://localhost:3000`

---

## Executive Summary

This document provides the complete implementation plan to build a **fully functional simulation** of the TASC-RestoreMed project portal. The simulation will be self-contained, use realistic mock data, and demonstrate all features planned for the final system.

### What This Simulation Provides

- ✅ **900 realistic fake projects** in database
- ✅ **Interactive search** with advanced filters
- ✅ **Analytics dashboard** with KPIs and charts
- ✅ **Interactive Mediterranean map** showing project locations
- ✅ **Synergy visualization** with network graphs
- ✅ **User authentication** with role-based access
- ✅ **Admin panel** for management
- ✅ **Fully responsive** design (mobile + desktop)
- ✅ **Demo-ready** for stakeholder presentations

---

## Technology Stack

### Frontend (React)
```
Framework:     React 18 + TypeScript
Build Tool:    Vite
UI Library:    Material-UI (MUI) v5
Routing:       React Router v6
State:         React Query + Context API
Charts:        Recharts
Maps:          Leaflet + React-Leaflet
Forms:         React Hook Form + Zod
HTTP Client:   Axios
```

### Backend (Python)
```
Framework:     FastAPI
ORM:           SQLAlchemy
Database:      MySQL 8.0
Auth:          JWT (PyJWT)
Validation:    Pydantic
Testing:       pytest
```

### DevOps
```
Container:     Docker + Docker Compose
Development:   Hot reload enabled
Production:    nginx (if needed later)
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│            http://localhost:3000                 │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTP/REST
                    │
┌───────────────────▼─────────────────────────────┐
│              React Frontend                      │
│  - Material-UI components                        │
│  - React Query (data fetching)                   │
│  - Recharts (analytics)                          │
│  - Leaflet (maps)                                │
└───────────────────┬─────────────────────────────┘
                    │
                    │ REST API
                    │
┌───────────────────▼─────────────────────────────┐
│              FastAPI Backend                     │
│  - /api/projects (CRUD)                          │
│  - /api/search (advanced search)                 │
│  - /api/clusters                                 │
│  - /api/synergies                                │
│  - /api/analytics/kpis                           │
│  - /api/auth/login                               │
└───────────────────┬─────────────────────────────┘
                    │
                    │ SQL
                    │
┌───────────────────▼─────────────────────────────┐
│              MySQL Database                      │
│  - 19 tables                                     │
│  - 900 projects (mock data)                      │
│  - 150 organizations                             │
│  - 30 regions                                    │
│  - 7 clusters                                    │
│  - 15 synergies                                  │
└─────────────────────────────────────────────────┘
```

---

## Project Structure

```
tascrestormed_simulation/
│
├── docker-compose.yml           # Orchestrates all services
├── .env                         # Configuration
├── README.md                    # Quick start guide
│
├── database/
│   ├── schema.sql              # Database schema (19 tables)
│   └── init.sql                # Mock data INSERT statements
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # FastAPI application
│       ├── database.py         # DB connection
│       ├── models.py           # SQLAlchemy models
│       ├── schemas.py          # Pydantic schemas
│       └── routers/
│           ├── projects.py     # Project endpoints
│           ├── search.py       # Search endpoints
│           ├── clusters.py     # Cluster endpoints
│           ├── synergies.py    # Synergy endpoints
│           ├── analytics.py    # Analytics endpoints
│           └── auth.py         # Authentication endpoints
│
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx            # Entry point
        ├── App.tsx             # Main app component
        │
        ├── components/
        │   ├── common/
        │   │   ├── Header.tsx
        │   │   ├── Navbar.tsx
        │   │   ├── Footer.tsx
        │   │   └── LoadingSpinner.tsx
        │   ├── search/
        │   │   ├── SearchBar.tsx
        │   │   ├── AdvancedFilters.tsx
        │   │   └── SearchResults.tsx
        │   ├── projects/
        │   │   ├── ProjectCard.tsx
        │   │   ├── ProjectList.tsx
        │   │   ├── ProjectDetail.tsx
        │   │   └── ProjectMap.tsx
        │   ├── clusters/
        │   │   ├── ClusterCard.tsx
        │   │   └── ClusterView.tsx
        │   ├── synergies/
        │   │   ├── SynergyList.tsx
        │   │   ├── SynergyDetail.tsx
        │   │   └── SynergyNetwork.tsx
        │   └── analytics/
        │       ├── KPIDashboard.tsx
        │       └── Charts/
        │           ├── BudgetChart.tsx
        │           ├── TimelineChart.tsx
        │           └── RegionChart.tsx
        │
        ├── pages/
        │   ├── HomePage.tsx
        │   ├── SearchPage.tsx
        │   ├── ProjectsPage.tsx
        │   ├── ProjectDetailPage.tsx
        │   ├── ClustersPage.tsx
        │   ├── SynergiesPage.tsx
        │   ├── AnalyticsPage.tsx
        │   └── LoginPage.tsx
        │
        ├── hooks/
        │   ├── useProjects.ts
        │   ├── useSearch.ts
        │   ├── useClusters.ts
        │   └── useAuth.ts
        │
        ├── services/
        │   ├── api.ts              # Axios instance
        │   ├── projectService.ts
        │   ├── searchService.ts
        │   └── authService.ts
        │
        ├── types/
        │   ├── project.ts
        │   ├── cluster.ts
        │   └── user.ts
        │
        └── styles/
            └── theme.ts            # MUI theme
```

---

## Implementation Steps (15 Total)

### Phase 1: Foundation (Steps 1-3)
**Time: 2 hours**

1. **Create Project Structure**
   - All folders and configuration files
   - docker-compose.yml
   - .env with database credentials

2. **Generate Mock Data**
   - Python script creates 900 realistic projects
   - Organizations, regions, clusters, keywords
   - Synergies linking projects
   - Output: database/init.sql

3. **Deploy Database**
   - MySQL container with schema
   - Load all mock data
   - Validation: 900 projects in database

### Phase 2: Backend API (Step 4)
**Time: 3 hours**

4. **Create FastAPI Backend**
   - Complete REST API with 11 endpoints
   - SQLAlchemy models for 19 tables
   - JWT authentication
   - CORS enabled
   - Validation: Swagger docs accessible

### Phase 3: Frontend Foundation (Steps 5-6)
**Time: 4 hours**

5. **Initialize React Frontend**
   - Vite + React + TypeScript
   - Material-UI setup
   - React Query configuration
   - Validation: Dev server running

6. **Create Layout & Navigation**
   - Header with branding
   - Navbar with all pages
   - Footer with consortium info
   - Routing setup
   - Validation: Can navigate all pages

### Phase 4: Core Pages (Steps 7-11)
**Time: 15 hours**

7. **Home Page**
   - Hero section
   - Quick stats (KPIs)
   - Featured projects
   - Search bar

8. **Search Interface**
   - SearchBar component
   - Advanced filters (clusters, regions, dates, budget)
   - Search results grid
   - Pagination
   - Export CSV

9. **Project Pages**
   - Project list (grid view)
   - Project detail (complete info)
   - Related projects
   - Coordinator info

10. **Clusters Page**
    - 7 cluster cards (color-coded)
    - Doughnut chart
    - Filter projects by cluster
    - Budget per cluster

11. **Synergies Page**
    - List of synergies
    - Network graph visualization
    - Filter by type/status
    - Linked projects

### Phase 5: Advanced Features (Steps 12-14)
**Time: 10 hours**

12. **Analytics Dashboard**
    - KPI cards (4 metrics)
    - Budget by cluster (bar chart)
    - Projects timeline (line chart)
    - Region distribution (pie chart)
    - Status breakdown

13. **Interactive Map**
    - Leaflet map (Mediterranean centered)
    - Markers for project regions
    - Click marker → project popup
    - Filter by cluster (colored markers)
    - Heat map layer

14. **Authentication & Admin**
    - Login page (email + password)
    - JWT token management
    - Protected routes
    - Admin panel (user management)
    - Demo accounts

### Phase 6: Polish (Step 15)
**Time: 4 hours**

15. **Final Polish**
    - Loading states (skeletons)
    - Error handling
    - Toast notifications
    - Smooth animations
    - Dark mode toggle
    - Demo mode banner
    - Help tooltips

---

## Key Features

### 1. Advanced Search
- **Full-text search** across titles, abstracts, objectives
- **Multi-criteria filters:**
  - Thematic clusters (multi-select)
  - Geographic regions (multi-select)
  - Organizations
  - Project status
  - Date range
  - Budget range
  - Community-led toggle
- **Combine filters** (AND logic)
- **Sort results** (relevance, date, budget)
- **Export results** to CSV

### 2. Project Management
- **List view:** Grid of project cards with pagination
- **Map view:** Geographic visualization
- **Detail view:** Complete project information
  - Basic info (title, acronym, grant number)
  - Funding & timeline
  - Abstract & objectives
  - Coordinator & partners
  - Regions & clusters
  - Keywords & synergies
  - Related projects

### 3. Analytics Dashboard
- **KPI Tracking:**
  - Total projects (900/900 target)
  - Active clusters (7/5 target)
  - Documented synergies (15/10 target)
  - Weekly active users

- **Visualizations:**
  - Budget distribution by cluster
  - Project timeline (start dates over time)
  - Regional distribution
  - Status breakdown
  - Deployment stage analysis

### 4. Thematic Clusters
- **7 Pre-defined clusters:**
  1. Pollution Prevention & Reduction
  2. Conservation & Restoration
  3. Sustainable Blue Economy
  4. Water Management
  5. Climate Adaptation & Mitigation
  6. Nature-Based Solutions
  7. Circular Economy

- **Cluster view:**
  - Color-coded cards
  - Project count per cluster
  - Total budget per cluster
  - Filter projects by cluster
  - Visual distribution (doughnut chart)

### 5. Synergy Documentation
- **List synergies** (15 mock synergies)
- **Types:**
  - Shared Methodology
  - Complementary Goals
  - Resource Sharing
  - Geographic Overlap
  - Technology Transfer
  - Knowledge Exchange
  - Joint Activities

- **Network visualization:**
  - Graph showing projects as nodes
  - Synergies as connections
  - Interactive (click to navigate)

### 6. Interactive Map
- **Mediterranean region** map (Leaflet)
- **Project markers** at region coordinates
- **Cluster filtering** (colored markers)
- **Click popup** shows project info
- **Heat map** layer option
- **Legend** and controls

### 7. User Authentication
- **Role-based access:**
  - Admin (full access)
  - Consortium Partner (edit projects)
  - FSTP Project (edit own projects)
  - Public (read-only)

- **Demo accounts:**
  - admin@tasc.eu / Demo2025!
  - partner@tasc.eu / Demo2025!
  - public@tasc.eu / Demo2025!

### 8. Admin Panel
- User management
- Project approval
- Keyword management
- System statistics
- Data export

---

## Mock Data Specifications

### Projects (900 total)
```javascript
{
  project_title: "MEDCOAST - Mediterranean Coastal Ecosystem Restoration",
  project_acronym: "MEDCOAST",
  grant_agreement_number: "101234567",
  funding_program: "Horizon Europe",
  total_budget: 2500000.00,
  start_date: "2024-01-01",
  end_date: "2027-12-31",
  duration_months: 48,
  project_status: "Active",
  abstract: "Realistic AI-generated marine science abstract...",
  coordinator: "Hellenic Centre for Marine Research (HCMR)",
  regions: ["Greece", "Eastern Mediterranean"],
  clusters: ["Conservation & Restoration", "Nature-Based Solutions"],
  keywords: ["ecosystem restoration", "coastal management", "biodiversity"],
  is_community_led: true
}
```

### Organizations (150)
Real Mediterranean research institutions:
- HCMR (Greece)
- CIIMAR (Portugal)
- CNR (Italy)
- IFREMER (France)
- IEO (Spain)
- NIOF (Egypt)
- etc.

### Regions (30)
- 22 Mediterranean countries
- 8 sea basins (Western Med, Eastern Med, Adriatic, Aegean, etc.)

### Synergies (15)
Realistic connections between 2-4 projects each.

---

## API Endpoints

### Projects
```
GET    /api/projects              - List projects (paginated, filtered)
GET    /api/projects/{id}         - Get single project
POST   /api/projects              - Create project (auth required)
PUT    /api/projects/{id}         - Update project (auth required)
DELETE /api/projects/{id}         - Delete project (admin only)
```

### Search
```
POST   /api/search                - Advanced search with filters
GET    /api/search/fulltext       - Full-text search
GET    /api/search/keywords       - Search by keywords
```

### Clusters
```
GET    /api/clusters              - List all clusters
GET    /api/clusters/{id}         - Get cluster details
GET    /api/clusters/{id}/projects - Get projects in cluster
```

### Organizations
```
GET    /api/organizations         - List organizations
GET    /api/organizations/{id}/projects - Get organization's projects
```

### Synergies
```
GET    /api/synergies             - List synergies
GET    /api/synergies/{id}        - Get synergy details
POST   /api/synergies             - Create synergy (auth required)
PUT    /api/synergies/{id}        - Update synergy (auth required)
```

### Analytics
```
GET    /api/analytics/kpis        - All KPIs in one call
GET    /api/analytics/charts      - Chart data
GET    /api/analytics/budget      - Budget analysis
GET    /api/analytics/timeline    - Timeline data
```

### Authentication
```
POST   /api/auth/login            - Login (returns JWT)
POST   /api/auth/register         - Register new user
GET    /api/auth/me               - Get current user
POST   /api/auth/logout           - Logout
```

---

## Running the Simulation

### Prerequisites
```bash
- Docker Desktop installed
- 8GB RAM minimum
- 10GB free disk space
```

### Quick Start
```bash
# Clone/navigate to project
cd tascrestormed_simulation

# Start all services
docker-compose up

# Wait for services to start (~2 minutes)

# Access the portal
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
# Database: localhost:3306
```

### Demo Accounts
```
Admin User:
  Email: admin@tasc.eu
  Password: Demo2025!

Partner User:
  Email: partner@tasc.eu
  Password: Demo2025!

Public User:
  Email: public@tasc.eu
  Password: Demo2025!
```

### Demo Flow
1. Open http://localhost:3000
2. See home page with stats
3. Try searching "marine pollution"
4. Filter by "Pollution Prevention" cluster
5. Click a project to see details
6. Navigate to Synergies page
7. View Analytics dashboard
8. Check Interactive map
9. Login as admin
10. Access Admin panel

---

## Timeline

**Total Duration:** 2-3 weeks (15 working days)

### Week 1: Foundation & Backend
- **Days 1-2:** Steps 1-4 (Structure, data, database, backend)
- **Days 3-5:** Steps 5-6 (Frontend setup, layout)

### Week 2: Core Features
- **Days 1-2:** Steps 7-9 (Home, search, projects)
- **Days 3-5:** Steps 10-11 (Clusters, synergies)

### Week 3: Advanced & Polish
- **Days 1-2:** Steps 12-13 (Analytics, map)
- **Days 3-4:** Step 14 (Auth & admin)
- **Day 5:** Step 15 (Polish & testing)

---

## Success Criteria

### Functional Requirements
- [ ] 900 projects in database
- [ ] Search returns relevant results
- [ ] All filters work correctly
- [ ] Charts display accurate data
- [ ] Map shows project locations
- [ ] Login/logout works
- [ ] Admin panel functional
- [ ] All pages load < 2 seconds

### Visual Requirements
- [ ] Professional, polished UI
- [ ] Responsive on mobile and desktop
- [ ] Consistent branding
- [ ] Smooth animations
- [ ] No visual bugs

### Demo Requirements
- [ ] Easy to run (`docker-compose up`)
- [ ] Clear demo flow
- [ ] Realistic data
- [ ] No errors in console
- [ ] Works offline

---

## Next Steps

### To Execute This Plan

**Option 1: Step by Step**
```
Say: "do step 1"
I create the project structure

Say: "do step 2"
I generate mock data

etc.
```

**Option 2: Batch Execution**
```
Say: "do steps 1-5"
I complete the entire backend and frontend foundation

Say: "do remaining steps"
I complete all features
```

**Option 3: Full Build**
```
Say: "build the complete simulation"
I execute all 15 steps and deliver the working portal
```

### After Completion

**You'll have:**
- Working portal at localhost:3000
- All source code
- Docker setup for easy deployment
- Demo-ready presentation
- Documentation

**You can:**
- Demo to stakeholders
- Show to consortium partners
- Use for funding presentations
- Give to development team as target
- Export and share

---

## Support Documentation

Included in this repository:
- `SIMULATION_BUILD_PLAN.md` - This document
- `EXECUTABLE_STEPS.md` - Detailed 50-step production plan
- `IMPLEMENTATION_ROADMAP.md` - Complete technical roadmap
- `QUICK_START_CHECKLIST.md` - Day-by-day checklist
- `trm_db_schema` - Database schema
- `trm_data_dictionary` - Complete data dictionary
- `trm_implementation_guide` - SQL queries and examples
- `trm_executive_summary` - Project overview

---

## Contact & Coordination

**Task Lead:** FredU (Partner 6)
**Digital Tool Developer:** INFOR
**Technical Support:** HCMR

---

**Ready to build? Just say which step to execute!** 🚀

---

**Document Version:** 1.0
**Created:** November 2025
**Technology:** React + FastAPI + MySQL
**Timeline:** 2-3 weeks (15 steps)
