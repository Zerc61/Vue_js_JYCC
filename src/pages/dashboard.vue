<template>
  <div class="page">
    <!-- Header -->
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
            <img
              :src="getAsset(item.icon)"
              :alt="item.name"
            />
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

    <!-- UMKM POPULER -->
    <section class="umkm-section">
      <h2 class="section-title">UMKM Populer</h2>
      <div class="umkm-list">
        <div
          v-for="(u, i) in umkm"
          :key="i"
          class="umkm-item"
        >
          <img
            :src="getAsset(u.image)"
            :alt="u.name"
            class="umkm-photo"
          />
          <div class="umkm-name">{{ u.name }}</div>
        </div>
      </div>
    </section>

    <!-- Bottom navigation -->
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
        { name: "Kuliner", image: "kuliner.png" },
        { name: "Makanan Olahan", image: "olahan.png" },
        { name: "Fashion", image: "fashion.png" },
        { name: "Kerajinan Tangan", image: "kerajinan.png" },
        { name: "Jasa", image: "jasa.png" },
        { name: "Agribisnis", image: "agri.png" },
        { name: "Bisnis Sosial", image: "bisnis.png" },
        { name: "IT & Teknologi", image: "teknologi.png" },
        { name: "Peternakan", image: "peternak.png" },
        { name: "Perdagangan (Ritel)", image: "pedagang.png" },
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
        return "";
      }
    },
    // AUTO SCROLL PROMO
    autoScrollPromo() {
      const container = this.$el.querySelector(".promo-list");
      let scrollAmount = 1;
      setInterval(() => {
        scrollAmount += 1;
        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 1;
        }
      }, 40);
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

/* Menu */
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
}

/* Promo */
.promo-section {
  max-width: 1100px;
  margin: 12px auto;
  padding: 0 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.promo-list {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 6px;
  scroll-behavior: smooth;
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

/* UMKM */
.umkm-section {
  max-width: 1100px;
  margin: 8px auto;
  padding: 0 16px 80px;
}

.umkm-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 6px 0;
}

.umkm-item {
  min-width: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.umkm-photo {
  width: 60px;
  height: 60px;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
}

.umkm-name {
  font-size: 12px;
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