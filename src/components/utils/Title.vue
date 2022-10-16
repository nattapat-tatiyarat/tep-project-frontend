<template>
  <div>
    <v-row align="center"
      ><v-col cols="5" class="d-none d-lg-flex text-h4">{{ title }}</v-col
      ><v-col class="chip" align="right"
        ><v-chip class="chip__time" color="white"
          ><v-icon left>mdi-clock</v-icon>{{ newDate }}</v-chip
        ><v-chip
          class="chip__logout font-weight-bold"
          color="white"
          @click="logout"
          >LOGOUT</v-chip
        ></v-col
      >
    </v-row>
  </div>
</template>

<script>
import { formatDateText } from "@/utils/formatDate";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    newDate() {
      return formatDateText(new Date());
    },
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

<style lang="scss" scoped>
.chip {
  &__time {
    margin-right: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  &__logout {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
