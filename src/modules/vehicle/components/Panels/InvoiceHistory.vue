<template>
  <article>
    <v-card>
      <v-toolbar :class="$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.invoice'" />
          <span v-t="'vehicle_dashboard.history'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark v-text="vehicle" />
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
        <!-- close-on-content-click=false is REQUIRED for the download button to work -->
        <v-menu
          :close-on-content-click="false"
          transition="slide-y-transition"
          z-index="3"
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon v-text="'more_vert'" />
            </v-btn>
          </template>
          <v-list nav dense>
            <!-- download button -->
            <v-list-item link>
              <v-list-item-icon>
                <v-icon v-text="'cloud_download'" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <json-excel
                    :data="invoice_history"
                    :fields="headerExport"
                    :type="exportFormat"
                    :default-value="' -- '"
                    :name="downloadName"
                  >
                    {{ $t('common.export_to_excel') }}
                  </json-excel>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- other actions -->
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
                <v-list-item-title v-t="item.key" />
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
          :no-data-text="$t('common.no_data_found')"
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
import JsonExcel from 'vue-json-excel'
import { exportName, headersForExport } from '@/util/helpers'
import { mapActions } from 'vuex'
import { FETCH_INVOICE_HISTORY } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'InvoiceHistory',
  components: {
    JsonExcel
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    errorMessage: null,
    exportFormat: 'xls',
    name: 'invoice_history',
    loading: true,
    search: '',
    actions: [
      // {
      //   key: 'common.export_to_excel',
      //   icon: 'cloud_download',
      //   action: () => alert('download')
      // }
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
    invoice_history: []
  }),
  computed: {
    headerExport() {
      return headersForExport(this.headers)
    },
    downloadName() {
      return exportName(this.name, this.exportFormat)
    }
  },
  created() {
    // fetch the data when the view is created and data is being observed
    this.fetchInvoiceHistory(this.vehicle)
      .then(response => {
        this.invoice_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions([FETCH_INVOICE_HISTORY])
  }
}
</script>

<style></style>
