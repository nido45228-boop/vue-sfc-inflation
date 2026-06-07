<template>
  <div class="ticket-manager">
    <h1>雲端機票管家</h1>

    <div class="actions">
      <button @click="showInsertForm = !showInsertForm">新增資料</button>
      <button @click="showSearchForm = !showSearchForm">篩選資料</button>
    </div>

    <div v-if="showInsertForm" class="form-container">
      <h2>新增機票資料</h2>
      <input v-model="newTicket.year" type="number" placeholder="年份">
      <input v-model="newTicket.destination" placeholder="目的地">
      <input v-model="newTicket.price" placeholder="價格">
      <button @click="insertTicket">確認新增</button>
    </div>

    <div v-if="showSearchForm" class="form-container">
      <h2>篩選目的地</h2>
      <input v-model="searchTerm" placeholder="輸入目的地關鍵字" @input="searchTickets">
    </div>

    <table v-if="displayedTickets.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>年份</th>
          <th>目的地</th>
          <th>價格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in displayedTickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.year }}</td>
          <td>{{ ticket.destination }}</td>
          <td>{{ ticket.price }}</td>
          <td>
            <button @click="deleteTicket(ticket.id)" class="delete-btn">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>沒有符合條件的資料</p>

    <ToastMessage :show="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script>
import store from '../store.js';
import ToastMessage from './ToastMessage.vue';

export default {
  name: 'TicketManager',
  components: {
    ToastMessage
  },
  data() {
    return {
      tickets: store.state.tickets,
      showInsertForm: false,
      showSearchForm: false,
      newTicket: {
        year: new Date().getFullYear(),
        destination: '',
        price: ''
      },
      searchTerm: '',
      filteredTickets: null,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  computed: {
    displayedTickets() {
      return this.filteredTickets !== null ? this.filteredTickets : this.tickets;
    }
  },
  methods: {
    insertTicket() {
      if (!this.newTicket.year || !this.newTicket.destination || !this.newTicket.price) {
        this.showToast('請填寫所有欄位！', 'error');
        return;
      }
      store.addTicket(this.newTicket);
      this.showToast('資料新增成功！');
      this.newTicket = { year: new Date().getFullYear(), destination: '', price: '' };
      this.showInsertForm = false;
      // 因為 store 的 state 是 reactive 的，所以這裡不需要手動更新 this.tickets
    },
    searchTickets() {
      if (this.searchTerm.trim() === '') {
        this.filteredTickets = null;
      } else {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredTickets = this.tickets.filter(ticket =>
          ticket.destination.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    },
    deleteTicket(id) {
      if (confirm('您確定要刪除這筆資料嗎？')) {
        store.deleteTicket(id);
        this.showToast('資料刪除成功！');
        // If currently filtering, re-apply the filter
        if (this.searchTerm.trim() !== '') {
          this.searchTickets();
        }
      }
    },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 3000); // 3秒後自動消失
    }
  }
};
</script>

<style scoped>
body {
  background-color: #f4f7f6;
  color: #333;
}

.ticket-manager {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 40px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

.actions {
  margin-bottom: 25px;
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.form-container {
  margin-bottom: 25px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.form-container h2 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #34495e;
}

.form-container input {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-container input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.form-container button {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    background-color: #2ecc71;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.form-container button:hover {
    background-color: #27ae60;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

th, td {
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #f2f5f7;
  color: #34495e;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #f0f4f8;
}

.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  background-color: #e74c3c;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
