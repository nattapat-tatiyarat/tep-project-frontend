<template>
  <div class="view-page">
    <v-container class="container">
      <v-card><SensorTable /></v-card>
    </v-container>
  </div>
</template>

<script>
import SensorTable from "@/components/sensor/table/Table.vue";

export default {
  components: {
    SensorTable,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.view-page {
  margin: 30px 0;
}
.container {
  padding: 0 5%;
}
</style>
