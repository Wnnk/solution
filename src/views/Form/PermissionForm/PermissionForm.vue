<template>
<div class="permission-form" >
  <h1 v-permission="'user'">user以上可见</h1>
  <h1 v-permission="'admin'">admin以上可见</h1>
  <h1 v-permission="'boss'">boss以上可见</h1>
  <h1 v-permission="'root'">root以上可见</h1>
</div>

</template>

<script setup lang='ts'>
localStorage.setItem('permission', JSON.stringify('root'))
</script>

<style lang='scss' scoped>
</style>