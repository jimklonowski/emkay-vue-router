import Vue from 'vue'

//import '@progress/kendo-ui' // This will import the entire KendoUI Library
import '@progress/kendo-ui/js/kendo.dataviz.chart'
import '@progress/kendo-ui/js/kendo.dataviz.gauge'
import '@progress/kendo-ui/js/kendo.dataviz.map'
import '@progress/kendo-theme-material/dist/all.css'
import { Chart, ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
import { Gauge, GaugesInstaller } from '@progress/kendo-gauges-vue-wrapper'
import {
  Map,
  MapMarker,
  MapLayer,
  MapInstaller
} from '@progress/kendo-map-vue-wrapper'

Vue.use(ChartInstaller)
Vue.use(GaugesInstaller)
Vue.use(MapInstaller)

const kendoComponents = {
  Chart,
  Gauge,
  Map,
  MapMarker,
  MapLayer
}

export default kendoComponents
