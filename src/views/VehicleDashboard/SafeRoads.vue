<template>
  <v-row>
    <v-col cols="12">
      <header>{{ title }} for vehicle {{ $route.params.vehicle }}</header>
      <v-subheader>Copying layout from live</v-subheader>
    </v-col>
    <v-col cols="12">
      <v-toolbar color="blue-grey darken-1 white--text" dark>
        <v-toolbar-title>SafeRoads</v-toolbar-title>
        <template #extension>
          <v-spacer></v-spacer>
          <v-col sm="6" md="4" lg="3">
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
                <v-text-field v-model="startDate" label="Start Date" clearable prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable @change="startMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col sm="6" md="4" lg="3">
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
                <v-text-field v-model="endDate" label="End Date" clearable prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable @change="endMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
        </template>
      </v-toolbar>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>SafeRoads Score</v-card-title>
        <v-card-text>asdf</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Score Breakdown</v-card-title>
        <v-card-text>qwerty</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
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
      <v-card>
        <v-card-title>Chart of Speed</v-card-title>
        <v-card-text>
          <canvas>chart of speed</canvas>
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
      title: 'SafeRoads'
    }
  },
  methods: {
    getColor(score) {
      switch (score) {
        case 'A':
          return 'primary'
        case 'B':
          return 'success'
        case 'C':
          return 'orange lighten-2'
        case 'D':
          return 'deep-orange darken-2'
        case 'F':
          return 'error'
        default:
          return 'secondary'
      }
    }
  },
}
</script>

<style></style>
