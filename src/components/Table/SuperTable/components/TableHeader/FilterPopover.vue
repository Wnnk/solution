<template>
  <el-popover
    placement="bottom"
    width="500"
    trigger="click"
    @hide="handleCancel"
    :teleported="false"
  >
    <div class="filter-popover">
      <div class="filter-title">设置筛选条件</div>
      <div class="filter-content">
        <el-select v-model="filterKey" :teleported="false">
          <el-option
            v-for="item in filteroptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="selectParameterKey" :teleported="false">
          <el-option
            v-for="param in filterParameters"
            :key="param.value"
            :label="param.label"
            :value="param.value"
          ></el-option>
        </el-select>
        <div v-show="selectParameterKey !== 'null' && selectParameterKey !== 'notnull'">
          <el-input v-model="selectParameter"></el-input>
        </div>
      </div>
      <div class="filter-footer">
        <el-button type="primary" @click="handleFilter">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </div>

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import { UseColumns } from '@/components/Table/SuperTable/type'
const useColumns = inject('useColumns') as UseColumns
const filteroptions = computed(() => {
  const columns = useColumns.columns.value
  const result = columns.map((item) => {
    return { label: item.label, value: item.key }
  })
  return result
})

const filterKey = ref()

const filterParameters = [
  {
    label: '等于',
    value: 'eq',
  },
  {
    label: '不等于',
    value: 'neq',
  },
  {
    label: '包含',
    value: 'contain',
  },
  {
    label: '不包含',
    value: 'notcontain',
  },
  {
    label: '为空',
    value: 'null',
  },
  {
    label: '不为空',
    value: 'notnull',
  },
]
const selectParameterKey = ref('eq')
const selectParameter = ref()

const handleFilter = () => {}

const handleCancel = () => {}
</script>

<style lang="scss" scoped>
.filter-popover {
  display: grid;
  grid-template-rows: auto 1fr;
}
.filter-content {
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
}
</style>
