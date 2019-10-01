<template>
  <article>
    <v-card>
      <v-toolbar :class="$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.fuel'" />
          <span v-t="'vehicle_dashboard.history'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark v-text="vehicle" />
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
        <!-- close-on-content-click=false is REQUIRED for the download button to work -->
        <v-menu
          :close-on-content-click="false"
          transition="slide-y-transition"
          z-index="3"
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon v-text="'more_vert'" />
            </v-btn>
          </template>
          <v-list nav dense>
            <!-- download button -->
            <v-list-item link>
              <v-list-item-icon>
                <v-icon v-text="'cloud_download'" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <json-excel
                    :data="fuel_history"
                    :fields="headerExport"
                    :type="exportFormat"
                    :default-value="' -- '"
                    :name="downloadName"
                  >
                    {{ $t('common.export_to_excel') }}
                  </json-excel>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- other actions -->
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
                <v-list-item-title v-t="item.key" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="fuel_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
          :no-data-text="$t('common.no_data_found')"
          dense
        >
          <!-- using i18n on the fly is tedious for column headers currently, but this dynamic solution works:
            https://github.com/vuetifyjs/vuetify/issues/8571#issuecomment-524846520
          -->
          <template
            v-for="header in headers"
            v-slot:[`header.${header.value}`]="{ header }"
          >
            {{ $t(header.key) }}
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip
              :color="getColor(item.type)"
              x-small
              style="white-space:nowrap"
            >
              {{ item.type }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </article>
</template>

<script>
import JsonExcel from 'vue-json-excel'
import { exportName, headersForExport } from '@/util/helpers'
import { mapActions } from 'vuex'
import { FETCH_FUEL_HISTORY } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'FuelHistory',
  components: {
    JsonExcel
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    errorMessage: '',
    exportFormat: 'xls',
    name: 'fuel_history',
    //json_meta: [[{ key: 'charset', value: 'utf-8' }]],
    loading: true,
    search: '',
    actions: [
      {
        key: 'vehicle_dashboard.order_fuel_card',
        icon: 'credit_card',
        action: () => alert('order fuel card')
      },
      {
        key: 'vehicle_dashboard.reassign_auth_profile',
        icon: 'assignment_return',
        action: () => alert('reassign profile')
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
        key: 'vehicle_dashboard.driver',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'driver'
      },
      {
        key: 'vehicle_dashboard.merchant',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant'
      },
      {
        key: 'vehicle_dashboard.merchant_address',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant_address'
      },
      {
        key: 'vehicle_dashboard.type',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        key: 'vehicle_dashboard.quantity',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'quantity'
      },
      {
        key: 'vehicle_dashboard.unit_cost',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'unit_cost'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    fuel_history: []
  }),
  computed: {
    headerExport() {
      return headersForExport(this.headers)
    },
    downloadName() {
      return exportName(this.name, this.exportFormat)
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed.
    this.fetchFuelHistory(this.vehicle)
      .then(response => {
        this.fuel_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions([FETCH_FUEL_HISTORY]),
    // color chips for transaction types
    getColor: type => {
      switch (true) {
        case /wash/i.test(type):
          return 'info'
        case /prem/i.test(type):
        case /unl/i.test(type):
        case /gas/i.test(type):
          return 'primary'
        case /tax/i.test(type):
        case /sal/i.test(type):
        case /misc/i.test(type):
          return 'warning'
        default:
          return 'secondary'
      }
    }
  }
}
</script>
<style></style>
