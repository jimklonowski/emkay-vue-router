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
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined tile color="error"> <v-icon left>drive_eta</v-icon>&nbsp;Report Accident </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'AccidentHistory',
  data() {
    return {
      title: 'Accident History',
      search: '',
      headers: [
        {
          text: 'Loss Date',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'loss_date'
        },
        {
          text: 'Claim #',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'claim'
        },
        {
          text: 'Claim Type',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Claim Amount',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'claim_amount'
        },
        {
          text: 'Subrogation Amount',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'subrogated_amount'
        }
      ],
      items: []
    }
  }
}
</script>

<style></style>
