<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{ $t('vehicle_dashboard.maintenance') }}</span>
          <span class="font-weight-thin">{{ $t('vehicle_dashboard.history') }}</span>
          <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          dark
        />
        <v-menu transition="slide-y-transition" z-index="3" left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item
              v-for="(item, i) in actions"
              :key="i"
              :color="item.color"
              @click="item.action"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
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
          :loading-text="`Loading...`"
          dense
        >
          <template v-slot:item.in_network="{ item }">
            <v-icon :color="getColor(item.in_network)">
              {{ item.value ? 'check_circle' : 'remove_circle' }}
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </article>
</template>

<script>
export default {
  name: 'MaintenanceHistory',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    search: '',
    loading: false,
    actions: [
      {
        text: 'Export to Excel',
        icon: 'cloud_download',
        action: () => alert('Excel Export')
      },
      {
        text: 'eVoucher',
        icon: 'local_play',
        action: () => alert('eVoucher')
      }
    ],
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
