# TASC-RestoreMed - Simulation Build Plan

**Goal:** Create a perfect working simulation of the TASC-RestoreMed portal
**Type:** High-fidelity interactive prototype with realistic fake data
**Timeline:** 2-3 weeks
**End Result:** `docker-compose up` → Working portal at localhost:3000

---

## What You'll Get

**A fully functional simulation where:**
- ✅ Search works perfectly (but searches fake data)
- ✅ 900 realistic fake projects in database
- ✅ Interactive maps showing Mediterranean projects
- ✅ Charts and analytics with realistic numbers
- ✅ Login works (fake users)
- ✅ All CRUD operations work
- ✅ Looks identical to the final portal
- ✅ Can be demoed to stakeholders
- ✅ Runs entirely offline
- ✅ No external dependencies

**What it's NOT:**
- ❌ Connected to real CORDIS data
- ❌ Production-ready security
- ❌ Scalable infrastructure
- ❌ Real user data
- ❌ Deployed to internet

---

## Execution Plan: 15 Steps

### Step 1: Create Project Foundation
**Time:** 30 minutes
**What:** Complete folder structure + configuration

**Creates:**
```
tascrestormed_simulation/
├── .env
├── .gitignore
├── README.md
├── docker-compose.yml
├── database/
│   └── init.sql
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── database.py
│       ├── models.py
│       ├── schemas.py
│       └── routers/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── mock-data/
    └── generate_data.py
```

**Validation:**
- [ ] Folders created
- [ ] .env configured
- [ ] docker-compose.yml ready

---

### Step 2: Generate Realistic Mock Data
**Time:** 1 hour
**What:** Python script generates 900 realistic projects + all related data

**Generates:**
- 900 projects with realistic:
  - Titles (marine/ocean/coastal themes)
  - Acronyms (3-6 letters)
  - Abstracts (AI-generated realistic text)
  - Budgets (50K - 10M EUR)
  - Dates (2014-2028)
  - Grant numbers
- 150 organizations (real Mediterranean research centers)
- 30 regions (Mediterranean countries + sea basins)
- 7 thematic clusters
- 200 keywords (ocean/marine related)
- 15 synergies linking projects
- 10 users (admin, partners, public)

**Output:** `database/init.sql` with INSERT statements

**Validation:**
- [ ] SQL file generated
- [ ] 900 projects
- [ ] Realistic names
- [ ] All relationships linked

---

### Step 3: Deploy Simulation Database
**Time:** 15 minutes
**What:** MySQL database with all mock data

**Commands:**
```bash
docker-compose up -d database
```

**Includes:**
- Schema (19 tables)
- All mock data pre-loaded
- Admin user: admin@tasc.eu / password: Demo2025!

**Validation:**
- [ ] Database container running
- [ ] `SELECT COUNT(*) FROM projects` = 900
- [ ] All tables populated
- [ ] Can login to phpMyAdmin

---

### Step 4: Create Minimal Backend API
**Time:** 3 hours
**What:** FastAPI serving mock data

**Endpoints:**
```
GET  /api/projects              - List projects (paginated, filtered)
GET  /api/projects/{id}         - Get project details
POST /api/search                - Advanced search
GET  /api/clusters              - List clusters
GET  /api/clusters/{id}/projects - Projects in cluster
GET  /api/organizations         - List organizations
GET  /api/synergies             - List synergies
GET  /api/analytics/kpis        - KPI numbers
GET  /api/analytics/charts      - Chart data
POST /api/auth/login            - Login (returns token)
GET  /api/auth/me               - Current user
```

**Tech:**
- FastAPI (lightweight)
- SQLAlchemy (ORM)
- Simple JWT auth
- CORS enabled

**Validation:**
- [ ] `docker-compose up backend`
- [ ] Swagger docs at localhost:8000/docs
- [ ] All endpoints return data
- [ ] Login works

---

### Step 5: Create React Frontend Foundation
**Time:** 2 hours
**What:** React + TypeScript + Material-UI setup

**Stack:**
- Vite (fast dev server)
- React 18 + TypeScript
- Material-UI v5
- React Router v6
- React Query (data fetching)
- Recharts (charts)
- Leaflet (maps)

**Commands:**
```bash
cd frontend
npm install
npm run dev
```

**Validation:**
- [ ] Dev server runs at localhost:3000
- [ ] No TypeScript errors
- [ ] Material-UI theme applied

---

### Step 6: Create Layout & Navigation
**Time:** 2 hours
**What:** Header, navbar, footer, routing

**Pages:**
- Home
- Search
- Projects
- Project Detail
- Clusters
- Synergies
- Analytics
- Login
- Admin

**Features:**
- Responsive navbar
- TASC-RestoreMed branding
- Mobile hamburger menu
- Footer with consortium info

**Validation:**
- [ ] All routes work
- [ ] Navigation functional
- [ ] Looks professional
- [ ] Mobile responsive

---

### Step 7: Build Home Page
**Time:** 2 hours
**What:** Landing page with overview

**Sections:**
1. Hero banner
   - Welcome message
   - Quick search bar
   - Key stats (900 projects, 7 clusters, 15 synergies)
2. Featured projects (6 cards)
3. Recent synergies (3 cards)
4. Quick links to clusters
5. Call to action

**Validation:**
- [ ] Loads in <1 second
- [ ] Stats from API
- [ ] Search bar functional
- [ ] Beautiful design

---

### Step 8: Build Search Interface
**Time:** 4 hours
**What:** Complete search with filters

**Components:**
1. **SearchBar**
   - Text input
   - Autocomplete suggestions
   - Clear button

2. **AdvancedFilters**
   - Clusters (multi-select chips)
   - Regions (multi-select)
   - Status (dropdown)
   - Date range (sliders)
   - Budget range (sliders)
   - Community-led (toggle)
   - Reset filters button

3. **SearchResults**
   - Grid of project cards
   - Pagination
   - Sort options
   - Result count
   - Export CSV button

**Validation:**
- [ ] Search works instantly
- [ ] Filters update results
- [ ] Can combine filters
- [ ] Pagination smooth
- [ ] Export works

---

### Step 9: Build Project Pages
**Time:** 4 hours
**What:** List and detail views

**ProjectsPage:**
- Grid of project cards (20 per page)
- Quick filters (cluster, status)
- View toggle (grid/list/map)
- Sort options

**ProjectDetailPage:**
- Full project information
- Coordinator card
- Partner organizations list
- Regions with mini-map
- Cluster tags
- Keywords
- Related projects
- Part of synergies
- Timeline visualization
- Budget breakdown

**Validation:**
- [ ] List loads all projects
- [ ] Detail shows everything
- [ ] Links work
- [ ] Beautiful layout

---

### Step 10: Build Clusters Page
**Time:** 2 hours
**What:** Thematic cluster visualization

**Features:**
- 7 cluster cards (color-coded)
- Each shows:
  - Name + description
  - Project count
  - Budget total
  - Icon
- Click to filter projects
- Doughnut chart showing distribution
- List projects in cluster

**Validation:**
- [ ] All 7 clusters show
- [ ] Colors distinct
- [ ] Click filters projects
- [ ] Chart accurate

---

### Step 11: Build Synergies Page
**Time:** 3 hours
**What:** Synergy management

**Features:**
- List of 15 synergies
- Filter by type, status
- Synergy cards show:
  - Title
  - Type + status badges
  - Linked projects (chips)
  - Description
  - View details button
- Detail view:
  - Full information
  - Network graph (projects connected)
  - Timeline
  - Contact info

**Network Graph:**
- D3.js or vis.js
- Projects as nodes
- Synergies as connections
- Interactive (click to navigate)

**Validation:**
- [ ] 15 synergies display
- [ ] Network graph renders
- [ ] Filters work
- [ ] Interactive

---

### Step 12: Build Analytics Dashboard
**Time:** 4 hours
**What:** KPIs and visualizations

**KPI Cards:**
1. Total Projects (900/900 ✓)
2. Active Clusters (7/5 ✓)
3. Documented Synergies (15/10 ✓)
4. Weekly Users (simulated)

**Charts:**
1. **Budget by Cluster** (bar chart)
2. **Projects by Region** (choropleth map)
3. **Timeline** (line chart - projects over time)
4. **Status Distribution** (pie chart)
5. **Deployment Stage** (horizontal bar)
6. **Community-Led vs Traditional** (comparison)

**Validation:**
- [ ] All KPIs green
- [ ] 6 charts render
- [ ] Interactive (hover, click)
- [ ] Data accurate

---

### Step 13: Build Interactive Map
**Time:** 3 hours
**What:** Mediterranean map with projects

**Features:**
- Leaflet map centered on Mediterranean
- Markers for each region
- Cluster markers (zoomed out)
- Click marker → project popup
- Click popup → navigate to project
- Filter by cluster (colors)
- Heat map layer option
- Legend

**Data:**
- Coordinates for 30 regions
- Projects geo-tagged

**Validation:**
- [ ] Map loads
- [ ] Markers show
- [ ] Popups work
- [ ] Filters update map
- [ ] Smooth performance

---

### Step 14: Add Authentication & Admin Panel
**Time:** 3 hours
**What:** Login and admin features

**Login:**
- Email + password form
- "Remember me" option
- Test accounts:
  - admin@tasc.eu / Demo2025! (Admin)
  - partner@tasc.eu / Demo2025! (Partner)
  - public@tasc.eu / Demo2025! (Public)
- JWT token stored
- Protected routes

**Admin Panel:**
- User management (list, create, edit)
- Approve projects
- Manage keywords
- System stats
- Export data

**Validation:**
- [ ] Login works
- [ ] Roles enforced
- [ ] Admin sees extra features
- [ ] Public can't edit

---

### Step 15: Polish & Demo Mode
**Time:** 4 hours
**What:** Final touches for presentation

**Polish:**
- Loading states (skeletons)
- Error handling (friendly messages)
- Toast notifications
- Animations (smooth transitions)
- Dark mode toggle
- Help tooltips
- Tour guide (first visit)

**Demo Enhancements:**
- "Demo Mode" banner at top
- Auto-fill search with examples
- Suggested searches
- Highlight key features
- Sample user journeys

**Documentation:**
- README with:
  - Quick start (docker-compose up)
  - Login credentials
  - Feature tour
  - Screenshots

**Validation:**
- [ ] Looks professional
- [ ] No bugs
- [ ] Demo-ready
- [ ] Easy to run

---

## Running the Simulation

### Quick Start
```bash
# Clone/navigate to project
cd tascrestormed_simulation

# Start all services
docker-compose up

# Access portal
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
# Database: localhost:3306 (phpMyAdmin at :8080)
```

### Demo Accounts
```
Admin:   admin@tasc.eu / Demo2025!
Partner: partner@tasc.eu / Demo2025!
Public:  public@tasc.eu / Demo2025!
```

### Sample Demo Flow
1. **Home page** - See overview stats
2. **Search** - Search "marine pollution"
3. **Filter** - Select "Pollution Prevention" cluster
4. **View project** - Click any project
5. **See synergies** - Navigate to synergies page
6. **Analytics** - View KPI dashboard
7. **Map** - See geographic distribution
8. **Admin** - Login as admin, manage users

---

## What Makes This a Good Simulation

### Realistic Data
- Project titles sound real: "MEDCOAST - Mediterranean Coastal Ecosystems Restoration"
- Realistic budgets: €2.5M, €750K, €8.2M
- Real organization names: HCMR, CIIMAR, CNR, IFREMER
- Plausible abstracts: AI-generated marine science text
- Actual Mediterranean regions

### Fully Functional
- Every button works
- Every search returns results
- Every chart shows real data
- Every link navigates
- No dead ends

### Production-Quality UI
- Professional design
- Smooth animations
- Responsive layout
- Accessible (WCAG AA)
- Fast performance

### Self-Contained
- No internet needed
- No external APIs
- All data in database
- Runs on any laptop
- Easy to demo

---

## Timeline

**Week 1:**
- Days 1-2: Steps 1-3 (Foundation + Data)
- Days 3-4: Steps 4-5 (Backend + Frontend setup)
- Day 5: Step 6 (Layout)

**Week 2:**
- Days 1-2: Steps 7-9 (Home, Search, Projects)
- Days 3-4: Steps 10-11 (Clusters, Synergies)
- Day 5: Step 12 (Analytics)

**Week 3:**
- Days 1-2: Steps 13-14 (Map, Auth)
- Days 3-4: Step 15 (Polish)
- Day 5: Testing & demo prep

**Total:** 15 working days

---

## Execution Commands

**To execute:**
```
You: "do step 1"
Me: Creates complete project structure

You: "do step 2"
Me: Generates 900 realistic fake projects

You: "do steps 3-5"
Me: Deploys database, backend, and frontend

You: "do all remaining steps"
Me: Completes the entire simulation
```

**Each step:**
- Creates actual working code
- Includes realistic data
- Has validation criteria
- Builds on previous steps

---

## What You Can Show

**To stakeholders:**
- "This is the portal we're building"
- "Search works like this..."
- "Users can filter by clusters"
- "Analytics dashboard shows KPIs"
- "Map visualizes project locations"

**To developers:**
- "This is the target UX"
- "These are the features needed"
- "This is the data structure"
- "Here's the API design"

**To funders:**
- "Working prototype demonstrates feasibility"
- "All KPIs are trackable"
- "User interface is intuitive"
- "System is comprehensive"

---

## Current Status

- [ ] Step 1: Project foundation
- [ ] Step 2: Mock data generation
- [ ] Step 3: Database deployment
- [ ] Step 4: Backend API
- [ ] Step 5: Frontend setup
- [ ] Step 6: Layout & navigation
- [ ] Step 7: Home page
- [ ] Step 8: Search interface
- [ ] Step 9: Project pages
- [ ] Step 10: Clusters page
- [ ] Step 11: Synergies page
- [ ] Step 12: Analytics dashboard
- [ ] Step 13: Interactive map
- [ ] Step 14: Auth & admin
- [ ] Step 15: Polish & demo mode

---

## Ready to Build?

**Say one of:**
- `"do step 1"` - Start building
- `"do steps 1-5"` - Get the foundation running
- `"do all steps"` - Build complete simulation
- `"show me the data first"` - See mock data structure

**I have everything needed to execute each step immediately!** 🚀

Each step will create real, working code that you can run and demo.

Ready? 🎯
