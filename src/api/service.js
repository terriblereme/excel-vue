import axios from 'axios'
import {ElLoading, ElMessage } from 'element-plus'
import {logout} from "@/utils/auth"
import {apiDevelop} from '@/utils/config';
let loadingInstance;
// 请求初始化
const service = axios.create({
  baseURL: apiDevelop, // url = base url + request url
  timeout: 50000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    loadingInstance = ElLoading.service();
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
      loadingInstance.close();
    const res = response.data
    //正常
    if (response.status===200 && res.code === 1) {
      if(res.msg.length!=""){
        ElMessage({
          message: res.msg,
          type: 'success'
        })
      }
      return res
    } else {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if(res.code=== 401){
        logout();
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    }
  },
  error => {
    loadingInstance.close();
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
