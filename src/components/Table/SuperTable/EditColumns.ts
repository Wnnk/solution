import { ColumnType } from './type'
import { Ref, isRef, isReactive, ref } from 'vue'

/**
 * @description: 修改字段/列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @param { ColumnType }newColumn 新的列配置
 * @return columns 新的列配置
 */
export const editColumn = (columns: Ref<ColumnType[]>, key: string, newColumn: ColumnType) => {
  return columns.value.map((item) => {
    if (item.key === key) {
      return { ...item, ...newColumn }
    } else {
      return item
    }
  })
}

/**
 * @description:隐藏字段/列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 */
export const hideColumn = (columns: Ref<ColumnType[]>, key: string) => {
  return columns.value.map((item) => {
    if (item.key === key) {
      return { ...item, visible: false }
    } else {
      return item
    }
  })
}

/**
 * @description: 切换显示/隐藏列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 */

export const toggleColumn = (columns: Ref<ColumnType[]>, key: string) => {
  return columns.value.map((item) => {
    if (item.key === key) {
      return { ...item, visible: !item.visible }
    } else {
      return item
    }
  })
}

/**
 * @description: 冻结列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 */

/**
 * @description: 固定列首
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 *
 */

export const freezeFirstColumn = (columns: Ref<ColumnType[]>, key: string) => {
  const newColumns = [...columns.value]
  const targetIndex = newColumns.findIndex((item) => item.key === key)
  if (targetIndex === -1) return newColumns
  const firstNoFixedIndex = newColumns.findIndex((item) => !item.fixed)
  const [targetColumn] = newColumns.splice(targetIndex, 1)
  const updateTarget = { ...targetColumn, fixed: 'left' } as ColumnType
  const insertIndex = firstNoFixedIndex === -1 ? firstNoFixedIndex : 0
  newColumns.splice(insertIndex, 0, updateTarget)
  return newColumns
}

/**
 * @description: 固定列尾
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 *
 */

export const freezeLastColumn = (columns: Ref<ColumnType[]>, key: string) => {
  const newColumns = [...columns.value]
  const targetIndex = newColumns.findIndex((item) => item.key === key)
  if (targetIndex === -1) return newColumns
  const firstRightFixedIndex = newColumns.findIndex((item) => item.fixed === 'right')
  const [targetColumn] = newColumns.splice(targetIndex, 1)
  const updateTarget = { ...targetColumn, fixed: 'right' } as ColumnType
  const insertIndex = firstRightFixedIndex === -1 ? newColumns.length : firstRightFixedIndex
  newColumns.splice(insertIndex, 0, updateTarget)
  return newColumns
}

/**
 * @description: 向左插入列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @param { ColumnType }column 要插入的列
 * @return columns 新的列配置
 *
 */
export const insertLeftColumn = (columns: Ref<ColumnType[]>, key: string, column: ColumnType) => {
  const index = columns.value.findIndex((item) => item.key === key)
  if (index === -1) {
    return columns
  }
  columns.value.splice(index, 0, column)
  return [...columns.value]
}

/**
 * @description: 向右插入列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @param { ColumnType }column 要插入的列
 * @return columns 新的列配置
 *
 */
export const insertRightColumn = (columns: Ref<ColumnType[]>, key: string, column: ColumnType) => {
  const index = columns.value.findIndex((item) => item.key === key)
  if (index === -1) {
    return columns
  }
  columns.value.splice(index + 1, 0, column)
  return [...columns.value]
}

/**
 * @description: 删除列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 */
export const deleteColumn = (columns: Ref<ColumnType[]>, key: string) => {
  const index = columns.value.findIndex((item) => item.key === key)
  if (index === -1) {
    return columns
  }
  columns.value.splice(index, 1)
  return [...columns.value]
}
