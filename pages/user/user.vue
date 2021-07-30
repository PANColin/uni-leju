<template>
	<view class="wrapper">
		<view class="top" @click="moveToInfo">
			<view class="row1">
				<view class="not-login"><image :src="userInfo.icon" mode="widthFix" v-if="token"></image></view>
				<view class="txt" v-if="!token">
					<text>Hi~</text>
					<text>您还没有登录</text>
				</view>
				<view class="txt" v-else>
					<text>欢迎:{{ userInfo.nickname }}</text>
					<text>用户名:{{ userInfo.username }}</text>
				</view>
			</view>
			<view class="row2" v-if="!token">
				<button type="default" size="default" @click="moveToRegister">注册</button>
				<button type="primary" size="default" style="background-color: #354e44;" @click="moveToLogin">登录</button>
			</view>
		</view>
		<view class="order">
			<view class="title-wrapper"><text class="title">我的订单</text></view>
			<view class="icons">
				<navigator url="../../minesubpkg/orderList/orderList?type=0" class="wrapper-icons">
					<image src="../../static/images/icons/icon-pay.png" mode=""></image>
					<text class="txt">待付款</text>
				</navigator>
				<navigator url="../../minesubpkg/orderList/orderList?type=1" class="wrapper-icons">
					<image src="../../static/images/icons/pay-done.png" mode=""></image>
					<text class="txt">已付款</text>
				</navigator>
				<navigator url="../../minesubpkg/orderList/orderList?type=2" class="wrapper-icons">
					<image src="../../static/images/icons/icon-car.png" mode=""></image>
					<text class="txt">已发货</text>
				</navigator>
				<navigator url="../../minesubpkg/orderList/orderList?type=3" class="wrapper-icons">
					<image src="../../static/images/icons/icon-done.png" mode=""></image>
					<text class="txt">已收货</text>
				</navigator>
				<navigator url="../../minesubpkg/orderList/orderList?type=4" class="wrapper-icons">
					<image src="../../static/images/icons/icon-back.png" mode=""></image>
					<text class="txt">售后</text>
				</navigator>
			</view>
		</view>
		<view class="more">
			<view class="icons">
				<navigator url="../../goodsubpkg/goodsCollected/goodsCollected" class="wrapper-icons">
					<image src="../../static/images/icons/save.png" mode=""></image>
					<text class="txt">商品收藏</text>
				</navigator>
				<view @click="noReal" class="wrapper-icons">
					<image src="../../static/images/icons/brand.png" mode=""></image>
					<text class="txt">品牌</text>
				</view>
				<navigator url="../../minesubpkg/findCollected/findCollected" open-type="navigate" class="wrapper-icons">
					<image src="../../static/images/icons/article.png" mode=""></image>
					<text class="txt">文章收藏</text>
				</navigator>
				<navigator :url="'../../minesubpkg/address/address?isFromUser=' + true" class="wrapper-icons">
					<image src="../../static/images/icons/address.png" mode=""></image>
					<text class="txt">地址</text>
				</navigator>
				<view @click="noReal" class="wrapper-icons">
					<image src="../../static/images/icons/card.png" mode=""></image>
					<text class="txt">卡包</text>
				</view>
				<navigator url="../../minesubpkg/cart/cart" class="wrapper-icons">
					<image src="../../static/images/icons/cart2.png" mode=""></image>
					<text class="txt">购物车</text>
				</navigator>
				<!-- #ifdef MP-WEIXIN -->
				<view class="wrapper-icons ">
					<button class="contact" open-type="contact" plain size="mini">
						<image src="../../static/images/icons/kf.png" mode=""></image>
						<text class="txt">联系客服</text>
					</button>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
// 按需导入辅助函数
import { mapMutations, mapState } from 'vuex';
import { doLogin, getMemberInfo, uploadAvatar } from '@/api/user/login/index.js';
import isLogin from '@/mixins/isLogin.js';
export default {
	data() {
		return {
			// token: '',
			// userInfo: {}
		};
	},
	mixins: [isLogin],
	computed: {
		...mapState('m_user', ['userInfo', 'redirectInfo']),
		//...mapState('m_user', ['token']) // Computed property "token" was assigned to but it has no setter.
		token: {
			get() {
				return this.$store.state['m_user'].token;
			},
			set() {}
		}
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo']),
		// 未实现功能提示
		noReal() {
			uni.$showMsg({ title: '该功能暂未实现，敬请期待' });
		},
		moveToRegister() {
			uni.navigateTo({
				url: 'register/register'
			});
		},
		moveToLogin() {
			uni.navigateTo({
				url: 'login/login'
			});
		},
		// 跳转到个人信息
		moveToInfo() {
			// console.log(this.$store);
			// console.log(this.$store.state['m_user'].token);
			if (this.token) {
				uni.navigateTo({
					url: 'myinfo/myinfo'
				});
			}
		}
	},
	async onLoad(options) {
		// this.token = uni.getStorageSync('token');
		// console.log(uni.getStorageSync('token'));
		if (this.isLogin('/pages/user/user')) {
			const { data: res } = await getMemberInfo({ header: { token: this.token } });
			// console.log(res);
			if (!res.success) return uni.$showMsg();
			// this.userInfo = res.data.userInfo;
			this.updateUserInfo(res.data.userInfo);
		}
		// 引入混入的mixins判断是否登录
		// console.log(isLogin);
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	margin: 0 auto;

	.top {
		font-family: fantasy;
		width: 80%;
		margin: 20rpx auto;
		padding: 40rpx;
		background-color: #fff;
		border-radius: 22rpx;
		box-shadow: 2px 3px 20px #999;
		.row1 {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.not-login {
				flex: 1;
				width: 144rpx;
				height: 144rpx;
				background-color: #999;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.txt {
				flex: 3;
				padding-left: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
			}
		}
		.row2 {
			display: flex;
			justify-content: center;
			align-items: center;
			button {
				margin: 20rpx;
			}
		}
	}
	.order {
		box-shadow: 2px 3px 11px #4c4339;
		border: 2rpx dotted #999;
		padding: 40rpx;
		background-color: #fff;
		width: 80%;
		margin: 0 auto;
		.title-wrapper {
			padding: 20rpx 0;
			border-bottom: 2rpx solid #999;
			.title {
			}
		}
		.icons {
			margin: 40rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			.wrapper-icons {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image {
					width: 38rpx;
					height: 38rpx;
				}
				.txt {
					padding-top: 20rpx;
				}
			}
			.self {
				button {
					display: flex;
				}
			}
		}
	}
	.more {
		width: 90% !important;
		margin: 0 auto;
		background-color: #fff;
		border: 2rpx double #888;
		width: 100%;
		height: 660rpx;
		display: flex;
		flex: none;
		align-content: space-around;
		justify-content: center;
		margin: 40rpx auto;
		box-shadow: 1px 1px 9px #afbbc9;
		.icons {
			margin: 40rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			font-size: 24rpx;
			.wrapper-icons {
				width: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				image {
					width: 68rpx;
					height: 68rpx;
				}
				.txt {
					padding: 20rpx 0;
				}
				.contact {
					display: flex;
					margin: 0;
					padding: 0;
					border: 0;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
