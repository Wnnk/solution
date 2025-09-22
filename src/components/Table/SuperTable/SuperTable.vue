<template>
  <div class="super-table">
    <el-container>
      <el-main>
        <el-table
          :data="renderData"
          row-key="id"
          border
          v-bind="$attrs"
          ref="tableRef"
          :key="tableKey"
          :row-style="{ height: rowHeight + 'px' }"
          @header-click="selectColumn"
          :header-cell-class-name="changeColumnName"
          @cell-click="selectCell"
          :cell-class-name="changeCellName"
          @cell-contextmenu="openCellMenu"
          @cell-dblclick="editCell"
        >
          <el-table-column type="header">
            <template #header>
              <TableHeader />
            </template>
            <!-- 动态列 -->
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
                  <i class="iconfont icon-drag" :style="{ opacity: isDraggable ? 1 : 0 }"></i>
                  <div>{{ column.label }}</div>
                  <div @click.stop="openPopover">
                    <TablePopover :column="_.cloneDeep(column)">
                      <i class="iconfont icon-header-detail"></i>
                    </TablePopover>
                  </div>
                </div>
              </template>
              <template #default="scoped">
                <div v-if="isEdit && isActiveCell(scoped.row, scoped.column)">
                  <el-input v-model="editVal" @blur="saveEdit" ref="editInput" @keyup.enter.native="saveEdit"></el-input>
                </div>
                <div v-else>{{ scoped.row[scoped.column.property] }}</div>
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
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-footer>
    </el-container>
    <CellMenu
      :mouse-position="mousePosition"
      :is-menu="isMenu"
      @update:is-menu="updateisMenu"
      @update:is-detail="updateisDetail"
    />
    <TableDetail v-model:visible="isDetail" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch, onUnmounted, onMounted, nextTick } from 'vue'
import TableHeader from './components/TableHeader/TableHeader.vue'
import { ColumnType, TableData, FilterStore } from './type'
import TablePopover from './components/TablePopover/TablePopover.vue'
import { makeColumnsDraggable } from './utils/Draggable'
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
} from './utils/EditColumns'
import { getCellKey } from './utils/SelectCell'
import { updateSortData } from './utils/SortColumns'
import { updateFilterData } from './utils/FilterColumns'
import { ElTable } from 'element-plus' // 导入类型
import CellMenu from './components/TableDetail/CellMenu.vue'
import TableDetail from './components/TableDetail/TableDetail.vue'

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

const emit = defineEmits(['update:columns', 'update:data', 'update:pageSize', 'update:currentPage', 'update:total'])

const handleCurrentChange = (val: number) => {
  emit('update:currentPage', val)
}

/* popover相关 */
const handerPopoverVisible = ref(false)
const openPopover = () => {
  handerPopoverVisible.value = true
}

/*****************************列拖拽相关*************************************  */
/* 列源数据 */
const orgincolumns = ref<ColumnType[]>([...props.columns])

/* 最终渲染列 */
const renderColumns = ref<ColumnType[]>([...props.columns])

const isDraggable = ref(false)
let destroyDrag: (() => void) | null = null

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
    if (destroyDrag) {
      destroyDrag()
      destroyDrag = null
    }
    if (newVal) {
      destroyDrag = makeColumnsDraggable(
        '.el-table__header-wrapper thead tr',
        orgincolumns.value,
        '.icon-drag',
        (newColumns) => {
          renderColumns.value = newColumns
        },
      )
    }
  },
)
// 组件卸载时确保清理
onUnmounted(() => {
  if (destroyDrag) {
    destroyDrag()
  }
})

provide('useDraggable', {
  isDraggable,
  updateDraggable: (value: boolean) => {
    isDraggable.value = value
  },
})



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

/****************************条件过滤*****************************/
/* 保存源数据 */
const orginData = ref<TableData[]>([...props.data])
/* 最终渲染数据 */
const renderData = ref<TableData[]>([...props.data])

const processData = (data: TableData[], filterStore: FilterStore) => {
  let result = [...data]
  const { sort, filter } = filterStore
  result = updateSortData(result, sort.columnKey, sort.order)
  result = updateFilterData(
    props.columns,
    result,
    filter.columnKey,
    filter.parameterKey,
    filter.value,
  )
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
  },
})

watch(
  () => filterStore.value,
  (newVal: FilterStore) => {
    renderData.value = processData([...orginData.value], newVal)
  },
  { immediate: true },
)

watch(
  () => props.data,
  (newData: TableData[]) => {
    orginData.value = [...newData]
    renderData.value = processData([...newData], filterStore.value)
  },
)

provide('useData', {
  data: computed(() => props.data),
  renderData: computed(() => renderData.value),
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
const activeColumnKey = ref<string>(null)
const activeCell = ref<{ row: any; column: any; value: any; cellKey: string } | null>(null)
/********************************单元格选择****************************   */
const selectCell = (row: any, column: any, cell: HTMLTableCellElement, event?: Event) => {
  activeColumnKey.value = null
  const cellKey = getCellKey(row, column)
  activeCell.value = {
    row,
    column,
    value: row[column.property],
    cellKey,
  }
}
const changeCellName = ({ row, column }) => {
  return activeCell.value && activeCell.value.cellKey === getCellKey(row, column)
    ? 'active-cell'
    : ''
}
/*********************************列选择*****************************   */
const selectColumn = (column: any) => {
  const property = column.property
  const value = renderData.value.map((item) => item[property])[0] || undefined
  const row = renderData.value.map((item) => item)[0]
  activeColumnKey.value = column.rawColumnKey
  const cellKey = getCellKey(row, column)

  if (renderData.value.length > 0) {
    activeCell.value = {
      row,
      column,
      value,
      cellKey,
    }
  } else {
    activeCell.value = null
  }
}

const changeColumnName = (data: any) => {
  if (data.column.type === 'header') return ''
  const key = data.column.rawColumnKey

  // 为选中列的表头添加样式
  if (activeColumnKey && activeColumnKey.value === key) {
    return 'active-column-header'
  }

  return ''
}

/*************************************右键菜单**********************************  */
const handleContextMenu = (e: Event) => {
  e.preventDefault()
}

// 组件挂载时添加监听
onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu)
})

// 组件卸载时移除监听（关键步骤）
onUnmounted(() => {
  document.removeEventListener('contextmenu', handleContextMenu)
})
const mousePosition = ref<{ x: number; y: number } | null>(null)
const isMenu = ref(false)
const openCellMenu = (row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) => {
  activeCell.value = {
    row,
    column,
    value: row[column.property],
    cellKey: getCellKey(row, column),
  }
  const rect = tableRef.value.$el.getBoundingClientRect()
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
  isMenu.value = true
}
const updateisMenu = (value: boolean) => {
  isMenu.value = value
}
provide('useActiveCell', {
  activeCell,
})

/*******************************详情行*************************** */
const isDetail = ref(false)
const updateisDetail = (value: boolean) => {
  isDetail.value = value
}


/**********************************双击修改******************************** */
const isEdit = ref(false)
const editVal = ref();
const editInput = ref<HTMLInputElement | null>(null)
const editCell = (row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) => {
  isEdit.value = true
  const cellKey = getCellKey(row, column)
  activeCell.value = {
    row,
    column,
    value: row[column.property],
    cellKey,
  }
  editVal.value = _.cloneDeep(row[column.property])
  nextTick(() => {
    editInput.value[0]?.focus()
  })
}
const isActiveCell = (row: any, column: any) => {
  const id = row.id
  const key = column.rawColumnKey
  return activeCell.value && activeCell.value.cellKey === `${id}-${key}`
}
const saveEdit = () => {
  isEdit.value = false
  const newVal = _.cloneDeep(editVal.value)
  const id = activeCell.value.row.id
  activeCell.value.value = newVal

  renderData.value = renderData.value.map((item) => {
    if (item.id === id) {
       item[activeCell.value.column.property] = newVal
       return item
    } else {
      return item
    }
  })
 
}
</script>

<style lang="scss" scoped>
@use './SuperTable.scss';
</style>
