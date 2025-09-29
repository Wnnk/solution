<template>
  <div class="table-header">
    <FilterPopover>
      <div :class="['header-btn', filter.columnKey  ? 'filter-active' : '']">筛选</div>
    </FilterPopover>
    <SortPopover>
      <div :class="['header-btn', sort.columnKey ? 'sort-active' : ''] ">排序</div>
    </SortPopover>
    <GroupPopover>
      <div :class="['header-btn', group.columnKey ? 'group-active' : '']">分组</div>
    </GroupPopover>
    <CellHeight>
      <div class="header-btn">行高</div>
    </CellHeight>
    <FieldSettings>
      <div class="header-btn">字段配置</div>
    </FieldSettings>
    <FillColor>
      <div class="header-btn">填色</div>
    </FillColor>
    <div v-if="!useDraggable.isDraggable.value" @click="toggleDraggable(true)" class="header-btn">启动列拖拽</div>
    <div v-else @click="toggleDraggable(false)" class="header-btn">禁用列拖拽</div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import FieldSettings from './FieldSettings.vue'
import CellHeight from './CellHeight.vue'
import FilterPopover from './FilterPopover.vue'
import SortPopover from './SortPopover.vue'
import GroupPopover from './GroupPopover.vue'
import FillColor from './FillColor.vue'
import { UseDraggable, UseFilterStore } from '@/components/Table/SuperTable/type'






const useDraggable = inject('useDraggable') as UseDraggable
const useFilterStore = inject('useFilterStore') as UseFilterStore
const filter = computed(() => useFilterStore.filterStore.value.filter)
const sort = computed(() => useFilterStore.filterStore.value.sort)
const group = computed(() => useFilterStore.filterStore.value.group)


const toggleDraggable = (value: boolean) => {
  useDraggable.updateDraggable(value)
}
</script>

<style lang="scss" scoped>
.table-header{
  display: grid;
  grid-template-columns: repeat(6, 100px);
}
.header-btn {
  
  margin-left: 10px;
  text-align: center;
  border-radius: 8px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
}
.filter-active {
  background-color: rgba(202,133,55,0.8);
}
.sort-active {
  background-color: #3153b9;
}
.group-active{
  background-color: #9ab0f1;
}
</style>
