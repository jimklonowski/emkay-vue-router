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
          elevation-0
          dense
        ></v-data-table>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'BillingHistory',
  data() {
    return {
      title: 'Billing History',
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
          text: 'Description',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'description'
        },
        {
          text: 'Invoice',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'invoice'
        },
        {
          text: 'Amount',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'amount'
        }
      ],
      items: [
        {
          date: '2019-08-01',
          description: 'FMS Billing',
          invoice: 'BF7718',
          amount: '$604.44'
        }
      ]
    }
  }
}
</script>

<style></style>
