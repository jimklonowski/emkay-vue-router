<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template #activator="{ on }">
      <div v-t="key" v-on="on" @click.stop.prevent />
    </template>
    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.report'" />
          <span v-t="'vehicle_dashboard.accident'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark v-text="vehicle" />
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
              :editable="true"
              :step="i + 1"
            >
              {{ $t(step.key) }}
            </v-stepper-step>
            <v-divider v-if="i < steps.length - 1" :key="`div${i}`" />
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content
            v-for="(step, i) in steps"
            :key="`step-content${i}`"
            :step="i + 1"
          >
            <v-form :ref="step.key">
              <v-container>
                <v-row>
                  <!-- <div v-for="(field, j) in step.fields" :key="`field.${i}.${j}`" v-text="field.key" /> -->
                  <v-col
                    v-for="(field, j) in step.fields"
                    :key="`col${i}${j}`"
                    :cols="field.flex.cols"
                    :sm="field.flex.sm"
                  >
                    <component
                      :is="field.is"
                      :key="`component${i}${j}`"
                      :label="$t(field.key)"
                      v-bind="field.props"
                      dense
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import { VTextField, VDatePicker } from 'vuetify/lib'
export default {
  name: 'ReportAccident',
  components: {
    VTextField,
    VDatePicker
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: self => ({
    currentStep: 1,
    dialog: false,
    loading: false,
    key: 'vehicle_dashboard.report_accident',
    steps: [
      {
        key: 'vehicle_dashboard.driver_information',
        fields: [
          {
            key: 'vehicle_dashboard.last_name',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              value: 'Klonowski'
            }
          },
          {
            key: 'vehicle_dashboard.first_name',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              value: 'James'
            }
          },
          {
            key: 'vehicle_dashboard.address_1',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              value: 'EMKAY, Inc.'
            }
          },
          {
            key: 'vehicle_dashboard.address_2',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [],
              value: '805 W THORNDALE AVE'
            }
          },
          {
            key: 'vehicle_dashboard.city',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              value: 'Itasca'
            }
          },
          {
            key: 'vehicle_dashboard.state',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 2
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              value: 'IL'
            }
          },
          {
            key: 'vehicle_dashboard.ZIP',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 4
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              value: '60143'
            }
          },
          {
            key: 'vehicle_dashboard.phone',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              type: 'tel',
              value: '630-864-0965'
            }
          }
        ]
      },
      {
        key: 'vehicle_dashboard.vehicle_information',
        fields: [
          {
            key: 'vehicle_dashboard.vin',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 10
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              value: '11223344556677889900'
            }
          },
          {
            key: 'vehicle_dashboard.year',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 3
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              type: 'number',
              value: 2019
            }
          },
          {
            key: 'vehicle_dashboard.make',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 4
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              value: 'Tesla'
            }
          },
          {
            key: 'vehicle_dashboard.model',
            is: VTextField,
            flex: {
              cols: 12,
              sm: 5
            },
            props: {
              rules: [v => !!v || self.$t('validation.required')],
              disabled: true,
              value: 'Model X P100D+'
            }
          }
        ]
      },
      {
        key: 'vehicle_dashboard.accident_information',
        fields: [
          {
            key: 'vehicle_dashboard.accident_date',
            is: VDatePicker,
            flex: {
              cols: 12,
              sm: 6
            },
            props: {
              rules: [],
              readonly: true
            }
          }
        ]
      },
      {
        key: 'common.summary',
        fields: []
      }
    ]
  }),
  methods: {
    nextStep() {
      if (this.$refs[`step${this.currentStep}`][0].validate())
        this.currentStep += 1
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      const url = '/reportAccident'
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
