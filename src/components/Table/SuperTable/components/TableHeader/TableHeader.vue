<template>
  <div class="table-header">
    <FilterPopover>
      <el-button>筛选</el-button>
    </FilterPopover>
    <SortPopover>
      <el-button>排序</el-button>
    </SortPopover>
    <el-button>分组</el-button>
    <CellHeight>
      <el-button>行高</el-button>
    </CellHeight>
    <FieldSettings>
      <el-button>字段配置</el-button>
    </FieldSettings>
    <el-button v-if="!isDraggable" @click="toggleDraggable">启动列拖拽</el-button>
    <el-button v-else @click="toggleDraggable">禁用列拖拽</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import FieldSettings from './FieldSettings.vue'
import CellHeight from './CellHeight.vue'
import FilterPopover from './FilterPopover.vue'
import SortPopover from './SortPopover.vue'

const isDraggable = ref(false)
const toggleDraggable = () => {
  isDraggable.value = !isDraggable.value
}
</script>

<style lang="scss" scoped></style>
