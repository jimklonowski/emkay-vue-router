<template>
  <!-- <v-toolbar-title>Vehicle Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only pa-0">
      <v-btn text v-for="item in items" :key="item.text" :to="item.to">{{ item.text }}</v-btn>
  </v-toolbar-items>-->
  <v-toolbar dense>
    <v-tabs light>
      <v-tab v-for="item in items" :key="item.text" :to="item.to">{{ item.text }}</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: 'VehicleNavigation',
  data: () => ({
    items: [
      //{ text: 'General', to: '/vehicle-dashboard/general' },
      { text: 'Dashboard', to: { name: 'dashboard' } },
      { text: 'Accident', to: { name: 'accident' } },
      { text: 'Maintenance', to: { name: 'maintenance' } },
      { text: 'Fuel', to: { name: 'fuel' } }
    ]
  })
}
</script>

<style></style>
