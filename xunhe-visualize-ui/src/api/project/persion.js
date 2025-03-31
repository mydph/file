import request from '@/utils/request'

// 查询
export function persionList(query) {
    return request({
        url: '/system/persion/list',
        method: 'get',
        params: query
    })
}

// 查询详细
export function getPersion(id) {
    return request({
      url: '/system/persion/' + id,
      method: 'get'
    })
  }

// 新增
export function persionInsert(data) {
    return request({
        url: '/system/persion',
        method: 'post',
        data: data
    })
}

// 删除
export function persionDelete(id) {
    return request({
        url: '/system/persion/' + id,
        method: 'delete'
      })
}

// 修改
export function persionUpdate(data) {
    return request({
        url: '/system/persion',
        method: 'put',
        data: data
    })
}
