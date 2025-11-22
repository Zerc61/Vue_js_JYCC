<template>
  <div class="page">
    
    <!-- Header -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <div class="wrap">

      <!-- Header Bank -->
      <div class="header-section">
        <h2 class="section-title">CIMB Niaga Virtual Account</h2>
        <img src="@/assets/CIMB-NIAGA.png" alt="CIMB" class="bank-logo" />
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

      <!-- VA -->
      <div class="va-box">
        <p class="va-label">Nomor Virtual Account</p>
        <div class="va-number-wrap">
          <h2 class="va-number">{{ vaNumber }}</h2>
          <button class="btn-copy" @click="copyVa">
            {{ copied ? 'Disalin!' : 'Salin' }}
          </button>
        </div>
        <p class="va-info">Pembayaran diverifikasi otomatis tanpa upload bukti.</p>
      </div>

      <!-- Instructions -->
      <div class="instructions">
        <h3 class="inst-title">Cara Pembayaran</h3>

        <div v-for="(method, index) in paymentMethods" :key="index" class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion(index)">
            <span>{{ method.title }}</span>
            <span class="arrow" :class="{ rotated: openIndex === index }">▼</span>
          </div>

          <div class="accordion-body" v-show="openIndex === index">
            <ol>
              <li v-for="(step, i) in method.steps" :key="i">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="footer-actions">
        <button class="btn btn-check" @click="cekStatus">Cek Status Pembayaran</button>
        <button class="btn btn-cancel" @click="$router.go(-1)">Kembali</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CIMBNiagaPaymentPage",
  props: {
    rupiah: { type: [Number, String], default: 0 },
    dcoin: { type: Number, default: 0 }
  },
  data() {
    return {
      totalEmas: 0,
      biayaAdmin: 5000,
      vaNumber: "8059001234567890", // VA CIMB
      copied: false,
      openIndex: 0,
      paymentMethods: [
        {
          title: "Octo Mobile",
          steps: [
            "Buka aplikasi OCTO Mobile.",
            "Login ke akun Anda.",
            "Pilih menu 'Transfer' atau 'Pembayaran'.",
            "Pilih Virtual Account / Virtual Payment.",
            "Masukkan nomor VA: 8059001234567890.",
            "Periksa detail lalu konfirmasi pembayaran."
          ]
        },
        {
          title: "ATM CIMB Niaga",
          steps: [
            "Masukkan kartu ATM dan PIN.",
            "Pilih menu 'Transfer'.",
            "Pilih Virtual Account.",
            "Masukkan nomor VA.",
            "Konfirmasi detail dan selesaikan pembayaran."
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
  },
  methods: {
    copyVa() {
      navigator.clipboard.writeText(this.vaNumber);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
    toggleAccordion(index) {
      this.openIndex = this.openIndex === index ? null : index;
    },
    cekStatus() {
      const success = confirm("Simulasi: Apakah pembayaran sudah diterima?");
      if (success) {
        alert("Pembayaran berhasil!");
        this.$router.push({
          name: "TransaksiBerhasil",
          params: {
            dcoin: this.dcoin,
            rupiah: this.rupiah,
            metode: "CIMB Niaga Virtual Account"
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

.logo { width: 45px; }
.title { font-size: 20px; font-weight: 600; }

.wrap {
  background: #fff;
  max-width: 550px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
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

.rincian-box { margin-bottom: 20px; }
.rincian-title { font-size: 22px; font-weight: 600; margin-bottom: 10px; }

.row { display: flex; justify-content: space-between; margin-bottom: 7px; }
.ppn { font-size: small; opacity: .6; }

.line { margin: 12px 0; border: 0.6px solid #222; }

.total { font-size: 18px; font-weight: 600; }

.va-box { text-align: center; margin-bottom: 20px; }
.va-label { font-size: 13px; color: #777; margin-bottom: 4px; }

.va-number-wrap { display: flex; justify-content: center; gap: 10px; }
.va-number {
  font-size: 26px;
  font-weight: 800;
  color: #180c4a;
  letter-spacing: 2px;
}

.btn-copy {
  border: 1px solid #180c4a;
  background: none;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}

.btn-copy:hover {
  background: #180c4a;
  color: white;
}

.instructions { margin-bottom: 20px; }
.inst-title { font-size: 16px; font-weight: 600; }

.accordion-item { border: 1px solid #eee; border-radius: 8px; margin-bottom: 8px; }
.accordion-header {
  padding: 12px;
  background: #fafafa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.arrow { transition: 0.3s; font-size: 12px; }
.arrow.rotated { transform: rotate(180deg); }

.accordion-body { padding: 15px; background: white; line-height: 1.6; font-size: 14px; }

.footer-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }

.btn {
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
}

.btn-check { background: #180c4a; color: white; }
.btn-cancel { border: 1px solid #ddd; background: white; }
</style>
