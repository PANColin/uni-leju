(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["minesubpkg/addAddress/addAddress"],{"2e2c":function(e,t,a){"use strict";(function(e){a("2494");s(a("66fd"));var t=s(a("cab2"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},5373:function(e,t,a){"use strict";a.r(t);var s=a("d83c"),n=a.n(s);for(var r in s)"default"!==r&&function(e){a.d(t,e,(function(){return s[e]}))}(r);t["default"]=n.a},5770:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return s}));var s={simpleAddress:function(){return Promise.all([a.e("common/vendor"),a.e("components/simple-address/simple-address")]).then(a.bind(null,"c618"))}},n=function(){var e=this,t=e.$createElement,a=(e._self._c,Boolean(e.message.defaultStatus)),s=a?null:Boolean(e.message.defaultStatus);e.$mp.data=Object.assign({},{$root:{m0:a,m1:s}})},r=[]},b84f:function(e,t,a){"use strict";var s=a("c8fa"),n=a.n(s);n.a},c8fa:function(e,t,a){},cab2:function(e,t,a){"use strict";a.r(t);var s=a("5770"),n=a("5373");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("b84f");var i,u=a("f0c5"),d=Object(u["a"])(n["default"],s["b"],s["c"],!1,null,"313ca02c",null,!1,s["a"],i);t["default"]=d.exports},d83c:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=u(a("a34a")),n=u(a("4dd6")),r=u(a("4f4d")),i=(a("b4b9"),a("f276"));function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t,a,s,n,r,i){try{var u=e[r](i),d=u.value}catch(c){return void a(c)}u.done?t(d):Promise.resolve(d).then(s,n)}function c(e){return function(){var t=this,a=arguments;return new Promise((function(s,n){var r=e.apply(t,a);function i(e){d(r,s,n,i,u,"next",e)}function u(e){d(r,s,n,i,u,"throw",e)}i(void 0)}))}}var o=function(){Promise.all([a.e("common/vendor"),a.e("components/simple-address/simple-address")]).then(function(){return resolve(a("c618"))}.bind(null,a)).catch(a.oe)},l={components:{simpleAddress:o},mixins:[n.default,r.default],data:function(){return{cityPickerValueDefault:[0,0,1],cityValueDefault:"",message:{name:"",phoneNumber:"",detailAddress:"",defaultStatus:0,createTime:"",city:"",cityCode:"",id:"",memberId:"",modifyTime:"",postCode:"",region:"",province:"",tag:""}}},onLoad:function(t){if(this.initValidate({cityValueDefault:{required:!0}},{cityValueDefault:{required:"地址必填"}}),this.isLogin()){var a=JSON.parse(e.getStorageSync("appAddressList"));if(a){var s=a.find((function(e){return e.id==t.addressId}));s&&(console.log(s),this.cityValueDefault="".concat(s.province,"-").concat(s.city,"-").concat(s.region),this.message.name=s.name,this.message.phoneNumber=s.phoneNumber,this.message.detailAddress=s.detailAddress,this.message.defaultStatus=s.defaultStatus,this.message.id=s.id,this.message.memberId=s.memberId,this.message.province=s.province,this.message.city=s.city,this.message.region=s.region,this.message.cityCode=s.cityCode)}}},methods:{formReset:function(e){},delAddress:function(){var t=this;return c(s.default.mark((function a(){return s.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.$confirmMsg({},c(s.default.mark((function a(){var n,r;return s.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,i.delAddressInfo)(t.message.id);case 2:n=a.sent,r=n.data,r.success&&e.reLaunch({url:"../address/address"});case 5:case"end":return a.stop()}}),a)}))));case 1:case"end":return a.stop()}}),a)})))()},defaultChange:function(){var e=this;return c(s.default.mark((function t(){var a;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.message.defaultStatus=Number(!e.message.defaultStatus),!e.message.id){t.next=6;break}return t.next=4,(0,i.switchDefault)(e.message.id,e.message.defaultStatus);case 4:a=t.sent,a.data;case 6:case"end":return t.stop()}}),t)})))()},formSubmit:function(t){var a=this;return c(s.default.mark((function n(){var r,u,d,c,o,l;return s.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(r=t.detail.value,a.WxValidate.checkForm(r)){s.next=6;break}u=a.WxValidate.errorList[0],e.$showMsg({title:u.msg}),s.next=29;break;case 6:if(!a.message.id){s.next=17;break}return s.next=9,(0,i.updateAddressInfo)(a.message);case 9:if(d=s.sent,c=d.data,c.success){s.next=13;break}return s.abrupt("return",e.$showMsg());case 13:e.$showMsg({title:"修改成功"}),e.reLaunch({url:"../address/address"}),s.next=29;break;case 17:return a.message.name=t.detail.value.name,a.message.detailAddress=t.detail.value.detailAddress,a.message.phoneNumber=t.detail.value.tel,a.message.defaultStatus=Number(t.detail.value.defaultStatus),s.next=23,(0,i.addAddressInfo)(a.message);case 23:if(o=s.sent,l=o.data,l.success){s.next=27;break}return s.abrupt("return",e.$showMsg());case 27:e.$showMsg({title:"保存成功"}),e.reLaunch({url:"../address/address"});case 29:case"end":return s.stop()}}),n)})))()},onConfirm:function(e){this.cityPickerValueDefault=e.value,this.cityValueDefault=e.label,this.message.province=e.labelArr[0],this.message.city=e.labelArr[1],this.message.region=e.labelArr[2],this.message.cityCode="".concat(e.provinceCode,"-").concat(e.cityCode,"-").concat(e.areaCode)},selected:function(){this.$refs.simpleAddress.open()}}};t.default=l}).call(this,a("543d")["default"])}},[["2e2c","common/runtime","common/vendor"]]]);