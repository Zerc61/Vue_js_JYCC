<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap">
      <h2 class="section-title">Pembayaran</h2>
      <p class="sub">Bayar menggunakan</p>

      <h3 class="category">Virtual Account</h3>
      <div
        v-for="(item, i) in vaList"
        :key="'va-'+i"
        class="pay-box"
        @click="selected = item.name"
      >
        <div class="left">
          <img :src="item.logo" class="icon" />
          <span class="label">{{ item.name }}</span>
        </div>
        <input type="radio" :checked="selected === item.name" />
      </div>

      <h3 class="category">QRIS</h3>
      <div
        v-for="(item, i) in Qrislist"
        :key="'qris-'+i"
        class="pay-box"
        @click="selected = item.name"
      >
        <div class="left">
          <img :src="item.logo" class="icon" />
          <span class="label">{{ item.name }}</span>
        </div>
        <input type="radio" :checked="selected === item.name" />
      </div>

      <div class="footer">
        <div class="price-wrap">
          <span class="tlabel">Total Harga</span>
          <span class="price">{{ formattedTotal }}</span>
        </div>

        <button
          class="btn"
          :disabled="!selected"
          @click="lanjut"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PembayaranPage",

  data() {
    return {
      total: 50000, // Nominal pembayaran
      selected: null, // Menyimpan metode pembayaran yang dipilih

      // --- DATA LIST PEMBAYARAN ---
      vaList: [
        { name: 'BCA Virtual Account', logo: require('@/assets/BCA.png') },
        { name: 'MANDIRI Virtual Account', logo: require('@/assets/MANDIRI.png') },
        { name: 'BRI Virtual Account', logo: require('@/assets/BRI.png') },
        { name: 'CIMB NIAGA Virtual Account', logo: require('@/assets/CIMB-NIAGA.png') }
      ],
      Qrislist: [
        // Perhatikan name 'QRIS' harus sama dengan yang dicek di method lanjut()
        { name: 'QRIS', logo: require('@/assets/qris.png') },
      ]
    };
  },

  computed: {
    formattedTotal() {
      if (!this.total) return "Rp 0";
      return "Rp " + this.total.toLocaleString("id-ID");
    }
  },

  methods: {
    lanjut() {
      // Cek jika user memilih QRIS
      if (this.selected === 'QRIS') {
        // Arahkan ke halaman QRIS yang baru kita buat
        this.$router.push("/pembayaran/qris");
      } else {
        // Jika metode lain (VA/E-wallet), anggap sukses dan ke dashboard/topup
        alert(`Pembayaran menggunakan ${this.selected} berhasil!`);
        this.$router.push("/topup");
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
  color: #333;
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
  border-color: #180c4a;
  transform: scale(1.01);
}

/* Style tambahan jika item dipilih */
.pay-box input:checked {
  accent-color: #180c4a;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 35px;
  height: auto;
  object-fit: contain;
}

.label {
  font-weight: 600;
  font-size: 14px;
}

.footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ccc;
}

.price-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.tlabel {
  font-size: 14px;
  color: #555;
}

.price {
  color: #180c4a;
  font-weight: 700;
  font-size: 18px;
}

.btn {
  width: 100%;
  background: #180c4a;
  color: white;
  padding: 12px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn:hover:not(:disabled) {
  background: #2a1675;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>