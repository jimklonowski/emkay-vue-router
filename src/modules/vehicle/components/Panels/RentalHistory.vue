<template>
  <article>
    <v-card>
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title :key1="'vehicle_dashboard.rental'" :key2="'vehicle_dashboard.history'" :subtitle="vehicle" />
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
                      :data="rental_history"
                      :name="getName"
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
          :items="rental_history"
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
//import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
import { nameForExport, headersForExport } from '@/util/helpers'
import { FETCH_RENTAL_HISTORY } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'RentalHistory',
  components: {
    JsonExcel,
    ToolbarTitle: () => import('@/modules/core/components/ToolbarTitle')
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
    name: 'rental_history',
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
        key: 'vehicle_dashboard.reason',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'reason'
      },
      {
        key: 'vehicle_dashboard.voucher',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'voucher'
      },
      {
        key: 'vehicle_dashboard.rental_rate',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'rate'
      },
      {
        key: 'vehicle_dashboard.days',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'days'
      },
      {
        key: 'vehicle_dashboard.total_amount',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'total'
      }
    ],
    rental_history: []
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
    //this.fetchRentalHistory(this.vehicle)
    this.$store
      .dispatch(FETCH_RENTAL_HISTORY, this.vehicle)
      .then(response => {
        this.rental_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    //...mapActions([FETCH_RENTAL_HISTORY])
  }
}
</script>

<style></style>
