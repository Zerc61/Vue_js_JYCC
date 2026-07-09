<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <button class="back-btn" @click="goBack">⟵</button>
        <div class="brand">
          <img src="@/assets/scream 2.png" alt="logo" class="logo" />
          <h1 class="header-title">East Java Traveling</h1>
        </div>
        <div class="spacer"></div>
      </div>
    </header>

    <main class="container">
      <div class="main-card">
        <h2 class="title">Isi Saldo D'coin</h2>
        <p class="subtitle">Beli D'coin untuk kemudahan transaksi wisata Anda.<br/> <strong>Nilai tukar: 1 D'coin = Rp 1.000</strong></p>

        <div class="input-wrapper">
          <label class="input-label">Masukkan Nominal Rupiah</label>
          <div class="input-box" :class="{ 'has-value': rupiah > 0 }">
            <span class="currency">Rp</span>
            <input
              type="text"
              v-model="displayRupiah"
              @input="formatRupiahInput"
              placeholder="0"
              class="real-input"
            />
          </div>
          <small class="helper-text" v-if="rupiah > 0 && rupiah < 1000">Minimal pengisian Rp 1.000</small>
        </div>

        <div class="summary-section" v-if="rupiah > 0">
          <h3 class="summary-title">Rincian Top Up</h3>
          <div class="summary-list">
            <div class="summary-item">
              <span class="text-gray">Harga per D'coin</span>
              <span class="text-dark">Rp 1.000</span>
            </div>
            <div class="summary-item">
              <span class="text-gray">D'coin didapat</span>
              <span class="text-blue font-bold">{{ formatNum(dcoinFromRupiah) }} DC</span>
            </div>
            <div class="summary-item">
              <span class="text-gray">Nilai Setara Emas</span>
              <span class="text-gold font-bold">{{ formatGram(emasFromRupiah) }} gram</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-item total-row">
              <span>Total Pembayaran</span>
              <span class="text-xl">Rp {{ formatNum(rupiah) }}</span>
            </div>
          </div>
        </div>

        <button 
          class="btn-submit" 
          :disabled="!rupiah || rupiah < 1000"
          @click="goKonfirmasi"
        >
          Lanjutkan ke Pembayaran
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "IsiSaldoView",
  data() {
    return {
      rupiah: 0,
      displayRupiah: "",
      hargaEmasStatis: 1250000, 
    };
  },

  computed: {
    dcoinFromRupiah() {
      if (!this.rupiah) return 0;
      return Math.floor(this.rupiah / 1000);
    },
    emasFromRupiah() {
      if (!this.rupiah) return 0;
      return this.rupiah / this.hargaEmasStatis;
    },
  },

  methods: {
    goBack() {
      this.$router.push("/topup");
    },

    formatRupiahInput() {
      let number = this.displayRupiah.replace(/[^0-9]/g, "");
      this.rupiah = Number(number);

      if (!number) {
        this.displayRupiah = "";
        return;
      }
      this.displayRupiah = Number(number).toLocaleString("id-ID");
    },

    goKonfirmasi() {
      if (!this.rupiah || this.rupiah < 1000) return;

      this.$router.push({
        name: "Pembayaran",
        params: {
          rupiah: this.rupiah,
          displayRupiah: this.displayRupiah,
          dcoin: this.dcoinFromRupiah,
        },
      });
    },

    formatNum(num) {
      if (!num) return "0";
      return Number(num).toLocaleString("id-ID");
    },

    formatGram(value) {
      if (!value) return "0,0000";
      return value.toFixed(4).replace(".", ",");
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }

.page { 
  min-height: 100vh; 
  background: #f4f6f8; 
  color: #111827; 
  padding-bottom: 50px;
}

/* --- Header Bersih (Senada dengan Topup & Dashboard) --- */
.header { 
  background: #ffffff; 
  padding: 16px 20px; 
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 700px; /* Lebar selaras dengan container utama */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo { width: 32px; height: 32px; object-fit: contain; }
.header-title { font-size: 16px; font-weight: 700; color: #111827; }

.back-btn { 
  background: #f9fafb; 
  border: 1px solid #e5e7eb; 
  width: 36px; 
  height: 36px; 
  border-radius: 8px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  color: #111827; 
  font-size: 18px;
  font-weight: bold;
  transition: background 0.2s; 
}
.back-btn:hover { background: #f3f4f6; }
.spacer { width: 36px; }

/* --- Container --- */
.container { 
  width: 100%;
  max-width: 700px; 
  margin: 30px auto; 
  padding: 0 20px; 
}

/* --- Card Utama --- */
.main-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
}

.title { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 8px; }
.subtitle { font-size: 14px; color: #4b5563; margin-bottom: 30px; line-height: 1.5; }

/* --- Input Area --- */
.input-wrapper { margin-bottom: 30px; }
.input-label { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px; }

.input-box {
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 20px;
  height: 64px;
  transition: all 0.2s;
}
.input-box:focus-within {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}
.input-box.has-value { border-color: #2563eb; background: #ffffff; }

.currency { font-size: 20px; font-weight: 600; color: #6b7280; margin-right: 12px; }
.input-box.has-value .currency { color: #111827; }

.real-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  outline: none;
}
.real-input::placeholder { color: #9ca3af; font-weight: 500; }
.helper-text { display: block; margin-top: 6px; font-size: 12px; color: #ef4444; }

/* --- Summary / Rincian --- */
.summary-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}
.summary-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
.summary-list { display: flex; flex-direction: column; gap: 12px; }
.summary-item { display: flex; justify-content: space-between; align-items: center; font-size: 15px; }

.text-gray { color: #64748b; }
.text-dark { color: #0f172a; font-weight: 500; }
.text-blue { color: #2563eb; font-size: 16px; }
.text-gold { color: #d97706; }
.font-bold { font-weight: 700; }

.summary-divider { height: 1px; background: #e2e8f0; margin: 4px 0; }
.total-row { font-weight: 700; color: #0f172a; margin-top: 4px; }
.text-xl { font-size: 20px; color: #111827; }

/* --- Tombol Submit --- */
.btn-submit {
  width: 100%;
  background: #111827;
  color: #ffffff;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-submit:hover:not(:disabled) {
  background: #374151;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(17, 24, 39, 0.15);
}
.btn-submit:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
}
</style>