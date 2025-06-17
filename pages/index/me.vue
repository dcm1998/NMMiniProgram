<template>
  <view>
    <cu-custom>
      <block slot="content">个人中心</block>
    </cu-custom>
    <view class="mine">
      <view class="top_cell">
        <view class="top_left_cell">
          <view class="top_left_cell_content" @click="routeLogin">
            <image class="top_left_cell_content_avatar" :src="userObj.img" mode="aspectFit"></image>
            <view class="top_left_cell_content_word">
              <view class="detail">
                <view class="name">
                  {{ userObj.nickName || "微信用户" }}
                </view>
                <view class="status">
                  <view class="level">A2</view>
                </view>
              </view>
              <view class="desc"> 35岁 </view>
            </view>
          </view>
        </view>
        <view class="top_right_cell">
          <view class="top_right_cell_content">
            <text class="top_right_cell_content_text"> 编辑信息 </text>
            <u-icon name="arrow-right" color="#ffffff" size="14"></u-icon>
          </view>
        </view>
      </view>

      <view class="other_cell">
        <view class="choose_cell">
          <u-cell-group>
            <u-cell customStyle="padding:10rpx 0 10rpx 0" :isLink="true" arrow-direction="left" title="修改密码">
              <template #icon>
                <image src="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-05-26/1748245329814切图 173@2x.png"
                  style="width: 40rpx; height: 40rpx" />
              </template>
            </u-cell>
            <u-cell customStyle="padding:10rpx 0 10rpx 0" :isLink="true" arrow-direction="left" title="消息通知">
              <template #icon>
                <image src="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-05-26/1748245425781切图 174@2x.png"
                  style="width: 40rpx; height: 40rpx" />
              </template> </u-cell><u-cell customStyle="padding:10rpx 0 10rpx 0" :isLink="true" arrow-direction="left"
              title="使用帮助与反馈">
              <template #icon>
                <image src="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-05-26/1748245429712切图 175@2x.png"
                  style="width: 40rpx; height: 40rpx" />
              </template> </u-cell><u-cell customStyle="padding:10rpx 0 10rpx 0" :isLink="true" arrow-direction="left"
              title="关于本程序">
              <template #icon>
                <image src="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-05-26/1748245433427切图 176@2x.png"
                  style="width: 40rpx; height: 40rpx" />
              </template> </u-cell><u-cell customStyle="padding:10rpx 0 10rpx 0" :isLink="true" arrow-direction="left"
              title="设置">
              <template #icon>
                <image src="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-05-26/1748245436939切图 177@2x.png"
                  style="width: 40rpx; height: 40rpx" />
              </template>
            </u-cell>
          </u-cell-group>
        </view>
      </view>
      <view class="bottom_out">
        <view class="btn" @click="handleLogOut">退出登录</view>
      </view>
    </view>

    <u-popup :show="showContactModal" mode="bottom" @close="showContactModal = false" :safeAreaInsetBottom="false"
      :customStyle="{
        margin: '0 32rpx 60rpx 32rpx',
        borderRadius: '30rpx',
      }">
      <view class="popup-content">
        <view class="popup_header"> 请选择联系方式 </view>
        <view class="flex items-center">
          <button class="pop-btn contact" open-type="contact">
            <view class="pop-btn-title"> 联系客服 </view>
          </button>
          <button class="pop-btn phone" @click="callPhoneNumber">
            <view class="pop-btn-title"> 拨打电话 </view>
          </button>
        </view>
      </view>
    </u-popup>

    <u-popup :show="showPopup" mode="center" :safeAreaInsetBottom="false" closeOnClickOverlay @close="showPopup = false"
      :customStyle="{
        margin: '0 32rpx',
        borderRadius: '30rpx',
      }">
      <view class="popup-cell">
        <view class="popup-cell-title"> 确定要退出登录吗？ </view>
        <view class="choose_btn flex item-center justify-around">
          <view class="cancel_btn" @click="showPopup = false"> 取消 </view>
          <view class="sure_btn" @click="handleSureLogOut"> 确认 </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
import { deleteWeChatLogout } from "@/api/user.js";
export default {
  data() {
    return {
      showPopup: false,
      showContactModal: false,
      userObj: {},
      accountBalance: null,
      defaultCarInfo: {},
      isVip: uni.getStorageSync("isVip") || undefined,
    };
  },
  mounted() {
    this.updateUserInfoFn();
  },
  methods: {
    ...mapMutations(["storeLogoutFn"]),
    routeToMiniProgram() {
      wx.navigateToMiniProgram({
        appId: "wxd1274ffbf7030f7d",
        path: "pages/index/index",
        extraData: {
          foo: "bar",
        },
        envVersion: "trial",
        success(res) {
          // 打开成功
          console.log("res：", res);
        },
      });
    },
    initProject() {
      this.defaultCarInfo = uni.getStorageSync("defaultCarInfo");
    },
    handleLogOut() {
      const hasLogin = uni.getStorageSync("hasLogin");
      if (!hasLogin) {
        uni.navigateTo({
          url: "/pagesStore/login",
        });
        return;
      }
      this.showPopup = true;
    },
    handleSureLogOut() {
      let that = this;
      deleteWeChatLogout().then((res) => {
        that.storeLogoutFn();
        uni.showToast({
          title: "退出登录成功",
          duration: 2000,
          complete: function () {
            that.showPopup = false;
            setTimeout(() => {
              uni.$emit("updateUserInfo", { msg: "更新用户信息" });
            }, 1000);
          },
        });
      });
    },
    updateUserInfoFn() {
      this.defaultCarInfo = uni.getStorageSync("defaultCarInfo");
      this.userObj =
        uni.getStorageSync("userInfo") || this.$store.state.userInfo;
    },
    routePage(url) {
      uni.navigateTo({
        url: url,
      });
    },
    routeLogin() {
      uni.navigateTo({
        url: "/pagesStore/editUser",
      });
    },
    //拨打固定电话
    callPhoneNumber() {
      uni.makePhoneCall({
        phoneNumber: "17521094340",
      });
    },
    handleComingSoon() {
      this.$utils.toast("敬请期待～");
    },
  },
};
</script>
<style lang="scss">
.u-cell {
  height: 200rpx !important;
}

.u-cell__body {
  height: 200rpx !important;
}
</style>
<style lang="scss" scoped>
.mine {
  padding: 20rpx 32rpx 200rpx;

  .top_cell {
    display: flex;
    justify-content: space-between;

    .top_left_cell {
      .top_left_cell_content {
        display: flex;
        align-items: center;
        margin-bottom: 80rpx;

        .top_left_cell_content_avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-right: 18rpx;
          border: 4rpx solid #fff;
        }

        .top_left_cell_content_word {
          .detail {
            display: flex;
            justify-content: center;
            align-items: center;

            .name {
              font-weight: 700;
              font-size: 44rpx;
              color: #ffffff;
              line-height: 60rpx;
            }

            .status {
              width: 79rpx;
              height: 42rpx;
              background: #1eb375;
              border-radius: 46rpx 46rpx 46rpx 46rpx;
              display: flex;
              justify-content: center;
              margin-left: 24rpx;

              .level {
                font-family: PingFang SC, PingFang SC;
                font-weight: 400;
                font-size: 24rpx;
                color: #FFFFFF;
                text-align: left;
                font-style: normal;
                text-transform: none;
                line-height: 42rpx;
              }
            }
          }

          .desc {
            font-weight: 500;
            font-size: 24rpx;
            color: #ffffff;
            line-height: 50rpx;
          }
        }
      }
    }

    .top_right_cell {
      width: 160rpx;
      height: 40rpx;

      .top_right_cell_content {
        display: flex;
        justify-content: center;
        align-items: center;

        .top_right_cell_content_text {
          color: #ffff;
          margin-right: 8rpx;
          font-size: 28rpx;
        }

        .top_right_cell_content_icon {}
      }
    }
  }

  .other_cell {
    // padding: 32rpx 0 0;
    border-radius: 20rpx;
    background: linear-gradient(136deg, #fbfdfd 0%, #ffffff 100%),
      linear-gradient(180deg, #dfeaff 0%, #ffffff 100%), #ffffff;

    .choose_cell {

      // :deep .u-cell{
      //   height:122rpx;
      //   
      // }
      // .custom-group .u-cell {
      //   height: 100rpx;
      //   color: red;
      // }
      .u-cell__body {
        height: 200rpx;
      }
    }
  }

  .bottom_out {
    width: 100%;
    height: 98rpx;
    background: #FFFFFF;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 140rpx;

    .btn {
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 36rpx;
      color: #000000;
      font-style: normal;
      text-transform: none;
    }
  }
}

.popup-content {
  padding: 0 40rpx 68rpx;
  background: linear-gradient(180deg, #c5e1ff 0%, #f7fcff 100%);
  border-radius: 32rpx;

  .popup_header {
    display: flex;
    justify-content: center;
    padding: 32rpx 0 40rpx 0;
    font-weight: 700;
    font-size: 36rpx;
    color: #2a304a;
    text-align: center;
  }

  .pop-btn {
    background-color: #fff;
    padding: 0 !important;
    font-size: 28rpx;
    color: #2a304a;
    line-height: 39rpx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 40rpx;

    .pop-btn-title {
      padding-bottom: 20rpx;
    }
  }

  .contact {
    width: 202rpx;
    height: 196rpx;
    background-image: url("https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/140035.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .phone {
    width: 202rpx;
    height: 196rpx;
    background-image: url("https://img.lgfw24hours.com:8443/upload/parkingManage/2024-09-06/140039.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.popup-cell {
  width: calc(100vw - 64rpx);
  text-align: center;
  padding: 56rpx 0 32rpx;

  .popup-cell-title {
    font-weight: 700;
    font-size: 36rpx;
    color: #2a304a;
    line-height: 50rpx;
    margin-bottom: 40rpx;
  }

  .choose_btn {
    padding: 0 20rpx;

    .cancel_btn {
      width: 250rpx;
      height: 92rpx;
      line-height: 92rpx;
      border-radius: 92rpx;
      background: linear-gradient(180deg, #dcdcdc 0%, #aaaaaa 100%);
      box-shadow: inset 0rpx -3rpx 1rpx 0rpx rgba(0, 0, 0, 0.3);
      font-weight: 700;
      font-size: 36rpx;
      color: #ffffff;
      text-align: center;
    }

    .sure_btn {
      width: 250rpx;
      height: 92rpx;
      line-height: 92rpx;
      border-radius: 92rpx;
      background: linear-gradient(321deg, #5583ff 0%, #7ea1ff 100%),
        linear-gradient(180deg, #68a7fd 0%, #5370ff 100%), #d8d8d8;
      box-shadow: inset 0rpx -3rpx 1rpx 0rpx rgba(0, 0, 0, 0.3);
      font-weight: 700;
      font-size: 36rpx;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
