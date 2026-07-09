<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <button class="back-btn" @click="goBack">⟵</button>
        <h1 class="title">Paket Liburan Populer</h1>
      </div>
    </header>

    <main class="container">
      <p class="subtitle">Pilih paket liburan tanpa ribet. Sudah termasuk penginapan, transportasi, kuliner, dan tiket wisata.</p>

      <div class="package-grid">
        <div v-for="pkg in packages" :key="pkg.id" class="package-card">
          <div class="package-media">
            <img :src="getAsset(pkg.image)" :alt="pkg.title" class="package-img" />
            <div class="package-badge">{{ pkg.duration }}</div>
          </div>

          <div class="package-body">
            <h3 class="package-title">{{ pkg.title }}</h3>
            <p class="package-desc">{{ pkg.desc }}</p>

            <div class="include-tags">
              <span class="tag"><i class="icon">⛺</i> Wisata</span>
              <span class="tag"><i class="icon">🏨</i> Hotel</span>
              <span class="tag"><i class="icon">🚗</i> Transport</span>
              <span class="tag"><i class="icon">🍲</i> Kuliner</span>
            </div>

            <div class="package-footer">
              <div class="price-section">
                <span class="price-label">Mulai dari</span>
                <span class="price-value">Rp {{ formatNum(pkg.price) }}</span>
              </div>
              <button class="btn-detail" @click="orderPackage">
                Detail Paket
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DestinasiView",
  data() {
    return {
      packages: [
        {
          id: 1,
          title: "Paket Jelajah Bromo Eksotis",
          desc: "Nikmati keindahan matahari terbit di Penanjakan, jelajahi kawah Bromo, dan hamparan Pasir Berbisik tanpa pusing memikirkan akomodasi.",
          price: 1350000,
          duration: "2 Hari 1 Malam",
          image: "batu.png" 
        },
        {
          id: 2,
          title: "Paket Liburan Keluarga Batu Malang",
          desc: "Paket lengkap mengunjungi Museum Angkut, Selecta, Jatim Park, lengkap dengan hotel berbintang dan kuliner khas Malang.",
          price: 2450000,
          duration: "3 Hari 2 Malam",
          image: "angkut.png"
        },
        {
          id: 3,
          title: "Paket Heritage & Kuliner Kota Tua",
          desc: "Menelusuri sejarah estetik Jawa Timur dikombinasikan dengan petualangan rasa kuliner legendaris yang dijamin halal.",
          price: 950000,
          duration: "Full Day Tour",
          image: "malang.png"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard');
    },
    getAsset(name) {
      try {
        return require(`@/assets/${name}`);
      } catch {
        return ""; 
      }
    },
    formatNum(num) {
      return new Intl.NumberFormat("id-ID").format(num);
    },
    // TYPO/ESLINT DIPERBAIKI DI SINI (Hapus pkg dari dalam kurung)
    orderPackage() {
      this.$router.push('/produkdetail');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
.page { min-height: 100vh; background: #fcfcfd; color: #111827; padding-bottom: 120px; }
.header { background: #ffffff; padding: 20px; border-bottom: 1px solid #f3f4f6; position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 16px; }
.back-btn { background: #f3f4f6; border: none; width: 40px; height: 40px; border-radius: 12px; font-size: 18px; font-weight: bold; color: #374151; cursor: pointer; transition: all 0.2s; }
.back-btn:hover { background: #e5e7eb; }
.title { font-size: 18px; font-weight: 700; }
.container { max-width: 1100px; margin: 24px auto; padding: 0 20px; }
.subtitle { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
.package-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 24px; }
@media (min-width: 768px) { .package-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .package-grid { grid-template-columns: repeat(3, 1fr); } }
.package-card { background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #f3f4f6; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02); display: flex; flex-direction: column; transition: transform 0.2s ease; }
.package-card:hover { transform: translateY(-4px); }
.package-media { position: relative; width: 100%; height: 200px; background: #f3f4f6; }
.package-img { width: 100%; height: 100%; object-fit: cover; }
.package-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(17, 24, 39, 0.8); color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; backdrop-filter: blur(4px); }
.package-body { padding: 20px; display: flex; flex-direction: column; flex-grow: 1; }
.package-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 8px; }
.package-desc { font-size: 13px; color: #6b7280; line-height: 1.5; margin-bottom: 16px; flex-grow: 1; }
.include-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
.tag { background: #f3f4f6; color: #4b5563; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
.package-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f3f4f6; }
.price-section { display: flex; flex-direction: column; }
.price-label { font-size: 11px; color: #9ca3af; }
.price-value { font-size: 16px; font-weight: 700; color: #111827; }
.btn-detail { background: #111827; color: #ffffff; border: none; padding: 10px 16px; border-radius: 14px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s ease; }
.btn-detail:hover { background: #374151; }
</style>