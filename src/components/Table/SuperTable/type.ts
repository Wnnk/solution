import { Ref } from 'vue'

type ColumnFixed = 'left' | 'right'

export type ColumnType = {
  key: string
  label?: string
  width?: number
  prop?: string
  type?: string
  fixed?: ColumnFixed
  visible: boolean
}

export type TableData = {
  id: string
  children?:TableData[]
  // cusName: string
  // proName: string
  // status: string
  // proLeader: string
  // projectTotalAmount: number
  // projectReceivedAmount: number
  // projectRemainingReceivable: number
  // projectEstimatedCost: number
  // projectPaidCost: number
  // createTime: string
  [key: string]: any;
  
}


export type Sort = {
  order: string
  columnKey: string
}
export type Filter = {
  columnKey: string
  parameterKey: string
  value: string
}

export type Group = {
  columnKey: string
}

export type FilterStore = {
  sort: Sort,
  filter: Filter
  group: Group
}

export type UseRowHeight = {
  rowHeight: Ref<number>
  updateRowHeight: (rowHeight: number) => void
}

export type UseColumns = {
  columns: Ref<ColumnType[]>
  allColumns: ColumnType[]
  editColumn: (columns: Ref<ColumnType[]>, key: string, newColumn: ColumnType) => ColumnType[]
  hideColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  toggleColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  freezeColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  freezeFirstColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  freezeLastColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  insertLeftColumn: (columns: Ref<ColumnType[]>, key: string, column: ColumnType) => ColumnType[]
  insertRightColumn: (columns: Ref<ColumnType[]>, key: string, column: ColumnType) => ColumnType[]
  deleteColumn: (columns: Ref<ColumnType[]>, key: string) => ColumnType[]
  updateColumns: (columns: ColumnType[]) => void
}

export type UseSort = {
  sortOrder: Ref<string>
  sortColumnKey: Ref<string>
  updateSortData: (data: TableData[], key: string, order: string) => TableData[]
  updateSortOrder: (sortOrder: Ref<string>, newOrder: string) => Ref<string>
  updateSortColumn: (sortColumn: Ref<string>, newColumn: string) => Ref<string>
}

export type UseData = {
  data: Ref<TableData[]>
  renderData: Ref<TableData[]>
  updateData: (data: TableData[]) => void
}


export type UseFilterStore = {
  filterStore:Ref<FilterStore>
  updateFilterStore: (newFilter: FilterStore) => FilterStore
}

export type UseDraggable = {
  isDraggable: Ref<boolean>
  updateDraggable: (isDraggable: boolean) => void
  dragColumn:(tabeleRef: Ref<HTMLTableElement>) => void
  makeColumnsDraggable:(headerSelector: string, columns: ColumnType[], hander: string, onColumnsSorted: (newColumns: ColumnType[]) => void) => void
}

export type UseActiveCell = {
  activeCell: Ref<{ row: any; column: any, value: any, cellKey: any, color?:string } | null>
  updateActiveCell: (value: { row: any; column: any, value: any, cellKey: any, color?: string } | null) => void
}