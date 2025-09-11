import { Ref } from 'vue'
import { ColumnType, TableData } from '@/components/Table/SuperTable/type'
import _ from 'lodash'
import Sortable from 'sortablejs';

/**
 * @description: 更新排序方式
 * @param { TableData[] }data - 表格数据
 * @param { string }key - 排序字段
 * @return { data } - 新的表格数据
 *
 */

export const updateSortData = (data: TableData[], key: string, order: string = 'asc') => {
  const soredData = _.cloneDeep(data)

  if (!key) return soredData

  soredData.sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]
    /* 处理空值 */
    if (valueA === null || valueA === undefined) return 1
    if (valueB === null || valueB === undefined) return -1

    /* 区分数据类型排序 */
    const typeA = typeof valueA
    const typeB = typeof valueB

    /* 数字 > 字符串 > 布尔 > 其他 */
    if (typeA !== typeB) {
      const typePriority = { number: 3, string: 2, boolean: 1 }
      return (typePriority[typeB] || 0) - (typePriority[typeA] || 0)
    }

    switch (typeA) {
      case 'number':
        return valueA - valueB
      case 'string':
        return valueA.localeCompare(valueB, 'zh-CN', { sensitivity: 'base' })
      case 'boolean':
        return valueA ? -1 : 1
      default:
        return String(valueA).localeCompare(String(valueB))
    }
  })
  if (order === 'desc') {
    soredData.reverse()
  }

  return soredData
}









