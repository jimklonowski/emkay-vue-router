<template>
  <v-menu bottom left offset-y max-height="calc(100% - 16px)">
    <template #activator="{ on: menu }">
      <v-btn text style="min-width:48px" v-on="menu">
        <country-flag :country="currentLanguage.country" />
      </v-btn>
    </template>
    <v-list dense nav>
      <v-list-item
        v-for="language in languages"
        :key="language.locale"
        @click="translateI18n(language)"
      >
        <v-list-item-avatar tile size="24px">
          <!-- <v-img
            :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
            width="24px"
          /> -->
          <country-flag :country="language.country" />
        </v-list-item-avatar>
        <v-list-item-title v-text="language.name" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'LocaleSwitch',
  components: {
    CountryFlag
  },
  data: () => ({
    languages: [
      {
        name: 'English',
        locale: 'en',
        country: 'us',
        fallback: true
      },
      {
        name: 'Français',
        locale: 'fr',
        country: 'ca'
      }
    ]
  }),
  computed: {
    currentLanguage() {
      const locale = this.$i18n.locale
      return this.languages.find(l => l.alternate === locale || l.locale === locale)
    }
  },
  methods: {
    translateI18n(lang) {
      lang = lang.alternate || lang.locale
      this.$i18n.locale = lang

      //this.$router.replace({ params: { lang }})
    }
  }
}
</script>

<style></style>
