import {
	request
} from '@/api/index.js'

// 文章明细
function productArticle(id) {
	return request({
		url: `/lejuClient/productArticle/productArticle/${id}`
	})
}
// 查询文章列表
function findArticleByPage(start, limit) {
	return request({
		url: `/lejuClient/productArticle/findArticleByPage/${start}/${limit}`
	})
}

// 品牌列表
function findBrandsByPage(start, limit) {
	return request({
		url: `/lejuClient/brand/findBrandsByPage/${start}/${limit}`
	})
}

export {
	productArticle,
	findArticleByPage,
	findBrandsByPage
}
