<template>
  <el-popover placement="bottom" :width="300" trigger="click" @hide="popoverClose">
    <div class="table-popover">
      <div class="table-popover-content" v-if="!isEditColumnName">
        <div
          class="table-popover-content-item"
          v-for="{ label, value, icon } in list"
          :key="value"
          @click="selectFn(value)"
        >
          <i :class="['item-icon', 'iconfont', icon]"></i>
          <div>{{ label }}</div>
        </div>
      </div>
      <div class="edit-column-name" v-else>
        <div class="edit-span">标题</div>
        <el-input v-model="editColumn.label"></el-input>
        <div class="edit-span">字段属性</div>
        <el-input v-model="editColumn.prop"></el-input>
        <el-button @click="popoverClose">取消</el-button>
        <el-button type="primary" @click="submitPopover">确定</el-button>
      </div>
    </div>

    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, inject, Ref, toRaw } from 'vue'
import { ColumnType } from '../../type'
import { UseColumns } from '@/components/Table/SuperTable/type'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  column: {
    type: Object as () => ColumnType,
    required: true,
  },
  visible: {
    type: Boolean,
  },
})

const selectFn = (value: string) => {
  switch (value) {
    case 'modify':
      isEditColumnName.value = true
      break
    case 'hide':
      hideOneColumn()
      break
    case 'freeze':
      break
    case 'freeze-first':
      freezeToFirstColumn()
      break
    case 'freeze-last':
      freezeToLastColumn()
      break
    case 'insert-left':
      insertToLeftColumn()
      break
    case 'insert-right':
      insertToRightColumn()
      break
    case 'delete':
      deleteOneColumn()
      break
    default:
  }
}

/************************************** 修改字段/列*********************************  */
const editColumn = ref(_.cloneDeep(props.column))
const isEditColumnName = ref(false)

const list = [
  {
    label: '修改字段/列',
    value: 'modify',
    icon: 'icon-modify-column',
  },
  {
    label: '隐藏字段/列',
    value: 'hide',
    icon: 'icon-hide-column',
  },
  {
    label: '冻结列',
    value: 'freeze',
    icon: 'icon-freeze-column',
  },
  {
    label: '固定列首',
    value: 'freeze-first',
    icon: 'icon-freeze-first-column',
  },
  {
    label: '固定列尾',
    value: 'freeze-last',
    icon: 'icon-freeze-last-column',
  },
  {
    label: '向左插入字段/列',
    value: 'insert-left',
    icon: 'icon-insert-column-left',
  },
  {
    label: '向右插入字段/列',
    value: 'insert-right',
    icon: 'icon-insert-column-right',
  },
  {
    label: '删除字段/列',
    value: 'delete',
    icon: 'icon-delete',
  },
]

const useColumns = inject('useColumns') as UseColumns

// 取消操作：重置为原始基准值
const popoverClose = () => {
  isEditColumnName.value = false
}

const submitPopover = () => {
  const editVal = _.cloneDeep(editColumn.value)
  const updateColumns = useColumns.editColumn(useColumns.columns, editVal.key, editVal)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}

/**************************************** 隐藏字段/列*********************************  */
const hideOneColumn = () => {
  const updateColumns = useColumns.hideColumn(useColumns.columns, props.column.key)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}

/**************************************** 固定列首 ***************************************  */
const freezeToFirstColumn = () => {
  const updateColumns = useColumns.freezeFirstColumn(useColumns.columns, props.column.key)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}

/**************************************** 固定列首 ***************************************  */
const freezeToLastColumn = () => {
  const updateColumns = useColumns.freezeLastColumn(useColumns.columns, props.column.key)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}
/**************************************** 向左插入字段/列 ********************************  */
const insertToLeftColumn = () => {
  const newColumn = {
    id: uuidv4(),
    label: '新列',
    key: uuidv4(),
    visible: true,
  }
  const updateColumns = useColumns.insertLeftColumn(useColumns.columns, props.column.key, newColumn)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}
/**************************************** 向右插入字段/列 ********************************  */
const insertToRightColumn = () => {
  const newColumn = {
    id: uuidv4(),
    label: '新列',
    key: uuidv4(),
    visible: true,
  }
  const updateColumns = useColumns.insertRightColumn(
    useColumns.columns,
    props.column.key,
    newColumn,
  )
  useColumns.updateColumns(updateColumns)
  popoverClose()
}
/**************************************** 删除字段/列 ***********************************  */
const deleteOneColumn = () => {
  const updateColumns = useColumns.deleteColumn(useColumns.columns, props.column.key)
  useColumns.updateColumns(updateColumns)
  popoverClose()
}
</script>

<style lang="scss" scoped>
@use './TablePopover.scss';
</style>
