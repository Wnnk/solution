<template>
  <el-popover placement="bottom" width="500" trigger="click" v-model:visible="visible">
    <div class="sort-popover">
      <div class="sort-popover-title">设置排序条件</div>
      <div class="sort-popover-content">
        <el-select v-model="sortColumnKey" placeholder="选择条件" :teleported="false">
          <el-option
            v-for="column in columns"
            :key="column.key"
            :label="column.label"
            :value="column.prop"
          ></el-option>
        </el-select>
        <div class="sort-switch">
          <div
            :class="['sort-asc', { 'sort-active': sortOrder === 'asc' }]"
            @click="toggleSortOrder('asc')"
          >
            <span>选项顺序</span>
          </div>
          <div
            :class="['sort-desc', { 'sort-active': sortOrder === 'desc' }]"
            @click="toggleSortOrder('desc')"
          >
            <span>选项降序</span>
          </div>
        </div>
      </div>
      <div class="sort-popover-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSort">应用</el-button>
      </div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, inject, onUpdated, isRef } from 'vue'
import { UseColumns, UseSort, UseData } from '@/components/Table/SuperTable/type'
import _ from 'lodash'

const useColumns = inject('useColumns') as UseColumns
const useSort = inject('useSort') as UseSort
const columns = computed(() => {
  const columns = useColumns.columns.value
  return columns.filter((column) => {
    if (column.prop !== null && column.prop !== undefined) {
      return column
    }
  })
})
const useData = inject('useData') as UseData

const sortColumnKey = computed({
  get: () => useSort.sortColumnKey.value,
  set: (value: string) => {
    const sort = useSort.sortColumnKey
    useSort.updateSortColumn(sort, value)
  },
})
const sortOrder = computed({
  get: () => useSort.sortOrder.value || 'asc',
  set: (value: string) => {
    const sort = useSort.sortOrder
    useSort.updateSortOrder(sort, value)
  },
})

const toggleSortOrder = (order: string) => {
  if (useSort.sortOrder.value !== order) {
    useSort.updateSortOrder(useSort.sortOrder, order)
  }
}

const visible = ref(false)
const handleCancel = () => {
  visible.value = false
}

const handleSort = () => {
  const key = sortColumnKey.value
  const data = _.cloneDeep(useData.data.value)
  const newData = useSort.updateSortData(data, key, sortOrder.value)
  useData.updateData(newData)
  visible.value = false
}
</script>

<style lang="scss" scoped>
.sort-popover-content {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 100px;
}
.sort-switch {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  place-items: center;
  background-color: $switch-bg;
  border-radius: 4px;
  height: 35px;
}
.sort-asc {
  width: 120px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;

  text-align: center;
}
.sort-desc {
  width: 120px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}
.sort-active {
  background-color: $switch-active-bg;
  color: $active-color;
}
.sort-popover-footer {
  display: flex;
  justify-content: flex-end;
  margin: 10px 20px 5px 0;
}
</style>
