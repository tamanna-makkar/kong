import { watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useServiceStore } from '@/stores/service'

/* UseSearch composable, so that for the mobile search we can use the same functionality */
export default function useSearch(): any {

  // STATES
  const router = useRouter()
  const route = useRoute()
  const serviceStore = useServiceStore()
  const debounceDelay = 1000
  const searchField = ref<string>(route.query?.q as string ||
    '',
  )

  // WATCHERS
  // Watch the search field
  watch(() => searchField.value, () => {
    const query: {
      q?: string
      page?: number
    } = { ...route.query, page: 1 }
    query.q = searchField.value
    // if searchField is empty, delete the query (So that it clears the query from the route and initialize the services with no query)
    if (searchField.value == '') {
      delete query.q
      query.page = 1
    }
    router.push({ query: { ...query } })
    debounce(initialize, debounceDelay)({ ...query })
  })

  // METHODS
  const debounce = (mainFunction: any, delay: number) => {
    // to store the timer ID
    let timer: any
    // Return an anonymous function that takes in any number of arguments
    return function(...args: any) {
      // Clear the previous timer
      clearTimeout(timer)

      // Set a new timer that will execute 'mainFunction' after the delay
      timer = setTimeout(() => {
        mainFunction(...args)
      }, delay)
    }
  }
  const initialize = async (query?: object) => {
    await serviceStore.getServices(query)
  }

  // Return stateful data
  return {
    searchField,
    initialize,
    debounce,
    debounceDelay,
  }
}
