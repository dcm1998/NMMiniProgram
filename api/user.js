/*
 * @Author: YinXuan
 * @Date: 2023-09-01 16:05:10
 * @LastEditTime: 2024-03-17 10:57:31
 * @Description: 小程序的nginx代理为 /nc
 */
import request from '@/utils/request'

// 获取手机验证码
export const getPhoneCode = data => request.get('/xcy/sys/msgCode/createMsgCode/' + data)
// 微信小程序一键登录
export const postWeChatLogin = data => request.post('/xcy/sys/user/loginWeiXin', data)
// 微信小程序退出登录
export const deleteWeChatLogout = data => request.delete('/xcy/sys/user/logout', data)
// 修改用户信息
export const postWeChatUserInfo = data => request.post('/xcy/user/modifySysUserInfoAllByChat', data)
// 手机验证码登录
export const postUserCodeLogin = data => request.post('/xcy/sys/user/loginApplet', data, 'form')
// 小程序端登录、注册调用，访问 + 1
export const postAddOnceApplet = data => request.post('/xcy/sys/amount/addOnceApplet', data, 'json', false)
// 查询用户协议
export const getAgreementInfo = data => request.get('/xcy/sys/agreement/info', data)
// 微信自动验证手机号
export const postValidePhoneNumber = data => request.post('/xcy/sys/msgCode/getUserPhoneNumber', data)
// 账户余额接口
export const getAccountBalance = data => request.get('/xcy/user/queryAccountBalance', data, 'json', false)
// 第三方小程序登录
export const postLoginOtherMiniProgram = data => request.post('/xcy/sys/user/loginOther', data, 'form', false)
