/*
 * @Author: YinXuan
 * @Date: 2024-01-16 14:16:31
 * @LastEditTime: 2024-11-27 13:29:24
 * @Description:
 */
import request from '@/utils/request'

// 查询基站列表
export const getAllStation = data => request.get('/xcy/device/gate/getAllStation', data, 'json', false)
// 查询基站坐标列表
export const getGraph = data => request.get('/xcy/device/gate/getGraph', data, 'json', false)

//根据车牌查询车位
export const queryParkingSpaceByPlateNo = data =>
  request.get('/xcy/manage/parkingManage/queryParkingSpaceByPlateNo', data, 'json', false)
//获取预约详情
export const getReservationInfo = data => request.get('/xcy/reservation/info', data)

//完成预约
export const finishReservation = data => request.post('/xcy/reservation/finishReservation', data)
//取消预约
export const cancelReservation = data => request.post('/xcy/reservation/cancelReservation', data)
