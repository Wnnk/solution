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
  id: number
  cusName: string
  proName: string
  status: string
  proLeader: string
  projectTotalAmount: number
  projectReceivedAmount: number
  projectRemainingReceivable: number
  projectEstimatedCost: number
  projectPaidCost: number
  createTime: string
}

export type UseRowHeight  = {
  rowHeight: Ref<number>
  updateRowHeight: (rowHeight: number) => void
}