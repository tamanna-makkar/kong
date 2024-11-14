<script lang="ts" setup>
// IMPORTS
import { onMounted } from 'vue'
import { useServiceStore } from '@/stores/service'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import Pill from '@/components/molecules/Pill.vue'
import Metrices from '@/components/molecules/MetricesListing.vue'
import Loader from '@/components/molecules/Loader.vue'
import AuthorProfile from '@/components/molecules/AuthorProfile.vue'
defineOptions(
  { name: 'ServiceDetails' },
)

// STATES
const serviceStore = useServiceStore()
const { serviceById, isLoader } =
  storeToRefs(serviceStore)
const route = useRoute()
const commonClasses = 'text-black-800 font-bold capitalize flex align-items gap-2'

// HOOKS
onMounted(async () => {
  await serviceStore.getServiceById(route.params.id as string)
})
</script>
<template>
  <!-- Service details -->
  <div
    v-if="serviceById && !isLoader"
    class="container mx-auto px-4 py-10 flex flex-col gap-8"
  >
    <!-- Services basic details-->
    <div class="flex flex-col">
      <h1
        :class="[commonClasses, 'text-xl lg:text-32 leading-normal relative']"
      >
        {{ serviceById.name }}
        <Pill
          class="h-fit"
          :text="serviceById.published ? 'Published' : 'Unpublished'"
        />
      </h1>
      <p class="text-base lg:text-xl text-black-200 pt-2">
        {{ serviceById.description }}
      </p>
      <!-- Metrics details -->
      <Metrices
        v-if="serviceById.metrics"
        class="text-sm mt-4"
        :details="serviceById.metrics"
      />
    </div>
    <!-- Version -->
    <div
      v-if="serviceById.versions.length"
      class="flex flex-col gap-4"
    >
      <h1 :class="[commonClasses, 'text-lg lg:text-2xl']">
        Versions ({{ serviceById.versions.length }})
      </h1>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <tbody class="w-full text-sm text-left rtl:text-right text-gray-500">
            <tr
              v-for="(version, index) in serviceById.versions"
              :key="index"
              class="bg-white border-b hover:bg-gray-100 cursor-pointer items-center"
            >
              <td
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                V{{ version.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ version.description }}
              </td>
              <td class="px-6 py-4">
                <AuthorProfile :name="version.developer?.name" />
              </td>
              <td class="px-6 py-4">
                <Pill
                  :text="serviceById.type"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex h-full items-center"
  >
    <Loader />
  </div>
</template>