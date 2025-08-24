<!-- 
  @Author: Wnnk
  @description: 下拉框懒加载，且只加载一次数据
-->

<template>
  <el-select v-model="value" v-bind="$attrs" :loading="status === 1" @visible-change="dropDown">
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></el-option>
    <template #empty>
      <el-button v-if="status === 3">重试</el-button>
      <div v-else>空数据</div>
    </template>
    <template #loading>
      <span>Loading...</span>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDictStore } from '@/hooks/Select/useDictStore'
import http from '@/http/http'

const { getDict, updateDict } = useDictStore()
const status = ref(3)
const options = ref([])
const value = ref('')
const props = defineProps({
  url: {
    type: String,
    required: false,
  },
})

const dropDown = async (drop: boolean) => {
  if (!drop) return
  const data = getDict(props.url) as any[]
  if (data.length === 0) {
    try {
      status.value = 1
      const res = await http.get(props.url)
      options.value = res.data
      status.value = 2
      updateDict(props.url, options.value)
    } catch (error) {
      status.value = 3
    }
  }
}
</script>

<style lang="scss" scoped></style>
