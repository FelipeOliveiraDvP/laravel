<template>
  <div class="container">
    <div class="text-center">
      <router-link to="/" class="nav-item nav-link">
        <img
          src="https://analytics.creditcash.com.br/Content/Images/CreditCash/logofull-new-500x500.png"
          style="max-width: 300px"
        />
      </router-link>
    </div>

    <nav class="navbar navbar-light bg-light">
      <!-- for logged-in user-->
      <div class="navbar-nav" v-if="authenticated">
        <router-link to="/dashboard" class="nav-item nav-link"
          >Dashboard</router-link
        >
        <router-link to="/groups" class="nav-item nav-link">Grupos</router-link>
        <button type="button" class="btn btn-danger" @click="logout">
          Sair
        </button>
      </div>
      <!-- for non-logged user-->
      <div class="navbar-nav" v-else>
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/login" class="nav-item nav-link">login</router-link>
        <router-link to="/register" class="nav-item nav-link"
          >Cadastrar</router-link
        >
        <router-link to="/about" class="nav-item nav-link"
          >Sobre nós</router-link
        >
      </div>
    </nav>
    <br />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    authenticated() {
      return this.$store.state.auth.authenticated;
    },
  },
  watch: {
    authenticated(newValue, oldValue) {
      return this.$store.state.auth.authenticated;
    },
  },
  methods: {
    ...mapActions({
      signOut: "auth/logout",
    }),
    logout() {
      this.signOut();
    },
  },
};
</script>