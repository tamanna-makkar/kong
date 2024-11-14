<script lang="ts" setup>
defineOptions(
  { name: 'BaseCount' },
)
// PROPS
defineProps({
  count: {
    type: Number,
    required: true,
  },
})
</script>
<template>
  <div class="bg-gray-200	w-[38px] h-[38px] rounded-full flex items-center justify-center text-xs text-black-800 font-semibold border">
    + {{ count }}
  </div>
</template>