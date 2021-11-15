import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import Home from "@/js/views/Home";
import About from "@/js/views/About";
import Register from "@/js/views/Register";
import Login from "@/js/views/Login";
import Dashboard from "@/js/views/Dashboard";

import Groups from "@/js/components/groups/Groups";
import GroupCreate from "@/js/components/groups/GroupCreate";
import GroupDetails from "@/js/components/groups/GroupDetails";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Home,
    },
    {
        name: "about",
        path: "/about",
        component: About,
    },
    {
        name: "register",
        path: "/register",
        component: Register,
    },
    {
        name: "login",
        path: "/login",
        component: Login,
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
        meta: {
            auth: "admin",
        },
    },
    {
        name: "groups",
        path: "/groups",
        component: Groups,
        meta: {
            auth: "admin",
        },
    },
    {
        name: "groupCreate",
        path: "/groups/create",
        component: GroupCreate,
        meta: {
            auth: "admin",
        },
    },
    {
        name: "groupDetails",
        path: "/groups/details/:id",
        component: GroupDetails,
        meta: {
            auth: "admin",
        },
    },
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

router.beforeEach((to, from, next) => {
    const isLogged = store.state.auth.authenticated;

    if (!isLogged && to.meta.auth === "admin") {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
