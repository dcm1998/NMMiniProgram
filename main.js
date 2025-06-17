/*
 * @Author: YinXuan
 * @Date: 2023-08-28 10:22:50
 * @LastEditTime: 2023-12-03 10:17:46
 * @Description:
 */
import Vue from 'vue'
import App from './App'

// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
import NavCustom from './components/NavCustom/NavCustom.vue'
Vue.component('nav-custom', NavCustom)
// 导入 store 的实例对象
import store from './store/index'
Vue.prototype.$store = store
// 引入:uView-UI
import uView from './uni_modules/uview-ui'
Vue.use(uView)
// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI)
// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)
import utils from './utils/utils'
Vue.prototype.$utils = utils
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
