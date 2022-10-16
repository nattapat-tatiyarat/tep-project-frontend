<template>
  <div>
    <v-app-bar elevation="1" color="white" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="logout">LOGOUT</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider style="margin-top: -3px"></v-divider>

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
  </div>
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
      drawer: false,
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
      this.drawer = true;
    }
  },
  methods: {
    logout() {
      this.$awn.confirm("Logout ?", () => {
        window.localStorage.removeItem("login");
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.header {
  color: "#000000";
}
</style>
