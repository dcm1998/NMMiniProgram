<template>
  <view>
    <view class="steps" v-for="(item, index) in list" :key="index">
      <view class="left" :style="{ opacity: !index ? '1' : '0.5' }">
        <p :style="{ fontSize: !index ? '32rpx' : '' }">{{ item.day }}</p>
        <p class="">{{ item.time }}</p>
      </view>
      <view
        class="dot-line"
        :class="index == list.length - 1 ? 'dot-none' : ''"
      >
        <!--当前标点 -->
        <view v-if="index == 1" class="dot-box">
          <view class="dot-a"></view>
          <view class="dot-b"></view>
        </view>
        <view v-else class="dot"></view>
      </view>
      <view v-if="index == 1" class="right_img">
        <view class="content">
          <view class="top">
            <view class="car"> </view>
            <view class="plateNo">
              <view class="plateNo-text">陕A·55555</view>
              <view class="weight">
                <view class="text">净重</view>
                <view class="remark">若吨</view>
              </view>
            </view>
          </view>
          <u-upload
            :fileList="fileList6"
            @afterRead="afterRead"
            @delete="deletePic"
            name="6"
            multiple
            :maxCount="1"
            width="250"
            height="150"
          >
            <view class="bottom">重新上传</view>
          </u-upload>
          <!-- <view class="bottom" @click="open">重新上传</view> -->
        </view>
      </view>
      <view v-else class="right" :style="{ opacity: !index ? '1' : '0.5' }">
        <strong class="u-font-28">{{ item.stu }}</strong>
        <p class="u-font-24">[{{ item.city }}]{{ item.company }}</p>
      </view>
    </view>
    <u-popup
      :show="show"
      :round="10"
      :safeAreaInsetBottom="true"
      :closeable="true"
      closeOnClickOverlay
      mode="bottom"
      @close="close"
      @open="open"
    >
      <view class="popup-cell">
        <view class="title"> 预约规则 </view>
        <view class="tabs"
          ><zb-tab
            :data="tabs"
            :height="'80rpx'"
            :line-width="'40rpx'"
            :line-color="'#1562BF'"
            :active-style="{ color: '#1562BF', fontWeight: 'bold' }"
            @change="handleTabChange(tabs)"
        /></view>
        <view class="content">
          <view class="item">
            <view class="left">车牌号</view>
            <view class="right">陕A·55555</view>
          </view>
          <view class="item">
            <view class="left">净重</view>
            <view class="right">18吨</view>
          </view>
          <view class="item">
            <view class="left">车辆图片</view>
            <view class="right">
              <view class="img"></view>
            </view>
          </view>
        </view>
        <view class="footer_btn">上传</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import zbTab from "@/uni_modules/zb-tab/components/zb-tab/zb-tab.vue";
export default {
  name: "steps-col",
  components: {
    zbTab,
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      fileList6: [],
      show: false,
      tabs: [
        { name: "车辆1", value: 0 },
        { name: "车辆2", value: 1 },
        { name: "车辆3", value: 2 },
      ],
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    ckickTabs(item) {
      console.log(item);
    },
    handleTabChange(val) {
      console.log(val, "val");
    },
  },
};
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: stretch;
  line-height: 40rpx;
  font-size: 26rpx;

  .left {
    text-align: center;
    width: 5em;
  }

  .right {
    margin-bottom: 40rpx;
    flex: 1 1 auto;
  }

  .right_img {
    width: 296rpx;

    .content {
      width: 296rpx;
      height: 178rpx;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      border: 1rpx solid #e2e2e2;
      padding: 16rpx;

      .top {
        width: 100%;
        height: 88rpx;
        display: flex;

        .car {
          width: 88rpx;
          height: 88rpx;
          border-radius: 8rpx 8rpx 8rpx 8rpx;
          background-image: url("https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-06/1749176626065img.png");
          background-size: 100%;
          background-repeat: no-repeat;
        }

        .plateNo {
          .plateNo-text {
            width: 168rpx;
            height: 44rpx;
            background: #1eb375;
            border-radius: 4rpx 4rpx 4rpx 4rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #ffffff;
            line-height: 44rpx;
            text-align: center;
          }

          .weight {
            display: flex;
            justify-content: space-between;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;

            .text {
              color: #666666;
            }

            .remark {
              color: #000000;
            }
          }
        }
      }

      .bottom {
        width: 264rpx;
        height: 50rpx;
        background: #1562bf;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        color: #e2e2e2;
        text-align: center;
        line-height: 50rpx;
      }
    }
  }
}

.dot-none {
  border-left: unset !important;
}

.dot-line {
  position: relative;
  border-left: 1rpx solid #e8e7e3;
  top: 22rpx;
  margin: 0 60rpx;

  .dot {
    position: absolute;
    left: -12rpx;
    top: -12rpx;
    background: #e8e7e3;
    width: 24rpx;
    height: 24rpx;
    border-radius: 50%;
  }

  .dot-box {
    position: absolute;
    width: 44rpx;
    height: 44rpx;
    left: -22rpx;
    top: -22rpx;

    .dot-a {
      width: 100%;
      height: 100%;
      background: #1562bf;
      opacity: 0.4;
      border-radius: 50%;
      position: absolute;
    }

    .dot-b {
      position: absolute;
      background: #1562bf;
      width: 24rpx;
      height: 24rpx;
      border-radius: 50%;
      left: calc(50% - 12rpx);
      top: calc(50% - 12rpx);
    }
  }
}

.popup-cell {
  padding: 40rpx 40rpx 20rpx;

  .title {
    color: #333;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 40rpx;
    text-align: left;
  }

  .tabs {
    width: 300rpx;
  }

  .content {
    width: 686rpx;

    .item {
      width: 686rpx;
      // height: 87rpx;
      background: #f6f6f6;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      line-height: 87rpx;
      padding: 0 24rpx;

      .left {
        color: #666666;
      }

      .right {
        color: #000000;

        .img {
          margin: 24rpx;
          width: 160rpx;
          height: 160rpx;
          border-radius: 24rpx 24rpx 24rpx 24rpx;
          background-image: url("https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-06/1749176626065img.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .footer_btn {
    width: 702rpx;
    height: 98rpx;
    background: #1562bf;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 36rpx;
    color: #ffffff;
    text-align: center;
    line-height: 98rpx;
  }
}
</style>
