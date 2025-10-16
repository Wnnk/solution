<template>
  <div>
    <el-button @click="padding++">强制重排++</el-button>
    <el-form ref="form" label-width="80px">
      <template v-for="item in data">
        <el-tooltip placement="top" trigger="click">
          <template #content> 
          <div >
            {{editData}}
            <div>name: <el-input v-model="editData.name"></el-input></div>
            <div>age: <el-input v-model="editData.age"></el-input></div>
            <div>value: <el-input v-model="editData.value"></el-input></div>
          </div>
        </template>
          <el-button @click="edit(item)">{{item.name}}</el-button>
        </el-tooltip>
      </template>
    </el-form>
  </div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'

const padding = ref(0)
const data = new Array(1000).fill(0).map((_, index) => ({
  name: `name${index}`,
  age: `age${index}`,
  value: `value${index}`
}))
let editData = ref({
  name: '',
  age: '',
  value: ''
})
const edit = (item:any) => {
  editData.value = JSON.parse(JSON.stringify(item))

}
</script>

<style lang='scss' scoped>
</style>