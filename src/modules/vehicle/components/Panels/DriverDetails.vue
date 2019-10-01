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
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-divider />
        <v-card-text class="pa-0">
          <v-list
            v-for="(section, i) in driverSections"
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
                  style="user-select:text !important;height:72px;"
                >
                  <v-list-item-content v-if="isEditing" class="py-0">
                    <v-text-field
                      :v-model="field"
                      :value="field.value"
                      :label="$t(field.key)"
                      :rules="rules.required"
                      :disabled="!field.editable"
                    />
                  </v-list-item-content>
                  <v-list-item-content v-else class="pt-0 pb-4">
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
export default {
  name: 'DriverDetails',
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
        key: 'vehicle_dashboard.edit_driver',
        icon: 'edit',
        action: () => (self.isEditing = !self.isEditing)
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
      this.menuOpen = !this.menuOpen
    },
    onSubmit() {
      this.loading = true
      const url = '/test/error'
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Fix validation errors'
        this.loading = false
        return false
      }

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
