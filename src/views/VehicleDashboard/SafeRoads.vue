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
              <v-subheader dark style="display:inline-flex;vertical-align:middle;">{{ vehicle }}</v-subheader>
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
                <v-text-field v-model="startDate" label="Start Date" clearable prepend-icon="event" readonly dark v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable @change="startMenu = false"></v-date-picker>
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
                <v-text-field v-model="endDate" label="End Date" clearable prepend-icon="event" readonly dark v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable @change="endMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card elevation="0">
                <v-card-title>SafeRoads Score</v-card-title>
                <v-card-text>asdf</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="0">
                <v-card-title>Score Breakdown</v-card-title>
                <v-card-text>
                  <template v-for="category in scores">
                    <span class="caption">{{ category.text }}</span>
                    <v-rating :key="category.text" v-model="category.value" readonly :color="getColor(category.score)"></v-rating>
                  </template>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title>Map of Trips</v-card-title>
                <v-card-text>
                  <canvas>map of trips</canvas>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-data-table :headers="headers" :items="items">
                <template v-slot:item.phone_use="{ item }">
                  <v-chip x-small :color="getColor(item.phone_use)">{{ item.phone_use }}</v-chip>
                </template>
                <template v-slot:item.excessive_speeding="{ item }">
                  <v-chip x-small :color="getColor(item.excessive_speeding)">{{ item.excessive_speeding }}</v-chip>
                </template>
                <template v-slot:item.hard_braking="{ item }">
                  <v-chip x-small :color="getColor(item.hard_braking)">{{ item.hard_braking }}</v-chip>
                </template>
                <template v-slot:item.aggressive_acceleration="{ item }">
                  <v-chip x-small :color="getColor(item.aggressive_acceleration)">{{ item.aggressive_acceleration }}</v-chip>
                </template>
                <template v-slot:item.hard_turn="{ item }">
                  <v-chip x-small :color="getColor(item.hard_turn)">{{ item.hard_turn }}</v-chip>
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title>Chart of Speed</v-card-title>
                <v-card-text>
                  <canvas>chart of speed</canvas>
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
      scores: [
        { text: 'Distracted Phone Use', score: 'D', value: 2 },
        { text: 'Hard Braking', score: 'B', value: 4 },
        { text: 'Aggressive Acceleration', score: 'C', value: 3 },
        { text: 'Excessive Speeding', score: 'A', value: 5 },
        { text: 'Hard Turn', score: 'F', value: 1 }
      ],
      headers: [
        { text: 'Time', value: 'time' },
        { text: 'Duration', value: 'duration' },
        { text: 'Distance (mi)', value: 'distance' },
        { text: 'SafeRoads', value: 'saferoads' },
        { text: 'Distracted: Phone Use', value: 'phone_use' },
        { text: 'Excessive Speeding', value: 'excessive_speeding' },
        { text: 'Hard Braking', value: 'hard_braking' },
        { text: 'Aggressive Acceleration', value: 'aggressive_acceleration' },
        { text: 'Hard Turn', value: 'hard_turn' }
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
  created() {
    this.vehicle = this.$route.params.vehicle
    this.headerClass = this.$config.COMPONENT_HEADER_CLASS
  },
  methods: {
    getColor(score) {
      switch (score) {
        case 'A':
          return 'success'
        case 'B':
          return 'primary'
        case 'C':
          return 'orange lighten-2'
        case 'D':
          return 'deep-orange darken-2'
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
    }
  }
}
</script>

<style></style>
