<template>
  <section :style="$vuetify.breakpoint.mdAndUp ? 'padding-right: 200px;' : ''">
    <v-container>
      <v-row tag="section">
        <header class="col-12 font-weight-thin display-2 pa-3">
          {{ $t('features.vehicle_dashboard') }}
        </header>
        <component
          :is="section.component"
          v-for="(section, i) in sections"
          :id="`toc${i}`"
          :key="i"
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
import TableOfContents from '@/modules/base/components/TableOfContents'

import VehicleDetails from '@/modules/vehicle/components/VehicleDetails'
import DriverDetails from '@/modules/vehicle/components/DriverDetails'
import FuelHistory from '@/modules/vehicle/components/FuelHistory'
import MaintenanceHistory from '@/modules/vehicle/components/MaintenanceHistory'
import InvoiceHistory from '@/modules/vehicle/components/InvoiceHistory'
import LicensingHistory from '@/modules/vehicle/components/LicensingHistory'
import AccidentHistory from '@/modules/vehicle/components/AccidentHistory'
import RentalHistory from '@/modules/vehicle/components/RentalHistory'
import TollHistory from '@/modules/vehicle/components/TollHistory'
import ViolationHistory from '@/modules/vehicle/components/ViolationHistory'
import ReportedOdometers from '@/modules/vehicle/components/ReportedOdometers'
import VehicleNotes from '@/modules/vehicle/components/VehicleNotes'
import DriverHistory from '@/modules/vehicle/components/DriverHistory'

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
    ReportedOdometers,
    DriverHistory,
    VehicleNotes
  },
  data: () => ({
    vehicle: '',
    sections: [
      {
        key: 'vehicle_dashboard.vehicle_details',
        id: 'toc1',
        class: 'pa-5 col-lg-6',
        component: VehicleDetails
      },
      {
        key: 'vehicle_dashboard.driver_details',
        id: 'toc2',
        class: 'pa-5 col-lg-6',
        component: DriverDetails
      },
      {
        key: 'vehicle_dashboard.fuel_history',
        id: 'toc3',
        class: 'pa-5 col-12',
        component: FuelHistory
      },
      {
        key: 'vehicle_dashboard.maintenance_history',
        id: 'toc4',
        class: 'pa-5 col-12',
        component: MaintenanceHistory
      },
      {
        key: 'vehicle_dashboard.invoice_history',
        id: 'toc5',
        class: 'pa-5 col-12',
        component: InvoiceHistory
      },
      {
        key: 'vehicle_dashboard.licensing_history',
        id: 'toc6',
        class: 'pa-5 col-12',
        component: LicensingHistory
      },
      {
        key: 'vehicle_dashboard.accident_history',
        id: 'toc7',
        class: 'pa-5 col-12',
        component: AccidentHistory
      },
      {
        key: 'vehicle_dashboard.rental_history',
        id: 'toc8',
        class: 'pa-5 col-12',
        component: RentalHistory
      },
      {
        key: 'vehicle_dashboard.toll_history',
        id: 'toc9',
        class: 'pa-5 col-12',
        component: TollHistory
      },
      {
        key: 'vehicle_dashboard.violation_history',
        id: 'toc10',
        class: 'pa-5 col-lg-6',
        component: ViolationHistory
      },
      {
        key: 'vehicle_dashboard.reported_odometers',
        id: 'toc11',
        class: 'pa-5 col-lg-6',
        component: ReportedOdometers
      },
      {
        key: 'vehicle_dashboard.driver_history',
        id: 'toc12',
        class: 'pa-5 col-lg-6',
        component: DriverHistory
      },
      {
        key: 'vehicle_dashboard.vehicle_notes',
        id: 'toc13',
        class: 'pa-5 col-lg-6',
        component: VehicleNotes
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
