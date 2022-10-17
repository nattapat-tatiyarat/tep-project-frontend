<template>
  <v-chip
    class="pa-5 elevation-2"
    :color="$vuetify.theme.dark ? 'dark' : 'white'"
    :ripple="false"
    label
  >
    <v-icon left>mdi-timer-sync-outline</v-icon>
    <span class="text-caption">{{ newDate }}</span>
  </v-chip>
</template>

<script>
import { formatDateText } from "@/utils/formatDate";

export default {
  computed: {
    newDate() {
      return formatDateText(new Date());
    },
  },
};
</script>
