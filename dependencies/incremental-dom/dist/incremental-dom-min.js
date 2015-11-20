/**
 * @license
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.IncrementalDOM={})}(this,function(e){"use strict";function t(t,n){this.root=t,this.doc=t.ownerDocument,this.created=e.notifications.nodesCreated&&[],this.deleted=e.notifications.nodesDeleted&&[]}function n(e,t){this.attrs=l(),this.attrsArr=[],this.newAttrs=l(),this.key=t,this.keyMap=null,this.keyMapValid=!0,this.nodeName=e,this.text=null}e.notifications={nodesCreated:null,nodesDeleted:null},t.prototype.markCreated=function(e){this.created&&this.created.push(e)},t.prototype.markDeleted=function(e){this.deleted&&this.deleted.push(e)},t.prototype.notifyChanges=function(){this.created&&this.created.length>0&&e.notifications.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&e.notifications.nodesDeleted(this.deleted)};var r=Object.prototype.hasOwnProperty,a=Object.create,i=function(e,t){return r.call(e,t)},l=function(){return a(null)},o=function(e,t,r){var a=new n(t,r);return e.__incrementalDOMData=a,a},u=function(e){var t=e.__incrementalDOMData;if(!t){var n=e.nodeName.toLowerCase(),r=null;e instanceof Element&&(r=e.getAttribute("key")),t=o(e,n,r)}return t};e.symbols={"default":"__default",placeholder:"__placeholder"},e.applyAttr=function(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)},e.applyProp=function(e,t,n){e[t]=n};var s=function(e,t,n){if("string"==typeof n)e.style.cssText=n;else{e.style.cssText="";var r=e.style;for(var a in n)i(n,a)&&(r[a]=n[a])}},f=function(t,n,r){var a=typeof r;"object"===a||"function"===a?e.applyProp(t,n,r):e.applyAttr(t,n,r)},c=function(t,n,r){var a=u(t),i=a.attrs;if(i[n]!==r){var l=e.attributes[n]||e.attributes[e.symbols["default"]];l(t,n,r),i[n]=r}};e.attributes=l(),e.attributes[e.symbols["default"]]=f,e.attributes[e.symbols.placeholder]=function(){},e.attributes.style=s;var d,p,h,m=function(e,t){return"svg"===e?"http://www.w3.org/2000/svg":"foreignObject"===u(t).nodeName?null:t.namespaceURI},y=function(e,t,n,r){var a,i=m(t,r);return a=i?e.createElementNS(i,t):e.createElement(t)},v=function(e,t,n,r,a){var i;if(i="#text"===t?e.createTextNode(""):y(e,t,n,a),o(i,t,n),r)for(var l=0;l<r.length;l+=2)c(i,r[l],r[l+1]);return i},g=function(e){for(var t=l(),n=e.children,r=n.length,a=0;r>a;a+=1){var i=n[a],o=u(i).key;o&&(t[o]=i)}return t},k=function(e){var t=u(e);return t.keyMap||(t.keyMap=g(e)),t.keyMap},b=function(e,t){return t&&k(e)[t]},C=function(e,t,n){k(e)[t]=n},x=null;e.patch=function(e,n,r){var a=x,i=d,l=p,o=h;x=new t(e),d=e,p=null,h=null,w(),n(r),N(),x.notifyChanges(),x=a,d=i,p=l,h=o};var O=function(e,t){var n=u(d);return e===n.nodeName&&t==n.key},D=function(e,t,n){if(!d||!O(e,t)){var r,a=b(p,t);a?r=a:(r=v(x.doc,e,t,n,p),t&&C(p,t,r),x.markCreated(r)),d&&u(d).key?(p.replaceChild(r,d),u(p).keyMapValid=!1):p.insertBefore(r,d),d=r}},M=function(){var t,n=p,r=u(n),a=r.keyMap,i=r.keyMapValid,l=n.lastChild;if(!(l===h&&i||r.attrs[e.symbols.placeholder]&&n!==x.root)){for(;l!==h;)n.removeChild(l),x.markDeleted(l),t=u(l).key,t&&delete a[t],l=n.lastChild;for(t in a)l=a[t],l.parentNode||(x.markDeleted(l),delete a[t]);r.keyMapValid=!0}},w=function(){p=d,d=d.firstChild,h=null},A=function(){h=d,d=d.nextSibling},N=function(){M(),h=p,d=p.nextSibling,p=p.parentNode},_=function(e,t,n){return D(e,t,n),w(),p},j=function(){return N(),h},E=function(){return D("#text",null,null),A(),h};e.currentElement=function(){return p},e.skip=function(){h=p.lastChild};var V=3,P=[];e.elementOpen=function(e,t,n,r){for(var a=_(e,t,n),i=u(a),l=i.attrsArr,o=i.newAttrs,s=!1,f=V,d=0;f<arguments.length;f+=1,d+=1)if(l[d]!==arguments[f]){s=!0;break}for(;f<arguments.length;f+=1,d+=1)l[d]=arguments[f];if(d<l.length&&(s=!0,l.length=d),s){for(f=V;f<arguments.length;f+=2)o[arguments[f]]=arguments[f+1];for(var p in o)c(a,p,o[p]),o[p]=void 0}return a},e.elementOpenStart=function(e,t,n){P[0]=e,P[1]=t,P[2]=n},e.attr=function(e,t){P.push(e,t)},e.elementOpenEnd=function(){var t=e.elementOpen.apply(null,P);return P.length=0,t},e.elementClose=function(e){var t=j();return t},e.elementVoid=function(t,n,r,a){var i=e.elementOpen.apply(null,arguments);return e.elementClose.apply(null,arguments),i},e.elementPlaceholder=function(t,n,r,a){return e.elementOpen.apply(null,arguments),e.skip(),e.elementClose.apply(null,arguments)},e.text=function(e,t){var n=E(),r=u(n);if(r.text!==e){r.text=e;for(var a=e,i=1;i<arguments.length;i+=1)a=arguments[i](a);n.data=a}return n}});
//# sourceMappingURL=incremental-dom-min.js.map