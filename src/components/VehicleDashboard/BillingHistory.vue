<template>
  <section>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">
            {{ title1 }}
          </span>
          <span class="font-weight-thin">
            {{ title2 }}
          </span>
        </header>
        <v-subheader dark>
          {{ vehNum }}
        </v-subheader>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          dark
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :loading="loading"
          :sort-desc="[true]"
          dense
        />
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'BillingHistory',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title1: 'Billing',
    title2: 'History',
    loading: false,
    search: '',
    headers: [
      {
        text: 'Date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        text: 'Description',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'description'
      },
      {
        text: 'Invoice',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'invoice'
      },
      {
        text: 'Amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    items: [
      {
        date: '2019-08-01',
        description: 'FMS Billing',
        invoice: 'BF7718',
        amount: '$604.44'
      }
    ]
  })
}
</script>

<style></style>
