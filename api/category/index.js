import {
	request
} from "@/api/index.js"
// 商品分类
function findCategory(id) {
	return request({
		url: `/lejuClient/productCategory/findCategory/${id}`
	})
}

function findProductList(start, limit, data) {
	return request({
		url: `/lejuClient/product/findProductList/${start}/${limit}`,
		method: "post",
		data
	})
}

function productDetail(productId) {
	return request({
		url: `/lejuClient/product/productDetail/${productId}`
	})
}
export {
	findCategory,
	findProductList,
	productDetail
}
