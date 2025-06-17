<template>
  <view>
    <button type="primary" @click="startBluetoothDeviceDiscovery">搜索蓝牙</button>
    <button type="primary" @click="onBluetoothDeviceFound">发现外围设备</button>
    <button type="primary" @click="getBluetoothDevices">获取蓝牙设备信息</button>
    <button type="primary" @click="getBLEDeviceServices">获取蓝牙所有服务</button>
    <button type="primary" @click="getBLEDeviceCharacteristics">进入特征</button>
    <view v-for="(item, index) in list" :key="index">
      {{ item.name }}:{{ item.deviceId }}
      <button type="primary" @click="createBLEConnection(item.deviceId)">连接</button>
    </view>
    <button type="primary" @click="writeBLECharacteristicValue">写入蓝牙</button>
    <button type="primary" @click="stopBluetoothDevicesDiscovery">停止搜索蓝牙</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      deviceId: '',
      serviceId: '',
      characteristics: [],
      characteristicId: ''
    }
  },
  onShow() {
    uni.openBluetoothAdapter({
      success: res => {
        //已打开
        uni.getBluetoothAdapterState({
          //蓝牙的匹配状态
          success: res1 => {
            console.log(res1, '本机设备的蓝牙已打开')
            // 开始搜索蓝牙设备
            this.startBluetoothDeviceDiscovery()
          },
          fail(error) {
            uni.showToast({ icon: 'none', title: '查看手机蓝牙是否打开' })
          }
        })
      },
      fail: err => {
        //未打开
        uni.showToast({ icon: 'none', title: '查看手机蓝牙是否打开' })
      }
    })
  },
  methods: {
    // 开始搜索蓝牙设备
    startBluetoothDeviceDiscovery() {
      uni.startBluetoothDevicesDiscovery({
        success: res => {
          console.log('startBluetoothDevicesDiscovery success', res)
          // 发现外围设备
          this.onBluetoothDeviceFound()
        },
        fail: err => {
          console.log(err, '错误信息')
        }
      })
    },
    // 发现外围设备
    onBluetoothDeviceFound() {
      uni.onBluetoothDeviceFound(res => {
        console.log(JSON.stringify(res.devices))
        if (this.list.indexOf(res.devices[0].deviceId) == -1) {
          this.list.push({
            name: res.devices[0].name,
            deviceId: res.devices[0].deviceId
          })
        }
      })
    },
    //获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
    getBluetoothDevices() {
      console.log('获取蓝牙设备')
      uni.getBluetoothDevices({
        success: res => {
          console.log('获取蓝牙设备成功:')
          console.log(res.devices)
        }
      })
    },
    //选择设备连接吧deviceId传进来
    createBLEConnection(deviceId) {
      //data里面建立一个deviceId，存储起来
      ;(this.deviceId = deviceId),
        //连接蓝牙
        uni.createBLEConnection({
          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
          deviceId: this.deviceId,
          success(res) {
            console.log(res)
            console.log('蓝牙连接成功')
          },
          fail(res) {
            console.log('蓝牙连接失败', res)
          }
        })
    },
    // 停止搜寻蓝牙设备
    stopBluetoothDevicesDiscovery() {
      uni.stopBluetoothDevicesDiscovery({
        success: e => {
          this.loading = false
          console.log('停止搜索蓝牙设备:' + e.errMsg)
        },
        fail: e => {
          console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode)
        }
      })
    },
    //获取蓝牙特征
    getBLEDeviceCharacteristics() {
      console.log('进入特征')
      setTimeout(() => {
        uni.getBLEDeviceCharacteristics({
          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
          deviceId: this.deviceId,
          // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
          serviceId: this.serviceId,
          success: res => {
            console.log(res, '特征getBLEDeviceCharacteristics')
            this.characteristics = res.characteristics
            console.log(this.characteristics)

            res.characteristics.forEach(item => {
              if (item.uuid.indexOf('470A') != -1) {
                this.characteristicId = item.uuid
                //console.log('characteristicId:', item.uuid)
                //利用传参的形势传给下面的notify，这里的uuid如果都需要用到，就不用做判断了，建议使用setTimeout进行间隔性的调用此方法
                this.notifyBLECharacteristicValueChange(item.uuid)
              }
            })
          },
          fail: res => {
            console.log(res)
          }
        })
      }, 1000)
    },
    // 启用 notify 功能
    notifyBLECharacteristicValueChange(characteristicId) {
      console.log(characteristicId, 'characteristicId')
      uni.notifyBLECharacteristicValueChange({
        state: true, // 启用 notify 功能
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: this.deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId: this.serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId: characteristicId,
        success: res => {
          console.log(res)
          // console.log(this.characteristicId)
          console.log('notifyBLECharacteristicValueChange success', res.errMsg)
        },
        fail: res => {
          console.log('notifyBLECharacteristicValueChange fail', res.errMsg)
        }
      })
    },
    //获取蓝牙的所有服务
    getBLEDeviceServices() {
      setTimeout(() => {
        uni.getBLEDeviceServices({
          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
          deviceId: this.deviceId,
          success: res => {
            console.log('device services:', res)
            //E95D93AF-251D-470A-A062-FA1922DFA9A8
            //6E400001-B5A3-F393-E0A9-E50E24DCCA9E
            res.services.forEach(item => {
              if (item.uuid.indexOf('470A') != -1) {
                this.serviceId = item.uuid
                console.log(this.serviceId)
                //获取特征
                this.getBLEDeviceCharacteristics()
              }
            })
          }
        })
      }, 1000)
    },
    //写入蓝牙
    writeBLECharacteristicValue() {
      let buffer = new ArrayBuffer(1)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, 0x20)
      uni.writeBLECharacteristicValue({
        deviceId: this.deviceId,
        serviceId: this.serviceId,
        characteristicId: this.characteristicId,
        value: buffer,
        success(res) {
          console.log('writeBLECharacteristicValue success', res.errMsg)
        },
        fail(res) {
          console.log(JSON.stringify(res))
          console.log(JSON.stringify(buffer))
        }
      })
    }
  }
}
</script>
