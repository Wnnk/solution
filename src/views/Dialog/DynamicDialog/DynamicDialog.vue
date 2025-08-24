<template>
  <div class="dialog-container">
    <el-button @click="createNormalDialog">普通弹窗</el-button>
    <BaseDIalog v-model:visible="visible" />
    <el-button @click="createBaseDialog">基础动态弹窗</el-button>
    <el-button @click="createDynamicDialog">动态弹窗复用</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createDialog, type DialogConfig } from '@/hooks/Dialog/createDialog'
import { createReusableDialog } from '@/hooks/Dialog/useDialog'
import baseComponent from './baseComponent.vue'
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
  status: 0,
})
const createBaseDialog = async () => {
  dialog.value = createDialog(baseComponent, config.value)
  setTimeout(() => {
    config.value.status = 2
    config.value.title = '动态基础弹窗'
    console.log('修改成功', config.value)
  }, 4000)
  try {
    const res = await dialog.value()
  } catch (error) {
    console.error(error)
  }
}

/* 动态复用弹窗 */
const dynamicDialog = ref(null)
const dynamicDialogConfig = ref<DialogConfig>({
  status: 0,
  title: '动态复用弹窗',
  width: '50%',
})
const { openDialog, updateConfig } = createReusableDialog()
const createDynamicDialog = async () => {
  try {
    dynamicDialogConfig.value.status = 1
    const res = await http.get('/dynamicDialog')
    dynamicDialogConfig.value = res.data
    dynamicDialog.value = openDialog(baseComponent, dynamicDialogConfig)
  } catch (error) {
    dynamicDialogConfig.value.status = 3
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  gap: 20px;
}
</style>
