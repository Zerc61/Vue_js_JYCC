<template>
  <div class="page">

    <!-- Header -->
    <div class="header">
      <img :src="require('@/assets/scream 2.png')" class="logo" />
      <div class="title">SCREAM DESTINATION</div>
    </div>

    <!-- CARD -->
    <div class="card">

      <!-- CARD TOP -->
      <div class="card-top">
        <div class="success-row">
          <span class="green-dot">●</span>
          <span>✓ Transaksi Berhasil</span>
        </div>

        <div class="coins">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
          {{ dcoin }} D'coins
        </div>
      </div>

      <!-- DETAILS -->
      <div class="details">
        <h2>Rincian</h2>

        <div class="row">
          <span>Total Emas</span>
          <span>{{ totalEmas }} Gram</span>
        </div>

        <div class="row">
          <span>Total Harga</span>
          <span>Rp {{ rupiahFormatted }}</span>
        </div>

        <div class="row">
          <span>Metode Pembayaran</span>
          <span>{{ metode }}</span>
        </div>

        <div class="row">
          <span>PPN (12%)</span>
          <span>Rp {{ ppnFormatted }}</span>
        </div>

        <div class="row">
          <span>Biaya Admin</span>
          <span>Rp {{ ppnFormatted }}</span>
        </div>

        <div class="line"></div>

        <div class="row total">
          <span>Total Keseluruhan</span>
          <strong>Rp {{ totalFormatted }}</strong>
        </div>
      </div>

      <button class="btn-primary" @click="$router.push('/topup')">Cek Saldo D'coin</button>
      <button class="btn-secondary" @click="$router.push('/dashboard')">Beranda</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "TransaksiBerhasil",

  computed: {
    // Ambil dari URL params
    dcoin() {
      return Number(this.$route.params.dcoin || 0);
    },
    rupiah() {
      return Number(this.$route.params.rupiah || 0);
    },
    metode() {
      return this.$route.params.metode || "-";
    },

    // Convert
    rupiahFormatted() {
      return this.rupiah.toLocaleString("id-ID");
    },

    ppn() {
      return Math.round(this.rupiah * 0.12);
    },
    ppnFormatted() {
      return this.ppn.toLocaleString("id-ID");
    },

    totalKeseluruhan() {
      return this.rupiah + this.ppn;
    },
    totalFormatted() {
      return this.totalKeseluruhan.toLocaleString("id-ID");
    },

    totalEmas() {
      // Rumus sama dengan halaman QRIS
      return ((this.dcoin / 5000) * 0.1).toFixed(2);
    }
  }
};
</script>

<style scoped>
.page {
  background: #efefef;
  min-height: 100vh;
  padding-bottom: 40px;
}

/* Header */
.header {
  background: #1a0a50;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.logo {
  width: 50px;
}
.title {
  font-size: 26px;
  font-weight: bold;
}

/* Card */
.card {
  width: 70%;
  margin: 40px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Card Top */
.card-top {
  background: #2d1179;
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.success-row {
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.green-dot {
  color: #00ff3c;
  font-size: 28px;
}

.coins {
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.coins img {
  width: 28px;
}

/* Details */
.details {
  padding: 30px 40px;
}

.details h2 {
  margin-bottom: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 18px;
}

.line {
  height: 2px;
  background: #000;
  opacity: 0.4;
  margin: 15px 0;
}

.total {
  font-size: 20px;
  font-weight: bold;
}

/* Buttons */
.btn-primary {
  width: 85%;
  padding: 15px;
  margin: 25px auto 10px;
  display: block;
  border-radius: 30px;
  background: #2d1179;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
}
.btn-secondary {
  width: 85%;
  padding: 15px;
  margin: 10px auto 30px;
  display: block;
  border-radius: 30px;
  font-size: 18px;
  border: 3px solid #2d1179;
  color: #2d1179;
  background: white;
  cursor: pointer;
}
</style>