<template>
  <el-select v-model="value" v-bind="$attrs">

    <template #header>
      <div class="select-header" v-if="status === 2">
        <LocalSearch @changeFilterStore="changeFilterStore" :filterStore="filterStore"/>
      </div>
    </template>

    <el-option
      v-if="status === 2"
      v-for="item in renderOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      
    </el-option>

    <template #footer >
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
      <div class="empty" v-else>
        暂无数据
        <el-button   @click="retry">重试</el-button>
      </div>
     </template>
  </el-select>

</template>

<script setup lang='ts'>
import { ref, computed, watch  } from 'vue'
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
  status: {
    type: Number,
    default: 0,
    required: true
  },
  retry: {
    type: Function,
  }
})

const emits = defineEmits(['update:modelValue','update:status'])





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
  if(filterStore.value.sreachKey){
    return sreachResult.length
  } else {
    return props.options.length
  }
  
})

const options = computed(() => {
  return props.options as any[]
})
/* 过滤状态 */
const filterStore = ref({
  sreachKey: '',
  pageSize: 10,
  page: 1,
})
/* 渲染options */
const renderOptions = ref([])
/* 搜索结果 */
let sreachResult = []

const processData = (data: any[]): any => {
  const sreachKey = filterStore.value.sreachKey
  let result = []
  if (sreachKey) {
    data.forEach((item) => {
      if (item.label.includes(sreachKey)) {
        result.push(item)
      }
    })
    sreachResult = result
  }else {
    result = JSON.parse(JSON.stringify(data))
  }
  const startIndex = (filterStore.value.page - 1) * filterStore.value.pageSize
  const endIndex = startIndex + filterStore.value.pageSize
  if(startIndex >= result.length) {
    filterStore.value.page = 1
  }
  return result.slice(startIndex, endIndex)
  
}
watch(
  [filterStore, options],
  () => {
    renderOptions.value = processData(options.value)
  },
  {
    deep: true,
  }
)




const changeCurrentPage = (page: number) => {
  filterStore.value.page = page
}


const changeFilterStore = (newStore:any) => {
  filterStore.value = newStore
}

</script>

<style lang='scss' scoped>
</style>