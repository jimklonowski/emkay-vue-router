<template>
  <v-container fluid>
    <vehicle-search />
  </v-container>
</template>

<script>
import VehicleSearch from '@/components/VehicleDashboard/VehicleSearch'

export default {
  name: 'VehicleDashboard',
  data() {
    return {
      title: 'Vehicle Dashboard'
    }
  },
  components: {
    VehicleSearch
  }
}
</script>

<style></style>
