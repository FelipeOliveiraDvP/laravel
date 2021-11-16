<template>
  <div class="container">
    <b-overlay :show="processing">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="alert alert-danger" role="alert" v-if="error !== null">
            {{ error }}
          </div>

          <div class="card card-default">
            <div class="card-header">Cadastre-se</div>
            <div class="card-body">
              <form>
                <div class="form-group row">
                  <label
                    for="name"
                    class="col-sm-4 col-form-label text-md-right"
                    >Nome</label
                  >
                  <div class="col-md-6">
                    <input
                      id="name"
                      type="text"
                      class="form-control"
                      v-model="user.name"
                      required
                      autofocus
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="login"
                    class="col-sm-4 col-form-label text-md-right"
                    >Login</label
                  >
                  <div class="col-md-6">
                    <input
                      id="login"
                      type="text"
                      class="form-control"
                      v-model="user.login"
                      required
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="email"
                    class="col-sm-4 col-form-label text-md-right"
                    >E-Mail</label
                  >
                  <div class="col-md-6">
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      v-model="user.email"
                      required
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="password"
                    class="col-md-4 col-form-label text-md-right"
                    >Senha</label
                  >
                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      v-model="user.password"
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="group_id"
                    class="col-md-4 col-form-label text-md-right"
                    >Grupo</label
                  >
                  <div class="col-md-6">
                    <GroupSelect id="group_id" @change="handleChange" />
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="handleSubmit"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import GroupSelect from "../components/groups/GroupSelect.vue";

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
        group_id: null,
      },
      error: null,
      processing: false,
    };
  },
  methods: {
    handleChange(value) {
      this.user.group_id = value;
    },
    async handleSubmit(e) {
      e.preventDefault();

      if (this.user.password.length > 0) {
        this.processing = true;
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios
            .post("api/register", this.user)
            .then((response) => {
              if (response.data.success) {
                this.$router.push({ name: "login" });
              } else {
                this.error = response.data.message;
              }
            })
            .catch(function (error) {
              this.error = error;
            })
            .finally(() => {
              this.processing = false;
            });
        });
      } else {
        this.error = "Senha muito fraca!";
      }
    },
  },
};
</script>