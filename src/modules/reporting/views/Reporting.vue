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
  name: 'Reporting',
  components: {
    MegaMenu
  },
  data: () => ({
    title: 'Reporting',
    categories: [
      {
        text: 'Fleet',
        items: [
          {
            text: 'Inventory',
            to: '/todo'
          },
          {
            text: 'Order Status',
            to: '/todo'
          },
          {
            text: 'Replacement Analysis',
            to: '/todo'
          },
          {
            text: 'Sold Vehicle Analysis',
            to: '/todo'
          },
          {
            text: 'Driver Performance',
            to: '/todo'
          },
          {
            text: 'Vehicle Inspection',
            to: '/todo'
          },
          {
            text: 'MPG / KPL Analysis',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Expense',
        items: [
          {
            text: 'Maintenance Detail',
            to: '/todo'
          },
          {
            text: 'Fuel Detail',
            to: '/todo'
          },
          {
            text: 'Expense Summary',
            to: '/todo'
          },
          {
            text: 'Short Term Rental Detail',
            to: '/todo'
          },
          {
            text: 'Toll Detail',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Custom',
        items: [
          {
            text: 'Vehicle and Driver',
            to: '/todo'
          },
          {
            text: 'Maintenance',
            to: '/todo'
          },
          {
            text: 'Fuel',
            to: '/todo'
          },
          {
            text: 'Invoice',
            to: '/todo'
          },
          {
            text: 'Expense Summary',
            to: '/todo'
          },
          {
            text: 'Insurance Claim',
            to: '/todo'
          },
          {
            text: 'Violation',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Invoicing',
        items: [
          {
            text: 'Invoice History',
            to: '/todo'
          },
          {
            text: 'Custom Invoicing',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Services',
        items: [
          {
            text: 'eVoucher',
            to: '/todo'
          },
          {
            text: 'License Renewal',
            to: '/todo'
          },
          {
            text: 'Driver 360 Mileage',
            to: '/todo'
          },
          {
            text: 'Accident Claim',
            to: '/todo'
          }
        ]
      },
      {
        text: 'Safety and Telematics',
        items: [
          {
            text: 'SafeRoads Fleet Summary',
            to: '/todo'
          },
          {
            text: 'SafeRoads Trip Detail',
            to: '/todo'
          },
          {
            text: 'Engine Faults',
            to: '/todo'
          },
          {
            text: 'Driver Safety',
            to: '/todo'
          },
          {
            text: 'Driver Record',
            to: '/todo'
          }
        ]
      }
    ]
  })
}
</script>

<style></style>
