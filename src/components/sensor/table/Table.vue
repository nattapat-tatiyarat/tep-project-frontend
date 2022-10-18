<template>
  <div>
    <v-row class="mx-1" align="center">
      <v-col><span class="text-h6">Sensor Data</span></v-col>
      <v-col align="right"
        ><v-btn
          class="elevation-2"
          color="success"
          @click="(dialogCreate = true), dialogCreateKey++"
          ><v-icon small>mdi-plus-circle</v-icon
          ><span style="margin-left: 5px">ADD</span></v-btn
        ></v-col
      ></v-row
    >

    <v-divider class="mt-3"></v-divider>

    <v-data-table
      :headers="headers"
      :items="sensorData"
      :search="search"
      :items-per-page="this.$vuetify.breakpoint.xs ? 5 : 10"
      hide-default-footer
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          @click="edit(item)"
          class="elevation-2"
          color="error"
          :small="
            $vuetify.breakpoint.xs ||
            $vuetify.breakpoint.sm ||
            $vuetify.breakpoint.md
          "
          :x-small="$vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
          :fab="$vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
          ><span v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
            ><v-icon small>mdi-pencil</v-icon></span
          >
          <span v-else>Edit</span></v-btn
        >
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <Pagination
      class="py-2"
      :totalDocuments="totalDocuments"
      :dataPerPage="limit"
      :key="paginationKey"
      @page="handlePageChange"
    />

    <v-dialog v-model="dialogCreate" width="450" persistent
      ><Modal
        mode="create"
        @dialog="dialogCreate = false"
        @success="fetchData"
        :key="dialogCreateKey"
      />
    </v-dialog>

    <v-dialog v-model="dialogEdit" width="450" persistent
      ><Modal
        mode="update"
        :sensorData="rowData"
        @dialog="dialogEdit = false"
        @success="fetchData"
        :key="dialogEditKey"
      />
    </v-dialog>
  </div>
</template>

<script>
import { getPagination } from "@/api/fetch";
import { formatDateNumber } from "@/utils/formatDate";
import Modal from "@/components/sensor/table/Modal.vue";
import Pagination from "@/components/utils/Pagination.vue";

export default {
  components: { Modal, Pagination },
  data() {
    return {
      dialogCreate: false,
      dialogEdit: false,
      search: "",
      headers: [
        { text: "Date", value: "updatedAt", sortable: false },
        { text: "CO2", value: "co2", sortable: false },
        { text: "TEMP", value: "temp", sortable: false },
        { text: "HUMIDITY", value: "humidity", sortable: false },
        { text: "LIGHT", value: "light", sortable: false },
        {
          text: "SOIL MOISTURE",
          value: "soilMoisture",
          class: "nowrap",
          sortable: false,
        },
        { text: "SOIL NPK", value: "soilNPK", sortable: false },
        { text: "SOIL PH", value: "soilPH", sortable: false },
        { text: "", value: "action", sortable: false },
      ],
      sensorData: [],
      dialogCreateKey: 0,
      dialogEditKey: 0,
      rowData: {},
      paginationKey: 0,
      totalDocuments: 0,
      limit: this.$vuetify.breakpoint.xs ? 5 : 10,
    };
  },
  async mounted() {
    window.addEventListener("resize", () => {
      this.limit = this.$vuetify.breakpoint.xs ? 5 : 10;
      this.paginationKey++;
      this.fetchData();
    });
    const fetch = async () => {
      if (window.localStorage.getItem("login")) {
        await this.$awn.asyncBlock(this.fetchData(), null);
      }
    };
    await fetch();
    this.paginationKey++;
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
  methods: {
    async fetchData(page) {
      try {
        let data = {
          page: page || 1,
          limit: this.limit,
        };
        const res = await getPagination(data);
        this.totalDocuments = res.data.data.total_documents;
        res.data.data.data.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        this.sensorData = res.data.data.data;

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
    handlePageChange(value) {
      this.fetchData(value);
    },
  },
};
</script>

<style lang="scss">
th,
td {
  white-space: nowrap;
}
@media all and (max-width: 599.9999px) {
  .v-data-footer {
    justify-content: center;
    padding-bottom: 8px;

    & .v-data-footer__select {
      margin-right: auto !important;
    }

    & .v-data-footer__pagination {
      width: 100%;
      margin: 0;
    }
  }

  .v-application--is-ltr .v-data-footer__select .v-select {
    margin: 5px 0 5px 13px;
  }
  .v-application--is-rtl .v-data-footer__select .v-select {
    margin: 5px 13px 5px 0;
  }
}
</style>
