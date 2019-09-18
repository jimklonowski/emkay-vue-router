<template>
  <v-navigation-drawer
    v-model="drawer"
    class="hidden-lg-and-up"
    mobile-break-point="9999"
    height="400"
    app
    bottom
  >
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.text" :to="item.to">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider />
      <v-list dense nav>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>domain_disabled</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Off</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    drawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
