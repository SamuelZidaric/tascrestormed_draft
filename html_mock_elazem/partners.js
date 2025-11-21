// Simplified realistic dummy data for testing and simulation
// Total records: 32 partners across 10 projects

window.partners = [
  // Project 1: MedCoastRestore
  {
    "id": 1,
    "projectId": 1,
    "name": "Infordata SRL",
    "country": "Italy",
    "city": "Rome",
    "type": "Industry",
    "role": "Lead Partner",
    "budget": 1800000
  },
  {
    "id": 2,
    "projectId": 1,
    "name": "University of Crete",
    "country": "Greece",
    "city": "Heraklion",
    "type": "Research",
    "role": "Partner",
    "budget": 1600000
  },
  {
    "id": 3,
    "projectId": 1,
    "name": "EcoMarine Spain",
    "country": "Spain",
    "city": "Barcelona",
    "type": "NGO",
    "role": "Partner",
    "budget": 1600000
  },
  // Project 2: BlueDecarb
  {
    "id": 4,
    "projectId": 2,
    "name": "OceanTech Portugal",
    "country": "Portugal",
    "city": "Lisbon",
    "type": "Industry",
    "role": "Lead Partner",
    "budget": 1300000
  },
  {
    "id": 5,
    "projectId": 2,
    "name": "Nautical Industries France",
    "country": "France",
    "city": "Marseille",
    "type": "Industry",
    "role": "Partner",
    "budget": 1100000
  },
  {
    "id": 6,
    "projectId": 2,
    "name": "CleanShip Germany",
    "country": "Germany",
    "city": "Hamburg",
    "type": "Industry",
    "role": "Partner",
    "budget": 1100000
  },
  // Project 3: NS-DTO
  {
    "id": 7,
    "projectId": 3,
    "name": "DataOcean GmbH",
    "country": "Germany",
    "city": "Hamburg",
    "type": "Industry",
    "role": "Lead Partner",
    "budget": 1800000
  },
  {
    "id": 8,
    "projectId": 3,
    "name": "Maritime Research Norway",
    "country": "Norway",
    "city": "Oslo",
    "type": "Research",
    "role": "Partner",
    "budget": 1500000
  },
  {
    "id": 9,
    "projectId": 3,
    "name": "Infordata SRL",
    "country": "Italy",
    "city": "Rome",
    "type": "Industry",
    "role": "Partner",
    "budget": 1500000
  },
  // Project 4: BalticClear
  {
    "id": 10,
    "projectId": 4,
    "name": "Stockholm Water Institute",
    "country": "Sweden",
    "city": "Stockholm",
    "type": "Public Body",
    "role": "Lead Partner",
    "budget": 1200000
  },
  {
    "id": 11,
    "projectId": 4,
    "name": "EcoMarine Spain",
    "country": "Spain",
    "city": "Barcelona",
    "type": "NGO",
    "role": "Partner",
    "budget": 1000000
  },
  {
    "id": 12,
    "projectId": 4,
    "name": "AgriSolutions Finland",
    "country": "Finland",
    "city": "Helsinki",
    "type": "Industry",
    "role": "Partner",
    "budget": 1000000
  },
  // Project 5: CS-Litter
  {
    "id": 13,
    "projectId": 5,
    "name": "EcoMarine Spain",
    "country": "Spain",
    "city": "Barcelona",
    "type": "NGO",
    "role": "Lead Partner",
    "budget": 700000
  },
  {
    "id": 14,
    "projectId": 5,
    "name": "University of Crete",
    "country": "Greece",
    "city": "Heraklion",
    "type": "Research",
    "role": "Partner",
    "budget": 550000
  },
  {
    "id": 15,
    "projectId": 5,
    "name": "OceanWatch NGO",
    "country": "Portugal",
    "city": "Lisbon",
    "type": "NGO",
    "role": "Partner",
    "budget": 550000
  },
  // Project 6: BlackSeaBio
  {
    "id": 16,
    "projectId": 6,
    "name": "Romanian Marine Institute",
    "country": "Romania",
    "city": "Constanta",
    "type": "Research",
    "role": "Lead Partner",
    "budget": 1600000
  },
  {
    "id": 17,
    "projectId": 6,
    "name": "Bulgaria Marine Lab",
    "country": "Bulgaria",
    "city": "Varna",
    "type": "Research",
    "role": "Partner",
    "budget": 1300000
  },
  {
    "id": 18,
    "projectId": 6,
    "name": "Black Sea NGO Network",
    "country": "Turkey",
    "city": "Istanbul",
    "type": "NGO",
    "role": "Partner",
    "budget": 1300000
  },
  // Project 7: AdriFish
  {
    "id": 19,
    "projectId": 7,
    "name": "Croatian Fisheries Board",
    "country": "Croatia",
    "city": "Split",
    "type": "Public Body",
    "role": "Lead Partner",
    "budget": 900000
  },
  {
    "id": 20,
    "projectId": 7,
    "name": "Italian Marine Research",
    "country": "Italy",
    "city": "Venice",
    "type": "Research",
    "role": "Partner",
    "budget": 700000
  },
  {
    "id": 21,
    "projectId": 7,
    "name": "Slovenian Ocean Tech",
    "country": "Slovenia",
    "city": "Ljubljana",
    "type": "Industry",
    "role": "Partner",
    "budget": 600000
  },
  {
    "id": 22,
    "projectId": 7,
    "name": "Albania Fisheries Cooperative",
    "country": "Albania",
    "city": "Tirana",
    "type": "Industry",
    "role": "Partner",
    "budget": 600000
  },
  // Project 8: CelticBlue
  {
    "id": 23,
    "projectId": 8,
    "name": "Irish Ocean Energy",
    "country": "Ireland",
    "city": "Cork",
    "type": "Industry",
    "role": "Lead Partner",
    "budget": 2500000
  },
  {
    "id": 24,
    "projectId": 8,
    "name": "UK Marine Renewables",
    "country": "United Kingdom",
    "city": "Bristol",
    "type": "Industry",
    "role": "Partner",
    "budget": 2000000
  },
  {
    "id": 25,
    "projectId": 8,
    "name": "French Wave Power",
    "country": "France",
    "city": "Brest",
    "type": "Industry",
    "role": "Partner",
    "budget": 2000000
  },
  // Project 9: ArcticResilience
  {
    "id": 26,
    "projectId": 9,
    "name": "Finnish Climate Institute",
    "country": "Finland",
    "city": "Helsinki",
    "type": "Research",
    "role": "Lead Partner",
    "budget": 1600000
  },
  {
    "id": 27,
    "projectId": 9,
    "name": "Estonian Marine Center",
    "country": "Estonia",
    "city": "Tallinn",
    "type": "Research",
    "role": "Partner",
    "budget": 1200000
  },
  {
    "id": 28,
    "projectId": 9,
    "name": "Latvia Ocean Research",
    "country": "Latvia",
    "city": "Riga",
    "type": "Research",
    "role": "Partner",
    "budget": 1200000
  },
  {
    "id": 29,
    "projectId": 9,
    "name": "Swedish Arctic Lab",
    "country": "Sweden",
    "city": "Stockholm",
    "type": "Research",
    "role": "Partner",
    "budget": 1200000
  },
  // Project 10: MedBioBlue
  {
    "id": 30,
    "projectId": 10,
    "name": "French Marine Biotech",
    "country": "France",
    "city": "Marseille",
    "type": "Industry",
    "role": "Lead Partner",
    "budget": 1700000
  },
  {
    "id": 31,
    "projectId": 10,
    "name": "Monaco Innovation Lab",
    "country": "Monaco",
    "city": "Monaco",
    "type": "Research",
    "role": "Partner",
    "budget": 1400000
  },
  {
    "id": 32,
    "projectId": 10,
    "name": "Tunisia Biotech Center",
    "country": "Tunisia",
    "city": "Tunis",
    "type": "Research",
    "role": "Partner",
    "budget": 1400000
  }
];
