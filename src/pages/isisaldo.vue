<template>
  <div class="page">
    <!-- tombol back -->
    <button class="icon-btn" @click="goBack">⟵</button>

    <div class="converter-box">
      <h2 class="title">Convert Rupiah ke D’coin</h2>
      <p class="subtitle">Masukkan nominal Rupiah atau pilih jumlah D’coin</p>

      <!-- Input Rupiah -->
      <input
        type="text"
        v-model="displayRupiah"
        @input="formatRupiahInput"
        placeholder="Masukkan nominal Rupiah"
        class="input-box"
      />

      <!-- GRID DCOIN -->
      <div class="dc-grid">
        <div
          v-for="item in dcoinList"
          :key="item"
          class="dc-item"
          @click="selectDcoin(item)"
          :class="{ active: selected === item }"
        >
          {{ formatCoin(item) }} D’coin
        </div>
      </div>

      <!-- RINCIAN EMAS (Ditingkatkan untuk lebih estetik dan menarik) -->
      <div class="detail-box" v-if="rupiah || selected">
        <h3 class="detail-title">📊 Rincian Konversi</h3>
        
        <div class="detail-item">
          <span class="detail-icon">💰</span>
          <div class="detail-content">
            <strong>Harga Emas per Gram:</strong> Rp {{ formatNum(hargaEmas) }}
          </div>
        </div>
        
        <div class="detail-item" v-if="rupiah">
          <span class="detail-icon">🔄</span>
          <div class="detail-content">
            <strong>Rupiah → Emas:</strong> {{ formatNum(rupiah) }} = <span class="highlight">{{ emasFromRupiah.toFixed(4) }} gram</span>
          </div>
        </div>
        
        <div class="detail-item" v-if="selected">
          <span class="detail-icon">🪙</span>
          <div class="detail-content">
            <strong>D’coin → Rupiah:</strong> {{ formatNum(selected) }} D’coin = <span class="highlight">Rp {{ formatNum(rupiah) }}</span>
          </div>
        </div>
        
        <div class="detail-item" v-if="selected">
          <span class="detail-icon">🏆</span>
          <div class="detail-content">
            <strong>D’coin → Emas:</strong> {{ formatNum(selected) }} D’coin = <span class="highlight">{{ emasFromDcoin.toFixed(4) }} gram</span>
          </div>
        </div>
      </div>

      <!-- Tombol Lanjutkan -->
      <button class="btn-next" @click="goKonfirmasi">
        Lanjutkan ➜
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "IsiSaldoView",

  data() {
    return {
      rupiah: "",
      displayRupiah: "",
      selected: null,

      // Harga emas default
      hargaEmas: 1200000,

      dcoinList: [
        2500, 5000, 7500, 10000, 12500, 15000,
        17500, 20000, 22500, 25000, 27500, 30000,
        32500, 35000, 37500
      ]
    };
  },

  computed: {
    emasFromRupiah() {
      if (!this.rupiah) return 0;
      return this.rupiah / this.hargaEmas;
    },
    emasFromDcoin() {
      if (!this.selected) return 0;
      return this.rupiah / this.hargaEmas;
    }
  },

  methods: {
    goBack() {
      this.$router.push("/topup");
    },

    goKonfirmasi() {
      if (!this.rupiah && !this.selected) {
        alert("Isi nominal atau pilih jumlah D’coin terlebih dahulu!");
        return;
      }

      this.$router.push({
        name: "Konfirmasi",
        params: {
          rupiah: this.rupiah,
          displayRupiah: this.displayRupiah,
          dcoin: this.selected
        }
      });
    },

    formatRupiahInput() {
      let number = this.displayRupiah.replace(/\./g, "");

      this.rupiah = Number(number);

      if (!number) {
        this.displayRupiah = "";
        return;
      }

      this.displayRupiah = Number(number).toLocaleString("id-ID");
      this.selected = null; // reset pilihan dcoin
    },

    selectDcoin(value) {
      this.selected = value;
      const calculated = value * 400; // 1 Dcoin = 400 Rupiah (contoh)

      this.rupiah = calculated;
      this.displayRupiah = calculated.toLocaleString("id-ID");
    },

    formatCoin(value) {
      return value.toLocaleString("id-ID");
    },

    formatNum(num) {
      return Number(num).toLocaleString("id-ID");
    }
  }
};
</script>

<style scoped>
.page { min-height: 100vh; display: flex; justify-content: center; padding-top: 40px; background: linear-gradient(180deg, #e8f4ff, #cbe7ff); font-family: Inter, sans-serif; }
.converter-box { width: 900px; padding: 32px; background: white; border-radius: 22px; box-shadow: 0 5px 28px #00000025; animation: fadeIn 0.4s ease; }
.title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0; }
.subtitle { font-size: 15px; color: #475569; margin-bottom: 22px; }
.icon-btn { position: absolute; top: 22px; left: 22px; background: white; border: none; width: 42px; height: 42px; border-radius: 11px; font-size: 20px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(0,0,0,0.08); transition: 0.25s; }
.icon-btn:hover { transform: scale(1.13); }
.input-box { width: 97%; height: 72px; border-radius: 16px; border: none; padding-left: 22px; font-size: 22px; background: linear-gradient(135deg, #d9e7ff, #ffffff); box-shadow: 0 3px 12px #00000025; margin-bottom: 28px; outline: none; }
.dc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 18px; }
.dc-item { background: white; padding: 22px 0; text-align: center; border-radius: 15px; font-size: 22px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px #00000020; transition: 0.25s; }
.dc-item:hover { transform: scale(1.08); }
.dc-item.active { border: 3px solid #1976ff; box-shadow: 0 0 13px #1976ff; }

/* Gaya untuk bagian rincian yang ditingkatkan */
.detail-box { 
  margin-top: 30px; 
  padding: 24px; 
  background: linear-gradient(135deg, #f1f5ff, #e0e7ff); 
  border-radius: 18px; 
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); 
  animation: slideIn 0.5s ease-out; 
  border: 1px solid #d1d5db; 
}
.detail-title { 
  font-size: 24px; 
  font-weight: 700; 
  color: #1e293b; 
  margin-bottom: 20px; 
  text-align: center; 
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); 
}
.detail-item { 
  display: flex; 
  align-items: center; 
  margin-bottom: 16px; 
  padding: 12px 16px; 
  background: rgba(255, 255, 255, 0.8); 
  border-radius: 12px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}
.detail-item:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}
.detail-icon { 
  font-size: 28px; 
  margin-right: 16px; 
  flex-shrink: 0; 
}
.detail-content { 
  font-size: 16px; 
  color: #374151; 
  line-height: 1.5; 
}
.highlight { 
  color: #2563eb; 
  font-weight: 700; 
  font-size: 18px; 
}

.btn-next { width: 100%; height: 55px; margin-top: 40px; font-size: 22px; border-radius: 14px; font-weight: 700; border: none; cursor: pointer; background: linear-gradient(90deg, #1e40af, #2563eb); color: white; box-shadow: 0 5px 18px #2563eb60; transition: 0.3s; }
.btn-next:hover { transform: translateY(-3px); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
</style>