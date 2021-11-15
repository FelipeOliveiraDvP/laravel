import router from "../routes";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, value) {
            state.user = value;
        },
    },
    actions: {
        login({ commit }, payload) {
            const { success, user } = { ...payload };

            if (success) {
                commit("SET_USER", user);
                commit("SET_AUTHENTICATED", true);

                router.push({ name: "dashboard" });
            }
        },
        logout({ commit }) {
            commit("SET_USER", {});
            commit("SET_AUTHENTICATED", false);

            router.push({ name: "login" });
        },
    },
};
