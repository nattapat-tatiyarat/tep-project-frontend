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
      <!-- Header -->
      <v-list-item>
        <v-list-item-avatar>
          <img
            :src="userInfo.thumbnail"
            v-if="userInfo.thumbnail"
            @click="dialogThumbnail = true"
          />
          <v-avatar color="grey" v-else
            ><v-icon color="white">mdi-account</v-icon></v-avatar
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{
            userInfo.name
          }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider style="margin-top: 2px"></v-divider>
      <!-- Item -->
      <v-list dense nav>
        <v-list-item-group mandatory>
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
                <v-icon>{{ item.icon }}</v-icon>
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

    <!-- Thumbnail dialog -->
    <v-dialog v-model="dialogTest" width="200">
      <v-card>
        <v-img :src="userInfo.thumbnail"></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      headers: [
        { title: "Dashboard", icon: "mdi-table", value: "dashboard" },
        { title: "Graphs", icon: "mdi-chart-line", value: "graph" },
      ],
      items: {
        dashboard: [
          {
            title: "Sensor Data",
            path: "/dashboard?title=Sensor%20Data",
            icon: "mdi-circle-small",
          },
        ],
        graph: [
          {
            title: "CO2",
            path: "/graph/1?title=CO2&field=co2",
            icon: "mdi-circle-small",
          },
          {
            title: "Temp",
            path: "/graph/2?title=Temp&field=temp",
            icon: "mdi-circle-small",
          },
          {
            title: "Humidity",
            path: "/graph/3?title=Humidity&field=humidity",
            icon: "mdi-circle-small",
          },
          {
            title: "Light",
            path: "/graph/4?title=Light&field=light",
            icon: "mdi-circle-small",
          },
          {
            title: "Soil Moisture",
            path: "/graph/5?title=Soil%20Moisture&field=soilMoisture",
            icon: "mdi-circle-small",
          },
          {
            title: "Soil NPK",
            path: "/graph/6?title=Soil%20NPK&field=soilNPK",
            icon: "mdi-circle-small",
          },
          {
            title: "Soil pH",
            path: "/graph/7?title=Soil%20pH&field=soilPH",
            icon: "mdi-circle-small",
          },
        ],
      },
      drawer: false,
      dialogLogout: false,
      dialogThumbnail: false,
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
      window.localStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>
