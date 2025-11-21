import { Project, Partner } from './types';
import { PARTNER_TYPES, COUNTRIES } from './constants';

export const projects: Project[] = [
    {
      id: "PRJ-2024-001",
      title: "Mediterranean Coastal Restoration Initiative",
      acronym: "MedCoastRestore",
      status: "Active",
      start_date: "2024-01-01",
      end_date: "2026-12-31",
      country: "Italy",
      lead_partner: "Infordata SRL",
      partners: ["University of Crete", "EcoMarine Spain"],
      mission_pillars: ["Environmental", "Biodiversity"],
      mission_objectives: ["Protect & restore marine and coastal ecosystems and biodiversity", "Prevent pollution – litter & microplastics"],
      clusters: ["Habitat restoration", "Pollution remediation"],
      technologies: ["Monitoring", "Prevention"],
      mission_zone: "Mediterranean",
      funding: "Horizon Europe",
      kpis: ["Restored area (ha)", "Stakeholders trained", "Pollution reduction (%)"],
      summary: "A comprehensive initiative to restore degraded coastal ecosystems in the Mediterranean through innovative monitoring and community-led prevention strategies."
    },
    {
      id: "PRJ-2023-002",
      title: "Atlantic Blue Economy Decarbonization",
      acronym: "BlueDecarb",
      status: "Active",
      start_date: "2023-06-15",
      end_date: "2025-06-14",
      country: "Portugal",
      lead_partner: "OceanTech Portugal",
      partners: ["Nautical Industries France", "CleanShip Germany"],
      mission_pillars: ["Climate", "Economic Impact"],
      mission_objectives: ["Blue economy – decarbonisation of maritime industries"],
      clusters: ["Zero-discharge ports"],
      technologies: ["Prevention"],
      mission_zone: "Atlantic",
      funding: "EMFF",
      kpis: ["CO2 emission reduction (tons/year)", "Number of ports upgraded"],
      summary: "This project focuses on developing and implementing technologies to decarbonize shipping and port operations along the Atlantic coast."
    },
    {
      id: "PRJ-2022-003",
      title: "North Sea Digital Twin Ocean",
      acronym: "NS-DTO",
      status: "Completed",
      start_date: "2022-02-01",
      end_date: "2024-01-31",
      country: "Germany",
      lead_partner: "DataOcean GmbH",
      partners: ["Maritime Research Norway", "Infordata SRL"],
      mission_pillars: ["Climate", "Environmental"],
      mission_objectives: ["Ocean digital knowledge system"],
      clusters: ["Digital Twins", "AI-based monitoring"],
      technologies: ["Monitoring"],
      mission_zone: "North Sea",
      funding: "Digital Europe",
      kpis: ["Data points collected (trillions)", "Predictive model accuracy (%)"],
      summary: "Successfully created a high-fidelity digital twin of the North Sea to model climate change impacts and support sustainable marine management."
    },
    {
        id: "PRJ-2024-004",
        title: "Baltic Sea Nutrient Pollution Control",
        acronym: "BalticClear",
        status: "Pending",
        start_date: "2025-01-01",
        end_date: "2028-12-31",
        country: "Sweden",
        lead_partner: "Stockholm Water Institute",
        partners: ["EcoMarine Spain", "AgriSolutions Finland"],
        mission_pillars: ["Environmental", "Human Health"],
        mission_objectives: ["Prevent pollution – nutrients, chemicals, pesticides"],
        clusters: ["Pollution remediation"],
        technologies: ["Prevention", "Monitoring"],
        mission_zone: "Baltic Sea",
        funding: "LIFE Programme",
        kpis: ["Nutrient runoff reduction (%)", "Water quality index improvement"],
        summary: "Aimed at tackling nutrient pollution from agricultural and urban sources in the Baltic Sea region through policy recommendations and new technologies."
    },
    {
      id: "PRJ-2023-005",
      title: "Citizen Science for Marine Litter",
      acronym: "CS-Litter",
      status: "Active",
      start_date: "2023-09-01",
      end_date: "2025-08-31",
      country: "Spain",
      lead_partner: "EcoMarine Spain",
      partners: ["University of Crete", "OceanWatch NGO"],
      mission_pillars: ["Education & Social Engagement", "Environmental"],
      mission_objectives: ["Mobilization & engagement", "Prevent pollution – litter & microplastics"],
      clusters: ["Ocean literacy & citizen science"],
      technologies: ["Collection", "Monitoring"],
      mission_zone: "Mediterranean",
      funding: "Erasmus+",
      kpis: ["Number of citizen scientists engaged", "Amount of litter collected (kg)"],
      summary: "Engaging citizens in monitoring and collecting marine litter data using a mobile application, raising awareness and providing valuable data for researchers."
    },
    {
      id: "PRJ-2024-006",
      title: "Black Sea Marine Biodiversity Protection",
      acronym: "BlackSeaBio",
      status: "Active",
      start_date: "2024-03-15",
      end_date: "2027-03-14",
      country: "Romania",
      lead_partner: "Romanian Marine Institute",
      partners: ["Bulgaria Marine Lab", "Black Sea NGO Network"],
      mission_pillars: ["Biodiversity", "Environmental"],
      mission_objectives: ["Protect & restore marine and coastal ecosystems and biodiversity"],
      clusters: ["Habitat restoration", "Marine protected areas"],
      technologies: ["Monitoring", "AI-based assessment"],
      mission_zone: "Black Sea",
      funding: "Horizon Europe",
      kpis: ["Protected area coverage (%)", "Species abundance index"],
      summary: "Comprehensive initiative to protect and restore critical Black Sea habitats and endangered species through advanced monitoring and community-based conservation."
    },
    {
      id: "PRJ-2022-007",
      title: "Adriatic Sustainable Fisheries",
      acronym: "AdriFish",
      status: "Completed",
      start_date: "2022-01-01",
      end_date: "2024-12-31",
      country: "Croatia",
      lead_partner: "Croatian Fisheries Board",
      partners: ["Italian Marine Research", "Slovenian Ocean Tech", "Albania Fisheries Cooperative"],
      mission_pillars: ["Economic Impact", "Environmental"],
      mission_objectives: ["Blue economy – sustainable and competitive fisheries"],
      clusters: ["Sustainable Fisheries"],
      technologies: ["Prevention", "Data analytics"],
      mission_zone: "Adriatic Sea",
      funding: "EMFF",
      kpis: ["Fish stock recovery (%)", "Sustainable catch increase (tons)"],
      summary: "Successfully developed and implemented sustainable fishing practices in the Adriatic, improving both fish stock health and fishing industry profitability."
    },
    {
      id: "PRJ-2023-008",
      title: "Celtic Sea Renewable Energy Integration",
      acronym: "CelticBlue",
      status: "Active",
      start_date: "2023-07-01",
      end_date: "2026-06-30",
      country: "Ireland",
      lead_partner: "Irish Ocean Energy",
      partners: ["UK Marine Renewables", "French Wave Power"],
      mission_pillars: ["Climate", "Economic Impact"],
      mission_objectives: ["Blue economy – renewable energy from the sea"],
      clusters: ["Renewable marine energy"],
      technologies: ["Prevention", "Innovation"],
      mission_zone: "Atlantic",
      funding: "Horizon Europe",
      kpis: ["Energy generation capacity (MW)", "CO2 offset (tons)"],
      summary: "Developing integrated offshore renewable energy solutions combining wave, wind, and tidal power for sustainable ocean-based energy production."
    },
    {
      id: "PRJ-2025-009",
      title: "Arctic-Baltic Climate Resilience",
      acronym: "ArcticResilience",
      status: "Pending",
      start_date: "2025-06-01",
      end_date: "2028-05-31",
      country: "Finland",
      lead_partner: "Finnish Climate Institute",
      partners: ["Estonian Marine Center", "Latvia Ocean Research", "Swedish Arctic Lab"],
      mission_pillars: ["Climate", "Human Health"],
      mission_objectives: ["Climate resilience and adaptation"],
      clusters: ["Climate adaptation"],
      technologies: ["Monitoring", "Digital Twins", "AI-based monitoring"],
      mission_zone: "Baltic Sea",
      funding: "Horizon Europe",
      kpis: ["Climate models accuracy (%)", "Adaptation strategies implemented"],
      summary: "Building climate resilience in Arctic and Baltic regions through advanced predictive models and community-based adaptation strategies for coastal protection."
    },
    {
      id: "PRJ-2024-010",
      title: "Mediterranean Blue Biotechnology Hub",
      acronym: "MedBioBlue",
      status: "Active",
      start_date: "2024-02-01",
      end_date: "2027-01-31",
      country: "France",
      lead_partner: "French Marine Biotech",
      partners: ["Monaco Innovation Lab", "Tunisia Biotech Center"],
      mission_pillars: ["Economic Impact", "Innovation"],
      mission_objectives: ["Blue economy – biotechnology and bioproducts from the sea"],
      clusters: ["Blue biotechnology"],
      technologies: ["Innovation", "R&D platforms"],
      mission_zone: "Mediterranean",
      funding: "Horizon Europe",
      kpis: ["New bioproducts developed", "Patents filed"],
      summary: "Accelerating blue biotechnology innovation through collaborative research on marine organisms for sustainable pharmaceuticals, cosmetics, and biomaterials."
    }
];

const generatePartners = (): Partner[] => {
    const partnerMap = new Map<string, { country: string; type: 'Research' | 'Industry' | 'NGO' | 'Public Body'; projectIds: Set<string>; website: string; acronym: string; }>();

    const allPartnerNames = new Set<string>();
    projects.forEach(p => {
        allPartnerNames.add(p.lead_partner);
        p.partners.forEach(partner => allPartnerNames.add(partner));
    });

    const partnerDetails: { [key: string]: { country: string; type: 'Research' | 'Industry' | 'NGO' | 'Public Body', acronym: string } } = {
        "Infordata SRL": { country: "Italy", type: "Industry", acronym: "INF" },
        "University of Crete": { country: "Greece", type: "Research", acronym: "UoC" },
        "EcoMarine Spain": { country: "Spain", type: "NGO", acronym: "EMS" },
        "OceanTech Portugal": { country: "Portugal", type: "Industry", acronym: "OTP" },
        "Nautical Industries France": { country: "France", type: "Industry", acronym: "NIF" },
        "CleanShip Germany": { country: "Germany", type: "Industry", acronym: "CSG" },
        "DataOcean GmbH": { country: "Germany", type: "Industry", acronym: "DOG" },
        "Maritime Research Norway": { country: "Norway", type: "Research", acronym: "MRN" },
        "Stockholm Water Institute": { country: "Sweden", type: "Public Body", acronym: "SWI" },
        "AgriSolutions Finland": { country: "Finland", type: "Industry", acronym: "ASF" },
        "OceanWatch NGO": { country: "Portugal", type: "NGO", acronym: "OWN" },
        "Romanian Marine Institute": { country: "Romania", type: "Research", acronym: "RMI" },
        "Bulgaria Marine Lab": { country: "Bulgaria", type: "Research", acronym: "BML" },
        "Black Sea NGO Network": { country: "Turkey", type: "NGO", acronym: "BSNN" },
        "Croatian Fisheries Board": { country: "Croatia", type: "Public Body", acronym: "CFB" },
        "Italian Marine Research": { country: "Italy", type: "Research", acronym: "IMR" },
        "Slovenian Ocean Tech": { country: "Slovenia", type: "Industry", acronym: "SOT" },
        "Albania Fisheries Cooperative": { country: "Albania", type: "Industry", acronym: "AFC" },
        "Irish Ocean Energy": { country: "Ireland", type: "Industry", acronym: "IOE" },
        "UK Marine Renewables": { country: "United Kingdom", type: "Industry", acronym: "UKMR" },
        "French Wave Power": { country: "France", type: "Industry", acronym: "FWP" },
        "Finnish Climate Institute": { country: "Finland", type: "Research", acronym: "FCI" },
        "Estonian Marine Center": { country: "Estonia", type: "Research", acronym: "EMC" },
        "Latvia Ocean Research": { country: "Latvia", type: "Research", acronym: "LOR" },
        "Swedish Arctic Lab": { country: "Sweden", type: "Research", acronym: "SAL" },
        "French Marine Biotech": { country: "France", type: "Industry", acronym: "FMB" },
        "Monaco Innovation Lab": { country: "Monaco", type: "Research", acronym: "MIL" },
        "Tunisia Biotech Center": { country: "Tunisia", type: "Research", acronym: "TBC" },
    };


    projects.forEach(project => {
        const allInvolved = [project.lead_partner, ...project.partners];
        allInvolved.forEach(partnerName => {
            if (!partnerMap.has(partnerName)) {
                 // FIX: Cast the partner type to the specific union type required by the Partner interface to fix the type mismatch.
                 const details = partnerDetails[partnerName] || { country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)], type: PARTNER_TYPES[Math.floor(Math.random() * PARTNER_TYPES.length)] as Partner['type'], acronym: partnerName.substring(0,3).toUpperCase() };
                partnerMap.set(partnerName, {
                    ...details,
                    projectIds: new Set<string>(),
                    website: `https://www.${partnerName.toLowerCase().replace(/\s/g, '')}.com`
                });
            }
            partnerMap.get(partnerName)!.projectIds.add(project.id);
        });
    });

    return Array.from(partnerMap.entries()).map(([name, data]) => ({
        name,
        acronym: data.acronym,
        country: data.country,
        type: data.type,
        website: data.website,
        projectIds: Array.from(data.projectIds)
    }));
};

export const partners = generatePartners();