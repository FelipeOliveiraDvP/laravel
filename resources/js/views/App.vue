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
      <div class="navbar-nav" v-if="isLoggedIn">
        <router-link to="/dashboard" class="nav-item nav-link"
          >Dashboard</router-link
        >
        <router-link to="/groups" class="nav-item nav-link">Grupos</router-link>
        <a
          class="nav-item nav-link text-danger"
          style="cursor: pointer"
          @click="logout"
          >Sair</a
        >
      </div>
      <!-- for non-logged user-->
      <div class="navbar-nav" v-else>
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/login" class="nav-item nav-link">login</router-link>
        <router-link to="/register" class="nav-item nav-link"
          >Cadastrar</router-link
        >
        <router-link to="/about" class="nav-item nav-link">Sobre nós</router-link>
      </div>
    </nav>
    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    if (window.Laravel.isLoggedin) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout(e) {
      console.log("ss");
      e.preventDefault();
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .post("/api/logout")
          .then((response) => {
            if (response.data.success) {
              window.location.href = "/";
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    },
  },
};
</script>