<template>
  <div class="profile-page">

    <div class="profile-header">
      <div class="left-box">
        <img class="avatar" src="@/assets/halal.png" alt="avatar" />

        <div class="user-info">
          <h2 class="name">Anjar Jomoksono</h2>
          <span class="badge">VVIP</span>
        </div>
      </div>

      <button class="logout-btn" @click="logout">
        <img src="@/assets/logout.png" alt="logout" />
      </button>
    </div>

    <div class="stat-box">
      <div class="info-card balance">
        <p>Emas</p>
        <h3 class="dc">
          <img src="@/assets/emas.png" alt="emas" class="icon-stat">
          <span>2 gram</span>
        </h3> 
      </div>

      <div class="info-card balance">
        <p>Rupiah</p>
        <h3 class="dc">
          <img src="@/assets/rupiah.png" alt="rupiah" class="icon-stat"> 
          <span>Rp 234.253</span>
        </h3>
      </div>

      <div class="info-card balance">
        <p>Saldo D’coin</p>
        <h3 class="dc">
          <img src="@/assets/Dcoin.png" alt="coin" class="icon-stat"> 
          <span>10.000 D'C</span>
        </h3>
      </div>
    </div>

    <h3 class="section-title">Riwayat Aktivitas</h3>
    <div class="activity-grid">
      <div class="item">
        <img src="@/assets/kuliner.png" alt="icon" class="grid-icon"> 
        <span class="grid-label">Kuliner</span>
      </div>
      <div class="item">
        <img src="@/assets/hotel.png" alt="icon" class="grid-icon"> 
        <span class="grid-label">Penginapan</span>
      </div>
      <div class="item">
        <img src="@/assets/transportasi.png" alt="icon" class="grid-icon"> 
        <span class="grid-label">Transportasi</span>
      </div>
      <div class="item">
        <img src="@/assets/Paket.png" alt="icon" class="grid-icon"> 
        <span class="grid-label">Paket Wisata</span>
      </div>
      <div class="item">
        <img src="@/assets/wisata.png" alt="icon" class="grid-icon">
        <span class="grid-label">Wisata</span>
      </div>
    </div>

    <h3 class="section-title">Mulai Usaha atau Jadi Mitra?</h3>
    <div class="mitra-grid">
      <div class="item">
        <img src="@/assets/umkm.png" alt="icon" class="grid-icon">
        <span class="grid-label">UMKM</span>
      </div>
      <div class="item">
        <img src="@/assets/hotel.png" alt="icon" class="grid-icon">
        <span class="grid-label">Penginapan</span>
      </div>
      <div class="item">
        <img src="@/assets/transportasi.png" alt="icon" class="grid-icon">
        <span class="grid-label">Driver</span>
      </div>
      <div class="item">
        <img src="@/assets/wisata.png" alt="icon" class="grid-icon">
        <span class="grid-label">Wisata</span>
      </div>
    </div>

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
        { label: "Home", image: require('@/assets/dashboard.png'), route: "/" },
        { label: "Explore", image: require('@/assets/explore.png'), route: "/explore" },
        { label: "Promo", image: require('@/assets/promo.png'), route: "/promo" },
        { label: "Wishlist", image: require('@/assets/wishlist.png'), route: "/wishlist" },
        { label: "Profil", image: require('@/assets/profil.png'), route: "/profil" }
      ]
    }
  },

  methods: {
    logout() {
      // Logic logout
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: "Poppins", sans-serif;
  padding: 20px;
  padding-bottom: 120px; /* Space for bottom nav */
  background-color: #f9f9f9;
  min-height: 100vh;
}

/* HEADER */
.profile-header {
  display: flex;
  justify-content: space-between;
  background: #190f49; /* Dark Blue Theme */
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  align-items: center;
  color: white;
}

.left-box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.2);
}

.user-info .name {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.badge {
  background: #fffb24; /* Yellow Badge */
  color: #000000;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 20px;
}

.logout-btn {
  background: transparent;
  border: none;
}

.logout-btn img {
  width: 24px;
  filter: brightness(0) invert(1); /* White icon */
  cursor: pointer;
}

/* STAT BAR */
.stat-box {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.info-card {
  flex: 1;
  background: #fff;
  padding: 15px 10px;
  border-radius: 14px;
  text-align: center;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.info-card p {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.dc {
  color: #ff9800;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.icon-stat {
  height: 24px;
  width: auto;
  object-fit: contain;
}

/* GRID */
.section-title {
  margin-top: 30px;
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.activity-grid,
.mitra-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.item {
  background: #fff;
  border: 1px solid #3b1b8f;
  padding: 12px 5px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.item:hover {
  transform: translateY(-3px);
}

.grid-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.grid-label {
  font-size: 10px;
  font-weight: 600;
  color: #3b1b8f;
  text-align: center;
  line-height: 1.2;
}

/* FOOTER */
.footer-links {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
  line-height: 2;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 18px;
  background: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
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
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.nav-label {
  font-size: 10px;
  color: #555;
}
</style>