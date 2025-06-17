/*
 * @Author: YinXuan
 * @Date: 2023-09-18 10:49:56
 * @LastEditTime: 2024-03-19 09:55:04
 * @Description: 车辆管理api
 */
import request from '@/utils/request'

// 查询用户车辆列表
export const getCarList = data => request.get('/xcy/sys/car/list/', data, 'json', false)
// 新增用户车辆
export const postCarAdd = data => request.post('/xcy/sys/car', data, 'form')
// 修改用户车辆
export const putCarEdit = data => request.put('/xcy/sys/car', data, 'form', false)
// 批量、单个删除用户车辆
export const deleteCarBatch = data => request.delete('/xcy/sys/car/' + data)
// 无牌车登记 获取openId
export const postNoPlateRegister = data => request.post('/xcy/sys/user/noPlateRegister', data, 'form', false)
// 无牌车 入场
export const postNoPlateIn = data => request.post('/xcy/parking/order/noPlateIn', data, 'form', false)
// 无牌车 出场
export const postNoPlateOut = data => request.post('/xcy/parking/order/noPlateOut', data, 'form', false)
// 临停缴费-微信 预下单
export const postPaymentTemporary = data => request.post('/xcy/parking/order/paymentTemporary', data, 'form', false)
