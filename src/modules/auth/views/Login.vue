<template>
  <v-container fluid fill-height class="login">
    <v-row justify="center" align="center">
      <v-card elevation="12" width="600px" :loading="loading">
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
            <toolbar-title :key1="'auth.login'" :key2="'auth.client'" />
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
            </v-alert>

            <v-alert border="left" type="info" color="primary lighten-2" dense>
              EM102 JCK 123
            </v-alert>

            <v-text-field v-model="model.account" v-bind="schema.account" />
            <v-text-field v-model="model.username" v-bind="schema.username" />
            <v-text-field v-model="model.password" v-bind="schema.password" />

          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-t="'auth.forgot_password'"
              to="/login-help"
              tabindex="-1"
              text
            />
            <v-btn
              v-t="'auth.login'"
              type="submit"
              color="primary"
              class="mr-4"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { translateError } from '@/util/helpers'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { LOGIN } from '@/modules/auth/store/actions.type'

import ToolbarTitle from '@/modules/core/components/ToolbarTitle'


export default {
  name: 'Login',
  components: {
    ToolbarTitle
  },
  data() {
    return {
      errorMessage: '',
      loading: false,

      // Model
      model: {
        account: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    schema() {
      return {
        account: {
          label: this.$t('auth.account'),
          type: 'text',
          errorMessages: this.accountErrors(),
          appendIcon: 'account_balance',
          autocomplete: 'organization'
        },
        username: {
          label: this.$t('auth.username'),
          type: 'text',
          errorMessages: this.usernameErrors(),
          appendIcon: 'person',
          autocomplete: 'username'
        },
        password: {
          label: this.$t('auth.password'),
          type: 'password',
          errorMessages: this.passwordErrors(),
          appendIcon: 'lock',
          autocomplete: 'current-password'
        }
      }
    }
  },
  methods: {
    translateError,
    accountErrors() {
      const errors = []
      if (!this.$v.model.account.$dirty) return errors
      !this.$v.model.account.required && errors.push(this.translateError('validation.required', 'auth.account'))
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.model.username.$dirty) return errors
      !this.$v.model.username.required && errors.push(this.translateError('validation.required', 'auth.username'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.model.password.$dirty) return errors
      !this.$v.model.password.required && errors.push(this.translateError('validation.required', 'auth.password'))
      return errors
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      debugger
      // trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors, dude!'
        this.loading = false
        return false
      }

      // try to login
      this.$store
        .dispatch(LOGIN, this.model)
        .then(() => {
          console.log('Login Success')
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          debugger
          console.log('Login Failure')
          this.errorMessage = e.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      account: { required },
      username: { required },
      password: { required }
    }
  }
}
</script>

<style lang="scss">
.login {
  /* background: url(~@/assets/loginbg.jpg); */
  // background-color: $emkay-purple;
  background: url(~@/assets/servicebg.jpg);
  background-position-x: 50%;
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
