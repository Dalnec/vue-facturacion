<template>
  <Line id="myLineChart" :data="data" :options="chartOptions" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

const extraInfoLegendPlugin = {
  id: 'extraInfoLegend',
  afterDatasetsDraw(chart) {
    const {
      ctx,
      data,
      chartArea: { left, right },
    } = chart
    const datasets = data.datasets[0].data

    chart.legend.legendItems.forEach((legendItem, index) => {
      const extraInfo = datasets[index]
      ctx.save()
      ctx.font = '12px Arial'
      ctx.fillStyle = '#666'
      ctx.textAlign = 'right'
      ctx.fillText(`(${extraInfo})`, right, legendItem.top + 8)
      ctx.restore()
    })
  },
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  extraInfoLegendPlugin,
)

const props = defineProps<{
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor?: string
      backgroundColor?: string
    }[]
  }
  options?: object
}>()

const chartOptions = props.chartOptions || {
  //   responsive: true,
  plugins: {
    mydoughnut: false,
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Line Chart Example',
    },
  },
}
</script>
