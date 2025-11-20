<template>
  <div class="profile-page">

    <!-- LOADING -->
    <div v-if="loading" class="loading-box">
      Loading...
    </div>

    <div v-else>

      <!-- HEADER PROFIL -->
      <section class="profile-header">
        <div class="ph-inner">

          <img :src="user.profile" class="ph-avatar" />

          <div class="ph-info">
            <h2 class="ph-name">{{ user.name }}</h2>
            <span class="ph-badge">{{ user.vip }}</span>
          </div>

          <!-- SALDO -->
          <div class="saldo-box">
            <p class="sb-label">Saldo D’coin</p>
            <p class="sb-value">
              {{ user.saldo.toLocaleString() }}
              <span class="sb-unit">D'C</span>
            </p>
          </div>

          <!-- BOX EMAS & RUPIAH -->
          <div class="ph-stats">
            <div class="stat-box">
              <p class="s-label">Emas</p>
              <p class="s-value">{{ user.emas }} gram</p>
            </div>

            <div class="stat-box">
              <p class="s-label">Rupiah</p>
              <p class="s-value">Rp {{ user.rupiah.toLocaleString() }}</p>
            </div>
          </div>

        </div>
      </section>

      <!-- RIWAYAT AKTIVITAS -->
      <h3 class="sub-title">Riwayat Aktivitas</h3>

      <div class="activity-grid">
        <div class="activity-item">🍕 <p>Kuliner</p></div>
        <div class="activity-item">🏨 <p>Penginapan</p></div>
        <div class="activity-item">🚗 <p>Transportasi</p></div>
        <div class="activity-item">🎁 <p>Paket Wisata</p></div>
        <div class="activity-item">🌍 <p>Wisata</p></div>
      </div>

      <!-- MENU LAINNYA -->
      <div class="menu-list">
        <div class="menu-row">Kendala Pesanan <span>›</span></div>
        <div class="menu-row">Pusat Bantuan <span>›</span></div>
        <div class="menu-row">Tentang Kami <span>›</span></div>
      </div>

    </div>

    <!-- Bottom Navigation (disembunyikan di desktop) -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-btn">🏠 <small>Home</small></router-link>
      <router-link to="/explore" class="nav-btn">📍 <small>Explore</small></router-link>
      <router-link to="/promo" class="nav-btn">⭐ <small>Promo</small></router-link>
      <router-link to="/wishlist" class="nav-btn">❤️ <small>Wishlist</small></router-link>
      <router-link to="/profil" class="nav-btn active">👤 <small>Akun</small></router-link>
    </nav>

  </div>
</template>

<script>
export default {
  name: "ProfileView",

  data() {
    return {
      loading: true,
      user: {
        name: "",
        saldo: 0,
        emas: 0,
        rupiah: 0,
        vip: "",
        profile: ""
      }
    };
  },

  async mounted() {
    await this.fetchUser();
  },

  methods: {
    async fetchUser() {
      try {
        const res = await fetch("https://api.example.com/user/profile");
        const data = await res.json();

        this.user = {
          name: data.name,
          saldo: data.saldo,
          emas: data.emas,
          rupiah: data.rupiah,
          vip: data.vip,
          profile: data.profile
            ? data.profile
            : require("@/assets/scream 2.png")
        };

      } catch (e) {
        console.error("Gagal ambil profil:", e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.profile-page {
  padding: 0 16px 80px;
  background: #f3f4f6;
  min-height: 100vh;
}

/* LOADING */
.loading-box {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
}

/* HEADER */
.profile-header {
  background: #190F49;
  padding: 26px 20px;
  margin-bottom: 20px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  color: white;
}

.ph-inner {
  max-width: 1100px;
  margin: auto;
}

.ph-avatar {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 3px solid white;
}

.ph-name {
  font-size: 22px;
  font-weight: 700;
}

.ph-badge {
  background: #fff;
  color: #190F49;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
}

/* SALDO */
.saldo-box {
  background: white;
  color: #190F49;
  padding: 14px 16px;
  border-radius: 12px;
  margin-top: 18px;
  width: fit-content;
}

.sb-label {
  font-size: 12px;
  color: #6b7280;
}

.sb-value {
  font-size: 22px;
  color: #ef4444;
  margin-top: 4px;
  font-weight: 700;
}

.sb-unit {
  color: #190F49;
}

/* STATS */
.ph-stats {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.stat-box {
  background: white;
  padding: 14px;
  border-radius: 12px;
  flex: 1;
}

.s-label {
  font-size: 12px;
  color: #6b7280;
}

.s-value {
  font-size: 18px;
  font-weight: 700;
}

/* ACTIVITIES */
.sub-title {
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
}

.activity-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.activity-item {
  width: 90px;
  height: 90px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  padding-top: 18px;
  font-size: 26px;
}

.activity-item p {
  margin-top: 6px;
  font-size: 12px;
}

/* MENU LIST */
.menu-list {
  margin-top: 20px;
  background: white;
  border-radius: 14px;
  overflow: hidden;
}

.menu-row {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.menu-row:last-child {
  border-bottom: none;
}

/* BOTTOM NAV — hidden on desktop */
.bottom-nav {
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
  max-width: 820px;
  margin: auto;
  padding: 8px 12px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.12);
  display: flex;
  justify-content: space-around;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  text-decoration: none;
  color: #111;
}

.nav-btn.active {
  color: #190F49;
  font-weight: 700;
}

.nav-btn small {
  font-size: 11px;
}

/* ONLY MOBILE SHOW NAV */
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
</style>
