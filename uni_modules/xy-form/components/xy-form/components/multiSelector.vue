<template>
	<view style="width: 100%" class="flex-1">
		<view class="cx-val flex align-center justify-end flex-1" @click="openDatePopup" :class="{'cx-val--placeholder': !currentLabel}">
		{{ currentLabel ? currentLabel : '请选择' }}
		<u-icon name="arrow-right" :size="16" :color="!currentLabel ? '#ccc' : '#333'"></u-icon>
		</view>
		<lb-picker ref="picker"
		  v-model="currentVal"
		  mode="multiSelector"
		  :list="list"
			:level="level"
			:props="props"
		  @confirm="handleConfirm">
		</lb-picker>
	</view>
</template>

<script>
	import LbPicker from '../modules/lb-picker/index.vue'
	export default {
		components: {
			LbPicker
		},
		props: {
			value: Array,
			readonly: false,
			disabled: false,
			format: {
				type: String,
				default: ''
			},
			list: Array,
			level: {
				type: Number,
				default: 2
			},
			props: {
				type: Object,
				default: () => {
					return {
						label: 'label',
						value: 'value',
						children: 'children'
					}
				}
			}
		},
		data() {
			return {
				currentVal: [],
				currentLabel: ''
			}
		},
		watch: {
			value: {
				handler(v) {
					this.currentLabel = ''
					this.currentVal = []
					if(v.length > 0) {
						this.currentVal = v
						const info = this.$refs.picker.getColumnsInfo(v)
						this.currentLabel = info.item.map(m => m.label).join('-')
					}
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
			handleConfirm: function(e) {
				// console.log(e, 'e')
				// this.currentLabel = e.item[this.props.label]
				const info = this.$refs.picker.getColumnsInfo(e.value)
				console.log(info)
				this.currentLabel = info.item.map(m => m.label).join('-')
				this.currentVal = e.value
				this.$emit('change', e.value)
			},
		}
	}
	
</script>

<style lang="scss">
</style>