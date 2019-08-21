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
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'LicensingHistory',
  data() {
    return {
      title: 'Licensing History',
      search: '',
      headers: [
        {
          text: 'Expiration Date',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'exp_date'
        },
        {
          text: 'Plate',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'plate'
        },
        {
          text: 'Status',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'status'
        },
        {
          text: 'Needs',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'needs'
        }
      ],
      items: []
    }
  }
}
</script>

<style></style>
