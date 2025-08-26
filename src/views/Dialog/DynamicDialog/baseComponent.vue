<template>
  <div class="">
    title: {{ title }}

    <h1>slots</h1>
    <slot name="customSlot"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const props =defineProps({
  title: {
    type: String,
    default: ''
  }
})


onMounted(() => {
  
})
</script>

<style lang="scss" scoped></style>
