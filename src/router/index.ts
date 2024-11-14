import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Service/Listing.vue'),
    },
    {
      path: '/service/:id',
      name: 'service',
      component: () => import('@/views/Service/Details.vue'),
    },
  ],
})

export default router
