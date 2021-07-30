import {
	request
} from "@/api/index.js"
// 添加购物车
function addCart(data) {
	return request({
		url: `/lejuClient/cart/addCart`,
		method: "post",
		data
	})
}

// 清空购物车
function clearCart() {
	return request({
		url: `/lejuClient/cart/clearCart`,
		method: 'post'
	})
}
// 删除购物车数据
function delCartItems(data) {
	return request({
		url: `/lejuClient/cart/delCartItems`,
		method: "post",
		data
	})
}
// 获取购物车所有数据
function findAllCartItem() {
	return request({
		url: `/lejuClient/cart/findAllCartItem`,

	})
}
export {
	addCart,
	clearCart,
	delCartItems,
	findAllCartItem
}
