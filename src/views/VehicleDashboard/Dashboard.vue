<template>
  <v-layout row>
    <v-flex sm12 md9 lg10 xl11>
      <component
        v-for="section in sections"
        :key="section.id"
        :is="section.component"
        :id="section.id"
        :vehNum="$route.params.vehicle"
        class="ma-5"
      ></component>
    </v-flex>
    <v-flex hidden-sm-and-down md3 lg2 xl1>
      <v-navigation-drawer height="auto" width="auto" color="transparent" style="position:sticky;top:40px;" clipped right floating permanent>
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

export default {
  name: 'Dashboard',
  data() {
    return {
      vehicle: '',
      sections: [
        { text: 'Vehicle Details', id: 'DashboardTocItem1', component: VehicleDetails },
        { text: 'Driver Details', id: 'DashboardTocItem2', component: DriverDetails },
        { text: 'Fuel History', id: 'DashboardTocItem3', component: FuelHistory },
        { text: 'Maintenance History', id: 'DashboardTocItem4', component: MaintenanceHistory }
      ]
    }
  },
  components: {
    TableOfContents,
    VehicleDetails,
    DriverDetails,
    FuelHistory,
    MaintenanceHistory
  }
}
</script>

<style></style>
