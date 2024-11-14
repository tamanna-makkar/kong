<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Service } from '@/types/services'
import Pill from '@/components/molecules/Pill.vue'
import check from '@/assets/icons/check.svg'
import deactived_check from '@/assets/icons/deactived_close.svg'
import AuthorProfile from '@/components/molecules/AuthorProfile.vue'
import Count from '@/components/molecules/Count.vue'
import Metrices from '@/components/molecules/MetricesListing.vue'

defineOptions(
  { name: 'ServiceCard' },
)


// PROPS
const props = defineProps({
  details: {
    type: Object as PropType<Service>,
    required: true,
  },
})

// Computed properties
/* if status is not published it will change the status and icon */
const serviceStatus = computed(() => {
  let status = {
    text: 'Published to portal',
    icon: check,
  }
  if (!props.details.published) {
    status.text = 'Unpublished',
    status.icon = deactived_check
  }
  return status
})

const isVersionGreaterThanTwo = computed(() => {
  return props.details.versions.length > 2
})

const navigateTo = computed(() => {
  return `/service/${props.details.id}`
})

/* if there are more than 2 versions it will show only 2 profiles and count of profiles */
const authors = computed(() => {
  return isVersionGreaterThanTwo.value ? props.details.versions.slice(0,2) : props.details.versions
})
</script>
<template>
  <router-link
    class="flex flex-col bg-white shadow-md p-6 w-full md:w-[48.5%] lg:w-[31.3%]"
    :to="navigateTo"
  >
    <div class="flex justify-between items-center">
      <!-- Published and not published status -->
      <div class="flex items-center gap-1">
        <img :src="serviceStatus.icon">
        <p class="text-black-800 text-xs">
          {{ serviceStatus.text }}
        </p>
      </div>
      <!-- Latest version -->
      <Pill
        v-if="details.versions.length"
        :text="`${details.versions[0]?.name} version`"
      />
    </div>
    <!-- Name and description -->
    <div class="flex flex-col pt-2">
      <h1 class="text-lg md:text-xl font-semibold text-neutral-700	">
        {{ details.name }}
      </h1>
      <p class="line-clamp-1 text-[13px] text-black-200">
        {{ details.description }}
      </p>
    </div>
    <!-- Other details -->
    <div class="flex pt-9 flex-1">
      <Metrices
        v-if="details.metrics"
        :details="details.metrics"
      />
      <!-- author profile -->
      <div class="flex flex-1 relative items-end">
        <AuthorProfile
          v-for="(version, index) in authors"
          :key="index"
          class="absolute flex first-of-type:right-0	[&:nth-child(2)]:right-8"
        />
        <Count
          v-if="isVersionGreaterThanTwo"
          class="absolute right-12"
          :count="details.versions.length - 2"
        />
      </div>
    </div>
  </router-link>
</template>