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
            backgroundColor: "#f87979",
            data: this.data,
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
};
</script>
