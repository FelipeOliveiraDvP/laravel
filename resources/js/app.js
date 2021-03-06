import "./bootstrap";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";

import App from "@/js/views/App";
import router from "@/js/routes";
import store from "@/js/store";

import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.prototype.$axios = axios;

window.onload = function () {
    const app = new Vue({
        el: "#app",
        router,
        store,
        render: (h) => h(App),
    });
};

export default app;
