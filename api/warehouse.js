/*
 * @Author: YinXuan
 * @Date: 2023-09-22 15:10:30
 * @LastEditTime: 2023-11-17 13:24:54
 * @Description: 场库api
 */
import request from '@/utils/request'

// 获取所有场库列表
export const getWarehouseList = data => request.get('/xcy/manage/warehouse/list', data, 'json', false)
