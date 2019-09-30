<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{
            $t('vehicle_dashboard.fuel')
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
              :data="fuel_history"
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
          :items="fuel_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
          :no-data-text="errorMessage || 'No Data Found'"
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
      <v-card-actions>
        <json-excel :data="fuel_history">Download Excel!</json-excel>
        <v-btn depressed dark @click="downloadCsv">Download CSV?</v-btn>
      </v-card-actions>
    </v-card>
  </article>
</template>

<script>
import JsonExcel from 'vue-json-excel'
import { csvDownload } from '@/util/helpers'
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
    search: '',
    loading: true,
    errorMessage: '',
    //goto: { name: 'fuel' },
    actions: [
      {
        key: 'common.export_to_excel',
        icon: 'cloud_download',
        action: () => alert('download')
      },
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
    downloadCsv() {
      debugger
      const rows = this.fuel_history
        .map(item => this.headers.map(k => `"${item[k] || ''}"`).join(','))
        .join('\n')
      debugger
      csvDownload(
        //`${this.headers.map(s => this.$t(`item.${s}`)).join(',')}\n${rows}`
        `${this.headers.map(column => this.$t(column.key)).join(',')}\n${rows}`
        //`${this.headers.join(',')}\n${rows}`
      )
    },
    // color chips for transaction typeS
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
