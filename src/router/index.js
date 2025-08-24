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
      path: '/scrollError',
      name: 'ScrollError',
      component: () => import('@/views/Form/ScrollError/ScrollError.vue'),
    },
    {
      path: '/formPage',
      name: 'FormPage',
      component: () => import('@/views/Form/FormPage/FormPage.vue'),
    },
    {
      path: '/formAnchor',
      name: 'FormAnchor',
      component: () => import('@/views/Form/FormAnchor/FormAnchor.vue'),
    },
    {
      path: '/permissionForm',
      name: 'PermissionForm',
      component: () => import('@/views/Form/PermissionForm/PermissionForm.vue'),
    },
    {
      path: '/chartAdapt',
      name: 'ChartAdapt',
      component: () => import('@/views/Chart/ChartAdapt/ChartAdapt.vue'),
    },
    {
      path: '/lazySelect',
      name: 'LazySelect',
      component: () => import('@/views/Select/LazySelect/LazySelect.vue'),
    },
    {
      path: '/dynamicDialog',
      name: 'DynamicDialog',
      component: () => import('@/views/Dialog/DynamicDialog/DynamicDialog.vue'),
    },
  ],
})

export default router
