<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <img
            :src="require('@/assets/scream 2.png')"
            alt="Logo"
            class="logo"
          />
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

    <section class="menu-section">
      <div class="menu-grid">
        <router-link
          v-for="item in menus"
          :key="item.name"
          :to="item.route"
          class="menu-item"
        >
          <div class="menu-icon">
            <img
              :src="getAsset(item.icon)"
              :alt="item.name"
            />
          </div>
          <div class="menu-label">{{ item.name }}</div>
        </router-link>
      </div>
    </section>

    <section class="promo-section">
      <h2 class="section-title">Promo Saat Ini</h2>
      <div class="promo-list">
        <article
          v-for="(p, i) in promos"
          :key="i"
          class="promo-card"
        >
          <div class="promo-media">
            <img
              :src="getAsset(p.image)"
              :alt="p.title"
            />
          </div>
          <div class="promo-body">
            <div class="promo-title">{{ p.title }}</div>
            <div class="promo-badge">20% OFF</div>
          </div>
        </article>
      </div>
    </section>
    <br>

    <section class="umkm-section">
      <h2 class="section-title">UMKM Populer</h2>
      <div class="umkm-list">
        <router-link
          v-for="item in umkm"
          :key="item.name"
          :to="item.route ? item.route : '/umkm'"
          class="umkm-item"
        >
          <div class="umkm-photo-wrap">
            <img
              :src="getAsset(item.icon)"
              :alt="item.name"
              class="umkm-photo"
            />
          </div>
          <div class="umkm-name">{{ item.name }}</div>
        </router-link>
      </div>
    </section>

    <nav
      class="bottom-nav"
      aria-label="Bottom navigation"
    >
      <router-link
        v-for="(n, i) in bottomNav"
        :key="i"
        :to="n.route"
        class="nav-btn"
      >
        <img
          :src="n.image"
          class="nav-image"
          :alt="n.label"
        />
        <small class="nav-label">{{ n.label }}</small>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      query: "",
      menus: [
        { name: "UMKM", icon: "umkm.png", route: "/umkm" },
        { name: "Paket Wisata", icon: "Paket.png", route: "/destinasi" },
        { name: "Wisata", icon: "wisata.png", route: "/event" },
        { name: "Transportasi", icon: "travel.png", route: "/transportasi" },
        { name: "Hotel", icon: "hotel.png", route: "/hotel" },
        { name: "Tiket", icon: "tiket.png", route: "/tiket" },
        { name: "Smart Itinerary", icon: "smart.png", route: "/smart" },
        { name: "Top Up", icon: "topup.png", route: "/topup" },
      ],
      promos: [
        { title: "Batu Flower Garden", image: "batu.png" },
        { title: "Selecta Malang", image: "malang.png" },
        { title: "Museum Angkut", image: "angkut.png" },
        { title: "Batu Flower Garden", image: "batu.png" },
        { title: "Selecta Malang", image: "malang.png" },
        { title: "Museum Angkut", image: "angkut.png" },
      ],
      umkm: [
        { name: "Kuliner", icon: "kuliner.png" },
        { name: "Makanan Olahan", icon: "olahan.png" },
        { name: "Fashion", icon: "fashion.png", route: "/fashion" },
        { name: "Kerajinan Tangan", icon: "kerajinan.png" },
        { name: "Jasa", icon: "jasa.png" },
        { name: "Agribisnis", icon: "agri.png" },
        { name: "Bisnis Sosial", icon: "bisnis.png" },
        { name: "IT & Teknologi", icon: "teknologi.png" },
        { name: "Peternakan", icon: "peternak.png" },
        { name: "Perdagangan (Ritel)", icon: "pedagang.png" },
      ],
      bottomNav: [
        {
          label: "Home",
          image: require("@/assets/dashboard.png"),
          route: "/",
        },
        {
          label: "Explore",
          image: require("@/assets/explore.png"),
          route: "/explore",
        },
        {
          label: "Promo",
          image: require("@/assets/promo.png"),
          route: "/promo",
        },
        {
          label: "Wishlist",
          image: require("@/assets/wishlist.png"),
          route: "/wishlist",
        },
        {
          label: "Profil",
          image: require("@/assets/profil.png"),
          route: "/profil",
        },
      ],
    };
  },
  mounted() {
    this.autoScrollPromo();
  },
  methods: {
    getAsset(name) {
      try {
        return require(`@/assets/${name}`);
      } catch {
        return ""; // Fallback if image is missing
      }
    },
    // AUTO SCROLL PROMO - Menggunakan RequestAnimationFrame (Lebih Smooth)
    autoScrollPromo() {
      const container = this.$el.querySelector(".promo-list");
      if (!container) return;
      
      let scrollAmount = 0;
      const scrollSpeed = 1; 
      const resetThreshold = 50;

      const scroll = () => {
        scrollAmount += scrollSpeed;
        container.scrollLeft = scrollAmount;

        // Reset ke awal ketika mendekati akhir
        if (scrollAmount >= container.scrollWidth - container.clientWidth - resetThreshold) {
          scrollAmount = 0;
        }

        requestAnimationFrame(scroll);
      };

      requestAnimationFrame(scroll);
    },
  },
};
</script>

<style scoped>
/* Global */
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #f3f4f6;
  padding-bottom: 88px;
}

/* Header */
.header {
  background: #190f49;
  color: #fff;
  padding: 18px 16px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.12);
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.search-wrap {
  width: 100%;
}

.search {
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  background: #ffffff;
  color: #111827;
  box-shadow: 0 4px 14px rgba(16, 24, 40, 0.06);
}

/* Menu Grid */
.menu-section {
  max-width: 1100px;
  margin: -28px auto 8px;
  padding: 0 16px;
}

.menu-grid {
  background: #fff;
  padding: 14px;
  border-radius: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.18s ease;
  text-decoration: none;
  color: inherit;
}

.menu-item:hover {
  transform: translateY(-6px);
}

.menu-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(15, 23, 42, 0.04);
}

.menu-icon img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.menu-label {
  font-size: 12px;
  color: #333;
}

/* Promo Section */
.promo-section {
  max-width: 1100px;
  margin: 12px auto;
  padding: 0 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #111;
}

.promo-list {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 6px;
  /* Hide scrollbar but allow functionality */
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  scroll-behavior: smooth;
}

.promo-list::-webkit-scrollbar {
  display: none; 
}

.promo-card {
  min-width: 220px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
  transition: transform 0.18s ease;
}

.promo-card:hover {
  transform: translateY(-6px);
}

.promo-media img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.promo-body {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
}

.promo-title {
  font-size: 14px;
  font-weight: 700;
}

.promo-badge {
  font-size: 11px;
  background: #fff0f0;
  color: #ef4444;
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: 600;
}

/* UMKM Section */
.umkm-section {
  max-width: 1100px;
  margin: 8px auto;
  padding: 0 16px 20px; /* Added padding bottom */
}

.umkm-list {
  display: flex;
  overflow-x: auto; /* Ensure it scrolls horizontally */
  gap: 16px;
  padding-bottom: 10px;
  scrollbar-width: none;
}

.umkm-list::-webkit-scrollbar {
  display: none;
}

.umkm-item {
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  gap: 8px;
}

.umkm-photo-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.umkm-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.umkm-name {
  font-size: 12px;
  text-align: center;
  max-width: 80px;
  line-height: 1.2;
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-around;
  padding: 12px 16px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
  z-index: 99;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #222;
  gap: 4px;
  font-family: "Poppins", sans-serif;
  transition: color 0.2s;
}

.nav-btn.router-link-active {
  color: #190f49;
  font-weight: 600;
}

.nav-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
}

.nav-label {
  font-size: 10px;
  color: inherit;
}
</style>