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

/**
 * 获取文章列表详情页面
 * @param {*} id
 * @returns
 */
export const getArticleDetail = (id) => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}

/**
 * 收藏文章
 * @param {*} target
 * @returns
 */
export const addCollected = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {*} target
 * @returns
 */
export const removeCollected = target => {
  return request({
    url: '/v1_0/article/collections/' + target,
    method: 'DELETE',
    data: {
      target
    }
  })
}

/**
 * 获取评论或评论回复
 * @param {*} pasams
 * @returns
 */
export const getCommentList = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

/**
 * 对文章点赞
 * @param {*} target
 * @returns
 */
export const getCollect = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消对文章点赞
 * @param {*} target
 * @returns
 */
export const removeCollect = target => {
  return request({
    url: '/v1_0/article/likings/' + target,
    method: 'DELETE',
    data: {
      target
    }
  })
}

/**
 * 发布评论
 * @param {*} data
 * @returns
 */
export const postComment = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
