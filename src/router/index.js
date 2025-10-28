import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import NotFound from "../views/NotFound.vue";
import Dashboard from "../views/Dashboard.vue";
import Ticket from "../views/Ticket.vue";
import ProtectedRoute from "../components/ProtectedRoute.vue";
import AppLayOut from "../components/AppLayOut.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/signup",
            name: "signup",
            component: Signup,
        },
        {
            path: "/dashboard",
            component: ProtectedRoute,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "",
                    component: AppLayOut,
                    children: [
                        {
                            path: "",
                            name: "dashboard",
                            component: Dashboard,
                        },
                        {
                            path: "tickets",
                            name: "tickets",
                            component: Ticket,
                        },
                    ],
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            name: "notfound",
            component: NotFound,
        },
    ],
});

export default router;
