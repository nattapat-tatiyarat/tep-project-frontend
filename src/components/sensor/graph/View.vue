<template>
  <div class="co2-page">
    <v-container class="container">
      <LastSync />
      <v-card class="mt-5">
        <v-card-title
          ><v-chip class="text-h6">{{ title }}</v-chip></v-card-title
        >
        <v-card-text
          ><LineChart :data="sensorData" :xLabel="xLabel" :dataName="title"
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
import { getData } from "@/api/fetch";
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
      sensorData: [],
    };
  },
  mounted() {
    this.$awn.asyncBlock(this.fetchData(), null);
  },
  computed: {
    average() {
      let sum = this.data.reduce((partialSum, a) => partialSum + a, 0);
      let length = this.data.length;
      let ans = (sum / length).toFixed(2);
      return isNaN(ans) ? "-" : ans;
    },
  },
  methods: {
    async fetchData() {
      try {
        const res = await getData();
        console.log(res.data)
        let index;
        switch (this.field) {
          case "temp":
            index = 3;
            break;
          case "light":
            index = 5;
            break;
          case "humidity":
            index = 2;
            break;
          case "soilMoisture":
            index = 4;
            break;
          case "co2":
            index = 6;
            break;
        }
        res.data.data.data.forEach((element) => {
          this.sensorData.push(element.payload[index]);
          this.xLabel.push(`${element.payload[0]} ${element.payload[1]}`);
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
