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
    $route(to) {
      if (to.query.swipe === "left") {
        document.documentElement.style.setProperty("--enter", "60px");
        document.documentElement.style.setProperty("--leave", "-60px");
      } else {
        document.documentElement.style.setProperty("--enter", "-60px");
        document.documentElement.style.setProperty("--leave", "60px");
      }
    }
  }
};
</script>

<style>
.ultimate-enter-from {
  opacity: 0;
  transform: translateX(var(--enter));
}

.ultimate-leave-to {
  opacity: 0;
  transform: translateX(var(--leave));
}

.ultimate-enter-active,
.ultimate-leave-active {
  transition: 0.35s ease;
}

/* DEFAULT */
:root {
  --enter: 0px;
  --leave: 0px;
}
</style>
