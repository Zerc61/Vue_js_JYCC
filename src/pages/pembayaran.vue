<template>
  <div class="pay-page">
    <header class="head">
      <img :src="require('@/assets/scream.png')" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap">
      <h2 class="section-title">Pembayaran</h2>
      <p class="sub">Bayar menggunakan</p>

      <h3 class="category">Virtual Account</h3>
      <div
        v-for="(item, i) in vaList"
        :key="i"
        class="pay-box"
        @click="selected = item.name"
      >
        <div class="left">
          <img :src="item.logo" class="icon" />
          <span class="label">{{ item.name }}</span>
        </div>
        <input type="radio" :checked="selected === item.name" />
      </div>

      <h3 class="category">E-Wallet</h3>
      <div
        v-for="(item, i) in walletList"
        :key="i"
        class="pay-box"
        @click="selected = item.name"
      >
        <div class="left">
          <img :src="item.logo" class="icon" />
          <span class="label">{{ item.name }}</span>
        </div>
        <input type="radio" :checked="selected === item.name" />
      </div>

      <h3 class="category">Qris</h3>
      <div class="pay-box" @click="selected = 'QRIS'">
        <div class="left">
          <img :src="require('@/assets/qris.png')" class="icon" />
          <span class="label">QRIS</span>
        </div>
        <input type="radio" :checked="selected === 'QRIS'" />
      </div>

      <h3 class="category">Credit Card</h3>
      <div class="pay-box" @click="selected = 'Credit Card'">
        <div class="left">
          <img :src="require('@/assets/card.png')" class="icon-card" />
          <span class="label">Credit Card</span>
        </div>
        <input type="radio" :checked="selected === 'Credit Card'" />
      </div>

      <div class="footer">
        <div class="price-wrap">
          <span class="tlabel">Total Harga</span>
          <span class="price">{{ formattedTotal }}</span>
        </div>

        <button class="btn" :disabled="!selected" @click="lanjut">
          Lanjutkan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PembayaranView",
  data() {
    return {
      selected: "",
      total: Number(this.$route.query.total || 0),
      dcoin: Number(this.$route.query.dcoin || 0),

      // PERBAIKAN: Semua nama file diubah menjadi huruf kecil di sini
      vaList: [
        { name: "BCA", logo: require("@/assets/BCA.png") }, // Cek apakah file fisik BCA.png diubah ke bca.png
        { name: "BRI", logo: require("@/assets/BRI.png") },
        { name: "CIMB Niaga", logo: require("@/assets/CIMB.jpg") },
      ],

      walletList: [
        { name: "OVO", logo: require("@/assets/OVO.jpg") },
        { name: "GoPay", logo: require("@/assets/GOPAY.jpg") },
        { name: "ShopeePay", logo: require("@/assets/SHOPEE.png") },
      ],
    };
  },

  computed: {
    formattedTotal() {
      return this.total.toLocaleString("id-ID");
    },
  },

  methods: {
    lanjut() {
      alert(`Pembayaran menggunakan ${this.selected} berhasil!`);
      this.$router.push("/topup");
    },
  },
};
</script>

<style scoped>
/* (Bagian <style> tidak perlu diubah karena tidak ada error di sini) */
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
  max-width: 600px;
  margin: 25px auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 22px;
  font-weight: 600;
}

.sub {
  margin-bottom: 15px;
  font-size: 14px;
}

.category {
  margin: 20px 0 8px;
  font-weight: 600;
  font-size: 15px;
}

.pay-box {
  background: #fafafa;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ddd;
  transition: 0.2s;
}

.pay-box:hover {
  transform: scale(1.01);
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 35px;
}

.icon-card {
  width: 45px;
}

.label {
  font-weight: 600;
}

.footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ccc;
}

.price-wrap {
  display: flex;
  justify-content: space-between;
}

.tlabel {
  font-size: 13px;
}

.price {
  color: #180c4a;
  font-weight: 700;
  font-size: 16px;
}

.btn {
  margin-top: 10px;
  width: 100%;
  background: #180c4a;
  color: white;
  padding: 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
