(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/MKj":function(t,n,e){"use strict";e.d(n,"a",(function(){return b})),e.d(n,"b",(function(){return v})),e.d(n,"c",(function(){return g}));var r=e("q1tI"),u=e.n(r),i=(e("17x9"),u.a.createContext(null));var s=function(t){t()},c={notify:function(){}};function o(){var t=s,n=null,e=null;return{clear:function(){n=null,e=null},notify:function(){t((function(){for(var t=n;t;)t.callback(),t=t.next}))},get:function(){for(var t=[],e=n;e;)t.push(e),e=e.next;return t},subscribe:function(t){var r=!0,u=e={callback:t,next:null,prev:e};return u.prev?u.prev.next=u:n=u,function(){r&&null!==n&&(r=!1,u.next?u.next.prev=u.prev:e=u.prev,u.prev?u.prev.next=u.next:n=u.next)}}}}var a=function(){function t(t,n){this.store=t,this.parentSub=n,this.unsubscribe=null,this.listeners=c,this.handleChangeWrapper=this.handleChangeWrapper.bind(this)}var n=t.prototype;return n.addNestedSub=function(t){return this.trySubscribe(),this.listeners.subscribe(t)},n.notifyNestedSubs=function(){this.listeners.notify()},n.handleChangeWrapper=function(){this.onStateChange&&this.onStateChange()},n.isSubscribed=function(){return Boolean(this.unsubscribe)},n.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.handleChangeWrapper):this.store.subscribe(this.handleChangeWrapper),this.listeners=o())},n.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=c)},t}();var b=function(t){var n=t.store,e=t.context,s=t.children,c=Object(r.useMemo)((function(){var t=new a(n);return t.onStateChange=t.notifyNestedSubs,{store:n,subscription:t}}),[n]),o=Object(r.useMemo)((function(){return n.getState()}),[n]);Object(r.useEffect)((function(){var t=c.subscription;return t.trySubscribe(),o!==n.getState()&&t.notifyNestedSubs(),function(){t.tryUnsubscribe(),t.onStateChange=null}}),[c,o]);var b=e||i;return u.a.createElement(b.Provider,{value:c},s)},f=(e("wx14"),e("zLVn"),e("2mql"),e("TOwV"),"undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?r.useLayoutEffect:r.useEffect);e("ANjH");function h(){return Object(r.useContext)(i)}function l(t){void 0===t&&(t=i);var n=t===i?h:function(){return Object(r.useContext)(t)};return function(){return n().store}}var d=l();function p(t){void 0===t&&(t=i);var n=t===i?d:l(t);return function(){return n().dispatch}}var v=p(),S=function(t,n){return t===n};function y(t){void 0===t&&(t=i);var n=t===i?h:function(){return Object(r.useContext)(t)};return function(t,e){void 0===e&&(e=S);var u=n();return function(t,n,e,u){var i,s=Object(r.useReducer)((function(t){return t+1}),0)[1],c=Object(r.useMemo)((function(){return new a(e,u)}),[e,u]),o=Object(r.useRef)(),b=Object(r.useRef)(),h=Object(r.useRef)();try{i=t!==b.current||o.current?t(e.getState()):h.current}catch(t){throw o.current&&(t.message+="\nThe error may be correlated with this previous error:\n"+o.current.stack+"\n\n"),t}return f((function(){b.current=t,h.current=i,o.current=void 0})),f((function(){function t(){try{var t=b.current(e.getState());if(n(t,h.current))return;h.current=t}catch(t){o.current=t}s({})}return c.onStateChange=t,c.trySubscribe(),t(),function(){return c.tryUnsubscribe()}}),[e,c]),i}(t,e,u.store,u.subscription)}}var w,g=y(),x=e("i8i4");w=x.unstable_batchedUpdates,s=w}}]);
//# sourceMappingURL=npm.react-redux.0b00beb517f9105812e2.js.map