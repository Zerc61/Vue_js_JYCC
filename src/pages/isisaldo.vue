<template>
  <div class="page">
    <!-- tombol back -->
    <button class="icon-btn" @click="goBack">⟵</button>

    <div class="converter-box">
      <h2 class="title">Convert Rupiah ke D’coin</h2>
      <p class="subtitle">Masukkan nominal rupiah atau pilih jumlah D’coin</p>

      <!-- Input Rupiah (dengan format titik) -->
      <input
        type="text"
        v-model="displayRupiah"
        @input="formatRupiahInput"
        placeholder="Masukkan nominal Rupiah"
        class="input-box"
      />

      <!-- Grid Pilihan D'coin -->
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
      rupiah: "",           // nilai asli tanpa titik
      displayRupiah: "",    // tampilan dengan titik
      selected: null,
      dcoinList: [
        2500, 5000, 7500, 10000, 12500, 15000,
        17500, 20000, 22500, 25000, 27500, 30000,
        32500, 35000, 37500
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/topup");
    },

    goKonfirmasi() {
      this.$router.push("/konfirmasi");
    },

    /* === FORMAT INPUT RUPIAH === */
    formatRupiahInput() {
      // hapus titik
      let number = this.displayRupiah.replace(/\./g, "");

      // simpan nilai asli
      this.rupiah = number;

      // jika kosong, kosongkan tampilan
      if (!number) {
        this.displayRupiah = "";
        return;
      }

      // format ke 1.000.000
      this.displayRupiah = Number(number).toLocaleString("id-ID");
    },

    /* === PILIH NOMINAL D'COIN === */
    selectDcoin(value) {
      this.selected = value;

      const calculated = value * 400; // contoh konversi
      this.rupiah = calculated;
      this.displayRupiah = calculated.toLocaleString("id-ID");
    },

    submitTopup() {
      if (!this.rupiah && !this.selected) {
        alert("Isi nominal atau pilih jumlah D’coin terlebih dahulu!");
        return;
      }
      alert(`Top Up ${this.displayRupiah} berhasil diproses!`);
    },

    /* Format angka coin */
    formatCoin(value) {
      return value.toLocaleString("id-ID");
    }
  }
};
</script>


<style scoped>
/* ======== Page Layout ======== */
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background: linear-gradient(180deg, #e8f4ff, #cbe7ff);
  font-family: Inter, sans-serif;
}

/* ======== Card ======== */
.converter-box {
  width: 900px;
  padding: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 28px #00000025;
  animation: fadeIn 0.4s ease;
}

/* Title */
.title {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.subtitle {
  font-size: 15px;
  color: #475569;
  margin-bottom: 22px;
}

/* Tombol Back */
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
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  transition: 0.25s;
}
.icon-btn:hover {
  transform: scale(1.13);
}

/* ======== Input ======== */
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

/* ===== Dcoin Grid ===== */
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

/* ======== Submit Button ======== */
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

/* ====== Animation ====== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 780px) {
  .converter-box {
    width: 92%;
  }
  .dc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>