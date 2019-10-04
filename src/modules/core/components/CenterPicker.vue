<template>
  <v-treeview
    :items="items"
    :load-children="fetchChildCenters"
    :active.sync="active"
    :open.sync="open"
    open-on-click
    transition
    dense
  >
    <template #prepend="{ item, active }">
      <v-icon v-if="!item.children" v-text="'group'" />
    </template>
  </v-treeview>
</template>

<script>
import ApiService from '@/services/api.service'
export default {
  name: 'CenterPicker',
  data: () => ({
    active: [],
    open: [],
    centers: []
  }),
  computed: {
    items() {
      return [
        {
          name: 'All Centers',
          id: '',
          children: this.centers
        }
      ]
    },
    selected() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return this.centers.find(center => center.id === id)
    }
  },
  methods: {
    async fetchChildCenters(item) {
      let response = await ApiService.get('/customer/centers', item.id)
      if (response) {
        item.children.push(...response.data)
      } else {
        console.warn(response.data.errors)
      }
    }
  }
}
</script>

<style></style>
