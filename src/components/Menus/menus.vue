<template>
  <el-menu :default-active="activeMenu">
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
import { useRouter } from 'vue-router'
import { MenuItem } from './type'

const router = useRouter()

const activeMenu = ref('/')
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
      }
    ],
  },
  {
    icon: 'icon-table',
    path: '/table',
    title: 'Table',
    children: [],
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
])
</script>

<style lang="scss" scoped>
.title {
  margin-left: 10px;
  font-size: 16px;
}
</style>
