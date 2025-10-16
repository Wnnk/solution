<template>
  <el-select v-model="value" v-bind="$attrs">

    <template #header>
      <div class="select-header" v-if="status === 2">
        <LocalSearch />
      </div>
    </template>

    <el-option
      v-if="status === 2 && lazy === false"
      v-for="item in renderOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      
    </el-option>

    <template #footer>
      <el-pagination
        v-if="status === 2"
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page="filterStore.page"
        :page-size="filterStore.pageSize"
        :total="total"
        @current-change="changeCurrentPage"
      >
      </el-pagination>
    </template>

    <!-- 处理空值 -->
     <template #empty>
      <div class="loading" v-if="status === 1">加载中...</div>
      <div class="error" v-else-if="status === 3">
        
      </div>
      <div class="empty" v-else>暂无数据</div>
     </template>
  </el-select>

</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import LocalSearch from './components/LocalSearch.vue'


const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: () => [],
    required: true
  },
  lazy: {
    type: Boolean,
    default: false,
    required: false
  },
  status: {
    type: Number,
    default: 0,
    required: true
  } 
})

const emits = defineEmits(['update:modelValue','update:status','reTry'])





const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const status = computed({
  get() {
    return props.status
  },
  set(val) {
    emits('update:status', val)
  }
})

const total = computed(() => {
  return props.options.length
})

const options = computed(() => {
  return props.options as any[]
})

const filterStore = ref({
  sreachKey: '',
  pageSize: 10,
  page: 1,

})

const renderOptions = ref([])

const processData = (data: any[], filterStore: any): any => {
  const { sreachKey, pageSize, page } = filterStore
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  let result = []
  if (sreachKey) {
    data.forEach((item) => {
      if (item.label.includes(sreachKey)) {
        result.push(item)
      }
    })
  }else {
    result = JSON.parse(JSON.stringify(data))
  }
  return result.slice(startIndex, endIndex)
  
}
watch(
  [filterStore, options],
  () => {
    renderOptions.value = processData(options.value, filterStore.value)
  },
  {
    deep: true,
  }
)

const lazy = ref(props.lazy);


const changeCurrentPage = (page: number) => {
  filterStore.value.page = page
}

</script>

<style lang='scss' scoped>
</style>