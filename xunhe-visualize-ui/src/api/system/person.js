import request from '@/utils/request'

// 查询人员列表
export function listStaff(query) {
  return request({
    url: '/system/staff/list',
    method: 'get',
    params: query
  })
}

// // 查询人员详细
// export function getStaff(id) {
//   return request({
//     url: '/system/staff/' + id,
//     method: 'get'
//   })
// }

// 新增人员
export function addStaff(data) {
  return request({
    url: '/system/staff/add',
    method: 'post',
    data: data
  })
}

// 修改人员
export function updateStaff(data) {
  return request({
    url: '/system/staff/edit',
    method: 'post',
    data: data
  })
}

// 删除人员
export function delStaff(id) {
  return request({
    url: '/system/staff/remove' + id,
    method: 'get'
  })
}
