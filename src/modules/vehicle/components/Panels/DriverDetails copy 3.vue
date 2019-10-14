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
              <v-col cols="12" sm="6" style="height:72px;">
                <transition name="rotate" mode="out-in">
                  <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                  <v-text-field
                    v-else-if="isEditing"
                    v-model="model.last_name"
                    v-bind="schema.last_name"
                  />
                  <display-field
                    v-else
                    :label="schema.last_name.label"
                    :value="model.last_name"
                  />
                </transition>
              </v-col>
              <v-col cols="12" sm="6" style="height:72px;">
                <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                <v-text-field
                  v-else-if="isEditing"
                  v-model="model.first_name"
                  v-bind="schema.first_name"
                />
                <display-field
                  v-else
                  :label="schema.first_name.label"
                  :value="model.first_name"
                />
              </v-col>
              <v-col cols="12" sm="6" style="height:72px;">
                <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                <v-text-field
                  v-else-if="isEditing"
                  v-model="model.employee_id"
                  v-bind="schema.employee_id"
                  @input="$v.model.employee_id.$touch()"
                  @blur="$v.model.employee_id.$touch()"
                />
                <display-field
                  v-else
                  :label="schema.employee_id.label"
                  :value="model.employee_id"
                />
              </v-col>
              <v-col cols="12" sm="6" style="height:72px;">
                <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                <v-text-field
                  v-else-if="isEditing"
                  v-model="model.selector_level"
                  v-bind="schema.selector_level"
                  @input="$v.model.selector_level.$touch()"
                  @blur="$v.model.selector_level.$touch()"
                />
                <display-field
                  v-else
                  :label="schema.selector_level.label"
                  :value="model.selector_level"
                />
              </v-col>
              <v-col cols="12" sm="6" style="height:72px;">
                <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                <v-text-field
                  v-else-if="isEditing"
                  v-model="model.license_number"
                  v-bind="schema.license_number"
                  @input="$v.model.license_number.$touch()"
                  @blur="$v.model.license_number.$touch()"
                />
                <display-field
                  v-else
                  :label="schema.license_number.label"
                  :value="model.license_number"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" style="height:72px;">
                <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                <v-text-field
                  v-else-if="isEditing"
                  v-model="model.license_state"
                  v-bind="schema.license_state"
                />
                <display-field
                  v-else
                  :label="schema.license_state.label"
                  :value="model.license_state"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Contact Information -->
                  <header
                    v-t="'vehicle_dashboard.contact_information'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.address_1"
                      v-bind="schema.address_1"
                      @input="$v.model.address_1.$touch()"
                      @blur="$v.model.address_1.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.address_1.label"
                      :value="model.address_1"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.address_2"
                      v-bind="schema.address_2"
                      @input="$v.model.address_2.$touch()"
                      @blur="$v.model.address_2.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.address_2.label"
                      :value="model.address_2"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.city"
                      v-bind="schema.city"
                      @input="$v.model.city.$touch()"
                      @blur="$v.model.city.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.city.label"
                      :value="model.city"
                    />
                  </v-col>
                  <v-col cols="12" sm="4" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.state_province"
                      v-bind="schema.state_province"
                      @input="$v.model.state_province.$touch()"
                      @blur="$v.model.state_province.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.state_province.label"
                      :value="model.state_province"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.county"
                      v-bind="schema.county"
                      @input="$v.model.county.$touch()"
                      @blur="$v.model.county.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.county.label"
                      :value="model.county"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.postal_code"
                      v-bind="schema.postal_code"
                      @input="$v.model.postal_code.$touch()"
                      @blur="$v.model.postal_code.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.postal_code.label"
                      :value="model.postal_code"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.phone"
                      v-bind="schema.phone"
                      v-mask="schema.phone.mask"
                      @input="$v.model.phone.$touch()"
                      @blur="$v.model.phone.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.phone.label"
                      :value="model.phone"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.cell"
                      v-bind="schema.cell"
                      v-mask="schema.cell.mask"
                      @input="$v.model.cell.$touch()"
                      @blur="$v.model.cell.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.cell.label"
                      :value="model.cell"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px;">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.email"
                      v-bind="schema.email"
                      @input="$v.model.email.$touch()"
                      @blur="$v.model.email.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.email.label"
                      :value="model.email"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Customization -->
                  <header
                    v-t="'vehicle_dashboard.customization'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <v-col cols="12" style="height:72px">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.driver_use_1"
                      v-bind="schema.driver_use_1"
                      @input="$v.model.driver_use_1.$touch()"
                      @blur="$v.model.driver_use_1.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.driver_use_1.label"
                      :value="model.driver_use_1"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.driver_use_2"
                      v-bind="schema.driver_use_2"
                      @input="$v.model.driver_use_2.$touch()"
                      @blur="$v.model.driver_use_2.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.driver_use_2.label"
                      :value="model.driver_use_2"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.driver_use_3"
                      v-bind="schema.driver_use_3"
                      @input="$v.model.driver_use_3.$touch()"
                      @blur="$v.model.driver_use_3.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.driver_use_3.label"
                      :value="model.driver_use_3"
                    />
                  </v-col>
                  <v-col cols="12" style="height:72px">
                    <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
                    <v-text-field
                      v-else-if="isEditing"
                      v-model="model.driver_use_4"
                      v-bind="schema.driver_use_4"
                      @input="$v.model.driver_use_4.$touch()"
                      @blur="$v.model.driver_use_4.$touch()"
                    />
                    <display-field
                      v-else
                      :label="schema.driver_use_4.label"
                      :value="model.driver_use_4"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-container class="py-0" v-else>
            <v-row>
                <header v-t="'vehicle_dashboard.driver_information'" :class="$config.SUBHEADER_CLASS" />
                <v-col cols="12" sm="6" v-for="(field, i) in model" :key="i">
                  {{ field }}
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <header v-t="'vehicle_dashboard.contact_information'" :class="$config.SUBHEADER_CLASS" />
                  <v-list dense>
                    <v-list-item-content>
                    </v-list-item-content>
                  </v-list>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <header v-t="'vehicle_dashboard.customization'" :class="$config.SUBHEADER_CLASS" />
                  <v-list dense>
                  </v-list>
                </v-row>
              </v-col>
            </v-row>
          </v-container> -->
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
            @click.prevent="cancelEdit"
          />
          <v-btn
            v-t="'common.save_changes'"
            type="submit"
            color="primary"
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
import {
  between,
  email,
  helpers,
  minLength,
  maxLength,
  required
} from 'vuelidate/lib/validators'

const isLength = length => value => helpers.len(value) === length

import DisplayField from '@/modules/core/components/DisplayField'
import { FETCH_DRIVER_DETAILS } from '@/modules/vehicle/store/actions.type'

export default {
  name: 'DriverDetails',
  components: {
    DisplayField
  },
  directives: {
    mask
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  async created() {
    this.isInitializing = true
    this.loading = true
    this.$store
      .dispatch(FETCH_DRIVER_DETAILS, this.vehicle)
      .then(response => {
        // populate model
        this.model = response.data
        // save off original model in case we edit
        this.originalModel = { ...this.model }
      })
      .catch(err => {
        debugger
        this.errorMessage = err.message
      })
      .finally(() => {
        this.isInitializing = false
        this.loading = false
      })
  },
  computed: {
    // need to use computed property to store schema because i18n translations need to be computed
    schema() {
      return {
        // driver info
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
        // contact info
        address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          type: 'text',
          counter: 30,
          errorMessages: this.address1Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          type: 'text',
          counter: 30,
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
          error: this.postalCodeError,
          loading: this.loadingPostalCode,
          errorMessages: this.postalCodeErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        email: {
          label: this.$t('vehicle_dashboard.email'),
          type: 'email',
          counter: 60,
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
        // customization
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
  validations: {
    model: {
      last_name: { required },
      first_name: { required },
      employee_id: { required, isLength: isLength(9) },
      selector_level: { required },
      license_number: { required, isLength: isLength(20) },
      license_state: { required },
      address_1: { required, maxLength: maxLength(30) },
      address_2: { maxLength: maxLength(30) },
      city: {},
      county: {},
      state_province: {},
      postal_code: { required /*,maxLength: maxLength(10)*/ },
      email: { required, email },
      phone: {},
      cell: {},
      driver_use_1: { maxLength: maxLength(40) },
      driver_use_2: { maxLength: maxLength(40) },
      driver_use_3: { maxLength: maxLength(40) },
      driver_use_4: { maxLength: maxLength(40) }
    }
  },
  watch: {
    'model.postal_code': function(newValue, oldValue) {
      //import ApiService instead of using axios directly and call ApiService.get(url, newValue)
      let url = `/postalcode/${newValue}`


      if (oldValue !== newValue && newValue.length >= 5) {
        this.loadingPostalCode = true
        this.$http
          .get(url)
          .then(response => {
            this.model = { ...this.model, ...response.data }
            this.postalCodeError = false
          })
          .catch(err => {
            this.postalCodeError = true
            this.errorMessage = err.message
          })
          .finally(() => {
            this.loadingPostalCode = false
          })
        console.log('POSTAL CODE CHANGED!')
      }
    }
  },
  data: self => ({
    errorMessage: null,
    menuOpen: false,
    loading: false,
    loadingPostalCode: false,
    postalCodeError: false,
    isEditing: false,
    isInitializing: false,
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
      // Model - driver info
      last_name: '',
      first_name: '',
      employee_id: '',
      license_state: '',
      license_number: '',
      selector_level: '',
      // Model - contact info
      address_1: '',
      address_2: '',
      postal_code: '',
      city: '',
      state_province: '',
      county: '',
      email: '',
      phone: '',
      cell: '',
      // Model - customization
      driver_use_1: '',
      driver_use_2: '',
      driver_use_3: '',
      driver_use_4: ''
    }
  }),
  methods: {
    //tedious validators
    employeeIdErrors() {
      const errors = []
      if (!this.$v.model.employee_id.$dirty) return errors
      !this.$v.model.employee_id.required &&
        errors.push(
          this.translateError(
            'validation.required',
            'vehicle_dashboard.employee_id'
          )
        )
      !this.$v.model.employee_id.isLength &&
        errors.push(this.translateError('validation.length', 9))
      return errors
    },
    licenseNumberErrors() {
      const errors = []
      if (!this.$v.model.license_number.$dirty) return errors
      !this.$v.model.license_number.required &&
        errors.push(
          this.translateError(
            'validation.required',
            'vehicle_dashboard.license_number'
          )
        )
      !this.$v.model.license_number.isLength &&
        errors.push(this.translateError('validation.length', 20))
      return errors
    },
    address1Errors() {
      const errors = []
      return errors
    },
    address2Errors() {
      const errors = []
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
      !this.$v.model.postal_code.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.postal_code'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.model.email.$dirty) return errors
      !this.$v.model.email.email && errors.push(this.translateError('validation.invalid', 'vehicle_dashboard.email'))
      !this.$v.model.email.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.email'))
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
      return errors
    },
    driverUse2Errors() {
      const errors = []
      return errors
    },
    driverUse3Errors() {
      const errors = []
      return errors
    },
    driverUse4Errors() {
      const errors = []
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
    cancelEdit() {
      this.isEditing = false
      this.errorMessage = null
      // restore the original model if we want to cancel the edit
      Object.assign(this.model, this.originalModel)
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      const url = '/test/error'

      // trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors, dude!'
        this.loading = false
        return false
      }
      
      this.$http
        .post(url)
        .then(result => {
          console.log(`Successful result: ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
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
<style></style>
