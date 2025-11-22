<template>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <!-- Wrap -->
    <div class="wrap">
      <div class="header-section">
        <h2 class="section-title">BRI Virtual Account</h2>
        <img src="@/assets/BRI.png" alt="BRI" class="bank-logo" />
      </div>

      <!-- Rincian -->
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

      <!-- VA Section -->
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

      <!-- Instruksi -->
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

      <!-- Buttons -->
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
  name: "CombinedDetailBRIPage",
  props: {
    rupiah: { type: [Number, String], default: 0 },
    displayRupiah: { type: String, default: "0" },
    dcoin: { type: Number, default: 0 }
  },
  data() {
    return {
      totalEmas: 0,
      biayaAdmin: 5000,
      vaNumber: "261234567890", // Nomor VA BRI
      timeLeft: 3600,
      timerInterval: null,
      copied: false,
      openIndex: 0,

      paymentMethods: [
        {
          title: "BRImo",
          steps: [
            "Buka aplikasi BRImo.",
            "Login menggunakan akun Anda.",
            "Pilih menu 'BRIVA'.",
            "Masukkan nomor VA: 261234567890.",
            "Periksa detail pembayaran kemudian tekan 'Bayar'.",
            "Masukkan PIN transaksi."
          ]
        },
        {
          title: "ATM BRI",
          steps: [
            "Masukkan kartu dan PIN.",
            "Pilih menu 'Transaksi Lainnya'.",
            "Pilih 'Pembayaran'.",
            "Pilih 'BRIVA'.",
            "Masukkan nomor VA: 261234567890.",
            "Periksa nominal dan konfirmasi pembayaran."
          ]
        },
        {
          title: "Internet Banking BRI",
          steps: [
            "Login ke situs Internet Banking BRI.",
            "Pilih 'Pembayaran'.",
            "Pilih 'BRIVA'.",
            "Masukkan nomor VA: 261234567890.",
            "Konfirmasi dan selesaikan transaksi."
          ]
        }
      ]
    };
  },
  computed: {
    ppn() {
      return Math.round(Number(this.rupiah) * 0.12);
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
      return "Rp " + this.totalKeseluruhan.toLocaleString("id-ID");
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
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) this.timeLeft--;
      }, 1000);
    },
    copyVa() {
      navigator.clipboard.writeText(this.vaNumber).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      });
    },
    toggleAccordion(index) {
      this.openIndex = this.openIndex === index ? null : index;
    },
    cekStatus() {
      const success = confirm("Simulasi: Apakah pembayaran sudah diterima?");
      if (success) {
        alert("Pembayaran berhasil!");
        this.$router.push({
          name: "TransaksiBerhasilBRI",
          params: {
            dcoin: this.dcoin.toString(),
            rupiah: this.rupiah.toString(),
            metode: "BRI Virtual Account"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.page {
  background: #f3f4f6;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  padding: 20px;
}

.header {
  background: #180c4a;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
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
  max-width: 550px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.section-title { font-size: 22px; font-weight: 700; color: #333; }
.bank-logo { height: 30px; width: auto; }

.rincian-box { margin-bottom: 20px; width: 100%; }
.rincian-title { font-size: 22px; font-weight: 600; margin-bottom: 10px; }
.row { display: flex; justify-content: space-between; margin-bottom: 7px; }
.ppn { font-size: small; opacity: 60%; }
.line { margin: 10px 0; border: 0.7px solid #222; }
.total { font-size: 18px; font-weight: 600; }

.va-box { text-align: center; margin-bottom: 25px; }
.va-label { font-size: 13px; color: #777; margin-bottom: 5px; }
.va-number-wrap {
  display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 8px;
}
.va-number {
  font-size: 28px;
  font-weight: 800;
  color: #180c4a;
  letter-spacing: 2px;
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
}
.btn-copy:hover { background: #180c4a; color: white; }

.va-info { font-size: 12px; color: #888; }

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
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; font-weight: 500; font-size: 14px;
}
.arrow { transition: transform 0.3s; font-size: 12px; }
.arrow.rotated { transform: rotate(180deg); }

.accordion-body {
  padding: 15px;
  background: white;
  font-size: 13px;
  color: #444;
  line-height: 1.6;
}

.footer-actions { display: flex; flex-direction: column; gap: 10px; }
.btn-check { background: #180c4a; color: white; }
.btn-cancel { background: white; border: 1px solid #ddd; color: #555; }
</style>
