import request from '@/utils/request'

// 查询项目信息
export function projectList(query) {
    return request({
        url: '/system/project/projectList',
        method: 'get',
        params: query
    })
}

// 新增项目
export function projectInsert(data) {
    return request({
        url: '/system/project/projectInsert',
        method: 'post',
        data: data
    })
}

// 删除项目
export function projectDelete(id) {
    return request({
        url: '/system/project/projectDelete/' + id,
        method: 'get'
        // data: {"projectId":data}
        // data: data
    })
}

// export function projectDelete(id) {
//     return request({
//         url: '/system/project/projectDelete',
//         method: 'get',
//         params: {"projectId":id}
//     })
// }


// export function projectDelete(id) {
//     return request({
//       url: '/system/project/projectDelete/' + id,
//       method: 'delete'
//     })
//   }

// 修改项目
export function projectUpdate(data) {
    return request({
        url: '/system/project/projectUpdate',
        method: 'post',
        data: data
    })
}

// 查询组织信息 
export function projectByProjectId(id) {
    return request({
        url: '/system/project/getProjectByProjectId/' + id,
        method: 'get'
        // params: {"projectId":id}
    })
}

// 查询客户信息
export function getCustomer(query) {
    return request({
        url: '/system/customer/list',
        method: 'get',
        params: query
    })
}

// 查询禀议
export function proposalsList(query) {
    return request({
        url: '/system/proposals/proposalsList',
        method: 'get',
        params: query
    })
}