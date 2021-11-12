<template>
  <div>
    <h4 class="text-center">Todos os grupos</h4>
    <br />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Data da criação</th>
          <th>Última alteração</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
          <td>{{ group.created_at }}</td>
          <td>{{ group.updated_at }}</td>
          <td>
            <div class="btn-group" role="group">
              <router-link
                :to="{ name: 'details', params: { id: book.id } }"
                class="btn btn-primary"
                >Editar
              </router-link>
              <button class="btn btn-danger" @click="deleteGroup(group.id)">
                Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      type="button"
      class="btn btn-info"
      @click="this.$router.push('/groups/create')"
    >
      Novo grupo
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
    };
  },
  created() {
    this.$axios.get("/sanctum/csrf-cookie").then((response) => {
      this.$axios
        .get("/api/groups")
        .then((response) => {
          this.groups = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  },
  methods: {
    deleteGroup(id) {
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .delete(`/api/groups/${id}`)
          .then((response) => {
            let i = this.groups.map((item) => item.id).indexOf(id); // find index of your object
            this.groups.splice(i, 1);
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