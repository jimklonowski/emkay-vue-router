<template>
  <nav>
    <v-app-bar
      :class="this.$config.APP_BAR_CLASS"
      height="64"
      app
      clipped-left
      dark
    >
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click.stop="drawer.isOpen = !drawer.isOpen"
      />

      <v-toolbar-items class="hidden-md-and-down">
        <component
          :is="item.component"
          v-for="item in items"
          :key="item.text"
          :to="item.to"
          text
          dark
        >
          {{ item.text }}
        </component>
      </v-toolbar-items>
      <v-spacer />
      <v-text-field
        class="py-2"
        clearable
        append-icon="search"
        hint="Search"
        placeholder="Find a vehicle, driver, or website feature..."
        hide-details
        label="Search"
        type="search"
        rounded
        solo-inverted
        style="right:0;max-width:40%;min-width:300px;"
        color="blue-grey darken-2"
        flat
        dense
        dark
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer.isOpen"
      class="hidden-lg-and-up"
      :app="drawer.app"
      :bottom="drawer.bottom"
      :clipped="drawer.clipped"
      :height="drawer.height"
      mobile-break-point="9999"
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
  </nav>
</template>

<script>
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'MainNavbar',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    title: 'test',
    drawer: {
      isOpen: false,
      app: true,
      bottom: true,
      clipped: false,
      height: 400
    }
  }),
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style></style>
