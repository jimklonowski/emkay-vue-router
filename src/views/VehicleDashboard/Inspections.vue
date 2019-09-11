<template>
  <v-row>
    <v-col cols="12">
      <v-subheader>Inspections for vehicle {{ vehicle }}</v-subheader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Inspections',
  data: () => ({
    vehicle: ''
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
  }
}
</script>

<style></style>
