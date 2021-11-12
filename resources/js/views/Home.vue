<template>
  <div>
    <h1>Home Vue</h1>
    <!-- Try Bootstrap -->
    <div class="alert alert-primary" role="alert">Testando o vue router!</div>
    <!-- Try bootstrap-vue -->
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text> Home.vue </b-card-text>

      <router-link to="/contact">
        <b-button variant="primary"> Ir para o contato </b-button>
      </router-link>
    </b-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>