<template>
  <el-drawer v-model="visible" closed="handleClose">
    <div class="table-detail">
      <div class="table-detail-header">数据详情</div>
      <div class="table-detail-body">
        <div class="rows" v-for="(value, key) in currentRow">
          <div class="row-properties">{{ key }}</div>
          <div class="row-data">
            <el-input v-model="updateRow[key]"></el-input>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { UseActiveCell, UseData } from '@/components/Table/SuperTable/type'
import _ from 'lodash'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:visible'])
const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

const useActiveCell = inject('useActiveCell') as UseActiveCell
const useData = inject('useData') as UseData
const currentRow = computed(() => {
  const activeCell = useActiveCell.activeCell.value
  if (!activeCell) return null
  const renderData = useData.renderData.value
  const row = renderData.find((item) => item.id === activeCell.row.id)
  const _row = _.cloneDeep(row)
  updateRow.value = _row
  return _row
})
/* 回写row数据 */
const updateRow = ref(null)
</script>

<style lang="scss" scoped>
.table-detail {
}
.table-detail-header {
}
.table-detail-body {
}
.rows {
  display: grid;
  /* 左侧固定比例，右侧自适应剩余空间 */
  grid-template-columns: minmax(120px, 30%) 1fr;
  gap: 20px;
  padding: 8px 0;
  border-bottom: 1px solid #eee; /* 增加分隔线增强可读性 */
}
.row-properties {
  /* 允许长文本换行 */
  word-wrap: break-word;
  white-space: normal;
  /* 增加内边距提升美观度 */
  padding-right: 10px;
  color: #666; /* 区分属性名和值的颜色 */
}

.row-data {
  word-wrap: break-word;
  padding-left: 10px;
  border-left: 1px solid #eee; /* 增加左侧分隔线 */
}
</style>
