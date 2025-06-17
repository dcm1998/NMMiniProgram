<template>
  <view>
    <cu-custom :isBack="true">
      <block slot="content">抬头管理</block>
    </cu-custom>
    <template v-if="invoiceTitleList.length > 0">
      <view class="invoice_title">
        <view v-for="item in invoiceTitleList" :key="item.id">
          <template v-if="item.invoiceType === 1">
            <view class="cell company_logo">
              <view class="cell_top flex item-center justify-between">
                <view class="cell_top_title flex item-center">
                  <image
                    src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160505.png"
                    mode="aspectFit"
                  ></image>
                  专用发票抬头
                </view>
                <view class="delete flex item-center" @click.stop="handleDelete(item)">
                  <image
                    src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160508.png"
                    mode="aspectFit"
                  ></image>
                </view>
              </view>
              <view class="cell_bottom">
                <view class="cell_bottom_title">
                  {{ item.invoiceTitleContent }}
                </view>
                <view class="cell_bottom_cell flex item-center justify-between">
                  <view class="cell_bottom_cell_title">
                    {{ item.unitDutyParagraph }}
                  </view>
                  <view class="edit flex item-center" @click="handleDetail(item)">
                    <image
                      src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160456.png"
                      mode="aspectFit"
                    ></image>
                  </view>
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <template v-if="item.titleType === 1">
              <view class="cell company_logo">
                <view class="cell_top flex item-center justify-between">
                  <view class="cell_top_title flex item-center">
                    <image
                      src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160505.png"
                      mode="aspectFit"
                    ></image>
                    公司 · 普通发票抬头
                  </view>
                  <view class="delete flex item-center" @click.stop="handleDelete(item)">
                    <image
                      src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160508.png"
                      mode="aspectFit"
                    ></image>
                  </view>
                </view>
                <view class="cell_bottom">
                  <view class="cell_bottom_title">
                    {{ item.invoiceTitleContent }}
                  </view>
                  <view class="cell_bottom_cell flex item-center justify-between">
                    <view class="cell_bottom_cell_title">
                      {{ item.unitDutyParagraph }}
                    </view>
                    <view class="edit flex item-center" @click="handleDetail(item)">
                      <image
                        src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160456.png"
                        mode="aspectFit"
                      ></image>
                    </view>
                  </view>
                </view>
              </view>
            </template>
            <template v-else>
              <view class="cell person_logo">
                <view class="cell_top flex item-center justify-between">
                  <view class="cell_top_title flex item-center">
                    <image
                      src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-07/142733.png"
                      mode="aspectFit"
                    ></image>
                    个人 · 普通发票抬头
                  </view>
                  <view class="delete flex item-center" @click.stop="handleDelete(item)">
                    <image
                      src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160508.png"
                      mode="aspectFit"
                    ></image>
                  </view>
                </view>
                <view class="cell_bottom">
                  <view class="cell_bottom_title">
                    {{ item.invoiceTitleContent }}
                  </view>
                  <view class="cell_bottom_cell flex item-center justify-between">
                    <view class="cell_bottom_cell_title">
                      {{ item.unitDutyParagraph }}
                    </view>
                    <view class="edit flex item-center" @click="handleDetail(item)">
                      <image
                        src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160456.png"
                        mode="aspectFit"
                      ></image>
                    </view>
                  </view>
                </view>
              </view>
            </template>
          </template>
        </view>
      </view>
    </template>

    <template v-else>
      <view class="empty flex item-center justify-center">
        <!-- <tn-empty mode="data"></tn-empty> -->
        <view class="empty-box">
          <view class="empty-img"> </view>
          <view class="empty-title">暂无数据</view>
        </view>
      </view>
    </template>
    <view class="bottom-btn">
      <uni-button @tap="routePage('/pagesStore/addInvoiceTitle')" class="common-btn"
        >添加发票抬头</uni-button
      >
    </view>
  </view>
</template>
<script>
import { getInvoiceTitleList, deleteInvoiceTitle } from "@/api/invoice.js";
export default {
  data() {
    return {
      invoiceTitleList: [],
    };
  },
  methods: {
    fetchInvoiceTitleList() {
      let params = {
        pageNum: 1,
        pageSize: 100,
      };
      let that = this;
      getInvoiceTitleList(params).then((res) => {
        that.invoiceTitleList = res?.rows;
      });
    },
    routePage(url) {
      uni.navigateTo({
        url: url,
      });
    },
    handleDetail(item) {
      let obj = JSON.stringify(item);
      uni.navigateTo({
        url: "/pagesStore/addInvoiceTitle?obj=" + encodeURIComponent(obj),
      });
    },
    handleDelete(item) {
      uni.showModal({
        content: "确定要删除吗？",
        cancelText: "取消",
        confirmText: "确认",
        success: (res) => {
          if (res.confirm) {
            let that = this;
            deleteInvoiceTitle([item.id]).then((res) => {
              uni.showToast({
                title: "删除成功",
                duration: 2000,
                complete: function () {
                  setTimeout(() => {
                    that.fetchInvoiceTitleList();
                  }, 1000);
                },
              });
            });
          }
        },
      });
    },
  },
  onShow() {
    this.fetchInvoiceTitleList();
  },
};
</script>

<style lang="scss" scoped>
.invoice_title {
  padding: 40rpx 32rpx;
  .cell {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    .cell_top {
      padding-bottom: 40rpx;
      .cell_top_title {
        font-weight: 700;
        font-size: 36rpx;
        color: #2a304a;
        line-height: 50rpx;
        image {
          width: 48rpx;
          height: 48rpx;
          margin-right: 16rpx;
        }
      }
      .delete {
        image {
          width: 36rpx;
          height: 36rpx;
          margin-right: 8rpx;
        }
      }
    }
    .cell_bottom {
      .cell_bottom_title {
        font-weight: 600;
        font-size: 28rpx;
        color: #535a6f;
        line-height: 39rpx;
        padding-bottom: 8rpx;
      }
      .cell_bottom_cell {
        .cell_bottom_cell_title {
          font-weight: 600;
          font-size: 28rpx;
          color: #535a6f;
          line-height: 39rpx;
        }
        .edit {
          image {
            width: 36rpx;
            height: 36rpx;
          }
        }
      }
    }
  }
  .company_logo {
    width: 100%;
    height: 100%;
    background-image: url("https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160426.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .person_logo {
    width: 100%;
    height: 100%;
    background-image: url("https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/160421.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.empty {
  overflow: hidden;
  height: 80vh;
  width: 100vw;
  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #535a6f;
    .empty-img {
      width: 200rpx;
      height: 200rpx;
      background-image: url("https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/132322.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-bottom: 10rpx;
    }
    .empty-title {
      font-weight: 400;
      font-size: 28rpx;
      color: #535a6f;
      line-height: 39rpx;
    }
  }
}
</style>
