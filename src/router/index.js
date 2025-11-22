import { createRouter, createWebHistory } from "vue-router";

// User Pages
import login from "@/pages/login.vue";
import registerView from "@/pages/register.vue";

import dashboardView from "@/pages/dashboard.vue";
import profilView from "@/pages/profil.vue";
import umkmfashion from "@/pages/fashion.vue";
import produkdetailView from "@/pages/produkdetail.vue"; // HEAD
import exploreView from "@/pages/explore.vue"; // Incoming

import topupView from "@/pages/topup.vue";
import isisaldoView from "@/pages/isisaldo.vue";
import konfirmasiView from "@/pages/konfirmasi.vue"; // Incoming

import pembayaranPage from "@/pages/pembayaran.vue";
import QrisPage from "@/pages/qris.vue";
import BcaPage from "@/pages/bca.vue";
import MandiriPage from "@/pages/mandiri.vue";
import BriPage from "@/pages/bri.vue";
import CimbNiagaPage from "@/pages/cimbniaga.vue";
import TransaksiBerhasil from "@/pages/transaksiberhasil.vue";
import TransaksiBerhasilBCA from "@/pages/transaksiberhasilBCA.vue";
import TransaksiBerhasilBRI from "@/pages/transaksiberhasilBRI.vue";
import TransaksiBerhasilMANDIRI from "@/pages/transaksiberhasilMANDIRI.vue";
import TransaksiBerhasilCIMBNIAGA from "@/pages/transaksiberhasilCIMBNIAGA.vue";

// Admin Pages
import adminDashboard from "@/pages/admin/admindashboard.vue";
import AdminUser from "@/pages/admin/AdminUser.vue";
import AdminUmkm from "@/pages/admin/AdminUmkm.vue";

// Other
import HargaEmasView from "@/pages/HargaEmasView.vue";

const routes = [
  { path: "/", redirect: "/login" },

  // Auth
  { path: "/login", name: "Login", component: login },
  { path: "/register", name: "Register", component: registerView },

  // User & Exploration
  { path: "/dashboard", name: "Dashboard", component: dashboardView },
  
  // Merged: Using UmkmFashion and Explore for better context
  { path: "/umkmfashion", name: "UmkmFashion", component: umkmfashion }, 
  { path: "/explore", name: "Explore", component: exploreView }, 
  { path: "/produkdetail", name: "ProdukdetailPage", component: produkdetailView },

  { path: "/profil", name: "Profil", component: profilView },
  { path: "/topup", name: "Topup", component: topupView },
  { path: "/isisaldo", name: "IsiSaldo", component: isisaldoView },

  // Payment Confirmation Step (Added from Incoming)
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

  { path: "/pembayaran", name: "Pembayaran", component: pembayaranPage },
  { path: "/pembayaran/qris", name: "Qris", component: QrisPage },
  { path: "/pembayaran/bca", name: "BcaPage", component: BcaPage },
  { path: "/pembayaran/mandiri", name: "MandiriPage", component: MandiriPage },
  { path: "/pembayaran/bri", name: "BriPage", component: BriPage },
  { path: "/pembayaran/cimbniaga", name: "CimbNiaga", component: CimbNiagaPage },

  // Success Pages
  { path: "/transaksiberhasil/:dcoin/:rupiah/:metode", name: "TransaksiBerhasil", component: TransaksiBerhasil, props: true, },

  { path: "/transaksiberhasilBCA", name: "TransaksiBerhasilBca", component: TransaksiBerhasilBCA },
  { path: "/transaksiberhasilBRI", name: "TransaksiBerhasilBri", component: TransaksiBerhasilBRI, props: true, },
  { path: "/transaksiberhasilMANDIRI", name: "TransaksiBerhasilMandiri", component: TransaksiBerhasilMANDIRI, props: true, },
  { path: "/transaksiberhasilCUMBNIAGA", name: "TransaksiBerhasilCimbNiaga", component: TransaksiBerhasilCIMBNIAGA, props: true, },

  // Admin
  { path: "/admin", name: "AdminDashboard", component: adminDashboard },
  { path: "/admin/users", name: "AdminUser", component: AdminUser },
  { path: "/admin/umkms", name: "AdminUmkm", component: AdminUmkm },

  // Other
  { path: "/harga-emas", name: "HargaEmas", component: HargaEmasView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;