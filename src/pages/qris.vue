<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap center-content">
      <h2 class="section-title">Scan QRIS</h2>
      <p class="sub">Silakan scan QR Code di bawah ini</p>

      <div class="rincian-box">
        <h2 class="rincian-title">Rincian</h2>

        <div class="row">
          <span>Total Emas</span>
          <span>{{ totalEmas }} Gram</span>
        </div>
        <div class="row">
          <span>Harga Emas</span>
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
        <h3 class="price">{{ formattedTotal }}</h3>
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
  name: "QrisPage",
  props: {
    rupiah: { type: [Number, String], default: 0 },
    displayRupiah: { type: String, default: "0" },
    dcoin: { type: Number, default: 0 }
  },
  data() {
    return {
      biayaAdmin: 5000, // Fixed Admin Fee
      timeLeft: 900, // 15 minutes in seconds
      timerInterval: null
    };
  },
  computed: {
    // Calculations
    totalEmas() {
      return ((Number(this.dcoin) / 5000) * 0.1).toFixed(2);
    },
    ppn() {
      return Math.round(Number(this.rupiah) * 0.12); // 12% Tax
    },
    totalKeseluruhan() {
      return Number(this.rupiah) + this.ppn + this.biayaAdmin;
    },
    
    // Formatters
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
      return "Rp " + this.totalKeseluruhan.toLocaleString("id-ID");
    },
    
    // Timer Logic
    timerDisplay() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timerInterval);
          alert("Waktu pembayaran habis!");
          this.$router.push("/"); // Redirect home on timeout
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
            rupiah: this.totalKeseluruhan.toString(),
            metode: "QRIS"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
/* --- Layout Utama --- */
.pay-page {
  background: #f3f4f6;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.head {
  background: #180c4a;
  color: white;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 45px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

/* --- Wrap Content --- */
.wrap {
  background: #fff;
  max-width: 500px;
  margin: 25px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
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

/* --- Rincian Box --- */
.rincian-box {
  margin-bottom: 20px;
  width: 100%;
}
.rincian-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #555;
  text-align: left;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 14px;
}
.ppn {
  font-size: 13px;
  opacity: 70%;
}
.line {
  margin: 10px 0;
  border: 0;
  border-top: 1px dashed #ccc;
}

/* --- QR Container --- */
.qr-container {
  border: 2px dashed #180c4a;
  padding: 15px;
  border-radius: 10px;
  background: #f8f9fa;
  margin-bottom: 20px;
  display: inline-block;
}

.qr-image {
  width: 180px;
  height: 180px;
  display: block;
}

/* --- Payment Details --- */
.payment-details {
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  color: #777;
  margin: 0;
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
  border: 1px solid #eee;
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