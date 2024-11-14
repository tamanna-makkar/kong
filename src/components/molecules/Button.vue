<script lang="ts" setup>

// IMPORTS
import type { PropType } from 'vue'
import type { ButtonStyle, ButtonStates } from '@/types'
defineOptions(
  { name: 'BaseButton' },
)
// PROPS
defineProps({
  type: {
    type: String as PropType<ButtonStyle>,
    default: 'primary',
  },
  text: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
  icon: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

// STATE
const states: ButtonStates = {
  primary: {
    bgColor: 'bg-primary-500 xl:w-[197px]',
    hover: 'hover:bg-primary-400',
    textColor: 'text-white',
  },
  secondary: {
    bgColor: 'bg-seconday',
    hover: 'hover:shadow-lg',
    textColor: 'text-white',
  },
  transparent: {
    bgColor: 'bg-transparent border border-blue-300 h-12',
    hover: '',
    textColor: 'text-primary-500',
  },
  white: {
    bgColor: 'bg-white border h-fit',
    hover: '',
    textColor: 'text-sky-600',
  },
}
const padding = {
  'sm': 'p-4',
  'md': 'py-3 px-4',
}
// EMITS
defineEmits(['onClick'])
</script>
<template>
  <button
    class="rounded-full w-fit h-fit flex items-center justify-center text-sm lg:text-base flex gap-2"
    :class="[
      states[type].bgColor,
      states[type].hover,
      states[type].textColor,
      padding[size],
      {'opacity-40 cursor-not-allowed': isDisabled},
    ]"
    :disabled="isDisabled"
    type="button"
    @click="$emit('onClick')"
  >
    <img
      v-if="icon"
      :src="icon"
    >
    {{ text }}
  </button>
</template>