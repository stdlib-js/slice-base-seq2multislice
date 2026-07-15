"use strict";var t=function(E,e){return function(){try{return e||E((e={exports:{}}).exports,e),e.exports}catch(u){throw e=0,u}}};var S=t(function(z,_){"use strict";function C(){return{code:"ERR_SLICE_INVALID_ELLIPSIS"}}_.exports=C});var R=t(function(H,l){"use strict";function M(){return{code:"ERR_SLICE_INSUFFICIENT_DIMENSIONS"}}l.exports=M});var p=t(function(J,q){"use strict";function U(){return{code:"ERR_SLICE_TOO_MANY_DIMENSIONS"}}q.exports=U});var O=t(function(K,N){"use strict";function h(){return{code:"ERR_SLICE_OUT_OF_BOUNDS"}}N.exports=h});var L=t(function(W,x){"use strict";var B=/\s*,\s*/;x.exports=B});var g=t(function(X,d){"use strict";var F=/^[-+]?[0-9]+$/;d.exports=F});var T=t(function(Z,D){"use strict";var G=require("@stdlib/string-base-trim"),P=require("@stdlib/slice-ctor"),A=require("@stdlib/slice-base-args2multislice"),Q=require("@stdlib/slice-base-seq2slice"),j=S(),k=R(),w=p(),m=O(),y=L(),V=g();function Y(E,e,u){var v,i,c,n,o,f,r,a,s,I;for(o=e.length,v=G(E).split(y),f=v.length,c=!1,i=[],s=0,a=0;a<f;a++){if(r=v[a],r==="..."){if(c)return j();for(c=!0,I=0;I<o-f+1;I++)i.push(new P(0,e[s],1)),s+=1;continue}if(n=e[s],V.test(r)){if(r=parseInt(r,10),u){if(r<0){if(n+r<0)return m()}else if(r>=n)return m()}s+=1}else{if(r=Q(r,n,u),r.code)return r;s+=1}i.push(r)}return i.length!==o?i.length<o?k():w():A(i)}D.exports=Y});var $=T();module.exports=$;
/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
//# sourceMappingURL=index.js.map
