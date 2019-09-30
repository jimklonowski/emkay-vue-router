<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{
            $t('vehicle_dashboard.maintenance')
          }}</span>
          <span class="font-weight-thin">{{
            $t('vehicle_dashboard.history')
          }}</span>
          <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          :label="$t('common.search')"
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
                <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="maintenance_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
          :no-data-text="errorMessage || 'No Data Found'"
          dense
        >
          <template
            v-for="header in headers"
            v-slot:[`header.${header.value}`]="{ header }"
          >
            {{ $t(header.key) }}
          </template>
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
import { mapActions } from 'vuex'
import { FETCH_MAINTENANCE_HISTORY } from '@/modules/vehicle/store/actions.type'
export default {
  name: 'MaintenanceHistory',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    errorMessage: '',
    search: '',
    loading: true,
    actions: [
      {
        key: 'common.export_to_excel',
        icon: 'cloud_download',
        action: () => alert('Excel Export')
      },
      {
        key: 'vehicle_dashboard.evoucher',
        icon: 'local_play',
        action: () => alert('eVoucher')
      }
    ],
    headers: [
      {
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.odometer',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'odometer'
      },
      {
        key: 'vehicle_dashboard.vendor',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'vendor'
      },
      {
        key: 'vehicle_dashboard.in_network',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'in_network'
      },
      {
        key: 'vehicle_dashboard.service',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'service'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    maintenance_history: []
  }),
  created() {
    this.fetchMaintenanceHistory(this.vehicle)
      .then(response => {
        this.maintenance_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions([FETCH_MAINTENANCE_HISTORY]),
    // color chips green for in-network
    getColor: type => (type ? 'success' : 'error')
  }
}
</script>

<style></style>
