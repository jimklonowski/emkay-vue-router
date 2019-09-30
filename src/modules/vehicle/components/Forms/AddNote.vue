<template>
  <v-dialog v-model="dialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn text tile color="primary" v-on="on" @click.stop="resetForm">
        <v-icon left>note_add</v-icon>
        {{ $t('vehicle_dashboard.add_note') }}
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title :class="this.$config.TOOLBAR_CLASS">
        <header class="text-uppercase">
          <span
            class="font-weight-black"
            v-text="$t('vehicle_dashboard.add')"
          />
          <span
            class="font-weight-thin"
            v-text="$t('vehicle_dashboard.note')"
          />
        </header>
      </v-card-title>
      <v-card-text class="py-0">
        <v-form ref="add_note" class="pt-5">
          <v-textarea
            v-model="note"
            outlined
            color="primary"
            :label="$t('vehicle_dashboard.note')"
          />
        </v-form>
      </v-card-text>
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
    title: 'Add Note',
    note: 'test note'
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
      if (!this.$refs['add_note'].validate()) {
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
