
 const catchAsync = async (fn, notifyAlertUpdate) => {
    try {
      await fn()
    } catch (err) {
      let errMsg = ''
      if (err?.response?.data?.message) {
          errMsg = err?.response?.data?.message
      } else {
          errMsg = err?.message
      }
      if (notifyAlertUpdate) {
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      }
    }
  }

  export default catchAsync