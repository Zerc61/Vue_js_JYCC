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

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">☰</button>
      <h1 class="title">Kelola Data Wisata</h1>

      <!-- FORM INPUT -->
      <div class="form-box">
        <h3 class="section-title">Tambah / Edit Wisata</h3>

        <div class="form-row">
          <input type="text" v-model="wisata.nama" placeholder="Nama Wisata" />
          <select v-model="wisata.kategori">
            <option value="" disabled>Pilih Kategori</option>
            <option v-for="k in kategoris" :key="k">{{ k }}</option>
          </select>
        </div>

        <div class="form-row">
          <input
            type="text"
            v-model="wisata.alamat_wisata"
            placeholder="Alamat Wisata"
          />
        </div>

        <div class="form-row">
          <textarea
            v-model="wisata.deskripsi"
            placeholder="Deskripsi Wisata"
          ></textarea>
        </div>

        <div class="form-row">
          <input type="file" @change="handleFileUpload" />
          <span v-if="wisata.foto_url_preview" class="photo-preview-text">
            Foto saat ini:
            <img
              :src="wisata.foto_url_preview"
              alt="Current Photo"
              class="current-photo-preview"
            />
          </span>
        </div>

        <div class="form-row">
          <input
            type="number"
            v-model.number="wisata.biaya_wisata"
            placeholder="Biaya Wisata"
          />
          <input
            type="text"
            v-model="wisata.lokasi"
            placeholder="Lokasi / Koordinat"
          />
        </div>

        <button class="btn-save" @click="saveWisata">
          {{ editing ? "💾 Update Wisata" : "➕ Simpan Wisata" }}
        </button>
        <button v-if="editing" class="btn-cancel" @click="resetForm">
          ✖ Batal Edit
        </button>
      </div>

      <!-- TABLE DATA WISATA -->
      <table class="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Alamat</th>
            <th>Deskripsi</th>
            <th>Foto</th>
            <th>Biaya</th>
            <th>Lokasi</th>
            <th style="width: 120px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in wisatas" :key="w.id">
            <td>{{ i + 1 + (pagination.current_page - 1) * 10 }}</td>
            <td>{{ w.nama }}</td>
            <td>{{ w.kategori }}</td>
            <td>{{ w.alamat_wisata }}</td>
            <td>{{ w.deskripsi.substring(0, 50) }}...</td>
            <td>
              <img
                v-if="w.foto_wisata_url"
                :src="w.foto_wisata_url"
                alt="Foto Wisata"
                style="
                  width: 60px;
                  height: 60px;
                  object-fit: cover;
                  border-radius: 5px;
                "
              />
              <span v-else>Tidak ada foto</span>
            </td>
            <td>Rp {{ w.biaya_wisata.toLocaleString("id-ID") }}</td>
            <td>{{ w.lokasi }}</td>
            <td>
              <button class="btn-edit" @click="editWisata(w.id)">Edit</button>
              <button class="btn-delete" @click="confirmDelete(w.id)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION -->
      <div class="pagination">
        <button
          :disabled="pagination.current_page === 1"
          @click="loadWisatas(pagination.current_page - 1)"
        >
          ◀ Prev
        </button>
        <span
          >Halaman {{ pagination.current_page }} /
          {{ pagination.last_page }}</span
        >
        <button
          :disabled="pagination.current_page === pagination.last_page"
          @click="loadWisatas(pagination.current_page + 1)"
        >
          Next ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/wisatas";

export default {
  name: "AdminWisata",
  data() {
    return {
      wisatas: [],
      wisata: {
        id: null,
        nama: "",
        kategori: "",
        alamat_wisata: "",
        deskripsi: "",
        foto_wisata: null,
        foto_url_preview: null,
        biaya_wisata: 0,
        lokasi: "",
      },
      kategoris: [
        "Wisata Alam",
        "Wisata Budaya",
        "Wisata Sejarah",
        "Wisata Religi",
        "Wisata Kuliner",
        "Wisata Belanja",
        "Wisata Edukasi",
        "Wisata Petualangan",
        "Wisata Kesehatan",
      ],
      editing: false,
      pagination: { current_page: 1, last_page: 1 },
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.wisata.foto_wisata = file;
      this.wisata.foto_url_preview = file ? URL.createObjectURL(file) : null;
    },

    async saveWisata() {
      if (
        !this.wisata.nama ||
        !this.wisata.kategori ||
        !this.wisata.foto_wisata
      ) {
        alert("Nama, Kategori, dan Foto wajib diisi!");
        return;
      }

      const formData = new FormData();
      formData.append("nama", this.wisata.nama);
      formData.append("kategori", this.wisata.kategori);
      formData.append("alamat_wisata", this.wisata.alamat_wisata);
      formData.append("deskripsi", this.wisata.deskripsi);
      formData.append("biaya_wisata", this.wisata.biaya_wisata);
      formData.append("lokasi", this.wisata.lokasi);
      formData.append("foto_wisata", this.wisata.foto_wisata);

      try {
        await axios.post(BASE_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.loadWisatas();
        this.resetForm();
      } catch (err) {
        console.error("Gagal menambahkan Wisata:", err.response || err);
      }
    },

    async loadWisatas(page = 1) {
      try {
        const res = await axios.get(`${BASE_URL}?page=${page}`);
        this.wisatas = res.data.data;
        this.pagination = res.data.paging;
      } catch (err) {
        console.error("Gagal load Wisata:", err);
      }
    },

    resetForm() {
      this.wisata = {
        id: null,
        nama: "",
        kategori: "",
        alamat_wisata: "",
        deskripsi: "",
        foto_wisata: null,
        foto_url_preview: null,
        biaya_wisata: 0,
        lokasi: "",
      };
      this.editing = false;
      const fileInput = this.$el.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    },
  },
  mounted() {
    this.loadWisatas();
  },
};
</script>

<style scoped>
.page {
  display: flex;
  background: #f4f4f4;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
.sidebar {
  width: 240px;
  background: #1e1e2d;
  color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: 20px;
  overflow-y: auto;
  transition: 0.3s;
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
  padding: 0;
  margin: 0;
}
.menu li {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: 0.3s;
}
.menu li:hover {
  background: #35354a;
}
.main {
  margin-left: 240px;
  width: calc(100% - 240px);
  padding: 20px;
  transition: 0.3s;
}
.main.collapsed {
  margin-left: 70px;
  width: calc(100% - 70px);
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
  font-size: 24px;
  font-weight: bold;
}
.form-box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}
.form-row input,
.form-row select,
.form-row textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.user-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.pagination button {
  padding: 6px 12px;
  background: #1e1e2d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination button:disabled {
  background: #888;
  cursor: not-allowed;
}
.btn-save {
  background: #1e88e5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
.btn-cancel {
  background: #9e9e9e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.current-photo-preview {
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.photo-preview-text {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
}
</style>
