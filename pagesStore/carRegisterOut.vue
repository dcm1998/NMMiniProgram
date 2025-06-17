<!--
 * @Author: YinXuan
 * @Date: 2024-03-12 14:10:46
 * @LastEditTime: 2024-03-19 09:40:46
 * @Description: 无牌车辆扫码登记出场
-->
<script>
import { postNoPlateRegister, postNoPlateOut } from '@/api/car'
import { postOrderPaySuccessCallback } from '@/api/order.js'
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
            postNoPlateOut(temp).then(result => {
              if (result.code === 507) {
                uni.showToast({
                  title: '当前停车订单0元，无需支付~',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                that.payFun(result)
              }
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
    },
    payFun(res) {
      this.isLoading = true
      let that = this
      uni.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        success: function (result) {
          //支付成功的回调    成功之后你想做什么在这里操作  比如弹窗一个提示:支付成功等
          uni.showToast({
            title: '出场成功~',
            icon: 'none',
            duration: 2000
          })
          let params = {
            tradeId: res.tradeId
          }
          postOrderPaySuccessCallback(params).then(item => {
            console.log('停车订单 支付成功回调 item: ', item)
          })
        },
        fail: function (err) {
          console.log('支付失败的回调：', err)
        },
        complete: function (res) {
          that.isLoading = false
        }
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
    if (params.no) {
      this.gateNo = params.no
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
      <block slot="content">无牌车辆出场</block>
    </cu-custom>
    <view class="car-register">
      <view class="cell">
        <view class="top-cell flex item-center justify-center">
          <view class="top-cell-title">
            <view class="title"> 无牌车辆出场 </view>
            <view class="desc"> car register </view>
          </view>
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-11-23/1700732358691image 1085@2x.png"
            mode="aspectFit"
          ></image>
        </view>
        <!-- <view class="w-full">
          <button @tap="handleSave" class="submit-btn" :loading="isLoading">确认</button>
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
