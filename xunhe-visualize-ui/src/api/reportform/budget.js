import request from '@/utils/request'

// 查询收支列表
export function listBudget(query) {
  return request({
    url: '/system/budget/list',
    method: 'get',
    params: query
  })
}

// 查询收支详细
export function getBudget(id) {
  return request({
    url: '/system/budget/' + id,
    method: 'get'
  })
}

// 新增收支
export function addBudget(data) {
  return request({
    url: '/system/budget',
    method: 'post',
    data: data
  })
}

// 修改收支
export function updateBudget(data) {
  return request({
    url: '/system/budget',
    method: 'put',
    data: data
  })
}

// 删除收支
export function delBudget(id) {
  return request({
    url: '/system/budget/' + id,
    method: 'delete'
  })
}
