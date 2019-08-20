<template>
  <div>
    <vehicle-navigation />
    <v-container fluid>
      <h1>{{ $route.params.vehicle }}</h1>
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
