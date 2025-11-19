-- ============================================================================
-- Sample Data for EU Projects Database
-- This file contains sample/test data for development and testing
-- ============================================================================

USE eu_projects_db;

-- ============================================================================
-- Sample Projects
-- ============================================================================

INSERT INTO projects (
    external_project_id,
    project_acronym,
    rcn,
    title,
    abstract,
    objectives,
    eu_programme,
    type_of_action,
    total_cost,
    ec_max_contribution,
    start_date,
    end_date,
    status,
    project_url
) VALUES
(
    '101234567',
    'OCEANBLUE',
    'RCN123456',
    'Ocean Restoration and Blue Economy Innovation',
    'This project aims to develop innovative solutions for ocean restoration while promoting sustainable blue economy practices in the Mediterranean region.',
    'To restore marine ecosystems; To promote sustainable fishing; To develop new blue technologies; To engage coastal communities',
    'Horizon Europe',
    'Research and Innovation Action',
    5000000.00,
    4500000.00,
    '2022-01-01',
    '2025-12-31',
    'Active',
    'https://oceanblue-project.eu'
),
(
    '202345678',
    'MARINELIFE',
    'RCN234567',
    'Marine Biodiversity Conservation in Mediterranean Coastal Areas',
    'A comprehensive approach to conserving marine biodiversity through community engagement and scientific research.',
    'Protect endangered species; Restore coastal habitats; Engage local communities in conservation',
    'LIFE Programme',
    'LIFE Nature',
    3000000.00,
    2250000.00,
    '2021-06-01',
    '2026-05-31',
    'Active',
    'https://marinelife-project.eu'
),
(
    '303456789',
    'INTERREG-COAST',
    'RCN345678',
    'Coastal Resilience and Sustainable Tourism Development',
    'Building resilient coastal communities through sustainable tourism and climate adaptation strategies.',
    'Develop climate adaptation plans; Promote sustainable tourism; Strengthen cross-border cooperation',
    'Interreg Mediterranean',
    'Standard Project',
    2500000.00,
    2125000.00,
    '2022-09-01',
    '2025-08-31',
    'Active',
    'https://interreg-coast.eu'
),
(
    '404567890',
    'CLEANOCEAN',
    'RCN456789',
    'Reducing Marine Pollution Through Innovative Technologies',
    'Developing and deploying innovative technologies to reduce plastic pollution and other contaminants in marine environments.',
    'Reduce plastic pollution by 50%; Develop waste collection systems; Raise awareness about marine pollution',
    'Horizon 2020',
    'Innovation Action',
    4200000.00,
    3780000.00,
    '2019-03-01',
    '2023-02-28',
    'Completed',
    'https://cleanocean-project.eu'
),
(
    '505678901',
    'BLUEGROWTH',
    'RCN567890',
    'Sustainable Aquaculture and Fisheries Innovation',
    'Promoting sustainable practices in aquaculture and fisheries to support blue growth in Mediterranean countries.',
    'Improve aquaculture sustainability; Support small-scale fisheries; Transfer knowledge to stakeholders',
    'Horizon Europe',
    'Coordination and Support Action',
    1800000.00,
    1800000.00,
    '2023-01-01',
    '2025-12-31',
    'Active',
    'https://bluegrowth-project.eu'
);

-- ============================================================================
-- Sample Partners
-- ============================================================================

INSERT INTO partners (
    project_id,
    external_project_id,
    project_acronym,
    organization_id,
    name,
    short_name,
    role,
    country,
    city,
    activity_type,
    total_cost,
    ec_contribution,
    sme,
    order_number
) VALUES
-- OCEANBLUE partners
(1, '101234567', 'OCEANBLUE', 'ORG001', 'Mediterranean Marine Research Institute', 'MMRI', 'Coordinator', 'Italy', 'Rome', 'Research', 1500000.00, 1350000.00, FALSE, 1),
(1, '101234567', 'OCEANBLUE', 'ORG002', 'Blue Tech Solutions SRL', 'BTS', 'Partner', 'Spain', 'Barcelona', 'Technology', 1200000.00, 1080000.00, TRUE, 2),
(1, '101234567', 'OCEANBLUE', 'ORG003', 'Greek Ocean Conservation NGO', 'GOCN', 'Partner', 'Greece', 'Athens', 'NGO', 800000.00, 720000.00, FALSE, 3),
(1, '101234567', 'OCEANBLUE', 'ORG004', 'French Coastal Development Agency', 'FCDA', 'Partner', 'France', 'Marseille', 'Government', 1500000.00, 1350000.00, FALSE, 4),

-- MARINELIFE partners
(2, '202345678', 'MARINELIFE', 'ORG005', 'Croatian Marine Institute', 'CMI', 'Coordinator', 'Croatia', 'Split', 'Research', 1200000.00, 900000.00, FALSE, 1),
(2, '202345678', 'MARINELIFE', 'ORG006', 'Mediterranean Conservation Society', 'MCS', 'Partner', 'Malta', 'Valletta', 'NGO', 900000.00, 675000.00, FALSE, 2),
(2, '202345678', 'MARINELIFE', 'ORG007', 'Albanian Coastal Community Network', 'ACCN', 'Partner', 'Albania', 'Tirana', 'Community', 900000.00, 675000.00, FALSE, 3),

-- INTERREG-COAST partners
(3, '303456789', 'INTERREG-COAST', 'ORG008', 'Slovenian Tourism Board', 'STB', 'Coordinator', 'Slovenia', 'Ljubljana', 'Government', 800000.00, 680000.00, FALSE, 1),
(3, '303456789', 'INTERREG-COAST', 'ORG009', 'Italian Coastal Cities Association', 'ICCA', 'Partner', 'Italy', 'Venice', 'Local Authority', 850000.00, 722500.00, FALSE, 2),
(3, '303456789', 'INTERREG-COAST', 'ORG010', 'Croatian Tourism Innovation Hub', 'CTIH', 'Partner', 'Croatia', 'Dubrovnik', 'Technology', 850000.00, 722500.00, TRUE, 3),

-- CLEANOCEAN partners
(4, '404567890', 'CLEANOCEAN', 'ORG011', 'Spanish Environmental Technology Center', 'SETC', 'Coordinator', 'Spain', 'Valencia', 'Research', 1500000.00, 1350000.00, FALSE, 1),
(4, '404567890', 'CLEANOCEAN', 'ORG012', 'Portuguese Marine Pollution Agency', 'PMPA', 'Partner', 'Portugal', 'Lisbon', 'Government', 1200000.00, 1080000.00, FALSE, 2),
(4, '404567890', 'CLEANOCEAN', 'ORG013', 'Greek Clean Sea Initiative', 'GCSI', 'Partner', 'Greece', 'Thessaloniki', 'NGO', 1500000.00, 1350000.00, FALSE, 3),

-- BLUEGROWTH partners
(5, '505678901', 'BLUEGROWTH', 'ORG014', 'European Aquaculture Federation', 'EAF', 'Coordinator', 'Belgium', 'Brussels', 'International', 600000.00, 600000.00, FALSE, 1),
(5, '505678901', 'BLUEGROWTH', 'ORG015', 'Turkish Fisheries Research Institute', 'TFRI', 'Partner', 'Turkey', 'Ankara', 'Research', 400000.00, 400000.00, FALSE, 2),
(5, '505678901', 'BLUEGROWTH', 'ORG016', 'Tunisian Aquaculture Cooperative', 'TAC', 'Partner', 'Tunisia', 'Tunis', 'Community', 400000.00, 400000.00, FALSE, 3),
(5, '505678901', 'BLUEGROWTH', 'ORG017', 'Cyprus Marine Technologies Ltd', 'CMTL', 'Partner', 'Cyprus', 'Limassol', 'Technology', 400000.00, 400000.00, TRUE, 4);

-- ============================================================================
-- Sample Deliverables
-- ============================================================================

INSERT INTO deliverables (
    project_id,
    external_project_id,
    project_acronym,
    title,
    description,
    deliverable_type,
    url
) VALUES
(1, '101234567', 'OCEANBLUE', 'Project Management Plan', 'Comprehensive plan for project management and coordination', 'Report', 'https://oceanblue-project.eu/deliverables/d1.1'),
(1, '101234567', 'OCEANBLUE', 'Ocean Restoration Toolkit', 'Digital toolkit for ocean restoration practitioners', 'Software', 'https://oceanblue-project.eu/deliverables/d2.1'),
(1, '101234567', 'OCEANBLUE', 'Blue Economy Innovation Roadmap', 'Strategic roadmap for blue economy innovation', 'Report', 'https://oceanblue-project.eu/deliverables/d3.1'),
(2, '202345678', 'MARINELIFE', 'Baseline Biodiversity Assessment', 'Comprehensive assessment of marine biodiversity in target areas', 'Report', 'https://marinelife-project.eu/deliverables/d1.1'),
(2, '202345678', 'MARINELIFE', 'Community Engagement Strategy', 'Strategy for engaging local communities in conservation', 'Report', 'https://marinelife-project.eu/deliverables/d2.1'),
(3, '303456789', 'INTERREG-COAST', 'Climate Adaptation Toolkit', 'Toolkit for coastal climate adaptation planning', 'Tool', 'https://interreg-coast.eu/deliverables/d1.1'),
(3, '303456789', 'INTERREG-COAST', 'Sustainable Tourism Guidelines', 'Best practice guidelines for sustainable coastal tourism', 'Guidelines', 'https://interreg-coast.eu/deliverables/d2.1'),
(4, '404567890', 'CLEANOCEAN', 'Marine Litter Monitoring System', 'Automated system for monitoring marine litter', 'Technology', 'https://cleanocean-project.eu/deliverables/d1.1'),
(4, '404567890', 'CLEANOCEAN', 'Final Project Report', 'Comprehensive final report on project achievements', 'Report', 'https://cleanocean-project.eu/deliverables/d5.1');

-- ============================================================================
-- Sample Publications
-- ============================================================================

INSERT INTO publications (
    project_id,
    external_project_id,
    project_acronym,
    title,
    authors,
    journal_title,
    published_year,
    doi,
    is_published_as
) VALUES
(1, '101234567', 'OCEANBLUE', 'Innovative Approaches to Ocean Restoration in the Mediterranean', 'Smith, J., Rossi, M., Garcia, A.', 'Marine Ecology Progress Series', '2023', '10.1234/meps.2023.001', 'Journal Article'),
(1, '101234567', 'OCEANBLUE', 'Blue Economy and Sustainable Development: Lessons from Mediterranean Projects', 'Garcia, A., Papadopoulos, K.', 'Ocean & Coastal Management', '2024', '10.1234/ocm.2024.002', 'Journal Article'),
(2, '202345678', 'MARINELIFE', 'Community-Based Marine Conservation: A Mediterranean Case Study', 'Kovač, D., Borg, M.', 'Conservation Biology', '2023', '10.1234/cb.2023.003', 'Journal Article'),
(4, '404567890', 'CLEANOCEAN', 'Novel Technologies for Marine Plastic Pollution Reduction', 'Martinez, L., Silva, P.', 'Environmental Science & Technology', '2022', '10.1234/est.2022.004', 'Journal Article'),
(4, '404567890', 'CLEANOCEAN', 'Impact of Marine Litter on Mediterranean Ecosystems', 'Martinez, L., Papadopoulos, K., Silva, P.', 'Marine Pollution Bulletin', '2023', '10.1234/mpb.2023.005', 'Journal Article');

-- ============================================================================
-- Sample Reports
-- ============================================================================

INSERT INTO reports (
    project_id,
    external_project_id,
    project_acronym,
    title,
    attachment
) VALUES
(1, '101234567', 'OCEANBLUE', 'Year 1 Progress Report', 'https://oceanblue-project.eu/reports/year1.pdf'),
(1, '101234567', 'OCEANBLUE', 'Year 2 Progress Report', 'https://oceanblue-project.eu/reports/year2.pdf'),
(2, '202345678', 'MARINELIFE', 'Mid-term Progress Report', 'https://marinelife-project.eu/reports/midterm.pdf'),
(3, '303456789', 'INTERREG-COAST', 'Annual Activity Report 2023', 'https://interreg-coast.eu/reports/2023.pdf'),
(4, '404567890', 'CLEANOCEAN', 'Final Technical Report', 'https://cleanocean-project.eu/reports/final.pdf'),
(5, '505678901', 'BLUEGROWTH', 'Year 1 Progress Report', 'https://bluegrowth-project.eu/reports/year1.pdf');

-- ============================================================================
-- Sample Keywords
-- ============================================================================

INSERT INTO keywords (keyword_text, keyword_category) VALUES
('marine restoration', 'Environment'),
('blue economy', 'Economy'),
('biodiversity', 'Environment'),
('sustainable tourism', 'Economy'),
('climate adaptation', 'Climate'),
('marine pollution', 'Environment'),
('plastic waste', 'Environment'),
('aquaculture', 'Economy'),
('fisheries', 'Economy'),
('coastal communities', 'Society'),
('innovation', 'Technology'),
('conservation', 'Environment'),
('Mediterranean', 'Geography'),
('sustainability', 'Environment'),
('stakeholder engagement', 'Society');

-- ============================================================================
-- Sample Project-Keyword Relationships
-- ============================================================================

INSERT INTO project_keywords (project_id, keyword_id, source) VALUES
-- OCEANBLUE keywords
(1, 1, 'Original'), -- marine restoration
(1, 2, 'Original'), -- blue economy
(1, 11, 'Original'), -- innovation

-- MARINELIFE keywords
(2, 3, 'Original'), -- biodiversity
(2, 12, 'Original'), -- conservation
(2, 10, 'Original'), -- coastal communities
(2, 13, 'Original'), -- Mediterranean

-- INTERREG-COAST keywords
(3, 4, 'Original'), -- sustainable tourism
(3, 5, 'Original'), -- climate adaptation
(3, 10, 'Original'), -- coastal communities

-- CLEANOCEAN keywords
(4, 6, 'Original'), -- marine pollution
(4, 7, 'Original'), -- plastic waste
(4, 11, 'Original'), -- innovation

-- BLUEGROWTH keywords
(5, 8, 'Original'), -- aquaculture
(5, 9, 'Original'), -- fisheries
(5, 14, 'Original'), -- sustainability
(5, 15, 'Original'); -- stakeholder engagement

-- ============================================================================
-- Sample Topics
-- ============================================================================

INSERT INTO topics (topic_code, topic_title, topic_description) VALUES
('BG-08-2018-2019', 'Blue Bioeconomy - Demonstration', 'Demonstration of innovative blue bioeconomy solutions'),
('LC-GD-8-1-2020', 'Restoration of marine and coastal ecosystems', 'Supporting restoration of degraded marine and coastal ecosystems'),
('CE-HLTH-05-2020', 'Health impacts of marine pollution', 'Investigating health impacts of marine pollution and mitigation strategies');

-- ============================================================================
-- Sample Project-Topic Relationships
-- ============================================================================

INSERT INTO project_topics (project_id, topic_id) VALUES
(1, 2), -- OCEANBLUE - Restoration
(2, 2), -- MARINELIFE - Restoration
(4, 3), -- CLEANOCEAN - Health impacts
(5, 1); -- BLUEGROWTH - Blue Bioeconomy

-- ============================================================================
-- END OF SAMPLE DATA
-- ============================================================================

-- Display summary
SELECT 'Sample data inserted successfully!' AS message;

SELECT
    (SELECT COUNT(*) FROM projects) AS projects,
    (SELECT COUNT(*) FROM partners) AS partners,
    (SELECT COUNT(*) FROM deliverables) AS deliverables,
    (SELECT COUNT(*) FROM publications) AS publications,
    (SELECT COUNT(*) FROM reports) AS reports,
    (SELECT COUNT(*) FROM keywords) AS keywords,
    (SELECT COUNT(*) FROM topics) AS topics;
