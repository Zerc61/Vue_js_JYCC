import { createRouter, createWebHistory } from "vue-router";

import login from "@/pages/login.vue";
import registerView from "@/pages/register.vue";
import dashboardView from "@/pages/dashboard.vue";
import profilView from "@/pages/profil.vue";
import topupView from "@/pages/topup.vue";
import isisaldoView from "@/pages/isisaldo.vue";
import pembayaranPage from "@/pages/pembayaran.vue";
import destinasiView from "@/pages/destinasi.vue";
import produkDetailView from "@/pages/produkdetail.vue"; // Rute baru

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", name: "Login", component: login },
  { path: "/register", name: "Register", component: registerView },
  { path: "/dashboard", name: "Dashboard", component: dashboardView },
  
  { path: "/explore", redirect: "/dashboard" },
  { path: "/promo", redirect: "/dashboard" },
  { path: "/wishlist", redirect: "/dashboard" },

  { path: "/profil", name: "Profil", component: profilView, meta: { requiresAuth: true } },
  { path: "/topup", name: "Topup", component: topupView, meta: { requiresAuth: true } },
  { path: "/isisaldo", name: "IsiSaldo", component: isisaldoView, meta: { requiresAuth: true } },
  { path: "/pembayaran", name: "Pembayaran", component: pembayaranPage, meta: { requiresAuth: true } },
  { path: "/destinasi", name: "PaketWisata", component: destinasiView, meta: { requiresAuth: true } },
  { path: "/produkdetail", name: "ProdukDetail", component: produkDetailView, meta: { requiresAuth: true } }, // Daftarkan di sini
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("token");

  if (requiresAuth && !isAuthenticated) {
    alert("Silakan Login terlebih dahulu untuk melanjutkan.");
    next("/login"); 
  } else if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;