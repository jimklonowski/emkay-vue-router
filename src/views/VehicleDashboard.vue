<template>
  <div>
    <vehicle-navigation />
    <v-container fluid>
      <header class="display-1 pa-3">Vehicle Dashboard for Vehicle # {{ $route.params.vehicle }}</header>
      <!-- <v-subheader>Extra Menu Options Here?</v-subheader> -->
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
