<template>
  <b-container>
    <div class="d-flex justify-content-between mb-3">
      <h3>Novo usuário</h3>
      <router-link to="/users" class="btn btn-secondary">Voltar</router-link>
    </div>

    <b-overlay :show="processing">
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="createUser">
            <div class="form-group">
              <label>Nome</label>
              <input type="text" class="form-control" v-model="user.name" />
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input type="email" class="form-control" v-model="user.email" />
            </div>
            <div class="form-group">
              <label>Login</label>
              <input type="text" class="form-control" v-model="user.login" />
            </div>
            <div class="form-group">
              <label>Senha</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
              />
            </div>
            <div class="form-group">
              <label>Grupo</label>
              <GroupSelect @change="handleChange" />
            </div>
            <button type="submit" class="btn btn-primary">
              Cadastrar usuário
            </button>
          </form>
        </div>
      </div>
    </b-overlay>
  </b-container>
</template>

<script>
import GroupSelect from "../groups/GroupSelect.vue";

export default {
  components: {
    GroupSelect,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        login: "",
        password: "",
        group_id: "",
      },
      processing: false,
    };
  },
  methods: {
    handleChange(value) {
      this.user.group_id = value;
    },
    createUser() {
      this.processing = true;
      axios
        .post("/api/users", this.user)
        .then(({ data }) => {
          this.$router.push({ name: "users" });
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