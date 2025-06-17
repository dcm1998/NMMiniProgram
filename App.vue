<!--
 * @Author: YinXuan
 * @Date: 2023-08-28 10:22:50
 * @LastEditTime: 2025-05-26 15:01:14
 * @Description: 
-->
<script>
import Vue from 'vue'
import initPermission from '@/utils/permission.js'
export default {
  // 定义全局变量
  globalData: {
    appID: 'wxd1274ffbf7030f7d'
  },
  data() {
    return {
      options: {
        // uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],
        direction: false,
        beat: 20
      },
      locationUtils: undefined,
      position: undefined
    }
  },
  methods: {


  },
  onLaunch: function () {
    initPermission()
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        osName = e.osName
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 4
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
        // #endif
      }
    })
    // #ifdef MP-WEIXIN
    //更新检测
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager &&
        updateManager.onCheckForUpdate(res => {
          if (res.hasUpdate) {
            updateManager.onUpdateReady(() => {
              uni.showModal({
                title: '更新提示',
                content: '新版本已经准备就绪，是否需要重新启动应用？',
                success: res => {
                  if (res.confirm) {
                    uni.clearStorageSync() // 更新完成后刷新storage的数据
                    updateManager.applyUpdate()
                  }
                }
              })
            })
            updateManager.onUpdateFailed(() => {
              uni.showModal({
                title: '已有新版本上线',
                content: '小程序自动更新失败，请删除该小程序后重新搜索打开哟~~~',
                showCancel: false
              })
            })
          } else {
            //没有更新
          }
        })
    } else {
      uni.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请更新到最新的微信后再重试。',
        showCancel: false
      })
    }
    // #endif
  },
  onShow: function (e) {

  },
  onHide: function () {

  },
  onExit: function () {
   
  }
}
</script>

<style lang="scss">
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import '@/uni_modules/uview-ui/index.scss';
@import '/static/css/index.scss';
@import './tuniao-ui/index.scss';
@import './tuniao-ui/iconfont.css';
</style>
