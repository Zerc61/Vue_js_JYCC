<template>
  <div class="product-page">

    <!-- Header -->
    <header class="header">
      <input type="text" placeholder="Fashion..." class="search" />
    </header>

    <!-- Produk Utama -->
    <div class="product-main">
      <img :src="require('@/assets/fashion1.png')" class="main-img" />

      <div class="info">
        <div class="badge">ORI</div>

        <h2 class="title">Kaos putih oversized, Bahan Adem dan Ringan.</h2>

        <div class="rating">
          ⭐⭐⭐⭐⭐ <span>5.0 • 35 ribu ulasan</span>
        </div>

        <div class="price">50.000 - 100.000</div>

        <div class="sizes">
          <button v-for="s in ['XL','XXL','L','XL']" :key="s" class="size-btn">{{ s }}</button>
        </div>

        <div class="actions">
          <button class="buy-now">Beli Sekarang</button>
          <button class="cart">Keranjang</button>
        </div>
      </div>
    </div>

    <!-- Produk Terkait -->
    <h3 class="section-title">Rekomendasi Serupa</h3>

    <div class="grid">
      <div v-for="n in 6" :key="n" class="card" @click="goToDetail">
        <img :src="require('@/assets/fashion2.png')" />
        <div class="label">ORI</div>
        <p class="price-small">50.000</p>
      </div>
    </div>

    <!-- Store -->
    <div class="store">
      <img :src="require('@/assets/halal.png')" class="store-img" />
      <span>Toko ArgiFestival</span>
    </div>

    <!-- Grid bawah lagi -->
    <div class="grid bottom">
      <div v-for="n in 6" :key="'b-'+n" class="card">
        <img :src="require('@/assets/fashion3.png')" />
        <div class="label">ORI</div>
        <p class="price-small">50.000</p>
      </div>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <button>🏠</button>
      <button>🔍</button>
      <button>⭐</button>
      <button>🛒</button>
      <button>👤</button>
    </nav>

  </div>
</template>

<script>
export default {
  name: "ProdukDetailPage",
  methods: {
    goToDetail() {
      alert("Pindah ke produk detail lain")
    }
  }
}
</script>

<style scoped>
.product-page {
  font-family: Poppins, sans-serif;
  padding-bottom: 90px;
}

/* Header */
.header {
  background: #180C4A;
  padding: 15px;
  display: flex;
  justify-content: center;
}
.search {
  width: 90%;
  border-radius: 30px;
  padding: 10px 15px;
  border: none;
  outline: none;
}

/* Product Block */
.product-main {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.main-img {
  width: 300px;
  border-radius: 10px;
}
.badge {
  background: red;
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 5px;
  display: inline-block;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0;
}
.rating span {
  font-size: 12px;
  color: gray;
}
.price {
  font-size: 28px;
  font-weight: bold;
  color: red;
  margin: 10px 0;
}
.sizes {
  margin: 10px 0;
}
.size-btn {
  border: 1px solid #180C4A;
  background: white;
  border-radius: 20px;
  padding: 5px 12px;
  margin-right: 6px;
}
.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}
.buy-now {
  background: #180C4A;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
.cart {
  border: 1px solid #180C4A;
  background: white;
  padding: 10px 20px;
  border-radius: 8px;
}

/* Grid Produk */
.section-title {
  margin-left: 15px;
  font-weight: bold;
  margin-top: 20px;
}

.grid {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 10px;
}
.card {
  background: white;
  width: 120px;
  border-radius: 10px;
  padding: 8px;
}
.card img {
  width: 100%;
  border-radius: 8px;
}
.label {
  background: red;
  padding: 2px 5px;
  color: white;
  font-size: 10px;
  border-radius: 5px;
  margin-top: 5px;
  display: inline-block;
}
.price-small {
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
}

/* Store */
.store {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px;
}
.store-img {
  width: 30px;
}

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.1);
}
.bottom-nav button {
  font-size: 22px;
  background: none;
  border: none;
}
</style>