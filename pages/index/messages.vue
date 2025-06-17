<!--
 * @Author: WUYuHan
 * @Date: 2025-06-03 13:21:48
 * @LastEditTime: 2025-06-03 13:26:45
 * @Description: 运单统计
-->
<template>
  <view class="template-order">
    <cu-custom>
      <block slot="content">运单统计</block>
    </cu-custom>

    <view class="order-wrap">
      <view class="order-position">
        <view class="waybill_header">
          <view class="header_box"></view>
          <view class="header_text">
            <view class="text">运单号</view>
            <view class="number">0001</view>
          </view>
          <view class="header_status">常规运单</view>
        </view>
        <view class="order_place">
          <view class="start_place">
            <view class="status">发</view>
            <view class="place">
              <view class="header">始发地</view>
              <view class="text">西安市未央区凤城二路帝国大厦A座8234室</view>
            </view>
            <view class="dashed_line"></view>
          </view>
          <view class="dashed-line-vertical"></view>
          <view class="end_place">
            <view class="status">收</view>
            <view class="place">
              <view class="header">目的地</view>
              <view class="text">西安市未央区凤城二路帝国大厦A座8234室</view>
            </view>
          </view>
        </view>
        <view class="floot">
          <view class="input">
            <view class="title">运输量</view>
            <view class="content">122,000kg</view>
          </view>
          <view class="input">
            <view class="title">运输时间</view>
            <view class="content">2025/05/05 12:00:00</view>
          </view>
          <view class="input">
            <view class="title">煤炭种类</view>
            <view class="content">精品蜂窝煤</view>
          </view>
        </view>
        <view class="btn_detail">
          <view class="btn" @click="routePage('/pagesStore/wayBillDetail')">查看详情</view>
        </view>
      </view>
      <!-- <view class="cell-block" @click="showTime = true">
        <view class="name flex item-center">
          <image src="/pagesStore/static/visitor/visitTime.png" class="png" mode="aspectFit"></image>
          访问日期
        </view>
        <u-input v-model="userEdit.visitTime" border="none" placeholder="请选择" disabled disabledColor="#ffffff" clearable
          fontSize="28rpx" color="#9e9e9e" :placeholderStyle="{ color: '#9e9e9e' }" :customStyle="{
            paddingLeft: '0',
            paddingTop: '30rpx',
            paddingBottom: '22rpx',
            borderBottom: '2rpx solid rgba(189,189,189,0.2)'
          }" suffixIcon="arrow-down" suffixIconStyle="color: #9e9e9e"></u-input>
      </view> -->

    </view>
    <u-calendar :show="showTime" mode="single" @confirm="handleConfirmTime" @close="showTime = false" :round="20"
      monthNum="24" closeOnClickOverlay></u-calendar>
  </view>
</template>
<script>
import { getNoticeList, cancelReserve } from '@/api/notice'
export default {
  data() {
    return {
      showTime: false,
    }
  },
  methods: {
    routePage(url) {
      uni.navigateTo({
        url: url
      })
    },
    handleConfirmTime(e) {
      // this.userEdit.visitTime = e[0]
      this.showTime = false
    },
  }
}
</script>

<style lang="scss" scoped>
.template-order {
  .tabs-swiper {
    font-weight: 500;
    font-size: 28rpx;
    color: #2a304a;
    line-height: 39rpx;
    padding-bottom: 20rpx;
  }

  .order-wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 188rpx - 120rpx);
    width: 100%;
    align-items: center;

    .order-position {
      width: 92%;
      height: 814rpx;
      background: #FFFFFF;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 24rpx;

      .waybill_header {
        width: 100%;
        height: 50rpx;
        display: flex;
        align-items: center;

        .header_box {
          width: 8rpx;
          height: 28rpx;
          background: #1562BF;
          margin-right: 8rpx;
        }

        .header_text {
          display: flex;

          .text {
            font-family: PingFang SC, PingFang SC;
            font-weight: 600;
            font-size: 36rpx;
            color: #000000;
            font-style: normal;
            text-transform: none;
          }

          .number {
            width: 108rpx;
            height: 50rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 36rpx;
            color: #1562BF;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-left: 16rpx;
          }
        }

        .header_status {
          width: 128rpx;
          height: 50rpx;
          background: #1562BF;
          border-radius: 64rpx 64rpx 64rpx 64rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #FFFFFF;
          text-align: center;
          line-height: 50rpx;
          cursor: pointer;
          margin-left: auto;
        }
      }

      .order_place {
        width: 100%;
        height: 320rpx;
        position: relative;
        margin-top:16rpx;

        .start_place {
          width: 100%;
          height: 50%;
          display: flex;
          position: relative;

          .status {
            width: 44rpx;
            height: 44rpx;
            background: #FF4141;
            border-radius: 44rpx 44rpx 44rpx 44rpx;
            color: #ffff;
            text-align: center;
            font-size: 24rpx;
            line-height: 44rpx;
          }

          .place {
            width: calc(100% - 44rpx);
            height: 100%;
            padding: 0 15rpx 15rpx 15rpx;
            font-family: PingFang SC, PingFang SC;

            .header {
              font-weight: 400;
              font-size: 32rpx;
              color: #000000;
            }

            .text {
              font-weight: 400;
              font-size: 32rpx;
              color: #666666;
              text-align: left;
              margin-top:16rpx;
            }
          }

          .dashed_line {
            position: absolute;
            left: 10%;
            bottom: 0;
            width: 90%;
            height: 2rpx;
            border-bottom: 2rpx dashed #ccc;
          }
        }

        .dashed-line-vertical {
          position: absolute;
          height: 100rpx;
          left: 20rpx;
          top: 54rpx;
          bottom: 0;
          width: 2rpx;
          border-left: 2rpx dashed #ccc;
        }

        .end_place {
          width: 100%;
          height: 50%;
          display: flex;
          padding-top:16rpx;

          .status {
            width: 44rpx;
            height: 44rpx;
            background: rgba(21, 98, 191, 1);
            border-radius: 44rpx 44rpx 44rpx 44rpx;
            color: #ffff;
            text-align: center;
            font-size: 24rpx;
            line-height: 44rpx;
          }
          .place {
            width: calc(100% - 44rpx);
            height: 100%;
            padding: 0 15rpx 15rpx 15rpx;
            font-family: PingFang SC, PingFang SC;

            .header {
              font-weight: 400;
              font-size: 32rpx;
              color: #000000;
            }

            .text {
              font-weight: 400;
              font-size: 32rpx;
              color: #666666;
              text-align: left;
              margin-top:16rpx;
            }
          }
        }
      }

      .floot {
        .input {
          width: 100%;
          height: 70rpx;
          background: #F6F6F6;
          border-radius: 8rpx 8rpx 8rpx 8rpx;
          padding: 16rpx 24rpx;
          display: flex;
          justify-content: space-between;
          font-weight: 400;
          font-size: 28rpx;
          font-family: PingFang SC, PingFang SC;
          margin-top: 16rpx;

          .title {
            color: #666666;
            width:160rpx;
          }

          .content {
            font-weight: 400;
            color: #000000;
            line-height: 38rpx;
            text-align: right;
          }
        }
      }

      .btn_detail {
        width: 100%;
        height: 98rpx;
        display: flex;
        justify-content: center;
        margin-top: 16rpx;
      }

      .btn {
        width: 90%;
        height: 100%;
        background: #FFFFFF;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        border: 1rpx solid #1562BF;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 36rpx;
        color: #1562BF;
        text-align: center;
        line-height: 98rpx;
      }
    }
  }
}

.cell-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;

  .name {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    color: #212121;
    width: 220rpx;
    line-height: 44rpx;

    image {
      width: 36rpx;
      height: 36rpx;
      margin-right: 8rpx;
    }
  }

  .btn {
    border-color: transparent;
    background-color: none !important;
    width: 100rpx !important;
    height: 100rpx !important;
    border-radius: 50% !important;
    padding: 0;
    margin: initial;
    background: transparent;
  }

  .cell-items {
    color: #c0c4cc;
    font-size: 30rpx;
  }
}
</style>
