<!-- 
  @Author: WWnk
  @description: 表单页锚点Dome，
-->

<template>

<div class="form-anchor">
   <el-form :model="form" ref="formRef" :rules="rules" scroll-to-error >
      <el-form-item label="设备ID" prop="id" id="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name" id="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="model" id="model">
        <el-select v-model="form.model">
          <el-option label="设备型号1" value="model1"></el-option>
          <el-option label="设备型号2" value="model2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序列号" prop="serialNumber" id="serialNumber">
        <el-input v-model="form.serialNumber"></el-input>
      </el-form-item>
      <el-form-item label="制造商" prop="manufacturer" id="manufacturer">
        <el-select v-model="form.manufacturer">
          <el-option label="制造商1" value="manufacturer1"></el-option>
          <el-option label="制造商2" value="manufacturer2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类别" prop="category" id="category">
        <el-select v-model="form.category">
          <el-option label="设备类别1" value="category1"></el-option>
          <el-option label="设备类别2" value="category2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态(在用/闲置/维修/报废)" prop="status" id="status">
        <el-radio-group v-model="form.status">
          <el-radio label="在用" value="inUse">在用</el-radio>
          <el-radio label="闲置" value="idle">闲置</el-radio>
          <el-radio label="维修" value="repair">维修</el-radio>
          <el-radio label="报废" value="scrap">报废</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="购买日期" prop="purchaseDate" id="purchaseDate">
        <el-date-picker v-model="form.purchaseDate" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="保修到期日" prop="warrantyExpiry" id="warrantyExpiry">
        <el-date-picker v-model="form.warrantyExpiry" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="购买价格" prop="price" id="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="所在地" prop="location" id="location" label-position="top">
        <el-form-item label="所在建筑" prop="location.building" id="building">
          <el-input v-model="form.location.building"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="location.room" id="room">
          <el-input v-model="form.location.room"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="location.department" id="department">
          <el-checkbox-group v-model="form.location.department">
            <el-checkbox label="部门1" value="department1"></el-checkbox>
            <el-checkbox label="部门2" value="department2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>
      
      <el-form-item label="设备技术规格详情" prop="specifications" id="specifications"></el-form-item>
      <el-form-item label="维护记录" prop="maintenanceRecords" id="maintenanceRecords">
        <el-button>维护记录</el-button>
      </el-form-item>
      <el-form-item label="使用历史记录" prop="usageHistory" id="usageHistory"></el-form-item>
      <el-form-item label="相关附件(图片、文档等)" prop="attachments" id="attachments">
        <el-button>相关附件(图片、文档等)</el-button>
      </el-form-item>
      <el-form-item label="备注信息" prop="notes" id="notes">
        <template> </template>
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt" id="createdAt">
        <el-date-picker v-model="form.createdAt" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="最后更新时间" prop="updatedAt" id="updatedAt">
        <el-date-picker v-model="form.updatedAt" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建人" prop="createdBy" id="createdBy">
        <el-input v-model="form.createdBy"></el-input>
      </el-form-item>
      <el-form-item label="最后更新人" prop="lastUpdatedBy" id="lastUpdatedBy">
        <el-input v-model="form.lastUpdatedBy"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-form-item>
  </el-form>

  <Anchor :params="params" :errors="errors"/>
 
</div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Anchor from '@/components/Anchor/Anchor.vue'
import { ParamsType } from '@/components/Anchor/type'
import { computed } from 'vue'
import { reactive } from 'vue'



const form = ref({
  id: '',
  name: '设备名称',
  model: '设备型号',
  serialNumber: '序列号',
  manufacturer: '制造商',
  category: '设备类别',
  status: '',
  purchaseDate: '购买日期',
  warrantyExpiry: '保修到期日',
  price: '购买价格',
  location: {
    building: '所在建筑',
    room: '房间号',
    department: [],
  },
  specifications: {
    // 设备技术规格详情
  },
  maintenanceRecords: [
    // 维护记录数组
  ],
  usageHistory: [
    // 使用历史记录
  ],
  attachments: [
    // 相关附件(图片、文档等)
  ],
  notes: '备注信息',
  createdAt: '',
  updatedAt: '最后更新时间',
  createdBy: '创建人',
  lastUpdatedBy: '最后更新人',
})
const formRef = ref(null)




const params = computed (() => {
  return getParams(form.value)
})

const getParams = (form: any, params: any[] = []) => {
  Object.entries(form).forEach(([key, value]) => {
    const newItem: ParamsType = {
      label: key,
      href: '#' + key,
    }
    if(typeof value === 'object' && value !== null && !Array.isArray(value)){
      newItem.children = getParams(value)
      params.push(newItem)
    } else {
      params.push(newItem)
    }
  })
  return params
}

const rules = reactive({
  id: [{ required: true, message: '请输入设备ID', trigger: 'blur' }],
  status: [{ required: true, message: '请选择设备状态', trigger: 'blur' }],
  createdAt: [{ required: true, message: '请输入创建时间', trigger: 'blur' }],
})

const errors = ref([])

const handleSubmit = () => {
  formRef.value.validate((valid: boolean, fields: any) => {
    errors.value = []
    if (valid) {
    } else {

      for (const key in fields) {
        errors.value.push(fields[key][0].field)
      }
    }
  })

}
</script>

<style lang='scss' scoped>
.form-anchor {
  display: flex;
  justify-content: space-between;
  
}
</style>