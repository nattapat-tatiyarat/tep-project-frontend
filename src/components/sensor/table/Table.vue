<template>
  <div>
    <v-row class="mx-1" align="center">
      <v-col><span class="text-h6">Sensor Data</span> </v-col>
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

    <div v-if="$vuetify.breakpoint.xs">
      <Pagination
        v-model="pagination"
        class="pt-2"
        :totalDocuments="totalDocuments"
        :dataPerPage="limit"
        :key="`top-${paginationKey}`"
        @input="handlePageChange"
      />
      <v-divider class="mt-3"></v-divider>
    </div>

    <v-data-table
      :headers="headers"
      :items="sensorData"
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
      v-model="pagination"
      class="py-2"
      :totalDocuments="totalDocuments"
      :dataPerPage="limit"
      :key="`bottom-${paginationKey}`"
      @input="handlePageChange"
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
      headers: [
        { text: "DATE", value: "createdAt", sortable: false },
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
      rowData: {},
      totalDocuments: 0,
      limit: this.$vuetify.breakpoint.xs ? 5 : 10,
      dialogCreateKey: 10,
      dialogEditKey: 20,
      paginationKey: 30,
      pagination: 1,
    };
  },
  async mounted() {
    const fetch = async () => {
      if (window.localStorage.getItem("login")) {
        await this.$awn.asyncBlock(this.fetchData(), null);
      }
    };
    await fetch();
    this.paginationKey++;
  },
  methods: {
    async fetchData() {
      try {
        let data = {
          page: this.pagination,
          limit: this.limit,
        };
        const res = await getPagination(data);
        this.totalDocuments = res.data.data.total_documents;
        this.sensorData = res.data.data.data;
        for (let i = 0; i < this.sensorData.length; i++) {
          this.sensorData[i].createdAt = formatDateNumber(
            new Date(this.sensorData[i].createdAt)
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
    handlePageChange() {
      this.$awn.asyncBlock(this.fetchData(), null);
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
