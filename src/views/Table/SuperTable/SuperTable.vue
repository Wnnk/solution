<template>
  <div class="">
    <SuperTable
      v-model:columns="columns"
      v-model:data="tableData"
      v-model:total="total"
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      v-loading="status === 1"
    >
      <template #empty>
        <div class="empty-wrapper" v-if="status === 2 && tableData.length === 0">暂无数据</div>
        <div v-else-if="status === 3">
          <el-button
            @click="loadData('/getTable', { page: currentPage, pageSize: pageSize })"
            >重新加载</el-button
          >
        </div>
      </template>
    </SuperTable>

    <!-- <el-table style="width: 100%" :span-method="objectSpanMethod" :data="tableData" border>
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="value" label="值" />
    </el-table> -->
  </div>
</template>

<script setup lang="ts">
import SuperTable from '@/components/Table/SuperTable/SuperTable.vue'
import http from '@/http/http'
import { ColumnType, TableData } from '@/components/Table/SuperTable/type'
import { ref } from 'vue'
import { watch } from 'vue'

const status = ref(0) // 0: 初始状态, 1: 加载中, 2: 加载成功, 3: 加载失败

const loadColumns = async (url: string, params?: any) => {
  try {
    status.value = 1
    const res = (await http.get(url, { params })).data as ColumnType[]
    status.value = 2
    columns.value = res
  } catch (error) {
    status.value = 3
    console.log(status.value, error)
  }
}

const columns = ref<ColumnType[]>([])
loadColumns('/getColumns')






const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)
const tableData = ref<TableData[] | []>([])

watch(
  () => currentPage.value,
  () => {
    loadData('/getTable', { page: currentPage.value, pageSize: pageSize.value })
  },
)


const loadData = async (url: string, params?: any) => {
  try {
    status.value = 1
    const res = await http.get(url, { params })
    const data = res.data.list as TableData[]
    tableData.value = data;
    total.value = res.data.total;
    currentPage.value = res.data.page;
    pageSize.value = res.data.pageSize;
    console.log(total.value, currentPage.value, pageSize.value)
    status.value = 2
  } catch (error) {
    status.value = 3
  }
}
loadData('/getTable', { page: currentPage.value, pageSize: pageSize.value })

/* 测试用例 */

const tableData1 = [
  { date: '2024-01-23', name: '数据1', value: '值1' },
  { date: '2024-01-24', name: '数据2', value: '值2' },
  { date: '2024-01-24', name: '数据3', value: '值3' },
  { date: '2024-01-25', name: '数据4', value: '值4' },
]

// 改进的行合并数据计算方法
const getRowSpanData = (data: { date: string }[]) => {
  const rowSpanInfo: { rowSpan: number; isFirst: boolean }[] = []
  let currentDate = ''
  let currentCount = 0

  // 第一次遍历：统计每个日期的连续出现次数
  data.forEach((item, index) => {
    if (item.date === currentDate) {
      currentCount++
    } else {
      currentDate = item.date
      currentCount = 1
    }
    rowSpanInfo.push({ rowSpan: currentCount, isFirst: false })
  })

  // 第二次遍历：标记第一个出现的日期并设置合并行数
  currentDate = ''
  currentCount = 0
  data.forEach((item, index) => {
    if (item.date === currentDate) {
      currentCount++
      rowSpanInfo[index].rowSpan = 0 // 后续行不显示
      rowSpanInfo[index].isFirst = false
    } else {
      currentDate = item.date
      // 计算当前日期总共有多少行
      const total = data.filter((d) => d.date === currentDate).length
      currentCount = 1
      rowSpanInfo[index].rowSpan = total // 第一行设置合并行数
      rowSpanInfo[index].isFirst = true
    }
  })

  return rowSpanInfo
}

// 生成行合并数据
const rowSpanData = getRowSpanData(tableData1)

// 修正后的表格合并方法
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  // 只处理日期列（假设date是第一列，columnIndex为0）
  if (columnIndex === 0) {
    const { rowSpan } = rowSpanData[rowIndex]
    return {
      rowspan: rowSpan, // 合并行数，0表示不显示
      colspan: 1,
    }
  }

  // 其他列不合并
  return {
    rowspan: 1,
    colspan: 1,
  }
}
</script>

<style lang="scss" scoped></style>
