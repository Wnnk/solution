<template>
  <el-popover v-model:visible="visible" width="500" placement="bottom" trigger="click">
    <div class="fill-color-popover">
      <div class="fill-color-title">设置填色条件</div>
      <div class="fill-color-content">
        <el-color-picker v-model="color" :teleported="false" @change="handleColorChange" />
      </div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'


const visible = ref(false)
const color = ref('#409EFF')

const handleColorChange = (color: string) => {
 
}


</script>

<style lang="scss" scoped></style>
