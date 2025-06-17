/*
 * @Author: YinXuan
 * @Date: 2025-04-03 15:57:06
 * @LastEditTime: 2025-04-09 11:17:16
 * @Description: AI api
 */
import request from '@/utils/request'

// 聊天
export const postDeepSeekChat = data => request.post('/xcy/deepSeek/deepSeekChat', data)
// 功能助手
export const postDeepSeekFunction = data => request.post('/xcy/deepSeek/deepSeekFunction', data)
// 关闭当前会话 type 对话或功能参数。对话：chat:/function:   包含英文冒号 all 所有对话
export const postDeepSeekClose = data => request.post('/xcy/deepSeek/deepSeekClose', data, 'json', false)
