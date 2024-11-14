<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Metrics } from '@/types/services'


// STATE
const commonClass = 'text-black-800 pr-[2px]'

// PROPS
defineProps({
  details: {
    type: Object as PropType<Metrics>,
    required: true,
  },
})
</script>
<template>
  <ul
    class="text-xs text-black-200 font-semibold flex flex-col gap-[5px] list-image-[url(@/assets/icons/dot.svg)] pl-4 flex-2"
  >
    <li>
      <span :class="commonClass">{{ details.latency }}</span> latency
    </li>
    <li><span :class="commonClass">{{ details.uptime }}</span>  uptime</li>
    <li><span :class="commonClass">{{ details.requests }}</span>  requests  </li>
    <li><span :class="commonClass">{{ details.errors }}</span> errors</li>
  </ul>
</template>