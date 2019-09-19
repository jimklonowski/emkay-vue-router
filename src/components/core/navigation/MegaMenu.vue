<template>
  <div>
    <v-card :color="color" style="z-index:5;" elevation="0" :dark="dark" tile min-height="350">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="category in categories"
            :key="category.text"
            sm="4"
            xl="2"
          >
            <v-subheader class="font-weight-medium" dark>
              {{ category.text }}
            </v-subheader>
            <v-divider :dark="dark" />
            <v-list :dark="dark" color="transparent">
              <v-list-item
                v-for="item in category.items"
                :key="item.text"
                :to="item.to"
                class="text-capitalize caption"
                style="min-height:24px"
                dense
                link
              >
                {{ item.text }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MegaMenu',
  props: {
    color: {
      type: String,
      default: 'blue-grey lighten-1'
    },
    categories: {
      type: Array,
      default: () => []
    },
    dark: {
      type: Boolean,
      default: true
    }
  }
}
</script>
