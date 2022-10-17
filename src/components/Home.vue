<template>
  <v-app
    :style="$vuetify.theme.dark ? '' : 'background-color: rgb(245, 245, 245)'"
  >
    <v-main>
      <Navigation v-if="login" class="navigation" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";

export default {
  name: "Home",
  components: { Navigation },
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
  mounted() {
    if (!window.localStorage.getItem("login") && this.$route.path != "/login") {
      this.$awn.alert("Authentication required");
      this.$router.push("/login");
    }
  },
  computed: {
    login() {
      return this.$route.path == "/login" ? false : true;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
@import "~vue-awesome-notifications/dist/styles/style.css";
</style>
