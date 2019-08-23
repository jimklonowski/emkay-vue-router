<template>
  <section>
    <v-card :loading="loading">
      <v-form ref="form" @submit.prevent="onSubmit">
        <v-card-title class="blue-grey darken-1 white--text">
          <header class="text-uppercase">
            <span class="font-weight-black">{{ title1 }}</span>
            <span class="font-weight-thin">{{ title2 }}</span>
          </header>

          <v-subheader dark>{{ vehNum }}</v-subheader>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="row no-gutters">
          <v-list class="flex row">
            <v-list-item
              v-for="item in vehicle"
              :key="item.index"
              class="col-6 py-0"
              style="user-select:text !important;"
            >
              <transition name="rotate" mode="out-in">
                <v-list-item-content v-if="item.editable && isEditing" :key="isEditing">
                  <v-text-field
                    filled
                    shaped
                    class="blue-grey--text text--darken-2 font-weight-normal"
                    :name="item.key"
                    :label="item.name"
                    :v-model="item"
                    :value="item.value"
                    :rules="editorRules.required"
                  >{{ item.value }}</v-text-field>
                </v-list-item-content>
                <v-list-item-content v-else :key="isEditing">
                  <v-list-item-subtitle
                    class="font-weight-regular blue-grey--text text--lighten-3"
                  >{{ item.name }}</v-list-item-subtitle>
                  <v-list-item-title
                    class="blue-grey--text text--darken-2 font-weight-normal"
                  >{{ item.value }}</v-list-item-title>
                </v-list-item-content>
              </transition>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-alert
            v-if="isEditing && errorMessage"
            outlined
            dense
            class="mb-0"
            type="error"
          >{{ errorMessage }}</v-alert>
          <v-spacer></v-spacer>
          <v-btn
            v-if="isEditing"
            type="button"
            @click.prevent="
              isEditing = !isEditing
              errorMessage = null
            "
            color="error"
            text
          >Cancel</v-btn>
          <v-btn v-if="isEditing" type="submit" dark tile outlined color="primary" class="ma-2">
            <v-icon dark>save</v-icon>&nbsp;Save
          </v-btn>
          <v-btn
            v-else
            @click.prevent="isEditing = !isEditing"
            dark
            tile
            outlined
            color="primary"
            class="ma-2"
          >
            <v-icon dark>edit</v-icon>&nbsp;Change Vehicle Information
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'VehicleDetails',
  props: {
    vehNum: String
  },
  data() {
    return {
      errorMessage: null,
      isEditing: false,
      loading: false,
      title1: 'Vehicle',
      title2: 'Details',
      editorRules: {
        required: [v => !!v || 'Field is required']
      },
      vehicle: [
        {
          index: 0,
          key: 'account',
          name: 'Account',
          value: 'EM102',
          editable: false
        },
        {
          index: 1,
          key: 'billing_sort',
          name: 'Billing Sort',
          value: '',
          editable: false
        },
        {
          index: 2,
          key: 'vin',
          name: 'VIN',
          value: '987654321QWERTY',
          editable: false
        },
        {
          index: 3,
          key: 'vehicle_number',
          name: 'Vehicle Number',
          value: '123456',
          editable: false
        },
        {
          index: 4,
          key: 'center',
          name: 'Center',
          value: '001',
          editable: false
        },
        {
          index: 5,
          key: 'center_description',
          name: 'Center Description',
          value: 'Executive',
          editable: false
        },
        {
          index: 6,
          key: 'client_vehicle_number',
          name: 'Client Vehicle Number',
          value: '987654',
          editable: false
        },
        {
          index: 7,
          key: 'vehicle_year',
          name: 'Year',
          value: '2019',
          editable: false
        },
        {
          index: 8,
          key: 'vehicle_make',
          name: 'Make',
          value: 'DODGE',
          editable: false
        },
        {
          index: 9,
          key: 'vehicle_model',
          name: 'Model',
          value: 'DURANGO',
          editable: false
        },
        {
          index: 10,
          key: 'vehicle_classification',
          name: 'Category',
          value: 'Sport Utility - Medium',
          editable: false
        },
        {
          index: 11,
          key: 'vehicle_status',
          name: 'Status',
          value: 'ON BILLING',
          editable: false
        },
        {
          index: 12,
          key: 'customer_use_1',
          name: 'Client Use 1',
          value: 'asdf',
          editable: true
        },
        {
          index: 13,
          key: 'customer_use_2',
          name: 'Client Use 2',
          value: 'qwer',
          editable: true
        },
        {
          index: 14,
          key: 'customer_use_3',
          name: 'Client Use 3',
          value: '1234',
          editable: true
        },
        {
          index: 15,
          key: 'customer_use_4',
          name: 'Client Use 4',
          value: 'jklo',
          editable: true
        },
        {
          index: 16,
          key: 'customer_use_5',
          name: 'Client Use 5',
          value: 'test',
          editable: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.loading = true

      // updateVehicle endpoint
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
<style>
.rotate-enter {
  transform: perspective(500px) rotate3d(0, 1, 0, 90deg);
}
.rotate-enter-active,
.rotate-leave-active {
  transition: 0.5s;
}
.rotate-leave-to {
  transform: perspective(500px) rotate3d(0, 1, 0, -90deg);
}
</style>
