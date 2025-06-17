<template>
  <view>
    <cu-custom :isBack="true">
      <block slot="content">{{ isEdit ? '编辑' : '添加' }}发票抬头</block>
    </cu-custom>
    <view class="add_invoice_title">
      <view class="cell-father">
        <!-- 发票类型 -->
        <view class="cell">
          <view class="type-item">
            <view class="type-item-title-img"
              ><view class="img fapiao"></view> <view class="title"> 发票类型 </view>
            </view>

            <view class="flex item-center right-cell">
              <view class="btn" :class="formParams.invoiceType === 0 ? 'active' : ''" @click="chooseInvoiceType(0)">
                普通发票
              </view>
              <view class="btn" :class="formParams.invoiceType === 1 ? 'active' : ''" @click="chooseInvoiceType(1)">
                专用发票
              </view>
            </view>
          </view>
          <!-- 抬头类型 -->
          <view class="type-item" v-if="formParams.invoiceType === 0">
            <view class="type-item-title-img"
              ><view class="img taitou"></view> <view class="title"> 抬头类型 </view>
            </view>
            <view class="flex item-center right-cell">
              <view class="btn" :class="formParams.titleType === 0 ? 'active' : ''" @click="chooseHeaderType(0)">
                个人
              </view>
              <view class="btn" :class="formParams.titleType === 1 ? 'active' : ''" @click="chooseHeaderType(1)">
                单位
              </view>
            </view>
          </view>
          <!-- 发票抬头 -->
          <view class="cell-item">
            <view class="type-item-title-img"
              ><view class="img fatai"></view> <view class="title"> 发票抬头 </view>
            </view>
            <u-input
              v-model="formParams.invoiceTitleContent"
              border="none"
              placeholder="请输入发票抬头"
              clearable
              fontSize="28rpx"
              color="#A0A7C2"
              :placeholderStyle="{ color: '#A0A7C2' }"
              :customStyle="{
                padding: '20rpx 32rpx',
                backgroundColor: '#F0F7FF',
                borderRadius: '16rpx',
                marginTop: '16rpx',
                marginBottom: '30rpx'
              }"
            ></u-input>
          </view>
          <template v-if="formParams.titleType === 1 || formParams.invoiceType === 1">
            <!-- 单位税号 -->
            <view class="cell-item">
              <view class="type-item-title-img"
                ><view class="img tax"></view> <view class="title"> 单位税号 </view>
              </view>
              <u-input
                v-model="formParams.unitDutyParagraph"
                border="none"
                placeholder="请输入单位税号"
                clearable
                fontSize="28rpx"
                color="#A0A7C2"
                :placeholderStyle="{ color: '#A0A7C2' }"
                :customStyle="{
                  padding: '20rpx 32rpx',
                  backgroundColor: '#F0F7FF',
                  borderRadius: '16rpx',
                  marginTop: '16rpx',
                  marginBottom: '30rpx'
                }"
              ></u-input>
            </view>
            <!-- 注册地址 -->
            <view class="cell-item">
              <view class="type-item-title-img"
                ><view class="img address"></view> <view class="title"> 注册地址 </view>
              </view>
              <u-input
                v-model="formParams.registerAddress"
                border="none"
                placeholder="请输入注册地址"
                clearable
                fontSize="28rpx"
                color="#A0A7C2"
                :placeholderStyle="{ color: '#A0A7C2' }"
                :customStyle="{
                  padding: '20rpx 32rpx',
                  backgroundColor: '#F0F7FF',
                  borderRadius: '16rpx',
                  marginTop: '16rpx',
                  marginBottom: '30rpx'
                }"
              ></u-input>
            </view>
            <!-- 注册电话 -->
            <view class="cell-item">
              <view class="type-item-title-img"
                ><view class="img phone"></view> <view class="title"> 注册电话 </view>
              </view>
              <u-input
                v-model="formParams.registerPhone"
                border="none"
                placeholder="请输入注册电话"
                clearable
                fontSize="28rpx"
                color="#A0A7C2"
                :placeholderStyle="{ color: '#A0A7C2' }"
                :customStyle="{
                  padding: '20rpx 32rpx',
                  backgroundColor: '#F0F7FF',
                  borderRadius: '16rpx',
                  marginTop: '16rpx',
                  marginBottom: '30rpx'
                }"
              ></u-input>
            </view>
            <!-- 开户银行 -->
            <view class="cell-item">
              <view class="type-item-title-img"
                ><view class="img bank"></view> <view class="title"> 开户银行 </view>
              </view>
              <u-input
                v-model="formParams.depositBank"
                border="none"
                placeholder="请输入开户银行"
                clearable
                fontSize="28rpx"
                color="#A0A7C2"
                :placeholderStyle="{ color: '#A0A7C2' }"
                :customStyle="{
                  padding: '20rpx 32rpx',
                  backgroundColor: '#F0F7FF',
                  borderRadius: '16rpx',
                  marginTop: '16rpx',
                  marginBottom: '30rpx'
                }"
                :adjustPosition="false"
              ></u-input>
            </view>
            <!-- 银行账户 -->
            <view class="cell-item">
              <view class="type-item-title-img"
                ><view class="img account"></view> <view class="title"> 银行账户 </view>
              </view>
              <u-input
                v-model="formParams.bankAccount"
                border="none"
                placeholder="请输入银行账户"
                clearable
                fontSize="28rpx"
                color="#A0A7C2"
                :placeholderStyle="{ color: '#A0A7C2' }"
                :customStyle="{
                  padding: '20rpx 32rpx',
                  backgroundColor: '#F0F7FF',
                  borderRadius: '16rpx',
                  marginTop: '16rpx',
                  marginBottom: '30rpx'
                }"
                :adjustPosition="false"
              ></u-input>
            </view>
          </template>
        </view>
        <view class="tips-cell" v-if="formParams.invoiceType === 1">
          <view class="flex item-center justify-center">
            <template v-if="tipCheck">
              <image
                @click="tipCheckClick"
                class="tips-radio"
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/154409.png"
              ></image>
            </template>
            <template v-else>
              <image
                @click="tipCheckClick"
                class="tips-radio"
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/154414.png"
              ></image>
            </template>
            <view class="tips-word">
              我已阅读并同意<span class="tips-desc" @click="showPopup = true">《专用发票抬头确认书》</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="padding flex flex-direction">
      <uni-button @tap="handlePostSaveInvoiceTitle" class="common-btn">提交</uni-button>
    </view>
    <u-popup
      :show="showPopup"
      mode="bottom"
      @close="showPopup = false"
      :safeAreaInsetBottom="false"
      :customStyle="{
        margin: '0 32rpx 60rpx 32rpx',
        borderRadius: '30rpx'
      }"
    >
      <view class="popup-cell">
        <view class="title">
          {{ agreementTitle }}
        </view>
        <view class="content" v-html="agreementContent"></view>
        <uni-button @tap="agreeTip" class="common-btn">我已阅读并同意</uni-button>
      </view>
    </u-popup>
  </view>
</template>
<script>
import { getAgreementInfo } from '@/api/user.js'
import { postSaveInvoiceTitle, putInvoiceTitle } from '@/api/invoice.js'
export default {
  data() {
    return {
      isEdit: false,
      tipCheck: false,
      showPopup: false,
      agreementTitle: '',
      agreementContent: '',
      formParams: {
        // 发票类型0普票,1专票
        invoiceType: 0,
        // 抬头类型0个人,1单位
        titleType: 0,
        // 发票抬头内容
        invoiceTitleContent: '',
        // 单位税号
        unitDutyParagraph: '',
        // 注册地址
        registerAddress: '',
        // 注册电话
        registerPhone: '',
        // 开户银行
        depositBank: '',
        // 银行账号
        bankAccount: ''
      }
    }
  },
  onShow() {
    this.fetchAgreementInfoList()
  },
  onLoad(options) {
    let obj = options.obj && JSON.parse(decodeURIComponent(options.obj))
    console.log('obj: ', obj)

    if (obj) {
      this.formParams = {
        id: obj.id,
        // 发票类型0普票,1专票
        invoiceType: obj.invoiceType,
        // 抬头类型0个人,1单位
        titleType: obj.titleType,
        // 发票抬头内容
        invoiceTitleContent: obj.invoiceTitleContent,
        // 单位税号
        unitDutyParagraph: obj.unitDutyParagraph,
        // 注册地址
        registerAddress: obj.registerAddress,
        // 注册电话
        registerPhone: obj.registerPhone,
        // 开户银行
        depositBank: obj.depositBank,
        // 银行账号
        bankAccount: obj.bankAccount
      }
      console.log('this.formParams', this.formParams)
      this.isEdit = true
    }
  },
  methods: {
    fetchAgreementInfoList() {
      let params = {
        agreementType: 2
      }
      let that = this
      getAgreementInfo(params).then(res => {
        that.agreementTitle = res.agreementTitle
        that.agreementContent = res.agreementContent
      })
    },
    ensureRegister() {
      this.tipCheck = true
    },
    tipCheckClick() {
      this.tipCheck = !this.tipCheck
    },
    routePage(url) {
      uni.navigateTo({
        url: url
      })
    },
    agreeTip() {
      this.tipCheck = true
      this.showPopup = false
    },
    chooseInvoiceType(type) {
      this.formParams.invoiceType = type
    },
    chooseHeaderType(type) {
      this.formParams.titleType = type
    },
    handlePostSaveInvoiceTitle() {
      if (this.formParams.invoiceType === 1 && !this.tipCheck) {
        return uni.showToast({
          title: '请勾选我已阅读并同意《专用发票抬头确认书》',
          icon: 'none',
          duration: 2000
        })
      }
      if (!this.formParams.invoiceTitleContent) {
        return this.$utils.toast('发票抬头必填~')
      }
      if (this.formParams.invoiceType === 0 && this.formParams.titleType === 0) {
        this.formParams.unitDutyParagraph = ''
        this.formParams.registerAddress = ''
        this.formParams.registerPhone = ''
        this.formParams.depositBank = ''
        this.formParams.bankAccount = ''
      }
      if (this.isEdit) {
        putInvoiceTitle(this.formParams).then(res => {
          uni.showToast({
            title: '编辑成功~',
            duration: 2000,
            complete: function () {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        })
      } else {
        postSaveInvoiceTitle(this.formParams).then(res => {
          uni.showToast({
            title: '提交成功~',
            duration: 2000,
            complete: function () {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add_invoice_title {
  padding: 28rpx 32rpx 2rpx;
  .cell-father {
    background: linear-gradient(131deg, #6b97ff 0%, #6ccdfe 100%, #e4ff99 100%);
    border-radius: 24rpx;
    padding: 16rpx;
  }
  .cell {
    background-color: #fff;
    padding: 32rpx;
    border-radius: 24rpx;
    .type-item {
      .right-cell {
        width: 100%;
        padding: 16rpx 0 30rpx;
        .btn {
          width: 215rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          margin-right: 32rpx;
          border-radius: 16rpx;
          color: #535a6f;
          background-color: #fff;
          border: 1rpx solid #a0a7c2;
          &.active {
            color: #5c89ff;
            background: rgba(100, 147, 255, 0.102);
            border: 1rpx solid #5c89ff;
          }
        }
      }
    }
    .type-item-title-img {
      display: flex;
      align-items: center;
    }
    .img {
      width: 48rpx;
      height: 48rpx;
      margin-right: 16rpx;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .fapiao {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/140846.png');
    }
    .taitou {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/140854.png');
    }
    .fatai {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/140850.png');
    }
    .tax {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/142336.png');
    }
    .address {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/142355.png');
    }
    .phone {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/142351.png');
    }
    .bank {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/142341.png');
    }
    .account {
      background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/142346.png');
    }
    .title {
      word-break: keep-all;
      font-weight: 700;
      font-size: 36rpx;
      color: #2a304a;
      line-height: 50rpx;
    }
  }
}
.popup-cell {
  padding: 32rpx 40rpx 40rpx;
  .title {
    font-weight: 700;
    font-size: 36rpx;
    color: #2a304a;
    margin-bottom: 40rpx;
    text-align: center;
  }
  .content {
    color: #666;
    font-size: 28rpx;
    margin-bottom: 40rpx;
    max-height: 400rpx;
    overflow: scroll;
  }
}
.tips-cell {
  margin-top: 36rpx;
  .tips-radio {
    width: 24rpx;
    height: 24rpx;
    margin-right: 16rpx;
  }
  .tips-word {
    font-weight: 400;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 34rpx;
    .tips-desc {
      margin-left: 10rpx;
    }
  }
}
</style>
