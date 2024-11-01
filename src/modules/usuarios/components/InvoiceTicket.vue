<template>
  <div ref="pdfContent" class="body">
    <div class="header">
      <h1>RECIBO N° {{ ticket.header.number }}</h1>
    </div>

    <div class="info">
      <p>
        <span class="bold">Fecha Emisión:</span>
        {{ ticket.header.emission_date }}
      </p>
      <p><span class="bold">Medidor:</span> {{ ticket.header.medidor }}</p>
      <p><span class="bold">Señor(a):</span> {{ ticket.header.full_name }}</p>
      <p><span class="bold">Domicilio:</span> {{ ticket.header.address }}</p>
    </div>

    <div class="subtitle">
      <span class="">Detalle de Lecturas</span>
    </div>
    <table class="details">
      <thead>
        <tr>
          <th>Anterior</th>
          <th>Actual</th>
          <th>Consumo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ ticket.body.previous_month }}<br />{{
              ticket.body.previous_reading
            }}
          </td>
          <td>
            {{ ticket.body.actual_month }}<br />{{ ticket.body.actual_reading }}
          </td>
          <td>
            <span class="bold">{{ ticket.body.consumed }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="">
      <p class="subtitle">Concepto(s)</p>
      <p class="conceptDetails">
        <span>Servicio de Agua:</span> <span>{{ ticket.body.total }}</span>
      </p>
    </div>

    <div class="total">
      <span class="bold">TOTAL A PAGAR:</span>
      <span class="bold">{{ ticket.body.total }}</span>
    </div>
  </div>
  <button @click="exportToPDF" class="btn btn-primary mt-2">
    Exportar a PDF
  </button>
  <button
    @click="invoiceStore.openPaymentModal = true"
    class="btn btn-success mt-2"
    :disabled="status === 'P'"
  >
    COBRAR
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas-pro'
import { useInvoiceStore } from '../store/invoice.store'
import type { Ticket } from '../interfaces/ticket.interface'

interface Props {
  ticket: Ticket
  status: string
}

defineProps<Props>()

const invoiceStore = useInvoiceStore()
const pdfContent = ref<HTMLDivElement | null>(null)

const exportToPDF = async () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: [80, 100],
    orientation: 'portrait',
  })

  try {
    const canvas = await html2canvas(pdfContent.value, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL('image/jpeg', 1.0)

    const imgWidth = 80
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const position = 0
    doc.addImage(imgData, 'JPEG', 1, position, imgWidth, imgHeight)

    // Guarda el PDF
    doc.save('recibo.pdf')
  } catch (error) {
    console.error('Error al generar el PDF:', error)
  }
}
</script>

<style scoped>
:root {
  color-scheme: light;
}

.body {
  font-family: Arial, sans-serif;
  max-width: 500px;
  padding: 10px;
}

h1 {
  text-align: center;
  font-size: 20px;
}

.header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info {
  text-align: left;
  margin-bottom: 10px;
  float: left;
  width: 100%;
}

.info p {
  margin: 5px 0;
}

.bold {
  font-weight: bold;
}

.subtitle {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.details {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 5px;
}

.details th {
  border-bottom: 1px solid #000;
  padding: 0px;
  text-align: center;
  font-size: 14px;
}

.details td {
  text-align: center;
  padding: 0px;
}

.conceptDetails {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5px;
}

.total {
  text-align: right;
  font-size: 18px;
  display: flex;
  justify-content: space-evenly;
}
</style>
