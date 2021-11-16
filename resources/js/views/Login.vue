<template>
  <div class="container">
    <b-overlay :show="processing">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="alert alert-danger" role="alert" v-if="error !== null">
            {{ error }}
          </div>

          <div class="card card-default">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form>
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
                      v-model="auth.email"
                      required
                      autofocus
                      autocomplete="off"
                      :disabled="processing"
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
                      v-model="auth.password"
                      required
                      autocomplete="off"
                      :disabled="processing"
                    />
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="login"
                      :disabled="processing"
                    >
                      Entrar
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
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      error: null,
      processing: false,
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    async login() {
      this.processing = true;
      await axios.get("/sanctum/csrf-cookie");
      await axios
        .post("/api/login", this.auth)
        .then(({ data }) => {
          if (data.success) {
            this.signIn(data);
          } else {
            this.error = data.message;
          }
        })
        .catch(({ response: { data } }) => {
          this.error = data.message;
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>