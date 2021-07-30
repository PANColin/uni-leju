<template>
	<view><my-find :list="collectList" :isShowTabs="false"></my-find></view>
</template>

<script>
export default {
	data() {
		return {
			collectList: []
		};
	},
	onLoad() {
		this.collectList = uni.getStorageSync('findCollect');
		if (!this.collectList.length) {
			uni.$showMsg({ title: '暂无收藏', duration: 3000 });
		}
	}
};
</script>

<style lang="scss"></style>
