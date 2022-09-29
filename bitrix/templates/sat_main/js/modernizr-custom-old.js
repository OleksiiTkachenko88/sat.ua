/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-bgsizecover-canvas-csstransforms3d-preserve3d-svg-touchevents-video-addtest-atrule-domprefixes-hasevent-mq-prefixed-prefixedcss-prefixedcssvalue-prefixes-printshiv-setclasses-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,a,i,s;for(var c in S)if(S.hasOwnProperty(c)){if(e=[],t=S[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),b.push((o?"":"no-")+s.join("-"))}}function a(e){var t=w.className,n=Modernizr._config.classPrefix||"";if(E&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),E?w.className.baseVal=t:w.className=t)}function i(e,t){if("object"==typeof e)for(var n in e)P(e,n)&&i(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),a([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):E?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function u(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function l(){var e=t.body;return e||(e=s(E?"svg":"body"),e.fake=!0),e}function f(e,n,r,o){var a,i,c,u,f="modernizr",d=s("div"),p=l();if(parseInt(r,10))for(;r--;)c=s("div"),c.id=o?o[r]:f+(r+1),d.appendChild(c);return a=s("style"),a.type="text/css",a.id="s"+f,(p.fake?p:d).appendChild(a),p.appendChild(d),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(t.createTextNode(e)),d.id=f,p.fake&&(p.style.background="",p.style.overflow="hidden",u=w.style.overflow,w.style.overflow="hidden",w.appendChild(p)),i=n(d,e),p.fake?(p.parentNode.removeChild(p),w.style.overflow=u,w.offsetHeight):d.parentNode.removeChild(d),!!i}function d(e,t){return!!~(""+e).indexOf(t)}function p(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(u(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];o--;)a.push("("+u(t[o])+":"+r+")");return a=a.join(" or "),f("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function m(e,t){return function(){return e.apply(t,arguments)}}function h(e,t,n){var o;for(var a in e)if(e[a]in t)return n===!1?e[a]:(o=t[e[a]],r(o,"function")?m(o,n||t):o);return!1}function v(e,t,o,a){function i(){l&&(delete R.style,delete R.modElem)}if(a=r(a,"undefined")?!1:a,!r(o,"undefined")){var u=p(e,o);if(!r(u,"undefined"))return u}for(var l,f,m,h,v,g=["modernizr","tspan","samp"];!R.style&&g.length;)l=!0,R.modElem=s(g.shift()),R.style=R.modElem.style;for(m=e.length,f=0;m>f;f++)if(h=e[f],v=R.style[h],d(h,"-")&&(h=c(h)),R.style[h]!==n){if(a||r(o,"undefined"))return i(),"pfx"==t?h:!0;try{R.style[h]=o}catch(y){}if(R.style[h]!=v)return i(),"pfx"==t?h:!0}return i(),!1}function g(e,t,n,o,a){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+N.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?v(s,t,o,a):(s=(e+" "+_.join(i+" ")+i).split(" "),h(s,t,n))}function y(e,t,r){return g(e,n,n,t,r)}var b=[],S=[],T={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){S.push({name:e,fn:t,options:n})},addAsyncTest:function(e){S.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=T,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var C=T._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];T._prefixes=C;var w=t.documentElement,E="svg"===w.nodeName.toLowerCase();E||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=E.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=E.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),E.elements=n+" "+e,u(t)}function a(e){var t=w[e[T]];return t||(t={},C++,e[T]=C,w[C]=t),t}function i(e,n,r){if(n||(n=t),v)return n.createElement(e);r||(r=a(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():S.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||b.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),v)return e.createDocumentFragment();n=n||a(e);for(var o=n.frag.cloneNode(),i=0,s=r(),c=s.length;c>i;i++)o.createElement(s[i]);return o}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return E.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(E,t.frag)}function u(e){e||(e=t);var r=a(e);return!E.shivCSS||h||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),v||c(e,r),e}function l(e){for(var t,n=e.getElementsByTagName("*"),o=n.length,a=RegExp("^(?:"+r().join("|")+")$","i"),i=[];o--;)t=n[o],a.test(t.nodeName)&&i.push(t.applyElement(f(t)));return i}function f(e){for(var t,n=e.attributes,r=n.length,o=e.ownerDocument.createElement(_+":"+e.nodeName);r--;)t=n[r],t.specified&&o.setAttribute(t.nodeName,t.nodeValue);return o.style.cssText=e.style.cssText,o}function d(e){for(var t,n=e.split("{"),o=n.length,a=RegExp("(^|[\\s,>+~])("+r().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),i="$1"+_+"\\:$2";o--;)t=n[o]=n[o].split("}"),t[t.length-1]=t[t.length-1].replace(a,i),n[o]=t.join("}");return n.join("{")}function p(e){for(var t=e.length;t--;)e[t].removeNode()}function m(e){function t(){clearTimeout(i._removeSheetTimer),r&&r.removeNode(!0),r=null}var r,o,i=a(e),s=e.namespaces,c=e.parentWindow;return!P||e.printShived?e:("undefined"==typeof s[_]&&s.add(_),c.attachEvent("onbeforeprint",function(){t();for(var a,i,s,c=e.styleSheets,u=[],f=c.length,p=Array(f);f--;)p[f]=c[f];for(;s=p.pop();)if(!s.disabled&&x.test(s.media)){try{a=s.imports,i=a.length}catch(m){i=0}for(f=0;i>f;f++)p.push(a[f]);try{u.push(s.cssText)}catch(m){}}u=d(u.reverse().join("")),o=l(e),r=n(e,u)}),c.attachEvent("onafterprint",function(){p(o),clearTimeout(i._removeSheetTimer),i._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var h,v,g="3.7.3",y=e.html5||{},b=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,S=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,T="_html5shiv",C=0,w={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",h="hidden"in e,v=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){h=!0,v=!0}}();var E={elements:y.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:g,shivCSS:y.shivCSS!==!1,supportsUnknownElements:v,shivMethods:y.shivMethods!==!1,type:"default",shivDocument:u,createElement:i,createDocumentFragment:s,addElements:o};e.html5=E,u(t);var x=/^$|\b(?:all|print)\b/,_="html5shiv",P=!v&&function(){var n=t.documentElement;return!("undefined"==typeof t.namespaces||"undefined"==typeof t.parentWindow||"undefined"==typeof n.applyElement||"undefined"==typeof n.removeNode||"undefined"==typeof e.attachEvent)}();E.type+=" print",E.shivPrint=m,m(t),"object"==typeof module&&module.exports&&(module.exports=E)}("undefined"!=typeof e?e:this,t);var x="Moz O ms Webkit",_=T._config.usePrefixes?x.toLowerCase().split(" "):[];T._domPrefixes=_;var P;!function(){var e={}.hasOwnProperty;P=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),T._l={},T.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},T._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){T.addTest=i});var N=T._config.usePrefixes?x.split(" "):[];T._cssomPrefixes=N;var j=function(t){var r,o=C.length,a=e.CSSRule;if("undefined"==typeof a)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in a)return"@"+t;for(var i=0;o>i;i++){var s=C[i],c=s.toUpperCase()+"_"+r;if(c in a)return"@-"+s.toLowerCase()+"-"+t}return!1};T.atRule=j;var $=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();T.hasEvent=$;var z=function(e,t){var n=!1,r=s("div"),o=r.style;if(e in o){var a=_.length;for(o[e]=t,n=o[e];a--&&!n;)o[e]="-"+_[a]+"-"+t,n=o[e]}return""===n&&(n=!1),n};T.prefixedCSSValue=z,Modernizr.addTest("audio",function(){var e=s("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("video",function(){var e=s("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("preserve3d",function(){var e=s("a"),t=s("a");e.style.cssText="display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);",t.style.cssText="display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);",e.appendChild(t),w.appendChild(e);var n=t.getBoundingClientRect();return w.removeChild(e),n.width&&n.width<4});var k="CSS"in e&&"supports"in e.CSS,A="supportsCSS"in e;Modernizr.addTest("supports",k||A);var F=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return f("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();T.mq=F;var L=T.testStyles=f;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",C.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");L(r,function(e){n=9===e.offsetTop})}return n});var M={elem:s("modernizr")};Modernizr._q.push(function(){delete M.elem});var R={style:M.elem.style};Modernizr._q.unshift(function(){delete R.style});T.testProp=function(e,t,r){return v([e],n,t,r)};T.testAllProps=g;var B=T.prefixed=function(e,t,n){return 0===e.indexOf("@")?j(e):(-1!=e.indexOf("-")&&(e=c(e)),t?g(e,t,n):g(e,"pfx"))};T.prefixedCSS=function(e){var t=B(e);return t&&u(t)};T.testAllProps=y,Modernizr.addTest("bgsizecover",y("backgroundSize","cover")),Modernizr.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in w.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",L(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),o(),a(b),delete T.addTest,delete T.addAsyncTest;for(var D=0;D<Modernizr._q.length;D++)Modernizr._q[D]();e.Modernizr=Modernizr}(window,document);