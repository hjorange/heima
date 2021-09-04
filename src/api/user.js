import request from '@/utils/request.js'
/**
 * 发送验证码的请求
 * @param {*} mobile 传入的参数
 *
 */
export const sendCode = (mobile) => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile
  })
}
export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
