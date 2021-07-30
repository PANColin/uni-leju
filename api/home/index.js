import {
	request
} from "@/api/index.js"

function bannerAds() {
	return request({
		url: "/lejuClient/home/bannerAds"
	})
}
// 商品分类
function findCategory(id) {
	return request({
		url: `/lejuClient/productCategory/findCategory/${id}`
	})
}
// 新品推荐
function latestProducts(start, limit) {
	return request({
		url: `/lejuClient/home/latestProducts/${start}/${limit}`
	})
}
// 热门推荐
function hotList() {
	return request({
		url: "/lejuClient/home/hotList"
	})
}
// 限时活动
function recommendList() {
	return request({
		url: "/lejuClient/home/recommendList"
	})
}
// 最高销量（猜你喜欢）
function saleMostProducts() {
	return request({
		url: "/lejuClient/home/saleMostProducts"
	})
}
// 新品推荐
function lejuLatestProducts() {
	return request({
		url: "/lejuClient/home/lejuLatestProducts"
	})
}

function findProductList(start, limit, data) {
	return request({
		url: `/lejuClient/product/findProductList/${start}/${limit}`,
		method: "post",
		data
	})
}
export {
	bannerAds,
	findCategory,
	hotList,
	recommendList,
	latestProducts,
	saleMostProducts,
	lejuLatestProducts,
	findProductList
}
