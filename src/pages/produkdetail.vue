<template>
  <div class="page">
    <button class="back-btn-float" @click="goBack">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </button>

    <div class="hero-image">
      <img src="@/assets/batu.png" alt="Hero Paket" />
      <div class="hero-overlay"></div>
    </div>

    <main class="detail-content">
      <div class="drag-indicator"></div>
      
      <div class="title-section">
        <span class="badge">2 Hari 1 Malam</span>
        <h1 class="package-title">Paket Jelajah Bromo Eksotis</h1>
        <p class="location">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Taman Nasional Bromo Tengger Semeru, Jawa Timur
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">Deskripsi</h2>
        <p class="description">
          Nikmati keindahan matahari terbit terindah di Pulau Jawa dari Penanjakan, jelajahi megahnya kawah Bromo, dan rasakan sensasi berkendara di atas hamparan Pasir Berbisik. Paket ini sudah dirancang agar Anda bisa berlibur tanpa pusing memikirkan akomodasi dan transportasi.
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">Fasilitas Termasuk</h2>
        <div class="facility-grid">
          <div class="facility-item">
            <div class="icon-box">🏨</div>
            <span>Hotel Bintang 3</span>
          </div>
          <div class="facility-item">
            <div class="icon-box">🚙</div>
            <span>Jeep Hardtop</span>
          </div>
          <div class="facility-item">
            <div class="icon-box">🎫</div>
            <span>Tiket Masuk</span>
          </div>
          <div class="facility-item">
            <div class="icon-box">🍲</div>
            <span>Sarapan Halal</span>
          </div>
          <div class="facility-item">
            <div class="icon-box">📸</div>
            <span>Dokumentasi</span>
          </div>
          <div class="facility-item">
            <div class="icon-box">👨‍🏫</div>
            <span>Tour Guide</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Rencana Perjalanan (Itinerary)</h2>
        <div class="itinerary">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>Hari 1: Penjemputan</h4>
              <p>Penjemputan di Stasiun/Bandara Malang. Check-in hotel dan istirahat untuk persiapan Bromo Midnight Tour.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>Hari 2: Eksplorasi Bromo</h4>
              <p>Berangkat jam 01:00 WIB menuju Sunrise Point, dilanjutkan ke Kawah Bromo, Pasir Berbisik, dan Bukit Teletubbies.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot end"></div>
            <div class="timeline-content">
              <h4>Selesai</h4>
              <p>Kembali ke hotel, sarapan, check-out, dan pengantaran kembali ke titik awal.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="checkout-bar">
      <div class="price-info">
        <span class="price-label">Total Harga</span>
        <span class="price-value">Rp 1.350.000</span>
        <span class="price-dcoin">atau 1.350 D'coin</span>
      </div>
      <button class="btn-checkout" @click="goToPayment">Pesan Sekarang</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdukDetailView",
  methods: {
    goBack() {
      this.$router.push('/destinasi');
    },
    goToPayment() {
      // Sementara diarahkan ke halaman pembayaran topup untuk testing alur
      this.$router.push({ name: 'Pembayaran', params: { rupiah: 1350000, dcoin: 1350 } });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
.page { min-height: 100vh; background: #fcfcfd; color: #111827; position: relative; padding-bottom: 90px; }

/* Back Button Melayang */
.back-btn-float { position: absolute; top: 24px; left: 24px; z-index: 10; width: 44px; height: 44px; border-radius: 50%; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #111827; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s; }
.back-btn-float:hover { background: #ffffff; transform: scale(1.05); }
.back-btn-float svg { width: 24px; height: 24px; }

/* Hero Image Area */
.hero-image { position: relative; width: 100%; height: 350px; }
.hero-image img { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%); }

/* Main Content Area */
.detail-content { position: relative; max-width: 768px; margin: -40px auto 0; background: #ffffff; border-radius: 32px 32px 0 0; padding: 24px 24px 40px; box-shadow: 0 -10px 30px rgba(0,0,0,0.05); }
.drag-indicator { width: 40px; height: 5px; background: #e5e7eb; border-radius: 10px; margin: 0 auto 24px; }

/* Typography & Badges */
.badge { display: inline-block; background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
.package-title { font-size: 24px; font-weight: 800; line-height: 1.3; margin-bottom: 8px; }
.location { font-size: 13px; color: #6b7280; display: flex; align-items: center; gap: 6px; }
.icon-sm { width: 16px; height: 16px; color: #ef4444; }

/* Sections */
.section { margin-top: 32px; }
.section-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #111827; }
.description { font-size: 14px; color: #4b5563; line-height: 1.7; }

/* Facilities Grid */
.facility-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; }
.facility-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
.icon-box { width: 50px; height: 50px; background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.facility-item span { font-size: 12px; font-weight: 500; color: #4b5563; }

/* Itinerary Timeline */
.itinerary { margin-top: 20px; padding-left: 8px; }
.timeline-item { position: relative; padding-left: 24px; padding-bottom: 24px; border-left: 2px dashed #d1d5db; }
.timeline-item:last-child { border-left: 2px solid transparent; padding-bottom: 0; }
.timeline-dot { position: absolute; left: -7px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: #2563eb; border: 2px solid #eff6ff; }
.timeline-dot.end { background: #10b981; }
.timeline-content h4 { font-size: 15px; font-weight: 600; margin-bottom: 6px; color: #111827; line-height: 1; }
.timeline-content p { font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0; }

/* Checkout Bottom Bar */
.checkout-bar { position: fixed; bottom: 0; left: 0; width: 100%; background: #ffffff; padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 -4px 20px rgba(0,0,0,0.05); z-index: 100; }
.price-info { display: flex; flex-direction: column; }
.price-label { font-size: 11px; color: #6b7280; margin-bottom: 2px; }
.price-value { font-size: 18px; font-weight: 800; color: #111827; }
.price-dcoin { font-size: 11px; color: #2563eb; font-weight: 600; margin-top: 2px; }
.btn-checkout { background: #111827; color: #ffffff; border: none; padding: 14px 28px; border-radius: 16px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-checkout:hover { background: #374151; }

@media (max-width: 480px) {
  .facility-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .checkout-bar { padding: 16px; }
  .btn-checkout { padding: 14px 20px; }
}
</style>