(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods-nav/goods-nav"],{"2d46":function(t,n,o){"use strict";o.r(n);var u=o("68a4"),i=o.n(u);for(var e in u)"default"!==e&&function(t){o.d(n,t,(function(){return u[t]}))}(e);n["default"]=i.a},"5c18":function(t,n,o){"use strict";o.r(n);var u=o("b597"),i=o("2d46");for(var e in i)"default"!==e&&function(t){o.d(n,t,(function(){return i[t]}))}(e);o("b82a");var r,c=o("f0c5"),a=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,"763475f3",null,!1,u["a"],r);n["default"]=a.exports},"5c32":function(t,n,o){},"68a4":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=e(o("a34a")),i=e(o("4f4d"));function e(t){return t&&t.__esModule?t:{default:t}}function r(t,n,o,u,i,e,r){try{var c=t[e](r),a=c.value}catch(s){return void o(s)}c.done?n(a):Promise.resolve(a).then(u,i)}function c(t){return function(){var n=this,o=arguments;return new Promise((function(u,i){var e=t.apply(n,o);function c(t){r(e,u,i,c,a,"next",t)}function a(t){r(e,u,i,c,a,"throw",t)}c(void 0)}))}}var a={name:"goods-nav",mixins:[i.default],props:{good:{type:Object,default:function(){return{}}},skuList:{type:Array,default:function(){return[]}}},data:function(){return{addToCartParams:{},isWho:"",quantity:1,currentIndex:0,isMaskShow:!1,options:[{icon:"shop",text:"店铺",infoBackgroundColor:"#007aff",infoColor:"red"},{icon:"cart",text:"购物车",info:this.$store.state.cart}],buttonGroup:[{text:"加入购物车",backgroundColor:"#ff0000",color:"#fff"},{text:"立即购买",backgroundColor:"#ffa200",color:"#fff"}]}},methods:{listClick:function(t,n){this.currentIndex=n},confirmClick:function(t){if("加入购物车"===this.isWho){var n={productId:this.skuList[this.currentIndex].productId,productSkuId:this.skuList[this.currentIndex].id,quantity:this.quantity};this.$emit("addToCart",n)}else{var o={orderItemList:[{productId:this.skuList[this.currentIndex].productId,productQuantity:this.quantity,productSkuId:this.skuList[this.currentIndex].id}]};this.$emit("buyNow",o)}this.isMaskShow=!1},bindChange:function(t){this.quantity=t.value?t.value:t},onClick:function(n){"购物车"===n.content.text&&t.navigateTo({url:"../../minesubpkg/cart/cart"})},buttonClick:function(t){var n=this;return c(u.default.mark((function o(){return u.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:n.isWho=t.content.text,("加入购物车"===t.content.text||"立即购买"===t.content.text)&&(n.isMaskShow=!n.isMaskShow);case 2:case"end":return o.stop()}}),o)})))()}}};n.default=a}).call(this,o("a821")["default"])},b597:function(t,n,o){"use strict";o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return e})),o.d(n,"a",(function(){return u}));var u={uniGoodsNav:function(){return o.e("uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav").then(o.bind(null,"d158"))},uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,"60fc"))},uniNumberBox:function(){return o.e("uni_modules/uni-number-box/components/uni-number-box/uni-number-box").then(o.bind(null,"97c3"))}},i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.isMaskShow=!1})},e=[]},b82a:function(t,n,o){"use strict";var u=o("5c32"),i=o.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods-nav/goods-nav-create-component',
    {
        'components/goods-nav/goods-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('a821')['createComponent'](__webpack_require__("5c18"))
        })
    },
    [['components/goods-nav/goods-nav-create-component']]
]);
