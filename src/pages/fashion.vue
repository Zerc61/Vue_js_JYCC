<template>
  <div class="page">
    <!-- header with logo & search -->
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <img :src="logoUrl" alt="Logo" class="logo" />
          <div class="search-wrap">
            <input v-model="q" class="search" placeholder="Cari fashion..." />
            <button v-if="q" class="clear" @click="q = ''">✕</button>
          </div>
        </div>
      </div>
    </header>

    <!-- filters -->
    <section class="filters">
      <div class="filters-inner">
        <div class="category" :class="{active: selectedCategory === 'all'}" @click="selectCategory('all')">Semua</div>
        <div v-for="cat in categories" :key="cat" class="category" :class="{active: selectedCategory === cat}" @click="selectCategory(cat)">{{ cat }}</div>
        <div class="sort">
          <label>Urutkan</label>
          <select v-model="sortKey">
            <option value="popular">Paling populer</option>
            <option value="price_asc">Harga: Rendah &rarr; Tinggi</option>
            <option value="price_desc">Harga: Tinggi &rarr; Rendah</option>
            <option value="new">Terbaru</option>
          </select>
        </div>
      </div>
    </section>

    <!-- product grid -->
    <main class="content">
      <div class="grid">
        <article v-for="p in filteredProducts" :key="p.id" class="card">
          <div class="img-wrap">
            <img :src="getAsset(p.image)" :alt="p.title" />
            <span v-if="p.badge" class="badge">{{ p.badge }}</span>
          </div>
          <div class="card-body">
            <h4 class="title">{{ p.title }}</h4>
            <div class="meta">
              <div class="price">Rp {{ formatNumber(p.price) }}</div>
              <button class="btn-buy" @click="addToCart(p)">Beli</button>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty">Tidak ada produk.</div>
    </main>

    <!-- bottom nav -->
    <nav class="bottom-nav">
      <router-link v-for="n in bottomNav" :key="n.label" :to="n.route" class="nav-btn" :class="{active: $route.path === n.route}">
        <img :src="n.image" class="nav-img" />
        <small class="nav-label">{{ n.label }}</small>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "UmkmFashion",
  data() {
    return {
      logoUrl: '/mnt/data/r.jpeg',
      q: '',
      selectedCategory: 'all',
      sortKey: 'popular',
      categories: ['Atasan','Bawahan','Dress','Outer','Aksesoris'],
      products: [
        { id:1, title:'Blouse Pastel', image:'produk1.jpg', price:80000, category:'Atasan', badge:'NEW' },
        { id:2, title:'Setelan Kulot', image:'produk2.jpg', price:120000, category:'Bawahan', badge:'20% OFF' },
        { id:3, title:'Mini Dress', image:'produk3.jpg', price:95000, category:'Dress', badge:'' },
        { id:4, title:'Outer Cardigan', image:'produk4.jpg', price:110000, category:'Outer', badge:'' },
        { id:5, title:'Rok Panjang', image:'produk5.jpg', price:70000, category:'Bawahan', badge:'' },
        { id:6, title:'Atasan Katun', image:'produk6.jpg', price:65000, category:'Atasan', badge:'HOT' },
        { id:7, title:'Maxi Dress', image:'produk7.jpg', price:140000, category:'Dress', badge:'' },
        { id:8, title:'Set Aksesoris', image:'produk8.jpg', price:45000, category:'Aksesoris', badge:'' }
      ],
      bottomNav: [
        { label: 'Home', route: '/', image: 'logo.png' },
        { label: 'Explore', route: '/explore', image: 'logo.png' },
        { label: 'Promo', route: '/promo', image: 'logo.png' },
        { label: 'Wishlist', route: '/wishlist', image: 'logo.png' },
        { label: 'Profil', route: '/profil', image: 'logo.png' },
        { label: 'Logout', route: '/logout', image: 'logout.png' }
      ]
    };
  },
  computed: {
    filteredProducts() {
      let list = this.products.slice();

      if (this.selectedCategory !== 'all') {
        list = list.filter(p => p.category === this.selectedCategory);
      }

      const kw = this.q.trim().toLowerCase();
      if (kw) {
        list = list.filter(p => (p.title + ' ' + p.category).toLowerCase().includes(kw));
      }

      if (this.sortKey === 'price_asc') list.sort((a,b) => a.price - b.price);
      else if (this.sortKey === 'price_desc') list.sort((a,b) => b.price - a.price);
      else if (this.sortKey === 'new') list.sort((a,b) => b.id - a.id);

      return list;
    }
  },
  methods: {
    selectCategory(c) { this.selectedCategory = c; },
    formatNumber(n) { return Number(n).toLocaleString('id-ID'); },
    getAsset(filename) { try { return require(`@/assets/${filename}`); } catch (e) { return '/mnt/data/r.jpeg'; } },
    addToCart(p) { alert(`Tambah "${p.title}" ke keranjang (contoh).`); }
  }
};
</script>

<style scoped>
*{box-sizing:border-box}
.page{min-height:100vh;background:#f5f6f8;padding-bottom:92px;font-family:Poppins, sans-serif}

/* header */
.header{background:linear-gradient(90deg,#1a1f6b,#2c2a74);padding:16px}
.header-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center}
.brand{display:flex;gap:12px;width:100%}
.logo{width:140px;height:38px;object-fit:cover;border-radius:6px}
.search-wrap{flex:1;position:relative}
.search{width:100%;padding:10px;border-radius:12px;border:none;outline:none;background:#fff}
.clear{position:absolute;right:10px;top:8px;background:transparent;border:none;cursor:pointer}

/* filters */
.filters{max-width:1100px;margin:16px auto;padding:0 12px}
.filters-inner{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.category{padding:8px 12px;background:#fff;border-radius:999px;border:1px solid #eee;cursor:pointer;font-weight:600}
.category.active{background:#1a1f6b;color:#fff;border-color:#1a1f6b}
.sort{margin-left:auto;display:flex;gap:8px;align-items:center}

/* grid */
.content{max-width:1100px;margin:12px auto;padding:0 12px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,0.06);display:flex;flex-direction:column}
.card:hover{transform:translateY(-6px)}
.img-wrap{position:relative}
.img-wrap img{width:100%;height:260px;object-fit:cover;display:block}
.badge{position:absolute;left:10px;top:10px;background:#ff3b30;color:#fff;padding:6px 8px;border-radius:8px;font-weight:700}
.card-body{padding:12px;display:flex;flex-direction:column;gap:10px}
.title{font-size:14px;margin:0;font-weight:700;color:#111;min-height:42px}
.meta{display:flex;justify-content:space-between;align-items:center}
.price{color:#e53935;font-weight:800}
.btn-buy{background:linear-gradient(90deg,#1a1f6b,#2b2a74);border:none;color:#fff;padding:8px 12px;border-radius:8px;cursor:pointer}

/* bottom nav */
.bottom-nav{position:fixed;left:12px;right:12px;bottom:12px;display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto;padding:10px 14px;background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,0.12);z-index:999}
.nav-btn{display:flex;flex-direction:column;align-items:center;text-decoration:none;color:#444;gap:6px;width:64px;padding:6px;border-radius:10px}
.nav-btn.active{background:linear-gradient(90deg,#eef0ff,#f6f6ff)}
.nav-img{width:26px;height:26px;object-fit:contain}
.nav-label{font-size:12px;color:#333}

/* responsive */
@media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}.img-wrap img{height:220px}}
@media(max-width:700px){.grid{grid-template-columns:repeat(2,1fr)}.logo{width:110px}}
@media(max-width:420px){.grid{grid-template-columns:repeat(1,1fr)}}
</style>
