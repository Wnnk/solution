<template>
  <div>
    {{ form }} -- {{ user}}
    <el-select v-model="user" value-key="id">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'

const options = ref([])
let status = ref(0)

function api() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = Array(10).fill(0).map((_,index) => ({
        id: index,
        name: `name${Math.random()}`,
        age: `age${Math.random()}`
      }))
      resolve(data)
    },3000)
  })
}

async function loadHandler() {
  try {
    status.value = 1
    const data = await api()
    options.value = data as any[]
    status.value = 2
  } catch (error) {
    status.value = 3
  }
}
onMounted(() => {
  loadHandler()
})

// const form = reactive({
//   id: 1,
//   name: '张三',
//   age: 18
// })

const form = reactive({
  user: {
    id: 1,
    name: '张三',
    age: 18
  }
})

const user = computed({
  get() {
    return {
      id: form.user.id,
      label: form.user.name,
    }
  },
  set(item:any) {
    form.user.id = item.id
    form.user.name = item.name
    form.user.age = item.age
  }
})

</script>

<style lang='scss' scoped>
</style>
