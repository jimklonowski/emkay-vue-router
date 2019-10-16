<template>
  <article>
    <v-card>
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.accident'" />
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
          <!-- menu actions -->
          <v-list nav dense>
            <template v-for="(item, i) in actions">
              <v-list-item :key="i" :color="item.color" @click="item.action">
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <!-- export as excel button -->
                  <v-list-item-title v-if="item.isExport">
                    <component
                      :is="item.component.is"
                      v-t="item.key"
                      :fields="getHeaders"
                      :data="accident_history"
                      :name="getName"
                    />
                  </v-list-item-title>
                  <!-- report accident button -->
                  <v-list-item-title v-else-if="item.isReportAccident">
                    <component
                      :is="item.component.is"
                      :key="item.key"
                      :vehicle="vehicle"
                    />
                  </v-list-item-title>
                  <!-- other actions -->
                  <v-list-item-title v-else v-t="item.key" />
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="item.divider"
                :key="`${i}-divider`"
                class="mb-1"
              />
            </template>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="accident_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          dense
        >
          <template #loading>
            <v-skeleton-loader type="table-tbody" tile />
          </template>
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
import ReportAccident from '@/modules/vehicle/components/Forms/ReportAccident'
import { nameForExport, headersForExport } from '@/util/helpers'
import { FETCH_ACCIDENT_HISTORY } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'AccidentHistory',
  components: {
    JsonExcel,
    ReportAccident
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
    name: 'accident_history',
    loading: true,
    search: '',
    actions: [
      {
        key: 'common.export_to_excel',
        icon: 'cloud_download',
        action: () => {},
        isExport: true,
        component: {
          is: JsonExcel
        },
        divider: true
      },
      {
        key: 'vehicle_dashboard.report_accident',
        icon: 'drive_eta',
        action: () => {},
        isReportAccident: true,
        component: {
          is: ReportAccident
        }
      }
    ],
    headers: [
      {
        key: 'vehicle_dashboard.loss_date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'loss_date'
      },
      {
        key: 'vehicle_dashboard.claim_number',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'claim_number'
      },
      {
        key: 'vehicle_dashboard.claim_type',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'claim_type'
      },
      {
        key: 'vehicle_dashboard.claim_amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'claim_amount'
      },
      {
        key: 'vehicle_dashboard.subrogation_amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'subrogated_amount'
      }
    ],
    accident_history: []
  }),
  computed: {
    getHeaders() {
      return headersForExport(this.headers)
    },
    getName() {
      return nameForExport(this.name, this.exportFormat)
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    //this.fetchAccidentHistory(this.vehicle)
    this.$store
      .dispatch(FETCH_ACCIDENT_HISTORY, this.vehicle)
      .then(response => {
        this.accident_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    //...mapActions([FETCH_ACCIDENT_HISTORY])
  }
}
</script>

<style></style>
