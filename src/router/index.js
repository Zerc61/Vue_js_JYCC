import { createRouter, createWebHistory } from 'vue-router';

import login from "@/pages/login.vue";
import registerView from "@/pages/register.vue";
import dashboardView from "@/pages/dashboard.vue";
import topupView from "@/pages/topup.vue";
import isisaldoView from "@/pages/isisaldo.vue";
import konfirmasiView from "@/pages/konfirmasi.vue";
import pembayaranPage from "@/pages/pembayaran.vue";
import QrisPage from '@/pages/qris.vue';
import adminDashboard from "@/pages/admin/admindashboard.vue";
import AdminUser from "@/pages/admin/AdminUser.vue";

const routes = [
    { path: '/', redirect: '/login' },

    { path: '/login', name: 'Login', component: login },
    { path: '/register', name: 'Register', component: registerView },

    { path: '/dashboard', name: 'Dashboard', component: dashboardView },

    { path: '/topup', name: 'Topup', component: topupView },
    { path: '/isisaldo', name: 'IsiSaldo', component: isisaldoView },

    { path: '/konfirmasi', name: 'Konfirmasi', component: konfirmasiView,
        props: route => ({
            rupiah: route.params.rupiah,
            displayRupiah: route.params.displayRupiah,
            dcoin: route.params.dcoin
        })
    },

    { path: '/pembayaran', name: 'Pembayaran', component: pembayaranPage},

    { path: '/pembayaran/qris', name: 'Qris', component: QrisPage},

    // Admin routes
    { path: '/admin', name: 'AdminDashboard', component: adminDashboard },
    { path: '/admin/users', name: 'AdminUser', component: AdminUser },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
