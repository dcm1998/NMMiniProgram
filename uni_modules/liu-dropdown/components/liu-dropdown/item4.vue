<template>
  <view class="item-main" :style="height ? 'height:' + height + 'rpx;' : ''">
    <scroll-view class="item-list" scroll-y="true">
      <view class="list-info" v-for="(item, index) in newList" :key="index">
        <view class="item-title" v-if="item.childs.length > 0">{{ item.name }}</view>
        <view class="list-mess">
          <view
            class="mess-name"
            @click.stop="selectRight(mess)"
            :style="mess.chooseState ? 'color:' + themeColor + ';border-color: ' + themeColor : ''"
            v-for="(mess, id) in item.childs"
            :key="id"
            >{{ mess.name }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="btn-list">
      <view class="btn-reset" @click.stop="reset">重置</view>
      <view class="btn-complete" :style="'background: ' + themeColor" @click.stop="complete">完成</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    //数据源
    itemList: {
      type: Array,
      default: () => {
        return []
      }
    },
    //是否多选
    isMultiple: {
      type: Boolean,
      default: false
    },
    //主题色
    themeColor: {
      type: String,
      default: '#FD430E'
    }
  },
  data() {
    return {
      height: 0,
      newList: []
    }
  },
  watch: {
    itemList: {
      deep: true,
      immediate: true,
      handler(newArr) {
        if (newArr.length) {
          this.newList = newArr
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let view = uni.createSelectorQuery().in(this).select('.item-list')
      view
        .boundingClientRect(res => {
          this.height = this.px2rpx(res.height) + 108
        })
        .exec()
    })
  },
  methods: {
    px2rpx(px) {
      const systemInfo = uni.getSystemInfoSync()
      return px / (systemInfo.screenWidth / 750)
    },
    selectRight(item) {
      if (!this.isMultiple) this.initial()
      item.chooseState = !item.chooseState
      this.newList = JSON.parse(JSON.stringify(this.newList))
    },
    initial() {
      this.newList.forEach(res => {
        res.childs.forEach(item => {
          item.chooseState = false
        })
      })
    },
    //重置
    reset() {
      this.initial()
      this.newList = JSON.parse(JSON.stringify(this.newList))
    },
    //完成
    complete() {
      this.$emit('complete', {
        type: 1,
        list: this.newList
      })
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}
</style>
<style scoped lang="scss">
.item-main {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 102rpx;
  max-height: 60vh;

  .item-list {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 6rpx 16rpx;

    .list-info {
      height: auto;

      .item-title {
        padding: 0 8rpx;
        font-size: 28rpx;
        color: #333333;
        height: 56rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 6rpx;
        font-weight: bold;
      }

      .list-mess {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;

        .mess-name {
          padding: 0 32rpx;
          height: 54rpx;
          background: #f4f4f4;
          border: solid #f4f4f4 1rpx;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          color: #333333;
          margin: 0 8rpx 16rpx 8rpx;
        }
      }
    }
  }

  .btn-list {
    position: absolute;
    bottom: 0rpx;
    width: 100%;
    height: 102rpx;
    background: #fefffe;
    box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-around;

    .btn-reset {
      width: 320rpx;
      height: 72rpx;
      background: #ffffff;
      border-radius: 40rpx;
      border: 2rpx solid #e6e6e6;
      font-size: 30rpx;
      color: #3e3e3e;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-complete {
      width: 320rpx;
      height: 76rpx;
      border-radius: 40rpx;
      font-size: 30rpx;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
