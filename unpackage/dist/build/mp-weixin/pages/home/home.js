(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{1237:function(t,n,e){"use strict";(function(t){e("2494");o(e("66fd"));var n=o(e("3b6c"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"1c5b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("a34a")),r=e("da45");function a(t){return t&&t.__esModule?t:{default:t}}function u(t,n,e,o,r,a,u){try{var c=t[a](u),s=c.value}catch(i){return void e(i)}c.done?n(s):Promise.resolve(s).then(o,r)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(o,r){var a=t.apply(n,e);function c(t){u(a,o,r,c,s,"next",t)}function s(t){u(a,o,r,c,s,"throw",t)}c(void 0)}))}}var s={data:function(){return{bannerList:[],category:{},recommendList:[],hotList:[],lejuLatestProducts:[],saleMostProducts:[]}},onShareAppMessage:function(t){"button"===t.from&&(console.log(t),console.log(t.target))},onLoad:function(t){var n=this;return c(o.default.mark((function t(){var e,a,u,c,s,i,d,f,l,m,v;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.bannerAds)();case 2:return e=t.sent,a=e.data,t.next=6,(0,r.findCategory)("1308336521604599809");case 6:return u=t.sent,c=u.data,t.next=10,(0,r.recommendList)();case 10:return s=t.sent,i=s.data,t.next=14,(0,r.hotList)();case 14:return d=t.sent,f=d.data,t.next=18,(0,r.lejuLatestProducts)();case 18:return l=t.sent,m=l.data,t.next=22,(0,r.saleMostProducts)();case 22:v=t.sent,v.data,n.bannerList=a.data.items,n.category=c.data.category,n.recommendList=i.data.items,n.hotList=f.data.items,n.lejuLatestProducts=m.data.productList,n.saleMostProducts=m.data.productList;case 30:case"end":return t.stop()}}),t)})))()}};n.default=s},"3b6c":function(t,n,e){"use strict";e.r(n);var o=e("b6f8"),r=e("634b");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("a133");var u,c=e("f0c5"),s=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"3a457dd6",null,!1,o["a"],u);n["default"]=s.exports},"634b":function(t,n,e){"use strict";e.r(n);var o=e("1c5b"),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a},a133:function(t,n,e){"use strict";var o=e("b551"),r=e.n(o);r.a},b551:function(t,n,e){},b6f8:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"60fc"))},myGoods:function(){return e.e("components/my-goods/my-goods").then(e.bind(null,"0dfc"))}},r=function(){var t=this,n=t.$createElement;t._self._c},a=[]}},[["1237","common/runtime","common/vendor"]]]);