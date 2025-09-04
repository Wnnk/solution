import { ColumnType } from './type';
import { Ref, isRef, isReactive,ref } from 'vue';



/** 
 * @description: 修改字段/列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @param { ColumnType }newColumn 新的列配置
 * @return columns 新的列配置
  */
 export const editColumn = (columns: Ref<ColumnType[]>, key: string, newColumn: ColumnType) => {
   return columns.value.map((item) => {
    if(item.key === key) {
      return {...item,...newColumn };
    } else {
      return item;
    }
   });
 }




 /** 
  * @description:隐藏字段/列
  * @param { Ref<TableColumns> }columns 表格列配置
  * @param { string }key 唯一标识
  * @return columns 新的列配置
   */
export const hideColumn = (columns: Ref<ColumnType[]>, key: string) => {
  return columns.value.map((item) => {
    if(item.key === key) {
       return {...item, visible: false };
     } else {
       return item;
    }
  });
}


/** 
 * @description: 切换显示/隐藏列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
  */

export const toggleColumn = (columns: Ref<ColumnType[]>, key: string) => {
   return columns.value.map((item) => {
     if(item.key === key) {
      return {...item, visible: !(item.visible) };
     } else {
      return item;
     }
   });
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

export const freezeFirstColumn = (columns: Ref<ColumnType[]>, key: string,) => {
   return columns.value.map((item) => {
     if(item.key === key) {
       return {...item, fixed: 'left' };
     } else {
       return item;
     }
   });
}

/** 
 * @description: 固定列尾
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
 * 
  */

export const freezeLastColumn = (columns: Ref<ColumnType[]>, key: string) => {
   return columns.value.map((item) => {
     if(item.key === key) {
       return {...item, fixed: 'right' };
     } else {
       return item;
     }
   });
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
  const index = columns.value.findIndex((item) => item.key === key);
  if (index === -1) {
    return columns;
  }
  columns.value.splice(index, 0, column);
  return [...columns.value];
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
   const index = columns.value.findIndex((item) => item.key === key);
   if (index === -1) {
     return columns;
   }
   columns.value.splice(index + 1, 0, column);
   return [...columns.value];
}

/** 
 * @description: 删除列
 * @param { Ref<TableColumns> }columns 表格列配置
 * @param { string }key 唯一标识
 * @return columns 新的列配置
  */
 export const deleteColumn = (columns: Ref<ColumnType[]>, key: string) => {
   const index = columns.value.findIndex((item) => item.key === key);
   if (index === -1) {
     return columns;
   }
   columns.value.splice(index, 1);
   return [...columns.value];
 }


export type UseColumns = {
  columns: Ref<ColumnType[]>
  allColumns: ColumnType[]
  editColumn: (columns: Ref<ColumnType[]>,key: string, newColumn: ColumnType) => ColumnType[]
  hideColumn: (columns: Ref<ColumnType[]>,key: string) => ColumnType[]
  toggleColumn: (columns: Ref<ColumnType[]>,key: string) => ColumnType[]
  freezeColumn: (columns: Ref<ColumnType[]>,key: string) => ColumnType[]
  freezeFirstColumn: (columns: Ref<ColumnType[]>,key: string) => ColumnType[]
  freezeLastColumn: (columns: Ref<ColumnType[]>,key: string, ) => ColumnType[]
  insertLeftColumn: (columns: Ref<ColumnType[]>,key: string, column: ColumnType) => ColumnType[]
  insertRightColumn: (columns: Ref<ColumnType[]>,key: string, column: ColumnType) => ColumnType[]
  deleteColumn: (columns: Ref<ColumnType[]>,key: string) => ColumnType[]
  updateColumns: (columns: ColumnType[]) => void
}