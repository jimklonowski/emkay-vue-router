<template>
  <section>
    <v-card>
      <v-card-title class="blue-grey darken-1 white--text">
        <header class="text-uppercase">
          <span class="font-weight-black">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-spacer></v-spacer>
        <v-text-field class="font-weight-regular" v-model="search" append-icon="search" label="Search" single-line hide-details dark></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :sort-by="['date']"
          :sort-desc="[true]"
          class="elevation-0"
        >
          <template v-slot:item.type="{ item }">
            <v-chip x-small style="white-space:nowrap;" :color="getColor(item.type)">{{ item.type }}</v-chip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined tile color="primary"> <v-icon>credit_card</v-icon>&nbsp;Manage Fuel Cards </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'FuelHistory',
  data() {
    return {
      search: '',
      title1: 'Fuel',
      title2: 'History',
      goto: { name: 'fuel' },
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
          text: 'Driver',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'driver'
        },
        {
          text: 'Merchant',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'merchant'
        },
        {
          text: 'Merchant Address',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'merchant_address'
        },
        {
          text: 'Type',
          width: '100px',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Quantity',
          width: '100px',
          align: 'left',
          sortable: true,
          value: 'quantity'
        },
        {
          text: 'Unit Cost',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'unit_cost'
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
    }
  },
  methods: {
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
