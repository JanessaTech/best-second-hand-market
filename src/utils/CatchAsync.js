
 import logger from "../common/Logger"

 const catchAsync = async (fn, notifyAlertUpdate, logMessage, errFn) => {
    try {
      await fn()
    } catch (err) {
      let errMsg = ''
      if (err?.response?.data?.message) {
          errMsg = err?.response?.data?.message
      } else {
          errMsg = err?.message
      }
      if (logMessage) {
        logger.error(logMessage, err)
      }
      if (errFn) {
        errFn()
      }
      if (notifyAlertUpdate) {
        notifyAlertUpdate([{severity: 'error', message: errMsg}])
      }
    }
  }

  export default catchAsync