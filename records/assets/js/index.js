/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+ruby */

var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),l=0;r=i[l++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i);var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var i=n.tokenize(e,t);return a.stringify(n.util.encode(i),r)},tokenize:function(e,t){var a=n.Token,r=[e],i=t.rest;if(i){for(var l in i)t[l]=i[l];delete t.rest}e:for(var l in t)if(t.hasOwnProperty(l)&&t[l]){var o=t[l];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;if(h&&!u.pattern.global){var p=u.pattern.toString().match(/[imuy]*$/)[0];u.pattern=RegExp(u.pattern.source,p+"g")}u=u.pattern||u;for(var m=0,y=0;m<r.length;y+=(r[m].matchedStr||r[m]).length,++m){var v=r[m];if(r.length>e.length)break e;if(!(v instanceof a)){u.lastIndex=0;var b=u.exec(v),k=1;if(!b&&h&&m!=r.length-1){if(u.lastIndex=y,b=u.exec(e),!b)break;for(var w=b.index+(g?b[1].length:0),_=b.index+b[0].length,A=m,S=y,P=r.length;P>A&&_>S;++A)S+=(r[A].matchedStr||r[A]).length,w>=S&&(++m,y=S);if(r[m]instanceof a||r[A-1].greedy)continue;k=A-m,v=e.slice(y,S),b.index-=y}if(b){g&&(f=b[1].length);var w=b.index+f,b=b[0].slice(f),_=w+b.length,x=v.slice(0,w),O=v.slice(_),j=[m,k];x&&j.push(x);var N=new a(l,c?n.tokenize(b,c):b,d,b,h);j.push(N),O&&j.push(O),Array.prototype.splice.apply(r,j)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.matchedStr=a||null,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var i={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=(o?" ":"")+s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,i=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),i&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/i,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
/* Ruby support */
!function(e){e.languages.ruby=e.languages.extend("clike",{comment:[/#(?!\{[^\r\n]*?\}).*/,/^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m],keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/});var n={pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:e.util.clone(e.languages.ruby)}};e.languages.insertBefore("ruby","keyword",{regex:[{pattern:/%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}],variable:/[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,symbol:/:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.insertBefore("ruby","number",{builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.ruby.string=[{pattern:/%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,greedy:!0,inside:{interpolation:n}},{pattern:/("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,greedy:!0,inside:{interpolation:n}}]}(Prism);
/*Python support*/
Prism.languages.python={"triple-quoted-string":{pattern:/"""[\s\S]+?"""|'''[\s\S]+?'''/,alias:"string"},comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:{pattern:/("|')(?:\\\\|\\?[^\\\r\n])*?\1/,greedy:!0},"function":{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)[a-z0-9_]+/i,lookbehind:!0},keyword:/\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,"boolean":/\b(?:True|False)\b/,number:/\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,punctuation:/[{}[\];(),.:]/};
(function(h,f){function l(a){this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||m();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect,b=b.width*b.height;this.intersectionRatio=a?b/a:0}function d(a,b){var c=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw Error("root must be an Element");
this._checkForIntersections=t(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(c.rootMargin);this.thresholds=this._initThresholds(c.threshold);this.root=c.root||null;this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function t(a,b){var c=null;return function(){c||(c=setTimeout(function(){a();c=null},b))}}function p(a,b,c,g){"function"==
typeof a.addEventListener?a.addEventListener(b,c,g||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function q(a,b,c,g){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,g||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function n(a){if(a=a.getBoundingClientRect())return a.width&&a.height||(a={top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.right-a.left,height:a.bottom-a.top}),a}function m(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}
if(!("IntersectionObserver"in h&&"IntersectionObserverEntry"in h&&"intersectionRatio"in h.IntersectionObserverEntry.prototype)){var r=f.documentElement,k=[];d.prototype.THROTTLE_TIMEOUT=100;d.prototype.POLL_INTERVAL=null;d.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections()}};d.prototype.unobserve=
function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())};d.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};d.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};d.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,
c,g){if("number"!=typeof a||isNaN(a)||0>a||1<a)throw Error("threshold must be a number between 0 and 1 inclusively");return a!==g[c-1]})};d.prototype._parseRootMargin=function(a){a=(a||"0px").split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!a)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};d.prototype._monitorIntersections=function(){this._monitoringIntersections||
(this._monitoringIntersections=!0,this._checkForIntersections(),this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(p(h,"resize",this._checkForIntersections,!0),p(f,"scroll",this._checkForIntersections,!0),"MutationObserver"in h&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(f,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};d.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&
(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,q(h,"resize",this._checkForIntersections,!0),q(f,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))};d.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():m();this._observationTargets.forEach(function(c){var g=c.element,d=n(g),e=this._rootContainsTarget(g),f=c.entry,k=a&&e&&this._computeTargetAndRootIntersection(g,
b);c=c.entry=new l({time:h.performance&&performance.now&&performance.now(),target:g,boundingClientRect:d,rootBounds:b,intersectionRect:k});a&&e?this._hasCrossedThreshold(f,c)&&this._queuedEntries.push(c):f&&f.isIntersecting&&this._queuedEntries.push(c)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)};d.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=h.getComputedStyle(a).display){for(var c=n(a),g=a.parentNode,d=!1;!d;){var e=null;g==this.root||1!=g.nodeType?
(d=!0,e=b):"visible"!=h.getComputedStyle(g).overflow&&(e=n(g));if(e){var f=Math.max(e.top,c.top),k=Math.min(e.bottom,c.bottom),l=Math.max(e.left,c.left),c=Math.min(e.right,c.right),e=c-l,m=k-f,c=0<=e&&0<=m&&{top:f,bottom:k,left:l,right:c,width:e,height:m};if(!c)break}g=g.parentNode}return c}};d.prototype._getRootRect=function(){if(this.root)var a=n(this.root);else{a=f.documentElement;var b=f.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||
b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};d.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,d){return"px"==b.unit?b.value:b.value*(d%2?a.width:a.height)/100}),b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};d.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?
b.intersectionRatio||0:-1;if(c!==d)for(var f=0;f<this.thresholds.length;f++){var e=this.thresholds[f];if(e==c||e==d||e<c!==e<d)return!0}};d.prototype._rootIsInDom=function(){return!this.root||r.contains(this.root)};d.prototype._rootContainsTarget=function(a){return(this.root||r).contains(a)};d.prototype._registerInstance=function(){0>k.indexOf(this)&&k.push(this)};d.prototype._unregisterInstance=function(){var a=k.indexOf(this);-1!=a&&k.splice(a,1)};h.IntersectionObserver=d;h.IntersectionObserverEntry=
l}})(window,document);

var setupRunKitNotebook = function(options) {
  if (!window.RunKit) {
    return;
  }

  var element = options.element;
  var source = options.source;
  var preamble = options.preamble;
  var onLoad = options.onLoad;
  var onEvaluate = options.onEvaluate;
  var container = options.container;

  // Setup the RunKit notebook to fit the Stripe site.
  // Note: This RunKit API will change soon and will be easier to modularize.
  var runkitNotebook = RunKit.createNotebook({
    element: element,
    theme: location.pathname === '/connect' ? 'stripe-light-connect' : 'stripe-light',
    gutterStyle: 'inside',
    nodeVersion: '8.x.x',
    source: source,
    preamble: preamble,
    onLoad: onLoad,
    onEvaluate: onEvaluate
  });

  // Listen to changes on the content of the RunKit notebook after the first interaction with the iframe.
  // This avoids monitoring the source periodically if users are not interacting with RunKit.
  var listener = window.addEventListener('blur', function() {
    if (document.activeElement === editor.querySelector('iframe')) {
      var runkitWarning = document.getElementById('runkit-warning');
      var runkitWarningDisplayed = false;
      setInterval(function() {
        // Check periodically for what could look like a card number or a secret key.
        runkitNotebook.getSource(function(source) {
          var hasCreditCard = /\b(?:\d[ -]*?){13,16}\b/.test(source);
          var hasLiveSecretKey = source.indexOf('sk_live') > -1;
          // Return if a warning is already displayed.
          if ((hasCreditCard || hasLiveSecretKey) && runkitWarningDisplayed) {
            return;
          }
          runkitWarningDisplayed = false;
          if (hasCreditCard) {
            runkitWarning.firstChild.innerHTML = 'Make sure you never send raw credit card numbers to Stripe. Use <a href="/docs/testing#cards">test tokens</a>, and integrate <a href="/docs/stripe.js">Stripe.js</a> or <a href="/docs/elements">Elements</a> on your site.';
            runkitWarningDisplayed = true;
          } else if (hasLiveSecretKey) {
            runkitWarning.firstChild.innerHTML = 'Always use your test secret key for testing, not your live secret key. Get your test secret key in the <a href="https://dashboard.stripe.com/account/apikeys">Dashboard</a>.';
            runkitWarningDisplayed = true;
          }
          runkitWarning.classList.toggle('visible', hasCreditCard || hasLiveSecretKey);
        });
      }, 250);
    }
    window.removeEventListener('blur', listener);
  });

  return runkitNotebook;
};

// Define an observer to load RunKit when 10% of its container is on screen.
var observeRunKitScroll = function(element, callback) {
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.1) return;
    callback();
    observer.disconnect();
  }, {
    threshold: 0.1
  });
  observer.observe(element);
};
(function() {

  "use strict";

  // position the app illustrations at the end of the first content section on mobile
  // ===============================================================================================

  var appIllustrations = document.getElementById("app-illustrations");
  var topReference = document.querySelector("#complete-toolkit .common-Link");

  var setTop = function() {
    if (Strut.isMobileViewport) {
      appIllustrations.style.top = topReference.offsetTop + "px";
      return;
    }
    appIllustrations.removeAttribute("style");
  };

  ["load", "resize"].forEach(function(event) {
    window.addEventListener(event, setTop);
  });

  window.addEventListener("resize", setTop);
  window.addEventListener("load", function() {
    setTop();
    appIllustrations.classList.remove("hidden-preload");
  });

})();
(function() {

  "use strict";

  var notebook = document.getElementById("notebook");
  var nav = notebook.querySelector("nav");
  var select = nav.querySelector("select");
  var selection = document.getElementById("api-method-selection");
  var list = nav.querySelector("ul");
  var buttons = Strut.queryArray("button", list);
  var editor = document.getElementById("editor");
  var prism = document.getElementById("prism");
  var prismLineNumbers = prism.querySelector(".custom-line-numbers");
  var prismSource = prism.querySelector(".language-javascript");
  var runkitEmbed = document.getElementById("runkit");
  var runkitNotebook;

  var setLineNumbers = function(text) {
    var count = function(n, total, lines) {
      if (!n) {
        n = 1;
        total = text.split("\n").length;
        lines = "";
      }
      return total == n ? lines + n : count(n + 1, total, lines + n + "\n");
    };
    prismLineNumbers.textContent = count();
  };

  var loadRunKit = function() {
    if (runkitNotebook) {
      return;
    }
    // Setup the RunKit notebook.
    var selectedSection = select.options[select.selectedIndex].value;
    runkitNotebook = setupRunKitNotebook({
      container: notebook,
      element: runkitEmbed,
      source: runkitSources[selectedSection] + runkitEpilogues[selectedSection],
      preamble: runkitPreambles[selectedSection],
      onLoad: function() {
        // Toggle a CSS class to replace the static content with RunKit when it's loaded.
        editor.classList.add("runkit");
      },
      onEvaluate: function() {
        // Log an analytics event.
        window.Analytics && Analytics.action("runkit_evaluate", {"section": selectedSection});
      }
    });
    // Swap the display mode after the animations complete to enable the iframe container to resize.
    prism.addEventListener("transitionend", function(e) {
      prism.style.display = "none";
      runkitEmbed.style.position = "relative";
      nav.style.top = "2px"; // Fix for the RunKit negative margin.
    });
    // Log an analytics event.
    window.Analytics && Analytics.action("runkit_load", {"section": selectedSection});
  }

  var triggerChange = function() {
    var index = select.selectedIndex;
    selectButton(index);
    var section = select.options[index].value;

    // Render and highlight the code for the selected section.
    var source = runkitSources[section];
    prismSource.textContent = source;
    setLineNumbers(source);
    Prism.highlightElement(prismSource);

    // If the RunKit notebook exists, update the source and preamble.
    if (window.RunKit && runkitNotebook) {
      runkitNotebook.setSource(runkitSources[section] + (runkitEpilogues[section] || ""));
      runkitNotebook.setPreamble(runkitPreambles[section] || "");
    }
  };

  // Check if we should load RunKit (if feature flag turned on, and not on mobile viewports for now).
  if (runkitEnabled && !Strut.isMobileViewport) {
    // Watch the scroll to turn on RunKit.
    observeRunKitScroll(document.getElementById("primary"), loadRunKit);
  }

  var selectButton = function(index) {
    buttons.some(function(button) {
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        return true;
      }
    });
    buttons[index].classList.add("selected");
    selection.style.transform = "translateY(" + 100 * index + "%)";
  };

  list.addEventListener("click", function(e) {
    if (e.target.nodeName.toLowerCase() != "button") return;
    select.selectedIndex = buttons.indexOf(e.target);
    triggerChange();

    if(window.siteAnalytics && window.siteAnalytics.trackHomePageNotebook) {
      window.siteAnalytics.trackHomePageNotebook(e.target);
    }
  });

  select.addEventListener("change", triggerChange);
  triggerChange();

  // lazy load of prism's stylesheet
  // ===============================================================================================

  Strut.load.css("v3/shared/prism_light.css");

})();
if (Strut.supports.es6)
  Strut.load.js("v3/home/animations.js");





