<!-- 
  @Author: Wnnk
  @description: 
    问题1: 表单过长,导致卡顿，影响用户体验。
      解决方案：表单分页，step，减少DOM
-->

<template>
<div>
  <el-steps :active="active" finish-status="success">
    <el-step title="基本信息"></el-step>
    <el-step title="设备状态"></el-step>
    <el-step title="设备信息"></el-step>
  </el-steps>
  <el-form :model="form.form1" v-if="active === 0">
      <el-form-item label="设备ID" prop="id">
        <el-input v-model="form.form1.id"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="form.form1.name"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="model">
        <el-select v-model="form.form1.model">
          <el-option label="设备型号1" value="model1"></el-option>
          <el-option label="设备型号2" value="model2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序列号" prop="serialNumber">
        <el-input v-model="form.form1.serialNumber"></el-input>
      </el-form-item>
      <el-form-item label="制造商" prop="manufacturer">
        <el-select v-model="form.form1.manufacturer">
          <el-option label="制造商1" value="manufacturer1"></el-option>
          <el-option label="制造商2" value="manufacturer2"></el-option>
        </el-select>
      </el-form-item>
  </el-form>
  <el-form :model="form.form2" v-else-if="active === 1">
    <el-form-item label="设备类别" prop="category">
        <el-select v-model="form.form2.category">
          <el-option label="设备类别1" value="category1"></el-option>
          <el-option label="设备类别2" value="category2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态(在用/闲置/维修/报废)" prop="status">
        <el-radio-group v-model="form.form2.status">
          <el-radio label="在用" value="inUse">在用</el-radio>
          <el-radio label="闲置" value="idle">闲置</el-radio>
          <el-radio label="维修" value="repair">维修</el-radio>
          <el-radio label="报废" value="scrap">报废</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="购买日期" prop="purchaseDate">
        <el-date-picker v-model="form.form2.purchaseDate" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="保修到期日" prop="warrantyExpiry">
        <el-date-picker v-model="form.form2.warrantyExpiry" type="date"></el-date-picker>
      </el-form-item>
  </el-form>
  <el-form :model="form.form3" v-else>
     <el-form-item label="购买价格" prop="price">
        <el-input v-model="form.form3.price"></el-input>
      </el-form-item>
      <el-form-item label="所在建筑" prop="location.building">
        <el-input v-model="form.form3.location.building"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="location.room">
        <el-input v-model="form.form3.location.room"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="location.department">
        <el-checkbox-group v-model="form.form3.location.department">
          <el-checkbox label="部门1" value="department1"></el-checkbox>
          <el-checkbox label="部门2" value="department2"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="设备技术规格详情" prop="specifications"></el-form-item>
      <el-form-item label="维护记录" prop="maintenanceRecords">
        <el-button>维护记录</el-button>
      </el-form-item>
      <el-form-item label="使用历史记录" prop="usageHistory"></el-form-item>
  </el-form>
  <el-button @click="prevPage">上一页</el-button>
  <el-button @click="nextPage">下一页</el-button>
</div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
const form = ref({
  form1: {
    id: 'unique_device_id',
    name: '设备名称',
    model: '设备型号',
    serialNumber: '序列号',
    manufacturer: '制造商',
  },
  form2: {
    category: '设备类别',
    status: '状态(在用/闲置/维修/报废)',
    purchaseDate: '购买日期',
    warrantyExpiry: '保修到期日',
  },
  form3: {
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
  }
})

const active = ref(0)
const nextPage = () => {
  if(active.value >= 3) return;
  active.value += 1;
}
const prevPage = () => {
  if(active.value <= 0) return;
  active.value -= 1;
}
</script>

<style lang='scss' scoped>
</style>