<template>
  <v-app-bar app tile dense style="z-index:4;top:100px;margin-top:0;">
    <v-tabs
      color="blue-grey lighten-2"
      background-color="white"
      show-arrows
      light
    >
      <v-tabs-slider color="blue-grey lighten-2" />
      <v-tab
        v-for="item in items"
        :key="item.text"
        color="blue-grey lighten-2"
        :to="item.to"
        :vehicle="vehicle"
      >
        {{ item.text }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: 'VehicleNavigation',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    items: [
      //{ text: 'General', to: '/vehicle-dashboard/general' },
      { text: 'Dashboard', to: { name: 'dashboard' } },
      { text: 'Documents', to: { name: 'documents' } },
      { text: 'Inspections', to: { name: 'inspections' } },
      { text: 'SafeRoads', to: { name: 'saferoads' } },
      { text: 'Transport/Storage', to: { name: 'transport-storage' } }
    ]
  })
}
</script>

<style></style>
