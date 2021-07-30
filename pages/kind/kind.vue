<template>
	<view class="wrapper">
		<view class="category">
			<navigator
				open-type="navigate"
				:url="'/goodsubpkg/goodsList/goodsList?categoryId=' + item.id"
				:class="'item' + index"
				v-for="(item, index) in category.children"
				:key="item.id"
			>
				<image :class="'img' + index" :src="item.icon" mode="widthFix"></image>
				<text class="name">{{ item.name }}</text>
			</navigator>
		</view>
	</view>
</template>

<script>
import { findCategory, findProductList } from '@/api/category/index.js';
export default {
	data() {
		return {
			category: {}
		};
	},
	async onLoad() {
		const { data: res } = await findCategory('1308336521604599809');
		// console.log(res);
		this.category = res.data.category;
		const { data: res1 } = await findProductList(1, 5, {
			categoryId: '1308339256886423554'
		});
		// console.log(res1);
	},
	methods: {
		// moveToProdu(val) {
		// 	console.log(val);
		// }
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: 100%;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	.category {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		// flex-direction: column;

		.item0,
		.item1 {
			border-radius: 12rpx;
			margin: 20rpx 20rpx;
			position: relative;
			// background-color: #bfa;
			width: 642rpx;
			height: 282rpx;
			.img0 {
				position: absolute;
				right: 0;
				width: 50% !important;
				height: 100% !important;
			}
			.img1 {
				position: absolute;
				right: 0;
				width: 50% !important;
				height: 100% !important;
			}
			.name {
				position: absolute;
				left: 40rpx;
				bottom: 60rpx;
				font-size: 46rpx;
				color: #3e3e3e;
			}
		}
		.item0 {
			background: #d5d5d5;
			box-shadow: 0 12px 20px 0 #d5d5d5;
		}
		.item1 {
			background: #fff;
			box-shadow: 0 12px 20px 0 #d5d5d5;
		}
		.item2,
		.item3 {
			border-radius: 12rpx;
			margin: 20rpx 20rpx;
			box-shadow: 15px 2px 5px 0 #d5d5d5;
			.img2 {
				width: 298rpx !important;
				height: 424rpx !important;
			}
			.img3 {
				width: 298rpx !important;
				height: 424rpx !important;
			}
		}
		.item2 {
			background-color: #fff;
			.name {
				position: absolute;
				left: 100rpx;
				bottom: 200rpx;
				font-size: 46rpx;
				color: #3e3e3e;
			}
		}
		.item3 {
			background-color: #d5d5d5;
			.name {
				position: absolute;
				right: 100rpx;
				bottom: 200rpx;
				font-size: 46rpx;
				color: #3e3e3e;
			}
		}
	}
}
</style>
