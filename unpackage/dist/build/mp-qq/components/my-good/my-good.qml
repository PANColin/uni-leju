<view class="wrapper"><view class="left"><block qq:if="{{showRadio}}"><radio checked="{{goods.goods_state}}" color="#C00000" data-event-opts="{{[['tap',[['clickHandler',['$event']]]]]}}" bindtap="__e"></radio></block></view><view class="goods-wrapper"><view data-event-opts="{{[['tap',[['moveToDetail',['$event']]]]]}}" bindtap="__e"><view class="goods_item"><view class="goods_img_wrap"><block qq:if="{{goods.productPic}}"><block><image mode="widthFix" src="{{goods.productPic?goods.productPic:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'}}"></image></block></block><block qq:if="{{goods.pic}}"><block><image mode="widthFix" src="{{goods.pic?goods.pic:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'}}"></image></block></block></view><view class="goods_info_wrap"><block qq:if="{{goods.productName}}"><block><view class="goods_name">{{goods.productName}}</view></block></block><block qq:if="{{goods.name}}"><block><view class="goods_name">{{goods.name}}</view></block></block><block qq:if="{{goods.productId}}"><block><view class="goods_productSkuId">{{"编号:"+goods.productId}}</view></block></block><text class="goods_price">{{"价格:￥"+$root.f0}}</text><block qq:if="{{goods.quantity}}"><block><text class="goods_num">{{"数量:"+goods.quantity}}</text></block></block><block qq:if="{{goods.productQuantity}}"><block><text class="goodspro_num">{{"x"+goods.productQuantity}}</text></block></block><block qq:if="{{goods.productCount}}"><block><text class="goodspro_num">{{"x"+goods.productCount}}</text></block></block><block qq:if="{{isProductAttr}}"><text class="dec"><block qq:for="{{goods.productAttr}}" qq:for-item="item" qq:for-index="index" qq:key="index"><block><text class="dec-item">{{item.key+":"+item.value}}</text></block></block></text></block><block qq:if="{{current==2}}"><block><view data-event-opts="{{[['tap',[['returnGood',['$event']]]]]}}" class="return_good" catchtap="__e"><text>退货</text></view></block></block></view></view></view><block qq:if="{{showNum}}"><view class="goods_info-bottom"><uni-number-box vue-id="15d81e68-1" min="{{1}}" value="{{goods.quantity}}" data-event-opts="{{[['^change',[['bindChange']]]]}}" bind:change="__e" bind:__l="__l"></uni-number-box></view></block></view></view>