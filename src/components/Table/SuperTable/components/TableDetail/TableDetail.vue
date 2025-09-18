<template>
  <el-drawer v-model="visible">
    <div class="table-detail">
      <div class="table-detail-header">数据详情</div>
      <div class="table-detail-body">
        <div class="rows">
          <div class="row-properties">{{ }}</div>
          <div class="row-data"></div>
        </div>

      </div>
    </div>
  </el-drawer>

</template>

<script setup lang='ts'>
import { computed, inject } from 'vue';
import { UseActiveCell, UseData } from '@/components/Table/SuperTable/type';
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:visible'])
const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const useActiveCell = inject('useActiveCell') as UseActiveCell
const useData = inject('useData') as UseData
const currentRow = computed(() => {
  const activeCell = useActiveCell.activeCell.value
  if (!activeCell) return null
 
})
</script>

<style lang='scss' scoped>
.table-detail {
 
}
.table-detail-header {

}
.table-detail-body {

}
.rows{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>