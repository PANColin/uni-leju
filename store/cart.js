export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	// 模块的 mutations 方法
	mutations: {
		allCart(state, allCart) {
			state.cart = allCart
			// console.log(state.cart);
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车中的数据持久化存储到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车的选中状态
		updateStatus(state, good) {
			const findResult = state.cart.find((x) => x.id === good.goods_id);
			console.log("come", good);
			// 如果找到的话改变状态
			if (findResult) {
				console.log("find");
				findResult.goods_state = good.goods_state
				// 将购物车中的数据持久化存储到本地
				// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
				this.commit('m_cart/saveToStorage')
			}
		},
		// // 更新购物车中商品的数量
		updateGoodsCount(state, objParams) {
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.id === objParams.id)
			console.log(findResult, objParams);
			if (findResult && objParams.status === 'minus') {
				// 更新对应商品的数量
				findResult.quantity = --findResult.quantity;
			} else if (findResult && objParams.status === 'plus') {
				// 更新对应商品的数量
				findResult.quantity = ++findResult.quantity;
			} else {
				// 更新对应商品的数量
				findResult.quantity = objParams.num;
			}
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		// 删除购物车的数据
		deleteGoods(state, good) {
			// 根据 goods_id 查询购物车中对应商品的信息对象的索引
			const findResultIndex = state.cart.findIndex(x => x.id === good.id)
			// console.log(findResultIndex);
			console.log(good);
			if (good.status) {
				state.cart.splice(findResultIndex, 1)
			}
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}
	},

	// 模块的 getters 属性
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			return state.cart.reduce((total, item) => total += item.quantity, 0);
		},
		// 勾选的商品的总数量
		checkedCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.quantity, 0)
		},
		// 已勾选的商品的总价
		checkedGoodsAmount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
			// reduce() 的返回值就是已勾选的商品的总价
			// 最后调用 toFixed(2) 方法，保留两位小数
			return state.cart.filter(x => x.goods_state)
				.reduce((totalPrice, item) => totalPrice += item.quantity * item.price, 0)
				.toFixed(2)
		}
	},
}
