<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-if="status === 2"
        v-for="option in currentOption"
        :label="option.label"
        :value="option.value"
        :key="option.value"
      ></el-option>

      <template #empty>
        <div class="empty">
          <div v-if="status === 1" class="loading">loading...</div>
          <div v-else-if="status === 3" class="error">Error</div>
          <div v-else-if="status === 2 && currentOption.length === 0" class="no-data">Nodata</div>
        </div>
      </template>
      <template #footer>
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="(page) => emits('update:currentPage', page)"
        />
      </template>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const porps = defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
    required: true,
  },
  selectValue: {
    type: [String, Number, null],
    default: null,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
    required: false,
  },
})
const emits = defineEmits(['update:currentPage', 'update:selectValue'])

const currentOption = computed(() => {
  return porps.options
}) as any
const value = computed({
  get() {
    return porps.selectValue
  },
  set(val) {
    emits('update:selectValue', val)
  },
})
watch(
  () => porps.status,
  (status) => {
    console.log(status)
  },
)
</script>

<style lang="scss" scoped></style>
