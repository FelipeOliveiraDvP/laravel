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
    },
    {
        name: "groups",
        path: "/groups",
        component: Groups,
    },
    {
        name: "groupCreate",
        path: "/groups/create",
        component: GroupCreate,
    },
    {
        name: "groupDetails",
        path: "/groups/details/:id",
        component: GroupDetails,
    },
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

export default router;
