<template>
  <v-row>
    <v-col cols="12">
      <v-subheader>SafeRoads Dashboard for this vehicle</v-subheader>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title :class="headerClass">
          <v-col sm="12" lg="4">
            <header class="text-uppercase">
              <span class="font-weight-black">{{ title1 }}</span>
              <span class="font-weight-thin">{{ title2 }}</span>
              <v-subheader dark>{{ vehicle }}</v-subheader>
            </header>
          </v-col>
          <v-spacer />
          <v-col sm="12" md="6" lg="4">
            <v-menu
              v-model="startMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              full-width
              min-width="290px"
              max-width="290px"
              :nudge-right="40"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  label="Start Date"
                  clearable
                  prepend-icon="event"
                  readonly
                  dark
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                no-title
                scrollable
                @change="startMenu = false"
              />
            </v-menu>
          </v-col>
          <v-col sm="12" md="6" lg="4">
            <v-menu
              v-model="endMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              full-width
              min-width="290px"
              max-width="290px"
              :nudge-right="40"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  label="End Date"
                  clearable
                  prepend-icon="event"
                  readonly
                  dark
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                no-title
                scrollable
                @change="endMenu = false"
              />
            </v-menu>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card elevation="0">
                <v-card-title>SafeRoads Score</v-card-title>
                <v-card-text>
                  <!-- <kendo-chart :series-defaults-type="'donut'" :chart-area-background="''" :series="series" :tooltip="tooltip"></kendo-chart> -->
                  <kendo-arcgauge
                    ref="arcgauge1"
                    :scale-min="0"
                    :value="score"
                    :scale-max="100"
                    :center-template="'#: value #'"
                    style="width:100%;font-size:3rem;"
                  />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="0">
                <v-card-title>Score Breakdown</v-card-title>
                <v-card-text>
                  <div v-for="category in scores" :key="category.text">
                    <v-subheader class="caption">
                      {{ category.text }} -
                      <v-chip
                        label
                        x-small
                        :color="getColor(category.score)"
                        class="ml-2"
                      >
                        {{ category.score }}</v-chip
                      >
                    </v-subheader>
                    <v-divider />
                    <v-rating
                      v-model="category.value"
                      readonly
                      :color="getColor(category.score)"
                      empty-icon="texture"
                      full-icon="directions_car"
                      background-color="grey lighten-1"
                    />
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title>Map of Trips</v-card-title>
                <v-card-text>
                  <kendo-map
                    ref="map1"
                    :center="[41.98345, -88.02516]"
                    :zoom="18"
                    style="width:100%; height:350px;"
                  >
                    <kendo-map-layer
                      :type="'tile'"
                      :url-template="
                        'https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png'
                      "
                      :subdomains="['a', 'b', 'c']"
                      :attribution="
                        '%copy; <a href=\'https://osm.org/copyright\'>OpenStreetMap contributors</a>'
                      "
                    />
                    <kendo-map-marker
                      :location="[41.98345, -88.02516]"
                      shape="pinTarget"
                    />
                  </kendo-map>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-data-table :headers="headers" :items="items">
                <template v-slot:item.saferoads="{ item }">
                  <v-chip outlined :color="getScoreColor(item.saferoads)">
                    <v-icon left>show_chart</v-icon>
                    {{ item.saferoads }}
                  </v-chip>
                </template>
                <template v-slot:item.phone_use="{ item }">
                  <v-chip x-small :color="getColor(item.phone_use)">{{
                    item.phone_use
                  }}</v-chip>
                </template>
                <template v-slot:item.excessive_speeding="{ item }">
                  <v-chip x-small :color="getColor(item.excessive_speeding)">{{
                    item.excessive_speeding
                  }}</v-chip>
                </template>
                <template v-slot:item.hard_braking="{ item }">
                  <v-chip x-small :color="getColor(item.hard_braking)">{{
                    item.hard_braking
                  }}</v-chip>
                </template>
                <template v-slot:item.aggressive_acceleration="{ item }">
                  <v-chip
                    x-small
                    :color="getColor(item.aggressive_acceleration)"
                  >
                    {{ item.aggressive_acceleration }}</v-chip
                  >
                </template>
                <template v-slot:item.hard_turn="{ item }">
                  <v-chip x-small :color="getColor(item.hard_turn)">{{
                    item.hard_turn
                  }}</v-chip>
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title>Chart of Speed</v-card-title>
                <v-card-text>
                  <kendo-chart ref="chart1" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
//import { debounce } from 'lodash-es'
import { debounce } from 'lodash-es'
export default {
  name: 'SafeRoads',
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      startMenu: false,
      endDate: new Date().toISOString().substr(0, 10),
      endMenu: false,
      headerClass: '',
      vehicle: '',
      score: 48,
      tooltip: { visible: true, template: '#= value #' },
      scores: [
        { text: 'Distracted Phone Use', score: 'D', value: 2 },
        { text: 'Hard Braking', score: 'B', value: 4 },
        { text: 'Aggressive Acceleration', score: 'C', value: 3 },
        { text: 'Excessive Speeding', score: 'A', value: 5 },
        { text: 'Hard Turn', score: 'F', value: 1 }
      ],
      headers: [
        { text: 'Time', value: 'time', width: '250px', align: 'left' },
        { text: 'Duration', value: 'duration', width: '200px', align: 'left' },
        {
          text: 'Distance (mi)',
          value: 'distance',
          width: '200px',
          align: 'left'
        },
        {
          text: 'SafeRoads',
          value: 'saferoads',
          width: '250px',
          align: 'center'
        },
        {
          text: 'Distracted: Phone Use',
          value: 'phone_use',
          align: 'center',
          width: '200px'
        },
        {
          text: 'Excessive Speeding',
          value: 'excessive_speeding',
          align: 'center',
          width: '200px'
        },
        {
          text: 'Hard Braking',
          value: 'hard_braking',
          align: 'center',
          width: '200px'
        },
        {
          text: 'Aggressive Acceleration',
          value: 'aggressive_acceleration',
          align: 'center',
          width: '200px'
        },
        {
          text: 'Hard Turn',
          value: 'hard_turn',
          align: 'center',
          width: '200px'
        }
      ],
      items: [
        {
          time: '2019-09-05 06:24 AM',
          duration: '01:09:59',
          distance: '38.1',
          saferoads: '69',
          phone_use: 'B',
          excessive_speeding: 'C',
          hard_braking: 'B',
          aggressive_acceleration: 'B',
          hard_turn: 'F'
        },
        {
          time: '2019-09-04 06:08 PM',
          duration: '01:01:10',
          distance: '25.03',
          saferoads: '-1',
          phone_use: 'NA',
          excessive_speeding: 'NA',
          hard_braking: 'NA',
          aggressive_acceleration: 'NA',
          hard_turn: 'NA'
        }
      ],
      title1: 'Safe',
      title2: 'Roads'
    }
  },
  computed: {
    series: function() {
      return [
        {
          data: [
            {
              category: 'score',
              value: this.score,
              color: '#4F286C'
            }
          ]
        }
      ]
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  created() {
    this.vehicle = this.$route.params.vehicle
    this.headerClass = this.$config.COMPONENT_HEADER_CLASS
  },
  methods: {
    handleResize: debounce(function() {
      //console.log("debounce resize...");
      this.$refs.arcgauge1.kendoWidget().resize()
      this.$refs.map1.kendoWidget().resize()
      this.$refs.chart1.kendoWidget().resize()
    }, 300),
    getColor(score) {
      switch (score) {
        case 'A':
          return 'success darken-1'
        case 'B':
          return 'success lighten-1'
        case 'C':
          return 'orange lighten-1'
        case 'D':
          return 'orange darken-1'
        case 'F':
          return 'error'
        default:
          return 'secondary'
      }
    },
    getNumber(number) {
      switch (number) {
        case 1:
          return 'one'
        case 2:
          return 'two'
        case 3:
          return 3
        case 4:
          return 4
        case 5:
          return 5
        default:
          return 3
      }
    },
    getScoreColor(number) {
      switch (true) {
        case number >= 85:
          return 'success darken-1'
        case number >= 75:
          return 'success lighten-1'
        case number >= 60:
          return 'orange lighten-1'
        case number >= 45:
          return 'orange darken-1'
        default:
          return 'error'
      }
    }
  }
}
</script>

<style></style>
