<template>
  <div class="mt-8">
    <v-container class="container">
      <v-card class="card">
        <v-row align="center">
          <v-col
            cols="12"
            offset="2"
            class="font-weight-bold"
            v-if="this.$vuetify.breakpoint.xs"
            ><span>Login</span></v-col
          >
          <v-col
            cols="12"
            lg="2"
            md="3"
            sm="3"
            offset="2"
            v-if="!this.$vuetify.breakpoint.xs"
          >
            <span>Username :</span>
          </v-col>
          <v-col
            cols="8"
            lg="4"
            md="4"
            sm="5"
            :offset="this.$vuetify.breakpoint.xs ? '2' : '0'"
            ><v-text-field
              v-model="username"
              :placeholder="this.$vuetify.breakpoint.xs ? '' : 'Username'"
              :label="this.$vuetify.breakpoint.xs ? 'Username' : ''"
              outlined
              dense
              hide-details
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            lg="2"
            md="3"
            sm="3"
            offset="2"
            v-if="!this.$vuetify.breakpoint.xs"
          >
            <span>Password :</span>
          </v-col>
          <v-col
            cols="8"
            lg="4"
            md="4"
            sm="5"
            :offset="this.$vuetify.breakpoint.xs ? '2' : '0'"
            ><v-text-field
              v-model="password"
              type="password"
              placeholder="Password"
              :placeholder="this.$vuetify.breakpoint.xs ? '' : 'Password'"
              :label="this.$vuetify.breakpoint.xs ? 'Password' : ''"
              outlined
              dense
              hide-details
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col offset="2" offset-lg="4" offset-md="5" offset-sm="5">
            <v-btn @click="login" color="primary" style="padding: 0 30px"
              >Login</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { isLogin } from "@/api/fetch";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    window.localStorage.removeItem("login");
  },
  methods: {
    async login() {
      try {
        const res = await isLogin({
          username: this.username,
          password: this.password,
        });
        if (!res.data.data) {
          this.$awn.alert("Username or Password is incorrect");
        } else {
          window.localStorage.setItem("login", true);
          this.$awn.success("login success");
          this.$router.push("/view");
        }
      } catch (err) {
        this.$awn.alert("Network error, try again later");
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 10%;
}
.card {
  padding: 50px 0;
}
</style>
