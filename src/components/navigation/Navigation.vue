<template>
  <div>
    <!-- App bar -->
    <v-app-bar elevation="1" color="white" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="dialogLogout = true">LOGOUT</v-btn>
    </v-app-bar>

    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider style="margin-top: -3px"></v-divider>
      <v-list dense nav>
        <v-list-item-group active-class="SelectedTile-active" mandatory>
          <div v-for="header in headers" :key="header.title">
            <v-list-item style="color: black" disabled>
              <v-list-item-icon>
                <v-icon>{{ header.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{
                  header.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              :to="{
                path: item.path,
              }"
              v-for="item in items[header.value]"
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
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout Confirmation -->
    <v-dialog v-model="dialogLogout" width="350" persistent>
      <v-card class="py-1">
        <v-card-title class="justify-center">Confirmation</v-card-title>
        <v-card-text class="text-center"
          >Are you sure you want to Log out?</v-card-text
        >
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="logout">Logout</v-btn>
          <v-btn color="error" @click="dialogLogout = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Thammasat University",
      subtitle: "TEP",
      headers: [
        { title: "Dashboard", icon: "mdi-table", value: "dashboard" },
        { title: "Graphs", icon: "mdi-chart-line", value: "graph" },
      ],
      items: {
        dashboard: [
          {
            title: "Sensor Data",
            path: "/dashboard?title=Sensor%20Data",
            field: "",
          },
        ],
        graph: [
          { title: "CO2", path: "/graph/1?title=CO2&field=co2" },
          { title: "Temp", path: "/graph/2?title=Temp&field=temp" },
          {
            title: "Humidity",
            path: "/graph/3?title=Humidity&field=humidity",
          },
          { title: "Light", path: "/graph/4?title=Light&field=light" },
          {
            title: "Soil Moisture",
            path: "/graph/5?title=Soil%20Moisture&field=soilMoisture",
          },
          {
            title: "Soil NPK",
            path: "/graph/6?title=Soil%20NPK&field=soilNPK",
          },
          { title: "Soil pH", path: "/graph/7?title=Soil%20pH&field=soilPH" },
        ],
      },
      drawer: false,
      dialogLogout: false,
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
      this.drawer = true;
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem("login");
      this.$router.push("/login");
    },
  },
};
</script>
