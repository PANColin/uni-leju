<template>
	<view>
		<view class="top">
			<view class="img-wrapper"><image src="@/static/images/icons/leju-logo.png" mode=""></image></view>
		</view>
		<view class="ipt">
			<form @submit="formSubmit" @reset="formReset">
				<!-- username:17596496508 password:123456 -->
				<view class="uni-form-item uni-column"><input type="text" value="colin" class="uni-input" name="username" placeholder="请输入用户名" /></view>
				<view class="uni-form-item uni-column">
					<view class="uni-input-self">
						<input :password="isShowPwd" type="text" value="123456" name="password" placeholder="请输入登录密码" />
						<view class="icon-wrapper" @tap="isShowPwd = !isShowPwd">
							<uni-icons type="eye" v-if="!isShowPwd"></uni-icons>
							<uni-icons type="eye-slash" v-else></uni-icons>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit" type="primary" size="default">登录</button>
					<button class="reset" type="primary" form-type="reset">重置</button>
					<view class="btm">
						<view class="findP" @click="resetPwd">重置密码</view>
						<navigator url="../register/register" class="register">注册账号</navigator>
					</view>
				</view>
			</form>
		</view>
		<view class="mask" v-if="isResetPwd">
			<view class="wrapper">
				<view class="title"><text>重置密码</text></view>
				<form @submit="formRetPwd">
					<view class="uni-form-item uni-column"><input type="text" class="uni-input" name="username" placeholder="重置密码的用户名" /></view>
					<view class="uni-btn-v">
						<button form-type="submit" type="warn" size="default">确定</button>
						<button @click="isResetPwd = false" type="primary" size="default">取消</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
// 按需导入辅助函数
import { mapMutations, mapState } from 'vuex';
import { doLogin, getMemberInfo, uploadAvatar } from '@/api/user/login/index.js';
import { resetPassword, updatePassword } from '@/api/user/index.js';
export default {
	data() {
		return {
			isShowPwd: true,
			isResetPwd: false
		};
	},
	computed: {
		// 调用 mapState 辅助方法，把 m_user 模块中的数据映射到当前用组件中使用
		...mapState('m_user', ['redirectInfo'])
	},
	methods: {
		...mapMutations('m_user', ['updateToken', 'updateRedirectInfo']),
		// 重置密码
		resetPwd() {
			this.isResetPwd = true;
		},
		//表单重置
		formReset(e) {
			// console.log(e);
		},
		//表单的重置密码提交
		async formRetPwd(e) {
			// console.log(e);
			const username = e.detail.value.username;
			// console.log(username);
			if (!username.trim()) return uni.$showMsg({ title: '请输入用户名' });
			const { data: res } = await resetPassword(username);
			if (!res.success) return uni.$showMsg({ title: res.message });
			uni.$showMsg({ title: '重置成功' });
			this.isResetPwd = false;
		},
		async formSubmit(val) {
			// console.log(val);
			const params = val.detail.value;
			if (!params.username.trim() || !params.password.trim()) {
				return uni.$showMsg({ title: '用户名或密码不能为空' });
			} else {
				const { data: res } = await doLogin(params);
				// console.log(res);
				if (!res.success) return uni.$showMsg({ title: res.message });
				this.updateToken(res.data.token);
				// console.log(this.redirectInfo);
				// uni.setStorageSync('token', res.data.token);
				uni.reLaunch({
					//链判断运算符?.和null运算符
					url: this.redirectInfo?.from ?? '/pages/user/user'
					// url: this.redirectInfo.from
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.mask {
	width: 100%;
	height: 100%;
	background-color: rgba($color: #000000, $alpha: 0.7);
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 999;
	transform: translate(-50%, -50%);
	.wrapper {
		border-radius: 50%;
		background-color: #fff;
		width: 80%;
		height: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999;
		transform: translate(-50%, -50%);
		.title {
			text-align: center;
		}
		.uni-form-item {
			.uni-input {
				padding: 30rpx;
				width: 60%;
				height: 44rpx;
				margin: 80rpx auto;
				border-radius: 40rpx;
				box-shadow: 2rpx 2rpx 18rpx #3b3b3b;
			}
		}
		.uni-btn-v {
			button {
				width: 30%;
				margin: 20rpx auto;
				border-radius: 20rpx;
			}
		}
	}
}
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
		.btm {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 40rpx 0;
			font-size: 26rpx;
			color: #b3b3b3;
			.register {
				border-left: 1px solid #999;
				padding: 0 40rpx;
			}
			.findP {
				padding: 0 40rpx;
			}
		}
	}
}
</style>
