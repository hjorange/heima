import request from '@/utils/request.js'

/**
 * 发送验证码的请求
 * @param {*} mobile 传入的参数
 *
 */
export const sendCode = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}

/**
 * 获取用户频道信息
 * 请求头已封装
 * @returns
 */
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'

  })
}

/**
 * 关注用户
 * @param {*} target
 * @returns
 */
export const addFollowUser = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }

  })
}

/**
 * 取消关注用户
 * @param {*} target
 * @returns
 */
export const removeFollowUser = target => {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'

  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

/**
 * 编辑用户个人资料（包含实名认证）
 * @param {*} data
 * @returns
 */
export const updataUserProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
/**
 * 编辑用户照片资料（头像、身份证照片）
 * @param {*} data
 * @returns
 */
export const updataUserAvatar = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
