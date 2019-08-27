<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template v-slot:activator="{ on }">
      <v-btn outlined tile color="error" v-on="on" @click.prevent=""> <v-icon left> drive_eta </v-icon>&nbsp;{{ title1 }} {{ title2 }} </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title class="blue-grey white--text">
        <header class="text-uppercase">
          <span class="font-weight-black">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-spacer></v-spacer>
        <v-btn large icon tile dark @click.prevent="dialog = false"><v-icon>close</v-icon></v-btn>
      </v-card-title>

      <v-stepper v-model="currentStep" class="elevation-0">
        <v-stepper-header>
          <template v-for="formStep in steps">
            <v-stepper-step :key="formStep.title" :complete="currentStep > formStep.step" :editable="false" :step="formStep.step">{{
              formStep.title
            }}</v-stepper-step>
            <v-divider v-if="formStep.step < steps.length" :key="formStep.step"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :step="steps[0].step">
            <v-form :ref="steps[0].ref">
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="steps[0].last_name.value"
                    :label="steps[0].last_name.label"
                    :rules="rules.required"
                    class="col-sm-6"
                  ></v-text-field>
                  <v-text-field
                    v-model="steps[0].first_name.value"
                    :label="steps[0].first_name.label"
                    class="col-sm-6"
                    :rules="rules.required"
                  ></v-text-field>
                  <v-text-field
                    v-model="steps[0].address_1.value"
                    :label="steps[0].address_1.label"
                    class="col-sm-6"
                    :rules="rules.required"
                  ></v-text-field>
                  <v-text-field v-model="steps[0].address_2.value" :label="steps[0].address_2.label" class="col-sm-6"></v-text-field>
                  <v-text-field v-model="steps[0].city.value" :label="steps[0].city.label" class="col-sm-6" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[0].state.value" :label="steps[0].state.label" class="col-sm-2" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[0].zip.value" :label="steps[0].zip.label" class="col-sm-4" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[0].phone.value" :label="steps[0].phone.label" class="col-sm-6" :rules="rules.required"></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>

          <v-stepper-content :step="steps[1].step">
            <v-form :ref="steps[1].ref">
              <v-container>
                <v-row>
                  <v-text-field v-model="steps[1].vin.value" :label="steps[1].vin.label" class="col-12" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[1].year.value" :label="steps[1].year.label" class="col-sm-3" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[1].make.value" :label="steps[1].make.label" class="col-sm-4" :rules="rules.required"></v-text-field>
                  <v-text-field v-model="steps[1].model.value" :label="steps[1].model.label" class="col-sm-5" :rules="rules.required"></v-text-field>
                  <v-text-field
                    v-model="steps[1].license_plate.value"
                    :label="steps[1].license_plate.label"
                    class="col-sm-6"
                    :rules="rules.required"
                  ></v-text-field>
                  <v-text-field
                    v-model="steps[1].license_state.value"
                    :label="steps[1].license_state.label"
                    class="col-sm-2"
                    :rules="rules.required"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>

          <v-stepper-content :step="steps[2].step">
            <v-form :ref="steps[2].ref">
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-menu
                      v-model="steps[2].date.menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      full-width
                      min-width="290px"
                      max-width="290px"
                      :nudge-right="40"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="steps[2].date.value"
                          :label="steps[2].date.label"
                          prepend-icon="event"
                          clearable
                          readonly
                          :rules="rules.required"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="steps[2].date.value" no-title scrollable @change="steps[2].date.menu = false"></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-menu
                      v-model="steps[2].time.menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      full-width
                      max-width="290px"
                      min-width="290px"
                      :nudge-right="40"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="steps[2].time.value"
                          :label="steps[2].time.label"
                          prepend-icon="access_time"
                          clearable
                          readonly
                          :rules="rules.required"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="steps[2].time.value"
                        :ampm-in-title="true"
                        format="ampm"
                        @change="steps[2].time.menu = false"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="steps[2].vehicles.value" :label="steps[2].vehicles.label" prepend-icon="directions_car"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-switch v-model="steps[2].injuries.value" :label="steps[2].injuries.label" class="col-4"></v-switch>
                  <v-switch
                    v-if="steps[2].injuries.value"
                    v-model="steps[2].others_injured.value"
                    :label="steps[2].others_injured.label"
                    class="col-4"
                  ></v-switch>
                  <v-switch
                    v-if="steps[2].injuries.value"
                    v-model="steps[2].you_injured.value"
                    :label="steps[2].you_injured.label"
                    class="col-4"
                  ></v-switch>
                  <v-textarea
                    v-if="steps[2].injuries.value && steps[2].you_injured.value"
                    v-model="steps[2].injured_extent.value"
                    :label="steps[2].injured_extent.label"
                    :rows="1"
                    class="col-12"
                  ></v-textarea>
                </v-row>
                <v-row>
                  <v-switch v-model="steps[2].police_contacted.value" :label="steps[2].police_contacted.label" class="col-12"></v-switch>
                  <v-text-field
                    v-if="steps[2].police_contacted.value"
                    v-model="steps[2].police_report.value"
                    :label="steps[2].police_report.label"
                    class="col-6"
                  ></v-text-field>
                  <v-switch
                    v-if="steps[2].police_contacted.value"
                    v-model="steps[2].citations.value"
                    :label="steps[2].citations.label"
                    class="col-12"
                  ></v-switch>
                </v-row>
                <v-row>
                  <v-divider></v-divider>
                  <v-textarea v-model="steps[2].location.value" outlined :label="steps[2].location.label" class="col-12"></v-textarea>
                  <v-textarea v-model="steps[2].description.value" outlined :label="steps[2].description.label" class="col-12"></v-textarea>
                  <v-textarea v-model="steps[2].damages.value" outlined :label="steps[2].damages.label" class="col-12"></v-textarea>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>

          <v-stepper-content :step="steps[3].step">
            <v-form :ref="steps[3].ref">
              <v-container>
                <v-row>
                  <v-list two-line>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Name</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ fullName }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Address</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ fullAddress }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Vehicle</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ vehicleInfo }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">License</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ licenseInfo }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Accident</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ accidentTime }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Location</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ steps[2].location.value }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Description</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ steps[2].description.value }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-subtitle :class="summaryLabelClass">Damages</v-list-item-subtitle>
                        <v-list-item-title :class="summaryTextClass">{{ steps[2].damages.value }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-divider></v-divider>
      <v-progress-linear slot="progress" absolute bottom color="primary" :height="5" indeterminate></v-progress-linear>
      <v-card-actions>
        <v-alert v-if="errorMessage" outlined dense class="mb-0" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-spacer></v-spacer>
        <v-btn v-if="currentStep > 1" text color="secondary" @click.prevent="currentStep--">Back</v-btn>
        <v-btn v-if="currentStep < steps.length" color="primary" @click.prevent="nextStep">Next</v-btn>
        <v-btn v-else color="primary" @click.prevent="onSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReportAccident',
  data() {
    return {
      title1: 'Report',
      title2: 'Accident',
      currentStep: 1,
      dialog: false,
      errorMessage: null,
      loading: false,
      rules: {
        required: [v => !!v || 'Field is required']
      },
      summaryLabelClass: 'details-label',
      summaryTextClass: 'blue-grey--text text--darken-2',

      steps: [
        {
          step: 1,
          editable: true,
          ref: 'formStep1',
          title: 'Driver Information',
          last_name: {
            label: 'Last Name',
            value: ''
          },
          first_name: {
            label: 'First Name',
            value: ''
          },
          address_1: {
            label: 'Address Line 1',
            value: ''
          },
          address_2: {
            label: 'Address Line 2',
            value: ''
          },
          city: {
            label: 'City',
            value: ''
          },
          state: {
            label: 'State',
            value: ''
          },
          zip: {
            label: 'ZIP',
            value: ''
          },
          phone: {
            label: 'Phone',
            value: ''
          }
        },
        {
          step: 2,
          editable: true,
          ref: 'formStep2',
          title: 'Vehicle Information',
          vin: {
            label: 'VIN',
            value: ''
          },
          year: {
            label: 'Year',
            value: ''
          },
          make: {
            label: 'Make',
            value: ''
          },
          model: {
            label: 'Model',
            value: ''
          },
          license_plate: {
            label: 'License Plate',
            value: ''
          },
          license_state: {
            label: 'License State',
            value: ''
          }
        },
        {
          step: 3,
          editable: true,
          ref: 'formStep3',
          title: 'Accident Information',
          date: {
            label: 'Date of Accident',
            value: new Date().toISOString().substr(0, 10),
            menu: false
          },
          time: {
            label: 'Time of Accident',
            value: '12:00',
            menu: false
          },
          vehicles: {
            label: 'Vehicles Involved',
            value: '1'
          },
          location: {
            label: 'Location of Accident',
            value: ''
          },
          description: {
            label: 'Description of Accident',
            value: ''
          },
          damages: {
            label: 'Damages',
            value: ''
          },
          injuries: {
            label: 'Injuries',
            value: ''
          },
          you_injured: {
            label: 'Were You Injured',
            value: ''
          },
          injured_extent: {
            label: 'Extent of Your Injuries',
            value: ''
          },
          others_injured: {
            label: 'Were Others Injured',
            value: ''
          },
          police_contacted: {
            label: 'Police Contacted',
            value: ''
          },
          police_report: {
            label: 'Report Number',
            value: ''
          },
          citations: {
            label: 'Violations/Citations Issued',
            value: ''
          }
        },
        {
          step: 4,
          editable: false,
          ref: 'formStepSummary',
          title: 'Summary'
        }
      ]
      //1

      //2

      //3
    }
  },
  computed: {
    accidentTime() {
      return `${this.steps[2].date.value} at ${this.steps[2].time.value}`
    },
    fullAddress() {
      return `${this.steps[0].address_1.value} ${this.steps[0].address_2.value} ${this.steps[0].city.value}, ${this.steps[0].state.value} ${this.steps[0].zip.value}`
    },
    fullName() {
      return `${this.steps[0].first_name.value} ${this.steps[0].last_name.value}`
    },
    licenseInfo() {
      return `${this.steps[1].license_plate.value} (${this.steps[1].license_state.value})`
    },
    vehicleInfo() {
      return `${this.steps[1].year.value} ${this.steps[1].make.value} ${this.steps[1].model.value} (${this.steps[1].vin.value})`
    }
  },
  methods: {
    nextStep() {
      // console.log('CurrentStep: ' + this.currentStep)
      // console.log('Total: ' + this.steps.length)
      if (this.$refs[`formStep${this.currentStep}`].validate()) this.currentStep += 1
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      const url = '/test/error'

      if (!this.$refs[`formStepSummary`].validate()) {
        //validate the last step
        this.errorMessage = 'Fix validation errors'
        this.loading = false
        return false
      }

      // if valid, submit and handle response
      this.$http
        .post(url)
        .then(() => {
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

<style></style>
