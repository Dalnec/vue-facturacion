import { api } from '@/api/api'

export const getUsuariosReportAction = async (reportname?: string) => {
  try {
    const resp = await api.get(`/usuario/report/`)
    console.log(resp)

    let fileName = `${reportname}.pdf`
    const disposition = resp.headers['Content-Disposition']
    console.log({ disposition })

    if (disposition && disposition.includes('filename=')) {
      const fileNameMatch = disposition.match(/filename="?([^"]+)"?/)
      if (fileNameMatch.length > 1) {
        fileName = fileNameMatch[1]
      }
    }

    const url = window.URL.createObjectURL(new Blob([resp.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
