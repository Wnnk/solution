
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
/** 
 * @description: 指定的行向上插入一行
 * @param {any} data 原本的数据
 * @param {string} id 要插入的行的id
 * @param {any} rowData 要插入的行数据
 * @return {any} 插入后的新数据
**/
export const insertRowAbove = (data: any[], id: number, rowData: any): any[] => {

  let inserted = false
  // 递归查找并插入节点的函数
  const insertInChildren = (children: any[]): any[] => {
    // 遍历当前层级的每个节点
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      
      // 如果找到目标节点，在其上方插入新行
      if (child.id === id) {
        inserted = true
        // 创建新数组，避免直接修改原数组
        const newChildren = _.cloneDeep(children);
        // 在当前位置插入新行
        newChildren.splice(i, 0, rowData);
        return newChildren;
      }
      
      // 如果当前节点有子节点，递归处理子节点
      if (child.children && child.children.length > 0) {
        const updateChildren = insertInChildren(child.children);
        if (inserted) {
          // 如果子节点中已插入，更新当前节点的children并返回
          return [
            ...children.slice(0, i),
            { ...child, children: updateChildren },
            ...children.slice(i + 1)
          ]
        }
      }
    }
    
    // 未找到目标节点，返回原数组
    return _.cloneDeep(children);
  };
  

  return  insertInChildren(data);
};


/** 
 * @description: 指定的行向下插入一行
 * @param {any} data 原本的数据
 * @param {string} id 要插入的行的id
 * @param {any} rowData 要插入的行数据
 * @returns {any} 插入后的新数据
**/
export const insertRowBelow = (data: any, id: string, rowData: any): any => {
    const insertInChildren = (children: any[]): { modified: boolean, result: any[] } => {
      // 遍历当前层级的每个节点
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        
        // 如果找到目标节点，在其下方插入新行
        if (child.id === id) {
          // 创建新数组，避免直接修改原数组
          const newChildren = [...children];
          // 在当前位置插入新行
          newChildren.splice(i + 1, 0, rowData);
          return { modified: true, result: newChildren };
        }
        
        // 如果当前节点有子节点，递归处理子节点
        if (child.children && child.children.length > 0) {
          const { modified, result } = insertInChildren(child.children);
          if (modified) {
            // 如果子节点中已插入，更新当前节点的children并返回
            return {
              modified: true,
              result: [
                ...children.slice(0, i),
                 { ...child, children: result },
                ...children.slice(i + 1)
              ]
            };
          }
        }
      }
      
      // 未找到目标节点，返回原数组
      return { modified: false, result: children };
    };
    
    // 开始处理数据
    const { result } = insertInChildren(data);
    return result;
    
}

/** 
 * @description: 指定的行删除
 * @param {any} data 原本的数据
 * @param {string} id 要删除的行的id
 * @returns {any} 删除后的新数据
**/
export const deleteRow = (data: any, id: string): any => {
  // 递归查找并删除节点的函数
  const deleteInChildren = (children: any[]): { modified: boolean, result: any[] } => {
    // 遍历当前层级的每个节点
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      
      // 如果当前节点有子节点，递归处理子节点
      if (child.children && child.children.length > 0) {
        const { modified, result } = deleteInChildren(child.children);
        if (modified) {
          // 如果子节点中已删除，更新当前节点的children并返回
          return {
            modified: true,
            result: [
              ...children.slice(0, i),
              { ...child, children: result },
              ...children.slice(i + 1)
            ]
          };
        }
      }
    }
    
    // 未找到目标节点，返回原数组
    return { modified: false, result: children };
  };
  
  // 开始处理数据
  const { result } = deleteInChildren(data);
  return result;
}

/**
 * @description：指定行添加子级行
 * @param {any} data 原本的数据
 * @param {string} id 要添加子级行的父级行id
 * @param {any} rowData 要添加的子级行数据
 * @returns {any} 添加子级行后的新数据
**/
export const addSubRow = (data: any, id: string, rowData: any): any => {
    let inserted = false
   
    const addSubRowInChildren = (data: any[]): any[] => {
      // 遍历当前层级的每个节点
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        
        if (item.id === id) {
          // 创建新数组，避免直接修改原数组
          const newItem = _.cloneDeep(item);
          inserted = true
          if(newItem.children){
            newItem.children.push(rowData);
          }else {
            
            newItem.children = [rowData];

          }

          return [...data.slice(0, i), newItem,...data.slice(i + 1)];
        }

        // 如果当前节点有子节点，递归处理子节点
        if (item.children && item.children.length > 0) {
          const updateChildren = addSubRowInChildren(item.children);
          console.log(updateChildren)
          if (inserted) {
            // 如果子节点中已插入，更新当前节点的children并返回
            return [
               ...data.slice(0, i),
                { ...item, children: updateChildren },
                ...data.slice(i + 1)
            ]
        }
      }
    };
  }
  const result =  addSubRowInChildren(data);
   console.log(result)
   return result;
}
    



/** 
 * @description: 创建新行数据（id除外）
 * @param {any[]} rowData 原本的行数据
 * @returns {any} 新行数据
**/
export const createNewRowData = (rowData: any[]): any => {
  if(rowData.length === 0) return {id:uuidv4()};

  const firstItem = rowData[0];
  const properties = Object.keys(firstItem).filter(key => key !== 'id');
  const newRow = {
    id: uuidv4(),
  }
  properties.forEach(key => {
    newRow[key] = getEmptyValueByDataType(firstItem[key]);
  });
  return newRow;
}
const getEmptyValueByDataType = (value:any) => {
  if(value === null) return null;
  if(value === undefined) return undefined;
  if(value instanceof Date) return new Date();
  if(value instanceof RegExp) return new RegExp('');


  switch(typeof value) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'object':
      if(Array.isArray(value)) return [];
      return {};
    default:
      return null;
  }
}