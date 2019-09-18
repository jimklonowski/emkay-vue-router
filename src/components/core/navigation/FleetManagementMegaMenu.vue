<template>
  <v-btn :ripple="false" text dark @mouseover="showMenu" @mouseleave="hideMenu">
    {{ title }}
    <v-icon>arrow_drop_down</v-icon>
    <transition name="mega-menu-fade">
      <v-card
        v-show="isVisible"
        color="blue-grey lighten-2"
        style="position:fixed;left:0;right:0;top:64px;width:100vw;min-width:100vw;cursor:auto;"
        class="text-left"
        tile
        light
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="category in categories"
              :key="category.text"
              sm="4"
              xl="2"
            >
              <v-subheader class="font-weight-medium" dark>
                {{ category.text }}
              </v-subheader>
              <v-divider dark />
              <v-list dark color="transparent">
                <v-list-item
                  v-for="item in category.items"
                  :key="item.text"
                  :to="item.to"
                  class="text-capitalize caption"
                  style="min-height:24px"
                  dense
                  link
                >
                  {{ item.text }}
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </transition>
  </v-btn>
</template>

<script>
export default {
  name: 'FleetManagementMegaMenu',
  data: () => ({
    isVisible: false,
    title: 'Fleet Management',
    categories: [
      {
        text: 'Category X',
        items: [
          {
            text: 'Manage Your Online Users',
            to: '/todo'
          },
          {
            text: 'Manage Your Fleet Policies',
            to: '/todo'
          },
          {
            text: 'Customize Your Fleet Labels',
            to: '/todo'
          },
          {
            text: 'Manage Your Drivers',
            to: '/todo'
          },
          {
            text: 'Manage Your Driver Fuel PINs',
            to: '/todo'
          },
          {
            text: 'Manage Your eNotifications',
            to: '/todo'
          },
          {
            text: 'Manage Your Cases',
            to: '/todo'
          },
          {
            text: 'View Your Fuel Auth Profiles',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Category Y',
        items: [
          {
            text: 'Approve Your Maintenance Repairs',
            to: '/todo'
          },
          {
            text: 'Approve Your Driver Prders',
            to: '/todo'
          },
          {
            text: 'Request an MVR',
            to: '/todo'
          },
          {
            text: 'Upload Your Odometers',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Tools',
        items: [
          {
            text: 'Locate Preferred Shops',
            to: '/todo'
          },
          {
            text: 'Quote a Transport',
            to: '/todo'
          },
          {
            text: 'LCCA',
            to: '/todo'
          }
        ]
      }
    ]
  }),
  methods: {
    hideMenu() {
      console.log('hide')
      this.isVisible = false
    },
    showMenu() {
      console.log('show')
      this.isVisible = true
    }
  }
}
</script>

<style scoped>
.mega-menu-fade-enter-active,
.mega-menu-fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.mega-menu-fade-enter,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
