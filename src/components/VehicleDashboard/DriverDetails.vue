<template>
  <v-layout column>
    <v-card>
      <v-card-title class="font-weight-thin pa-3" style="height:64px;">
        <header>{{ title }}</header>
        <v-subheader>{{ vehNum }}</v-subheader>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="row no-gutters">
        <v-flex xs12 md4>
          <v-list dense>
            <v-list-item v-for="item in firstColumn" :key="item.key" class="details-row">
              <v-list-item-content class="details-label">
                <strong>{{ item.name }}</strong>
              </v-list-item-content>
              <v-list-item-content class="details-value">{{ item.value }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs12 md4>
          <v-list dense>
            <v-list-item v-for="item in secondColumn" :key="item.key" class="details-row">
              <v-list-item-content class="details-label">
                <strong>{{ item.name }}</strong>
              </v-list-item-content>
              <v-list-item-content class="details-value">{{ item.value }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs12 md4>
          <v-list dense>
            <v-list-item v-for="item in thirdColumn" :key="item.key" class="details-row">
              <v-list-item-content class="details-label">
                <strong>{{ item.name }}</strong>
              </v-list-item-content>
              <v-list-item-content class="details-value">{{ item.value }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined tile color="primary">
          <v-icon left>edit</v-icon>Edit Driver Details
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'DriverDetails',
  props: {
    vehNum: String
  },
  data() {
    return {
      title: 'Driver Details',
      driver: [
        {
          index: 0,
          key: 'last_name',
          name: 'Last Name',
          value: 'Klonowski'
        },
        {
          index: 1,
          key: 'first_name',
          name: 'First Name',
          value: 'James'
        },
        {
          index: 2,
          key: 'address_1',
          name: 'Address 1',
          value: '805 W Thorndale Ave'
        },
        {
          index: 3,
          key: 'address_2',
          name: 'Address 2',
          value: ''
        },
        {
          index: 4,
          key: 'city_state_zip',
          name: 'City/State/ZIP',
          value: 'Itasca, IL 60189'
        },
        {
          index: 5,
          key: 'county',
          name: 'County',
          value: 'DuPage'
        },
        {
          index: 6,
          key: 'phone',
          name: 'Phone',
          value: ''
        },
        {
          index: 7,
          key: 'cell',
          name: 'Cell',
          value: ''
        },
        {
          index: 8,
          key: 'fax',
          name: 'Fax',
          value: ''
        },
        {
          index: 9,
          key: 'email',
          name: 'Email',
          value: 'jklonowski@emkay.com'
        },
        {
          index: 10,
          key: 'employee_id',
          name: 'Employee ID',
          value: ''
        },
        {
          index: 11,
          key: 'driver_misc_1',
          name: 'Driver Misc 1',
          value: ''
        },
        {
          index: 12,
          key: 'driver_misc_2',
          name: 'Driver Misc 2',
          value: ''
        },
        {
          index: 13,
          key: 'driver_misc_3',
          name: 'Driver Misc 3',
          value: ''
        },
        {
          index: 14,
          key: 'driver_misc_4',
          name: 'Driver Misc 4',
          value: ''
        },
        {
          index: 15,
          key: 'selector_level',
          name: 'Selector Level',
          value: ''
        }
      ]
    }
  },
  computed: {
    firstColumn() {
      return this.driver.slice(0, 6)
    },
    secondColumn() {
      return this.driver.slice(6, 11)
    },
    thirdColumn() {
      return this.driver.slice(11, this.driver.length)
    }
  }
}
</script>

<style></style>
