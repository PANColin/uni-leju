import baseUrl from "./baseUrl"
// 同时发送异步代码的次数
let ajaxTimes = 0;
const request = (params) => {
	// 解构将参数中的header请求信息携带
	let header = {
		...params.header
	};
	header["content-type"] = params.type ? params.type : "application/json"
	// if (params.method == 'post') {
	// 	// header['Authorization'] = uni.getStorageSync('token');
	// 	header['token'] = uni.getStorageSync('token');
	// }
	header['token'] = uni.getStorageSync('token');
	// 每调用一次ajaxTimes++
	ajaxTimes++;
	// 显示加载中图标
	uni.showLoading({
		title: "加载中",
		mask: true,
	});

	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: baseUrl + params.url,
			header: header,
			success: (result) => {
				// console.log(result);
				if (result.data.code === 20002) {
					uni.$confirmMsg({
						content: "token已过期，是否跳转到登录页面"
					}, () => {
						uni.navigateTo({
							url: "/pages/user/login/login"
						});
					})
				}
				resolve(result);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				//完成一次ajax就减减
				ajaxTimes--;
				// 当ajaxTimes等于0的时候关闭
				// console.log(ajaxTimes);
				if (!ajaxTimes) {
					// console.log(ajaxTimes);
					//  关闭正在等待的图标
					uni.hideLoading();
				}
			},
		});
	});
};
export {
	request
};
