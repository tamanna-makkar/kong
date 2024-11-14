<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/molecules/Button.vue'
import arrow from '@/assets/icons/arrow.svg'
defineOptions(
  { name: 'BasePagination' },
)

// IMPORTS
import { computed, ref, type PropType } from 'vue'

// PROPS
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 9,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
  paginationFor: {
    type: String,
    required: true,
  },
  startAndEnd: {
    type: Object as PropType<{ start: number; end: number }>,
    default: () => {},
  },
})

// STATES
const currentPage = ref<number>(props.modelValue)
const route = useRoute()
const router = useRouter()

// EMITS
const emit = defineEmits(['update:modelValue'])

// COMPUTED PROPERTIES
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage),
)

// METHODS
const updateRoute = () => {
  const query = { ...route.query, page: currentPage.value }
  router.push({ query })
}
const navigateToPrev = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('update:modelValue', currentPage.value)
    updateRoute()
  }
}
const navigateToNext = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('update:modelValue', currentPage.value)
    updateRoute()
  }
}

</script>
<template>
  <div class="flex items-center gap-6 justify-center py-6">
    <Button
      class="rotate-[-180deg]"
      :icon="arrow"
      :is-disabled="currentPage === 1"
      size="sm"
      type="transparent"
      @on-click="navigateToPrev"
    />
    <span class="text-sm md:text-base text-gray-500"><b>{{ startAndEnd.start }} to {{ startAndEnd.end }}</b> of {{ totalItems }} {{ paginationFor }}</span>
    <Button
      :icon="arrow"
      :is-disabled="currentPage === totalPages"
      size="sm"
      type="transparent"
      @on-click="navigateToNext"
    />
  </div>
</template>