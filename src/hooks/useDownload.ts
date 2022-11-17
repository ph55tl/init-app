import { ElMessage } from 'element-plus'

function download(url: string, fileName: string) {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

function useDownload(api: () => Promise<any>, fileName: string) {
  const downloadFile = async () => {
    try {
      const res = await api()
      const url = window.URL.createObjectURL(new Blob([res]))
      download(url, fileName)
      ElMessage.success('开始下载')
    } catch (e) {
      console.log(e)
      ElMessage.error('下载失败')
    }
  }

  return {
    downloadFile
  }
}

export { useDownload, download }
