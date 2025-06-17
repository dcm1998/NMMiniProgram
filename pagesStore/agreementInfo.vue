<!--
 * @Author: YinXuan
 * @Date: 2023-09-19 09:32:52
 * @LastEditTime: 2023-11-24 14:59:36
 * @Description: 用户服务协议
-->
<script>
import { getAgreementInfo } from '@/api/user'
export default {
  data() {
    return {
      agreementTitle: '',
      agreementContent: ''
    }
  },
  methods: {
    fetchAgreementInfoList() {
      let params = {
        agreementType: 0
      }
      let that = this
      getAgreementInfo(params).then(res => {
        that.agreementTitle = res.agreementTitle
        that.agreementContent = res.agreementContent
      })
    }
  },
  mounted() {},
  onShow() {
    this.fetchAgreementInfoList()
  }
}
</script>

<template>
  <view>
    <cu-custom
      bgImage="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-06/1749192555188bg.png"
      :isBack="true"
    >
      <block slot="content">用户服务协议</block>
    </cu-custom>
    <view class="container">
      <!-- <view v-html="agreementTitle"></view> -->
      <view v-html="agreementContent"></view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.container {
  padding-bottom: calc(env(safe-area-inset-bottom));
}
</style>
