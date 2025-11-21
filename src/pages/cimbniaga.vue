<template>
  <div class="pay-page">
    <header class="head">
      <img src="@/assets/scream 2.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </header>

    <div class="wrap">
      <div class="header-section">
        <h2 class="section-title">CIMB Niaga</h2>
        <img src="@/assets/CIMB.jpg" alt="CIMB" class="bank-logo" />
      </div>

      <div class="info-card">
        <div class="row">
          <span>Total Pembayaran</span>
          <span class="price">Rp 50.000</span>
        </div>
        <div class="row">
          <span>Batas Waktu</span>
          <span class="timer">01:00:00</span>
        </div>
      </div>

      <div class="va-box">
        <p class="va-label">Nomor Rekening</p>
        <div class="va-number-wrap">
          <h2 class="va-number">1234567890</h2>
          <button class="btn-copy" @click="copyVa">Salin</button>
        </div>
        <p class="va-info">Silakan lakukan transfer ke rekening di atas.</p>
      </div>

      <div class="footer-actions">
        <button class="btn btn-check" @click="$router.push('/topup')">Selesai</button>
        <button class="btn btn-cancel" @click="$router.go(-1)">Kembali</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CimbNiagaPage",
  methods: {
    copyVa() {
      navigator.clipboard.writeText('1234567890');
      alert('Nomor rekening disalin.');
    }
  }
};
</script>

<style scoped>
.head { background: #180c4a; color: white; padding: 15px 25px; display:flex; gap:10px; align-items:center }
.logo { width:45px }
.title { font-size:20px; font-weight:600 }
.wrap { background:#fff; max-width:550px; margin:25px auto; padding:25px; border-radius:16px }
.header-section{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.section-title{font-size:18px;font-weight:700}
.bank-logo{height:30px}
.info-card{background:#f8f9fa;padding:12px;border-radius:10px;margin-bottom:16px}
.row{display:flex;justify-content:space-between}
.va-number{font-size:24px;font-weight:800}
.btn-copy{border:1px solid #180c4a;padding:6px 10px;border-radius:6px;background:none;color:#180c4a}
.footer-actions{display:flex;flex-direction:column;gap:10px;margin-top:12px}
.btn{padding:12px;border-radius:30px;border:none;cursor:pointer}
.btn-check{background:#180c4a;color:#fff}
.btn-cancel{background:#fff;border:1px solid #ddd}
</style>
