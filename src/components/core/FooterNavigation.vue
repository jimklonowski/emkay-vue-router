<template>
  <v-footer app padless inset absolute>
    <v-card width="100%" flat tile class="text-center">
      <v-card-text class="blue-grey darken-2 white--text">
        <div>
          We create a client experience that is simple, better, and different.
        </div>
        {{ new Date().getFullYear() }} - <strong>EMKAY</strong>, Inc.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterNavigation',
  data: () => ({
    buckets: [
      {
        title: 'Fleet Managers',
        items: [
          { text: 'Fleet Dashboard', to: { name: 'fleet-dashboard' } },
          { text: 'Fleet Reports', to: { name: 'fleet-reports' } },
          { text: 'FOR Builder', to: { name: 'for-builder' } }
        ]
      },
      {
        title: 'Drivers',
        items: [
          { text: 'Vehicle Dashboard', to: { name: 'vehicle-dashboard' } },
          { text: 'Driver Dashboard', to: { name: 'driver-dashboard' } },
          { text: 'Change Information', to: { name: 'change-information' } }
        ]
      },
      {
        title: 'About',
        items: [
          { text: 'Team', to: { name: 'team' } },
          { text: 'Locations', to: { name: 'locations' } },
          { text: 'Privacy', to: { name: 'privacy' } },
          { text: 'Terms', to: { name: 'terms' } }
        ]
      }
    ]
  })
}
</script>

<style></style>
