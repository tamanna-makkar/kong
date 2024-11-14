import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Service } from '@/types/services'
export const useServiceStore = defineStore('service', () => {

  // STATE
  const isLoader = ref<boolean>(false)
  const services = ref<Service[]>([])
  const serviceById = ref<Service | null>(null)

  // GETTERS

  // ACTIONS
  /* Get all the services */
  const getServices = async (query?: object): Promise<Service[]> => {
    try {
      isLoader.value = true
      const { data } = await axios.get<Service[]>('/api/services', { params: query })
      // Mutate the state
      services.value = data
      return services.value
    } catch (error: any) {
      console.log(error)
      throw error
    } finally {
      // Reset loading state
      isLoader.value = false
    }
  }

  /* Get service by ID */
  const getServiceById = async (uuid: string) => {
    try {
      isLoader.value = true
      const { data } = await axios.get<Service>(`/api/service/${uuid}`)
      // Mutate the state
      serviceById.value = data
      return serviceById.value
    } catch (error: any) {
      console.log(error)
      throw error
    } finally {
      // Reset loading state
      isLoader.value = false
    }
  }

  return { isLoader, getServices, services, getServiceById, serviceById }
})