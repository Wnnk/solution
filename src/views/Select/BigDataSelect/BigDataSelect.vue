<template>
  <div>
    <el-select 
      v-model="value" 
      placeholder="请选择" 
      @visible-change="visiableHandler" 
      ref="selectRef"
      :popper-append-to-body="false"  
    >
      <!-- 加载状态的下拉选项 -->
      <el-option 
        v-if="visiable && isLoading" 
        value="" 
        disabled
      >
        <div class="loading-container">
          <span class="loading-text">加载中...</span>
        </div>
      </el-option>
      
      <!-- 实际选项 - 仅在加载完成后显示 -->
      <el-option  
        v-if="visiable && !isLoading" 
        v-for="(item, index) in data" 
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { ref, nextTick } from 'vue'

const value = ref('')
const visiable = ref(false)
const isLoading = ref(false)  // 控制加载状态
const selectRef = ref()

// 生成大量选项数据
const data = new Array(5000).fill(0).map((_, index) => ({
  label: `选项${index}`,
  value: index,
}))

const visiableHandler = async (val: boolean) => {
  if (val) {
    visiable.value = true
    isLoading.value = true  // 显示加载状态
    
    // 等待DOM更新后再渲染实际选项，避免卡顿
    await nextTick()
    

    await new Promise(resolve => setTimeout(resolve, 50))
    
    // 标记加载完成，切换到实际选项
    isLoading.value = false
  } else {
    visiable.value = false
  }
}
</script>

<style lang='scss' scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  
  .loading-spinner {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  
  .loading-text {
    color: #606266;
    font-size: 14px;
  }
}

/* 确保加载状态下拉框有合适的高度 */
::v-deep .el-select-dropdown__wrap {
  min-height: 40px;
}
</style>
