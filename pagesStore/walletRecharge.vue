<script>
import { postAccountBill, postAccountBillSuccessCallback } from '@/api/wallet.js'
export default {
  data() {
    return {
      isCheck: false,
      isLoading: false,
      accountBalance: null,
      numberList: [50, 100, 150, 200, 300, 500],
      chooseIndex: null
    }
  },
  watch: {
    accountBalance(val) {
      let isHave = this.numberList.includes(Number(val))
      if (!isHave) {
        this.chooseIndex = null
      }
    }
  },
  methods: {
    checkClick() {
      this.isCheck = !this.isCheck
    },
    chooseCell(item, index) {
      if (this.chooseIndex === index) {
        this.chooseIndex = null
        this.accountBalance = null
      } else {
        this.chooseIndex = index
        this.accountBalance = item
      }
    },
    handlePay() {
      if (!this.accountBalance) {
        return this.$utils.toast('充值金额必填～')
      }
      this.isLoading = true
      this.isCheck = true
      let that = this
      let params = {
        transferAmount: this.accountBalance
      }
      postAccountBill(params)
        .then(res => {
          that.payFun(res)
        })
        .finally(res => {
          this.isLoading = false
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
          let params = {
            tradeId: res.tradeId
          }
          postAccountBillSuccessCallback(params).then(item => {
            uni.showToast({
              title: '充值成功~',
              icon: 'none',
              duration: 2000,
              complete: function () {
                setTimeout(() => {
                  uni.navigateBack()
                }, 1000)
              }
            })
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
  }
}
</script>
<template>
  <view class="pay-plate-detail">
    <cu-custom
      bgImage="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-21/1703145140335Theme=Light@2x.png"
      :isBack="true"
    >
      <block slot="content">充值</block>
    </cu-custom>
    <view class="cell">
      <view class="top-cell flex item-center">
        <view class="top-cell-title">
          <view class="title"> 充电账户充值 </view>
          <view class="desc"> Account recharge </view>
        </view>
        <image
          src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-02-22/1708584553284image 1131@2x.png"
          mode="aspectFit"
        ></image>
      </view>
      <view class="form_cell">
        <view class="title"> 充值金额 </view>
        <view>
          <u-input
            v-model="accountBalance"
            type="digit"
            border="none"
            placeholder="请输入充值金额"
            clearable
            fontSize="38rpx"
            color="#212121"
            :placeholderStyle="{ color: '#212121' }"
            :customStyle="{
              fontWeight: 500,
              paddingLeft: '0',
              paddingBottom: '22rpx',
              borderBottom: '2rpx solid rgba(189,189,189,0.2)'
            }"
            prefixIcon="rmb"
            prefixIconStyle="font-size: 28rpx;font-weight: 500;color: #212121"
          ></u-input>
        </view>
        <view class="choose">
          <u-grid :border="false" col="3">
            <u-grid-item v-for="(item, index) in numberList" :key="index" @click="chooseCell(item, index)">
              <view class="choose_cell" :class="chooseIndex === index ? 'active' : ''">{{ item }}</view>
            </u-grid-item>
          </u-grid>
        </view>
      </view>
      <view class="w-full">
        <button @tap="handlePay" class="submit-btn" :loading="isLoading">充值</button>
      </view>
      <view class="flex item-center justify-center">
        <radio
          @click="checkClick"
          class="tips-radio"
          shape="circle"
          :checked="isCheck"
          color="#f37b1d"
          style="transform: scale(0.7)"
        ></radio>
        <view class="tips-word">
          开通即代表已阅读<span class="tips-desc" style="margin-left: 10rpx">《充值协议》</span>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
radio .wx-radio-input {
  border-radius: 50%;
  width: 36rpx;
  height: 36rpx;
  border-color: #87858a;
}
radio .wx-radio-input.wx-radio-input-checked {
  border-color: #246bfd !important;
  background: #246bfd !important;
}
radio .wx-radio-input.wx-radio-input-checked::before {
  border-radius: 50%;
  width: 30rpx;
  height: 30rpx;
  content: '';
  background-color: #246bfd;
}
radio::before {
  right: 4rpx !important;
}
</style>
<style lang="scss" scoped>
.pay-plate-detail {
  .cell {
    padding: 40rpx 32rpx 0;
    .top-cell {
      margin-bottom: 20rpx;
      .top-cell-title {
        margin-right: 8rpx;
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
        margin-left: -40rpx;
      }
    }
    .form_cell {
      padding: 32rpx;
      border-radius: 20rpx;
      background-color: #fff;
      .title {
        font-size: 32rpx;
        font-weight: 500;
        color: #212121;
        line-height: 35rpx;
        margin-bottom: 44rpx;
      }
      .choose {
        margin-top: 32rpx;
        .choose_cell {
          width: calc(100% - 20rpx);
          text-align: center;
          height: 104rpx;
          line-height: 104rpx;
          background: #f3f5f7;
          border-radius: 20rpx;
          margin-bottom: 20rpx;
          font-size: 40rpx;
          font-weight: 500;
          color: #616161;
          &.active {
            color: #ffffff;
            background: linear-gradient(315deg, #246bfd 0%, #6f9eff 100%);
          }
        }
      }
    }
    .tips-radio {
      margin-right: 8rpx;
    }
    .tips-word {
      font-size: 24rpx;
      color: #9e9e9e;
      .tips-desc {
        font-size: 24rpx;
        color: #246bfd;
      }
    }
  }
}
</style>
