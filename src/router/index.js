import { createRouter, createWebHistory } from 'vue-router';
import login from "@/pages/login.vue";
import registerView from "@/pages/register.vue";
import dashboardView from "@/pages/dashboard.vue";
import topupView from "@/pages/topup.vue";

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: registerView },
    { path: '/dashboard', component: dashboardView },
    { path: '/topup', component: topupView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
