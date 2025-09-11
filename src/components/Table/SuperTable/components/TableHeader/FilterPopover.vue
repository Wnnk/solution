<template>
  <el-popover
    placement="bottom"
    width="500"
    trigger="click"
    @hide="handleCancel"
    v-model:visible="visible"
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
        <el-button @click="handleCancel">取消</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="handleFilter">确定</el-button>
      </div>
    </div>

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import { UseColumns, UseData, UseFilterStore} from '@/components/Table/SuperTable/type'
const useColumns = inject('useColumns') as UseColumns
const useFilterStore = inject('useFilterStore') as UseFilterStore

const filteroptions = computed(() => {
  const columns = useColumns.columns.value
  const result = columns.map((item) => {
    return { label: item.label, value: item.key }
  })
  return result
})

const visible = ref(false)

/* 列的key */
const filterKey = ref()
/* 列的过滤参数 */
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
/* 选择的列的过滤参数 */
const selectParameterKey = ref('eq')
/* 用户输入参数 */
const selectParameter = ref()

const handleFilter = () => {
  useFilterStore.updateFilterStore({
    sort:useFilterStore.filterStore.value.sort,
    filter: {
      columnKey: filterKey.value,
      parameterKey: selectParameterKey.value,
      value: selectParameter.value,
    },
    group: {
      columnKey: "",
    }
  })
  visible.value = false
}

const reset = () => {
  useFilterStore.updateFilterStore({
    sort:useFilterStore.filterStore.value.sort,
    filter: {
      columnKey: "",
      parameterKey: "eq",
      value: ""
    },
    group: {
      columnKey: "",
    }
  })
  filterKey.value = ""
  selectParameterKey.value = 'eq'
  selectParameter.value = ""
}

const handleCancel = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.filter-popover {
  display: grid;
  grid-template-rows: auto 1fr;
  position: relative;
}
.filter-title{
  color:$span-color;
}
.filter-content {
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
}
.filter-footer{
  display: flex;
  justify-content: flex-end;
  margin: 10px 20px 5px 0;
}
</style>
