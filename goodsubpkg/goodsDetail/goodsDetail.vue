<template>
	<!-- 防止闪烁 -->
	<view v-if="product.name" class="wrapper">
		<view class="swiper-wraper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in product.skuList" :key="item.id"><image :src="item.pic" mode="widthFix"></image></swiper-item>
			</swiper>
			<view class="collect" @click="collectClick(product, 'goodsCollect', `/goodsubpkg/goodsDetail/goodsDetail?productId=${product.id}`)">
				<view class="bgc">
					<uni-icons type="star" size="20" color="#fff" v-if="!product.isCollected"></uni-icons>
					<uni-icons type="star-filled" size="20" color="#f00" v-else></uni-icons>
				</view>
			</view>
		</view>
		<view class="dec">
			<view class="row1">
				<text class="nowPrice">￥{{ product.price }}</text>
				<text class="desPrice">￥{{ product.price }}</text>
				<text class="cuxiao">没有促销使用原价</text>
			</view>
			<view class="row2">
				<text>{{ product.name }}</text>
			</view>
			<view class="row3">
				<text>{{ product.description }}</text>
			</view>
		</view>
		<mp-html :tag-style="obj" :content="product.detailMobileHtml" />
		<goods-nav :good="product" :skuList="skuList" @buyNow="handleBuyNow" @addToCart="handleAddToCart"></goods-nav>
	</view>
</template>

<script>
import { addPreOrder, getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
import { addCart, clearCart, delCartItems, findAllCartItem } from '@/api/cart/index.js';
import { productDetail } from '@/api/category/index.js';
import isCollected from '@/mixins/isCollected.js';
import isLogin from '@/mixins/isLogin.js';
export default {
	mixins: [isCollected, isLogin],
	data() {
		return {
			productId: '',
			product: {},
			// isCollected: false,
			obj: {
				// #ifdef H5
				img: 'width:90%;height:100%;margin:0 auto;display:block;',
				// #endif
				// #ifdef MP-WEIXIN
				img: 'width:90%;margin:0 auto;display:block;'
				// #endif
			},
			skuList: []
		};
	},
	async onLoad(options) {
		// console.log(options);
		this.productId = options.productId;
		const { data: res } = await productDetail(this.productId);
		if (!res.success) return uni.$showMsg();
		// 修补数字位数
		res.data.product.price = res.data.product.price.toFixed(2);
		//添加一个购物车的选中状态
		res.data.product.goods_state = false;
		// // 添加一个收藏的属性 默认为false
		res.data.product.isCollected = false;
		// console.log(res.data.product);
		// console.log(res.data.product.price.toFixed(2));
		this.product = res.data.product;
		//改变数组将json 格式字符串对象转成对象
		res.data.product.skuList.forEach(el => {
			// console.log(el);
			el.spData = JSON.parse(el.spData);
		});
		this.skuList = res.data.product.skuList;
		uni.setNavigationBarTitle({
			title: res.data.product.name
		});
	},
	methods: {
		// 子组件产过来的立即购买点击方法
		async handleBuyNow(val) {
			// console.log('父组件', val);
			if (this.isLogin(`/goodsubpkg/goodsDetail/goodsDetail?productId=${this.product.id}`)) {
				const { data: res } = await addPreOrder(val);
				// console.log(res);
				if (!res.success) return uni.$showMsg();
				uni.navigateTo({
					url: '../../minesubpkg/order/order?orderId=' + res.data.orderId
				});
			}
		},
		// 子组件产过来的加入购物车点击方法
		async handleAddToCart(val) {
			// console.log('父组件', val);
			const { data: res } = await addCart(val);
			if (!res.success) return uni.$showMsg();
			uni.$showMsg({ title: '加入购物车成功' });
			// console.log(res);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.swiper-wraper {
		position: relative;
		.bgc {
			position: absolute;
			bottom: -40rpx;
			right: 56rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			width: 96rpx;
			height: 96rpx;
			background-color: $navigateBackgroundColor;
		}
		swiper {
			height: 608rpx;
			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.dec {
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		.row1 {
			text-align: center;
			.nowPrice {
				font-family: fantasy;
				font-size: 56rpx;
				color: #f2270c;
			}
			.desPrice {
				font-family: fantasy;
				color: #b5b5b5;
				font-size: 24rpx;
				text-decoration: line-through;
			}
			.cuxiao {
				background-color: #f2270c;
				color: #fff;
				width: 220rpx;
				height: 34rpx;
				font-size: 24rpx;
				padding: 10rpx;
				border-radius: 12rpx;
			}
		}
		.row2 {
			padding: 20rpx 6rpx;
			color: #262626;
			font-size: 15px;
			font-weight: 700;
		}
		.row3 {
			font-size: 11px;
			padding: 18px 0 0;
			line-height: 1.3;
			color: #666;
		}
		.row1,
		.row2,
		.row3 {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
}
</style>
