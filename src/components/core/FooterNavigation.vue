<template>
  <v-footer padless dark>
    <v-card width="100%" flat tile class="blue-grey white--text text-center">
      <v-divider />
      <v-card-text :class="this.$config.COMPONENT_HEADER_CLASS">
        {{ new Date().getFullYear() }} - <strong>EMKAY</strong>, Inc.
      </v-card-text>
      <v-divider />
      <v-card-text :class="this.$config.FOOTER_CLASS">
        <v-row justify="center">
          <v-col
            v-for="bucket in buckets"
            :key="bucket.title"
            cols="12"
            sm="4"
            lg="2"
          >
            <div class="justify-center overline mb-2">
              {{ bucket.title }}
            </div>
            <ul class="justify-center pl-0" style="list-style:none;">
              <li v-for="item in bucket.items" :key="item.text">
                <a
                  v-if="item.target"
                  class="caption font-weight-light"
                  style="text-decoration:none;color:rgba(255,255,255,0.35) !important;"
                  :href="item.href"
                  :target="item.target"
                >
                  {{ item.text }}
                </a>
                <router-link
                  v-else
                  :to="item.to"
                  class="caption font-weight-light"
                  style="text-decoration:none;color:rgba(255,255,255,0.35) !important;"
                >
                  {{ item.text }}
                </router-link>
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
        title: 'About',
        items: [
          {
            text: 'About EMKAY',
            to: {},
            href: '//emkay.com/about',
            target: '_blank'
          },
          {
            text: 'Blog',
            to: {},
            href: '//emkay.com/blog',
            target: '_blank'
          },
          {
            text: 'Careers',
            to: {},
            href: '//emkay.com/careers/job-listings',
            target: '_blank'
          },
          {
            text: 'Contact',
            to: {},
            href: '//emkay.com/contact',
            target: '_blank'
          }
        ]
      },
      {
        title: 'More',
        items: [
          {
            text: 'Press Releases',
            to: {},
            href: '//emkay.com/news',
            target: '_blank'
          },
          {
            text: 'Leadtime Guides',
            to: {},
            href: '//emkay.com/',
            target: '_blank'
          },
          {
            text: 'Fleet Incentives',
            to: {},
            href: '//emkay.com/',
            target: '_blank'
          },
          {
            text: 'Automotive Links',
            to: {},
            href: '//emkay.com/',
            target: '_blank'
          }
        ]
      },
      {
        title: 'Technology',
        items: [
          {
            text: 'Celsius',
            to: {},
            href: '//emkay.com/about',
            target: '_blank'
          },
          {
            text: 'Driver360',
            to: {},
            href: '//emkay.com/technology/mobile-apps',
            target: '_blank'
          },
          {
            text: 'Fleet360',
            to: {},
            href: '//emkay.com/technology/mobile-apps',
            target: '_blank'
          },
          {
            text: 'Fleet Exchange',
            to: {},
            href: '//emkay.com/',
            target: '_blank'
          },
          {
            text: 'Geotab',
            to: {},
            href: '//emkay.com/',
            target: '_blank'
          }
        ]
      }
    ]
  })
}
</script>

<style></style>
