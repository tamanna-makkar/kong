<script lang="ts" setup>

// IMPORTS
defineOptions(
  { name: 'HeaderDrawer' },
)
import type { PropType } from 'vue'
import HeaderLink from '@/components/molecules/Link.vue'
import Searchox from '@/components/organisms/SearchBox.vue'
import useSearch from '@/composables/useSearch'
import type { Link } from '@/types'

// STATES
const { searchField } = useSearch()

// PROPS
defineProps({
  links: {
    type: Array as PropType<Link[]>,
    required: true,
  },
  userProfile: {
    type: Object as PropType<Link>,
    required: true,
  },
})


</script>
<template>
  <div
    class="xl:hidden top-16	right-0 w-full md:w-2/3	bg-primary text-white fixed h-full z-20 ease-in-out duration-300"
  >
    <div
      class="flex flex-col"
    >
      <!-- Mobile Search box -->
      <div class="p-5">
        <Searchox
          v-model="searchField"
          placeholder="Search..."
        />
      </div>
      <div class="flex flex-col">
        <HeaderLink
          v-for="{ icon, text, navigateTo }, index in links"
          :key="index"
          v-bind="{
            icon,
            text,
            navigateTo,
            color: 'white'
          }"
        />
      </div>
      <!-- User profile -->
      <div class="h-full flex bg-active ">
        <HeaderLink
          v-bind="{
            icon: userProfile.icon,
            text: userProfile.text,
            navigateTo: userProfile.navigateTo
          }"
        />
      </div>
    </div>
  </div>
</template>