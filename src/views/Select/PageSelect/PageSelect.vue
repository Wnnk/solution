
<template>
<div>
  <PageSelect v-model:selectedPage="selectedPage" v-model:selectValue="selectValue" :options="options" />
</div>

</template>

<script setup lang='ts'>
import PageSelect from '@/components/Select/PageSelect/PageSelect.vue';
import { ref } from 'vue';
import http from '@/http/http';

const selectedPage = ref(1);
const options = ref([])
const selectValue = ref(null);


</script>

<style lang='scss' scoped>
</style>