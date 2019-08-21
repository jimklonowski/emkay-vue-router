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
        >
          <template v-slot:item.in_network="{ item }">
            <v-icon :color="getColor(item.in_network)">{{ item.value ? 'check_circle' : 'remove_circle' }}</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'MaintenanceHistory',
  data() {
    return {
      title: 'Maintenance History',
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
          text: 'Odometer',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'odometer'
        },
        {
          text: 'Vendor',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'vendor'
        },
        {
          text: 'In Network',
          width: '100px',
          align: 'left',
          sortable: true,
          value: 'in_network'
        },
        {
          text: 'Service',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'service'
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
          date: '2019-08-20',
          odometer: '12345',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$24.00'
        },
        {
          date: '2019-06-13',
          odometer: '11323',
          vendor: 'EMKAY Motors',
          in_network: false,
          service: 'Wash & Detail (Fee)',
          amount: '$19.00'
        },
        {
          date: '2019-04-01',
          odometer: '10901',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$750.00'
        }
      ]
    }
  },
  methods: {
    getColor(type) {
      //console.log(type)
      return type ? 'success' : 'error'
    }
  }
}
</script>

<style></style>
