<template>
  <div class="wallet-page">

    <!-- tombol back -->
    <header class="topbar">
      <button class="icon-btn" @click="goBack">⟵</button>
    </header>

    <!-- 🔥 HEADER BARU -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <!-- main content container -->
    <main class="container">
      <section class="wallet-card">
        <div class="wallet-head">
          <div class="wallet-title">
            <h2>Dompet Digital Kamu <span class="spark">✨</span></h2>
            <p class="subtitle">Konversi uang kamu ke emas, dapatkan D'coin untuk transaksi halal.</p>
          </div>
          <div class="wallet-actions">
            <button class="btn-ghost" @click="showHistory">Riwayat</button>
          </div>
        </div>

        <div class="balance-area">
          <div class="balance-left">
            <div class="balance-label">Saldo D'coin</div>
            <div class="balance-value">100.000 <span class="dc">DC</span></div>
            <div class="balance-small">Rp. 100.000.000 (setara 4,52 gr emas)</div>
          </div>

          <div class="balance-cta">
            <button class="btn-primary" @click="topUp">Isi Saldo</button>
          </div>
        </div>

        <div class="wallet-actions-row">
          <button class="small-card" @click="monthlyTrans">
            <div class="card-title">Transaksi Bulan Ini</div>
            <div class="card-sub">Rp 2.500.000</div>
          </button>

          <button class="small-card" @click="coinsCashback">
            <div class="card-title">Harga Emas</div>
            <div class="card-sub">+5.000 DC</div>
          </button>

          <button class="small-card" @click="sendTransfer">
            <div class="card-title">Kirim / Terima</div>
            <div class="card-sub">Transfer Instan</div>
          </button>
        </div>
      </section>

      <!-- info / promo area -->
      <section class="info-section">
        <h3>Penawaran & Info</h3>
        <div class="info-grid">
          <article class="info-card">
            <h4>Promosi Menarik</h4>
            <p>Dapatkan 10% cashback untuk top up minimal Rp50.000.</p>
          </article>
          <article class="info-card">
            <h4>Keamanan</h4>
            <p>Transaksi dilindungi OTP & enkripsi end-to-end.</p>
          </article>
        </div>
      </section>
    </main>

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
  name: "topupView",
  data() {
    return {  
    query: "",
  bottomNav: [
        {
          label: "Home",
          image: require("@/assets/dashboard.png"),
          route: "/dashboard",
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
  methods: {
    topUp() { this.$router.push("/isisaldo"); },
    convertGold() { this.$router.push("/convert-gold"); },
    monthlyTrans() { alert("Detail transaksi bulanan"); },
    coinsCashback() { alert("Harga Emas/Gram: 5.000 DC"); },
    sendTransfer() { this.$router.push("/transfer"); },
    showHistory() { this.$router.push("/history"); },
  }
};
</script>

<style scoped>

/* --- Header --- */
.header {
  background: #180c4a;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  top: -56px;
}

.logo {
  width: 45px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}

/* --- PAGE --- */
.wallet-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f7fbff 0%, #f0f7ff 40%, #eaf6ff 100%);
  color: #0f172a;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* --- TOPBAR BUTTON --- */
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
}

/* --- CONTAINER --- */
.container {
  width: 100%;
  max-width: 920px;
  margin: 12px auto;
  padding: 0 16px 80px;
  box-sizing: border-box;
}

/* --- WALLET CARD --- */
.wallet-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fdff 100%);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 12px 30px rgba(2,6,23,0.08);
  overflow: hidden;
}

/* --- TITLE INSIDE CARD --- */
.wallet-head {
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
  margin-bottom: 8px;
}
.wallet-title h2 {
  margin:0;
  font-size:20px;
}
.wallet-title .subtitle {
  margin-top:6px;
  color:#475569;
  font-size:13px;
}

/* --- BALANCE AREA --- */
.balance-area {
  display:flex;
  gap:16px;
  align-items:center;
  justify-content:space-between;
  margin-top:12px;
  flex-wrap:wrap;
}
.balance-left {
  min-width: 220px;
}
.balance-label { color:#64748b; font-size:13px; margin-bottom:6px; }
.balance-value { font-size:28px; font-weight:800; color:#0f172a; display:flex; align-items:baseline; gap:8px; }
.balance-value .dc { font-size:14px; font-weight:700; color:#2563eb; }
.balance-small { color:#94a3b8; font-size:12px; margin-top:6px; }

/* --- BUTTONS --- */
.balance-cta { display:flex; gap:10px; align-items:center; }
.btn-primary {
  background: linear-gradient(180deg,#1e40af,#2563eb);
  color:white;
  border:none;
  padding:10px 14px;
  border-radius:12px;
  font-weight:700;
  cursor:pointer;
  box-shadow: 0 8px 20px rgba(37,99,235,0.18);
}
.btn-ghost {
  background: transparent;
  color:#0f172a;
  border:1px solid rgba(15,23,42,0.06);
  padding:10px 12px;
  border-radius:12px;
  cursor:pointer;
}

/* --- SMALL ACTION CARDS --- */
.wallet-actions-row {
  display:flex;
  gap:10px;
  margin-top:16px;
  flex-wrap:wrap;
}
.small-card {
  flex:1 1 30%;
  min-width:140px;
  background:#fff;
  padding:12px;
  border-radius:12px;
  border:1px solid rgba(2,6,23,0.04);
  box-shadow: 0 8px 18px rgba(2,6,23,0.04);
  cursor:pointer;
  text-align:left;
}
.small-card .card-title { font-weight:700; color:#0f172a; }
.small-card .card-sub { color:#475569; margin-top:6px; font-size:13px; }

/* --- INFO SECTION --- */
.info-section { margin-top:18px; }
.info-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:12px; margin-top:8px; }
.info-card { background:#fff; padding:12px; border-radius:12px; box-shadow:0 8px 18px rgba(2,6,23,0.04); }

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

/* --- RESPONSIVE --- */
@media (max-width: 720px) {
  .info-grid { grid-template-columns: repeat(1,1fr); }
  .wallet-head { flex-direction:column; align-items:flex-start; gap:8px; }
  .balance-area { flex-direction:column; align-items:flex-start; gap:12px; }
  .bottom-nav { width: calc(100% - 24px); left: 12px; transform:none; }
}
</style>
