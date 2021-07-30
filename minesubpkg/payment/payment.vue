<template>
	<view v-if="orderBase.orderSn" class="wrapper">
		<view class="top">
			<text>订单编号: {{ orderBase.orderSn }}</text>
			<text>订单金额: {{ orderBase.totalAmount }}</text>
		</view>
		<view class="choosePayWay">
			<view class="title">选择支付方式:</view>
			<radio-group name="pay" @change="payChange">
				<view class="row1">
					<label class="radio">
						<view class="left">
							<image src="../../static/images/icons/alipay.png" mode="widthFix"></image>
							<text>支付宝支付</text>
						</view>
						<view class="right"><radio value="1" checked="true" /></view>
					</label>
				</view>
				<view class="row1">
					<label class="radio">
						<view class="left">
							<image src="../../static/images/icons/wxpay.png" mode="widthFix"></image>
							<text>微信支付</text>
						</view>
						<view class="right"><radio value="2" /></view>
					</label>
				</view>
			</radio-group>
		</view>
		<view class="btm">
			<button type="default" size="default" @click="payNow">立即支付</button>
			<view class="xieyi">
				<view class="left">点击立即支付，即代表您同意</view>
				<text class="right">《条款协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
import showTips from '@/mixins/showTips.js';
import { getPreOrderById, addConfirmOrder, payConfirm } from '@/api/order/index.js';
export default {
	mixins: [showTips],
	data() {
		return {
			orderItems: [],
			orderBase: {},
			payWay: 1,
			orderId: '',
		};
	},
	async onLoad(options) {
		// console.log(options);
		this.orderId = options.orderId;
		const { data: res } = await getPreOrderById(options.orderId);
		// console.log(res);
		if (!res.success) return uni.$showMsg();
		this.orderItems = res.data.orderItems;
		this.orderBase = res.data.orderBase;
		// uni.getSystemInfo({
		// 	success: res => {
		// 		console.log(res);
		// 	}
		// });
	},
	methods: {
		payChange(e) {
			// console.log(e);
			this.payWay = e.detail.value;
		},
		// 立即支付
		async payNow() {
			console.log(this.payWay);
			// uni.navigateTo({
			// 	url: `../confirmPay/confirmPay?orderId=${this.orderId}&payType=${this.payWay}`
			// });
			const params = { orderId: this.orderId, payType: Number(this.payWay) };
			const { data: res } = await payConfirm(params);
			// console.log(res);
			if (!res.success) return uni.$showMsg({ title: res.message });
			uni.$showMsg({ title: '支付成功', duration: 2000 });
			// 让显示跳转到个人更新的方法延迟2秒执行
			setTimeout(() => {
				this.delayNavigate('switchTab', '../../pages/user/user', '个人中心');
			}, 2000);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	width: 95%;
	margin: 20rpx auto;
	border: 2rpx solid #666;
	box-shadow: 2rpx 2rpx 10rpx #000;
	.top {
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-family: fantasy;
		font-size: 40rpx;
	}
	.choosePayWay {
		padding: 40rpx;
		image {
			width: 68rpx;
			height: 68rpx;
			border-radius: 50%;
		}
		.row1,
		.row2 {
			margin: 40rpx 0;
			.radio {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.left {
				flex: 4;
				display: flex;
				align-items: center;
			}
			.right {
				flex: 1;
			}
		}
	}
	.btm {
		margin-bottom: 40rpx;
		button {
			width: 66%;
			margin: 0 auto;
			color: #fff;
			background-color: $navigateBackgroundColor;
		}
		.xieyi {
			text-align: center;
			font-size: 24rpx;
			.left {
				color: #999;
			}
			.right {
				color: #5a9ef7;
			}
		}
	}
}
</style>
