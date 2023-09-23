"use strict";var t=function(a,e){return function(){return e||a((e={exports:{}}).exports,e),e.exports}};var S=t(function(z,I){
function m(){return{code:"ERR_SLICE_INVALID_ELLIPSIS"}}I.exports=m
});var p=t(function(H,_){
function C(){return{code:"ERR_SLICE_INSUFFICIENT_DIMENSIONS"}}_.exports=C
});var q=t(function(J,R){
function U(){return{code:"ERR_SLICE_TOO_MANY_DIMENSIONS"}}R.exports=U
});var O=t(function(K,N){
function h(){return{code:"ERR_SLICE_OUT_OF_BOUNDS"}}N.exports=h
});var L=t(function(W,x){
var B=/\s*,\s*/;x.exports=B
});var D=t(function(X,d){
var F=/^[-+]?[0-9]+$/;d.exports=F
});var g=t(function(Z,T){
var G=require('@stdlib/string-base-trim/dist'),P=require('@stdlib/slice-ctor/dist'),y=require('@stdlib/slice-multi/dist'),A=require('@stdlib/slice-base-seq2slice/dist'),Q=S(),j=p(),k=q(),M=O(),w=L(),V=D();function Y(a,e,l){var E,i,v,u,n,c,r,o,s,f;for(n=e.length,E=G(a).split(w),c=E.length,v=!1,i=[],s=0,o=0;o<c;o++){if(r=E[o],r==="..."){if(v)return Q();for(v=!0,f=0;f<n-c+1;f++)i.push(new P(0,e[s],1)),s+=1;continue}if(u=e[s],V.test(r)){if(r=parseInt(r,10),l){if(r<0){if(u+r<0)return M()}else if(r>=u)return M()}s+=1}else{if(r=A(r,u,l),r.code)return r;s+=1}i.push(r)}return i.length!==n?i.length<n?j():k():y.apply(null,i)}T.exports=Y
});var $=g();module.exports=$;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
