<template>
	<!-- 防止闪烁 -->
	<view v-if="orderBase.orderSn">
		<view class="wait-pay">等待支付</view>
		<navigator :url="'../address/address?orderId=' + orderBase.id" class="chooseAddress" v-if="!address.id">选择地址</navigator>
		<navigator url="../address/address" class="chooseAddress" v-else>
			<view class="row1">
				<text>姓名:{{ address.name }}</text>
				<text>电话:{{ address.phoneNumber }}</text>
			</view>
			<view class="row2">
				<text>收货地址:{{ `${address.province}-${address.city}-${address.region}` }}</text>
			</view>
		</navigator>
		<view class="order">
			<view class="top">
				<text class="orderId">订单编号：{{ orderBase.orderSn }}</text>
				<text>等待支付</text>
			</view>
			<view class="goods">
				<block v-for="item in orderItems" :key="item.cartId"><my-good :goods="item"></my-good></block>
			</view>
			<view class="btm">
				<view class="title">合计:{{ orderBase.totalAmount }} 元</view>
				<view class="button-wrapper"><button @click="payment" type="default" size="mini">确认付款</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import showTips from '@/mixins/showTips.js';
import { mapState, mapMutations } from 'vuex';
import { addPreOrder, getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
export default {
	mixins: [showTips],
	data() {
		return {
			orderItems: [],
			orderBase: {},
			appAddressList: [],
			orderId: ''
		};
	},
	computed: {
		...mapState('m_user', ['address'])
	},
	async onLoad(options) {
		this.orderId = options.orderId;
		const { data: res } = await getPreOrderById(options.orderId);
		// console.log(res);
		if (!res.success) return uni.$showMsg();
		res.data.orderItems.forEach(el => {
			el.productAttr = JSON.parse(el.productAttr);
		});
		this.orderItems = res.data.orderItems;
		this.orderBase = res.data.orderBase;
	},

	methods: {
		...mapMutations('m_user', ['updateAddress']),
		//确认付款
		async payment() {
			if (this.address.id) {
				//  组织订单的信息对象
				const orderInfo = {
					addressId: this.address.id,
					orderId: this.orderId,
					orderItemList: this.orderItems.map(x => ({ cartId: x.id, productId: x.productId, productQuantity: x.productQuantity, productSkuId: x.productSkuId })),
					payType: 0,
					sourceType: this.orderBase.sourceType
				};
				// console.log(orderInfo);
				const { data: res } = await addConfirmOrder(orderInfo);
				// console.log(res);
				// console.log(this.address);
				if (!res.success) return uni.$showMsg({ title: res.message });
				uni.$showMsg({ title: '确认付款成功', duration: 2000 });
				// 让显示跳转到pay页面的方法延迟2秒执行
				setTimeout(() => {
					this.delayNavigate('navigateTo', `../payment/payment?orderId=${res.data.orderId}`, '支付页面');
				}, 2000);
			} else {
				uni.$showMsg({ title: '请先选择收货地址' });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wait-pay,
.chooseAddress {
	width: 85%;
	margin: 0 auto;
}
.wait-pay {
	font-size: 50rpx;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #999;
}
.chooseAddress {
	font-size: 32rpx;
	padding: 20rpx 0;
	color: #999;
	border-bottom: 2rpx solid #699;
	margin-bottom: 20rpx;
}
.order {
	width: 95%;
	margin: 0 auto;
	background-color: #fff;
	border-radius: 40rpx;
	.top {
		font-family: fantasy;
		font-size: 34rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx;
	}
	.btm {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		justify-content: center;
		font-family: fantasy;
		padding: 30rpx;
		.title {
			color: #e00;
		}
		.button-wrapper {
			padding-top: 40rpx;
		}
	}
}
</style>
