<template>
<div>
  <el-table :data="tableData" id="dragTable" border style="width: 800px;">
    <el-table-column v-for="column in columns" 
    :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width"
    ></el-table-column>
  </el-table>
</div>
</template>

<script setup>
import Sortable from 'sortablejs';
import { onMounted } from 'vue';


const columns = [
  {
    prop:'date',
    label: 'Date',
    width: 180
  },
  {
    prop: 'name',
    label: 'Name',
    width: 180
  },
  {
    prop:'address',
    label: 'Address',
    width:200
  }
]

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Cilly',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Linda',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'John',
		address: 'No. 189, Grove St, Los Angeles',
	},
]
const setSort = () => {
  const el  = document.querySelector('#dragTable table tbody')

  new Sortable(el,{
    sort: true,
    ghostClass: 'sortable-ghost',
    onEnd: (e) => {
      const targetRow = tableData.splice(e.oldIndex,1)[0]
      tableData.splice(e.newIndex, 0, targetRow)
      console.log(e)
    }
  })
}


onMounted(() => {
  setSort()
})
</script>
