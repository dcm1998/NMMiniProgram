<!--
 * @Author: YinXuan
 * @Date: 2024-03-13 09:51:21
 * @LastEditTime: 2024-03-19 09:41:09
 * @Description: 临停车辆
-->
<script>
import { postNoPlateRegister, postPaymentTemporary } from '@/api/car'
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
            postPaymentTemporary(temp).then(result => {
              that.payFun(result)
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
            title: '支付成功~',
            icon: 'none',
            duration: 2000,
            complete: function () {
              // setTimeout(() => {
              //   uni.navigateBack()
              // }, 1000)
            }
          })
          console.log('支付成功的回调: ', result)
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
    if (options.stopNo) {
      this.gateNo = options.stopNo
      this.handleSave()
    }
  }
}
</script>

<template>
  <view>
    <cu-custom
      bgImage="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-21/1703145140335Theme=Light@2x.png"
    >
      <block slot="content">临停车辆</block>
    </cu-custom>
    <view class="car-register">
      <view class="cell">
        <view class="top-cell flex item-center justify-center">
          <view class="top-cell-title">
            <view class="title"> 临停车辆 </view>
            <view class="desc"> car register </view>
          </view>
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-11-23/1700732358691image 1085@2x.png"
            mode="aspectFit"
          ></image>
        </view>
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
