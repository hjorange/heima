import request from '@/utils/request.js'
/**
 *获取全部频道列表
 * @returns
 */
export const getAllList = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

/**
 *批量修改用户频道列表（部分覆盖）
 * @param {*} channel里面传入对象{id，seq}
 * @returns
 */
export const addUserChannel = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 *
 * @param {*} id 传入参数
 * @returns
 */
export const deleteUserChannel = id => {
  return request({
    url: 'v1_0/user/channels/' + id,
    method: 'DELETE'
  })
}
