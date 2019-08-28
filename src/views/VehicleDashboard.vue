<template>
  <div>
    <vehicle-navigation />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <header class="font-weight-thin display-2 pa-3">Vehicle Dashboard for Vehicle # {{ $route.params.vehicle }}</header>
        </v-col>
      </v-row>
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
