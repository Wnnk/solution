<!-- 
  @Author: Wnnk
  @desction: 
    问题1: 字体大小自适应问题
      解决方案：同过canvas 计算出字体大小，设置到title的textStyle中
    问题2: ref 代理cahrt， 在bar，line类型图表resize时会报错，pie不会、
      解决方案：使用shallowRef 做浅层代理
-->

<template>
  <div class="chart-adapt" ref="chartAdapt">
    <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
])

const measureTextWidth = (str: string, fontSize: number, fontFamily: string) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0
  ctx.font = `${fontSize}px ${fontFamily}`
  return ctx.measureText(str).width
}
const calculateFontSize = (str: string, boxWidth: number, min: number = 1, max: number = 100) => {
  let low = min
  let high = max
  let best = min
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const width = measureTextWidth(str, mid, 'Arial')
    if (!width) return 0
    if (width <= boxWidth) {
      best = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return best
}

const chart = shallowRef(null)
const chartAdapt = shallowRef(null)
let longTitle = '' //用于计算字体大小
onMounted(() => {
  initFont()
  const chartDom = document.getElementById('chart')
  chart.value = echarts.init(chartDom)
  chart.value.setOption(barOptions)
  window.addEventListener('resize', () => {
    console.log('resize', barOptions.title.textStyle.fontSize)

    chart.value.resize()
  })
})

const initFont = () => {
  const chartDom = document.getElementById('chart')
  if (!chartDom) return
  longTitle = barOptions.title.text

  const width = chartDom.clientWidth

  const initialFontSize = calculateFontSize(longTitle, width * 0.8)
  barOptions.title.textStyle = {
    width: width * 0.8,
    fontSize: initialFontSize,
  }
}

const barOptions = {
  title: {
    text: '测试字体自适应的示例，测试字体自适应的示例，测试字体自适应的示例，测试字体自适应的示例',
    left: 'center',
    textStyle: {
      width: 800 * 0.8,
      fontSize: calculateFontSize(longTitle, 800 * 0.8),
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
    },
  ],
}
const option = {
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
}
</script>

<style lang="scss" scoped>
.chart-adapt {
  height: 100%;
}
</style>
