<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
  <view class="tqb-tabbar">
    <view class="tqb-tabbar-body">
      <view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index" @click="switchClick(item)">
        <view class="tabbar-item-body">
          <view class="tabbar-item-icon">
            <image :src="pageCur == item.pageCur ? item.selectedIconPath : item.iconPath"
              style="width: 52rpx; height: 52rpx"></image>
          </view>
          <view :class="[pageCur == item.pageCur ? 'active' : '', 'tab-bar-text']">{{ item.text }}</view>
        </view>
        <!-- <view v-else class="add-icon" :class="safeBottom === 0 ? 'no-safe-bottom' : 'safe-bottom'">
          <view class="scan_icon"></view>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageCur: 'home',
      tabBarList: [
        {
          text: '编队信息',
          iconPath: '/static/tqb-tabbar/truck_off.png',
          selectedIconPath: '/static/tqb-tabbar/truck_on.png',
          pagePath: '/pages/index/index',
          pageCur: 'home'
        },
        {
          text: '运单动态',
          iconPath: '/static/tqb-tabbar/message_off.png',
          selectedIconPath: '/static/tqb-tabbar/message_on.png',
          pagePath: '/pages/index/index',
          pageCur: 'order'
        },
        // {
        //   // text: "停车充电",
        //   iconPath: '/static/tqb-tabbar/scan.png',
        //   selectedIconPath: '/static/tqb-tabbar/scan.png',
        //   pagePath: '/pages/index/index',
        //   pageCur: 'charge'
        // },
        {
          text: '运单统计',
          iconPath: '/static/tqb-tabbar/waybill_off.png',
          selectedIconPath: '/static/tqb-tabbar/waybill_on.png',
          pagePath: '/pages/index/index',
          pageCur: 'news'
        },
        {
          text: '我的',
          iconPath: '/static/tqb-tabbar/work_off.png',
          selectedIconPath: '/static/tqb-tabbar/work_on.png',
          pagePath: '/pages/index/index',
          pageCur: 'me'
        }
      ],
      safeBottom: 0
    }
  },
  mounted() {
    let that = this
    uni.getSystemInfo({
      success(system) {
        // 获取底部安全区域的高度
        that.safeBottom = system.screenHeight - system.safeArea.bottom
      }
    })
  },
  methods: {
    switchClick(item) {
      if (item.pageCur === this.pageCur) {
        return
      }
      if (item.pageCur === 'charge') {

        uni.showToast({
          title: "敬请期待~",
          icon: "none",
          duration: 2000,
        });
        return

        let that = this
        // 调起条码扫描
        uni.scanCode({
          onlyFromCamera: true, // 是否只能从相机扫码，不允许从相册选择图片
          scanType: ['qrCode'], // 扫码类型 qrCode二维码
          autoZoom: false, // 是否启用自动放大，默认启用
          success: function (res) {
            that.parseQRCode(res)
          },
          fail: function (err) {
            console.log(`错误：${err}`)
          },
          complete: function (data) {
            console.log('扫码完成')
          }
        })
        return
      }
      this.pageCur = item.pageCur
      this.$emit('NavChange', item.pageCur)
    },
    routePage(url) {
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tqb-tabbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.tqb-tabbar-body {
  height: calc(100rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 1001;

  .tqb-tabbar-item {
    flex: 1;
    display: flex;
    justify-content: center;
    text-align: center;
    position: relative;

    .tabbar-item-icon {
      display: flex;
      justify-content: center;
    }

    .tab-bar-text {
      color: #000000;
      margin-top: 9rpx;
      font-size: 20rpx;
      font-weight: 400;
    }

    .active {
      color: #246bfd;
    }

    // .add-icon {
    //   position: absolute;

    //   .scan_icon {
    //     width: 120rpx;
    //     height: 134rpx;
    //     background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/152224.png');
    //     background-size: 100% 100%;
    //     background-repeat: no-repeat;
    //     border-radius: 50%;
    //     /* 创建圆形 */
    //     background-color: radial-gradient(circle at center,
    //         rgba(139, 166, 252, 0.5),
    //         rgba(139, 166, 252, 0.9));
    //     /* 径向渐变背景 */
    //     box-shadow: 0rpx -10rpx 40rpx 10rpx rgba(149, 225, 255, 0.5);
    //     /* 斜向渐变阴影 */
    //   }
    // }

    .no-safe-bottom {
      top: -100rpx;
    }

    .safe-bottom {
      top: -120rpx;
    }
  }
}
</style>
