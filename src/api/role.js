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

// 给角色分配权限
export function assignPerm(data) {
        return request({
          url: '/sys/role/assignPrem',
          method: 'put',
          data
        })
      }
