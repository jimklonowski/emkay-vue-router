<template>
  <section>
    <mega-menu
      :categories="categories"
      style="position:fixed;left:0;right:0;top:100px;"
    />
  </section>
</template>

<script>
import MegaMenu from '@/modules/core/components/navigation/MegaMenu'
export default {
  name: 'FleetManagement',
  components: {
    MegaMenu
  },
  data: () => ({
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
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style></style>
