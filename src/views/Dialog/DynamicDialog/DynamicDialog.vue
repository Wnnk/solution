<!-- 
  @Author: Wnnk
  @description: 动态弹窗示例
  @example: createBaseDialog()
    问题1：多个弹窗导致的管理状态模糊
    解决方案：动态弹窗传入组件
-->


<template>
  <div class="dialog-container">
    <el-button @click="createNormalDialog">普通弹窗</el-button>
    <BaseDIalog v-model:visible="visible" />
    <el-button @click="createBaseDialog">基础动态弹窗1</el-button>
    <el-button @click="createBaseDialog2">基础动态弹窗2</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, h } from 'vue'
import { createDialog, type DialogConfig } from '@/hooks/Dialog/createDialog'
import baseComponent from './baseComponent.vue'
import BaseDIalog from './BaseDialog/BaseDIalog.vue'


/* 普通弹窗 */
const visible = ref(false)
const createNormalDialog = () => {
  visible.value = true
}

/* 动态基础弹窗 */
const dialog = ref<ReturnType<typeof createDialog> | null>(null)
const config = ref<DialogConfig>({
  title: '基础动态弹窗',
  width: '40%',
  // 其他配置项
})
const createBaseDialog = async () => {
  const AsyncSlotCom = defineAsyncComponent(() => 
  import('./SlotCom.vue')
  );
  dialog.value = createDialog(baseComponent, config.value, {title: 'props传入标题'}, { customSlot: () => {
    return h(AsyncSlotCom)
  } })
  dialog.value()
}

const createBaseDialog2 = async () => {
    const AsyncSlotCom = defineAsyncComponent(() => 
  import('./SlotCom.vue')
  );
  dialog.value = createDialog(baseComponent, config.value, {title: 'dialog2的标题'}, { customSlot: () => {
    return h(AsyncSlotCom)
  } })
  dialog.value()
}

</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  gap: 20px;
}
</style>
