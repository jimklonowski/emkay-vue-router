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
      dark: {
        anchor: '#BF8CF8',
        primary: '#7A57A5',
        accent: '#FFF',
        // secondary: '',
        // success: '',
        // info: '',
        warning: '#F68820',
        // error: ''
      },
      light: {
        anchor: '#4F286C',
        primary: '#4F286C',
        accent: '#4F286C',
        //secondary: '',
        //success: '',
        //info: '',
        warning: '#F68820',
        //error: ''
      }
    }
  },
  icons: {
    iconfont: 'md'
  }
})

// see https://vuetifyjs.com/en/customization/theme#light-and-dark
