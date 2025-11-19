-- ============================================================================
-- EU Projects Database Schema - Enhanced Version
-- Supports H2020, Horizon Europe, Interreg, LIFE, and other EU programmes
-- MySQL 5.7.4+
-- ============================================================================

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS publications;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS partners;
DROP TABLE IF EXISTS deliverables;
DROP TABLE IF EXISTS project_topics;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS project_keywords;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS programmes;

-- ============================================================================
-- REFERENCE TABLES
-- ============================================================================

-- Programmes (EU and other funding programmes)
CREATE TABLE programmes (
    programme_id INT AUTO_INCREMENT PRIMARY KEY,
    programme_code VARCHAR(100) NOT NULL,
    programme_name VARCHAR(500) NOT NULL,
    programme_type ENUM('H2020', 'Horizon Europe', 'Interreg', 'LIFE', 'ERDF', 'Other') DEFAULT 'Other',
    start_year YEAR,
    end_year YEAR,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (programme_code),
    INDEX idx_type (programme_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Topics (for H2020/HE projects)
CREATE TABLE topics (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_code VARCHAR(100) NOT NULL UNIQUE,
    topic_title VARCHAR(1000),
    topic_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (topic_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Keywords
CREATE TABLE keywords (
    keyword_id INT AUTO_INCREMENT PRIMARY KEY,
    keyword_text VARCHAR(255) NOT NULL UNIQUE,
    keyword_category VARCHAR(100),
    usage_count INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_keyword (keyword_text),
    INDEX idx_category (keyword_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- MAIN PROJECTS TABLE
-- ============================================================================

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Basic Identifiers
    external_project_id VARCHAR(100), -- Project ID from external source
    project_acronym VARCHAR(200),
    rcn VARCHAR(50), -- Research Council Number
    grant_doi VARCHAR(255), -- Grant DOI

    -- Project Information
    title VARCHAR(2000) NOT NULL,
    abstract TEXT,
    objectives TEXT,
    objectives_count INT,

    -- AI Generated Fields
    ai_full_description TEXT,
    ai_short_description TEXT,
    ai_project_website VARCHAR(1000),
    ai_technologies TEXT,
    ai_geographic_coverage_country_codes TEXT,

    -- Programme & Funding
    eu_programme VARCHAR(255),
    programme_interreg VARCHAR(255), -- For Interreg projects
    type_of_action VARCHAR(255),
    funded_under VARCHAR(255),
    legal_basis VARCHAR(500),
    funding_scheme VARCHAR(255),
    framework_programme VARCHAR(255),
    master_call VARCHAR(255),
    sub_call VARCHAR(255),
    call_serial_number VARCHAR(100),

    -- 2021-2027 Programme Specific
    programme_specific_objective TEXT, -- 2021-2027 only
    programme_priority VARCHAR(500), -- 2021-2027 only
    type_of_intervention VARCHAR(500), -- 2021-2027 only

    -- Financial Information
    total_cost DECIMAL(18, 2),
    ec_max_contribution DECIMAL(18, 2),
    erdf_contribution_amount DECIMAL(18, 2), -- ERDF Contribution
    erdf_contribution_rate DECIMAL(5, 2), -- ERDF co-financing rate (%)

    -- Dates
    start_date DATE,
    end_date DATE,
    ec_signature_date DATE,
    content_update_date TIMESTAMP,

    -- Status
    status VARCHAR(100),

    -- URLs and Resources
    project_url VARCHAR(1000),
    project_url_webgate VARCHAR(1000),

    -- Classifications
    platform VARCHAR(255),
    themes TEXT,
    priority_area VARCHAR(500),
    year VARCHAR(10),

    -- Output Indicators (2021-2027)
    programme_output_indicator_1 VARCHAR(500),
    programme_output_indicator_2 VARCHAR(500),
    programme_output_indicator_3 VARCHAR(500),
    programme_output_indicator_4 VARCHAR(500),
    programme_output_indicator_5 VARCHAR(500),
    programme_output_indicator_1_unit VARCHAR(100),
    programme_output_indicator_2_unit VARCHAR(100),
    programme_output_indicator_3_unit VARCHAR(100),
    programme_output_indicator_4_unit VARCHAR(100),
    programme_output_indicator_5_unit VARCHAR(100),

    -- Result Indicators (2021-2027)
    programme_result_indicator_1 VARCHAR(500),
    programme_result_indicator_2 VARCHAR(500),
    programme_result_indicator_3 VARCHAR(500),
    programme_result_indicator_4 VARCHAR(500),
    programme_result_indicator_5 VARCHAR(500),
    programme_result_indicator_6 VARCHAR(500),
    programme_result_indicator_1_unit VARCHAR(100),
    programme_result_indicator_2_unit VARCHAR(100),
    programme_result_indicator_3_unit VARCHAR(100),
    programme_result_indicator_4_unit VARCHAR(100),
    programme_result_indicator_5_unit VARCHAR(100),
    programme_result_indicator_6_unit VARCHAR(100),

    -- Outputs and Results
    project_outputs TEXT, -- 2021-2027 only
    delivered_output_indicators TEXT, -- 2021-2027 only
    expected_outputs_en TEXT,
    delivered_outputs_en TEXT,
    delivered_result_indicators TEXT, -- 2021-2027 only
    expected_achievements_en TEXT,

    -- Deliverables and Strategies
    project_deliverables TEXT, -- 2021-2027 only
    contribution_to_strategies TEXT, -- Project's contribution to wider strategies

    -- Environmental & Conservation Fields
    target_eu_legislative_references TEXT,
    target_habitat_types TEXT,
    species TEXT,
    natura_2000_sites TEXT,
    european_union_mrs TEXT, -- Marine Region Strategies

    -- Linked Projects
    linked_project VARCHAR(255),

    -- Flags
    project_selected BOOLEAN DEFAULT FALSE,
    project_best BOOLEAN DEFAULT FALSE,
    project_top BOOLEAN DEFAULT FALSE,

    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes for performance
    INDEX idx_external_id (external_project_id),
    INDEX idx_acronym (project_acronym),
    INDEX idx_rcn (rcn),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_programme (eu_programme),
    INDEX idx_year (year),
    FULLTEXT idx_fulltext (title, abstract, objectives, keywords)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- PARTNERS TABLE
-- ============================================================================

CREATE TABLE partners (
    partner_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,

    -- Identifiers
    external_project_id VARCHAR(100), -- Link to external project ID
    project_acronym VARCHAR(200),
    organization_id VARCHAR(100),
    rcn VARCHAR(50),
    order_number INT, -- Partner order in project

    -- Organization Information
    name VARCHAR(1000) NOT NULL,
    short_name VARCHAR(255),
    vat_number VARCHAR(100),

    -- Location
    street VARCHAR(500),
    city VARCHAR(255),
    post_code VARCHAR(50),
    country VARCHAR(100),
    nuts_code VARCHAR(50), -- NUTS regional code
    geolocation VARCHAR(100), -- Geographic coordinates
    address_life TEXT, -- Full address for LIFE projects

    -- Organization Details
    activity_type VARCHAR(255),
    activity VARCHAR(500), -- For Interreg projects
    organization_url VARCHAR(1000),
    contact_form VARCHAR(1000),

    -- Classification
    beneficiary_types VARCHAR(255),
    role VARCHAR(100), -- Role in project (Coordinator, Partner, etc.)
    sme BOOLEAN DEFAULT FALSE, -- Is SME

    -- Financial
    total_cost DECIMAL(18, 2),
    ec_contribution DECIMAL(18, 2),
    net_ec_contribution DECIMAL(18, 2),
    partner_total_eligible_budget DECIMAL(18, 2), -- For Interreg

    -- Status
    active BOOLEAN DEFAULT TRUE,
    end_of_participation DATE,

    -- Programme Specific
    programme_interreg VARCHAR(255),

    -- Metadata
    content_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_external_project (external_project_id),
    INDEX idx_project_acronym (project_acronym),
    INDEX idx_name (name(255)),
    INDEX idx_country (country),
    INDEX idx_role (role),
    INDEX idx_org_id (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DELIVERABLES TABLE
-- ============================================================================

CREATE TABLE deliverables (
    deliverable_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,

    -- Identifiers
    external_deliverable_id VARCHAR(100),
    external_project_id VARCHAR(100),
    project_acronym VARCHAR(200),
    rcn VARCHAR(50),

    -- Deliverable Information
    title VARCHAR(1000) NOT NULL,
    description TEXT,
    deliverable_type VARCHAR(255),
    collection VARCHAR(255),

    -- Resources
    url VARCHAR(1000),

    -- Programme Specific
    programme_interreg VARCHAR(255),

    -- Metadata
    content_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_external_id (external_deliverable_id),
    INDEX idx_external_project (external_project_id),
    INDEX idx_project_acronym (project_acronym),
    INDEX idx_type (deliverable_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- REPORTS TABLE
-- ============================================================================

CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,

    -- Identifiers
    external_report_id VARCHAR(100),
    external_project_id VARCHAR(100),
    project_acronym VARCHAR(200),
    rcn VARCHAR(50),

    -- Report Information
    title VARCHAR(1000) NOT NULL,
    attachment VARCHAR(1000), -- URL or path to attachment

    -- Metadata
    content_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_external_id (external_report_id),
    INDEX idx_external_project (external_project_id),
    INDEX idx_project_acronym (project_acronym)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- PUBLICATIONS TABLE
-- ============================================================================

CREATE TABLE publications (
    publication_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,

    -- Identifiers
    external_publication_id VARCHAR(100),
    external_project_id VARCHAR(100),
    project_acronym VARCHAR(200),
    rcn VARCHAR(50),

    -- Publication Information
    title VARCHAR(2000) NOT NULL,
    is_published_as VARCHAR(255), -- Publication type/format
    authors TEXT,

    -- Journal/Book Information
    journal_title VARCHAR(1000),
    journal_number VARCHAR(100),
    published_year VARCHAR(10),
    published_pages VARCHAR(100),

    -- Identifiers
    issn VARCHAR(50),
    isbn VARCHAR(50),
    doi VARCHAR(255),

    -- Classification
    collection VARCHAR(255),

    -- Metadata
    content_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_external_id (external_publication_id),
    INDEX idx_external_project (external_project_id),
    INDEX idx_project_acronym (project_acronym),
    INDEX idx_doi (doi),
    INDEX idx_year (published_year),
    FULLTEXT idx_fulltext (title, authors)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- JUNCTION TABLES
-- ============================================================================

-- Projects <-> Topics (Many-to-Many)
CREATE TABLE project_topics (
    project_topic_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    topic_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_topic (project_id, topic_id),
    INDEX idx_project (project_id),
    INDEX idx_topic (topic_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects <-> Keywords (Many-to-Many)
CREATE TABLE project_keywords (
    project_keyword_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    keyword_id INT NOT NULL,
    source ENUM('Original', 'Manual', 'Auto-Generated', 'AI-Generated') DEFAULT 'Manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES keywords(keyword_id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_keyword (project_id, keyword_id),
    INDEX idx_project (project_id),
    INDEX idx_keyword (keyword_id),
    INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
CREATE OR REPLACE VIEW projects_with_coordinator AS
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
CREATE OR REPLACE VIEW project_summary AS
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
