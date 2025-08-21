<!-- 
  @Author: Wnnk
  @description: 表单锚点组件,可分级,可校验后提示错误项

-->

<template>
  <div class="anchor">
    <div class="anchor-list">
      <AnthorItem 
        v-for="item in params" 
        :key="item.href" 
        :params="item"
        @click="toggleActive(item.href)" 
        :active="activeHref"
        :errors="errors"
      />
    </div>
    
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import AnthorItem from './AnchorItem.vue'
import { ParamsType } from './type'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeHref = ref(route.hash || '')

const toggleActive = (href: string) => {
  activeHref.value = href
}

const props = defineProps({
  params: {
    type: Array as () => Array<ParamsType>,
    default: () => [],
    required: true
  },
  errors: {
    type: Array as () => Array<string>,
    default: () => [],
    required: false
  }
})

const params = computed(() => {
  return initParamsLevel(props.params, 1)
})




const initParamsLevel = (params: Array<ParamsType>, level: number = 1): Array<ParamsType> => {
  return params.map(item => {
    // 创建当前项的副本并添加层级信息
    const newItem = { ...item, level }
    
    // 递归处理子项，层级+1
    if (item.children && item.children.length > 0) {
      newItem.children = initParamsLevel(item.children, level + 1)
    }
    
    return newItem
  })
}



</script>

<style lang='scss' scoped>
.anchor {
  background-color: #fff;
  line-height: 22px;
  font-size: 16px;
  color: #909399;
  position: relative;
  &::before {
    position: absolute;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: #0505050f;
    content: "";
  }
}
.active {
  color: #409eff;
}

</style>