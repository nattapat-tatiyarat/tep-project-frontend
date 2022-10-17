<template>
  <div class="view-page">
    <v-container class="container">
      <LastSync :key="lastSyncKey" @fetch="lastSync" />
      <v-card class="mt-8"><SensorTable /></v-card>
    </v-container>
  </div>
</template>

<script>
import { formatDateText } from "@/utils/formatDate";
import LastSync from "@/components/utils/LastSync.vue";
import SensorTable from "@/components/sensor/table/Table.vue";

export default {
  components: {
    LastSync,
    SensorTable,
  },
  computed: {
    newDate() {
      return formatDateText(new Date());
    },
  },
  data() {
    return {
      lastSyncKey: 0,
    };
  },
  methods: {
    lastSync() {
      this.lastSyncKey++;
    },
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
