<template>
  <div class="co2-page">
    <v-container class="container">
      <LastSync />
      <v-card class="mt-5">
        <v-card-title
          ><v-chip class="text-h6">{{ title }}</v-chip></v-card-title
        >
        <v-card-text
          ><LineChart :data="data" :xLabel="xLabel" :dataName="title"
        /></v-card-text>

        <!-- <v-divider></v-divider>

        <v-card-text align="right">
          <span>Average : {{ average }}</span>
        </v-card-text> -->
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getByField } from "@/api/fetch";
import { formatDateNumber } from "@/utils/formatDate";

export default {
  components: {
    LastSync: () => import("@/components/utils/LastSync.vue"),
    LineChart: () => import("@/components/utils/Chart.vue"),
  },
  data() {
    return {
      data: [],
      xLabel: [],
      title: this.$route.query.title,
      field: this.$route.query.field,
    };
  },
  mounted() {
    // if (window.localStorage.getItem("login")) {
    //   this.$awn.asyncBlock(this.fetchData(), null);
    // }
    this.$awn.asyncBlock(this.fetchData(), null);
  },
  computed: {
    average() {
      let sum = this.data.reduce((partialSum, a) => partialSum + a, 0);
      let length = this.data.length;
      let ans = (sum / length).toFixed(2);
      return isNaN(ans) ? "-" : ans;
    },
    // max() {
    //   let max = Math.max(...this.data);
    //   return isFinite(max) ? max : "-";
    // },
    // min() {
    //   let min = Math.min(...this.data);
    //   return isFinite(min) ? min : "-";
    // },
  },
  methods: {
    async fetchData() {
      try {
        const res = await getByField(this.field);
        res.data.data.forEach((data) => {
          this.data.push(data[this.field]);
          this.xLabel.push(formatDateNumber(data.createdAt));
        });
      } catch (err) {
        this.$awn.alert("Error, try again later");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.co2-page {
  margin: 30px 0;
}
.container {
  padding: 0 5%;
}
</style>
