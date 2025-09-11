import { Ref } from 'vue'
import { ColumnType } from '@/components/Table/SuperTable/type'
import Sortable from'sortablejs'

/** 
 * @description: 拖拽列
 * @param { ColumnType[] } columns - 列配置
 * @returns { ColumnType[] } - 新的列配置
  */
export const dragColumn = ( columns: ColumnType[]): ColumnType[] => {
  const tableHeader = document.querySelector('.el-table__header-wrapper thead tr');
  if(!tableHeader) return;
  new Sortable(tableHeader, {
    animation:150,
    ghostClass: 'sortable-header',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt;
      if(oldIndex === newIndex ) return;
      const newColumns = [...columns]
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);
      return newColumns;
    }
  })
}

/** 
 * @param { String } handerSelector - 表格头部选择器，用于定位可拖拽元素
 * @param { ColumnType[] } columns - 列配置数组
 * @param { ColumnType[] } onCloumnsSorted - 列排序后的回调函数，返回新的列顺序
 * @turens 
  */

export const makeColumnsDraggable = (
  headerSelector: string,
  columns: ColumnType[],
  hander: string,
  onColumnsSorted: (newColumns: ColumnType[]) => void
): (() => void) => {
  const tableHeader = document.querySelector(headerSelector);
  if (!tableHeader) {
    console.warn('未找到表格头部元素，请检查选择器是否正确');
    return () => {};
  }

  // 初始化拖拽排序
  const sortable = new Sortable(tableHeader, {
    animation: 150,
    ghostClass: 'sortable-header',
    handle: hander,
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt;
      if (oldIndex === newIndex || oldIndex === undefined || newIndex === undefined) {
        return;
      }

      // 计算新的列顺序
      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);

      // 通过回调返回新的列顺序
      onColumnsSorted(newColumns);
    }
  });

  // 返回清理函数，用于组件卸载时移除拖拽功能
  return () => {
    sortable.destroy();
  };
};

