<template>
  <div v-scroll="onScroll" class="mb-12" v-on="$listeners">
    <slot name="top" />
    <ul class="toc my-5">
      <li class="grey--text text--darken-3 pl-4 mb-2 body-1">
        {{ $t('common.contents') }}
      </li>
      <li
        v-for="(item, index) in toc"
        :key="index"
        class="mb-2"
        style="list-style:none;"
      >
        <a
          :href="item.target"
          :class="{
            'primary--text': activeIndex === index,
            'grey--text': activeIndex !== index
          }"
          :style="{ borderColor: activeIndex === index ? 'inherit' : null }"
          class="body-2"
          @click.stop.prevent="$vuetify.goTo(`#toc${index}`, options)"
        >
          {{ $t(item.key) }}
        </a>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
// taken from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/components/core/Toc.vue
import goTo from 'vuetify/lib/services/goto'
import { clearTimeout, setTimeout } from 'timers'

export default {
  name: 'TableOfContents',
  props: {
    tocItems: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeIndex: 0,
    currentOffset: 0,
    toc: []
  }),
  computed: {
    options() {
      return {
        duration: 500,
        offset: 48,
        easing: 'easeInOutCubic'
      }
    }
  },
  mounted() {
    if (this.tocItems) {
      //console.log('TOCItems: ' + JSON.stringify(this.tocItems))
      this.toc = this.tocItems
    }
  },
  methods: {
    goTo,
    onScroll() {
      this.currentOffset =
        window.pageYOffset || document.documentElement.offsetTop
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.findActiveIndex, 50)
    },
    findActiveIndex() {
      if (this.currentOffset < 100) {
        this.activeIndex = 0
        return
      }
      const list = this.toc.slice().reverse()
      const index = list.findIndex((item, i) => {
        const section = document.getElementById(`toc${i}`)
        if (!section) return false
        return section.offsetTop - 100 < this.currentOffset
      })

      const lastIndex = list.length
      this.activeIndex = index > -1 ? lastIndex - 1 - index : lastIndex
    }
  }
}
</script>

<style lang="scss">
.toc {
  list-style-type: none !important;
  margin: 0;
  padding: 0 !important;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  li {
    list-style: none;
    a {
      text-decoration: none;
      border-left: 2px solid transparent;
      padding-left: 16px;
      transition: color 0.1s ease-in;
    }
  }
}
</style>
