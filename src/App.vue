<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  watch: {
    $route() {
      if (
        !window.localStorage.getItem("login") &&
        this.$route.path != "/login"
      ) {
        this.$awn.alert("Authentication required");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
@import "~vue-awesome-notifications/dist/styles/style.css";
</style>
