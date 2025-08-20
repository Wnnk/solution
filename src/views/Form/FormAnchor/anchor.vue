<!-- 
  @Author: Wnnk
  @description: 锚点组件
  @params: string[]
-->
<template>
  <el-anchor>
    <el-anchor-link v-for="item in params" :key="item.href" :href="item.href" :title="item.title" :target="item.target"></el-anchor-link>
  </el-anchor>

</template>

<script setup lang='ts'>
import { PropType } from 'vue';

type AnchorParams = {
  title: string;
  href: string;
  target?: string;
}
const props =defineProps({
  params: {
    type: Array as PropType<AnchorParams[]>,
    required: true,
    default: () => []
  }
})
</script>

<style lang='scss' scoped>
</style>