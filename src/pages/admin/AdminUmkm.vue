<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]" id="sidebar">
      <div class="brand">ADMIN</div>
      <ul>
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        <li @click="$router.push('/admin/users')">👤 Data User</li>
        <li @click="$router.push('/admin/umkms')">🏪 Data UMKM</li>
        <li @click="$router.push('/admin/laporan')">📄 Laporan</li>
        <li @click="$router.push('/admin/setting')">⚙️ Pengaturan</li>
        <li @click="logout">🚪 Logout</li>
      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]" id="mainContent">
      <span class="toggle-btn" @click="toggleSidebar">☰ Toggle Sidebar</span>

      <h1>Data UMKM</h1>

      <table class="umkm-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama UMKM</th>
            <th>Pemilik</th>
            <th>Informasi</th>
            <th>Pasokan</th>
            <th>Harga</th>
            <th>Kategori</th>
            <th>Jam Buka</th>
            <th>Jam Tutup</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="umkm in umkms" :key="umkm.id_umkm">
            <td>{{ umkm.id_umkm }}</td>
            <td>{{ umkm.nama_umkm }}</td>
            <td>{{ umkm.pemilik }}</td>
            <td>{{ umkm.informasi_umkm }}</td>
            <td>{{ umkm.pasokan_umkm }}</td>
            <td>{{ formatCurrency(umkm.harga) }}</td>
            <td>{{ umkm.kategori }}</td>
            <td>{{ formatDate(umkm.jam_buka) }}</td>
            <td>{{ formatDate(umkm.jam_tutup) }}</td>
            <td>
              <button @click="editUMKM(umkm.id_umkm)">✏️ Edit</button>
              <button @click="deleteUMKM(umkm.id_umkm)">🗑️ Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination" v-if="pagination">
        <button
          @click="fetchUMKMs(pagination.prev_page_url)"
          :disabled="!pagination.prev_page_url"
        >
          ⬅️
        </button>
        <span
          >Page {{ pagination.current_page }} of
          {{ pagination.last_page }}</span
        >
        <button
          @click="fetchUMKMs(pagination.next_page_url)"
          :disabled="!pagination.next_page_url"
        >
          ➡️
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "adminUMKM",
  data() {
    return {
      isCollapsed: false,
      umkms: [],
      pagination: null,
    };
  },
  mounted() {
    this.fetchUMKMs();
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    logout() {
      alert("Logout clicked");
      // axios.post('/api/logout') bisa ditambahkan di sini
    },
    async fetchUMKMs(url = "http://127.0.0.1:8000/api/umkms") {
      try {
        const res = await axios.get(url);
        if (res.data.status === 1) {
          this.umkms = res.data.data.data || res.data.data; // untuk paginate
          this.pagination = res.data.data; // info pagination
        }
      } catch (error) {
        console.error("Gagal mengambil data UMKM:", error);
      }
    },
    formatDate(datetime) {
      if (!datetime) return "-";
      return new Date(datetime).toLocaleString();
    },
    formatCurrency(value) {
      return value ? `Rp ${Number(value).toLocaleString()}` : "-";
    },
    editUMKM(id) {
      this.$router.push(`/admin/umkms/edit/${id}`);
    },
    async deleteUMKM(id) {
      if (confirm("Apakah kamu yakin ingin menghapus UMKM ini?")) {
        try {
          const res = await axios.delete(
            `http://127.0.0.1:8000/api/umkms/${id}`
          );
          if (res.data.status === 1) {
            alert(res.data.message);
            this.fetchUMKMs();
          }
        } catch (error) {
          console.error("Gagal menghapus UMKM:", error);
        }
      }
    },
  },
};
</script>

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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: 0.3s;
}

.sidebar ul li:hover {
  background: #35354a;
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

/* TABLE */
.umkm-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
}

.umkm-table th,
.umkm-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.umkm-table th {
  background: #27293d;
  color: #fff;
}

.umkm-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination {
  margin-top: 10px;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
