/*
 * @Author: YinXuan
 * @Date: 2023-09-01 16:04:04
 * @LastEditTime: 2025-04-15 10:47:52
 * @Description:
 */
import { getStorageSync } from './utils'
import { BASE_URL } from '@/config/index'
import RequestManager from '@/utils/requestManager.js'

const manager = new RequestManager()

const baseRequest = async (url, method, data = {}, type = 'json', loading = true) => {
  let requestId = manager.generateId(method, url, data)
  if (!requestId) {
    console.log('重复请求')
  }
  if (!requestId) return false

  const header = {}
  header.Authorization = 'Bearer ' + getStorageSync('token') || ''
  if (type === 'form') {
    header['content-type'] = 'application/x-www-form-urlencoded'
  }
  return new Promise((reslove, reject) => {
    loading && uni.showLoading({ title: '加急请求中...', mask: true })
    uni.request({
      url: BASE_URL + url,
      method: method || 'get',
      header: header,
      timeout: 600000,
      data: data || {},
      complete: () => {
        setTimeout(() => {
          uni.hideLoading()
        }, 1000)
        manager.deleteById(requestId)
      },
      success: successData => {
        const res = successData.data
        if (res.code == 200) {
          reslove(res.data || res)
        } else if (res.code === 401) {
          console.log('接口401 要重新登录')
          uni.setStorageSync('hasLogin', false)
          uni.removeStorageSync('token')
          uni.removeStorageSync('userInfo')
          uni.removeStorageSync('warehouseInfo')
          uni.removeStorageSync('defaultCarInfo')
          // var pages = getCurrentPages() // 获取栈实例
          // let currentRoute = pages[pages.length - 1].route // 获取当前页面路由
          // if (currentRoute !== 'pagesStore/login') {
          //   uni.showToast({
          //     title: '请先登录',
          //     icon: 'none',
          //     duration: 2000,
          //     complete: function () {
          //       uni.reLaunch({
          //         url: '/pagesStore/login'
          //       })
          //     }
          //   })
          // }
        } else {
          const { msg } = res
          uni.showToast({
            title: msg || '网络连接失败，请稍后重试',
            icon: 'none',
            duration: 2000
          })
          reject(res)
        }
      },
      fail: msg => {
        uni.showToast({
          title: '网络连接失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
        reject(msg)
      }
    })
  })
}

const request = {}

;['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach(method => {
  request[method] = (api, data, type, loading) => baseRequest(api, method, data, type, loading)
})

export default request
