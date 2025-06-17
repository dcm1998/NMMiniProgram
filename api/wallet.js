/*
 * @Author: YinXuan
 * @Date: 2024-02-23 09:51:30
 * @LastEditTime: 2024-03-19 09:59:10
 * @Description: 钱包api
 */
import request from '@/utils/request'

// 钱包充值 预下单
export const postAccountBill = data => request.post('/xcy/parking/accountBill', data, 'form')
// 钱包充值 支付成功回调
export const postAccountBillSuccessCallback = data =>
  request.post('/xcy/parking/accountBill/paySuccessCallback', data, 'form')
// 钱包提现
export const postAccountRefund = data => request.post('/xcy/parking/accountBill/refund', data, 'form')
// 查询充电账户账单记录列表
export const getParkingAccountBillList = data => request.get('/xcy/parking/accountBill/list', data, 'form', false)
