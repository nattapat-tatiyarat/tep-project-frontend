<template>
  <v-card height="100%">
    <v-card-title class="text-h5">{{ title }}</v-card-title>
    <v-card-text>
      <p v-if="mode == 'update'" class="updatedAt">
        Last updated : {{ sensorData.updatedAt }}
      </p>
      <v-form class="form" ref="form" v-model="valid">
        <v-text-field
          v-model="newData.co2"
          label="CO2"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.temp"
          label="Temp"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.humidity"
          label="Humidity"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.light"
          label="Light"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilMoisture"
          label="Soil Moisture"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilNPK"
          label="Soil NPK"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          v-model="newData.soilPH"
          label="Soil PH"
          type="number"
          hide-spin-buttons
          :rules="[rules.required]"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save(), validate()">{{
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
      emits: ["dialog", "success"],
      oldData: {
        id: this.mode == "create" ? "" : this.sensorData._id.toString(),
        co2: this.mode == "create" ? "" : this.sensorData.co2.toString(),
        temp: this.mode == "create" ? "" : this.sensorData.temp.toString(),
        humidity:
          this.mode == "create" ? "" : this.sensorData.humidity.toString(),
        light: this.mode == "create" ? "" : this.sensorData.light.toString(),
        soilMoisture:
          this.mode == "create" ? "" : this.sensorData.soilMoisture.toString(),
        soilNPK:
          this.mode == "create" ? "" : this.sensorData.soilNPK.toString(),
        soilPH: this.mode == "create" ? "" : this.sensorData.soilPH.toString(),
      },
      newData: {
        id: this.mode == "create" ? "" : this.sensorData._id.toString(),
        co2: this.mode == "create" ? "" : this.sensorData.co2.toString(),
        temp: this.mode == "create" ? "" : this.sensorData.temp.toString(),
        humidity:
          this.mode == "create" ? "" : this.sensorData.humidity.toString(),
        light: this.mode == "create" ? "" : this.sensorData.light.toString(),
        soilMoisture:
          this.mode == "create" ? "" : this.sensorData.soilMoisture.toString(),
        soilNPK:
          this.mode == "create" ? "" : this.sensorData.soilNPK.toString(),
        soilPH: this.mode == "create" ? "" : this.sensorData.soilPH.toString(),
      },
      title: this.mode == "create" ? "Add" : "Edit",
      rules: {
        required: (value) => !!value,
      },
      valid: false,
    };
  },
  methods: {
    async save() {
      if (this.mode == "create") {
        if (!this.$refs.form.validate()) {
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
        if (!this.isChange()) {
          this.closeDialog();
        } else {
          if (!this.$refs.form.validate()) {
            this.$awn.alert("Please complete the form");
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
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    isChange() {
      if (JSON.stringify(this.newData) !== JSON.stringify(this.oldData)) {
        return true;
      }
      return false;
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
