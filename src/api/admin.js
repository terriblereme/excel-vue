import request from '@/api/request'
//登录
export function login(data) {
    return request.post(`/login`,data)
}

export function logoutapi() {
    return request.post(`/logout`)
}

//上传
export function upload(file) {
    var data = new FormData();
    data.append("file",file);
    return request.upold(`/upload`,data)
}

//广告列表
export function advList(data) {
    return request.get(`/bsAdvertises`,data)
}
export function advAdd(data) {
    return request.post(`/bsAdvertises`,data)
}
export function advEdit(data) {
    return request.put(`/bsAdvertises`,data)
}
export function advDel(id) {
    return request.delete(`/bsAdvertises/${id}`,null)
}
//excel模板
export function excellist(data){
    return request.get('/getExcelModel',data)
}


//内容列表
export function contentList(data) {
    return request.get(`/bsContents`,data)
}
export function contentGet(id) {
    return request.get(`/bsContents/${id}`,null)
}
export function contentAdd(data) {
    return request.post(`/bsContents`,data)
}
export function contentEdit(data) {
    return request.put(`/bsContents`,data)
}
export function contentDel(id) {
    return request.delete(`/bsContents/${id}`,null)
}
export function contentChangeState(id) {
    return request.put(`/bsContents/changeState/${id}`,null)
}

//部门列表
export function deptList(data) {
    return request.get(`/bsDepts`,data)
}
export function deptAdd(data) {
    return request.post(`/bsDepts`,data)
}
export function deptEdit(data) {
    return request.put(`/bsDepts`,data)
}
export function deptDel(id) {
    return request.delete(`/bsDepts/${id}`,null)
}

//人员管理
export function userList(data) {
    return request.get(`/bsUsers`,data)
}
export function userAdd(data) {
    return request.post(`/bsUsers`,data)
}
export function userEdit(data) {
    return request.put(`/bsUsers`,data)
}
export function userDel(id) {
    return request.delete(`/bsUsers/${id}`,null)
}

export function userChangeState(id) {
    return request.put(`/bsUsers/changeState/${id}`,null)
}
export function userUpdatePsw(data) {
    return request.put(`/bsUsers/updatePsw`,data)
}

//来访记录

export function registerList(data) {
    return request.get(`/bsRegisters`,data)
}
export function registerAdd(data) {
    return request.post(`/bsRegisters`,data)
}
export function registerEdit(data) {
    return request.put(`/bsRegisters`,data)
}
export function registerDel(id) {
    return request.delete(`/bsRegisters/${id}`,null)
}
export function download(data) {
    return request.get(`/excelExport`,data)
}

//系统账号
export function sysuserList(data) {
    return request.get(`/sysUsers`,data)
}
export function sysuserAdd(data) {
    return request.post(`/sysUsers`,data)
}
export function sysuserEdit(data) {
    return request.put(`/sysUsers`,data)
}
export function sysuserDel(id) {
    return request.delete(`/sysUsers/${id}`,null)
}

export function sysuserChangeState(id) {
    return request.put(`/sysUsers/changeState/${id}`,null)
}
export function sysuserUpdatePsw(data) {
    return request.put(`/sysUsers/updatePsw`,data)
}
//系统角色
export function roleList(data) {
    return request.get(`/sysRoles`,data)
}
export function roleAdd(data) {
    return request.post(`/sysRoles`,data)
}
export function roleEdit(data) {
    return request.put(`/sysRoles`,data)
}
export function roleDel(id) {
    return request.delete(`/sysRoles/${id}`,null)
}
export function authTree(data) {
    return request.get(`/sysFunctionsTree`,data)
}
export function roleAuth(data) {
    return request.post(`/sysRolesAuth`,data)
}
//公司信息
export function companyEdit(data) {
    return request.put(`/bsCompanies`,data)
}
export function companyGet(id) {
    return request.get(`/bsCompanies/${id}`,null)
}