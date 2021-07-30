<template>
	<view>
		<view class="icons">
			<view class="left">
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="contact" plain size="mini"><uni-icons type="chat" size="28" color="#fff"></uni-icons></button>
				<!-- #endif -->
			</view>
			<view class="right">
				<navigator url="#"><uni-icons type="search" size="28" color="#fff"></uni-icons></navigator>
				<navigator url="../../minesubpkg/cart/cart" open-type="navigate"><uni-icons type="cart" size="28" color="#fff"></uni-icons></navigator>
			</view>
		</view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in bannerList" :key="item.id"><image :src="item.pic" mode="widthFix"></image></swiper-item>
			</swiper>
		</view>
		<view class="category">
			<navigator
				open-type="navigate"
				class="category-item"
				v-for="(item, index) in category.children"
				:key="item.id"
				:url="'/goodsubpkg/goodsList/goodsList?categoryId=' + item.id"
			>
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{ item.name }}</text>
			</navigator>
		</view>
		<view class="xianshi">
			<uni-icons color="#ffa500" type="sound"></uni-icons>
			<view class="huodong">限时活动</view>
			<swiper :vertical="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in recommendList" :key="item.recommendId">
					<navigator open-type="navigate" :url="'/goodsubpkg/goodsDetail/goodsDetail?productId=' + item.productId">
						<view class="item-l">
							<text class="left">{{ item.name }}</text>
						</view>
						<view class="item-r">
							<text class="price">{{ item.price }} 元</text>
							<text class="promotionPrice">现价:{{ item.promotionPrice }}元</text>
						</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="hot">
			<text class="title">热门推荐</text>
			<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in hotList" :key="item.recommendId">
					<navigator open-type="navigate" :url="'/goodsubpkg/goodsDetail/goodsDetail?productId=' + item.id">
						<image :src="item.pic" mode="widthFix"></image>
						<!-- 用text不起省略号作用 -->
						<view class="name">{{ item.name }}</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="xinpin">
			<text class="title">新品推荐</text>
			<view class="wrapper">
				<view class="item" v-for="item in lejuLatestProducts" :key="item.id">
					<navigator open-type="navigate" :url="'/goodsubpkg/goodsDetail/goodsDetail?productId=' + item.id">
						<view class="img"><image :src="item.pic" mode="widthFix"></image></view>
						<view class="txt">
							<text class="name">{{ item.name }}</text>
							<text>价格:{{ item.price }}</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="guesslike">
			<text class="title">猜你喜欢</text>
			<my-goods :list="saleMostProducts"></my-goods>
		</view>
	</view>
</template>

<script>
import { bannerAds, findCategory, hotList, recommendList, lejuLatestProducts, saleMostProducts } from '@/api/home/index.js';
export default {
	data() {
		return {
			bannerList: [],
			category: {},
			recommendList: [],
			hotList: [],
			lejuLatestProducts: [],
			saleMostProducts: []
		};
	},
	async onLoad(options) {
		const { data: res } = await bannerAds();
		const { data: res1 } = await findCategory('1308336521604599809');
		const { data: res2 } = await recommendList();
		const { data: res3 } = await hotList();
		const { data: res4 } = await lejuLatestProducts();
		const { data: res5 } = await saleMostProducts();
		// console.log(res, res1);
		// console.log(res5);
		this.bannerList = res.data.items;
		this.category = res1.data.category;
		this.recommendList = res2.data.items;
		this.hotList = res3.data.items;
		this.lejuLatestProducts = res4.data.productList;
		this.saleMostProducts = res4.data.productList;
	}
};
</script>

<style lang="scss" scoped>
.icons {
	position: sticky;
	top: 0;
	z-index: 999;
	display: flex;
	justify-content: space-between;
	.left {
		position: absolute;
		left: 0;
		display: flex;
		justify-content: flex-start;
		button {
			border: none;
			width: fit-content;
			height: fit-content;
		}
	}
	.right {
		position: absolute;
		top: 40rpx;
		right: 10rpx;
		display: flex;
		justify-content: flex-end;
	}
}
.top {
	swiper {
		height: 330rpx;
		swiper-item {
			image {
				width: 100% !important;
				height: 100% !important;
			}
		}
	}
}
.category {
	margin-top: 60rpx;
	display: flex;
	justify-content: space-around;
	font-size: 38rpx;

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			// padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			width: 120rpx !important;
			height: 120rpx !important;
			border-radius: 50%;
		}
	}
}
.xianshi {
	padding: 20rpx;
	background-color: #fff;
	width: 90%;
	height: 92rpx;
	display: flex;
	margin: 40rpx auto;
	justify-content: center;
	align-items: center;
	.huodong {
		flex: 2;
		color: #ffa500;
		font-size: 15px;
		font-weight: bold;
		padding-left: 10rpx;
	}
	swiper {
		flex: 4;
		height: 92rpx;
		background-color: #fff;
		swiper-item {
			navigator {
				display: flex;
				height: 100%;
				align-items: center;
				.item-l {
					flex: 2;
					font-size: 14px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.item-r {
					flex: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					.price {
						text-decoration: line-through;
						font-size: 14px;
					}
					.promotionPrice {
						color: #f00;
						font-weight: bold;
						font-size: 14px;
					}
				}
			}
		}
	}
}
.hot {
	.title {
		font-size: 42rpx;
		font-weight: bold;
	}
	padding: 20rpx;
	swiper {
		margin: 40rpx 0;
		width: 100%;
		height: 250rpx;
		// background-color: #fff;
		swiper-item {
			width: 30% !important;
			height: fit-content;
			// background-color: #bfa;
			text-align: center;
			image {
				width: 198rpx !important;
				height: 168rpx !important;
			}
			.name {
				width: 100% !important;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
}
.xinpin {
	padding: 20rpx;
	.title {
		font-size: 42rpx;
		font-weight: bold;
	}
	.wrapper {
		margin-top: 40rpx;
		overflow: auto;
		display: flex;
		// background-color: #fff;
		.item {
			navigator {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				// margin: 20px;
				margin-right: 20rpx;
				border-radius: 16px;
				.img {
					display: flex;
					flex: 1;
					padding: 20rpx;

					image {
						width: 186rpx !important;
						height: 160rpx !important;
					}
				}
				.txt {
					font-size: 14px;
					font-weight: bold;
					padding-left: 40rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-around;
					width: 346rpx !important;
					height: 248rpx !important;
					flex: 3;
					.name {
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}
	}
}
.guesslike {
	padding: 20rpx;
	.title {
		font-size: 42rpx;
		font-weight: bold;
	}
}
</style>
