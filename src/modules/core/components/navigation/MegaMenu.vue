<template>
  <div>
    <v-card
      :color="color"
      style="z-index:5;"
      elevation="0"
      :dark="dark"
      tile
      min-height="350"
    >
      <v-container fluid>
        <v-row>
          <v-col v-for="(category, i) in categories" :key="i" sm="4" xl="2">
            <v-subheader
              class="font-weight-medium"
              :dark="dark"
              v-text="$t(category.key)"
            />
            <v-divider :dark="dark" />
            <v-list :dark="dark" color="transparent">
              <v-list-item
                v-for="(item, j) in category.items"
                :key="j"
                :to="item.to"
                class="text-capitalize caption"
                style="min-height:24px"
                dense
                link
                v-text="$t(item.key)"
              />
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
      default: 'primary lighten-2'
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
