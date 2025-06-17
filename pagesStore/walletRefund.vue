<script>
import { postAccountRefund } from '@/api/wallet.js'
import { getAccountBalance } from '@/api/user.js'
export default {
  data() {
    return {
      accountBalance: null,
      isLoading: false
    }
  },
  onShow() {
    let that = this
    getAccountBalance({}).then(res => {
      that.accountBalance = res.accountBalance
    })
  },
  methods: {
    handlePay() {
      this.isLoading = true
      let that = this
      postAccountRefund({})
        .then(res => {
          uni.showToast({
            title: '提现成功~',
            icon: 'none',
            duration: 2000,
            complete: function () {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        })
        .finally(res => {
          this.isLoading = false
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
      <block slot="content">提现</block>
    </cu-custom>
    <view class="cell">
      <view class="top-cell flex item-center">
        <view class="top-cell-title">
          <view class="title"> 充电账户提现 </view>
          <view class="desc"> Account refund </view>
        </view>
        <image
          src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-02-22/1708584553284image 1131@2x.png"
          mode="aspectFit"
        ></image>
      </view>
      <view class="form_cell">
        <view class="title"> 提现金额 </view>
        <view>
          <u-input
            v-model="accountBalance"
            type="digit"
            disabled
            border="none"
            :placeholder="accountBalance"
            clearable
            fontSize="38rpx"
            color="#212121"
            :placeholderStyle="{ color: '#212121' }"
            :customStyle="{
              fontWeight: 500,
              paddingLeft: '0',
              paddingTop: '22rpx',
              paddingBottom: '22rpx',
              borderBottom: '2rpx solid rgba(189,189,189,0.2)'
            }"
            prefixIcon="rmb"
            prefixIconStyle="font-size: 28rpx;font-weight: 500;color: #212121"
          ></u-input>
        </view>
        <view class="desc">
          可提现余额: <text class="number"> {{ accountBalance || '0.00' }}元 </text>
          <text class="tips"> 将在24小时内到账 </text>
        </view>
      </view>
      <view class="w-full">
        <button @tap="handlePay" class="submit-btn" :loading="isLoading" :disabled="!accountBalance">提现</button>
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
        margin-bottom: 40rpx;
      }
      .desc {
        margin-top: 20rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #212121;
        line-height: 28rpx;
        .number {
          margin-left: 16rpx;
          color: #246bfd;
        }
        .tips {
          margin-left: 16rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: #9e9e9e;
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
