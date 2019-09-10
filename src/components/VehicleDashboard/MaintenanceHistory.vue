<template>
  <section>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-subheader dark>{{ vehNum }}</v-subheader>
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
          :loading="loading"
          class="elevation-0"
          dense
        >
          <template v-slot:item.in_network="{ item }">
            <v-icon :color="getColor(item.in_network)">{{ item.value ? 'check_circle' : 'remove_circle' }}</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'MaintenanceHistory',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title1: 'Maintenance',
    title2: 'History',
    loading: false,
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
  }),
  methods: {
    getColor: type => (type ? 'success' : 'error')
  }
}
</script>

<style></style>
