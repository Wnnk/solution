<!--  -->

<template>
<div>
  <el-button @click="loading =!loading">{{loading ? '隐藏骨架屏' : '显示骨架屏'}}</el-button>
  <h1 v-skeleton="{loading: loading, rows: 2, animated: true}" :style="{width: '700px'}">骨架屏指令Demo</h1>
  <div>下面部分数据</div>
</div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
const loading = ref(true)
</script>

<style lang='scss' scoped>
</style>