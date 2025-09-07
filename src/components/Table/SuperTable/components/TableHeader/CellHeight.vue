<template>
  <el-popover placement="bottom" width="100" trigger="click">
    <div class="cell-height-popover">
      <div class="cell-height-popover-title">
        <span>设置行高</span>
      </div>
      <div class="cell-height-popover-content">
        <div
          :class="['cell-height-popover-item', rowHeight === item.value ? 'active' : '']"
          v-for="item in cellHeightArray"
          :key="item.value"
          @click="setRowHeight(item.value)"
        >
          <i :class="['iconfont', item.icon]"></i>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { UseRowHeight } from '@/components/Table/SuperTable/type'

const useRowHeight = inject('useRowHeight') as UseRowHeight
const rowHeight = computed(() => useRowHeight.rowHeight.value)

const setRowHeight = (height: number) => {
  useRowHeight.updateRowHeight(height)
}

const cellHeightArray = [
  {
    label: '低',
    value: 63,
    icon: 'icon-cell-low',
  },
  {
    label: '中等',
    value: 80,
    icon: 'icon-cell-mid',
  },
  {
    label: '高',
    value: 96,
    icon: 'icon-cell-high',
  },
  {
    label: '超高',
    value: 128,
    icon: 'icon-cell-super',
  },
]
</script>

<style lang="scss" scoped>
.cell-height-popover-item {
  font-size: 18px;
  display: flex;
  gap: 8px;
  &:hover {
    background-color: $table-popover-hover-bg;
  }
}
.active {
  color: $active-color;
}
</style>
