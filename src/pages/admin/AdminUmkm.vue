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
        {{ isCollapsed ? "➡️" : "⬅️" }}
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
    async fetchUMKMs(url = "http://127.0.0.1:8000/api/umkms") {
      try {
        const res = await axios.get(url);
        if (res.data.status === 1) {
          this.umkms = res.data.data.data || res.data.data; // paginate or non-paginate
          this.pagination = res.data.data; // pagination info jika paginate
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
