import {
	request
} from '@/api/index.js'
//所有的订单
function findAllOrders(data) {
	return request({
		url: `/lejuClient/order/findAllOrders`
	})
}

//售后的订单
function orderReturnApplys() {
	return request({
		url: `/lejuClient/orderReturn/orderReturnApplys`
	})
}
// 取消订单
function cancelOrder(orderId) {
	return request({
		url: `/lejuClient/order/cancelOrder/${orderId}`,
		method: 'post'
	})
}
// 确认收货
function receiveDone(data) {
	return request({
		url: `/lejuClient/order/receiveDone`,
		method: 'post',
		data
	})
}
// 获取退单公司
function getCompanyAddrss() {
	return request({
		url: `/lejuClient/orderReturn/getCompanyAddrss`,
	})
}

// 申请退单
function addOrderReturnApply(data) {
	return request({
		url: `/lejuClient/orderReturn/addOrderReturnApply`,
		method: 'post',
		data
	})
}
// 删除订单
function deleteOrder(orderId) {
	return request({
		url: `/lejuClient/order/deleteOrder/${orderId}`,
		method: 'delete',
	})
}

export {
	findAllOrders,
	orderReturnApplys,
	cancelOrder,
	receiveDone,
	getCompanyAddrss,
	addOrderReturnApply,
	deleteOrder
}
