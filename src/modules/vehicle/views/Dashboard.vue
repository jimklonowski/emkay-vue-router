<template>
  <section :style="$vuetify.breakpoint.mdAndUp ? 'padding-right: 200px;' : ''">
    <v-container>
      <v-row tag="section">
        <header class="col-12 font-weight-thin display-2 pa-3">
          {{ $t('features.vehicle_dashboard') }}
        </header>
        <component
          :is="section.component"
          v-for="(section, index) in dashboardSections"
          :id="section.id"
          :key="index"
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
        <table-of-contents :toc-items="dashboardSections" />
      </v-navigation-drawer>
    </v-container>
  </section>
</template>

<script>
import TableOfContents from '@/modules/core/components/navigation/TableOfContents'

import VehicleDetails from '@/modules/vehicle/components/Panels/VehicleDetails'
import DriverDetails from '@/modules/vehicle/components/Panels/DriverDetails'
import FuelHistory from '@/modules/vehicle/components/Panels/FuelHistory'
import MaintenanceHistory from '@/modules/vehicle/components/Panels/MaintenanceHistory'
import InvoiceHistory from '@/modules/vehicle/components/Panels/InvoiceHistory'
import LicensingHistory from '@/modules/vehicle/components/Panels/LicensingHistory'
import AccidentHistory from '@/modules/vehicle/components/Panels/AccidentHistory'
import RentalHistory from '@/modules/vehicle/components/Panels/RentalHistory'
import TollHistory from '@/modules/vehicle/components/Panels/TollHistory'
import ViolationHistory from '@/modules/vehicle/components/Panels/ViolationHistory'
import ReportedOdometers from '@/modules/vehicle/components/Panels/ReportedOdometers'
import VehicleNotes from '@/modules/vehicle/components/Panels/VehicleNotes'
import DriverHistory from '@/modules/vehicle/components/Panels/DriverHistory'

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
        class: 'pa-5 col-lg-6',
        component: VehicleDetails
      },
      {
        key: 'vehicle_dashboard.driver_details',
        class: 'pa-5 col-lg-6',
        component: DriverDetails
      },
      {
        key: 'vehicle_dashboard.fuel_history',
        class: 'pa-5 col-12',
        component: FuelHistory
      },
      {
        key: 'vehicle_dashboard.maintenance_history',
        class: 'pa-5 col-12',
        component: MaintenanceHistory
      },
      {
        key: 'vehicle_dashboard.invoice_history',
        class: 'pa-5 col-12',
        component: InvoiceHistory
      },
      {
        key: 'vehicle_dashboard.licensing_history',
        class: 'pa-5 col-12',
        component: LicensingHistory
      },
      {
        key: 'vehicle_dashboard.accident_history',
        class: 'pa-5 col-12',
        component: AccidentHistory
      },
      {
        key: 'vehicle_dashboard.rental_history',
        class: 'pa-5 col-12',
        component: RentalHistory
      },
      {
        key: 'vehicle_dashboard.toll_history',
        class: 'pa-5 col-12',
        component: TollHistory
      },
      {
        key: 'vehicle_dashboard.violation_history',
        class: 'pa-5 col-lg-6',
        component: ViolationHistory
      },
      {
        key: 'vehicle_dashboard.reported_odometers',
        class: 'pa-5 col-lg-6',
        component: ReportedOdometers
      },
      {
        key: 'vehicle_dashboard.driver_history',
        class: 'pa-5 col-lg-6',
        component: DriverHistory
      },
      {
        key: 'vehicle_dashboard.vehicle_notes',
        class: 'pa-5 col-lg-6',
        component: VehicleNotes
      }
    ]
  }),
  computed: {
    dashboardSections() {
      let list = this.sections.map((section, index) => ({
        ...section,
        id: `toc${index}`
      }))
      return list
    },
    dashboardTitle() {
      return this.$route.params.vehicle
        ? `Vehicle Dashboard for Vehicle #${this.$route.params.vehicle}`
        : `Vehicle Dashboard`
    }
  }
}
</script>

<style></style>
