<template>
  <v-footer padless dark>
    <v-card width="100%" flat tile class="blue-grey white--text text-center">
      <!-- <v-card-text>
        <div>We create a client experience that is simple, better, and different.</div>
      </v-card-text>-->
      <v-divider></v-divider>
      <v-card-text class="py-2 blue-grey darken-1"> {{ new Date().getFullYear() }} - <strong>EMKAY</strong>, Inc. </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="py-2 blue-grey darken-3">
        <v-row justify="center">
          <v-col v-for="bucket in buckets" :key="bucket.title" cols="12" sm="4" lg="2">
            <div class="justify-center overline mb-2">{{ bucket.title }}</div>
            <ul class="justify-center pl-0" style="list-style:none;">
              <li v-for="item in bucket.items" :key="item.text">
                <a
                  v-if="item.target"
                  class="caption font-weight-light"
                  style="text-decoration:none;color:rgba(255,255,255,0.35) !important;"
                  :href="item.href"
                  :target="item.target"
                  >{{ item.text }}</a
                >
                <router-link
                  v-else
                  :to="item.to"
                  class="caption font-weight-light"
                  style="text-decoration:none;color:rgba(255,255,255,0.35) !important;"
                  >{{ item.text }}</router-link
                >
              </li>
            </ul>
          </v-col>
        </v-row>
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
          { text: 'Reporting', to: { name: 'reporting' } },
          { text: 'FOR Builder', to: { name: 'for-builder' } }
        ]
      },
      {
        title: 'Drivers',
        items: [
          { text: 'Vehicle Dashboard', to: { name: 'vehicle-search' } },
          { text: 'Driver Dashboard', to: { name: 'driver' } },
          { text: 'Account', to: { name: 'account' } }
        ]
      },
      {
        title: 'About',
        items: [
          { text: 'About', to: {}, href: '//emkay.com/about', target: '_blank' },
          { text: 'Leasing', to: {}, href: '//emkay.com/leasing/trac', target: '_blank' },
          { text: 'Services', to: {}, href: '//emkay.com/services/maintenance', target: '_blank' },
          { text: 'Technology', to: {}, href: '//emkay.com/technology/client-website', target: '_blank' },
          { text: 'Solutions', to: {}, href: '//emkay.com/strategic-solutions', target: '_blank' }
        ]
      }
    ]
  })
}
</script>

<style></style>
