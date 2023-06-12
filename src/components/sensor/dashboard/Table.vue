<template>
  <div>
    <v-row class="mx-1" align="center">
      <v-col><span class="text-h6">Sensors Data</span> </v-col>
      <!-- <v-col align="right"
        ><v-btn
          class="elevation-2"
          color="success"
          @click="(dialogCreate = true), dialogCreateKey++"
          ><v-icon small>mdi-plus-circle</v-icon
          ><span style="margin-left: 5px">ADD</span></v-btn
        ></v-col
      > -->
    </v-row>

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
      :items-per-page="$vuetify.breakpoint.xs ? 5 : 10"
      hide-default-footer
    >

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.payload[0] }}</td>
          <td>{{ item.payload[1] }}</td>
          <td>{{ item.payload[2] }}</td>
          <td>{{ item.payload[3] }}</td>
          <td>{{ item.payload[4] }}</td>
          <td>{{ item.payload[5] }}</td>
          <td>{{ item.payload[6] }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <Pagination
      v-model="pagination"
      class="py-2 mx-5"
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

export default {
  components: {
    Modal: () => import("@/components/sensor/dashboard/Modal.vue"),
    Pagination: () => import("@/components/utils/Pagination.vue"),
  },
  data() {
    return {
      dialogCreate: false,
      dialogEdit: false,
      headers: [
        {
          text: "DATE",
          sortable: false,
        },
        { text: "TIMESTAMP", sortable: false },
        { text: "HUMIDITY", sortable: false },
        { text: "TEMPERATURE", sortable: false },
        { text: "SOIL MOISTURE", sortable: false },
        {
          text: "LIGHT",
          sortable: false,
        },
        { text: "CO2", sortable: false },
      ],
      sensorData: [],
      rowData: {},
      totalDocuments: 0,
      limit: this.$vuetify.breakpoint.xs ? 5 : 10,
      dialogCreateKey: 10,
      dialogEditKey: 20,
      paginationKey: 30,
      pagination: 1,
      emits: ["fetch"],
    };
  },
  async mounted() {
    const fetch = async () => {
      // if (window.localStorage.getItem("login")) {
      //   await this.$awn.asyncBlock(this.fetchData(), null);
      // }
      await this.$awn.asyncBlock(this.fetchData(), null);
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
        // for (let i = 0; i < this.sensorData.length; i++) {
        //   this.sensorData[i].createdAt = formatDateNumber(
        //     new Date(this.sensorData[i].createdAt)
        //   );
        // }
        this.$emit("fetch", true);
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

<style>
th,
td {
  white-space: nowrap;
}
</style>
