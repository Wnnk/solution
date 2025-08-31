<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <div class="table-popover"></div>
    <div class="table-popover-content">
      <div class="table-popover-content-item" v-for="{ label, value, icon } in list" :key="value">
        <i :class="['item-icon', 'iconfont', icon]"></i>
        <div>{{ label }}</div>
      </div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
})

const list = [
  {
    label: '修改字段/列',
    value: 'option1',
    icon: 'el-icon-tickets',
  },
  {
    label: '隐藏字段/列',
    value: 'option2',
    icon: 'el-icon-s-tools',
  },
  {
    label: '向左插入字段/列',
    value: 'option3',
    icon: 'el-icon-arrow-left',
  },
  {
    label: '向右插入字段/列',
    value: 'option4',
    icon: 'el-icon-arrow-right',
  },
  {
    label: '删除字段/列',
    value: 'option5',
    icon: 'el-icon-delete',
  },
]
</script>

<style lang="scss" scoped>
.table-popover {
  padding: 0 2px;
}
</style>
