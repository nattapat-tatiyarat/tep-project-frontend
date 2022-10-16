<template>
  <v-app class="body">
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

<style scoped>
.body {
  background-color: hsl(0, 0%, 98%);
}
.navigation {
  position: static;
}
</style>
