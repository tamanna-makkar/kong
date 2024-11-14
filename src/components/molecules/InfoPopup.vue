<script setup lang="ts">
import close from '@/assets/icons/close.svg'
import Button from '@/components/molecules/Button.vue'

// Emits
const emit = defineEmits(['close', 'onClick'])

// Props
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <!-- Popup -->
  <div class="absolute w-full max-md:w-10/12 max-md:mx-auto max-w-96 bottom-4 max-md:left-0 right-0 md:right-4 p-2 rounded-lg bg-sky-600	shadow-lg sm:p-3 ease-out transition duration-500">
    <div class="flex items-center justify-between flex-wrap">
      <div class="w-0 flex-1 flex items-center text-base text-white font-semibold">
        <span>{{ text }}</span>
      </div>
      <div class="order-3 mt-2 w-full sm:order-2 sm:mt-0 sm:w-auto">
        <Button
          size="md"
          text="Refresh"
          type="white"
          @on-click="$emit('onClick')"
        />
      </div>
      <div class="order-2 sm:order-3 sm:ml-2">
        <img
          class="cursor-pointer"
          height="20"
          :src="close"
          width="20"
          @click="emit('close')"
        >
      </div>
    </div>
  </div>
</template>
