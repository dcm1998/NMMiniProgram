<!--
 * @Author: YinXuan
 * @Date: 2025-03-28 15:27:18
 * @LastEditTime: 2025-04-15 14:10:40
 * @Description: 
-->
<template>
  <view class="chat-box">
    <nav-custom :isBack="true">
      <block slot="content">
        <view class="flex item-center justify-around">
          <view @click="chooseItem('对话')">
            <text :class="[currentIndex === 0 ? 'active-title' : 'chat-title']"> 对话 </text>
          </view>
          <view @tap="chooseItem('助手')">
            <text :class="[currentIndex === 1 ? 'active-title' : 'chat-title']"> 助手 </text>
          </view>
        </view>
      </block>
    </nav-custom>

    <view class="chat-content">
      <view class="chat-top">
        <template v-if="currentIndex === 0">
          <view>
            <image class="chat-top-left" src="/pagesAI/static/chat-person.png" mode="aspectFill"></image>
          </view>

          <view class="chat-top-right">
            <view class="chat-top-right-title">
              哈喽~ <image src="/pagesAI/static/hand.png" mode="aspectFill"></image>
            </view>
            <view class="chat-top-right-content"> 我是AI Chat，我会回答你提出的任何问题，解答各种疑惑~ </view>
          </view>
        </template>
        <template v-else>
          <view>
            <image class="chat-top-left" src="/pagesAI/static/ai-person.png" mode="aspectFill"></image>
          </view>

          <view class="chat-top-right">
            <view class="chat-top-right-title">
              Hi~ <image src="/pagesAI/static/hand.png" mode="aspectFill"></image>
            </view>
            <view class="chat-top-right-content"> 我是AI 小助手，我会回答你提出的任何问题，解答各种疑惑~ </view>
          </view>
        </template>
      </view>

      <!-- 消息列表 -->
      <template v-if="currentIndex === 0">
        <scroll-view
          scroll-y
          class="message-list"
          id="commonScroll"
          :scroll-top="commonScrollTop"
          :scroll-with-animation="true"
        >
          <view
            v-for="(item, index) in commonMessageList"
            :key="index"
            :class="['message-item', item.type === 'user' ? 'message-right' : 'message-left']"
          >
            <image
              :src="
                item.type === 'user'
                  ? userEdit.img
                  : 'https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-03/17015728111481@2x.png'
              "
              class="avatar"
              mode="aspectFill"
            />
            <view class="message-content">
              <view v-html="item.content"> </view>
            </view>
          </view>
        </scroll-view>
      </template>
      <template v-else>
        <scroll-view
          scroll-y
          class="message-list"
          id="aiScroll"
          :scroll-top="aiScrollTop"
          :scroll-with-animation="true"
        >
          <view
            v-for="(item, index) in aiMessageList"
            :key="index"
            :class="['message-item', item.type === 'user' ? 'message-right' : 'message-left']"
          >
            <image
              :src="
                item.type === 'user'
                  ? userEdit.img
                  : 'https://img.lgfw24hours.com:8443/upload/parkingManage/2023-12-03/17015728111481@2x.png'
              "
              class="avatar"
              mode="aspectFill"
            />
            <view class="message-content">
              <view v-html="item.content"> </view>
            </view>
          </view>
        </scroll-view>
      </template>
    </view>
    <view class="bottom-btn" :style="{ bottom: safeBottom + 'px' }">
      <u-input
        v-model="searchValue"
        placeholder="请输入"
        border="none"
        disabledColor="#ffffff"
        clearable
        fontSize="32rpx"
        color="#000000"
        background="#000000"
        confirm-type="send"
        :placeholderStyle="{ color: '#000000', background: '#000000' }"
        :customStyle="{
          paddingLeft: '64rpx',
          paddingTop: '22rpx',
          paddingBottom: '22rpx',
          background: '#fff',
          borderRadius: '64rpx'
        }"
        :adjustPosition="false"
        @confirm="handleSendMessage"
      >
        <template slot="suffix">
          <image
            src="https://img.lgfw24hours.com:8443/upload/parkingManage/2024-08-20/150729.png"
            mode=""
            style="width: 40rpx; height: 40rpx; margin-right: 40rpx"
          /> </template
      ></u-input>
    </view>
  </view>
</template>
<script>
import { postDeepSeekChat, postDeepSeekFunction, postDeepSeekClose } from '@/api/ai.js'
export default {
  data() {
    return {
      currentIndex: 0,
      searchValue: '',
      commonMessageList: [], // 用于存储通用消息
      commonScrollTop: 0,
      aiMessageList: [], // 用于存储AI消息
      aiScrollTop: 0,
      userEdit: {},
      safeBottom: 0, // 初始化为0
      scrollTimer: null
    }
  },
  computed: {
    userInfo() {
      this.userEdit = uni.getStorageSync('userInfo')
      return uni.getStorageSync('userInfo')
    }
  },
  onLoad() {
    // IOS虚拟键盘弹起时，整个页面弹起的bug
    // 监听键盘高度变化
    uni.onKeyboardHeightChange(res => {
      if (res.height === 0) {
        // 键盘收起
        this.safeBottom = 0
      } else {
        // 键盘弹起，添加20px的间距
        this.safeBottom = res.height
      }
    })
  },
  methods: {
    chooseItem(type) {
      switch (type) {
        case '对话':
          this.currentIndex = 0
          break
        case '助手':
          this.currentIndex = 1
          break
        default:
          this.currentIndex = 0
          break
      }
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    handleSendMessage() {
      if (!this.searchValue.trim()) {
        uni.showToast({
          title: '请输入内容',
          icon: 'none'
        })
        return
      }

      // 这里添加发送消息的逻辑
      const message = {
        content: this.searchValue,
        type: 'user',
        time: new Date().getTime()
      }
      if (this.currentIndex === 0) {
        this.commonMessageList.push(message)
      } else {
        this.aiMessageList.push(message)
      }

      let params = {
        role: 'user',
        name: this.userEdit.id,
        content: this.searchValue
      }
      let that = this
      if (this.currentIndex === 0) {
        postDeepSeekChat(params)
          .then(res => {
            const aiMessage = {
              content: res.content,
              type: 'ai',
              time: new Date().getTime()
            }
            that.commonMessageList.push(aiMessage)
          })
          .finally(() => {
            // 滚动到底部
            that.scrollToBottom()
          })
      } else {
        postDeepSeekFunction(params)
          .then(res => {
            const aiMessage = {
              content: res.message,
              type: 'ai',
              time: new Date().getTime()
            }
            that.aiMessageList.push(aiMessage)
          })
          .finally(() => {
            // 滚动到底部
            that.scrollToBottom()
          })
      }

      // 清空输入框
      this.searchValue = ''
    },

    scrollToBottom() {
      console.log('scrollToBottom')
      // 清除之前的定时器
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
      }
      let that = this
      this.scrollTimer = setTimeout(() => {
        const query = uni.createSelectorQuery().in(this)
        query
          .select('.message-list')
          .boundingClientRect(data => {
            if (data) {
              query
                .selectAll('.message-item')
                .boundingClientRect(messageRects => {
                  if (messageRects && messageRects.length > 0) {
                    const totalHeight = messageRects.reduce((sum, rect) => sum + rect.height, 0)
                    if (that.currentIndex === 0) {
                      that.commonScrollTop = totalHeight
                    } else {
                      that.aiScrollTop = totalHeight
                    }
                  }
                })
                .exec()
            }
          })
          .exec()
      }, 100)
    }
  },
  destroyed() {
    // 清除之前的定时器
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
    // 关闭页面时关掉所有会话
    postDeepSeekClose({ type: 'all' })
  }
}
</script>
<style>
page {
  background: #f2f5f9;
}
</style>
<style lang="scss" scoped>
.chat-content {
  height: calc(100vh - 188rpx - 140rpx - env(safe-area-inset-bottom));
  padding: 32rpx;
  display: flex;
  flex-direction: column;

  .chat-top {
    width: 100%;
    height: 204rpx;
    background-image: url('/pagesAI/static/chat-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 0 70rpx 0 64rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    flex-shrink: 0; // 防止压缩
    .chat-top-left {
      width: 130rpx;
      height: 196rpx;
      margin-top: -80rpx;
      margin-right: 32rpx;
    }
    .chat-top-right {
      .chat-top-right-title {
        display: flex;
        align-items: center;
        font-size: 40rpx;
        font-weight: 600;
        line-height: 54rpx;
        color: rgba(27, 27, 27, 1);
        image {
          width: 48rpx;
          height: 48rpx;
          margin-left: 14rpx;
        }
      }
    }
  }

  .message-list {
    flex: 1;
    height: calc(100vh - 188rpx - 140rpx - 204rpx - 64rpx - env(safe-area-inset-bottom));
    overflow-y: auto;
    padding: 20rpx;
  }

  .message-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30rpx;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }

    .message-content {
      max-width: 70%;
      margin: 0 20rpx;
      padding: 20rpx;
      border-radius: 20rpx;
      font-size: 28rpx;
      word-break: break-all;
    }
  }

  .message-left {
    .message-content {
      background-color: #fff;
    }
  }

  .message-right {
    flex-direction: row-reverse;

    .message-content {
      background-color: #c8ff7a;
    }
  }
}
.chat-title {
  font-size: 34rpx;
  font-weight: 600;
  letter-spacing: 0rpx;
  line-height: 45rpx;
  color: rgba(27, 27, 27, 0.3);
}
.active-title {
  font-size: 38rpx;
  font-weight: 600;
  letter-spacing: 0rpx;
  line-height: 45rpx;
  color: rgba(27, 27, 27, 1);
  border-bottom: 8rpx solid rgba(200, 255, 122, 0.8);
}
.bottom-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  background: linear-gradient(180deg, rgba(200, 255, 122, 1) 0%, rgba(255, 255, 255, 0.97) 100%);
  padding-top: 20rpx;
  z-index: 999;
}
</style>
