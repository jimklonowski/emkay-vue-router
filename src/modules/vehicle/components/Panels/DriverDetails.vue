<template>
  <article>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-toolbar :class="$config.TOOLBAR_CLASS">
          <v-toolbar-title class="text-uppercase">
            <span v-t="'vehicle_dashboard.driver'" class="font-weight-black" />
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
            <template #activator="{ on }">
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
                    <v-list-item-title v-if="item.component">
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
          <v-container class="py-0">
            <v-row>
              <!-- Driver Information -->
              <header
                v-t="'vehicle_dashboard.driver_information'"
                :class="$config.SUBHEADER_CLASS"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.last_name"
                :schema="schema.last_name"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.first_name"
                :schema="schema.first_name"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model.sync="model.employee_id"
                :schema="schema.employee_id"
                :cols="12"
                :sm="6"
                @update="handleUpdate('employee_id', $event)"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.selector_level"
                :schema="schema.selector_level"
                :cols="12"
                :sm="6"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model.sync="model.license_number"
                :schema="schema.license_number"
                :cols="12"
                :sm="6"
                @update="handleUpdate('license_number', $event)"
              />
              <field-with-loader
                :is-initializing="isInitializing"
                :is-editing="isEditing"
                :model="model.license_state"
                :schema="schema.license_state"
                :cols="12"
                :sm="6"
              />
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Contact Information -->
                  <header
                    v-t="'vehicle_dashboard.contact_information'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.address_1"
                    :schema="schema.address_1"
                    :cols="12"
                    @update="handleUpdate('address_1', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.address_2"
                    :schema="schema.address_2"
                    :cols="12"
                    @update="handleUpdate('address_2', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.city"
                    :schema="schema.city"
                    :cols="12"
                    @update="handleUpdate('city', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.state_province"
                    :schema="schema.state_province"
                    :cols="12"
                    :sm="4"
                    @update="handleUpdate('state_province', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.county"
                    :schema="schema.county"
                    :cols="12"
                    :sm="8"
                    @update="handleUpdate('county', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.postal_code"
                    :schema="schema.postal_code"
                    :cols="12"
                    @update="handleUpdate('postal_code', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.phone"
                    :schema="schema.phone"
                    :cols="12"
                    :sm="6"
                    @update="handleUpdate('phone', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.cell"
                    :schema="schema.cell"
                    :cols="12"
                    :sm="6"
                    @update="handleUpdate('cell', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.email"
                    :schema="schema.email"
                    :cols="12"
                    @update="handleUpdate('email', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Customization -->
                  <header
                    v-t="'vehicle_dashboard.customization'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.driver_use_1"
                    :schema="schema.driver_use_1"
                    :cols="12"
                    @update="handleUpdate('driver_use_1', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.driver_use_2"
                    :schema="schema.driver_use_2"
                    :cols="12"
                    @update="handleUpdate('driver_use_2', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.driver_use_3"
                    :schema="schema.driver_use_3"
                    :cols="12"
                    @update="handleUpdate('driver_use_3', $event)"
                  />
                  <field-with-loader
                    :is-initializing="isInitializing"
                    :is-editing="isEditing"
                    :model.sync="model.driver_use_4"
                    :schema="schema.driver_use_4"
                    :cols="12"
                    @update="handleUpdate('driver_use_4', $event)"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
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
            :ripple="false"
            color="error"
            text
            @click.prevent="cancelEdit"
          />
          <v-btn
            v-t="'common.save_changes'"
            type="submit"
            color="primary"
            :ripple="false"
            dark
            outlined
          >
            <v-icon dark v-text="'save'" />
            {{ $t('common.save_changes') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </article>
</template>

<script>
import { mask } from 'vue-the-mask'
import { email, maxLength, required } from 'vuelidate/lib/validators'
import { isLength } from '@/util/helpers'

import FieldWithLoader from '@/modules/core/components/FieldWithLoader'
import { FETCH_DRIVER_DETAILS } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'DriverDetails',
  components: { FieldWithLoader },
  directives: { mask },
  props: {
    vehicle: { type: String, default: '' }
  },
  data: self => ({
    errorMessage: null,
    hasPostalCodeError: false,
    isEditing: false,
    isInitializing: false,
    loading: false,
    loadingPostalCode: false,
    menuOpen: false,
    // menu actions
    actions: [
      {
        key: 'vehicle_dashboard.edit_driver',
        icon: 'edit',
        action: () => self.toggleEdit(),
        divider: true
      },
      {
        key: 'vehicle_dashboard.reassign_driver',
        icon: 'assignment_ind',
        action: () => alert('reassign driver')
      },
      {
        key: 'vehicle_dashboard.add_new_driver',
        icon: 'person_add',
        action: () => alert('add new driver')
      }
    ],

    // Model
    model: {
      // Driver Information
      last_name: '',
      first_name: '',
      employee_id: '',
      license_state: '',
      license_number: '',
      selector_level: '',
      // Contact Information
      address_1: '',
      address_2: '',
      postal_code: '',
      city: '',
      state_province: '',
      county: '',
      email: '',
      phone: '',
      cell: '',
      // Customization
      driver_use_1: '',
      driver_use_2: '',
      driver_use_3: '',
      driver_use_4: ''
    }
  }),
  computed: {
    // need to use computed property to store schema because i18n translations need to be computed
    schema() {
      return {
        // Driver Information
        last_name: {
          label: this.$t('vehicle_dashboard.last_name'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        first_name: {
          label: this.$t('vehicle_dashboard.first_name'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        employee_id: {
          label: this.$t('vehicle_dashboard.employee_id'),
          type: 'text',
          counter: 9,
          //['error-messages']: this.employeeIdErrors(), // okay syntax!
          errorMessages: this.employeeIdErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        selector_level: {
          label: this.$t('vehicle_dashboard.selector_level'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        license_number: {
          label: this.$t('vehicle_dashboard.license_number'),
          type: 'text',
          counter: 20,
          errorMessages: this.licenseNumberErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        license_state: {
          label: this.$t('vehicle_dashboard.license_state'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        // Contact Information
        address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          type: 'text',
          errorMessages: this.address1Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          type: 'text',
          errorMessages: this.address2Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        county: {
          label: this.$t('vehicle_dashboard.county'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          clearable: true,
          error: this.hasPostalCodeError,
          loading: this.loadingPostalCode,
          errorMessages: this.postalCodeErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        email: {
          label: this.$t('vehicle_dashboard.email'),
          type: 'email',
          errorMessages: this.emailErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        phone: {
          label: this.$t('vehicle_dashboard.phone'),
          type: 'tel',
          errorMessages: this.phoneErrors(),
          mask: '(###) ###-####',
          outlined: true,
          dense: true
        },
        cell: {
          label: this.$t('vehicle_dashboard.cell'),
          type: 'tel',
          mask: '(###) ###-####',
          errorMessages: this.cellErrors(),
          outlined: true,
          dense: true
        },
        // Customization
        driver_use_1: {
          label: this.$t('vehicle_dashboard.driver_use_1'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse1Errors(),
          outlined: true,
          dense: true
        },
        driver_use_2: {
          label: this.$t('vehicle_dashboard.driver_use_2'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse2Errors(),
          outlined: true,
          dense: true
        },
        driver_use_3: {
          label: this.$t('vehicle_dashboard.driver_use_3'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse3Errors(),
          outlined: true,
          dense: true
        },
        driver_use_4: {
          label: this.$t('vehicle_dashboard.driver_use_4'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse4Errors(),
          outlined: true,
          dense: true
        }
      }
    }
  },
  watch: {
    // set up watcher to monitor ZIP code field, and request city/state/county from DBC on change
    'model.postal_code': function(newValue, oldValue) {
      if (this.isInitializing) return // not initialized, ignore change
      else if (oldValue === newValue) return // no change, but update somehow triggered
      else if (!newValue) {
        // newValue is empty, so also clear the city/state/county
        this.model.city = ''
        this.model.state_province = ''
        this.model.county = ''
        return
      }
      else {
        //import ApiService instead of using axios directly and call ApiService.get(url, newValue)
        let url = `/postalcode/${newValue}`
        
        if (newValue.length >= 5) {
          //debugger
          this.loadingPostalCode = true
          this.$http
            .get(url)
            .then(response => {
              this.model = { ...this.model, ...response.data }
              this.hasPostalCodeError = false
            })
            .catch(err => {
              this.hasPostalCodeError = true
              this.errorMessage = err.message
            })
            .finally(() => {
              this.loadingPostalCode = false
            })
          console.log('POSTAL CODE CHANGED!')
        }
      }
    }
  },
  async created() {
    // Populate the panel
    this.isInitializing = true
    this.loading = true
    this.$store
      .dispatch(FETCH_DRIVER_DETAILS, this.vehicle)
      .then(response => {
        // Populate model
        this.model = response.data
        // Save off original model in case we are unhappy with our edits and want to cancel
        this.originalModel = { ...this.model }
      })
      .catch(error => {
        debugger
        this.errorMessage = error.message
      })
      .finally(() => {
        this.isInitializing = false
        this.loading = false
      })
  },
  validations: {
    model: {
      // Driver Information
      last_name: { required },
      first_name: { required },
      employee_id: { required, isLength: isLength(9) },
      selector_level: { required },
      license_number: { required, isLength: isLength(20) },
      license_state: { required },
      // Contact Information
      address_1: { required, maxLength: maxLength(30) },
      address_2: { maxLength: maxLength(30) },
      city: {},
      county: {},
      state_province: {},
      postal_code: { required /*,maxLength: maxLength(10)*/ },
      email: { required, email },
      phone: {},
      cell: {},
      // Customization
      driver_use_1: { maxLength: maxLength(40) },
      driver_use_2: { maxLength: maxLength(40) },
      driver_use_3: { maxLength: maxLength(40) },
      driver_use_4: { maxLength: maxLength(40) }
    }
  },
  methods: {
    handleUpdate(field, val) {
      //@update="model.employee_id = $event;$v.model.employee_id.$touch()"
      this.model[field] = val
      this.$v.model[field].$touch()
    },
    //tedious validators
    employeeIdErrors() {
      const errors = []
      if (!this.$v.model.employee_id.$dirty) return errors
      !this.$v.model.employee_id.required &&
        errors.push(this.translateError('validation.required', 'vehicle_dashboard.employee_id'))
      !this.$v.model.employee_id.isLength &&
        errors.push(this.translateError('validation.length', 9))
      return errors
    },
    licenseNumberErrors() {
      const errors = []
      if (!this.$v.model.license_number.$dirty) return errors
      !this.$v.model.license_number.required &&
        errors.push(this.translateError('validation.required','vehicle_dashboard.license_number'))
      !this.$v.model.license_number.isLength &&
        errors.push(this.translateError('validation.length', 20))
      return errors
    },
    address1Errors() {
      const errors = []
      if (!this.$v.model.address_1.$dirty) return errors
      !this.$v.model.address_1.required &&
        errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_1'))
      !this.$v.model.address_1.maxLength &&
        errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    address2Errors() {
      const errors = []
      if (!this.$v.model.address_2.$dirty) return errors
      !this.$v.model.address_2.maxLength &&
        errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    cityErrors() {
      const errors = []
      return errors
    },
    stateProvinceErrors() {
      const errors = []
      return errors
    },
    countyErrors() {
      const errors = []
      return errors
    },
    postalCodeErrors() {
      const errors = []
      if (!this.$v.model.postal_code.$dirty) return errors
      !this.$v.model.postal_code.required &&
        errors.push(this.translateError('validation.required','vehicle_dashboard.postal_code'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.model.email.$dirty) return errors
      !this.$v.model.email.email &&
        errors.push(this.translateError('validation.invalid', 'vehicle_dashboard.email'))
      !this.$v.model.email.required &&
        errors.push(this.translateError('validation.required', 'vehicle_dashboard.email'))
      return errors
    },
    phoneErrors() {
      const errors = []
      return errors
    },
    cellErrors() {
      const errors = []
      return errors
    },
    driverUse1Errors() {
      const errors = []
      if (!this.$v.model.driver_use_1.$dirty) return errors
      !this.$v.model.driver_use_1.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse2Errors() {
      const errors = []
      if (!this.$v.model.driver_use_2.$dirty) return errors
      !this.$v.model.driver_use_2.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse3Errors() {
      const errors = []
      if (!this.$v.model.driver_use_3.$dirty) return errors
      !this.$v.model.driver_use_3.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse4Errors() {
      const errors = []
      if (!this.$v.model.driver_use_4.$dirty) return errors
      !this.$v.model.driver_use_4.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    translateError(msgKey, fieldKey) {
      let attribute =
        typeof fieldKey === 'string' ? this.$t(fieldKey) : fieldKey
      return this.$t(msgKey, { attribute })
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
      this.menuOpen = false
      this.errorMessage = null
    },
    clearCityStateCounty() {
      this.model.city = ''
      this.model.state_province = ''
      this.model.county = ''
    },
    cancelEdit() {
      this.isEditing = !this.isEditing
      this.errorMessage = null
      // restore the original model if we want to cancel the edit
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
          console.log(error.response)
          this.errorMessage = error.response.data.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style></style>
