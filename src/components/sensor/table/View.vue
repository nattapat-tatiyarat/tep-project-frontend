<template>
  <div class="view-page">
    <v-container class="container">
      <Title title="Sensor Data" />
      <v-card class="sensor-table"><SensorTable /></v-card>
    </v-container>
  </div>
</template>

<script>
import Title from "@/components/utils/Title.vue";
import SensorTable from "@/components/sensor/table/Table.vue";

export default {
  components: {
    Title,
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
.sensor-table {
  margin-top: 10px;
}
</style>
