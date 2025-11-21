<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap">
      <div class="header-section">
        <h2 class="section-title">BCA Virtual Account</h2>
        <img src="@/assets/BCA.png" alt="BCA" class="bank-logo" />
      </div>

      <div class="info-card">
        <div class="row">
          <span>Total Pembayaran</span>
          <span class="price">{{ formattedTotal }}</span>
        </div>
        <div class="row">
          <span>Batas Waktu</span>
          <span class="timer">{{ timerDisplay }}</span>
        </div>
      </div>

      <div class="va-box">
        <p class="va-label">Nomor Virtual Account</p>
        <div class="va-number-wrap">
          <h2 class="va-number">{{ vaNumber }}</h2>
          <button class="btn-copy" @click="copyVa">
            {{ copied ? 'Disalin!' : 'Salin' }}
          </button>
        </div>
        <p class="va-info">Proses verifikasi otomatis. Tidak perlu kirim bukti bayar.</p>
      </div>

      <div class="instructions">
        <h3 class="inst-title">Cara Pembayaran</h3>
        
        <div 
          v-for="(method, index) in paymentMethods" 
          :key="index" 
          class="accordion-item"
        >
          <div class="accordion-header" @click="toggleAccordion(index)">
            <span>{{ method.title }}</span>
            <span class="arrow" :class="{ rotated: openIndex === index }">▼</span>
          </div>
          
          <div class="accordion-body" v-show="openIndex === index">
            <ol>
              <li v-for="(step, sIndex) in method.steps" :key="sIndex">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
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
      total: 50000, // Nominal (bisa diambil dari params/store)
      vaNumber: "880123456789", // Contoh No VA
      timeLeft: 3600, // 1 Jam dalam detik
      timerInterval: null,
      copied: false,
      openIndex: 0, // Index accordion yang terbuka default (0 = m-BCA)
      
      paymentMethods: [
        {
          title: "m-BCA (BCA Mobile)",
          steps: [
            "Login ke aplikasi m-BCA.",
            "Pilih menu m-Transfer.",
            "Pilih BCA Virtual Account.",
            "Masukkan nomor VA: 880123456789.",
            "Periksa detail pembayaran & konfirmasi.",
            "Masukkan PIN m-BCA Anda."
          ]
        },
        {
          title: "ATM BCA",
          steps: [
            "Masukkan Kartu ATM & PIN.",
            "Pilih menu Transaksi Lainnya.",
            "Pilih Transfer > Ke Rek BCA Virtual Account.",
            "Masukkan nomor VA: 880123456789.",
            "Cek detail pembayaran, lalu pilih Ya.",
            "Simpan struk sebagai bukti."
          ]
        },
        {
          title: "KlikBCA (Internet Banking)",
          steps: [
            "Login ke website KlikBCA.",
            "Pilih menu Transfer Dana.",
            "Pilih Transfer ke BCA Virtual Account.",
            "Masukkan nomor VA: 880123456789.",
            "Ikuti instruksi selanjutnya untuk menyelesaikan."
          ]
        }
      ]
    };
  },
  computed: {
    formattedTotal() {
      return "Rp " + this.total.toLocaleString("id-ID");
    },
    timerDisplay() {
      const hours = Math.floor(this.timeLeft / 3600);
      const minutes = Math.floor((this.timeLeft % 3600) / 60);
      const seconds = this.timeLeft % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        if (this.timeLeft > 0) this.timeLeft--;
        else clearInterval(this.timerInterval);
      }, 1000);
    },
    copyVa() {
      navigator.clipboard.writeText(this.vaNumber).then(() => {
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      });
    },
    toggleAccordion(index) {
      if (this.openIndex === index) {
        this.openIndex = null;
      } else {
        this.openIndex = index;
      }
    },
    cekStatus() {
  const isSuccess = confirm("Simulasi: Apakah pembayaran sudah masuk?");
  if (isSuccess) {
    alert("Pembayaran Berhasil!");
    this.$router.push({
      name: "TransaksiBerhasilBCA", // ← Gunakan name yang benar
      params: {
        dcoin: "10000",
        rupiah: this.total.toString(),
        metode: "BRI Virtual Account"
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

.logo { width: 45px; }
.title { font-size: 20px; font-weight: 600; }

.wrap {
  background: #fff;
  max-width: 550px;
  margin: 25px auto;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* --- Header Section --- */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.section-title { font-size: 18px; font-weight: 700; color: #333; }
.bank-logo { height: 30px; width: auto; }

/* --- Info Card (Total & Timer) --- */
.info-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}
.row:last-child { margin-bottom: 0; }
.price { font-weight: 700; color: #180c4a; font-size: 16px; }
.timer { font-weight: 700; color: #d9534f; }

/* --- VA Box --- */
.va-box {
  text-align: center;
  margin-bottom: 25px;
}
.va-label { font-size: 13px; color: #777; margin-bottom: 5px; }
.va-number-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.va-number {
  font-size: 28px;
  font-weight: 800;
  color: #180c4a;
  letter-spacing: 2px;
  margin: 0;
}
.btn-copy {
  background: none;
  border: 1px solid #180c4a;
  color: #180c4a;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}
.btn-copy:hover { background: #180c4a; color: white; }
.va-info { font-size: 12px; color: #888; }

/* --- Accordion Instruksi --- */
.instructions { margin-bottom: 30px; }
.inst-title { font-size: 16px; font-weight: 600; margin-bottom: 10px; }

.accordion-item {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.accordion-header {
  background: #fafafa;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: 0.2s;
}
.accordion-header:hover { background: #f0f0f0; }
.arrow { transition: transform 0.3s; font-size: 12px; }
.arrow.rotated { transform: rotate(180deg); }

.accordion-body {
  padding: 15px;
  background: white;
  font-size: 13px;
  color: #444;
  line-height: 1.6;
  border-top: 1px solid #eee;
}
.accordion-body ol { padding-left: 20px; margin: 0; }

/* --- Buttons --- */
.footer-actions { display: flex; flex-direction: column; gap: 10px; }
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
.btn-check { background: #180c4a; color: white; }
.btn-check:hover { background: #281675; }
.btn-cancel { background: white; border: 1px solid #ddd; color: #555; }
.btn-cancel:hover { background: #f0f0f0; }
</style>