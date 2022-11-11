<template>
  <div class="view-page">
    <v-container class="container">
      <LastSync :key="lastSyncKey" />
      <v-card class="mt-8"><SensorTable @fetch="lastSyncKey++" /></v-card>
    </v-container>
  </div>
</template>

<script>
import { formatDateText } from "@/utils/formatDate";

export default {
  components: {
    LastSync: () => import("@/components/utils/LastSync.vue"),
    SensorTable: () => import("@/components/sensor/dashboard/Table.vue"),
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
