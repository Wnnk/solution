<template>
  <el-menu :default-active="activeMenu"  >
    <template v-for="(menu, i) in menus" :key="menu.title">
      <!-- 可点击的一级菜单（无 children） -->
      <el-menu-item v-if="!menu.children" :index="menu.path" @click="toggleView(menu.path)">
        <i :class="['iconfont', menu.icon]"></i>
        <span class="title">{{ menu.title }}</span>
      </el-menu-item>

      <!-- 不可点击的一级菜单（有 children） -->
      <el-sub-menu v-else :index="String(i)">
        <template #title>
          <i :class="['iconfont', menu.icon]"></i>
          <span class="title">{{ menu.title }}</span>
        </template>
        <el-menu-item
          v-for="item in menu.children"
          :key="item.title"
          :index="item.path"
          @click="toggleView(item.path)"
        >
          {{ item.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MenuItem } from './type'
import { watch } from 'vue'


const router = useRouter()
const route = useRoute()
const activeMenu = ref()



watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
  {
    immediate: true
  }
)



const toggleView = (view: string) => {
  activeMenu.value = view
  router.push(view)
}

const menus = ref<MenuItem[]>([
  {
    title: 'Home',
    icon: 'icon-home',
    path: '/',
  },
  {
    title: 'Form',
    icon: 'icon-form',
    path: '/form',
    children: [
      {
        title: '长表单缓存',
        path: '/formCache',
        icon: 'icon-form-cache',
      },
      {
        title: '长表单错误滚动',
        path: '/scrollError',
        icon: 'icon-form-error',
      },
      {
        title: '长表单分页',
        path: '/formPage',
        icon: 'icon-form-page',
      },
      {
        title: '表单锚点',
        path: '/formAnchor',
        icon: 'icon-form-anchor',
      },
      {
        title: '自定义指令控制',
        path: '/permissionForm',
        icon: 'icon-form-permission',
      },
    ],
  },
  {
    icon: 'icon-table',
    path: '/table',
    title: 'Table',
    children: [
      {
        title: '超级表格',
        path: '/superTable',
        icon: 'icon-table-super',
      },
      {
        title: '表格列宽拖拉',
        path: '/colWidth',
        icon: 'icon-table-col-width',
      },
      {
        title: '表格行拖拽',
        path: '/removeRow',
        icon: 'icon-table-romove-row'
      },
      {
        title: '表格多勾选',
        path: '/selectRows',
        icon: 'icon-table-select-rows'
      }
    ],
  },
  {
    title: 'Chart',
    icon: 'icon-chart',
    path: '/chart',
    children: [
      {
        title: '字体自适应',
        path: '/chartAdapt',
        icon: 'icon-chart-adapt',
      },
    ],
  },
  {
    title: 'Select',
    icon: 'icon-select',
    path: '/select',
    children: [
      {
        title: '懒加载缓存下拉框',
        path: '/lazySelect',
        icon: 'icon-select-lazy',
      },
    ],
  },
  {
    title: 'Dialog',
    icon: 'icon-dialog',
    path: '/dialog',
    children: [
      {
        title: '动态弹窗',
        path: '/dynamicDialog',
        icon: 'icon-dialog-dynamic',
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.title {
  margin-left: 10px;
  font-size: 16px;
}
</style>
