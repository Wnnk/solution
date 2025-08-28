import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* 表单 */
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
    /* 表格 */
    {
      path: '/superTable',
      name: 'SuperTable',
      component: () => import('@/views/Table/SuperTable/SuperTable.vue'),
    },
    {
      path: '/colWidth',
      name: 'ColWidth',
      component: () => import('@/views/Table/ColWidth/ColWidth.vue'),
    },
    {
      path: '/removeRow',
      name: 'RemoveRow',
      component: () => import('@/views/Table/Remove/RemoveRow.vue')
    },
    {
      path: '/selectRows',
      name: 'SelectRows',
      component: () => import('@/views/Table/SelectRows/SelectRows.vue')
    }

  ],
})

export default router
