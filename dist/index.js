"use strict";var t=function(a,e){return function(){return e||a((e={exports:{}}).exports,e),e.exports}};var S=t(function(z,_){
function C(){return{code:"ERR_SLICE_INVALID_ELLIPSIS"}}_.exports=C
});var R=t(function(H,l){
function M(){return{code:"ERR_SLICE_INSUFFICIENT_DIMENSIONS"}}l.exports=M
});var p=t(function(J,q){
function U(){return{code:"ERR_SLICE_TOO_MANY_DIMENSIONS"}}q.exports=U
});var O=t(function(K,N){
function h(){return{code:"ERR_SLICE_OUT_OF_BOUNDS"}}N.exports=h
});var L=t(function(W,x){
var B=/\s*,\s*/;x.exports=B
});var g=t(function(X,d){
var F=/^[-+]?[0-9]+$/;d.exports=F
});var T=t(function(Z,D){
var G=require('@stdlib/string-base-trim/dist'),P=require('@stdlib/slice-ctor/dist'),A=require('@stdlib/slice-base-args2multislice/dist'),Q=require('@stdlib/slice-base-seq2slice/dist'),j=S(),k=R(),w=p(),m=O(),y=L(),V=g();function Y(a,e,I){var E,i,v,u,n,c,r,o,s,f;for(n=e.length,E=G(a).split(y),c=E.length,v=!1,i=[],s=0,o=0;o<c;o++){if(r=E[o],r==="..."){if(v)return j();for(v=!0,f=0;f<n-c+1;f++)i.push(new P(0,e[s],1)),s+=1;continue}if(u=e[s],V.test(r)){if(r=parseInt(r,10),I){if(r<0){if(u+r<0)return m()}else if(r>=u)return m()}s+=1}else{if(r=Q(r,u,I),r.code)return r;s+=1}i.push(r)}return i.length!==n?i.length<n?k():w():A(i)}D.exports=Y
});var $=T();module.exports=$;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
