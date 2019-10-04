<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    class="hidden-lg-and-up"
    :app="drawer.app"
    :bottom="drawer.bottom"
    :clipped="drawer.clipped"
    :height="drawer.height"
    mobile-break-point="9999"
    temporary
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
import { mapActions } from 'vuex'

import { TOGGLE_DRAWER } from '../../store/actions.type'

export default {
  name: 'Drawer',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    drawer: {
      app: true,
      bottom: true,
      clipped: false,
      height: 400,
      isOpen: false
    }
  }),
  computed: {
    ...mapActions([TOGGLE_DRAWER]),
    drawerOpen: {
      get() {
        return this.$store.state.core.drawerOpen
      },
      set(state) {
        if (state !== this.$store.state.core.drawerOpen) {
          this.$store.dispatch(TOGGLE_DRAWER)
        }
      }
    }
  },
  methods: {
    logout() {
      // Parent's logout method is shared between drawer and main navbar, so reference it via the parent component
      this.$parent.logout()
    }
  }
}
</script>

<style></style>
