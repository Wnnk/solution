
<template>
  <div class="local-search">
    <el-input v-model="keyWords">

      <template #append>
        <el-button type="primary">Search</el-button>
      </template>
    </el-input>
    
  </div>

</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import _ from 'lodash'



const keyWords = ref('')

</script>

<style lang='scss' scoped>
.local-search {
  position: relative;
}
.dropdwon {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
}
</style>