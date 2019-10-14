<template>
  <v-col :cols="cols" :sm="sm" :md="md" :style="styleObject">
    <transition name="rotate" mode="out-in">
      <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
      <template v-else-if="isEditing">
        <v-text-field
          v-if="schema.mask"
          v-model="modelProp"
          v-mask="schema.mask"
          v-bind="schema"
        />
        <v-text-field v-else v-model="modelProp" v-bind="schema" />
      </template>
      <display-field v-else :label="schema.label" :value="modelProp" />
    </transition>
  </v-col>
</template>

<script>
import DisplayField from '@/modules/core/components/DisplayField'
import { mask } from 'vue-the-mask'

export default {
  name: 'FieldWithLoader',
  components: {
    DisplayField
  },
  // phone number mask
  directives: { mask },
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: 12
    },
    sm: {
      type: [Boolean, String, Number],
      default: false
    },
    md: {
      type: [Boolean, String, Number],
      default: false
    },
    styleObject: {
      type: Object,
      default: function() {
        return { height: '72px' }
      }
    },
    isInitializing: Boolean,
    isEditing: Boolean,
    model: {
      type: String,
      default: ''
    },
    schema: {
      type: Object,
      default: function() {
        return {
          label: '',
          type: 'text',
          dense: true
        }
      }
    }
  },
  computed: {
    modelProp: {
      get: function() {
        return this.model
      },
      set: function(newValue) {
        this.$emit('update', newValue)
      }
    }
  }
}
</script>

<style>
.rotate-enter {
  transform: perspective(500px) rotate3d(0, 1, 0, 90deg);
}
.rotate-enter-active,
.rotate-leave-active {
  transition: 0.5s;
}
.rotate-leave-to {
  transform: perspective(500px) rotate3d(0, 1, 0, -90deg);
}
</style>
