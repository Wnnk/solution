export type ColumnType = {
  label?: string
  width?: number
  prop?: string
  type?: string
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
