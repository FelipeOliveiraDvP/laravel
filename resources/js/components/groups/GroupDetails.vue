<template>
  <div>
    <h4 class="text-center">Editar grupo</h4>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateGroup">
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
          <button type="submit" class="btn btn-primary">Salvar</button>
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
  created() {
    this.$axios.get("/sanctum/csrf-cookie").then((response) => {
      this.$axios
        .get(`/api/groups/${this.$route.params.id}`)
        .then((response) => {
          this.group = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  },
  methods: {
    updateGroup() {
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .put(`/api/groups/${this.$route.params.id}`, this.group)
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