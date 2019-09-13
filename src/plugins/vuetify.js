import Vue from 'vue'
import Vuetify from 'vuetify/lib'
//import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
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
