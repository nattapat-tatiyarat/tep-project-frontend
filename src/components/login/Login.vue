<template>
  <div class="mt-8">
    <v-container class="container">
      <v-card class="card">
        <v-form
          class="form"
          ref="form"
          v-model="valid"
          @submit.prevent="$event.preventDefault()"
        >
          <v-row align="center">
            <v-col
              cols="12"
              offset="2"
              class="text-h5"
              v-if="$vuetify.breakpoint.xs"
              ><span>Login</span></v-col
            >
            <v-col
              cols="12"
              lg="2"
              md="3"
              sm="3"
              offset="2"
              v-if="!$vuetify.breakpoint.xs"
            >
              <span>Username :</span>
            </v-col>
            <v-col
              cols="8"
              lg="4"
              md="4"
              sm="5"
              :offset="$vuetify.breakpoint.xs ? '2' : '0'"
              ><v-text-field
                v-model="username"
                :placeholder="$vuetify.breakpoint.xs ? '' : 'Username'"
                :label="$vuetify.breakpoint.xs ? 'Username' : ''"
                :rules="[rules.required]"
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
              v-if="!$vuetify.breakpoint.xs"
            >
              <span>Password :</span>
            </v-col>
            <v-col
              cols="8"
              lg="4"
              md="4"
              sm="5"
              :offset="$vuetify.breakpoint.xs ? '2' : '0'"
              ><v-text-field
                v-model="password"
                type="password"
                :placeholder="$vuetify.breakpoint.xs ? '' : 'Password'"
                :label="$vuetify.breakpoint.xs ? 'Password' : ''"
                :rules="[rules.required]"
                outlined
                dense
                hide-details
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col offset="2" offset-lg="4" offset-md="5" offset-sm="5">
              <v-btn
                type="submit"
                @click="login"
                color="primary"
                style="padding: 0 30px"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
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
      rules: {
        required: (value) => !!value,
      },
      valid: false,
    };
  },
  mounted() {
    window.localStorage.removeItem("login");
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        this.$awn.alert("Require all fields");
      } else {
        this.$awn.asyncBlock(this.fetchLogin(), null);
      }
    },
    async fetchLogin() {
      try {
        const res = await isLogin({
          username: this.username,
          password: this.password,
        });
        if (!res.data.data) {
          this.$awn.alert("Username or Password is incorrect");
        } else {
          window.localStorage.setItem("login", true);
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify({
              name: res.data.data.name,
              thumbnail: res.data.data.thumbnail,
            })
          );
          this.$router.push("/dashboard");
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
