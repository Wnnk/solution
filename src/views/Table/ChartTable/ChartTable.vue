<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="任务名称" prop="name"></el-table-column>
      <el-table-column label="任务描述" prop="desc"></el-table-column>
      <el-table-column label="完成率" align="center" width="500">
        <template #default="scope">
          <div class="finished-rate" width="100%">
            <div class="title">{{ scope.row.finished }}</div>
            <div
              :ref="(el: HTMLDivElement) => setChartRef(el, scope.row.id)"
              class="chart-container"
            ></div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { v4 as uuidv4 } from 'uuid'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
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

const tableData = ref([
  {
    id: uuidv4(),
    name: '任务1',
    desc: '这是任务1的描述',
    finished: 50,
    noStart: 20,
    inProgress: 30,
  },
  {
    id: uuidv4(),
    name: '任务2',
    desc: '这是任务2的描述',
    finished: 70,
    noStart: 10,
    inProgress: 20,
  },
  {
    id: uuidv4(),
    name: '任务3',
    desc: '这是任务3的描述',
    finished: 90,
    noStart: 5,
    inProgress: 5,
  },
])

const tableRef = ref<InstanceType<typeof ElTable>>()
const chartRefs = ref<Record<string, HTMLDivElement | null>>({})

const setChartRef = (el: HTMLDivElement | null, id: string) => {
  // 只在元素存在且未初始化过时执行
  if (el && !chartRefs.value[id]) {
    chartRefs.value[id] = el
    initChart(id)
  } else if (!el) {
    // 元素卸载时清理引用
    chartRefs.value[id] = null
  }
}
const initChart = (id: string) => {
  const item = tableData.value.find((item) => item.id === id)

  if (!item || !chartRefs.value[id]) return
  const chartDom = chartRefs.value[id]
  const chart = echarts.init(chartDom, null, {
    width: 200,
    height: 200,
  })
  const option = getOption(id)
  chart.setOption(option)
}

const getOption = (id: string) => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '完成率',
        type: 'pie',
        data: [
          {
            value: tableData.value.find((item) => item.id === id)?.finished,
            name: '已完成',
          },
          { value: tableData.value.find((item) => item.id === id)?.noStart, name: '未开始' },
          {
            value: tableData.value.find((item) => item.id === id)?.inProgress,
            name: '进行中',
          },
        ],
      },
    ],
  }
  return option
}
</script>

<style lang="scss" scoped>
.finished-rate {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
</style>
