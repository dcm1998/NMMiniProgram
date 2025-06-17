/*
 * @Author: YinXuan
 * @Date: 2023-09-18 10:49:56
 * @LastEditTime: 2024-11-28 16:34:51
 * @Description: 订单管理api
 */
import request from '@/utils/request'

// 查询停车订单列表
export const getParkingOrderList = data => request.get('/xcy/parking/order/list', data)
// 根据车牌查停车缴费订单
export const getParkingOrderDetail = data => request.post('/xcy/parking/order/queryInfoByPlateNo', data)
// 根据Id查停车缴费订单
export const getParkingOrderDetailById = data => request.post('/xcy/parking/order/queryInfoById', data)
// 停车缴费 预下单
export const putParkingVisitor = data => request.put('/xcy/parking/order', data, 'form')
// 购买套餐 预下单
export const postVipPackageOrder = data => request.post('/xcy/parking/vipPackageUserDetail', data, 'form')
// 个人套餐办理 日套餐 预下单
export const postVipDayOrder = data => request.post('/xcy/parking/vipPackageUserDetail/preOrderOther', data, 'form')
// 个人套餐办理 支付成功回调
export const postVipPaySuccessCallback = data =>
  request.post('/xcy/parking/vipPackageUserDetail/paySuccessCallback', data, 'form', false)
// 停车订单 支付成功回调
export const postOrderPaySuccessCallback = data =>
  request.post('/xcy/parking/order/paySuccessCallback', data, 'form', false)
