import Vue from 'vue'
import VueI18n from 'vue-i18n'

//https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context(
    '@/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const options = {
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
}

const i18n = new VueI18n(options)

export default i18n
