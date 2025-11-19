<template>
  <div class="page">

    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <img :src="require('@/assets/scream 2.png')" alt="Logo" class="logo" />
          <h1 class="title">SCREAM Destination</h1>
        </div>

        <div class="search-wrap">
          <input
            v-model="query"
            type="text"
            placeholder="Cari destinasi, kuliner halal, atau UMKM..."
            class="search"
          />
        </div>
      </div>
    </header>

    <!-- Menu icons -->
    <section class="menu-section">
      <div class="menu-grid">
        <router-link
          v-for="item in menus"
          :key="item.name"
          :to="item.route"
          class="menu-item"
        >
          <div class="menu-icon">
            <img :src="getAsset(item.icon)" :alt="item.name" />
          </div>
          <div class="menu-label">{{ item.name }}</div>
        </router-link>
      </div>
    </section>

    <!-- Promo -->
    <section class="promo-section">
      <h2 class="section-title">Promo Saat Ini</h2>

      <div class="promo-list">
        <article
          v-for="(p, i) in promos"
          :key="i"
          class="promo-card"
        >
          <div class="promo-media">
            <img :src="getAsset(p.image)" :alt="p.title" />
          </div>
          <div class="promo-body">
            <div class="promo-title">{{ p.title }}</div>
            <div class="promo-badge">20% OFF</div>
          </div>
        </article>
      </div>
    </section>

    <!-- UMKM -->
    <section class="umkm-section">
      <h2 class="section-title">UMKM Populer</h2>

      <div class="umkm-list">
        <div
          v-for="(u, i) in umkm"
          :key="i"
          class="umkm-item"
        >
          <img :src="getAsset(u.image)" :alt="u.name" class="umkm-photo" />
          <div class="umkm-name">{{ u.name }}</div>
        </div>
      </div>
    </section>

    <!-- Bottom navigation -->
    <nav class="bottom-nav" aria-label="Bottom navigation">
      <button v-for="(n, i) in bottomNav" :key="i" class="nav-btn" @click="handleNavClick(n.label)">
        <span class="nav-ico">{{ n.icon }}</span>
        <small class="nav-label">{{ n.label }}</small>
      </button>
    </nav>

    <!-- Popup Logout dengan Animasi -->
    <transition name="popup-fade">
      <div v-if="showLogoutPopup" class="popup-overlay" @click="closeLogoutPopup">
        <div class="popup-content" @click.stop>
          <h3 class="popup-title">Konfirmasi Logout</h3>
          <p class="popup-message">Apakah Anda yakin ingin logout?</p>
          <div class="popup-buttons">
            <button class="btn-cancel" @click="closeLogoutPopup">Batal</button>
            <button class="btn-logout" @click="confirmLogout">Ya, Logout</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      query: "",
      logo: require("@/assets/scream.png"),
      showLogoutPopup: false, // State untuk popup logout

      menus: [
        { name: "UMKM", icon: "umkm.png", route: "/umkm" },
        { name: "Paket Wisata", icon: "Paket.png", route: "/destinasi" },
        { name: "Wisata", icon: "wisata.png", route: "/event" },
        { name: "Travel", icon: "transportasi.png", route: "/travel" },
        { name: "Hotel", icon: "hotel.png", route: "/hotel" },
        { name: "Tiket", icon: "tiket.png", route: "/tiket" },
        { name: "Smart Itinerary", icon: "smart.png", route: "/Smart Itinerary" },
        { name: "Top Up", icon: "Dcoin.png", route: "/topup" }
      ],

      promos: [
        { title: "Batu Flower Garden", image: "batu.png" },
        { title: "Selecta Malang", image: "malang.png" },
        { title: "Museum Angkut", image: "angkut.png" },
        { title: "Batu Flower Garden", image: "batu.png" },
        { title: "Selecta Malang", image: "malang.png" },
        { title: "Museum Angkut", image: "angkut.png" }
      ],

      umkm: [
        { name: "Kuliner", image: "kuliner.png" },
        { name: "Makanan Olahan", image: "makan.png" },
        { name: "Fashion", image: "fashion.png" },
        { name: "Kerajinan Tangan", image: "kerajinan.png" },
        { name: "Jasa", image: "jasa.png" },
        { name: "Agribisnis", image: "agri.png" },
        { name: "Bisnis Sosial", image: "bisnis.png" },
        { name: "IT dan Teknologi", image: "teknologi.png" },
        { name: "Peternakan", image: "peternak.png" },
        { name: "Perdagangan (Ritel)", image: "pedagang.png" },
      ],

      bottomNav: [
        { label: "Home", icon: "🏠" },
        { label: "Explore", icon: "📍" },
        { label: "Promo", icon: "⭐" },
        { label: "Wishlist", icon: "❤️" },
        { label: "Akun", icon: "👤" },
        { label: "Logout", icon: "🏃🏻‍♂️" }
      ]
    };
  },

  mounted() {
    this.autoScrollPromo();
  },

  methods: {
    getAsset(name) {
      try {
        return require(`@/assets/${name}`);
      } catch (e) {
        return "";
      }
    },

    /** 🔥 AUTO SCROLL PROMO */
    autoScrollPromo() {
      const container = this.$el.querySelector(".promo-list");
      let scrollAmount = 0;

      setInterval(() => {
        scrollAmount += 1;

        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });

        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
      }, 40);
    },

    /** 🔥 HANDLE BOTTOM NAV CLICK */
    handleNavClick(label) {
      if (label === "Logout") {
        this.showLogoutPopup = true; // Tampilkan popup
      } else {
        // Tambahkan logika untuk nav lain jika perlu (misalnya redirect)
        console.log(`Navigasi ke: ${label}`);
      }
    },

    /** 🔥 CLOSE POPUP */
    closeLogoutPopup() {
      this.showLogoutPopup = false;
    },

    /** 🔥 CONFIRM LOGOUT */
    confirmLogout() {
      // Hapus token dan role dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Redirect ke halaman login
      this.$router.push("/login");

      // Tutup popup
      this.showLogoutPopup = false;
    }
  }
};
</script>

<style scoped>
* { box-sizing: border-box; }
.page { min-height: 100vh; background: #f3f4f6; padding-bottom: 88px; }

/* Header */
.header { background: #190F49; color: #fff; padding: 18px 16px; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; box-shadow: 0 6px 18px rgba(99,102,241,0.12); }
.header-inner { max-width: 1100px; margin: 0 auto; display:flex; flex-direction:column; gap:12px; }
.brand { display:flex; align-items:center; gap:12px; }
.logo { width:44px; height:44px; object-fit:contain; border-radius:8px; background:rgba(255,255,255,0.08); padding:6px; }
.title { font-size:18px; font-weight:700; margin:0; color:#fff; }
.search-wrap { width:100%; }
.search {
  width:100%;
  padding:10px 14px;
  border-radius:12px;
  border: none;
  outline: none;
  font-size:14px;
  background:#ffffff;
  color:#111827;
  box-shadow: 0 4px 14px rgba(16,24,40,0.06);
}

/* Menu */
.menu-section { max-width:1100px; margin: -28px auto 8px; padding: 0 16px; }
.menu-grid { background:#fff; padding:14px; border-radius:14px; display:grid; grid-template-columns: repeat(4, 1fr); gap:2px; box-shadow: 0 6px 18px rgba(15,23,42,0.04); }
.menu-item { display:flex; flex-direction:column; align-items:center; gap:8px; padding:6px 4px; text-align:center; cursor:pointer; transition: transform .18s ease, box-shadow .18s ease; }
.menu-item:hover { transform: translateY(-6px); }
.menu-icon { width:56px; height:56px; border-radius:12px; background: #eff6ff; display:flex; align-items:center; justify-content:center; box-shadow: 0 6px 12px rgba(15,23,42,0.04); }
.menu-icon img { width:36px; height:36px; object-fit:contain; }
.menu-label { font-size:12px; color:#111827; }

/* Promo */
.promo-section { max-width:1100px; margin: 12px auto; padding: 0 16px; }
.section-title { font-size:16px; font-weight:700; margin-bottom:10px; color:#0f172a; }
.promo-list {
  display:flex;
  overflow-x:auto;
  gap:12px;
  padding-bottom:6px;
  scroll-behavior: smooth;
}
.promo-card { min-width:220px; background:#fff; border-radius:12px; overflow:hidden; box-shadow: 0 6px 18px rgba(15,23,42,0.05); transition: transform .18s ease; cursor:pointer; }
.promo-card:hover { transform: translateY(-6px); }
.promo-media img { width:100%; height:140px; object-fit:cover; display:block; }
.promo-body { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; }
.promo-title { font-size:14px; font-weight:700; color:#0f172a; }
.promo-badge { font-size:11px; background:#fff0f0; color:#ef4444; padding:4px 8px; border-radius:10px; font-weight:600; }

/* UMKM */
.umkm-section { max-width:1100px; margin: 8px auto; padding: 0 16px 80px; }
.umkm-list { display:flex; gap:12px; overflow-x:auto; padding:6px 0; }
.umkm-item { min-width:84px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; }
.umkm-photo { width:60px; height:60px; border-radius:10%; object-fit:cover; box-shadow: 0 6px 14px rgba(15,23,42,0.06); }
.umkm-name { font-size:12px; text-align:center; color:#0f172a; }

/* Bottom Nav */
.bottom-nav {
  position:fixed;
  left:0; right:0; bottom:12px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  max-width:820px;
  margin:0 auto;
  padding:8px 12px;
  background:#fff;
  border-radius:24px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.12);
}
.nav-btn { display:flex; flex-direction:column; gap:4px; background:transparent; border:none; cursor:pointer; }
.nav-ico { font-size:18px; }
.nav-label { font-size:11px; }

/* Popup Logout dengan Animasi */
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 300px;
  width: 90%;
}
.popup-title { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
.popup-message { font-size: 14px; color: #64748b; margin-bottom: 20px; }
.popup-buttons { display: flex; gap: 12px; justify-content: center; }
.btn-cancel, .btn-logout {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-cancel { background: #e5e7eb; color: #374151; }
.btn-cancel:hover { background: #d1d5db; }
.btn-logout { background: #ef4444; color: #fff; }
.btn-logout:hover { background: #dc2626; }

/* Animasi Popup */
.popup-fade-enter-active, .popup-fade-leave-active {
  transition: all 0.5s ease;
}
.popup-fade-enter {
  opacity: 0;
  transform: scale(0.8);
  filter: blur(4px);
}
.popup-fade-enter-to {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}
.popup-fade-leave {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}
.popup-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
  filter: blur(4px);
}

/* Responsive */
@media (max-width: 640px) {
  .promo-card { min-width:200px; }
  .promo-media img { height:120px; }
}
</style>