<template>
  <div class="page">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">ADMIN PANEL</div>
      <ul class="menu">
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        
        <li @click="$router.push('/admin/users')">
          👤 Data User
        </li>
        <li class="active" @click="$router.push('/admin/umkms')">🏪 Data UMKM</li>
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

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">☰</button>

      <h1 class="title">Kelola Data UMKM</h1>

      <!-- FORM INPUT -->
      <div class="form-box">
        <div class="form-header">
          <h3 class="section-title">{{ editing ? 'Edit UMKM' : 'Tambah UMKM Baru' }}</h3>
          <button v-if="editing" class="btn-cancel" @click="resetForm">
            <span class="icon">✕</span> Batal
          </button>
        </div>

        <div class="form-content">
          <div class="form-row">
            <div class="form-group">
              <label for="nama_umkm">Nama UMKM</label>
              <div class="input-wrapper">
                <span class="input-icon">🏪</span>
                <input 
                  type="text" 
                  id="nama_umkm"
                  v-model="umkm.nama_umkm" 
                  placeholder="Masukkan nama UMKM"
                  :class="{ 'error': errors.nama_umkm }"
                />
              </div>
              <span v-if="errors.nama_umkm" class="error-message">{{ errors.nama_umkm }}</span>
            </div>
            
            <div class="form-group">
              <label for="pemilik">Pemilik</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="pemilik"
                  v-model="umkm.pemilik" 
                  placeholder="Masukkan nama pemilik"
                  :class="{ 'error': errors.pemilik }"
                />
              </div>
              <span v-if="errors.pemilik" class="error-message">{{ errors.pemilik }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group full-width">
              <label for="informasi_umkm">Informasi UMKM</label>
              <div class="input-wrapper">
                <textarea
                  id="informasi_umkm"
                  v-model="umkm.informasi_umkm"
                  placeholder="Deskripsikan informasi tentang UMKM ini"
                  rows="3"
                  :class="{ 'error': errors.informasi_umkm }"
                ></textarea>
              </div>
              <span v-if="errors.informasi_umkm" class="error-message">{{ errors.informasi_umkm }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="kategori">Kategori</label>
              <div class="input-wrapper">
                <span class="input-icon">📂</span>
                <select 
                  id="kategori"
                  v-model="umkm.kategori"
                  :class="{ 'error': errors.kategori }"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="kuliner">Kuliner</option>
                  <option value="makanan_olahan">Makanan Olahan</option>
                  <option value="fashion">Fashion</option>
                  <option value="kerajinan_tangan">Kerajinan Tangan</option>
                  <option value="jasa">Jasa</option>
                  <option value="agribisnis">Agribisnis</option>
                  <option value="it_teknologi">IT & Teknologi</option>
                  <option value="peternakan">Peternakan</option>
                  <option value="perdagangan">Perdagangan</option>
                </select>
              </div>
              <span v-if="errors.kategori" class="error-message">{{ errors.kategori }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="jam_buka">Jam Buka</label>
              <div class="input-wrapper">
                <span class="input-icon">🕐</span>
                <input 
                  type="time" 
                  id="jam_buka"
                  v-model="umkm.jam_buka"
                  :class="{ 'error': errors.jam_buka }"
                />
              </div>
              <span v-if="errors.jam_buka" class="error-message">{{ errors.jam_buka }}</span>
            </div>
            
            <div class="form-group">
              <label for="jam_tutup">Jam Tutup</label>
              <div class="input-wrapper">
                <span class="input-icon">🕑</span>
                <input 
                  type="time" 
                  id="jam_tutup"
                  v-model="umkm.jam_tutup"
                  :class="{ 'error': errors.jam_tutup }"
                />
              </div>
              <span v-if="errors.jam_tutup" class="error-message">{{ errors.jam_tutup }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="foto_umkm">Foto UMKM</label>
              <div class="file-upload-wrapper">
                <div class="file-upload">
                  <input 
                    type="file" 
                    id="foto_umkm"
                    @change="handleFileUpload" 
                    accept="image/*"
                  />
                  <label for="foto_umkm" class="file-upload-label">
                    <span class="upload-icon">📷</span>
                    <span class="upload-text">{{ fileName || 'Pilih foto' }}</span>
                  </label>
                </div>
                <div v-if="previewImage" class="image-preview">
                  <img :src="previewImage" alt="Preview" />
                  <button type="button" class="remove-image" @click="removeImage">✕</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button 
              class="btn-save" 
              @click="saveUMKM"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              <span v-else>{{ editing ? '💾 Update UMKM' : '➕ Simpan UMKM' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TABLE UMKM -->
      <table class="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama UMKM</th>
            <th>Pemilik</th>
            <th>Informasi</th>
            <th>Foto</th>
            <th>Kategori</th>
            <th>Jam Buka</th>
            <th>Jam Tutup</th>
            <th style="width: 120px">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, i) in umkms" :key="u.id_umkm">
            <td>{{ i + 1 }}</td>
            <td>{{ u.nama_umkm }}</td>
            <td>{{ u.pemilik }}</td>
            <td>{{ u.informasi_umkm }}</td>
            <td>
                <img v-if="u.foto_umkm" 
                     :src="baseURL + u.foto_umkm" 
                     alt="Foto UMKM" 
                     class="table-image">
              </td>
            <td>{{ u.kategori }}</td>
            <td>{{ u.jam_buka }}</td>
            <td>{{ u.jam_tutup }}</td>
            <td>
              <button class="btn-edit" @click="editUMKM(u.id_umkm)">
                <span class="icon">✏️</span> Edit
              </button>
              <button class="btn-delete" @click="deleteUMKM(u.id_umkm)">
                <span class="icon">🗑️</span> Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION -->
      <div class="pagination">
        <button
          :disabled="pagination.current_page === 1"
          @click="loadUMKMs(pagination.current_page - 1)"
        >
          ◀ Prev
        </button>

        <span
          >Halaman {{ pagination.current_page }} /
          {{ pagination.last_page }}</span
        >

        <button
          :disabled="pagination.current_page === pagination.last_page"
          @click="loadUMKMs(pagination.current_page + 1)"
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
  name: "AdminUMKM",
  data() {
    return {
      isCollapsed: false,
      umkms: [],
      umkm: {
        id_umkm: null, // untuk edit
        nama_umkm: "",
        pemilik: "",
        informasi_umkm: "",
        kategori: "",
        jam_buka: "",
        jam_tutup: "",
        foto_umkm: null,
      },
      pagination: { current_page: 1, last_page: 1 },
      baseURL: "http://127.0.0.1:8000/storage/",
      editing: false, // menandakan sedang edit
      isSubmitting: false,
      fileName: "",
      previewImage: "",
      errors: {
        nama_umkm: "",
        pemilik: "",
        informasi_umkm: "",
        kategori: "",
        jam_buka: "",
        jam_tutup: "",
      }
    };
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.umkm.foto_umkm = file;
        this.fileName = file.name;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    removeImage() {
      this.umkm.foto_umkm = null;
      this.fileName = "";
      this.previewImage = "";
      document.getElementById('foto_umkm').value = '';
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        nama_umkm: "",
        pemilik: "",
        informasi_umkm: "",
        kategori: "",
        jam_buka: "",
        jam_tutup: "",
      };
      
      if (!this.umkm.nama_umkm.trim()) {
        this.errors.nama_umkm = "Nama UMKM harus diisi";
        isValid = false;
      }
      
      if (!this.umkm.pemilik.trim()) {
        this.errors.pemilik = "Nama pemilik harus diisi";
        isValid = false;
      }
      
      if (!this.umkm.informasi_umkm.trim()) {
        this.errors.informasi_umkm = "Informasi UMKM harus diisi";
        isValid = false;
      }
      
      if (!this.umkm.kategori) {
        this.errors.kategori = "Kategori harus dipilih";
        isValid = false;
      }
      
      if (!this.umkm.jam_buka) {
        this.errors.jam_buka = "Jam buka harus diisi";
        isValid = false;
      }
      
      if (!this.umkm.jam_tutup) {
        this.errors.jam_tutup = "Jam tutup harus diisi";
        isValid = false;
      }
      
      return isValid;
    },

    async loadUMKMs(page = 1) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/umkms?page=${page}`);
        this.umkms = res.data.data;
        this.pagination.current_page = res.data.paging.current_page;
        this.pagination.last_page = res.data.paging.last_page;
      } catch (err) {
        console.error("Error loading UMKMs:", err);
      }
    },

    async saveUMKM() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      try {
        const formData = new FormData();
        Object.keys(this.umkm).forEach((key) => {
          if (this.umkm[key] !== null) formData.append(key, this.umkm[key]);
        });

        let res;
        if (this.editing) {
          // edit UMKM
          res = await axios.post(
            `http://127.0.0.1:8000/api/umkms/${this.umkm.id_umkm}?_method=PUT`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          // tambah UMKM baru
          res = await axios.post("http://127.0.0.1:8000/api/umkms", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }

        this.showNotification(res.data.message, "success");
        this.loadUMKMs();
        this.resetForm();
      } catch (err) {
        console.error(err);
        this.showNotification("Gagal menyimpan UMKM", "error");
      } finally {
        this.isSubmitting = false;
      }
    },

    editUMKM(id) {
      const u = this.umkms.find((x) => x.id_umkm === id);
      if (u) {
        this.umkm = { ...u, foto_umkm: null }; // foto baru akan diupload jika ada
        this.editing = true;
        
        // Scroll to form
        document.querySelector('.form-box').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    async deleteUMKM(id) {
      if (confirm("Apakah kamu yakin ingin menghapus UMKM ini?")) {
        try {
          const res = await axios.delete(`http://127.0.0.1:8000/api/umkms/${id}`);
          this.showNotification(res.data.message, "success");
          this.loadUMKMs();
        } catch (err) {
          console.error(err);
          this.showNotification("Gagal menghapus UMKM", "error");
        }
      }
    },

    resetForm() {
      this.umkm = {
        id_umkm: null,
        nama_umkm: "",
        pemilik: "",
        informasi_umkm: "",
        kategori: "",
        jam_buka: "",
        jam_tutup: "",
        foto_umkm: null,
      };
      this.editing = false;
      this.fileName = "";
      this.previewImage = "";
      this.errors = {
        nama_umkm: "",
        pemilik: "",
        informasi_umkm: "",
        kategori: "",
        jam_buka: "",
        jam_tutup: "",
      };
      document.getElementById('foto_umkm').value = '';
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
      alert("Logout clicked");
    },
  },

  mounted() {
    this.loadUMKMs();
  },
};
</script>

<style scoped>
/* GENERAL PAGE LAYOUT */
.page {
  display: flex;
  background: #f4f4f4;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* SIDEBAR FIXED */
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
  z-index: 100;
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
  display: flex;
  align-items: center;
}

.menu li:hover {
  background: #35354a;
}

.menu .active {
  background: #3a3a52 !important;
  font-weight: bold;
  border-left: 4px solid #4f46e5;
}

/* MAIN CONTENT */
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
  color: #1e1e2d;
}

/* FORM SECTION */
.form-box {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e1e2d;
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
  padding: 24px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  position: relative;
}

.form-group.full-width {
  flex: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.input-wrapper {
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group textarea {
  padding-left: 12px;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
}

/* File Upload */
.file-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-upload {
  position: relative;
}

.file-upload input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-upload-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.file-upload-label:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.upload-icon {
  font-size: 18px;
}

.upload-text {
  font-size: 14px;
  color: #6b7280;
}

.image-preview {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(239, 68, 68, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn-save {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(102, 126, 234, 0.3);
}

.btn-save:disabled {
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
.user-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.user-table th {
  background: #f9fafb;
  color: #374151;
  font-weight: 600;
}

.user-table tr:hover {
  background: #f9fafb;
}

.table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
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
  background: #10b981;
  color: white;
}

.btn-edit:hover {
  background: #059669;
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 16px;
  background: #f9fafb;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  background: #e5e7eb;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .user-table {
    font-size: 14px;
  }
  
  .user-table th,
  .user-table td {
    padding: 8px;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>