import { api } from '@/api/api'

interface FilterParams {
  status?: string | null
  month?: string
}

export const getInvoiceReportAction = async (
  params?: FilterParams,
  reportname?: string,
) => {
  try {
    const resp = await api.get(`/invoice/status_report/`, {
      params: { ...params },
      responseType: 'blob',
    })
    console.log(resp)

    // Intentar obtener el nombre del archivo del encabezado 'Content-Disposition'
    let fileName = `${reportname}.pdf` // Nombre predeterminado en caso de que no esté en el encabezado
    const disposition = resp.headers['Content-Disposition']
    console.log({ disposition })

    if (disposition && disposition.includes('filename=')) {
      const fileNameMatch = disposition.match(/filename="?([^"]+)"?/)
      if (fileNameMatch.length > 1) {
        fileName = fileNameMatch[1]
      }
    }

    // Crear enlace temporal para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([resp.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()

    // Limpia el enlace temporal después de descargar
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
