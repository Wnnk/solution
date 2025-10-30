<template>
  <div>
    <el-form v-model="form">
      <el-form-item label="活动名称">
        <el-input v-model="form.activityName"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.activityArea">
          <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="即时配送" > 
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="特殊资源" >
        <el-radio-group v-model="form.specialResource" v-loading="formStatus.resourceStatus === 1">
          <el-radio v-for="item in resources" :label="item.label" :value="item.value"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import http from '@/http/http'
const form = ref({
  activityName: '',
  activityArea: '',
  delivery: false,
  specialResource: ''
})

const formStatus = ref({
  areaStatus: 0,
  resourceStatus: 0
})

const options = ref([])

const loadArea = async () => {
  try {
    formStatus.value.areaStatus = 1
    const response = await http.get('/api/areas') as any
    if(response.code === 200) {
      options.value = response.data
    }
    formStatus.value.areaStatus = 2
  } catch (error) {
    formStatus.value.areaStatus = 3
  }
}

const resources = ref([])
const loadResource = async () => {
  try {
    formStatus.value.resourceStatus = 1
    const response = await http.get('/api/resources') as any
    if(response.code === 200) {
      resources.value = response.data
    }
    formStatus.value.resourceStatus = 2
  } catch (error) {
    formStatus.value.resourceStatus = 3
  }
}

onMounted(() => {
  loadArea()
  loadResource()
}) 
</script>

<style lang='scss' scoped>

</style>