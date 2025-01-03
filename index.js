// Copyright (c) 2025 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
var e,r;e=this,r=function(){"use strict";var e=void 0!==String.prototype.trim,r=String.prototype.trim,t=/^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*([\S\s]*?)[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*$/,n=e&&""===r.call(" \n\t\r\n\f\v            \u2028\u2029  　\ufeff")&&"᠎"===r.call("᠎")?function(e){return r.call(e)}:function(e){return function(e,r,t){return e.replace(r,t)}(e,t,"$1")},i="function"==typeof Object.defineProperty?Object.defineProperty:null,o=Object.defineProperty;function a(e){return"number"==typeof e}function u(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function s(e,r,t){var n=!1,i=r-e.length;return i<0||(function(e){return"-"===e[0]}(e)&&(n=!0,e=e.substr(1)),e=t?e+u(i):u(i)+e,n&&(e="-"+e)),e}var c=String.prototype.toLowerCase,f=String.prototype.toUpperCase;function l(e){var r,t,n;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(t=e.arg,n=parseInt(t,10),!isFinite(n)){if(!a(t))throw new Error("invalid integer. Value: "+t);n=0}return n<0&&("u"===e.specifier||10!==r)&&(n=4294967295+n+1),n<0?(t=(-n).toString(r),e.precision&&(t=s(t,e.precision,e.padRight)),t="-"+t):(t=n.toString(r),n||e.precision?e.precision&&(t=s(t,e.precision,e.padRight)):t="",e.sign&&(t=e.sign+t)),16===r&&(e.alternate&&(t="0x"+t),t=e.specifier===f.call(e.specifier)?f.call(t):c.call(t)),8===r&&e.alternate&&"0"!==t.charAt(0)&&(t="0"+t),t}var p=Math.abs,d=String.prototype.toLowerCase,g=String.prototype.toUpperCase,h=String.prototype.replace,_=/e\+(\d)$/,E=/e-(\d)$/,S=/^(\d+)$/,y=/^(\d+)e/,w=/\.0$/,v=/\.0*e/,b=/(\..*[^0])0*e/;function m(e){var r,t,n=parseFloat(e.arg);if(!isFinite(n)){if(!a(e.arg))throw new Error("invalid floating-point number. Value: "+t);n=e.arg}switch(e.specifier){case"e":case"E":t=n.toExponential(e.precision);break;case"f":case"F":t=n.toFixed(e.precision);break;case"g":case"G":p(n)<1e-4?((r=e.precision)>0&&(r-=1),t=n.toExponential(r)):t=n.toPrecision(e.precision),e.alternate||(t=h.call(t,b,"$1e"),t=h.call(t,v,"e"),t=h.call(t,w,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return t=h.call(t,_,"e+0$1"),t=h.call(t,E,"e-0$1"),e.alternate&&(t=h.call(t,S,"$1."),t=h.call(t,y,"$1.e")),n>=0&&e.sign&&(t=e.sign+t),t=e.specifier===g.call(e.specifier)?g.call(t):d.call(t)}function I(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}var O=String.fromCharCode,R=Array.isArray;function N(e){return e!=e}function T(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function C(e){var r,t,n,i,o,a,u,c,f,p,d,g,h;if(!R(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(a="",u=1,c=0;c<e.length;c++)if("string"==typeof(n=e[c]))a+=n;else{if(r=void 0!==n.precision,!(n=T(n)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+n+"`.");for(n.mapping&&(u=n.mapping),t=n.flags,f=0;f<t.length;f++)switch(i=t.charAt(f)){case" ":n.sign=" ";break;case"+":n.sign="+";break;case"-":n.padRight=!0,n.padZeros=!1;break;case"0":n.padZeros=t.indexOf("-")<0;break;case"#":n.alternate=!0;break;default:throw new Error("invalid flag: "+i)}if("*"===n.width){if(n.width=parseInt(arguments[u],10),u+=1,N(n.width))throw new TypeError("the argument for * width at position "+u+" is not a number. Value: `"+n.width+"`.");n.width<0&&(n.padRight=!0,n.width=-n.width)}if(r&&"*"===n.precision){if(n.precision=parseInt(arguments[u],10),u+=1,N(n.precision))throw new TypeError("the argument for * precision at position "+u+" is not a number. Value: `"+n.precision+"`.");n.precision<0&&(n.precision=1,r=!1)}switch(n.arg=arguments[u],n.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(n.padZeros=!1),n.arg=l(n);break;case"s":n.maxWidth=r?n.precision:-1,n.arg=String(n.arg);break;case"c":if(!N(n.arg)){if((o=parseInt(n.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+n.arg);n.arg=N(o)?String(n.arg):O(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(n.precision=6),n.arg=m(n);break;default:throw new Error("invalid specifier: "+n.specifier)}n.maxWidth>=0&&n.arg.length>n.maxWidth&&(n.arg=n.arg.substring(0,n.maxWidth)),n.padZeros?n.arg=s(n.arg,n.width||n.precision,n.padRight):n.width&&(n.arg=(p=n.arg,d=n.width,g=n.padRight,h=void 0,(h=d-p.length)<0?p:p=g?p+I(h):I(h)+p)),a+=n.arg||"",u+=1}return a}var L=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function U(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function V(e){var r,t,n,i;for(t=[],i=0,n=L.exec(e);n;)(r=e.slice(i,L.lastIndex-n[0].length)).length&&t.push(r),t.push(U(n)),i=L.lastIndex,n=L.exec(e);return(r=e.slice(i)).length&&t.push(r),t}function A(e){var r,t;if("string"!=typeof e)throw new TypeError(A("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[V(e)],t=1;t<arguments.length;t++)r.push(arguments[t]);return C.apply(null,r)}var F=Object.prototype,j=F.toString,x=F.__defineGetter__,k=F.__defineSetter__,B=F.__lookupGetter__,D=F.__lookupSetter__,$=function(){try{return i({},"x",{}),!0}catch(e){return!1}}()?o:function(e,r,t){var n,i,o,a;if("object"!=typeof e||null===e||"[object Array]"===j.call(e))throw new TypeError(A("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof t||null===t||"[object Array]"===j.call(t))throw new TypeError(A("invalid argument. Property descriptor must be an object. Value: `%s`.",t));if((i="value"in t)&&(B.call(e,r)||D.call(e,r)?(n=e.__proto__,e.__proto__=F,delete e[r],e[r]=t.value,e.__proto__=n):e[r]=t.value),o="get"in t,a="set"in t,i&&(o||a))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return o&&x&&x.call(e,r,t.get),a&&k&&k.call(e,r,t.set),e};function P(e,r,t){$(e,r,{configurable:!1,enumerable:!1,writable:!1,value:t})}function M(e,r,t){$(e,r,{configurable:!1,enumerable:!1,get:t})}function G(e){return"number"==typeof e}var Q="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function Z(){return Q&&"symbol"==typeof Symbol.toStringTag}var J=Object.prototype.toString,W=Object.prototype.hasOwnProperty,X="function"==typeof Symbol?Symbol:void 0,Y="function"==typeof X?X.toStringTag:"",z=Z()?function(e){var r,t,n,i,o;if(null==e)return J.call(e);t=e[Y],o=Y,r=null!=(i=e)&&W.call(i,o);try{e[Y]=void 0}catch(r){return J.call(e)}return n=J.call(e),r?e[Y]=t:delete e[Y],n}:function(e){return J.call(e)},q=Number,H=q.prototype.toString,K=Z();function ee(e){return"object"==typeof e&&(e instanceof q||(K?function(e){try{return H.call(e),!0}catch(e){return!1}}(e):"[object Number]"===z(e)))}function re(e){return G(e)||ee(e)}P(re,"isPrimitive",G),P(re,"isObject",ee);var te=Number.POSITIVE_INFINITY,ne=q.NEGATIVE_INFINITY,ie=Math.floor;function oe(e){return e<te&&e>ne&&ie(r=e)===r;var r}function ae(e){return G(e)&&oe(e)}function ue(e){return ee(e)&&oe(e.valueOf())}function se(e){return ae(e)||ue(e)}function ce(e){return null===e}function fe(e){return void 0===e}function le(e){return ae(e)||ce(e)||fe(e)}function pe(){var e,r,t,n;if(0===(e=arguments.length)?(r=null,t=null,n=null):1===e?(r=null,t=arguments[0],n=null):2===e?(r=arguments[0],t=arguments[1],n=null):(r=arguments[0],t=arguments[1],n=arguments[2]),!(this instanceof pe))return new pe(r,t,n);if(!le(r))throw new TypeError(A("invalid argument. First argument must be an integer, null, or undefined. Value: `%s`.",r));if(!le(t))throw new TypeError(A("invalid argument. Second argument must be an integer, null, or undefined. Value: `%s`.",t));if(!le(n))throw new TypeError(A("invalid argument. Third argument must be an integer, null, or undefined. Value: `%s`.",n));if(0===n)throw new RangeError(A("invalid argument. Third argument cannot be zero. Value: `%s`.",n));return this._start=void 0===r?null:r,this._stop=void 0===t?null:t,this._step=void 0===n?null:n,this}function de(){return/^\s*function\s*([^(]*)/i}P(se,"isPrimitive",ae),P(se,"isObject",ue),P(pe,"name","Slice"),M(pe.prototype,"start",(function(){return this._start})),M(pe.prototype,"stop",(function(){return this._stop})),M(pe.prototype,"step",(function(){return this._step})),P(pe.prototype,"toString",(function(){return"Slice("+this._start+","+this._stop+","+this.step+")"})),P(pe.prototype,"toJSON",(function(){return{type:"Slice",data:[this._start,this._stop,this._step]}}));var ge=/^\s*function\s*([^(]*)/i;P(de,"REGEXP",ge);var he=Array.isArray?Array.isArray:function(e){return"[object Array]"===z(e)};function _e(e){return null!==e&&"object"==typeof e}function Ee(e){var r,t,n,i;if(("Object"===(t=z(e).slice(8,-1))||"Error"===t)&&e.constructor){if("string"==typeof(n=e.constructor).name)return n.name;if(r=ge.exec(n.toString()))return r[1]}return _e(i=e)&&(i._isBuffer||i.constructor&&"function"==typeof i.constructor.isBuffer&&i.constructor.isBuffer(i))?"Buffer":t}function Se(e){return ae(e)||ce(e)||fe(e)||function(e){return e instanceof pe||"Slice"===Ee(e)}(e)}function ye(){var e,r,t,n,i;if(e=arguments.length,!(this instanceof ye)){if(1===e)return new ye(arguments[0]);if(2===e)return new ye(arguments[0],arguments[1]);if(3===e)return new ye(arguments[0],arguments[1],arguments[2]);if(4===e)return new ye(arguments[0],arguments[1],arguments[2],arguments[3]);if(5===e)return new ye(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);for(t=[],i=0;i<e;i++)t.push(arguments[i]);return r=Object.create(ye.prototype),ye.apply(r,t)}for(this._data=[],i=0;i<e;i++){if(!Se(n=arguments[i]))throw new TypeError(A("invalid argument. Provided arguments must be either a Slice, integer, null, or undefined. Argument: `%d`. Value: `%s`.",i,String(n)));this._data.push(void 0===n?null:n)}return this}P(_e,"isObjectLikeArray",function(e){if("function"!=typeof e)throw new TypeError(A("invalid argument. Must provide a function. Value: `%s`.",e));return function(r){var t,n;if(!he(r))return!1;if(0===(t=r.length))return!1;for(n=0;n<t;n++)if(!1===e(r[n]))return!1;return!0}}(_e)),P(ye,"name","MultiSlice"),M(ye.prototype,"ndims",(function(){return this._data.length})),M(ye.prototype,"data",(function(){return this._data.slice()})),P(ye.prototype,"toString",(function(){var e,r,t;for(e=this._data,r=[],t=0;t<e.length;t++)r.push(String(e[t]));return"MultiSlice("+r.join(",")+")"})),P(ye.prototype,"toJSON",(function(){var e,r,t,n;for(e=this._data,r={type:"MultiSlice",data:[]},n=0;n<e.length;n++)t=e[n],r.data.push(t&&"function"==typeof t.toJSON?t.toJSON():t);return r}));var we=/(?:\s*-\s*)(?=\d+)(\d+)$/,ve=/(?:\s*\/\s*)(?=\d*\.?\d+)(\d*\.?\d+)$/;function be(e,r,t,n){var i;if("end"===e)return r;if(i=e.match(we)){if((e=r-parseInt(i[1],10))<0){if(n)return-2;e=0}return e}return(i=e.match(ve))?(e=parseFloat(i[1]))<1?n?-2:-1:ie(t&&r>0&&1!==e?(r-1)/e:r/e):-1}var me=/\s*:\s*/,Ie=/^[-+]?[0-9]+$/,Oe=/^end/;function Re(e,r,t){var i,o,a;if((o=(i=n(e).split(me)).length)<2||o>3)return{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};if(3===o)if(0===(a=i[2]).length)i[2]=1;else{if(!1===Ie.test(a))return{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};if(0===(a=parseInt(a,10)))return{code:"ERR_SLICE_INVALID_INCREMENT"};i[2]=a}else i.push(1);if(0===(a=i[0]).length)i[2]<0&&r>0?i[0]=r-1:i[0]=0;else if(Oe.test(a)){if((a=be(a,r,i[2]<0,t))<0)return-2===a?{code:"ERR_SLICE_OUT_OF_BOUNDS"}:{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};i[2]<0&&a>=r&&(a-=1),i[0]=a}else{if(!Ie.test(a))return{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};if((a=parseInt(a,10))<0){if((a=r+a)<0){if(t)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};a=0}}else if(a>=r){if(t)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};a=i[2]<0?r-1:r}i[0]=a}if(0===(a=i[1]).length)i[2]<0?i[1]=null:i[1]=r;else if(Oe.test(a)){if((a=be(a,r,i[2]<0,t))<0)return-2===a?{code:"ERR_SLICE_OUT_OF_BOUNDS"}:{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};i[1]=a}else{if(!Ie.test(a))return{code:"ERR_SLICE_INVALID_SUBSEQUENCE"};if((a=parseInt(a,10))<0){if((a=r+a)<0)if(i[2]>0){if(t)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};a=0}else{if(t&&a<-1)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};a=null}}else if(a>r){if(t)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};a=r}i[1]=a}return 0===r?new pe(0,0,i[2]):new pe(i[0],i[1],i[2])}var Ne=/\s*,\s*/,Te=/^[-+]?[0-9]+$/;return function(e,r,t){var i,o,a,u,s,c,f,l,p,d;for(s=r.length,c=(i=n(e).split(Ne)).length,a=!1,o=[],p=0,l=0;l<c;l++)if("..."!==(f=i[l])){if(u=r[p],Te.test(f)){if(f=parseInt(f,10),t)if(f<0){if(u+f<0)return{code:"ERR_SLICE_OUT_OF_BOUNDS"}}else if(f>=u)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};p+=1}else{if((f=Re(f,u,t)).code)return f;p+=1}o.push(f)}else{if(a)return{code:"ERR_SLICE_INVALID_ELLIPSIS"};for(a=!0,d=0;d<s-c+1;d++)o.push(new pe(0,r[p],1)),p+=1}return o.length!==s?o.length<s?{code:"ERR_SLICE_INSUFFICIENT_DIMENSIONS"}:{code:"ERR_SLICE_TOO_MANY_DIMENSIONS"}:function(e){switch(e.length){case 0:return new ye;case 1:return new ye(e[0]);case 2:return new ye(e[0],e[1]);case 3:return new ye(e[0],e[1],e[2]);case 4:return new ye(e[0],e[1],e[2],e[3]);case 5:return new ye(e[0],e[1],e[2],e[3],e[4]);case 6:return new ye(e[0],e[1],e[2],e[3],e[4],e[5]);case 7:return new ye(e[0],e[1],e[2],e[3],e[4],e[5],e[6]);case 8:return new ye(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]);case 9:return new ye(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]);case 10:return new ye(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9]);default:return ye.apply(null,e)}}(o)}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).seq2multislice=r();
//# sourceMappingURL=index.js.map
