<template>
  <b-container>
    <b-overlay :show="processing">
      <div class="d-flex justify-content-between mb-3">
        <h3>Editar grupo "{{ group.name }}"</h3>
        <router-link to="/groups" class="btn btn-secondary">Voltar</router-link>
      </div>

      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="updateGroup(groupId)">
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
              Salvar alterações
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
  computed: {
    groupId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.getGroup(this.groupId);
  },
  methods: {
    getGroup(id) {
      this.processing = true;
      axios
        .get(`/api/groups/${id}`)
        .then(({ data }) => {
          this.group = { ...data };
        })
        .catch(({ response: { data } }) => {
          alert(data.message);
        })
        .finally(() => {
          this.processing = false;
        });
    },
    updateGroup(id) {
      this.processing = true;
      axios
        .put(`/api/groups/${id}`, this.group)
        .then(() => {
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