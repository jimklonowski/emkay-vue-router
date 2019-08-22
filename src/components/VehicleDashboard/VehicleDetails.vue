<template>
  <section>
    <v-card>
      <v-card-title class="blue-grey darken-1 white--text">
        <header class="text-uppercase">
          <span class="font-weight-bold">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>

        <v-subheader dark>{{ vehNum }}</v-subheader>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="row no-gutters">
        <v-list class="flex row">
          <v-list-item v-for="item in vehicle" :key="item.index" class="col-6 py-0" style="user-select:text !important;">
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-regular blue-grey--text text--lighten-3">{{ item.name }}</v-list-item-subtitle>
              <v-list-item-title class="blue-grey--text text--darken-2 font-weight-normal">{{ item.value }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark tile outlined color="primary" class="ma-2"> <v-icon dark>edit</v-icon>&nbsp;Change Vehicle Information </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'VehicleDetails',
  props: {
    vehNum: String
  },
  data() {
    return {
      title1: 'Vehicle',
      title2: 'Details',
      vehicleNumber: '',
      vehicle: [
        {
          index: 0,
          key: 'account',
          name: 'Account',
          value: 'EM102'
        },
        {
          index: 1,
          key: 'billing_sort',
          name: 'Billing Sort',
          value: ''
        },
        {
          index: 2,
          key: 'vin',
          name: 'VIN',
          value: '987654321QWERTY'
        },
        {
          index: 3,
          key: 'vehicle_number',
          name: 'Vehicle Number',
          value: '123456'
        },
        {
          index: 4,
          key: 'center',
          name: 'Center',
          value: '001'
        },
        {
          index: 5,
          key: 'center_description',
          name: 'Center Description',
          value: 'Executive'
        },
        {
          index: 6,
          key: 'client_vehicle_number',
          name: 'Client Vehicle Number',
          value: '987654'
        },
        {
          index: 7,
          key: 'vehicle_year',
          name: 'Year',
          value: '2019'
        },
        {
          index: 8,
          key: 'vehicle_make',
          name: 'Make',
          value: 'DODGE'
        },
        {
          index: 9,
          key: 'vehicle_model',
          name: 'Model',
          value: 'DURANGO'
        },
        {
          index: 10,
          key: 'vehicle_classification',
          name: 'Category',
          value: 'Sport Utility - Medium'
        },
        {
          index: 11,
          key: 'vehicle_status',
          name: 'Status',
          value: 'ON BILLING'
        },
        {
          index: 12,
          key: 'customer_use_1',
          name: 'Client Use 1',
          value: 'asdf'
        },
        {
          index: 13,
          key: 'customer_use_2',
          name: 'Client Use 2',
          value: 'qwer'
        },
        {
          index: 14,
          key: 'customer_use_3',
          name: 'Client Use 3',
          value: '1234'
        },
        {
          index: 15,
          key: 'customer_use_4',
          name: 'Client Use 4',
          value: 'jklo'
        },
        {
          index: 16,
          key: 'customer_use_5',
          name: 'Client Use 5',
          value: 'test'
        }
      ]
    }
  },
  mounted() {
    if (this.vehNum) {
      this.vehicleNumber = this.vehNum
    }
  },
  computed: {
    firstColumn() {
      return this.vehicle.slice(0, 6)
    },
    secondColumn() {
      return this.vehicle.slice(6, 12)
    },
    thirdColumn() {
      return this.vehicle.slice(12, this.vehicle.length)
    }
  }
}
</script>
<style>
.details-row {
  min-height: 24px !important;
  height: 24px !important;
}
.details-label {
  font-family: 'Lato', sans-serif !important;
  text-align: right;
  padding-right: 0.5rem !important;
  line-height: normal;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
}
.details-value {
  font-family: 'Roboto Condensed', sans-serif !important;
  text-align: left;
  padding-left: 0.5rem !important;
  line-height: normal;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
}
</style>
