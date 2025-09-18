

/** 
 * @description: 获取单元格的唯一标识
 * @param {any} row 行数据
 * @param {any} column 列数据
 * @return {string} 单元格的唯一标识
  */
export const getCellKey = (row: any, column: any):string => {
  return `${row.id}-${column.rawColumnKey}`
}