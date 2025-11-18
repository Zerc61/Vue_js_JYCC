<template>
  <div class="page">

    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>

      <ul class="menu">
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        <li @click="$router.push('/admin/users')" class="active">👤 Data User</li>
        <li @click="$router.push('/admin/umkm')">🏪 Data UMKM</li>
        <li @click="$router.push('/admin/laporan')">📄 Laporan</li>
        <li @click="$router.push('/admin/settings')">⚙️ Pengaturan</li>
        <li class="logout" @click="logout">🚪 Logout</li>

      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]">

      <!-- Toggle Button -->
      <button class="toggle-btn" @click="toggleSidebar">☰</button>

      <h1 class="title">Kelola Data User</h1>

      <!-- FORM INPUT USER -->
      <div class="form-box">
        <h3 class="section-title">Tambah User Baru</h3>

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

        <button class="btn-save" @click="saveUser">➕ Simpan User</button>
      </div>
      <!-- TABLE USER -->
      <table class="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telpon</th>
            <th>Role</th>
            <th style="width:120px">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, i) in users"
          :key="u.id_user">
            <td>{{ i + 1 }}</td>
            <td>{{ u.username }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.no_telpon }}</td>
            <td>{{ u.role }}</td>
            <td>
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table> <br>


        <div class="pagination">

            <button
                :disabled="pagination.current_page === 1"
                @click="loadUsers(pagination.current_page - 1)"
            >
                ◀ Prev
            </button>

            <span>Halaman {{ pagination.current_page }} / {{ pagination.last_page }}</span>

            <button
                :disabled="pagination.current_page === pagination.last_page"
                @click="loadUsers(pagination.current_page + 1)"
            >
                Next ▶
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

      user: {
        username: "",
        name: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "user"
      },

      // ✔ pagination harus di sini
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
            const res = await axios.get(
            `http://127.0.0.1:8000/api/users?page=${page}&per_page=2`
            );

            const d = res.data.data;

            // cek struktur benar
            console.log("API RESPONSE:", d);

            this.users = d.data;                 // ✔ daftar user
            this.pagination.current_page = d.current_page;  // ✔ halaman sekarang
            this.pagination.last_page = d.last_page;        // ✔ halaman total
        } 
        catch (e) {
            console.error("Error loading users:", e);
        }
    },


    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        console.log("fetchUsers result:", response.data);
      } catch (error) {
        console.error(error);
      }
    }, 

    async saveUser() {
      try {
        await axios.post("http://127.0.0.1:8000/api/users", this.user);

        alert("User berhasil ditambahkan!");
        this.loadUsers();

        this.user = {
          username: "",
          name: "",
          email: "",
          password: "",
          no_telpon: "",
          role: "user"
        };

      } catch (err) {
        alert("Gagal menambah user");
      }
    },

    logout() {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.$router.push("/login");
        })
        .catch(err => console.log(err));
    }
  },

  mounted() {
    this.loadUsers();
  }
};
</script>



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
