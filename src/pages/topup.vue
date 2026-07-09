<template>
  <div class="wallet-page">
    <header class="header">
      <div class="header-inner">
        <img :src="require('@/assets/scream 2.png')" alt="logo" class="logo" />
        <h1 class="title">East Java Traveling</h1>
      </div>
    </header>

    <main class="container">
      <section class="wallet-card">
        <div class="wallet-head">
          <div class="wallet-title">
            <h2>Dompet Digital Kamu <span class="spark">✨</span></h2>
            <p class="subtitle">Konversi uang ke emas, dapatkan D'coin untuk transaksi halal.</p>
          </div>
          <button class="btn-ghost" @click="toggleHistory">
            {{ showHistoryModal ? 'Tutup Riwayat' : 'Riwayat' }}
          </button>
        </div>

        <div class="balance-area">
          <div class="balance-left">
            <div class="balance-label">Saldo D'coin</div>
            <!-- Terhubung ke store.saldo_dcoin -->
            <div class="balance-value">{{ formatNumber(store.saldo_dcoin) }} <span class="dc">DC</span></div>
            <div class="balance-small">
              {{ formatRupiah(store.saldo_dcoin * 1000) }} (setara {{ (store.saldo_dcoin / 5000).toFixed(2) }} gr emas)
            </div>
          </div>
          <div class="balance-cta">
            <button class="btn-primary" @click="handleTopUp">Isi Saldo</button>
          </div>
        </div>

        <div class="wallet-actions-row">
          <div class="small-card">
            <div class="card-title">Transaksi Bulan Ini</div>
            <div class="card-sub">{{ formatRupiah(monthlyTransactionTotal) }}</div>
          </div>
          <div class="small-card">
            <div class="card-title">Harga Emas</div>
            <div class="card-sub">{{ formatRupiah(goldPricePerGram) }} / gr</div>
          </div>
          <button class="small-card interactive" @click="handleTransfer">
            <div class="card-title">Kirim / Terima</div>
            <div class="card-sub text-blue">Transfer Instan &rarr;</div>
          </button>
        </div>
      </section>

      <section v-if="showHistoryModal" class="history-section">
        <h3>Riwayat Transaksi</h3>
        <div v-if="transactions.length === 0" class="empty-state">Belum ada transaksi.</div>
        <div v-else class="transaction-list">
          <div v-for="trx in transactions" :key="trx.id" class="transaction-item">
            <div class="trx-info">
              <div class="trx-desc">{{ trx.desc }}</div>
              <div class="trx-date">{{ trx.date }}</div>
            </div>
            <div :class="['trx-amount', trx.type === 'in' ? 'text-green' : 'text-red']">
              {{ trx.type === 'in' ? '+' : '-' }} {{ formatNumber(trx.amount) }} DC
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { globalStore } from '@/store';

export default {
  name: "TopupView",
  data() {
    return {
      store: globalStore,
      goldPricePerGram: 1250000,
      showHistoryModal: false,
      transactions: [
        { id: 1, type: "in", amount: 10000, desc: "Top Up Awal", date: new Date().toLocaleDateString() }
      ],
    };
  },
  computed: {
    monthlyTransactionTotal() {
      return 2500000; // Contoh statis
    }
  },
  methods: {
    handleTopUp() {
      // Langsung arahkan ke halaman isi saldo (isisaldo.vue)
      this.$router.push("/isisaldo");
    },
    handleTransfer() {
      alert("Fitur transfer akan segera hadir!");
    },
    toggleHistory() {
      this.showHistoryModal = !this.showHistoryModal;
    },
    formatNumber(num) {
      return new Intl.NumberFormat("id-ID").format(num);
    },
    formatRupiah(num) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }
  }
};
</script>

<style scoped>
/* CSS tetap sama, saya hapus .bottom-nav karena sudah pindah ke App.vue */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }

.wallet-page { min-height: 100vh; background: #fcfcfd; color: #111827; padding-bottom: 40px; }
.header { background: #ffffff; padding: 16px 20px; border-bottom: 1px solid #f3f4f6; }
.header-inner { max-width: 920px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
.logo { width: 36px; height: 36px; object-fit: contain; }
.title { font-size: 16px; font-weight: 700; }
.container { max-width: 920px; margin: 24px auto; padding: 0 20px; }
.wallet-card { background: #ffffff; border-radius: 24px; padding: 24px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04); border: 1px solid #f3f4f6; }
.wallet-head { display: flex; justify-content: space-between; align-items: flex-start; }
.wallet-title h2 { font-size: 20px; font-weight: 700; }
.subtitle { font-size: 13px; color: #6b7280; margin-top: 4px; }
.btn-ghost { background: #f9fafb; color: #374151; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: 600; cursor: pointer; }
.balance-area { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
.balance-value { font-size: 32px; font-weight: 800; color: #111827; }
.dc { font-size: 16px; color: #2563eb; }
.btn-primary { background: #111827; color: #ffffff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 600; cursor: pointer; }
.wallet-actions-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 32px; }
.small-card { background: #f9fafb; padding: 16px; border-radius: 16px; border: 1px solid #f3f4f6; }
.card-title { font-size: 12px; color: #6b7280; }
.card-sub { font-size: 14px; font-weight: 700; margin-top: 4px; }
.history-section { margin-top: 24px; background: #ffffff; padding: 20px; border-radius: 20px; border: 1px solid #f3f4f6; }
.transaction-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
.text-green { color: #10b981; }
.text-red { color: #ef4444; }
@media (max-width: 768px) { .wallet-actions-row { grid-template-columns: 1fr; } }
</style>