<!--
 * @Author: YinXuan
 * @Date: 2023-09-20 14:25:52
 * @LastEditTime: 2024-03-08 11:23:40
 * @Description: 账单
-->
<script>
import { getParkingAccountBillList } from '@/api/wallet'
export default {
  data() {
    return {
      // 列表总数量
      totalNum: 0,
      //  页码 默认1开始
      pageNum: 1,
      pageSize: 10,
      // 列表数组
      parkOrderList: []
    }
  },
  methods: {
    checkStatus(status) {
      switch (status) {
        case '提现成功':
          return '#7747FF'
          break
        case '提现关闭':
          return '#626262'
          break
        case '提现处理中':
          return '#FEAE2A'
          break
        case '提现异常':
          return '#FD6B2D'
          break
        default:
          break
      }
    },
    checkBgStatus(status) {
      switch (status) {
        case '提现成功':
          return 'rgba(119, 71, 255, 0.2)'
          break
        case '提现关闭':
          return 'rgba(98, 98, 98, 0.2)'
          break
        case '提现处理中':
          return 'rgba(254, 174, 42, 0.2)'
          break
        case '提现异常':
          return 'rgba(253, 107, 45, 0.2)'
          break
        default:
          break
      }
    },
    fetchParkingOrderList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let that = this
      getParkingAccountBillList(params).then(res => {
        that.parkOrderList = that.parkOrderList.concat(res?.rows)
        that.totalNum = res?.total
        // 如果是最后一页
        if (that.pageNum * 10 >= that.totalNum) {
          that.$refs.pullScroll.finish()
        } else {
          // 不是最后一页
          that.$refs.pullScroll.success()
        }
      })
    },
    pageRefresh() {
      let that = this
      this.$nextTick(() => {
        that.$refs.pullScroll.refresh()
      })
    },
    // 下拉刷新
    pullDown() {
      this.parkOrderList = []
      this.pageNum = 1
      setTimeout(() => {
        this.fetchParkingOrderList()
      }, 300)
    }
  },
  onLoad() {
    // 页面刷新方法 会自动调用pulldown一次
    this.pageRefresh()
  },
  // 上拉加载
  onReachBottom() {
    // 数据全部加载完
    if (this.pageNum * this.pageSize >= this.totalNum) {
    } else {
      // 显示加载中
      this.$refs.pullScroll.showUpLoading()
      this.pageNum++
      this.fetchParkingOrderList()
    }
  },
  mounted() {}
}
</script>

<template>
  <view class="wallet-bill">
    <cu-custom
      bgImage="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-21/1703145140335Theme=Light@2x.png"
      :isBack="true"
    >
      <block slot="content">账单</block>
    </cu-custom>
    <view class="visitor-content">
      <cc-pullScroolView class="pullScrollView" ref="pullScroll" :back-top="true" :pullDown="pullDown">
        <view>
          <view
            class="block"
            :class="index === parkOrderList.length - 1 ? 'last-block' : ''"
            v-for="(item, index) in parkOrderList"
            :key="item.id"
          >
            <template v-if="item.operateType === 1">
              <!-- 充值 -->
              <view class="cell">
                <view class="cell_top flex justify-between item-center">
                  <view class="cell_top_title"> 充值 </view>
                  <view class="cell_top_number"> +{{ item.transferAmount }} </view>
                </view>
                <view class="cell_bottom flex justify-between item-center">
                  <view class="cell_bottom_title"> {{ item.operateTime }} </view>
                  <view class="cell_bottom_number"> {{ item.operateStatusLabel }} </view>
                </view>
              </view>
            </template>
            <template v-if="item.operateType === 2">
              <!-- 提现 -->
              <view class="cell">
                <view class="cell_top flex justify-between item-center">
                  <view class="cell_top_title"> 提现 </view>
                  <view class="cell_top_number"> -{{ item.refund }} </view>
                </view>
                <view class="cell_bottom flex justify-between item-center">
                  <view class="cell_bottom_title"> {{ item.createTime }} </view>
                  <view
                    class="cell_bottom_number"
                    :style="{
                      background: checkBgStatus(item.operateStatusLabel),
                      color: checkStatus(item.operateStatusLabel)
                    }"
                  >
                    {{ item.operateStatusLabel }}
                  </view>
                </view>
              </view>
            </template>
          </view>
        </view>
      </cc-pullScroolView>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wallet-bill {
  .visitor-content {
    display: flex;
    flex-direction: column;
    padding: 40rpx 32rpx;
    .pullScrollView {
      display: flex;
      flex-direction: column;
    }
    .block {
      background: #ffffff;
      border-radius: 20rpx;
      box-shadow: 0rpx 8rpx 22rpx 0rpx rgba(45, 86, 171, 0.08);
      margin-bottom: 40rpx;
      .cell {
        padding: 30rpx 26rpx 0;
        .cell_top {
          margin-bottom: 16rpx;
          .cell_top_title {
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
          }
          .cell_top_number {
            font-family: DIN, DIN;
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
          }
        }
        .cell_bottom {
          padding-bottom: 30rpx;
          border-bottom: 2rpx solid rgba(242, 242, 242, 1);
          .cell_bottom_title {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
          }
          .cell_bottom_number {
            padding: 6rpx 14rpx;
            background: rgba(36, 107, 253, 0.2);
            border-radius: 6rpx 6rpx 6rpx 6rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #246bfd;
          }
        }
      }
    }
    .last-block {
      border: none;
    }
  }
}
</style>
