import i18n from '@/plugins/i18n'
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
