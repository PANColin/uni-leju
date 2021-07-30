<template>
	<!-- 防止闪烁 -->
	<view class="wrapper" v-if="productArticle.title">
		<view class="title">{{ productArticle.title }}</view>
		<view class="dec">
			<text>概要描述:{{ productArticle.summary }}</text>
		</view>
		<view class="content"><image :src="productArticle.coverImg" mode="widthFix"></image></view>
		<view class="content-txt"><mp-html v-for="(item, index) in contentArr" :key="index" :tag-style="obj" :content="item['content' + (index + 1)]" /></view>
		<view class="authorDec">
			<text>作者:{{ productArticle.author }}</text>
			<text>时间:{{ productArticle.modifyTime }}</text>
		</view>
	</view>
</template>

<script>
import { productArticle } from '@/api/find/index.js';
export default {
	data() {
		return {
			productArticle: {},
			obj: {},
			contentArr: []
		};
	},
	async onLoad(options) {
		const { data: res } = await productArticle(options.id);
		// console.log(res);
		this.productArticle = res.data.productArticle;
		// 将content内容拼接成一个数组用于遍历
		let obj = {};
		const contentArr = [];
		for (let item of Object.entries(res.data.productArticle)) {
			// console.log(item);
			// console.log(item[0].search(/content/g));
			if (item[0].search(/content/g) === 0) {
				// console.log(item);
				obj[item[0]] = item[1];
				contentArr.push(obj);
			}
		}
		this.contentArr = contentArr;
		uni.setNavigationBarTitle({
			title: res.data.productArticle.title
		});
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #fff;
	width: 650rpx;
	margin: 40rpx auto;
	border-radius: 32rpx;
	padding: 40rpx;
	box-shadow: 2px 6px 20px #999;
	.title {
		font-family: fantasy;
		font-size: 56rpx;
		color: #f2270c;
	}
	.dec {
		font-family: fantasy;
		font-size: 36rpx;
		color: #3e3e3e;
	}
	.content {
		image {
			width: 100% !important;
		}
	}
	.authorDec {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		font-family: fantasy;
		font-size: 36rpx;
		color: #3e3e3e;
	}
}
</style>
