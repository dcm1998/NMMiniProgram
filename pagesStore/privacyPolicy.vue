<!--
 * @Author: YinXuan
 * @Date: 2023-09-19 09:32:52
 * @LastEditTime: 2023-11-24 15:01:18
 * @Description: 《隐私权政策》
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
        agreementType: 1
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
      bgImage="https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-21/1703145140335Theme=Light@2x.png"
      :isBack="true"
    >
      <block slot="content">隐私权政策</block>
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
