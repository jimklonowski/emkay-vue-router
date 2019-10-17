<template>
  <article>
    <v-card>
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title :key1="'vehicle_dashboard.vehicle'" :key2="'vehicle_dashboard.notes'" :subtitle="vehicle" />
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
                      :data="vehicle_notes"
                      :name="getName"
                    />
                  </v-list-item-title>
                  <!-- add note button -->
                  <v-list-item-title v-else-if="item.component.is">
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
          :items="vehicle_notes"
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
import AddNote from '@/modules/vehicle/components/Forms/AddNote'
//import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
import JsonExcel from 'vue-json-excel'
import { nameForExport, headersForExport } from '@/util/helpers'
import { FETCH_VEHICLE_NOTES } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'VehicleNotes',
  components: {
    AddNote,
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
    name: 'vehicle_notes',
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
        key: 'vehicle_dashboard.add_note',
        icon: 'note_add',
        action: () => {},
        component: {
          is: AddNote
        }
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
        key: 'vehicle_dashboard.subject',
        width: '250px',
        align: 'left',
        sortable: true,
        value: 'subject'
      },
      {
        key: 'vehicle_dashboard.note',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'note'
      },
      {
        key: 'auth.username',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'user'
      }
    ],
    vehicle_notes: []
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
    this.$store
      .dispatch(FETCH_VEHICLE_NOTES, this.vehicle)
      .then(response => {
        this.vehicle_notes = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {}
}
</script>

<style></style>
