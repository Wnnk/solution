import { ColumnType, TableData } from '@/components/Table/SuperTable/type'
import _ from 'lodash'


/** 
 * @description: 更新过滤列
 * @param { ColumnType[] } columns - 列配置
 * @param { TableData[] } data - 表格数据
 * @param { String } key - 过滤列的key
 * @param { String } parameterKey - 过滤的方式
 * @param { String } value - 过滤参数的值
 * @returns { TableData[] } - 过滤后的表格数据
  */
export const updateFilterData = (columns: ColumnType[],data: TableData[],key: string,parameterKey:string, value: string) => {
  const filterColumns = _.cloneDeep(columns);
  const targetColumn = filterColumns.find(column => column.key === key);
  if(!targetColumn) return data;
  if(value === '' || value === null) return data;
  let filteredData;
  switch(parameterKey){
    case 'eq':
      return filteredData = data.filter(item => {
        return item[targetColumn.prop].toString() === value
      })
      
    case 'neq':
      return filteredData = data.filter(item => {
        return item[targetColumn.prop].toString() !== value
      })
    case 'contain':
      return filteredData = data.filter(item => {
        return item[targetColumn.prop].toString().includes(value)
      })
    case 'notcontain':
      return filteredData = data.filter(item => {
        return !(item[targetColumn.prop].toString().includes(value))
      })
    case 'null':
      return filteredData = data.filter(item => {
        return item[targetColumn.prop] === null || item[targetColumn.prop] === undefined
      })
    case 'notnull':
      return filteredData = data.filter(item => {
        return item[targetColumn.prop] !== null && item[targetColumn.prop] !== undefined
      })
   
    default:
  }
  // const filteredData = data.filter(item => {
  //   return item[targetColumn.prop].toString().includes(value)
  // })
  // return filteredData;
}

