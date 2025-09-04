
<template>
 <el-popover placemnet="bottom" trigger="click" width="300px">
  <div class="field-settings">
    <div class="field-settings-title">字段配置</div>
    <el-divider />
    <div class="field-settings-content">
      <div class="field-settings-fixed">
        <div class="field-settings-fixed-item" v-for="column in columns">
          <span>{{ column.label }}</span>
          <i :class="['iconfont',column.visible?'icon-show-column':'icon-hide-column', 'column-icon']" @click="toggleColumnVisible(column.key)"></i>
        </div>
        <div class="field-settings-add-column">
          <div class="field-settings-add-column-item" @click="addColumnToLast">
            <span class="add-column">+</span>
            <span class="add-column">新增字段/列</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template #reference>
    <slot></slot>
  </template>
 </el-popover>

</template>

<script setup lang='ts'>
import { ref,inject, computed } from 'vue'
import { UseColumns,  }  from '@/components/Table/SuperTable/EditColumns'
import { v4 as uuidv4 } from 'uuid'

const useColumns = inject('useColumns') as UseColumns
const columns = computed(() => useColumns.columns.value)

const toggleColumnVisible = (key: string) => {
  const newColumns = useColumns.toggleColumn(columns, key);
  useColumns.updateColumns(newColumns);
}
const addColumnToLast = () => {
  const len = columns.value.length;
  const updateColumns = useColumns.insertRightColumn(columns, columns.value[len-1].key, {
    key: `${uuidv4()}`,
    label: `新增字段${len}`,
    visible: true,
  })
  useColumns.updateColumns(updateColumns);
}

</script>

<style lang='scss' scoped>
.field-settings{
  padding: 10px;
}

.field-settings-content {
  display: flex;
  flex-direction: column;
}
.field-settings-fixed{
  position: relative;
  padding-bottom: 50px;
}

.field-settings-fixed-item {
  border-radius:8px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: $table-popover-hover-bg;
  }
  line-height: 18px;
}
.column-icon {
  font-size: 20px;
  width: 20px;
  height: 20px;
  &:hover {
    background-color: $icon-hover-bg;
  }
}

.field-settings-add-column {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 40px;
  z-index: 10;
  border-top: 1px solid #e4e4e4;
  background-color: #fff;
  display: flex;
  align-items: center;
  
}
.field-settings-add-column-item{
  width: 100%;
  margin-top: 8px;
  height: 30px;
  border-radius: 8px;
  .add-column {
    padding: 0 5px;
  }
  &:hover {
    background-color: $table-popover-hover-bg;
  }
}
</style>