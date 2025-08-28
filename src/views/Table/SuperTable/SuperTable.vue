<!--  -->

<template>
<div class="super-table">
  <el-container>
    <el-header>
      <TableHeader />
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          :width="column.width"
          :type = "column.type"
          :sortable="column.sortable"
        />
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :page-size="pageSize"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-footer>
  </el-container>


</div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import TableHeader from './TableHeader.vue'



const status = ref('')
const columns = ref([])
const tableData = ref([])
const pageSize = ref(0)
const currentPage = ref(1)
const total = ref(0)

const loadColumns = () => {

}



</script>

<style lang='scss' scoped>
</style>