<template>
  <div class="co2-page">
    <v-container class="container">
      <Title />
      <v-card class="chart">
        <v-card-title
          ><v-chip class="text-h6">{{ title }}</v-chip></v-card-title
        >
        <v-card-text
          ><LineChart :data="data" :xLabel="xLabel" :dataName="title"
        /></v-card-text>

        <v-divider></v-divider>

        <v-card-text align="right"
          ><span
            >Average: {{ average }}, Max: {{ max }}, Min: {{ min }}</span
          ></v-card-text
        >
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getByField } from "@/api/fetch";
import { formatDateNumber } from "@/utils/formatDate";
import Title from "@/components/utils/Title.vue";
import LineChart from "@/components/utils/chart/LineChart.vue";

export default {
  components: {
    Title,
    LineChart,
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
    this.fetchData();
  },
  computed: {
    average() {
      let sum = this.data.reduce((partialSum, a) => partialSum + a, 0);
      let length = this.data.length;
      let ans = (sum / length).toFixed(2);
      return isNaN(ans) ? "-" : ans;
    },
    max() {
      return Math.max(...this.data);
    },
    min() {
      return Math.min(...this.data);
    },
  },
  methods: {
    async fetchData() {
      try {
        const res = await getByField(this.field);
        res.data.data.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        res.data.data.forEach((data) => {
          this.data.push(data[this.field]);
          this.xLabel.push(formatDateNumber(data.updatedAt));
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
  padding: 0 100px;
}
.chart {
  padding: 20px;
  margin-top: 10px;
}
</style>
