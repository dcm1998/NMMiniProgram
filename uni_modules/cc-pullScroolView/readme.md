# cc-pullScroolView

#### 使用方法 
```使用方法
	
<!--   ref：唯一ref  pullDown:下拉刷新事件  上拉加载方法写在生命周期onReachBottom方法内  -->
<cc-pullScroolView class="pullScrollView" ref="pullScroll" :pullDown="pullDown">
</cc-pullScroolView>	
				
<!-- 注意: 上拉加载方法写在onReachBottom方法内 -->	
onReachBottom() {
	// 数据全部加载完
	if (this.curPageNum * 10 >= this.totalNum) {

		} else {

			// 显示加载中
			this.$refs.pullScroll.showUpLoading();
			this.curPageNum++;
			this.requestData();
		}

	},

```

#### HTML代码实现部分
```html
<template>
	<view class="content">

		<div class="mui-content-padded">

			<!--  ref：唯一ref pullDown:下拉刷新事件  onReachBottom：上拉加载事件 -->
			<cc-pullScroolView class="pullScrollView" ref="pullScroll" :back-top="true" :pullDown="pullDown">

				<!-- 列表组件 -->
				<CCBProjectList :productList="projectList" @click="goProDetail"></CCBProjectList>

			</cc-pullScroolView>

		</div>


	</view>
</template>


<script>
	import CCBProjectList from '../../components/ccPageView/CCProjectList.vue';

	export default {
		components: {

			CCBProjectList,


		},
		data() {
			return {
				// 列表总数量
				totalNum: 60,
				//  页码 默认1开始
				curPageNum: 1,

				// 列表数组
				projectList: []
			}
		},
		onLoad() {

			// 页面刷新方法 会自动调用pulldown一次
			this.pageRefresh();
		},
		// 上拉加载
		onReachBottom() {
			// 数据全部加载完
			if (this.curPageNum * 10 >= this.totalNum) {

			} else {

				// 显示加载中
				this.$refs.pullScroll.showUpLoading();
				this.curPageNum++;
				this.requestData();
			}

		},

		methods: {

			pageRefresh() {
				let myThis = this;
				this.$nextTick(() => {

					myThis.$refs.pullScroll.refresh();



				});
			},
			// 下拉刷新
			pullDown(pullScroll) {

				console.log('下拉刷新');
				this.projectList = [];
				this.curPageNum = 1;
				setTimeout(() => {
					this.requestData(pullScroll);
				}, 300);

			},


			// 列表条目点击事件
			goProDetail(item) {

			},


			requestData() {

				// 模拟请求参数设置
				let reqData = {

					'area': '',
					"pageSize": 10,
					"pageNo": this.curPageNum
				}

				let myThis = this;
				setTimeout(function() {


					// 模拟请求接口
					for (let i = 0; i < 10; i++) {

						myThis.projectList.push({
							'proName': '产品名称' + i,
							'proUnit': '公司名称' + i,
							'area': '广东省',
							'proType': '省级项目',
							'stage': '已开工',
							'id': 10 * (myThis.curPageNum + i) + myThis.curPageNum + ''
						});
					}
					// 列表总数量
					myThis.totalNum = 60;
					// 如果是最后一页
					if (myThis.curPageNum * 10 >= myThis.totalNum) {
						myThis.$refs.pullScroll.finish();

					} else {
						// 不是最后一页
						myThis.$refs.pullScroll.success();
					}

				}, 600);



			}
		}
	}
</script>


<style>
	page {

		background-color: #f2f2f2;
	}

	.content {
		display: flex;
		flex-direction: column;

	}

	.mui-content-padded {
		margin: 0px 14px;
		/* background-color: #ffffff; */
	}

	.pullScrollView {
		display: flex;
		flex-direction: column;

	}
</style>
```
