<template>
  <div class="container">
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
                <label for="name" class="col-sm-4 col-form-label text-md-right"
                  >Nome</label
                >
                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    v-model="name"
                    required
                    autofocus
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="login" class="col-sm-4 col-form-label text-md-right"
                  >Login</label
                >
                <div class="col-md-6">
                  <input
                    id="login"
                    type="text"
                    class="form-control"
                    v-model="login"
                    required
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-sm-4 col-form-label text-md-right"
                  >E-Mail</label
                >
                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    v-model="email"
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
                    v-model="password"
                    autocomplete="off"
                  />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      login: "",
      password: "",
      group_id: 1,
      error: null,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios
            .post("api/register", {
              name: this.name,
              email: this.email,
              login: this.login,
              group_id: this.group_id,
              password: this.password,
            })
            .then((response) => {
              if (response.data.success) {
                window.location.href = "/login";
              } else {
                this.error = response.data.message;
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        });
      }
    },
  },
};
</script>