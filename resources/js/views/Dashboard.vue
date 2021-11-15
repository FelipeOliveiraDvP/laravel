<template>
  <div>Welcome {{ user.name }}</div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user: this.$store.state.auth.user,
    };
  },
};
</script>