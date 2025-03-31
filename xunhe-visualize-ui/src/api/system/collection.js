import request from '@/utils/request'

// 查询收款列表
export function listCollection(query) {
  return request({
    url: '/system/collection/list',
    method: 'get',
    params: query
  })
}

// 查询收款详细
export function getCollection(id) {
  return request({
    url: '/system/collection/' + id,
    method: 'get'
  })
}

// 新增收款
export function addCollection(data) {
  return request({
    url: '/system/collection',
    method: 'post',
    data: data
  })
}

// 修改收款
export function updateCollection(data) {
  return request({
    url: '/system/collection',
    method: 'put',
    data: data
  })
}

// 删除收款
export function delCollection(id) {
  return request({
    url: '/system/collection/' + id,
    method: 'delete'
  })
}
