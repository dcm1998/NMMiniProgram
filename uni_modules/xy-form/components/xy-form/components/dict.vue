<template>
	<view style="width: 100%" class="flex-1">
		<view class="cx-val flex align-center justify-end flex-1" @click="openDatePopup" :class="{'cx-val--placeholder': !currentLabel}">
		{{ currentLabel ? currentLabel : '请选择' }}
		<u-icon name="arrow-right" :size="16" :color="!currentLabel ? '#ccc' : '#333'"></u-icon>
		</view>
		<lb-picker ref="picker"
		  v-model="currentVal"
		  mode="selector"
		  :list="list"
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
			value: String,
			readonly: false,
			disabled: false,
			format: {
				type: String,
				default: ''
			},
			list: Array,
			props: {
				type: Object,
				default: () => {
					return {
						label: 'name',
						value: 'id',
						children: 'children'
					}
				}
			}
		},
		data() {
			return {
				currentVal: '',
				currentLabel: ''
			}
		},
		watch: {
			value: {
				handler(v) {
					if(v) {
						this.currentLabel = ''
						this.currentVal = ''
						this.currentVal = this.value
						this.list.find((item) => {
							if(item[this.props.value] === v) {
								this.currentLabel = item[this.props.label]
							}
						})
					}
				},
				immediate: true
			}
		},
		methods: {
			openDatePopup: function() {
				if(!this.disabled && !this.readonly) {
					this.$refs['picker'].show()
				}
			},
			handleConfirm: function(e) {
				console.log(e, 'e')
				this.currentLabel = e.item[this.props.label]
					this.$emit('change', e.item[this.props.value])
			},
		}
	}
	
</script>

<style lang="scss">
</style>