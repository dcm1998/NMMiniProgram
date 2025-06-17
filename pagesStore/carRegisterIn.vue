<!--
 * @Author: YinXuan
 * @Date: 2024-03-12 14:10:46
 * @LastEditTime: 2024-03-16 10:53:54
 * @Description: 无牌车辆扫码登记入场
-->
<script>
import { postNoPlateRegister, postNoPlateIn } from '@/api/car'
export default {
  data() {
    return {
      gateNo: null
    }
  },
  methods: {
    handleSave() {
      let that = this
      let loginCode = that.getLoginCode()
      loginCode.then(res => {
        return new Promise((resolve, reject) => {
          const { code } = res
          if (!code) {
            uni.showToast({
              title: '授权失败',
              icon: 'error'
            })
            return
          }
          let params = {
            code: code
          }
          // 接口获取当前用户openId
          postNoPlateRegister(params).then(res => {
            let temp = {
              openId: res.openId,
              gateNo: that.gateNo
            }
            postNoPlateIn(temp).then(res => {
              uni.showToast({
                title: '入场成功～',
                icon: 'none',
                duration: 2000
              })
            })
          })
        })
      })
    },
    getLoginCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: loginRes => {
            resolve(loginRes)
          }
        })
      })
    }
  },
  onLoad(options) {
    let urlStr = decodeURIComponent(options.q) // 获取到二维码原始链接内容
    let url = ''
    if (typeof urlStr == 'undefined') {
      url = decodeURI(location.search) //获取url中"?"符后的字符串
    } else {
      url = '?' + urlStr.split('?')[1]
    }
    let params = {}
    if (url.indexOf('?') != -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
      }
    }
    if (params.gateNo) {
      this.gateNo = params.gateNo
      this.handleSave()
    } else {
      uni.showToast({
        title: 'code获取失败,请重新扫码～',
        icon: 'none',
        duration: 2000
      })
    }
  }
}
</script>

<template>
  <view>
    <cu-custom
      bgImage="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-21/1703145140335Theme=Light@2x.png"
    >
      <block slot="content">无牌车辆入场</block>
    </cu-custom>
    <view class="car-register">
      <view class="cell">
        <view class="top-cell flex item-center justify-center">
          <view class="top-cell-title">
            <view class="title"> 无牌车辆入场 </view>
            <view class="desc"> car register </view>
          </view>
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-11-23/1700732358691image 1085@2x.png"
            mode="aspectFit"
          ></image>
        </view>
        <!-- <view class="w-full">
          <button @tap="handleSave" class="submit-btn">确认</button>
        </view> -->
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.car-register {
  .cell {
    padding: 40rpx 32rpx 0;
    .top-cell {
      .top-cell-title {
        .title {
          font-size: 40rpx;
          font-weight: bold;
          color: #212121;
          margin-bottom: 8rpx;
        }
        .desc {
          font-size: 28rpx;
          font-weight: 400;
          color: #9e9e9e;
        }
      }
      image {
        width: 284rpx;
        height: 200rpx;
      }
    }
  }
}
</style>
