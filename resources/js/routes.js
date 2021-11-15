import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/js/views/Home";
import About from "@/js/views/About";
import Register from "@/js/views/Register";
import Login from "@/js/views/Login";
import Dashboard from "@/js/views/Dashboard";

import Groups from "@/js/components/groups/Groups";
import GroupCreate from "@/js/components/groups/GroupCreate";
import GroupDetails from "@/js/components/groups/GroupDetails";
import store from "./store";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Home,
        meta: {
            auth: "guest",
        },
    },
    {
        name: "about",
        path: "/about",
        component: About,
        meta: {
            auth: "guest",
        },
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            auth: "public",
        },
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            auth: "public",
        },
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
    // document.title = `${to.name} - ${process.env.MIX_APP_NAME}`;
    const isLogged = store.state.auth.authenticated;

    if (isLogged) {
        switch (to.meta.auth) {
            case "admin":
                if (isLogged) {
                    next();
                } else {
                    next({ name: "login" });
                }
                break;
            case "public":
                next({ name: "dashboard" });
                break;
        }
    } else {
        next();
    }
});

export default router;
