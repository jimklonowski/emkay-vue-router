<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template #activator="{ on }">
      <div v-t="key" v-on="on" @click.stop.prevent="resetForm" />
    </template>
    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.driver'" />
          <span v-t="'vehicle_dashboard.add'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark />
        </v-toolbar-title>
        <v-spacer />
        <v-btn large icon tile dark @click.prevent="dialog = false">
          <v-icon v-text="'close'" />
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <template v-for="(step, i) in steps">
            <v-stepper-step
              :key="`step${i}`"
              :complete="currentStep > i"
              :step="i + 1"
            >
              {{ $t(step.key) }}
            </v-stepper-step>
            <v-divider v-if="i < steps.length - 1" :key="`div${i}`" />
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1" :complete="currentStep > 1">
            <v-form ref="step1">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.last_name" v-bind="schema.last_name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.first_name" v-bind="schema.first_name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.employee_id" v-bind="schema.employee_id" />
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-text-field v-model="model.license_state" v-bind="schema.license_state" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="model.license_number" v-bind="schema.license_number" />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="2" :complete="currentStep > 2">
            <v-form ref="step2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.address_1" v-bind="schema.address_1" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.email" v-bind="schema.email" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.address_2" v-bind="schema.address_2" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.phone" v-bind="schema.phone" v-mask="schema.phone.mask" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="model.city" v-bind="schema.city" />
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-text-field v-model="model.state_province" v-bind="schema.state_province" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.cell" v-bind="schema.cell" v-mask="schema.cell.mask" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.postal_code" v-bind="schema.postal_code" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="model.county" v-bind="schema.county" />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="3" :complete="currentStep > 3">
            <v-form ref="step3">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="model.driver_use_1" v-bind="schema.driver_use_1" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="model.driver_use_2" v-bind="schema.driver_use_2" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="model.driver_use_3" v-bind="schema.driver_use_3" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="model.driver_use_4" v-bind="schema.driver_use_4" />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <v-stepper-content class="pa-0" step="4" :complete="currentStep > 4">
            <v-form ref="step4">
              <v-container fluid class="py-0">
                <v-row>
                  <!-- Driver Information -->
                  <header
                    v-t="'vehicle_dashboard.driver_information'"
                    :class="$config.SUBHEADER_CLASS"
                  />
                  <v-col cols="12" sm="6">
                    <display-field :label="schema.last_name.label" :value="model.last_name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <display-field :label="schema.first_name.label" :value="model.first_name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <display-field :label="schema.employee_id.label" :value="model.employee_id" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <display-field :label="schema.license_state.label" :value="model.license_state" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <display-field :label="schema.license_number.label" :value="model.license_number" />
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
                      <v-col cols="12" md="6">
                        <display-field :label="schema.address_1.label" :value="model.address_1" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <display-field :label="schema.address_2.label" :value="model.address_2" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <display-field :label="schema.city.label" :value="model.city" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <display-field :label="schema.state_province.label" :value="model.state_province" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <display-field :label="schema.county.label" :value="model.county" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <display-field :label="schema.postal_code.label" :value="model.postal_code" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <display-field :label="schema.email.label" :value="model.email" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <display-field :label="schema.phone.label" :value="model.phone" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <display-field :label="schema.cell.label" :value="model.cell" />
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
                      
                      <v-col cols="12">
                        <display-field :label="schema.driver_use_1.label" :value="model.driver_use_1" />
                      </v-col>
                      <v-col cols="12">
                        <display-field :label="schema.driver_use_2.label" :value="model.driver_use_2" />
                      </v-col>
                      <v-col cols="12">
                        <display-field :label="schema.driver_use_3.label" :value="model.driver_use_3" />
                      </v-col>
                      <v-col cols="12">
                        <display-field :label="schema.driver_use_4.label" :value="model.driver_use_4" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-card-actions>
        <v-alert v-if="errorMessage" type="error" v-text="errorMessage" class="mb-0" dense outlined />
        <v-spacer />
        <v-btn
          v-if="currentStep > 1"
          color="error"
          :ripple="false"
          text
          @click.prevent="currentStep--;errorMessage = null"
        >
          {{ $t('common.previous') }}
        </v-btn>
        <v-btn
          v-if="currentStep < steps.length"
          color="primary"
          :ripple="false"
          depressed
          tile
          @click.prevent="nextStep(currentStep)"
        >
          {{ $t('common.next') }}
        </v-btn>
        <v-btn
          v-else-if="currentStep === steps.length"
          color="primary"
          :ripple="false"
          depressed
          tile
          @click.prevent="onSubmit"
        >
          <v-icon v-text="'person_add'" class="mr-2" />
          {{ $t('vehicle_dashboard.add_new_driver') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'
import { email, maxLength, required } from 'vuelidate/lib/validators'
import { isLength, translateError } from '@/util/helpers'
import DisplayField from '@/modules/core/components/DisplayField'

export default {
  name: 'AddDriver',
  components: { DisplayField },
  directives: { mask },
  data: self => ({
    currentStep: 1,
    dialog: false,
    errorMessage: null,
    key: 'vehicle_dashboard.add_new_driver',
    loading: false,
    loadingPostalCode: false,
    steps: [
      {
        step: 1,
        key: 'vehicle_dashboard.driver_information'
      },
      {
        step: 2,
        key: 'vehicle_dashboard.contact_information'
      },
      {
        step: 3,
        key: 'vehicle_dashboard.customization'
      },
      {
        step: 4,
        key: 'common.summary'
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
      //selector_level: '',
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
          errorMessages: this.lastNameErrors(),
          errorCount: 1,
          dense: true
        },
        first_name: {
          label: this.$t('vehicle_dashboard.first_name'),
          type: 'text',
          errorMessages: this.firstNameErrors(),
          errorCount: 1,
          dense: true
        },
        employee_id: {
          label: this.$t('vehicle_dashboard.employee_id'),
          type: 'text',
          counter: 9,
          //['error-messages']: this.employeeIdErrors(), // okay syntax!
          errorMessages: this.employeeIdErrors(),
          errorCount: 1,
          dense: true
        },
        // selector_level: {
        //   label: this.$t('vehicle_dashboard.selector_level'),
        //   type: 'text',
        //   disabled: true,
        //   outlined: true,
        //   dense: true
        // },
        license_number: {
          label: this.$t('vehicle_dashboard.license_number'),
          type: 'text',
          counter: 20,
          errorMessages: this.licenseNumberErrors(),
          errorCount: 1,
          dense: true
        },
        license_state: {
          label: this.$t('vehicle_dashboard.license_state'),
          errorMessages: this.licenseStateErrors(),
          type: 'text',
          dense: true
        },
        // Contact Information
        address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          type: 'text',
          tabindex: 1,
          errorMessages: this.address1Errors(),
          errorCount: 1,
          dense: true
        },
        address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          type: 'text',
          tabindex: 2,
          errorMessages: this.address2Errors(),
          errorCount: 1,
          dense: true
        },
        city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          errorMessages: this.cityErrors(),
          disabled: true,
          dense: true
        },
        state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          errorMessages: this.stateProvinceErrors(),
          disabled: true,
          dense: true
        },
        county: {
          label: this.$t('vehicle_dashboard.county'),
          type: 'text',
          //errorMessages: this.countyErrors(),
          disabled: true,
          dense: true
        },
        postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          tabindex: 3,
          clearable: true,
          error: this.hasPostalCodeError,
          loading: this.loadingPostalCode,
          errorMessages: this.postalCodeErrors(),
          errorCount: 1,
          dense: true
        },
        email: {
          label: this.$t('vehicle_dashboard.email'),
          type: 'email',
          tabindex: 4,
          errorMessages: this.emailErrors(),
          errorCount: 1,
          dense: true
        },
        phone: {
          label: this.$t('vehicle_dashboard.phone'),
          type: 'tel',
          tabindex: 5,
          errorMessages: this.phoneErrors(),
          mask: '(###) ###-####',
          dense: true
        },
        cell: {
          label: this.$t('vehicle_dashboard.cell'),
          type: 'tel',
          tabindex: 6,
          mask: '(###) ###-####',
          //errorMessages: this.cellErrors(),
          dense: true
        },
        // Customization
        driver_use_1: {
          label: this.$t('vehicle_dashboard.driver_use_1'),
          type: 'text',
          counter: 40,
          placeholder: '',
          errorMessages: this.driverUse1Errors(),
          dense: true
        },
        driver_use_2: {
          label: this.$t('vehicle_dashboard.driver_use_2'),
          type: 'text',
          counter: 40,
          placeholder: '',
          errorMessages: this.driverUse2Errors(),
          dense: true
        },
        driver_use_3: {
          label: this.$t('vehicle_dashboard.driver_use_3'),
          type: 'text',
          counter: 40,
          placeholder: '',
          errorMessages: this.driverUse3Errors(),
          dense: true
        },
        driver_use_4: {
          label: this.$t('vehicle_dashboard.driver_use_4'),
          type: 'text',
          counter: 40,
          placeholder: '',
          errorMessages: this.driverUse4Errors(),
          dense: true
        }
      }
    }
  },
  watch: {
    // Watch postalcode field for changes and autofill city/state/county from DBC
    'model.postal_code': function(newValue, oldValue) {
      if (oldValue === newValue) return
      else if (!newValue) {
        this.clearCityStateCounty()
        return
      } else {
        let url = `/postalcode/${newValue}`
        if(newValue.length >= 5) {
          this.loadingPostalCode = true
          this.$http
            .get(url)
            .then(response => {
              // TODO: handle multiple results returned
              this.model = { ...this.model, ...response.data }
              this.hasPostalCodeError = false
            })
            .catch(error => {
              this.hasPostalCodeError = true
              //this.errorMessage = error.message
            })
            .finally(() => {
              this.loadingPostalCode = false
            })
        }
      }
    }
  },
  //async created(){},
  validations: {
    model: {
      // Driver Information
      last_name: { required },
      first_name: { required },
      employee_id: { required, isLength: isLength(9) },
      //selector_level: { required },
      license_number: { required, isLength: isLength(20) },
      license_state: { required },
      // Contact Information
      address_1: { required, maxLength: maxLength(30) },
      address_2: { maxLength: maxLength(30) },
      city: { required },
      county: {},
      state_province: { required },
      postal_code: { required /*,maxLength: maxLength(10)*/ },
      email: { required, email },
      phone: { required },
      cell: {},
      // Customization
      driver_use_1: { maxLength: maxLength(40) },
      driver_use_2: { maxLength: maxLength(40) },
      driver_use_3: { maxLength: maxLength(40) },
      driver_use_4: { maxLength: maxLength(40) }
    },
    step1: [
      'model.last_name',
      'model.first_name',
      'model.employee_id',
      'model.license_state',
      'model.license_number'
    ],
    step2: [
      'model.address_1',
      'model.address_2',
      'model.city',
      'model.county',
      'model.state_province',
      'model.postal_code',
      'model.email',
      'model.phone',
      'model.cell'
    ],
    step3: [
      'model.driver_use_1',
      'model.driver_use_2',
      'model.driver_use_3',
      'model.driver_use_4'
    ]
  },
  methods: {
    resetForm() {
      Object.keys(this.model).forEach(k => this.model[k] = '')
      this.currentStep = 1
      this.$v.$reset()
    },
    translateError,
    //tedious validators
    lastNameErrors() {
      const errors = []
      if (!this.$v.model.last_name.$dirty) return errors
      !this.$v.model.last_name.required && errors.push(this.translateError('validation.required','vehicle_dashboard.last_name'))
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.model.first_name.$dirty) return errors
      !this.$v.model.first_name.required && errors.push(this.translateError('validation.required','vehicle_dashboard.first_name'))
      return errors
    },
    employeeIdErrors() {
      const errors = []
      if (!this.$v.model.employee_id.$dirty) return errors
      !this.$v.model.employee_id.required && errors.push(this.translateError('validation.required','vehicle_dashboard.employee_id'))
      !this.$v.model.employee_id.isLength && errors.push(this.translateError('validation.length', 9))
      return errors
    },
    licenseStateErrors() {
      const errors = []
      if (!this.$v.model.license_state.$dirty) return errors
      !this.$v.model.license_state.required && errors.push(this.translateError('validation.required','vehicle_dashboard.license_state'))
      return errors
    },
    licenseNumberErrors() {
      const errors = []
      if (!this.$v.model.license_number.$dirty) return errors
      !this.$v.model.license_number.required && errors.push(this.translateError('validation.required','vehicle_dashboard.license_number'))
      !this.$v.model.license_number.isLength && errors.push(this.translateError('validation.length', 20))
      return errors
    },
    address1Errors() {
      const errors = []
      if (!this.$v.model.address_1.$dirty) return errors
      !this.$v.model.address_1.required && errors.push(this.translateError('validation.required','vehicle_dashboard.address_1'))
      !this.$v.model.address_1.maxLength && errors.push(this.translateError('validation.length', 30))
      return errors
    },
    address2Errors() {
      const errors = []
      if (!this.$v.model.address_2.$dirty) return errors
      //!this.$v.model.address_2.required && errors.push(this.translateError('validation.required','vehicle_dashboard.address_2'))
      !this.$v.model.address_2.maxLength && errors.push(this.translateError('validation.length', 30))
      return errors
    },
    cityErrors() {
      const errors = []
      if (!this.$v.model.city.$dirty) return errors
      !this.$v.model.city.required && errors.push(this.translateError('validation.required','vehicle_dashboard.city'))
      return errors
    },
    countyErrors() {
      const errors = []
      return errors
    },
    stateProvinceErrors() {
      const errors = []
      if (!this.$v.model.state_province.$dirty) return errors
      !this.$v.model.state_province.required && errors.push(this.translateError('validation.required','vehicle_dashboard.state_province'))
      return errors
    },
    postalCodeErrors() {
      const errors = []
      if (!this.$v.model.postal_code.$dirty) return errors
      !this.$v.model.postal_code.required && errors.push(this.translateError('validation.required','vehicle_dashboard.postal_code'))
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.model.phone.$dirty) return errors
      !this.$v.model.phone.required && errors.push(this.translateError('validation.required','vehicle_dashboard.phone'))
      return errors
    },
    // cellErrors() {
    //   const errors = []
    //   if (!this.$v.model..$dirty) return errors
    //   !this.$v.model..required && errors.push(this.translateError('validation.required','vehicle_dashboard.'))
    //   return errors
    // },
    emailErrors() {
      const errors = []
      if (!this.$v.model.email.$dirty) return errors
      !this.$v.model.email.required && errors.push(this.translateError('validation.required','vehicle_dashboard.email'))
      !this.$v.model.email.email && errors.push(this.translateError('validation.invalid','vehicle_dashboard.email'))
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
    validateStep(n) {
      let step = this.$v[`step${n}`]
      if (!step) return

      step.$touch() // trigger validations
      return !step.$anyError
    },
    nextStep(n) {
      if (this.validateStep(n)) this.currentStep += 1
    },
    clearCityStateCounty() {
      this.model.city = ''
      this.model.state_province = ''
      this.model.county = ''
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      const url = '/test/post'
      //trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix validation errors, dude!'
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

<style>

</style>