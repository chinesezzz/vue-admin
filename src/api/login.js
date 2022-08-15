import service from '@/uitls/request';
import axios from 'axios';


/**
 * 登录
 */
export function userLogin(data){
    return service.request({
        method: "post",
        url: "/auth/tokens",
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}


/**
 * 根据实体获取用户角色
 */
export function getRoleByClientID(clientID, token){
    return service.request({
        method: "get",
        url: "/auth/roles",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        params: {'client': clientID}
    })
}

/**
 * 根据实体获取用户组织
 */
export function getOrgByClientID(clientID, roleID, token){
    return service.request({
        method: "get",
        url: "/auth/organizations",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        params: {
            'client': clientID,
            'role': roleID
        }
    })
}

/**
 * 取得仓库信息
 * params: clientId 实体ID, roleId 角色ID, organization 组织ID
 */
export function getUserStorageInfo(clientID, roleID, orgID, token){
    return service.request({
        method: "get",
        url: "/auth/warehouses",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        params: {
            'client': clientID,
            'role': roleID,
            'organization': orgID
        }
    })
}