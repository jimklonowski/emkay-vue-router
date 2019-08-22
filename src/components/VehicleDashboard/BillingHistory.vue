<template>
  <section>
    <v-card>
      <v-card-title class="blue-grey darken-1 white--text">
        <header class="text-uppercase">
          <span class="font-weight-bold">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-spacer></v-spacer>
        <v-text-field class="font-weight-regular" v-model="search" append-icon="search" label="Search" single-line hide-details dark></v-text-field>
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
        ></v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'BillingHistory',
  data() {
    return {
      title1: 'Billing',
      title2: 'History',
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
