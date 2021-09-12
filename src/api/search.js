import request from '@/utils/request.js'
/**
 *获取搜索建议
 * @returns
 */
export const getSearchSuggestion = q => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

export const getSearchResults = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
