<template>
  <section>
    <mega-menu
      :categories="categories"
      style="position:fixed;left:0;right:0;top:100px;"
      :color="'blue-grey lighten-2'"
    />
  </section>
</template>

<script>
import MegaMenu from '@/components/core/navigation/MegaMenu'

export default {
  name: 'Ordering',
  components: {
    MegaMenu
  },
  data: () => ({
    title: 'Ordering',
    categories: [
      {
        text: 'Orders',
        items: [
          {
            text: 'Place Factory Orders',
            to: '/todo'
          },
          {
            text: 'Place Stock Orders',
            to: '/todo'
          },
          {
            text: 'View Order Requests',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Driver Orders',
        items: [
          {
            text: 'Manage Driver Order Settings',
            to: '/todo'
          },
          {
            text: 'Allow Drivers To Order',
            to: '/todo'
          },
          {
            text: 'Approve Driver Orders',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Selectors',
        items: [
          {
            text: 'Manage Your Selectors',
            to: '/todo'
          },
          {
            text: 'Manage Your Selector Groups',
            to: '/todo'
          }
        ]
      }
    ]
  })
}
</script>
<style></style>
