<template>
  <v-col :cols="cols" :sm="sm" :md="md" :style="styleObject">
    <!-- <transition name="flip" mode="out-in"> -->
      <v-skeleton-loader v-if="isInitializing" type="list-item-two-line" tile />
      <v-text-field
        v-else-if="isEditing && schema.mask"
        v-model="modelProp"
        v-mask="schema.mask"
        v-bind="schema"
      />
      <v-text-field v-else-if="isEditing && !schema.mask" v-model="modelProp" v-bind="schema" />
      <display-field v-else :label="schema.label" :value="modelProp" />
    <!-- </transition> -->
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
.flip-enter-active {
  transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53); /* ease-in-quadratic */
}
.flip-leave-active {
  transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* ease-out-quadratic */
}
.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
