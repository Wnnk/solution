<template>
  <div class="dialog-container">
    <el-button @click="createNormalDialog">普通弹窗</el-button>
    <BaseDIalog v-model:visible="visible" />
    <el-button @click="createBaseDialog">基础动态弹窗</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, h } from 'vue'
import { createDialog, type DialogConfig } from '@/hooks/Dialog/createDialog'
import { createReusableDialog } from '@/hooks/Dialog/useDialog'
import baseComponent from './baseComponent.vue'
import SlotCom from './SlotCom.vue'
import BaseDIalog from './BaseDialog/BaseDIalog.vue'
import http from '@/http/http'

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


</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  gap: 20px;
}
</style>
