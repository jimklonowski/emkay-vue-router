<template>
  <article>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-toolbar :class="$config.TOOLBAR_CLASS">
          <v-toolbar-title class="text-uppercase">
            <span v-t="'vehicle_dashboard.vehicle'" class="font-weight-black" />
            <span v-t="'vehicle_dashboard.details'" class="font-weight-thin" />
            <v-subheader class="d-inline" dark v-text="vehicle" />
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            v-model="menuOpen"
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
              <template v-for="(item, i) in actions">
                <v-list-item :key="i" :color="item.color" @click="item.action">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-t="item.key" />
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="item.divider"
                  :key="`${i}-divider`"
                  class="mb-1"
                />
              </template>
              <!-- Additional Actions -->
              <order-status />
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-divider />
        <v-card-text class="pa-0">
          <v-list
            v-for="(section, i) in vehicleSections"
            :key="i"
            class="pa-0"
            subheader
            dense
          >
            <v-subheader v-t="section.key" :class="$config.SUBHEADER_CLASS" />
            <div class="px-3">
              <v-row dense>
                <v-list-item
                  v-for="(field, j) in section.fields"
                  :key="j"
                  :class="field.class"
                  style="user-select:text !important;"
                >
                  <v-list-item-content
                    v-if="isEditing"
                    class="pt-4"
                    :style="{ height: field.component ? 'auto' : '72px' }"
                  >
                    <v-list-item-subtitle
                      :class="$config.LABEL_CLASS"
                      v-text="$t(field.key)"
                      v-if="field.component"
                    />
                    <component
                      :is="field.component || 'v-text-field'"
                      :v-model="field"
                      :value="field.value"
                      :label="$t(field.key)"
                      :rules="rules.required"
                      :disabled="!field.editable"
                      dense
                    />
                    <!-- <v-text-field
                      :v-model="field"
                      :value="field.value"
                      :label="$t(field.key)"
                      :rules="rules.required"
                      :disabled="!field.editable"
                      outlined
                      dense
                    /> -->
                  </v-list-item-content>
                  <v-list-item-content
                    v-else
                    class="pt-2 pb-6"
                    style="height:72px"
                  >
                    <v-list-item-subtitle
                      :class="$config.LABEL_CLASS"
                      v-text="$t(field.key)"
                    />
                    <v-list-item-title
                      :class="$config.FIELD_CLASS"
                      v-text="field.value"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-row>
            </div>
          </v-list>
        </v-card-text>

        <v-card-actions v-if="isEditing">
          <v-alert
            v-if="errorMessage"
            outlined
            dense
            class="mb-0"
            type="error"
            v-text="errorMessage"
          />
          <v-spacer />
          <v-btn
            v-t="'common.cancel'"
            type="button"
            color="error"
            text
            @click.prevent="toggleEdit"
          />
          <v-btn type="submit" dark outlined color="primary">
            <v-icon dark v-text="'save'" />
            {{ $t('common.save_changes') }}
          </v-btn>
        </v-card-actions>
        <v-progress-linear
          slot="progress"
          absolute
          bottom
          color="primary"
          :height="4"
          indeterminate
        />
      </v-card>
    </v-form>
  </article>
</template>

<script>
import { VTextField } from 'vuetify/lib'
import CenterPicker from '@/modules/core/components/CenterPicker'
import OrderStatus from '@/modules/vehicle/components/Details/OrderStatus'

export default {
  name: 'VehicleDetails',
  components: {
    VTextField,
    OrderStatus,
    CenterPicker
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: self => ({
    errorMessage: null,
    isEditing: false,
    loading: false,
    menuOpen: false,
    rules: {
      required: [v => !!v || 'Field is required']
    },
    actions: [
      {
        key: 'vehicle_dashboard.edit_vehicle',
        icon: 'edit',
        action: () => self.toggleEdit(),
        divider: true
      },
      {
        key: 'vehicle_dashboard.schedule_ac',
        icon: 'schedule',
        action: () => alert('A/C click')
      },
      {
        key: 'vehicle_dashboard.report_expenses',
        icon: 'assessment',
        action: () => alert('Report Expenses')
      },
      {
        key: 'vehicle_dashboard.used_vehicle_quote',
        icon: 'local_atm',
        action: () => alert('Used Quote')
      },
      {
        key: 'vehicle_dashboard.terminate_vehicle',
        icon: 'cancel_presentation',
        action: () => alert('Terminate Vehicle')
      }
    ],
    vehicleSections: [
      {
        key: 'vehicle_dashboard.account_information',
        fields: [
          {
            key: 'vehicle_dashboard.account',
            label: 'Account',
            editable: false,
            class: 'col-md-6',
            value: 'EM102'
          },
          {
            key: 'vehicle_dashboard.billing_sort',
            label: 'Billing Sort',
            editable: false,
            class: 'col-md-6',
            value: '987654321OMG'
          },
          {
            key: 'vehicle_dashboard.center',
            label: 'Center',
            editable: true,
            class: 'col-12',
            component: CenterPicker,
            value: '001'
          }
        ]
      },
      {
        key: 'vehicle_dashboard.vehicle_information',
        fields: [
          {
            key: 'vehicle_dashboard.vin',
            label: 'VIN',
            editable: false,
            class: 'col-md-6',
            value: '987654321QWERTY'
          },
          {
            key: 'vehicle_dashboard.vehicle_number',
            label: 'Vehicle Number',
            editable: false,
            class: 'col-md-6',
            value: 'E69420'
          },
          {
            key: 'vehicle_dashboard.client_vehicle_number',
            label: 'Client Vehicle Number',
            editable: true,
            class: 'col-md-6',
            value: 'AAABBB'
          }
        ]
      },
      {
        key: 'vehicle_dashboard.customization',
        fields: [
          {
            key: 'vehicle_dashboard.custom_label_1',
            label: 'Client Use 1 Label',
            editable: true,
            class: 'col-md-6',
            value: 'Client Use 1'
          },
          {
            key: 'vehicle_dashboard.custom_1',
            label: 'Client Use 1',
            editable: true,
            class: 'col-md-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.custom_label_2',
            label: 'Client Use 2 Label',
            editable: true,
            class: 'col-md-6',
            value: 'Client Use 2'
          },
          {
            key: 'vehicle_dashboard.custom_2',
            label: 'Client Use 2',
            editable: true,
            class: 'col-md-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.custom_label_3',
            label: 'Client Use 3 Label',
            editable: true,
            class: 'col-md-6',
            value: 'Client Use 3'
          },
          {
            key: 'vehicle_dashboard.custom_3',
            label: 'Client Use 3',
            editable: true,
            class: 'col-md-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.custom_label_4',
            label: 'Client Use 4 Label',
            editable: true,
            class: 'col-md-6',
            value: 'Client Use 4'
          },
          {
            key: 'vehicle_dashboard.custom_4',
            label: 'Client Use 4',
            editable: true,
            class: 'col-md-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.custom_label_5',
            label: 'Client Use 5 Label',
            editable: true,
            class: 'col-md-6',
            value: 'Client Use 5'
          },
          {
            key: 'vehicle_dashboard.custom_5',
            label: 'Client Use 5',
            editable: true,
            class: 'col-md-6',
            value: 'asdf'
          }
        ]
      }
    ]
  }),
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing
      this.menuOpen = false
      this.errorMessage = null
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      // updateVehicle endpoint
      const url = '/test/error'
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Fix validation errors'
        this.loading = false
        return false
      }

      this.$http
        .post(url)
        .then(() => {
          //console.log(`Successful result: ${result}`)
          this.errorMessage = null
        })
        .catch(err => {
          this.errorMessage = err.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
.details-label {
  height: 16px !important;
  line-height: 16px !important;
  font-size: 12px !important;
  font-weight: 400 !important;
}
.text-label {
  height: 20px !important;
  line-height: 20px !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
}
.rotate-enter {
  transform: perspective(500px) rotate3d(0, 1, 0, 90deg);
}
.rotate-enter-active,
.rotate-leave-active {
  transition: 0.5s;
}
.rotate-leave-to {
  transform: perspective(500px) rotate3d(0, 1, 0, -90deg);
}
</style>
