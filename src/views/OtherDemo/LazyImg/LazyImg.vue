<template>
  <div>
    <img v-for="pic in data" :key="pic.id" :data-src="pic.src" class="lazy" v-lazy="pic.src"/>
  </div>

</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import { ref } from 'vue'

const data = ref([
  {
    id:1,
    src:'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
  {
    id:2,
    src:'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
  {
    id:3,
    src:'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
  {
    id:4,
    src:'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
  {
    id:5,
    src:'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
])

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const lazyImg = entry.target as HTMLImageElement
//       lazyImg.src = lazyImg.dataset.src
//       observer.unobserve(lazyImg)
//     }
//   })
// })

// onMounted(() => {
//   const lazyImgs = document.querySelectorAll('.lazy')
//   lazyImgs.forEach((lazyImg) => {
//     observer.observe(lazyImg)
//   })
// })
</script>

<style lang='scss' scoped>
.lazy {
  width: 100%;
  height: 800px;
  margin: 100px 0;
}
</style>