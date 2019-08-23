<template>
  <v-layout column>
    <v-card>
      <v-card-title :class="headerClass">
        <header class="text-uppercase">
          <span class="font-weight-bold">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-spacer />
        <v-text-field v-model="search" class="font-weight-regular" append-icon="search" label="Search" single-line hide-details dark />
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          class="elevation-0"
        />
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'RentalHistory',
  data() {
    return {
      title1: 'Rental',
      title2: 'History',
      headerClass: 'blue-grey darken-1 white--text',
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
