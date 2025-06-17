<!--
 * @Author: WUYuHan
 * @Date: 2025-05-23 14:06:39
 * @LastEditTime: 2025-06-17 10:04:13
 * @Description: 运单动态
-->

<template>
  <view class="template-order">
    <cu-custom>
      <block slot="content">运单动态</block>
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
          <view class="btn" @click="handleGo">立即出车</view>
        </view>
      </view>
      <view class="vehicle_content">
        <uni-steps :list="stepsList" />
      </view>
    </view>
    <u-popup :show="show" :round="10" :safeAreaInsetBottom="true" :closeable="true" closeOnClickOverlay mode="bottom"
      @close="close" @open="open">
      <view class="popup-cell">
        <view class="title">
          运单类型：常规
        </view>
        <view class="inpus">
          <lonjin-form :config="formConfig" :formData="formData" buttonText="确认" @updateValue="handleUpdate"
            @submit="handleSubmit" />
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import { getNoticeList, cancelReserve } from '@/api/notice'
import UniSteps from "@/components/steps-col/steps-col.vue";
import LonjinForm from "@/uni_modules/lonjin-form/components/lonjin-form/lonjin-form.vue";
export default {
  components: {
    UniSteps,
    LonjinForm
  },
  data() {
    return {
      showTime: false,
      show: false,
      stepsList: [
        {
          day: "前往取货",
          // time: "14:06",
          stu: "已下单",
          city: "西安",
          company: "发货公司A"
        },
        {
          day: "取货完成",
          // time: "09:30",
          stu: "运输中",
          city: "咸阳",
          company: "运输公司B"
        },
        {
          day: "运输中",
          // time: "18:45",
          stu: "已签收",
          city: "宝鸡",
          company: "收货公司C"
        }
      ],
      formConfig: [
        {
          label: "卸货单",
          key: "avatar",
          type: "pictureGroup", // 图片组上传
          max: 1 // 最多上传一张
        },
        {
          label: "序号",
          key: "key", // 字段名，对应 formData 中的键
          type: "input", // 输入框类型
          verify: true, // 是否必填
          placeholder: "请输入序号"
        },
        {
          label: "日期",
          key: "date",
          type: "date", // 日期选择器
          verify: true,
          placeholder: "请选择日期",
          start: "1900-01-01",
          end: "2050-12-31"
        },
        {
          label: "时间",
          key: "time",
          type: "time",
          verify: true,
          placeholder: "请选择时间"
        },
        {
          label: "车号",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入车号"
        },
        {
          label: "货号",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入货号"
        },
        {
          label: "总重",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入总重"
        },
        {
          label: "皮重",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入皮重"
        },
        {
          label: "扣率",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入扣率"
        },
        {
          label: "净重",
          key: "key",
          type: "input",
          verify: true,
          placeholder: "请输入净重"
        },
        {
          label: "备注",
          key: "remark",
          type: "textarea", // 日期选择器
          verify: false,
          placeholder: "请输入...",
        },
      ],
      formData: {} // 初始表单数据
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
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    handleGo() {
      this.show = true
    },
    handleUpdate(formData) {
      this.formData = formData;
      console.log('当前表单数据:', formData);
    }, handleSubmit(formData) {
      console.log("提交表单数据:", formData);
      // 提交到后端或其他操作
    }
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
        margin-top: 16rpx;

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
              margin-top: 16rpx;
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
          padding-top: 16rpx;

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
              margin-top: 16rpx;
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
            width: 160rpx;
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
        background: #1562BF;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 36rpx;
        color: #ffff;
        text-align: center;
        line-height: 98rpx;
      }
    }
  }

  .vehicle_content {
    width: 702rpx;
    // height: 200rpx;
    background: #FFFFFF;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 24rpx;
    margin-top: 24rpx;
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

.popup-cell {
  width: 100%;

  .title {
    color: #333;
    font-size: 32rpx;
    font-weight: bold;
    margin: 24rpx 0 0 24rpx;
    text-align: left;
  }


  .inpus {
    width: 100%;
    height:800rpx;
    overflow-y: scroll;
    padding: 24rpx;
  }
}
</style>
