<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>
      <ul class="menu">
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        
        <li @click="$router.push('/admin/users')" class="active">
          👤 Data User
        </li>
        <li @click="$router.push('/admin/umkms')">🏪 Data UMKM</li>
        <li @click="$router.push('/admin/drivers')">🚗 Data Driver</li>
        <li @click="$router.push('/admin/wisatas')">🗺️ Data Wisata</li>
        <li @click="$router.push('/admin/transportasis')">🚌 Data Transportasi</li>
        <li @click="$router.push('/admin/penginapans')">🏨 Data Penginapan</li>
        <li @click="$router.push('/admin/promos')">🎁 Promo</li>
        <li @click="$router.push('/admin/vouchers')">💳 Voucher</li>
        <li @click="$router.push('/admin/pakets')">📦 Paket</li>
        <li @click="$router.push('/admin/transaksis')">💰 Transaksi</li>
        <li @click="$router.push('/admin/laporans')">📄 Laporan</li>
        <li @click="$router.push('/admin/settings')">⚙️ Pengaturan</li>
        <li @click="logout">🚪 Logout</li>
      </ul>
    </div>

    <!-- MAIN AREA -->
    <div :class="['main', { collapsed: isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">☰</button>

      <h1 class="title">Kelola Data User</h1>

      <!-- FORM -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ isEdit ? 'Edit User' : 'Tambah User Baru' }}</h3>
          <button v-if="isEdit" class="btn-cancel" @click="resetForm">
            <span class="icon">✕</span> Batal
          </button>
        </div>

        <div class="form-content">
          <div class="row">
            <div class="form-group">
              <label for="username">Username</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="username"
                  v-model="user.username" 
                  placeholder="Masukkan username"
                  :class="{ 'error': errors.username }"
                />
              </div>
              <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
            </div>
            
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <div class="input-wrapper">
                <span class="input-icon">📝</span>
                <input 
                  type="text" 
                  id="name"
                  v-model="user.name" 
                  placeholder="Masukkan nama lengkap"
                  :class="{ 'error': errors.name }"
                />
              </div>
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
          </div>

          <div class="row">
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">✉️</span>
                <input 
                  type="email" 
                  id="email"
                  v-model="user.email" 
                  placeholder="Masukkan email"
                  :class="{ 'error': errors.email }"
                />
              </div>
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="user.password" 
                  placeholder="Masukkan password"
                  :class="{ 'error': errors.password }"
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>
          </div>

          <div class="row">
            <div class="form-group">
              <label for="no_telpon">No Telepon</label>
              <div class="input-wrapper">
                <span class="input-icon">📱</span>
                <input 
                  type="text" 
                  id="no_telpon"
                  v-model="user.no_telpon" 
                  placeholder="Masukkan nomor telepon"
                  :class="{ 'error': errors.no_telpon }"
                />
              </div>
              <span v-if="errors.no_telpon" class="error-message">{{ errors.no_telpon }}</span>
            </div>
            
            <div class="form-group">
              <label for="role">Role</label>
              <div class="select-wrapper">
                <span class="input-icon">🔑</span>
                <select 
                  id="role"
                  v-model="user.role"
                  :class="{ 'error': errors.role }"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="umkm">UMKM</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <span v-if="errors.role" class="error-message">{{ errors.role }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button 
              class="btn-primary" 
              @click="saveUser"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              <span v-else>{{ isEdit ? "💾 Update User" : "➕ Simpan User" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card table-card">
        <div class="table-header">
          <h3 class="table-title">Daftar User</h3>
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari user..."
              @input="searchUsers"
            />
          </div>
        </div>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No Telepon</th>
                <th>Role</th>
                <th width="120px">Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(u, i) in filteredUsers" :key="u.id_user">
                <td>{{ i + 1 }}</td>
                <td>{{ u.username }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.no_telpon }}</td>
                <td>
                  <span :class="['role-badge', u.role]">{{ u.role }}</span>
                </td>
                <td>
                  <button class="btn-edit" @click="editUser(u)">
                    <span class="icon">✏️</span> Edit
                  </button>
                  <button class="btn-delete" @click="deleteUser(u.id_user)">
                    <span class="icon">🗑️</span> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="filteredUsers.length === 0" class="no-data">
            <span class="no-data-icon">📭</span>
            <p>Tidak ada data user yang ditemukan</p>
          </div>
        </div>
      </div>

      <!-- PAGINATION -->
      <div class="pagination">
        <button
          class="btn-page"
          :disabled="pagination.current_page === 1"
          @click="loadUsers(pagination.current_page - 1)"
        >
          ◀
        </button>

        <span class="page-text">
          Halaman {{ pagination.current_page }} / {{ pagination.last_page }}
        </span>

        <button
          class="btn-page"
          :disabled="pagination.current_page === pagination.last_page"
          @click="loadUsers(pagination.current_page + 1)"
        >
          ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminUser",

  data() {
    return {
      isCollapsed: false,
      users: [],
      filteredUsers: [],
      searchQuery: "",
      showPassword: false,
      isSubmitting: false,
      
      user: {
        id_user: null,       // buat simpan ID user saat edit
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "user",
      },

      pagination: {
        current_page: 1,
        last_page: 1,
      },

      isEdit: false, // flag untuk mode edit
      
      errors: {
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "",
      }
    };
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    async loadUsers(page = 1) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/users?page=${page}&per_page=10`
        );

        this.users = res.data.data;
        this.filteredUsers = [...this.users];
        this.pagination.current_page = res.data.paging.current_page;
        this.pagination.last_page = res.data.paging.last_page;
      } catch (err) {
        console.error("Gagal memuat data user:", err);
      }
    },

    searchUsers() {
      if (!this.searchQuery) {
        this.filteredUsers = [...this.users];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.no_telpon.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "",
      };
      
      if (!this.user.username.trim()) {
        this.errors.username = "Username harus diisi";
        isValid = false;
      }
      
      if (!this.user.name.trim()) {
        this.errors.name = "Nama lengkap harus diisi";
        isValid = false;
      }
      
      if (!this.user.email.trim()) {
        this.errors.email = "Email harus diisi";
        isValid = false;
      } else if (!this.validateEmail(this.user.email)) {
        this.errors.email = "Format email tidak valid";
        isValid = false;
      }
      
      if (!this.isEdit && !this.user.password.trim()) {
        this.errors.password = "Password harus diisi";
        isValid = false;
      } else if (this.user.password && this.user.password.length < 6) {
        this.errors.password = "Password minimal 6 karakter";
        isValid = false;
      }
      
      if (!this.user.no_telpon.trim()) {
        this.errors.no_telpon = "Nomor telepon harus diisi";
        isValid = false;
      }
      
      if (!this.user.role) {
        this.errors.role = "Role harus dipilih";
        isValid = false;
      }
      
      return isValid;
    },
    
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    async saveUser() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      if (this.isEdit) {
        // mode update
        await this.updateUser();
        return;
      }

      // mode tambah
      try {
        await axios.post("http://127.0.0.1:8000/api/register", this.user);

        this.showNotification("User berhasil ditambahkan!", "success");
        this.loadUsers();
        this.resetForm();
      } catch (err) {
        this.showNotification("Gagal menambah user", "error");
        console.log(err);
      } finally {
        this.isSubmitting = false;
      }
    },

    editUser(u) {
      this.user = { ...u, password: "" }; // password dikosongkan
      this.isEdit = true;
      
      // Scroll to form
      document.querySelector('.card').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    },

    async updateUser() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/users/${this.user.id_user}`, this.user);
        this.showNotification("User berhasil diupdate!", "success");
        this.loadUsers();
        this.resetForm();
      } catch (err) {
        this.showNotification("Gagal mengupdate user", "error");
        console.error(err);
      } finally {
        this.isSubmitting = false;
      }
    },

    async deleteUser(userId) {
      if (!confirm("Yakin ingin menghapus user ini?")) return;

      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
        this.showNotification("User berhasil dihapus!", "success");
        this.loadUsers(this.pagination.current_page);
      } catch (err) {
        this.showNotification("Gagal menghapus user", "error");
        console.error(err);
      }
    },

    resetForm() {
      this.user = {
        id_user: null,
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "user",
      };
      this.isEdit = false;
      this.showPassword = false;
      this.errors = {
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "",
      };
    },

    showNotification(message, type) {
      // Simple notification implementation
      // You can replace this with a more sophisticated notification system
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    },

    logout() {
      const token = localStorage.getItem("token");

      fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", Arial, sans-serif;
}

/* PAGE WRAPPER */
.page {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0; /* PERBAIKAN UTAMA */
  left: 0; /* PERBAIKAN UTAMA */
  background: #0f172a;
  color: white;
  transition: 0.3s;
  overflow-y: auto;
  z-index: 100;
}

.sidebar.collapsed {
  width: 70px;
}

.brand {
  background: #1e293b;
  padding: 22px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.menu {
  list-style: none;
  margin-top: 10px;
}

.menu li {
  padding: 14px 20px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  border-left: 4px solid transparent;
  transition: 0.25s;
}

.menu li:hover,
.menu li.active {
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #38bdf8;
}

/* MAIN CONTENT */
.main {
  flex: 1;
  width: 100%;
  margin-left: 240px;
  padding: 25px;
  transition: 0.3s;
}

.main.collapsed {
  margin-left: 70px;
}

.toggle-btn {
  background: #1e293b;
  color: white;
  padding: 10px 14px;
  border-radius: 6px;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
}

/* TITLE */
.title {
  font-size: 26px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 22px;
}

/* CARD */
.card {
  background: white;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.btn-cancel {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #dc2626;
}

.form-content {
  padding: 22px;
}

/* FORM ROW */
.row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.input-wrapper, .select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
  z-index: 1;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error,
.form-group select.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* SAVE BUTTON */
.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* TABLE */
.table-card {
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.table-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6b7280;
}

.search-box input {
  padding: 8px 12px 8px 36px;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 8px;
  width: 250px;
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: #0f172a;
  color: white;
  padding: 14px;
  text-align: left;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.table tr:hover {
  background: #f1f5f9;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.role-badge.admin {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.user {
  background: #d1fae5;
  color: #065f46;
}

.role-badge.umkm {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.driver {
  background: #e9d5ff;
  color: #6b21a8;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.no-data-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 10px;
}

/* BUTTONS */
.btn-edit,
.btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 6px;
  transition: all 0.2s;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background: #2563eb;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

/* PAGINATION */
.pagination {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.btn-page {
  background: #0f172a;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-page:hover:not(:disabled) {
  background: #334155;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-text {
  font-size: 15px;
  font-weight: 500;
}

/* Notification */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(120%);
  transition: transform 0.3s ease-out;
  z-index: 1000;
}

.notification.show {
  transform: translateX(0);
}

.notification.success {
  background: #10b981;
}

.notification.error {
  background: #ef4444;
}

/* Responsive */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .table-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>