<template>
	<view class="home">
		<view :class="[item.ishow?'unpload':'']" v-for="(item,index) in list" :key="index+1">
			<view class="main">
				<view class="title">
					<view>{{item.name}}</view>
					<image src="../static/unfold.png" mode="widthFix" @click="upload(item,index)" v-if="!item.ishow">
					</image>
				</view>
				<view class="section">
					<view class="Top">
						<view class="li" v-for="(items,indexs) in item.list" :key="indexs+2">
							<view class="time">{{items.time.split(' ')[0]}}
								<view>{{items.time.split(' ')[1]}}</view>
							</view>
							<image src="../static/garden.png" mode="widthFix" v-if="!items.succes"></image>
							<image src="../static/gardenA.png" mode="widthFix" v-else class="img"></image>
							<view class="main_a"
								:style="{'border':(indexs==0&&item.list.length==1)||indexs+1===item.list.length?'none':''}">
								<view>{{items.name1}}</view>
								<view>{{items.main}}</view>
							</view>
						</view>
						<image src="../static/packUp.png" mode="widthFix" class="close" @click="item.ishow=false">
						</image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
/*
  *折叠面板*
  list: 数组 格式在data中，在父组件中传入
  upload: 打开事件
  传参格式是一个二维数组
  逻辑请根据项目需求自行更改
	作者:chenxin 交流:cxalq8-24
*/
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: [],
			}
		},
		data() {
			return {
				// list: [{
				// 		name: '马桶正在发货',
				// 		ishow: false,
				// 		list: [{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东站点',
				// 				main: '装车完毕，准备发往北京',
				// 				succes: false,
				// 			},
				// 			{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东站点',
				// 				main: '装车完毕，准备发往北京',
				// 				succes: false,
				// 			},
				// 			{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东站点',
				// 				main: '装车完毕，准备发往北京',
				// 				succes: true,
				// 			}
				// 		],
				// 	},
				// 	{
				// 		name: '洗衣机正在发货',
				// 		ishow: false,
				// 		list: [{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东济宁',
				// 				main: '装车完毕，准备发往淄博',
				// 				succes: false,
				// 			},
				// 			{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东淄博',
				// 				main: '装车完毕，准备发往济南',
				// 				succes: false,
				// 			},
				// 			{
				// 				time: '2023/05/21 13:14',
				// 				name1: '到达山东济南',
				// 				main: '请到某小区菜鸟驿站取货',
				// 				succes: true,
				// 			}
				// 		],
				// 	}
				// ]
			}
		},
		methods: {
			upload(item,i){
				this.$emit('upload',item,i)
			},
		},
	}
</script>

<style lang="scss">
	.home {
		.unpload {
			.main {
				.section {
					max-height: 490rpx;
				}
			}
		}
		.main {
			background-color: #fff;
			margin: 30rpx;
			border-radius: 25rpx;
			padding: 30rpx 35rpx;
			box-shadow: 1rpx 1rpx 7rpx #2c84fc;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #2c84fc;

				image {
					width: 25rpx;
					height: 26rpx;
				}
			}

			.section {
				overflow: hidden;
				max-height: 0rpx;
				transition: all 0.2s ease;

				.Top {
					padding-top: 20rpx;
				}

				.close {
					width: 25rpx;
					height: 26rpx;
					position: relative;
					left: 310rpx;
					top: 10rpx;
				}

				.li {
					display: flex;
					position: relative;
					justify-content: space-between;
				}

				.xian {
					position: absolute;
					left: 36.5%;
					top: 0%;
					z-index: 7;
					border: 0.5rpx solid #cccccc;
				}

				.time {
					width: 165rpx;
					// border:1px solid red;
					font-size: 28rpx;
					color: #999999;
				}

				.main_a {
					width: 350rpx;
					border-left: 0.5rpx solid #cccccc;
					padding-left: 60rpx;
					white-space: pre-wrap;
					word-break: break-all;
					margin-top: -1rpx;

					// border:1px solid red;
					:nth-child(odd) {
						font-size: 30rpx;
					}

					:nth-child(even) {
						padding: 10rpx 0rpx;
						font-size: 28rpx;
						color: #999999;
					}
				}

				.img {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					left: 31.5%;
					top: 1%;
				}

				image {
					width: 18rpx;
					height: 18rpx;
					position: absolute;
					left: 32.5%;
					top: 2%;
				}
			}
		}

	}
</style>
