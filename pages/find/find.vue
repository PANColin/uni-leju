<template>
	<!-- <view><my-find :list="dList" @tabsClick="handleTabsClick" :isWho="guess" @collClick="handleCollectedClick"></my-find></view> -->
	<view><my-find :list="dList" @tabsClick="handleTabsClick" :isWho="guess"></my-find></view>
</template>

<script>
// import isCollected from '@/mixins/isCollected.js';

import { productArticle, findArticleByPage, findBrandsByPage } from '@/api/find/index.js';
export default {
	// mixins: [isCollected],
	data() {
		return {
			dList: [],
			params: {
				start: 1,
				limit: 6
			},
			// 判断是哪一个类型的列表展示默认文章列表
			guess: 'article',
			total: 0
		};
	},
	async onLoad(options) {
		// const { data: res } = await productArticle();
		this.getArticle(this.params.start, this.params.limit);
		// 添加一个收藏的属性 默认为false
		// res.data.product.isCollected = false;
	},
	methods: {
		async getArticle(start, limit, cb) {
			const { data: res1 } = await findArticleByPage(start, limit);
			if (!res1.success) return uni.$showMsg();
			// 只要数据请求完毕，就立即按需调用 cb 回调函数
			cb && cb();
			this.total = res1.data.total;
			const cList = uni.getStorageSync('findCollect') || [];
			// 添加一个收藏的属性
			res1.data.rows.forEach(el => {
				const item = cList.find(ele => ele.id == el.id);
				el.isCollected = item ? true : false;
			});
			this.dList = [...this.dList, ...res1.data.rows];
		},
		async getBrands(start, limit, cb) {
			const { data: res } = await findBrandsByPage(this.params.start, this.params.limit);
			if (!res.success) return uni.$showMsg();
			// 只要数据请求完毕，就立即按需调用 cb 回调函数
			cb && cb();
			this.dList = [...this.dList, ...res.data.rows];
			this.total = res.data.total;
		},
		async handleTabsClick(val) {
			// console.log(val);
			// 先清空数组，防止重复点击叠加
			this.dList = [];
			this.params.start = 1;
			if (val.dec == 'brands') {
				this.guess = 'brands';
				this.getBrands(this.params.start, this.params.limit);
			} else {
				this.guess = 'article';
				this.getArticle(this.params.start, this.params.limit);
			}
		},
		// handleCollectedClick(e) {
		// 	console.log('父组件', e,'===============');
		// 	// this.collectClick(...e);
		// }
	},
	// 下拉刷新事件
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {
		// 先清空数组，防止重复点击叠加
		this.dList = [];
		this.params.start = 1;
		if (this.guess == 'article') {
			// 2. 重新发起请求
			this.getArticle(this.params.start, this.params.limit, () => uni.stopPullDownRefresh());
		} else {
			this.getBrands(this.params.start, this.params.limit, () => uni.stopPullDownRefresh());
		}
	},
	// 触底的事件
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		// 判断数据是否加载完毕
		if (this.dList.length >= this.total) return uni.$showMsg({ title: '没有更多数据了' });
		if (this.guess == 'article') {
			// 重新获取列表数据
			this.getArticle(this.params.start++, this.params.limit);
		} else {
			// 重新获取列表数据
			this.getBrands(this.params.start++, this.params.limit);
		}
	}
};
</script>

<style lang="scss" scoped></style>
