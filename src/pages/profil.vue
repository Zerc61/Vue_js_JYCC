<template>
  <div class="profile-page">

    <!-- HEADER PROFILE -->
    <div class="profile-header">
      <div class="left-box">
        <img class="avatar" src="@/assets/halal.png" alt="avatar" />

        <div class="user-info">
          <h2 class="name">Anjar Jomoksono</h2>
          <span class="badge">VVIP</span>
        </div>
      </div>

      <!-- logout button -->
      <button class="logout-btn" @click="logout">
        <img src="@/assets/logout.png" alt="logout" />
      </button>
    </div>

    <!-- STATISTIK -->
    <div class="stat-box">
      <div class="info-card">
        <p>Emas</p>
        <h3>2 gram</h3>
      </div>

      <div class="info-card">
        <p>Rupiah</p>
        <h3>Rp 234.253</h3>
      </div>

      <div class="info-card balance">
        <p>Saldo D’coin</p>
        <h3 class="dc">
          <img src="@/assets/Dcoin.png" alt="coin" class="coin"> 
          <br>
          10.000 D'C
        </h3>
      </div>
    </div>

    <!-- RIWAYAT AKTIVITAS -->
    <h3 class="section-title">Riwayat Aktivitas</h3>
    <div class="activity-grid">
      <div class="item">Kuliner</div>
      <div class="item">Penginapan</div>
      <div class="item">Transportasi</div>
      <div class="item">Paket Wisata</div>
      <div class="item">Wisata</div>
    </div>

    <!-- MITRA -->
    <h3 class="section-title">Mulai Usaha atau Jadi Mitra?</h3>
    <div class="mitra-grid">
      <div class="item">UMKM</div>
      <div class="item">Penginapan</div>
      <div class="item">Driver</div>
      <div class="item">Wisata</div>
    </div>

    <!-- FOOTER -->
    <div class="footer-links">
      <div class="left">
        <p>Kendala Pesanan</p>
        <p>Pusat Bantuan</p>
        <p>Daftar Komplain</p>
      </div>
      <div class="right">
        <p>Tentang SCREAM</p>
        <p>Tentang Brand</p>
        <p>Aturan Penggunaan</p>
        <p>Hubungi Kami</p>
        <p>Kebijakan Privasi</p>
      </div>
    </div>

    <!-- BOTTOM NAV -->
    <nav class="bottom-nav">
      <router-link
        v-for="(n, i) in bottomNav"
        :key="i"
        :to="n.route"
        class="nav-btn"
      >
        <img :src="n.image" class="nav-image" />
        <small class="nav-label">{{ n.label }}</small>
      </router-link>
    </nav>

  </div>
</template>

<script>
export default {
  name: "ProfileDashboard",

  data() {
    return {
      bottomNav: [
        { label: "Home", image: require('@/assets/dashboard.png'), route: "/dashboard" },
        { label: "Explore", image: require('@/assets/explore.png'), route: "/explore" },
        { label: "Promo", image: require('@/assets/promo.png'), route: "/promo" },
        { label: "Wishlist", image: require('@/assets/wishlist.png'), route: "/wishlist" },
        { label: "Profil", image: require('@/assets/profil.png'), route: "/profil" }
      ]
    }
  },

  methods: {
    logout() {
      this.$router.push("/login?swipe=right");
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: "Poppins", sans-serif;
  padding: 20px;
  padding-bottom: 120px; /* biar ga ketutup bottom nav */
}

/* HEADER */
.profile-header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  align-items: center;
}

.left-box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info .name {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
}
.coin {
  width: 10%;
  height: 10%;
  padding-left: 45%;
}
.badge {
  background: #3b1b8f;
  color: #fff;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 20px;
}

.logout-btn img {
  width: 28px;
  opacity: 0.8;
  cursor: pointer;
}

/* STAT BAR */
.stat-box {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.info-card {
  flex: 1;
  background: #f8f9fc;
  padding: 15px;
  border-radius: 14px;
  text-align: center;
  border: 2px solid #e3e3e3;
}

.balance {
  border-color: #3b1b8f;
}

.dc {
  color: #ff9800;
  font-weight: 700;
}

/* GRID */
.section-title {
  margin-top: 30px;
  font-weight: 600;
  font-size: 17px;
}

.activity-grid,
.mitra-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.item {
  background: #fff;
  border: 2px solid #ebebeb;
  padding: 15px;
  border-radius: 14px;
  font-size: 13px;
  text-align: center;
}

/* FOOTER */
.footer-links {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 14px;
  margin: 0 auto;
  max-width: 820px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 18px;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
  z-index: 999;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: #222;
}

.nav-image {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.nav-label {
  font-size: 11px;
  color: #444;
}
</style>
