#!/usr/bin/env python3
"""
Generate realistic dummy data as TypeScript/JavaScript files for React and HTML apps
Creates 10 varied projects with all related data directly in the frontend
Optimized for testing and simulation with diverse, representative data
"""

import random
import json
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
NUM_PROJECTS = 10  # Generate 10 varied projects for stable testing and simulation
OUTPUT_DIR_REACT = Path(__file__).parent.parent / 'react_mock_elazem' / 'data'
OUTPUT_DIR_HTML = Path(__file__).parent.parent / 'html_mock_elazem'

# Ensure output directories exist
OUTPUT_DIR_REACT.mkdir(exist_ok=True)
OUTPUT_DIR_HTML.mkdir(exist_ok=True)

# Data pools for realistic generation
PROGRAMMES = [
    ('Horizon 2020', 0.35),
    ('Horizon Europe', 0.30),
    ('LIFE Programme', 0.15),
    ('Interreg Mediterranean', 0.10),
    ('ERDF', 0.10)
]

PROJECT_PREFIXES = [
    'OCEAN', 'MARINE', 'BLUE', 'SEA', 'COASTAL', 'AQUA', 'BIO', 'ECO',
    'SUSTAIN', 'GREEN', 'CLEAN', 'RESTORE', 'PROTECT', 'CONSERVE', 'INNOVATE',
    'SMART', 'DIGITAL', 'TECH', 'FUTURE', 'EURO', 'MED', 'ADRIATIC', 'AEGEAN'
]

PROJECT_SUFFIXES = [
    'PLUS', 'PRO', 'NEXT', 'FUTURE', 'VISION', 'ACTION', 'PLAN', 'STRATEGY',
    'ALLIANCE', 'NETWORK', 'HUB', 'LAB', 'CENTER', '2030', '4OCEAN', 'CONNECT'
]

ACTION_TYPES = [
    'Research and Innovation Action',
    'Innovation Action',
    'Coordination and Support Action',
    'Standard Project',
    'LIFE Nature',
    'LIFE Environment',
    'Regional Cooperation'
]

COUNTRIES = [
    'Italy', 'Spain', 'France', 'Greece', 'Croatia', 'Portugal', 'Slovenia',
    'Malta', 'Cyprus', 'Albania', 'Turkey', 'Tunisia', 'Morocco', 'Egypt',
    'Lebanon', 'Israel', 'Bosnia and Herzegovina', 'Montenegro'
]

CITIES = {
    'Italy': ['Rome', 'Venice', 'Naples', 'Genoa', 'Trieste', 'Bari', 'Palermo'],
    'Spain': ['Barcelona', 'Valencia', 'Malaga', 'Seville', 'Alicante'],
    'France': ['Marseille', 'Nice', 'Toulon', 'Montpellier'],
    'Greece': ['Athens', 'Thessaloniki', 'Piraeus', 'Heraklion'],
    'Croatia': ['Split', 'Dubrovnik', 'Rijeka', 'Zadar'],
    'Portugal': ['Lisbon', 'Porto', 'Faro'],
    'Slovenia': ['Ljubljana', 'Koper', 'Piran'],
    'Malta': ['Valletta', 'Sliema'],
    'Cyprus': ['Limassol', 'Nicosia', 'Larnaca'],
    'Albania': ['Tirana', 'Durres', 'Vlore'],
    'Turkey': ['Istanbul', 'Izmir', 'Antalya'],
    'Tunisia': ['Tunis', 'Sfax'],
    'Morocco': ['Tangier', 'Casablanca'],
    'Egypt': ['Alexandria', 'Cairo'],
    'Lebanon': ['Beirut', 'Tripoli'],
    'Israel': ['Tel Aviv', 'Haifa'],
    'Bosnia and Herzegovina': ['Sarajevo', 'Mostar'],
    'Montenegro': ['Podgorica', 'Kotor']
}

ORG_TYPES = [
    'University', 'Research Institute', 'Technology Center', 'NGO',
    'Government Agency', 'Private Company', 'SME', 'Foundation',
    'Regional Authority', 'Municipality', 'Association', 'Cooperative'
]

KEYWORDS = [
    'marine biodiversity', 'ocean restoration', 'blue economy', 'sustainable fisheries',
    'aquaculture', 'coastal management', 'marine pollution', 'plastic waste',
    'climate change', 'ecosystem services', 'marine protected areas', 'conservation',
    'renewable energy', 'maritime transport', 'blue growth', 'circular economy',
    'water quality', 'coastal erosion', 'marine habitats', 'species protection',
    'sustainable tourism', 'stakeholder engagement', 'innovation', 'digitalization',
    'monitoring systems', 'data management', 'policy development', 'capacity building',
    'nature-based solutions', 'green infrastructure'
]

TECHNOLOGIES = [
    'Remote sensing', 'AI/Machine Learning', 'IoT sensors', 'Blockchain',
    'Big data analytics', 'GIS mapping', 'Drones/UAVs', 'Satellite imagery',
    'Mobile apps', 'Cloud computing', 'Decision support systems', 'Digital twins'
]

MISSION_PILLARS = [
    'Pollution prevention and reduction',
    'Conservation and restoration',
    'Sustainable blue economy',
    'Climate adaptation',
    'Circular economy'
]

OBJECTIVES = [
    'Marine ecosystem protection',
    'Sustainable resource management',
    'Climate change mitigation',
    'Biodiversity conservation',
    'Community engagement',
    'Policy development',
    'Innovation and technology',
    'Capacity building'
]

CLUSTERS = [
    'Blue Biotechnology',
    'Marine Renewable Energy',
    'Sustainable Fisheries',
    'Coastal Tourism',
    'Marine Conservation',
    'Port and Shipping',
    'Marine Data and AI'
]

DELIVERABLE_TYPES = [
    'Report', 'Software', 'Dataset', 'Prototype', 'Guidelines', 'Toolkit',
    'Platform', 'Training Material', 'Policy Brief', 'Best Practice Guide'
]

STATUSES = [
    ('Active', 0.60),
    ('Completed', 0.30),
    ('Planned', 0.05),
    ('Suspended', 0.03),
    ('Closed', 0.02)
]

def weighted_choice(choices):
    """Select item based on weights"""
    items, weights = zip(*choices)
    return random.choices(items, weights=weights, k=1)[0]

def random_date(start_year=2014, end_year=2027):
    """Generate random date"""
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime('%Y-%m-%d')

def generate_project_acronym():
    """Generate realistic project acronym"""
    prefix = random.choice(PROJECT_PREFIXES)
    if random.random() > 0.5:
        suffix = random.choice(PROJECT_SUFFIXES)
        return f"{prefix}-{suffix}"
    elif random.random() > 0.7:
        number = random.randint(1, 99)
        return f"{prefix}{number}"
    return prefix

def generate_organization_name(country, org_type):
    """Generate organization name"""
    city = random.choice(CITIES.get(country, ['Capital']))

    templates = [
        f"{city} {org_type}",
        f"{country} Institute of Marine Sciences",
        f"{city} Center for Ocean Research",
        f"Mediterranean {org_type} - {country}",
        f"{country} {org_type} for Blue Economy",
        f"{city} Innovation Hub",
        f"{country} Coastal Development Agency",
        f"{city} Maritime Technology Center"
    ]

    return random.choice(templates)

def generate_project_title(acronym):
    """Generate project title"""
    themes = [
        'Sustainable Ocean Management and Blue Economy Development',
        'Marine Biodiversity Conservation and Ecosystem Restoration',
        'Innovative Solutions for Marine Pollution Reduction',
        'Climate Adaptation Strategies for Coastal Communities',
        'Digital Transformation of Maritime Industries',
        'Sustainable Fisheries and Aquaculture Innovation',
        'Coastal Resilience and Natural Hazard Prevention',
        'Marine Renewable Energy Development',
        'Integrated Coastal Zone Management',
        'Blue Biotechnology and Marine Resources'
    ]

    return f"{acronym}: {random.choice(themes)} in the Mediterranean Region"

def generate_abstract(title):
    """Generate project abstract"""
    templates = [
        f"This project addresses critical challenges in the Mediterranean through innovative approaches. {title} focuses on developing sustainable solutions that benefit both the environment and local communities. Through collaborative research and stakeholder engagement, the project will deliver practical tools and knowledge for long-term impact.",

        f"The {title} initiative brings together leading organizations to tackle pressing environmental and socio-economic issues. By combining cutting-edge technology with traditional knowledge, the project will create innovative pathways for sustainable development in coastal and marine areas.",

        f"Addressing the urgent need for sustainable development, this project develops comprehensive strategies. Through interdisciplinary collaboration and community participation, the initiative will contribute to achieving EU environmental and blue economy objectives."
    ]

    return random.choice(templates)

def generate_projects():
    """Generate all project data"""
    print(f"Generating {NUM_PROJECTS} projects...")

    projects = []
    partners_all = []
    deliverables_all = []
    publications_all = []
    partner_id = 1
    deliverable_id = 1
    publication_id = 1

    for i in range(NUM_PROJECTS):
        project_id = i + 1
        acronym = generate_project_acronym()
        title = generate_project_title(acronym)
        programme = weighted_choice(PROGRAMMES)
        status = weighted_choice(STATUSES)
        action_type = random.choice(ACTION_TYPES)

        # Dates
        start_date = random_date(2015, 2024)
        start = datetime.strptime(start_date, '%Y-%m-%d')
        duration_months = random.randint(24, 60)
        end = start + timedelta(days=duration_months * 30)
        end_date = end.strftime('%Y-%m-%d')

        # Budget
        total_cost = random.randint(500000, 10000000)
        ec_contribution = total_cost * random.uniform(0.70, 0.95)

        # Select random attributes
        selected_pillars = random.sample(MISSION_PILLARS, random.randint(1, 3))
        selected_objectives = random.sample(OBJECTIVES, random.randint(2, 4))
        selected_clusters = random.sample(CLUSTERS, random.randint(1, 2))
        selected_technologies = random.sample(TECHNOLOGIES, random.randint(2, 5))
        selected_keywords = random.sample(KEYWORDS, random.randint(3, 7))

        # Partners for this project
        num_partners = random.randint(3, 10)
        project_partners = []

        for j in range(num_partners):
            country = random.choice(COUNTRIES)
            org_type = random.choice(ORG_TYPES)
            org_name = generate_organization_name(country, org_type)
            city = random.choice(CITIES.get(country, ['Capital']))

            role = 'Lead Partner' if j == 0 else 'Partner'
            partner_budget = random.randint(100000, 2000000)

            partner = {
                'id': partner_id,
                'projectId': project_id,
                'name': org_name,
                'country': country,
                'city': city,
                'type': org_type,
                'role': role,
                'budget': partner_budget
            }

            project_partners.append(partner)
            partners_all.append(partner)
            partner_id += 1

        # Get lead partner info
        lead_partner = project_partners[0]

        # Deliverables (40% of projects)
        if random.random() < 0.4:
            num_deliverables = random.randint(2, 6)
            for j in range(num_deliverables):
                deliverable = {
                    'id': deliverable_id,
                    'projectId': project_id,
                    'title': f"{random.choice(DELIVERABLE_TYPES)} - {random.choice(['Methodology', 'Results', 'Guidelines', 'Tools', 'Analysis'])}",
                    'type': random.choice(DELIVERABLE_TYPES),
                    'status': 'Completed' if status == 'Completed' else 'In Progress'
                }
                deliverables_all.append(deliverable)
                deliverable_id += 1

        # Publications (30% of projects)
        if random.random() < 0.3 and status in ['Completed', 'Active']:
            num_pubs = random.randint(1, 3)
            for j in range(num_pubs):
                publication = {
                    'id': publication_id,
                    'projectId': project_id,
                    'title': f'Research on {random.choice(KEYWORDS).title()}',
                    'year': random.randint(2018, 2024),
                    'authors': f'{random.choice(["Smith", "Garcia", "Mueller", "Rossi"])}, et al.'
                }
                publications_all.append(publication)
                publication_id += 1

        # Create project object
        project = {
            'id': project_id,
            'acronym': acronym,
            'title': title,
            'description': generate_abstract(title),
            'programme': programme,
            'typeOfAction': action_type,
            'status': status,
            'startDate': start_date,
            'endDate': end_date,
            'totalBudget': total_cost,
            'euContribution': int(ec_contribution),
            'leadPartner': lead_partner['name'],
            'leadCountry': lead_partner['country'],
            'leadCity': lead_partner['city'],
            'missionPillars': selected_pillars,
            'objectives': selected_objectives,
            'clusters': selected_clusters,
            'technologies': selected_technologies,
            'keywords': selected_keywords,
            'geographicZones': random.sample(COUNTRIES, random.randint(2, 5)),
            'partnerCount': num_partners,
            'website': f'https://{acronym.lower().replace("-", "")}-project.eu'
        }

        projects.append(project)

        if (i + 1) % 100 == 0:
            print(f"  Generated {i + 1} projects...")

    print(f"✓ Generated {len(projects)} projects")
    print(f"✓ Generated {len(partners_all)} partners")
    print(f"✓ Generated {len(deliverables_all)} deliverables")
    print(f"✓ Generated {len(publications_all)} publications")

    return projects, partners_all, deliverables_all, publications_all

def write_typescript_file(filename, data, type_name):
    """Write data as TypeScript file for React"""
    filepath = OUTPUT_DIR_REACT / filename

    with open(filepath, 'w') as f:
        f.write(f"// Auto-generated realistic dummy data for simulation\n")
        f.write(f"// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"// Total records: {len(data)}\n\n")
        f.write(f"export const {type_name} = ")
        f.write(json.dumps(data, indent=2))
        f.write(";\n")

    print(f"✓ Wrote {filepath} ({len(data)} records)")

def write_javascript_file(filename, data, type_name):
    """Write data as JavaScript file for HTML version"""
    filepath = OUTPUT_DIR_HTML / filename

    with open(filepath, 'w') as f:
        f.write(f"// Auto-generated realistic dummy data for simulation\n")
        f.write(f"// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"// Total records: {len(data)}\n\n")
        f.write(f"const {type_name} = ")
        f.write(json.dumps(data, indent=2))
        f.write(";\n")

    print(f"✓ Wrote {filepath} ({len(data)} records)")

def main():
    """Main execution"""
    print("\n" + "="*60)
    print("GENERATING REALISTIC DUMMY DATA FOR REACT APP")
    print("="*60 + "\n")

    # Generate all data
    projects, partners, deliverables, publications = generate_projects()

    # Write TypeScript files (for React)
    print("\nWriting TypeScript files for React...")
    write_typescript_file('projects.ts', projects, 'projects')
    write_typescript_file('partners.ts', partners, 'partners')
    write_typescript_file('deliverables.ts', deliverables, 'deliverables')
    write_typescript_file('publications.ts', publications, 'publications')

    # Write JavaScript files (for HTML)
    print("\nWriting JavaScript files for HTML...")
    write_javascript_file('projects.js', projects, 'projects')
    write_javascript_file('partners.js', partners, 'partners')
    write_javascript_file('deliverables.js', deliverables, 'deliverables')
    write_javascript_file('publications.js', publications, 'publications')

    # Generate summary stats
    stats = {
        'totalProjects': len(projects),
        'totalPartners': len(partners),
        'totalDeliverables': len(deliverables),
        'totalPublications': len(publications),
        'projectsByProgramme': {},
        'projectsByStatus': {},
        'projectsByCountry': {}
    }

    for project in projects:
        # By programme
        prog = project['programme']
        stats['projectsByProgramme'][prog] = stats['projectsByProgramme'].get(prog, 0) + 1

        # By status
        status = project['status']
        stats['projectsByStatus'][status] = stats['projectsByStatus'].get(status, 0) + 1

        # By country (lead)
        country = project['leadCountry']
        stats['projectsByCountry'][country] = stats['projectsByCountry'].get(country, 0) + 1

    write_typescript_file('stats.ts', stats, 'stats')
    write_javascript_file('stats.js', stats, 'stats')

    print("\n" + "="*60)
    print("DATA GENERATION COMPLETE!")
    print("="*60)
    print(f"\nReact files (TypeScript) in: {OUTPUT_DIR_REACT}")
    print(f"  • projects.ts ({len(projects)} projects)")
    print(f"  • partners.ts ({len(partners)} partners)")
    print(f"  • deliverables.ts ({len(deliverables)} deliverables)")
    print(f"  • publications.ts ({len(publications)} publications)")
    print(f"  • stats.ts (summary statistics)")
    print(f"\nHTML files (JavaScript) in: {OUTPUT_DIR_HTML}")
    print(f"  • projects.js ({len(projects)} projects)")
    print(f"  • partners.js ({len(partners)} partners)")
    print(f"  • deliverables.js ({len(deliverables)} deliverables)")
    print(f"  • publications.js ({len(publications)} publications)")
    print(f"  • stats.js (summary statistics)")
    print("\n✓ Ready to use in both React and HTML versions!\n")

if __name__ == '__main__':
    main()
