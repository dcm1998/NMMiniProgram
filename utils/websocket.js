/*
 * @Author: YinXuan
 * @Date: 2023-09-21 09:08:31
 * @LastEditTime: 2023-11-28 15:32:44
 * @Description: 封装websocket
 */
const _WEBSOCKET = {
  //是否打开连接
  isOpen: false,
  //连接socket
  connectSocket(url, successFunc = null, errorFunc = null, socketClose = null) {
    try {
      //连接socket
      uni.connectSocket({
        url,
        success() {
          console.log('websocket连接成功！',url)
        }
      })
      //监听socket连接
      uni.onSocketOpen(res => {
        this.isOpen = true
        console.log('WebSocket连接已打开！')
        if (successFunc) {
          successFunc(res)
        }
      })
      //监听socket连接失败
      uni.onSocketError(res => {
        this.isOpen = false
        console.log('WebSocket连接打开失败，请检查！')
        if (errorFunc) {
          errorFunc(res)
        }
      })
      //监听收到消息
      uni.onSocketMessage(res => {
        // console.log('收到服务器内容：' + res.data)
        if (successFunc) {
          successFunc(res.data)
        }
      })
      //监听socket关闭
      uni.onSocketClose(res => {
        console.log('WebSocket 已关闭！')
        this.isOpen = false
        if (socketClose) {
          socketClose(res)
        }
      })
    } catch (error) {
      console.log('err:' + error)
    }
  },
  //发送消息
  sendMessage(msg = '', successFunc = null, errorFunc = null) {
    if (!this.isOpen || !msg) {
      if (errorFunc) {
        errorFunc('未传消息内容或连接未打开！')
      }
      return
    }
    uni.sendSocketMessage({
      data: msg,
      success(res) {
        // console.log('消息发送成功！', msg)
        if (successFunc) {
          successFunc(res)
        }
      },
      fail(err) {
        console.log('消息发送失败！')
        if (errorFunc) {
          errorFunc(err)
        }
      }
    })
  },
  //关闭连接
  closeSocket() {
    if (!this.isOpen) {
      return
    }
    //关闭socket连接
    uni.closeSocket()
    console.log('关闭socket连接成功')
  }
}

export default _WEBSOCKET
