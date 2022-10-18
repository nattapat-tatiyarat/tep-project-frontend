<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      color="secondary"
      @input="handlePageChange"
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
  },
  data() {
    return {
      page: 1,
      length: Math.ceil(this.totalDocuments / this.dataPerPage),
      emits: ["page"],
    };
  },
  methods: {
    handlePageChange(value) {
      this.$emit("page", value);
    },
  },
};
</script>
