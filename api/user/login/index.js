import {
	request
} from '@/api/index.js'

// 用户登录
function doLogin(data) {
	return request({
		url: "/lejuClient/login/doLogin",
		method: 'post',
		data
	})
}
//获取用户信息
function getMemberInfo(params) {
	return request({
		url: "/lejuClient/login/getMemberInfo",
		...params
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

export {
	doLogin,
	getMemberInfo,
	uploadAvatar
}
