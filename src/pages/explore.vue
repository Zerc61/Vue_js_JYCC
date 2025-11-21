<template>
  <div class="explore-page">
    <header class="explore-header">
      <img :src="logoUrl" class="logo" />
      <div class="search">
        <input v-model="q" placeholder="Cari..." />
      </div>
    </header>

    <main class="explore-main">
      <h2>Kategori Populer</h2>
      <div class="cat-grid">
        <router-link v-for="c in categories" :key="c.label" :to="c.route" class="cat-card">
          <img :src="getAsset(c.icon)" />
          <div>{{ c.label }}</div>
        </router-link>
      </div>
    </main>

    <nav class="bottom-nav">
      <router-link v-for="n in bottomNav" :key="n.label" :to="n.route" class="nav-btn" :class="{active: $route.path === n.route}">
        <img :src="n.image" class="nav-img" />
        <small>{{ n.label }}</small>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "ExploreView",
  data() {
    return {
      logoUrl: '/mnt/data/r.jpeg',
      q: '',
      categories: [
        { label: 'Kuliner', icon: 'kuliner.png', route: '/explore?tab=kuliner' },
        { label: 'Penginapan', icon: 'hotel.png', route: '/explore?tab=hotel' },
        { label: 'Travel', icon: 'transportasi.png', route: '/explore?tab=travel' },
        { label: 'UMKM', icon: 'umkm.png', route: '/explore?tab=umkm' }
      ],
      bottomNav: [
        { label: 'Home', route: '/', image: require('@/assets/dashboard.png') },
        { label: 'Explore', route: '/explore', image: require('@/assets/explore.png') },
        { label: 'Promo', route: '/promo', image: require('@/assets/promo.png') },
        { label: 'Wishlist', route: '/wishlist', image: require('@/assets/wishlist.png') },
        { label: 'Profil', route: '/profil', image: require('@/assets/profil.png') }
      ]
    };
  },
  methods: {
    getAsset(name) { try { return require(`@/assets/${name}`); } catch { return '/mnt/data/r.jpeg'; } }
  }
};
</script>

<style scoped>
.explore-page{font-family:Poppins, sans-serif;padding-bottom:92px;background:#f5f6f8}
.explore-header{background:#190f49;padding:16px;display:flex;gap:12px;align-items:center}
.logo{width:120px;height:auto}
.search input{padding:8px;border-radius:10px;border:none;outline:none}
.explore-main{max-width:1100px;margin:18px auto;padding:0 12px}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
.cat-card{background:#fff;border-radius:12px;padding:18px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;color:inherit;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
.cat-card img{width:64px;height:64px;object-fit:contain}
.bottom-nav{position:fixed;left:12px;right:12px;bottom:12px;display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto;padding:10px 14px;background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,0.12);z-index:999}
.nav-btn{display:flex;flex-direction:column;align-items:center;text-decoration:none;color:#444;gap:6px;width:64px;padding:6px;border-radius:10px}
.nav-btn.active{background:linear-gradient(90deg,#eef0ff,#f6f6ff)}
.nav-img{width:26px;height:26px;object-fit:contain}
</style>
