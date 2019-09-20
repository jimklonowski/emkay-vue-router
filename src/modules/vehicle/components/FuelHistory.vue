<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{ $t('vehicle_dashboard.fuel') }}</span>
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
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
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
import ApiService from '@/services/api.service'

export default {
  name: 'FuelHistory',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    search: '',
    loading: true,
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
        text: 'Ddtate',
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        text: 'Odometer',
        key: 'vehicle_dashboard.odometer',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'odometer'
      },
      {
        text: 'Driver',
        key: 'vehicle_dashboard.driver',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'driver'
      },
      {
        text: 'Merchant',
        key: 'vehicle_dashboard.merchant',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant'
      },
      {
        text: 'Merchant Address',
        key: 'vehicle_dashboard.merchant_address',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant_address'
      },
      {
        text: 'Type',
        key: 'vehicle_dashboard.type',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        text: 'Quantity',
        key: 'vehicle_dashboard.quantity',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'quantity'
      },
      {
        text: 'Unit Cost',
        key: 'vehicle_dashboard.unit_cost',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'unit_cost'
      },
      {
        text: 'Amount',
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    items: [
      {
        date: '2019-06-19',
        odometer: '18118',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '22.28',
        unit_cost: '$2.998',
        amount: '$66.80'
      },
      {
        date: '2019-06-13',
        odometer: '17690',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '21.23',
        unit_cost: '$2.798',
        amount: '$59.41'
      },
      {
        date: '2019-06-12',
        odometer: '17541',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'WASH',
        quantity: '1',
        unit_cost: '$19.00',
        amount: '$19.00'
      },
      {
        date: '2019-05-31',
        odometer: '17281',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20.85',
        unit_cost: '$3.095',
        amount: '$64.53'
      },
      {
        date: '2019-05-26',
        odometer: '16897',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.42',
        unit_cost: '$3.259',
        amount: '$72.80'
      },
      {
        date: '2019-05-24',
        odometer: '16612',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'WASH',
        quantity: '1',
        unit_cost: '$9.00',
        amount: '$9.00'
      },
      {
        date: '2019-05-21',
        odometer: '16516',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-05-20',
        odometer: '16512',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20',
        unit_cost: '$3.000',
        amount: '$60.00'
      },
      {
        date: '2019-04-20',
        odometer: '16420',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '14.20',
        unit_cost: '$4.200',
        amount: '$69.69'
      },
      {
        date: '2019-03-19',
        odometer: '16319',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-02-20',
        odometer: '16220',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '15.20',
        unit_cost: '$4.700',
        amount: '$69.42'
      },
      {
        date: '2019-01-19',
        odometer: '16119',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.89',
        unit_cost: '$3.699',
        amount: '$60.21'
      },
      {
        date: '2019-06-19',
        odometer: '18118',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '22.28',
        unit_cost: '$2.998',
        amount: '$66.80'
      },
      {
        date: '2019-06-13',
        odometer: '17690',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '21.23',
        unit_cost: '$2.798',
        amount: '$59.41'
      },
      {
        date: '2019-05-31',
        odometer: '17281',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20.85',
        unit_cost: '$3.095',
        amount: '$64.53'
      },
      {
        date: '2019-05-26',
        odometer: '16897',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.42',
        unit_cost: '$3.259',
        amount: '$72.80'
      },
      {
        date: '2019-05-24',
        odometer: '16612',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'WASH',
        quantity: '1',
        unit_cost: '$9.00',
        amount: '$9.00'
      },
      {
        date: '2019-05-21',
        odometer: '16516',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-05-20',
        odometer: '16512',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20',
        unit_cost: '$3.000',
        amount: '$60.00'
      },
      {
        date: '2019-04-20',
        odometer: '16420',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '14.20',
        unit_cost: '$4.200',
        amount: '$69.69'
      },
      {
        date: '2019-03-19',
        odometer: '16319',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-02-20',
        odometer: '16220',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '15.20',
        unit_cost: '$4.700',
        amount: '$69.42'
      },
      {
        date: '2019-01-19',
        odometer: '16119',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.89',
        unit_cost: '$3.699',
        amount: '$60.21'
      },
      {
        date: '2019-06-19',
        odometer: '18118',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '22.28',
        unit_cost: '$2.998',
        amount: '$66.80'
      },
      {
        date: '2019-06-13',
        odometer: '17690',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '21.23',
        unit_cost: '$2.798',
        amount: '$59.41'
      },
      {
        date: '2019-05-31',
        odometer: '17281',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20.85',
        unit_cost: '$3.095',
        amount: '$64.53'
      },
      {
        date: '2019-05-26',
        odometer: '16897',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.42',
        unit_cost: '$3.259',
        amount: '$72.80'
      },
      {
        date: '2019-05-24',
        odometer: '16612',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'WASH',
        quantity: '1',
        unit_cost: '$9.00',
        amount: '$9.00'
      },
      {
        date: '2019-05-21',
        odometer: '16516',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-05-20',
        odometer: '16512',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '20',
        unit_cost: '$3.000',
        amount: '$60.00'
      },
      {
        date: '2019-04-20',
        odometer: '16420',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '14.20',
        unit_cost: '$4.200',
        amount: '$69.69'
      },
      {
        date: '2019-03-19',
        odometer: '16319',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '18.81',
        unit_cost: '$3.099',
        amount: '$58.29'
      },
      {
        date: '2019-02-20',
        odometer: '16220',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '15.20',
        unit_cost: '$4.700',
        amount: '$69.42'
      },
      {
        date: '2019-01-19',
        odometer: '16119',
        driver: 'Andrew Griffith',
        merchant_address: 'BP PRODUCTS ITASCA, IL',
        type: 'UNL GAS',
        quantity: '19.89',
        unit_cost: '$3.699',
        amount: '$60.21'
      }
    ]
  }),
  async created() {
    // fetch the data when the view is created and the data is already being observed.
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      let url = `services?command=VehicleDash.ajax.fuelHistory&vehicle=${this.vehNum}`
      try {
        // This is probably not the place to set the Authorization: Bearer {token} request header, but i'm using it as an example.
        // Axios has something called Request Interceptors that we can use to inject the Auth Token in EVERY request.
        ApiService.setHeader()
        // get the data, however long it may take.
        const response = await this.$http.get(url)
        //console.dir(response)
        // if here, we got data!
        this.items = response.data.data
      } catch (error) {
        // handle error
        console.log(error)
      } finally {
        // cleanup
        this.loading = false
      }
    },
    getColor(type) {
      //console.log(`${type}: ${/wash/.test(type)}`)
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
