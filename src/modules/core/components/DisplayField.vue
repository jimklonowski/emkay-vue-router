<template>
  <v-list-item-content class="py-0 px-3">
    <v-list-item-subtitle :class="$config.LABEL_CLASS" v-text="label" />
    <v-list-item-title :class="$config.FIELD_CLASS" v-text="value" />
  </v-list-item-content>
</template>

<script>
export default {
  name: 'DisplayField',
  props: ['label','value']
}
</script>
