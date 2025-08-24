<template>
  <el-dialog v-model="visible" title="基础弹窗" width="30%">
    <div class="">这是个基础弹窗</div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:visible'])
const visible = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  },
})
</script>

<style lang="scss" scoped></style>
