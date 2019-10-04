<template>
  <v-dialog v-model="dialog" max-width="1000">
    <template #activator="{ on }">
      <div v-t="key" v-on="on" @click.stop.prevent />
    </template>
    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.add'" />
          <span v-t="'vehicle_dashboard.note'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark v-text="vehicle" />
        </v-toolbar-title>
        <v-spacer />
        <v-btn large icon tile dark @click.prevent="dialog = false">
          <v-icon v-text="'close'" />
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text class="py-0">
        <v-form ref="form" class="pt-5">
          <v-textarea
            v-model="note"
            outlined
            color="primary"
            :label="$t('vehicle_dashboard.note')"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-alert v-if="errorMessage" outlined dense class="mb-0" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click.prevent="addNote"
          v-text="$t('vehicle_dashboard.add_note')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'AddNote',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false,
    errorMessage: null,
    loading: false,
    key: 'vehicle_dashboard.add_note',
    note: ''
  }),
  methods: {
    resetForm() {
      this.note = ''
      this.errorMessage = null
      this.loading = false
    },
    addNote() {
      this.loading = true
      const url = '/test/error'
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Fix Validation Errors'
        this.loading = false
        return false
      }

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
