<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="brand">
        <span v-if="!isCollapsed">ADMIN PANEL</span>
        <span v-else>AP</span>
      </div>
      <ul class="menu">
        <li class="active" @click="$router.push('/admin')">
          <span class="menu-icon">🏠</span>
          <span v-if="!isCollapsed" class="menu-text">Dashboard</span>
        </li>

        <li @click="$router.push('/admin/users')">
          <span class="menu-icon">👤</span>
          <span v-if="!isCollapsed" class="menu-text">Data User</span>
        </li>
        <li @click="$router.push('/admin/umkms')">
          <span class="menu-icon">🏪</span>
          <span v-if="!isCollapsed" class="menu-text">Data UMKM</span>
        </li>
        <li @click="$router.push('/admin/drivers')">
          <span class="menu-icon">🚗</span>
          <span v-if="!isCollapsed" class="menu-text">Data Driver</span>
        </li>
        <li @click="$router.push('/admin/wisatas')">
          <span class="menu-icon">🗺️</span>
          <span v-if="!isCollapsed" class="menu-text">Data Wisata</span>
        </li>
        <li @click="$router.push('/admin/transportasis')">
          <span class="menu-icon">🚌</span>
          <span v-if="!isCollapsed" class="menu-text">Data Transportasi</span>
        </li>
        <li @click="$router.push('/admin/penginapans')">
          <span class="menu-icon">🏨</span>
          <span v-if="!isCollapsed" class="menu-text">Data Penginapan</span>
        </li>
        <li @click="$router.push('/admin/promos')">
          <span class="menu-icon">🎁</span>
          <span v-if="!isCollapsed" class="menu-text">Promo</span>
        </li>
        <li @click="$router.push('/admin/vouchers')">
          <span class="menu-icon">💳</span>
          <span v-if="!isCollapsed" class="menu-text">Voucher</span>
        </li>
        <li @click="$router.push('/admin/pakets')">
          <span class="menu-icon">📦</span>
          <span v-if="!isCollapsed" class="menu-text">Paket</span>
        </li>
        <li @click="$router.push('/admin/transaksis')">
          <span class="menu-icon">💰</span>
          <span v-if="!isCollapsed" class="menu-text">Transaksi</span>
        </li>
        <li @click="$router.push('/admin/laporans')">
          <span class="menu-icon">📄</span>
          <span v-if="!isCollapsed" class="menu-text">Laporan</span>
        </li>
        <li @click="$router.push('/admin/settings')">
          <span class="menu-icon">⚙️</span>
          <span v-if="!isCollapsed" class="menu-text">Pengaturan</span>
        </li>
        <li @click="logout">
          <span class="menu-icon">🚪</span>
          <span v-if="!isCollapsed" class="menu-text">Logout</span>
        </li>
      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <main :class="['content', { collapsed: isCollapsed }]">
      <header class="topbar">
        <div class="left-section">
          <span class="toggle-btn" @click="toggleSidebar">☰</span>
          <h2>Dashboard Administrator</h2>
        </div>
        <div class="right-section">
          <button
            class="refresh-btn"
            @click="fetchGoldPrice"
            :disabled="isLoading"
          >
            <span v-if="!isLoading" class="refresh-icon">🔄</span>
            <span v-else class="loading-spinner"></span>
            <span class="refresh-text">{{
              isLoading ? "Memuat..." : "Refresh"
            }}</span>
          </button>
          <div class="notification-bell" @click="toggleNotifications">
            <span class="bell-icon">🔔</span>
            <span v-if="unreadNotifications > 0" class="notification-badge">{{
              unreadNotifications
            }}</span>
          </div>
          <div v-if="showNotifications" class="notification-dropdown">
            <div class="notification-header">
              <h4>Notifikasi</h4>
              <button @click="markAllAsRead" class="mark-read-btn">
                Tandai semua dibaca
              </button>
            </div>
            <div class="notification-list">
              <div
                v-for="(notification, index) in notifications"
                :key="index"
                class="notification-item"
                :class="{ unread: !notification.read }"
              >
                <div class="notification-icon">{{ notification.icon }}</div>
                <div class="notification-content">
                  <p class="notification-title">{{ notification.title }}</p>
                  <p class="notification-message">{{ notification.message }}</p>
                  <p class="notification-time">{{ notification.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="dashboard-content">
        <div class="gold-price-container">
          <div class="gold-header">
            <h3>🏆 Harga Emas Hari Ini</h3>
            <span class="last-update">Update: {{ lastUpdate }}</span>
          </div>

          <div class="gold-price-main">
            <div class="current-price">
              <span class="price-label">Harga Emas 24K</span>
              <div class="price-display">
                <span class="currency">Rp</span>
                <span class="price-value">{{
                  formatNumber(goldPricePerGram)
                }}</span>
                <span class="price-unit">/gram</span>
              </div>
              <div v-if="goldData" class="price-info">
                <span class="info-label">Sumber:</span>
                <span class="info-value">Harga Internasional (USD)</span>
              </div>
              <div v-if="goldData && goldData.GSPPJ" class="price-details">
                <div class="price-detail-item">
                  <span class="detail-label">Harga Beli:</span>
                  <span class="detail-value"
                    >Rp
                    {{
                      // formatNumber(goldData.GSPPJ.Gold.IDR.bid / 31.1035)
                      formatNumber(goldData.GSPPJ.Gold.IDR.bid / 25)
                    }}</span
                  >
                </div>
                <div class="price-detail-item">
                  <span class="detail-label">Harga Jual:</span>
                  <span class="detail-value"
                    >Rp
                    {{ formatNumber(goldData.GSPPJ.Gold.IDR.ask / 25) }}</span
                  >
                </div>
                <div class="price-detail-item">
                  <span class="detail-label">Harga USD/oz:</span>
                  <span class="detail-value"
                    >${{ formatNumber(goldData.GSPPJ.Gold.USD.ask) }}</span
                  >
                </div>
              </div>
            </div>

            <div class="gold-status">
              <div class="status-item">
                <span class="status-label">Status</span>
                <span
                  class="status-value"
                  :class="{
                    online: isDataAvailable,
                    offline: !isDataAvailable,
                  }"
                >
                  {{ isDataAvailable ? "Tersedia" : "Tidak Tersedia" }}
                </span>
              </div>
              <div class="status-item">
                <span class="status-label">Koneksi</span>
                <span
                  class="status-value"
                  :class="{
                    connected: !connectionError,
                    disconnected: connectionError,
                  }"
                >
                  {{ connectionError ? "Gagal" : "Berhasil" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="cards">
          <div class="card user-card" @click="$router.push('/admin/users')">
            <div class="card-header">
              <h3>Total User</h3>
              <span class="card-icon">👥</span>
            </div>
            <div class="card-body">
              <p class="card-number">{{ totalUser }}</p>
              <div class="card-stats">
                <span class="stat-change positive">+12% dari bulan lalu</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '75%' }"></div>
              </div>
            </div>
          </div>

          <div class="card umkm-card" @click="$router.push('/admin/umkms')">
            <div class="card-header">
              <h3>Total UMKM</h3>
              <span class="card-icon">🏪</span>
            </div>
            <div class="card-body">
              <p class="card-number">{{ totalUmkm }}</p>
              <div class="card-stats">
                <span class="stat-change positive">+8% dari bulan lalu</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '60%' }"></div>
              </div>
            </div>
          </div>

          <div
            class="card report-card"
            @click="$router.push('/admin/laporans')"
          >
            <div class="card-header">
              <h3>Laporan Masuk</h3>
              <span class="card-icon">📊</span>
            </div>
            <div class="card-body">
              <p class="card-number">{{ totalReports }}</p>
              <div class="card-stats">
                <span class="stat-change negative">-3% dari bulan lalu</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '45%' }"></div>
              </div>
            </div>
          </div>

          <div
            class="card transaction-card"
            @click="$router.push('/admin/transaksis')"
          >
            <div class="card-header">
              <h3>Transaksi Hari Ini</h3>
              <span class="card-icon">💰</span>
            </div>
            <div class="card-body">
              <p class="card-number">{{ todayTransactions }}</p>
              <div class="card-stats">
                <span class="stat-change positive">+25% dari kemarin</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '85%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-row">
          <div class="quick-actions">
            <h3>Aksi Cepat</h3>
            <div class="action-buttons">
              <button class="action-btn" @click="$router.push('/admin/users')">
                <span class="action-icon">➕</span>
                <span>Tambah User</span>
              </button>
              <button class="action-btn" @click="$router.push('/admin/umkms')">
                <span class="action-icon">➕</span>
                <span>Tambah UMKM</span>
              </button>
              <button class="action-btn" @click="$router.push('/admin/promos')">
                <span class="action-icon">🎁</span>
                <span>Buat Promo</span>
              </button>
              <button
                class="action-btn"
                @click="$router.push('/admin/laporans')"
              >
                <span class="action-icon">📄</span>
                <span>Lihat Laporan</span>
              </button>
            </div>
          </div>
        </div>

        <section class="welcome-box">
          <div class="welcome-content">
            <h2>Selamat Datang Admin!</h2>
            <p>Silakan pilih menu di sidebar untuk mengelola sistem.</p>
            <div class="welcome-stats">
              <div class="stat-item">
                <span class="stat-label">Hari Aktif:</span>
                <span class="stat-value">{{ activeDays }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Login Terakhir:</span>
                <span class="stat-value">{{ lastLogin }}</span>
              </div>
            </div>
          </div>
          <div class="welcome-image">
            <img
              src="https://picsum.photos/seed/dashboard/300/200.jpg"
              alt="Dashboard Welcome"
            />
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDashboardPage",

  data() {
    return {
      isCollapsed: false,
      isLoading: false,
      showNotifications: false,
      debugMode: false, // Set ke false setelah berhasil

      totalUser: 0,
      totalUmkm: 0,
      totalReports: 19,
      todayTransactions: 42,
      activeDays: 156,
      lastLogin: "Hari ini, 09:15",

      // Gold price data
      goldPricePerGram: 0,
      goldData: null,
      lastUpdate: "Belum ada data",
      isDataAvailable: false,
      connectionError: false,

      notifications: [
        {
          icon: "👤",
          title: "User Baru",
          message: "John Doe baru saja mendaftar",
          time: "5 menit yang lalu",
          read: false,
        },
        {
          icon: "🏪",
          title: "UMKM Baru",
          message: "Warung Nasi Bu Ida telah ditambahkan",
          time: "1 jam yang lalu",
          read: false,
        },
        {
          icon: "💰",
          title: "Transaksi Baru",
          message: "Transaksi #TRX12345 telah selesai",
          time: "2 jam yang lalu",
          read: true,
        },
        {
          icon: "📄",
          title: "Laporan Masuk",
          message: "Ada laporan masuk dari customer",
          time: "3 jam yang lalu",
          read: true,
        },
      ],
    };
  },

  computed: {
    unreadNotifications() {
      return this.notifications.filter((n) => !n.read).length;
    },
  },

  mounted() {
    this.loadDashboardData();
    this.fetchGoldPrice();
    // Auto refresh every 5 minutes
    setInterval(this.fetchGoldPrice, 300000);
    document.addEventListener("click", this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    async loadDashboardData() {
      try {
        const usersRes = await axios.get("http://127.0.0.1:8000/api/users");
        this.totalUser = usersRes.data.data.length;

        const umkmRes = await axios.get("http://127.0.0.1:8000/api/umkms");
        this.totalUmkm = umkmRes.data.data.length;

        // Simulasi data lainnya
        this.totalReports = Math.floor(Math.random() * 50) + 10;
        this.todayTransactions = Math.floor(Math.random() * 100) + 20;
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        this.showNotification("Gagal memuat data dashboard", "error");
      }
    },

    async fetchGoldPrice() {
      this.isLoading = true;
      this.connectionError = false;

      try {
        // Menggunakan API server lokal yang sudah dibuat
        const response = await axios.get(
          "http://localhost:3000/api/harga-emas"
        );
        this.goldData = response.data;

        // Log data untuk debugging
        console.log("API Response:", response.data);

        // Ekstrak harga emas dan konversi ke per gram
        this.goldPricePerGram = this.extractGoldPricePerGram(this.goldData);

        // Update status berdasarkan apakah harga berhasil diekstrak
        this.isDataAvailable = this.goldPricePerGram > 0;

        // Update last update time
        const now = new Date();
        this.lastUpdate = `${now.getHours()}:${String(
          now.getMinutes()
        ).padStart(2, "0")} WIB`;

        // Add notification for successful update
        if (this.isDataAvailable) {
          this.addNotification({
            icon: "🏆",
            title: "Harga Emas Diperbarui",
            message: `Harga emas 24K: Rp ${this.formatNumber(
              this.goldPricePerGram
            )}/gram`,
            time: "Baru saja",
            read: false,
          });
        } else {
          this.addNotification({
            icon: "⚠️",
            title: "Data Tidak Valid",
            message: "Struktur data dari API tidak sesuai yang diharapkan",
            time: "Baru saja",
            read: false,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data harga emas:", error);
        this.connectionError = true;
        this.isDataAvailable = false;
        this.showNotification("Gagal mengambil data harga emas", "error");

        // Add notification for failed update
        this.addNotification({
          icon: "⚠️",
          title: "Koneksi Gagal",
          message: "Tidak dapat terhubung ke server harga emas",
          time: "Baru saja",
          read: false,
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Fungsi untuk mengekstrak harga emas per gram dari API
    extractGoldPricePerGram(data) {
      if (!data) return 0;

      try {
        if (data.GSPPJ && data.GSPPJ.Gold && data.GSPPJ.Gold.IDR) {
          // API memberikan harga per ounce, konversi ke per gram
          // 1 ounce = 31.1035 gram
          const pricePerOunce = parseFloat(data.GSPPJ.Gold.IDR.ask);
          // const pricePerGram = pricePerOunce / 31.1035;
          const pricePerGram = pricePerOunce / 25;

          // Tambahkan margin untuk harga lokal Indonesia (biasanya 10-15% lebih mahal)
          // karena biaya impor, pajak, dan margin toko
          const localPriceMultiplier = 1; // 12% markup
          const localPricePerGram = pricePerGram * localPriceMultiplier;

          return Math.round(localPricePerGram);
        }
      } catch (error) {
        console.error("Error extracting gold price:", error);
      }

      return 0;
    },

    addNotification(notification) {
      // Add new notification at the beginning of array
      this.notifications.unshift(notification);

      // Keep only the latest 5 notifications
      if (this.notifications.length > 5) {
        this.notifications = this.notifications.slice(0, 5);
      }
    },

    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },

    markAllAsRead() {
      this.notifications.forEach((n) => (n.read = true));
    },

    handleOutsideClick(event) {
      if (
        this.showNotifications &&
        !event.target.closest(".notification-bell") &&
        !event.target.closest(".notification-dropdown")
      ) {
        this.showNotifications = false;
      }
    },

    showNotification(message, type) {
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add("show");
      }, 10);

      setTimeout(() => {
        notification.classList.remove("show");
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
};
</script>

<style scoped>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Arial, sans-serif;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: #0f172a;
  color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 15px;
  transition: 0.3s;
  overflow-y: auto;
  z-index: 100;
}

.sidebar.collapsed {
  width: 70px;
}

.brand {
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
  background: #1e293b;
  margin-bottom: 20px;
  font-weight: 600;
}

.menu {
  list-style: none;
}

.menu li {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: 0.3s;
  border-left: 4px solid transparent;
  gap: 15px;
}

.menu li:hover {
  background: #1e293b;
}

.menu li.active {
  background: #1e293b;
  border-left: 4px solid #38bdf8;
}

.menu-icon {
  font-size: 20px;
  min-width: 20px;
  text-align: center;
}

.menu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* MAIN CONTENT */
.content {
  margin-left: 240px;
  width: 100%;
  padding: 20px;
  transition: 0.3s;
}

.content.collapsed {
  margin-left: 70px;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.toggle-btn {
  cursor: pointer;
  font-size: 22px;
  padding: 5px 10px;
  margin-right: 15px;
  background: #e2e8f0;
  border-radius: 5px;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #cbd5e1;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #e2e8f0;
}

.refresh-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: 16px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border-top-color: #0f172a;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.notification-bell {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.notification-bell:hover {
  background: #f1f5f9;
}

.bell-icon {
  font-size: 20px;
}

.notification-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  z-index: 1000;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.notification-header h4 {
  font-size: 16px;
  font-weight: 600;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  cursor: pointer;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
}

.notification-item:hover {
  background: #f8fafc;
}

.notification-item.unread {
  background: #f0f9ff;
}

.notification-icon {
  font-size: 20px;
  margin-right: 12px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-message {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #94a3b8;
}

/* DASHBOARD CONTENT */
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* GOLD PRICE CONTAINER */
.gold-price-container {
  background: linear-gradient(135deg, #f8e7a1 0%, #f9d56e 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  color: #7c2d12;
  margin-bottom: 25px;
}

.gold-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.gold-header h3 {
  font-size: 24px;
  font-weight: 600;
}

.last-update {
  font-size: 14px;
  opacity: 0.8;
}

.gold-price-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-price {
  flex: 1;
}

.price-label {
  font-size: 16px;
  opacity: 0.8;
  display: block;
  margin-bottom: 10px;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 15px;
}

.currency {
  font-size: 24px;
  opacity: 0.8;
}

.price-value {
  font-size: 48px;
  font-weight: bold;
}

.price-unit {
  font-size: 18px;
  opacity: 0.8;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 15px;
}

.info-label {
  opacity: 0.8;
}

.info-value {
  font-weight: 500;
}

.price-details {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}

.price-detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.price-detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 14px;
  opacity: 0.8;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
}

.gold-status {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 150px;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.status-label {
  font-size: 14px;
  opacity: 0.8;
}

.status-value {
  font-size: 16px;
  font-weight: 600;
}

.status-value.online,
.status-value.connected {
  color: #16a34a;
}

.status-value.offline,
.status-value.disconnected {
  color: #dc2626;
}

/* DASHBOARD CARDS */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  font-size: 16px;
  color: #475569;
  font-weight: 600;
}

.card-icon {
  font-size: 24px;
  opacity: 0.8;
}

.card-body {
  margin-bottom: 15px;
}

.card-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #0f172a;
}

.card-stats {
  display: flex;
  align-items: center;
}

.stat-change {
  font-size: 14px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.card-footer {
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #e2e8f0;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
}

.user-card .progress-fill {
  background: #3b82f6;
}

.umkm-card .progress-fill {
  background: #10b981;
}

.report-card .progress-fill {
  background: #ef4444;
}

.transaction-card .progress-fill {
  background: #f59e0b;
}

/* DASHBOARD ROW */
.dashboard-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

.quick-actions {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.quick-actions h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 20px;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 24px;
}

/* Welcome Box */
.welcome-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  gap: 20px;
}

.welcome-content {
  flex: 1;
}

.welcome-content h2 {
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 10px;
}

.welcome-content p {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 20px;
}

.welcome-stats {
  display: flex;
  gap: 20px;
}

.welcome-stats .stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.welcome-stats .stat-label {
  font-size: 14px;
  color: #64748b;
}

.welcome-stats .stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.welcome-image {
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.welcome-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
@media (max-width: 1024px) {
  .gold-price-main {
    flex-direction: column;
    gap: 20px;
  }

  .gold-status {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .sidebar.collapsed {
    width: 0;
    overflow: hidden;
  }

  .content {
    margin-left: 70px;
  }

  .content.collapsed {
    margin-left: 0;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .welcome-box {
    flex-direction: column;
  }

  .welcome-image {
    width: 100%;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .right-section {
    width: 100%;
    justify-content: space-between;
  }

  .price-display {
    flex-direction: column;
    align-items: flex-start;
  }

  .price-value {
    font-size: 36px;
  }
}
</style>
