<template>
  <div class="anchor-items">
    <div class="anchor-marker" v-show="active === params.href"></div>
    <div :class="['anchor-item']" 
    :style="{ 'padding-left': `${14 + params.level * 2}px`,'font-size': `${Math.max(8, 16 - params.level * 2)}px` }">
      <a 
        :href="params.href" 
        :class="['anchor-link', { 'active-link': active === params.href }]" 
        :target="params.target" 
        :disabled="params.disabled"
      >
        {{ params.label }}
      </a>
    </div>
    <AnchorItem   v-if="params.children && params.children.length > 0"  
      v-for="param in params.children" :key="param.href" :active="active" :params="param"
    />
    
  </div>

</template>

<script setup lang='ts'>
import { ParamsType } from './type'
import { defineProps, PropType } from 'vue'
import { ref } from 'vue'




const props = defineProps({
  params: {
    type: Object as PropType<ParamsType>,
    required: true,
  },
  active: {
    type: String,
    requered: true,
    default:''
  }
})

</script>

<style lang='scss' scoped>
.anchor-items {
  padding-left: 14px;
  position: relative;
}
.anchor-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.anchor-link {
  display: inline-block;
  color: #909399;
}
.anchor-marker {
  top:8px;
  width:4px;
  height: 14px;
  left:0;
  transition: top .25s ease-in-out, opacity .25s;
  position: absolute;
  background-color: #409eff;
  z-index: 0;
}
.active-link {
  color: #409eff;
}


</style>