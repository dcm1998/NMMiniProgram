/*
 * @Author: YinXuan
 * @Date: 2023-09-15 14:13:08
 * @LastEditTime: 2025-06-03 13:49:55
 * @Description: 添加路由拦截器，不在白名单内的页面须登录才能访问
 */
//白名单 不需要验证token
const whiteList = [
  '/pages/index/index',
  '/pagesStore/login',
  '/pagesStore/agreementInfo',
  '/pagesStore/privacyPolicy',
  '/pagesStore/carRegisterIn',
  '/pagesStore/carRegisterOut',
  '/pagesStore/wayBillDetail'
]
//登录页
const loginPage = '/pagesStore/login'
export default function initPermission() {
  /**
   * 页面跳转拦截器
   */
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  list.forEach(item => {
    //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
    uni.addInterceptor(item, {
      invoke(e) {
        // 调用前拦截
        // console.log('拦截', e)
        const userInfo = uni.getStorageSync('userInfo')
        //获取用户的token
        const token = uni.getStorageSync('token'),
          //获取要跳转的页面路径（url去掉"?"和"?"后的参数）
          url = e.url.split('?')[0]
        let notNeed = whiteList.includes(url)
        // 如果在whiteList里面就不需要登录
        if (notNeed) {
          return e
        } else {
          //需要登录
          if (!token) {
            uni.showToast({
              title: '请先登录',
              icon: 'none'
            })
            uni.reLaunch({
              url: loginPage
            })
            return false
          } else {
            if (!userInfo?.phoneNumber && url !== '/pagesStore/editUser') {
              uni.showToast({
                title: '手机号码必填~',
                duration: 2000,
                icon: 'none',
                complete: function () {
                  setTimeout(() => {
                    uni.navigateTo({
                      url: '/pagesStore/editUser'
                    })
                  }, 1000)
                }
              })
              return false
            } else {
              return e
            }
          }
        }
      },
      fail(err) {
        // 失败回调拦截
        console.log(err)
      }
    })
  })
}
