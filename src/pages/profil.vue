<template>
  <div class="profile-page">
    <!-- Top Profile Section -->
    <div class="profile-header">
      <div class="left-box">
        <img class="avatar" src="@/assets/halal.png" alt="avatar" />
        <div class="user-info">
          <h2 class="name">Anjar Jomoksono</h2>
          <span class="badge">VVIP</span>
        </div>
      </div>

      <div class="right-box">
        <div class="info-card">
          <p>Emas</p>
          <h3>2 gram</h3>
        </div>
        <div class="info-card">
          <p>Rupiah</p>
          <h4>Rp 234.253 (kosong)</h4>
        </div>
        <div class="info-card balance">
          <p>Saldo D’coin</p>
          <h3 class="dc"><span class="coin">🪙</span> 10.000 D'C</h3>
        </div>
      </div>
    </div>

    <!-- Riwayat Aktivitas -->
    <h3 class="section-title">Riwayat Aktivitas</h3>
    <div class="activity-grid">
      <div class="item"><img src="" />Kuliner</div>
      <div class="item">Penginapan</div>
      <div class="item">Transportasi</div>
      <div class="item">Paket Wisata</div>
      <div class="item">Wisata</div>
    </div>

    <!-- Mitra Section -->
    <h3 class="section-title">Mulai Usaha atau Jadi Mitra?</h3>
    <div class="mitra-grid">
      <div class="item">UMKM</div>
      <div class="item">penginapan</div>
      <div class="item">Driver</div>
      <div class="item">wisata</div>
    </div>

    <!-- Footer Links -->
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

    <!-- Bottom navigation -->
    <nav class="bottom-nav" aria-label="Bottom navigation">
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
      query: "",

      bottomNav: [
        { label: "Home", image: require('@/assets/dashboard.png'), route: "/" },
        { label: "Explore", image: require('@/assets/explore.png'), route: "/explore" },
        { label: "Promo", image: require('@/assets/promo.png'), route: "/promo" },
        { label: "Wishlist", image: require('@/assets/wishlist.png'), route: "/wishlist" },
        { label: "Profil", image: require('@/assets/profil.png'), route: "/profil" }
      ]
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: "Poppins", sans-serif;
  padding: 20px;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.left-box {
  display: flex;
  align-items: center;
  gap: 15px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.user-info .name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.badge {
  background: #3b1b8f;
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
}
.right-box {
  display: flex;
  gap: 15px;  
}
.info-card {
  background: #f8f9fc;
  padding: 12px 18px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #dcdcdc;
}
.balance {
  border-color: #3b1b8f;
}
.dc {
  color: #ff9800;
  font-weight: 700;
}
.section-title {
  margin-top: 25px;
  font-size: 18px;
  font-weight: 600;
}
.activity-grid, .mitra-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 10px;
}
.item {
  background: #fff;
  border: 2px solid #e0e0e0;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
}
.footer-links {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

/* Bottom Navigation */
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
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);

  z-index: 999;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #222;
  gap: 4px;
  font-family: "Poppins", sans-serif;
}

.nav-image {
  width: 26px;
  height: 26px;
  object-fit: contain;
  display: block;
}

.nav-label {
  font-size: 11px;
  color: #444;
}
</style>