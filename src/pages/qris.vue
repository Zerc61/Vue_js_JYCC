<template>
  <div class="combined-page">
    <!-- Header -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <!-- Wrap Versi QRIS dengan Rincian Digabung -->
    <div class="wrap center-content">
      <h2 class="section-title">Scan QRIS</h2>
      <p class="sub">Silakan scan QR Code di bawah ini</p>

      <!-- Rincian Digabung di Bawah Section Title -->
      <div class="rincian-box">
        <h2 class="rincian-title">Rincian</h2>

        <div class="row">
          <span>Total Emas</span>
          <span>{{ totalEmas }} Gram</span>
        </div>
        <div class="row">
          <span>Total Harga</span>
          <span>{{ formattedRupiah }}</span>
        </div>
        <div class="row">
          <span class="ppn">PPN (12%)</span>
          <span>{{ formattedPPN }}</span>
        </div>
        <div class="row">
          <span>Biaya Admin</span>
          <span>{{ formattedBiayaAdmin }}</span>
        </div>

        <hr class="line" />

        <div class="row total">
          <strong>Total Keseluruhan</strong>
          <strong>{{ formattedTotal }}</strong>
        </div>
      </div>

      <div class="qr-container">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
          alt="QR Code" 
          class="qr-image" 
        />
      </div>

      <div class="payment-details">
        <p class="label">Total Pembayaran</p>
        <h3 class="price">Rp {{ formattedTotal }}</h3>
      </div>

      <div class="timer-box">
        <p>Selesaikan pembayaran dalam:</p>
        <span class="countdown">{{ timerDisplay }}</span>
      </div>

      <div class="instructions">
        <ol>
          <li>Buka aplikasi e-wallet atau banking Anda.</li>
          <li>Scan QR Code di atas.</li>
          <li>Periksa nama merchant <b>Scream Destination</b>.</li>
          <li>Selesaikan pembayaran.</li>
        </ol>
      </div>

      <div class="footer-actions">
        <button class="btn btn-check" @click="cekStatus">
          Cek Status Pembayaran
        </button>
        <button class="btn btn-cancel" @click="$router.go(-1)">
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinedDetailQrisPage",
  props: {
    rupiah: { type: [Number, String], default: 0 },
    displayRupiah: { type: String, default: "0" },
    dcoin: { type: Number, default: 0 }
  },
  data() {
    return {
      totalEmas: 0,
      biayaAdmin: 5000, // Biaya admin tetap, bisa disesuaikan
      timeLeft: 900, // 15 menit dalam detik (15 * 60) untuk QRIS
      timerInterval: null
    };
  },
  computed: {
    ppn() {
      return Math.round(Number(this.rupiah) * 0.12); // PPN 12%
    },
    totalKeseluruhan() {
      return Number(this.rupiah) + this.ppn + this.biayaAdmin;
    },
    formattedRupiah() {
      return "Rp " + Number(this.rupiah).toLocaleString("id-ID");
    },
    formattedPPN() {
      return "Rp " + Number(this.ppn).toLocaleString("id-ID");
    },
    formattedBiayaAdmin() {
      return "Rp " + this.biayaAdmin.toLocaleString("id-ID");
    },
    formattedTotal() {
      return this.totalKeseluruhan.toLocaleString("id-ID");
    },
    timerDisplay() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.totalEmas = ((this.dcoin / 5000) * 0.1).toFixed(2);
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
  methods: {
    konfirmasiTopup() {
      alert(`Top Up ${this.formattedRupiah} Lanjut ke Pembayaran!`);
      // Scroll ke bagian pembayaran atau langsung proses
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timerInterval);
          alert("Waktu pembayaran habis!");
          this.$router.push("/"); // Kembali ke home jika habis
        }
      }, 1000);
    },
    cekStatus() {
      const isSuccess = confirm("Simulasi: Apakah pembayaran sudah masuk?");
      if (isSuccess) {
        alert("Pembayaran Berhasil!");
        this.$router.push({
          name: "TransaksiBerhasil",
          params: {
            dcoin: this.dcoin.toString(),
            rupiah: this.rupiah.toString(),
            metode: "QRIS"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
/* --- Layout Utama Gabungan --- */
.combined-page {
  background: #f3f4f6;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  padding: 20px;
}

/* --- Header --- */
.header {
  background: #180c4a;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.logo {
  width: 45px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}

/* --- Wrap Versi QRIS --- */
.wrap {
  background: #fff;
  max-width: 500px; /* Sedikit lebih kecil agar fokus ke QR */
  margin: 0 auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center; /* Center semua isi */
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.sub {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

/* --- Rincian Box (Digabung ke Wrap) --- */
.rincian-box {
  margin-bottom: 20px;
  width: 100%;
}
.rincian-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
}
.ppn {
  font-size: small;
  opacity: 60%;
}
.line {
  margin: 10px 0;
  border: 0.7px solid #222;
}
.total {
  font-size: 18px;
  font-weight: 600;
}

/* --- QR Container --- */
.qr-container {
  border: 2px dashed #180c4a;
  padding: 15px;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 20px;
}

.qr-image {
  width: 200px;
  height: 200px;
  display: block;
}

/* --- Payment Details --- */
.payment-details {
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  color: #777;
}

.price {
  font-size: 24px;
  color: #180c4a;
  font-weight: 800;
  margin: 5px 0;
}

/* --- Timer Box --- */
.timer-box {
  background: #fff3cd;
  color: #856404;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
}

.countdown {
  font-weight: 700;
  font-size: 18px;
}

/* --- Instructions --- */
.instructions {
  text-align: left;
  font-size: 13px;
  color: #555;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 25px;
}

.instructions ol {
  padding-left: 20px;
  margin: 0;
}

.instructions li {
  margin-bottom: 5px;
}

/* --- Footer Actions --- */
.footer-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-check {
  background: #180c4a;
  color: white;
}

.btn-check:hover {
  background: #261475;
}

.btn-cancel {
  background: white;
  border: 1px solid #ccc;
  color: #555;
}

.btn-cancel:hover {
  background: #f0f0f0;
}
</style>