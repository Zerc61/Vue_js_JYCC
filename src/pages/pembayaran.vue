<template>
  <div class="pay-page">
    <button class="icon-btn" @click="goBack">⟵</button>
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">East Java Traveling</h1>
    </header> <!-- TYPO DIPERBAIKI DI SINI -->

    <div class="wrap">
      <h2 class="section-title">Konfirmasi Pembayaran</h2>
      <p class="sub">Pastikan nominal di bawah ini sudah benar.</p>

      <div class="summary-box">
        <div class="summary-item">
          <span>Total D'coin:</span>
          <strong>{{ dcoin }} DC</strong>
        </div>
        <div class="summary-item">
          <span>Total Tagihan:</span>
          <strong class="price">Rp {{ formattedTotal }}</strong>
        </div>
      </div>

      <div class="footer">
        <button class="btn" :disabled="loading" @click="bayarSekarang">
          {{ loading ? 'Memproses...' : 'Bayar dengan Midtrans' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { globalStore } from '@/store'; 

export default {
  name: "PembayaranPage",
  data() {
    return {
      rupiah: 0,
      dcoin: 0,
      loading: false
    };
  },
  mounted() {
    if (this.$route.params.rupiah) {
      this.rupiah = this.$route.params.rupiah;
      this.dcoin = this.$route.params.dcoin;
    } else {
      alert("Sesi tidak valid, kembali ke halaman Top Up.");
      this.$router.push('/topup');
    }
  },
  computed: {
    formattedTotal() {
      return Number(this.rupiah).toLocaleString("id-ID");
    }
  },
  methods: {
    goBack() {
      this.$router.push("/isisaldo");
    },
    
    async bayarSekarang() {
      this.loading = true;
      try {
        const response = await axios.post("http://localhost:3000/api/create-transaction", {
          gross_amount: this.rupiah,
          dcoin_amount: this.dcoin,
          order_id: "ORDER-" + new Date().getTime() 
        });

        const snapToken = response.data.token;

        window.snap.pay(snapToken, {
          onSuccess: (result) => {
            console.log("Sukses!", result);
            globalStore.tambahSaldo(this.dcoin);
            alert("Pembayaran Berhasil! D'coin akan ditambahkan.");
            this.$router.push("/topup");
          },
          onPending: (result) => {
            console.log("Menunggu pembayaran", result);
            alert("Selesaikan pembayaran Anda.");
          },
          onError: (result) => {
            console.log("Gagal", result);
            alert("Pembayaran gagal!");
          },
          onClose: () => {
            console.log("Tutup pop-up tanpa bayar");
          }
        });

      } catch (error) {
        console.error("Gagal memanggil Midtrans:", error);
        alert("Gagal memproses pembayaran. Pastikan Backend menyala.");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.pay-page { background: #eee; min-height: 100vh; font-family: "Poppins", sans-serif; }
.head { background: #180c4a; color: white; padding: 15px 25px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.logo { width: 45px; }
.title { font-size: 20px; font-weight: 600; }
.icon-btn { position: absolute; top: 22px; left: 22px; background: white; border: none; width: 42px; height: 42px; border-radius: 11px; font-size: 20px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); transition: 0.25s; z-index: 10; }
.icon-btn:hover { transform: scale(1.13); }
.wrap { background: #fff; max-width: 500px; margin: 40px auto; padding: 30px; border-radius: 15px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); text-align: center; }
.section-title { font-size: 22px; font-weight: 600; color: #180c4a; margin-bottom: 5px; }
.sub { font-size: 14px; color: #666; margin-bottom: 25px; }
.summary-box { background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 25px; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 15px; }
.summary-item:last-child { margin-bottom: 0; padding-top: 10px; border-top: 1px dashed #ccc; }
.price { color: #180c4a; font-size: 18px; font-weight: bold; }
.btn { width: 100%; background: #180c4a; color: white; padding: 14px; border-radius: 30px; border: none; cursor: pointer; font-size: 16px; font-weight: 600; transition: background 0.3s; }
.btn:hover:not(:disabled) { background: #2a1675; }
.btn:disabled { background: #aaa; cursor: not-allowed; }
</style>