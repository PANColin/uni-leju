<template>
	<view>
		<block v-for="item in collectList" :key="item.id"><my-good :goods="item"></my-good></block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			collectList: []
		};
	},
	onLoad() {
		this.collectList = uni.getStorageSync('goodsCollect');
		if (!this.collectList.length) {
			uni.$showMsg({ title: '暂无收藏', duration: 3000 });
		}
	}
};
</script>

<style lang="scss" scoped></style>
