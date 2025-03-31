import request from '@/utils/request'

// 查询验收列表
export function listAcceptance(query) {
  return request({
    url: '/system/acceptance/list',
    method: 'get',
    params: query
  })
}

// 查询验收详细
export function getAcceptance(id) {
  return request({
    url: '/system/acceptance/' + id,
    method: 'get'
  })
}

// 新增验收
export function addAcceptance(data) {
  return request({
    url: '/system/acceptance',
    method: 'post',
    data: data
  })
}

// 修改验收
export function updateAcceptance(data) {
  return request({
    url: '/system/acceptance',
    method: 'put',
    data: data
  })
}

// 删除验收
export function delAcceptance(id) {
  return request({
    url: '/system/acceptance/' + id,
    method: 'delete'
  })
}
