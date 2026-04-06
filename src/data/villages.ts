export interface Village {
  id: string;
  name: string;
  state: string;
  sector: string;
  coordinates: { lat: number; lng: number };
  username: string;
  password: string;
}

export const villages: Village[] = [
  // Jammu & Kashmir
  { id: "JK-001", name: "Uri", state: "Jammu & Kashmir", sector: "LOC North", coordinates: { lat: 34.08, lng: 74.05 }, username: "uri_post", password: "1234" },
  { id: "JK-002", name: "Poonch", state: "Jammu & Kashmir", sector: "LOC Central", coordinates: { lat: 33.77, lng: 74.09 }, username: "poonch_unit", password: "1234" },
  { id: "JK-003", name: "Kupwara", state: "Jammu & Kashmir", sector: "LOC North", coordinates: { lat: 34.53, lng: 74.26 }, username: "kupwara_officer", password: "1234" },
  { id: "JK-004", name: "Rajouri", state: "Jammu & Kashmir", sector: "LOC Central", coordinates: { lat: 33.38, lng: 74.31 }, username: "rajouri_post", password: "1234" },
  { id: "JK-005", name: "Baramulla", state: "Jammu & Kashmir", sector: "LOC North", coordinates: { lat: 34.20, lng: 74.34 }, username: "baramulla_unit", password: "1234" },
  { id: "JK-006", name: "Kathua", state: "Jammu & Kashmir", sector: "IB Jammu", coordinates: { lat: 32.38, lng: 75.51 }, username: "kathua_post", password: "1234" },
  { id: "JK-007", name: "Samba", state: "Jammu & Kashmir", sector: "IB Jammu", coordinates: { lat: 32.56, lng: 75.12 }, username: "samba_officer", password: "1234" },
  { id: "JK-008", name: "Akhnoor", state: "Jammu & Kashmir", sector: "IB Jammu", coordinates: { lat: 32.89, lng: 74.73 }, username: "akhnoor_unit", password: "1234" },

  // Punjab
  { id: "PB-001", name: "Attari", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 31.69, lng: 74.62 }, username: "attari_officer", password: "1234" },
  { id: "PB-002", name: "Fazilka", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 30.40, lng: 74.03 }, username: "fazilka_unit", password: "1234" },
  { id: "PB-003", name: "Hussainiwala", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 30.63, lng: 74.04 }, username: "hussainiwala_post", password: "1234" },
  { id: "PB-004", name: "Ferozepur", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 30.93, lng: 74.61 }, username: "ferozepur_officer", password: "1234" },
  { id: "PB-005", name: "Abohar", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 30.14, lng: 74.20 }, username: "abohar_unit", password: "1234" },
  { id: "PB-006", name: "Dera Baba Nanak", state: "Punjab", sector: "IB Punjab", coordinates: { lat: 32.03, lng: 75.02 }, username: "derababa_post", password: "1234" },

  // Rajasthan
  { id: "RJ-001", name: "Jaisalmer", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 26.91, lng: 70.90 }, username: "jaisalmer_post", password: "1234" },
  { id: "RJ-002", name: "Barmer", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 25.75, lng: 71.39 }, username: "barmer_officer", password: "1234" },
  { id: "RJ-003", name: "Bikaner", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 28.02, lng: 73.31 }, username: "bikaner_unit", password: "1234" },
  { id: "RJ-004", name: "Ganganagar", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 29.91, lng: 73.88 }, username: "ganganagar_post", password: "1234" },
  { id: "RJ-005", name: "Longewala", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 27.06, lng: 70.20 }, username: "longewala_post", password: "1234" },
  { id: "RJ-006", name: "Tanot", state: "Rajasthan", sector: "IB Rajasthan", coordinates: { lat: 27.83, lng: 70.08 }, username: "tanot_officer", password: "1234" },

  // Gujarat
  { id: "GJ-001", name: "Bhuj", state: "Gujarat", sector: "IB Gujarat", coordinates: { lat: 23.24, lng: 69.67 }, username: "bhuj_unit", password: "1234" },
  { id: "GJ-002", name: "Naliya", state: "Gujarat", sector: "IB Gujarat", coordinates: { lat: 23.26, lng: 68.83 }, username: "naliya_post", password: "1234" },
  { id: "GJ-003", name: "Lakhpat", state: "Gujarat", sector: "IB Gujarat", coordinates: { lat: 23.83, lng: 68.77 }, username: "lakhpat_officer", password: "1234" },
  { id: "GJ-004", name: "Khavda", state: "Gujarat", sector: "IB Gujarat", coordinates: { lat: 23.85, lng: 69.72 }, username: "khavda_unit", password: "1234" },
  { id: "GJ-005", name: "Nadabet", state: "Gujarat", sector: "IB Gujarat", coordinates: { lat: 23.98, lng: 71.02 }, username: "nadabet_post", password: "1234" },
];

export function authenticateUser(username: string, password: string): Village | null {
  return villages.find(v => v.username === username && v.password === password) || null;
}
