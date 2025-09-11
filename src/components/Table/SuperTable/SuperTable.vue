<template>
  <div class="super-table">
    <el-container>
      <el-main>
        <el-table
          :data="renderData"
          border
          v-bind="$attrs"
          ref="tableRef"
          :key="tableKey"
          :row-style="{ height: rowHeight + 'px' }"
          @header-click="selectColumn"
          @cell-click="selectCell"
          
        >
          <el-table-column>
            <template #header>
              <TableHeader />
            </template>
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
              <div class="header-wrapper" >
                <i class="iconfont icon-drag" :style="{ opacity: isDraggable? 1 : 0 }"></i>
                <div>{{ column.label }}</div>
                <div @click.stop="openPopover">
                  <TablePopover :column="_.cloneDeep(column)">
                    <i class="iconfont icon-header-detail"></i>
                  </TablePopover>
                </div>
              </div>
            </template>
            </el-table-column>
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

   
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch, onUnmounted, nextTick } from 'vue'
import TableHeader from './components/TableHeader/TableHeader.vue'
import { ColumnType, TableData, FilterStore } from './type'
import TablePopover from './components/TablePopover/TablePopover.vue'
import {  makeColumnsDraggable } from './Draggable'
import _  from 'lodash'
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
import { updateSortData } from './SortColumns'
import { updateFilterData } from './FilterColumns'
import { ElTable } from 'element-plus' // 导入类型




const tableRef = ref<InstanceType<typeof ElTable> | null>(null)
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

/* 列源数据 */
const orgincolumns = ref<ColumnType[]>([...props.columns])

/* 最终渲染列 */
const renderColumns = ref<ColumnType[]>([...props.columns])

const isDraggable = ref(false)
let destroyDrag : (() => void) | null = null

/* 作用于el-table的强制渲染 */
watch(
  () => props.columns,
  (newVal) => {
    tableKey.value++
    orgincolumns.value = [...newVal]
    renderColumns.value = orgincolumns.value.filter((item) => item.visible)
  },
)

watch(
  () => isDraggable.value,
  (newVal) => {
    if(destroyDrag){
      destroyDrag();
      destroyDrag = null;
    }
    if(newVal){
      destroyDrag = makeColumnsDraggable(
        '.el-table__header-wrapper thead tr',
        orgincolumns.value,
        '.icon-drag',
        (newColumns) => {
          renderColumns.value = newColumns
        }
      )
    }
  }
)
// 组件卸载时确保清理
onUnmounted(() => {
  if (destroyDrag) {
    destroyDrag();
  }
});

provide('useDraggable', {
  isDraggable,
  updateDraggable: (value: boolean) => {
    isDraggable.value = value
  },
})


const emit = defineEmits(['update:columns', 'update:data'])

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
  },
})

const rowHeight = ref(63)
provide('useRowHeight', {
  rowHeight,
  updateRowHeight: (height: number) => {
    rowHeight.value = height
  },
})

/* 保存源数据 */
const orginData = ref<TableData[]>([...props.data])
/* 最终渲染数据 */
const renderData = ref<TableData[]>([...props.data])

const processData = (data: TableData[], filterStore: FilterStore) => {
  let result = [...data]
  const { sort, filter } = filterStore
  result = updateSortData(result, sort.columnKey, sort.order);
  result = updateFilterData(props.columns, result, filter.columnKey, filter.parameterKey, filter.value);
  return result
}



const filterStore = ref<FilterStore>({
  sort: {
    columnKey: '',
    order: 'asc',
  },
  filter: {
    columnKey: '',
    parameterKey: 'eq',
    value: '',
  },
  group: {
    columnKey: '',
  }
})

watch(
  () => filterStore.value,
  (newVal:FilterStore) => {
    renderData.value = processData([...orginData.value], newVal)
  },
  { immediate: true }
)

watch(
  () => props.data,
  (newData: TableData[]) => {
    orginData.value = [...newData]
    renderData.value = processData([...newData], filterStore.value)
  }
)





provide('useData', {
  data: computed(() => props.data),
  updateData: (data: TableData[]) => {
    emit('update:data', data)
  },
})

provide('useFilterStore', {
  filterStore,
  updateFilterStore: (value: FilterStore) => {
    filterStore.value = value
  },
})



/** *************************************选中事件 *******************************  */
const activeColumn = ref<string | null>(null)
const activeCell = ref<{row:any, column:any, cell:any} | null>(null)
const selectColumn = (column:any, event?:Event) => {


}

const selectCell = (row:any, column:any, cell:any, event?:Event) => {
  cell.classList.add('active-cell')
  console.log(cell)
}


</script>

<style lang="scss" scoped>
@use './SuperTable.scss';
::v-deep active-cell { 
  background-color: #f5f5f5;
  border: 1px solid red;
}
</style>
