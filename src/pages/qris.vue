<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap center-content">
      <h2 class="section-title">Scan QRIS</h2>
      <p class="sub">Silakan scan QR Code di bawah ini</p>

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
  name: "QrisPage",
  data() {
    return {
      total: 50000, // Pastikan ini sesuai dengan data yang dikirim
      timeLeft: 900, // 15 menit dalam detik (15 * 60)
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
      // Menambahkan '0' di depan jika angka di bawah 10 (contoh: 09:05)
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    // Hentikan timer jika user pindah halaman agar tidak error
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
          this.$router.push("/"); // Kembali ke home jika habis
        }
      }, 1000);
    },
    cekStatus() {
      // Di sini nanti logika cek ke backend / API
      // Untuk simulasi, kita anggap sukses
      const isSuccess = confirm("Simulasi: Apakah pembayaran sudah masuk?");
      if (isSuccess) {
        alert("Pembayaran Berhasil!");
        this.$router.push("/topup"); // Atau halaman sukses
      }
    }
  }
};
</script>

<style scoped>
/* Menggunakan style dasar yang sama agar konsisten */
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
  max-width: 500px; /* Sedikit lebih kecil agar fokus ke QR */
  margin: 25px auto;
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