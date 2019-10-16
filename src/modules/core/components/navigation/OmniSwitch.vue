<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template #activator="{ on }">
      <v-btn text style="min-width:48px" v-on="on">
        <v-icon size="24px">language</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="primary">
            <span class="white--text headline">JK</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>J. Klonowski</v-list-item-title>
            <v-list-item-subtitle>Information Technology</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action />

        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item class="py-2">
          <v-list-item-action>
            <v-switch v-model="dark" color="primary" @change="setTheme" />
          </v-list-item-action>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item>

        <v-list-item class="py-2">
          <v-select v-model="locale" :items="languages" :label="$t('common.language')" @input="setLanguage" dense />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { CHANGE_THEME, CHANGE_LOCALE } from '@/modules/auth/store/actions.type'
export default {
  name: 'OmniSwitch',
  data: () => ({
    menu: false,
    dark: false,
    locale: 'en',
    languages: [
      {
        text: 'English',
        value: 'en'
      },
      {
        text: 'English (Metric)',
        value: 'en_CA'
      },
      {
        text: 'Français',
        value: 'fr'
      }
    ]
  }),
  created() {
    this.dark = this.$store.getters.isDark
    this.locale = this.$store.getters.currentLocale
  },
  // mounted() {
  //   this.locale = this.$store.getters.currentLocale
  //   this.dark = this.$store.getters.isDark
  // },
  computed: {
    currentLanguage() {
      const locale = this.$i18n.locale
      return this.languages.find(l => l.value === locale)
    }
  },
  methods: {
    setTheme() {
      this.$store
        .dispatch(CHANGE_THEME, this.dark)
        .then(() => {
          //debugger
          this.$vuetify.theme.dark = this.$store.getters.isDark
        })
        .catch(err => {
          alert('err: '+err)
        })
        .finally(() => {
          console.log(`Dark Theme: ${this.dark?'enabled':'disabled'}`)
        })
      //
    },
    setLanguage() {
      this.$store
        .dispatch(CHANGE_LOCALE, this.locale)
        .then(() => {
          this.$i18n.locale = this.$store.getters.currentLocale
          this.$vuetify.lang.current = this.$store.getters.currentLocale
        })
        .catch(err => {
          alert('error: '+err)
        })
        .finally(() => {
          console.log(`Language Set: ${this.locale}`)
        })
    }
    // translateI18n(lang) {
    //   lang = lang.value
    //   this.$i18n.locale = lang
    //   this.$vuetify.lang.current = lang
    // }
  }
}
</script>
