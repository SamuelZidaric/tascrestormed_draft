# EU Projects Database - Data Dictionary

**Database Version:** 2.0 Enhanced
**Last Updated:** 2025-11-19
**MySQL Version:** 5.7.4+

---

## Table of Contents

1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Table Definitions](#table-definitions)
4. [Field Mappings](#field-mappings)
5. [Relationships](#relationships)
6. [Usage Examples](#usage-examples)

---

## Overview

This database stores comprehensive information about EU-funded projects from various programmes including:
- Horizon 2020 (H2020)
- Horizon Europe (HE)
- Interreg programmes
- LIFE Programme
- ERDF (European Regional Development Fund)
- Other EU and national programmes

The schema supports projects from both 2014-2020 and 2021-2027 funding periods with period-specific fields.

### Key Statistics Capacity
- **Projects:** Unlimited (designed for 1000+)
- **Partners per Project:** Unlimited
- **Deliverables per Project:** Unlimited
- **Publications per Project:** Unlimited
- **Reports per Project:** Unlimited

---

## Database Architecture

### Core Tables
1. **projects** - Main project information
2. **partners** - Project partners and beneficiaries
3. **deliverables** - Project deliverables
4. **publications** - Scientific publications
5. **reports** - Project reports

### Reference Tables
1. **programmes** - Funding programmes
2. **topics** - H2020/HE topics
3. **keywords** - Searchable keywords

### Junction Tables
1. **project_topics** - Project-Topic relationships
2. **project_keywords** - Project-Keyword relationships

---

## Table Definitions

### Table: programmes

**Purpose:** Reference table for EU and other funding programmes

| Field | Type | Description |
|-------|------|-------------|
| programme_id | INT | Primary key |
| programme_code | VARCHAR(100) | Short code (e.g., 'H2020', 'Interreg MED') |
| programme_name | VARCHAR(500) | Full programme name |
| programme_type | ENUM | Type: H2020, Horizon Europe, Interreg, LIFE, ERDF, Other |
| start_year | YEAR | Programme start year |
| end_year | YEAR | Programme end year |
| description | TEXT | Programme description |
| is_active | BOOLEAN | Whether programme is active |

**Initial Data Includes:**
- H2020 (2014-2020)
- Horizon Europe (2021-2027)
- LIFE Programme
- Interreg Mediterranean (both periods)
- ERDF (both periods)

---

### Table: topics

**Purpose:** H2020 and Horizon Europe topic codes

| Field | Type | Description |
|-------|------|-------------|
| topic_id | INT | Primary key |
| topic_code | VARCHAR(100) | Unique topic code (e.g., 'BG-08-2018-2019') |
| topic_title | VARCHAR(1000) | Topic title |
| topic_description | TEXT | Detailed topic description |

---

### Table: keywords

**Purpose:** Searchable keywords/tags for projects

| Field | Type | Description |
|-------|------|-------------|
| keyword_id | INT | Primary key |
| keyword_text | VARCHAR(255) | The keyword text |
| keyword_category | VARCHAR(100) | Optional category grouping |
| usage_count | INT | Number of projects using this keyword |
| is_approved | BOOLEAN | Approval status for moderation |

---

### Table: projects

**Purpose:** Main table storing all project information

#### Basic Identifiers

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| project_id | INT | Primary key (auto-increment) | - |
| external_project_id | VARCHAR(100) | Project ID from external source | "Project id", "Project ID (2021-2027 only)" |
| project_acronym | VARCHAR(200) | Project acronym | "Project Acronym", "Acronym", "acronym" |
| rcn | VARCHAR(50) | Research Council Number | "rcn" |
| grant_doi | VARCHAR(255) | Grant DOI | "grantDoi" |

#### Project Information

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| title | VARCHAR(2000) | Full project title | "title" |
| abstract | TEXT | Project abstract/summary | "abstract" |
| objectives | TEXT | Project objectives | "Objective", "objective" |
| objectives_count | INT | Number of objectives | "Objectives Count" |

#### AI Generated Fields

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| ai_full_description | TEXT | AI-generated full description | "AI_full_description" |
| ai_short_description | TEXT | AI-generated short description | "AI_short_description" |
| ai_project_website | VARCHAR(1000) | AI-extracted website | "AI_project_website" |
| ai_technologies | TEXT | AI-identified technologies | "AI_technologies" |
| ai_geographic_coverage_country_codes | TEXT | AI-identified country codes | "AI_geographic_coverage_county_codes" |

#### Programme & Funding

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| eu_programme | VARCHAR(255) | EU Programme name | "EU Programme", "Programme" |
| programme_interreg | VARCHAR(255) | Interreg programme name | "Programme Interreg" |
| type_of_action | VARCHAR(255) | Type of action | "Type of Action", "Type_of_action" |
| funded_under | VARCHAR(255) | Funding source | "Funded_under" |
| legal_basis | VARCHAR(500) | Legal basis for funding | "legalBasis" |
| funding_scheme | VARCHAR(255) | Funding scheme | "fundingScheme" |
| framework_programme | VARCHAR(255) | Framework programme | "frameworkProgramme" |
| master_call | VARCHAR(255) | Master call identifier | "masterCall" |
| sub_call | VARCHAR(255) | Sub-call identifier | "subCall" |
| call_serial_number | VARCHAR(100) | Call serial number | "Call serial number" |

#### 2021-2027 Programme Specific

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| programme_specific_objective | TEXT | Programme specific objective | "Programme specific objective (2021-2027 only)" |
| programme_priority | VARCHAR(500) | Programme priority | "Programme Priority (2021-2027 only)" |
| type_of_intervention | VARCHAR(500) | Type of intervention | "Type of intervention (2021-2027 only)" |

#### Financial Information

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| total_cost | DECIMAL(18,2) | Total project cost | "totalCost" |
| ec_max_contribution | DECIMAL(18,2) | EC maximum contribution | "ecMaxContribution" |
| erdf_contribution_amount | DECIMAL(18,2) | ERDF contribution amount | "ERDF Contribution (amount)" |
| erdf_contribution_rate | DECIMAL(5,2) | ERDF co-financing rate (%) | "ERDF Contribution (co-financing rate)" |

#### Dates

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| start_date | DATE | Project start date | "startDate" |
| end_date | DATE | Project end date | "endDate" |
| ec_signature_date | DATE | EC signature date | "ecSignatureDate" |
| content_update_date | TIMESTAMP | Last content update | "contentUpdateDate" |

#### Status & Classifications

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| status | VARCHAR(100) | Project status | "status" |
| platform | VARCHAR(255) | Platform | "Platform" |
| themes | TEXT | Project themes | "Themes" |
| priority_area | VARCHAR(500) | Priority area | "Priority Area" |
| year | VARCHAR(10) | Year | "Year" |

#### Output Indicators (2021-2027)

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| programme_output_indicator_1 | VARCHAR(500) | Output indicator 1 code and name | "Programme output indicator 1 code and name (2021-2027 only)" |
| programme_output_indicator_2 | VARCHAR(500) | Output indicator 2 code and name | "Programme output indicator 2 code and name (2021-2027 only)" |
| programme_output_indicator_3 | VARCHAR(500) | Output indicator 3 code and name | "Programme output indicator 3 code and name (2021-2027 only)" |
| programme_output_indicator_4 | VARCHAR(500) | Output indicator 4 code and name | "Programme output indicator 4 code and name (2021-2027 only)" |
| programme_output_indicator_5 | VARCHAR(500) | Output indicator 5 code and name | "Programme output indicator 5 code and name (2021-2027 only)" |
| programme_output_indicator_1_unit | VARCHAR(100) | Output indicator 1 unit | "Programme output indicator 1 measurement unit (2021-2027 only)" |
| programme_output_indicator_2_unit | VARCHAR(100) | Output indicator 2 unit | "Programme output indicator 2 measurement unit (2021-2027 only)" |
| programme_output_indicator_3_unit | VARCHAR(100) | Output indicator 3 unit | "Programme output indicator 3 measurement unit (2021-2027 only)" |
| programme_output_indicator_4_unit | VARCHAR(100) | Output indicator 4 unit | "Programme output indicator 4 measurement unit (2021-2027 only)" |
| programme_output_indicator_5_unit | VARCHAR(100) | Output indicator 5 unit | "Programme output indicator 5 measurement unit (2021-2027 only)" |

#### Result Indicators (2021-2027)

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| programme_result_indicator_1 | VARCHAR(500) | Result indicator 1 code and name | "Programme result indicator 1 code and name (2021-2027 only)" |
| programme_result_indicator_2 | VARCHAR(500) | Result indicator 2 code and name | "Programme result indicator 2 code and name (2021-2027 only)" |
| programme_result_indicator_3 | VARCHAR(500) | Result indicator 3 code and name | "Programme result indicator 3 code and name (2021-2027 only)" |
| programme_result_indicator_4 | VARCHAR(500) | Result indicator 4 code and name | "Programme result indicator 4 code and name (2021-2027 only)" |
| programme_result_indicator_5 | VARCHAR(500) | Result indicator 5 code and name | "Programme result indicator 5 code and name (2021-2027 only)" |
| programme_result_indicator_6 | VARCHAR(500) | Result indicator 6 code and name | "Programme result indicator 6 code and name (2021-2027 only)" |
| programme_result_indicator_1_unit | VARCHAR(100) | Result indicator 1 unit | "Programme result indicator 1 measurement unit (2021-2027 only)" |
| programme_result_indicator_2_unit | VARCHAR(100) | Result indicator 2 unit | "Programme result indicator 2 measurement unit (2021-2027 only)" |
| programme_result_indicator_3_unit | VARCHAR(100) | Result indicator 3 unit | "Programme result indicator 3 measurement unit (2021-2027 only)" |
| programme_result_indicator_4_unit | VARCHAR(100) | Result indicator 4 unit | "Programme result indicator 4 measurement unit (2021-2027 only)" |
| programme_result_indicator_5_unit | VARCHAR(100) | Result indicator 5 unit | "Programme result indicator 5 measurement unit (2021-2027 only)" |
| programme_result_indicator_6_unit | VARCHAR(100) | Result indicator 6 unit | "Programme result indicator 6 measurement unit (2021-2027 only)" |

#### Outputs and Results

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| project_outputs | TEXT | Project outputs | "Project Outputs (2021-2027 only)" |
| delivered_output_indicators | TEXT | Delivered output indicators | "Delivered output indicators (2021-2027 only)" |
| expected_outputs_en | TEXT | Expected outputs in English | "Expected outputs in English" |
| delivered_outputs_en | TEXT | Delivered outputs in English | "Delivered outputs in English" |
| delivered_result_indicators | TEXT | Delivered result indicators | "Delivered result indicators (2021-2027 only)" |
| expected_achievements_en | TEXT | Expected achievements in English | "Expected Achievements in English" |

#### Deliverables and Strategies

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| project_deliverables | TEXT | Project deliverables | "Project deliverables (2021-2027 only)" |
| contribution_to_strategies | TEXT | Contribution to wider strategies | "Project's contribution to wider strategies and policies (2021-2027 only)" |

#### Environmental & Conservation Fields

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| target_eu_legislative_references | TEXT | Target EU legislative references | "Target EU legislative references" |
| target_habitat_types | TEXT | Target habitat types | "Target habitat types" |
| species | TEXT | Species targeted | "Species" |
| natura_2000_sites | TEXT | Natura 2000 sites | "Natura 2000 sites" |
| european_union_mrs | TEXT | EU Marine Region Strategies | "European Union MRSs to which the project contributes" |

#### Linked Projects and URLs

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| linked_project | VARCHAR(255) | Linked project reference | "Linked project" |
| project_url | VARCHAR(1000) | Project URL | "Project URL" |
| project_url_webgate | VARCHAR(1000) | Webgate project URL | "Project URL webgate" |

#### Flags

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| project_selected | BOOLEAN | Project selected flag | "Project selected" |
| project_best | BOOLEAN | Best project flag | "Project best" |
| project_top | BOOLEAN | Top project flag | "Project top" |

---

### Table: partners

**Purpose:** Store information about project partners and beneficiaries

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| partner_id | INT | Primary key | - |
| project_id | INT | Foreign key to projects | - |
| external_project_id | VARCHAR(100) | External project ID | "Project id" |
| project_acronym | VARCHAR(200) | Project acronym | "Project Acronym" |
| organization_id | VARCHAR(100) | Organization ID | "organisationID" |
| rcn | VARCHAR(50) | RCN | "rcn" |
| order_number | INT | Partner order in project | "order" |
| name | VARCHAR(1000) | Organization name | "Name of the beneficiaries", "name" |
| short_name | VARCHAR(255) | Short name | "shortName" |
| vat_number | VARCHAR(100) | VAT number | "vatNumber" |
| street | VARCHAR(500) | Street address | "street" |
| city | VARCHAR(255) | City | "city" |
| post_code | VARCHAR(50) | Postal code | "postCode" |
| country | VARCHAR(100) | Country | "country" |
| nuts_code | VARCHAR(50) | NUTS regional code | "nutsCode" |
| geolocation | VARCHAR(100) | Geographic coordinates | "geolocation" |
| address_life | TEXT | Full LIFE address | "Address_life" |
| activity_type | VARCHAR(255) | Activity type | "activityType" |
| activity | VARCHAR(500) | Activity for Interreg | "Activity" |
| organization_url | VARCHAR(1000) | Organization URL | "organizationURL" |
| contact_form | VARCHAR(1000) | Contact form URL | "contactForm" |
| beneficiary_types | VARCHAR(255) | Beneficiary types | "Beneficiary types" |
| role | VARCHAR(100) | Role in project | "role" |
| sme | BOOLEAN | Is SME | "SME" |
| total_cost | DECIMAL(18,2) | Total cost | "totalCost" |
| ec_contribution | DECIMAL(18,2) | EC contribution | "ecContribution" |
| net_ec_contribution | DECIMAL(18,2) | Net EC contribution | "netEcContribution" |
| partner_total_eligible_budget | DECIMAL(18,2) | Total eligible budget | "Partner's total eligible budget / expenditure" |
| active | BOOLEAN | Is active | "active" |
| end_of_participation | DATE | End of participation | "endOfParticipation" |
| programme_interreg | VARCHAR(255) | Interreg programme | "Programme Interreg" |

---

### Table: deliverables

**Purpose:** Store project deliverables information

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| deliverable_id | INT | Primary key | - |
| project_id | INT | Foreign key to projects | - |
| external_deliverable_id | VARCHAR(100) | External deliverable ID | "id" |
| external_project_id | VARCHAR(100) | External project ID | "projectID" |
| project_acronym | VARCHAR(200) | Project acronym | "projectAcronym" |
| rcn | VARCHAR(50) | RCN | "rcn" |
| title | VARCHAR(1000) | Deliverable title | "title" |
| description | TEXT | Deliverable description | "description" |
| deliverable_type | VARCHAR(255) | Type of deliverable | "deliverableType" |
| collection | VARCHAR(255) | Collection | "collection" |
| url | VARCHAR(1000) | Deliverable URL | "url" |
| programme_interreg | VARCHAR(255) | Interreg programme | "Programme Interreg" |
| content_update_date | TIMESTAMP | Content update date | "contentUpdateDate" |

---

### Table: reports

**Purpose:** Store project reports

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| report_id | INT | Primary key | - |
| project_id | INT | Foreign key to projects | - |
| external_report_id | VARCHAR(100) | External report ID | "id" |
| external_project_id | VARCHAR(100) | External project ID | "projectID" |
| project_acronym | VARCHAR(200) | Project acronym | "projectAcronym" |
| rcn | VARCHAR(50) | RCN | "rcn" |
| title | VARCHAR(1000) | Report title | "title" |
| attachment | VARCHAR(1000) | Attachment URL/path | "attachment" |
| content_update_date | TIMESTAMP | Content update date | "contentUpdateDate" |

---

### Table: publications

**Purpose:** Store scientific publications from projects

| Field | Type | Description | Source Field |
|-------|------|-------------|--------------|
| publication_id | INT | Primary key | - |
| project_id | INT | Foreign key to projects | - |
| external_publication_id | VARCHAR(100) | External publication ID | "id" |
| external_project_id | VARCHAR(100) | External project ID | "projectID" |
| project_acronym | VARCHAR(200) | Project acronym | "projectAcronym" |
| rcn | VARCHAR(50) | RCN | "rcn" |
| title | VARCHAR(2000) | Publication title | "title" |
| is_published_as | VARCHAR(255) | Publication type/format | "isPublishedAs" |
| authors | TEXT | Authors | "authors" |
| journal_title | VARCHAR(1000) | Journal title | "journalTitle" |
| journal_number | VARCHAR(100) | Journal number | "journalNumber" |
| published_year | VARCHAR(10) | Publication year | "publishedYear" |
| published_pages | VARCHAR(100) | Published pages | "publishedPages" |
| issn | VARCHAR(50) | ISSN | "issn" |
| isbn | VARCHAR(50) | ISBN | "isbn" |
| doi | VARCHAR(255) | DOI | "doi" |
| collection | VARCHAR(255) | Collection | "collection" |
| content_update_date | TIMESTAMP | Content update date | "contentUpdateDate" |

---

## Relationships

### One-to-Many Relationships

1. **projects → partners**
   - One project has many partners
   - Foreign key: `partners.project_id`
   - Cascade delete: Yes

2. **projects → deliverables**
   - One project has many deliverables
   - Foreign key: `deliverables.project_id`
   - Cascade delete: Yes

3. **projects → publications**
   - One project has many publications
   - Foreign key: `publications.project_id`
   - Cascade delete: Yes

4. **projects → reports**
   - One project has many reports
   - Foreign key: `reports.project_id`
   - Cascade delete: Yes

### Many-to-Many Relationships

1. **projects ↔ topics**
   - Junction table: `project_topics`
   - A project can have multiple topics
   - A topic can be used by multiple projects

2. **projects ↔ keywords**
   - Junction table: `project_keywords`
   - A project can have multiple keywords
   - A keyword can be used by multiple projects
   - Source tracking: Original, Manual, Auto-Generated, AI-Generated

---

## Field Mappings

### Source Data to Database Fields

This section maps your source data fields to database fields:

#### Project Fields Mapping

**Basic Information:**
- `Project id` → `projects.external_project_id`
- `Project Acronym` / `Acronym` / `acronym` → `projects.project_acronym`
- `id` → `projects.external_project_id`
- `title` → `projects.title`
- `rcn` → `projects.rcn`
- `grantDoi` → `projects.grant_doi`

**Programme & Funding:**
- `EU Programme` / `Programme` → `projects.eu_programme`
- `Programme Interreg` → `projects.programme_interreg`
- `Type of Action` / `Type_of_action` → `projects.type_of_action`
- `Funded_under` → `projects.funded_under`
- All other programme fields map directly to corresponding database fields

**Keywords:**
- `Keywords` / `keywords` → Parsed and stored in `keywords` table, linked via `project_keywords`

#### Partner Fields Mapping

All partner fields from your source data map directly to the `partners` table with appropriate field names.

#### Deliverable Fields Mapping

All deliverable fields map directly to the `deliverables` table.

#### Publication Fields Mapping

All publication fields map directly to the `publications` table.

#### Report Fields Mapping

All report fields map directly to the `reports` table.

---

## Usage Examples

### Example 1: Get all projects with their coordinators

```sql
SELECT
    p.project_acronym,
    p.title,
    p.total_cost,
    partner.name AS coordinator_name,
    partner.country AS coordinator_country
FROM projects p
LEFT JOIN partners partner ON p.project_id = partner.project_id
    AND partner.role = 'Coordinator';
```

### Example 2: Get project with all related data

```sql
SELECT
    p.*,
    COUNT(DISTINCT part.partner_id) AS partner_count,
    COUNT(DISTINCT d.deliverable_id) AS deliverable_count,
    COUNT(DISTINCT pub.publication_id) AS publication_count,
    COUNT(DISTINCT r.report_id) AS report_count
FROM projects p
LEFT JOIN partners part ON p.project_id = part.project_id
LEFT JOIN deliverables d ON p.project_id = d.project_id
LEFT JOIN publications pub ON p.project_id = pub.project_id
LEFT JOIN reports r ON p.project_id = r.project_id
WHERE p.project_acronym = 'PROJECT_NAME'
GROUP BY p.project_id;
```

### Example 3: Search projects by keyword

```sql
SELECT DISTINCT p.*
FROM projects p
INNER JOIN project_keywords pk ON p.project_id = pk.project_id
INNER JOIN keywords k ON pk.keyword_id = k.keyword_id
WHERE k.keyword_text IN ('marine', 'biodiversity', 'restoration');
```

### Example 4: Get all Interreg projects from 2021-2027

```sql
SELECT *
FROM projects
WHERE programme_interreg LIKE '%2021%'
    OR (eu_programme LIKE '%Interreg%' AND YEAR(start_date) >= 2021);
```

### Example 5: Get partners by country with project counts

```sql
SELECT
    country,
    COUNT(DISTINCT partner_id) AS partner_count,
    COUNT(DISTINCT project_id) AS project_count,
    SUM(total_cost) AS total_budget
FROM partners
WHERE country IS NOT NULL
GROUP BY country
ORDER BY project_count DESC;
```

---

## Data Import Notes

### CSV/Excel Import Considerations

1. **Date Formats**: Ensure dates are in YYYY-MM-DD format before import
2. **Decimal Values**: Use dot (.) as decimal separator for financial fields
3. **Boolean Values**: Convert to TRUE/FALSE or 1/0
4. **NULL Values**: Empty cells should be imported as NULL, not empty strings
5. **Text Encoding**: Use UTF-8 encoding to preserve special characters

### Import Order

To maintain referential integrity, import in this order:

1. `programmes`
2. `topics`
3. `keywords`
4. `projects`
5. `partners`
6. `deliverables`
7. `publications`
8. `reports`
9. `project_topics` (junction table)
10. `project_keywords` (junction table)

### Handling External IDs

All tables have `external_*_id` fields to maintain reference to original data sources. This allows:
- Tracking data provenance
- Preventing duplicate imports
- Updating existing records
- Cross-referencing with source systems

---

## Performance Optimization

### Indexed Fields

All the following are indexed for fast searching:
- Project acronyms
- External IDs
- RCN numbers
- Countries
- Dates
- Programme types
- Partner roles

### Full-Text Search

Full-text indexes on:
- `projects`: title, abstract, objectives, keywords
- `publications`: title, authors

Use full-text search like:
```sql
SELECT * FROM projects
WHERE MATCH(title, abstract, objectives) AGAINST('marine restoration' IN NATURAL LANGUAGE MODE);
```

---

## Data Quality Guidelines

### Required Fields for Valid Project

- `title` (mandatory)
- `project_acronym` OR `external_project_id` (at least one)
- At least one partner with `role = 'Coordinator'`

### Validation Rules

- `end_date` must be >= `start_date`
- Financial amounts should be positive
- `erdf_contribution_rate` should be between 0 and 100
- Email addresses should be valid format
- URLs should start with http:// or https://

---

## Future Enhancements

Potential additions:
- Audit logging table
- User access control
- Document versioning
- Multi-language support
- GIS/mapping data
- Impact metrics
- Social media links
- Event tracking

---

**Document Version:** 2.0
**Created:** 2025-11-19
**Next Review:** 2025-12-19
