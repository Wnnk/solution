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
          <el-button @click="loadData('/getTable', { page: currentPage, pageSize: pageSize })"
            >重新加载</el-button
          >
        </div>
      </template>
    </SuperTable>
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
    tableData.value = data
    total.value = res.data.total
    currentPage.value = res.data.page
    pageSize.value = res.data.pageSize
    console.log(total.value, currentPage.value, pageSize.value)
    status.value = 2
  } catch (error) {
    status.value = 3
  }
}
loadData('/getTable', { page: currentPage.value, pageSize: pageSize.value })
</script>

<style lang="scss" scoped></style>
