<template>
  <span>
    <v-footer app padless fixed dark>
      <v-card width="100%" flat tile class="blue-grey white--text text-center">
        <!-- <v-card-text>
        <div>We create a client experience that is simple, better, and different.</div>
        </v-card-text>-->
        <v-divider></v-divider>
        <v-card-text class="py-2 blue-grey darken-3"> {{ new Date().getFullYear() }} - <strong>EMKAY</strong>, Inc. </v-card-text>
        <!-- <v-divider></v-divider> -->
        <!-- <v-bottom-navigation absolute hide-on-scroll>
          <v-row justify="center">
            <v-col v-for="bucket in buckets" :key="bucket.title" cols="12" sm="4" lg="2">
              <div class="justify-center overline mb-2">{{ bucket.title }}</div>
              <ul class="justify-center pl-0" style="list-style:none;">
                <li v-for="item in bucket.items" :key="item.text">
                  <router-link
                    :to="item.to.name"
                    class="caption font-weight-light"
                    style="text-decoration:none;color:rgba(255,255,255,0.35) !important;"
                    >{{ item.text }}</router-link
                  >
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-bottom-navigation>-->
        <!-- <v-card-text class="py-2 blue-grey darken-1">
          
        </v-card-text>-->
      </v-card>
    </v-footer>
  </span>
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
