<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>
      <ul class="menu">
        <li @click="$router.push('/admin')">🏠 Dashboard</li>

        <li @click="$router.push('/admin/users')">👤 Data User</li>
        <li @click="$router.push('/admin/umkms')">🏪 Data UMKM</li>
        <li @click="$router.push('/admin/drivers')">🚗 Data Driver</li>
        <li @click="$router.push('/admin/wisatas')">🗺️ Data Wisata</li>
        <li @click="$router.push('/admin/transportasis')">
          🚌 Data Transportasi
        </li>
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
      <h1 class="title">Kelola Data Driver</h1>

      <!-- FORM -->
      <div class="card">
        <h3 class="card-title">
          {{ isEdit ? "Edit Driver" : "Tambah Driver Baru" }}
        </h3>

        <div class="row">
          <input type="text" v-model="driver.nama" placeholder="Nama" />
          <input type="number" v-model="driver.umur" placeholder="Umur" />
        </div>

        <div class="row">
          <select v-model="driver.jenis_kelamin">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          <input type="email" v-model="driver.email" placeholder="Email" />
        </div>

        <div class="row">
          <input type="text" v-model="driver.no_hp" placeholder="No HP" />
          <input
            type="number"
            step="0.01"
            v-model="driver.rating"
            placeholder="Rating"
          />
        </div>

        <div class="row">
          <textarea v-model="driver.alamat" placeholder="Alamat"></textarea>
        </div>

        <div class="row">
          <input type="file" @change="onFileChange" />
          <div v-if="driverPreview">
            <img :src="driverPreview" alt="Preview Foto" class="preview-foto" />
          </div>
        </div>

        <button class="btn-primary" @click="saveDriver">
          {{ isEdit ? "Update Driver" : "➕ Simpan Driver" }}
        </button>
      </div>

      <!-- TABLE -->
      <div class="card table-card">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Umur</th>
              <th>Jenis Kelamin</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Alamat</th>
              <th>Foto</th>
              <th width="120px">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in drivers" :key="d.id_driver">
              <td>{{ i + 1 }}</td>
              <td>{{ d.nama }}</td>
              <td>{{ d.umur }}</td>
              <td>{{ d.jenis_kelamin }}</td>
              <td>{{ d.no_hp }}</td>
              <td>{{ d.email }}</td>
              <td>{{ d.rating }}</td>
              <td>{{ d.alamat }}</td>
              <td>
                <img
                  v-if="d.foto_driver"
                  :src="d.foto_driver"
                  class="table-foto"
                />
              </td>
              <td>
                <button class="btn-edit" @click="editDriver(d)">Edit</button>
                <button class="btn-delete" @click="deleteDriver(d.id_driver)">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div class="pagination">
        <button
          class="btn-page"
          :disabled="pagination.current_page === 1"
          @click="loadDrivers(pagination.current_page - 1)"
        >
          ◀
        </button>
        <span class="page-text"
          >Halaman {{ pagination.current_page }} /
          {{ pagination.last_page }}</span
        >
        <button
          class="btn-page"
          :disabled="pagination.current_page === pagination.last_page"
          @click="loadDrivers(pagination.current_page + 1)"
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
  name: "AdminDriver",
  data() {
    return {
      isCollapsed: false,
      drivers: [],
      driver: {
        id_driver: null,
        nama: "",
        umur: null,
        jenis_kelamin: "",
        rating: null,
        no_hp: "",
        alamat: "",
        foto_driver: null,
        foto_driver_preview: null,
        email: "",
      },
      pagination: { current_page: 1, last_page: 1 },
      isEdit: false,
    };
  },
  computed: {
    driverPreview() {
      if (this.driver.foto_driver_preview)
        return this.driver.foto_driver_preview;
      if (this.driver.foto_driver) return this.driver.foto_driver;
      return null;
    },
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.driver.foto_driver = file;
      this.driver.foto_driver_preview = URL.createObjectURL(file);
    },

    async loadDrivers(page = 1) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/drivers?page=${page}&per_page=10`
        );
        // pastikan backend mengembalikan URL gambar
        this.drivers = res.data.data.map((d) => {
          // jika backend mengirim base64, ubah ke:
          // d.foto_driver = d.foto_driver ? `data:image/jpeg;base64,${d.foto_driver}` : null;
          return d;
        });
        this.pagination.current_page = res.data.paging.current_page;
        this.pagination.last_page = res.data.paging.last_page;
      } catch (err) {
        console.error("Gagal memuat data driver:", err);
      }
    },

    async saveDriver() {
      try {
        const formData = new FormData();
        for (let key in this.driver) {
          if (this.driver[key] !== null) formData.append(key, this.driver[key]);
        }

        if (this.isEdit) {
          await axios.post(
            `http://127.0.0.1:8000/api/drivers/${this.driver.id_driver}?_method=PUT`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          alert("Driver berhasil diupdate!");
        } else {
          await axios.post("http://127.0.0.1:8000/api/drivers", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Driver berhasil ditambahkan!");
        }

        this.resetForm();
        this.loadDrivers();
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan driver");
      }
    },

    editDriver(d) {
      this.driver = {
        ...d,
        foto_driver_preview: null,
        foto_driver: d.foto_driver,
      };
      this.isEdit = true;
    },

    async deleteDriver(id) {
      if (!confirm("Yakin ingin menghapus driver ini?")) return;
      try {
        await axios.delete(`http://127.0.0.1:8000/api/drivers/${id}`);
        alert("Driver berhasil dihapus!");
        this.loadDrivers(this.pagination.current_page);
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus driver");
      }
    },

    resetForm() {
      this.driver = {
        id_driver: null,
        nama: "",
        umur: null,
        jenis_kelamin: "",
        rating: null,
        no_hp: "",
        alamat: "",
        foto_driver: null,
        foto_driver_preview: null,
        email: "",
      };
      this.isEdit = false;
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
    this.loadDrivers();
  },
};
</script>

<style scoped>
.page {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #0f172a;
  color: white;
  transition: 0.3s;
  overflow-y: auto;
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
.title {
  font-size: 26px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 22px;
}
.card {
  background: white;
  padding: 22px;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #0f172a;
}
.row {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}
.row input,
.row select,
.row textarea {
  flex: 1;
  padding: 12px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 8px;
}
.btn-primary {
  padding: 12px 18px;
  background: #0f172a;
  color: white;
  border-radius: 8px;
  cursor: pointer;
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
.btn-edit {
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 6px;
}
.btn-delete {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}
.table-foto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}
.preview-foto {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 4px;
}
.pagination {
  display: flex;
  gap: 14px;
  align-items: center;
}
.btn-page {
  background: #0f172a;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.page-text {
  font-size: 15px;
  font-weight: 500;
}
</style>
