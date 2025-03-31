import request from '@/utils/request'

// 查询
export function proposalsList(query) {
    return request({
        url: '/system/proposals/proposalsList',
        method: 'get',
        params: query
    })
}

// 新增
export function proposalsInsert(data) {
    return request({
        url: '/system/proposals/proposalsInsert',
        method: 'post',
        data: data
    })
}

// 删除
export function proposalsDelete(id) {
    return request({
        url: '/system/proposals/proposalsDelete/' + id,
        method: 'get'
        // data: {"projectId":data}
        // data: data
    })
}

// 修改
export function proposalsUpdate(data) {
    return request({
        url: '/system/proposals/proposalsUpdate',
        method: 'post',
        data: data
    })
}
