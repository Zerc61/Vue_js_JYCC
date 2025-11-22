<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap center-content">
      <div class="success-banner">
        <div class="check-icon">✓</div>
        <h2 class="success-title">Transaksi Berhasil</h2>
      </div>

      <div class="reward-box">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" 
          alt="Coins" 
          class="coin-icon" 
        />
        <h3 class="coin-amount">+ {{ dcoin }} D'coins</h3>
      </div>

      <div class="rincian-box">
        <h3 class="box-title">Rincian Transaksi</h3>

        <div class="row">
          <span>Total Emas</span>
          <span>{{ totalEmas }} Gram</span>
        </div>

        <div class="row">
          <span>Metode Pembayaran</span>
          <span>{{ metode }}</span>
        </div>

        <div class="row">
          <span>Harga Dasar</span>
          <span>Rp {{ rupiahFormatted }}</span>
        </div>

        <div class="row">
          <span class="text-muted">PPN (12%)</span>
          <span>Rp {{ ppnFormatted }}</span>
        </div>

        <div class="row">
          <span class="text-muted">Biaya Admin</span>
          <span>Rp {{ adminFormatted }}</span>
        </div>

        <hr class="line" />

        <div class="row total">
          <span>Total Dibayar</span>
          <span>Rp {{ totalFormatted }}</span>
        </div>
      </div>

      <div class="footer-actions">
        <button class="btn btn-primary" @click="$router.push('/topup')">
          Cek Saldo D'coin
        </button>
        <button class="btn btn-secondary" @click="$router.push('/dashboard')">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransaksiBerhasil",

  data() {
    return {
      biayaAdmin: 5000 // Fixed admin fee
    };
  },

  computed: {
    // Get params passed from Payment Page
    dcoin() {
      return Number(this.$route.params.dcoin || 0);
    },
    rupiah() {
      return Number(this.$route.params.rupiah || 0);
    },
    metode() {
      return this.$route.params.metode || "QRIS";
    },

    // formatting
    rupiahFormatted() {
      return this.rupiah.toLocaleString("id-ID");
    },

    // Calculations
    ppn() {
      return Math.round(this.rupiah * 0.12);
    },
    ppnFormatted() {
      return this.ppn.toLocaleString("id-ID");
    },

    adminFormatted() {
      return this.biayaAdmin.toLocaleString("id-ID");
    },

    totalKeseluruhan() {
      return this.rupiah + this.ppn + this.biayaAdmin;
    },
    totalFormatted() {
      return this.totalKeseluruhan.toLocaleString("id-ID");
    },

    totalEmas() {
      // Logic: 5000 DC = 0.1 Gram
      return ((this.dcoin / 5000) * 0.1).toFixed(2);
    }
  }
};
</script>

<style scoped>
/* --- Layout Main --- */
.pay-page {
  background: #f3f4f6;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

/* --- Header --- */
.head {
  background: #180c4a;
  color: white;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo { width: 45px; }
.title { font-size: 20px; font-weight: 600; }

/* --- Wrap --- */
.wrap {
  background: #fff;
  max-width: 500px;
  margin: 25px auto;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* --- Success Banner --- */
.success-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.check-icon {
  width: 60px;
  height: 60px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);
}
.success-title {
  font-size: 22px;
  font-weight: 700;
  color: #180c4a;
  margin: 0;
}

/* --- Reward Box --- */
.reward-box {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  padding: 15px 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}
.coin-icon { width: 30px; }
.coin-amount {
  font-size: 20px;
  font-weight: 700;
  color: #b45309;
  margin: 0;
}

/* --- Rincian Box --- */
.rincian-box {
  width: 100%;
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #eee;
}
.box-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  text-align: left;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}
.text-muted { opacity: 0.7; }
.line {
  margin: 15px 0;
  border: 0;
  border-top: 1px dashed #ccc;
}
.total {
  font-size: 18px;
  font-weight: 700;
  color: #180c4a;
}

/* --- Buttons --- */
.footer-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s;
}
.btn-primary {
  background: #180c4a;
  color: white;
  box-shadow: 0 4px 12px rgba(24, 12, 74, 0.2);
}
.btn-primary:hover { background: #2a1675; }

.btn-secondary {
  background: white;
  border: 2px solid #180c4a;
  color: #180c4a;
}
.btn-secondary:hover { background: #f0f0f0; }
</style>