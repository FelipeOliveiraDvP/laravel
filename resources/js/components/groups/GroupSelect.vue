<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      :disabled="processing"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  name: "GroupSelect",
  data() {
    return {
      selected: null,
      processing: false,
      options: [],
    };
  },
  methods: {
    async getGroups() {
      this.processing = false;

      await axios.get("/sanctum/csrf-cookie");
      axios
        .get("/api/groups")
        .then(({ data }) => {
          console.log(data);
          this.options = data;
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

<style>
</style>