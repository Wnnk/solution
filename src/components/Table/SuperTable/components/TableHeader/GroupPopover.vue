<template>
  <el-popover v-model:visible="visible" placement="bottom-start" width="400" trigger="click">
    <div class="group-popover">
      <div class="group-popover-title">
        <span>设置分组条件</span>
      </div>
      <div class="group-popover-content">
        <el-select v-model="originColumnKey">
          <el-option 
            v-for="column in columns" 
            :key="column.key" 
            :label="column.label" 
            :value="column.key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="group-popover-btn">
        <el-button @click="handleCancel">取消</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </div>

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, inject,computed  } from 'vue'
import { UseColumns, UseFilterStore } from '@/components/Table/SuperTable/type'

const visible = ref(false)
const useColumns = inject('useColumns') as UseColumns
const useFilterStore = inject('useFilterStore') as UseFilterStore

const columns = computed(() => {
  const columns = useColumns.columns.value
  return columns.filter((column) => {
    if (column.prop !== null && column.prop !== undefined) {
      return column
    }
  })
})
const originColumnKey = ref<string>('')




const handleCancel = () => {
  visible.value = false
}

const handleReset = () => {
  useFilterStore.updateFilterStore({
    group: {
      columnKey: '',
    },
    sort: useFilterStore.filterStore.value.sort,
    filter: useFilterStore.filterStore.value.filter,
  })
  originColumnKey.value = ''
  visible.value = false
}

const handleConfirm = () => {
  useFilterStore.updateFilterStore({
    group: {
      columnKey: originColumnKey.value,
    },
    sort: useFilterStore.filterStore.value.sort,
    filter: useFilterStore.filterStore.value.filter,
  })
}
</script>

<style lang="scss" scoped>
.group-popover-title {
  color:$span-color
}
.group-popover-content {
  display: grid;
  grid-template-columns: 150px;
}
.group-popover-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
