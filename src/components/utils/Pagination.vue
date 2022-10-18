<template>
  <div class="text-center">
    <v-pagination
      :value="value"
      :length="length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      color="secondary"
      @input="$emit('input', $event)"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    totalDocuments: {
      type: Number,
      default: 1,
    },
    dataPerPage: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      length: Math.ceil(this.totalDocuments / this.dataPerPage),
    };
  },
};
</script>
