<template>
  <v-toolbar dense>
    <v-tabs light>
      <v-tab
        v-for="item in items"
        :key="item.text"
        :to="item.to"
        :vehicle="vehicle"
      >
        {{ item.text }}
      </v-tab>
    </v-tabs>
  </v-toolbar>
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
