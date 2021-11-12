<template>
  <div>
    <h4 class="text-center">Novo grupo</h4>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="createGroup">
          <div class="form-group">
            <label>Nome</label>
            <input type="text" class="form-control" v-model="group.name" />
          </div>
          <div class="form-group">
            <label>Descrição</label>
            <textarea
              class="form-control"
              rows="6"
              v-model="group.description"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar grupo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: {},
    };
  },
  methods: {
    createGroup() {
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .post("/api/groups", this.group)
          .then((response) => {
            this.$router.push({ name: "groups" });
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!window.Laravel.isLoggedin) {
      window.location.href = "/";
    }
    next();
  },
};
</script>