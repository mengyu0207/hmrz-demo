import request from '@/utils/request'

//获取角色列表
export function getRolesApi(params){
    return request({
        url: '/sys/role',
        params
    })
}
//添加角色列表
export function addRolesApi(data){
    return request({
        url: '/sys/role',
        method:'POST',
        data,
    })
}