import request from '@/utils/request.js'
/**
 * 获取列表数据
 * @param {*} params
 * @returns
 */
export const getArticleList = params => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
