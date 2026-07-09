<template>
  <div class="page-wrapper">
    <main class="container">
      <!-- KARTU PROFIL UTAMA (Dark Premium Style) -->
      <section class="profile-card">
        <div class="profile-info">
          <div class="avatar-wrap">
            <img class="avatar" src="@/assets/halal.png" alt="avatar" />
          </div>
          <div class="user-details">
            <h2 class="name">{{ user.username }}</h2>
            <p class="email">{{ user.email || 'user@email.com' }}</p>
            <span class="badge">{{ user.role === 'admin' ? 'Administrator' : 'VVIP Member' }}</span>
          </div>
        </div>
        
        <button class="btn-logout-icon" @click="handleLogout" title="Keluar">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </button>
      </section>

      <!-- STATISTIK SALDO (Grid) -->
      <section class="stat-grid">
        <div class="stat-card">
          <div class="stat-icon bg-yellow">
            <img src="@/assets/emas.png" alt="emas" v-if="getAsset('emas.png')">
            <span v-else>🏆</span>
          </div>
          <div class="stat-data">
            <p>Emas</p>
            <h3>{{ formatGram(store.saldo_dcoin) }} gr</h3>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-green">
            <img src="@/assets/rupiah.png" alt="rupiah" v-if="getAsset('rupiah.png')">
            <span v-else>💵</span>
          </div>
          <div class="stat-data">
            <p>Rupiah</p>
            <h3>{{ formatRupiah(store.saldo_dcoin) }}</h3>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-blue">
            <img src="@/assets/Dcoin.png" alt="coin" v-if="getAsset('Dcoin.png')">
            <span v-else>🪙</span>
          </div>
          <div class="stat-data">
            <p>Saldo D’coin</p>
            <h3>{{ formatNumber(store.saldo_dcoin) }} DC</h3>
          </div>
        </div>
      </section>

      <!-- MENU AKTIVITAS -->
      <div class="menu-sections">
        <h3 class="section-title">Riwayat Aktivitas</h3>
        <div class="clean-grid">
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/kuliner.png" alt="icon" v-if="getAsset('kuliner.png')"><span v-else>🍲</span></div>
            <span>Kuliner</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/hotel.png" alt="icon" v-if="getAsset('hotel.png')"><span v-else>🏨</span></div>
            <span>Penginapan</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/transportasi.png" alt="icon" v-if="getAsset('transportasi.png')"><span v-else>🚗</span></div>
            <span>Transport</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/Paket.png" alt="icon" v-if="getAsset('Paket.png')"><span v-else>🗺️</span></div>
            <span>Paket Wisata</span>
          </div>
        </div>

        <h3 class="section-title mt-4">Mulai Usaha & Mitra</h3>
        <div class="clean-grid">
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/umkm.png" alt="icon" v-if="getAsset('umkm.png')"><span v-else>🏪</span></div>
            <span>Daftar UMKM</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/hotel.png" alt="icon" v-if="getAsset('hotel.png')"><span v-else>🤝</span></div>
            <span>Mitra Hotel</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/transportasi.png" alt="icon" v-if="getAsset('transportasi.png')"><span v-else>🛵</span></div>
            <span>Jadi Driver</span>
          </div>
          <div class="grid-item">
            <div class="icon-box"><img src="@/assets/wisata.png" alt="icon" v-if="getAsset('wisata.png')"><span v-else>🏔️</span></div>
            <span>Mitra Wisata</span>
          </div>
        </div>
      </div>

      <!-- PUSAT BANTUAN -->
      <section class="settings-list">
        <h3 class="section-title">Pusat Bantuan & Info</h3>
        <div class="list-wrapper">
          <a href="#" class="list-item">Kendala Pesanan <span class="arrow">›</span></a>
          <a href="#" class="list-item">Aturan Penggunaan <span class="arrow">›</span></a>
          <a href="#" class="list-item">Kebijakan Privasi <span class="arrow">›</span></a>
          <a href="#" class="list-item">Tentang East Java Traveling <span class="arrow">›</span></a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { globalStore } from '@/store'; 

export default {
  name: "ProfileDashboard",
  data() {
    return {
      store: globalStore,
      user: {
        username: "Guest",
        email: "",
        role: "user"
      }
    };
  },
  mounted() {
    const activeUser = localStorage.getItem("active_user");
    if (activeUser) {
      this.user = JSON.parse(activeUser);
    }
  },
  methods: {
    handleLogout() {
      const confirmLogout = confirm("Apakah Anda yakin ingin keluar dari akun ini?");
      if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("active_user");
        this.$router.push("/login");
      }
    },
    formatNumber(num) {
      return new Intl.NumberFormat("id-ID").format(num || 0);
    },
    formatRupiah(dc) {
      const rupiah = (dc || 0) * 1000;
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rupiah);
    },
    formatGram(dc) {
      const gram = (dc || 0) / 5000;
      return gram.toFixed(2).replace('.', ',');
    },
    getAsset(name) {
      try { return require(`@/assets/${name}`); } 
      catch { return false; }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');

* { box-sizing: border-box; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; }

.page-wrapper { 
  min-height: 100vh; 
  background: #f8fafc; /* Serasi dengan dashboard & topup */
  color: #0f172a; 
  padding-top: 100px; /* Jarak aman dari Navbar Atas */
  padding-bottom: 80px; 
}

.container { max-width: 800px; margin: 0 auto; padding: 0 20px; }

/* KARTU PROFIL UTAMA */
.profile-card { 
  display: flex; justify-content: space-between; align-items: center; 
  background: #0f172a; /* Warna gelap elegan */
  padding: 28px; 
  border-radius: 24px; 
  color: #ffffff; 
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15); 
}
.profile-info { display: flex; align-items: center; gap: 20px; }
.avatar-wrap { width: 72px; height: 72px; border-radius: 50%; background: #ffffff; padding: 3px; }
.avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.name { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
.email { font-size: 13px; color: #94a3b8; margin-bottom: 12px; font-weight: 500; }
.badge { background: #fbbf24; color: #78350f; padding: 6px 14px; font-size: 11px; font-weight: 800; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }

.btn-logout-icon { 
  background: rgba(255, 255, 255, 0.1); border: none; color: #ffffff; 
  width: 48px; height: 48px; border-radius: 14px; 
  display: flex; align-items: center; justify-content: center; 
  cursor: pointer; transition: all 0.3s ease; 
}
.btn-logout-icon:hover { background: #ef4444; transform: scale(1.05); }
.btn-logout-icon svg { width: 22px; height: 22px; }

/* STATISTIK SALDO */
.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
.stat-card { 
  background: #ffffff; padding: 20px; border-radius: 20px; border: 1px solid #e2e8f0; 
  display: flex; flex-direction: column; align-items: center; text-align: center; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02); transition: 0.3s;
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); }
.stat-icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 20px; }
.stat-icon img { width: 24px; height: 24px; object-fit: contain; }

.bg-yellow { background: #fef3c7; }
.bg-green { background: #d1fae5; }
.bg-blue { background: #e0f2fe; }

.stat-data p { font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
.stat-data h3 { font-size: 16px; font-weight: 800; color: #0f172a; }

/* MENU SECTIONS */
.menu-sections { margin-top: 40px; }
.section-title { font-size: 18px; font-weight: 800; margin-bottom: 20px; color: #0f172a; }
.mt-4 { margin-top: 40px; }

.clean-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.grid-item { display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; transition: transform 0.2s; }
.grid-item:hover { transform: translateY(-4px); }
.icon-box { 
  width: 64px; height: 64px; background: #ffffff; border: 1px solid #e2e8f0; 
  border-radius: 20px; display: flex; align-items: center; justify-content: center; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); font-size: 24px; transition: 0.3s;
}
.grid-item:hover .icon-box { border-color: #cbd5e1; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06); }
.icon-box img { width: 30px; height: 30px; object-fit: contain; }
.grid-item span { font-size: 12px; font-weight: 700; color: #475569; text-align: center; }

/* PUSAT BANTUAN */
.settings-list { margin-top: 40px; }
.list-wrapper { background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02); }
.list-item { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 20px 24px; text-decoration: none; color: #334155; 
  font-size: 15px; font-weight: 600; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; 
}
.list-item:last-child { border-bottom: none; }
.list-item:hover { background: #f8fafc; padding-left: 28px; } /* Efek geser halus saat disentuh */
.arrow { color: #94a3b8; font-size: 20px; font-weight: 700; transition: 0.2s; }
.list-item:hover .arrow { color: #0f172a; transform: translateX(4px); }

/* RESPONSIF */
@media (max-width: 768px) { 
  .stat-grid { grid-template-columns: 1fr; } 
  .clean-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .profile-card { flex-direction: column; text-align: center; gap: 20px; }
  .profile-info { flex-direction: column; }
  .btn-logout-icon { width: 100%; border-radius: 12px; }
}
</style>