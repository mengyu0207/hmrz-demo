import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
/**
 *  获取用户的基本资料
 *
 * **/
 export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
 export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// /** *
//  *  获取某个用户的基本信息
//  *
//  * ***/
//  export function getUserDetailById(id) {
//   return request({
//     url: `/sys/user/${id}`
//   })
// }
/** *
 *
 * 保存员工的基本信息
 * **/
 export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
