<template>
  <el-popover v-model:visible="visible" width="600" placement="bottom" trigger="click">
    <div class="fill-color-popover">
      <div class="fill-color-title">设置填色条件</div>
      <div class="fill-color-content">
        <div class="fill-color-item" v-for="store in colorStore">
          <el-color-picker v-model="store.color" :teleported="false" />
          <el-select v-model="store.fillType" placeholder="请选择" :teleported="false">
            <el-option label="单元格" value="cell"></el-option>
            <el-option label="整行" value="row"></el-option>
            <el-option label="整列" value="col"></el-option>
          </el-select>
          <el-select :teleported="false">
            <el-option v-for="col in renderColumns" :label="col.label" :value="col.key"></el-option>
          </el-select>
          <el-select v-model="store.fillcondition" placeholder="请选择" :teleported="false">
            <el-option
              v-for="condition in conditions"
              :label="condition.label"
              :value="condition.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入"></el-input>
          <div class="delete-condition" @click="deleteCondition(store.id)">×</div>
        </div>
        <div class="add-condition" @click="addCondition"><span>+ </span><span>添加条件</span></div>
      </div>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { UseColumns } from '@/components/Table/SuperTable/type'
import { v4 as uuidv4 } from 'uuid'
const visible = ref(false)

const useColumns = inject('useColumns') as UseColumns
const renderColumns = computed(() => {
  return useColumns.renderColumns.value.filter((col) => col.label)
})
const colorStore = ref([
  {
    id: uuidv4(),
    color: '#409EFF',
    fillType: 'cell',
    fillcondition: 'eq',
    fillValue: '',
  },
])

const conditions = [
  {
    label: '等于',
    value: 'eq',
  },
  {
    label: '不等于',
    value: 'neq',
  },
  {
    label: '包含',
    value: 'contain',
  },
  {
    label: '不包含',
    value: 'notcontain',
  },
  {
    label: '为空',
    value: 'null',
  },
  {
    label: '不为空',
    value: 'notnull',
  },
]

const addCondition = () => {
  colorStore.value.push({
    id: uuidv4(),
    color: '#409EFF',
    fillType: 'cell',
    fillcondition: 'eq',
    fillValue: '',
  })
}

const deleteCondition = (id) => {
  const index = colorStore.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    colorStore.value.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.fill-color-title {
  margin-bottom: 10px;
}
.fill-color-item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  place-items: center;
}

.delete-condition {
  font-size: 24px;
}
.add-condition {
  color: #909399;
}
</style>
