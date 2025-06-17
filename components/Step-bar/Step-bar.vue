<!--
 * @Author: WUYuHan
 * @Date: 2025-06-03 14:01:10
 * @LastEditTime: 2025-06-03 14:20:05
 * @Description: 
-->
<template>
	<view class="">
		<ul class="steps">
			<li class="line" v-for="(item,index) in stepsList" :key='index' :class="{'active':active===index}">
				<i class='iconfont' :style="{color:active>=index ? '#00B561' :'#ccc'}"
					:class="active===index ? 'icon-circleyuanquan' : 'icon-yuanquan_fill'"></i>
				<span :class="{'activeSize':active===index}"
					:style="{color:active>=index ? '#00B561' :'#ccc'}">{{item.name}}</span>
			</li>
		</ul>
	</view>
</template>
<script>
	export default {

		props: {
			stepsList: {
				type: Array,
				default: () => {
					return []
				}
			},
			active:{
				type:Number,
				default:''
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import './iconfont/iconfont.css';
	* {
		margin: 0;
		padding: 0;
	}
	
	.steps {
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.line {
		display: flex;
		width: 96rpx;

		i {
			line-height: 60rpx;
		}

		flex-direction: column;
		align-items: center;
	}

	.steps li {
		position: relative;

		span {
			font-size: 28rpx;
		}
	}

	/*连接线*/
	.steps li~li:after {
		content: "";
		width: 200rpx;
		height: 1rpx;
		border-bottom: 1rpx dashed #00B561;
		position: absolute;
		left: -200rpx;
		top: 28rpx;
		z-index: 999;
	}

	.steps li.active:before,
	.steps li.active:after
		{
		border-bottom: 1rpx dashed #00B561;

	}

	.icon-circleyuanquan {
		font-size: 50rpx;
		font-weight: 600;
	}

	.activeSize {
		font-size: 32rpx;
		font-weight: 600;
	}
	.steps li.active~li:before,
	.steps li.active~li:after {
		border-bottom: 1rpx dashed #cccccc;

	}
</style>
