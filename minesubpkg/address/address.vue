<template>
	<view>
		<view class="wrapper">
			<block v-for="item in addressList" :key="item.id">
				<view class="item">
					<view class="left" @click="chooseAddress(item)">
						<view class="name">
							{{ item.name }}
							<uni-tag v-if="item.defaultStatus" text="默认" type="royal" circle="true" size="small"></uni-tag>
						</view>
						<text class="phone">{{ item.phoneNumber }}</text>
					</view>
					<navigator class="right" :url="'../addAddress/addAddress?addressId=' + item.id"><uni-icons type="compose" size="20"></uni-icons></navigator>
				</view>
			</block>
			<navigator url="../addAddress/addAddress" class="btm"><button type="default">新增收货地址</button></navigator>
		</view>
	</view>
</template>

<script>
import isLogin from '../../mixins/isLogin.js';
import { addAddressInfo, delAddressInfo, findAllAddress, switchDefault, updateAddressInfo } from '@/api/address/index.js';

import { mapMutations } from 'vuex';

export default {
	mixins: [isLogin],
	data() {
		return {
			// 接受自定义参数判断是否来自user页面的跳转
			isFromUser: true,
			addressList: JSON.parse(uni.getStorageSync('appAddressList') || '[]'),
			orderId: ''
		};
	},
	async onLoad(options) {
		this.isFromUser = options.isFromUser;
		this.orderId = options.orderId;
		console.log(this.orderId);
		// console.log(formatTime(new Date()));
		if (this.isLogin('/minesubpkg/address/address')) {
			const { data: res } = await findAllAddress();
			// console.log(res);
			if (!res.success) return uni.$showMsg();
			this.addressList = res.data.items;
			uni.setStorageSync('appAddressList', JSON.stringify(res.data.items));
		}
	},
	methods: {
		...mapMutations('m_user', ['updateAddress']),
		chooseAddress(val) {
			// console.log(val);
			this.updateAddress(val);
			// 来自user的页面不跳转到订单页面
			if (!this.isFromUser) {
				uni.navigateTo({
					url: '../order/order?orderId=' + this.orderId
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.item {
		width: 80%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #999;
		.left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			font-family: fantasy;
			padding-left: 20rpx;
			flex: 8;
			.name {
				font-size: 36rpx;
				padding: 10rpx 0;
				uni-tag {
					padding-left: 20rpx;
				}
			}
			.phone {
				padding: 10rpx 0;
				font-size: 34rpx;
				color: #999;
			}
		}
		.right {
			flex: 1;
			border-left: 2rpx solid #999;
			padding-left: 40rpx;
		}
	}
	.btm {
		position: fixed;
		width: 100%;
		bottom: 0;
		button {
			margin-bottom: 40rpx;
			width: 60%;
			color: #fff;
			background-color: $navigateBackgroundColor;
		}
	}
}
</style>
