<template>
  <div class="success-page">

    <!-- tombol back -->
    <button class="icon-btn" @click="goBack">⟵</button>

    <!-- HEADER -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <!-- CARD UTAMA -->
    <div class="card">

      <!-- BAGIAN ATAS -->
      <div class="success-box">
        <p class="success-title">&#x2705; Transaksi Berhasil</p>

        <div class="coin-row">
          <img :src="require('@/assets/logo.png')" class="coin" />
          <span class="dcoin">{{ dcoin.toLocaleString("id-ID") }} D’coins</span>
        </div>
      </div>

      <!-- RINCIAN -->
      <div class="rincian-box">
        <h2 class="rincian-title">Rincian</h2>

        <div class="row">
          <span>Total Emas</span>
          <span>{{ totalEmas }} Gram</span>
        </div>

        <div class="row">
          <span>Total Harga</span>
          <span>Rp {{ rupiah.toLocaleString("id-ID") }}</span>
        </div>

        <div class="row">
          <span>Metode Pembayaran</span>
          <span>{{ metode }}</span>
        </div>

        <div class="row sub">
          <span>PPN 2.5%</span>
          <span>Rp {{ ppn.toLocaleString("id-ID") }}</span>
        </div>

        <hr class="line" />

        <div class="row total">
          <strong>Total Keseluruhan</strong>
          <strong>Rp {{ totalKeseluruhan.toLocaleString("id-ID") }}</strong>
        </div>
      </div>

      <!-- BUTTONS -->
      <button class="btn" @click="cekSaldo">
        Cek Saldo D’coin
      </button>

      <button class="btn-outline" @click="goHome">
        Beranda
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransaksiBerhasil",

  props: {
    dcoin: {
      type: [Number, String],
      default: 2500,
    },
    rupiah: {
      type: [Number, String],
      default: 2500000,
    },
    metode: {
      type: String,
      default: "QRIS",
    },
  },

  data() {
    return {
      totalEmas: 0,
    };
  },

  computed: {
    ppn() {
      return Math.round(Number(this.rupiah) * 0.025);
    },
    totalKeseluruhan() {
      return Number(this.rupiah) + this.ppn;
    },
  },

  mounted() {

    // Hitungan total emas dari dcoin
    this.totalEmas = ((this.dcoin / 5000) * 0.1).toFixed(2);
  },

  methods: {
    cekSaldo() {
      this.$router.push("/topup");
    },
    goHome() {
      this.$router.push("/dashboard");
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.success-page {
  background: #fff;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  position: relative;
}

/* HEADER */
.header {
  background: #180c4a;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 0 0 14px 14px;
}
.logo {
  width: 45px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}

/* CARD */
.card {
  background: #fff;
  margin: 25px auto;
  padding: 20px;
  border-radius: 15px;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* BAGIAN SUKSES */
.success-box {
  background: #180c4a;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
}
.success-title {
  font-size: 20px;
  font-weight: 600;
}
.coin-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.coin {
  width: 30px;
}
.dcoin {
  font-size: 20px;
  font-weight: 600;
}

/* RINCIAN */
.rincian-box {
  margin-top: 20px;
}
.rincian-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
}
.sub {
  font-size: small;
  opacity: 60%;
}
.line {
  margin: 12px 0;
  border: 0.7px solid #222;
}
.total {
  font-size: 18px;
  font-weight: 600;
}

/* BUTTONS */
.btn {
  width: 100%;
  padding: 15px;
  background: #180c4a;
  color: white;
  border: none;
  margin-top: 25px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
.btn:hover {
  background: #12083a;
}

.btn-outline {
  width: 100%;
  padding: 15px;
  background: white;
  border: 2px solid #180c4a;
  color: #180c4a;
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
.btn-outline:hover {
  background: #f1f1f1;
}

/* TOMBOL BACK */
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
</style>
