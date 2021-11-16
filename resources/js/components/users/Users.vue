<template>
  <b-container>
    <div class="d-flex justify-content-between mb-3">
      <h3>Usuários do sistema</h3>
      <router-link to="/users/create" class="btn btn-primary"
        >Novo usuário
      </router-link>
    </div>

    <b-overlay :show="processing">
      <b-table striped hover responsive :items="users" :fields="headers">
        <template #cell(actions)="data">
          <div class="btn-group" role="group">
            <router-link
              :to="'/users/details/' + data.item.id"
              class="btn btn-primary"
              >Editar
            </router-link>
            <button class="btn btn-danger" @click="onSelectUser(data.item)">
              Excluir
            </button>
          </div>
        </template></b-table
      >
    </b-overlay>

    <b-overlay :show="showConfirm" no-wrap>
      <template #overlay>
        <div
          v-if="processing"
          class="text-center p-4 bg-primary text-light rounded"
        >
          <div class="mb-3">Removendo usuário...</div>
        </div>
        <div
          v-else
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p>
            <strong id="form-confirm-label"
              >Deseja realmente excluir o usuário "{{
                selectedUser ? selectedUser.name : ""
              }}"?</strong
            >
          </p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancelar
            </b-button>
            <b-button variant="outline-success" @click="onOk">Excluir</b-button>
          </div>
        </div>
      </template>
    </b-overlay>
  </b-container>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      showConfirm: false,
      processing: false,
      headers: [
        {
          key: "name",
          label: "Nome",
        },
        {
          key: "email",
          label: "E-mail",
        },
        {
          key: "login",
          label: "Login",
        },
        {
          key: "user_group",
          label: "Grupo",
        },
        {
          key: "created_at",
          label: "Data da criação",
          formatter(value, key, item) {
            return moment(value).format("D/M/Y");
          },
        },
        {
          key: "updated_at",
          label: "Data de edição",
          formatter(value, key, item) {
            return moment(value).format("D/M/Y");
          },
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      this.processing = true;
      await axios
        .get("/api/users")
        .then(({ data }) => {
          this.users = data;
        })
        .catch(({ response: { data } }) => {
          alert(data.message);
        })
        .finally(() => {
          this.processing = false;
        });
    },
    onSelectUser(user) {
      this.selectedUser = { ...user };
      this.showConfirm = true;
    },
    async onOk() {
      await this.deleteUser(this.selectedUser.id);

      this.showConfirm = false;
      this.selectedUser = null;
    },
    onCancel() {
      this.showConfirm = false;
      this.selectedUser = null;
    },
    async deleteUser(id) {
      this.processing = true;
      await axios
        .delete(`/api/users/${id}`)
        .then(async () => {
          await this.getUsers();
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