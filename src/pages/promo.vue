<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page">
    <!-- HEADER -->
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <img :src="getAsset('scream 2.png')" alt="Logo" class="logo" />
          <h1 class="title">SCREAM Destination</h1>
        </div>

        <!-- large centered search -->
        <div class="search-wrap">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="query"
              type="text"
              class="search-input"
              placeholder="Cari Paket wisata favoritmu..."
            />
            <button class="hamburger">☰</button>
          </div>
        </div>
      </div>
    </header>

    <main class="container-main">
      <!-- Promo Section -->
      <section class="section promo-section">
        <h2 class="section-title">Paket Wisata Discount</h2>

        <div class="cards-grid">
          <router-link
            v-for="(p, i) in promos"
            :key="i"
            :to="p.route"
            class="card"
          >
            <div class="card-media">
              <img :src="getAsset(p.image)" :alt="p.title" />
            </div>
            <div class="card-footer">
              <div class="card-title">{{ p.title }}</div>
              <div class="badge">20% off</div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Round Trip Section -->
      <section class="section pulang-pergi">
        <h2 class="section-title">Paket Wisata Pulang-Pergi</h2>

        <div class="cards-grid small">
          <router-link
            v-for="(p, i) in returnTrips"
            :key="i"
            :to="p.route"
            class="card small-card"
          >
            <div class="card-media">
              <img :src="getAsset(p.image)" :alt="p.title" />
            </div>
            <div class="card-footer">
              <div class="card-title">{{ p.title }}</div>
            </div>
          </router-link>
        </div>
      </section>
    </main>

    <!-- Bottom Nav -->
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

<script setup>
import { reactive, ref } from "vue";

// Query search
const query = ref("");

// Promo items
const promos = reactive([
  { title: "Batu Flower", image: "batu.png", route: "/promo" },
  { title: "Selecta Malang", image: "malang.png", route: "/promo" },
  { title: "Museum Angkut", image: "angkut.png", route: "/promo" },
  { title: "Batu Night Spectacular", image: "night.png", route: "/promo" },
]);

// Round trip section
const returnTrips = reactive([
  { title: "Jakarta → Bali", image: "pura.png", route: "/destinasi" },
  { title: "Bandung → Lombok", image: "pura.png", route: "/destinasi" },
  { title: "Surabaya → Bali", image: "pura.png", route: "/destinasi" },
  { title: "Malang → Bali", image: "pura.png", route: "/destinasi" },
]);

// Bottom navigation
function getAsset(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}

const bottomNav = reactive([
  { label: "Home", image: getAsset("dashboard.png"), route: "/dashboard" },
  { label: "Explore", image: getAsset("explore.png"), route: "/explore" },
  { label: "Promo", image: getAsset("promo.png"), route: "/promo" },
  { label: "Wishlist", image: getAsset("wishlist.png"), route: "/wishlist" },
  { label: "Profile", image: getAsset("profil.png"), route: "/profil" },
]);
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f0f0f2;
  padding-bottom: 110px;
  font-family: "Poppins", sans-serif;
}

.header {
  background: linear-gradient(180deg, #1a0f52 0%, #12093f 100%);
  color: white;
  padding: 28px 18px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.12);
  position: relative;
}

/* Logo brand */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  object-fit: contain;
}
.title {
  font-size: 18px;
  font-weight: 800;
}

/* Search */
.search-wrap { display: flex; justify-content: center; margin-top: 10px; }
.search-box {
  width: 80%;
  background: white;
  padding: 12px 18px;
  border-radius: 28px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.search-input { flex: 1; border: none; outline: none; }

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 18px;
}
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
  min-height: 180px;
}
.card-media img { width: 100%; height: 120px; object-fit: cover; }

/* Badge */
.badge {
  background: #ffe6e6;
  color: #e63939;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}

/* Bottom nav */
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 18px;
  margin: auto;
  width: 92%;
  background: white;
  padding: 10px 16px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0,0,0,0.28);
}
.nav-image { width: 28px; }
.nav-label { font-size: 12px; }
</style>
