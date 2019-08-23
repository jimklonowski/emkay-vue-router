<template>
  <section>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card :loading="loading">
        <v-card-title :class="headerClass">
          <header class="text-uppercase">
            <span class="font-weight-black">{{ title1 }}</span>
            <span class="font-weight-thin">{{ title2 }}</span>
          </header>

          <v-subheader dark>
            {{ vehNum }}
          </v-subheader>
        </v-card-title>
        <v-divider />
        <v-card-text class="row no-gutters">
          <v-list class="flex row">
            <v-list-item v-for="item in driver" :key="item.index" class="col-6 py-0" style="user-select:text !important;">
              <transition name="rotate" mode="out-in">
                <v-list-item-content v-if="item.editable && isEditing" :key="isEditing">
                  <v-text-field
                    filled
                    shaped
                    :class="inputClass"
                    :name="item.key"
                    :label="item.name"
                    :v-model="item"
                    :value="item.value"
                    :rules="editorRules.required"
                  >
                    {{ item.value }}
                  </v-text-field>
                </v-list-item-content>
                <v-list-item-content v-else :key="isEditing">
                  <v-list-item-subtitle :class="labelClass">
                    {{ item.name }}
                  </v-list-item-subtitle>
                  <v-list-item-title :class="fieldClass">
                    {{ item.value }}
                  </v-list-item-title>
                </v-list-item-content>
              </transition>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-alert v-if="isEditing && errorMessage" outlined dense class="mb-0" type="error">
            {{ errorMessage }}
          </v-alert>
          <v-spacer />
          <v-btn
            v-if="isEditing"
            color="error"
            text
            @click.prevent="
              isEditing = !isEditing
              errorMessage = null
            "
          >
            Cancel
          </v-btn>
          <v-btn v-if="isEditing" type="submit" dark tile outlined color="primary" class="ma-2"> <v-icon dark> save </v-icon>&nbsp;Save </v-btn>
          <v-btn v-else color="primary" dark tile outlined class="ma-2" @click.prevent="isEditing = !isEditing">
            <v-icon dark> edit </v-icon>&nbsp;Change Vehicle Information
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </section>
</template>

<script>
export default {
  name: 'DriverDetails',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorRules: {
        required: [v => !!v || 'Field is required']
      },
      errorMessage: null,
      labelClass: 'font-weight-regular blue-grey--text text--lighten-3',
      fieldClass: 'font-weight-normal blue-grey--text text--darken-2',
      headerClass: 'blue-grey darken-1 white--text',
      inputClass: 'blue-grey--text text--darken-2 font-weight-normal',
      isEditing: false,
      loading: false,
      title1: 'Driver',
      title2: 'Details',
      driver: [
        {
          index: 0,
          key: 'last_name',
          name: 'Last Name',
          value: 'Klonowski',
          editable: true
        },
        {
          index: 1,
          key: 'first_name',
          name: 'First Name',
          value: 'James',
          editable: true
        },
        {
          index: 2,
          key: 'address_1',
          name: 'Address 1',
          value: 'Emkay Inc',
          editable: true
        },
        {
          index: 3,
          key: 'address_2',
          name: 'Address 2',
          value: '805 w Thorndale Ave',
          editable: true
        },
        {
          index: 4,
          key: 'city_state_zip',
          name: 'City/State/ZIP',
          value: 'Itasca, IL 60189',
          editable: true
        },
        {
          index: 5,
          key: 'county',
          name: 'County',
          value: 'DuPage',
          editable: true
        },
        {
          index: 6,
          key: 'phone',
          name: 'Phone',
          value: '630-123-4567',
          editable: true
        },
        {
          index: 7,
          key: 'cell',
          name: 'Cell',
          value: '630-987-6543',
          editable: true
        },
        {
          index: 8,
          key: 'fax',
          name: 'Fax',
          value: '773-630-7081',
          editable: true
        },
        {
          index: 9,
          key: 'email',
          name: 'Email',
          value: 'jklonowski@emkay.com',
          editable: true
        },
        {
          index: 10,
          key: 'employee_id',
          name: 'Employee ID',
          value: '112233',
          editable: false
        },
        {
          index: 11,
          key: 'driver_misc_1',
          name: 'Driver Misc 1',
          value: 'custom',
          editable: true
        },
        {
          index: 12,
          key: 'driver_misc_2',
          name: 'Driver Misc 2',
          value: 'labels',
          editable: true
        },
        {
          index: 13,
          key: 'driver_misc_3',
          name: 'Driver Misc 3',
          value: 'for',
          editable: true
        },
        {
          index: 14,
          key: 'driver_misc_4',
          name: 'Driver Misc 4',
          value: 'drivers',
          editable: true
        },
        {
          index: 15,
          key: 'selector_level',
          name: 'Selector Level',
          value: 'something',
          editable: true
        }
      ]
    }
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
