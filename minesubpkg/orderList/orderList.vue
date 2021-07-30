<template>
	<view>
		<my-tabs :tabs="tabs" @tabsItemChange="handleTabsItemChange">
			<template v-slot:content>
				<my-order :orderList="lists" :retunList="retunList" :current="current"></my-order>
			</template>
		</my-tabs>
	</view>
</template>

<script>
import isLogin from '../../mixins/isLogin.js';
import { findAllOrders, orderReturnApplys } from '@/api/user/order/index.js';
export default {
	mixins: [isLogin],
	data() {
		return {
			current: 0,
			orders: [],
			retunList: [],
			tabs: [
				{
					id: 0,
					value: '待付款',
					isActive: true
				},
				{
					id: 1,
					value: '已付款',
					isActive: false
				},
				{
					id: 2,
					value: '已发货',
					isActive: false
				},
				{
					id: 3,
					value: '已收货',
					isActive: false
				},
				{
					id: 4,
					value: '退款/退货',
					isActive: false
				}
			]
		};
	},
	onShow() {
		// 获取当前的页面栈-数组 长度最大是10页面
		let pages = getCurrentPages();
		// console.log(pages);
		// 数组中 索引最大的页面就是当前页面
		let currentPage = pages[pages.length - 1];
		// 获取url上的type参数
		const { type } = currentPage.options;
		this.current = Number(type);
		// 激活选中页面标题
		this.changeTitleByIndex(Number(type));
		if (this.isLogin(`/minesubpkg/orderList/orderList?type=${type}`)) {
			this.getOrders();
		}
	},
	computed: {
		lists() {
			return this.orders.filter(ele => {
				if (this.current == 3) {
					return ele.order.status == 3 || ele.order.status == 4;
				}
				return ele.order.status == this.current;
			});
		}
	},

	methods: {
		// 根据标题索引来激活选中 标题数组
		changeTitleByIndex(index) {
			//  修改源数组
			// console.log(typeof index);
			this.tabs.forEach((el, i) => (i == index ? (el.isActive = true) : (el.isActive = false)));
		},
		handleTabsItemChange(e) {
			this.changeTitleByIndex(e);
			// console.log(e);
			this.current = e;
			if (this.isLogin(`/minesubpkg/orderList/orderList?type=${e}`)) {
				this.getOrders();
			}
		},
		// 获取订单列表的方法
		async getOrders() {
			if (this.isLogin()) {
				const { data: res } = await findAllOrders();
				if (!res.success) return uni.$showMsg();
				// console.log(res);
				this.orders = res.data.orderList;
				if (this.current == 4) {
					const { data: res1 } = await orderReturnApplys();
					// console.log(res1);
					this.retunList = res1.data.items;
					// console.log(this.retunList);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.order_main {
	.order_item {
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;
		color: #666;
		.order_no_row {
			display: flex;
			padding: 10rpx 0;
			justify-content: space-between;
			.order_no_text {
			}

			.order_no_value {
			}
		}

		.order_price_row {
			display: flex;
			padding: 10rpx 0;
			justify-content: space-between;
			.order_price_text {
			}

			.order_price_value {
				color: #f00;
				font-size: 32rpx;
			}
		}

		.order_time_row {
			display: flex;
			padding: 10rpx 0;
			justify-content: space-between;
			.order_time_text {
			}

			.order_time_value {
			}
		}
	}
}
</style>
