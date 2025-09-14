<template>
  <el-popover v-model:visible="visible" width="500" placement="bottom" trigger="click">
    <div class="fill-color-popover">
      <div class="fill-color-title">设置填色条件</div>
      <div class="fill-color-content"></div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const visible = ref(false)
</script>

<style lang="scss" scoped></style>
