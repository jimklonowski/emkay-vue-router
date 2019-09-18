<template>
  <section>
    <v-container>
      <header class="font-weight-thin display-2">
        {{ title }}
      </header>
      <v-subheader class="pl-1">
        Inspections for vehicle {{ vehicle }}
      </v-subheader>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Inspections',
  data: () => ({
    title: 'Inspections',
    vehicle: ''
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
  }
}
</script>

<style></style>
