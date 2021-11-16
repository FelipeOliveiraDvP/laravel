<template>
  <b-container>
    <div class="d-flex justify-content-between mb-3">
      <h3>Novo grupo</h3>
      <router-link to="/groups" class="btn btn-secondary">Voltar</router-link>
    </div>

    <b-overlay :show="processing">
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
            <button type="submit" class="btn btn-primary">
              Cadastrar grupo
            </button>
          </form>
        </div>
      </div>
    </b-overlay>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      group: {
        name: "",
        description: "",
      },
      processing: false,
    };
  },
  methods: {
    createGroup() {
      this.processing = true;
      axios
        .post("/api/groups", this.group)
        .then(({ data }) => {
          this.$router.push({ name: "groups" });
        })
        .catch(({ response: { data } }) => {
          alert(data.message);
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>