/*
 * @Author: YinXuan
 * @Date: 2023-09-18 10:49:56
 * @LastEditTime: 2024-03-19 09:56:26
 * @Description: 公告管理api
 */
import request from '@/utils/request'

// 查询公告列表
export const getNoticeList = data => request.get('/xcy/sys/notice/list', data)

// 取消预约
export const cancelReserve = data => request.post('/xcy/reservation/cancelReservation', data)
