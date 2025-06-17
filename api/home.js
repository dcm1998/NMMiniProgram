/*
 * @Author: YinXuan
 * @Date: 2023-11-02 15:45:29
 * @LastEditTime: 2023-11-17 13:25:41
 * @Description: 首页api
 */
import request from '@/utils/request'

// 查询广告列表
export const getSwiperList = data => request.get('/xcy/parking/advertConfig/list', data, 'json', false)
