<template>
  <div>
    <vehicle-navigation />
    <v-container fluid>
      <header class="display-3 pa-5">Vehicle Dashboard for Vehicle # {{ $route.params.vehicle }}</header>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import VehicleNavigation from '@/components/VehicleDashboard/VehicleNavigation'
export default {
  name: 'VehicleDashboard',
  components: {
    VehicleNavigation
  }
}
</script>

<style></style>
