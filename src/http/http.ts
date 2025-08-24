import axios, { AxiosHeaders } from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

// 从环境变量获取基础URL
const baseURL = import.meta.env.VITE_API_URL || ''
console.log('API基础地址:', baseURL)

// 创建Axios实例并配置baseURL
const http: AxiosInstance = axios.create({
  baseURL: baseURL, // 正确的属性名是baseURL（大写URL）
  timeout: 10000,
})

// 请求拦截器 - 使用http实例而非全局axios
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token') || ''

    // 确保headers存在
    if (!config.headers) {
      config.headers = new AxiosHeaders()
    }

    // 添加token到请求头
    config.headers.set('authorization', token)

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器 - 同样使用http实例
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    handleCode(data.code)
    return data
  },
  (error: AxiosError) => {
    // 处理网络错误
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  },
)

// 状态码处理函数
const handleCode = (code: number) => {
  switch (code) {
    case 401:
      localStorage.setItem('token', '')
      ElMessage.error('登录已过期，请重新登录')
      // 可以在这里添加跳转到登录页的逻辑
      break
    case 200:
      // 成功状态，无需处理
      break
    default:
      // 其他状态码可以在这里扩展处理
      break
  }
}

// 封装GET请求
const httpGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.get<T>(url, config)
}

// 封装POST请求
const httpPost = <T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<T> => {
  return http.post<T, T, D>(url, data, config)
}

export default http
export { http, httpGet, httpPost }
