export const Message = {
  error: function (msg: string) {
    ElMessage({
      message: msg,
      grouping: true,
      type: 'error'
    })
  }
}
