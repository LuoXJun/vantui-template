import { Toast } from 'vant'
import BaseRequest from './base_request'
import { TIME_OUT, BASE_URL } from './config/index'

const request = new BaseRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  isLoading: true,
  interceptors: {
    requestIntercepter: (config) => {
      return config
    },

    requestIntercepterCatch: (err) => {
      if (err.request) {
        Toast.fail(err.request)
      }
      throw new Error(err)
    },

    responseIntercepter: (res) => {
      if (res.request.responseType == 'blob') return res
      if (
        res.data.code == 200 ||
        res.data.code == 0 ||
        res.data.code == '000000'
      ) {
        // Toast.success(res.data.message ?? res.data.msg)
      } else {
        Toast.fail(res.data.message ?? res.data.msg ?? '')
      }
      return res
    },

    responseIntercepterCatch: (err) => {
      if (err.response) {
        Toast.fail(
          err.response.data?.message
            ? err.response.data?.message
            : err.response.data
        )
      } else if (err.data) {
        Toast.fail(err.data?.message ? err.data?.message : err.data)
      } else {
        Toast.fail(err.status + ' ' + err.statusText)
      }
      throw new Error(err)
    }
  }
})

export default request
