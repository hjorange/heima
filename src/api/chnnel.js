import request from '@/utils/request.js'
/**
 *获取全部频道列表
 * @returns
 */
export const getAllList = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
