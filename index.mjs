// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/string-base-trim@v0.1.1-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/slice-ctor@v0.1.0-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/slice-base-args2multislice@v0.1.0-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/slice-base-seq2slice@v0.1.0-esm/index.mjs";var r=/\s*,\s*/,n=/^[-+]?[0-9]+$/;function d(d,l,o){var m,_,c,I,f,h,E,S,p,j;for(f=l.length,h=(m=e(d).split(r)).length,c=!1,_=[],p=0,S=0;S<h;S++)if("..."!==(E=m[S])){if(I=l[p],n.test(E)){if(E=parseInt(E,10),o)if(E<0){if(I+E<0)return{code:"ERR_SLICE_OUT_OF_BOUNDS"}}else if(E>=I)return{code:"ERR_SLICE_OUT_OF_BOUNDS"};p+=1}else{if((E=i(E,I,o)).code)return E;p+=1}_.push(E)}else{if(c)return{code:"ERR_SLICE_INVALID_ELLIPSIS"};for(c=!0,j=0;j<f-h+1;j++)_.push(new s(0,l[p],1)),p+=1}return _.length!==f?_.length<f?{code:"ERR_SLICE_INSUFFICIENT_DIMENSIONS"}:{code:"ERR_SLICE_TOO_MANY_DIMENSIONS"}:t(_)}export{d as default};
//# sourceMappingURL=index.mjs.map
