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
            {{ ticket.body.previous_month }}<br />
            <span style="font-weight: bold">
              {{ ticket.body.previous_reading }}
            </span>
          </td>
          <td>
            {{ ticket.body.actual_month }}<br />
            <span style="font-weight: bold">
              {{ ticket.body.actual_reading }}
            </span>
          </td>
          <td>
            <span class="bold">{{ ticket.body.consumed }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <p class="subtitle">Concepto(s)</p>
      <div style="padding: 0; margin: 0">
        <table class="details">
          <tbody style="font-size: 12px">
            <tr>
              <td style="width: 160px">Servicio de Agua</td>
              <td style="text-align: center; width: 40px">
                {{ ticket.body.consumed }}
              </td>
              <td style="text-align: center; width: 40px">
                {{ ticket.body.price }}
              </td>
              <td style="text-align: center; font-weight: bold">
                {{ ticket.body.total }}
              </td>
            </tr>
            <tr v-for="(detail, index) in ticket.details" :key="index">
              <td style="width: 140px">{{ detail.description }}</td>
              <td style="text-align: center; width: 40px">
                {{ detail.quantity }}
              </td>
              <td style="text-align: center; width: 40px">
                {{ detail.price }}
              </td>
              <td style="text-align: center; font-weight: bold">
                {{ detail.subtotal }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="total">
      <span class="bold">TOTAL A PAGAR</span>
      <span class="bold">{{ ticket.body.total }}</span>
    </div>
  </div>
  <!-- <div v-html="htmlContent"></div> -->
  <button
    :disabled="copied"
    @click="copyLinkToClipboard()"
    class="btn btn-primary mt-2"
  >
    Copiar Enlace
  </button>
  <button @click="exportToPDF" class="btn btn-primary mt-2">
    Descargar PDF
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
  uuid: string
}

const props = defineProps<Props>()

const copied = ref(false)
const invoiceStore = useInvoiceStore()
const pdfContent = ref<HTMLDivElement | null>(null)

const exportToPDF = async () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: [80, 105],
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
    doc.save(
      `Recibo_${props.ticket.body.actual_month}_${props.ticket.header.full_name}.pdf`,
    )
  } catch (error) {
    console.error('Error al generar el PDF:', error)
  }
}

const copyLinkToClipboard = async () => {
  try {
    const backlink = import.meta.env.VITE_API_URL
    const link = `${backlink}/ticket/${props.uuid}/`
    await navigator.clipboard.writeText(link)
    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 1000) // Mensaje temporal de confirmación (2 segundos)
  } catch (error) {
    console.error('Error al copiar el enlace:', error)
  }
}

// const htmlContent = ref('')
// const fetchHtml = async () => {
//   const backlink = import.meta.env.VITE_API_URL
//   try {
//     const response = await fetch(`${backlink}/invoice/1378/ticket/`, {
//       headers: { Accept: 'text/html' },
//     })
//     htmlContent.value = await response.text()
//   } catch (error) {
//     console.error('Error fetching HTML:', error)
//   }
// }

// // Llamar a la función cuando se monta el componente
// onMounted(() => {
//   fetchHtml()
// })
</script>

<style scoped>
:root {
  color-scheme: light;
}

.body {
  font-family: Arial, sans-serif;
  max-width: 500px;
  padding: 5px 10px;
}

h1 {
  text-align: center;
  font-size: 20px;
}

.header {
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
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
  font-size: 13px;
}

.details td {
  text-align: center;
  padding: 0px;
  font-size: 12px;
}

.total {
  text-align: right;
  font-size: 18px;
  display: flex;
  justify-content: space-evenly;
}
</style>
