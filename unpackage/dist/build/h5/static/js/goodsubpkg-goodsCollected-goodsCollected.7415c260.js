(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goodsubpkg-goodsCollected-goodsCollected"],{"12ad":function(t,n,e){"use strict";e.r(n);var o=e("94a3"),u=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=u.a},"28dc":function(t,n,e){"use strict";e.r(n);var o=e("bf14"),u=e("12ad");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);var i,r=e("f0c5"),a=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,"43bc4c97",null,!1,o["a"],i);n["default"]=a.exports},"94a3":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{collectList:[]}},onLoad:function(){this.collectList=uni.getStorageSync("goodsCollect"),this.collectList.length||uni.$showMsg({title:"暂无收藏",duration:3e3})}};n.default=o},bf14:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}));var o={myGood:e("b389").default},u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[t._l(t.collectList,(function(t){return[e("my-good",{key:t.id+"_0",attrs:{goods:t}})]}))],2)},c=[]}}]);