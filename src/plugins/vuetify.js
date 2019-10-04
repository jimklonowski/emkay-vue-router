import Vue from 'vue'
import Vuetify, { VTextField } from 'vuetify/lib'
//import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: { VTextField }
})

import { en, fr } from 'vuetify/lib/locale'

export default new Vuetify({
  lang: {
    locales: { en, fr },
    current: 'en'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#4F286C',
        warning: '#F68820'
      }
    }
  },
  icons: {
    iconfont: 'md'
  }
})

// see https://vuetifyjs.com/en/customization/theme#light-and-dark
