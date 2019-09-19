<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="category in categories" :key="category.text" sm="4" xl="2">
        <v-subheader class="font-weight-medium" dark>
          {{ category.text }}
        </v-subheader>
        <v-divider dark />
        <v-list dark color="transparent">
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
</template>
<script>
export default {
  name: 'FleetManagementNavigation',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style></style>
