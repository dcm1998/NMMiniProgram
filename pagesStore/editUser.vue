<script>
import { mapState } from 'vuex'
import { postWeChatUserInfo, postValidePhoneNumber } from '@/api/user.js'
export default {
  data() {
    return {
      userEdit: {}
    }
  },
  computed: {
    ...mapState({
      hasLogin: state => {
        return state.hasLogin || uni.getStorageSync('hasLogin')
      },
      userInfo: state => {
        console.log('userInfo: ', uni.getStorageSync('userInfo'))
      }
    }),
    userInfo() {
      this.userEdit = uni.getStorageSync('userInfo')
      return uni.getStorageSync('userInfo')
    }
  },
  methods: {
    chooseavatar(e) {
      this.userEdit.img =
        'data:image/jpeg;base64,' + uni.getFileSystemManager().readFileSync(e.detail.avatarUrl, 'base64')
    },
    handleSave() {
      if (!this.userEdit.phoneNumber) {
        return this.$utils.toast('请输入手机号~')
      }
      let params = {
        img: this.userEdit.img,
        nickName: this.userEdit.nickName,
        phoneNumber: this.userEdit.phoneNumber
      }
      postWeChatUserInfo(params).then(res => {
        const { access_token } = res
        const { sysUser } = res?.loginUser
        if (access_token) {
          uni.setStorageSync('token', access_token)
        }
        setTimeout(() => {
          uni.setStorage({
            key: 'userInfo',
            data: sysUser,
            success: function () {
              uni.showToast({
                title: '保存成功~',
                icon: 'success',
                duration: 2000,
                complete: function () {
                  setTimeout(() => {
                    uni.$emit('LoginSuccess', { suucess: 1 })
                    uni.reLaunch({
                      url: '/pages/index/index?PageCur=home'
                    })
                  }, 1000)
                }
              })
              uni.$emit('updateUserInfo', { msg: '更新用户信息' })
            }
          })
        }, 300)
      })
    },
    getPhoneNumber(e) {
      if (e.detail.code) {
        let params = {
          code: e.detail.code
        }
        let that = this
        postValidePhoneNumber(params).then(res => {
          that.userEdit.phoneNumber = res.phoneNumber
        })
      } else {
        console.log('验证手机号失败')
      }
    }
  }
}
</script>

<template>
  <view>
    <nav-custom :isBack="true">
      <block slot="content">用户设置</block>
    </nav-custom>
    <view class="block-cell">
      <view class="form-cell">
        <view class="form-item my-image flex justify-between item-center">
          <view class="form-item-title"> 我的头像 </view>
          <button class="btn" open-type="chooseAvatar" @chooseavatar="chooseavatar">
            <image class="png" :src="userEdit.img" mode="widthFix"></image>
          </button>
        </view>
        <view class="form-item">
          <view class="form-item-title"> 我的昵称 </view>
          <view>
            <u-input
              v-model="userEdit.nickName"
              type="nickname"
              border="none"
              placeholder="请输入昵称"
              clearable
              fontSize="32rpx"
              color="#9e9e9e"
              :placeholderStyle="{ color: '#9e9e9e' }"
              :customStyle="{
                paddingLeft: '0',
                paddingTop: '30rpx',
                paddingBottom: '22rpx'
              }"
              suffixIcon="edit-pen"
              suffixIconStyle="color: #9e9e9e"
            ></u-input>
          </view>
        </view>
        <view class="form-item">
          <view class="form-item-title"> 手机号码(必填)</view>
          <view class="form-phone flex item-center justify-between">
            <button class="get_phoneNumber" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
              {{ userEdit.phoneNumber || '请输入' }}
            </button>
            <u-icon size="18" color="#9e9e9e" name="edit-pen"></u-icon>
          </view>
        </view>
      </view>
      <view class="w-full btn-cell">
        <uni-button @tap="handleSave" class="common-btn">保存</uni-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.block-cell {
  padding: 40rpx 32rpx;

  .form-cell {
    padding: 40rpx 32rpx;
    border-radius: 20rpx;
    background: linear-gradient(360deg, #ffffff 31%, #a2c7ff 99%), #ffffff;

    .form-item {
      &:not(:last-child) {
        margin-bottom: 32rpx;
      }
      .form-item-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #000000;
        margin-bottom: 8rpx;
      }

      .form-phone {
        padding-left: 0;
        padding-top: 30rpx;
        padding-bottom: 22rpx;
        // border-bottom: 2rpx solid rgba(189, 189, 189, 0.2);
        .get_phoneNumber {
          padding-left: 0;
          text-align: left;
          flex: 9;
          border: none;
          background: #fff;
          color: #9e9e9e;
          font-size: 32rpx;
          line-height: 42rpx;
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

      .png {
        width: 110rpx !important;
        height: 110rpx !important;
        border-radius: 50% !important;
      }
    }

    .my-image {
      padding-bottom: 22rpx;
      // border-bottom: 2rpx solid rgba(189, 189, 189, 0.2);
    }
  }

  .btn-cell {
    margin-top: 40rpx;
  }
}
</style>
