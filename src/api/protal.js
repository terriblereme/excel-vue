import request from '@/api/request'
// 广告
export function getAdv(id) {
    return request.get(`/api/getAdvertises/${id}`,null)
  }

// 内容列表
export function getList(data) {
  return request.get(`/api/bsContents`,data)
}
// 内容详情
export function getDetail(id) {
  return request.get(`/api/bsContents/${id}`,null)
}

// 公司简介
export function getCompany(id) {
  return request.get(`/api/bsCompanies/${id}`,null)
}
//来访登记
export function registerVerfy(data) {
  return request.post(`/api/bsRegistersVerfy`,data)
}
//来访登记
export function registerSave(data) {
  return request.post(`/api/bsRegisters`,data)
}

export function registerList(data) {
  return request.get(`/api/bsRegisters`,data)
}

//我已离开
export function registerExit(data) {
  return request.put(`/api/bsRegisters`,data)
}


//人员列表
export function userList(data) {
  return request.get(`/api/bsUsers`,data)
}

export function deptList(data) {
  return request.get(`/api/bsDepts`,data)
}

//人员登录
export function login(data) {
  return request.post(`/api/login`,data)
}

export function userUpdatePsw(data) {
  return request.put(`/bsUsers/updatePsw`,data)
}

//获取openid
export function getOpenid(code) {
  return request.get(`/api/getOpenid/${code}`,null)
}