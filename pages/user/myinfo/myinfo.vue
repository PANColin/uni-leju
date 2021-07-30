<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="userInfo">
				<view class="row row1">
					<text class="left">用户头像</text>
					<block v-if="!isUpdate">
						<view class="right"><image :src="userInfo.icon" mode="widthFix"></image></view>
					</block>
					<block v-else>
						<button type="primary" size="default" @click="updataAvatar" v-if="!icon">上传头像</button>
						<view class="right" v-else @click="updataAvatar"><image :src="icon" mode="widthFix"></image></view>
					</block>
				</view>
				<view class="row row2">
					<text class="left">用户名</text>
					<block v-if="!isUpdate">
						<text class="right">{{ userInfo.username }}</text>
					</block>
					<block v-else><input type="text" name="name" :value="userInfo.username" placeholder="请输入修改的用户名" /></block>
				</view>
				<view class="row row3">
					<text class="left">用户昵称</text>
					<block v-if="!isUpdate">
						<text class="right">{{ userInfo.nickname }}</text>
					</block>
					<block v-else><input type="text" name="nickname" :value="userInfo.nickname" placeholder="请输入修改的用户昵称" /></block>
				</view>
				<view class="row row4">
					<text class="left">手机号</text>
					<block v-if="!isUpdate">
						<text class="right">{{ userInfo.phone }}</text>
					</block>
					<block v-else><input type="text" name="tel" :value="userInfo.phone" placeholder="请输入修改的手机号码" /></block>
				</view>
			</view>

			<view class="updateUserInfo">
				<button type="default" @click="isUpdateUserInfo">
					<text v-if="!isUpdate">修改用户信息</text>
					<text v-else>取消修改</text>
				</button>
			</view>
			<view class="loginout">
				<button v-if="!isUpdate" type="default" @click="loginout">退出登录</button>
				<button type="default" form-type="submit" v-else>更新</button>
				<button class="reset" type="primary" form-type="reset" v-if="isUpdate">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
// 按需导入辅助函数
import { mapMutations, mapState } from 'vuex';
import baseUrl from '@/api/baseUrl.js';
import isLogin from '@/mixins/isLogin.js';
import initValidate from '@/mixins/rules.js';
import { updateMemberInfo } from '@/api/user/index.js';
import { getMemberInfo } from '@/api/user/login/index.js';
export default {
	mixins: [initValidate, isLogin],
	data() {
		return {
			isUpdate: false,
			icon: ''
		};
	},
	onLoad() {
		this.initValidate({ nickname: { required: true, rangelength: [2, 10] } }, { nickname: { required: '请输入昵称', rangelength: '昵称在2-10个字符' } });
	},
	computed: {
		userInfo: {
			get() {
				return this.$store.state['m_user'].userInfo;
			},
			set(newVal) {
				return (this.$store.state['m_user'].userInfo = newVal);
			}
		},
		token: {
			get() {
				return this.$store.state['m_user'].token;
			},
			set() {}
		}
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
		//表单重置
		formReset(e) {
			// console.log(e);
		},
		isUpdateUserInfo() {
			this.isUpdate = !this.isUpdate;
		},
		//更新信息
		async formSubmit(e) {
			console.log(e);
			console.log(e);
			const obj = e.detail.value;
			if (!this.WxValidate.checkForm(obj)) {
				//表单元素验证不通过，此处给出相应提示
				let error = this.WxValidate.errorList[0];
				// console.log(error);
				uni.$showMsg({ title: error.msg });
			} else {
				const params = {
					icon: this.icon,
					isDisabled: 0,
					nickname: obj.nickname,
					phone: obj.tel,
					sex: 0,
					username: obj.name,
					id: this.userInfo.id
				};
				const { data: res } = await updateMemberInfo(params);
				// console.log(res);
				const { data: res1 } = await getMemberInfo({ header: { token: this.token } });
				if (!res1.success) return uni.$showMsg();
				// this.userInfo = res.data.userInfo;
				this.updateUserInfo(res1.data.userInfo);
				uni.reLaunch({
					url: '../user'
				});
			}
		},
		// 退出登录
		loginout() {
			this.updateToken('');
			// 清空用户信息
			this.updateUserInfo({});
			this.isLogin('/pages/user/user');
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
.userInfo {
	.row {
		height: 166rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #bbb;
		padding: 0 40rpx;
		.left {
			// flex: 1;
		}
		.right {
			// flex: 3;
		}
	}
	.row1 {
		.right {
			width: 114rpx;
			height: 114rpx;
			overflow: hidden;
			border-radius: 50%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.updateUserInfo,
.loginout {
	width: 80%;
	margin: 20rpx auto;
	button {
		color: #fff;
	}
}
.updateUserInfo {
	button {
		background-color: #999;
	}
}
.loginout {
	button {
		background-color: $navigateBackgroundColor;
	}
	.reset {
		margin-top: 30rpx;
		background-color: #3f536e;
	}
}
</style>
