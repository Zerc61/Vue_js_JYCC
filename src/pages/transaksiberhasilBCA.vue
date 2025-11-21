<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap center-content">
      <h2 class="section-title">Pembayaran BCA Virtual Account</h2>
      <p class="sub">Transfer ke nomor rekening di bawah ini</p>

      <div class="va-container">
        <img :src="require('@/assets/BCA.png')" alt="BCA Logo" class="bank-logo" />
        <p class="va-number">{{ vaNumber }}</p>
        <p class="va-label">Nomor Virtual Account BCA</p>
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
          <li>Buka aplikasi BCA Mobile atau ATM BCA.</li>
          <li>Pilih menu Transfer > Ke Rekening BCA Virtual Account.</li>
          <li>Masukkan nomor VA: <b>{{ vaNumber }}</b>.</li>
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
  name: "BcaPage",
  data() {
    return {
      total: 50000,
      vaNumber: "1234567890123456", // Dalam produksi, dapatkan dari API Midtrans
      timeLeft: 900,
      timerInterval: null
    };
  },
  computed: {
    formattedTotal() {
      return this.total.toLocaleString("id-ID");
    },
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
          this.$router.push("/");
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
            dcoin: 10000,
            rupiah: this.total,
            metode: "BCA Virtual Account"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.pay-page {
  background: #eee;
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

.va-container {
  border: 2px dashed #180c4a;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.bank-logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.va-number {
  font-size: 24px;
  font-weight: 800;
  color: #180c4a;
  margin: 10px 0;
}

.va-label {
  font-size: 14px;
  color: #666;
}

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