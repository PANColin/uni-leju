import {
	request
} from "@/api/index.js"
// 添加收获地址
function addAddressInfo(data) {
	return request({
		url: `/lejuClient/address/addAddressInfo`,
		method: "post",
		data
	})
}

// 删除收获地址
function delAddressInfo(addressId) {
	return request({
		url: `/lejuClient/address/delAddressInfo/${addressId}`,
		method: 'delete'
	})
}
// 查询所有的收获地址
function findAllAddress() {
	return request({
		url: `/lejuClient/address/findAllAddress`
	})
}
// 切换默认状态
function switchDefault(addressId, defaultStatus) {
	return request({
		url: `/lejuClient/address/switchDefault/${addressId}/${defaultStatus}`,
		method: 'post'
	})
}
// 更新收获地址
function updateAddressInfo(data) {
	return request({
		url: `/lejuClient/address/updateAddressInfo`,
		method: 'post',
		data,
	})
}
export {
	addAddressInfo,
	delAddressInfo,
	findAllAddress,
	switchDefault,
	updateAddressInfo
}
