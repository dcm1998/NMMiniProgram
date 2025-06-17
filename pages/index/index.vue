<template>
  <view>
    <home ref="homeRef" v-if="PageCur == 'home'"></home>
    <order ref="orderRef" v-else-if="PageCur == 'order'"></order>
    <news ref="newsRef" v-else-if="PageCur == 'news'"></news>
    <me ref="meRef" v-else-if="PageCur == 'me'"></me>

    <tqb-tabbar @NavChange="NavChange" />
  </view>
</template>

<script>
import home from "./homePage.vue"; //首页
import order from "./orders.vue";
import news from "./messages.vue";
import me from "./me.vue"; //我的
import { tenToVideo } from "@/common/utils";
export default {
  components: {
    home,
    order,
    news,
    me,
  },
  data() {
    return {
      PageCur: "home",
      message: "2",
      openId: "",
      access_token: "",
      tip: "我是提示",
      duration: 1,
    };
  },
  created() {},
  // 分享小程序
  onShareAppMessage(res) {
    return {
      title:
        "易泊航小程序提供智能化的停车服务，包括停车场信息查询、预约停车、便捷寻车、在线支付等功能。",
    };
  },
  onShow() {
    let that = this;
    uni.$on("updateUserInfo", (data) => {
      that.$refs.meRef.updateUserInfoFn && that.$refs.meRef.updateUserInfoFn();
    });

    if (this.PageCur == "home") {
      setTimeout(() => {
        this.$refs.homeRef.updateUserInfoFn && this.$refs.homeRef.updateUserInfoFn();
        this.$refs.homeRef.hasPermission && this.$refs.homeRef.hasPermission();
        this.$refs.homeRef.initProject && this.$refs.homeRef.initProject();
      }, 300);
    }
    if (this.PageCur == "order") {
      setTimeout(() => {
        this.$refs.orderRef.initProject && this.$refs.orderRef.initProject();
      }, 300);
    }
    if (this.PageCur == "news") {
      setTimeout(() => {
        this.$refs.newsRef.initProject && this.$refs.newsRef.initProject();
      }, 300);
    }
    if (this.PageCur == "me") {
      setTimeout(() => {
        this.$refs.meRef.initProject && this.$refs.meRef.initProject();
      }, 300);
    }
  },
  methods: {
    NavChange: function (e) {
      // const token = uni.getStorageSync('token')
      // //需要登录
      // if (!token) {
      //   uni.showToast({
      //     title: '请先登录～',
      //     icon: 'none',
      //     duration: 2000,
      //     complete: function () {
      //       setTimeout(() => {
      //         uni.reLaunch({
      //           url: '/pagesStore/login'
      //         })
      //       }, 1000)
      //     }
      //   })
      //   return false
      // }
      this.PageCur = e;
      if (this.PageCur == "home") {
        setTimeout(() => {
          this.$refs.homeRef.initProject && this.$refs.homeRef.initProject();
        }, 300);
      }
      if (this.PageCur == "order") {
        setTimeout(() => {
          this.$refs.orderRef.initProject && this.$refs.orderRef.initProject();
        }, 300);
      }
      if (this.PageCur == "news") {
        setTimeout(() => {
          this.$refs.newsRef.initProject && this.$refs.newsRef.initProject();
        }, 300);
      }
      if (this.PageCur == "me") {
        setTimeout(() => {
          this.$refs.meRef.initProject && this.$refs.meRef.initProject();
        }, 300);
      }
    },
  },
  onHide() {
    if (this.PageCur == "order") {
      setTimeout(() => {
        this.$refs.orderRef.resetData && this.$refs.orderRef.resetData();
      }, 300);
    }
    if (this.PageCur == "news") {
      setTimeout(() => {
        this.$refs.newsRef.resetData && this.$refs.newsRef.resetData();
      }, 300);
    }

    if (this.PageCur == "home") {
      setTimeout(() => {
        this.$refs.homeRef.hide && this.$refs.homeRef.hide();
      }, 300);
    }
  },
  onLoad(options) {
    let cur = options?.PageCur;
    if (cur) {
      this.PageCur = cur;
    }
  },
  onUnload() {},
};
</script>

<style lang="scss" scoped>
.box {
  margin: 20upx 0;
}

.box view.cu-bar {
  margin-top: 20upx;
}

.logo_btn {
  width: 38 * 2rpx;
  height: 38 * 2rpx;
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  top: -40rpx;
  left: 0rpx;
  right: 0;
  margin: auto;
  padding: 0;
}

.cu-bar.tabbar .action.add-action {
  padding-top: 56rpx !important;
}
</style>
