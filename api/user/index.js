import {
	request
} from '@/api/index.js'

// 用户注册
function register(data) {
	return request({
		url: "/lejuClient/member/register",
		method: 'post',
		data
	})
}
//重置密码
function resetPassword(username) {
	return request({
		url: `/lejuClient/member/resetPassword/${username}`,
		method: 'post'
	})
}

//更新用户信息
function updateMemberInfo(data) {
	return request({
		url: "/lejuClient/member/updateMemberInfo",
		data,
		method: 'post'
	})
}
//上传头像
function uploadAvatar(data) {
	return request({
		url: "/lejuClient/login/uploadAvatar",
		data,
		method: 'post'
	})
}

//更改密码
function updatePassword(data) {
	return request({
		url: "/lejuClient/member/updatePassword",
		data,
		method: 'post'
	})
}

export {
	register,
	resetPassword,
	updateMemberInfo,
	uploadAvatar,
	updatePassword
}
