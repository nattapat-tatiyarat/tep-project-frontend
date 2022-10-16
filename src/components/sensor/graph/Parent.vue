<template>
  <router-view :key="key" />
</template>

<script>
export default {
  watch: {
    $route() {
      if (this.$route.path.includes("graph")) {
        this.key++;
      }
    },
  },
  data() {
    return {
      key: 0,
    };
  },
};
</script>
