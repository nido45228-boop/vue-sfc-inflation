import { reactive, readonly } from 'vue';

const STORAGE_KEY = 'inflation-tickets';

// 初始種子資料
const seedData = [
  { id: 1, year: 2021, destination: "日本 (東京/大阪)", price: "$25,000 - $40,000+" },
  { id: 2, year: 2021, destination: "韓國 (首爾)", price: "$18,000 - $30,000" },
  { id: 3, year: 2021, destination: "美國 (洛杉磯/舊金山)", price: "$60,000 - $120,000+" },
  { id: 4, year: 2022, destination: "日本 (東京/大阪)", price: "$18,000 - $30,000" },
  { id: 5, year: 2022, destination: "韓國 (首爾)", price: "$12,000 - $22,000" },
  { id: 6, year: 2022, destination: "美國 (洛杉磯/舊金山)", price: "$50,000 - $90,000" },
  { id: 7, year: 2023, destination: "日本 (東京/大阪)", price: "$15,000 - $25,000" },
  { id: 8, year: 2023, destination: "韓國 (首爾)", price: "$10,000 - $18,000" },
  { id: 9, year: 2023, destination: "美國 (洛杉磯/舊金山)", price: "$45,000 - $80,000" },
  { id: 10, year: 2024, destination: "日本 (東京/大阪)", price: "$11,000 - $18,000" },
  { id: 11, year: 2024, destination: "韓國 (首爾)", price: "$8,000 - $14,000" },
  { id: 12, year: 2024, destination: "美國 (洛杉磯/舊金山)", price: "$38,000 - $65,000" },
  { id: 13, year: 2025, destination: "日本 (東京/大阪)", price: "$9,000 - $16,000" },
  { id: 14, year: 2025, destination: "韓國 (首爾)", price: "$7,000 - $12,000" },
  { id: 15, year: 2025, destination: "美國 (洛杉磯/舊金山)", price: "$35,000 - $55,000" },
  { id: 16, year: 2026, destination: "日本 (東京/大阪)", price: "$8,500 - $15,000" },
  { id: 17, year: 2026, destination: "韓國 (首爾)", price: "$6,500 - $11,000" },
  { id: 18, year: 2026, destination: "美國 (洛杉磯/舊金山)", price: "$32,000 - $50,000" }
];

const state = reactive({
  tickets: []
});

function loadTickets() {
  const storedTickets = localStorage.getItem(STORAGE_KEY);
  if (storedTickets) {
    state.tickets = JSON.parse(storedTickets);
  } else {
    state.tickets = seedData;
    saveTickets();
  }
}

function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tickets));
}

function addTicket(ticket) {
  const newId = state.tickets.length > 0 ? Math.max(...state.tickets.map(t => t.id)) + 1 : 1;
  state.tickets.push({ ...ticket, id: newId });
  saveTickets();
}

function deleteTicket(id) {
  state.tickets = state.tickets.filter(t => t.id !== id);
  saveTickets();
}

// 初始載入資料
loadTickets();

export default {
  state: readonly(state),
  addTicket,
  deleteTicket
};
