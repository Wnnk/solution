<template>
  <div class="super-table">
    <el-container>
      <el-header>
        <TableHeader />
      </el-header>
      <el-main>
        <el-table :data="data" border v-bind="$attrs">
          <el-table-column
            v-for="column in columns"
            :key="column.prop"
            :prop="column.prop"
            :width="column.width"
            :type="column.type"
          >
            <template #header>
              <!-- 组件默认表头布局 -->
              <div class="header-wrapper">
                <div>{{ column.label }}</div>
                <div @click="openPopover">
                  <TablePopover :column="column">
                    <i class="iconfont icon-header-detail"></i>
                  </TablePopover>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          v-if="total && pageSize && currentPage"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TableHeader from './TableHeader.vue'
import { ColumnType, TableData } from './type'
import TablePopover from './TablePopover.vue'

const props = defineProps({
  data: {
    type: Array as () => TableData[],
    required: true,
  },
  columns: {
    type: Array as () => ColumnType[],
    required: true,
  },
  pageSize: {
    type: Number,
  },
  currentPage: {
    type: Number,
  },
  total: {
    type: Number,
  },
})

/* popover相关 */
const handerPopoverVisible = ref(false)
const openPopover = () => {
  handerPopoverVisible.value = true
}
</script>

<style lang="scss" scoped>
@import './SuperTable.scss';
</style>
