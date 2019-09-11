<template>
  <v-row>
    <v-col sm="12" md="9" lg="9" xl="10">
      <v-row>
        <component
          :is="section.component"
          v-for="section in sections"
          :id="section.id"
          :key="section.id"
          :veh-num="$route.params.vehicle"
          :class="section.class"
        />
      </v-row>
    </v-col>
    <v-col class="hidden-sm-and-down" md="3" lg="3" xl="2">
      <v-navigation-drawer
        height="auto"
        width="auto"
        color="transparent"
        style="position:sticky;top:100px;"
        right
        floating
        permanent
      >
        <table-of-contents :toc-items="sections" />
      </v-navigation-drawer>
    </v-col>
  </v-row>
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
import TollHistory from '@/components/VehicleDashboard/TollHistory'
import ViolationHistory from '@/components/VehicleDashboard/ViolationHistory'

export default {
  name: 'Dashboard',
  components: {
    TableOfContents,
    VehicleDetails,
    DriverDetails,
    FuelHistory,
    MaintenanceHistory,
    BillingHistory,
    LicensingHistory,
    AccidentHistory,
    RentalHistory,
    TollHistory,
    ViolationHistory
  },
  data() {
    return {
      vehicle: '',
      sections: [
        {
          text: 'Vehicle Details',
          id: 'toc1',
          class: 'pa-5 col-lg-6',
          component: VehicleDetails
        },
        {
          text: 'Driver Details',
          id: 'toc2',
          class: 'pa-5 col-lg-6',
          component: DriverDetails
        },
        {
          text: 'Fuel History',
          id: 'toc3',
          class: 'pa-5 col-12',
          component: FuelHistory
        },
        {
          text: 'Maintenance History',
          id: 'toc4',
          class: 'pa-5 col-12',
          component: MaintenanceHistory
        },
        {
          text: 'Billing History',
          id: 'toc5',
          class: 'pa-5 col-12',
          component: BillingHistory
        },
        {
          text: 'Licensing History',
          id: 'toc6',
          class: 'pa-5 col-12',
          component: LicensingHistory
        },
        {
          text: 'Accident History',
          id: 'toc7',
          class: 'pa-5 col-12',
          component: AccidentHistory
        },
        {
          text: 'Rental History',
          id: 'toc8',
          class: 'pa-5 col-12',
          component: RentalHistory
        },
        {
          text: 'Toll History',
          id: 'toc9',
          class: 'pa-5 col-12',
          component: TollHistory
        },
        {
          text: 'Violation History',
          id: 'toc10',
          class: 'pa-5 col-12',
          component: ViolationHistory
        }
      ]
    }
  }
}
</script>

<style></style>
