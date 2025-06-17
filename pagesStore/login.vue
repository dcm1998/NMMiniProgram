<!--
 * @Author: WUYuHan
 * @Date: 2025-05-23 14:06:39
 * @LastEditTime: 2025-06-17 14:44:01
 * @Description: 
-->
<template>
  <view class="t-login">
    <!-- 顶部自定义导航 -->
       <cu-custom>
      <block slot="content">登录</block>
    </cu-custom>
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class="tn-custom-nav-bar__back" @click="goBack">
        <text class="icon tn-icon-left"></text>
        <text class="icon tn-icon-home-capsule-fill"></text>
      </view>
    </tn-nav-bar>
    <!-- <view class="login">
      <view class="t-b2"></view>
      <view class="welcome">
        <view class="hello">您好,</view>
        <view class="use">欢迎使用易泊航</view>
      </view>

      <view class="login_image"> </view>
      <view class="login_bottom" @tap="wxLogin()">
        <view class="login_btn">
          <view class="we_chat"></view>
          <view class="btn">微信登录 </view>
        </view>
      </view>
      <view class="choose_tips flex-center mt20">
        <template v-if="radioCheck">
          <image
            @click="checkboxChange"
            class="unChoose"
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/151001.png"
          ></image>
        </template>
        <template v-else>
          <image
            @click="checkboxChange"
            class="unChoose"
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/150957.png"
          ></image>
        </template>
        <view>
          我已阅读并同意<span class="href text-blue" @click="routePage('/pagesStore/agreementInfo')"
            >《用户服务协议》</span
          >以及<span class="href text-blue" @click="routePage('/pagesStore/privacyPolicy')">《隐私权政策》</span>
        </view>
      </view>
    </view> -->

    <view class="login">
      <view class="t-b2"></view>
      <view class="welcome">
      </view>
      <view class="cell">
        <form class="cl">
          <view class="t-a">
            <image src="/static/svg/login/phone.svg"></image>
            <view class="line"></view>
            <input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
          </view>
          <view class="t-a">
            <image src="/static/svg/login/lock.svg"></image>
            <view class="line"></view>
            <input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
            <view v-if="showText" class="t-c" @tap="getCode()">发送短信</view>
            <view v-else class="t-c" style="background-color: #a7a7a7">重新发送({{ second }})</view>
          </view>
          <view class="t-r">
            忘记密码
          </view>
          <uni-button @tap="login" class="common-btn">登 录</uni-button>
          <uni-button @tap="routePage('/pagesStore/register')" class="register-btn">注 册</uni-button>
          <view class="choose_tips flex-center mt20">
            <template v-if="radioCheck">
              <image
                @click="checkboxChange"
                class="unChoose"
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/151001.png"
              ></image>
            </template>
            <template v-else>
              <image
                @click="checkboxChange"
                class="unChoose"
                src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-26/150957.png"
              ></image>
            </template>
            <view>
              我已阅读并同意<span class="href text-blue" @click="routePage('/pagesStore/register')"
                >《用户服务协议》</span
              >以及<span class="href text-blue" @click="routePage('/pagesStore/privacyPolicy')">《隐私权政策》</span>
            </view>
          </view>
        </form>
      </view>

      <!-- <view class="t-f"><text>————— 其他方式登录 —————</text></view>
      <view class="t-e cl">
        <view class="t-g" @tap="wxLogin()"><image src="/static/svg/login/wechat.svg"></image></view>
      </view> -->
    </view>

    <u-modal
      :show="showRegister"
      title="确认同意注册"
      content="您已阅读并同意《用户服务协议》以及《隐私权政策》？"
      showCancelButton="true"
      @confirm="ensureRegister"
      @cancel="closeRegister"
      @close="closeRegister"
    >
    </u-modal>
  </view>
</template>
<script>
import { mapMutations } from 'vuex'
import { getPhoneCode, postWeChatLogin, postUserCodeLogin } from '@/api/user.js'
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
export default {
  mixins: [template_page_mixin],
  data() {
    return {
      title: '欢迎回来！',
      second: 60, //默认60秒
      showText: true, //判断短信是否发送
      phone: '', //手机号码
      yzm: '', //验证码
      radioCheck: false,
      showRegister: false
    }
  },
  onLoad() {},
  methods: {
    ...mapMutations(['storeLoginFn']),
    ensureRegister() {
      this.showRegister = false
      this.radioCheck = true
      this.login()
    },
    closeRegister() {
      this.showRegister = false
    },
    //当前登录按钮操作
    login() {
      if (this.validatePhone()) {
        return
      }
      if (!this.yzm) {
        uni.showToast({ title: '请输入验证码', icon: 'none' })
        return
      }
      if (this.radioCheck == false) {
        this.showRegister = true
        return
      }

      let that = this
      uni.showLoading({
        title: '请求中...'
      })
      let loginCode = that.getLoginCode()
      loginCode.then(res => {
        return new Promise((resolve, reject) => {
          const { code } = res
          if (!code) {
            uni.showToast({
              title: '授权失败',
              icon: 'error'
            })
            return
          }
          let params = {
            phoneNumber: that.phone,
            msgCode: that.yzm,
            code: code
          }
          postUserCodeLogin(params)
            .then(res => {
              const { access_token } = res
              const { sysUser } = res?.loginUser
              setTimeout(() => {
                uni.setStorageSync('token', access_token)
                that.storeLoginFn(sysUser)
                uni.showToast({
                  title: '登录成功~',
                  duration: 2000,
                  complete: function () {
                    setTimeout(() => {
                      uni.$emit('LoginSuccess', { success: 1 })
                      uni.reLaunch({
                        url: '/pages/index/index'
                      })
                    }, 1000)
                  }
                })
              }, 300)
            })
            .finally(() => {
              uni.hideLoading()
            })
        })
      })
    },
    //获取短信验证码
    getCode() {
      if (this.validatePhone()) {
        return
      }
      var that = this
      //这里请求后台获取短信验证码
      uni.showLoading()
      getPhoneCode(this.phone)
        .then(res => {
          that.showText = false
          var interval = setInterval(() => {
            that.showText = false
            var times = that.second - 1
            //that.second = times<10?'0'+times:times ;//小于10秒补 0
            that.second = times
          }, 1000)
          setTimeout(() => {
            clearInterval(interval)
            that.second = 60
            that.showText = true
          }, 60000)
        })
        .catch(err => {
          console.log('err: ', err)
        })
        .finally(() => {
          uni.hideLoading()
        })
    },
    // 手机号验证
    validatePhone() {
      if (!this.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' })
        return true
      }
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
        uni.showToast({ title: '请输入正确手机号', icon: 'none' })
        return true
      }
    },
    // 授权小程序
    getUserProfile() {
      var that = this
      return new Promise((resolve, reject) => {
        uni.getUserProfile({
          desc: '获取您的微信信息以授权小程序',
          success: userRes => {
            resolve(userRes)
            // that.UserProfileRes = userRes
          },
          fail: userErr => {
            uni.showToast({
              title: '授权失败',
              icon: 'error'
            })
            reject(userErr)
          }
        })
      })
    },

    getLoginCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: loginRes => {
            resolve(loginRes)
          }
        })
      })
    },
    wxLogin() {
      this.radioCheck = true
      let that = this
      uni.showLoading({
        title: '加载中'
      })
      let userProFile = this.getUserProfile()
      let loginCode = this.getLoginCode()
      loginCode
        .then(res => {
          return new Promise((resolve, reject) => {
            userProFile
              .then(result => {
                // 你的请求
                const { code } = res
                const { rawData, signature, encryptedData, iv } = result
                if (!code) {
                  uni.showToast({
                    title: '授权失败',
                    icon: 'error'
                  })
                  return
                }
                let params = {
                  code: code,
                  rawData: rawData,
                  signature: signature,
                  encryptedData: encryptedData,
                  iv: iv
                }
                postWeChatLogin(params).then(res => {
                  const { access_token } = res
                  const { sysUser } = res?.loginUser
                  uni.setStorageSync('token', access_token)
                  that.storeLoginFn(sysUser)
                  if (!sysUser.phoneNumber) {
                    uni.showToast({
                      title: '登录成功,请完善个人信息~',
                      icon: 'none',
                      duration: 2000,
                      complete: function () {
                        setTimeout(() => {
                          uni.redirectTo({
                            url: '/pagesStore/editUser'
                          })
                        }, 1000)
                      }
                    })
                  } else {
                    uni.showToast({
                      title: '登录成功~',
                      duration: 2000,
                      complete: function () {
                        setTimeout(() => {
                          uni.$emit('LoginSuccess', { suucess: 1 })
                          uni.reLaunch({
                            url: '/pages/index/index'
                          })
                        }, 1000)
                      }
                    })
                  }
                })
              })
              .catch(err => {
                reject(err)
              })
              .finally(() => {
                uni.hideLoading()
              })
          })
        })
        .catch(err => {
          console.log('userProfile-err', err)
        })
    },
    routePage(url) {
      uni.navigateTo({
        url: url
      })
    },
    checkboxChange() {
      this.radioCheck = !this.radioCheck
    }
  }
}
</script>

<style lang="scss" scoped>
/* 胶囊*/
.tn-custom-nav-bar__back {
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 1000rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.5);
  color: #ffffff;
  font-size: 18px;

  .icon {
    display: block;
    flex: 1;
    margin: auto;
    text-align: center;
  }

  &:before {
    content: ' ';
    width: 1rpx;
    height: 110%;
    position: absolute;
    top: 22.5%;
    left: 0;
    right: 0;
    margin: auto;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    opacity: 0.7;
    background-color: #ffffff;
  }
}
.login {
  position: relative;
  height: 100%;
  z-index: 1;

  /* 背景图片 start */
  &__bg {
    z-index: -1;
    position: fixed;

    &--top {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;

      .bg {
        width: 750rpx;
        will-change: transform;
      }
    }

    &--bottom {
      bottom: -10rpx;
      left: 0;
      right: 0;
      width: 100%;
      // height: 144px;
      // margin-bottom: env(safe-area-inset-bottom);

      image {
        width: 750rpx;
      }
    }
  }
  .welcome {
    margin-bottom: 30rpx;
  }
  .cell {
    // margin: 0 32rpx;
    background: #fff;
    border-radius: 32rpx;
    padding: 56rpx 40rpx 60rpx;
    height:calc(100vh - 200rpx);
  }
  .login_image {
    background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-23/133242.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 595rpx;
    height: 431rpx;
    margin: 0 auto;
  }
  .login_bottom {
    display: flex;
    justify-content: center;
    .login_btn {
      margin-top: 115rpx;
      padding: 14rpx 174rpx;
      display: inline-block;
      // background: linear-gradient(307deg, #3562dc 0%, #6baaff 100%), linear-gradient(180deg, #68a7fd 0%, #5370ff 100%);
      background-image: linear-gradient(to bottom, #68a7fd 0%, #6baaff 20%, #3562dc);
      box-shadow: 0rpx 8rpx 20rpx 0rpx #a7c1f4;
      border-radius: 400rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .we_chat {
        width: 64rpx;
        height: 64rpx;
        background-image: url('https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-23/133247.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 20rpx;
      }
      .btn {
        font-weight: 700;
        font-size: 36rpx;
        color: #ffffff;
        line-height: 50rpx;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }
  .choose_tips {
    font-weight: 500;
    font-size: 24rpx;
    color: #535a6f;
    line-height: 36rpx;
    margin-top:295rpx;
    .unChoose {
      width: 36rpx;
      height: 36rpx;
      margin-right: 8rpx;
    }
  }
}

.t-login {
  // width: 650rpx;
  margin: 0 auto;
  font-size: 28rpx;
  color: #000;
  // background-color: #fff !important;
  background-image: url('https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-06/1749178358404car(2).png') !important;
  background-size: 100% 35%;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
}

.t-login button {
  font-size: 32rpx;
  background: #246bfd;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 50rpx;
  box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
  padding: 0 20rpx 0 120rpx;
  height: 90rpx;
  line-height: 90rpx;
  margin-bottom: 50rpx;
  background: #f8f7fc;
  border: 1px solid #e9e9e9;
  font-size: 28rpx;
  border-radius: 50rpx;
}

.t-login .t-a {
  position: relative;
}

.t-login .t-a image {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  left: 40rpx;
  top: 28rpx;
  /* border-right: 2rpx solid #dedede; */
  margin-right: 20rpx;
}
.t-login .t-a .line {
  width: 2rpx;
  height: 40rpx;
  background-color: #dedede;
  position: absolute;
  top: 28rpx;
  left: 98rpx;
}
.t-r{
  width:100%;
  text-align: right;
font-family: PingFang SC, PingFang SC;
font-weight: 400;
font-size: 24rpx;
color: #1562BF;
margin-top:167rpx;
margin-bottom:24rpx;
}

.t-login .t-b {
  text-align: left;
  font-size: 46rpx;
  color: #000;
  padding: 60rpx 0 30rpx 0;
  font-weight: bold;
}
.t-b2 {
  padding: 140rpx 0 150rpx 0;
}

.t-login .t-c {
  position: absolute;
  z-index: 10;
  right: 22rpx;
  top: 22rpx;
  background: #5677fc;
  color: #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 25rpx;
}

.t-login .t-d {
  text-align: center;
  color: #999;
  margin: 80rpx 0;
}

.t-login .t-e {
  text-align: center;
  width: 250rpx;
  margin: 80rpx auto 0;
}

.t-login .t-e image {
  width: 80rpx;
  height: 80rpx;
}

.t-login .t-f {
  text-align: center;
  margin: 100rpx 0 0 0;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  color: #9e9e9e;
}

.t-login .t-f text {
  margin-left: 20rpx;
  color: #aaaaaa;
  font-size: 27rpx;
}

.t-login .uni-input-placeholder {
  color: #000;
}

.cl {
  zoom: 1;
}

.cl:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  content: '\20';
}
</style>
