<template>
	<view><my-goods :list="ProductList" :showTabs="true" @tabsClick="handleTabsClick"></my-goods></view>
</template>

<script>
import { findCategory, findProductList } from '@/api/category/index.js';
export default {
	data() {
		return {
			ProductList: [],
			categoryId: '',
			total: 0,
			params: {
				start: 1,
				limit: 6
			}
		};
	},
	async onLoad(options) {
		// console.log(options);
		this.categoryId = options.categoryId;
		this.getGoodsList(this.params.start, this.params.limit);
	},
	methods: {
		async getGoodsList(start, limit, val, cb) {
			const { data: res } = await findProductList(start, limit, {
				categoryId: this.categoryId,
				...val
			});
			// console.log(start, limit, val, cb);
			if (!res.success) return uni.$showMsg();
			// 只要数据请求完毕，就立即按需调用 cb 回调函数
			cb && cb();
			// 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
			this.ProductList = [...this.ProductList, ...res.data.rows];
			this.total = res.data.total;
		},
		async handleTabsClick(val) {
			// console.log(val);
			// 先清空数组，防止重复点击叠加
			this.ProductList = [];
			this.params.start = 1;
			this.getGoodsList(this.params.start, this.params.limit, val);
		}
	},
	// 下拉刷新事件
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {
		// 先清空数组，防止重复点击叠加
		this.ProductList = [];
		this.params.start = 1;

		// 2. 重新发起请求
		this.getGoodsList(this.params.start, this.params.limit, { isDesc: 1, sortBy: '' }, () => uni.stopPullDownRefresh());
	},
	// 触底的事件
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		// 判断数据是否加载完毕
		if (this.ProductList.length >= this.total) return uni.$showMsg({ title: '没有更多数据了' });
		// 重新获取列表数据
		this.getGoodsList(this.params.start++, this.params.limit);
	}
};
</script>

<style lang="scss" scoped></style>
