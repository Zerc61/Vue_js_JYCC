<template>
  <div class="page">

    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <img :src="logo" alt="Logo" class="logo" />
          <h1 class="title">Halal Apps</h1>
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
      <button v-for="(n, i) in bottomNav" :key="i" class="nav-btn">
        <span class="nav-ico">{{ n.icon }}</span>
        <small class="nav-label">{{ n.label }}</small>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      query: "",
      // logo via require so webpack bundles it
      logo: require("@/assets/scream.png"),

      menus: [
            { name: "Halal", icon: "halal.png", route: "/halal" },
            { name: "UMKM", icon: "umkm.png", route: "/umkm" },
            { name: "Paket Wisata", icon: "Paket.png", route: "/destinasi" },
            { name: "Wisata", icon: "wisata.png", route: "/event" },
            { name: "Travel", icon: "transportasi.png", route: "/travel" },
            { name: "Kuliner", icon: "kuliner.png", route: "/kuliner" },
            { name: "Hotel", icon: "hotel.png", route: "/hotel" },
            { name: "Tiket", icon: "tiket.png", route: "/tiket" },
            { name: "Tiket", icon: "smart.png", route: "/Smart Itinerary" },

            // 👇 Tambahan menu Top Up dengan link
            { name: "Top Up", icon: "Dcoin.png", route: "/topup" }
            ],

      promos: [
        { title: "Batu Flower Garden", image: "batu.png" },
        { title: "Selecta Malang", image: "malang.png" },
        { title: "Museum Angkut", image: "angkut.png" }
      ],

      umkm: [
        { name: "Kerajinan", image: "umkm1.jpg" },
        { name: "Sambal", image: "umkm2.jpg" },
        { name: "Batik", image: "umkm3.jpg" },
        { name: "Kopi", image: "umkm4.jpg" },
        { name: "Olahan Ikan", image: "umkm5.jpg" }
      ],

      bottomNav: [
        { label: "Home", icon: "🏠" },
        { label: "Explore", icon: "📍" },
        { label: "Promo", icon: "⭐" },
        { label: "Wishlist", icon: "❤️" },
        { label: "Akun", icon: "👤" }
      ]
    };
  },
  methods: {
    // helper to require assets dynamically
    getAsset(name) {
      try {
        return require(`@/assets/${name}`);
      } catch (e) {
        // fallback to a placeholder image in public or a data URL
        // return require("@/assets/placeholder.png");
         return "";
      }
    }
  }
};
</script>

<style scoped>
/* Reset */
* { box-sizing: border-box; }
.page { min-height: 100vh; background: #f3f4f6; padding-bottom: 88px; }

/* Header */
.header { background: linear-gradient(90deg,#3b82f6,#6366f1); color: #fff; padding: 18px 16px; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; box-shadow: 0 6px 18px rgba(99,102,241,0.12); }
.header-inner { max-width: 1100px; margin: 0 auto; display:flex; flex-direction:column; gap:12px; }
.brand { display:flex; align-items:center; gap:12px; }
.logo { width:44px; height:44px; object-fit:contain; border-radius:8px; background:rgba(255,255,255,0.08); padding:6px; }
.title { font-size:18px; font-weight:700; margin:0; color:#fff; }

/* search */
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

/* menu */
.menu-section { max-width:1100px; margin: -28px auto 8px; padding: 0 16px; }
.menu-grid { background:#fff; padding:14px; border-radius:14px; display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; box-shadow: 0 6px 18px rgba(15,23,42,0.04); }
.menu-item { display:flex; flex-direction:column; align-items:center; gap:8px; padding:6px 4px; text-align:center; cursor:pointer; transition: transform .18s ease, box-shadow .18s ease; }
.menu-item:hover { transform: translateY(-6px); }
.menu-icon { width:56px; height:56px; border-radius:12px; background: #eff6ff; display:flex; align-items:center; justify-content:center; box-shadow: 0 6px 12px rgba(15,23,42,0.04); }
.menu-icon img { width:36px; height:36px; object-fit:contain; }
.menu-label { font-size:12px; color:#111827; }

/* promo */
.promo-section { max-width:1100px; margin: 12px auto; padding: 0 16px; }
.section-title { font-size:16px; font-weight:700; margin-bottom:10px; color:#0f172a; }

/* horizontal scroller */
.promo-list { display:flex; gap:12px; overflow-x:auto; padding-bottom:6px; -webkit-overflow-scrolling:touch; }
.promo-card { min-width:220px; background:#fff; border-radius:12px; overflow:hidden; box-shadow: 0 6px 18px rgba(15,23,42,0.05); transition: transform .18s ease; cursor:pointer; }
.promo-card:hover { transform: translateY(-6px); }
.promo-media img { width:100%; height:140px; object-fit:cover; display:block; }
.promo-body { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; }
.promo-title { font-size:14px; font-weight:700; color:#0f172a; }
.promo-badge { font-size:11px; background:#fff0f0; color:#ef4444; padding:4px 8px; border-radius:10px; font-weight:600; }

/* umkm list */
.umkm-section { max-width:1100px; margin: 8px auto; padding: 0 16px 80px; }
.umkm-list { display:flex; gap:12px; overflow-x:auto; padding:6px 0; }
.umkm-item { min-width:84px; display:flex; flex-direction:column; align-items:center; gap:8px; background:transparent; cursor:pointer; }
.umkm-photo { width:72px; height:72px; border-radius:50%; object-fit:cover; box-shadow: 0 6px 14px rgba(15,23,42,0.06); }
.umkm-name { font-size:12px; text-align:center; color:#0f172a; }

/* bottom nav */
.bottom-nav {
  position:fixed;
  left:0; right:0; bottom:12px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  gap:6px;
  max-width:820px;
  margin:0 auto;
  padding:8px 12px;
  background:#fff;
  border-radius:24px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.12);
  transform: translateY(0);
}
.nav-btn { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; background:transparent; border:none; cursor:pointer; padding:6px 10px; }
.nav-ico { font-size:18px; }
.nav-label { font-size:11px; color:#374151; }

/* scrollbar hide for modern browsers */
.promo-list::-webkit-scrollbar, .umkm-list::-webkit-scrollbar { height:8px; }
.promo-list::-webkit-scrollbar-thumb, .umkm-list::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.08); border-radius:8px; }

/* responsive */
@media (max-width: 640px) {
  .menu-grid { grid-template-columns: repeat(4, 1fr); }
  .promo-media img { height:120px; }
  .promo-card { min-width:200px; }
  .header-inner { gap:8px; }
  .title { font-size:16px; }
  .bottom-nav { left:12px; right:12px; bottom:12px; }
}
</style>
