import {
	request
} from "@/api/index.js"
// 生成订单
function addPreOrder(data) {
	return request({
		url: `/lejuClient/order/addPreOrder`,
		method: "post",
		data
	})
}

// 通过id获取订单详情
function getPreOrderById(id) {
	return request({
		url: `/lejuClient/order/getPreOrderById/${id}`
	})
}
// 提交确认订单
function addConfirmOrder(data) {
	return request({
		url: `/lejuClient/order/addConfirmOrder`,
		method: "post",
		data
	})
}
// 确认支付
function payConfirm(data) {
	return request({
		url: `/lejuClient/order/payConfirm`,
		method: "post",
		data
	})
}

export {
	addPreOrder,
	getPreOrderById,
	addConfirmOrder,
	payConfirm
}
