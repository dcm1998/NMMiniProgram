<template>
  <view class="item-main" :style="height ? 'height:' + height + 'rpx;' : ''">
    <scroll-view class="item-right" scroll-y="true">
      <view
        class="item-right-list"
        v-if="newList.length > 0"
        v-for="(item, index) in newList"
        :key="index"
        @click.stop="selectRight(item)"
      >
        <view class="item-right-list-name" :style="item.chooseState ? 'color:' + themeColor : ''"
          >{{ item.name }}
        </view>
        <image v-if="item.chooseState" class="item-right-list-img" src="/static/dropdown/select.png"> </image>
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
      selectLeftIndex: 0,
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
      this.height = this.itemList.length * 72 + 108
    })
  },
  methods: {
    selectRight(item) {
      if (!this.isMultiple) this.initial()
      item.chooseState = !item.chooseState
      this.newList = JSON.parse(JSON.stringify(this.newList))
    },
    initial() {
      this.newList.forEach(item => {
        item.chooseState = false
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
        type: 2,
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

  .item-left {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    .item-left-list {
      box-sizing: border-box;
      padding: 0 40rpx;
      width: 100%;
      height: 72rpx;
      background: #f4f4f4;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 28rpx;
      color: #383838;
    }
  }

  .item-right {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    background-color: #ffffff;

    .item-right-list {
      width: 100%;
      box-sizing: border-box;
      height: 72rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32rpx;

      .item-right-list-name {
        font-size: 28rpx;
        color: #333333;
      }

      .item-right-list-img {
        width: 34rpx;
        height: 34rpx;
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
