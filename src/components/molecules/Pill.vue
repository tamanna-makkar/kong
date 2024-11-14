<script lang="ts" setup>
import type { PropType } from 'vue'
defineOptions(
  { name: 'BasePill' },
)
// PROPS
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default',
  },
  /* Option to add the icons */
  icon: {
    type: String,
    default: '',
  },
})


// STATE
const classBindings: string = {
  default: 'bg-secondary-200 text-secondary-900',
  primary: 'bg-primary-500',
}[props.type]
</script>

<template>
  <div
    :class="[
      'px-4	py-2 rounded-full inline-flex items-center gap-2 text-primary-500 font-semibold text-xs',
      classBindings
    ]"
  >
    <span>{{ text }}</span>
  </div>
</template>