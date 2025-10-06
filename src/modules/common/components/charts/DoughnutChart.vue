<template>
  <Doughnut :data="data" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const centerTextPlugin = {
  id: 'mydoughnut',
  beforeDraw(chart) {
    const { ctx, chartArea, data } = chart
    if (!chartArea) return
    const { width, height, top, left } = chartArea

    const centerX = left + width / 2
    const centerY = top + height / 2

    ctx.save()
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#333'
    ctx.fillText(`${data.datasets[0].data[0]}%`, centerX, centerY)
  },
}

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin)

// Define component props
defineProps<{
  data: {
    labels: string[]
    datasets: [
      {
        data: number[]
        backgroundColor: string[]
      },
    ]
  }
}>()

const chartOptions = {
  responsive: true,
  plugins: {
    extraInfoLegend: false,
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    },
  },
}
</script>
