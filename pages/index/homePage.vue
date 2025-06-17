<!--
 * @Author: YinXuan
 * @Date: 2023-09-25 15:29:49
 * @LastEditTime: 2025-06-16 10:32:32
 * @Description: 首页
-->
<template>
  <view class="home">
    <cu-custom>
      <block slot="content">编队信息</block>
    </cu-custom>
    <view class="home_wrap">
      <view class="header"> 编队成功 </view>
      <view class="vehicle_content">
        <view class="item_details">
          <view class="header_title">
            <view class="line"></view>
            <view class="text">领航车</view>
          </view>
          <view class="platNo">陕A·555555</view>
          <view class="vehicle_message">
            <view class="item_message">
              <view class="left">电量</view>
              <view class="right">80%</view>
            </view>
            <view class="item_message">
              <view class="left">车辆状态</view>
              <view class="right">编队成功</view>
            </view>
            <view class="item_message">
              <view class="left">集装箱编号</view>
              <view class="right">UESU3002486 <view class="inline"></view>
                <view class="btn" @click="handlePhoto">更换</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <template v-if="isLoading">
      <view class="content">
        <view class="box">
          <img-loading></img-loading>
        </view>
      </view>
    </template>
    <template v-else> </template>
  </view>
</template>

<script>
import { mapState } from "vuex";
var ischeck = true;
var phoneDireciton;
var warehouseId = 0;

export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      isLoading: true,
      icon: "",
    };
  },
  computed: {
    ...mapState({
      hasLogin: (state) => {
        return state.hasLogin || uni.getStorageSync("hasLogin");
      },
    }),
  },
  mounted() { },

  methods: {
    routeToLogin() {
      uni.navigateTo({
        url: "/pagesStore/login",
      });
    },
    hide() { },
    initProject() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    routeNoPage() {
      uni.showToast({
        title: "敬请期待~",
        icon: "none",
        duration: 2000,
      });
    },
    routePage2(url) {
      uni.navigateTo({
        url: url,
      });
    },
    handlePhoto() {
      console.log("handlePhoto");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  padding: 24rpx 34rpx;

  .home_wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 188rpx - 120rpx);
    width: 100%;
    align-items: center;

    .header {
      width: 702rpx;
      height: 92rpx;
      background: linear-gradient(180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(105, 228, 177, 0.3) 100%),
        #ffffff;
      box-shadow: 0rpx 4rpx 10rpx 0rpx #005e18;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 36rpx;
      color: #1eb375;
      text-align: center;
      line-height: 92rpx;
    }
  }

  .vehicle_content {
    width: 702rpx;
    margin-top: 24rpx;

    .item_details {
      width: 702rpx;
      height: 532rpx;
      background: #ffffff;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 24rpx;

      .header_title {
        display: flex;
        width: 100vw;
        height: 50rpx;
        align-items: center;

        .line {
          width: 8rpx;
          height: 28rpx;
          background: #1562bf;
        }

        .text {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 36rpx;
          color: #000000;
          margin-left: 11rpx;
        }
      }

      .platNo {
        width: 654rpx;
        height: 160rpx;
        background: linear-gradient(180deg,
            rgba(203, 216, 210, 0.15) 0%,
            #1eb375 100%);
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        background-image: url("https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-09/1749436135340188.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 64rpx;
        color: #000000;
        text-align: center;
        line-height: 160rpx;
        margin-top: 16rpx;
      }

      .vehicle_message {
        width: 654rpx;

        .item_message {
          width: 654rpx;
          height: 70rpx;
          background: #F6F6F6;
          border-radius: 8rpx 8rpx 8rpx 8rpx;
          margin-top: 16rpx;
          display: flex;
          justify-content: space-between;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          line-height: 70rpx;
          padding: 0 24rpx;

          .left {
            color: #666666;
          }

          .right {
            color: #000000;
            display: flex;
            align-items: center;

            .inline {
              width: 2rpx;
              height: 32rpx;
              border-right: 0.1rpx solid #434343;
              margin: 0 16rpx;
            }

            .btn {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 28rpx;
              color: #1562BF;
              line-height: 38rpx;
              cursor: pointer;
            }
          }
        }
      }
    }

  }


}

.content {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.box {
  position: relative;
  display: flex;
  height: 350upx;
  border-radius: 10upx;
  margin-top: 30upx;
  flex: 0 0 350upx;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.u-transition {
  margin: 50rpx;
}

.uActoonSheet {
  margin: 50rpx;
}

.u-notice-bar__icon {
  display: none !important;
}
</style>
