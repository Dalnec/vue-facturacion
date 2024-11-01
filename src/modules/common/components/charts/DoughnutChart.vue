<template>
  <Doughnut :data="data" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const centerTextPlugin = {
  id: 'mydoughnut',
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { width, height },
      data,
    } = chart
    ctx.save()
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#333'
    ctx.fillText(
      `${data.datasets[0].data[0]}%`,
      width / 2,
      (height + (height + 5) / 4) / 2,
    )
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
