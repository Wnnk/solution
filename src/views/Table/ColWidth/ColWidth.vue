<!-- 
  @Author:Wnnk
  @descrition: 
    问题1： el-table 辅助线不明显
    解决方案：添加自定义辅助线，移动时全局辅助线
-->

<template>
<div class="col-width" >
  <el-table :data="tableData" border @header-dragend="resizeEnd">
    <el-table-column v-for="column in columns" :key="column.prop" :width="column.width" :prop="column.prop">
      <template #header>
        <div class="header-box">
          <div>{{ column.label }}</div>
          <div class="drag" @mousedown="resizeStart($event,column)" :ref="(el) => resizeHandleRefs[column.prop] = el "></div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="resize-line" v-show="isResizing" :style="{ left: resizeLineLeft + 'px' }"></div>
</div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'

const columns = ref([
  {
    label: 'Date',
    prop: 'date',
    width: '180',
  },
  {
    label: 'Name',
    prop: 'name',
    width: '180',
  },
  {
    label: 'Address',
    prop: 'address',
    width: '300',
  },
])
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const isResizing = ref(false);
const startX = ref(0);
const colWidth = ref(0);
const currentColumn = ref(null);
const resizeHandleRefs = ref({});
const resizeLineLeft = ref(0);
const MIN_WIDTH = 80;

const resizeStart = (e,column) => {
  e.preventDefault();
  isResizing.value = true;
  currentColumn.value = column;
  /* 获取手柄位置 */
  const handleRect = resizeHandleRefs.value[column.prop].getBoundingClientRect();
  const columnRect = resizeHandleRefs.value[column.prop].parentElement.getBoundingClientRect();

  /* 记录初始值 */
  startX.value = columnRect.left
  colWidth.value = column.width || (columnRect.right - handleRect.left)
  /* 计算辅助线初始位置 */
  resizeLineLeft.value = handleRect.right;

  

  document.addEventListener('mousemove', resizeMove)
  document.addEventListener('mouseup', resizeEnd)
}

const resizeMove = (e) => {
  if(!isResizing.value || !currentColumn.value) return;

  const handleRect = resizeHandleRefs.value[currentColumn.value.prop].getBoundingClientRect();
  const columnRect = resizeHandleRefs.value[currentColumn.value.prop].parentElement.getBoundingClientRect();

  const currentResizeWidth = e.clientX - columnRect.left;

  if(currentResizeWidth >= MIN_WIDTH) {
    /* 计算辅助线位置 */
    resizeLineLeft.value = e.clientX;
  } else {
    resizeLineLeft.value = columnRect.left + MIN_WIDTH;
  }




}


const resizeEnd = (e) => {
  if(!isResizing.value || !currentColumn.value) return;
  const newWidth = e.clientX - startX.value;
  currentColumn.value.width = Math.max(MIN_WIDTH, newWidth)
  console.log(columns.value)

  /* 重置状态 */
  isResizing.value = false;
  currentColumn.value = null;
  startX.value = 0;
  document.removeEventListener('mousemove', resizeMove)
  document.removeEventListener('mouseup', resizeEnd)
}



</script>

<style lang='scss' scoped>
.header-box {
  display: flex;
  position: relative;
  height: 100%;
}
.header-box:hover .drag {
  opacity: 0.8;
  transition: opacity 0.2s ease; /* 可选：添加过渡动画使效果更平滑 */
}
.drag {
  position: absolute;
  right: -12px; /* cell的样式padding 0 12px */
  width: 3px;
  height: 100%;
  background-color: #409EFF;
  cursor: col-resize;
  opacity: 0;
}
.resize-line {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #409EFF;
  width: 3px;
  z-index: 9999;
}
</style>