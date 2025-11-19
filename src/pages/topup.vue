<template>
  <div class="wallet-page">
    <!-- top bar -->
    <header class="topbar">
      <button class="icon-btn" @click="goRegister">⟵</button>
    </header>

    <!-- main content container -->
    <main class="container">
      <section class="wallet-card">
        <div class="wallet-head">
          <div class="wallet-title">
            <h2>Dompet Digital Kamu <span class="spark">✨</span></h2>
            <p class="subtitle">Konversi uang kamu ke emas, dapatkan D'coin untuk transaksi halal.</p>
          </div>
          <div class="wallet-actions">
            <button class="btn-outline" @click="showHistory">Riwayat</button>
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
            <button class="btn-ghost" @click="convertGold">Tukar Emas</button>
          </div>
        </div>

        <div class="wallet-actions-row">
          <button class="small-card" @click="monthlyTrans">
            <div class="card-title">Transaksi Bulan Ini</div>
            <div class="card-sub">Rp 2.500.000</div>
          </button>

          <button class="small-card" @click="coinsCashback">
            <div class="card-title">Bonus Cashback</div>
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

    <!-- bottom nav -->
    <nav class="bottom-nav">
      <button class="nav-item" @click="goHome">🏠<span>Home</span></button>
      <button class="nav-item" @click="goExplore">📍<span>Explore</span></button>
      <button class="nav-item active" @click="goWallet">💰<span>Dompet</span></button>
      <button class="nav-item" @click="goOrders">🧾<span>Pesanan</span></button>
      <button class="nav-item" @click="goProfile">👤<span>Akun</span></button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "topupView",
  methods: {
    goBack() {
      // contoh: router back jika pakai vue-router
      if (this.$router) this.$router.push("/dashboard");
      else alert("Back");
    },
    topUp() {
      // contoh redirect ke halaman topup
      if (this.$router) this.$router.push("/isisaldo");
      else alert("Top Up clicked");
    },
    convertGold() {
      if (this.$router) this.$router.push("/convert-gold");
      else alert("Tukar Emas clicked");
    },
    monthlyTrans() {
      alert("Detail transaksi bulanan");
    },
    coinsCashback() {
      alert("Bonus cashback: 5.000 DC");
    },
    sendTransfer() {
      if (this.$router) this.$router.push("/transfer");
      else alert("Transfer");
    },
    showHistory() {
      if (this.$router) this.$router.push("/history");
      else alert("Riwayat");
    },
    goHome(){ if(this.$router) this.$router.push("/dashboard"); },
    goExplore(){ if(this.$router) this.$router.push("/explore"); },
    goWallet(){ if(this.$router) this.$router.push("/wallet"); },
    goOrders(){ if(this.$router) this.$router.push("/orders"); },
    goProfile(){ if(this.$router) this.$router.push("/profile"); }
  }
};
</script>

<style scoped>


/* page */
.wallet-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f7fbff 0%, #f0f7ff 40%, #eaf6ff 100%);
  color: #0f172a;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* topbar */
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.icon-btn {
  background: rgba(255,255,255,0.6);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(2,6,23,0.06);
}

/* container */
.container {
  width: 100%;
  max-width: 920px;
  margin: 12px auto;
  padding: 0 16px 80px; /* bottom padding for nav */
  box-sizing: border-box;
}

/* wallet card */
.wallet-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fdff 100%);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 12px 30px rgba(2,6,23,0.08);
  overflow: hidden;
}

/* header inside card */
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

/* balance area */
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

/* CTA buttons */
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

/* small cards row */
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

/* info area */
.info-section { margin-top:18px; }
.info-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:12px; margin-top:8px; }
.info-card { background:#fff; padding:12px; border-radius:12px; box-shadow:0 8px 18px rgba(2,6,23,0.04); }

/* bottom navigation */
.bottom-nav {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 14px;
  width: calc(100% - 40px);
  max-width: 920px;
  background: #ffffff;
  border-radius: 18px;
  padding: 8px 10px;
  display:flex;
  justify-content:space-around;
  box-shadow: 0 12px 28px rgba(2,6,23,0.12);
  z-index: 40;
}
.nav-item {
  background: transparent;
  border: none;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:4px;
  font-size:13px;
  cursor:pointer;
}
.nav-item span { font-size:18px; }
.nav-item.active { color:#2563eb; font-weight:700; }

/* responsive */
@media (max-width: 720px) {
  .info-grid { grid-template-columns: repeat(1,1fr); }
  .wallet-head { flex-direction:column; align-items:flex-start; gap:8px; }
  .balance-area { flex-direction:column; align-items:flex-start; gap:12px; }
  .bottom-nav { width: calc(100% - 24px); left: 12px; transform:none; }
}
</style>
