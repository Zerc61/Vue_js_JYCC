import { createRouter, createWebHistory } from 'vue-router';

import login from "@/pages/login.vue";
import registerView from "@/pages/register.vue";
import dashboardView from "@/pages/dashboard.vue";
import topupView from "@/pages/topup.vue";
import isisaldoView from "@/pages/isisaldo.vue";
import konfirmasiView from "@/pages/konfirmasi.vue";
import PembayaranView from "@/pages/pembayaran.vue";

// Admin Pages
import adminDashboard from "@/pages/admin/admindashboard.vue";
import AdminUser from "@/pages/admin/AdminUser.vue";
import AdminUmkm from "@/pages/admin/AdminUmkm.vue";

import HargaEmasView from "@/pages/HargaEmasView.vue";

const routes = [
  { path: "/", redirect: "/login" },

<<<<<<< HEAD
  { path: "/login", name: "Login", component: login },
  { path: "/register", name: "Register", component: registerView },
=======
    { path: '/login', component: login },
    { path: '/register', component: registerView },
    { path: '/dashboard', component: dashboardView },
    { path: '/topup', component: topupView },
    { path: '/isisaldo', component: isisaldoView },
    { path: '/konfirmasi', component: konfirmasiView },

    // Admin Pages
    { path: '/admin', component: adminDashboard },
    { path: '/admin/users', component: AdminUser },

    
    // NEW: Harga Emas
    { path: "/harga-emas", component: HargaEmasView },


    { path: '/login', name: 'Login', component: login },
    { path: '/register', name: 'Register', component: registerView },
>>>>>>> 3cc69872caa383faa299858296082c8f2ac33430

  { path: "/dashboard", name: "Dashboard", component: dashboardView },

  { path: "/topup", name: "Topup", component: topupView },
  { path: "/isisaldo", name: "IsiSaldo", component: isisaldoView },

  {
    path: "/konfirmasi",
    name: "Konfirmasi",
    component: konfirmasiView,
    props: (route) => ({
      rupiah: route.params.rupiah,
      displayRupiah: route.params.displayRupiah,
      dcoin: route.params.dcoin,
    }),
  },

<<<<<<< HEAD
  { path: "/pembayaran", name: "Pembayaran", component: PembayaranView },

  // Admin routes
  { path: "/admin", name: "AdminDashboard", component: adminDashboard },
  { path: "/admin/users", name: "AdminUser", component: AdminUser },
  { path: "/admin/umkms", name: "AdminUmkm", component: AdminUmkm },
=======
    // Admin routes
    { path: '/admin', name: 'AdminDashboard', component: adminDashboard },
    { path: '/admin/users', name: 'AdminUser', component: AdminUser },

>>>>>>> 3cc69872caa383faa299858296082c8f2ac33430
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
