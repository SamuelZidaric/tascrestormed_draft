-- ============================================================================
-- EU Projects Database Schema - SQLite Version
-- Self-contained simulation database for demonstration/testing
-- SQLite 3.x
-- ============================================================================

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- ============================================================================
-- REFERENCE TABLES
-- ============================================================================

-- Programmes (EU and other funding programmes)
CREATE TABLE programmes (
    programme_id INTEGER PRIMARY KEY AUTOINCREMENT,
    programme_code TEXT NOT NULL,
    programme_name TEXT NOT NULL,
    programme_type TEXT DEFAULT 'Other', -- H2020, Horizon Europe, Interreg, LIFE, ERDF, Other
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_programmes_code ON programmes(programme_code);
CREATE INDEX idx_programmes_type ON programmes(programme_type);

-- Topics (for H2020/HE projects)
CREATE TABLE topics (
    topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_code TEXT NOT NULL UNIQUE,
    topic_title TEXT,
    topic_description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_topics_code ON topics(topic_code);

-- Keywords
CREATE TABLE keywords (
    keyword_id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword_text TEXT NOT NULL UNIQUE,
    keyword_category TEXT,
    usage_count INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_keywords_text ON keywords(keyword_text);
CREATE INDEX idx_keywords_category ON keywords(keyword_category);

-- ============================================================================
-- MAIN PROJECTS TABLE
-- ============================================================================

CREATE TABLE projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Basic Identifiers
    external_project_id TEXT,
    project_acronym TEXT,
    rcn TEXT,
    grant_doi TEXT,

    -- Project Information
    title TEXT NOT NULL,
    abstract TEXT,
    objectives TEXT,
    objectives_count INTEGER,

    -- AI Generated Fields
    ai_full_description TEXT,
    ai_short_description TEXT,
    ai_project_website TEXT,
    ai_technologies TEXT,
    ai_geographic_coverage_country_codes TEXT,

    -- Programme & Funding
    eu_programme TEXT,
    programme_interreg TEXT,
    type_of_action TEXT,
    funded_under TEXT,
    legal_basis TEXT,
    funding_scheme TEXT,
    framework_programme TEXT,
    master_call TEXT,
    sub_call TEXT,
    call_serial_number TEXT,

    -- 2021-2027 Programme Specific
    programme_specific_objective TEXT,
    programme_priority TEXT,
    type_of_intervention TEXT,

    -- Financial Information
    total_cost REAL,
    ec_max_contribution REAL,
    erdf_contribution_amount REAL,
    erdf_contribution_rate REAL,

    -- Dates
    start_date TEXT,
    end_date TEXT,
    ec_signature_date TEXT,
    content_update_date TEXT,

    -- Status
    status TEXT,

    -- URLs and Resources
    project_url TEXT,
    project_url_webgate TEXT,

    -- Classifications
    platform TEXT,
    themes TEXT,
    priority_area TEXT,
    year TEXT,

    -- Output Indicators (2021-2027)
    programme_output_indicator_1 TEXT,
    programme_output_indicator_2 TEXT,
    programme_output_indicator_3 TEXT,
    programme_output_indicator_4 TEXT,
    programme_output_indicator_5 TEXT,
    programme_output_indicator_1_unit TEXT,
    programme_output_indicator_2_unit TEXT,
    programme_output_indicator_3_unit TEXT,
    programme_output_indicator_4_unit TEXT,
    programme_output_indicator_5_unit TEXT,

    -- Result Indicators (2021-2027)
    programme_result_indicator_1 TEXT,
    programme_result_indicator_2 TEXT,
    programme_result_indicator_3 TEXT,
    programme_result_indicator_4 TEXT,
    programme_result_indicator_5 TEXT,
    programme_result_indicator_6 TEXT,
    programme_result_indicator_1_unit TEXT,
    programme_result_indicator_2_unit TEXT,
    programme_result_indicator_3_unit TEXT,
    programme_result_indicator_4_unit TEXT,
    programme_result_indicator_5_unit TEXT,
    programme_result_indicator_6_unit TEXT,

    -- Outputs and Results
    project_outputs TEXT,
    delivered_output_indicators TEXT,
    expected_outputs_en TEXT,
    delivered_outputs_en TEXT,
    delivered_result_indicators TEXT,
    expected_achievements_en TEXT,

    -- Deliverables and Strategies
    project_deliverables TEXT,
    contribution_to_strategies TEXT,

    -- Environmental & Conservation Fields
    target_eu_legislative_references TEXT,
    target_habitat_types TEXT,
    species TEXT,
    natura_2000_sites TEXT,
    european_union_mrs TEXT,

    -- Linked Projects
    linked_project TEXT,

    -- Flags
    project_selected INTEGER DEFAULT 0,
    project_best INTEGER DEFAULT 0,
    project_top INTEGER DEFAULT 0,

    -- Metadata
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_external_id ON projects(external_project_id);
CREATE INDEX idx_projects_acronym ON projects(project_acronym);
CREATE INDEX idx_projects_rcn ON projects(rcn);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_start_date ON projects(start_date);
CREATE INDEX idx_projects_programme ON projects(eu_programme);
CREATE INDEX idx_projects_year ON projects(year);

-- Full-text search (SQLite FTS5)
CREATE VIRTUAL TABLE projects_fts USING fts5(
    title,
    abstract,
    objectives,
    content=projects,
    content_rowid=project_id
);

-- Triggers to keep FTS in sync
CREATE TRIGGER projects_fts_insert AFTER INSERT ON projects BEGIN
    INSERT INTO projects_fts(rowid, title, abstract, objectives)
    VALUES (new.project_id, new.title, new.abstract, new.objectives);
END;

CREATE TRIGGER projects_fts_delete AFTER DELETE ON projects BEGIN
    DELETE FROM projects_fts WHERE rowid = old.project_id;
END;

CREATE TRIGGER projects_fts_update AFTER UPDATE ON projects BEGIN
    UPDATE projects_fts SET
        title = new.title,
        abstract = new.abstract,
        objectives = new.objectives
    WHERE rowid = new.project_id;
END;

-- ============================================================================
-- PARTNERS TABLE
-- ============================================================================

CREATE TABLE partners (
    partner_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,

    -- Identifiers
    external_project_id TEXT,
    project_acronym TEXT,
    organization_id TEXT,
    rcn TEXT,
    order_number INTEGER,

    -- Organization Information
    name TEXT NOT NULL,
    short_name TEXT,
    vat_number TEXT,

    -- Location
    street TEXT,
    city TEXT,
    post_code TEXT,
    country TEXT,
    nuts_code TEXT,
    geolocation TEXT,
    address_life TEXT,

    -- Organization Details
    activity_type TEXT,
    activity TEXT,
    organization_url TEXT,
    contact_form TEXT,

    -- Classification
    beneficiary_types TEXT,
    role TEXT,
    sme INTEGER DEFAULT 0,

    -- Financial
    total_cost REAL,
    ec_contribution REAL,
    net_ec_contribution REAL,
    partner_total_eligible_budget REAL,

    -- Status
    active INTEGER DEFAULT 1,
    end_of_participation TEXT,

    -- Programme Specific
    programme_interreg TEXT,

    -- Metadata
    content_update_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_partners_project ON partners(project_id);
CREATE INDEX idx_partners_external_project ON partners(external_project_id);
CREATE INDEX idx_partners_acronym ON partners(project_acronym);
CREATE INDEX idx_partners_country ON partners(country);
CREATE INDEX idx_partners_role ON partners(role);
CREATE INDEX idx_partners_org_id ON partners(organization_id);

-- ============================================================================
-- DELIVERABLES TABLE
-- ============================================================================

CREATE TABLE deliverables (
    deliverable_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,

    -- Identifiers
    external_deliverable_id TEXT,
    external_project_id TEXT,
    project_acronym TEXT,
    rcn TEXT,

    -- Deliverable Information
    title TEXT NOT NULL,
    description TEXT,
    deliverable_type TEXT,
    collection TEXT,

    -- Resources
    url TEXT,

    -- Programme Specific
    programme_interreg TEXT,

    -- Metadata
    content_update_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_deliverables_project ON deliverables(project_id);
CREATE INDEX idx_deliverables_external_id ON deliverables(external_deliverable_id);
CREATE INDEX idx_deliverables_type ON deliverables(deliverable_type);

-- ============================================================================
-- REPORTS TABLE
-- ============================================================================

CREATE TABLE reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,

    -- Identifiers
    external_report_id TEXT,
    external_project_id TEXT,
    project_acronym TEXT,
    rcn TEXT,

    -- Report Information
    title TEXT NOT NULL,
    attachment TEXT,

    -- Metadata
    content_update_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_reports_project ON reports(project_id);
CREATE INDEX idx_reports_external_id ON reports(external_report_id);

-- ============================================================================
-- PUBLICATIONS TABLE
-- ============================================================================

CREATE TABLE publications (
    publication_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,

    -- Identifiers
    external_publication_id TEXT,
    external_project_id TEXT,
    project_acronym TEXT,
    rcn TEXT,

    -- Publication Information
    title TEXT NOT NULL,
    is_published_as TEXT,
    authors TEXT,

    -- Journal/Book Information
    journal_title TEXT,
    journal_number TEXT,
    published_year TEXT,
    published_pages TEXT,

    -- Identifiers
    issn TEXT,
    isbn TEXT,
    doi TEXT,

    -- Classification
    collection TEXT,

    -- Metadata
    content_update_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_publications_project ON publications(project_id);
CREATE INDEX idx_publications_external_id ON publications(external_publication_id);
CREATE INDEX idx_publications_doi ON publications(doi);
CREATE INDEX idx_publications_year ON publications(published_year);

-- ============================================================================
-- JUNCTION TABLES
-- ============================================================================

-- Projects <-> Topics (Many-to-Many)
CREATE TABLE project_topics (
    project_topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE,
    UNIQUE(project_id, topic_id)
);

CREATE INDEX idx_project_topics_project ON project_topics(project_id);
CREATE INDEX idx_project_topics_topic ON project_topics(topic_id);

-- Projects <-> Keywords (Many-to-Many)
CREATE TABLE project_keywords (
    project_keyword_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    keyword_id INTEGER NOT NULL,
    source TEXT DEFAULT 'Manual', -- Original, Manual, Auto-Generated, AI-Generated
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES keywords(keyword_id) ON DELETE CASCADE,
    UNIQUE(project_id, keyword_id)
);

CREATE INDEX idx_project_keywords_project ON project_keywords(project_id);
CREATE INDEX idx_project_keywords_keyword ON project_keywords(keyword_id);
CREATE INDEX idx_project_keywords_source ON project_keywords(source);

-- ============================================================================
-- INITIAL DATA POPULATION
-- ============================================================================

-- Insert sample programmes
INSERT INTO programmes (programme_code, programme_name, programme_type, start_year, end_year) VALUES
('H2020', 'Horizon 2020', 'H2020', 2014, 2020),
('HE', 'Horizon Europe', 'Horizon Europe', 2021, 2027),
('LIFE', 'LIFE Programme', 'LIFE', 2021, 2027),
('Interreg MED', 'Interreg Mediterranean', 'Interreg', 2014, 2020),
('Interreg MED 2021', 'Interreg Mediterranean 2021-2027', 'Interreg', 2021, 2027),
('ERDF', 'European Regional Development Fund', 'ERDF', 2014, 2020),
('ERDF 2021', 'European Regional Development Fund 2021-2027', 'ERDF', 2021, 2027);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Projects with main coordinator
CREATE VIEW projects_with_coordinator AS
SELECT
    p.*,
    partner.name AS coordinator_name,
    partner.country AS coordinator_country,
    partner.city AS coordinator_city
FROM projects p
LEFT JOIN partners partner ON p.project_id = partner.project_id
    AND partner.role = 'Coordinator'
    AND partner.order_number = 1;

-- View: Project summary with counts
CREATE VIEW project_summary AS
SELECT
    p.project_id,
    p.project_acronym,
    p.title,
    p.eu_programme,
    p.start_date,
    p.end_date,
    p.total_cost,
    COUNT(DISTINCT part.partner_id) AS partner_count,
    COUNT(DISTINCT d.deliverable_id) AS deliverable_count,
    COUNT(DISTINCT pub.publication_id) AS publication_count,
    COUNT(DISTINCT r.report_id) AS report_count
FROM projects p
LEFT JOIN partners part ON p.project_id = part.project_id
LEFT JOIN deliverables d ON p.project_id = d.project_id
LEFT JOIN publications pub ON p.project_id = pub.project_id
LEFT JOIN reports r ON p.project_id = r.project_id
GROUP BY p.project_id;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
