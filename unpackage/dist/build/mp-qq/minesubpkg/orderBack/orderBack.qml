<view class="data-v-c3c9e6d0"><view class="order data-v-c3c9e6d0"><view class="top data-v-c3c9e6d0"><text class="orderId data-v-c3c9e6d0">{{"订单编号："+orderBase.orderSn}}</text></view><view class="goods data-v-c3c9e6d0"><block qq:for="{{orderItems}}" qq:for-item="item" qq:for-index="__i0__" qq:key="cartId"><block class="data-v-c3c9e6d0"><my-good vue-id="{{'4d7f8c83-1-'+__i0__}}" goods="{{item}}" class="data-v-c3c9e6d0" bind:__l="__l"></my-good></block></block></view><view class="btm data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">{{"合计:"+orderBase.totalAmount+" 元"}}</view></view></view><form data-event-opts="{{[['submit',[['formSubmit',['$event']]]],['reset',[['formReset',['$event']]]]]}}" bindsubmit="__e" bindreset="__e" class="data-v-c3c9e6d0"><view class="form_mid data-v-c3c9e6d0"><view class="row1 data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">请输入退单数量</view><view class="dec data-v-c3c9e6d0"><input type="number" name="count" placeholder="请输入退单数量" class="data-v-c3c9e6d0"/></view></view><view class="row2 data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">请输入退货原因</view><view class="dec data-v-c3c9e6d0"><input type="text" name="reason" placeholder="请输入退货原因" class="data-v-c3c9e6d0"/></view></view><view class="row3 data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">请选择退货地址</view><view class="dec data-v-c3c9e6d0"><picker class="picker-view data-v-c3c9e6d0" value="{{index}}" range="{{addressNameArr}}" data-event-opts="{{[['change',[['bindPickerChange',['$event']]]]]}}" bindchange="__e"><block qq:if="{{isChange}}"><view class="data-v-c3c9e6d0">请选择退货地址</view></block><block qq:else><view class="data-v-c3c9e6d0">{{addressNameArr[index]}}</view></block></picker></view></view><view class="row4 data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">请输入问题描述</view><view class="dec data-v-c3c9e6d0"><textarea class="text_dec data-v-c3c9e6d0" name="description" placeholder="请输入问题描述"></textarea></view></view><view class="row5 data-v-c3c9e6d0"><view class="title data-v-c3c9e6d0">温馨提示</view><view class="dec data-v-c3c9e6d0">上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张</view><view class="fb_tool data-v-c3c9e6d0"><button data-event-opts="{{[['tap',[['handleChooseImg',['$event']]]]]}}" bindtap="__e" class="data-v-c3c9e6d0">+</button><block qq:for="{{imgList}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view data-event-opts="{{[['tap',[['handleRemoveImg',[index]]]]]}}" class="up_img_item data-v-c3c9e6d0" bindtap="__e"><my-img vue-id="{{'4d7f8c83-2-'+index}}" src="{{item.path}}" class="data-v-c3c9e6d0" bind:__l="__l"></my-img></view></block></view></view></view><view class="btm data-v-c3c9e6d0"><button class="submit data-v-c3c9e6d0" form-type="submit" type="default">提交</button><button class="reset data-v-c3c9e6d0" form-type="reset" type="primary">重置</button></view></form></view>