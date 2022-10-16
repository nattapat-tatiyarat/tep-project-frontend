<template>
  <div class="mt-8">
    <v-container class="container">
      <v-card class="card">
        <v-row align="center">
          <v-col cols="2" offset="2">
            <label>Username :</label>
          </v-col>
          <v-col cols="4"
            ><v-text-field
              v-model="username"
              placeholder="๊Username"
              outlined
              dense
              hide-details
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="2" offset="2">
            <label>Password :</label>
          </v-col>
          <v-col cols="4"
            ><v-text-field
              v-model="password"
              type="password"
              placeholder="Password"
              outlined
              dense
              hide-details
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="2" offset="4">
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
  padding: 0 200px;
}
.card {
  padding: 50px 0;
}
</style>
