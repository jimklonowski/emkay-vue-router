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

// Export CSV
export const csvDownload = (csv, filename = 'export.csv') => {
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
    type: 'text/csv'
  })
  const a = document.createElement('a')
  a.target = '_blank'
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  const event = document.createEvent('MouseEvents')
  event.initEvent('click', true, true)
  a.dispatchEvent(event)
}
