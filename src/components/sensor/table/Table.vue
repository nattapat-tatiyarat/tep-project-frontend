<template>
  <div>
    <v-row class="mx-auto"
      ><v-col cols="6">
        <v-text-field
          v-model="search"
          class="py-0"
          label="Search"
          append-icon="mdi-magnify"
          hide-details
        ></v-text-field
      ></v-col>
      <v-col align="right"
        ><v-btn
          class="elevation-2"
          color="white"
          @click="(dialogCreate = true), dialogCreateKey++"
          ><v-icon small>mdi-plus-circle</v-icon
          ><span style="margin-left: 5px">ADD</span></v-btn
        ></v-col
      ></v-row
    >
    <v-data-table
      :headers="headers"
      :items="sensorData"
      :search="search"
      :items-per-page="10"
    >
      <template v-slot:item.action="{ item }">
        <v-btn @click="edit(item)" class="elevation-2" color="white" x-small fab
          ><v-icon small>mdi-pencil</v-icon></v-btn
        >
      </template>
    </v-data-table>

    <v-dialog v-model="dialogEdit" width="450" persistent
      ><Modal
        mode="update"
        :sensorData="rowData"
        @dialog="dialogEdit = false"
        @success="fetchData"
        :key="dialogEditKey"
      />
    </v-dialog>

    <v-dialog v-model="dialogCreate" width="450" persistent
      ><Modal
        mode="create"
        @dialog="dialogCreate = false"
        @success="fetchData"
        :key="dialogCreateKey"
      />
    </v-dialog>
  </div>
</template>

<script>
import { getData } from "@/api/fetch";
import { formatDateNumber } from "@/utils/formatDate";
import Modal from "@/components/sensor/table/Modal.vue";

export default {
  components: { Modal },
  data() {
    return {
      dialogCreate: false,
      dialogEdit: false,
      search: "",
      headers: [
        { text: "Date", value: "updatedAt" },
        { text: "CO2", value: "co2" },
        { text: "TEMP", value: "temp" },
        { text: "HUMIDITY", value: "humidity" },
        { text: "LIGHT", value: "light" },
        { text: "SOIL MOISTURE", value: "soilMoisture" },
        { text: "SOIL NPK", value: "soilNPK" },
        { text: "SOIL PH", value: "soilPH" },
        { text: "", value: "action", sortable: false },
      ],
      sensorData: [],
      dialogCreateKey: 0,
      dialogEditKey: 0,
      rowData: {},
    };
  },
  mounted() {
    if (window.localStorage.getItem("login")) {
      this.$awn.asyncBlock(this.fetchData(), null);
    }
  },
  methods: {
    async fetchData() {
      try {
        const res = await getData();
        res.data.data.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        this.sensorData = res.data.data;
        for (let i = 0; i < this.sensorData.length; i++) {
          this.sensorData[i].updatedAt = formatDateNumber(
            new Date(this.sensorData[i].updatedAt)
          );
        }
      } catch (err) {
        this.$awn.alert("Error, try again later");
        console.log(err);
      }
    },
    formatDate(date) {
      return formatDateNumber(date);
    },
    edit(value) {
      this.rowData = value;
      this.dialogEditKey++;
      this.dialogEdit = true;
    },
  },
};
</script>
