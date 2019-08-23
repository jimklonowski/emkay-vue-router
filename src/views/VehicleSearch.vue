<template>
  <v-container fluid>
    <vehicle-search />
  </v-container>
</template>

<script>
import VehicleSearch from '@/components/VehicleDashboard/VehicleSearch'

export default {
  name: 'VehicleDashboard',
  components: {
    VehicleSearch
  },
  data() {
    return {
      title: 'Vehicle Dashboard'
    }
  }
}
</script>

<style></style>
