<template>
<div>
  <el-table :data="tableData" id="dragTable" border ">
    <el-table-column v-for="column in columns" 
    :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width"
    ></el-table-column>
  </el-table>
</div>
</template>

<script setup>
import Sortable from 'sortablejs';
import { onMounted, ref } from 'vue';


const columns = ref([
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
])

const tableData = ref([
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
])

const initSortable = () => {
  // 获取表格的表头元素
  const tableHeader = document.querySelector('.el-table__header-wrapper thead tr');
  
  if(!tableHeader) return;
  new Sortable(tableHeader, {
    animation:150,
    ghostClass: 'sortable-header',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt;
      if(oldIndex === newIndex ) return;
      const newColumns = [...columns.value]
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);
      columns.value = newColumns;
  
    }
  })
}

onMounted(() => {
  initSortable();
})

</script>