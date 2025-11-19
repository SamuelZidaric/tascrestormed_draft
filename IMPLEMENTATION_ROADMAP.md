# TASC-RestoreMed Database Project - Complete Implementation Roadmap

**Project:** TASC-RestoreMed Task 4.1 - Interactive Dashboard
**Target:** Deploy a complete database-backed web application
**Timeline:** 12 weeks from start to production
**Team Roles:** Data Engineer, Backend Developer, Frontend Developer, Data Scientist

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Phase 1: Foundation Setup (Week 1-2)](#phase-1-foundation-setup-week-1-2)
5. [Phase 2: Backend API Development (Week 3-4)](#phase-2-backend-api-development-week-3-4)
6. [Phase 3: Data Migration & ETL (Week 3-5)](#phase-3-data-migration--etl-week-3-5)
7. [Phase 4: Frontend Dashboard (Week 5-8)](#phase-4-frontend-dashboard-week-5-8)
8. [Phase 5: Advanced Features (Week 9-10)](#phase-5-advanced-features-week-9-10)
9. [Phase 6: Testing & QA (Week 11)](#phase-6-testing--qa-week-11)
10. [Phase 7: Deployment & Launch (Week 12)](#phase-7-deployment--launch-week-12)
11. [Post-Launch Operations](#post-launch-operations)

---

## Project Overview

### What We're Building

A full-stack web application consisting of:
- **Database Layer:** MySQL database (already designed)
- **Backend API:** RESTful API server
- **Frontend Dashboard:** Interactive web interface
- **Data Pipeline:** ETL processes for importing 841 existing projects
- **Analytics:** Usage tracking and KPI monitoring

### Success Criteria

- ✓ Database deployed with 900+ projects
- ✓ API serving all CRUD operations
- ✓ Dashboard with multi-criteria search
- ✓ 10+ documented synergies
- ✓ User authentication & role-based access
- ✓ Analytics & KPI tracking

---

## Technology Stack

### Recommended Stack

#### Backend
- **Language:** Python 3.10+ or Node.js 18+
- **Framework:** FastAPI (Python) or Express.js (Node.js)
- **ORM:** SQLAlchemy (Python) or Sequelize (Node.js)
- **Database:** MySQL 8.0+
- **Auth:** JWT tokens with bcrypt password hashing
- **Validation:** Pydantic (Python) or Joi (Node.js)

#### Frontend
- **Framework:** React 18+ with TypeScript
- **UI Library:** Material-UI (MUI) or Ant Design
- **State Management:** React Query + Context API
- **Routing:** React Router v6
- **Charts:** Recharts or Chart.js
- **Maps:** Leaflet for geographic visualization
- **Forms:** React Hook Form + Zod validation

#### DevOps & Tools
- **Version Control:** Git + GitHub
- **API Documentation:** OpenAPI/Swagger
- **Testing:** pytest/Jest + Cypress
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry for error tracking

#### Data Processing
- **ETL:** Python pandas for data migration
- **Validation:** Great Expectations or custom validators
- **File Formats:** CSV, JSON, Excel (xlrd/openpyxl)

---

## Project Structure

```
tasc-restoremed/
│
├── database/
│   ├── schema/
│   │   ├── trm_db_schema.sql                    # Main schema (exists)
│   │   └── migrations/
│   │       ├── 001_initial_schema.sql
│   │       └── 002_add_indexes.sql
│   ├── seeds/
│   │   ├── reference_data.sql                   # Lookup tables
│   │   └── test_data.sql                        # Sample projects
│   └── scripts/
│       ├── setup_database.sh
│       └── backup_database.sh
│
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── main.py                          # FastAPI app entry
│   │   │   ├── config.py                        # Configuration
│   │   │   ├── dependencies.py                  # Dependency injection
│   │   │   └── middleware.py                    # CORS, logging, etc.
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                          # SQLAlchemy base
│   │   │   ├── project.py                       # Project model
│   │   │   ├── organization.py
│   │   │   ├── cluster.py
│   │   │   ├── synergy.py
│   │   │   ├── user.py
│   │   │   └── search_log.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── project.py                       # Pydantic schemas
│   │   │   ├── organization.py
│   │   │   ├── cluster.py
│   │   │   ├── synergy.py
│   │   │   ├── user.py
│   │   │   └── search.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── projects.py                      # CRUD endpoints
│   │   │   ├── organizations.py
│   │   │   ├── clusters.py
│   │   │   ├── synergies.py
│   │   │   ├── search.py                        # Search endpoints
│   │   │   ├── analytics.py                     # KPI endpoints
│   │   │   └── auth.py                          # Authentication
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── project_service.py               # Business logic
│   │   │   ├── search_service.py
│   │   │   ├── synergy_service.py
│   │   │   └── auth_service.py
│   │   ├── repositories/
│   │   │   ├── __init__.py
│   │   │   ├── project_repository.py            # Data access
│   │   │   ├── organization_repository.py
│   │   │   └── user_repository.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── security.py                      # Password hashing
│   │       ├── validators.py
│   │       └── helpers.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py                          # Test fixtures
│   │   ├── test_projects.py
│   │   ├── test_search.py
│   │   └── test_auth.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── etl/
│   ├── scripts/
│   │   ├── extract_portfolio_2023.py            # Extract from source
│   │   ├── transform_projects.py                # Clean & transform
│   │   ├── load_to_database.py                  # Load to MySQL
│   │   └── validate_data.py                     # Quality checks
│   ├── data/
│   │   ├── raw/
│   │   │   └── portfolio_analysis_2023.xlsx     # Source data
│   │   ├── processed/
│   │   │   ├── projects.csv
│   │   │   ├── organizations.csv
│   │   │   └── keywords.csv
│   │   └── mappings/
│   │       ├── cluster_mapping.json             # Manual mappings
│   │       └── keyword_taxonomy.json
│   ├── notebooks/
│   │   ├── 01_data_exploration.ipynb
│   │   ├── 02_data_cleaning.ipynb
│   │   └── 03_cluster_analysis.ipynb
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │       └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── search/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── SearchFilters.tsx
│   │   │   │   ├── AdvancedSearch.tsx
│   │   │   │   └── SearchResults.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── ProjectList.tsx
│   │   │   │   ├── ProjectDetail.tsx
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   └── ProjectMap.tsx
│   │   │   ├── clusters/
│   │   │   │   ├── ClusterView.tsx
│   │   │   │   ├── ClusterFilter.tsx
│   │   │   │   └── ClusterCard.tsx
│   │   │   ├── synergies/
│   │   │   │   ├── SynergyList.tsx
│   │   │   │   ├── SynergyDetail.tsx
│   │   │   │   ├── SynergyForm.tsx
│   │   │   │   └── SynergyNetwork.tsx
│   │   │   ├── analytics/
│   │   │   │   ├── KPIDashboard.tsx
│   │   │   │   ├── ProjectStats.tsx
│   │   │   │   ├── UsageAnalytics.tsx
│   │   │   │   └── Charts/
│   │   │   │       ├── BudgetChart.tsx
│   │   │   │       ├── TimelineChart.tsx
│   │   │   │       └── RegionChart.tsx
│   │   │   └── auth/
│   │   │       ├── LoginForm.tsx
│   │   │       ├── RegisterForm.tsx
│   │   │       └── UserProfile.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── SearchPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── ProjectDetailPage.tsx
│   │   │   ├── ClustersPage.tsx
│   │   │   ├── SynergiesPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── hooks/
│   │   │   ├── useProjects.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useClusters.ts
│   │   │   ├── useSynergies.ts
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   ├── api.ts                           # Axios instance
│   │   │   ├── projectService.ts
│   │   │   ├── searchService.ts
│   │   │   ├── clusterService.ts
│   │   │   ├── synergyService.ts
│   │   │   └── authService.ts
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── types/
│   │   │   ├── project.ts
│   │   │   ├── organization.ts
│   │   │   ├── cluster.ts
│   │   │   ├── synergy.ts
│   │   │   └── user.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   ├── styles/
│   │   │   ├── theme.ts
│   │   │   └── global.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── docs/
│   ├── api/
│   │   └── openapi.yaml                         # API specification
│   ├── user-guide/
│   │   ├── getting-started.md
│   │   ├── search-guide.md
│   │   └── admin-guide.md
│   └── developer/
│       ├── setup.md
│       ├── architecture.md
│       └── contributing.md
│
├── tests/
│   ├── e2e/
│   │   ├── search.spec.ts
│   │   ├── projects.spec.ts
│   │   └── auth.spec.ts
│   └── integration/
│       └── api.test.ts
│
├── deployment/
│   ├── docker-compose.prod.yml
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── ssl/
│   ├── kubernetes/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   └── scripts/
│       ├── deploy.sh
│       └── rollback.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── test.yml
│
├── .env.example
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## Phase 1: Foundation Setup (Week 1-2)

### 1.1 Environment Setup

**Tasks:**
- Set up development environment
- Initialize Git repository
- Configure project structure
- Set up database

**Files to Create:**

```bash
# 1. Create main project directory
mkdir -p tasc-restoremed
cd tasc-restoremed

# 2. Initialize Git
git init
```

**`.gitignore`**
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
.venv
pip-log.txt
pip-delete-this-directory.txt

# Node
node_modules/
dist/
build/
.next/
.cache/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.*.local

# Database
*.sql.backup
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-*

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.coverage
*.cover
htmlcov/

# Logs
logs/
*.log
```

**`README.md`**
```markdown
# TASC-RestoreMed Project Dashboard

Interactive dashboard for project identification, categorization, and clustering.

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.10+
- MySQL 8.0+

### Development Setup

1. Clone repository
2. Copy `.env.example` to `.env`
3. Run `docker-compose up`
4. Access dashboard at http://localhost:3000

## Documentation

- [User Guide](docs/user-guide/getting-started.md)
- [API Documentation](docs/api/openapi.yaml)
- [Developer Guide](docs/developer/setup.md)
```

**`.env.example`**
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tasc_restoremed
DB_USER=root
DB_PASSWORD=your_password_here

# Backend API
API_PORT=8000
API_HOST=0.0.0.0
SECRET_KEY=your-secret-key-here-change-in-production
JWT_EXPIRATION=3600

# Frontend
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=TASC-RestoreMed Dashboard

# Environment
NODE_ENV=development
PYTHON_ENV=development
```

### 1.2 Database Setup

**Tasks:**
- Deploy MySQL database
- Run schema creation script
- Populate reference data
- Create admin user

**Files to Create:**

**`database/scripts/setup_database.sh`**
```bash
#!/bin/bash

echo "Setting up TASC-RestoreMed Database..."

# Load environment variables
source .env

# Create database
mysql -u$DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run schema
mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME < database/schema/trm_db_schema.sql

# Verify tables
echo "Verifying tables..."
mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "SHOW TABLES;"

echo "Database setup complete!"
```

**`database/seeds/admin_user.sql`**
```sql
-- Create admin user
-- Password: Admin@2025 (CHANGE THIS IN PRODUCTION!)
INSERT INTO users (username, email, password_hash, full_name, organization, role_id, is_active)
VALUES (
    'admin',
    'admin@tasc-restoremed.eu',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMesJU/8N.FW1h7.5R0M8DL3Ni',
    'System Administrator',
    'TASC-RestoreMed Consortium',
    1,
    TRUE
);
```

**Action Items:**
- [ ] Install MySQL 8.0
- [ ] Copy trm_db_schema.sql to database/schema/
- [ ] Run setup script
- [ ] Verify 19 tables created
- [ ] Create admin user
- [ ] Test database connection

---

## Phase 2: Backend API Development (Week 3-4)

### 2.1 Backend Foundation

**Tasks:**
- Set up FastAPI project
- Configure database connection
- Create SQLAlchemy models
- Implement authentication

**Files to Create:**

**`backend/requirements.txt`**
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
pymysql==1.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
alembic==1.13.0
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
```

**`backend/src/api/main.py`**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import projects, organizations, clusters, synergies, search, analytics, auth
from .config import settings

app = FastAPI(
    title="TASC-RestoreMed API",
    description="API for Project Identification and Clustering Dashboard",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(organizations.router, prefix="/api/organizations", tags=["Organizations"])
app.include_router(clusters.router, prefix="/api/clusters", tags=["Clusters"])
app.include_router(synergies.router, prefix="/api/synergies", tags=["Synergies"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "TASC-RestoreMed API v1.0", "status": "operational"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

**`backend/src/api/config.py`**
```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DB_HOST: str
    DB_PORT: int = 3306
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    # Security
    SECRET_KEY: str
    JWT_EXPIRATION: int = 3600
    ALGORITHM: str = "HS256"

    # API
    API_PORT: int = 8000
    API_HOST: str = "0.0.0.0"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Environment
    PYTHON_ENV: str = "development"

    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    class Config:
        env_file = ".env"

settings = Settings()
```

**`backend/src/models/project.py`**
```python
from sqlalchemy import Column, Integer, String, Text, Date, DECIMAL, Boolean, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
import enum

class ProjectStatus(str, enum.Enum):
    PLANNED = "Planned"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    SUSPENDED = "Suspended"
    CLOSED = "Closed"

class DeploymentStage(str, enum.Enum):
    CONCEPT = "Concept"
    RESEARCH = "Research"
    PILOT = "Pilot"
    DEMONSTRATION = "Demonstration"
    DEPLOYED = "Deployed"
    SCALED = "Scaled"

class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, autoincrement=True)
    project_title = Column(String(1000), nullable=False)
    project_acronym = Column(String(100))
    grant_agreement_number = Column(String(50), unique=True)

    # Funding
    funding_program_id = Column(Integer, ForeignKey("funding_programs.program_id"))
    total_budget = Column(DECIMAL(15, 2))
    currency = Column(String(3), default="EUR")

    # Timeline
    start_date = Column(Date)
    end_date = Column(Date)
    duration_months = Column(Integer)
    project_status = Column(Enum(ProjectStatus), default=ProjectStatus.ACTIVE)

    # Description
    abstract = Column(Text)
    objectives = Column(Text)
    expected_outcomes = Column(Text)

    # Classification
    solution_type_id = Column(Integer, ForeignKey("solution_types.solution_type_id"))

    # Coordinator
    coordinator_organization_id = Column(Integer, ForeignKey("organizations.organization_id"))
    coordinator_contact_name = Column(String(255))
    coordinator_contact_email = Column(String(255))

    # Links
    website = Column(String(500))
    cordis_link = Column(String(500))
    documentation_url = Column(String(500))

    # Mission alignment
    mission_alignment = Column(Text)
    is_community_led = Column(Boolean, default=False)
    community_description = Column(Text)
    deployment_stage = Column(Enum(DeploymentStage), default=DeploymentStage.RESEARCH)

    # Metadata
    data_source = Column(String(100), default="Portfolio Analysis 2023")
    verified = Column(Boolean, default=False)
    created_by = Column(Integer, ForeignKey("users.user_id"))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

    # Relationships
    funding_program = relationship("FundingProgram", back_populates="projects")
    solution_type = relationship("SolutionType", back_populates="projects")
    coordinator = relationship("Organization", back_populates="coordinated_projects")
    organizations = relationship("ProjectOrganization", back_populates="project")
    regions = relationship("ProjectRegion", back_populates="project")
    clusters = relationship("ProjectCluster", back_populates="project")
    keywords = relationship("ProjectKeyword", back_populates="project")
    synergies = relationship("SynergyProject", back_populates="project")
```

### 2.2 API Endpoints

**Files to Create:**

**`backend/src/routes/projects.py`**
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db, get_current_user
from ..schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse, ProjectList
from ..services.project_service import ProjectService

router = APIRouter()

@router.get("/", response_model=ProjectList)
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000),
    status: Optional[str] = None,
    cluster_id: Optional[int] = None,
    region_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get list of projects with filters"""
    service = ProjectService(db)
    projects, total = service.get_projects(
        skip=skip,
        limit=limit,
        status=status,
        cluster_id=cluster_id,
        region_id=region_id
    )
    return {"projects": projects, "total": total, "skip": skip, "limit": limit}

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get single project by ID"""
    service = ProjectService(db)
    project = service.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/", response_model=ProjectResponse, status_code=201)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create new project (requires authentication)"""
    service = ProjectService(db)
    return service.create_project(project, current_user.user_id)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Update project (requires authentication)"""
    service = ProjectService(db)
    updated = service.update_project(project_id, project, current_user.user_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated

@router.delete("/{project_id}", status_code=204)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete project (requires admin role)"""
    if not current_user.can_delete:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    service = ProjectService(db)
    service.delete_project(project_id)
```

**`backend/src/routes/search.py`**
```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from ..schemas.search import SearchRequest, SearchResponse
from ..services.search_service import SearchService

router = APIRouter()

@router.post("/", response_model=SearchResponse)
def search_projects(
    request: SearchRequest,
    db: Session = Depends(get_db)
):
    """Advanced search with multiple filters"""
    service = SearchService(db)
    results = service.search_projects(request)

    # Log search for analytics
    service.log_search(request, len(results))

    return {"results": results, "count": len(results), "query": request}

@router.get("/fulltext")
def fulltext_search(
    query: str = Query(..., min_length=3),
    limit: int = Query(20, le=100),
    db: Session = Depends(get_db)
):
    """Full-text search across project titles and abstracts"""
    service = SearchService(db)
    return service.fulltext_search(query, limit)

@router.get("/keywords")
def search_by_keywords(
    keywords: List[str] = Query(...),
    match_all: bool = False,
    db: Session = Depends(get_db)
):
    """Search projects by keywords"""
    service = SearchService(db)
    return service.search_by_keywords(keywords, match_all)
```

**`backend/src/routes/analytics.py`**
```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date, timedelta
from ..dependencies import get_db, get_current_admin_user
from ..services.analytics_service import AnalyticsService

router = APIRouter()

@router.get("/kpis")
def get_kpis(db: Session = Depends(get_db)):
    """Get all KPI metrics"""
    service = AnalyticsService(db)
    return {
        "total_projects": service.get_total_projects(),
        "active_clusters": service.get_active_clusters(),
        "documented_synergies": service.get_documented_synergies(),
        "weekly_users": service.get_weekly_users(),
        "projects_by_status": service.get_projects_by_status(),
        "projects_by_cluster": service.get_projects_by_cluster(),
        "projects_by_region": service.get_projects_by_region()
    }

@router.get("/usage")
def get_usage_stats(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """Get usage statistics (admin only)"""
    service = AnalyticsService(db)
    return service.get_usage_stats(days)

@router.get("/budget-analysis")
def get_budget_analysis(db: Session = Depends(get_db)):
    """Get budget distribution analysis"""
    service = AnalyticsService(db)
    return {
        "by_cluster": service.get_budget_by_cluster(),
        "by_region": service.get_budget_by_region(),
        "by_year": service.get_budget_by_year()
    }
```

**Action Items:**
- [ ] Create all model files
- [ ] Create all schema (Pydantic) files
- [ ] Implement service layer logic
- [ ] Create all route files
- [ ] Test each endpoint with Postman/Thunder Client
- [ ] Generate OpenAPI documentation

---

## Phase 3: Data Migration & ETL (Week 3-5)

### 3.1 Data Extraction

**Tasks:**
- Obtain Portfolio Analysis 2023 data
- Analyze data structure
- Map fields to database schema

**Files to Create:**

**`etl/requirements.txt`**
```
pandas==2.1.4
numpy==1.26.2
openpyxl==3.1.2
sqlalchemy==2.0.23
pymysql==1.1.0
python-dotenv==1.0.0
great-expectations==0.18.8
tqdm==4.66.1
jupyter==1.0.0
```

**`etl/scripts/extract_portfolio_2023.py`**
```python
import pandas as pd
import json
from pathlib import Path

def extract_projects_from_excel(file_path: str) -> pd.DataFrame:
    """
    Extract projects from Portfolio Analysis 2023 Excel file
    """
    # Read Excel file
    df = pd.read_excel(file_path, sheet_name='Projects')

    print(f"Extracted {len(df)} projects")
    print(f"Columns: {df.columns.tolist()}")

    # Save raw data
    output_path = Path("etl/data/raw/projects_raw.csv")
    df.to_csv(output_path, index=False)

    return df

def extract_organizations(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extract unique organizations from project data
    """
    # Assuming coordinator and partner columns exist
    coordinators = df[['Coordinator_Name', 'Coordinator_Country']].drop_duplicates()
    coordinators.columns = ['organization_name', 'country']

    # Add organization type (can be refined)
    coordinators['organization_type'] = 'Research'

    print(f"Extracted {len(coordinators)} organizations")

    output_path = Path("etl/data/processed/organizations.csv")
    coordinators.to_csv(output_path, index=False)

    return coordinators

def main():
    # Path to source data
    source_file = "etl/data/raw/portfolio_analysis_2023.xlsx"

    # Extract projects
    projects_df = extract_projects_from_excel(source_file)

    # Extract organizations
    orgs_df = extract_organizations(projects_df)

    # Generate summary report
    report = {
        "extraction_date": pd.Timestamp.now().isoformat(),
        "total_projects": len(projects_df),
        "total_organizations": len(orgs_df),
        "columns": projects_df.columns.tolist()
    }

    with open("etl/data/raw/extraction_report.json", 'w') as f:
        json.dump(report, f, indent=2)

    print("Extraction complete!")

if __name__ == "__main__":
    main()
```

### 3.2 Data Transformation

**`etl/scripts/transform_projects.py`**
```python
import pandas as pd
import numpy as np
from datetime import datetime
import re

def clean_project_title(title: str) -> str:
    """Clean and normalize project titles"""
    if pd.isna(title):
        return None
    title = str(title).strip()
    title = re.sub(r'\s+', ' ', title)  # Remove extra spaces
    return title[:1000]  # Limit to 1000 chars

def parse_date(date_str) -> str:
    """Parse various date formats to YYYY-MM-DD"""
    if pd.isna(date_str):
        return None
    try:
        dt = pd.to_datetime(date_str)
        return dt.strftime('%Y-%m-%d')
    except:
        return None

def calculate_duration_months(start_date, end_date) -> int:
    """Calculate duration in months"""
    if pd.isna(start_date) or pd.isna(end_date):
        return None
    try:
        start = pd.to_datetime(start_date)
        end = pd.to_datetime(end_date)
        return round((end - start).days / 30.44)
    except:
        return None

def transform_projects(input_file: str, output_file: str):
    """
    Transform raw project data to match database schema
    """
    df = pd.read_csv(input_file)

    # Create transformed dataframe
    transformed = pd.DataFrame()

    # Basic information (map source columns to target)
    transformed['project_title'] = df['Project_Title'].apply(clean_project_title)
    transformed['project_acronym'] = df['Project_Acronym'].str.strip()
    transformed['grant_agreement_number'] = df['Grant_Number'].astype(str).str.strip()

    # Funding
    transformed['funding_program'] = df['Program'].map({
        'H2020': 'H2020',
        'Horizon 2020': 'H2020',
        'Horizon Europe': 'HE',
        'HE': 'HE',
        'LIFE': 'LIFE'
    })
    transformed['total_budget'] = pd.to_numeric(df['Budget'], errors='coerce')
    transformed['currency'] = 'EUR'

    # Timeline
    transformed['start_date'] = df['Start_Date'].apply(parse_date)
    transformed['end_date'] = df['End_Date'].apply(parse_date)
    transformed['duration_months'] = df.apply(
        lambda row: calculate_duration_months(row['Start_Date'], row['End_Date']),
        axis=1
    )

    # Status (derive from dates)
    def get_status(end_date):
        if pd.isna(end_date):
            return 'Active'
        end = pd.to_datetime(end_date)
        if end < datetime.now():
            return 'Completed'
        return 'Active'

    transformed['project_status'] = df['End_Date'].apply(get_status)

    # Description
    transformed['abstract'] = df['Abstract'].str.strip()
    transformed['objectives'] = df['Objectives'].fillna('')

    # Coordinator
    transformed['coordinator_name'] = df['Coordinator_Name'].str.strip()
    transformed['coordinator_country'] = df['Coordinator_Country'].str.strip()
    transformed['coordinator_email'] = df.get('Contact_Email', '').str.strip()

    # Links
    transformed['website'] = df.get('Website', '')
    transformed['cordis_link'] = 'https://cordis.europa.eu/project/id/' + transformed['grant_agreement_number']

    # Metadata
    transformed['data_source'] = 'Portfolio Analysis 2023'
    transformed['verified'] = False

    # Remove rows with missing critical data
    transformed = transformed.dropna(subset=['project_title', 'grant_agreement_number'])

    # Save transformed data
    transformed.to_csv(output_file, index=False)

    print(f"Transformed {len(transformed)} projects")
    print(f"Columns: {transformed.columns.tolist()}")

    # Generate data quality report
    report = {
        "total_records": len(transformed),
        "missing_dates": transformed['start_date'].isna().sum(),
        "missing_budgets": transformed['total_budget'].isna().sum(),
        "missing_abstracts": transformed['abstract'].isna().sum(),
        "status_distribution": transformed['project_status'].value_counts().to_dict()
    }

    import json
    with open("etl/data/processed/transform_report.json", 'w') as f:
        json.dump(report, f, indent=2)

if __name__ == "__main__":
    transform_projects(
        "etl/data/raw/projects_raw.csv",
        "etl/data/processed/projects_clean.csv"
    )
```

### 3.3 Data Loading

**`etl/scripts/load_to_database.py`**
```python
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

def get_database_url():
    return f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

def load_organizations(df: pd.DataFrame, session):
    """Load organizations first (they're referenced by projects)"""
    orgs_df = pd.read_csv("etl/data/processed/organizations.csv")

    for idx, row in tqdm(orgs_df.iterrows(), total=len(orgs_df), desc="Loading organizations"):
        query = text("""
            INSERT IGNORE INTO organizations
            (organization_name, organization_acronym, country, organization_type)
            VALUES (:name, :acronym, :country, :type)
        """)

        session.execute(query, {
            "name": row['organization_name'],
            "acronym": row.get('organization_acronym', None),
            "country": row['country'],
            "type": row.get('organization_type', 'Other')
        })

    session.commit()
    print(f"Loaded {len(orgs_df)} organizations")

def load_projects(session):
    """Load projects from cleaned CSV"""
    projects_df = pd.read_csv("etl/data/processed/projects_clean.csv")

    for idx, row in tqdm(projects_df.iterrows(), total=len(projects_df), desc="Loading projects"):
        # First, get coordinator organization ID
        coord_query = text("SELECT organization_id FROM organizations WHERE organization_name = :name LIMIT 1")
        coord_result = session.execute(coord_query, {"name": row['coordinator_name']}).fetchone()

        if not coord_result:
            continue  # Skip if coordinator not found

        coordinator_id = coord_result[0]

        # Get funding program ID
        program_query = text("SELECT program_id FROM funding_programs WHERE program_code = :code LIMIT 1")
        program_result = session.execute(program_query, {"code": row['funding_program']}).fetchone()
        program_id = program_result[0] if program_result else None

        # Insert project
        project_query = text("""
            INSERT INTO projects
            (project_title, project_acronym, grant_agreement_number,
             funding_program_id, total_budget, currency,
             start_date, end_date, duration_months, project_status,
             abstract, objectives,
             coordinator_organization_id, coordinator_contact_email,
             website, cordis_link, data_source, verified)
            VALUES
            (:title, :acronym, :grant, :program, :budget, :currency,
             :start, :end, :duration, :status, :abstract, :objectives,
             :coordinator, :email, :website, :cordis, :source, :verified)
        """)

        try:
            session.execute(project_query, {
                "title": row['project_title'],
                "acronym": row['project_acronym'],
                "grant": row['grant_agreement_number'],
                "program": program_id,
                "budget": row['total_budget'] if pd.notna(row['total_budget']) else None,
                "currency": row['currency'],
                "start": row['start_date'] if pd.notna(row['start_date']) else None,
                "end": row['end_date'] if pd.notna(row['end_date']) else None,
                "duration": row['duration_months'] if pd.notna(row['duration_months']) else None,
                "status": row['project_status'],
                "abstract": row['abstract'] if pd.notna(row['abstract']) else None,
                "objectives": row['objectives'] if pd.notna(row['objectives']) else None,
                "coordinator": coordinator_id,
                "email": row['coordinator_email'] if pd.notna(row['coordinator_email']) else None,
                "website": row['website'] if pd.notna(row['website']) else None,
                "cordis": row['cordis_link'],
                "source": row['data_source'],
                "verified": row['verified']
            })

            if (idx + 1) % 100 == 0:
                session.commit()  # Commit every 100 records

        except Exception as e:
            print(f"Error inserting project {row['project_acronym']}: {e}")
            continue

    session.commit()
    print(f"Loaded {len(projects_df)} projects")

def main():
    engine = create_engine(get_database_url())
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        print("Loading organizations...")
        load_organizations(None, session)

        print("Loading projects...")
        load_projects(session)

        # Verify counts
        result = session.execute(text("SELECT COUNT(*) FROM projects")).fetchone()
        print(f"\nTotal projects in database: {result[0]}")

    except Exception as e:
        print(f"Error: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    main()
```

**Action Items:**
- [ ] Obtain Portfolio Analysis 2023 data file
- [ ] Run extraction script
- [ ] Analyze and map all fields
- [ ] Run transformation script
- [ ] Validate cleaned data
- [ ] Run loading script
- [ ] Verify 841+ projects loaded
- [ ] Manually assign projects to clusters
- [ ] Add keywords to projects

---

## Phase 4: Frontend Dashboard (Week 5-8)

### 4.1 Frontend Foundation

**Tasks:**
- Initialize React + TypeScript project
- Set up routing
- Create layout components
- Implement authentication

**Files to Create:**

**`frontend/package.json`**
```json
{
  "name": "tasc-restoremed-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "@mui/material": "^5.14.20",
    "@mui/icons-material": "^5.14.19",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-query": "^5.13.0",
    "axios": "^1.6.2",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2",
    "recharts": "^2.10.3",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/leaflet": "^1.9.8",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vitest": "^1.0.4",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0"
  }
}
```

**`frontend/src/main.tsx`**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, CssBaseline } from '@mui/material'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import theme from './styles/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
```

**`frontend/src/App.tsx`**
```typescript
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ClustersPage from './pages/ClustersPage'
import SynergiesPage from './pages/SynergiesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/clusters" element={<ClustersPage />} />
          <Route path="/synergies" element={<SynergiesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
```

### 4.2 Core Components

**`frontend/src/components/search/SearchBar.tsx`**
```typescript
import { useState } from 'react'
import { TextField, InputAdornment, IconButton, Box } from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "Search projects..." }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
```

**`frontend/src/components/projects/ProjectCard.tsx`**
```typescript
import { Card, CardContent, CardActions, Typography, Chip, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../types/project'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          {project.project_acronym}
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          {project.project_title}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {project.abstract}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {project.clusters?.slice(0, 2).map((cluster) => (
            <Chip
              key={cluster.cluster_id}
              label={cluster.cluster_name}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        <Typography variant="caption" display="block">
          <strong>Coordinator:</strong> {project.coordinator?.organization_name}
        </Typography>

        <Typography variant="caption" display="block">
          <strong>Duration:</strong> {formatDate(project.start_date)} - {formatDate(project.end_date)}
        </Typography>

        {project.total_budget && (
          <Typography variant="caption" display="block">
            <strong>Budget:</strong> {formatCurrency(project.total_budget)}
          </Typography>
        )}

        <Chip
          label={project.project_status}
          size="small"
          color={project.project_status === 'Active' ? 'success' : 'default'}
          sx={{ mt: 1 }}
        />
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => navigate(`/projects/${project.project_id}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}
```

**`frontend/src/hooks/useProjects.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectService } from '../services/projectService'
import { ProjectCreate, ProjectUpdate } from '../types/project'

export function useProjects(filters?: any) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectService.getProjects(filters),
  })
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectCreate) => projectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useUpdateProject(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectUpdate) => projectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects', id] })
    },
  })
}
```

**Action Items:**
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install all dependencies
- [ ] Create component structure
- [ ] Implement layout components
- [ ] Create type definitions
- [ ] Implement API service layer
- [ ] Create custom hooks
- [ ] Build search interface
- [ ] Build project listing
- [ ] Build project detail page
- [ ] Implement authentication UI

---

## Phase 5: Advanced Features (Week 9-10)

### 5.1 Data Visualization

**Tasks:**
- Create KPI dashboard
- Build interactive charts
- Implement geographic map view
- Create synergy network visualization

**Files to Create:**

**`frontend/src/components/analytics/KPIDashboard.tsx`**
```typescript
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import { useAnalytics } from '../../hooks/useAnalytics'
import {
  FolderOpen as ProjectIcon,
  Category as ClusterIcon,
  Link as SynergyIcon,
  People as UserIcon
} from '@mui/icons-material'

export default function KPIDashboard() {
  const { data: kpis, isLoading } = useAnalytics()

  if (isLoading) return <div>Loading...</div>

  const metrics = [
    {
      title: 'Total Projects',
      value: kpis?.total_projects || 0,
      target: 900,
      icon: <ProjectIcon fontSize="large" />,
      color: '#3498db',
    },
    {
      title: 'Active Clusters',
      value: kpis?.active_clusters || 0,
      target: 5,
      icon: <ClusterIcon fontSize="large" />,
      color: '#27ae60',
    },
    {
      title: 'Documented Synergies',
      value: kpis?.documented_synergies || 0,
      target: 10,
      icon: <SynergyIcon fontSize="large" />,
      color: '#9b59b6',
    },
    {
      title: 'Weekly Users',
      value: kpis?.weekly_users || 0,
      target: null,
      icon: <UserIcon fontSize="large" />,
      color: '#f39c12',
    },
  ]

  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.title}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="text.secondary" variant="overline">
                    {metric.title}
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ color: metric.color }}>
                    {metric.value}
                  </Typography>
                  {metric.target && (
                    <Typography variant="caption" color="text.secondary">
                      Target: {metric.target} ({Math.round((metric.value / metric.target) * 100)}%)
                    </Typography>
                  )}
                </Box>
                <Box sx={{ color: metric.color }}>
                  {metric.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
```

**`frontend/src/components/projects/ProjectMap.tsx`**
```typescript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Project } from '../../types/project'
import 'leaflet/dist/leaflet.css'

interface ProjectMapProps {
  projects: Project[]
}

export default function ProjectMap({ projects }: ProjectMapProps) {
  // Mediterranean center coordinates
  const center: [number, number] = [38.0, 15.0]

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {projects.map((project) => (
        project.regions?.map((region) => (
          region.latitude && region.longitude && (
            <Marker
              key={`${project.project_id}-${region.region_id}`}
              position={[region.latitude, region.longitude]}
            >
              <Popup>
                <strong>{project.project_acronym}</strong><br />
                {project.project_title}<br />
                <em>{region.region_name}</em>
              </Popup>
            </Marker>
          )
        ))
      ))}
    </MapContainer>
  )
}
```

### 5.2 Advanced Search & Filters

**`frontend/src/components/search/AdvancedSearch.tsx`**
```typescript
import { useState } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Grid,
} from '@mui/material'
import { ExpandMore as ExpandIcon } from '@mui/icons-material'
import { useClusters } from '../../hooks/useClusters'
import { useRegions } from '../../hooks/useRegions'

interface AdvancedSearchProps {
  onSearch: (filters: any) => void
}

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const { data: clusters } = useClusters()
  const { data: regions } = useRegions()

  const [filters, setFilters] = useState({
    keyword: '',
    clusterIds: [] as number[],
    regionIds: [] as number[],
    status: '',
    startDateFrom: '',
    startDateTo: '',
    isCommunityLed: '',
  })

  const handleSubmit = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
      keyword: '',
      clusterIds: [],
      regionIds: [],
      status: '',
      startDateFrom: '',
      startDateTo: '',
      isCommunityLed: '',
    })
    onSearch({})
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        Advanced Search Filters
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Keyword"
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Thematic Clusters</InputLabel>
              <Select
                multiple
                value={filters.clusterIds}
                onChange={(e) => setFilters({ ...filters, clusterIds: e.target.value as number[] })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={clusters?.find(c => c.cluster_id === value)?.cluster_name}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {clusters?.map((cluster) => (
                  <MenuItem key={cluster.cluster_id} value={cluster.cluster_id}>
                    {cluster.cluster_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Regions</InputLabel>
              <Select
                multiple
                value={filters.regionIds}
                onChange={(e) => setFilters({ ...filters, regionIds: e.target.value as number[] })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={regions?.find(r => r.region_id === value)?.region_name}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {regions?.map((region) => (
                  <MenuItem key={region.region_id} value={region.region_id}>
                    {region.region_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Project Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Planned">Planned</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Community-Led</InputLabel>
              <Select
                value={filters.isCommunityLed}
                onChange={(e) => setFilters({ ...filters, isCommunityLed: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={handleReset}>Reset</Button>
              <Button variant="contained" onClick={handleSubmit}>Apply Filters</Button>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
```

**Action Items:**
- [ ] Implement KPI dashboard
- [ ] Create budget charts
- [ ] Create timeline charts
- [ ] Implement geographic map
- [ ] Build synergy network graph
- [ ] Create advanced search interface
- [ ] Add export functionality (CSV/Excel)
- [ ] Implement pagination for large result sets

---

## Phase 6: Testing & QA (Week 11)

### 6.1 Backend Testing

**`backend/tests/test_projects.py`**
```python
import pytest
from fastapi.testclient import TestClient
from ..src.api.main import app

client = TestClient(app)

def test_get_projects():
    response = client.get("/api/projects/")
    assert response.status_code == 200
    assert "projects" in response.json()
    assert "total" in response.json()

def test_get_project_by_id():
    response = client.get("/api/projects/1")
    assert response.status_code in [200, 404]

def test_create_project_unauthorized():
    response = client.post("/api/projects/", json={})
    assert response.status_code == 401

def test_search_projects():
    response = client.post("/api/search/", json={
        "keyword": "marine",
        "cluster_ids": [1]
    })
    assert response.status_code == 200
    assert "results" in response.json()
```

### 6.2 Frontend Testing

**`frontend/src/components/search/SearchBar.test.tsx`**
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar onSearch={vi.fn()} />)
    expect(screen.getByPlaceholderText(/search projects/i)).toBeInTheDocument()
  })

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)

    const input = screen.getByPlaceholderText(/search projects/i)
    fireEvent.change(input, { target: { value: 'marine' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(onSearch).toHaveBeenCalledWith('marine')
  })
})
```

### 6.3 End-to-End Testing

**`tests/e2e/search.spec.ts`**
```typescript
import { test, expect } from '@playwright/test'

test('search for projects', async ({ page }) => {
  await page.goto('http://localhost:3000/search')

  await page.fill('input[placeholder*="Search"]', 'marine pollution')
  await page.press('input[placeholder*="Search"]', 'Enter')

  await expect(page.locator('.project-card')).toHaveCountGreaterThan(0)
})

test('filter by cluster', async ({ page }) => {
  await page.goto('http://localhost:3000/projects')

  await page.click('text=Pollution Prevention')

  await expect(page.url()).toContain('cluster')
})
```

**Action Items:**
- [ ] Write backend unit tests (80% coverage target)
- [ ] Write frontend component tests
- [ ] Create integration tests for API
- [ ] Write E2E tests for critical flows
- [ ] Perform manual testing
- [ ] Test on multiple browsers
- [ ] Test responsive design on mobile
- [ ] Perform accessibility testing
- [ ] Load testing with 1000+ projects
- [ ] Security testing (SQL injection, XSS)

---

## Phase 7: Deployment & Launch (Week 12)

### 7.1 Containerization

**`docker-compose.yml`**
```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0
    container_name: tasc_db
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema:/docker-entrypoint-initdb.d
    networks:
      - tasc_network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: tasc_backend
    environment:
      DB_HOST: database
      DB_PORT: 3306
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      SECRET_KEY: ${SECRET_KEY}
    ports:
      - "8000:8000"
    depends_on:
      - database
    volumes:
      - ./backend:/app
    networks:
      - tasc_network
    command: uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: tasc_frontend
    environment:
      VITE_API_URL: http://localhost:8000/api
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - tasc_network
    command: npm run dev -- --host

volumes:
  mysql_data:

networks:
  tasc_network:
    driver: bridge
```

**`backend/Dockerfile`**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**`frontend/Dockerfile`**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
```

### 7.2 Production Deployment

**`deployment/nginx/nginx.conf`**
```nginx
upstream backend {
    server backend:8000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name tasc-restoremed.eu;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**`.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Run tests
        run: |
          cd frontend
          npm test
      - name: Build
        run: |
          cd frontend
          npm run build
```

**Action Items:**
- [ ] Create Dockerfiles for all services
- [ ] Test Docker Compose locally
- [ ] Set up production server (VPS/Cloud)
- [ ] Configure nginx reverse proxy
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure domain name
- [ ] Set up GitHub Actions CI/CD
- [ ] Configure monitoring (Sentry, Uptime Robot)
- [ ] Set up automated backups
- [ ] Create deployment documentation
- [ ] Perform security audit
- [ ] Launch to production!

---

## Post-Launch Operations

### Immediate Post-Launch (Week 13+)

**Week 1 After Launch:**
- [ ] Monitor error logs daily
- [ ] Track usage analytics
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Monitor database performance

**Month 1 After Launch:**
- [ ] Verify KPIs are being met
- [ ] User training sessions
- [ ] Create video tutorials
- [ ] Update documentation based on feedback
- [ ] Plan feature enhancements

### Ongoing Maintenance

**Weekly Tasks:**
- Monitor system health
- Review new user registrations
- Check backup success
- Review error logs

**Monthly Tasks:**
- Database maintenance and optimization
- Update project data
- Review and approve new keywords
- Generate usage reports
- Security updates

**Quarterly Tasks:**
- KPI review and reporting
- User satisfaction survey
- Performance optimization
- Feature prioritization
- Data quality audit

---

## Success Metrics

### Technical Metrics
- [ ] 99% uptime
- [ ] < 2 second page load time
- [ ] < 500ms API response time
- [ ] Zero critical security vulnerabilities
- [ ] 80%+ code coverage

### Business Metrics
- [ ] ≥ 900 projects in database
- [ ] ≥ 5 active thematic clusters
- [ ] ≥ 10 documented synergies
- [ ] 100+ searches per week
- [ ] All consortium partners have accounts
- [ ] Public dashboard access active

---

## Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data quality issues from 2023 Portfolio | High | Medium | Implement robust validation, manual review process |
| Slow query performance with 900+ projects | High | Low | Database indexes optimized, caching strategy |
| Low user adoption | Medium | Medium | Training sessions, user-friendly design, documentation |
| Security breach | High | Low | Security audit, HTTPS, rate limiting, input validation |
| Database corruption | High | Low | Daily automated backups, replication |

---

## Resources & Contacts

### Development Team
- **Data Engineer:** ETL pipeline, database optimization
- **Backend Developer:** API development, business logic
- **Frontend Developer:** UI/UX, dashboard implementation
- **Data Scientist:** Analytics, clustering algorithm

### External Partners
- **INFOR:** Digital tool development partner
- **FredU:** Task lead, coordination
- **HCMR:** Technical support

### Documentation
- [Database Schema](./trm_db_schema.sql)
- [Data Dictionary](./trm_data_dictionary)
- [Implementation Guide](./trm_implementation_guide)
- [Executive Summary](./trm_executive_summary)

---

## Conclusion

This roadmap provides a complete, step-by-step implementation plan for the TASC-RestoreMed Task 4.1 database project. Follow each phase sequentially, checking off action items as you complete them.

**Remember:**
- Start with the foundation (database + backend)
- Build incrementally and test continuously
- Focus on data quality throughout
- Prioritize user experience
- Document everything
- Monitor and optimize post-launch

**Good luck with your implementation!** 🚀

---

**Document Version:** 1.0
**Created:** November 2025
**Next Review:** After Phase 2 completion
