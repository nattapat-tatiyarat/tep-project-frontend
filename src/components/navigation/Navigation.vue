<template>
  <div>
    <v-app-bar
      elevation="1"
      :color="$vuetify.theme.dark ? 'dark' : 'white'"
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn
        class="elevation-0 ml-2"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'"
        small
        fab
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        ><v-icon>mdi-theme-light-dark</v-icon></v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>

      <v-list-item>
        <v-list-item-avatar>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Emblem_of_Thammasat_University.svg/1200px-Emblem_of_Thammasat_University.svg.png"
          />
        </v-list-item-avatar>

        <v-list-item-content>

          <v-list-item-title class="font-weight-bold"
            >TU Thammasat University</v-list-item-title
          >
          <v-list-item-subtitle>TEPE Project</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider style="margin-top: 2px"></v-divider>

      <v-list dense nav>
        <v-list-item-group mandatory>
          <v-list-group
            :value="true"
            color=""
            sub-group
            v-for="header in headers"
            :key="header.title"
          >
            <v-icon slot="appendIcon">mdi-menu-down</v-icon>
            <template v-slot:activator
              ><v-row align="center">
                <v-col>
                  <span class="font-weight-bold text-subtitle-2">{{
                    header.title
                  }}</span></v-col
                ></v-row
              >
            </template>
            <v-list-item
              :to="{
                path: item.path,
              }"
              v-for="item in items[header.value]"
              :key="item.title"
              link
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout Confirmation -->
    <!-- <v-dialog v-model="dialogLogout" width="350" persistent>
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
    </v-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: true,
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      headers: [
        {
          title: "Dashboard",
          icon: "mdi-table",
          value: "dashboard",
        },
        {
          title: "Graph",
          icon: "mdi-chart-line",
          value: "graph",
        },
      ],
      items: {
        dashboard: [
          {
            title: "Sensors Data",
            path: "/dashboard",
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
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
      this.drawer = true;
    }
  },
  methods: {
    // logout() {
    //   window.localStorage.removeItem("login");
    //   window.localStorage.removeItem("userInfo");
    //   this.$router.push("/login");
    // },
  },
};
</script>

<style>
.v-list-group__header__prepend-icon {
  display: none !important;
}
</style>
