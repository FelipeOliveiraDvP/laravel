<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      :disabled="processing"
      @change="onChange"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  name: "GroupSelect",
  props: ["handleChange"],
  data() {
    return {
      selected: null,
      processing: false,
      options: [],
    };
  },
  async created() {
    await this.getGroups();
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    async getGroups() {
      this.processing = false;

      // await axios.get("/sanctum/csrf-cookie");
      axios
        .get("/api/groups")
        .then(({ data }) => {
          const options = data.map((option) => ({
            value: option.id,
            text: option.name,
          }));

          this.options = options;
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