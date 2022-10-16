<template>
  <v-card width="256">
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <!-- Dashboard -->
        <v-list-item-group active-class="SelectedTile-active" mandatory>
          <v-list-item style="color: black" disabled>
            <v-list-item-icon>
              <v-icon>mdi-table</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Dashboard</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/view" link>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sensor Data</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Graph -->
          <v-list-item style="color: black" disabled>
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Graphs</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{
              path: item.path,
              query: { title: item.title, field: item.field },
            }"
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: "Thammasat University",
      subtitle: "TEP",
      items: [
        { title: "CO2", path: "/graph/1", field: "co2" },
        { title: "Temp", path: "/graph/2", field: "temp" },
        {
          title: "Humidity",
          path: "/graph/3",
          field: "humidity",
        },
        { title: "Light", path: "/graph/4", field: "light" },
        {
          title: "Soil Moisture",
          path: "/graph/5",
          field: "soilMoisture",
        },
        { title: "Soil NPK", path: "/graph/6", field: "soilNPK" },
        { title: "Soil pH", path: "/graph/7", field: "soilPH" },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  color: "#000000";
}
</style>
