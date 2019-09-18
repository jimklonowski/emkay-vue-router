<template>
  <section style="padding-right: 200px;">
    <v-container>
      <v-row tag="section">
        <header class="col-12 font-weight-thin display-2 pa-3">
          {{ dashboardTitle }}
        </header>
        <component
          :is="section.component"
          v-for="section in sections"
          :id="section.id"
          :key="section.id"
          :vehicle="$route.params.vehicle"
          :class="section.class"
        />
      </v-row>
      <v-navigation-drawer
        right
        floating
        clipped
        fixed
        permanent
        width="200"
        color="transparent"
        class="overflow-hidden align-center hidden-sm-and-down"
        style="top:148px;"
      >
        <table-of-contents :toc-items="sections" />
      </v-navigation-drawer>
    </v-container>
  </section>
</template>

<script>
import TableOfContents from '@/components/core/TableOfContents'
import VehicleDetails from '@/components/VehicleDashboard/VehicleDetails'
import DriverDetails from '@/components/VehicleDashboard/DriverDetails'
import FuelHistory from '@/components/VehicleDashboard/FuelHistory'
import MaintenanceHistory from '@/components/VehicleDashboard/MaintenanceHistory'
import InvoiceHistory from '@/components/VehicleDashboard/InvoiceHistory'
import LicensingHistory from '@/components/VehicleDashboard/LicensingHistory'
import AccidentHistory from '@/components/VehicleDashboard/AccidentHistory'
import RentalHistory from '@/components/VehicleDashboard/RentalHistory'
import TollHistory from '@/components/VehicleDashboard/TollHistory'
import ViolationHistory from '@/components/VehicleDashboard/ViolationHistory'
import OdometerHistory from '@/components/VehicleDashboard/OdometerHistory'
import NotesHistory from '@/components/VehicleDashboard/NotesHistory'

export default {
  name: 'Dashboard',
  components: {
    TableOfContents,
    VehicleDetails,
    DriverDetails,
    FuelHistory,
    MaintenanceHistory,
    InvoiceHistory,
    LicensingHistory,
    AccidentHistory,
    RentalHistory,
    TollHistory,
    ViolationHistory,
    OdometerHistory,
    NotesHistory
  },
  data: () => ({
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
        text: 'Invoice History',
        id: 'toc5',
        class: 'pa-5 col-12',
        component: InvoiceHistory
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
      },
      {
        text: 'Notes History',
        id: 'toc11',
        class: 'pa-5 col-12',
        component: NotesHistory
      },
      {
        text: 'Odometer History',
        id: 'toc12',
        class: 'pa-5 col-12',
        component: OdometerHistory
      }
    ]
  }),
  computed: {
    dashboardTitle() {
      return this.$route.params.vehicle
        ? `Vehicle Dashboard for Vehicle #${this.$route.params.vehicle}`
        : `Vehicle Dashboard`
    }
  }
}
</script>

<style></style>
