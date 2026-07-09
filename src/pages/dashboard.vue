<template>
  <div class="page-wrapper">
    <!-- HERO SECTION (Sesuai Referensi Gambar) -->
    <section class="hero-section">
      <div class="hero-bg" :style="{ backgroundImage: 'url(' + require('@/assets/batu.png') + ')' }"></div>
      <div class="hero-overlay"></div>

      <div class="hero-container">
        <!-- Teks Kiri -->
        <div class="hero-text">
          <h4 class="subtitle">EXPLORE JAWA TIMUR - ID</h4>
          <h1 class="title">EXPLORE<br/>BEAUTIFUL<br/>WORLD WITH US</h1>
          <p class="desc">Tinggalkan kerumitan merencanakan liburan. Fokuslah pada petualangan dan biarkan kami mengurus sisanya.</p>
          <button class="btn-discover" @click="$router.push('/destinasi')">Discover Now</button>
        </div>

        <!-- 3 Kartu Kanan -->
        <div class="hero-cards">
          <div class="img-card card-1"><img src="@/assets/batu.png" alt="Card 1" /></div>
          <div class="img-card card-2"><img src="@/assets/angkut.png" alt="Card 2" /></div>
          <div class="img-card card-3"><img src="@/assets/malang.png" alt="Card 3" /></div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT (Menu & Paket) -->
    <main class="main-content">
      <!-- 8 Menu Ikon -->
      <div class="menu-grid">
        <div class="menu-item" @click="$router.push('/destinasi')">
          <div class="icon-wrap bg-blue"><img src="@/assets/explore.png" alt="Paket" /></div>
          <span>Paket Wisata</span>
        </div>
        <div class="menu-item" @click="$router.push('/topup')">
          <div class="icon-wrap bg-gold"><img src="@/assets/dashboard.png" alt="Top Up" /></div>
          <span>Top Up</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-purple">🏪</div><span>UMKM</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-green">🏔️</div><span>Wisata</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-orange">🚗</div><span>Transport</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-cyan">🏨</div><span>Hotel</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-red">🎟️</div><span>Tiket</span>
        </div>
        <div class="menu-item">
          <div class="icon-wrap bg-indigo">🤖</div><span>AI Planner</span>
        </div>
      </div>

      <!-- Promo / Paket Populer -->
      <div class="section-header">
        <h2>Promo Saat Ini</h2>
        <span class="see-all" @click="$router.push('/destinasi')">Lihat Semua</span>
      </div>

      <div class="promo-grid">
        <div class="promo-card" v-for="n in 3" :key="n" @click="$router.push('/produkdetail')">
          <div class="promo-img-wrap">
            <img :src="getAsset(n === 2 ? 'angkut.png' : 'batu.png')" class="promo-img" />
            <div class="discount-badge">20% OFF</div>
          </div>
          <div class="promo-info">
            <h3>{{ n === 2 ? 'Museum Angkut' : 'Selecta Malang' }}</h3>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  methods: {
    getAsset(name) {
      try { return require(`@/assets/${name}`); } 
      catch { return ""; }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&display=swap');

* { box-sizing: border-box; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; }
.page-wrapper { min-height: 100vh; background: #ffffff; padding-top: 70px; /* Jarak Navbar Atas */ padding-bottom: 60px; }

/* --- HERO SECTION --- */
.hero-section { position: relative; width: 100%; height: 500px; display: flex; align-items: center; overflow: hidden; margin-bottom: 40px; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(30, 41, 59, 0.95) 0%, rgba(30, 41, 59, 0.7) 50%, rgba(30, 41, 59, 0) 100%); }

.hero-container { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 40px; display: flex; justify-content: space-between; align-items: center; }

/* Teks Kiri */
.hero-text { max-width: 500px; color: #ffffff; }
.subtitle { font-size: 12px; font-weight: 700; color: #fbbf24; letter-spacing: 2px; margin-bottom: 12px; }
.title { font-size: 48px; font-weight: 900; line-height: 1.1; margin-bottom: 20px; text-shadow: 0 4px 10px rgba(0,0,0,0.3); }
.desc { font-size: 14px; font-weight: 500; line-height: 1.6; color: #e2e8f0; margin-bottom: 30px; }
.btn-discover { background: transparent; border: 2px solid #ffffff; color: #ffffff; padding: 12px 32px; border-radius: 50px; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }
.btn-discover:hover { background: #ffffff; color: #1e293b; }

/* Kartu Kanan */
.hero-cards { display: flex; gap: 16px; align-items: center; }
.img-card { width: 160px; height: 240px; border-radius: 16px; overflow: hidden; border: 4px solid rgba(255, 255, 255, 0.9); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.img-card img { width: 100%; height: 100%; object-fit: cover; }
.card-1 { transform: translateY(20px); }
.card-2 { transform: translateY(-10px); height: 260px; z-index: 2; }
.card-3 { transform: translateY(20px); }

/* --- MAIN CONTENT --- */
.main-content { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

/* Menu Grid */
.menu-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 16px; margin-bottom: 50px; }
.menu-item { display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s; }
.menu-item:hover { transform: translateY(-4px); }
.icon-wrap { width: 64px; height: 64px; border-radius: 16px; display: flex; justify-content: center; align-items: center; font-size: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.icon-wrap img { width: 32px; height: 32px; object-fit: contain; opacity: 0.7; }
.menu-item span { font-size: 13px; font-weight: 700; color: #334155; text-align: center; }

.bg-blue { background: #e0f2fe; } .bg-gold { background: #fef3c7; } .bg-purple { background: #f3e8ff; } .bg-green { background: #dcfce7; }
.bg-orange { background: #ffedd5; } .bg-cyan { background: #cffafe; } .bg-red { background: #fee2e2; } .bg-indigo { background: #e0e7ff; }

/* Promo Grid */
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.section-header h2 { font-size: 20px; font-weight: 800; color: #1e293b; }
.see-all { font-size: 14px; font-weight: 700; color: #3b82f6; cursor: pointer; }

.promo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.promo-card { background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 4px 15px rgba(0,0,0,0.03); cursor: pointer; transition: 0.3s; }
.promo-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
.promo-img-wrap { position: relative; height: 180px; }
.promo-img { width: 100%; height: 100%; object-fit: cover; }
.discount-badge { position: absolute; top: 12px; left: 12px; background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }
.promo-info { padding: 20px; text-align: center; }
.promo-info h3 { font-size: 16px; font-weight: 800; color: #1e293b; }

@media (max-width: 900px) {
  .hero-container { flex-direction: column; text-align: center; justify-content: center; gap: 40px; padding: 40px 20px; }
  .hero-overlay { background: rgba(30, 41, 59, 0.85); }
  .menu-grid { grid-template-columns: repeat(4, 1fr); }
  .promo-grid { grid-template-columns: 1fr; }
}
</style>