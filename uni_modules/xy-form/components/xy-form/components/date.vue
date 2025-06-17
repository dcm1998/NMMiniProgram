<template>
	<view style="width: 100%" class="flex-1">
		<view class="cx-val flex align-center justify-end flex-1" @click="openDatePopup" :class="{'cx-val--placeholder': !currentVal}">
		{{ value ? value : '请选择' }}
		<u-icon name="arrow-right" :size="16" :color="!value ? '#ccc' : '#333'"></u-icon>
		</view>
		<lb-picker ref="picker"
		  v-model="currentVal"
		  mode="dateSelector"
		  :format="format"
		  :display-format="format"
		  @confirm="handleConfirm">
		</lb-picker>
	</view>
</template>

<script>
	import day from 'dayjs'
	import LbPicker from '../modules/lb-picker/index.vue'
	export default {
		components: {
			LbPicker
		},
		props: {
			value: String,
			readonly: false,
			disabled: false,
			format: {
				type: String,
				default: 'YYYY-MM-DD'
			}
		},
		data() {
			return {
				currentVal: ''
			}
		},
		watch: {
			value: {
				handler(v) {
					// console.log(v, '')
					this.currentVal = v
				},
				deep: true
			}
		},
		methods: {
			openDatePopup: function() {
				if(!this.disabled && !this.readonly) {
					this.$refs['picker'].show()
				}
			},
			handleConfirm: function({ value }) {
				this.currentVal = value
				this.$emit('change', value)
			},
		}
	}
	
</script>

<style lang="scss">
</style>