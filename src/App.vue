<template>
  <div id="app">
    <transition name="ultimate" mode="out-in" appear>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      // Jika tidak ada halaman sebelumnya, tidak usah animasi swipe
      if (!from) return;

      // Swipe left = masuk dari kanan
      if (to.query.swipe === "left") {
        document.documentElement.style.setProperty("--enter", "80px");
        document.documentElement.style.setProperty("--leave", "-80px");
      } 
      // Swipe right = masuk dari kiri
      else if (to.query.swipe === "right") {
        document.documentElement.style.setProperty("--enter", "-80px");
        document.documentElement.style.setProperty("--leave", "80px");
      }
      // Default = fade biasa
      else {
        document.documentElement.style.setProperty("--enter", "0px");
        document.documentElement.style.setProperty("--leave", "0px");
      }
    }
  }
};
</script>

<style>
/* Transisi masuk */
.ultimate-enter-from {
  opacity: 0;
  transform: translateX(var(--enter));
}

/* Transisi keluar */
.ultimate-leave-to {
  opacity: 0;
  transform: translateX(var(--leave));
}

/* Durasi & easing lebih halus */
.ultimate-enter-active,
.ultimate-leave-active {
  transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Default values */
:root {
  --enter: 0px;
  --leave: 0px;
}

/* Hilangkan overflow biar animasi bersih */
#app {
  overflow-x: hidden;
}
</style>
