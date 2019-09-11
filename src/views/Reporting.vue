<template>
  <v-container fluid class="content-wrap">
    <v-row>
      <v-col xs="12">
        <header class="font-weight-thin display-2 pa-3">
          {{ title }}
        </header>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="report in reports" :key="report.text" sm="6" md="4" lg="3">
        <v-card dark>
          <v-card-title>{{ report.text }}</v-card-title>
          <v-card-text>
            <v-btn :to="report.to">
              {{ report.text }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <router-view />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Reporting',
  data: () => ({
    title: 'Reporting',
    reports: [
      { text: 'Annual Expense', to: { name: 'annual-expense' } },
      { text: 'Replacement Analysis', to: { name: 'replacement-analysis' } },
      { text: 'Order Status', to: { name: 'order-status' } },
      { text: 'Inventory', to: { name: 'inventory' } },
      { text: 'Maintenance Detail', to: { name: 'maintenance-detail' } },
      { text: 'Claim Status', to: { name: 'claim-status' } },
      { text: 'MPG Report', to: { name: 'mpg-report' } },
      { text: 'Personal Mileage', to: { name: 'personal-mileage' } }
    ]
  })
}
</script>

<style></style>
