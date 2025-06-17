/*
 * @Author: YinXuan
 * @Date: 2024-03-04 09:30:20
 * @LastEditTime: 2024-03-13 14:20:50
 * @Description: 充电站api
 */
import request from '@/utils/request'
// 充电站列表
export const getChargeStationList = data => request.get('/xcy/device/chargeStation/list', data)
//获取充电站详情
export const getChargeStation = data => request.get('/xcy/device/chargeStation/' + data)
//扫码充电-充电枪详情
export const scanCode = data => request.get('/xcy/device/chargeConnector/scanCode/' + data)
//开启充电
export const startCharging = data => request.post('/xcy/parking/chargeOrder/startCharging', data)
//结束充电
export const endCharging = data => request.post('/xcy/parking/chargeOrder/endCharging/', data)
// 充电订单列表
export const getChargeOrderList = data => request.get('/xcy/parking/chargeOrder/list', data)
//充电订单详情
export const getChargeOrder = data => request.get('/xcy/parking/chargeOrder/' + data, data, 'json', false)
