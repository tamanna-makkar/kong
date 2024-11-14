<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/service'
import useSearch from '@/composables/useSearch'
import Searchox from '@/components/organisms/SearchBox.vue'
import Card from '@/components/organisms/Services/Card.vue'
import Button from '@/components/molecules/Button.vue'
import Loader from '@/components/molecules/Loader.vue'
import addIcon from '@/assets/icons/add.svg'
import Pagination from '@/components/organisms/Pagination.vue'
import InfoPopup from '@/components/molecules/InfoPopup.vue'
import { useRoute } from 'vue-router'
defineOptions(
  { name: 'ServicesCatalog' },
)

// STATES
const serviceStore = useServiceStore()
const route = useRoute()
const { searchField, debounce, initialize, debounceDelay } = useSearch()
const { services, isLoader } =
  storeToRefs(serviceStore)
const currentPage = ref<number>(route.query.page ? +route.query.page : 1)
/* Default to true so that we can show the refresh popup */
const isRefreshPopupVisible = ref(true)

// COMPUTED
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * 9
  const end = start + 9
  return {
    records: services.value.slice(start, end),
    startAndEnd: { start: start + 1, end: end > services.value.length ? services.value.length : end },
  }
})

// WATCHERS
watch(
  () => route.query,
  () => {
    if (route.query.page) {
      currentPage.value = +route.query.page
    }
  },
)

onMounted(async () => {
  const query = { q: searchField.value }
  if (query.q) {
    debounce(initialize, debounceDelay)(query)
    return
  }
  await initialize()
  /* Popup will stay for 1min and then disappear */
  setTimeout(() => {
    isRefreshPopupVisible.value = false
  }, 60000)
  /* Popup visibility will be toggled after every 5mins */
  setInterval(() => {
    isRefreshPopupVisible.value = !isRefreshPopupVisible.value
  }, 300000)
})
</script>

<template>
  <!-- Service catalog -->
  <div
    v-if="!isLoader"
    class="bg-slate flex h-full flex-1 pt-16 md:pt-24 "
  >
    <div class="container mx-auto px-4 flex flex-col gap-8">
      <div class="flex justify-between pt-10 lg:items-center max-lg:flex-col max-lg:gap-6">
        <!-- Service name and description -->
        <div class="flex flex-col gap-2 lg:gap-4">
          <h1 class="text-2xl lg:text-32 text-black-800 font-bold capitalize">
            service hub
          </h1>
          <p class="text-sm lg:text-base text-black-800">
            Organize services, manage and track versioning and API service documentation.
            <router-link
              class="text-blue-600"
              to="/"
            >
              Learn more
            </router-link>
          </p>
        </div>
        <!-- Search box and create service button -->
        <div class="flex gap-6">
          <!-- Search box -->
          <Searchox
            v-model="searchField"
            class="hidden xl:flex"
            placeholder="Search..."
          />
          <!-- Create service -->
          <Button
            :icon="addIcon"
            size="md"
            text="Service Package"
            type="secondary"
          />
        </div>
      </div>
      <!-- All services -->
      <div v-if="services.length">
        <div class="flex flex-wrap max-md:gap-y-9 gap-[3%] gap-y-10">
          <!-- Services cards -->
          <Card
            v-for="(service, index) in paginatedServices.records"
            :key="index"
            :details="service"
          />
        </div>
        <!-- Pagination -->
        <Pagination
          v-model="currentPage"
          :pagination-for="'services'"
          :start-and-end="paginatedServices.startAndEnd"
          :total-items="services.length"
        />
      </div>
      <div
        v-else
        class="flex items-center justify-center h-full"
      >
        <h3 class="text-4xl text-black-800">
          No Services Found
        </h3>
      </div>
    </div>
  </div>
  <!-- Show loader if the service endpoint is still loading -->
  <div
    v-else
    class="flex h-full items-center"
  >
    <Loader />
  </div>
  <!-- Popup to refresh the services -->
  <InfoPopup
    v-if="isRefreshPopupVisible"
    text="Click to refresh the services"
    @close="isRefreshPopupVisible = false"
    @on-click="initialize()"
  />
</template>
