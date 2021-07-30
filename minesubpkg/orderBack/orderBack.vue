<template>
	<view>
		<view class="order">
			<view class="top">
				<text class="orderId">订单编号：{{ orderBase.orderSn }}</text>
			</view>
			<view class="goods">
				<block v-for="item in orderItems" :key="item.cartId"><my-good :goods="item"></my-good></block>
			</view>
			<view class="btm">
				<view class="title">合计:{{ orderBase.totalAmount }} 元</view>
			</view>
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form_mid">
				<view class="row1">
					<view class="title">请输入退单数量</view>
					<view class="dec"><input type="number" name="count" placeholder="请输入退单数量" /></view>
				</view>
				<view class="row2">
					<view class="title">请输入退货原因</view>
					<view class="dec"><input type="text" name="reason" placeholder="请输入退货原因" /></view>
				</view>
				<view class="row3">
					<view class="title">请选择退货地址</view>
					<view class="dec">
						<picker class="picker-view" @change="bindPickerChange" :value="index" :range="addressNameArr">
							<view v-if="isChange">请选择退货地址</view>
							<view v-else>{{ addressNameArr[index] }}</view>
						</picker>
					</view>
				</view>
				<view class="row4">
					<view class="title">请输入问题描述</view>
					<view class="dec"><textarea class="text_dec" name="description" placeholder="请输入问题描述" /></view>
				</view>
				<view class="row5">
					<view class="title">温馨提示</view>
					<view class="dec">上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张</view>
					<view class="fb_tool">
						<button @tap="handleChooseImg">+</button>
						<view class="up_img_item" v-for="(item, index) in imgList" :key="index" @tap="handleRemoveImg(index)"><my-img :src="item.path"></my-img></view>
					</view>
				</view>
			</view>
			<view class="btm">
				<button class="submit" form-type="submit" type="default">提交</button>
				<button class="reset" form-type="reset" type="primary">重置</button>
			</view>
		</form>
	</view>
</template>
<script>
import baseUrl from '@/api/baseUrl.js';
import showTips from '@/mixins/showTips.js';
import { getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
import { getCompanyAddrss, addOrderReturnApply } from '@/api/user/order/index.js';
export default {
	mixins: [showTips],
	data() {
		return {
			orderItems: [],
			orderBase: {},
			array: [],
			addressNameArr: [],
			index: 0,
			// 判断picker是否改变
			isChange: true,
			imgList: [],
			skuId: '',
			orderId: '',
			num: 1
		};
	},
	methods: {
		// picker改变事件
		bindPickerChange(e) {
			this.isChange = false;
			this.index = e.detail.value;
		},
		//表单提交
		async formSubmit(e) {
			const params = e.detail.value;
			// console.log(params);
			// console.log(Number(params.count.trim()));
			if (isNaN(Number(params.count.trim())) || typeof Number(params.count.trim()) !== 'number' || !params.count.trim())
				return uni.$showMsg({ title: '请输入合法的有效数值' });
			if (Number(params.count.trim()) < 0 || Number(params.count.trim()) > this.num) return uni.$showMsg({ title: '请输入合法的退款数量' });
			if (!params.reason.trim()) return uni.$showMsg({ title: '请输入退货原因' });

			if (!params.description.trim()) return uni.$showMsg({ title: '请输入问题描述' });
			var arr = [];
			// promise 专门解决异步操作
			this.imgList.forEach(ele => {
				var pro = new Promise(resolve => {
					uni.uploadFile({
						url: baseUrl + '/lejuClient/orderReturn/uploadImg',
						filePath: ele.path,
						name: 'file',
						success(res) {
							resolve(res);
						}
					});
				});
				arr.push(pro);
			});

			const res = await Promise.all(arr);
			var arr = res.map(ele => JSON.parse(ele.data).data.fileUrl);
			const returnParams = {
				companyAddressId: this.array[this.index].id,
				count: params.count,
				description: params.description,
				orderId: this.orderId,
				orderItemId: this.orderItemId,
				proofPics: arr.join(','),
				reason: params.reason
			};
			// console.log(returnParams);
			const { data: res1 } = await addOrderReturnApply(returnParams);
			if (!res1.success) return uni.$showMsg({ title: res1.message });
			// console.log(res1);
			uni.$showMsg({ title: '退款成功，等待商家处理', duration: 2000 });
			// 让显示跳转到个人更新的方法延迟2秒执行
			setTimeout(() => {
				this.delayNavigate('switchTab', '../../pages/user/user', '个人中心');
			}, 2000);
		},
		//表单重置
		formReset(e) {
			// console.log(e);
			this.isChange = true;
		},
		// 点击 自定义图片组件
		handleRemoveImg(e) {
			// 删除元素
			this.imgList.splice(e, 1);
		},
		handleChooseImg() {
			uni.chooseImage({
				success: res => {
					// console.log(res);
					var result = res.tempFiles;
					if (res.tempFiles.length > 3) {
						uni.$showMsg({ title: '图片数量超出三张，请重新选择' });
						return;
					}
					var item = result.find(ele => ele.size > 1048576);
					if (item) {
						uni.$showMsg({ title: '选择的图片大小大于1m,请重新选择' });
						return;
					}
					if (res.tempFiles.length + this.imgList.length > 3) {
						uni.$showMsg({ title: '选择的图片总数量超出3张，请重新上传' });
						return;
					}
					this.imgList.push(...result);
					// console.log(this.imgList);
				}
			});
		}
	},
	async onLoad(options) {
		this.num = options.num;
		this.orderItemId = options.orderItemId;
		this.orderId = options.orderId;
		const { data: res } = await getPreOrderById(options.orderId);
		// console.log(res);
		if (!res.success) return uni.$showMsg();
		res.data.orderItems.forEach(el => {
			el.productAttr = JSON.parse(el.productAttr);
		});
		this.orderItems = res.data.orderItems;
		this.orderBase = res.data.orderBase;

		const { data: res1 } = await getCompanyAddrss();
		// console.log(res1);
		if (!res1.success) return uni.$showMsg();
		this.array = res1.data.items;
		this.addressNameArr = res1.data.items.map(el => el.addressName);
	}
};
</script>

<style lang="scss" scoped>
.order,
.form_mid {
	width: 95%;
	margin: 40rpx auto;
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
.form_mid {
	.row1,
	.row2,
	.row3,
	.row4 {
		padding: 40rpx;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		.title {
			flex: 3;
		}
		.dec {
			flex: 3;
			.picker-view {
			}
			.text_dec {
				width: 130px;
				height: 200rpx;
			}
		}
	}
	.row5 {
		padding: 40rpx;
		font-size: 32rpx;
	}
}
.fb_tool {
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 30rpx;

	button {
		margin: 0;
		width: 90rpx;
		height: 90rpx;
		font-size: 60rpx;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		margin-top: 20rpx;
		color: #ccc;
	}

	.up_img_item {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
}
.btm {
	button {
		width: 50%;
		margin: 20rpx auto;
		color: #fff;
	}
	.submit {
		background-color: $navigateBackgroundColor;
	}
}
</style>
