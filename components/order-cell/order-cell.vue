<script>
export default {
  data() {
    return {}
  },
  props: {
    //数据源
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    routeToInvoice(item) {
      return this.$utils.toast('功能暂未开放~')
      // functionType 功能类型：1停车，2会员，3充电
      // uni.navigateTo({
      //   url: `/pagesCharge/openInvoice?functionId=${item.id}&money=${item.paymentAmount}&functionType=1`
      // })
    },
    handleGoPay(params) {
      uni.navigateTo({
        url: '/pagesStore/payPlateDetail?id=' + params.id
      })
    }
  },
  mounted() {}
}
</script>

<template>
  <view class="order_cell">
    <view class="car_img"> </view>
    <view class="top flex justify-between item-center">
      <view class="top_title flex item-center">
        {{ item.plateNo }}
      </view>
      <view
        class="top_status flex item-center"
        :style="item.payStatus === 5 ? 'background-color: #00AD2E' : 'background-color: #FF8C12'"
      >
        <view class="dot"> </view>
        <view>{{ item.payStatus === 5 ? '已完成' : '进行中' }}</view>
      </view>
    </view>
    <view class="center">
      <view class="center_name">
        {{ item.warehouseName || '-' }}
      </view>
      <view class="center_cell">
        <view class="center_title flex item-center">
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-05/101535.png"
            mode="aspectFit"
          ></image>
          <view>开始时间:</view>
        </view>
        <view class="center_desc">
          {{ item.beginParkingTime || '-' }}
        </view>
      </view>
      <view class="center_cell">
        <view class="center_title flex item-center">
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-05/101603.png"
            mode="aspectFit"
          ></image>
          <view>结束时间:</view>
        </view>
        <view class="center_desc">
          {{ item.endParkingTime || '-' }}
        </view>
      </view>
      <view class="center_cell">
        <view class="center_title flex item-center">
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-05/101616.png"
            mode="aspectFit"
          ></image>
          停车时长:
        </view>
        <view class="center_desc"> {{ item.parkingDuration || '0' }}分钟 </view>
      </view>
    </view>
    <template v-if="item.payStatus === 5">
      <view class="bottom flex justify-between item-center">
        <view class="price">
          <text class="tips">￥</text>
          {{ item.paymentAmount || '0' }}
        </view>
        <template v-if="item.invoiceId">
          <view class="btn-disable"> 已开票 </view>
        </template>
        <template v-else>
          <view class="btn" @click="routeToInvoice(item)"> 开发票 </view>
        </template>
      </view>
    </template>
    <template v-else>
      <view class="bottom flex justify-between item-center">
        <view class="price">
          <text class="tips">￥</text>
          {{ item.paymentAmount || '0' }}
        </view>
        <view class="btn" @click="handleGoPay(item)"> 去支付 </view>
      </view>
    </template>
  </view>
</template>
<style lang="scss" scoped>
.order_cell {
  background: linear-gradient(180deg, #c5e1ff 0%, #f7fcff 100%);
  border-radius: 32rpx 32rpx 32rpx 32rpx;
  border: 3rpx solid #ffffff;
  padding: 36rpx 24rpx 24rpx 74rpx;
  position: relative;
  .car_img {
    position: absolute;
    left: -50rpx;
    top: 24rpx;
    width: 100rpx;
    height: 100rpx;
    background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-05/101514.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .top {
    margin-bottom: 16rpx;
    .top_title {
      font-weight: 700;
      font-size: 48rpx;
      color: #2a304a;
      line-height: 67rpx;
    }
    .top_status {
      border-radius: 42rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #ffffff;
      line-height: 34rpx;
      padding: 8rpx 12rpx;
      .dot {
        width: 10rpx;
        height: 10rpx;
        background: #ffffff;
        border-radius: 50%;
        margin-right: 12rpx;
      }
    }
  }
  .center {
    .center_name {
      font-weight: 700;
      font-size: 28rpx;
      color: #2a304a;
      line-height: 39rpx;
      margin-bottom: 32rpx;
    }
    .center_cell {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      &:last-child {
        margin-bottom: 34rpx;
      }
      .center_title {
        font-weight: 400;
        font-size: 24rpx;
        color: #2a304a;
        line-height: 34rpx;
        margin-right: 20rpx;
        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 16rpx;
        }
      }

      .center_desc {
        font-weight: 400;
        font-size: 24rpx;
        color: #535a6f;
        line-height: 34rpx;
        word-break: keep-all;
      }
    }
  }
  .bottom {
    .price {
      font-size: 48rpx;
      color: #ea0000;
      font-weight: bold;
      .tips {
        font-size: 28rpx;
      }
    }
    .btn {
      width: 96rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: #5c89ff;
      border-radius: 40rpx;
      text-align: center;
      box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(11, 38, 108, 0.3);
      border: 1rpx solid #ffffff;
      font-weight: 400;
      font-size: 20rpx;
      color: #ffffff;
    }
    .btn-disable {
      width: 96rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: #a0a7c2;
      border-radius: 40rpx;
      text-align: center;
      box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(11, 38, 108, 0.3);
      border: 1rpx solid #ffffff;
      font-weight: 400;
      font-size: 20rpx;
      color: #ffffff;
    }
  }
}
</style>
