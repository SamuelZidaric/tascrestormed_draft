# EU Projects Portal - Simulation Environment

**A self-contained, locally-runnable demonstration of an EU-funded projects portal with 950+ realistic projects**

## 🎯 What Is This?

This is a **complete simulation** of a searchable portal for EU-funded projects across multiple programmes (Horizon 2020, Horizon Europe, LIFE, Interreg, ERDF). It runs entirely on your local machine with realistic dummy data baked in - no backend server, no database, no API calls needed.

Perfect for:
- 🎨 **Demonstrations** to stakeholders
- 🧪 **Testing** UI/UX designs
- 📚 **Learning** about EU project data structures
- 🚀 **Prototyping** portal features

## ⚡ Quick Start (2 Steps)

### Step 1: Install Node.js (if you haven't already)

Download from: https://nodejs.org/ (LTS version recommended)

### Step 2: Run the Simulation

```bash
./run_simulation.sh
```

That's it! The portal will open automatically in your browser at **http://localhost:5173**

## 📦 What You Get

### Realistic Dummy Data

- **950 Projects** across all major EU programmes
  - Horizon 2020 (35%)
  - Horizon Europe (30%)
  - LIFE Programme (15%)
  - Interreg Mediterranean (10%)
  - ERDF (10%)

- **6,215 Partners/Beneficiaries** from 18 Mediterranean countries
- **1,470 Deliverables** (reports, software, datasets, toolkits, etc.)
- **541 Publications** in scientific journals

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
├── run_simulation.sh          ← START HERE! Run this script
│
├── react_mock_elazem/         ← React application (main portal)
│   ├── data/                  ← Realistic dummy data (auto-generated)
│   │   ├── projects.ts        ← 950 projects
│   │   ├── partners.ts        ← 6,215 partners
│   │   ├── deliverables.ts    ← 1,470 deliverables
│   │   ├── publications.ts    ← 541 publications
│   │   └── stats.ts           ← Summary statistics
│   ├── components/            ← React components
│   ├── utils/                 ← Utility functions
│   └── package.json           ← Dependencies
│
├── database/                  ← Database schemas & documentation
│   ├── schema_sqlite.sql      ← SQLite schema (if you want a DB)
│   ├── schema_enhanced.sql    ← MySQL schema (production)
│   ├── generate_react_data.py ← Script that generated the dummy data
│   ├── DATA_DICTIONARY.md     ← Complete field documentation
│   └── README.md              ← Database documentation
│
├── archive/                   ← Archived prototypes
│   └── html_mock_elazem/      ← Early HTML prototype (not used)
│
└── Documentation files
    ├── IMPLEMENTATION_PLAN.md
    ├── IMPLEMENTATION_ROADMAP.md
    ├── IMPLEMENTATION_STATUS.md
    └── Other planning docs
```

## 🚀 Usage

### Running the Portal

```bash
# Method 1: Use the run script (recommended)
./run_simulation.sh

# Method 2: Manual start
cd react_mock_elazem
npm install
npm run dev
```

The portal will be available at: **http://localhost:5173**

### Regenerating Data

Want different dummy data? Regenerate it:

```bash
cd database
python3 generate_react_data.py
```

This will create fresh realistic data with different project names, organizations, etc.

### Customizing Data

Edit `database/generate_react_data.py` to:
- Change `NUM_PROJECTS = 950` to generate more/fewer projects
- Modify country lists, organization types, keywords, etc.
- Adjust data generation logic

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
- Mission Pillars (pollution prevention, conservation, blue economy, etc.)
- Objectives (ecosystem protection, resource management, etc.)
- Clusters (blue biotech, renewable energy, fisheries, etc.)
- Technologies (AI/ML, IoT, GIS, remote sensing, etc.)
- Keywords (30+ searchable tags)

### Related Data
- Partners/Beneficiaries (3-10 per project)
- Deliverables (reports, software, toolkits)
- Publications (scientific papers)
- Geographic zones (Mediterranean countries)

## 🎨 Portal Features

### 1. Project Explorer

- **View modes**: Table view with sortable columns
- **Pagination**: Navigate through 950+ projects
- **Quick stats**: Visual charts showing distribution
- **Export**: Download to Excel for offline analysis

### 2. Advanced Filtering

Filter by any combination of:
- **Status**: Active, Completed, Planned, Suspended, Closed
- **Programme**: H2020, HE, LIFE, Interreg, ERDF
- **Mission Pillars**: Multiple selection
- **Objectives**: Multiple selection
- **Clusters**: Technology/sector focus
- **Technologies**: Digital tools used
- **Geographic Zones**: Countries involved

### 3. Search

- **Full-text search** across titles, descriptions, keywords
- **Real-time filtering** as you type
- **Highlighted results** showing match context

### 4. Project Details

Complete information page for each project:
- Full description and objectives
- All partners with roles and budgets
- Mission alignment and impact
- Technologies and innovations
- Geographic coverage
- Links to websites

### 5. Partner Directory

- Browse all 6,215+ organizations
- Filter by country and type
- See all projects per organization
- Export partner lists

### 6. Comparison Tool

- Select multiple projects
- Compare side-by-side
- See differences in budget, duration, approach, etc.

### 7. Analytics Dashboard

Charts showing:
- Projects by Mission Pillar
- Projects by Country
- Budget distribution
- Timeline visualization

## 🛠️ Technology Stack

- **Frontend**: React 18.2 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Export**: XLSX
- **Routing**: React Router

## 🔧 Development

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn

### Install Dependencies

```bash
cd react_mock_elazem
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Database Schemas

While this simulation doesn't use a database, comprehensive schemas are provided for future production deployment:

- **SQLite** (`database/schema_sqlite.sql`) - For lightweight deployment
- **MySQL** (`database/schema_enhanced.sql`) - For production scale

See [`database/README.md`](database/README.md) for details.

## 🎯 Project Context

This simulation is part of the **TASC-RestoreMed** project Task 4.1: "Identification, Categorisation and Clustering of Projects."

**Goals:**
- Identify 900+ relevant EU projects (✅ 950 in simulation)
- Create thematic clusters (✅ 7 clusters implemented)
- Document synergies between projects
- Provide searchable digital tool (✅ This portal)

## 📚 Documentation

- **[DATABASE_DICTIONARY.md](database/DATA_DICTIONARY.md)** - Complete field reference
- **[IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)** - Development roadmap
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Progress tracking

## 🤝 Contributing

This is a simulation/demo environment. To enhance it:

1. **Add Features**: Implement additional filters, visualizations, exports
2. **Improve UI**: Enhance design, add animations, improve mobile experience
3. **Generate More Data**: Expand data generation for more realistic scenarios
4. **Add Real Data**: Replace dummy data with actual EU project data

## ⚠️ Important Notes

### This is a SIMULATION

- ✅ All data is **fictional** and generated for demonstration
- ✅ Runs **100% locally** on your machine
- ✅ No backend server required
- ✅ No database installation needed
- ✅ No API keys or credentials needed
- ✅ No internet connection required (after first setup)

### Not Included

- ❌ User authentication
- ❌ Data persistence (changes don't save)
- ❌ Admin panel for editing data
- ❌ Real-time updates
- ❌ Multi-user collaboration

For production deployment, see `database/` for schema and API implementations.

## 🚀 Next Steps

After exploring the simulation:

1. **Collect Real Data** - Import actual EU project data
2. **Deploy Database** - Set up production database (MySQL/PostgreSQL)
3. **Build Backend API** - Create REST API for data access
4. **Add Authentication** - Implement user accounts and roles
5. **Enable Editing** - Allow authorized users to update data
6. **Add Synergies** - Implement synergy identification features
7. **Deploy to Web** - Host on production server

## 📞 Support

For questions about:
- **Running the simulation**: Check this README
- **Database structure**: See `database/DATA_DICTIONARY.md`
- **Development**: See `IMPLEMENTATION_PLAN.md`

## 📄 License

This simulation is part of the TASC-RestoreMed project (Grant Agreement 101217661).

---

## Quick Command Reference

```bash
# Run the simulation
./run_simulation.sh

# Regenerate dummy data
python3 database/generate_react_data.py

# Install dependencies manually
cd react_mock_elazem && npm install

# Start development server manually
cd react_mock_elazem && npm run dev

# Build for production
cd react_mock_elazem && npm run build
```

**Main URL**: http://localhost:5173

---

**Version**: 1.0 - Self-Contained Simulation
**Last Updated**: 2025-11-19
**Type**: Demonstration/Prototype Environment
