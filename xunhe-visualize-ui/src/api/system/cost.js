import request from '@/utils/request'

// 查询等级费用列表
export function listCost(query) {
  return request({
    url: '/system/cost/list',
    method: 'get',
    params: query
  })
}

// 查询等级费用详细
export function getCost(id) {
  return request({
    url: '/system/cost/' + id,
    method: 'get'
  })
}

// 新增等级费用
export function addCost(data) {
  return request({
    url: '/system/cost',
    method: 'post',
    data: data
  })
}

// 修改等级费用
export function updateCost(data) {
  return request({
    url: '/system/cost',
    method: 'put',
    data: data
  })
}

// 删除等级费用
export function delCost(id) {
  return request({
    url: '/system/cost/' + id,
    method: 'delete'
  })
}
