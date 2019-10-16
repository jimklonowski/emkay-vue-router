<template>
  <v-container fluid fill-height class="login">
    <v-row justify="center" align="center">
      <v-card elevation="12" width="600px" :loading="loading">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="
            onSubmit(
              credentials.account,
              credentials.username,
              credentials.password
            )
          "
        >
          <v-card-title :class="$config.TOOLBAR_CLASS">
            <header class="text-uppercase font-weight-black">
              <span v-t="'auth.login'" />
              <span v-t="'common.client'" class="font-weight-thin" />
              <v-subheader class="d-inline" dark v-text="subtitle" />
            </header>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
            </v-alert>

            <v-alert border="left" type="info" color="primary lighten-2" dense>
              EM102 JCK 123
            </v-alert>

            <v-text-field
              v-model="credentials.account"
              :label="$t('auth.account')"
              name="account"
              append-icon="account_balance"
              type="text"
              :rules="rules.account"
              autocomplete="organization"
              required
            />
            <v-text-field
              v-model="credentials.username"
              :label="$t('auth.username')"
              name="username"
              append-icon="person"
              type="text"
              :rules="rules.username"
              autocomplete="username"
              required
            />
            <v-text-field
              v-model="credentials.password"
              :label="$t('auth.password')"
              name="password"
              append-icon="lock"
              type="password"
              :rules="rules.password"
              autocomplete="current-password"
              required
            />
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
              :disabled="!valid"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { LOGIN } from '@/modules/auth/store/actions.type'

export default {
  name: 'Login',
  data() {
    return {
      errorMessage: '',
      loading: false,
      title1: 'Login',
      title2: 'Client',
      subtitle: '',
      valid: false,
      credentials: {
        account: '',
        username: '',
        password: ''
      },
      rules: {
        account: [v => !!v || this.$t('validation.required')],
        username: [v => !!v || this.$t('validation.required')],
        password: [v => !!v || this.$t('validation.required')]
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit(account, username, password) {
      this.loading = true

      // all fields required
      if (!this.$refs.form.validate()) {
        this.loading = false
        return false
      }

      // try to login
      this.$store
        .dispatch(LOGIN, { account, username, password })
        .then(() => {
          console.log('Login Success')
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('Login Failure')
          this.errorMessage = e.message
        })
        .finally(() => {
          this.loading = false
        })
    }
    // onSubmit(account, username, password) {
    //   this.loading = true
    //   if (!this.$refs.form.validate()) {
    //     this.loading = false
    //     return false
    //   }
    //   this.$store
    //     .dispatch(`auth/${LOGIN}`, { account, username, password })
    //     .then(() => {
    //       console.log('Login success, routing to /home')
    //       this.$router.push({ name: 'home' })
    //     })
    //     .catch(e => {
    //       console.log('Login failure')
    //       this.errorMessage = e.message //(e.response.data || {}).errors[0] || e.message
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // }
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
