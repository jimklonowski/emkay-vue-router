<template>
  <article>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-toolbar :class="this.$config.TOOLBAR_CLASS">
          <v-toolbar-title class="text-uppercase">
            <span class="font-weight-black">{{
              $t('vehicle_dashboard.vehicle')
            }}</span>
            <span class="font-weight-thin">{{
              $t('vehicle_dashboard.details')
            }}</span>
            <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
          </v-toolbar-title>
          <v-spacer />
          <v-menu transition="slide-y-transition" z-index="3" left>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list flat nav dense>
              <v-list-item
                v-for="(item, i) in actions"
                :key="i"
                :color="item.color"
                @click="item.action"
              >
                <component :is="item.component" v-if="item.component" />
                <template v-else>
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(item.key) }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
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
            <v-subheader class="col-12 overline blue-grey lighten-5">
              {{ $t(section.key) }}
            </v-subheader>
            <div class="px-3">
              <v-row dense>
                <v-list-item
                  v-for="(field, j) in section.fields"
                  :key="j"
                  :class="field.class"
                  style="user-select:text !important;height:72px;"
                >
                  <v-list-item-content v-if="isEditing" class="py-0">
                    <v-text-field
                      :label="$t(field.key)"
                      :v-model="field"
                      :value="field.value"
                      :rules="editorRules.required"
                      :disabled="!field.editable"
                    >
                      {{ field.value }}
                    </v-text-field>
                  </v-list-item-content>
                  <v-list-item-content v-else class="pt-0 pb-4">
                    <v-list-item-subtitle class="details-label">
                      {{ $t(field.key) }}
                    </v-list-item-subtitle>
                    <v-list-item-title
                      class="text-label blue-grey--text text--darken-2"
                    >
                      {{ field.value }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-row>
            </div>
          </v-list>
        </v-card-text>

        <v-card-actions v-if="isEditing">
          <v-alert v-if="errorMessage" outlined dense class="mb-0" type="error">
            {{ errorMessage }}
          </v-alert>
          <v-spacer />
          <v-btn
            type="button"
            color="error"
            text
            @click.prevent="
              isEditing = !isEditing
              errorMessage = null
            "
          >
            Cancel
          </v-btn>
          <v-btn type="submit" dark outlined color="primary">
            <v-icon dark> save </v-icon>&nbsp;Save Changes
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
import OrderStatus from '@/modules/vehicle/components/OrderStatus'

export default {
  name: 'VehicleDetails',
  components: {
    OrderStatus
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: self => ({
    actions: [
      {
        key: 'vehicle_dashboard.edit_vehicle',
        icon: 'edit',
        action: () => (self.isEditing = !self.isEditing)
      },
      {
        key: 'vehicle_dashboard.order_status',
        icon: 'av_timer',
        action: () => {},
        component: OrderStatus
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
    pendingOrder: true,
    errorMessage: null,
    isEditing: false,
    loading: false,
    editorRules: {
      required: [v => !!v || 'Field is required']
    },

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
            component: '',
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
    ],

    vehicleInfo: [
      {
        index: 0,
        key: 'account',
        name: 'Account',
        value: 'EM102',
        editable: false
      },
      {
        index: 1,
        key: 'billing_sort',
        name: 'Billing Sort',
        value: '1234567890-WOW',
        editable: true
      },
      {
        index: 2,
        key: 'vin',
        name: 'VIN',
        value: '987654321QWERTY',
        editable: false
      },
      {
        index: 3,
        key: 'vehicle_number',
        name: 'Vehicle Number',
        value: '123456',
        editable: false
      },
      {
        index: 4,
        key: 'center',
        name: 'Center',
        value: '001',
        editable: true
      },
      {
        index: 5,
        key: 'center_description',
        name: 'Center Description',
        value: 'Executive',
        editable: true
      },
      {
        index: 6,
        key: 'client_vehicle_number',
        name: 'Client Vehicle Number',
        value: '987654',
        editable: true
      },
      {
        index: 7,
        key: 'vehicle_year',
        name: 'Year',
        value: '2019',
        editable: false
      },
      {
        index: 8,
        key: 'vehicle_make',
        name: 'Make',
        value: 'DODGE',
        editable: false
      },
      {
        index: 9,
        key: 'vehicle_model',
        name: 'Model',
        value: 'DURANGO',
        editable: false
      },
      {
        index: 10,
        key: 'vehicle_classification',
        name: 'Category',
        value: 'Sport Utility - Medium',
        editable: false
      },
      {
        index: 11,
        key: 'vehicle_status',
        name: 'Status',
        value: 'ON BILLING',
        editable: false
      },
      {
        index: 12,
        key: 'customer_use_1',
        name: 'Client Use 1',
        value: 'asdf',
        editable: true
      },
      {
        index: 13,
        key: 'customer_use_2',
        name: 'Client Use 2',
        value: 'qwer',
        editable: true
      },
      {
        index: 14,
        key: 'customer_use_3',
        name: 'Client Use 3',
        value: '1234',
        editable: true
      },
      {
        index: 15,
        key: 'customer_use_4',
        name: 'Client Use 4',
        value: 'jklo',
        editable: true
      },
      {
        index: 16,
        key: 'customer_use_5',
        name: 'Client Use 5',
        value: 'test',
        editable: true
      }
    ]
  }),
  created() {
    //this.headerClass = this.$config.COMPONENT_HEADER_CLASS
  },
  methods: {
    toggleEdit() {
      console.log('toggle edit')
      this.isEditing = !this.isEditing
    },
    orderStatus() {
      alert('pending order status')
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
