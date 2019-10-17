<template>
  <article>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-toolbar :color="errorMessage ? 'error' : 'primary'" :class="$config.TOOLBAR_CLASS" dark>
          <toolbar-title :key1="'vehicle_dashboard.vehicle'" :key2="'vehicle_dashboard.details'" :subtitle="vehicle" />
          <v-spacer />
          <v-menu
            v-model="menuOpen"
            :close-on-content-click="false"
            transition="slide-y-transition"
            z-index="3"
            left
          >
            <template #activator="{ on }">
              <v-btn color="rgba(255, 255, 255, 0.8)" dark icon v-on="on">
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
                    <v-list-item-title v-if="item.component">
                      <component
                        :is="item.component"
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

        <v-card-text class="pa-0">
          <v-container class="py-0">
            <v-row>
              <!-- Account Information -->
              <v-subheader
                v-t="'vehicle_dashboard.account_information'"
                :class="$config.SUBHEADER_CLASS"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.account"
                :schema="schema.account"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.center_description"
                :schema="schema.center_description"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.billing_sort"
                :schema="schema.billing_sort"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.center"
                :schema="schema.center"
                :cols="12"
                :sm="6"
              />
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Vehicle Information -->
                  <v-subheader
                    v-t="'vehicle_dashboard.vehicle_information'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.year"
                    :schema="schema.year"
                    :cols="12"
                    :sm="6"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.make"
                    :schema="schema.make"
                    :cols="12"
                    :sm="6"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.model"
                    :schema="schema.model"
                    :cols="12"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.vin"
                    :schema="schema.vin"
                    :cols="12"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.vehicle_number"
                    :schema="schema.vehicle_number"
                    :cols="12"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_vehicle_number"
                    :schema="schema.client_vehicle_number"
                    :cols="12"
                  />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Customization -->
                  <v-subheader
                    v-t="'vehicle_dashboard.customization'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <!-- <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_label_1"
                    :schema="schema.client_use_label_1"
                    :cols="12"
                    :sm="6"
                  /> -->
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_1"
                    :schema="schema.client_use_1"
                    :cols="12"
                    @update="handleUpdate('client_use_1', $event)"
                  />
                  <!-- <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_label_2"
                    :schema="schema.client_use_label_2"
                    :cols="12"
                    :sm="6"
                  /> -->
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_2"
                    :schema="schema.client_use_2"
                    :cols="12"
                    @update="handleUpdate('client_use_2', $event)"
                  />
                  <!-- <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_label_3"
                    :schema="schema.client_use_label_3"
                    :cols="12"
                    :sm="6"
                  /> -->
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_3"
                    :schema="schema.client_use_3"
                    :cols="12"
                    @update="handleUpdate('client_use_3', $event)"
                  />
                  <!-- <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_label_4"
                    :schema="schema.client_use_label_4"
                    :cols="12"
                    :sm="6"
                  /> -->
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_4"
                    :schema="schema.client_use_4"
                    :cols="12"
                    @update="handleUpdate('client_use_4', $event)"
                  />
                  <!-- <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_label_5"
                    :schema="schema.client_use_label_5"
                    :cols="12"
                    :sm="6"
                  /> -->
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model="model.client_use_5"
                    :schema="schema.client_use_5"
                    :cols="12"
                    @update="handleUpdate('client_use_5', $event)"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions style="height:72px;">
          <transition name="component-fade" mode="out-in">
            <v-alert v-if="errorMessage" color="error--text" class="mb-0" dense>
              <v-icon color="error" v-text="'warning'" />
              {{ errorMessage }}
            </v-alert>
          </transition>
          <v-spacer />
          <template v-if="isEditing">
            <v-btn
              v-t="'common.cancel'"
              type="button"
              color="error"
              :ripple="false"
              text
              @click.prevent="cancelEdit"
            />
            <v-btn
              v-t="'common.save_changes'"
              type="submit"
              color="primary"
              :ripple="false"
              depressed
              tile
            >
              <v-icon dark v-text="'save'" />
              {{ $t('common.save_changes') }}
            </v-btn>
          </template>
        </v-card-actions>
        <!-- <v-progress-linear
          slot="progress"
          absolute
          bottom
          color="primary"
          :height="4"
          indeterminate
        /> -->
      </v-card>
    </v-form>
  </article>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import { isLength, translateError } from '@/util/helpers'
import FieldWithLoader from '@/modules/core/components/FieldWithLoader'
import CenterPicker from '@/modules/core/components/CenterPicker'

//import ToolbarTitle from '@/modules/core/components/ToolbarTitle'

//import EditCustomLabels from '@/modules/vehicle/components/Forms/EditCustomLabels'
//import OrderStatus from '@/modules/vehicle/components/Details/OrderStatus'

import { FETCH_VEHICLE_DETAILS } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'VehicleDetails',
  components: {
    FieldWithLoader,
    CenterPicker,
    //OrderStatus,
    //EditCustomLabels: () => import('@/modules/vehicle/components/Forms/EditCustomLabels'),

    ToolbarTitle: () => import('@/modules/core/components/ToolbarTitle')
  },
  props: {
    vehicle: { type: String, default: '' }
  },
  data: self => ({
    errorMessage: null,
    isEditing: false,
    isInitializing: false,
    loading: false,
    menuOpen: false,
    // menu actions
    actions: [
      {
        key: 'vehicle_dashboard.edit_vehicle',
        icon: 'edit',
        action: () => self.toggleEdit(),
        divider: true
      },
      {
        key: 'vehicle_dashboard.order_status',
        icon: 'av_timer',
        action: () => {},
        component: () => import('@/modules/vehicle/components/Details/OrderStatus'),
      },
      {
        key: 'vehicle_dashboard.edit_custom_labels',
        icon: 'label_important',
        action: () => {},
        component: () => import('@/modules/vehicle/components/Forms/EditCustomLabels')
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
    // Model
    model: {
      // Account Information
      account: '',
      billing_sort: '',
      center: '',
      center_description: '',
      // Vehicle Information
      year: '',
      make: '',
      model: '',
      vin: '',
      vehicle_number: '',
      client_vehicle_number: '',
      // Customization
      client_use_label_1: '',
      client_use_1: '',
      client_use_label_2: '',
      client_use_2: '',
      client_use_label_3: '',
      client_use_3: '',
      client_use_label_4: '',
      client_use_4: '',
      client_use_label_5: '',
      client_use_5: ''
    }
  }),
  computed: {
    schema() {
      return {
        // Account Information
        account: {
          label: this.$t('vehicle_dashboard.account'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        billing_sort: {
          label: this.$t('vehicle_dashboard.billing_sort'),
          type: 'text',
          outlined: true,
          dense: true
        },
        center: {
          label: this.$t('vehicle_dashboard.center'),
          type: 'text',
          outlined: true,
          dense: true
        },
        center_description: {
          label: this.$t('vehicle_dashboard.center_description'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        // Vehicle Information
        year: {
          label: this.$t('vehicle_dashboard.year'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        make: {
          label: this.$t('vehicle_dashboard.make'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        model: {
          label: this.$t('vehicle_dashboard.model'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        vin: {
          label: this.$t('vehicle_dashboard.vin'),
          type: 'text',
          outlined: true,
          dense: true
        },
        vehicle_number: {
          label: this.$t('vehicle_dashboard.vehicle_number'),
          type: 'text',
          outlined: true,
          disabled: true,
          dense: true
        },
        client_vehicle_number: {
          label: this.$t('vehicle_dashboard.client_vehicle_number'),
          type: 'text',
          outlined: true,
          dense: true
        },
        // Customization
        client_use_1: {
          //label: this.$t('vehicle_dashboard.client_use_1'),
          label: this.getLabel('client_use_label_1'),
          type: 'text',
          counter: 40,
          errorMessages: this.clientUse1Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_1: {
        //   label: this.$t('vehicle_dashboard.client_use_label_1'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_2: {
          //label: this.$t('vehicle_dashboard.client_use_2'),
          label: this.getLabel('client_use_label_2'),
          type: 'text',
          counter: 40,
          errorMessages: this.clientUse2Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_2: {
        //   label: this.$t('vehicle_dashboard.client_use_label_2'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_3: {
          //label: this.$t('vehicle_dashboard.client_use_3'),
          label: this.getLabel('client_use_label_3'),
          type: 'text',
          counter: 40,
          errorMessages: this.clientUse3Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_3: {
        //   label: this.$t('vehicle_dashboard.client_use_label_3'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_4: {
          //label: this.$t('vehicle_dashboard.client_use_4'),
          label: this.getLabel('client_use_label_4'),
          type: 'text',
          counter: 40,
          errorMessages: this.clientUse4Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_4: {
        //   label: this.$t('vehicle_dashboard.client_use_label_4'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_5: {
          //label: this.$t('vehicle_dashboard.client_use_5'),
          label: this.getLabel('client_use_label_5'),
          type: 'text',
          counter: 40,
          errorMessages: this.clientUse5Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_5: {
        //   label: this.$t('vehicle_dashboard.client_use_label_5'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // }
      }
    }
  },
  async created() {
    // Populate the panel
    this.isInitializing = true
    this.loading = true
    this.$store
      .dispatch(FETCH_VEHICLE_DETAILS, this.vehicle)
      .then(response => {
        // populate the model
        this.model = response.data
        // save off original model in case we are unhappy with our edits and want to cancel
        this.originalModel = { ...this.model }
      })
      .catch(error => {
        //debugger
        this.errorMessage = error.message
      })
      .finally(() => {
        this.isInitializing = false
        this.loading = false
      })
  },
  validations: {
    model: {
      // Account Information
      account: { required },
      billing_sort: { required },
      center: { required },
      center_description: {},
      // Vehicle Information
      year: { required },
      make: { required },
      model: { required },
      vin: { required },
      vehicle_number: { required, isLength: isLength(6) },
      client_vehicle_number: { maxLength: maxLength(8) },
      // Customization
      client_use_1: { maxLength: maxLength(40) },
      //client_use_label_1: { maxLength: maxLength(40) },
      client_use_2: { maxLength: maxLength(40) },
      //client_use_label_2: { maxLength: maxLength(40) },
      client_use_3: { maxLength: maxLength(40) },
      //client_use_label_3: { maxLength: maxLength(40) },
      client_use_4: { maxLength: maxLength(40) },
      //client_use_label_4: { maxLength: maxLength(40) },
      client_use_5: { maxLength: maxLength(40) },
      //client_use_label_5: { maxLength: maxLength(40) }
    }
  },
  methods: {
    translateError,
    handleUpdate(field, val) {
      // child component emitted a custom event and we should update the parent's (this component) model
      this.model[field] = val
      this.$v.model[field].$touch()
    },
    getLabel(key) {
      // if there's a custom label already set, fetch it from the model and display it.
      if (Object.prototype.hasOwnProperty.call(this.model, key) && !!this.model[key]) return this.model[key]
      // otherwise, return the default i18n translation of 'vehicle_dashboard.custom_use_N_label'
      return this.$t(`vehicle_dashboard.${key}`)
    },
    // tedious validators,
    clientUse1Errors() {
      const errors = []
      if (!this.$v.model.client_use_1.$dirty) return errors
      !this.$v.model.client_use_1.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse2Errors() {
      const errors = []
      if (!this.$v.model.client_use_2.$dirty) return errors
      !this.$v.model.client_use_2.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse3Errors() {
      const errors = []
      if (!this.$v.model.client_use_3.$dirty) return errors
      !this.$v.model.client_use_3.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse4Errors() {
      const errors = []
      if (!this.$v.model.client_use_4.$dirty) return errors
      !this.$v.model.client_use_4.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse5Errors() {
      const errors = []
      if (!this.$v.model.client_use_5.$dirty) return errors
      !this.$v.model.client_use_5.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },

    toggleEdit() {
      this.isEditing = !this.isEditing
      this.menuOpen = false
      this.errorMessage = null
    },
    cancelEdit() {
      this.isEditing = !this.isEditing
      this.errorMessage = null
      // Restore original model if we cancel the edit, since the model may be dirty
      Object.assign(this.model, this.originalModel)
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      const url = '/test/post'

      // trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors, dude!'
        this.loading = false
        return false
      }

      this.$http
        .post(url, this.model)
        .then(result => {
          console.log(`Successful result: ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          this.errorMessage = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>