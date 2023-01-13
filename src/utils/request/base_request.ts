import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from 'axios'
import { Toast } from 'vant'

class BaseRequest {
  instance: AxiosInstance
  interceptors?: IbaseRequestConfig
  // 接受实例化的loading对象
  loading: any
  // 是否显示加载
  isLoading: boolean

  constructor(config: IbaseInstanceConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isLoading = config.isLoading ?? true

    this.commonResponseInterceptor()

    // 使用实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestIntercepter,
      this.interceptors?.requestIntercepterCatch
    )

    // 使用实例响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercepter,
      this.interceptors?.responseIntercepterCatch
    )

    this.commonRequestInterceptor()
  }

  // 共有拦截器
  private commonRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // add token
        const token = sessionStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = token
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  // 共有响应拦截
  private commonResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ResponseDataType>) => {
        this.loading?.clear()
        if (res.request.responseType == 'blob') {
          const size = res.headers['content-length']
          let name = res.headers['content-disposition'] ?? ''
          if (name) {
            const arr = name.split('filename=')
            name = arr.pop() ?? ''
          }

          return {
            responseType: 'blob',
            size,
            name,
            data: res.data,
            config: res.config,
            status: res.status,
            statusText: res.statusText,
            headers: res.headers
          }
        }
        return res
      },
      (err) => {
        this.loading?.clear()
        return Promise.reject(err)
      }
    )
  }

  // 实例化每个请求的拦截
  request(config: IbaseInstanceConfig): AxiosPromise<ResponseDataType> {
    // 发送请求时控制是否显示加载框
    this.isLoading = config.isLoading ?? true
    // 发起请求时调用加载
    if (this.isLoading) {
      this.loading = Toast({
        type: 'loading',
        message: 'loading',
        duration: 0,
        loadingType: 'spinner'
      })
    }
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestIntercepter) {
        config = config.interceptors.requestIntercepter(config)
      }
      this.instance.request<ResponseDataType>(config).then(
        (res) => {
          if (config.interceptors?.responseIntercepter) {
            res = config.interceptors.responseIntercepter(res)
          }
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  post(
    url: string,
    data: Record<string, any> = {},
    config?: IbaseInstanceConfig
  ) {
    return this.request({
      url,
      method: 'POST',
      data,
      ...config
    })
  }

  get(
    url: string,
    data: Record<string, any> = {},
    config?: IbaseInstanceConfig
  ) {
    return this.request({
      url,
      method: 'GET',
      params: data,
      ...config
    })
  }

  delete(
    url: string,
    data: Record<string, any> = {},
    config?: IbaseInstanceConfig
  ) {
    return this.request({
      url,
      method: 'delete',
      params: data,
      ...config
    })
  }

  blob(
    url: string,
    data: Record<string, any> = {},
    config?: IbaseInstanceConfig
  ) {
    return this.request({
      url,
      method: 'GET',
      params: data,
      responseType: 'blob',
      ...config
    })
  }
}
export default BaseRequest
