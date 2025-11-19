<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>
      <ul>
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        <li @click="$router.push('/admin/umkms')">📊 Data UMKM</li>
      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]">
      <div class="toggle-btn" @click="toggleSidebar">
        {{ isCollapsed ? '➡️' : '⬅️' }}
      </div>

      <h2>Data UMKM</h2>

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
            <td>{{ umkm.harga }}</td>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isCollapsed: false,
      umkms: [],
    };
  },
  mounted() {
    this.fetchUMKMs();
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    async fetchUMKMs() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/umkms");
        this.umkms = response.data;
      } catch (error) {
        console.error("Gagal mengambil data UMKM:", error);
      }
    },
    formatDate(datetime) {
      if (!datetime) return "-";
      return new Date(datetime).toLocaleString();
    },
    editUMKM(id) {
      this.$router.push(`/admin/umkms/edit/${id}`);
    },
    async deleteUMKM(id) {
      if (confirm("Apakah kamu yakin ingin menghapus UMKM ini?")) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/umkms/${id}`);
          this.fetchUMKMs(); // refresh data
        } catch (error) {
          console.error("Gagal menghapus UMKM:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.umkm-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
}

.umkm-table th, .umkm-table td {
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
</style>
