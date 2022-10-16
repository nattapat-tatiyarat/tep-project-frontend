import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import VueAWN from "vue-awesome-notifications";

let options = {
  position: "bottom-right",
};

Vue.use(VueAWN, options);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
