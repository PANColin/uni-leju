<template>
	<view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		<view class="ipt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<text class="title">收件人</text>
					<input type="text" class="uni-input" :value="message.name ? message.name : ''" name="name" placeholder="请输入收件人" />
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">电话号码</text>
					<input type="text" class="uni-input" :value="message.phoneNumber ? message.phoneNumber : ''" name="tel" placeholder="请输入电话号码" />
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">所在地区</text>
					<input class="uni-input" type="default" name="cityValueDefault" disabled="true" :value="cityValueDefault" placeholder="请选择地址" @click="selected" />
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">详细地址</text>
					<input type="text" :value="message.detailAddress ? message.detailAddress : ''" class="uni-input" name="detailAddress" placeholder="请输入详细地址" />
				</view>
				<view class="uni-form-item uni-column">
					<text class="title">设置默认地址</text>
					<switch name="defaultStatus" :checked="Boolean(message.defaultStatus) ? Boolean(message.defaultStatus) : ''" @change="defaultChange" />
				</view>
				<view class="uni-btn-v">
					<button v-if="message.id" type="warn" @click="delAddress">删除收货地址</button>
					<button class="reset" form-type="reset" type="primary">重置</button>
					<button form-type="submit" type="primary" size="default">保存收货地址</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import initValidate from '../../mixins/rules.js';
import isLogin from '../../mixins/isLogin.js';
import { formatTime } from '../../utils/util.js';
import simpleAddress from '@/components/simple-address/simple-address.vue';
import { addAddressInfo, delAddressInfo, findAllAddress, switchDefault, updateAddressInfo } from '@/api/address/index.js';
export default {
	components: {
		simpleAddress
	},
	mixins: [initValidate, isLogin],
	data() {
		return {
			cityPickerValueDefault: [0, 0, 1],
			cityValueDefault: '',
			message: {
				name: '',
				phoneNumber: '',
				detailAddress: '',
				defaultStatus: 0,
				createTime: '', //formatTime(new Date()),
				city: '',
				cityCode: '',
				id: '',
				memberId: '',
				modifyTime: '', // formatTime(new Date()),
				postCode: '',
				region: '',
				province: '',
				tag: ''
			}
		};
	},

	onLoad(options) {
		this.initValidate({ cityValueDefault: { required: true } }, { cityValueDefault: { required: '地址必填' } });
		// console.log(options);
		if (this.isLogin()) {
			const addressList = JSON.parse(uni.getStorageSync('appAddressList'));
			if (addressList) {
				const res = addressList.find(el => el.id == options.addressId);
				// 如果找到了才添加
				if (res) {
					console.log(res);
					this.cityValueDefault = `${res.province}-${res.city}-${res.region}`;
					this.message.name = res.name;
					this.message.phoneNumber = res.phoneNumber;
					this.message.detailAddress = res.detailAddress;
					this.message.defaultStatus = res.defaultStatus;
					this.message.id = res.id;
					this.message.memberId = res.memberId;
					this.message.province = res.province;
					this.message.city = res.city;
					this.message.region = res.region;
					this.message.cityCode = res.cityCode;
				}
			}
		}
	},
	methods: {
		//表单重置
		formReset(e) {
			// console.log(e);
		},
		// 删除地址
		async delAddress() {
			uni.$confirmMsg({}, async () => {
				const { data: res } = await delAddressInfo(this.message.id);
				if (res.success) {
					uni.reLaunch({
						url: '../address/address'
					});
				}
			});
		},
		//改变默认地址
		async defaultChange() {
			// console.log(this.message);
			// 如果是修改才改变状态
			this.message.defaultStatus = Number(!this.message.defaultStatus);
			if (this.message.id) {
				const { data: res1 } = await switchDefault(this.message.id, this.message.defaultStatus);
				// console.log(res1, '切换默认状态');
			}
		},
		async formSubmit(e) {
			// console.log(e);
			const obj = e.detail.value;
			// console.log(this.WxValidate.checkForm(obj));
			if (!this.WxValidate.checkForm(obj)) {
				//表单元素验证不通过，此处给出相应提示
				let error = this.WxValidate.errorList[0];
				// console.log(error);
				uni.$showMsg({ title: error.msg });
			} else {
				if (this.message.id) {
					// console.log(this.message);
					const { data: res } = await updateAddressInfo(this.message);
					// console.log(res);
					if (!res.success) return uni.$showMsg();
					uni.$showMsg({ title: '修改成功' });
					uni.reLaunch({
						url: '../address/address'
					});
				} else {
					this.message.name = e.detail.value.name;
					this.message.detailAddress = e.detail.value.detailAddress;
					this.message.phoneNumber = e.detail.value.tel;
					this.message.defaultStatus = Number(e.detail.value.defaultStatus);
					// console.log(this.message);
					const { data: res } = await addAddressInfo(this.message);
					// console.log(res);
					if (!res.success) return uni.$showMsg();
					uni.$showMsg({ title: '保存成功' });
					uni.reLaunch({
						url: '../address/address'
					});
				}
			}
		},
		onConfirm(e) {
			// console.log(e);
			this.cityPickerValueDefault = e.value;
			this.cityValueDefault = e.label;
			this.message.province = e.labelArr[0];
			this.message.city = e.labelArr[1];
			this.message.region = e.labelArr[2];
			this.message.cityCode = `${e.provinceCode}-${e.cityCode}-${e.areaCode}`;
		},
		selected() {
			this.$refs.simpleAddress.open();
		}
	}
};
</script>

<style lang="scss" scoped>
.ipt {
	padding: 40rpx;
	.uni-column {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #777;
		padding: 40rpx 0;
		.title {
			flex: 1;
		}
		.uni-input {
			flex: 3;
		}
	}
	.uni-btn-v {
		margin-top: 80rpx;
		button {
			margin: 10rpx;
		}
	}
}
</style>
