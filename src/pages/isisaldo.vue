<template>
  <div class="page">
    <button class="icon-btn" @click="goBack">⟵</button>

    <div class="converter-box">
      <h2 class="title">Convert Rupiah ke D’coin</h2>
      <p class="subtitle">Masukkan nominal Rupiah atau pilih jumlah D’coin</p>

      <div class="price-banner">
        <div class="price-row">
          <div>
            <p class="price-label">Harga Ask per Gram</p>
            <p class="price-value">
              <span v-if="loadingHarga">Memuat harga emas…</span>
              <span v-else-if="errorHarga">{{ errorHarga }}</span>
              <span v-else-if="hargaEmas">Rp {{ formatNum(hargaEmas) }}</span>
              <span v-else>Tidak tersedia</span>
            </p>
          </div>

          <div>
            <p class="price-label">Harga Bid per Gram</p>
            <p class="price-value">
              <span v-if="loadingHarga">Memuat harga emas…</span>
              <span v-else-if="errorHarga">-</span>
              <span v-else-if="hargaEmasBid">Rp {{ formatNum(hargaEmasBid) }}</span>
              <span v-else>-</span>
            </p>
          </div>

          <div class="price-actions">
            <button class="refresh-btn" @click="fetchHargaEmas" :disabled="loadingHarga">
              {{ loadingHarga ? "Menyegarkan…" : "Perbarui harga" }}
            </button>
            <small v-if="hargaUpdate" class="update-time">
              Terakhir diperbarui: {{ hargaUpdate }}
            </small>
          </div>
        </div>
      </div>

      <!-- Rincian konversi -->
      <transition name="slide-fade">
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
              <strong>Rupiah → Emas:</strong>
              {{ formatNum(rupiah) }} =
              <span class="highlight">{{ formatGram(emasFromRupiah) }} gram</span>
            </div>
          </div>

          <div class="detail-item" v-if="selected">
            <span class="detail-icon">🪙</span>
            <div class="detail-content">
              <strong>D’coin → Rupiah:</strong>
              {{ formatNum(selected) }} D’coin =
              <span class="highlight">Rp {{ formatNum(rupiah) }}</span>
            </div>
          </div>

          <div class="detail-item" v-if="selected">
            <span class="detail-icon">🏆</span>
            <div class="detail-content">
              <strong>D’coin → Emas:</strong>
              1 D’coin = 0,0002 gram
            </div>
          </div>
        </div>
      </transition>

      <!-- Input Rupiah -->
      <input
        type="text"
        v-model="displayRupiah"
        @input="formatRupiahInput"
        placeholder="Masukkan nominal Rupiah"
        class="input-box"
      />

      <!-- Pilihan D’coin -->
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

      <button class="btn-next" @click="goKonfirmasi">Lanjutkan ➜</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IsiSaldoView",
  data() {
    return {
      rupiah: "",
      displayRupiah: "",
      selected: null,
      hargaEmas: null,
      hargaEmasBid: null,
      hargaUpdate: null,
      loadingHarga: false,
      errorHarga: null,
      dcoinList: [
        2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000,
        27500, 30000, 32500, 35000, 37500,
      ],
    };
  },

  computed: {
    emasFromRupiah() {
      if (!this.rupiah || !this.hargaEmas) return 0;
      return this.rupiah / this.hargaEmas;
    },

    emasFromDcoin() {
      if (!this.selected) return 0;
      const gramPer2500 = 0.5;
      return (this.selected / 2500) * gramPer2500;
    },
  },

  created() {
    this.fetchHargaEmas();
  },

  methods: {
    formatTo24Hour(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    async fetchHargaEmas() {
      this.loadingHarga = true;
      this.errorHarga = null;

      try {
        const { data } = await axios.get("http://localhost:3000/api/harga-emas");

        const gold = data?.GSPPJ?.Gold?.IDR;
        if (!gold || !gold.ask || !gold.bid) {
          throw new Error("Data harga emas tidak lengkap");
        }

        const ounceToGram = 25;
        const askPerGram = Number(gold.ask) / ounceToGram;
        const bidPerGram = Number(gold.bid) / ounceToGram;

        this.hargaEmas = Math.round(askPerGram);
        this.hargaEmasBid = Math.round(bidPerGram);
        this.hargaUpdate = this.formatTo24Hour(new Date());
      } catch (error) {
        this.errorHarga = "Tidak bisa memuat harga emas terbaru. Silakan coba lagi.";
      } finally {
        this.loadingHarga = false;
      }
    },

    formatRupiahInput() {
      let number = this.displayRupiah.replace(/\./g, "");
      this.rupiah = Number(number);

      if (!number) {
        this.displayRupiah = "";
        return;
      }

      this.displayRupiah = Number(number).toLocaleString("id-ID");
      this.selected = null;
    },

    selectDcoin(value) {
      this.selected = value;
      const gram = (value / 2500) * 0.5;
      const calculated = gram * this.hargaEmas;
      this.rupiah = Math.round(calculated);
      this.displayRupiah = this.rupiah.toLocaleString("id-ID");
    },

    goKonfirmasi() {
      if (!this.rupiah && !this.selected) {
        alert("Isi nominal atau pilih jumlah D’coin terlebih dahulu!");
        return;
      }

      this.$router.push({
        name: "Pembayaran",
        params: {
          rupiah: this.rupiah,
          displayRupiah: this.displayRupiah,
          dcoin: this.selected,
        },
      });
    },

    formatCoin(value) {
      return value.toLocaleString("id-ID");
    },

    formatNum(num) {
      if (num === null || num === undefined || Number.isNaN(num)) return "-";
      return Number(num).toLocaleString("id-ID");
    },

    // ✅ FIX: Format gram dengan koma, bukan titik
    formatGram(value) {
      if (!value) return "0,0000";
      return value.toFixed(4).replace(".", ",");
    },
  },
};
</script>

<style scoped>
/* Semua style dari versi sebelumnya tetap sama */
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background: linear-gradient(180deg, #e8f4ff, #cbe7ff);
  font-family: Inter, sans-serif;
}
.converter-box {
  width: 900px;
  padding: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 28px #00000025;
  animation: fadeIn 0.4s ease;
}
.title {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.subtitle {
  font-size: 15px;
  color: #475569;
  margin-bottom: 10px;
}
.price-banner {
  margin-top: 18px;
  margin-bottom: 20px;
  padding: 18px 22px;
  border-radius: 18px;
  background: linear-gradient(120deg, #fff7e6, #ffe4ba);
  box-shadow: 0 4px 15px rgba(255, 149, 0, 0.18);
}
.price-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
.price-label {
  font-size: 14px;
  font-weight: 600;
  color: #b45309;
  margin: 0;
}
.price-value {
  font-size: 20px;
  font-weight: 700;
  color: #92400e;
  margin: 4px 0 0;
}
.price-actions {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.refresh-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 999px;
  background: #f97316;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.refresh-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.refresh-btn:not(:disabled):hover {
  transform: translateY(-1px);
}
.update-time {
  font-size: 12px;
  color: #78350f;
}
.icon-btn {
  position: absolute;
  top: 22px;
  left: 22px;
  background: white;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transition: 0.25s;
}
.icon-btn:hover {
  transform: scale(1.13);
}
.input-box {
  width: 97%;
  height: 72px;
  border-radius: 16px;
  border: none;
  padding-left: 22px;
  font-size: 22px;
  background: linear-gradient(135deg, #d9e7ff, #ffffff);
  box-shadow: 0 3px 12px #00000025;
  margin-bottom: 28px;
  outline: none;
}
.dc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 18px;
}
.dc-item {
  background: white;
  padding: 22px 0;
  text-align: center;
  border-radius: 15px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px #00000020;
  transition: 0.25s;
}
.dc-item:hover {
  transform: scale(1.08);
}
.dc-item.active {
  border: 3px solid #1976ff;
  box-shadow: 0 0 13px #1976ff;
}
.detail-box {
  margin-bottom: 25px;
  margin-top: 10px;
  padding: 24px;
  background: linear-gradient(135deg, #f1f5ff, #e0e7ff);
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #d1d5db;
}
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
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
.btn-next {
  width: 100%;
  height: 55px;
  margin-top: 40px;
  font-size: 22px;
  border-radius: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: linear-gradient(90deg, #1e40af, #2563eb);
  color: white;
  box-shadow: 0 5px 18px #2563eb60;
  transition: 0.3s;
}
.btn-next:hover {
  transform: translateY(-3px);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>