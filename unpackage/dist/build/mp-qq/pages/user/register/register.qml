<view class="data-v-14cbce7d"><view data-event-opts="{{[['tap',[['updataAvatar',['$event']]]]]}}" class="top data-v-14cbce7d" bindtap="__e"><view class="img-wrapper data-v-14cbce7d"><image src="{{icon?icon:'../../../static/images/icons/leju-logo.png'}}" mode class="data-v-14cbce7d"></image></view></view><view class="ipt data-v-14cbce7d"><form data-event-opts="{{[['submit',[['formSubmit',['$event']]]],['reset',[['formReset',['$event']]]]]}}" bindsubmit="__e" bindreset="__e" class="data-v-14cbce7d"><view class="uni-form-item uni-column data-v-14cbce7d"><input class="uni-input data-v-14cbce7d" type="default" name="name" value="" placeholder="用户名"/></view><view class="uni-form-item uni-column data-v-14cbce7d"><input class="uni-input data-v-14cbce7d" type="text" value="" name="tel" placeholder="电话号码"/></view><view class="uni-form-item uni-column data-v-14cbce7d"><input class="uni-input data-v-14cbce7d" type="text" value="" name="nickname" placeholder="昵称"/></view><view class="uni-form-item uni-column data-v-14cbce7d"><view class="uni-input-self data-v-14cbce7d"><input password="{{isShowPwd}}" type="text" value="" name="password" placeholder="登录密码" class="data-v-14cbce7d"/><view data-event-opts="{{[['tap',[['e0',['$event']]]]]}}" class="icon-wrapper data-v-14cbce7d" bindtap="__e"><block qq:if="{{!isShowPwd}}"><uni-icons vue-id="1baef9ce-1" type="eye" class="data-v-14cbce7d" bind:__l="__l"></uni-icons></block><block qq:else><uni-icons vue-id="1baef9ce-2" type="eye-slash" class="data-v-14cbce7d" bind:__l="__l"></uni-icons></block></view></view></view><view class="uni-code-self data-v-14cbce7d"><input class="uni-input data-v-14cbce7d" type="text" value="" name="code" placeholder="验证码"/><view data-event-opts="{{[['tap',[['getCode',['$event']]]]]}}" class="code-wrapper data-v-14cbce7d" bindtap="__e"><block qq:if="{{!isShowCode}}"><view class="dec data-v-14cbce7d"><button type="default" size="mini" class="data-v-14cbce7d">获取验证码</button></view></block><block qq:else><view class="code data-v-14cbce7d">{{code}}</view></block></view></view><view class="uni-btn-v data-v-14cbce7d"><button form-type="submit" type="primary" size="default" class="data-v-14cbce7d">注册</button><button class="reset data-v-14cbce7d" type="primary" form-type="reset">重置</button><view class="xieyi data-v-14cbce7d"><view class="left data-v-14cbce7d">点击注册，即代表您同意</view><text class="right data-v-14cbce7d">《条款协议》</text></view></view></form></view></view>