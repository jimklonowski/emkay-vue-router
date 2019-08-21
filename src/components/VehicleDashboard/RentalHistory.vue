<template>
  <v-layout column>
    <v-card>
      <v-card-title class="font-weight-thin pa-3">
        {{ title }}
        <v-spacer></v-spacer>
        <v-text-field class="font-weight-regular" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          class="elevation-0"
          dense
        ></v-data-table>
      </v-card-text>
      <!-- <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>-->
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'RentalHistory',
  data() {
    return {
      title: 'Rental History',
      search: '',
      headers: [
        {
          text: 'Date',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        {
          text: 'Reason',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'reason'
        },
        {
          text: 'Voucher',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'voucher'
        },
        {
          text: 'Rental Rate',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'rate'
        },
        {
          text: 'Days',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'days'
        },
        {
          text: 'Total Amount',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'total'
        }
      ],
      items: []
    }
  }
}
</script>

<style></style>
