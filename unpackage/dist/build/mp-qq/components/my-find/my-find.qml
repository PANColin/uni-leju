<view class="data-v-6b3ef171"><block qq:if="{{isShowTabs}}"><view class="top data-v-6b3ef171"><block qq:for="{{tabsList}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view data-event-opts="{{[['tap',[['tabsClick',['$0',index],[[['tabsList','',index]]]]]]]}}" class="{{['item','data-v-6b3ef171',index==currentIndex?'btm':'']}}" bindtap="__e">{{item.name}}</view></block></view></block><view class="showList data-v-6b3ef171"><block qq:for="{{list}}" qq:for-item="item" qq:for-index="__i0__" qq:key="id"><view class="list-item data-v-6b3ef171"><navigator url="{{isWho=='article'?'/goodsubpkg/detailAB/detailAB?id='+item.id:'#'}}" class="data-v-6b3ef171"><view class="list-top data-v-6b3ef171"><image src="{{isWho=='article'?item.coverImg:item.logo}}" mode="widthFix" class="data-v-6b3ef171"></image><view class="txt data-v-6b3ef171"><text class="data-v-6b3ef171">{{item.title}}</text><text class="data-v-6b3ef171">{{item.summary}}</text></view></view></navigator><block qq:if="{{isWho=='article'}}"><view class="list-bottom data-v-6b3ef171"><view class="left data-v-6b3ef171"><uni-icons vue-id="{{'6f8462c4-1-'+__i0__}}" type="eye" class="data-v-6b3ef171" bind:__l="__l"></uni-icons><text class="count data-v-6b3ef171">{{item.viewCount}}</text></view><view data-event-opts="{{[['tap',[['collectClick',['$0','findCollect','/pages/find/find'],[[['list','id',item.id]]]]]]]}}" class="right data-v-6b3ef171" bindtap="__e"><uni-icons vue-id="{{'6f8462c4-2-'+__i0__}}" type="star" size="20" color="{{item.isCollected?'#f00':'#999'}}" class="data-v-6b3ef171" bind:__l="__l"></uni-icons></view></view></block><block qq:else><view class="brand-bottom data-v-6b3ef171"><text class="name data-v-6b3ef171">{{item.name}}</text><text class="brandStory data-v-6b3ef171">{{item.brandStory}}</text></view></block></view></block></view></view>