import Vue from 'vue'
import App from './App'
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'
// 封装一个消息弹窗
uni.$showMsg = function(params) {
	uni.showToast({
		title: "数据请求失败",
		duration: 1500,
		icon: "none",
		mask: true,
		...params,
	})
}
uni.$confirmMsg = function(params, fn) {
	uni.showModal({
		cancelText: '取消',
		confirmText: '确定',
		content: '请确定要删除么？亲',
		title: '系统提示',
		showCancel: true,
		success: res => {
			if (res.confirm) {
				fn && fn()
				uni.$showMsg({
					title: '亲,确认成功'
				});
			} else {
				uni.$showMsg({
					title: '亲？您取消了'
				});
			}
		},
		...params
	})
}
const app = new Vue({
	...App,
	store,
})
app.$mount()
