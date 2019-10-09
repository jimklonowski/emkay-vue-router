<template>
  <v-app-bar
    :class="this.$config.APP_BAR_CLASS"
    height="64"
    app
    clipped-left
    dark
  >
    <v-app-bar-nav-icon class="hidden-lg-and-up" @click.stop="toggleDrawer" />

    <v-toolbar-items class="hidden-md-and-down">
      <template v-for="(item, i) in items">
        <div
          v-if="item.hasMegaMenu"
          :key="i"
          :ref="item.ref"
          class="v-btn v-btn--flat v-btn--router v-btn--text theme--dark v-size--default"
          :class="{ 'v-btn--active': $route.path === item.to }"
          @mouseover="showMenu(item)"
          @mouseleave="hideMenu(item)"
        >
          <span>
            {{ $t(item.key) }}
            <v-icon>arrow_drop_down</v-icon>
          </span>
          <transition name="mega-menu-fade">
            <mega-menu
              v-show="item.visible"
              :categories="item.categories"
              :style="
                'position:fixed;left:0;right:0;top:64px;cursor:auto;width:100vw;min-width:100vw;'
              "
            />
          </transition>
        </div>
        <v-btn v-else :key="i" :to="item.to" text dark>
          {{ $t(item.key) }}
        </v-btn>
      </template>
    </v-toolbar-items>
    <v-spacer />
    <v-text-field
      class="py-2"
      clearable
      append-icon="search"
      hint="Search"
      :placeholder="`${$t('navigation.search_placeholder')}`"
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
</template>

<script>
import MegaMenu from '@/modules/core/components/navigation/MegaMenu'
//import { LOGOUT } from '@/modules/auth/store/actions.type'
import { TOGGLE_DRAWER } from '@/modules/core/store/actions.type'

export default {
  name: 'MainNavbar',
  components: {
    MegaMenu
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    title: 'test',
    fleetManagementMenuVisible: false,
    drawer: {
      isOpen: false,
      app: true,
      bottom: true,
      clipped: false,
      height: 400
    }
  }),
  methods: {
    toggleDrawer() {
      console.log(this.$store)
      this.$store.dispatch(TOGGLE_DRAWER)
    },
    showMenu(item) {
      if (this.$route.path !== item.to) item.visible = true
    },
    hideMenu(item) {
      if (this.$route.path !== item.to) item.visible = false
    }
  }
}
</script>

<style>
.mega-menu-fade-enter-active,
.mega-menu-fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.mega-menu-fade-enter,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
