<template>
	<view>
		<view class="top" @click="updataAvatar">
			<view class="img-wrapper"><image :src="icon ? icon : '../../../static/images/icons/leju-logo.png'" mode=""></image></view>
		</view>
		<view class="ipt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column"><input class="uni-input" type="default" name="name" value="" placeholder="用户名" /></view>
				<view class="uni-form-item uni-column"><input type="text" class="uni-input" value="" name="tel" placeholder="电话号码" /></view>
				<view class="uni-form-item uni-column"><input type="text" value="" class="uni-input" name="nickname" placeholder="昵称" /></view>
				<view class="uni-form-item uni-column">
					<view class="uni-input-self">
						<input :password="isShowPwd" type="text" value="" name="password" placeholder="登录密码" />
						<view class="icon-wrapper" @tap="isShowPwd = !isShowPwd">
							<uni-icons type="eye" v-if="!isShowPwd"></uni-icons>
							<uni-icons type="eye-slash" v-else></uni-icons>
						</view>
					</view>
				</view>

				<view class="uni-code-self">
					<input type="text" value="" class="uni-input" name="code" placeholder="验证码" />
					<view class="code-wrapper" @tap="getCode">
						<view class="dec" v-if="!isShowCode"><button type="default" size="mini">获取验证码</button></view>
						<view class="code" v-else>{{ code }}</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit" type="primary" size="default">注册</button>
					<button class="reset" type="primary" form-type="reset">重置</button>
					<view class="xieyi">
						<view class="left">点击注册，即代表您同意</view>
						<text class="right">《条款协议》</text>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import baseUrl from '@/api/baseUrl.js';
import { register, resetPassword, updateMemberInfo, uploadAvatar, updatePassword } from '@/api/user/index.js';
import initValidate from '@/mixins/rules.js';
import showTips from '@/mixins/showTips.js';
export default {
	mixins: [initValidate, showTips],
	data() {
		return {
			isShowPwd: true,
			icon: '',
			// 验证码
			code: '',
			isShowCode: false
		};
	},
	onLoad() {
		this.initValidate(
			{ nickname: { required: true, rangelength: [2, 10] }, password: { required: true, rangelength: [5, 9] } },
			{ nickname: { required: '请输入昵称', rangelength: '昵称在2-10个字符' }, password: { required: '请输入密码', rangelength: '密码2-5个字符' } }
		);
	},
	methods: {
		//表单重置
		formReset(e) {
			// console.log(e);
			this.isShowCode = false;
		},
		getCode() {
			do {
				this.code = Math.floor(Math.random() * 10000);
			} while (this.code < 1000);
			console.log(this.code);
			this.isShowCode = true;
		},
		async formSubmit(e) {
			console.log(e);
			const obj = e.detail.value;
			if (!this.WxValidate.checkForm(obj)) {
				//表单元素验证不通过，此处给出相应提示
				let error = this.WxValidate.errorList[0];
				// console.log(error);
				uni.$showMsg({ title: error.msg });
				// console.log(obj.code != this.code);
			} else if (obj.code != this.code) {
				return uni.$showMsg({ title: '验证码不正确，请重新输入' });
			} else {
				const params = {
					birthday: '',
					city: '',
					email: '',
					growth: 0,
					historyIntegration: 0,
					icon: this.icon,
					integration: 0,
					isDisabled: 0,
					memberLevelId: '',
					nickname: obj.nickname,
					password: obj.password,
					personalizedSignature: '',
					phone: obj.tel,
					realname: '',
					sex: 0,
					sourceType: 0,
					status: 1,
					username: obj.name,
					wxOpenId: ''
				};
				const { data: res } = await register(params);
				// console.log(res);
				if (!res.success) return uni.$showMsg({ title: res.message });
				uni.$showMsg({ title: '注册成功' });
				// 让显示跳转到个人更新的方法延迟2秒执行
				setTimeout(() => {
					this.delayNavigate('navigateTo', '../login/login', '登录界面');
				}, 2000);
			}
		},
		async updataAvatar() {
			uni.chooseImage({
				count: 1,
				success: res => {
					uni.uploadFile({
						url: baseUrl + '/lejuClient/login/uploadAvatar',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: res1 => {
							// console.log(res1,"============");
							this.icon = JSON.parse(res1.data).data.fileUrl;
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 400rpx;
	.img-wrapper {
		width: 154rpx;
		height: 154rpx;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 4rpx 4rpx 20rpx #232323;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.ipt {
	.uni-code-self {
		display: flex;
		align-items: center;
		padding: 30rpx;
		width: 80%;
		height: 44rpx;
		margin: 80rpx auto;
		border-radius: 40rpx;
		box-shadow: 2rpx 2rpx 18rpx #3b3b3b;
		.dec {
			button {
				width: fit-content;
				height: 64rpx;
				font-size: 24rpx;
				background-color: #ffb;
				color: #999;
			}
		}
		.code {
			background-color: #ff0;
			font-family: fantasy;
		}
	}
	.uni-form-item {
		.uni-input,
		.uni-input-self {
			padding: 30rpx;
			width: 80%;
			height: 44rpx;
			margin: 80rpx auto;
			border-radius: 40rpx;
			box-shadow: 2rpx 2rpx 18rpx #3b3b3b;
		}
		.uni-input-self {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.uni-btn-v {
		margin-top: 80rpx;
		button {
			background-color: #354e44;
			width: 80%;
			margin: 0 auto;
			border-radius: 36rpx;
		}
		.reset {
			margin-top: 30rpx;
			background-color: #3f536e;
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
