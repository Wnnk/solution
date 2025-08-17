<script setup>
import { useDark, useToggle } from '@vueuse/core'

import Menus from './components/Menus/menus.vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <!-- <div :class="{ dark: isDark }">
    <el-button @click="toggleDark()">Toggle Theme</el-button>
    <h1>当前模式：{{ isDark ? '暗黑' : '亮色' }}</h1>
    <el-input></el-input>
  </div> -->
  <div class="layout">
    <el-container>
      <el-header class="header">头部</el-header>
      <el-container>
        <el-aside width="200px" class="menus"><Menus /></el-aside>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
}
.header {
  height: 60px;
}
.menus {
  height: calc(100vh - 60px);
  overflow: auto;
  // border-right: 1px solid #eee;
}
</style>
