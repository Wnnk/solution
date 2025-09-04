<template>
  <div class="super-table">
    <el-container>
      <el-header>
        <TableHeader />
      </el-header>
      <el-main>
        <el-table :data="data" border v-bind="$attrs" ref="tableRef" :key="tableKey" :row-style="{height: rowHeight + 'px'}">
          <el-table-column
            v-for="column in renderColumns"
            :key="column.key"
            :prop="column.prop"
            :width="column.width"
            :type="column.type"
            :fixed="column.fixed"
          >
            <template #header>
              <!-- 组件默认表头布局 -->
              <div class="header-wrapper">
                <div>{{ column.label }}</div>
                <div @click="openPopover">
                  <TablePopover :column="_.cloneDeep(column)"  >
                    <i class="iconfont icon-header-detail"></i>
                  </TablePopover>
                </div>
              </div>
            </template>
          </el-table-column>
            <template #empty>
              <slot name="empty"></slot>
            </template>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          v-if="total && pageSize && currentPage"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-footer>
    </el-container>
    
    <div v-for="column in columns" :key="column.key">
      {{ column.label }} --- {{column.visible}} -- {{ column.fixed }} 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide,watch,nextTick } from 'vue'
import TableHeader from './components/TableHeader/TableHeader.vue'
import { ColumnType, TableData } from './type'
import TablePopover from './components/TablePopover/TablePopover.vue'
import _ from 'lodash'
import {
  editColumn,
  hideColumn,
  freezeFirstColumn,
  freezeLastColumn,
  insertLeftColumn,
  insertRightColumn,
  deleteColumn,
  toggleColumn,
} from './EditColumns'
import { ElTable } from 'element-plus'; // 导入类型


const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
const tableKey = ref(0)
const props = defineProps({
  data: {
    type: Array as () => TableData[],
    required: true,
  },
  columns: {
    type: Array as () => ColumnType[],
    required: true,
  },
  pageSize: {
    type: Number,
  },
  currentPage: {
    type: Number,
  },
  total: {
    type: Number,
  },
})




/* popover相关 */
const handerPopoverVisible = ref(false)
const openPopover = () => {
  handerPopoverVisible.value = true
}

/* 最终渲染列 */
const renderColumns = computed(() => {
  const columns = props.columns.filter((column) => column.visible)
  return columns
})

/* 作用于el-table的强制渲染 */
watch(
  () => props.columns,
  (newVal) => {
    tableKey.value++
  }
)


const emit = defineEmits(['update:columns'])


provide('useColumns', {
  columns: computed(() => props.columns),
  allColumns: props.columns,
  editColumn,
  hideColumn,
  toggleColumn,
  freezeFirstColumn,
  freezeLastColumn,
  insertLeftColumn,
  insertRightColumn,
  deleteColumn,
  updateColumns: (columns: ColumnType[]) => {
    emit('update:columns', columns)
  }
})


const rowHeight = ref(16)
provide('useRowHeight', {
  rowHeight,
  updateRowHeight: (height: number) => {
    rowHeight.value = height
  }
})







</script>

<style lang="scss" scoped>
@use './SuperTable.scss';
</style>
