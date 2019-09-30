<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{
            $t('vehicle_dashboard.invoice')
          }}</span>
          <span class="font-weight-thin">{{
            $t('vehicle_dashboard.history')
          }}</span>
          <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          :label="$t('common.search')"
          single-line
          hide-details
          dark
        />
        <v-menu transition="slide-y-transition" z-index="3" left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item
              v-for="(item, i) in actions"
              :key="i"
              :color="item.color"
              @click="item.action"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="invoice_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
          dense
        >
          <template
            v-for="header in headers"
            v-slot:[`header.${header.value}`]="{ header }"
          >
            {{ $t(header.key) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </article>
</template>

<script>
export default {
  name: 'InvoiceHistory',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'Invoice',
    subtitle: 'History',
    search: '',
    loading: false,
    actions: [
      {
        key: 'common.export_to_excel',
        icon: 'cloud_download',
        action: () => alert('download')
      }
    ],
    headers: [
      {
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'common.description',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'description'
      },
      {
        key: 'vehicle_dashboard.invoice',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'invoice'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    invoice_history: [
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
