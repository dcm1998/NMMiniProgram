<template>
  <view>
    <cu-custom :isBack="true">
      <block slot="content">车辆管理</block>
    </cu-custom>
    <template v-if="carList.length > 0">
      <view class="container">
        <!-- <view class="title"> 我的车辆 </view>
        <view class="desc"> 可添加多个车辆 </view> -->
        <view class="cell" v-for="item in carList" :key="item.id">
          <view class="top-cell flex item-center justify-between" @click="chooseCell(item)">
            <view class="plateNo">
              <view class="plateNo-title flex item-center">
                <view class="name">
                  {{ item.plateNo || '' }}
                </view>
                <template v-if="isCheckId === item.id">
                  <view class="tips">默认</view>
                </template>
              </view>
              <view class="plateNo-desc">
                <text class="pr8">{{ item.carType || '' }}</text>
                <text class="pr8">{{ item.energyTypeName || '' }}</text>
                <text>{{ item.carBrand || '' }}</text>
              </view>
            </view>
            <template v-if="item.carType === 'SUV'">
              <image
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-02/143856.png"
                mode="aspectFit"
              ></image>
            </template>
            <template v-else>
              <image
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-23/112335.png"
                mode="aspectFit"
              ></image>
            </template>
          </view>
          <view class="bottom-cell flex item-center justify-between">
            <view class="name">
              <template v-if="isCheckId === item.id">
                <image
                  @click="checkClick(item)"
                  class="unChoose"
                  src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/151001.png"
                ></image>
              </template>
              <template v-else>
                <image
                  @click="checkClick(item)"
                  class="unChoose"
                  src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/150957.png"
                ></image>
              </template>
              设为默认车辆
            </view>
            <view class="delete flex item-center" @click.stop="deleteCar(item)">
              <image
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/185714.png"
                mode="aspectFit"
              ></image>
              <view> 删除 </view>
            </view>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="empty flex item-center justify-center">
        <view class="vehicle">
          <image src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/110233.png" mode="data"></image>
          <view class="title">暂无车辆信息</view>
        </view>
      </view>
    </template>
    <view class="bottom-btn">
      <uni-button @tap="routePage('/pagesStore/addCar')" class="addcar-btn">添加车辆</uni-button>
    </view>
  </view>
</template>
<script>
import { getCarList, deleteCarBatch, putCarEdit } from '@/api/car'
export default {
  data() {
    return {
      carList: [],
      isCheckId: undefined
    }
  },
  methods: {
    checkClick(item) {
      this.isCheckId = item.id
      let params = {
        id: item.id,
        isDefault: true
      }
      let that = this
      putCarEdit(params).then(res => {
        uni.showToast({
          title: '修改默认车辆成功~',
          icon: 'none',
          duration: 2000,
          complete: function () {
            setTimeout(() => {
              that.fetchCarList()
              uni.setStorageSync('defaultCarInfo', item)
            }, 1000)
          }
        })
      })
    },
    fetchClick(item) {
      this.isCheckId = item.id
      let params = {
        id: item.id,
        isDefault: true
      }
      let that = this
      putCarEdit(params).then(res => {
        setTimeout(() => {
          uni.setStorageSync('defaultCarInfo', item)
        }, 1000)
      })
    },
    fetchCarList() {
      let params = {
        pageNum: 1,
        pageSize: 100
      }
      let that = this
      getCarList(params).then(res => {
        that.carList = res?.rows
        if (that.carList.length > 0) {
          let carItem = that.carList[0]
          that.fetchClick(carItem)
        }
      })
    },
    routePage(url) {
      uni.navigateTo({
        url: url
      })
    },
    chooseCell(item) {
      let obj = JSON.stringify(item)
      uni.navigateTo({
        url: '/pagesStore/addCar?obj=' + encodeURIComponent(obj)
      })
    },
    deleteCar(item) {
      uni.showModal({
        content: '确定要删除该车辆吗？',
        cancelText: '取消',
        confirmText: '确认',
        success: res => {
          if (res.confirm) {
            let that = this
            deleteCarBatch([item.id]).then(res => {
              uni.showToast({
                title: '删除成功',
                duration: 2000,
                complete: function () {
                  let defaultCarInfo = uni.getStorageSync('defaultCarInfo')
                  if (defaultCarInfo?.id === item.id) {
                    uni.removeStorageSync('defaultCarInfo')
                  }
                  setTimeout(() => {
                    that.fetchCarList()
                  }, 1000)
                }
              })
            })
          }
        }
      })
    }
  },
  onShow() {
    this.fetchCarList()
    let defaultCarInfo = uni.getStorageSync('defaultCarInfo')
    this.isCheckId = defaultCarInfo.id || undefined
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx 32rpx;
  padding-bottom: calc(80rpx + env(safe-area-inset-bottom));
  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #212121;
  }
  .desc {
    font-size: 28rpx;
    font-weight: 400;
    color: #9e9e9e;
    margin: 20rpx 0;
  }
  .cell {
    position: relative;
    background-color: #fff;
    padding: 43rpx 34rpx 26rpx 32rpx;
    border-radius: 32rpx;
    margin-bottom: 20rpx;
    width: 100%;
    .top-cell {
      width: 100%;
      padding-bottom: 15rpx;
      border-bottom: 1rpx solid rgba(189, 189, 189, 0.2);
      .plateNo {
        .plateNo-title {
          padding-bottom: 8rpx;
          .name {
            font-weight: 700;
            font-size: 38rpx;
            color: #2a304a;
            line-height: 57rpx;
            margin-right: 28rpx;
            word-break: keep-all;
          }
          .tips {
            width: 72rpx;
            height: 36rpx;
            background: #5c89ff;
            border-radius: 8rpx;
            font-weight: 700;
            font-size: 24rpx;
            color: #ffffff;
            line-height: 36rpx;
            text-align: center;
          }
        }
        .plateNo-desc {
          font-size: 24rpx;
          font-weight: 400;
          color: #a0a7c2;
        }
      }
      image {
        width: 311rpx;
        height: 139rpx;
      }
    }
    .bottom-cell {
      margin-top: 20rpx;
      .name {
        font-weight: 700;
        font-size: 24rpx;
        color: #2a304a;
        line-height: 36rpx;
        display: flex;
        align-items: center;
        .unChoose {
          width: 36rpx;
          height: 36rpx;
          margin-right: 16rpx;
        }
      }
      .delete {
        font-weight: 700;
        font-size: 24rpx;
        color: #a0a7c2;
        line-height: 36rpx;
        image {
          width: 36rpx;
          height: 36rpx;
          margin-right: 8rpx;
        }
      }
    }
  }
}
.empty {
  overflow: hidden;
  height: 80vh;
  width: 100vw;
  .vehicle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    image {
      width: 159rpx;
      height: 157rpx;
    }
    .title {
      font-weight: 700;
      font-size: 36rpx;
      color: #a0a7c2;
      line-height: 50rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
