# EU Projects Portal - Simulation Environment

**Two complete, locally-runnable versions of an EU-funded projects portal with 950+ realistic projects**

## 🎯 What Is This?

This repository contains **two complete implementations** of a searchable portal for EU-funded projects across multiple programmes (Horizon 2020, Horizon Europe, LIFE, Interreg, ERDF). Both share the same realistic dummy data and run entirely on your local machine.

Perfect for:
- 🎨 **Demonstrations** to stakeholders
- 🧪 **Testing** UI/UX designs
- 📚 **Learning** about EU project data structures
- 🚀 **Prototyping** portal features

## ⚡ Quick Start (One Command!)

```bash
./start_portal.sh
```

This launches an interactive menu where you choose:
- **Option 1:** HTML Version (simple, no build needed)
- **Option 2:** React Version (modern, full-featured)

## 🎨 Two Versions Available

### 1. 📄 HTML Version (Pure HTML/JS/CSS)

**Best for:** Quick demos, simple deployment, no build tools

✅ Pure HTML/JavaScript/CSS
✅ No build step required
✅ No dependencies to install
✅ Opens directly in browser
✅ Works with Python's built-in web server

**Start:** `./start_portal.sh` → Choose option 1
**URL:** http://localhost:8000

### 2. ⚛️ React Version (Modern Stack)

**Best for:** Development, advanced features, better UX

✅ React 18 + TypeScript
✅ Vite for fast hot reload
✅ Tailwind CSS styling
✅ Advanced component structure
✅ Better performance

**Start:** `./start_portal.sh` → Choose option 2
**URL:** http://localhost:5173

### Both Versions Share:

- ✅ **Same 950 projects** with identical data
- ✅ **Same 6,000+ partners**
- ✅ **Same 1,500+ deliverables**
- ✅ **Same 500+ publications**
- ✅ **Same features** (search, filter, export, compare)

## 📦 What You Get

### Realistic Dummy Data

- **950 Projects** across all major EU programmes
  - Horizon 2020 (35%)
  - Horizon Europe (30%)
  - LIFE Programme (15%)
  - Interreg Mediterranean (10%)
  - ERDF (10%)

- **6,000+ Partners/Beneficiaries** from 18 Mediterranean countries
- **1,500+ Deliverables** (reports, software, datasets, toolkits)
- **500+ Publications** in scientific journals

### Full Portal Features

✅ **Project Browser** - Browse all 950+ projects with pagination
✅ **Advanced Search** - Full-text search across titles, descriptions
✅ **Multi-Filter System** - Filter by status, programme, country, year, mission pillars, objectives, clusters, technologies
✅ **Project Details** - Complete information for each project
✅ **Partner Directory** - Browse all organizations
✅ **Export to Excel** - Export projects and partners
✅ **Comparison Tool** - Compare multiple projects side-by-side
✅ **Analytics Dashboard** - Charts showing project distribution
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 🗂️ Repository Structure

```
tascrestormed_draft/
│
├── start_portal.sh            ← START HERE! Unified launcher
├── run_simulation.sh          ← Alternate: Direct React launcher
│
├── html_mock_elazem/          ← HTML/JS version
│   ├── index.html             ← Projects page
│   ├── partners.html          ← Partners page
│   ├── dashboard.html         ← Dashboard
│   ├── projects.js            ← 950 projects data
│   ├── partners.js            ← 6,000+ partners data
│   ├── deliverables.js        ← 1,500+ deliverables
│   ├── publications.js        ← 500+ publications
│   └── script.js              ← Main JavaScript logic
│
├── react_mock_elazem/         ← React/TypeScript version
│   ├── data/                  ← Same data in TypeScript format
│   │   ├── projects.ts
│   │   ├── partners.ts
│   │   ├── deliverables.ts
│   │   ├── publications.ts
│   │   └── stats.ts
│   ├── components/            ← React components
│   ├── utils/                 ← Utilities
│   └── package.json           ← Dependencies
│
├── database/                  ← Database schemas & tools
│   ├── generate_react_data.py ← Data generator (creates both JS & TS)
│   ├── schema_sqlite.sql      ← SQLite schema
│   ├── schema_enhanced.sql    ← MySQL schema
│   └── DATA_DICTIONARY.md     ← Field documentation
│
└── Documentation/             ← Planning docs
    ├── IMPLEMENTATION_PLAN.md
    └── IMPLEMENTATION_STATUS.md
```

## 🚀 Detailed Usage

### Option 1: Unified Launcher (Recommended)

```bash
./start_portal.sh
```

Choose your preferred version from the menu.

### Option 2: Direct Launch

#### HTML Version
```bash
cd html_mock_elazem
python3 -m http.server 8000
# Open http://localhost:8000
```

#### React Version
```bash
cd react_mock_elazem
npm install    # First time only
npm run dev
# Open http://localhost:5173
```

## 🔄 Regenerating Data

Want fresh dummy data with different names and organizations?

```bash
python3 database/generate_react_data.py
```

This generates **both** JavaScript (for HTML) and TypeScript (for React) files with:
- New random project names and acronyms
- Different organizations and partners
- Fresh budgets and dates
- All new deliverables and publications

**Same realistic patterns, different data!**

### Customizing Data Generation

Edit `database/generate_react_data.py`:

```python
NUM_PROJECTS = 950          # Change number of projects
COUNTRIES = [...]           # Modify country list
KEYWORDS = [...]            # Add/remove keywords
```

Then regenerate:
```bash
python3 database/generate_react_data.py
```

## 📊 Data Structure

Each project includes:

### Basic Information
- Project ID, Acronym, Title
- Programme, Type of Action
- Status, Dates, Budget
- Lead Partner, Country, City

### Classifications
- **Mission Pillars:** Pollution prevention, conservation, blue economy, climate adaptation, circular economy
- **Objectives:** Ecosystem protection, resource management, climate mitigation, biodiversity conservation
- **Clusters:** Blue biotech, renewable energy, fisheries, tourism, conservation
- **Technologies:** AI/ML, IoT, GIS, remote sensing, drones, blockchain
- **Keywords:** 30+ searchable tags

### Related Data
- **Partners:** 3-10 organizations per project with roles and budgets
- **Deliverables:** Reports, software, toolkits, datasets
- **Publications:** Scientific papers with DOIs and journals
- **Geographic Zones:** Mediterranean countries coverage

## 🎨 Portal Features Comparison

| Feature | HTML Version | React Version |
|---------|-------------|---------------|
| Project Browser | ✅ | ✅ |
| Advanced Filtering | ✅ | ✅ |
| Full-text Search | ✅ | ✅ |
| Project Details | ✅ | ✅ |
| Partner Directory | ✅ | ✅ |
| Export to Excel | ✅ | ✅ |
| Project Comparison | ✅ | ✅ |
| Analytics Dashboard | ✅ | ✅ |
| Responsive Design | ✅ | ✅ |
| Hot Reload | ❌ | ✅ |
| TypeScript | ❌ | ✅ |
| Component Reusability | Limited | ✅ |
| Build Optimization | ❌ | ✅ |
| Setup Time | Instant | ~1 min |

## 🛠️ Technology Stack

### HTML Version
- **Frontend:** Pure HTML5
- **Scripting:** Vanilla JavaScript (ES6+)
- **Styling:** Tailwind CSS (CDN)
- **Charts:** Custom SVG/Canvas
- **Export:** XLSX library (CDN)
- **Server:** Python http.server

### React Version
- **Frontend:** React 18.2 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Data Export:** XLSX
- **Routing:** React Router

## 📝 Database Schemas

While this simulation doesn't require a database, comprehensive schemas are provided for production deployment:

- **SQLite** (`database/schema_sqlite.sql`) - Lightweight deployment
- **MySQL** (`database/schema_enhanced.sql`) - Production scale
- **API Server** (`database/api_server.py`) - Flask REST API (optional)

See [`database/README.md`](database/README.md) for details.

## 🔧 Development

### Prerequisites

**For HTML version:**
- Python 3.x (for local web server)
- Modern web browser

**For React version:**
- Node.js 16+ (LTS recommended)
- npm or yarn

### Development Workflow

**HTML:**
```bash
# Edit files in html_mock_elazem/
# Refresh browser to see changes
```

**React:**
```bash
cd react_mock_elazem
npm run dev
# Changes hot-reload automatically
```

### Building for Production

**HTML:**
Already production-ready! Just deploy the `html_mock_elazem/` folder to any web server.

**React:**
```bash
cd react_mock_elazem
npm run build
# Outputs to dist/ folder
```

## 🎯 Project Context

This simulation is part of the **TASC-RestoreMed** project Task 4.1: "Identification, Categorisation and Clustering of Projects."

**Goals:**
- ✅ Identify 900+ relevant EU projects (950 in simulation)
- ✅ Create thematic clusters (7 clusters implemented)
- ✅ Document synergies between projects
- ✅ Provide searchable digital tool (Both versions available)

## 📚 Documentation

- **[DATABASE_DICTIONARY.md](database/DATA_DICTIONARY.md)** - Complete field reference
- **[database/README.md](database/README.md)** - Database documentation
- **[database/SIMULATION_README.md](database/SIMULATION_README.md)** - API simulation docs
- **[IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)** - Development roadmap
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Progress tracking

## ⚠️ Important Notes

### This is a SIMULATION

- ✅ All data is **fictional** and generated for demonstration
- ✅ Runs **100% locally** on your machine
- ✅ No backend server required (for the simulation)
- ✅ No database installation needed
- ✅ No API keys or credentials needed
- ✅ No internet connection required (after first setup)

### Not Included

- ❌ User authentication
- ❌ Data persistence (changes don't save)
- ❌ Admin panel for editing data
- ❌ Real-time updates
- ❌ Multi-user collaboration

For production deployment, see `database/` for schemas and API implementations.

## 🚀 Next Steps

After exploring the simulation:

1. **Collect Real Data** - Import actual EU project data
2. **Deploy Database** - Set up production database (MySQL/PostgreSQL)
3. **Build Backend API** - Create REST API for data access
4. **Add Authentication** - Implement user accounts and roles
5. **Enable Editing** - Allow authorized users to update data
6. **Add Synergies** - Implement synergy identification features
7. **Deploy to Web** - Host on production server

## 🤝 Contributing

This is a simulation/demo environment. To enhance it:

1. **Add Features:** Implement additional filters, visualizations, exports
2. **Improve UI:** Enhance design, add animations, improve mobile experience
3. **Generate More Data:** Expand data generation for more realistic scenarios
4. **Add Real Data:** Replace dummy data with actual EU project data

## 📞 Support

For questions about:
- **Running the simulation:** Check this README
- **Database structure:** See `database/DATA_DICTIONARY.md`
- **HTML version:** Review `html_mock_elazem/script.js`
- **React version:** See `react_mock_elazem/components/`
- **Development:** See `IMPLEMENTATION_PLAN.md`

## 📄 License

This simulation is part of the TASC-RestoreMed project (Grant Agreement 101217661).

---

## Quick Command Reference

```bash
# Unified launcher (choose version interactively)
./start_portal.sh

# Direct launch - HTML version
cd html_mock_elazem && python3 -m http.server 8000

# Direct launch - React version
cd react_mock_elazem && npm install && npm run dev

# Regenerate all dummy data (both JS and TS)
python3 database/generate_react_data.py

# Build React for production
cd react_mock_elazem && npm run build
```

### URLs

- **HTML Version:** http://localhost:8000
- **React Version:** http://localhost:5173

---

## Which Version Should I Use?

### Choose HTML if you want:
- ✅ Fastest setup (no npm install)
- ✅ Simple deployment
- ✅ No build step
- ✅ Easy to understand/modify
- ✅ Works anywhere Python is available

### Choose React if you want:
- ✅ Modern development experience
- ✅ Hot reload during development
- ✅ Better code organization
- ✅ TypeScript safety
- ✅ Optimized production builds
- ✅ Component-based architecture

**Can't decide? Try both!** They have the same data and features.

---

**Version:** 2.0 - Dual Implementation Simulation
**Last Updated:** 2025-11-19
**Type:** Demonstration/Prototype Environment with HTML & React versions
