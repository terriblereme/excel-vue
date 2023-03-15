import service from './service'
import qs from 'qs'

const request = {
  get: (url, params) => {
    return service({
      url,
      method: 'get',
      params
    })
  },
  post: (url, data) => {
    let config = {
      url,
      method: 'post',
      data:qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    return service(config)
  },
  put: (url, data) => {
    let config = {
      url,
      method: 'put',
      data:qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    return service(config)
  },
  delete: (url, data) => {
    let config = {
      url,
      method: 'delete',
      data:qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    return service(config)
  },
  upold: (url, data) => {
    let config = {
      url,
      method: 'post',
      data:data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return service(config)
  },
}

export default request