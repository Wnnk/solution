
<template>
  <div class="local-search">
    <el-input v-model="sreachKey">

      <template #append>
        <el-button type="primary" @click="changeKeyWords">Search</el-button>
      </template>
    </el-input>
    
  </div>

</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import _ from 'lodash'


const props = defineProps({
  filterStore: {
    type: Object,
    required: true
  },
  
})
const sreachKey = ref('')
const emit = defineEmits(['changeFilterStore'])

const changeKeyWords = () => {
  const newStore = _.cloneDeep(props.filterStore)
  newStore.sreachKey = sreachKey.value
  emit('changeFilterStore', newStore)
}
const debouncedChangeKeyWords = _.debounce(changeKeyWords, 500)
watch(
  () => sreachKey.value,
  () => {
    debouncedChangeKeyWords()
  }
)

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