<template>
  <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    xLabel: {
      type: Array,
      default() {
        return [];
      },
    },
    xTitle: {
      type: String,
      default: "",
    },
    yTitle: {
      type: String,
      default: "",
    },
    dataName: {
      type: String,
      default: "Data",
    },
  },
  data() {
    return {
      chartData: {
        labels: this.xLabel,
        datasets: [
          {
            label: this.dataName,
            data: this.data,
            backgroundColor: "#f87979",
            borderColor: this.$vuetify.theme.dark ? "#505050" : "#DCDCDC",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: this.xTitle,
            },
          },
          y: {
            title: {
              display: true,
              text: this.yTitle,
            },
          },
        },
      },
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "#505050" : "#DCDCDC";
    },
  },
  watch: {
    theme() {
      this.chartData.datasets[0].borderColor = this.theme;
    },
  },
};
</script>
