<template>
  <v-layout row>
    <v-flex row no-gutters sm12 md9 lg10 xl11>
      <component
        v-for="section in sections"
        :key="section.id"
        :is="section.component"
        :id="section.id"
        :vehNum="$route.params.vehicle"
        :class="section.class"
      ></component>
    </v-flex>
    <v-flex hidden-sm-and-down md3 lg2 xl1>
      <v-navigation-drawer height="auto" width="auto" color="transparent" style="position:sticky;top:36px;" right floating permanent>
        <table-of-contents :tocItems="sections" />
      </v-navigation-drawer>
    </v-flex>
  </v-layout>
</template>

<script>
import TableOfContents from '@/components/core/TableOfContents'
import VehicleDetails from '@/components/VehicleDashboard/VehicleDetails'
import DriverDetails from '@/components/VehicleDashboard/DriverDetails'
import FuelHistory from '@/components/VehicleDashboard/FuelHistory'
import MaintenanceHistory from '@/components/VehicleDashboard/MaintenanceHistory'
import BillingHistory from '@/components/VehicleDashboard/BillingHistory'
import LicensingHistory from '@/components/VehicleDashboard/LicensingHistory'
import AccidentHistory from '@/components/VehicleDashboard/AccidentHistory'
import RentalHistory from '@/components/VehicleDashboard/RentalHistory'

export default {
  name: 'Dashboard',
  data() {
    return {
      vehicle: '',
      sections: [
        { text: 'Vehicle Details', id: 'vd1', class: 'pa-5 col-md-6', component: VehicleDetails },
        { text: 'Driver Details', id: 'vd2', class: 'pa-5 col-md-6', component: DriverDetails },
        { text: 'Fuel History', id: 'vd3', class: 'pa-5 col-12', component: FuelHistory },
        { text: 'Maintenance History', id: 'vd4', class: 'pa-5 col-12', component: MaintenanceHistory },
        { text: 'Billing History', id: 'vd5', class: 'pa-5 col-12', component: BillingHistory },
        { text: 'Licensing History', id: 'vd6', class: 'pa-5 col-12', component: LicensingHistory },
        { text: 'Accident History', id: 'vd7', class: 'pa-5 col-12', component: AccidentHistory },
        { text: 'Rental History', id: 'vd8', class: 'pa-5 col-12', component: RentalHistory }
      ]
    }
  },
  components: {
    TableOfContents,
    VehicleDetails,
    DriverDetails,
    FuelHistory,
    MaintenanceHistory,
    BillingHistory,
    LicensingHistory,
    AccidentHistory,
    RentalHistory
  }
}
</script>

<style></style>
