<script setup lang="ts">
import { ref } from 'vue'
import searchIcon from '@/assets/icons/search.svg'

// Props
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    required: true,
  },
})

const searchField = ref<string>(props.modelValue)
const inputClasses =
  'flex flex-1 w-full text-gray-700 rounded-full xl:rounded py-1 pl-10 pr-2 h-12 items-center border border-neutral-200 placeholder:text-neutral-500 placeholder:capitalize leading-140 focus:outline-none'

// EMITS
defineEmits(['update:modelValue'])

</script>
<template>
  <div class="flex items-center gap-1.5">
    <div class="relative z-10">
      <input
        v-model="searchField"
        :class="inputClasses"
        :placeholder="placeholder"
        type="text"
        @keydown.enter="$emit('update:modelValue', searchField)"
      >
      <img
        class="w-6 h-6 absolute left-[14px] top-[8px]"
        :src="searchIcon"
      >
    </div>
  </div>
</template>
