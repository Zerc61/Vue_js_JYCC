<template>
  <div class="detail-page">
    <!-- tombol back -->
    <button class="icon-btn" @click="goBack">⟵</button>

    <div class="header">
      <img src="@/assets/scream.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <div class="card">
      <div class="nominal-box">
        <p class="label">Nominal D’coin Yang Kamu Pilih</p>
        <div class="nominal-row">
          <img src="@/assets/Dcoin.png" class="coin" />
          <span class="nominal">{{ dcoin.toLocaleString("id-ID") }} D’coins</span>
        </div>
      </div>

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
          <span>PPN (10%)</span>
          <span>{{ formattedPPN }}</span>
        </div>

        <hr class="line" />

        <div class="row total">
          <strong>Total Keseluruhan</strong>
          <strong>{{ formattedTotal }}</strong>
        </div>
      </div>

      <button class="btn" @click="konfirmasiTopup">Bayar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailDcoin",
  props: {
    rupiah: { type: [Number, String], default: 0 },
    displayRupiah: { type: String, default: "0" },
    dcoin: { type: Number, default: 0 }
  },
  data() {
    return { totalEmas: 0 };
  },
  computed: {
    ppn() { return Math.round(Number(this.rupiah) * 0.1); },
    totalKeseluruhan() { return Number(this.rupiah) + this.ppn; },
    formattedRupiah() { return Number(this.rupiah).toLocaleString("id-ID"); },
    formattedPPN() { return Number(this.ppn).toLocaleString("id-ID"); },
    formattedTotal() { return Number(this.totalKeseluruhan).toLocaleString("id-ID"); }
  },
  mounted() {
    this.totalEmas = ((this.dcoin / 5000) * 0.1).toFixed(2);
  },
  methods: {
    konfirmasiTopup() {
      alert(`Top Up ${this.formattedRupiah} Lanjut ke Pembayaran!`);
      if (this.$router) this.$router.push("/pembayaran");
      else alert("Top Up clicked");
    },

    goBack() {
      this.$router.push("/isisaldo");
    }
  }
};
</script>

<style scoped>
.detail-page { background: #fff; padding: 20px; font-family: "Poppins", sans-serif; }
.header { background: #180c4a; color: white; padding: 15px 20px; display: flex; align-items: center; gap: 10px; }
.logo { width: 45px; }
.title { font-size: 20px; font-weight: 600; }
.card { background: #fff; margin: 25px auto; padding: 20px; border-radius: 15px; max-width: 600px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
.nominal-box { background: #180c4a; padding: 20px; border-radius: 10px; color: white; }
.label { font-size: 14px; }
.nominal-row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.coin { width: 30px; }
.nominal { font-size: 22px; font-weight: 600; }
.rincian-box { margin-top: 20px; }
.rincian-title { font-size: 22px; font-weight: 600; margin-bottom: 10px; }
.row { display: flex; justify-content: space-between; margin-bottom: 7px; }
.line { margin: 10px 0; border: 0.7px solid #222; }
.total { font-size: 18px; font-weight: 600; }
.icon-btn { position: absolute; top: 22px; left: 22px; background: white; border: none; width: 42px; height: 42px; border-radius: 11px; font-size: 20px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(0,0,0,0.08); transition: 0.25s; }
.icon-btn:hover { transform: scale(1.13); }
.btn { width: 100%; padding: 15px; background: #180c4a; color: white; border: none; margin-top: 25px; font-size: 18px; font-weight: 600; border-radius: 30px; cursor: pointer; }
.btn:hover { background: #12083a; }
</style>
