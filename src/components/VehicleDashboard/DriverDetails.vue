<template>
  <article>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-toolbar :class="this.$config.TOOLBAR_CLASS">
          <v-toolbar-title class="text-uppercase">
            <span class="font-weight-black">{{ title }}</span>
            <span class="font-weight-thin">{{ subtitle }}</span>
            <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
          </v-toolbar-title>
          <v-spacer />
          <v-menu transition="slide-y-transition" z-index="3" left>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list nav dense>
              <v-list-item
                v-for="(item, i) in actions"
                :key="i"
                :color="item.color"
                @click="item.action"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
            <v-subheader class="col-12 overline blue-grey lighten-5">
              {{ section.name }}
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
                      :label="field.label"
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
                      {{ field.label }}
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
export default {
  name: 'DriverDetails',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: self => ({
    title: 'Driver',
    subtitle: 'Details',
    editorRules: {
      required: [v => !!v || 'Field is required']
    },
    errorMessage: null,
    labelClass: 'details-label',
    fieldClass: 'blue-grey--text text--darken-2',
    headerClass: '',
    inputClass: 'blue-grey--text text--darken-2',
    isEditing: false,
    loading: false,

    actions: [
      {
        text: 'Edit Driver',
        icon: 'edit',
        action: () => (self.isEditing = !self.isEditing)
      },
      {
        text: 'Reassign Driver',
        icon: 'assignment_ind',
        action: () => alert('reassign driver')
      },
      {
        text: 'Add New Driver',
        icon: 'person_add',
        action: () => alert('add new driver')
      }
    ],
    driverSections: [
      {
        name: 'Driver Information',
        fields: [
          {
            key: 'last_name',
            label: 'Last Name',
            editable: true,
            class: 'col-6',
            value: 'Klonowski'
          },
          {
            key: 'first_name',
            label: 'First Name',
            editable: true,
            class: 'col-6',
            value: 'Jimmy'
          },
          {
            key: 'selector_level',
            label: 'Selector Level',
            editable: true,
            class: 'col-6',
            value: 'something'
          },
          {
            key: 'employee_id',
            label: 'Employee ID',
            editable: false,
            class: 'col-6',
            value: '112233'
          }
        ]
      },
      {
        name: 'Contact Information',
        fields: [
          {
            key: 'address_1',
            label: 'Address 1',
            editable: true,
            class: 'col-6',
            value: 'EMKAY, Inc'
          },
          {
            key: 'address_2',
            label: 'Address 2',
            editable: true,
            class: 'col-6',
            value: '805 W Thorndale Ave.'
          },
          {
            key: 'city_state_zip',
            label: 'City/State/ZIP',
            editable: true,
            class: 'col-6',
            value: 'Itasca, IL 60189'
          },
          {
            key: 'county',
            label: 'County',
            editable: true,
            class: 'col-6',
            value: 'DuPage'
          },
          {
            key: 'phone',
            label: 'Phone',
            editable: true,
            class: 'col-6',
            value: '630-864-0999'
          },
          {
            key: 'cell',
            label: 'Cell',
            editable: true,
            class: 'col-6',
            value: '630-864-0000'
          },
          {
            key: 'fax',
            label: 'Fax',
            editable: true,
            class: 'col-6',
            value: '630-FAX-MKAY'
          },
          {
            key: 'email',
            label: 'Email',
            editable: true,
            class: 'col-6',
            value: 'jklonowski@email.com'
          }
        ]
      },
      {
        name: 'Customization',
        fields: [
          {
            key: 'driver_1_label',
            label: 'Driver Misc 1 Label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 1'
          },
          {
            key: 'driver_1',
            label: 'Driver 1',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'driver_2_label',
            label: 'Driver Misc 2 Label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 2'
          },
          {
            key: 'driver_2',
            label: 'Driver 2',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'driver_3_label',
            label: 'Driver Misc 3 Label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 3'
          },
          {
            key: 'driver_3',
            label: 'Driver 3',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
          {
            key: 'driver_4_label',
            label: 'Driver Misc 4 Label',
            editable: true,
            class: 'col-6',
            value: 'Driver Misc 4'
          },
          {
            key: 'driver_4',
            label: 'Driver 4',
            editable: true,
            class: 'col-6',
            value: 'asdf'
          },
        ]
      }
    ]
  }),
  created() {
    this.headerClass = this.$config.COMPONENT_HEADER_CLASS
  },
  methods: {
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
