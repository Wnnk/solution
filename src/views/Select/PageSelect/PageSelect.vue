<template>
  <div>
    <PageSelect
      v-model:currentPage="currentPage"
      v-model:selectValue="selectValue"
      :status="status"
      :options="options"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>

<script setup lang="ts">
import PageSelect from '@/components/Select/PageSelect/PageSelect.vue'
import { ref, onMounted, watch } from 'vue'
import http from '@/http/http'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const options = ref([])
const selectValue = ref(null)
const status = ref(0)
const loadOptions = async (url: string, params?: any) => {
  try {
    status.value = 1
    const res = (await http.get(url, { params })).data as any

    options.value = res.data
    total.value = res.total
    currentPage.value = res.page
    pageSize.value = res.pageSize
    status.value = 2
  } catch (error) {
    status.value = 3
    console.log(error)
  }
}
onMounted(() => {
  loadOptions('/getOptions', { page: currentPage.value, pageSize: pageSize.value })
})
watch(
  () => currentPage.value,
  (newPage) => {
    loadOptions('/getOptions', { page: newPage, pageSize: pageSize.value })
  },
)
</script>

<style lang="scss" scoped></style>
