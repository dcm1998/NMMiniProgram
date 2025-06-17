<!--
 * @Author: YinXuan
 * @Date: 2023-09-18 11:02:44
 * @LastEditTime: 2024-08-27 15:59:31
 * @Description: 添加车辆
-->
<template>
  <view>
    <cu-custom :isBack="true">
      <block slot="content">{{ isEdit ? '编辑' : '添加' }}车辆</block>
    </cu-custom>

    <view class="cell">
      <view class="form-cell">
        <view class="form-item">
          <view class="form-item-title"><view class="form-item-img licence_plate"></view> 车牌号 </view>
          <view class="so-plate-body" @tap="plateShow = true">
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(0, 1) }}</text>
            </view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(1, 1) }}</text>
            </view>
            <view class="so-plate-dot"></view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(2, 1) }}</text>
            </view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(3, 1) }}</text>
            </view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(4, 1) }}</text>
            </view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(5, 1) }}</text>
            </view>
            <view class="so-plate-word" @tap="plateShow = true">
              <text>{{ plateNo.substr(6, 1) }}</text>
            </view>
            <template v-if="PageCur == '2'">
              <view class="so-plate-word" @tap="plateShow = true">
                <text>{{ plateNo.substr(7, 1) }}</text>
              </view>
            </template>
          </view>
        </view>
        <view class="form-item">
          <view class="form-item-title"> <view class="form-item-img vehicle_model"></view>车型 </view>
          <view @click="showPicker = true">
            <u-input
              v-model="carType"
              placeholder="请输入车型"
              border="none"
              disabled
              disabledColor="#ffffff"
              clearable
              fontSize="32rpx"
              color="#9e9e9e"
              :placeholderStyle="{ color: '#9e9e9e' }"
              :customStyle="{
                paddingLeft: '32rpx',
                paddingTop: '22rpx',
                paddingBottom: '22rpx',
                background: '#F0F7FF',
                borderRadius: '16rpx'
              }"
            >
              <template slot="suffix">
                <image
                  src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/174921.png"
                  mode=""
                  style="width: 24rpx; height: 24rpx; margin-right: 20rpx"
                /> </template
            ></u-input>
          </view>
        </view>
        <view class="form-item">
          <view class="form-item-title"> <view class="form-item-img energy"></view>能源类型 </view>
          <view @click="showPickerEnergy = true">
            <u-input
              v-model="energyTypeName"
              placeholder="请输入能源类型"
              border="none"
              disabled
              disabledColor="#ffffff"
              clearable
              fontSize="32rpx"
              color="#9e9e9e"
              :placeholderStyle="{ color: '#9e9e9e' }"
              :customStyle="{
                paddingLeft: '32rpx',
                paddingTop: '22rpx',
                paddingBottom: '22rpx',
                background: '#F0F7FF',
                borderRadius: '16rpx'
              }"
            >
              <template slot="suffix">
                <image
                  src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/174921.png"
                  mode=""
                  style="width: 24rpx; height: 24rpx; margin-right: 20rpx"
                /> </template
            ></u-input>
          </view>
        </view>
        <view class="form-item">
          <view class="form-item-title"><view class="form-item-img brand"></view> 品牌 </view>
          <view>
            <u-input
              v-model="carBrand"
              placeholder="请输入品牌"
              border="none"
              clearable
              fontSize="32rpx"
              color="#9e9e9e"
              background="#F0F7FF"
              :placeholderStyle="{ color: '#9e9e9e', background: '#F0F7FF' }"
              :customStyle="{
                paddingLeft: '32rpx',
                paddingTop: '22rpx',
                paddingBottom: '22rpx',
                background: '#F0F7FF',
                borderRadius: '16rpx'
              }"
            >
              <template slot="suffix">
                <image
                  src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/150729.png"
                  mode=""
                  style="width: 40rpx; height: 40rpx; margin-right: 20rpx"
                /> </template
            ></u-input>
          </view>
        </view>
        <view class="form-item-tips">
          <view class="form_bottom img"></view>请输入真实有效的车牌号，便于正常使用停车缴费，开具发票等功能；</view
        >
      </view>
    </view>

    <view class="padding flex justify-center">
      <uni-button @tap="handlePostCarAdd" class="car-btn">{{ isEdit ? '编辑' : '添加' }}</uni-button>
    </view>
    <u-picker :show="showPicker" :columns="columns" @confirm="confirmPicker" @cancel="showPicker = false"></u-picker>
    <u-picker
      :show="showPickerEnergy"
      :columns="columnsEnergy"
      @confirm="confirmPickerEnergy"
      @cancel="showPickerEnergy = false"
    ></u-picker>
    <!-- 自定义键盘组件 -->
    <plate-input
      @typeChange="typeChange"
      v-if="plateShow"
      :plate="plateNo"
      @export="setPlate"
      @close="plateShow = false & close()"
    />
  </view>
</template>

<script>
import { postCarAdd, putCarEdit } from '../api/car'
import plateInput from '@/components/uni-plate-input/uni-plate-input.vue'
export default {
  components: {
    plateInput
  },
  data() {
    return {
      showPicker: false,
      columns: [['微型车', '轿车', 'SUV', '其他']],
      showPickerEnergy: false,
      columnsEnergy: [['燃油', '纯电', '混动']],
      isEdit: false,
      obj: {},
      // 品牌
      carBrand: '',
      // 车型
      carType: '',
      // 能源类型
      energyType: undefined,
      energyTypeName: '',
      plateNo: '',
      plateShow: false,
      PageCur: 1
    }
  },
  onLoad(options) {
    let obj = options.obj && JSON.parse(decodeURIComponent(options.obj))
    if (obj?.plateNo) {
      this.isEdit = true
      this.plateNo = obj.plateNo
      this.carBrand = obj.carBrand || ''
      this.carType = obj.carType || ''
      this.energyType = obj.energyType || ''
      this.energyTypeName = obj.energyTypeName || ''
      this.PageCur = this.plateNo.length === 7 ? 1 : 2
      this.obj = obj
    }
  },
  methods: {
    confirmPicker(e) {
      this.showPicker = false
      this.carType = e.value[0]
    },
    confirmPickerEnergy(e) {
      this.showPickerEnergy = false
      this.energyType = Number(e.indexs) + 1
      this.energyTypeName = e.value[0]
    },
    handlePostCarAdd() {
      if (!this.plateNo) {
        return this.$utils.toast('请输入车牌号~')
      }
      if (!this.carType) {
        return this.$utils.toast('请选择车型~')
      }
      if (!this.energyType) {
        return this.$utils.toast('请选择能源类型~')
      }
      if (this.isEdit) {
        let params = {
          id: this.obj.id,
          plateNo: this.plateNo,
          carBrand: this.carBrand || '',
          carType: this.carType || '',
          energyType: this.energyType || ''
        }
        putCarEdit(params).then(res => {
          uni.showToast({
            title: '编辑车辆成功~',
            duration: 2000,
            complete: function () {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        })
      } else {
        let params = {
          plateNo: this.plateNo,
          carBrand: this.carBrand || '',
          carType: this.carType || '',
          energyType: this.energyType || ''
        }
        postCarAdd(params).then(res => {
          uni.showToast({
            title: '新增车辆成功~',
            duration: 2000,
            complete: function () {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        })
      }
    },
    setPlate(plate) {
      if (plate.length >= 7) this.plateNo = plate
      this.plateShow = false
    },
    typeChange(e) {
      this.PageCur = e
      this.plateNo = ''
    },
    close() {
      this.PageCur = 1
    }
  },
  filters: {
    plateNoF(val) {
      if (val == '') {
        return '请填写车辆号牌'
      } else {
        let arr = val.split('')
        arr.splice(2, 0, ' · ')
        return arr.join('')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    }
  }
  .form-cell {
    padding: 56rpx 32rpx;
    border-radius: 20rpx;
    background-color: #fff;
    .form-item {
      margin-bottom: 40rpx;
      .form-item-title {
        font-size: 32rpx;
        font-weight: bold;
        font-weight: 700;
        color: #000000;
        margin-bottom: 8rpx;
        display: flex;
        margin-bottom: 16rpx;

        .form-item-img {
          width: 45rpx;
          height: 45rpx;
          margin-right: 16rpx;
        }
        .licence_plate {
          background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/161540.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .vehicle_model {
          background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/161548.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .energy {
          background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/161554.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .brand {
          background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/161559.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .form-choose {
        font-size: 32rpx;
        font-weight: 400;
        color: #9e9e9e;
        padding-bottom: 22rpx;
        border-bottom: 2rpx solid rgba(189, 189, 189, 0.2);
      }
    }
    .form-item-tips {
      display: flex;
      font-family: Alibaba PuHuiTi 3, Alibaba PuHuiTi 30;
      font-weight: 500;
      font-size: 24rpx;
      color: #ffaf1b;
      line-height: 36rpx;
      font-style: normal;
      text-transform: none;
      .form_bottom {
        width: 40rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }
      .img {
        background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/150521.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
.so-plate-body {
  box-sizing: border-box;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 40rpx;
}

.so-plate-word {
  height: 88rpx;
  margin: 0 5upx;
  box-sizing: border-box;
  width: 71rpx;
  position: relative;
  background: #f0f7ff;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.so-plate-word text {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  font-weight: 700;
  font-size: 32upx;
}

.so-plate-dot {
  width: 15rpx;
  height: 15rpx;
  background: #246bfd;
  border-radius: 50%;
  margin: 0 5rpx;
}
</style>
