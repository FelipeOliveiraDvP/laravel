import "./bootstrap";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/js/views/App";
import router from "@/js/routes";

import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

window.onload = function () {
    const app = new Vue({
        el: "#app",
        router,
        render: (h) => h(App),
    });
};

export default app;
