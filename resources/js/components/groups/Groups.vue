<template>
  <b-container>
    <div class="d-flex justify-content-between mb-3">
      <h3>Todos os grupos</h3>
      <router-link to="/groups/create" class="btn btn-primary"
        >Novo grupo
      </router-link>
    </div>

    <b-overlay :show="processing">
      <b-table striped hover responsive :items="groups" :fields="headers">
        <template #cell(actions)="data">
          <div class="btn-group" role="group">
            <router-link
              :to="'/groups/details/' + data.item.id"
              class="btn btn-primary"
              >Editar
            </router-link>
            <button class="btn btn-danger" @click="onSelectGroup(data.item)">
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
          <div class="mb-3">Carregando...</div>
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
              >Deseja realmente excluir o grupo "{{
                selectedGroup ? selectedGroup.name : ""
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
      groups: [],
      selectedGroup: null,
      showConfirm: false,
      processing: false,
      headers: [
        {
          key: "name",
          label: "Nome",
        },
        {
          key: "description",
          label: "Descrição",
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
    await this.getGroups();
  },
  methods: {
    async getGroups() {
      this.processing = true;
      await axios
        .get("/api/groups")
        .then(({ data }) => {
          this.groups = data;
        })
        .catch(({ response: { data } }) => {
          alert(data.message);
        })
        .finally(() => {
          this.processing = false;
        });
    },
    onSelectGroup(group) {
      this.selectedGroup = { ...group };
      this.showConfirm = true;
    },
    async onOk() {
      await this.deleteGroup(this.selectedGroup.id);
      
      this.showConfirm = false;
      this.selectedGroup = null;
    },
    onCancel() {
      this.showConfirm = false;
      this.selectedGroup = null;
    },
    async deleteGroup(id) {
      this.processing = true;
      await axios
        .delete(`/api/groups/${id}`)
        .then(async () => {
          await this.getGroups();
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