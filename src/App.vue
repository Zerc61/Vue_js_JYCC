<template>
  <div id="app">
    <!-- Navbar Atas Elegan -->
    <nav v-if="showTopNav" class="top-nav">
      <div class="nav-container">
        <div class="brand">
          <img src="@/assets/scream 2.png" alt="Logo" class="nav-logo" v-if="getAsset('scream 2.png')" />
          <span>EAST JAVA TRAVELING</span>
        </div>
        <div class="nav-links">
          <router-link to="/dashboard" active-class="active-link">Home</router-link>
          <router-link to="/destinasi" active-class="active-link">Destinasi</router-link>
          <router-link to="/topup" active-class="active-link">Top Up</router-link>
          <router-link to="/profil" active-class="active-link">Profil</router-link>
        </div>
      </div>
    </nav>

    <!-- Transisi Halaman -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    showTopNav() {
      // Sembunyikan navbar di halaman login/register
      const hiddenPages = ['Login', 'Register', 'Pembayaran', 'Konfirmasi'];
      return !hiddenPages.includes(this.$route.name);
    }
  },
  methods: {
    getAsset(name) {
      try { return require(`@/assets/${name}`); } catch { return false; }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');

body { margin: 0; padding: 0; font-family: 'Montserrat', sans-serif; background-color: #f8fafc; }
#app { min-height: 100vh; }

/* Navbar Atas */
.top-nav {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}
.nav-container {
  max-width: 1200px; margin: 0 auto; padding: 16px 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.brand { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 16px; color: #1e293b; letter-spacing: 1px; }
.nav-logo { width: 30px; height: 30px; object-fit: contain; }
.nav-links { display: flex; gap: 32px; }
.nav-links a { text-decoration: none; color: #64748b; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: 0.2s; }
.nav-links a:hover { color: #1e293b; }
.nav-links a.active-link { color: #fbbf24; }

/* Animasi Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>