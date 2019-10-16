import i18n from '@/plugins/i18n'
import { helpers } from 'vuelidate/lib/validators'
// Must be called in Vue context
export function goTo(id) {
  this.$vuetify.goTo(id).then(() => {
    if (!id) {
      return (document.location.hash = '')
    }
    if (history.replaceState) {
      history.replaceState(null, null, id)
    } else {
      document.location.hash = id
    }
  })
}

/**
 * Generate .xls filename with timestamp for export
 * @param {*} name
 * @param {*} format
 */
export const nameForExport = (name, format) => {
  let today = new Date().toLocaleDateString()
  return `${name}_${today}.${format}`
}

/**
 * Convert v-data-table headers object to {k1:v1,k2:v2,...} format required by vue-json-excel
 * @param {Object[]} headers - An array of headers to be exported as columns.
 */
export const headersForExport = headers => {
  // create array of {key:value} pairs objects for exporting as columns and use i18n translations
  let headerColumns = headers.map(header => ({
    [i18n.t(header.key)]: header.value
  }))
  // return a single object with all exported columns as fields
  return Object.assign({}, ...headerColumns)
}

/**
 * isLength(n) validator for vuelidate
 *  */
export const isLength = length => value => helpers.len(value) === length

/**
 * Translate Error
 * @param {String} msgKey message translation key
 * @param {String} fieldKey field name translation key
 */
export function translateError(msgKey, fieldKey) {
  let attribute = typeof fieldKey === 'string' ? this.$t(fieldKey) : fieldKey
  return this.$t(msgKey, { attribute })
}

export const isPastDate = date => {
  const today = new Date()
  return date <= today
}
