(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-order/my-order"],{"00e1":function(e,t,r){},4831:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return u})),r.d(t,"a",(function(){return n}));var n={myGood:function(){return r.e("components/my-good/my-good").then(r.bind(null,"b389"))}},a=function(){var e=this,t=e.$createElement,r=(e._self._c,4!=e.current?e.__map(e.orderList,(function(t,r){var n=e.__get_orig(t),a=e._f("statusText")(t.order.status);return{$orig:n,f0:a}})):null),n=4==e.current?e.__map(e.retunList,(function(t,r){var n=e.__get_orig(t),a=e._f("orderProcessText")(t.status);return{$orig:n,f1:a}})):null;e.$mp.data=Object.assign({},{$root:{l0:r,l1:n}})},u=[]},"4ed7":function(e,t,r){"use strict";r.r(t);var n=r("4831"),a=r("a2de");for(var u in a)"default"!==u&&function(e){r.d(t,e,(function(){return a[e]}))}(u);r("fa53");var o,c=r("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"e0bf2774",null,!1,n["a"],o);t["default"]=s.exports},a2de:function(e,t,r){"use strict";r.r(t);var n=r("ba1f"),a=r.n(n);for(var u in n)"default"!==u&&function(e){r.d(t,e,(function(){return n[e]}))}(u);t["default"]=a.a},ba1f:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r("a34a")),a=r("19af");r("dc9a");function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t,r,n,a,u,o){try{var c=e[u](o),s=c.value}catch(i){return void r(i)}c.done?t(s):Promise.resolve(s).then(n,a)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var u=e.apply(t,r);function c(e){o(u,n,a,c,s,"next",e)}function s(e){o(u,n,a,c,s,"throw",e)}c(void 0)}))}}var s={name:"my-order",props:{orderList:{type:Array,default:function(){return[]}},current:{type:Number,default:0},retunList:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{cancelOrder:function(t){e.$confirmMsg({content:"亲，您确定要取消订单么？"},c(n.default.mark((function r(){var u,o;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,a.cancelOrder)(t.order.id);case 2:if(u=r.sent,o=u.data,o.success){r.next=6;break}return r.abrupt("return",e.$showMsg({title:"取消订单失败"}));case 6:e.$showMsg({title:"取消订单成功"});case 7:case"end":return r.stop()}}),r)}))))},pay:function(t){e.navigateTo({url:"../../minesubpkg/order/order?orderId="+t.order.id})},receiveDone:function(t){e.$confirmMsg({content:"亲，您确定您收到了么？"},c(n.default.mark((function r(){var u,o;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,a.receiveDone)({orderId:t.order.id});case 2:if(u=r.sent,o=u.data,o.success){r.next=6;break}return r.abrupt("return",e.$showMsg({title:o.message}));case 6:e.$showMsg({title:"收货成功"});case 7:case"end":return r.stop()}}),r)}))))},delOrder:function(t){e.$confirmMsg({content:"亲，您确定删除当前订单么？"},c(n.default.mark((function r(){var u,o;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,a.deleteOrder)(t.order.id);case 2:if(u=r.sent,o=u.data,o.success){r.next=6;break}return r.abrupt("return",e.$showMsg({title:o.message}));case 6:e.$showMsg({title:"删除订单成功"});case 7:case"end":return r.stop()}}),r)}))))}},filters:{statusText:function(e){return 0==e?"未付款":1==e?"已付款,等待发货":2==e?"已发货":3==e?"已收货":4==e?"已完成":"无效订单"},orderProcessText:function(e){var t="等待处理";switch(JSON.stringify(e)){case"0":t="等待处理";break;case"1":t="确认退货,等待用户发货";break;case"2":t="已退款";break;case"3":t="已拒绝";break;case"9":t="拒绝退货";break;default:break}return t}}};t.default=s}).call(this,r("543d")["default"])},fa53:function(e,t,r){"use strict";var n=r("00e1"),a=r.n(n);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-order/my-order-create-component',
    {
        'components/my-order/my-order-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4ed7"))
        })
    },
    [['components/my-order/my-order-create-component']]
]);
