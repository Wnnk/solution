<template>
  <div>
    <SuperSelect 
      v-model="value" 
      :options="options" 
      v-model:status="status"
      :retry="loadOptions"
      />
  </div>

</template>

<script setup lang='ts'>
import SuperSelect from '@/components/Select/SuperSelect/SuperSelect.vue';
import http from '@/http/http';
import { onMounted, ref } from 'vue';

const value = ref('');
const options = ref([]);
const status = ref(0);
const loadOptions = async () => {
  try {
    status.value = 1;
    const res = await http.get('/api/getSuperOptions', {
      
    });
    options.value = res.data.data;
    status.value = 2;
  } catch (error) {
    console.log(error);
    status.value = 3;
  }

}
onMounted(() => {
  loadOptions();
})
</script>

<style lang='scss' scoped>
</style>