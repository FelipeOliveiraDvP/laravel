<template>
  <b-container id="site" class="p-0" fluid>
    <!-- Navbar -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <router-link to="/">
        <b-navbar-brand>Vue JS | Laravel</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- User logged in -->
        <b-navbar-nav class="ml-auto" v-if="authenticated">
          <router-link to="/dashboard" class="nav-item nav-link">
            Dashboard
          </router-link>

          <b-nav-item-dropdown text="Grupos" right>
            <router-link to="/groups" class="dropdown-item">
              Todos os grupos
            </router-link>
            <router-link to="/groups/create" class="dropdown-item">
              Novo grupo
            </router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Usuários" right>
            <router-link to="/users" class="dropdown-item">
              Todos os usuários
            </router-link>
            <router-link to="/users/create" class="dropdown-item">
              Novo usuário
            </router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Produtos" right>
            <router-link to="/products" class="dropdown-item">
              Todos os produtos
            </router-link>
            <router-link to="/products/create" class="dropdown-item">
              Novo produto
            </router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Compras" right>
            <router-link to="/purchases" class="dropdown-item">
              Todas as compras
            </router-link>
            <router-link to="/purchases/create" class="dropdown-item">
              Nova compra
            </router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.name }}</em>
            </template>
            <router-link to="/profile" class="dropdown-item">
              Minha conta
            </router-link>

            <b-dropdown-item
              class="text-danger"
              href="javascript:void(0)"
              @click="logout"
            >
              Sair
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Non logged user -->
        <b-navbar-nav class="ml-auto" v-else>
          <router-link class="nav-item nav-link" to="/"> Home </router-link>

          <router-link class="nav-item nav-link" to="/about">
            Sobre nós
          </router-link>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Entre ou cadastre-se</em>
            </template>
            <router-link to="/login" class="dropdown-item"> Login </router-link>
            <router-link to="/register" class="dropdown-item">
              Cadastre-se
            </router-link>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- /Navbar -->

    <div id="site-content">
      <router-view />
    </div>

    <!-- Footer -->
    <b-container fluid class="p-3 text-center bg-light">
      Desenvolvido por Felipe de Oliveira - 2021&copy;
    </b-container>
    <!-- /Footer -->
  </b-container>
</template>

<style lang="css" scoped>
#site {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
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