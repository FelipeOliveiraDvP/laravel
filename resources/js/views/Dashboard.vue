<template>
  <b-container>
    <b-jumbotron
      header="Dashboard"
      lead="Somente usuários logados podem visualizar essa página"
    >
      <p>Lorem ipsum dolor sit amet</p>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user: this.$store.state.auth.user,
    };
  },
};
</script>