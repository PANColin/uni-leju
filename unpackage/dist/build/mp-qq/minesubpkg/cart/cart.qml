<block qq:if="{{cart.length}}"><view class="wrapper"><button type="default" data-event-opts="{{[['tap',[['clearCart',['$event']]]]]}}" bindtap="__e">清空购物车</button><view class="cart-title"><uni-icons vue-id="47606597-1" type="shop" size="20" bind:__l="__l"></uni-icons><text class="cart-title-text">购物车</text></view><view class="goods-wrapper"><uni-swipe-action vue-id="47606597-2" bind:__l="__l" vue-slots="{{['default']}}"><block qq:for="{{cart}}" qq:for-item="goods" qq:for-index="i" qq:key="i"><block><uni-swipe-action-item vue-id="{{('47606597-3-'+i)+','+('47606597-2')}}" right-options="{{options}}" data-event-opts="{{[['^click',[['swipeActionClickHandler',['$0'],[[['cart','',i]]]]]]]}}" bind:click="__e" bind:__l="__l" vue-slots="{{['default']}}"><my-good vue-id="{{('47606597-4-'+i)+','+('47606597-3-'+i)}}" goods="{{goods}}" show-radio="{{true}}" show-num="{{true}}" data-event-opts="{{[['^radioChange',[['radioChangeHandler']]],['^numChange',[['numChangeHandler']]]]}}" bind:radioChange="__e" bind:numChange="__e" bind:__l="__l"></my-good></uni-swipe-action-item></block></block></uni-swipe-action></view><my-settle vue-id="47606597-5" bind:__l="__l"></my-settle></view></block><block qq:else><view class="empty-cart"><image class="empty-img" src="/static/cart_empty@2x.png"></image><text class="tip-text">空空如也~</text></view></block>