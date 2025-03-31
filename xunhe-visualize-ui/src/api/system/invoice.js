import request from '@/utils/request'

// 查询开票列表
export function listInvoice(query) {
  return request({
    url: '/system/invoice/list',
    method: 'get',
    params: query
  })
}

// 查询开票详细
export function getInvoice(id) {
  return request({
    url: '/system/invoice/' + id,
    method: 'get'
  })
}

// 新增开票
export function addInvoice(data) {
  return request({
    url: '/system/invoice',
    method: 'post',
    data: data
  })
}

// 修改开票
export function updateInvoice(data) {
  return request({
    url: '/system/invoice',
    method: 'put',
    data: data
  })
}

// 删除开票
export function delInvoice(id) {
  return request({
    url: '/system/invoice/' + id,
    method: 'delete'
  })
}
