/*
 * @Author: YinXuan
 * @Date: 2023-09-22 15:10:30
 * @LastEditTime: 2024-03-19 10:00:01
 * @Description: 发票抬头api
 */
import request from '@/utils/request'

// 新增发票抬头
export const postSaveInvoiceTitle = data => request.post('/xcy/parking/invoiceTitle', data, 'form')
// 查询发票抬头列表
export const getInvoiceTitleList = data => request.get('/xcy/parking/invoiceTitle/list', data)
// 修改 发票抬头
export const putInvoiceTitle = data => request.put('/xcy/parking/invoiceTitle', data, 'form')
// 批量、单个删除 发票抬头
export const deleteInvoiceTitle = data => request.delete('/xcy/parking/invoiceTitle/' + data)
// 开发票
export const postSaveInvoiceRecord = data => request.post('/xcy/parking/invoiceRecord', data, 'form')
// 发票管理列表
export const getInvoiceRecordList = data => request.get('/xcy/parking/invoiceRecord/list', data, 'form', false)
