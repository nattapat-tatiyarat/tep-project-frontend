<template>
  <v-card>
    <v-card-title class="text-h5">{{ title }}</v-card-title>
    <v-card-text>
      <p v-if="mode == 'update'" class="updatedAt">
        Last updated : {{ sensorData.updatedAt }}
      </p>
      <div class="form">
        <v-text-field
          v-model="newData.co2"
          @change="isChange = true"
          label="CO2"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.temp"
          @change="isChange = true"
          label="Temp"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.humidity"
          @change="isChange = true"
          label="Humidity"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.light"
          @change="isChange = true"
          label="Light"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilMoisture"
          @change="isChange = true"
          label="Soil Moisture"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilNPK"
          @change="isChange = true"
          label="Soil NPK"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilPH"
          @change="isChange = true"
          label="Soil PH"
        >
        </v-text-field>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save">{{
        mode == "create" ? "CREATE" : "SAVE"
      }}</v-btn
      ><v-btn color="error" @click="closeDialog">CANCEL</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { create, update } from "@/api/fetch";
import { formatDateNumber } from "@/utils/formatDate";

export default {
  props: {
    mode: {
      type: String,
      default: "create",
    },
    sensorData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    formatDate() {
      return formatDateNumber(this.sensorData.updatedAt);
    },
  },
  data() {
    return {
      newData: {
        id: this.mode == "create" ? "" : this.sensorData._id,
        co2: this.mode == "create" ? "" : this.sensorData.co2,
        temp: this.mode == "create" ? "" : this.sensorData.temp,
        humidity: this.mode == "create" ? "" : this.sensorData.humidity,
        light: this.mode == "create" ? "" : this.sensorData.light,
        soilMoisture: this.mode == "create" ? "" : this.sensorData.soilMoisture,
        soilNPK: this.mode == "create" ? "" : this.sensorData.soilNPK,
        soilPH: this.mode == "create" ? "" : this.sensorData.soilPH,
      },
      title: this.mode == "create" ? "Create" : "Edit",
      isChange: false,
      emits: ["dialog", "success"],
    };
  },
  methods: {
    async save() {
      if (this.mode == "create") {
        if (!this.isChange) {
          this.$awn.alert("Please complete the form");
        } else {
          try {
            const res = await create(this.newData);
            if (res.data.status_code == 200) {
              this.$emit("success", true);
              this.closeDialog();
              this.$awn.success("Create success");
            } else {
              this.$awn.alert("Error, try again later");
            }
          } catch (err) {
            this.$awn.alert("Create failed");
            console.log(err);
          }
        }
      } else {
        if (!this.isChange) {
          this.closeDialog();
        } else {
          try {
            const res = await update(this.newData);
            if (res.data.status_code == 200) {
              this.$emit("success", true);
              this.closeDialog();
              this.$awn.success("Update success");
            } else {
              this.$awn.alert("Error, try again later");
            }
          } catch (err) {
            this.$awn.alert("Update failed");
            console.log(err);
          }
        }
      }
    },
    closeDialog() {
      this.$emit("dialog", false);
    },
  },
};
</script>

<style scoped>
.updatedAt {
  margin-bottom: 12px;
}
</style>
