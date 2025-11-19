<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>
      <ul class="menu">
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        <li @click="$router.push('/admin/users')" class="active">👤 Data User</li>
        <li class="logout" @click="logout">🚪 Logout</li>
      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">☰</button>
      <h1 class="title">Kelola Data User</h1>

      <!-- FORM TAMBAH / EDIT -->
      <div class="form-box">
        <h3 class="section-title">{{ editUserId ? 'Edit User' : 'Tambah User Baru' }}</h3>
        <div class="form-row">
          <input type="text" v-model="user.username" placeholder="Username">
          <input type="text" v-model="user.name" placeholder="Nama Lengkap">
        </div>
        <div class="form-row">
          <input type="email" v-model="user.email" placeholder="Email">
          <input type="password" v-model="user.password" placeholder="Password">
        </div>
        <div class="form-row">
          <input type="text" v-model="user.no_telpon" placeholder="No Telepon">
          <select v-model="user.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="umkm">UMKM</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button class="btn-save" @click="saveUser">{{ editUserId ? 'Update User' : 'Simpan User' }}</button>
      </div>

      <!-- TABEL USER -->
      <table class="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telpon</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, i) in users" :key="u.id_user">
            <td>{{ i + 1 }}</td>
            <td>{{ u.username }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.no_telpon }}</td>
            <td>{{ u.role }}</td>
            <td>
              <button class="btn-edit" @click="editUser(u)">Edit</button>
              <button class="btn-delete" @click="deleteUser(u)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION -->
      <div class="pagination">
        <button :disabled="pagination.current_page === 1" @click="loadUsers(pagination.current_page - 1)">◀ Prev</button>
        <span>Halaman {{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button :disabled="pagination.current_page === pagination.last_page" @click="loadUsers(pagination.current_page + 1)">Next ▶</button>
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
      editUserId: null,
      user: {
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "user"
      },
      pagination: {
        current_page: 1,
        last_page: 1
      }
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    async loadUsers(page = 1) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/users?page=${page}&per_page=5`);
        const d = res.data.data;
        this.users = d.data;
        this.pagination.current_page = d.current_page;
        this.pagination.last_page = d.last_page;
      } catch (err) {
        console.error("Error load users:", err);
      }
    },

    editUser(u) {
      this.editUserId = u.id_user;
      this.user = { ...u, password: "" }; // password kosong saat edit
    },

    async saveUser() {
      try {
        if (this.editUserId) {
          // Update user
          await axios.put(`http://127.0.0.1:8000/api/users/${this.editUserId}`, this.user);
          alert("User berhasil diperbarui!");
          this.editUserId = null;
        } else {
          // Tambah user baru
          await axios.post(`http://127.0.0.1:8000/api/register`, this.user);
          alert("User berhasil ditambahkan!");
        }
        // Reset form
        this.user = { username: "", name: "", email: "", password: "", no_telpon: "", role: "user" };
        this.loadUsers();
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan user");
      }
    },

    async deleteUser(u) {
      if (confirm(`Yakin ingin menghapus user ${u.username}?`)) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/users/${u.id_user}`);
          alert("User berhasil dihapus!");
          this.loadUsers();
        } catch (err) {
          console.error(err);
          alert("Gagal menghapus user");
        }
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style scoped>
/* CSS tetap sama seperti versi sebelumnya */
</style>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

.page {
    display: flex;
    background: #f4f4f4;
}

/* SIDEBAR */
.sidebar {
    width: 240px;
    background: #1e1e2d;
    color: #fff;
    height: 100vh;
    position: fixed;
    transition: 0.3s;
    overflow-y: auto;
}

.sidebar.collapsed {
    width: 70px;
}

.sidebar .brand {
    padding: 20px;
    font-size: 20px;
    text-align: center;
    background: #27293d;
    font-weight: bold;
}

.sidebar ul {
    list-style: none;
}

.sidebar ul li {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: 0.3s;
}

.sidebar ul li:hover {
    background: #35354a;
}

.sidebar ul li i {
    margin-right: 10px;
}

/* MAIN CONTENT */
.main {
    margin-left: 240px;
    padding: 20px;
    width: 100%;
    transition: 0.3s;
}

.main.collapsed {
    margin-left: 70px;
}

.toggle-btn {
    cursor: pointer;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 20px;
    border: 1px solid #ccc;
}
</style>





<style scoped>

/* ==== GLOBAL ==== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.page {
  display: flex;
  background: #f4f4f4;
}

/* ==== SIDEBAR ==== */
.sidebar {
  width: 240px;
  background: #1e1e2d;
  color: #fff;
  height: 100vh;
  position: fixed;
  transition: 0.3s;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 70px;
}

.brand {
  padding: 20px;
  font-size: 20px;
  text-align: center;
  background: #27293d;
  font-weight: bold;
}

.menu {
  list-style: none;
}

.menu li {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: 0.3s;
}

.menu li:hover {
  background: #35354a;
}

.menu .active {
  background: #3a3a52 !important;
  font-weight: bold;
}

.menu .logout {
  color: #ff6b6b;
}

/* ==== MAIN CONTENT ==== */
.main {
  margin-left: 240px;
  padding: 20px;
  width: 100%;
  transition: 0.3s;
}

.main.collapsed {
  margin-left: 70px;
}

.toggle-btn {
  background: #27293d;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 20px;
}

/* ==== FORM ==== */
.form-box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.form-row input,
.form-row select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-save {
  background: #1e1e2d;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

/* ==== TABLE ==== */
.user-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ccc;
}

.user-table th {
  background: #1e1e2d;
  color: white;
}

.btn-edit {
  background: #4caf50;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-delete {
  background: #e53935;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit:hover {
  opacity: 0.8;
}

.btn-delete:hover {
  opacity: 0.8;
}

</style>
