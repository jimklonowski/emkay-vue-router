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
          <v-row class="no-gutters">
            <v-list v-for="(section, i) in schema" :key="i" :class="section.class" subheader dense>
              <v-subheader v-t="section.key" :class="$config.SUBHEADER_CLASS" />
              <v-container>
                <v-row>
                  <v-col
                    v-for="(field, j) in section.fields"
                    :key="j"
                    :cols="field.cols"
                    :sm="field.sm"
                    :md="field.md"
                    :lg="field.lg"
                    style="height:72px;"
                    tag="v-list-item"
                    dense
                  >
                    <v-list-item-content v-if="isEditing" class="mt-10">
                      <component
                        :is="field.is"
                        v-model="model[field.model]"
                        :label="$t(field.key)"
                        :disabled="isEditing && field.disabled"
                        :outlined="isEditing"
                        :readonly="!isEditing"
                        v-bind="field.props"
                        @blur="console.log($v.model)"
                        dense
                      />
                    </v-list-item-content>
                    <v-list-item-content v-else class="px-3">
                      <v-list-item-subtitle class="font-weight-regular" v-text="$t(field.key)" />
                      <v-list-item-title class="font-weight-regular blue-grey--text text--darken-2" style="font-size:1rem;" v-text="model[field.model]" />
                    </v-list-item-content>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-row>
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'DriverDetails',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  validations: {
    model: {
      employee_id: {
        required
      }
    }
  },
  data: self => ({
    errorMessage: null,
    isEditing: false,
    loading: false,
    menuOpen: false,
    rules: {
      required: v => !!v || 'Required.',
      lengthNine: v => v.length == 9 || '9 characters'
    },
    model: {
      // driver info
      last_name: 'Klonowski',
      first_name: 'James',
      employee_id: '123456789',
      license_state: 'IL',
      license_number: 'ABCDEF12309876QWERTY',
      selector_level: 'Sales',
      // contact info
      address_1: 'EMKAY, Inc',
      address_2: '805 W THORNDALE AVE',
      zip: '60143',
      city: 'ITASCA',
      state: 'IL',
      county: 'DuPage',
      email: 'jklonowski@email.com',
      phone: '630-864-0000',
      cell: '630-864-0999',
      // customization
      driver_use_1: 'Sales',
      driver_use_2: 'Senior Sales',
      driver_use_3: 'Bermuda Office',
      driver_use_4: 'Parking Spot #3A'
    },
    schema: [
      {
        // Driver Information Section 
        key: 'vehicle_dashboard.driver_information',
        class: 'col-12 px-md-0',
        fields: [
          {
            model: 'last_name',
            is: 'v-text-field',
            key: 'vehicle_dashboard.last_name',
            disabled: true,
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.last_name'),
              type: 'text',
              readonly: true
            }
          },
          {
            model: 'first_name',
            is: 'v-text-field',
            key: 'vehicle_dashboard.first_name',
            disabled: true,
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.first_name'),
              type: 'text',
              readonly: true
            }
          },
          {
            model: 'employee_id',
            is: 'v-text-field',
            key: 'vehicle_dashboard.employee_id',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.employee_id'),
              type: 'text',
              //rules: [() => self.rules.lengthNine],
              //rules: [v => v.length == 9 || 'Must be 9 characters'],
              counter: 9
            }
          },
          {
            model: 'selector_level',
            is: 'v-text-field',
            key: 'vehicle_dashboard.selector_level',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.selector_level'),
              type: 'text',
              outlined: true,
            }
          },
          {
            model: 'license_number',
            is: 'v-text-field',
            key: 'vehicle_dashboard.license_number',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.employee_id'),
              type: 'text',
              outlined: true,
              counter: 20
            }
          },
          {
            model: 'license_state',
            is: 'v-text-field',
            key: 'vehicle_dashboard.license_state',
            cols: 12,
            sm: 6,
            md: 4,
            props: {
              label: () => self.$t('vehicle_dashboard.license_state'),
              type: 'text',
              counter: 2
            }
          }
        ]
      },
      {
        // Contact Information Section
        key: 'vehicle_dashboard.contact_information',
        class: 'col-md-6 pr-md-1',
        fields: [
          {
            model: 'address_1',
            is: 'v-text-field',
            key: 'vehicle_dashboard.address_1',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.address_1')
            }
          },
          {
            model: 'address_2',
            is: 'v-text-field',
            key: 'vehicle_dashboard.address_2',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.address_2')
            }
          },
          {
            model: 'city',
            is: 'v-text-field',
            key: 'vehicle_dashboard.city',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.city')
            }
          },
          {
            model: 'county',
            is: 'v-text-field',
            key: 'vehicle_dashboard.county',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.county')
            }
          },
          {
            model: 'state',
            is: 'v-text-field',
            key: 'vehicle_dashboard.state',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.state')
            }
          },
          {
            model: 'zip',
            is: 'v-text-field',
            key: 'vehicle_dashboard.zip',
            cols: 12,
            sm: 6,
            props: {
              label: () => self.$t('vehicle_dashboard.zip')
            }
          }
        ]
      },
      {
        // Customization
        key: 'vehicle_dashboard.customization',
        class: 'col-md-6 pl-md-1',
        fields: [
          {
            model: 'driver_use_1',
            is: 'v-text-field',
            key: 'vehicle_dashboard.driver_use_1',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.driver_use_1')
            }
          },
          {
            model: 'driver_use_2',
            is: 'v-text-field',
            key: 'vehicle_dashboard.driver_use_2',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.driver_use_2')
            }
          },
          {
            model: 'driver_use_3',
            is: 'v-text-field',
            key: 'vehicle_dashboard.driver_use_3',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.driver_use_3')
            }
          },
          {
            model: 'driver_use_4',
            is: 'v-text-field',
            key: 'vehicle_dashboard.driver_use_4',
            cols: 12,
            props: {
              label: () => self.$t('vehicle_dashboard.driver_use_4')
            }
          }
        ]
      }
    ],
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
    driverSections: [
      {
        key: 'vehicle_dashboard.driver_information',
        fields: [
          {
            key: 'vehicle_dashboard.last_name',
            editable: true,
            class: 'col-6',
            value: 'Klonowski'
          },
          {
            key: 'vehicle_dashboard.first_name',
            editable: true,
            class: 'col-6',
            value: 'Jimmy'
          },
          {
            key: 'vehicle_dashboard.selector_level',
            editable: true,
            class: 'col-6',
            value: 'something'
          },
          {
            key: 'vehicle_dashboard.employee_id',
            editable: false,
            class: 'col-6',
            value: '112233'
          }
        ]
      },
      {
        key: 'vehicle_dashboard.contact_information',
        fields: [
          {
            key: 'vehicle_dashboard.address_1',
            editable: true,
            class: 'col-6',
            value: 'EMKAY, Inc'
          },
          {
            key: 'vehicle_dashboard.address_2',
            editable: true,
            class: 'col-6',
            value: '805 W Thorndale Ave.'
          },
          {
            key: 'vehicle_dashboard.city_state_zip',
            editable: true,
            class: 'col-6',
            value: 'Itasca, IL 60189'
          },
          {
            key: 'vehicle_dashboard.county',
            editable: true,
            class: 'col-6',
            value: 'DuPage'
          },
          {
            key: 'vehicle_dashboard.phone',
            editable: true,
            class: 'col-6',
            value: '630-864-0999'
          },
          {
            key: 'vehicle_dashboard.cell',
            editable: true,
            class: 'col-6',
            value: '630-864-0000'
          },
          {
            key: 'vehicle_dashboard.fax',
            editable: true,
            class: 'col-6',
            value: '630-FAX-MKAY'
          },
          {
            key: 'vehicle_dashboard.email',
            editable: true,
            class: 'col-6',
            value: 'jklonowski@email.com'
          }
        ]
      },
      {
        key: 'vehicle_dashboard.customization',
        fields: [
          {
            key: 'vehicle_dashboard.driver_custom_1_label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 1'
          },
          {
            key: 'vehicle_dashboard.driver_custom_1',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.driver_custom_2_label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 2'
          },
          {
            key: 'vehicle_dashboard.driver_custom_2',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.driver_custom_3_label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 3'
          },
          {
            key: 'vehicle_dashboard.driver_custom_3',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'vehicle_dashboard.driver_custom_4_label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 4'
          },
          {
            key: 'vehicle_dashboard.driver_custom_4',
            editable: true,
            class: 'col-6',
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

      const url = '/test/error'

      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors, dude!'
        this.loading = false
        debugger
        return false
      }

      // if (!this.$refs.form.validate()) {
      //   this.errorMessage = 'Fix validation errors'
      //   this.loading = false
      //   return false
      // }

      this.$http
        .post(url)
        .then(result => {
          console.log(`Successful result: ${result}`)
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
