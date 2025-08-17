import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/formCache',
      name: 'FormCache',
      component: () => import('@/views/Form/FormCache/FormCache.vue'),
    },
    {
      path: '/chartAdapt',
      name: 'ChartAdapt',
      component: () => import('@/views/Chart/ChartAdapt/ChartAdapt.vue'),
    },
  ],
})

export default router
