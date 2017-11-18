/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/lib/mustache.js ==== */
(function defineMustache(global,factory){if(typeof exports==="object"&&exports){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{Mustache={};factory(Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function escapeHtml(string){return String(string).replace(/[&<>"'\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1&&value!=null)lookupHit=typeof value==="object"&&value.hasOwnProperty(names[index]);value=value[names[index++]]}}else if(context.view!=null&&typeof context.view==="object"){value=context.view[name];lookupHit=context.view.hasOwnProperty(name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.1.0";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer});

/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/lib/jquery.js ==== */
/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/EveFlash.min.js ==== */

(function(){var l="px";var h=false;var e=1;var a={cssclass:"red",TO:5000,CLOSE:false,TEXT:"Ошибка",TITLE:"Внимание"};var k={cssclass:"red",TO:5000,CLOSE:false,TEXT:"Ошибка",TITLE:"Внимание"};var d={info:"icon-info","!":"icon-exclamation"};var f={"!round":"image-exclamation-round",stop:"image-stop",info:"image-info",dead:"image-dead","!":"image-exclamation",bubble:"image-bubble",ok:"image-ok"};function i(){return ++e}var j={B:null,W:null,D:null,stack:null,init:function(){this.B=$("body");this.W=$(window);this.D=$(document);this.stack=[]},push:function(o){if((o instanceof c)){this.stack.push(o);o.handle.css({top:-100000+l,left:0+l}).appendTo(this.B).show();o.handle.addClass("EveFlash");o.measure();var n=this;n.updatePositions();o.handle.hide().css({left:this.calcLeft(o),top:this.calcTop(o)}).slideDown(400,function(){o.handle.addClass("EveFlashTrans")})}},flush:function(){for(var n=0;n<this.stack.length;n++){this.stack[n].destroy()}this.stack=[]},pop:function(p){var o=[];for(var n=0;n<this.stack.length;n++){if(p.id!==this.stack[n].id){o.push(this.stack[n])}}this.stack=o;p.destroy();this.updatePositions()},nowHeight:function(){var o=0;for(var n=0;n<this.stack.length;n++){o+=this.stack[n]._height}return o},updatePositions:function(){var o=this.nowHeight();var p=(this.WH()-o)/2;p=p<10?10:p;for(var n=0;n<this.stack.length;n++){this.stack[n].handle.css({top:p+l});p+=this.stack[n]._height}},calcLeft:function(n){return(this.WW()-n._width)/2},calcTop:function(p){var o=this.nowHeight();var q=(this.WH()-o)/2;q=q<10?10:q;for(var n=0;n<this.stack.length-1;n++){q+=this.stack[n]._height}return q},WH:function(){return parseFloat(this.W.innerHeight())},WW:function(){return parseFloat(this.W.innerWidth())}};function b(){if(h){return h}else{h=this}this.init()}b.prototype=j;var m={skeleton:'<div class="EveFlash"><span class="EveFlashClose" data-role="close" title="Закрыть"></span><span class="EveFlashImageSmall"></span><div class="EveFlashTitle" data-role="title"></div><div class="EveFlashContainer"><i class="EveFlashImage" data-role="image"></i><div class="EveFlashBody" data-role="body"></div><div class="EveFlashClearfix"></div></div></div>',TO:5000,cssclass:null,TIMER:null,TEXT:null,TITLE:null,CLOSE:false,ICON:false,IMAGE:false,handle:null,id:null,MIM:false,stack:null,applyParams:function(p){p=p||{};var o=jQuery.extend({},a,p);for(var n in o){if(n in this){this[n]=o[n]}}if(typeof(this.CLOSE)!="boolean"){this.CLOSE=a.CLOSE}if(this.TO!=parseInt(this.TO)){this.TO=0}else{this.TO=parseInt(this.TO)}},create:function(n){this.applyParams(n);this.id=i();this.handle=jQuery(this.skeleton);this.ScanRoles();this.setup()},ScanRoles:function(){this.R={};var n=this.R;this.handle.find("[data-role]").each(function(){var p=jQuery(this);var o=p.data("role");o?(n[o]=((o in n)?n[o].add(p):p)):false})},setup:function(){this.handle.addClass("EveFlash-status-"+this.cssclass);this.R.title.html(this.TITLE);this.R.body.html(this.GetText());if(this.CLOSE){this.handle.addClass("EveFlashClosable")}if(this.ICON){if(this.ICON in d){this.handle.addClass(d[this.ICON])}}if(this.IMAGE){if(this.IMAGE in f){this.handle.addClass(f[this.IMAGE])}}},append:function(){this.stack.push(this);this.launchTimer();this.attachHandlers()},close:function(){this.stack.pop(this)},destroy:function(){var n=this;this.detachHandlers();this.handle.removeClass("EveFlashTrans").slideUp(250,function(){n.handle.detach();n.handle.html("");n.handle=null})},measure:function(){this._width=parseFloat(this.handle.outerWidth(true));this._height=parseFloat(this.handle.outerHeight(true));var o=parseFloat(this.R.image.outerHeight(true));var n=parseFloat(this.R.body.outerHeight(true));var q=Math.max(o,n)-Math.min(o,n);if(q!=0){q=q/2;var p=o<n?this.R.image:this.R.body;p.css({"margin-top":q+l,"margin-bottom":q+l})}},lf2br:function(n){if(!(typeof(n)==="string")){try{n=n.toString()}catch(o){n="unstringable object"}}return n.replace(/\n/g,"<br>").replace(/\r/g,"")},GetText:function(){var q=this.TEXT;var p="";if(typeof(q)=="string"){return this.lf2br(q)}if(typeof(q)=="object"&&(q instanceof Array)){p="<ul>";for(var o=0;o<q.length;o++){p+="<li>"+this.lf2br(q[o])+"</li>"}p+="</ul>";return p}if(typeof(q)=="object"&&(q!==null)){p="<ul>";for(var n in q){if(q[n] instanceof (Array)){for(var o=0;o<q[n].length;o++){p+="<li><b>"+this.lf2br(n)+"<b>: "+this.lf2br(q[n])+"</li>"}}else{p+="<li><b>"+this.lf2br(n)+"<b>: "+this.lf2br(q[n])+"</li>"}}p+="</ul>";return p}return"Incorrect message"},launchTimer:function(){if(parseInt(this.TO)==this.TO){this.TO=parseInt(this.TO);if(this.TO>0){var n=this;this.TIMER=window.setTimeout(function(){if(n.MIM){n.hookMouseOut()}else{n.close()}},this.TO)}}},hookMouseOut:function(){var n=this;var o="EveFlash"+this.id;this.handle.on("mouseleave."+o,function(p){n.close()})},attachHandlers:function(){var n=this;var o="EveFlash"+this.id;if(this.CLOSE==false){this.handle.on("click."+o,function(p){n.close()})}this.R.close.on("click."+o,function(p){p.stopPropagation();n.close()});this.handle.on("mouseenter."+o,function(p){n.MIM=true}).on("mouseleave."+o,function(p){n.MIM=false})},detachHandlers:function(){var n="EveFlash"+this.id;this.handle.off("."+n);window.clearTimeout(this.TIMER)},init:function(n){this.stack=new b();this.create(n);this.append()}};function c(n){this.init(n)}c.prototype=m;c.setDefaults=function(p){if(typeof(p)!=="object"||p===null){a=k;return}for(var n in p){if(n in a){a[n]=p[n]}}return};c.setSkeleton=function(n){m.skeleton=n};c.setIcons=function(o){o=o||{};for(var n in o){d[n]=o[n]}};c.setImages=function(n){n=n||{};for(var o in n){f[o]=n[o]}};c.removeAll=function(){var n=new b();n.flush()};function g(p,u,w,r){var n=(!w||w==null)?r:w;var q="Ошибка!";var t="stop";var o="!";var v="red";if(n=="success"){q="Выполнено";t="ok";o="info";v="ntl"}var s={TEXT:p,TO:u,TITLE:q,cssclass:v,IMAGE:t,ICON:o};new c(s)}window.EveFlash=c;window.pi_flash=g;jQuery(function(){jQuery.pi_flash=g})})();
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/materialize.min.js ==== */
/*!
 * Materialize v0.97.5 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
if ("undefined" == typeof jQuery) {
    var jQuery;
    jQuery = "function" == typeof require ? $ = require("jQuery") : $ }
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e) }, easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c }, easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c }, easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c }, easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c }, easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c }, easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c }, easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c }, easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c }, easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c }, easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c }, easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c }, easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c }, easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c }, easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c }, easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c }, easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c }, easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c }, easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c }, easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c }, easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c }, easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c }, easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) { h = d;
                var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c }, easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) { h = d;
                var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c }, easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) { h = d;
                var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c }, easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c }, easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c }, easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c }, easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c }, easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c }, easeInOutBounce: function(a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c } }), jQuery.extend(jQuery.easing, { easeInOutMaterial: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : d / 4 * ((b -= 2) * b * b + 2) + c } }), jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (! function(a) {
        function b(a) {
            var b = a.length,
                d = c.type(a);
            return "function" === d || c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a }
        if (!a.jQuery) {
            var c = function(a, b) {
                return new c.fn.init(a, b) };
            c.isWindow = function(a) {
                return null != a && a == a.window }, c.type = function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a }, c.isArray = Array.isArray || function(a) {
                return "array" === c.type(a) }, c.isPlainObject = function(a) {
                var b;
                if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
                try {
                    if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (d) {
                    return !1 }
                for (b in a);
                return void 0 === b || f.call(a, b) }, c.each = function(a, c, d) {
                var e, f = 0,
                    g = a.length,
                    h = b(a);
                if (d) {
                    if (h)
                        for (; g > f && (e = c.apply(a[f], d), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = c.apply(a[f], d), e === !1) break } else if (h)
                    for (; g > f && (e = c.call(a[f], f, a[f]), e !== !1); f++);
                else
                    for (f in a)
                        if (e = c.call(a[f], f, a[f]), e === !1) break; return a }, c.data = function(a, b, e) {
                if (void 0 === e) {
                    var f = a[c.expando],
                        g = f && d[f];
                    if (void 0 === b) return g;
                    if (g && b in g) return g[b] } else if (void 0 !== b) {
                    var f = a[c.expando] || (a[c.expando] = ++c.uuid);
                    return d[f] = d[f] || {}, d[f][b] = e, e } }, c.removeData = function(a, b) {
                var e = a[c.expando],
                    f = e && d[e];
                f && c.each(b, function(a, b) { delete f[b] }) }, c.extend = function() {
                var a, b, d, e, f, g, h = arguments[0] || {},
                    i = 1,
                    j = arguments.length,
                    k = !1;
                for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); j > i; i++)
                    if (null != (f = arguments[i]))
                        for (e in f) a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : void 0 !== d && (h[e] = d));
                return h }, c.queue = function(a, d, e) {
                function f(a, c) {
                    var d = c || [];
                    return null != a && (b(Object(a)) ? ! function(a, b) {
                        for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
                        if (c !== c)
                            for (; void 0 !== b[d];) a[e++] = b[d++];
                        return a.length = e, a }(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d }
                if (a) { d = (d || "fx") + "queue";
                    var g = c.data(a, d);
                    return e ? (!g || c.isArray(e) ? g = c.data(a, d, f(e)) : g.push(e), g) : g || [] } }, c.dequeue = function(a, b) { c.each(a.nodeType ? [a] : a, function(a, d) { b = b || "fx";
                    var e = c.queue(d, b),
                        f = e.shift(); "inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function() { c.dequeue(d, b) })) }) }, c.fn = c.prototype = { init: function(a) {
                    if (a.nodeType) return this[0] = a, this;
                    throw new Error("Not a DOM node.") }, offset: function() {
                    var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
                    return { top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) } }, position: function() {
                    function a() {
                        for (var a = this.offsetParent || document; a && "html" === !a.nodeType.toLowerCase && "static" === a.style.position;) a = a.offsetParent;
                        return a || document }
                    var b = this[0],
                        a = a.apply(b),
                        d = this.offset(),
                        e = /^(?:body|html)$/i.test(a.nodeName) ? { top: 0, left: 0 } : c(a).offset();
                    return d.top -= parseFloat(b.style.marginTop) || 0, d.left -= parseFloat(b.style.marginLeft) || 0, a.style && (e.top += parseFloat(a.style.borderTopWidth) || 0, e.left += parseFloat(a.style.borderLeftWidth) || 0), { top: d.top - e.top, left: d.left - e.left } } };
            var d = {};
            c.expando = "velocity" + (new Date).getTime(), c.uuid = 0;
            for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++) e["[object " + h[i] + "]"] = h[i].toLowerCase();
            c.fn.init.prototype = c.fn, a.Velocity = { Utilities: c } } }(window), function(a) { "object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a() }(function() {
        return function(a, b, c, d) {
            function e(a) {
                for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                    var e = a[b];
                    e && d.push(e) }
                return d }

            function f(a) {
                return p.isWrapped(a) ? a = [].slice.call(a) : p.isNode(a) && (a = [a]), a }

            function g(a) {
                var b = m.data(a, "velocity");
                return null === b ? d : b }

            function h(a) {
                return function(b) {
                    return Math.round(b * a) * (1 / a) } }

            function i(a, c, d, e) {
                function f(a, b) {
                    return 1 - 3 * b + 3 * a }

                function g(a, b) {
                    return 3 * b - 6 * a }

                function h(a) {
                    return 3 * a }

                function i(a, b, c) {
                    return ((f(b, c) * a + g(b, c)) * a + h(b)) * a }

                function j(a, b, c) {
                    return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b) }

                function k(b, c) {
                    for (var e = 0; p > e; ++e) {
                        var f = j(c, a, d);
                        if (0 === f) return c;
                        var g = i(c, a, d) - b;
                        c -= g / f }
                    return c }

                function l() {
                    for (var b = 0; t > b; ++b) x[b] = i(b * u, a, d) }

                function m(b, c, e) {
                    var f, g, h = 0;
                    do g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g; while (Math.abs(f) > r && ++h < s);
                    return g }

                function n(b) {
                    for (var c = 0, e = 1, f = t - 1; e != f && x[e] <= b; ++e) c += u;--e;
                    var g = (b - x[e]) / (x[e + 1] - x[e]),
                        h = c + g * u,
                        i = j(h, a, d);
                    return i >= q ? k(b, h) : 0 == i ? h : m(b, c, c + u) }

                function o() { y = !0, (a != c || d != e) && l() }
                var p = 4,
                    q = .001,
                    r = 1e-7,
                    s = 10,
                    t = 11,
                    u = 1 / (t - 1),
                    v = "Float32Array" in b;
                if (4 !== arguments.length) return !1;
                for (var w = 0; 4 > w; ++w)
                    if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
                a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
                var x = v ? new Float32Array(t) : new Array(t),
                    y = !1,
                    z = function(b) {
                        return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e) };
                z.getControlPoints = function() {
                    return [{ x: a, y: c }, { x: d, y: e }] };
                var A = "generateBezier(" + [a, c, d, e] + ")";
                return z.toString = function() {
                    return A }, z }

            function j(a, b) {
                var c = a;
                return p.isString(a) ? t.Easings[a] || (c = !1) : c = p.isArray(a) && 1 === a.length ? h.apply(null, a) : p.isArray(a) && 2 === a.length ? u.apply(null, a.concat([b])) : p.isArray(a) && 4 === a.length ? i.apply(null, a) : !1, c === !1 && (c = t.Easings[t.defaults.easing] ? t.defaults.easing : s), c }

            function k(a) {
                if (a) {
                    var b = (new Date).getTime(),
                        c = t.State.calls.length;
                    c > 1e4 && (t.State.calls = e(t.State.calls));
                    for (var f = 0; c > f; f++)
                        if (t.State.calls[f]) {
                            var h = t.State.calls[f],
                                i = h[0],
                                j = h[2],
                                n = h[3],
                                o = !!n,
                                q = null;
                            n || (n = t.State.calls[f][3] = b - 16);
                            for (var r = Math.min((b - n) / j.duration, 1), s = 0, u = i.length; u > s; s++) {
                                var w = i[s],
                                    y = w.element;
                                if (g(y)) {
                                    var z = !1;
                                    if (j.display !== d && null !== j.display && "none" !== j.display) {
                                        if ("flex" === j.display) {
                                            var A = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            m.each(A, function(a, b) { v.setPropertyValue(y, "display", b) }) }
                                        v.setPropertyValue(y, "display", j.display) }
                                    j.visibility !== d && "hidden" !== j.visibility && v.setPropertyValue(y, "visibility", j.visibility);
                                    for (var B in w)
                                        if ("element" !== B) {
                                            var C, D = w[B],
                                                E = p.isString(D.easing) ? t.Easings[D.easing] : D.easing;
                                            if (1 === r) C = D.endValue;
                                            else {
                                                var F = D.endValue - D.startValue;
                                                if (C = D.startValue + F * E(r, j, F), !o && C === D.currentValue) continue }
                                            if (D.currentValue = C, "tween" === B) q = C;
                                            else {
                                                if (v.Hooks.registered[B]) {
                                                    var G = v.Hooks.getRoot(B),
                                                        H = g(y).rootPropertyValueCache[G];
                                                    H && (D.rootPropertyValue = H) }
                                                var I = v.setPropertyValue(y, B, D.currentValue + (0 === parseFloat(C) ? "" : D.unitType), D.rootPropertyValue, D.scrollData);
                                                v.Hooks.registered[B] && (g(y).rootPropertyValueCache[G] = v.Normalizations.registered[G] ? v.Normalizations.registered[G]("extract", null, I[1]) : I[1]), "transform" === I[0] && (z = !0) } }
                                    j.mobileHA && g(y).transformCache.translate3d === d && (g(y).transformCache.translate3d = "(0px, 0px, 0px)", z = !0), z && v.flushTransformCache(y) } }
                            j.display !== d && "none" !== j.display && (t.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (t.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], r, Math.max(0, n + j.duration - b), n, q), 1 === r && l(f) } }
                t.State.isTicking && x(k) }

            function l(a, b) {
                if (!t.State.calls[a]) return !1;
                for (var c = t.State.calls[a][0], e = t.State.calls[a][1], f = t.State.calls[a][2], h = t.State.calls[a][4], i = !1, j = 0, k = c.length; k > j; j++) {
                    var l = c[j].element;
                    if (b || f.loop || ("none" === f.display && v.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && v.setPropertyValue(l, "visibility", f.visibility)), f.loop !== !0 && (m.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(m.queue(l)[1])) && g(l)) { g(l).isAnimating = !1, g(l).rootPropertyValueCache = {};
                        var n = !1;
                        m.each(v.Lists.transforms3D, function(a, b) {
                            var c = /^scale/.test(b) ? 1 : 0,
                                e = g(l).transformCache[b];
                            g(l).transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (n = !0, delete g(l).transformCache[b]) }), f.mobileHA && (n = !0, delete g(l).transformCache.translate3d), n && v.flushTransformCache(l), v.Values.removeClass(l, "velocity-animating") }
                    if (!b && f.complete && !f.loop && j === k - 1) try { f.complete.call(e, e) } catch (o) { setTimeout(function() {
                            throw o }, 1) }
                    h && f.loop !== !0 && h(e), g(l) && f.loop === !0 && !b && (m.each(g(l).tweensContainer, function(a, b) { /^rotate/.test(a) && 360 === parseFloat(b.endValue) && (b.endValue = 0, b.startValue = 360), /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100) }), t(l, "reverse", { loop: !0, delay: f.delay })), f.queue !== !1 && m.dequeue(l, f.queue) }
                t.State.calls[a] = !1;
                for (var p = 0, q = t.State.calls.length; q > p; p++)
                    if (t.State.calls[p] !== !1) { i = !0;
                        break }
                i === !1 && (t.State.isTicking = !1, delete t.State.calls, t.State.calls = []) }
            var m, n = function() {
                    if (c.documentMode) return c.documentMode;
                    for (var a = 7; a > 4; a--) {
                        var b = c.createElement("div");
                        if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a }
                    return d }(),
                o = function() {
                    var a = 0;
                    return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function(b) {
                        var c, d = (new Date).getTime();
                        return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function() { b(d + c) }, c) } }(),
                p = { isString: function(a) {
                        return "string" == typeof a }, isArray: Array.isArray || function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a) }, isFunction: function(a) {
                        return "[object Function]" === Object.prototype.toString.call(a) }, isNode: function(a) {
                        return a && a.nodeType }, isNodeList: function(a) {
                        return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== d && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0) }, isWrapped: function(a) {
                        return a && (a.jquery || b.Zepto && b.Zepto.zepto.isZ(a)) }, isSVG: function(a) {
                        return b.SVGElement && a instanceof b.SVGElement }, isEmptyObject: function(a) {
                        for (var b in a) return !1;
                        return !0 } },
                q = !1;
            if (a.fn && a.fn.jquery ? (m = a, q = !0) : m = b.Velocity.Utilities, 8 >= n && !q) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (7 >= n) return void(jQuery.fn.velocity = jQuery.fn.animate);
            var r = 400,
                s = "swing",
                t = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: b.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: c.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: m, Redirects: {}, Easings: {}, Promise: b.Promise, defaults: { queue: "", duration: r, easing: s, begin: d, complete: d, progress: d, display: d, visibility: d, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function(a) { m.data(a, "velocity", { isSVG: p.isSVG(a), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} }) }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };
            b.pageYOffset !== d ? (t.State.scrollAnchor = b, t.State.scrollPropertyLeft = "pageXOffset", t.State.scrollPropertyTop = "pageYOffset") : (t.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, t.State.scrollPropertyLeft = "scrollLeft", t.State.scrollPropertyTop = "scrollTop");
            var u = function() {
                function a(a) {
                    return -a.tension * a.x - a.friction * a.v }

                function b(b, c, d) {
                    var e = { x: b.x + d.dx * c, v: b.v + d.dv * c, tension: b.tension, friction: b.friction };
                    return { dx: e.v, dv: a(e) } }

                function c(c, d) {
                    var e = { dx: c.v, dv: a(c) },
                        f = b(c, .5 * d, e),
                        g = b(c, .5 * d, f),
                        h = b(c, d, g),
                        i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
                        j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
                    return c.x = c.x + i * d, c.v = c.v + j * d, c }
                return function d(a, b, e) {
                    var f, g, h, i = { x: -1, v: 0, tension: null, friction: null },
                        j = [0],
                        k = 0,
                        l = 1e-4,
                        m = .016;
                    for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m; h = c(h || i, g), j.push(1 + h.x), k += 16, Math.abs(h.x) > l && Math.abs(h.v) > l;);
                    return f ? function(a) {
                        return j[a * (j.length - 1) | 0] } : k } }();
            t.Easings = { linear: function(a) {
                    return a }, swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2 }, spring: function(a) {
                    return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a) } }, m.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(a, b) { t.Easings[b[0]] = i.apply(null, b[1]) });
            var v = t.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function() {
                        for (var a = 0; a < v.Lists.colors.length; a++) {
                            var b = "color" === v.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";
                            v.Hooks.templates[v.Lists.colors[a]] = ["Red Green Blue Alpha", b] }
                        var c, d, e;
                        if (n)
                            for (c in v.Hooks.templates) { d = v.Hooks.templates[c], e = d[0].split(" ");
                                var f = d[1].match(v.RegEx.valueSplit); "Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), v.Hooks.templates[c] = [e.join(" "), f.join(" ")]) }
                        for (c in v.Hooks.templates) { d = v.Hooks.templates[c], e = d[0].split(" ");
                            for (var a in e) {
                                var g = c + e[a],
                                    h = a;
                                v.Hooks.registered[g] = [c, h] } } }, getRoot: function(a) {
                        var b = v.Hooks.registered[a];
                        return b ? b[0] : a }, cleanRootPropertyValue: function(a, b) {
                        return v.RegEx.valueUnwrap.test(b) && (b = b.match(v.RegEx.valueUnwrap)[1]), v.Values.isCSSNullValue(b) && (b = v.Hooks.templates[a][1]), b }, extractValue: function(a, b) {
                        var c = v.Hooks.registered[a];
                        if (c) {
                            var d = c[0],
                                e = c[1];
                            return b = v.Hooks.cleanRootPropertyValue(d, b), b.toString().match(v.RegEx.valueSplit)[e] }
                        return b }, injectValue: function(a, b, c) {
                        var d = v.Hooks.registered[a];
                        if (d) {
                            var e, f, g = d[0],
                                h = d[1];
                            return c = v.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(v.RegEx.valueSplit), e[h] = b, f = e.join(" ") }
                        return c } }, Normalizations: { registered: { clip: function(a, b, c) {
                            switch (a) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var d;
                                    return v.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(v.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;
                                case "inject":
                                    return "rect(" + c + ")" } }, blur: function(a, b, c) {
                            switch (a) {
                                case "name":
                                    return t.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var d = parseFloat(c);
                                    if (!d && 0 !== d) {
                                        var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        d = e ? e[1] : 0 }
                                    return d;
                                case "inject":
                                    return parseFloat(c) ? "blur(" + c + ")" : "none" } }, opacity: function(a, b, c) {
                            if (8 >= n) switch (a) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return c = d ? d[1] / 100 : 1;
                                case "inject":
                                    return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")" } else switch (a) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                    return c;
                                case "inject":
                                    return c } } }, register: function() { 9 >= n || t.State.isGingerbread || (v.Lists.transformsBase = v.Lists.transformsBase.concat(v.Lists.transforms3D));
                        for (var a = 0; a < v.Lists.transformsBase.length; a++) ! function() {
                            var b = v.Lists.transformsBase[a];
                            v.Normalizations.registered[b] = function(a, c, e) {
                                switch (a) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return g(c) === d || g(c).transformCache[b] === d ? /^scale/i.test(b) ? 1 : 0 : g(c).transformCache[b].replace(/[()]/g, "");
                                    case "inject":
                                        var f = !1;
                                        switch (b.substr(0, b.length - 1)) {
                                            case "translate":
                                                f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);
                                                break;
                                            case "scal":
                                            case "scale":
                                                t.State.isAndroid && g(c).transformCache[b] === d && 1 > e && (e = 1), f = !/(\d)$/i.test(e);
                                                break;
                                            case "skew":
                                                f = !/(deg|\d)$/i.test(e);
                                                break;
                                            case "rotate":
                                                f = !/(deg|\d)$/i.test(e) }
                                        return f || (g(c).transformCache[b] = "(" + e + ")"), g(c).transformCache[b] } } }();
                        for (var a = 0; a < v.Lists.colors.length; a++) ! function() {
                            var b = v.Lists.colors[a];
                            v.Normalizations.registered[b] = function(a, c, e) {
                                switch (a) {
                                    case "name":
                                        return b;
                                    case "extract":
                                        var f;
                                        if (v.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;
                                        else {
                                            var g, h = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" }; /^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : v.RegEx.isHex.test(e) ? g = "rgb(" + v.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ") }
                                        return 8 >= n || 3 !== f.split(" ").length || (f += " 1"), f;
                                    case "inject":
                                        return 8 >= n ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (8 >= n ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")" } } }() } }, Names: { camelCase: function(a) {
                        return a.replace(/-(\w)/g, function(a, b) {
                            return b.toUpperCase() }) }, SVGAttribute: function(a) {
                        var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (n || t.State.isAndroid && !t.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a) }, prefixCheck: function(a) {
                        if (t.State.prefixMatches[a]) return [t.State.prefixMatches[a], !0];
                        for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; d > c; c++) {
                            var e;
                            if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
                                    return a.toUpperCase() }), p.isString(t.State.prefixElement.style[e])) return t.State.prefixMatches[a] = e, [e, !0] }
                        return [a, !1] } }, Values: { hexToRgb: function(a) {
                        var b, c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return a = a.replace(c, function(a, b, c, d) {
                            return b + b + c + c + d + d }), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0] }, isCSSNullValue: function(a) {
                        return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a) }, getUnitType: function(a) {
                        return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px" }, getDisplayType: function(a) {
                        var b = a && a.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block" }, addClass: function(a, b) { a.classList ? a.classList.add(b) : a.className += (a.className.length ? " " : "") + b }, removeClass: function(a, b) { a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ") } }, getPropertyValue: function(a, c, e, f) {
                    function h(a, c) {
                        function e() { j && v.setPropertyValue(a, "display", "none") }
                        var i = 0;
                        if (8 >= n) i = m.css(a, c);
                        else {
                            var j = !1;
                            if (/^(width|height)$/.test(c) && 0 === v.getPropertyValue(a, "display") && (j = !0, v.setPropertyValue(a, "display", v.Values.getDisplayType(a))), !f) {
                                if ("height" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                    var k = a.offsetHeight - (parseFloat(v.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingBottom")) || 0);
                                    return e(), k }
                                if ("width" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                    var l = a.offsetWidth - (parseFloat(v.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingRight")) || 0);
                                    return e(), l } }
                            var o;
                            o = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), i = 9 === n && "filter" === c ? o.getPropertyValue(c) : o[c], ("" === i || null === i) && (i = a.style[c]), e() }
                        if ("auto" === i && /^(top|right|bottom|left)$/i.test(c)) {
                            var p = h(a, "position");
                            ("fixed" === p || "absolute" === p && /top|left/i.test(c)) && (i = m(a).position()[c] + "px") }
                        return i }
                    var i;
                    if (v.Hooks.registered[c]) {
                        var j = c,
                            k = v.Hooks.getRoot(j);
                        e === d && (e = v.getPropertyValue(a, v.Names.prefixCheck(k)[0])), v.Normalizations.registered[k] && (e = v.Normalizations.registered[k]("extract", a, e)), i = v.Hooks.extractValue(j, e) } else if (v.Normalizations.registered[c]) {
                        var l, o;
                        l = v.Normalizations.registered[c]("name", a), "transform" !== l && (o = h(a, v.Names.prefixCheck(l)[0]), v.Values.isCSSNullValue(o) && v.Hooks.templates[c] && (o = v.Hooks.templates[c][1])), i = v.Normalizations.registered[c]("extract", a, o) }
                    if (!/^[\d-]/.test(i))
                        if (g(a) && g(a).isSVG && v.Names.SVGAttribute(c))
                            if (/^(height|width)$/i.test(c)) try { i = a.getBBox()[c] } catch (p) { i = 0 } else i = a.getAttribute(c);
                            else i = h(a, v.Names.prefixCheck(c)[0]);
                    return v.Values.isCSSNullValue(i) && (i = 0), t.debug >= 2 && console.log("Get " + c + ": " + i), i }, setPropertyValue: function(a, c, d, e, f) {
                    var h = c;
                    if ("scroll" === c) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);
                    else if (v.Normalizations.registered[c] && "transform" === v.Normalizations.registered[c]("name", a)) v.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];
                    else {
                        if (v.Hooks.registered[c]) {
                            var i = c,
                                j = v.Hooks.getRoot(c);
                            e = e || v.getPropertyValue(a, j), d = v.Hooks.injectValue(i, d, e), c = j }
                        if (v.Normalizations.registered[c] && (d = v.Normalizations.registered[c]("inject", a, d), c = v.Normalizations.registered[c]("name", a)), h = v.Names.prefixCheck(c)[0], 8 >= n) try { a.style[h] = d } catch (k) { t.debug && console.log("Browser does not support [" + d + "] for [" + h + "]") } else g(a) && g(a).isSVG && v.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d;
                        t.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d) }
                    return [h, d] }, flushTransformCache: function(a) {
                    function b(b) {
                        return parseFloat(v.getPropertyValue(a, b)) }
                    var c = "";
                    if ((n || t.State.isAndroid && !t.State.isChrome) && g(a).isSVG) {
                        var d = { translate: [b("translateX"), b("translateY")], skewX: [b("skewX")], skewY: [b("skewY")], scale: 1 !== b("scale") ? [b("scale"), b("scale")] : [b("scaleX"), b("scaleY")], rotate: [b("rotateZ"), 0, 0] };
                        m.each(g(a).transformCache, function(a) { /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), d[a] && (c += a + "(" + d[a].join(" ") + ") ", delete d[a]) }) } else {
                        var e, f;
                        m.each(g(a).transformCache, function(b) {
                            return e = g(a).transformCache[b], "transformPerspective" === b ? (f = e, !0) : (9 === n && "rotateZ" === b && (b = "rotate"), void(c += b + e + " ")) }), f && (c = "perspective" + f + " " + c) }
                    v.setPropertyValue(a, "transform", c) } };
            v.Hooks.register(), v.Normalizations.register(), t.hook = function(a, b, c) {
                var e = d;
                return a = f(a), m.each(a, function(a, f) {
                    if (g(f) === d && t.init(f), c === d) e === d && (e = t.CSS.getPropertyValue(f, b));
                    else {
                        var h = t.CSS.setPropertyValue(f, b, c); "transform" === h[0] && t.CSS.flushTransformCache(f), e = h } }), e };
            var w = function() {
                function a() {
                    return h ? B.promise || null : i }

                function e() {
                    function a(a) {
                        function l(a, b) {
                            var c = d,
                                e = d,
                                g = d;
                            return p.isArray(a) ? (c = a[0], !p.isArray(a[1]) && /^[\d-]/.test(a[1]) || p.isFunction(a[1]) || v.RegEx.isHex.test(a[1]) ? g = a[1] : (p.isString(a[1]) && !v.RegEx.isHex.test(a[1]) || p.isArray(a[1])) && (e = b ? a[1] : j(a[1], h.duration), a[2] !== d && (g = a[2]))) : c = a, b || (e = e || h.easing), p.isFunction(c) && (c = c.call(f, y, x)), p.isFunction(g) && (g = g.call(f, y, x)), [c || 0, e, g] }

                        function n(a, b) {
                            var c, d;
                            return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                                return c = a, "" }), c || (c = v.Values.getUnitType(a)), [d, c] }

                        function r() {
                            var a = { myParent: f.parentNode || c.body, position: v.getPropertyValue(f, "position"), fontSize: v.getPropertyValue(f, "fontSize") },
                                d = a.position === I.lastPosition && a.myParent === I.lastParent,
                                e = a.fontSize === I.lastFontSize;
                            I.lastParent = a.myParent, I.lastPosition = a.position, I.lastFontSize = a.fontSize;
                            var h = 100,
                                i = {};
                            if (e && d) i.emToPx = I.lastEmToPx, i.percentToPxWidth = I.lastPercentToPxWidth, i.percentToPxHeight = I.lastPercentToPxHeight;
                            else {
                                var j = g(f).isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");
                                t.init(j), a.myParent.appendChild(j), m.each(["overflow", "overflowX", "overflowY"], function(a, b) { t.CSS.setPropertyValue(j, b, "hidden") }), t.CSS.setPropertyValue(j, "position", a.position), t.CSS.setPropertyValue(j, "fontSize", a.fontSize), t.CSS.setPropertyValue(j, "boxSizing", "content-box"), m.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) { t.CSS.setPropertyValue(j, b, h + "%") }), t.CSS.setPropertyValue(j, "paddingLeft", h + "em"), i.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(v.getPropertyValue(j, "width", null, !0)) || 1) / h, i.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(v.getPropertyValue(j, "height", null, !0)) || 1) / h, i.emToPx = I.lastEmToPx = (parseFloat(v.getPropertyValue(j, "paddingLeft")) || 1) / h, a.myParent.removeChild(j) }
                            return null === I.remToPx && (I.remToPx = parseFloat(v.getPropertyValue(c.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(b.innerWidth) / 100, I.vhToPx = parseFloat(b.innerHeight) / 100), i.remToPx = I.remToPx, i.vwToPx = I.vwToPx, i.vhToPx = I.vhToPx, t.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(i), f), i }
                        if (h.begin && 0 === y) try { h.begin.call(o, o) } catch (u) { setTimeout(function() {
                                throw u }, 1) }
                        if ("scroll" === C) {
                            var w, z, A, D = /^x$/i.test(h.axis) ? "Left" : "Top",
                                E = parseFloat(h.offset) || 0;
                            h.container ? p.isWrapped(h.container) || p.isNode(h.container) ? (h.container = h.container[0] || h.container, w = h.container["scroll" + D], A = w + m(f).position()[D.toLowerCase()] + E) : h.container = null : (w = t.State.scrollAnchor[t.State["scrollProperty" + D]], z = t.State.scrollAnchor[t.State["scrollProperty" + ("Left" === D ? "Top" : "Left")]], A = m(f).offset()[D.toLowerCase()] + E), i = { scroll: { rootPropertyValue: !1, startValue: w, currentValue: w, endValue: A, unitType: "", easing: h.easing, scrollData: { container: h.container, direction: D, alternateValue: z } }, element: f }, t.debug && console.log("tweensContainer (scroll): ", i.scroll, f) } else if ("reverse" === C) {
                            if (!g(f).tweensContainer) return void m.dequeue(f, h.queue); "none" === g(f).opts.display && (g(f).opts.display = "auto"), "hidden" === g(f).opts.visibility && (g(f).opts.visibility = "visible"), g(f).opts.loop = !1, g(f).opts.begin = null, g(f).opts.complete = null, s.easing || delete h.easing, s.duration || delete h.duration, h = m.extend({}, g(f).opts, h);
                            var F = m.extend(!0, {}, g(f).tweensContainer);
                            for (var G in F)
                                if ("element" !== G) {
                                    var H = F[G].startValue;
                                    F[G].startValue = F[G].currentValue = F[G].endValue, F[G].endValue = H, p.isEmptyObject(s) || (F[G].easing = h.easing), t.debug && console.log("reverse tweensContainer (" + G + "): " + JSON.stringify(F[G]), f) }
                            i = F } else if ("start" === C) {
                            var F;
                            g(f).tweensContainer && g(f).isAnimating === !0 && (F = g(f).tweensContainer), m.each(q, function(a, b) {
                                if (RegExp("^" + v.Lists.colors.join("$|^") + "$").test(a)) {
                                    var c = l(b, !0),
                                        e = c[0],
                                        f = c[1],
                                        g = c[2];
                                    if (v.RegEx.isHex.test(e)) {
                                        for (var h = ["Red", "Green", "Blue"], i = v.Values.hexToRgb(e), j = g ? v.Values.hexToRgb(g) : d, k = 0; k < h.length; k++) {
                                            var m = [i[k]];
                                            f && m.push(f), j !== d && m.push(j[k]), q[a + h[k]] = m }
                                        delete q[a] } } });
                            for (var K in q) {
                                var L = l(q[K]),
                                    M = L[0],
                                    N = L[1],
                                    O = L[2];
                                K = v.Names.camelCase(K);
                                var P = v.Hooks.getRoot(K),
                                    Q = !1;
                                if (g(f).isSVG || "tween" === P || v.Names.prefixCheck(P)[1] !== !1 || v.Normalizations.registered[P] !== d) {
                                    (h.display !== d && null !== h.display && "none" !== h.display || h.visibility !== d && "hidden" !== h.visibility) && /opacity|filter/.test(K) && !O && 0 !== M && (O = 0), h._cacheValues && F && F[K] ? (O === d && (O = F[K].endValue + F[K].unitType), Q = g(f).rootPropertyValueCache[P]) : v.Hooks.registered[K] ? O === d ? (Q = v.getPropertyValue(f, P), O = v.getPropertyValue(f, K, Q)) : Q = v.Hooks.templates[P][1] : O === d && (O = v.getPropertyValue(f, K));
                                    var R, S, T, U = !1;
                                    if (R = n(K, O), O = R[0], T = R[1], R = n(K, M), M = R[0].replace(/^([+-\/*])=/, function(a, b) {
                                            return U = b, "" }), S = R[1], O = parseFloat(O) || 0, M = parseFloat(M) || 0, "%" === S && (/^(fontSize|lineHeight)$/.test(K) ? (M /= 100, S = "em") : /^scale/.test(K) ? (M /= 100, S = "") : /(Red|Green|Blue)$/i.test(K) && (M = M / 100 * 255, S = "")), /[\/*]/.test(U)) S = T;
                                    else if (T !== S && 0 !== O)
                                        if (0 === M) S = T;
                                        else {
                                            e = e || r();
                                            var V = /margin|padding|left|right|width|text|word|letter/i.test(K) || /X$/.test(K) || "x" === K ? "x" : "y";
                                            switch (T) {
                                                case "%":
                                                    O *= "x" === V ? e.percentToPxWidth : e.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    O *= e[T + "ToPx"] }
                                            switch (S) {
                                                case "%":
                                                    O *= 1 / ("x" === V ? e.percentToPxWidth : e.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    O *= 1 / e[S + "ToPx"] }
                                        }
                                    switch (U) {
                                        case "+":
                                            M = O + M;
                                            break;
                                        case "-":
                                            M = O - M;
                                            break;
                                        case "*":
                                            M = O * M;
                                            break;
                                        case "/":
                                            M = O / M }
                                    i[K] = { rootPropertyValue: Q, startValue: O, currentValue: O, endValue: M, unitType: S, easing: N }, t.debug && console.log("tweensContainer (" + K + "): " + JSON.stringify(i[K]), f)
                                } else t.debug && console.log("Skipping [" + P + "] due to a lack of browser support.")
                            }
                            i.element = f
                        }
                        i.element && (v.Values.addClass(f, "velocity-animating"), J.push(i), "" === h.queue && (g(f).tweensContainer = i, g(f).opts = h), g(f).isAnimating = !0, y === x - 1 ? (t.State.calls.push([J, o, h, null, B.resolver]), t.State.isTicking === !1 && (t.State.isTicking = !0, k())) : y++)
                    }
                    var e, f = this,
                        h = m.extend({}, t.defaults, s),
                        i = {};
                    switch (g(f) === d && t.init(f), parseFloat(h.delay) && h.queue !== !1 && m.queue(f, h.queue, function(a) { t.velocityQueueEntryFlag = !0, g(f).delayTimer = { setTimeout: setTimeout(a, parseFloat(h.delay)), next: a } }), h.duration.toString().toLowerCase()) {
                        case "fast":
                            h.duration = 200;
                            break;
                        case "normal":
                            h.duration = r;
                            break;
                        case "slow":
                            h.duration = 600;
                            break;
                        default:
                            h.duration = parseFloat(h.duration) || 1 }
                    t.mock !== !1 && (t.mock === !0 ? h.duration = h.delay = 1 : (h.duration *= parseFloat(t.mock) || 1, h.delay *= parseFloat(t.mock) || 1)), h.easing = j(h.easing, h.duration), h.begin && !p.isFunction(h.begin) && (h.begin = null), h.progress && !p.isFunction(h.progress) && (h.progress = null), h.complete && !p.isFunction(h.complete) && (h.complete = null), h.display !== d && null !== h.display && (h.display = h.display.toString().toLowerCase(), "auto" === h.display && (h.display = t.CSS.Values.getDisplayType(f))), h.visibility !== d && null !== h.visibility && (h.visibility = h.visibility.toString().toLowerCase()), h.mobileHA = h.mobileHA && t.State.isMobile && !t.State.isGingerbread, h.queue === !1 ? h.delay ? setTimeout(a, h.delay) : a() : m.queue(f, h.queue, function(b, c) {
                        return c === !0 ? (B.promise && B.resolver(o), !0) : (t.velocityQueueEntryFlag = !0, void a(b)) }), "" !== h.queue && "fx" !== h.queue || "inprogress" === m.queue(f)[0] || m.dequeue(f)
                }
                var h, i, n, o, q, s, u = arguments[0] && (arguments[0].p || m.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || p.isString(arguments[0].properties));
                if (p.isWrapped(this) ? (h = !1, n = 0, o = this, i = this) : (h = !0, n = 1, o = u ? arguments[0].elements || arguments[0].e : arguments[0]), o = f(o)) { u ? (q = arguments[0].properties || arguments[0].p, s = arguments[0].options || arguments[0].o) : (q = arguments[n], s = arguments[n + 1]);
                    var x = o.length,
                        y = 0;
                    if (!/^(stop|finish)$/i.test(q) && !m.isPlainObject(s)) {
                        var z = n + 1;
                        s = {};
                        for (var A = z; A < arguments.length; A++) p.isArray(arguments[A]) || !/^(fast|normal|slow)$/i.test(arguments[A]) && !/^\d/.test(arguments[A]) ? p.isString(arguments[A]) || p.isArray(arguments[A]) ? s.easing = arguments[A] : p.isFunction(arguments[A]) && (s.complete = arguments[A]) : s.duration = arguments[A] }
                    var B = { promise: null, resolver: null, rejecter: null };
                    h && t.Promise && (B.promise = new t.Promise(function(a, b) { B.resolver = a, B.rejecter = b }));
                    var C;
                    switch (q) {
                        case "scroll":
                            C = "scroll";
                            break;
                        case "reverse":
                            C = "reverse";
                            break;
                        case "finish":
                        case "stop":
                            m.each(o, function(a, b) { g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer) });
                            var D = [];
                            return m.each(t.State.calls, function(a, b) { b && m.each(b[1], function(c, e) {
                                    var f = s === d ? "" : s;
                                    return f === !0 || b[2].queue === f || s === d && b[2].queue === !1 ? void m.each(o, function(c, d) { d === e && ((s === !0 || p.isString(s)) && (m.each(m.queue(d, p.isString(s) ? s : ""), function(a, b) { p.isFunction(b) && b(null, !0) }), m.queue(d, p.isString(s) ? s : "", [])), "stop" === q ? (g(d) && g(d).tweensContainer && f !== !1 && m.each(g(d).tweensContainer, function(a, b) { b.endValue = b.currentValue }), D.push(a)) : "finish" === q && (b[2].duration = 1)) }) : !0 }) }), "stop" === q && (m.each(D, function(a, b) { l(b, !0) }), B.promise && B.resolver(o)), a();
                        default:
                            if (!m.isPlainObject(q) || p.isEmptyObject(q)) {
                                if (p.isString(q) && t.Redirects[q]) {
                                    var E = m.extend({}, s),
                                        F = E.duration,
                                        G = E.delay || 0;
                                    return E.backwards === !0 && (o = m.extend(!0, [], o).reverse()), m.each(o, function(a, b) { parseFloat(E.stagger) ? E.delay = G + parseFloat(E.stagger) * a : p.isFunction(E.stagger) && (E.delay = G + E.stagger.call(b, a, x)), E.drag && (E.duration = parseFloat(F) || (/^(callout|transition)/.test(q) ? 1e3 : r), E.duration = Math.max(E.duration * (E.backwards ? 1 - a / x : (a + 1) / x), .75 * E.duration, 200)), t.Redirects[q].call(b, b, E || {}, a, x, o, B.promise ? B : d) }), a() }
                                var H = "Velocity: First argument (" + q + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return B.promise ? B.rejecter(new Error(H)) : console.log(H), a() }
                            C = "start" }
                    var I = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
                        J = [];
                    m.each(o, function(a, b) { p.isNode(b) && e.call(b) });
                    var K, E = m.extend({}, t.defaults, s);
                    if (E.loop = parseInt(E.loop), K = 2 * E.loop - 1, E.loop)
                        for (var L = 0; K > L; L++) {
                            var M = { delay: E.delay, progress: E.progress };
                            L === K - 1 && (M.display = E.display, M.visibility = E.visibility, M.complete = E.complete), w(o, "reverse", M) }
                    return a() }
            };
            t = m.extend(w, t), t.animate = w;
            var x = b.requestAnimationFrame || o;
            return t.State.isMobile || c.hidden === d || c.addEventListener("visibilitychange", function() { c.hidden ? (x = function(a) {
                    return setTimeout(function() { a(!0) }, 16) }, k()) : x = b.requestAnimationFrame || o }), a.Velocity = t, a !== b && (a.fn.velocity = w, a.fn.velocity.defaults = t.defaults), m.each(["Down", "Up"], function(a, b) { t.Redirects["slide" + b] = function(a, c, e, f, g, h) {
                    var i = m.extend({}, c),
                        j = i.begin,
                        k = i.complete,
                        l = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                        n = {};
                    i.display === d && (i.display = "Down" === b ? "inline" === t.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function() { j && j.call(g, g);
                        for (var c in l) { n[c] = a.style[c];
                            var d = t.CSS.getPropertyValue(a, c);
                            l[c] = "Down" === b ? [d, 0] : [0, d] }
                        n.overflow = a.style.overflow, a.style.overflow = "hidden" }, i.complete = function() {
                        for (var b in n) a.style[b] = n[b];
                        k && k.call(g, g), h && h.resolver(g) }, t(a, l, i) } }), m.each(["In", "Out"], function(a, b) { t.Redirects["fade" + b] = function(a, c, e, f, g, h) {
                    var i = m.extend({}, c),
                        j = { opacity: "In" === b ? 1 : 0 },
                        k = i.complete;
                    i.complete = e !== f - 1 ? i.begin = null : function() { k && k.call(g, g), h && h.resolver(g) }, i.display === d && (i.display = "In" === b ? "auto" : "none"), t(this, j, i) } }), t
        }(window.jQuery || window.Zepto || window, window, document)
    })), ! function(a, b, c, d) { "use strict";

        function e(a, b, c) {
            return setTimeout(k(a, c), b) }

        function f(a, b, c) {
            return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 }

        function g(a, b, c) {
            var e;
            if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) }

        function h(a, b, c) {
            for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
            return a }

        function i(a, b) {
            return h(a, b, !0) }

        function j(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c) }

        function k(a, b) {
            return function() {
                return a.apply(b, arguments) } }

        function l(a, b) {
            return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a }

        function m(a, b) {
            return a === d ? b : a }

        function n(a, b, c) { g(r(b), function(b) { a.addEventListener(b, c, !1) }) }

        function o(a, b, c) { g(r(b), function(b) { a.removeEventListener(b, c, !1) }) }

        function p(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode }
            return !1 }

        function q(a, b) {
            return a.indexOf(b) > -1 }

        function r(a) {
            return a.trim().split(/\s+/g) }

        function s(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length;) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++ }
            return -1 }

        function t(a) {
            return Array.prototype.slice.call(a, 0) }

        function u(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length;) {
                var g = b ? a[f][b] : a[f];
                s(e, g) < 0 && d.push(a[f]), e[f] = g, f++ }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b] }) : d.sort()), d }

        function v(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
                if (c = ia[g], e = c ? c + f : b, e in a) return e;
                g++ }
            return d }

        function w() {
            return oa++ }

        function x(a) {
            var b = a.ownerDocument;
            return b.defaultView || b.parentWindow }

        function y(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) { l(a.options.enable, [a]) && c.handler(b) }, this.init() }

        function z(a) {
            var b, c = a.options.inputClass;
            return new(b = c ? c : ra ? N : sa ? Q : qa ? S : M)(a, A) }

        function A(a, b, c) {
            var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & ya && 0 === d - e,
                g = b & (Aa | Ba) && 0 === d - e;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c }

        function B(a, b) {
            var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = F(d);
            b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
            var j = a.element;
            p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j }

        function C(a, b) {
            var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            (b.eventType === ya || f.eventType === Aa) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) }

        function D(a, b) {
            var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp;
            if (b.eventType != Ba && (i > xa || h.velocity === d)) {
                var j = h.deltaX - b.deltaX,
                    k = h.deltaY - b.deltaY,
                    l = G(i, j, k);
                e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g }

        function E(a) {
            for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: la(a.pointers[c].clientX), clientY: la(a.pointers[c].clientY) }, c++;
            return { timeStamp: na(), pointers: b, center: F(b), deltaX: a.deltaX, deltaY: a.deltaY } }

        function F(a) {
            var b = a.length;
            if (1 === b) return { x: la(a[0].clientX), y: la(a[0].clientY) };
            for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
            return { x: la(c / b), y: la(d / b) } }

        function G(a, b, c) {
            return { x: b / a || 0, y: c / a || 0 } }

        function H(a, b) {
            return a === b ? Ca : ma(a) >= ma(b) ? a > 0 ? Da : Ea : b > 0 ? Fa : Ga }

        function I(a, b, c) { c || (c = Ka);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e) }

        function J(a, b, c) { c || (c = Ka);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI }

        function K(a, b) {
            return J(b[1], b[0], La) - J(a[1], a[0], La) }

        function L(a, b) {
            return I(b[0], b[1], La) / I(a[0], a[1], La) }

        function M() { this.evEl = Na, this.evWin = Oa, this.allow = !0, this.pressed = !1, y.apply(this, arguments) }

        function N() { this.evEl = Ra, this.evWin = Sa, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] }

        function O() { this.evTarget = Ua, this.evWin = Va, this.started = !1, y.apply(this, arguments) }

        function P(a, b) {
            var c = t(a.touches),
                d = t(a.changedTouches);
            return b & (Aa | Ba) && (c = u(c.concat(d), "identifier", !0)), [c, d] }

        function Q() { this.evTarget = Xa, this.targetIds = {}, y.apply(this, arguments) }

        function R(a, b) {
            var c = t(a.touches),
                d = this.targetIds;
            if (b & (ya | za) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
            var e, f, g = t(a.changedTouches),
                h = [],
                i = this.target;
            if (f = c.filter(function(a) {
                    return p(a.target, i) }), b === ya)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Aa | Ba) && delete d[g[e].identifier], e++;
            return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0 }

        function S() { y.apply(this, arguments);
            var a = k(this.handler, this);
            this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a) }

        function T(a, b) { this.manager = a, this.set(b) }

        function U(a) {
            if (q(a, bb)) return bb;
            var b = q(a, cb),
                c = q(a, db);
            return b && c ? cb + " " + db : b || c ? b ? cb : db : q(a, ab) ? ab : _a }

        function V(a) { this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = eb, this.simultaneous = {}, this.requireFail = [] }

        function W(a) {
            return a & jb ? "cancel" : a & hb ? "end" : a & gb ? "move" : a & fb ? "start" : "" }

        function X(a) {
            return a == Ga ? "down" : a == Fa ? "up" : a == Da ? "left" : a == Ea ? "right" : "" }

        function Y(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a }

        function Z() { V.apply(this, arguments) }

        function $() { Z.apply(this, arguments), this.pX = null, this.pY = null }

        function _() { Z.apply(this, arguments) }

        function aa() { V.apply(this, arguments), this._timer = null, this._input = null }

        function ba() { Z.apply(this, arguments) }

        function ca() { Z.apply(this, arguments) }

        function da() { V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 }

        function ea(a, b) {
            return b = b || {}, b.recognizers = m(b.recognizers, ea.defaults.preset), new fa(a, b) }

        function fa(a, b) { b = b || {}, this.options = i(b, ea.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), ga(this, !0), g(b.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) }

        function ga(a, b) {
            var c = a.element;
            g(a.options.cssProps, function(a, d) { c.style[v(c.style, d)] = b ? a : "" }) }

        function ha(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) }
        var ia = ["", "webkit", "moz", "MS", "ms", "o"],
            ja = b.createElement("div"),
            ka = "function",
            la = Math.round,
            ma = Math.abs,
            na = Date.now,
            oa = 1,
            pa = /mobile|tablet|ip(ad|hone|od)|android/i,
            qa = "ontouchstart" in a,
            ra = v(a, "PointerEvent") !== d,
            sa = qa && pa.test(navigator.userAgent),
            ta = "touch",
            ua = "pen",
            va = "mouse",
            wa = "kinect",
            xa = 25,
            ya = 1,
            za = 2,
            Aa = 4,
            Ba = 8,
            Ca = 1,
            Da = 2,
            Ea = 4,
            Fa = 8,
            Ga = 16,
            Ha = Da | Ea,
            Ia = Fa | Ga,
            Ja = Ha | Ia,
            Ka = ["x", "y"],
            La = ["clientX", "clientY"];
        y.prototype = { handler: function() {}, init: function() { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler) }, destroy: function() { this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler) } };
        var Ma = { mousedown: ya, mousemove: za, mouseup: Aa },
            Na = "mousedown",
            Oa = "mousemove mouseup";
        j(M, y, { handler: function(a) {
                var b = Ma[a.type];
                b & ya && 0 === a.button && (this.pressed = !0), b & za && 1 !== a.which && (b = Aa), this.pressed && this.allow && (b & Aa && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: va, srcEvent: a })) } });
        var Pa = { pointerdown: ya, pointermove: za, pointerup: Aa, pointercancel: Ba, pointerout: Ba },
            Qa = { 2: ta, 3: ua, 4: va, 5: wa },
            Ra = "pointerdown",
            Sa = "pointermove pointerup pointercancel";
        a.MSPointerEvent && (Ra = "MSPointerDown", Sa = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, { handler: function(a) {
                var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Pa[d],
                    f = Qa[a.pointerType] || a.pointerType,
                    g = f == ta,
                    h = s(b, a.pointerId, "pointerId");
                e & ya && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Aa | Ba) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } });
        var Ta = { touchstart: ya, touchmove: za, touchend: Aa, touchcancel: Ba },
            Ua = "touchstart",
            Va = "touchstart touchmove touchend touchcancel";
        j(O, y, { handler: function(a) {
                var b = Ta[a.type];
                if (b === ya && (this.started = !0), this.started) {
                    var c = P.call(this, a, b);
                    b & (Aa | Ba) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: ta, srcEvent: a }) } } });
        var Wa = { touchstart: ya, touchmove: za, touchend: Aa, touchcancel: Ba },
            Xa = "touchstart touchmove touchend touchcancel";
        j(Q, y, { handler: function(a) {
                var b = Wa[a.type],
                    c = R.call(this, a, b);
                c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: ta, srcEvent: a }) } }), j(S, y, { handler: function(a, b, c) {
                var d = c.pointerType == ta,
                    e = c.pointerType == va;
                if (d) this.mouse.allow = !1;
                else if (e && !this.mouse.allow) return;
                b & (Aa | Ba) && (this.mouse.allow = !0), this.callback(a, b, c) }, destroy: function() { this.touch.destroy(), this.mouse.destroy() } });
        var Ya = v(ja.style, "touchAction"),
            Za = Ya !== d,
            $a = "compute",
            _a = "auto",
            ab = "manipulation",
            bb = "none",
            cb = "pan-x",
            db = "pan-y";
        T.prototype = { set: function(a) { a == $a && (a = this.compute()), Za && (this.manager.element.style[Ya] = a), this.actions = a.toLowerCase().trim() }, update: function() { this.set(this.manager.options.touchAction) }, compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) { l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), U(a.join(" ")) }, preventDefaults: function(a) {
                if (!Za) {
                    var b = a.srcEvent,
                        c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions,
                        e = q(d, bb),
                        f = q(d, db),
                        g = q(d, cb);
                    return e || f && c & Ha || g && c & Ia ? this.preventSrc(b) : void 0 } }, preventSrc: function(a) { this.manager.session.prevented = !0, a.preventDefault() } };
        var eb = 1,
            fb = 2,
            gb = 4,
            hb = 8,
            ib = hb,
            jb = 16,
            kb = 32;
        V.prototype = { defaults: {}, set: function(a) {
                return h(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = Y(a, this);
                var b = s(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function() {
                return this.requireFail.length > 0 }, canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id] }, emit: function(a) {
                function b(b) { c.manager.emit(c.options.event + (b ? W(d) : ""), a) }
                var c = this,
                    d = this.state;
                hb > d && b(!0), b(), d >= hb && b(!0) }, tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void(this.state = kb) }, canEmit: function() {
                for (var a = 0; a < this.requireFail.length;) {
                    if (!(this.requireFail[a].state & (kb | eb))) return !1;
                    a++ }
                return !0 }, recognize: function(a) {
                var b = h({}, a);
                return l(this.options.enable, [this, b]) ? (this.state & (ib | jb | kb) && (this.state = eb), this.state = this.process(b), void(this.state & (fb | gb | hb | jb) && this.tryEmit(b))) : (this.reset(), void(this.state = kb)) }, process: function() {}, getTouchAction: function() {}, reset: function() {} }, j(Z, V, { defaults: { pointers: 1 }, attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b }, process: function(a) {
                var b = this.state,
                    c = a.eventType,
                    d = b & (fb | gb),
                    e = this.attrTest(a);
                return d && (c & Ba || !e) ? b | jb : d || e ? c & Aa ? b | hb : b & fb ? b | gb : fb : kb } }), j($, Z, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Ja }, getTouchAction: function() {
                var a = this.options.direction,
                    b = [];
                return a & Ha && b.push(db), a & Ia && b.push(cb), b }, directionTest: function(a) {
                var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY;
                return e & b.direction || (b.direction & Ha ? (e = 0 === f ? Ca : 0 > f ? Da : Ea, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ca : 0 > g ? Fa : Ga, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function(a) {
                return Z.prototype.attrTest.call(this, a) && (this.state & fb || !(this.state & fb) && this.directionTest(a)) }, emit: function(a) { this.pX = a.deltaX, this.pY = a.deltaY;
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a) } }), j(_, Z, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function() {
                return [bb] }, attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fb) }, emit: function(a) {
                if (this._super.emit.call(this, a), 1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + b, a) } } }), j(aa, V, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function() {
                return [_a] }, process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Aa | Ba) && !f) this.reset();
                else if (a.eventType & ya) this.reset(), this._timer = e(function() { this.state = ib, this.tryEmit() }, b.time, this);
                else if (a.eventType & Aa) return ib;
                return kb }, reset: function() { clearTimeout(this._timer) }, emit: function(a) { this.state === ib && (a && a.eventType & Aa ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input))) } }), j(ba, Z, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function() {
                return [bb] }, attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fb) } }), j(ca, Z, { defaults: { event: "swipe", threshold: 10, velocity: .65, direction: Ha | Ia, pointers: 1 }, getTouchAction: function() {
                return $.prototype.getTouchAction.call(this) }, attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Ha | Ia) ? b = a.velocity : c & Ha ? b = a.velocityX : c & Ia && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && ma(b) > this.options.velocity && a.eventType & Aa }, emit: function(a) {
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), j(da, V, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function() {
                return [ab] }, process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & ya && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Aa) return this.failTimeout();
                    var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                        h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() { this.state = ib, this.tryEmit() }, b.interval, this), fb) : ib }
                return kb }, failTimeout: function() {
                return this._timer = e(function() { this.state = kb }, this.options.interval, this), kb }, reset: function() { clearTimeout(this._timer) }, emit: function() { this.state == ib && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), ea.VERSION = "2.0.4", ea.defaults = { domEvents: !1, touchAction: $a, enable: !0, inputTarget: null, inputClass: null, preset: [
                [ba, { enable: !1 }],
                [_, { enable: !1 },
                    ["rotate"]
                ],
                [ca, { direction: Ha }],
                [$, { direction: Ha },
                    ["swipe"]
                ],
                [da],
                [da, { event: "doubletap", taps: 2 },
                    ["tap"]
                ],
                [aa]
            ], cssProps: { userSelect: "default", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };
        var lb = 1,
            mb = 2;
        fa.prototype = { set: function(a) {
                return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function(a) { this.session.stopped = a ? mb : lb }, recognize: function(a) {
                var b = this.session;
                if (!b.stopped) { this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & ib) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length;) c = d[f], b.stopped === mb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fb | gb | hb) && (e = b.curRecognizer = c), f++ } }, get: function(a) {
                if (a instanceof V) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c];
                return null }, add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function(a) {
                if (f(a, "remove", this)) return this;
                var b = this.recognizers;
                return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this }, on: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) { c[a] = c[a] || [], c[a].push(b) }), this }, off: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) { b ? c[a].splice(s(c[a], b), 1) : delete c[a] }), this }, emit: function(a, b) { this.options.domEvents && ha(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) { b.type = a, b.preventDefault = function() { b.srcEvent.preventDefault() };
                    for (var d = 0; d < c.length;) c[d](b), d++ } }, destroy: function() { this.element && ga(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, h(ea, { INPUT_START: ya, INPUT_MOVE: za, INPUT_END: Aa, INPUT_CANCEL: Ba, STATE_POSSIBLE: eb, STATE_BEGAN: fb, STATE_CHANGED: gb, STATE_ENDED: hb, STATE_RECOGNIZED: ib, STATE_CANCELLED: jb, STATE_FAILED: kb, DIRECTION_NONE: Ca, DIRECTION_LEFT: Da, DIRECTION_RIGHT: Ea, DIRECTION_UP: Fa, DIRECTION_DOWN: Ga, DIRECTION_HORIZONTAL: Ha, DIRECTION_VERTICAL: Ia, DIRECTION_ALL: Ja, Manager: fa, Input: y, TouchAction: T, TouchInput: Q, MouseInput: M, PointerEventInput: N, TouchMouseInput: S, SingleTouchInput: O, Recognizer: V, AttrRecognizer: Z, Tap: da, Pan: $, Swipe: ca, Pinch: _, Rotate: ba, Press: aa, on: n, off: o, each: g, merge: i, extend: h, inherit: j, bindFn: k, prefixed: v }), typeof define == ka && define.amd ? define(function() {
            return ea }) : "undefined" != typeof module && module.exports ? module.exports = ea : a[c] = ea }(window, document, "Hammer"),
    function(a) { "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], a) : "object" == typeof exports ? a(require("jquery"), require("hammerjs")) : a(jQuery, Hammer) }(function(a, b) {
        function c(c, d) {
            var e = a(c);
            e.data("hammer") || e.data("hammer", new b(e[0], d)) }
        a.fn.hammer = function(a) {
            return this.each(function() { c(this, a) }) }, b.Manager.prototype.emit = function(b) {
            return function(c, d) { b.call(this, c, d), a(this.element).trigger({ type: c, gesture: d }) } }(b.Manager.prototype.emit) }),
    function(a) { a.Package ? Materialize = {} : a.Materialize = {} }(window), Materialize.guid = function() {
        function a() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) }
        return function() {
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a() } }(), Materialize.elementOrParentIsFixed = function(a) {
        var b = $(a),
            c = b.add(b.parents()),
            d = !1;
        return c.each(function() {
            return "fixed" === $(this).css("position") ? (d = !0, !1) : void 0 }), d };
var Vel;
Vel = $ ? $.Velocity : jQuery ? jQuery.Velocity : Velocity,
    function(a) { a.fn.collapsible = function(b) {
            var c = { accordion: void 0 };
            return b = a.extend(c, b), this.each(function() {
                function c(b) { h = g.find("> li > .collapsible-header"), b.hasClass("active") ? b.parent().addClass("active") : b.parent().removeClass("active"), b.parent().hasClass("active") ? b.siblings(".collapsible-body").stop(!0, !1).slideDown({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function() { a(this).css("height", "") } }) : b.siblings(".collapsible-body").stop(!0, !1).slideUp({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function() { a(this).css("height", "") } }), h.not(b).removeClass("active").parent().removeClass("active"), h.not(b).parent().children(".collapsible-body").stop(!0, !1).slideUp({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function() { a(this).css("height", "") } }) }

                function d(b) { b.hasClass("active") ? b.parent().addClass("active") : b.parent().removeClass("active"), b.parent().hasClass("active") ? b.siblings(".collapsible-body").stop(!0, !1).slideDown({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function() { a(this).css("height", "") } }) : b.siblings(".collapsible-body").stop(!0, !1).slideUp({ duration: 350, easing: "easeOutQuart", queue: !1, complete: function() { a(this).css("height", "") } }) }

                function e(a) {
                    var b = f(a);
                    return b.length > 0 }

                function f(a) {
                    return a.closest("li > .collapsible-header") }
                var g = a(this),
                    h = a(this).find("> li > .collapsible-header"),
                    i = g.data("collapsible");
                g.off("click.collapse", "> li > .collapsible-header"), h.off("click.collapse"), g.on("click.collapse", "> li > .collapsible-header", function(g) {
                    var h = a(this),
                        j = a(g.target);
                    e(j) && (j = f(j)), j.toggleClass("active"), b.accordion || "accordion" === i || void 0 === i ? c(j) : (d(j), h.hasClass("active") && d(h)) });
                var h = g.find("> li > .collapsible-header");
                b.accordion || "accordion" === i || void 0 === i ? c(h.filter(".active").first()) : h.filter(".active").each(function() { d(a(this)) }) }) }, a(document).ready(function() { a(".collapsible").collapsible() }) }(jQuery),
    function(a) { a.fn.scrollTo = function(b) {
            return a(this).scrollTop(a(this).scrollTop() - a(this).offset().top + a(b).offset().top), this }, a.fn.dropdown = function(b) {
            var c = { inDuration: 300, outDuration: 225, constrain_width: !0, hover: !1, gutter: 0, belowOrigin: !1, alignment: "left" };
            this.each(function() {
                function d() { void 0 !== g.data("induration") && (h.inDuration = g.data("inDuration")), void 0 !== g.data("outduration") && (h.outDuration = g.data("outDuration")), void 0 !== g.data("constrainwidth") && (h.constrain_width = g.data("constrainwidth")), void 0 !== g.data("hover") && (h.hover = g.data("hover")), void 0 !== g.data("gutter") && (h.gutter = g.data("gutter")), void 0 !== g.data("beloworigin") && (h.belowOrigin = g.data("beloworigin")), void 0 !== g.data("alignment") && (h.alignment = g.data("alignment")) }

                function e(b) { "focus" === b && (i = !0), d(), j.addClass("active"), g.addClass("active"), h.constrain_width === !0 ? j.css("width", g.outerWidth()) : j.css("white-space", "nowrap");
                    var c, e = window.innerHeight,
                        f = g.innerHeight(),
                        k = g.offset().left,
                        l = g.offset().top - a(window).scrollTop(),
                        m = h.alignment,
                        n = 0;
                    if (h.belowOrigin === !0 && (n = f), k + j.innerWidth() > a(window).width() ? m = "right" : k - j.innerWidth() + g.innerWidth() < 0 && (m = "left"), l + j.innerHeight() > e)
                        if (l + f - j.innerHeight() < 0) {
                            var o = e - l - n;
                            j.css("max-height", o) } else n || (n += f), n -= j.innerHeight();
                    if ("left" === m) c = h.gutter, leftPosition = g.position().left + c;
                    else if ("right" === m) {
                        var p = g.position().left + g.outerWidth() - j.outerWidth();
                        c = -h.gutter, leftPosition = p + c }
                    j.css({ position: "absolute", top: g.position().top + n, left: leftPosition }), j.stop(!0, !0).css("opacity", 0).slideDown({ queue: !1, duration: h.inDuration, easing: "easeOutCubic", complete: function() { a(this).css("height", "") } }).animate({ opacity: 1 }, { queue: !1, duration: h.inDuration, easing: "easeOutSine" }) }

                function f() { i = !1, j.fadeOut(h.outDuration), j.removeClass("active"), g.removeClass("active"), setTimeout(function() { j.css("max-height", "") }, h.outDuration) }
                var g = a(this),
                    h = a.extend({}, c, b),
                    i = !1,
                    j = a("#" + g.attr("data-activates"));
                if (d(), g.after(j), h.hover) {
                    var k = !1;
                    g.unbind("click." + g.attr("id")), g.on("mouseenter", function(a) { k === !1 && (e(), k = !0) }), g.on("mouseleave", function(b) {
                        var c = b.toElement || b.relatedTarget;
                        a(c).closest(".dropdown-content").is(j) || (j.stop(!0, !0), f(), k = !1) }), j.on("mouseleave", function(b) {
                        var c = b.toElement || b.relatedTarget;
                        a(c).closest(".dropdown-button").is(g) || (j.stop(!0, !0), f(), k = !1) }) } else g.unbind("click." + g.attr("id")), g.bind("click." + g.attr("id"), function(b) { i || (g[0] != b.currentTarget || g.hasClass("active") || 0 !== a(b.target).closest(".dropdown-content").length ? g.hasClass("active") && (f(), a(document).unbind("click." + j.attr("id") + " touchstart." + j.attr("id"))) : (b.preventDefault(), e("click")), j.hasClass("active") && a(document).bind("click." + j.attr("id") + " touchstart." + j.attr("id"), function(b) { j.is(b.target) || g.is(b.target) || g.find(b.target).length || (f(), a(document).unbind("click." + j.attr("id") + " touchstart." + j.attr("id"))) })) });
                g.on("open", function(a, b) { e(b) }), g.on("close", f) }) }, a(document).ready(function() { a(".dropdown-button").dropdown() }) }(jQuery),
    function(a) {
        var b = 0,
            c = 0,
            d = function() {
                return c++, "materialize-lean-overlay-" + c };
        a.fn.extend({ openModal: function(c) { a("body").css("overflow", "hidden");
                var e = { opacity: .5, in_duration: 350, out_duration: 250, ready: void 0, complete: void 0, dismissible: !0, starting_top: "4%" },
                    f = d(),
                    g = a(this),
                    h = a('<div class="lean-overlay"></div>'),
                    i = ++b;
                h.attr("id", f).css("z-index", 1e3 + 2 * i), g.data("overlay-id", f).css("z-index", 1e3 + 2 * i + 1), a("body").append(h), c = a.extend(e, c), c.dismissible && (h.click(function() { g.closeModal(c) }), a(document).on("keyup.leanModal" + f, function(a) { 27 === a.keyCode && g.closeModal(c) })), g.find(".modal-close").on("click.close", function(a) { g.closeModal(c) }), h.css({ display: "block", opacity: 0 }), g.css({ display: "block", opacity: 0 }), h.velocity({ opacity: c.opacity }, { duration: c.in_duration, queue: !1, ease: "easeOutCubic" }), g.data("associated-overlay", h[0]), g.hasClass("bottom-sheet") ? g.velocity({ bottom: "0", opacity: 1 }, { duration: c.in_duration, queue: !1, ease: "easeOutCubic", complete: function() { "function" == typeof c.ready && c.ready() } }) : (a.Velocity.hook(g, "scaleX", .7), g.css({ top: c.starting_top }), g.velocity({ top: "10%", opacity: 1, scaleX: "1" }, { duration: c.in_duration, queue: !1, ease: "easeOutCubic", complete: function() { "function" == typeof c.ready && c.ready() } })) } }), a.fn.extend({
            closeModal: function(c) {
                var d = { out_duration: 250, complete: void 0 },
                    e = a(this),
                    f = e.data("overlay-id"),
                    g = a("#" + f);
                c = a.extend(d, c), a("body").css("overflow", ""), e.find(".modal-close").off("click.close"), a(document).off("keyup.leanModal" + f), g.velocity({ opacity: 0 }, { duration: c.out_duration, queue: !1, ease: "easeOutQuart" }), e.hasClass("bottom-sheet") ? e.velocity({ bottom: "-100%", opacity: 0 }, {
                    duration: c.out_duration,
                    queue: !1,
                    ease: "easeOutCubic",
                    complete: function() {
                        g.css({ display: "none" }), "function" == typeof c.complete && c.complete(), g.remove(), b--
                    }
                }) : e.velocity({ top: c.starting_top, opacity: 0, scaleX: .7 }, { duration: c.out_duration, complete: function() { a(this).css("display", "none"), "function" == typeof c.complete && c.complete(), g.remove(), b-- } })
            }
        }), a.fn.extend({ leanModal: function(b) {
                return this.each(function() {
                    var c = { starting_top: "4%" },
                        d = a.extend(c, b);
                    a(this).click(function(b) { d.starting_top = (a(this).offset().top - a(window).scrollTop()) / 1.15;
                        var c = a(this).attr("href") || "#" + a(this).data("target");
                        a(c).openModal(d), b.preventDefault() }) }) } })
    }(jQuery),
    function(a) { a.fn.materialbox = function() {
            return this.each(function() {
                function b() { f = !1;
                    var b = i.parent(".material-placeholder"),
                        d = (window.innerWidth, window.innerHeight, i.data("width")),
                        g = i.data("height");
                    i.velocity("stop", !0), a("#materialbox-overlay").velocity("stop", !0), a(".materialbox-caption").velocity("stop", !0), a("#materialbox-overlay").velocity({ opacity: 0 }, { duration: h, queue: !1, easing: "easeOutQuad", complete: function() { e = !1, a(this).remove() } }), i.velocity({ width: d, height: g, left: 0, top: 0 }, { duration: h, queue: !1, easing: "easeOutQuad" }), a(".materialbox-caption").velocity({ opacity: 0 }, { duration: h, queue: !1, easing: "easeOutQuad", complete: function() { b.css({ height: "", width: "", position: "", top: "", left: "" }), i.css({ height: "", top: "", left: "", width: "", "max-width": "", position: "", "z-index": "" }), i.removeClass("active"), f = !0, a(this).remove(), c.css("overflow", "") } }) }
                if (!a(this).hasClass("initialized")) { a(this).addClass("initialized");
                    var c, d, e = !1,
                        f = !0,
                        g = 275,
                        h = 200,
                        i = a(this),
                        j = a("<div></div>").addClass("material-placeholder");
                    i.wrap(j), i.on("click", function() {
                        var h = i.parent(".material-placeholder"),
                            j = window.innerWidth,
                            k = window.innerHeight,
                            l = i.width(),
                            m = i.height();
                        if (f === !1) return b(), !1;
                        if (e && f === !0) return b(), !1;
                        f = !1, i.addClass("active"), e = !0, h.css({ width: h[0].getBoundingClientRect().width, height: h[0].getBoundingClientRect().height, position: "relative", top: 0, left: 0 }), c = void 0, d = h[0].parentNode;
                        for (; null !== d && !a(d).is(document);) {
                            var n = a(d); "hidden" === n.css("overflow") && (n.css("overflow", "visible"), c = void 0 === c ? n : c.add(n)), d = d.parentNode }
                        i.css({ position: "absolute", "z-index": 1e3 }).data("width", l).data("height", m);
                        var o = a('<div id="materialbox-overlay"></div>').css({ opacity: 0 }).click(function() { f === !0 && b() });
                        if (a("body").append(o), o.velocity({ opacity: 1 }, { duration: g, queue: !1, easing: "easeOutQuad" }), "" !== i.data("caption")) {
                            var p = a('<div class="materialbox-caption"></div>');
                            p.text(i.data("caption")), a("body").append(p), p.css({ display: "inline" }), p.velocity({ opacity: 1 }, { duration: g, queue: !1, easing: "easeOutQuad" }) }
                        var q = 0,
                            r = l / j,
                            s = m / k,
                            t = 0,
                            u = 0;
                        r > s ? (q = m / l, t = .9 * j, u = .9 * j * q) : (q = l / m, t = .9 * k * q, u = .9 * k), i.hasClass("responsive-img") ? i.velocity({ "max-width": t, width: l }, { duration: 0, queue: !1, complete: function() { i.css({ left: 0, top: 0 }).velocity({ height: u, width: t, left: a(document).scrollLeft() + j / 2 - i.parent(".material-placeholder").offset().left - t / 2, top: a(document).scrollTop() + k / 2 - i.parent(".material-placeholder").offset().top - u / 2 }, { duration: g, queue: !1, easing: "easeOutQuad", complete: function() { f = !0 } }) } }) : i.css("left", 0).css("top", 0).velocity({ height: u, width: t, left: a(document).scrollLeft() + j / 2 - i.parent(".material-placeholder").offset().left - t / 2, top: a(document).scrollTop() + k / 2 - i.parent(".material-placeholder").offset().top - u / 2 }, { duration: g, queue: !1, easing: "easeOutQuad", complete: function() { f = !0 } }) }), a(window).scroll(function() { e && b() }), a(document).keyup(function(a) { 27 === a.keyCode && f === !0 && e && b() }) } }) }, a(document).ready(function() { a(".materialboxed").materialbox() }) }(jQuery),
    function(a) { a.fn.parallax = function() {
            var b = a(window).width();
            return this.each(function(c) {
                function d(c) {
                    var d;
                    d = 601 > b ? e.height() > 0 ? e.height() : e.children("img").height() : e.height() > 0 ? e.height() : 500;
                    var f = e.children("img").first(),
                        g = f.height(),
                        h = g - d,
                        i = e.offset().top + d,
                        j = e.offset().top,
                        k = a(window).scrollTop(),
                        l = window.innerHeight,
                        m = k + l,
                        n = (m - j) / (d + l),
                        o = Math.round(h * n);
                    c && f.css("display", "block"), i > k && k + l > j && f.css("transform", "translate3D(-50%," + o + "px, 0)") }
                var e = a(this);
                e.addClass("parallax"), e.children("img").one("load", function() { d(!0) }).each(function() { this.complete && a(this).load() }), a(window).scroll(function() { b = a(window).width(), d(!1) }), a(window).resize(function() { b = a(window).width(), d(!1) }) }) } }(jQuery),
    function(a) {
        var b = { init: function() {
                return this.each(function() {
                    var b = a(this);
                    a(window).width();
                    b.width("100%");
                    var c, d, e = b.find("li.tab a"),
                        f = b.width(),
                        g = b.find("li").first().outerWidth(),
                        h = 0;
                    c = a(e.filter('[href="' + location.hash + '"]')), 0 === c.length && (c = a(this).find("li.tab a.active").first()), 0 === c.length && (c = a(this).find("li.tab a").first()), c.addClass("active"), h = e.index(c), 0 > h && (h = 0), d = a(c[0].hash), b.append('<div class="indicator"></div>');
                    var i = b.find(".indicator");
                    b.is(":visible") && (i.css({ right: f - (h + 1) * g }), i.css({ left: h * g })), a(window).resize(function() { f = b.width(), g = b.find("li").first().outerWidth(), 0 > h && (h = 0), 0 !== g && 0 !== f && (i.css({ right: f - (h + 1) * g }), i.css({ left: h * g })) }), e.not(c).each(function() { a(this.hash).hide() }), b.on("click", "a", function(j) {
                        if (a(this).parent().hasClass("disabled")) return void j.preventDefault();
                        f = b.width(), g = b.find("li").first().outerWidth(), c.removeClass("active"), d.hide(), c = a(this), d = a(this.hash), e = b.find("li.tab a"), c.addClass("active");
                        var k = h;
                        h = e.index(a(this)), 0 > h && (h = 0), d.show(), h - k >= 0 ? (i.velocity({ right: f - (h + 1) * g }, { duration: 300, queue: !1, easing: "easeOutQuad" }), i.velocity({ left: h * g }, { duration: 300, queue: !1, easing: "easeOutQuad", delay: 90 })) : (i.velocity({ left: h * g }, { duration: 300, queue: !1, easing: "easeOutQuad" }), i.velocity({ right: f - (h + 1) * g }, { duration: 300, queue: !1, easing: "easeOutQuad", delay: 90 })), j.preventDefault() }) }) }, select_tab: function(a) { this.find('a[href="#' + a + '"]').trigger("click") } };
        a.fn.tabs = function(c) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.tooltip") : b.init.apply(this, arguments) }, a(document).ready(function() { a("ul.tabs").tabs() }) }(jQuery),
    function(a) { a.fn.tooltip = function(c) {
            var d = 5,
                e = { delay: 350 };
            return "remove" === c ? (this.each(function() { a("#" + a(this).attr("data-tooltip-id")).remove(), a(this).off("mouseenter.tooltip mouseleave.tooltip") }), !1) : (c = a.extend(e, c), this.each(function() {
                var e = Materialize.guid(),
                    f = a(this);
                f.attr("data-tooltip-id", e);
                var g = a("<span></span>").text(f.attr("data-tooltip")),
                    h = a("<div></div>");
                h.addClass("material-tooltip").append(g).appendTo(a("body")).attr("id", e);
                var i = a("<div></div>").addClass("backdrop");
                i.appendTo(h), i.css({ top: 0, left: 0 }), f.off("mouseenter.tooltip mouseleave.tooltip");
                var j, k = !1;
                f.on({ "mouseenter.tooltip": function(a) {
                        var e = f.attr("data-delay");
                        e = void 0 === e || "" === e ? c.delay : e, j = setTimeout(function() { k = !0, h.velocity("stop"), i.velocity("stop"), h.css({ display: "block", left: "0px", top: "0px" }), h.children("span").text(f.attr("data-tooltip"));
                            var a, c, e, g = f.outerWidth(),
                                j = f.outerHeight(),
                                l = f.attr("data-position"),
                                m = h.outerHeight(),
                                n = h.outerWidth(),
                                o = "0px",
                                p = "0px",
                                q = 8; "top" === l ? (a = f.offset().top - m - d, c = f.offset().left + g / 2 - n / 2, e = b(c, a, n, m), o = "-10px", i.css({ borderRadius: "14px 14px 0 0", transformOrigin: "50% 90%", marginTop: m, marginLeft: n / 2 - i.width() / 2 })) : "left" === l ? (a = f.offset().top + j / 2 - m / 2, c = f.offset().left - n - d, e = b(c, a, n, m), p = "-10px", i.css({ width: "14px", height: "14px", borderRadius: "14px 0 0 14px", transformOrigin: "95% 50%", marginTop: m / 2, marginLeft: n })) : "right" === l ? (a = f.offset().top + j / 2 - m / 2, c = f.offset().left + g + d, e = b(c, a, n, m), p = "+10px", i.css({ width: "14px", height: "14px", borderRadius: "0 14px 14px 0", transformOrigin: "5% 50%", marginTop: m / 2, marginLeft: "0px" })) : (a = f.offset().top + f.outerHeight() + d, c = f.offset().left + g / 2 - n / 2, e = b(c, a, n, m), o = "+10px", i.css({ marginLeft: n / 2 - i.width() / 2 })), h.css({ top: e.y, left: e.x }), q = n / 8, 8 > q && (q = 8), ("right" === l || "left" === l) && (q = n / 10, 6 > q && (q = 6)), h.velocity({ marginTop: o, marginLeft: p }, { duration: 350, queue: !1 }).velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: !1 }), i.css({ display: "block" }).velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: !1 }).velocity({ scale: q }, { duration: 300, delay: 0, queue: !1, easing: "easeInOutQuad" }) }, e) }, "mouseleave.tooltip": function() { k = !1, clearTimeout(j), setTimeout(function() { 1 != k && (h.velocity({ opacity: 0, marginTop: 0, marginLeft: 0 }, { duration: 225, queue: !1 }), i.velocity({ opacity: 0, scale: 1 }, { duration: 225, queue: !1, complete: function() { i.css("display", "none"), h.css("display", "none"), k = !1 } })) }, 225) } }) })) };
        var b = function(b, c, d, e) {
            var f = b,
                g = c;
            return 0 > f ? f = 4 : f + d > window.innerWidth && (f -= f + d - window.innerWidth), 0 > g ? g = 4 : g + e > window.innerHeight + a(window).scrollTop && (g -= g + e - window.innerHeight), { x: f, y: g } };
        a(document).ready(function() { a(".tooltipped").tooltip() }) }(jQuery),
    function(a) { "use strict";

        function b(a) {
            return null !== a && a === a.window }

        function c(a) {
            return b(a) ? a : 9 === a.nodeType && a.defaultView }

        function d(a) {
            var b, d, e = { top: 0, left: 0 },
                f = a && a.ownerDocument;
            return b = f.documentElement, "undefined" != typeof a.getBoundingClientRect && (e = a.getBoundingClientRect()), d = c(f), { top: e.top + d.pageYOffset - b.clientTop, left: e.left + d.pageXOffset - b.clientLeft } }

        function e(a) {
            var b = "";
            for (var c in a) a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
            return b }

        function f(a) {
            if (k.allowEvent(a) === !1) return null;
            for (var b = null, c = a.target || a.srcElement; null !== c.parentElement;) {
                if (!(c instanceof SVGElement || -1 === c.className.indexOf("waves-effect"))) { b = c;
                    break }
                if (c.classList.contains("waves-effect")) { b = c;
                    break }
                c = c.parentElement }
            return b }

        function g(b) {
            var c = f(b);
            null !== c && (j.show(b, c), "ontouchstart" in a && (c.addEventListener("touchend", j.hide, !1), c.addEventListener("touchcancel", j.hide, !1)), c.addEventListener("mouseup", j.hide, !1), c.addEventListener("mouseleave", j.hide, !1)) }
        var h = h || {},
            i = document.querySelectorAll.bind(document),
            j = { duration: 750, show: function(a, b) {
                    if (2 === a.button) return !1;
                    var c = b || this,
                        f = document.createElement("div");
                    f.className = "waves-ripple", c.appendChild(f);
                    var g = d(c),
                        h = a.pageY - g.top,
                        i = a.pageX - g.left,
                        k = "scale(" + c.clientWidth / 100 * 10 + ")"; "touches" in a && (h = a.touches[0].pageY - g.top, i = a.touches[0].pageX - g.left), f.setAttribute("data-hold", Date.now()), f.setAttribute("data-scale", k), f.setAttribute("data-x", i), f.setAttribute("data-y", h);
                    var l = { top: h + "px", left: i + "px" };
                    f.className = f.className + " waves-notransition", f.setAttribute("style", e(l)), f.className = f.className.replace("waves-notransition", ""), l["-webkit-transform"] = k, l["-moz-transform"] = k, l["-ms-transform"] = k, l["-o-transform"] = k, l.transform = k, l.opacity = "1", l["-webkit-transition-duration"] = j.duration + "ms", l["-moz-transition-duration"] = j.duration + "ms", l["-o-transition-duration"] = j.duration + "ms", l["transition-duration"] = j.duration + "ms", l["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", f.setAttribute("style", e(l)) }, hide: function(a) { k.touchup(a);
                    var b = this,
                        c = (1.4 * b.clientWidth, null),
                        d = b.getElementsByClassName("waves-ripple");
                    if (!(d.length > 0)) return !1;
                    c = d[d.length - 1];
                    var f = c.getAttribute("data-x"),
                        g = c.getAttribute("data-y"),
                        h = c.getAttribute("data-scale"),
                        i = Date.now() - Number(c.getAttribute("data-hold")),
                        l = 350 - i;
                    0 > l && (l = 0), setTimeout(function() {
                        var a = { top: g + "px", left: f + "px", opacity: "0", "-webkit-transition-duration": j.duration + "ms", "-moz-transition-duration": j.duration + "ms", "-o-transition-duration": j.duration + "ms", "transition-duration": j.duration + "ms", "-webkit-transform": h, "-moz-transform": h, "-ms-transform": h, "-o-transform": h, transform: h };
                        c.setAttribute("style", e(a)), setTimeout(function() {
                            try { b.removeChild(c) } catch (a) {
                                return !1 } }, j.duration) }, l) }, wrapInput: function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        if ("input" === c.tagName.toLowerCase()) {
                            var d = c.parentNode;
                            if ("i" === d.tagName.toLowerCase() && -1 !== d.className.indexOf("waves-effect")) continue;
                            var e = document.createElement("i");
                            e.className = c.className + " waves-input-wrapper";
                            var f = c.getAttribute("style");
                            f || (f = ""), e.setAttribute("style", f), c.className = "waves-button-input", c.removeAttribute("style"), d.replaceChild(e, c), e.appendChild(c) } } } },
            k = { touches: 0, allowEvent: function(a) {
                    var b = !0;
                    return "touchstart" === a.type ? k.touches += 1 : "touchend" === a.type || "touchcancel" === a.type ? setTimeout(function() { k.touches > 0 && (k.touches -= 1) }, 500) : "mousedown" === a.type && k.touches > 0 && (b = !1), b }, touchup: function(a) { k.allowEvent(a) } };
        h.displayEffect = function(b) { b = b || {}, "duration" in b && (j.duration = b.duration), j.wrapInput(i(".waves-effect")), "ontouchstart" in a && document.body.addEventListener("touchstart", g, !1), document.body.addEventListener("mousedown", g, !1) }, h.attach = function(b) { "input" === b.tagName.toLowerCase() && (j.wrapInput([b]), b = b.parentElement), "ontouchstart" in a && b.addEventListener("touchstart", g, !1), b.addEventListener("mousedown", g, !1) }, a.Waves = h, document.addEventListener("DOMContentLoaded", function() { h.displayEffect() }, !1) }(window), Materialize.toast = function(a, b, c, d) {
        function e(a) {
            var b = document.createElement("div");
            if (b.classList.add("toast"), c)
                for (var e = c.split(" "), f = 0, g = e.length; g > f; f++) b.classList.add(e[f]);
            ("object" == typeof HTMLElement ? a instanceof HTMLElement : a && "object" == typeof a && null !== a && 1 === a.nodeType && "string" == typeof a.nodeName) ? b.appendChild(a): a instanceof jQuery ? b.appendChild(a[0]) : b.innerHTML = a;
            var h = new Hammer(b, { prevent_default: !1 });
            return h.on("pan", function(a) {
                var c = a.deltaX,
                    d = 80;
                b.classList.contains("panning") || b.classList.add("panning");
                var e = 1 - Math.abs(c / d);
                0 > e && (e = 0), Vel(b, { left: c, opacity: e }, { duration: 50, queue: !1, easing: "easeOutQuad" }) }), h.on("panend", function(a) {
                var c = a.deltaX,
                    e = 80;
                Math.abs(c) > e ? Vel(b, { marginTop: "-40px" }, { duration: 375, easing: "easeOutExpo", queue: !1, complete: function() { "function" == typeof d && d(), b.parentNode.removeChild(b) } }) : (b.classList.remove("panning"), Vel(b, { left: 0, opacity: 1 }, { duration: 300, easing: "easeOutExpo", queue: !1 })) }), b }
        c = c || "";
        var f = document.getElementById("toast-container");
        null === f && (f = document.createElement("div"), f.id = "toast-container", document.body.appendChild(f));
        var g = e(a);
        a && f.appendChild(g), g.style.top = "35px", g.style.opacity = 0, Vel(g, { top: "0px", opacity: 1 }, { duration: 300, easing: "easeOutCubic", queue: !1 });
        var h = b,
            i = setInterval(function() { null === g.parentNode && window.clearInterval(i), g.classList.contains("panning") || (h -= 20), 0 >= h && (Vel(g, { opacity: 0, marginTop: "-40px" }, { duration: 375, easing: "easeOutExpo", queue: !1, complete: function() { "function" == typeof d && d(), this[0].parentNode.removeChild(this[0]) } }), window.clearInterval(i)) }, 20) },
    function(a) {
        var b = { init: function(b) {
                var c = { menuWidth: 240, edge: "left", closeOnClick: !1 };
                b = a.extend(c, b), a(this).each(function() {
                    function c(c) { g = !1, h = !1, a("body").css("overflow", ""), a("#sidenav-overlay").velocity({ opacity: 0 }, { duration: 200, queue: !1, easing: "easeOutQuad", complete: function() { a(this).remove() } }), "left" === b.edge ? (f.css({ width: "", right: "", left: "0" }), e.velocity({ left: -1 * (b.menuWidth + 10) }, { duration: 200, queue: !1, easing: "easeOutCubic", complete: function() { c === !0 && (e.removeAttr("style"), e.css("width", b.menuWidth)) } })) : (f.css({ width: "", right: "0", left: "" }), e.velocity({ right: -1 * (b.menuWidth + 10) }, { duration: 200, queue: !1, easing: "easeOutCubic", complete: function() { c === !0 && (e.removeAttr("style"), e.css("width", b.menuWidth)) } })) }
                    var d = a(this),
                        e = a("#" + d.attr("data-activates"));
                    240 != b.menuWidth && e.css("width", b.menuWidth);
                    var f = a('<div class="drag-target"></div>');
                    a("body").append(f), "left" == b.edge ? (e.css("left", -1 * (b.menuWidth + 10)), f.css({ left: 0 })) : (e.addClass("right-aligned").css("right", -1 * (b.menuWidth + 10)).css("left", ""), f.css({ right: 0 })), e.hasClass("fixed") && window.innerWidth > 992 && e.css("left", 0), e.hasClass("fixed") && a(window).resize(function() { window.innerWidth > 992 ? 0 !== a("#sidenav-overlay").css("opacity") && h ? c(!0) : (e.removeAttr("style"), e.css("width", b.menuWidth)) : h === !1 && ("left" === b.edge ? e.css("left", -1 * (b.menuWidth + 10)) : e.css("right", -1 * (b.menuWidth + 10))) }), b.closeOnClick === !0 && e.on("click.itemclick", "a:not(.collapsible-header)", function() { c() });
                    var g = !1,
                        h = !1;
                    f.on("click", function() { c() }), f.hammer({ prevent_default: !1 }).bind("pan", function(d) {
                        if ("touch" == d.gesture.pointerType) {
                            var f = (d.gesture.direction, d.gesture.center.x);
                            d.gesture.center.y, d.gesture.velocityX;
                            if (a("body").css("overflow", "hidden"), 0 === a("#sidenav-overlay").length) {
                                var g = a('<div id="sidenav-overlay"></div>');
                                g.css("opacity", 0).click(function() { c() }), a("body").append(g) }
                            if ("left" === b.edge && (f > b.menuWidth ? f = b.menuWidth : 0 > f && (f = 0)), "left" === b.edge) f < b.menuWidth / 2 ? h = !1 : f >= b.menuWidth / 2 && (h = !0), e.css("left", f - b.menuWidth);
                            else { f < window.innerWidth - b.menuWidth / 2 ? h = !0 : f >= window.innerWidth - b.menuWidth / 2 && (h = !1);
                                var i = -1 * (f - b.menuWidth / 2);
                                i > 0 && (i = 0), e.css("right", i) }
                            var j; "left" === b.edge ? (j = f / b.menuWidth, a("#sidenav-overlay").velocity({ opacity: j }, { duration: 50, queue: !1, easing: "easeOutQuad" })) : (j = Math.abs((f - window.innerWidth) / b.menuWidth), a("#sidenav-overlay").velocity({ opacity: j }, { duration: 50, queue: !1, easing: "easeOutQuad" })) } }).bind("panend", function(c) {
                        if ("touch" == c.gesture.pointerType) {
                            var d = c.gesture.velocityX;
                            g = !1, "left" === b.edge ? h && .3 >= d || -.5 > d ? (e.velocity({ left: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad" }), a("#sidenav-overlay").velocity({ opacity: 1 }, { duration: 50, queue: !1, easing: "easeOutQuad" }), f.css({ width: "50%", right: 0, left: "" })) : (!h || d > .3) && (a("body").css("overflow", ""), e.velocity({ left: -1 * (b.menuWidth + 10) }, { duration: 200, queue: !1, easing: "easeOutQuad" }), a("#sidenav-overlay").velocity({ opacity: 0 }, { duration: 200, queue: !1, easing: "easeOutQuad", complete: function() { a(this).remove() } }), f.css({ width: "10px", right: "", left: 0 })) : h && d >= -.3 || d > .5 ? (e.velocity({ right: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad" }), a("#sidenav-overlay").velocity({ opacity: 1 }, { duration: 50, queue: !1, easing: "easeOutQuad" }), f.css({ width: "50%", right: "", left: 0 })) : (!h || -.3 > d) && (a("body").css("overflow", ""), e.velocity({ right: -1 * (b.menuWidth + 10) }, { duration: 200, queue: !1, easing: "easeOutQuad" }), a("#sidenav-overlay").velocity({ opacity: 0 }, { duration: 200, queue: !1, easing: "easeOutQuad", complete: function() { a(this).remove() } }), f.css({ width: "10px", right: 0, left: "" })) } }), d.click(function() {
                        if (h === !0) h = !1, g = !1, c();
                        else { a("body").css("overflow", "hidden"), a("body").append(f), "left" === b.edge ? (f.css({ width: "50%", right: 0, left: "" }), e.velocity({ left: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad" })) : (f.css({ width: "50%", right: "", left: 0 }), e.velocity({ right: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad" }), e.css("left", ""));
                            var d = a('<div id="sidenav-overlay"></div>');
                            d.css("opacity", 0).click(function() { h = !1, g = !1, c(), d.velocity({ opacity: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad", complete: function() { a(this).remove() } }) }), a("body").append(d), d.velocity({ opacity: 1 }, { duration: 300, queue: !1, easing: "easeOutQuad", complete: function() { h = !0, g = !1 } }) }
                        return !1 }) }) }, show: function() { this.trigger("click") }, hide: function() { a("#sidenav-overlay").trigger("click") } };
        a.fn.sideNav = function(c) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.sideNav") : b.init.apply(this, arguments) } }(jQuery),
    function(a) {
        function b(b, c, d, e) {
            var f = a();
            return a.each(g, function(a, g) {
                if (g.height() > 0) {
                    var h = g.offset().top,
                        i = g.offset().left,
                        j = i + g.width(),
                        k = h + g.height(),
                        l = !(i > c || e > j || h > d || b > k);
                    l && f.push(g) } }), f }

        function c() {++j;
            var c = f.scrollTop(),
                d = f.scrollLeft(),
                e = d + f.width(),
                g = c + f.height(),
                i = b(c + k.top + 200, e + k.right, g + k.bottom, d + k.left);
            a.each(i, function(a, b) {
                var c = b.data("scrollSpy:ticks"); "number" != typeof c && b.triggerHandler("scrollSpy:enter"), b.data("scrollSpy:ticks", j) }), a.each(h, function(a, b) {
                var c = b.data("scrollSpy:ticks"); "number" == typeof c && c !== j && (b.triggerHandler("scrollSpy:exit"), b.data("scrollSpy:ticks", null)) }), h = i }

        function d() { f.trigger("scrollSpy:winSize") }

        function e(a, b, c) {
            var d, e, f, g = null,
                h = 0;
            c || (c = {});
            var i = function() { h = c.leading === !1 ? 0 : l(), g = null, f = a.apply(d, e), d = e = null };
            return function() {
                var j = l();
                h || c.leading !== !1 || (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), d = e = null) : g || c.trailing === !1 || (g = setTimeout(i, k)), f } }
        var f = a(window),
            g = [],
            h = [],
            i = !1,
            j = 0,
            k = { top: 0, right: 0, bottom: 0, left: 0 },
            l = Date.now || function() {
                return (new Date).getTime() };
        a.scrollSpy = function(b, d) {
            var h = [];
            b = a(b), b.each(function(b, c) { g.push(a(c)), a(c).data("scrollSpy:id", b), a("a[href=#" + a(c).attr("id") + "]").click(function(b) { b.preventDefault();
                    var c = a(this.hash).offset().top + 1;
                    a("html, body").animate({ scrollTop: c - 200 }, { duration: 400, queue: !1, easing: "easeOutCubic" }) }) }), d = d || { throttle: 100 }, k.top = d.offsetTop || 0, k.right = d.offsetRight || 0, k.bottom = d.offsetBottom || 0, k.left = d.offsetLeft || 0;
            var j = e(c, d.throttle || 100),
                l = function() { a(document).ready(j) };
            return i || (f.on("scroll", l), f.on("resize", l), i = !0), setTimeout(l, 0), b.on("scrollSpy:enter", function() { h = a.grep(h, function(a) {
                    return 0 != a.height() });
                var b = a(this);
                h[0] ? (a("a[href=#" + h[0].attr("id") + "]").removeClass("active"), b.data("scrollSpy:id") < h[0].data("scrollSpy:id") ? h.unshift(a(this)) : h.push(a(this))) : h.push(a(this)), a("a[href=#" + h[0].attr("id") + "]").addClass("active") }), b.on("scrollSpy:exit", function() {
                if (h = a.grep(h, function(a) {
                        return 0 != a.height() }), h[0]) { a("a[href=#" + h[0].attr("id") + "]").removeClass("active");
                    var b = a(this);
                    h = a.grep(h, function(a) {
                        return a.attr("id") != b.attr("id") }), h[0] && a("a[href=#" + h[0].attr("id") + "]").addClass("active") } }), b }, a.winSizeSpy = function(b) {
            return a.winSizeSpy = function() {
                return f }, b = b || { throttle: 100 }, f.on("resize", e(d, b.throttle || 100)) }, a.fn.scrollSpy = function(b) {
            return a.scrollSpy(a(this), b) } }(jQuery),
    function(a) { a(document).ready(function() {
            function b(b) {
                var c = b.css("font-family"),
                    e = b.css("font-size");
                e && d.css("font-size", e), c && d.css("font-family", c), "off" === b.attr("wrap") && d.css("overflow-wrap", "normal").css("white-space", "pre"), d.text(b.val() + "\n");
                var f = d.html().replace(/\n/g, "<br>");
                d.html(f), b.is(":visible") ? d.css("width", b.width()) : d.css("width", a(window).width() / 2), b.css("height", d.height()) }
            Materialize.updateTextFields = function() {
                var b = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
                a(b).each(function(b, c) { a(c).val().length > 0 || c.autofocus || void 0 !== a(this).attr("placeholder") || a(c)[0].validity.badInput === !0 ? a(this).siblings("label, i").addClass("active") : a(this).siblings("label, i").removeClass("active") }) };
            var c = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
            a(document).on("change", c, function() {
                (0 !== a(this).val().length || void 0 !== a(this).attr("placeholder")) && a(this).siblings("label").addClass("active"), validate_field(a(this)) }), a(document).ready(function() { Materialize.updateTextFields() }), a(document).on("reset", function(b) {
                var d = a(b.target);
                d.is("form") && (d.find(c).removeClass("valid").removeClass("invalid"), d.find(c).each(function() { "" === a(this).attr("value") && a(this).siblings("label, i").removeClass("active") }), d.find("select.initialized").each(function() {
                    var a = d.find("option[selected]").text();
                    d.siblings("input.select-dropdown").val(a) })) }), a(document).on("focus", c, function() { a(this).siblings("label, i").addClass("active") }), a(document).on("blur", c, function() {
                var b = a(this);
                0 === b.val().length && b[0].validity.badInput !== !0 && void 0 === b.attr("placeholder") && b.siblings("label, i").removeClass("active"), 0 === b.val().length && b[0].validity.badInput !== !0 && void 0 !== b.attr("placeholder") && b.siblings("i").removeClass("active"), validate_field(b) }), window.validate_field = function(a) {
                var b = void 0 !== a.attr("length"),
                    c = parseInt(a.attr("length")),
                    d = a.val().length;
                0 === a.val().length && a[0].validity.badInput === !1 ? a.hasClass("validate") && (a.removeClass("valid"), a.removeClass("invalid")) : a.hasClass("validate") && (a.is(":valid") && b && c >= d || a.is(":valid") && !b ? (a.removeClass("invalid"), a.addClass("valid")) : (a.removeClass("valid"), a.addClass("invalid"))) };
            var d = a(".hiddendiv").first();
            d.length || (d = a('<div class="hiddendiv common"></div>'), a("body").append(d));
            var e = ".materialize-textarea";
            a(e).each(function() {
                var c = a(this);
                c.val().length && b(c) }), a("body").on("keyup keydown autoresize", e, function() { b(a(this)) }), a(document).on("change", '.file-field input[type="file"]', function() {
                for (var b = a(this).closest(".file-field"), c = b.find("input.file-path"), d = a(this)[0].files, e = [], f = 0; f < d.length; f++) e.push(d[f].name);
                c.val(e.join(", ")), c.trigger("change") });
            var f, g = "input[type=range]",
                h = !1;
            a(g).each(function() {
                var b = a('<span class="thumb"><span class="value"></span></span>');
                a(this).after(b) });
            var i = ".range-field";
            a(document).on("change", g, function(b) {
                var c = a(this).siblings(".thumb");
                c.find(".value").html(a(this).val()) }), a(document).on("input mousedown touchstart", g, function(b) {
                var c = a(this).siblings(".thumb"),
                    d = a(this).outerWidth();
                c.length <= 0 && (c = a('<span class="thumb"><span class="value"></span></span>'), a(this).after(c)), c.find(".value").html(a(this).val()), h = !0, a(this).addClass("active"), c.hasClass("active") || c.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px" }, { duration: 300, easing: "easeOutExpo" }), "input" !== b.type && (f = void 0 === b.pageX || null === b.pageX ? b.originalEvent.touches[0].pageX - a(this).offset().left : b.pageX - a(this).offset().left, 0 > f ? f = 0 : f > d && (f = d), c.addClass("active").css("left", f)), c.find(".value").html(a(this).val()) }), a(document).on("mouseup touchend", i, function() { h = !1, a(this).removeClass("active") }), a(document).on("mousemove touchmove", i, function(b) {
                var c, d = a(this).children(".thumb");
                if (h) { d.hasClass("active") || d.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px" }, { duration: 300, easing: "easeOutExpo" }), c = void 0 === b.pageX || null === b.pageX ? b.originalEvent.touches[0].pageX - a(this).offset().left : b.pageX - a(this).offset().left;
                    var e = a(this).outerWidth();
                    0 > c ? c = 0 : c > e && (c = e), d.addClass("active").css("left", c), d.find(".value").html(d.siblings(g).val()) } }), a(document).on("mouseout touchleave", i, function() {
                if (!h) {
                    var b = a(this).children(".thumb");
                    b.hasClass("active") && b.velocity({ height: "0", width: "0", top: "10px", marginLeft: "-6px" }, { duration: 100 }), b.removeClass("active") } }) }), a.fn.material_select = function(b) {
            function c(a, b, c) {
                var e = a.indexOf(b),
                    f = -1 === e;
                return f ? a.push(b) : a.splice(e, 1), c.siblings("ul.dropdown-content").find("li").eq(b).toggleClass("active"), c.find("option").eq(b).prop("selected", f), d(a, c), f }

            function d(a, b) {
                for (var c = "", d = 0, e = a.length; e > d; d++) {
                    var f = b.find("option").eq(a[d]).text();
                    c += 0 === d ? f : ", " + f } "" === c && (c = b.find("option:disabled").eq(0).text()), b.siblings("input.select-dropdown").val(c) }
            a(this).each(function() {
                var d = a(this);
                if (!d.hasClass("browser-default")) {
                    var e = d.attr("multiple") ? !0 : !1,
                        f = d.data("select-id");
                    if (f && (d.parent().find("span.caret").remove(), d.parent().find("input").remove(), d.unwrap(), a("ul#select-options-" + f).remove()), "destroy" === b) return void d.data("select-id", null).removeClass("initialized");
                    var g = Materialize.guid();
                    d.data("select-id", g);
                    var h = a('<div class="select-wrapper"></div>');
                    h.addClass(d.attr("class"));
                    var i = a('<ul id="select-options-' + g + '" class="dropdown-content select-dropdown ' + (e ? "multiple-select-dropdown" : "") + '"></ul>'),
                        j = d.children("option, optgroup"),
                        k = [],
                        l = !1,
                        m = d.find("option:selected").html() || d.find("option:first").html() || "",
                        n = function(b, c, d) {
                            var e = c.is(":disabled") ? "disabled " : "",
                                f = c.data("icon"),
                                g = c.attr("class");
                            if (f) {
                                var h = "";
                                return g && (h = ' class="' + g + '"'), "multiple" === d ? i.append(a('<li class="' + e + '"><img src="' + f + '"' + h + '><span><input type="checkbox"' + e + "/><label></label>" + c.html() + "</span></li>")) : i.append(a('<li class="' + e + '"><img src="' + f + '"' + h + "><span>" + c.html() + "</span></li>")), !0 } "multiple" === d ? i.append(a('<li class="' + e + '"><span><input type="checkbox"' + e + "/><label></label>" + c.html() + "</span></li>")) : i.append(a('<li class="' + e + '"><span>' + c.html() + "</span></li>")) };
                    j.length && j.each(function() {
                        if (a(this).is("option")) e ? n(d, a(this), "multiple") : n(d, a(this));
                        else if (a(this).is("optgroup")) {
                            var b = a(this).children("option");
                            i.append(a('<li class="optgroup"><span>' + a(this).attr("label") + "</span></li>")), b.each(function() { n(d, a(this)) }) } }), i.find("li:not(.optgroup)").each(function(f) { a(this).click(function(g) {
                            if (!a(this).hasClass("disabled") && !a(this).hasClass("optgroup")) {
                                var h = !0;
                                e ? (a('input[type="checkbox"]', this).prop("checked", function(a, b) {
                                    return !b }), h = c(k, a(this).index(), d), q.trigger("focus")) : (i.find("li").removeClass("active"), a(this).toggleClass("active"), q.val(a(this).text())), activateOption(i, a(this)), d.find("option").eq(f).prop("selected", h), d.trigger("change"), "undefined" != typeof b && b() }
                            g.stopPropagation() }) }), d.wrap(h);
                    var o = a('<span class="caret">&#9660;</span>');
                    d.is(":disabled") && o.addClass("disabled");
                    var p = m.replace(/"/g, "&quot;"),
                        q = a('<input type="text" class="select-dropdown" readonly="true" ' + (d.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + g + '" value="' + p + '"/>');
                    d.before(q), q.before(o), q.after(i), d.is(":disabled") || q.dropdown({ hover: !1, closeOnClick: !1 }), d.attr("tabindex") && a(q[0]).attr("tabindex", d.attr("tabindex")), d.addClass("initialized"), q.on({ focus: function() {
                            if (a("ul.select-dropdown").not(i[0]).is(":visible") && a("input.select-dropdown").trigger("close"), !i.is(":visible")) { a(this).trigger("open", ["focus"]);
                                var b = a(this).val(),
                                    c = i.find("li").filter(function() {
                                        return a(this).text().toLowerCase() === b.toLowerCase() })[0];
                                activateOption(i, c) } }, click: function(a) { a.stopPropagation() } }), q.on("blur", function() { e || a(this).trigger("close"), i.find("li.selected").removeClass("selected") }), i.hover(function() { l = !0 }, function() { l = !1 }), a(window).on({ click: function() { e && (l || q.trigger("close")) } }), e && d.find("option:selected:not(:disabled)").each(function() {
                        var b = a(this).index();
                        c(k, b, d), i.find("li").eq(b).find(":checkbox").prop("checked", !0) }), activateOption = function(b, c) {
                        if (c) { b.find("li.selected").removeClass("selected");
                            var d = a(c);
                            d.addClass("selected"), i.scrollTo(d) } };
                    var r = [],
                        s = function(b) {
                            if (9 == b.which) return void q.trigger("close");
                            if (40 == b.which && !i.is(":visible")) return void q.trigger("open");
                            if (13 != b.which || i.is(":visible")) { b.preventDefault();
                                var c = String.fromCharCode(b.which).toLowerCase(),
                                    d = [9, 13, 27, 38, 40];
                                if (c && -1 === d.indexOf(b.which)) { r.push(c);
                                    var f = r.join(""),
                                        g = i.find("li").filter(function() {
                                            return 0 === a(this).text().toLowerCase().indexOf(f) })[0];
                                    g && activateOption(i, g) }
                                if (13 == b.which) {
                                    var h = i.find("li.selected:not(.disabled)")[0];
                                    h && (a(h).trigger("click"), e || q.trigger("close")) }
                                40 == b.which && (g = i.find("li.selected").length ? i.find("li.selected").next("li:not(.disabled)")[0] : i.find("li:not(.disabled)")[0], activateOption(i, g)), 27 == b.which && q.trigger("close"), 38 == b.which && (g = i.find("li.selected").prev("li:not(.disabled)")[0], g && activateOption(i, g)), setTimeout(function() { r = [] }, 1e3) } };
                    q.on("keydown", s) } }) } }(jQuery),
    function(a) {
        var b = {
            init: function(b) {
                var c = { indicators: !0, height: 400, transition: 500, interval: 6e3 };
                return b = a.extend(c, b), this.each(function() {
                    function c(a, b) { a.hasClass("center-align") ? a.velocity({ opacity: 0, translateY: -100 }, { duration: b, queue: !1 }) : a.hasClass("right-align") ? a.velocity({ opacity: 0, translateX: 100 }, { duration: b, queue: !1 }) : a.hasClass("left-align") && a.velocity({ opacity: 0, translateX: -100 }, { duration: b, queue: !1 }) }

                    function d(a) { a >= j.length ? a = 0 : 0 > a && (a = j.length - 1), k = i.find(".active").index(), k != a && (e = j.eq(k), $caption = e.find(".caption"), e.removeClass("active"), e.velocity({ opacity: 0 }, { duration: b.transition, queue: !1, easing: "easeOutQuad", complete: function() { j.not(".active").velocity({ opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: !1 }) } }), c($caption, b.transition), b.indicators && f.eq(k).removeClass("active"), j.eq(a).velocity({ opacity: 1 }, { duration: b.transition, queue: !1, easing: "easeOutQuad" }), j.eq(a).find(".caption").velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: b.transition, delay: b.transition, queue: !1, easing: "easeOutQuad" }), j.eq(a).addClass("active"), b.indicators && f.eq(a).addClass("active")) }
                    var e, f, g, h = a(this),
                        i = h.find("ul.slides").first(),
                        j = i.find("li"),
                        k = i.find(".active").index(); - 1 != k && (e = j.eq(k)), h.hasClass("fullscreen") || (b.indicators ? h.height(b.height + 40) : h.height(b.height), i.height(b.height)), j.find(".caption").each(function() { c(a(this), 0) }), j.find("img").each(function() {
                        var b = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                        a(this).attr("src") !== b && (a(this).css("background-image", "url(" + a(this).attr("src") + ")"), a(this).attr("src", b))
                    }), b.indicators && (f = a('<ul class="indicators"></ul>'), j.each(function(c) {
                        var e = a('<li class="indicator-item"></li>');
                        e.click(function() {
                            var c = i.parent(),
                                e = c.find(a(this)).index();
                            d(e), clearInterval(g), g = setInterval(function() { k = i.find(".active").index(), j.length == k + 1 ? k = 0 : k += 1, d(k) }, b.transition + b.interval) }), f.append(e) }), h.append(f), f = h.find("ul.indicators").find("li.indicator-item")), e ? e.show() : (j.first().addClass("active").velocity({ opacity: 1 }, { duration: b.transition, queue: !1, easing: "easeOutQuad" }), k = 0, e = j.eq(k), b.indicators && f.eq(k).addClass("active")), e.find("img").each(function() { e.find(".caption").velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: b.transition, queue: !1, easing: "easeOutQuad" }) }), g = setInterval(function() { k = i.find(".active").index(), d(k + 1) }, b.transition + b.interval);
                    var l = !1,
                        m = !1,
                        n = !1;
                    h.hammer({ prevent_default: !1 }).bind("pan", function(a) {
                        if ("touch" === a.gesture.pointerType) { clearInterval(g);
                            var b = a.gesture.direction,
                                c = a.gesture.deltaX,
                                d = a.gesture.velocityX;
                            $curr_slide = i.find(".active"), $curr_slide.velocity({ translateX: c }, { duration: 50, queue: !1, easing: "easeOutQuad" }), 4 === b && (c > h.innerWidth() / 2 || -.65 > d) ? n = !0 : 2 === b && (c < -1 * h.innerWidth() / 2 || d > .65) && (m = !0);
                            var e;
                            m && (e = $curr_slide.next(), 0 === e.length && (e = j.first()), e.velocity({ opacity: 1 }, { duration: 300, queue: !1, easing: "easeOutQuad" })), n && (e = $curr_slide.prev(), 0 === e.length && (e = j.last()), e.velocity({ opacity: 1 }, { duration: 300, queue: !1, easing: "easeOutQuad" })) } }).bind("panend", function(a) { "touch" === a.gesture.pointerType && ($curr_slide = i.find(".active"), l = !1, curr_index = i.find(".active").index(), n || m ? m ? (d(curr_index + 1), $curr_slide.velocity({ translateX: -1 * h.innerWidth() }, { duration: 300, queue: !1, easing: "easeOutQuad", complete: function() { $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: !1 }) } })) : n && (d(curr_index - 1), $curr_slide.velocity({ translateX: h.innerWidth() }, { duration: 300, queue: !1, easing: "easeOutQuad", complete: function() { $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: !1 }) } })) : $curr_slide.velocity({ translateX: 0 }, { duration: 300, queue: !1, easing: "easeOutQuad" }), m = !1, n = !1, clearInterval(g), g = setInterval(function() { k = i.find(".active").index(), j.length == k + 1 ? k = 0 : k += 1, d(k) }, b.transition + b.interval)) }), h.on("sliderPause", function() { clearInterval(g) }), h.on("sliderStart", function() { clearInterval(g), g = setInterval(function() { k = i.find(".active").index(), j.length == k + 1 ? k = 0 : k += 1, d(k) }, b.transition + b.interval) }), h.on("sliderNext", function() { k = i.find(".active").index(), d(k + 1) }), h.on("sliderPrev", function() { k = i.find(".active").index(), d(k - 1) })
                })
            },
            pause: function() { a(this).trigger("sliderPause") },
            start: function() { a(this).trigger("sliderStart") },
            next: function() { a(this).trigger("sliderNext") },
            prev: function() { a(this).trigger("sliderPrev") }
        };
        a.fn.slider = function(c) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.tooltip") : b.init.apply(this, arguments) }
    }(jQuery),
    function(a) { a(document).ready(function() { a(document).on("click.card", ".card", function(b) { a(this).find("> .card-reveal").length && (a(b.target).is(a(".card-reveal .card-title")) || a(b.target).is(a(".card-reveal .card-title i")) ? a(this).find(".card-reveal").velocity({ translateY: 0 }, { duration: 225, queue: !1, easing: "easeInOutQuad", complete: function() { a(this).css({ display: "none" }) } }) : (a(b.target).is(a(".card .activator")) || a(b.target).is(a(".card .activator i"))) && (a(b.target).closest(".card").css("overflow", "hidden"), a(this).find(".card-reveal").css({ display: "block" }).velocity("stop", !1).velocity({ translateY: "-100%" }, { duration: 300, queue: !1, easing: "easeInOutQuad" }))), a(".card-reveal").closest(".card").css("overflow", "hidden") }) }) }(jQuery),
    function(a) { a(document).ready(function() { a(document).on("click.chip", ".chip .material-icons", function(b) { a(this).parent().remove() }) }) }(jQuery),
    function(a) { a(document).ready(function() { a.fn.pushpin = function(b) {
                var c = { top: 0, bottom: 1 / 0, offset: 0 };
                return b = a.extend(c, b), $index = 0, this.each(function() {
                    function c(a) { a.removeClass("pin-top"), a.removeClass("pinned"), a.removeClass("pin-bottom") }

                    function d(d, e) { d.each(function() { b.top <= e && b.bottom >= e && !a(this).hasClass("pinned") && (c(a(this)), a(this).css("top", b.offset), a(this).addClass("pinned")), e < b.top && !a(this).hasClass("pin-top") && (c(a(this)), a(this).css("top", 0), a(this).addClass("pin-top")), e > b.bottom && !a(this).hasClass("pin-bottom") && (c(a(this)), a(this).addClass("pin-bottom"), a(this).css("top", b.bottom - g)) }) }
                    var e = Materialize.guid(),
                        f = a(this),
                        g = a(this).offset().top;
                    d(f, a(window).scrollTop()), a(window).on("scroll." + e, function() {
                        var c = a(window).scrollTop() + b.offset;
                        d(f, c) }) }) } }) }(jQuery),
    function(a) { a(document).ready(function() { a.fn.reverse = [].reverse, a(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(c) {
                var d = a(this);
                b(d) }), a(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(b) {
                var d = a(this);
                c(d) }), a(document).on("click.fixedActionBtn", ".fixed-action-btn.click-to-toggle > a", function(d) {
                var e = a(this),
                    f = e.parent();
                f.hasClass("active") ? c(f) : b(f) }) }), a.fn.extend({ openFAB: function() { b(a(this)) }, closeFAB: function() { c(a(this)) } });
        var b = function(b) {
                if ($this = b, $this.hasClass("active") === !1) {
                    var c, d, e = $this.hasClass("horizontal");
                    e === !0 ? d = 40 : c = 40, $this.addClass("active"), $this.find("ul .btn-floating").velocity({ scaleY: ".4", scaleX: ".4", translateY: c + "px", translateX: d + "px" }, { duration: 0 });
                    var f = 0;
                    $this.find("ul .btn-floating").reverse().each(function() { a(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: "0" }, { duration: 80, delay: f }), f += 40 }) } },
            c = function(a) { $this = a;
                var b, c, d = $this.hasClass("horizontal");
                d === !0 ? c = 40 : b = 40, $this.removeClass("active");
                $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: b + "px", translateX: c + "px" }, { duration: 80 }) } }(jQuery),
    function(a) { Materialize.fadeInImage = function(b) {
            var c = a(b);
            c.css({ opacity: 0 }), a(c).velocity({ opacity: 1 }, { duration: 650, queue: !1, easing: "easeOutSine" }), a(c).velocity({ opacity: 1 }, { duration: 1300, queue: !1, easing: "swing", step: function(b, c) { c.start = 100;
                    var d = b / 100,
                        e = 150 - (100 - b) / 1.75;
                    100 > e && (e = 100), b >= 0 && a(this).css({ "-webkit-filter": "grayscale(" + d + ")brightness(" + e + "%)", filter: "grayscale(" + d + ")brightness(" + e + "%)" }) } }) }, Materialize.showStaggeredList = function(b) {
            var c = 0;
            a(b).find("li").velocity({ translateX: "-100px" }, { duration: 0 }), a(b).find("li").each(function() { a(this).velocity({ opacity: "1", translateX: "0" }, { duration: 800, delay: c, easing: [60, 10] }), c += 120 }) }, a(document).ready(function() {
            var b = !1,
                c = !1;
            a(".dismissable").each(function() { a(this).hammer({ prevent_default: !1 }).bind("pan", function(d) {
                    if ("touch" === d.gesture.pointerType) {
                        var e = a(this),
                            f = d.gesture.direction,
                            g = d.gesture.deltaX,
                            h = d.gesture.velocityX;
                        e.velocity({ translateX: g }, { duration: 50, queue: !1, easing: "easeOutQuad" }), 4 === f && (g > e.innerWidth() / 2 || -.75 > h) && (b = !0), 2 === f && (g < -1 * e.innerWidth() / 2 || h > .75) && (c = !0) } }).bind("panend", function(d) {
                    if (Math.abs(d.gesture.deltaX) < a(this).innerWidth() / 2 && (c = !1, b = !1), "touch" === d.gesture.pointerType) {
                        var e = a(this);
                        if (b || c) {
                            var f;
                            f = b ? e.innerWidth() : -1 * e.innerWidth(), e.velocity({ translateX: f }, { duration: 100, queue: !1, easing: "easeOutQuad", complete: function() { e.css("border", "none"), e.velocity({ height: 0, padding: 0 }, { duration: 200, queue: !1, easing: "easeOutQuad", complete: function() { e.remove() } }) } }) } else e.velocity({ translateX: 0 }, { duration: 100, queue: !1, easing: "easeOutQuad" });
                        b = !1, c = !1 } }) }) }) }(jQuery),
    function(a) { Materialize.scrollFire = function(a) {
            var b = !1;
            window.addEventListener("scroll", function() { b = !0 }), setInterval(function() {
                if (b) { b = !1;
                    for (var c = window.pageYOffset + window.innerHeight, d = 0; d < a.length; d++) {
                        var e = a[d],
                            f = e.selector,
                            g = e.offset,
                            h = e.callback,
                            i = document.querySelector(f);
                        if (null !== i) {
                            var j = i.getBoundingClientRect().top + window.pageYOffset;
                            if (c > j + g && e.done !== !0) {
                                var k = new Function(h);
                                k(), e.done = !0 } } } } }, 100) } }(jQuery),
    function(a) { "function" == typeof define && define.amd ? define("picker", ["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : this.Picker = a(jQuery) }(function(a) {
        function b(f, g, i, l) {
            function m() {
                return b._.node("div", b._.node("div", b._.node("div", b._.node("div", y.component.nodes(t.open), v.box), v.wrap), v.frame), v.holder) }

            function n() { w.data(g, y).addClass(v.input).attr("tabindex", -1).val(w.data("value") ? y.get("select", u.format) : f.value), u.editable || w.on("focus." + t.id + " click." + t.id, function(a) { a.preventDefault(), y.$root[0].focus() }).on("keydown." + t.id, q), e(f, { haspopup: !0, expanded: !1, readonly: !1, owns: f.id + "_root" }) }

            function o() { y.$root.on({ keydown: q, focusin: function(a) { y.$root.removeClass(v.focused), a.stopPropagation() }, "mousedown click": function(b) {
                        var c = b.target;
                        c != y.$root.children()[0] && (b.stopPropagation(), "mousedown" != b.type || a(c).is("input, select, textarea, button, option") || (b.preventDefault(), y.$root[0].focus())) } }).on({ focus: function() { w.addClass(v.target) }, blur: function() { w.removeClass(v.target) } }).on("focus.toOpen", r).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
                    var b = a(this),
                        c = b.data(),
                        d = b.hasClass(v.navDisabled) || b.hasClass(v.disabled),
                        e = h();
                    e = e && (e.type || e.href), (d || e && !a.contains(y.$root[0], e)) && y.$root[0].focus(), !d && c.nav ? y.set("highlight", y.component.item.highlight, { nav: c.nav }) : !d && "pick" in c ? y.set("select", c.pick) : c.clear ? y.clear().close(!0) : c.close && y.close(!0) }), e(y.$root[0], "hidden", !0) }

            function p() {
                var b;
                u.hiddenName === !0 ? (b = f.name, f.name = "") : (b = ["string" == typeof u.hiddenPrefix ? u.hiddenPrefix : "", "string" == typeof u.hiddenSuffix ? u.hiddenSuffix : "_submit"], b = b[0] + f.name + b[1]), y._hidden = a('<input type=hidden name="' + b + '"' + (w.data("value") || f.value ? ' value="' + y.get("select", u.formatSubmit) + '"' : "") + ">")[0], w.on("change." + t.id, function() { y._hidden.value = f.value ? y.get("select", u.formatSubmit) : "" }), u.container ? a(u.container).append(y._hidden) : w.after(y._hidden) }

            function q(a) {
                var b = a.keyCode,
                    c = /^(8|46)$/.test(b);
                return 27 == b ? (y.close(), !1) : void((32 == b || c || !t.open && y.component.key[b]) && (a.preventDefault(), a.stopPropagation(), c ? y.clear().close() : y.open())) }

            function r(a) { a.stopPropagation(), "focus" == a.type && y.$root.addClass(v.focused), y.open() }
            if (!f) return b;
            var s = !1,
                t = { id: f.id || "P" + Math.abs(~~(Math.random() * new Date)) },
                u = i ? a.extend(!0, {}, i.defaults, l) : l || {},
                v = a.extend({}, b.klasses(), u.klass),
                w = a(f),
                x = function() {
                    return this.start() },
                y = x.prototype = { constructor: x, $node: w, start: function() {
                        return t && t.start ? y : (t.methods = {}, t.start = !0, t.open = !1, t.type = f.type, f.autofocus = f == h(), f.readOnly = !u.editable, f.id = f.id || t.id, "text" != f.type && (f.type = "text"), y.component = new i(y, u), y.$root = a(b._.node("div", m(), v.picker, 'id="' + f.id + '_root" tabindex="0"')), o(), u.formatSubmit && p(), n(), u.container ? a(u.container).append(y.$root) : w.after(y.$root), y.on({ start: y.component.onStart, render: y.component.onRender, stop: y.component.onStop, open: y.component.onOpen, close: y.component.onClose, set: y.component.onSet }).on({ start: u.onStart, render: u.onRender, stop: u.onStop, open: u.onOpen, close: u.onClose, set: u.onSet }), s = c(y.$root.children()[0]), f.autofocus && y.open(), y.trigger("start").trigger("render")) }, render: function(a) {
                        return a ? y.$root.html(m()) : y.$root.find("." + v.box).html(y.component.nodes(t.open)), y.trigger("render") }, stop: function() {
                        return t.start ? (y.close(), y._hidden && y._hidden.parentNode.removeChild(y._hidden), y.$root.remove(), w.removeClass(v.input).removeData(g), setTimeout(function() { w.off("." + t.id) }, 0), f.type = t.type, f.readOnly = !1, y.trigger("stop"), t.methods = {}, t.start = !1, y) : y }, open: function(c) {
                        return t.open ? y : (w.addClass(v.active), e(f, "expanded", !0), setTimeout(function() { y.$root.addClass(v.opened), e(y.$root[0], "hidden", !1) }, 0), c !== !1 && (t.open = !0, s && k.css("overflow", "hidden").css("padding-right", "+=" + d()), y.$root[0].focus(), j.on("click." + t.id + " focusin." + t.id, function(a) {
                            var b = a.target;
                            b != f && b != document && 3 != a.which && y.close(b === y.$root.children()[0]) }).on("keydown." + t.id, function(c) {
                            var d = c.keyCode,
                                e = y.component.key[d],
                                f = c.target;
                            27 == d ? y.close(!0) : f != y.$root[0] || !e && 13 != d ? a.contains(y.$root[0], f) && 13 == d && (c.preventDefault(), f.click()) : (c.preventDefault(), e ? b._.trigger(y.component.key.go, y, [b._.trigger(e)]) : y.$root.find("." + v.highlighted).hasClass(v.disabled) || y.set("select", y.component.item.highlight).close()) })), y.trigger("open")) }, close: function(a) {
                        return a && (y.$root.off("focus.toOpen")[0].focus(), setTimeout(function() { y.$root.on("focus.toOpen", r) }, 0)), w.removeClass(v.active), e(f, "expanded", !1), setTimeout(function() { y.$root.removeClass(v.opened + " " + v.focused), e(y.$root[0], "hidden", !0) }, 0), t.open ? (t.open = !1, s && k.css("overflow", "").css("padding-right", "-=" + d()), j.off("." + t.id), y.trigger("close")) : y }, clear: function(a) {
                        return y.set("clear", null, a) }, set: function(b, c, d) {
                        var e, f, g = a.isPlainObject(b),
                            h = g ? b : {};
                        if (d = g && a.isPlainObject(c) ? c : d || {}, b) { g || (h[b] = c);
                            for (e in h) f = h[e], e in y.component.item && (void 0 === f && (f = null), y.component.set(e, f, d)), ("select" == e || "clear" == e) && w.val("clear" == e ? "" : y.get(e, u.format)).trigger("change");
                            y.render() }
                        return d.muted ? y : y.trigger("set", h) }, get: function(a, c) {
                        if (a = a || "value", null != t[a]) return t[a];
                        if ("valueSubmit" == a) {
                            if (y._hidden) return y._hidden.value;
                            a = "value" }
                        if ("value" == a) return f.value;
                        if (a in y.component.item) {
                            if ("string" == typeof c) {
                                var d = y.component.get(a);
                                return d ? b._.trigger(y.component.formats.toString, y.component, [c, d]) : "" }
                            return y.component.get(a) } }, on: function(b, c, d) {
                        var e, f, g = a.isPlainObject(b),
                            h = g ? b : {};
                        if (b) { g || (h[b] = c);
                            for (e in h) f = h[e], d && (e = "_" + e), t.methods[e] = t.methods[e] || [], t.methods[e].push(f) }
                        return y }, off: function() {
                        var a, b, c = arguments;
                        for (a = 0, namesCount = c.length; a < namesCount; a += 1) b = c[a], b in t.methods && delete t.methods[b];
                        return y }, trigger: function(a, c) {
                        var d = function(a) {
                            var d = t.methods[a];
                            d && d.map(function(a) { b._.trigger(a, y, [c]) }) };
                        return d("_" + a), d(a), y } };
            return new x }

        function c(a) {
            var b, c = "position";
            return a.currentStyle ? b = a.currentStyle[c] : window.getComputedStyle && (b = getComputedStyle(a)[c]), "fixed" == b }

        function d() {
            if (k.height() <= i.height()) return 0;
            var b = a('<div style="visibility:hidden;width:100px" />').appendTo("body"),
                c = b[0].offsetWidth;
            b.css("overflow", "scroll");
            var d = a('<div style="width:100%" />').appendTo(b),
                e = d[0].offsetWidth;
            return b.remove(), c - e }

        function e(b, c, d) {
            if (a.isPlainObject(c))
                for (var e in c) f(b, e, c[e]);
            else f(b, c, d) }

        function f(a, b, c) { a.setAttribute(("role" == b ? "" : "aria-") + b, c) }

        function g(b, c) { a.isPlainObject(b) || (b = { attribute: c }), c = "";
            for (var d in b) {
                var e = ("role" == d ? "" : "aria-") + d,
                    f = b[d];
                c += null == f ? "" : e + '="' + b[d] + '"' }
            return c }

        function h() {
            try {
                return document.activeElement } catch (a) {} }
        var i = a(window),
            j = a(document),
            k = a(document.documentElement);
        return b.klasses = function(a) {
            return a = a || "picker", { picker: a, opened: a + "--opened", focused: a + "--focused", input: a + "__input", active: a + "__input--active", target: a + "__input--target", holder: a + "__holder", frame: a + "__frame", wrap: a + "__wrap", box: a + "__box" } }, b._ = { group: function(a) {
                for (var c, d = "", e = b._.trigger(a.min, a); e <= b._.trigger(a.max, a, [e]); e += a.i) c = b._.trigger(a.item, a, [e]), d += b._.node(a.node, c[0], c[1], c[2]);
                return d }, node: function(b, c, d, e) {
                return c ? (c = a.isArray(c) ? c.join("") : c, d = d ? ' class="' + d + '"' : "", e = e ? " " + e : "", "<" + b + d + e + ">" + c + "</" + b + ">") : "" }, lead: function(a) {
                return (10 > a ? "0" : "") + a }, trigger: function(a, b, c) {
                return "function" == typeof a ? a.apply(b, c || []) : a }, digits: function(a) {
                return /\d/.test(a[1]) ? 2 : 1 }, isDate: function(a) {
                return {}.toString.call(a).indexOf("Date") > -1 && this.isInteger(a.getDate()) }, isInteger: function(a) {
                return {}.toString.call(a).indexOf("Number") > -1 && a % 1 === 0 }, ariaAttr: g }, b.extend = function(c, d) { a.fn[c] = function(e, f) {
                var g = this.data(c);
                return "picker" == e ? g : g && "string" == typeof e ? b._.trigger(g[e], g, [f]) : this.each(function() {
                    var f = a(this);
                    f.data(c) || new b(this, c, d, e) }) }, a.fn[c].defaults = d.defaults }, b }),
    function(a) { "function" == typeof define && define.amd ? define(["picker", "jquery"], a) : "object" == typeof exports ? module.exports = a(require("./picker.js"), require("jquery")) : a(Picker, jQuery) }(function(a, b) {
        function c(a, b) {
            var c = this,
                d = a.$node[0],
                e = d.value,
                f = a.$node.data("value"),
                g = f || e,
                h = f ? b.formatSubmit : b.format,
                i = function() {
                    return d.currentStyle ? "rtl" == d.currentStyle.direction : "rtl" == getComputedStyle(a.$root[0]).direction };
            c.settings = b, c.$node = a.$node, c.queue = { min: "measure create", max: "measure create", now: "now create", select: "parse create validate", highlight: "parse navigate create validate", view: "parse create validate viewset", disable: "deactivate", enable: "activate" }, c.item = {}, c.item.clear = null, c.item.disable = (b.disable || []).slice(0), c.item.enable = - function(a) {
                return a[0] === !0 ? a.shift() : -1 }(c.item.disable), c.set("min", b.min).set("max", b.max).set("now"), g ? c.set("select", g, { format: h }) : c.set("select", null).set("highlight", c.item.now), c.key = { 40: 7, 38: -7, 39: function() {
                    return i() ? -1 : 1 }, 37: function() {
                    return i() ? 1 : -1 }, go: function(a) {
                    var b = c.item.highlight,
                        d = new Date(b.year, b.month, b.date + a);
                    c.set("highlight", d, { interval: a }), this.render() } }, a.on("render", function() { a.$root.find("." + b.klass.selectMonth).on("change", function() {
                    var c = this.value;
                    c && (a.set("highlight", [a.get("view").year, c, a.get("highlight").date]), a.$root.find("." + b.klass.selectMonth).trigger("focus")) }), a.$root.find("." + b.klass.selectYear).on("change", function() {
                    var c = this.value;
                    c && (a.set("highlight", [c, a.get("view").month, a.get("highlight").date]), a.$root.find("." + b.klass.selectYear).trigger("focus")) }) }, 1).on("open", function() {
                var d = "";
                c.disabled(c.get("now")) && (d = ":not(." + b.klass.buttonToday + ")"), a.$root.find("button" + d + ", select").attr("disabled", !1) }, 1).on("close", function() { a.$root.find("button, select").attr("disabled", !0) }, 1) }
        var d = 7,
            e = 6,
            f = a._;
        c.prototype.set = function(a, b, c) {
            var d = this,
                e = d.item;
            return null === b ? ("clear" == a && (a = "select"), e[a] = b, d) : (e["enable" == a ? "disable" : "flip" == a ? "enable" : a] = d.queue[a].split(" ").map(function(e) {
                return b = d[e](a, b, c) }).pop(), "select" == a ? d.set("highlight", e.select, c) : "highlight" == a ? d.set("view", e.highlight, c) : a.match(/^(flip|min|max|disable|enable)$/) && (e.select && d.disabled(e.select) && d.set("select", e.select, c), e.highlight && d.disabled(e.highlight) && d.set("highlight", e.highlight, c)), d) }, c.prototype.get = function(a) {
            return this.item[a] }, c.prototype.create = function(a, c, d) {
            var e, g = this;
            return c = void 0 === c ? a : c, c == -(1 / 0) || c == 1 / 0 ? e = c : b.isPlainObject(c) && f.isInteger(c.pick) ? c = c.obj : b.isArray(c) ? (c = new Date(c[0], c[1], c[2]), c = f.isDate(c) ? c : g.create().obj) : c = f.isInteger(c) || f.isDate(c) ? g.normalize(new Date(c), d) : g.now(a, c, d), { year: e || c.getFullYear(), month: e || c.getMonth(), date: e || c.getDate(), day: e || c.getDay(), obj: e || c, pick: e || c.getTime() } }, c.prototype.createRange = function(a, c) {
            var d = this,
                e = function(a) {
                    return a === !0 || b.isArray(a) || f.isDate(a) ? d.create(a) : a };
            return f.isInteger(a) || (a = e(a)), f.isInteger(c) || (c = e(c)), f.isInteger(a) && b.isPlainObject(c) ? a = [c.year, c.month, c.date + a] : f.isInteger(c) && b.isPlainObject(a) && (c = [a.year, a.month, a.date + c]), { from: e(a), to: e(c) } }, c.prototype.withinRange = function(a, b) {
            return a = this.createRange(a.from, a.to), b.pick >= a.from.pick && b.pick <= a.to.pick }, c.prototype.overlapRanges = function(a, b) {
            var c = this;
            return a = c.createRange(a.from, a.to), b = c.createRange(b.from, b.to), c.withinRange(a, b.from) || c.withinRange(a, b.to) || c.withinRange(b, a.from) || c.withinRange(b, a.to) }, c.prototype.now = function(a, b, c) {
            return b = new Date, c && c.rel && b.setDate(b.getDate() + c.rel), this.normalize(b, c) }, c.prototype.navigate = function(a, c, d) {
            var e, f, g, h, i = b.isArray(c),
                j = b.isPlainObject(c),
                k = this.item.view;
            if (i || j) {
                for (j ? (f = c.year, g = c.month, h = c.date) : (f = +c[0], g = +c[1], h = +c[2]), d && d.nav && k && k.month !== g && (f = k.year, g = k.month), e = new Date(f, g + (d && d.nav ? d.nav : 0), 1), f = e.getFullYear(), g = e.getMonth(); new Date(f, g, h).getMonth() !== g;) h -= 1;
                c = [f, g, h] }
            return c }, c.prototype.normalize = function(a) {
            return a.setHours(0, 0, 0, 0), a }, c.prototype.measure = function(a, b) {
            var c = this;
            return b ? "string" == typeof b ? b = c.parse(a, b) : f.isInteger(b) && (b = c.now(a, b, { rel: b })) : b = "min" == a ? -(1 / 0) : 1 / 0, b }, c.prototype.viewset = function(a, b) {
            return this.create([b.year, b.month, 1]) }, c.prototype.validate = function(a, c, d) {
            var e, g, h, i, j = this,
                k = c,
                l = d && d.interval ? d.interval : 1,
                m = -1 === j.item.enable,
                n = j.item.min,
                o = j.item.max,
                p = m && j.item.disable.filter(function(a) {
                    if (b.isArray(a)) {
                        var d = j.create(a).pick;
                        d < c.pick ? e = !0 : d > c.pick && (g = !0) }
                    return f.isInteger(a) }).length;
            if ((!d || !d.nav) && (!m && j.disabled(c) || m && j.disabled(c) && (p || e || g) || !m && (c.pick <= n.pick || c.pick >= o.pick)))
                for (m && !p && (!g && l > 0 || !e && 0 > l) && (l *= -1); j.disabled(c) && (Math.abs(l) > 1 && (c.month < k.month || c.month > k.month) && (c = k, l = l > 0 ? 1 : -1), c.pick <= n.pick ? (h = !0, l = 1, c = j.create([n.year, n.month, n.date + (c.pick === n.pick ? 0 : -1)])) : c.pick >= o.pick && (i = !0, l = -1, c = j.create([o.year, o.month, o.date + (c.pick === o.pick ? 0 : 1)])), !h || !i);) c = j.create([c.year, c.month, c.date + l]);
            return c }, c.prototype.disabled = function(a) {
            var c = this,
                d = c.item.disable.filter(function(d) {
                    return f.isInteger(d) ? a.day === (c.settings.firstDay ? d : d - 1) % 7 : b.isArray(d) || f.isDate(d) ? a.pick === c.create(d).pick : b.isPlainObject(d) ? c.withinRange(d, a) : void 0 });
            return d = d.length && !d.filter(function(a) {
                return b.isArray(a) && "inverted" == a[3] || b.isPlainObject(a) && a.inverted }).length, -1 === c.item.enable ? !d : d || a.pick < c.item.min.pick || a.pick > c.item.max.pick }, c.prototype.parse = function(a, b, c) {
            var d = this,
                e = {};
            return b && "string" == typeof b ? (c && c.format || (c = c || {}, c.format = d.settings.format), d.formats.toArray(c.format).map(function(a) {
                var c = d.formats[a],
                    g = c ? f.trigger(c, d, [b, e]) : a.replace(/^!/, "").length;
                c && (e[a] = b.substr(0, g)), b = b.substr(g) }), [e.yyyy || e.yy, +(e.mm || e.m) - 1, e.dd || e.d]) : b }, c.prototype.formats = function() {
            function a(a, b, c) {
                var d = a.match(/\w+/)[0];
                return c.mm || c.m || (c.m = b.indexOf(d) + 1), d.length }

            function b(a) {
                return a.match(/\w+/)[0].length }
            return { d: function(a, b) {
                    return a ? f.digits(a) : b.date }, dd: function(a, b) {
                    return a ? 2 : f.lead(b.date) }, ddd: function(a, c) {
                    return a ? b(a) : this.settings.weekdaysShort[c.day] }, dddd: function(a, c) {
                    return a ? b(a) : this.settings.weekdaysFull[c.day] }, m: function(a, b) {
                    return a ? f.digits(a) : b.month + 1 }, mm: function(a, b) {
                    return a ? 2 : f.lead(b.month + 1) }, mmm: function(b, c) {
                    var d = this.settings.monthsShort;
                    return b ? a(b, d, c) : d[c.month] }, mmmm: function(b, c) {
                    var d = this.settings.monthsFull;
                    return b ? a(b, d, c) : d[c.month] }, yy: function(a, b) {
                    return a ? 2 : ("" + b.year).slice(2) }, yyyy: function(a, b) {
                    return a ? 4 : b.year }, toArray: function(a) {
                    return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g) }, toString: function(a, b) {
                    var c = this;
                    return c.formats.toArray(a).map(function(a) {
                        return f.trigger(c.formats[a], c, [0, b]) || a.replace(/^!/, "") }).join("") } } }(), c.prototype.isDateExact = function(a, c) {
            var d = this;
            return f.isInteger(a) && f.isInteger(c) || "boolean" == typeof a && "boolean" == typeof c ? a === c : (f.isDate(a) || b.isArray(a)) && (f.isDate(c) || b.isArray(c)) ? d.create(a).pick === d.create(c).pick : b.isPlainObject(a) && b.isPlainObject(c) ? d.isDateExact(a.from, c.from) && d.isDateExact(a.to, c.to) : !1 }, c.prototype.isDateOverlap = function(a, c) {
            var d = this,
                e = d.settings.firstDay ? 1 : 0;
            return f.isInteger(a) && (f.isDate(c) || b.isArray(c)) ? (a = a % 7 + e, a === d.create(c).day + 1) : f.isInteger(c) && (f.isDate(a) || b.isArray(a)) ? (c = c % 7 + e, c === d.create(a).day + 1) : b.isPlainObject(a) && b.isPlainObject(c) ? d.overlapRanges(a, c) : !1 }, c.prototype.flipEnable = function(a) {
            var b = this.item;
            b.enable = a || (-1 == b.enable ? 1 : -1) }, c.prototype.deactivate = function(a, c) {
            var d = this,
                e = d.item.disable.slice(0);
            return "flip" == c ? d.flipEnable() : c === !1 ? (d.flipEnable(1), e = []) : c === !0 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
                for (var c, g = 0; g < e.length; g += 1)
                    if (d.isDateExact(a, e[g])) { c = !0;
                        break }
                c || (f.isInteger(a) || f.isDate(a) || b.isArray(a) || b.isPlainObject(a) && a.from && a.to) && e.push(a) }), e }, c.prototype.activate = function(a, c) {
            var d = this,
                e = d.item.disable,
                g = e.length;
            return "flip" == c ? d.flipEnable() : c === !0 ? (d.flipEnable(1), e = []) : c === !1 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
                var c, h, i, j;
                for (i = 0; g > i; i += 1) {
                    if (h = e[i], d.isDateExact(h, a)) { c = e[i] = null, j = !0;
                        break }
                    if (d.isDateOverlap(h, a)) { b.isPlainObject(a) ? (a.inverted = !0, c = a) : b.isArray(a) ? (c = a, c[3] || c.push("inverted")) : f.isDate(a) && (c = [a.getFullYear(), a.getMonth(), a.getDate(), "inverted"]);
                        break } }
                if (c)
                    for (i = 0; g > i; i += 1)
                        if (d.isDateExact(e[i], a)) { e[i] = null;
                            break }
                if (j)
                    for (i = 0; g > i; i += 1)
                        if (d.isDateOverlap(e[i], a)) { e[i] = null;
                            break }
                c && e.push(c) }), e.filter(function(a) {
                return null != a }) }, c.prototype.nodes = function(a) {
            var b = this,
                c = b.settings,
                g = b.item,
                h = g.now,
                i = g.select,
                j = g.highlight,
                k = g.view,
                l = g.disable,
                m = g.min,
                n = g.max,
                o = function(a, b) {
                    return c.firstDay && (a.push(a.shift()), b.push(b.shift())), f.node("thead", f.node("tr", f.group({ min: 0, max: d - 1, i: 1, node: "th", item: function(d) {
                            return [a[d], c.klass.weekdays, 'scope=col title="' + b[d] + '"'] } }))) }((c.showWeekdaysFull ? c.weekdaysFull : c.weekdaysLetter).slice(0), c.weekdaysFull.slice(0)),
                p = function(a) {
                    return f.node("div", " ", c.klass["nav" + (a ? "Next" : "Prev")] + (a && k.year >= n.year && k.month >= n.month || !a && k.year <= m.year && k.month <= m.month ? " " + c.klass.navDisabled : ""), "data-nav=" + (a || -1) + " " + f.ariaAttr({ role: "button", controls: b.$node[0].id + "_table" }) + ' title="' + (a ? c.labelMonthNext : c.labelMonthPrev) + '"') },
                q = function(d) {
                    var e = c.showMonthsShort ? c.monthsShort : c.monthsFull;
                    return "short_months" == d && (e = c.monthsShort), c.selectMonths && void 0 == d ? f.node("select", f.group({ min: 0, max: 11, i: 1, node: "option", item: function(a) {
                            return [e[a], 0, "value=" + a + (k.month == a ? " selected" : "") + (k.year == m.year && a < m.month || k.year == n.year && a > n.month ? " disabled" : "")] } }), c.klass.selectMonth + " browser-default", (a ? "" : "disabled") + " " + f.ariaAttr({ controls: b.$node[0].id + "_table" }) + ' title="' + c.labelMonthSelect + '"') : "short_months" == d ? null != i ? f.node("div", e[i.month]) : f.node("div", e[k.month]) : f.node("div", e[k.month], c.klass.month) },
                r = function(d) {
                    var e = k.year,
                        g = c.selectYears === !0 ? 5 : ~~(c.selectYears / 2);
                    if (g) {
                        var h = m.year,
                            i = n.year,
                            j = e - g,
                            l = e + g;
                        if (h > j && (l += h - j, j = h), l > i) {
                            var o = j - h,
                                p = l - i;
                            j -= o > p ? p : o, l = i }
                        if (c.selectYears && void 0 == d) return f.node("select", f.group({ min: j, max: l, i: 1, node: "option", item: function(a) {
                                return [a, 0, "value=" + a + (e == a ? " selected" : "")] } }), c.klass.selectYear + " browser-default", (a ? "" : "disabled") + " " + f.ariaAttr({ controls: b.$node[0].id + "_table" }) + ' title="' + c.labelYearSelect + '"') }
                    return "raw" == d ? f.node("div", e) : f.node("div", e, c.klass.year) };
            return createDayLabel = function() {
                return null != i ? f.node("div", i.date) : f.node("div", h.date) }, createWeekdayLabel = function() {
                var a;
                a = null != i ? i.day : h.day;
                var b = c.weekdaysFull[a];
                return b }, f.node("div", f.node("div", createWeekdayLabel(), "picker__weekday-display") + f.node("div", q("short_months"), c.klass.month_display) + f.node("div", createDayLabel(), c.klass.day_display) + f.node("div", r("raw"), c.klass.year_display), c.klass.date_display) + f.node("div", f.node("div", (c.selectYears ? q() + r() : q() + r()) + p() + p(1), c.klass.header) + f.node("table", o + f.node("tbody", f.group({ min: 0, max: e - 1, i: 1, node: "tr", item: function(a) {
                    var e = c.firstDay && 0 === b.create([k.year, k.month, 1]).day ? -7 : 0;
                    return [f.group({ min: d * a - k.day + e + 1, max: function() {
                            return this.min + d - 1 }, i: 1, node: "td", item: function(a) { a = b.create([k.year, k.month, a + (c.firstDay ? 1 : 0)]);
                            var d = i && i.pick == a.pick,
                                e = j && j.pick == a.pick,
                                g = l && b.disabled(a) || a.pick < m.pick || a.pick > n.pick,
                                o = f.trigger(b.formats.toString, b, [c.format, a]);
                            return [f.node("div", a.date, function(b) {
                                return b.push(k.month == a.month ? c.klass.infocus : c.klass.outfocus), h.pick == a.pick && b.push(c.klass.now), d && b.push(c.klass.selected), e && b.push(c.klass.highlighted), g && b.push(c.klass.disabled), b.join(" ") }([c.klass.day]), "data-pick=" + a.pick + " " + f.ariaAttr({ role: "gridcell", label: o, selected: d && b.$node.val() === o ? !0 : null, activedescendant: e ? !0 : null, disabled: g ? !0 : null })), "", f.ariaAttr({ role: "presentation" })] } })] } })), c.klass.table, 'id="' + b.$node[0].id + '_table" ' + f.ariaAttr({ role: "grid", controls: b.$node[0].id, readonly: !0 })), c.klass.calendar_container) + f.node("div", f.node("button", c.today, "btn-flat picker__today", "type=button data-pick=" + h.pick + (a && !b.disabled(h) ? "" : " disabled") + " " + f.ariaAttr({ controls: b.$node[0].id })) + f.node("button", c.clear, "btn-flat picker__clear", "type=button data-clear=1" + (a ? "" : " disabled") + " " + f.ariaAttr({ controls: b.$node[0].id })) + f.node("button", c.close, "btn-flat picker__close", "type=button data-close=true " + (a ? "" : " disabled") + " " + f.ariaAttr({ controls: b.$node[0].id })), c.klass.footer) }, c.defaults = function(a) {
            return { labelMonthNext: "Next month", labelMonthPrev: "Previous month", labelMonthSelect: "Select a month", labelYearSelect: "Select a year", monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], weekdaysLetter: ["S", "M", "T", "W", "T", "F", "S"], today: "Today", clear: "Clear", close: "Close", format: "d mmmm, yyyy", klass: { table: a + "table", header: a + "header", date_display: a + "date-display", day_display: a + "day-display", month_display: a + "month-display", year_display: a + "year-display", calendar_container: a + "calendar-container", navPrev: a + "nav--prev", navNext: a + "nav--next", navDisabled: a + "nav--disabled", month: a + "month", year: a + "year", selectMonth: a + "select--month", selectYear: a + "select--year", weekdays: a + "weekday", day: a + "day", disabled: a + "day--disabled", selected: a + "day--selected", highlighted: a + "day--highlighted", now: a + "day--today", infocus: a + "day--infocus", outfocus: a + "day--outfocus", footer: a + "footer", buttonClear: a + "button--clear", buttonToday: a + "button--today", buttonClose: a + "button--close" } } }(a.klasses().picker + "__"), a.extend("pickadate", c) }),
    function(a) {
        function b() {
            var b = +a(this).attr("length"),
                c = +a(this).val().length,
                d = b >= c;
            a(this).parent().find('span[class="character-counter"]').html(c + "/" + b), e(d, a(this)) }

        function c(b) {
            var c = a("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1);
            b.parent().append(c) }

        function d() { a(this).parent().find('span[class="character-counter"]').html("") }

        function e(a, b) {
            var c = b.hasClass("invalid");
            a && c ? b.removeClass("invalid") : a || c || (b.removeClass("valid"), b.addClass("invalid")) }
        a.fn.characterCounter = function() {
            return this.each(function() {
                var e = void 0 !== a(this).attr("length");
                e && (a(this).on("input", b), a(this).on("focus", b), a(this).on("blur", d), c(a(this))) }) }, a(document).ready(function() { a("input, textarea").characterCounter() }) }(jQuery),
    function(a) {
        var b = {
            init: function(b) {
                var c = { time_constant: 200, dist: -100, shift: 0, padding: 0, full_width: !1 };
                return b = a.extend(c, b), this.each(function() {
                    function c() { "undefined" != typeof window.ontouchstart && (F[0].addEventListener("touchstart", k), F[0].addEventListener("touchmove", l), F[0].addEventListener("touchend", m)), F[0].addEventListener("mousedown", k), F[0].addEventListener("mousemove", l), F[0].addEventListener("mouseup", m), F[0].addEventListener("click", j) }

                    function d(a) {
                        return a.targetTouches && a.targetTouches.length >= 1 ? a.targetTouches[0].clientX : a.clientX }

                    function e(a) {
                        return a.targetTouches && a.targetTouches.length >= 1 ? a.targetTouches[0].clientY : a.clientY }

                    function f(a) {
                        return a >= s ? a % s : 0 > a ? f(s + a % s) : a }

                    function g(a) {
                        var c, d, e, g, h, i, j;
                        for (o = "number" == typeof a ? a : o, p = Math.floor((o + r / 2) / r), e = o - p * r, g = 0 > e ? 1 : -1, h = -g * e * 2 / r, b.full_width ? j = "translateX(0)" : (j = "translateX(" + (F[0].clientWidth - item_width) / 2 + "px) ", j += "translateY(" + (F[0].clientHeight - item_width) / 2 + "px)"), i = n[f(p)], i.style[z] = j + " translateX(" + -e / 2 + "px) translateX(" + g * b.shift * h * c + "px) translateZ(" + b.dist * h + "px)", i.style.zIndex = 0, b.full_width ? tweenedOpacity = 1 : tweenedOpacity = 1 - .2 * h, i.style.opacity = tweenedOpacity, d = s >> 1, c = 1; d >= c; ++c) b.full_width ? (zTranslation = b.dist, tweenedOpacity = c === d && 0 > e ? 1 - h : 1) : (zTranslation = b.dist * (2 * c + h * g), tweenedOpacity = 1 - .2 * (2 * c + h * g)), i = n[f(p + c)], i.style[z] = j + " translateX(" + (b.shift + (r * c - e) / 2) + "px) translateZ(" + zTranslation + "px)", i.style.zIndex = -c, i.style.opacity = tweenedOpacity, b.full_width ? (zTranslation = b.dist, tweenedOpacity = c === d && e > 0 ? 1 - h : 1) : (zTranslation = b.dist * (2 * c - h * g), tweenedOpacity = 1 - .2 * (2 * c - h * g)), i = n[f(p - c)], i.style[z] = j + " translateX(" + (-b.shift + (-r * c - e) / 2) + "px) translateZ(" + zTranslation + "px)", i.style.zIndex = -c, i.style.opacity = tweenedOpacity;
                        i = n[f(p)], i.style[z] = j + " translateX(" + -e / 2 + "px) translateX(" + g * b.shift * h + "px) translateZ(" + b.dist * h + "px)", i.style.zIndex = 0, b.full_width ? tweenedOpacity = 1 : tweenedOpacity = 1 - .2 * h,
                            i.style.opacity = tweenedOpacity
                    }

                    function h() {
                        var a, b, c, d;
                        a = Date.now(), b = a - B, B = a, c = o - A, A = o, d = 1e3 * c / (1 + b), x = .8 * d + .2 * x }

                    function i() {
                        var a, c;
                        v && (a = Date.now() - B, c = v * Math.exp(-a / b.time_constant), c > 2 || -2 > c ? (g(w - c), requestAnimationFrame(i)) : g(w)) }

                    function j(c) {
                        if (D) return c.preventDefault(), c.stopPropagation(), !1;
                        if (!b.full_width) {
                            var d = a(c.target).closest(".carousel-item").index(),
                                e = p % s - d;
                            0 > e ? Math.abs(e + s) < Math.abs(e) && (e += s) : e > 0 && Math.abs(e - s) < e && (e -= s), 0 > e ? a(this).trigger("carouselNext", [Math.abs(e)]) : e > 0 && a(this).trigger("carouselPrev", [e]) } }

                    function k(a) { q = !0, D = !1, E = !1, t = d(a), u = e(a), x = v = 0, A = o, B = Date.now(), clearInterval(C), C = setInterval(h, 100) }

                    function l(a) {
                        var b, c, f;
                        if (q)
                            if (b = d(a), y = e(a), c = t - b, f = Math.abs(u - y), 30 > f && !E)(c > 2 || -2 > c) && (D = !0, t = b, g(o + c));
                            else {
                                if (D) return a.preventDefault(), a.stopPropagation(), !1;
                                E = !0 }
                        return D ? (a.preventDefault(), a.stopPropagation(), !1) : void 0 }

                    function m(a) {
                        return q = !1, clearInterval(C), w = o, (x > 10 || -10 > x) && (v = .9 * x, w = o + v), w = Math.round(w / r) * r, v = w - o, B = Date.now(), requestAnimationFrame(i), a.preventDefault(), a.stopPropagation(), !1 }
                    var n, o, p, q, r, s, t, u, v, w, x, z, A, B, C, D, E, F = a(this);
                    return F.hasClass("initialized") ? !0 : (b.full_width && (b.dist = 0, imageHeight = F.find(".carousel-item img").first().load(function() { F.css("height", a(this).height()) })), F.addClass("initialized"), q = !1, o = w = 0, n = [], item_width = F.find(".carousel-item").first().innerWidth(), r = 2 * item_width + b.padding, F.find(".carousel-item").each(function() { n.push(a(this)[0]) }), s = n.length, z = "transform", ["webkit", "Moz", "O", "ms"].every(function(a) {
                        var b = a + "Transform";
                        return "undefined" != typeof document.body.style[b] ? (z = b, !1) : !0 }), window.onresize = g, c(), g(o), a(this).on("carouselNext", function(a, b) { void 0 === b && (b = 1), w = o + r * b, o !== w && (v = w - o, B = Date.now(), requestAnimationFrame(i)) }), void a(this).on("carouselPrev", function(a, b) { void 0 === b && (b = 1), w = o - r * b, o !== w && (v = w - o, B = Date.now(), requestAnimationFrame(i)) }))
                })
            },
            next: function(b) { a(this).trigger("carouselNext", [b]) },
            prev: function(b) { a(this).trigger("carouselPrev", [b]) }
        };
        a.fn.carousel = function(c) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.carousel") : b.init.apply(this, arguments) }
    }(jQuery);

/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/lib/efo.js ==== */
/*=====GENERATING: 15.10.2017 21:10:20=======*/;
;/*========== INCLUDE @Utils/Utils========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.U?false:initPlugin()
function initPlugin(){var C=0,FN=0,U={},SW=null,EFO=window.Eve.EFO,SWH=null
function functionUID(){return'F'+(++FN)}
function UID(xp){xp&&typeof xp==='string'&&xp.length?false:xp='uid_';return xp+(++C)}
function RUID(xp){xp&&typeof xp==='string'&&xp.length?false:xp='uid_';return xp+C}
function isCallable(x){return x&&typeof x==='function'?true:false}
function isObject(x){return x&&typeof x==='object'?true:false}
function isArray(x){return isObject(x)&&(x instanceof Array)?true:false}
function safeArray(x){return isArray(x)?x:[]}
function safeObject(x){return isObject(x)?x:{}}
function isError(x){return U.isObject(x)&&(x instanceof Error)?true:false}
function isDOM(x){return(isObject(x)&&(x instanceof HTMLElement))}
function isJQuery(x){return(isObject(x)&&(window.jQuery)&&(x instanceof jQuery))}
function safeError(x){if(isError(x))return x;try{return new Error(x.toString())}catch(e){return e}}
function normalizeConstructor(x){if(isCallable(x)){x.is=function(xx){return isObject(xx)&&(xx instanceof x)?true:false};x.F=function(a,b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,xx,y,w,v,z){return new x(a,b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,xx,y,w,v,z)}};return x}
function bindTo(obj,func){if(!isCallable(func))throw new Error("bind of non callable");if(!isObject(obj))throw new Error("bind to non object");if(!isCallable(func._Eve_EFO_getFUID))throw new Error("First generation function - cant bind");isObject(obj._Eve_EFO_binds)?false:obj._Eve_EFO_binds={};(func._Eve_EFO_getFUID()in obj._Eve_EFO_binds)?false:obj._Eve_EFO_binds[func._Eve_EFO_getFUID()]=function(){return func.apply(obj,Array.prototype.slice.call(arguments))};return obj._Eve_EFO_binds[func._Eve_EFO_getFUID()]}
function bindToWP(obj,func){if(!isCallable(func))throw new Error("bind of non callable");if(!isObject(obj))throw new Error("bind to non object");if(!isCallable(func._Eve_EFO_getFUID))throw new Error("First generation function - cant bind");isObject(obj._Eve_EFO_bindsp)?false:obj._Eve_EFO_bindsp={};(func._Eve_EFO_getFUID()in obj._Eve_EFO_bindsp)?false:obj._Eve_EFO_bindsp[func._Eve_EFO_getFUID()]=function(){return func.apply(obj,[this].concat(Array.prototype.slice.call(arguments)))};return obj._Eve_EFO_bindsp[func._Eve_EFO_getFUID()]}
function objectCreate2(COP){if(!isCallable(COP))throw new Error("invalid object create call:need function")
function F(){};F.prototype=COP.prototype;var ro=new F();return ro}
function initMixines(x){if(isCallable(x)){var mixs=isArray(x.mixines)?x.mixines:[];x.prototype.mixinesToInit=[];for(var i=0;i<mixs.length;i++){var mixc=U.getItemOnPath(EFO.Mixines,mixs[i],null);if(isCallable(mixc)){for(var k in mixc.prototype)if(mixc.prototype.hasOwnProperty(k)&&isCallable(mixc.prototype[k]))k==='init'?false:x.prototype[k]=mixc.prototype[k];x.prototype.mixinesToInit.push(mixc.prototype.init)}}};return x}
function ScrollWidthDetector(){return ScrollWidthDetector.is(SWH)?SWH:ScrollWidthDetector.is(this)?this.init():ScrollWidthDetector.F()};normalizeConstructor(ScrollWidthDetector);ScrollWidthDetector.prototype._w=null;ScrollWidthDetector.prototype.init=function(){SWH=this;return this};ScrollWidthDetector.prototype.get=function(){if(this._w===null)this.measure();return this._w};ScrollWidthDetector.prototype.mesaure=function(){var div=document.createElement('div');div.style.width="100px";div.style.height="100px";div.style.overflow="auto";div.style.position="absolute";div.style.top="-5000";div.style.left="-5000";var div2=document.createElement('div');div2.style.height="200px";div.appendChild(div2);this.getBody().appendChild(div);var delta=div.offsetWidth-div2.offsetWidth;div.remove();div=null;this._w=EFO.U.FloatMoreEqOr(delta,0,0);return this._w};ScrollWidthDetector.prototype.getBody=function(){var b=document.getElementsByTagName('body');return b&&b.length?b[0]:document.documentElement}
function mkArray(input,unique,separator){separator=U.defined(separator)?separator:',';unique=U.anyBool(unique,true);if(isArray(input))return input;if(U.NEString(input,'')){var inputA=safeArray(input.split(separator)),uq=unique?{}:null,o=[];for(var i=0;i<inputA.length;i++){var t=U.NEString(inputA[i],false);if(t&&(!unique||!(t in uq))){o.push(t);unique?uq[t]=t:false}};return o};return[]};U.UID=UID;U.RUID=RUID;U.isObject=isObject;U.isArray=isArray;U.safeArray=safeArray;U.safeObject=safeObject;U.isCallable=isCallable;U.bindTo=bindTo;U.initMixines=initMixines;U.isError=isError;U.fixCon=U.FixCon=U.fixConstructor=U.normalizeConstructor=normalizeConstructor;U.safeError=safeError;U.isDOM=U.isDom=isDOM;U.isJQuery=U.isJquery=U.isjQuery=isJQuery;U.mkArray=mkArray;U.defined=function(x){return typeof x==='undefined'?false:true};U.coalesceDefined=function(){var args=Array.prototype.slice.call(arguments);for(var i=0;i<args.length;i++)if(this.defined(args[i]))return args[i];return void(0)};U.coalesce=function(){var args=Array.prototype.slice.call(arguments);for(var i=0;i<args.length;i++)if(this.defined(args[i])&&args[i]!==null)return args[i];return null};U.anyBool=function(x,def){def=this.defined(def)?def:false;if(x===1||x==='1'||x===true||x==='true'||x==='on')return true;if(x===0||x==='0'||x===false||x==='false'||x==='off')return false;try{if(x.toLowerCase()==='true'||x.toLowerCase()==='on')return true;if(x.toLowerCase()==='false'||x.toLowerCase()==='off')return false}catch(e){};return def};U.isInt=function(x){var r=parseInt(x);return typeof r==='number'&&!isNaN(r)?true:false};U.IntOr=function(test,def){def=this.defined(def)?def:null;var t=parseInt(test);return typeof t==='number'&&!isNaN(t)?t:def};U.IntMoreOr=function(test,more,def){def=this.defined(def)?def:null;more=this.IntOr(more,0);var result=this.IntOr(test,def);return this.isInt(result)&&result>more?result:def};U.NEString=function(x,def){def=this.defined(def)?def:null;var test=null;if(!typeof x==='string'){try{test=x.toString()}catch(e){return def}}else test=x;test=this.trim(test);return test&&test.length?test:def};U.FloatMoreOr=function(x,more,def){def=this.defined(def)?def:null;x=parseFloat(U.prepareFloat(x));return(typeof x==='number'&&!isNaN(x)&&x>more)?x:def};U.FloatMoreEqOr=function(x,more,def){def=this.defined(def)?def:null;x=parseFloat(this.prepareFloat(x));return(typeof x==='number'&&!isNaN(x)&&x>=more)?x:def};U.FloatOr=function(x,def){def=this.coalesceDefined(def,null);var test=parseFloat(this.prepareFloat(x));return typeof test==='number'&&!isNaN(test)?test:def};U.prepareFloat=function(x){try{return x.toString().replace(/\s/g,'').replace(/\,/g,'.')}catch(e){};return x};U.UCFirst=function(x){if(!(typeof x==='string'))try{x=x.toString()}catch(e){return x};var xa=x.split('');return[xa.slice(0,1).join('').toUpperCase(),xa.slice(1).join('')].join('')};U.trim=function(x){if(typeof x!=='string')try{return x.toString().trim()}catch(e){return''};return x.trim()};U.padLeft=function(w,l,f){try{var s=w.toString().split('');f=this.defined(f)?f:' ';while(s.length<l)s=[f].concat(s);return s.join('')}catch(e){};return w};U.padRight=function(w,l,f){try{var s=w.toString().split('');f=this.defined(f)?f:' ';while(s.length<l)s.push(f);return s.join('')}catch(e){};return w};U.parseSQLDateTime=function(x,def){def=this.defined(def)?def:null;try{var rx=/^\s{0,}(\d{2,4})-(\d{1,2})-(\d{1,2})(?:\s{0,}(\d{1,2})(?:\s{0,}:\s{0,}(\d{1,2})(?:\s{0,}:\s{0,}(\d{1,2})){0,1}){0,1}){0,1}$/,m=rx.exec(x);if(m){var D=new Date();D.setFullYear(parseInt(m[1]),parseInt(m[2])-1,parseInt(m[3]));D.setHours(this.IntMoreOr(m[4],0,0),this.IntMoreOr(m[5],0,0),this.IntMoreOr(m[6],0,0));return D}else return def}catch(e){};return def};U.scan=function(h,w){var R={};if(window.jQuery&&isCallable(window.jQuery)&&(h instanceof window.jQuery))h.find('[data-'+w+']').each(function(){var T=jQuery(this),N=U.NEString(T.data(w));N?R[N]=T:false});return R};U.scanFull=function(h,w){var R={};if(window.jQuery&&isCallable(window.jQuery)&&(h instanceof window.jQuery))h.find('[data-'+w+']').each(function(){var T=jQuery(this),N=U.NEString(T.data(w));N?R[N]=(R[N]?R[N].add(T):T):false});return R};U.hasProp=function(x,prp){prp=this.NEString(prp,null);return(this.isObject(x)&&prp&&(prp in x))?true:false};U.getProp=function(x,prp,def){def=this.coalesceDefined(def,null);return this.hasProp(x,prp)?x[prp]:def};U.path_exists=function(from,path){var spath=this.NEString(path,'').split('.');from=isObject(from)?from:null;if(!from||!spath.length)return false;var c=from;for(var i=0;i<spath.length-1;i++){if(U.isObject(c)&&this.NEString(spath[i])&&U.isObject(c[spath[i]])){c=c[spath[i]];continue};return false};var sp=this.NEString(spath[spath.length-1],null);return(U.isObject(c)&&sp&&U.hasProp(c,sp))?true:false};U.getItemOnPath=function(from,path,def){def=this.coalesceDefined(def,null);var spath=this.NEString(path,'').split('.');from=isObject(from)?from:null;if(!from||!spath.length)return def;var c=from;for(var i=0;i<spath.length-1;i++){if(U.isObject(c)&&this.NEString(spath[i])&&U.isObject(c[spath[i]])){c=c[spath[i]];continue};return def};var sp=this.NEString(spath[spath.length-1],null);return(U.isObject(c)&&sp&&U.hasProp(c,sp))?c[sp]:def};U.getItemOnPathGlobal=function(path,def){return this.getItemOnPath(window,path,def)};U.setItemOnPath=function(into,path,value){into=this.isObject(into)?into:null;var spath=this.NEString(path,'').split('.');if(!into||!spath.length)return;var c=into;for(var i=0;i<spath.length-1;i++){if(!this.NEString(spath[i],null)){this.THREAD_ERR("Invalid path:"+path);return};U.isObject(c[spath[i]])?false:c[spath[i]]={};c=c[spath[i]]};var sp=this.NEString(spath[spath.length-1],null);U.isObject(c)&&sp?c[sp]=value:this.THREAD_ERR("invalidPath:"+path)};U.getXpercentOfY=function(x,y){y=this.FloatOr(y,0);y=this.FloatOr(x,0);return(y/100)*x};U.getPercentsOfYisX=function(x,y){x=this.FloatOr(x,0);y=this.FloatOr(y,0);var pc1=Math.abs(y/100);return pc1===0?0:(Math.abs(x)/pc1)};U.getScrollWidth=function(){return ScrollWidthDetector().get()};U.AbstractError=function(){this.ERR("AbstractError")};U.ERR=function(message){throw new Error(message)};U.Error=function(x){if(isError(x))throw x;throw new Error(x)};U.TError=function(x){isError(x)?this.THREAD_ERRO(x):this.THREAD_ERR(x)};U.THREAD_ERR=function(message){var x=new Error(message);window.setTimeout(function(){throw x},0)};U.THREAD_ERRO=function(x){if(this.isObject(x)&&(x instanceof Error))window.setTimeout(function(){throw x},0)};Object.defineProperty(Function.prototype,'_Eve_EFO_getFUID',{enumerable:false,configurable:false,writable:false,value:function(){this._Eve_EFO_FUID?false:this._Eve_EFO_FUID=functionUID();return this._Eve_EFO_FUID}});Object.defineProperty(Object.prototype,'_Eve_EFO_binds',{enumerable:false,configurable:false,writable:true,value:null});Object.defineProperty(Function.prototype,'bindToObject',{enumerable:false,configurable:false,writable:false,value:function(o){return bindTo(o,this)}});Object.defineProperty(Function.prototype,'bindToObjectWParam',{enumerable:false,configurable:false,writable:false,value:function(o){return bindToWP(o,this)}});Object.defineProperty(Function.prototype,'xInherit',{enumerable:false,configurable:false,writable:false,value:function(superFunc){this.prototype=objectCreate2(superFunc);this.prototype.constructor=this;return this}});Object.defineProperty(Function.prototype,'xInheritE',{enumerable:false,configurable:false,writable:false,value:function(superFunc){this.prototype=objectCreate2(superFunc);this.prototype.constructor=this;return normalizeConstructor(this)}});window.Eve.EFO.U=U}})();
;/*========== INCLUDE @Utils/Checks========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Checks?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,T={clearDigits:function(x){try{return x.toString().replace(/\D/g,'')}catch(e){};return null},formatPhone:function(x){var y=this.clearDigits(x);try{var m=/^(\d{1,})(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(y.toString());if(m)return['+',m[1],' (',m[2],') ',m.slice(3).join(' ')].join('')}catch(e){};return null},tryFormatPhone:function(x){var y=this.formatPhone(x);return y?y:x},isEmail:function(x){try{return/^[^@]{1,}@[^@]{1,}\.[^@\.]{1,}$/.test(x.toString())}catch(e){};return false},formatAccountNumber:function(x){try{var y=this.clearDigits(x),m=/^(\d{5})(\d{5})(\d{5})(\d{5})$/.exec(y.toString());return m?m.slice(1).join(' '):x}catch(e){};return x},isAccountNumber:function(x){try{var y=this.clearDigits(x),m=/^(\d{5})(\d{5})(\d{5})(\d{5})$/.exec(y.toString());return m?m.slice(1).join(' '):false}catch(e){};return false},prepareFloat:function(x){try{return x.toString().replace(/\s/g,'').replace(/\,/g,'.')}catch(e){};return x},formatPrice:function(num,dec){dec=U.IntMoreOr(dec,0,2);var val=parseFloat(this.prepareFloat(num));val=typeof val==='number'&&!isNaN(val)?val:0;return val.toFixed(dec).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ')},formatBic:function(x){try{var y=this.clearDigits(x),m=/^(\d{3})(\d{3})(\d{3})$/.exec(y.toString());return m?m.slice(1).join(' '):x}catch(e){return x}},isBIC:function(x){try{var y=this.clearDigits(x),m=/^(\d{3})(\d{3})(\d{3})$/.exec(y.toString());return m?m.slice(1).join(' '):false}catch(e){};return false},formatINN:function(x){try{var y=this.clearDigits(x);if(y.length===10){return this.checkINN10(y)}else if(y.length===12)return this.checkINN12(y)}catch(e){};return null},checkINN10:function(y){if(y.length==10){var ld=parseInt(y[9]),dd=[],ch=[2,4,10,3,5,9,4,6,8],crc=0;for(var i=0;i<9;i++)crc+=parseInt(y[i])*ch[i];crc=(crc%11)%10;return(crc==ld)?this.formatInn10(y):null};return null},checkINN12:function(y){if(y.length==12){var ld12=parseInt(y[11]),ld11=parseInt(y[10]),ch1=[7,2,4,10,3,5,9,4,6,8],ch2=[3,7,2,4,10,3,5,9,4,6,8],crc1=0,crc2=0;for(var i=0;i<11;i++){crc1+=i<10?parseInt(y[i])*ch1[i]:0;crc2+=parseInt(y[i])*ch2[i]};crc1=(crc1%11)%10;crc2=(crc2%11)%10;return(crc1==ld11&&crc2==ld12)?this.formatInn12(y):null};return null},formatInn10:function(y){var m=/^(\d{5})(\d{5})$/.exec(y);return m?m.slice(1).join(' '):null},formatInn12:function(y){var m=/^(\d{4})(\d{4})(\d{4})$/.exec(y);return m?m.slice(1).join(' '):null}};EFO.Checks=T}})();
;/*========== INCLUDE @Utils/TemplateManager========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.TemplateManager?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,H=null,T={}
function F(){return F.is(H)?H:(F.is(this)?this.init():F.F())};U.normalizeConstructor(F);F.prototype.base_url=null;F.prototype.init=function(){T={};H=this;return this};F.prototype.add=function(name,tpl,prefix){var key=this.prepareKey(name,prefix);T[key]=tpl;return this};F.prototype.addObject=function(x,prefix){if(U.isObject(x))for(var k in x)if(x.hasOwnProperty(k)&&(typeof(x[k])==='string'||U.isObject(x[k]))){var key=this.prepareKey(k,prefix);T[key]=x[k]};return this};F.prototype.exists=function(x,prefix){try{var key=this.prepareKey(x,prefix);return(key in T)?true:false}catch(e){U.THREAD_ERRO(e);return false}};F.prototype.prepareKey=function(name,prefix){prefix=U.NEString(prefix,null);return(prefix?[prefix,name].join('.'):name).toLowerCase()};F.prototype.prepareTemplate=function(key){var ta=T[key];if(ta.k&&ta.c&&U.isArray(ta.k)){T[key]=this._runpreparer(ta.k,ta.c);return T[key]};return'Error prepare template'};F.prototype._runpreparer=function(keys,content){var mid=this._runVoc(keys,content);return this._runRle(mid)};F.prototype._runVoc=function(ka,c){var keys=this.prpepareKeysVocDec();return c.replace(/\f(.)/,function(n,w){U.IntMoreOr(w,-1,null)!==null?w=["s",w].join(''):false;return ka[keys[w]]})};F.prototype._runRle=function(mid){var keys=this.prepareRleKeys(),self=this;return mid.replace(/\b(.)(.)/,function(w,l,r){return self.strrep(l,keys[r])})};F.prototype.prepareRleKeys=function(){if(!this._rleKeys){var sk=this.prepareLinearKeys();this._rleKeys={};for(var i=0;i<sk.length;i++){var key=sk[i];U.IntMoreOr(key,-1,null)!==null?key=["s",key].join(''):false;this._rleKeys[key]=i+4}};return this._rleKeys};F.prototype.strrep=function(x,co){var t=[];for(var i=0;i<co;i++)t.push(x);return t.join('')};F.prototype.prepareLinearKeys=function(){if(!this._linearKeys){var s='abcdefghijklmnopqrstuvwxyz';s+=s.toUpperCase();s+='!@#$%^&*()_+={[}]|?.,:;<>~`1234567890';this._linearKeys=s.split('')};return this._linearKeys};F.prototype.prepareKeysVocDec=function(){if(!this._vocKeys){var $lin=this.prepareLinearKeys();this._vocKeys={};for(var i=0;i<$lin.length;i++){var k=$lin[i];U.IntMoreOr(k,-1,null)!==null?k=["s",k].join(''):false;this._vocKeys[k]=i}};return this._vocKeys};F.prototype.get=function(name,prefix){try{var key=this.prepareKey(name,prefix);if(key in T){if(U.isObject(T[key]))this.prepareTemplate(key);return T[key]};U.THREAD_ERR("No template: "+name);return''}catch(e){U.THREAD_ERRO(e)};return''};F.prototype.obsoleteget=function(name,prefix){try{var key=this.prepareKey(name,prefix);if(key in T)return T[key];U.THREAD_ERR("No template: "+name);return''}catch(e){U.THREAD_ERRO(e)};return''};F.prototype.setBaseUrl=function(x){this.base_url=U.NEString(x,null);return this};F.prototype.load=function(name){var R=jQuery.Deferred(),self=this.onBeginLoading();jQuery.get(this.base_url+name).done(function(d){self.onTemplateLoaded(name,d,R)}).fail(function(){self.onTemplateLoadFail(name,R)}).always(this.onEndLoading.bindToObject(this));return R};F.prototype.onTemplateLoaded=function(name,d,R){this.add(name,d);R.resolve(this);return this};F.prototype.onTemplateLoadFail=function(name,R){R.reject();U.THREAD_ERRO(new Error("Error loading template: "+name));return this};F.prototype.onBeginLoading=function(){EFO.GEM().Run('ON_AJAX_REQUEST_BEGIN','TemplateManager');return this};F.prototype.onEndLoading=function(){EFO.GEM().Run('ON_AJAX_REQUEST_END','TemplateManager');return this};F.prototype.prepareSubKey=function(x){var xs=x.split('.'),o=[];for(var i=0;i<xs.length;i++)o.push(U.UCFirst(xs[i]));return o.join('')};EFO.TemplateManager=F}})();
;/*========== INCLUDE @Utils/GP========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.GP?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,H=null,GP=null
function F(x){return F.is(H)?H:(F.is(this)?this.init(x):F.F(x))};U.normalizeConstructor(F);F.prototype.savePath=null;F.prototype.init=function(x){H=this;this.savePath=U.NEString(x,this.getLocationPath());return this.load()};F.prototype.getLocationPath=function(){var p=window.location.pathname;p=U.NEString(p,'default_location');p=['EFOGP',p.replace(/\\\//g,'.')].join(':');return p};F.prototype.load=function(){var AG=null;try{AG=JSON.parse(window.localStorage.getItem(this.savePath));AG=U.isObject(AG)?AG:null}catch(e){AG=null;U.THREAD_ERRO(e)};GP=U.isObject(AG)?AG:{};return this};F.prototype.save=function(){GP=U.isObject(GP)?GP:{};try{window.localStorage.setItem(this.savePath,JSON.stringify(GP))}catch(E){U.THREAD_ERRO(E)};return this};F.prototype.get=function(path,def){return U.getItemOnPath(GP,path,def)};F.prototype.setSave=function(path,val){return this.set(path,val).save()};F.prototype.set=function(path,val){U.setItemOnPath(GP,path,val);return this};EFO.GP=F}})();
;/*========== INCLUDE @Utils/GLEM========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Events=window.Eve.EFO.Events||{};window.Eve.EFO.Events.GEM?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,H=null,C=0
function EID(){return(++C)}
function F(){return F.is(H)?H:(F.is(this)?this.init():F.F())};U.normalizeConstructor(F);F.prototype.IX=null;F.prototype.init=function(){H=this;this.IX={};return this};F.prototype.On=function(en,co,ca){var ev=EV(en,co,ca);if(ev.isValid()){U.isArray(this.IX[ev.name])?false:this.IX[ev.name]=[];this.IX[ev.name].push(ev);return ev};return null};F.prototype.Off=function(x){var IX=this.IX,euid=null;if(EV.is(x)){euid=x.id}else euid=U.IntMoreOr(x);if(euid)for(var K in this.IX)if(this.IX.hasOwnProperty(K)&&U.isArray(IX[K])){var T=[];for(var i=0;i<IX[K].length;i++)if(IX[K][i].id!==euid)T.push(IX[K][i]);IX[K]=T};return this};F.prototype.Run=function(en){var IX=this.IX,EN=EV.PEN(en);if(EN&&IX.hasOwnProperty(EN)&&U.isArray(IX[EN])&&IX[EN].length){var args=Array.prototype.slice.call(arguments,1);for(var i=0;i<IX[EN].length;i++)try{IX[EN][i].run(args)}catch(e){U.THREAD_ERRO(e)}};return this};F.prototype.trigger=F.prototype.Trigger=F.prototype.run=F.prototype.Raise=F.prototype.raise=F.prototype.Run;F.prototype.ON=F.prototype.on=F.prototype.addListener=F.prototype.listener=F.prototype.Listener=F.prototype.onEvent=F.prototype.onevent=F.prototype.On;F.prototype.OFF=F.prototype.off=F.prototype.removeListener=F.prototype.offEvent=F.prototype.OffEvent=F.prototype.Off
function LEM(){return LEM.is(this)?this.init():LEM.F()};LEM.xInheritE(F);LEM.prototype.init=function(){this.IX={};return this}
function EV(en,co,ca){return EV.is(this)?this.init(en,co,ca):EV.F().init(en,co,ca)};U.normalizeConstructor(EV);EV.PEN=function(x){return U.NEString(x)};EV.prototype.id=null;EV.prototype.name=null;EV.prototype.ca=null;EV.prototype.co=null;EV.prototype.a=true;EV.prototype.init=function(en,co,ca){this.id=EID();this.name=EV.PEN(en);this.co=U.isObject(co)?co:null;this.ca=U.isCallable(ca)?ca:null;return this};EV.prototype.isValid=function(){return this.id&&this.name&&this.ca?true:false};EV.prototype.enable=function(){this.a=true;return this};EV.prototype.disable=function(){this.a=false;return this};EV.prototype.run=function(args){this.a&&U.isCallable(this.ca)?(this.ca.apply((U.isObject(this.co)?this.co:this),(U.isArray(args)?args:[]))):false;return this};F.isEvent=EV.is;F.Event=EV;LEM.isEvent=EV.is;LEM.Event=EV;EFO.Events.GEM=F;EFO.Events.LEM=LEM}})();
;/*========== INCLUDE @Utils/DnDManager========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.DnDManager?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,H=null
function F(){return F.is(H)?H:F.is(this)?this.init():F.F()};U.normalizeConstructor(F);F.prototype.init=function(){H=this;this.LEM=EFO.Events.LEM();return this.setDragHandlers()};F.prototype._startX=null;F.prototype._startY=null;F.prototype._dragType=null;F.prototype._dragging=null;F.prototype._customData=null;F.prototype.clearSelection=function(){try{if(window.getSelection){if(window.getSelection().empty){window.getSelection().empty()}else if(window.getSelection().removeAllRanges)window.getSelection().removeAllRanges()}else if(document.selection)document.selection.empty()}catch(e){U.THREAD_ERRO(e)};return this};F.prototype.setDragHandlers=function(){jQuery(document).on('mousedown','.EFODraggable',this.onDragPreInit.bindToObject(this));return this};F.prototype.onDragPreInit=function(e){this._startX=e.pageX;this._startY=e.pageY;var element=jQuery(e.currentTarget);this._dragType=element.data('efodragtype');this._dragging=element;this._customData={};return this._dragType?this.runWatch(e):this};F.prototype.runWatch=function(e){jQuery(document).on('mousemove',this.checkDragStart.bindToObject(this));jQuery(document).on('mouseup',this.abortDragFull.bindToObject(this));return this.checkDragStart(e)};F.prototype.checkDragStart=function(e){var deltaX=Math.max(e.pageX,this._startX)-Math.min(e.pageX,this._startX),deltaY=Math.max(e.pageY,this._startY)-Math.min(e.pageY,this._startY),offset=Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));return(offset>15)?this.startDrag(e):this};F.prototype.startDrag=function(e){this.LEM.Run('ON_BEFORE_DRAG',this._dragType,this._dragging,this._customData,e);this.LEM.Run('ON_BEFORE_DRAG_'+this._dragType,this._dragging,this._customData,e);this.abortDragNE();this.helper?false:this.createHelper();this.helper.show();jQuery('body').addClass('EFODragNow');this.positeHelper(e);jQuery(document).on('mouseup','.EFODropTarget',this.dragged.bindToObject(this));jQuery(document).on('mouseup',this.abortDragFull.bindToObject(this));jQuery(document).on('mouseenter','.EFODropTarget',this.dragOver.bindToObject(this));jQuery(document).on('mouseleave','.EFODropTarget',this.dragLeave.bindToObject(this));jQuery(document).on('mousemove',this.positeHelper.bindToObject(this));return this};F.prototype.createHelper=function(){this.helper=jQuery(EFO.TemplateManager().get('draghelper'));this.helper.appendTo('body');return this};F.prototype.positeHelper=function(e){this.helper.css({left:e.pageX+5+'px',top:e.pageY+5+'px'});return this};F.prototype.abortDrag=function(){this.abortDragNE();jQuery('body').removeClass('EFODragNow');this.LEM.Run('ABORT_DRAG_'+this._dragType);return this};F.prototype.abortDragNE=function(){this.helper?this.helper.hide():false;jQuery(document).off('mouseup','.EFODropTarget',this.dragged.bindToObject(this));jQuery(document).off('mouseup',this.abortDragFull.bindToObject(this));jQuery(document).off('mousemove',this.positeHelper.bindToObject(this));jQuery(document).off('mousemove',this.checkDragStart.bindToObject(this));jQuery(document).off('mouseenter','.EFODropTarget',this.dragOver.bindToObject(this));jQuery(document).off('mouseleave','.EFODropTarget',this.dragLeave.bindToObject(this));return this};F.prototype.clearDragData=function(){this._dragType=null;this._dragging=null;this._customData=null;return this};F.prototype.abortDragFull=function(){return this.abortDrag().clearDragData()};F.prototype.dragOver=function(e){var T=jQuery(e.currentTarget).addClass('EFODragOver');this.LEM.Run('ON_DRAG_OVER',this,T,e);this.LEM.Run('ON_DRAG_OVER_'+this._dragType,this,T,e);return this};F.prototype.dragLeave=function(e){var T=jQuery(e.currentTarget).removeClass('EFODragOver');this.LEM.Run('ON_DRAG_LEAVE',this,T,e);this.LEM.Run('ON_DRAG_LEAVE_'+this._dragType,this,T,e);return this};F.prototype.dragged=function(e){var T=jQuery(e.currentTarget),target_types=T.data('efodroptypes'),ta=target_types.split(','),r={};for(var i=0;i<ta.length;i++)r[ta[i]]=ta[i];if(this._dragType&&(this._dragType in r)){this.LEM.Run('ON_DROPPED',this,T,e);this.LEM.Run('ON_DROPPED_'+this._dragType,this,T,e)};return this.abortDragFull()};EFO.DnDManager=F}})();
;/*========== INCLUDE @Utils/LoginMon========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.LoginMon?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null
function LoginMon(){return LoginMon.is(H)?H:(LoginMon.is(this)?this.init():LoginMon.F())};U.FixCon(LoginMon);var F=LoginMon;F.prototype.init=function(){var H=this;this.setup();return this};F.prototype.setup=function(){EFO.Request.getRequestOptions().addWrapper('AuthRqrd',this.onStatus,this);return this};F.prototype.onStatus=function(success,fail){this.handleStatus(success,fail);return this};F.prototype.handleStatus=function(success,fail){var self=this,ev=EFO.Events.GEM().On('LOGIN_SUCCESS',this,function(x){success(x);EFO.Events.GEM().Off(ev)});EFO.Com().com('DAP.login').done(function(x){x.show()}).fail(function(){U.TError(this._T("RequiredComponentFail"));fail()});return this};EFO.LoginMon=F}})();
;/*========== INCLUDE @Mixines/Mixine========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Mixine?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};U.normalizeConstructor(F);M.Mixine=F}})();
;/*========== INCLUDE @Mixines/Commandable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Commandable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this.handle.on('click','[data-command]',this.onCommand.bindToObject(this));return this};F.prototype.onCommand=function(e){var T=jQuery(e.currentTarget),cmd=U.NEString(T.data('command'));if(cmd){var fn=['onCommand',U.UCFirst(cmd)].join('');if(U.isCallable(this[fn]))try{e.stopPropagation();if(U.anyBool(T.data('prevent'),true))e.preventDefault?e.preventDefault():e.returnValue=false;this[fn].apply(this,[T,e])}catch(e){U.THREAD_ERRO(e);return this}};return this};M.Commandable=F}})();
;/*========== INCLUDE @Mixines/Monitorable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Monitorable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this.handle.on('change','[data-monitor]',this.onMonitor.bindToObject(this));return this};F.prototype.onMonitor=function(e){var T=jQuery(e.currentTarget),cmd=U.NEString(T.data('monitor'));if(cmd){var cmda=cmd.split(',');for(var ii=0;ii<cmda.length;ii++)if(cmda[ii]&&cmda[ii].length){var fn=['onMonitor',U.UCFirst(cmda[ii])].join('');if(U.isCallable(this[fn]))try{e.stopPropagation();(U.anyBool(T.data('prevent'),true))?(e.preventDefault?e.preventDefault():e.returnValue=false):false;this[fn].apply(this,[T,e])}catch(e){U.THREAD_ERRO(e);return this}}};return this};M.Monitorable=F}})();
;/*========== INCLUDE @Mixines/Roleable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Roleable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this._roles=U.scan(this.handle,'role');return this};F.prototype.getRole=function(x){if(!(x in this._roles))this._roles[x]=jQuery(null);return this._roles[x]};M.Roleable=F}})();
;/*========== INCLUDE @Mixines/Fieldable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Fieldable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this._fields=U.scan(this.handle,'field');this.LEM.On('RESET_CONTENT',this,this.fieldable_clean);return this};F.prototype.getField=function(x){if(!(x in this._fields))this._fields[x]=jQuery(null);return this._fields[x]};F.prototype.getFields=function(){var R={};U.isObject(this._fields)?false:this._fields={};for(var k in this._fields)if(this._fields.hasOwnProperty(k)){var field=this.getField(k),fn="_get_field_"+k.replace(/\./g,'_');if(U.isCallable(this[fn])){R[k]=this[fn].call(this,field)}else if(field.is('input[type=checkbox]')){U.setItemOnPath(R,k,field.prop('checked')?1:0)}else if(field.is('input,textarea,select')){U.setItemOnPath(R,k,field.val())}else U.setItemOnPath(R,k,field.html())};return R};F.prototype.setFields=function(data){data=U.isObject(data)?data:{};U.isObject(this._fields)?false:this._fields={};for(var k in this._fields)if(this._fields.hasOwnProperty(k)){var field=this.getField(k),fn="_set_field_"+k.replace(/\./g,'_');if(U.isCallable(this[fn])){this[fn].call(this,data,field)}else if(U.path_exists(data,k)){if(field.is('input[type=checkbox]')){field.prop('checked',U.anyBool(U.getItemOnPath(data,k,false)))}else if(field.is('input,textarea,select')){field.val(U.getItemOnPath(data,k,null))}else field.html(U.getItemOnPath(data,k,null))}else this.setDefaultFieldValue(k)};return this};F.prototype.setDefaultFieldValue=function(field_name){var p=this.getField(field_name);if(p&&p.length){var pd=p.data('fielddefault');if(p.is('input[type=checkbox]')){var val=U.anyBool(pd,false);p.prop('checked',val)}else if(p.is('input,textarea')){var val=U.NEString(pd,'');p.val(val)}else if(p.is('select')){var val=U.NEString(pd,null);p.val(val)}else{var val=U.NEString(pd,'');p.html(val)}};return this};F.prototype.fieldable_clean=function(){this.setFields(null);return this};M.Fieldable=F}})();
;/*========== INCLUDE @Mixines/Loaderable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Loaderable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){return this};F.prototype.showLoader=function(x){U.isCallable(this.getRole)?this.getRole('loader').show():false;return this};F.prototype.hideLoader=function(x){U.isCallable(this.getRole)?this.getRole('loader').hide():false;return this};M.Loaderable=F}})();
;/*========== INCLUDE @Mixines/Sizeable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Sizeable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this.sizeable_init();return this};F.prototype.interface={sizeable_getMarker:function(){},sizeable_getWindow:function(){},sizeable_getContainer:function(){},sizeable_getParams:function(){},sizeable_setParams:function(){},sizeable_defaultWidth:function(){},sizeable_defaultHeight:function(){},events:{NEED_POSITE:"Требуется репозиционировать элемент"}};F.prototype.sizeable_init=function(){var w=(U.isCallable(this.sizeable_defaultWidth)?this.sizeable_defaultWidth():80),h=(U.isCallable(this.sizeable_defaultHeight)?this.sizeable_defaultHeight():80),P=(U.isCallable(this.sizeable_getParams)?this.sizeable_getParams():{});try{if(U.isObject(P)&&('w'in P)&&('h'in P)&&typeof(P.h)==='number'&&!isNaN(P.h)&&typeof(P.w)==='number'&&!isNaN(P.w)){w=P.w;h=P.h}}catch(e){w=80,h=80};this.sizeable_getWindow().css({width:w+'%',height:h+'%'});this.sizeable_getMarker().on('mousedown',this.sizeable_enableResizeWatch.bindToObject(this));this.LEM.Run('NEED_POSITE');return this};F.prototype.sizeable_enableResizeWatch=function(e){e.stopPropagation();e.preventDefault?e.preventDefault():e.returnValue=false;this.sizeable_abortResize();this.sizeable_startX=e.pageX;this.sizeable_startY=e.pageY;jQuery(document).on('mousemove',this.sizeable_checkResizeBegins.bindToObject(this)).on('mouseup',this.sizeable_abortResize.bindToObject(this));return this};F.prototype.sizeable_checkResizeBegins=function(e){var deltaX=Math.max(e.pageX,this.sizeable_startX)-Math.min(e.pageX,this.sizeable_startX),deltaY=Math.max(e.pageY,this.sizeable_startY)-Math.min(e.pageY,this.sizeable_startY),delta=Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));if(delta>15)this.sizeable_runResizer(e);return this};F.prototype.sizeable_runResizer=function(e){this.sizeable_abortResize();this.sizeable_getWindow().addClass('sizeable_notransition');this.sizeable_rinit_height=parseFloat(this.sizeable_getWindow().outerHeight(true));this.sizeable_rinit_width=parseFloat(this.sizeable_getWindow().outerWidth(true));jQuery(document).on('mousemove',this.sizeable_updateSizeResize.bindToObject(this)).on('mouseup',this.sizeable_fixupResize.bindToObject(this));return this.sizeable_updateSizeResize(e)};F.prototype.sizeable_updateSizeResize=function(e){var deltaX=e.pageX-this.sizeable_startX,deltaY=e.pageY-this.sizeable_startY,cw=this.sizeable_rinit_width+deltaX*this.sizeable_scaleFactor(),ch=this.sizeable_rinit_height+deltaY*this.sizeable_scaleFactor();this.sizeable_getWindow().css({width:cw+'px',height:ch+'px'});this.LEM.Run('NEED_POSITE');return this};F.prototype.sizeable_fixupResize=function(e){this.sizeable_updateSizeResize(e);this.sizeable_abortResize();var ch=parseFloat(this.sizeable_getWindow().outerHeight(true)),cw=parseFloat(this.sizeable_getWindow().outerWidth(true)),ww=parseFloat(this.sizeable_getContainer().innerWidth()),wh=parseFloat(this.sizeable_getContainer().innerHeight()),wpc=cw/(ww/100),hpc=ch/(wh/100);this.sizeable_getWindow().css({width:wpc+'%',height:hpc+'%'});this.sizeable_setParams({w:wpc,h:hpc});e.stopPropagation();e.preventDefault?e.preventDefault():e.returnValue=false;this.LEM.Run('NEED_POSITE');return this};F.prototype.sizeable_abortResize=function(){jQuery(document).off('mousemove',this.sizeable_updateSizeResize.bindToObject(this)).off('mouseup',this.sizeable_fixupResize.bindToObject(this)).off('mousemove',this.sizeable_checkResizeBegins.bindToObject(this)).off('mouseup',this.sizeable_abortResize.bindToObject(this));this.sizeable_getWindow().removeClass('sizeable_notransition');return this};F.prototype.sizeable_scaleFactor=function(){return 1};M.Sizeable=F}})();
;/*========== INCLUDE @Mixines/Tabbable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Tabbable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){this.handle.on('click','[data-tabheader]',this.onTabclick.bindToObject(this));this.LEM.On('RESET_CONTENT',this,this.Tabbable_reset);return this};F.prototype.onTabclick=function(e){var T=jQuery(e.currentTarget);T.addClass('EFOTabHeaderActive').parent().find('[data-tabheader]').not(T).removeClass('EFOTabHeaderActive');var cmd=U.NEString(T.data('tabheader'));if(cmd){this.handle.find('[data-tab]').not('[data-tab="'+cmd+'"]').removeClass('EFOTabActive');this.handle.find('[data-tab="'+cmd+'"]').addClass('EFOTabActive');var fn=['onTabSelected',U.UCFirst(cmd)].join('');if(U.isCallable(this[fn]))try{e.stopPropagation();if(U.anyBool(T.data('prevent'),true))e.preventDefault?e.preventDefault():e.returnValue=false;this[fn].apply(this,[T,e])}catch(e){U.THREAD_ERRO(e);return this}};return this};F.prototype.Tabbable_reset=function(){var a=this.handle.find('[data-tabheader][data-defaulttabheader]');a.length?false:this.handle.find('[data-tabheader]:first');a.click();return this};F.prototype.Tabbable_reselect=function(){var a=this.handle.find('.EFOTabHeaderActive');a&&a.length?a.click():this.Tabbable_reset();return this};M.Tabbable=F}})();
;/*========== INCLUDE @Mixines/Callbackable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Mixines=window.Eve.EFO.Mixines||{};window.Eve.EFO.Mixines.Callbackable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,M=window.Eve.EFO.Mixines
function F(){U.AbstractException()};F.xInheritE(M.Mixine);F.prototype.init=function(){return this};F.prototype.setCallback=function(co,ca){var cb=CB(co,ca);if(cb&&cb.isValid())this._callbackable_push_callback(cb);return this};F.prototype._callbackable_push_callback=function(cb){if(CB.is(cb)){U.isArray(this._callbackable_callbacks)?false:this._callbackable_callbacks=[];this._callbackable_callbacks.push(cb)};return this};F.prototype.clearCallbacks=function(){this._callbackable_callbacks=[];return this};F.prototype.runCallback=function(){var args=Array.prototype.slice.call(arguments);U.isArray(this._callbackable_callbacks)?false:this._callbackable_callbacks=[];for(var i=0;i<this._callbackable_callbacks.length;i++)try{this._callbackable_callbacks[i].run(args)}catch(e){U.THREAD_ERRO(e)};return this}
function CB(co,ca){return CB.is(this)?this.init(co,ca):CB.F(co,ca)};U.normalizeConstructor(CB);CB.F=function(a,b){return new CB(a,b)};CB.prototype._context=null;CB.prototype._callable=null;CB.prototype.init=function(co,ca){this._context=U.isObject(co)?co:null;this._callable=U.isCallable(ca)?ca:null;return this};CB.prototype.isValid=function(){return U.isCallable(this._callable)};CB.prototype.run=function(ps){ps=U.isArray(ps)?ps:[];if(U.isCallable(this._callable)){var co=U.isObject(this._context)?this._context:this;this._callable.apply(co,ps)};return this};M.Callbackable=F}})();
;/*========== INCLUDE @classes/Controller========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Controller?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U
function F(){U.AbstractError()};U.normalizeConstructor(F);F.prototype.LEM=null;F.prototype.mixinesToInit=null;F.prototype.init=function(){this.LEM=EFO.Events.LEM();this.controller_id=U.UID('controller');this.onBeforeInit.apply(this,Array.prototype.slice.call(arguments));return this};F.prototype.getControllerId=function(){return this.controller_id};F.prototype._getMixines=function(){return U.isArray(this.mixinesToInit)?this.mixinesToInit:[]};F.prototype.initMixines=function(){var r=this._getMixines();for(var i=0;i<r.length;i++)if(U.isCallable(r[i]))try{r[i].call(this)}catch(e){U.THREAD_ERRO(e)};this.LEM.Run('INIT_MIXINES_END',this);return this};F.prototype.onBeforeInit=function(){return this};F.prototype.getControllerAlias=function(){U.AbstractError()};F.prototype.threadError=function(x){U.THREAD_ERR(x);return this};F.prototype.threadErrorObject=function(x){U.THREAD_ERRO(x);return this};F.prototype.UID=function(){return U.UID()};F.prototype.RUID=function(){return U.RUID()};EFO.Controller=F}})();
;/*========== INCLUDE @classes/Handlable========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Handlable?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U
function F(){U.AbstractError()};F.xInheritE(EFO.Controller);F.prototype.handle=null;F.prototype.wrapperTemplate=null;F.prototype.init=function(){var args=Array.prototype.slice.call(arguments);EFO.Controller.prototype.init.apply(this,args);var subTemplates=this.prepareSubTemplates();this.wrapperTemplate=Mustache.render(this.getWrapperTemplate(),this,subTemplates);this.handle=jQuery(Mustache.render(this.wrapperTemplate,this,subTemplates));this.initMixines();this.LEM.Run('INIT',this);this.onInit.apply(this,args);return this};F.prototype.onInit=function(){return this};F.prototype.getWrapperTemplate=function(){return EFO.TemplateManager().get('Handlable.default')};F.prototype.getContainer=function(){return jQuery('body')};F.prototype.show=function(){var args=Array.prototype.slice.call(arguments);this.onBeforeShow(args);this.LEM.Run('ON_BEFORE_SHOW',this);this.handle.appendTo(this.getContainer()).fadeIn(100);this.onAfterShow(args);this.LEM.Run('ON_AFTER_SHOW',this);return this};F.prototype.hide=function(){var args=Array.prototype.slice.call(arguments);this.onBeforeHide(args);this.LEM.Run('ON_BEFORE_HIDE',this);this.handle.hide();this.onAfterHide(args);this.LEM.Run('ON_AFTER_HIDE',this);return this};F.prototype.onBeforeShow=function(){return this};F.prototype.onAfterShow=function(){return this};F.prototype.onBeforeHide=function(){return this};F.prototype.onAfterHide=function(){return this};F.prototype.getContentTemplate=function(){this.threadError("handlable::getContentTemplate must be overriden");return'widgetContent'};F.prototype.getCssClass=function(){U.AbstractError()};F.prototype.enumSubTemplates=function(){return[]};F.prototype.prepareSubTemplates=function(){var RO={},AR=this.enumSubTemplates();AR=U.isArray(AR)?AR:[];for(var i=0;i<AR.length;i++)RO[EFO.TemplateManager().prepareSubKey(AR[i])]=EFO.TemplateManager().get(AR[i]);return RO};EFO.Handlable=F}})();
;/*========== INCLUDE @widgets/widget========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Widgets=window.Eve.EFO.Widgets||{};window.Eve.EFO.Widgets.widget?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,WNS=EFO.Widgets
function F(){return U.AbstractError()};F.xInheritE(EFO.Handlable);F.prototype._container=null;F.prototype.handle=null;F.prototype._uid=null;F.prototype.beforeInit=function(){this._uid=U.UID('widget');return this};F.prototype.getWrapperTemplate=function(){var t=EFO.TemplateManager().get('default',this.getWidgetClass());return t&&t.length?t:EFO.TemplateManager().get('default','widget')};F.prototype.getContentTemplate=function(){var t=EFO.TemplateManager().get('content',this.getWidgetClass());if(t&&t.length)return t;this.threadError("widget::getContentTemplate must be overriden");return'widgetContent'};F.prototype.show=function(){if(this.getContainer())EFO.Handlable.prototype.show.apply(this,Array.prototype.slice.call(arguments));return this};F.prototype.getWidgetClass=function(){U.AbstractError()};F.prototype.getCssClass=function(){return['widget',this.getWidgetClass()].join('')};F.prototype.setContainer=function(x){this._container=x;return this._container?this.show():this.hide()};F.prototype.getContainer=function(){return this._container};WNS.widget=F}})();
;/*========== INCLUDE @widgets/Paginator========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Widgets=window.Eve.EFO.Widgets||{};window.Eve.EFO.Widgets.Paginator?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,WNS=EFO.Widgets
function F(){return F.is(this)?this.init():F.F()};F.xInheritE(WNS.widget);F.mixines=['Roleable'];U.initMixines(F);F.prototype._page=0;F.prototype.getWidgetClass=function(){return'Paginator'};F.prototype.setData=function(page,total,perpage){page=U.IntMoreOr(page,0,0);this._page=page;this._maxpage=Math.ceil(total/perpage)-1;var items=this.createItems(page,total,perpage);this.getRole('items').html(items.length>1?Mustache.render(EFO.TemplateManager().get('items',this.getWidgetClass()),{items:items,getCssClass:this.getCssClass(),hasPrev:(page>0),hasNext:(page<this._maxpage)},{item:EFO.TemplateManager().get('item',this.getWidgetClass())}):'');return(items.length>1?this.enable:this.disable).call(this)};F.prototype.createItems=function(page,total,perpage){var pages=Math.ceil(total/perpage),pre=[0,1,2,page-1,page,page+1,pages-3,pages-2,pages-1];pre.sort(function(x,b){return x-b});var ix=[],ids={},lco=-1;for(var i=0;i<pre.length;i++)if(pre[i]>=0&&pre[i]<=this._maxpage){var key="S"+pre[i];if(!(key in ids)){ids[key]=1;lco===pre[i]-1?false:ix.push(EL(null));ix.push(EL(pre[i],page));lco=pre[i]}};return ix};F.prototype.enable=function(){this.getRole('items').show();return this};F.prototype.disable=function(){this.getRole('items').hide();return this};F.prototype.getCurrentPage=function(){return U.IntMoreOr(this._page,0,0)};F.prototype.maxPage=function(){return U.IntMoreOr(this._maxpage,0,0)}
function EL(i,c){return EL.is(this)?this.init(i,c):EL.F(i,c)};U.normalizeConstructor(EL);EL.F=function(i,c){return new EL(i,c)};EL.prototype.i=null;EL.prototype.c=null;EL.prototype.current=false;EL.prototype.text=null;EL.prototype.separator=false;EL.prototype.init=function(i,c){this.i=U.IntMoreOr(i,-1,null);this.c=U.IntMoreOr(c,0,0);this.separator=this.i===null;this.text=this.separator?'...':(i+1).toString();this.current=this.separator?false:(this.i===this.c);return this};WNS.Paginator=F;WNS.Paginator.Element=EL}})();
;/*========== INCLUDE @widgets/TreeView========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Widgets=window.Eve.EFO.Widgets||{};window.Eve.EFO.Widgets.TreeView?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,WNS=EFO.Widgets
function F(){return F.is(this)?this.init():F.F()};F.xInheritE(WNS.widget);F.mixines=['Roleable','Commandable','Loaderable'];U.initMixines(F);F.prototype.onBeforeInit=function(){this.getCssClassBinded=this.getCssClass.bindToObject(this);this.getDragTypeBinded=this.getDragType.bindToObject(this);this.getDragTargetBinded=this.getDragTarget.bindToObject(this);this.getIsDraggableBinded=this.getIsDraggable.bindToObject(this);var self=this;this.getElementOpened=function(){return self._getElementOpened(this)};return WNS.widget.prototype.onBeforeInit.apply(this,Array.prototype.slice.call(arguments))};F.prototype.onInit=function(){WNS.widget.prototype.onInit.apply(this,Array.prototype.slice.call(arguments));this.TreeState=TS(this.getStorageName());return this.initHandlers()};F.prototype.getWidgetClass=function(){return'TreeView'};F.prototype.getCssClass=function(){return'widgetTreeView'};F.prototype.getCommandButtons=function(){console.log('TreeView::getCommandButtons must be overriden');return[]};F.prototype.enableToolbar=function(){return true};F.prototype.enableContextMenu=function(){return true};F.prototype.enableMultiSelect=function(){return false};F.prototype.getToolbarTemplate=function(){var t=EFO.TemplateManager().get('toolbar',this.getWidgetClass());return(t&&t.length)?t:'TreeViewContent'};F.prototype.getDragType=function(){return'UserGroup'};F.prototype.getDragTarget=function(){return'UserGroup,User'};F.prototype.getIsDraggable=function(){return true};F.prototype.getStorageName=function(){return null};F.prototype.getVirtualBefore=function(){return[]};F.prototype.getVirtualAfter=function(){return[]};F.prototype.setData=function($rootArray){var $toRender=[].concat(U.safeArray(this.getVirtualBefore()),U.safeArray($rootArray),U.safeArray(this.getVirtualAfter()));this.tree=Tree($toRender,this);this.render();this.setSelection(this.TreeState.getSelected());var N=this.getDefaultSelected();N?this.LEM.Run('NODE_SELECTED',this,N):false;return this};F.prototype.resetSelection=function(){this.handle.find(this.cmClass('selected')).removeClass(this.cmClass('selected',false));return this};F.prototype.setSelection=function(x){this.handle.find(this.cmClass('selected')).removeClass(this.cmClass('selected',false));var s=null;try{s=this.handle.find(this.cmClass('NodeElement')+'[data-key="'+x+'"]');s=s&&s.length?s:null}catch(e){s=null};s=s?s:this.handle.find(this.cmClass('NodeElement')+':first');s&&s.length?s.addClass(this.cmClass('selected',false)):false;return this};F.prototype.getDefaultSelected=function(){var x=this.handle.find(this.cmClass('selected')+':first').data('key');return x?this.getNodeByKey(x):null};F.prototype.render=function(){var TO={element:EFO.TemplateManager().get('node',this.getWidgetClass())};this.childs=this.tree.root;this.getRole('items').html(Mustache.render(TO.element,this,TO));this.childs=null;return this};F.prototype.initHandlers=function(){this.handle.on('click','[data-node-element="itemHeader"]',this.onHeaderClick.bindToObject(this));this.handle.on('click','[data-node-element="itemIcon"]',this.onIconClick.bindToObject(this));this.handle.on('contextmenu','[data-node-element="itemHeader"]',this.onContextMenu.bindToObject(this));this.initDnD();return this};F.prototype.cmClass=function(x,pf){pf=U.anyBool(pf,true);return[pf?'.':'',this.getCssClass(),x].join('')};F.prototype.getNodeByKey=function(key){return this.tree.getNodeByKey(key)};F.prototype.onHeaderClick=function(e){var t=jQuery(e.currentTarget),te=t.closest(this.cmClass('NodeElement'));if(!te.hasClass(this.cmClass('selected',false))){if(!this.enableMultiSelect()){var z=this.handle.find(this.cmClass('selected'));if(z.length){var tt=z.data('key');z.removeClass(this.cmClass('selected',false));this.LEM.Run('NODE_UNSELECTED',this,this.getNodeByKey(tt))}};var node=this.getNodeByKey(te.data('key'));te.addClass(this.cmClass('selected',false)).removeClass(this.cmClass('NodeElementStateclosed',false)).addClass(this.cmClass('NodeElementStateopened',false));this.LEM.Run('NODE_SELECTED',this,node);this.TreeState.setSelected(node.key);this.LEM.Run('NODE_OPENED',this,node);this.TreeState.setOpenedSave(node.key,true)}else if(this.enableMultiSelect()){te.removeClass(this.cmClass('selected',false));this.LEM.Run('NODE_UNSELECTED',this,this.getNodeByKey(tt))};return this};F.prototype.onIconClick=function(e){var t=jQuery(e.currentTarget),te=t.closest(this.cmClass('NodeElement'));if(te.hasClass(this.cmClass('NodeElementStateclosed',false))){te.removeClass(this.cmClass('NodeElementStateclosed',false)).addClass(this.cmClass('NodeElementStateopened',false));this.LEM.Run('NODE_OPENED',this,this.getNodeByKey(te.data('key')));this.TreeState.setOpenedSave(te.data('key'),true)}else{te.removeClass(this.cmClass('NodeElementStateopened',false)).addClass(this.cmClass('NodeElementStateclosed',false));this.LEM.Run('NODE_CLOSED',this,this.getNodeByKey(te.data('key')));this.TreeState.setOpenedSave(te.data('key'),false)};e.stopPropagation();return this};F.prototype.onContextMenu=function(e){if(this.enableContextMenu()){e.preventDefault?e.preventDefault():e.returnValue=false;var t=jQuery(e.currentTarget);this.contextMenu?false:this.createContextMenu();var TE=t.closest(this.cmClass('NodeElement'));this.contextMenu.setItems(this.getContextMenuItems()).show(jQuery(e.currentTarget)).setData(this.getNodeByKey(TE.data('key')))};return this};F.prototype.createContextMenu=function(){this.contextMenu=WNS.contextMenu(this.getCssClass()).setCI(this);return this};F.prototype.getContextMenuItems=function(){return[{command:'edit',icon:'edit',title:"Редактировать"},{command:'addChild',icon:'child',title:"Добавить дочерний"},{command:'remove',icon:'remove',title:"Удалить"}]};F.prototype.initDnD=function(){if(this.getIsDraggable()){EFO.DnDManager().LEM.On('ON_DRAG_OVER_UserGroup',this,this.onDragOverUg.bindToObject(this));EFO.DnDManager().LEM.On('ON_DRAG_LEAVE_UserGroup',this,this.onDragLeaveUg.bindToObject(this));EFO.DnDManager().LEM.On('ON_DROPPED_UserGroup',this,this.onInternalDrop.bindToObject(this))};return this};F.prototype.onDragOverUg=function(DM,T){var ET=T.closest(this.cmClass('NodeElement'));if(ET.hasClass(this.cmClass('NodeElementStateclosed',false))){this._to_open_node=ET;this._open_node_to=window.setTimeout(this.autoOpenNode.bindToObject(this),500)};return this};F.prototype.onDragLeaveUg=function(DM,T){this._to_open_node=null;window.clearTimeout(this._open_node_to);this._open_node_to=null;return this};F.prototype.onInternalDrop=function(DM,T){try{var Target=this.getNodeByKey(T.closest(this.cmClass('NodeElement')).data('key')),Darggable=this.getNodeByKey(DM._dragging.closest(this.cmClass('NodeElement')).data('key'));this.LEM.Run('INTERNAL_DRAG',Darggable,Target);this.onDropTreeItem(Darggable,Target)}catch(e){U.THREAD_ERRO(e)};return this};F.prototype.onDropTreeItem=function(d,t){return this};F.prototype.autoOpenNode=function(){if(this._to_open_node)this._to_open_node.removeClass(this.cmClass('NodeElementStateclosed',false)).addClass(this.cmClass('NodeElementStateopened',false));return this};F.prototype.getSelection=function(){var j=this.handle.find(this.cmClass('selected')),r=[],result=[];if(j&&j.length){j.each(function(){r.push(jQuery(this).data('key'))});for(var i=0;i<r.length;i++){var el=this.getNodeByKey(r[i]);el?result.push(el):false}};return this.enableMultiSelect()?result:result.slice(0,1)};F.prototype._getElementOpened=function(node){return this.TreeState.getOpened(node.key)}
function Tree(rA,cI){return Tree.is(this)?this.init(rA,cI):Tree.F(rA,cI)};U.normalizeConstructor(Tree);Tree.F=function(z,x){return new Tree(z,x)};Tree.prototype.data_interface=null;Tree.prototype.data=null;Tree.prototype.root=null;Tree.prototype.getElementId=null;Tree.prototype.getElementKey=null;Tree.prototype.getElementName=null;Tree.prototype.getElementCss=null;Tree.prototype.getElementOpened=null;Tree.prototype.getElementHasChilds=null;Tree.prototype.getElementChilds=null;Tree.prototype.getElementIconName=null;Tree.prototype.index=null;Tree.prototype.init=function(data,di){this.data_interface=U.isObject(di)?di:null;this.data=U.isArray(data)?data:[];this.initInterface();this.root=[];this.index={};for(var i=0;i<this.data.length;i++)this.root.push(Node(this.data[i],this));return this};Tree.prototype.initInterface=function(){var rt=['getElementId','getElementKey','getElementName','getElementCss','getElementOpened','getElementHasChilds','getElementChilds','getElementIconName'];for(var i=0;i<rt.length;i++)this[rt[i]]=this.data_interface&&U.isCallable(this.data_interface[rt[i]])?this.data_interface[rt[i]]:this['_'+rt[i]];return this};Tree.prototype._getElementId=function(){return this.id};Tree.prototype._getElementKey=function(){return['N',this.id].join('')};Tree.prototype._getElementName=function(){return this.name};Tree.prototype._getElementCss=function(){return''};Tree.prototype._getElementOpened=function(){return false};Tree.prototype._getElementHasChilds=function(){return this.childs&&U.isArray(this.childs)&&this.childs.length?true:false};Tree.prototype._getElementChilds=function(){return this.childs};Tree.prototype._getElementIconName=function(){return'Floder'};Tree.prototype.getNodeByKey=function(key){return key&&(key in this.index)?this.index[key]:null}
function Node(x,di){return Node.is(this)?this.init(x,di):Node.F(x,di)};U.normalizeConstructor(Node);Node.F=function(x,di){return new Node(x,di)};Node.prototype.id=null;Node.prototype.name=null;Node.prototype.key=null;Node.prototype.css=null;Node.prototype.opened=false;Node.prototype.hasChilds=false;Node.prototype.childs=null;Node.prototype.source=null;Node.prototype.icon=null;Node.prototype.init=function(x,di,parent){x=U.isObject(x)?x:{};this.id=di.getElementId.call(x);this.key=di.getElementKey.call(x);this.name=di.getElementName.call(x);this.css=di.getElementCss.call(x);this.hasChilds=di.getElementHasChilds.call(x);this.icon=di.getElementIconName.call(x);di.index[this.key]=this;this.source=x;this.opened=di.getElementOpened.call(this);var childs=this.hasChilds?di.getElementChilds.call(x):null;if(childs){this.childs=[];for(var i=0;i<childs.length;i++)this.childs.push(Node(childs[i],di,this))}else this.childs=null;return this}
function TS(x){return TS.is(this)?this.init(x):TS.F(x)};U.normalizeConstructor(TS);TS.F=function(x){return new TS(x)};TS.prototype.key=null;TS.prototype.data=null;TS.prototype.init=function(x){this.key=U.NEString(x,null);this.load();return this};TS.prototype.load=function(){if(this.checkKey())try{this.data=JSON.parse(localStorage.getItem(this.key));U.isObject(this.data)?false:this.data={};return this}catch(e){};this.data={};return this};TS.prototype.save=function(){if(this.checkKey())try{localStorage.setItem(this.key,JSON.stringify(this.data))}catch(e){};return this};TS.prototype.getSelected=function(){return('s'in this.data)?this.data.s:null};TS.prototype.setSelected=function(x){this.data.s=x;return this};TS.prototype.setSelectedSave=function(x){return this.setSelected(x).save()};TS.prototype.getOpened=function(x){return U.isObject(this.data.o)&&(x in this.data.o)?U.anyBool(this.data.o[x],false):false};TS.prototype.setOpened=function(x,s){U.isObject(this.data.o)?false:this.data.o={};if(U.anyBool(s,false)){this.data.o[x]=1}else if(x in this.data.o)delete(this.data.o[x]);return this};TS.prototype.setOpenedSave=function(x,s){return this.setOpened(x,s).save()};TS.prototype.checkKey=function(){return this.key?true:false};WNS.TreeView=F;WNS.TreeView.Tree=Tree;WNS.TreeView.Tree.Node=Node;WNS.TreeView.TreeState=TS}})();
;/*========== INCLUDE @widgets/contextMenu========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Widgets=window.Eve.EFO.Widgets||{};window.Eve.EFO.Widgets.contextMenu?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,WNS=EFO.Widgets
function F(cc){return F.is(this)?this.init(cc):F.F(cc)};F.xInheritE(WNS.widget);F.F=function(cc){return new F(cc)};F.mixines=['Roleable','Commandable'];U.initMixines(F);F.prototype.CI=null;F.prototype.customClass=null;F.prototype.items=null;F.prototype._contextData=null;F.prototype.getWidgetClass=function(){return'contextMenu'};F.prototype.onBeforeInit=function(cc){this.customClass=cc;this.getCssClassBind=this.getCssClass.bindToObject(this);return WNS.widget.prototype.onBeforeInit.apply(this,Array.prototype.slice.call(arguments))};F.prototype.onInit=function(cc){this.initMenuHandlers();return WNS.widget.prototype.onInit.apply(this,Array.prototype.slice.call(arguments))};F.prototype.setItems=function(x){x=U.isArray(x)?x:null;this.items=x;this.getRole('items').html(Mustache.render(EFO.TemplateManager().get('items',this.getWidgetClass()),this));return this};F.prototype.setCI=function(x){this.CI=U.isObject(x)?x:null;return this};F.prototype.setData=function(x){this._contextData=x;return this};F.prototype.getData=function(){return this._contextData};F.prototype.getContainer=function(){return jQuery('body')};F.prototype.onCommand=function(e){var t=jQuery(e.currentTarget),command=U.UCFirst(t.data('command'));if(command&&command.length){var cm="onMenuCommand"+command;if(this.CI&&U.isCallable(this.CI[cm])){e.preventDefault?e.preventDefault():e.returnValue=false;e.stopPropagation();this.CI[cm](t,e,this)}else U.THREAD_ERR("NoCommandHandler:"+cm)};return this.hide()};F.prototype.initMenuHandlers=function(){this.handle.on('mouseleave',this.hide.bindToObject(this));return this};F.prototype.show=function(x){WNS.widget.prototype.show.apply(this,Array.prototype.slice(arguments));return this.positeContextMenu(x)};F.prototype.positeContextMenu=function(x){if(window.jQuery&&U.isObject(x)&&(x instanceof jQuery)){var pos=x.offset(),left=pos.left,top=pos.top,yo=parseFloat(x.outerHeight(true)),mw=parseFloat(this.handle.outerWidth(true)),mh=parseFloat(this.handle.outerHeight(true)),wh=parseFloat(jQuery(window).innerHeight()),ww=parseFloat(jQuery(window).innerWidth()),st=parseFloat(jQuery(document).scrollTop());top=top+yo;if((top+mh)-st>wh)top=(st+wh)-mh;if(left+mw>ww)left=ww-mw;this.handle.css({left:left+'px',top:top+'px'})};return this};WNS.contextMenu=F}})();
;/*========== INCLUDE @classes/windowController========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.windowController?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U
function F(){return F.is(this)?this.init():F.F()};F.xInheritE(EFO.Handlable);F.prototype.getWrapperTemplate=function(){return EFO.TemplateManager().get('windowController.default')};F.prototype.getControllerAlias=function(){return'windowController'};F.prototype.getCssClass=function(){return'windowController'};F.prototype.enumSubTemplates=function(){return['windowController.footer','windowController.footerButton','windowController.title']};F.prototype.getFooterButtons=function(){return[{command:"cancel",text:"Отмена"},{command:"apply",text:"применить"}]};F.prototype.getDefaultTitle=function(){return"title"};F.prototype.placeAtCenter=function(){try{var pcwidth=parseFloat(this.handle.innerWidth())/100,pcheight=parseFloat(this.handle.innerHeight())/100,mwpc=parseFloat(this.getRole('window').outerWidth(true))/pcwidth,mhpc=parseFloat(this.getRole('window').outerHeight(true))/pcheight,mtpc=(100-mhpc)/2,mlpc=(100-mwpc)/2;this.getRole('window').css({top:mtpc+'%',left:mlpc+'%'})}catch(e){this.threadErrorObject(e)};return this};F.prototype.sizeable_getMarker=function(){try{return this.getRole('resizer')}catch(e){this.threadErrorObject(e)};return jQuery(null)};F.prototype.sizeable_getWindow=function(){try{return this.getRole('window')}catch(e){this.threadErrorObject(e)};return jQuery(null)};F.prototype.sizeable_getContainer=function(){return this.handle};F.prototype.sizeable_getParams=function(){return{w:80,h:80}};F.prototype.sizeable_setParams=function(){return this};F.prototype.sizeable_defaultWidth=function(){return 80};F.prototype.sizeable_defaultHeight=function(){return 80};EFO.windowController=F}})();
;/*========== INCLUDE @classes/flatController========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.flatController?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U
function F(){return F.is(this)?this.init():F.F()};F.xInheritE(EFO.Handlable);F.prototype.fragment=null;F.prototype.container=null;F.prototype.getWrapperTemplate=function(){return EFO.TemplateManager().get('flatController.default')};F.prototype.getControllerAlias=function(){return'flatController'};F.prototype.getCssClass=function(){return'flatController'};F.prototype.enumSubTemplates=function(){return[]};F.prototype.setContainer=function(x){this.container=U.isDOM(x)?x:U.isJQuery(x)?x:U.NEString(x)?document.getElementById(U.NEString(x)):null;if(this.container)this.show();return this};F.prototype.getContainer=function(){if(this.container)return this.container;return this.getFragment()};F.prototype.getFragment=function(){if(!this.fragment)this.fragment=document.createDocumentFragment();return this.fragment};F.prototype.onAfterHide=function(){this.handle?this.handle.appendTo(this.getFragment()):false;return EFO.Handlable.prototype.onAfterHide.apply(this,Array.prototype.slice.call(arguments))};EFO.flatController=F}})();
;/*========== INCLUDE @Com/EFOPromise========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.EFOPromise?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U
function PromiseCallback(co,ca){return PromiseCallback.is(this)?this.init(co,ca):PromiseCallback.F(co,ca)};U.normalizeConstructor(PromiseCallback);var PC=PromiseCallback;PC.prototype.context=null;PC.prototype.callable=null;PC.prototype.init=function(co,ca){this.callable=U.isCallable(ca)?ca:(U.isCallable(co)?co:null);this.context=U.isObject(co)?co:(U.isObject(ca)?ca:null);return this};PC.prototype.isValid=function(){return this.callable?true:false};PC.prototype.run=function(){var args=Array.prototype.slice.call(arguments);return this.runArray(args)};PC.prototype.runArray=function(args){args=U.safeArray(args);if(this.callable)try{return this.callable.apply(this.context?this.context:this,args)}catch(err){U.TError(err)};return null};PC.prototype.pushValid=function(pushTo){(U.isArray(pushTo)&&this.isValid())?pushTo.push(this):false;return this};PC.prototype.setFailsaveContext=function(x){this.context===null&&U.isObject(x)?this.context=x:false;return this};PC.prototype.clear=function(){this.context=null;this.callable=null;return this}
function Promise(co,cbfn){U.isCallable(cbfn)||U.isCallable(co)?false:U.ERR("EFOPromise requires callable");return Promise.is(this)?this.init.apply(this,Array.prototype.slice.call(arguments)):Promise.F.apply(this,Array.prototype.slice.call(arguments))};U.normalizeConstructor(Promise);var F=Promise,EFOPromise=Promise;F.prototype.handlersSuccess=null;F.prototype.handlersError=null;F.prototype.handlersSuccessAfter=null;F.prototype.handlersErrorAfter=null;F.prototype.handlersSuccessBefore=null;F.prototype.handlersErrorBefore=null;F.prototype.state=0;F.prototype.result=null;F.prototype.init=function(runContext,callable){this.initHandlersArrays();var nc=this.fixContext(runContext,callable);try{nc.callable.apply(nc.context,[this.onSuccess.bindToObject(this),this.onFail.bindToObject(this)].concat(Array.prototype.slice.call(arguments,2)))}catch(e){this.onFail(e)};return this};F.prototype.fixContext=function(co,ca){return{context:U.isObject(co)?co:(U.isObject(ca)?ca:this),callable:U.isCallable(ca)?ca:(U.isCallable(co)?co:null)}};F.prototype.initHandlersArrays=function(){this.handlersError=[];this.handlersErrorAfter=[];this.handlersErrorBefore=[];this.handlersSuccess=[];this.handlersSuccessAfter=[];this.handlersSuccessBefore=[];return this};F.prototype.clearHandlersArrays=function(){this.handlersError=null;this.handlersErrorAfter=null;this.handlersErrorBefore=null;this.handlersSuccess=null;this.handlersSuccessAfter=null;this.handlersSuccessBefore=null;return this};F.prototype.clear=function(){return this.clearCallbacks(this.handlersError).clearCallbacks(this.handlersErrorAfter).clearCallbacks(this.handlersErrorBefore).clearCallbacks(this.handlersSuccess).clearCallbacks(this.handlersSuccessAfter).clearCallbacks(this.handlersSuccessBefore).clearHandlersArrays()};F.prototype.clearCallbacks=function(x){x=U.safeArray(x);for(var i=0;i<x.length;i++)x[i].clear();return this};F.prototype.done=function(co,ca){(this.state===1)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersSuccess):false;return this};F.prototype.doneAfter=function(co,ca){(this.state===1)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersSuccessAfter):false;return this};F.prototype.doneBefore=function(co,ca){(this.state===1)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersErrorBefore):false;return this};F.prototype.fail=function(co,ca){(this.state===2)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersError):false;return this};F.prototype.failAfter=function(co,ca){(this.state===2)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersErrorAfter):false;return this};F.prototype.failBefore=function(co,ca){(this.state===2)?this._applyCallback(PromiseCallback(co,ca)):(this.state===0)?PromiseCallback(co,ca).pushValid(this.handlersErrorBefore):false;return this};F.prototype.always=function(co,ca){(this.state!==0)?this._applyCallback(PromiseCallback(co,ca)):PromiseCallback(co,ca).pushValid(this.handlersSuccess).pushValid(this.handlersError);return this};F.prototype.alwaysAfter=function(co,ca){(this.state!==0)?this._applyCallback(PromiseCallback(co,ca)):PromiseCallback(co,ca).pushValid(this.handlersSuccessAfter).pushValid(this.handlersErrorAfter);return this};F.prototype.alwaysBefore=function(co,ca){(this.state!==0)?this._applyCallback(PromiseCallback(co,ca)):PromiseCallback(co,ca).pushValid(this.handlersSuccessBefore).pushValid(this.handlersErrorBefore);return this};F.prototype.onSuccess=function(){if(this.state===0){this.state=1;this.result=Array.prototype.slice.call(arguments);for(var i=0;i<this.handlersSuccessBefore.length;i++)this._applyCallback(this.handlersSuccessBefore[i]);for(var i=0;i<this.handlersSuccess.length;i++)this._applyCallback(this.handlersSuccess[i]);for(var i=0;i<this.handlersSuccessAfter.length;i++)this._applyCallback(this.handlersSuccessAfter[i])};return this.clear()};F.prototype.onFail=function(){if(this.state===0){this.state=2;this.result=Array.prototype.slice.call(arguments);for(var i=0;i<this.handlersErrorBefore.length;i++)this._applyCallback(this.handlersErrorBefore[i]);for(var i=0;i<this.handlersError.length;i++)this._applyCallback(this.handlersError[i]);for(var i=0;i<this.handlersErrorAfter.length;i++)this._applyCallback(this.handlersErrorAfter[i])};return this.clear()};F.prototype._applyCallback=function(cbi){if(PromiseCallback.is(cbi))cbi.setFailsaveContext(this).runArray(this.result);return this}
function promiseAggregator(promises){return promiseAggregator.is(this)?this.init(promises):promiseAggregator.F(promises)};U.normalizeConstructor(promiseAggregator);var PW=promiseAggregator;PW.prototype.promises=null;PW.prototype.promise=null;PW.prototype._psuccess=null;PW.prototype._pfail=null;PW.prototype._total=0;PW.prototype._successed=0;PW.prototype.init=function(promises){promises=U.safeArray(promises);this.promises=[];for(var i=0;i<promises.length;i++)if(EFOPromise.is(promises[i]))this.promises.push(promises[i]);for(var i=0;i<this.promises.length;i++){this.promises[i].fail(this,this._promiseFail);this.promises[i].done(this,this._promiseSuccess)};this.promise=EFOPromise(this,this._rqst);return this};PW.prototype._rqst=function(success,fail){this._psuccess=U.isCallable(success)?success:null;this._pfail=U.isCallable(fail)?fail:null;return this.checkReady()};PW.prototype.checkReady=function(){if(this.promises.length===this._successed){U.isCallable(this._psuccess)?this._psuccess():false}else if(this._total===this.promises.length)U.isCallable(this._pfail)?this._pfail():false;return this};PW.prototype._promiseFail=function(){this._total++;return this.checkReady()};PW.prototype._promiseSuccess=function(){this._total++;this._successed++;return this.checkReady()};PW.prototype.done=function(co,ca){this.promise.done.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.doneAfter=function(co,ca){this.promise.doneAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.doneBefore=function(co,ca){this.promise.doneBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.fail=function(co,ca){this.promise.fail.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.failBefore=function(co,ca){this.promise.failBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.failAfter=function(co,ca){this.promise.failAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.always=function(co,ca){this.promise.always.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.alwaysBefore=function(co,ca){this.promise.alwaysBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};PW.prototype.alwaysAfter=function(co,ca){this.promise.alwaysAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};F.waitFor=function(){var promises=[],input=Array.prototype.slice.call(arguments);for(var i=0;i<input.length;i++)if(F.is(input[i]))promises.push(input[i]);return promiseAggregator(promises)};F.waitForArray=function(promises){var ch=[];promises=U.safeArray(promises);for(var i=0;i<promises.length;i++)F.is(promises[i])?ch.push(promises[i]):false;return promiseAggregator(ch)}
function Defer(){return Defer.is(this)?this.init():Defer.F()};U.normalizeConstructor(Defer);Defer.prototype._promisesuccess=null;Defer.prototype._promisefail=null;Defer.prototype.promise=null;Defer.prototype.init=function(){this.promise=Promise(this,function(s,f){this._promisesuccess=s;this._promisefail=f;return this});return this};Defer.prototype.done=function(){this.promise.done.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.doneBefore=function(){this.promise.doneBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.doneAfter=function(){this.promise.doneAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.fail=function(){this.promise.fail.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.failAfter=function(){this.promise.failAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.failBefore=function(){this.promise.failBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.always=function(){this.promise.always.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.alwaysBefore=function(){this.promise.alwaysBefore.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.alwaysAfter=function(){this.promise.alwaysAfter.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.resolve=function(){this._promisesuccess.apply(this.promise,Array.prototype.slice.call(arguments));return this};Defer.prototype.reject=function(){this._promisefail.apply(this.promise,Array.prototype.slice.call(arguments));return this};EFO.EFOPromise=F;EFO.Promise=F;EFO.Defer=Defer}})();
;/*========== INCLUDE @Com/EFORequest========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Request?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,RO=null,H=null,statusProcessors={},preprocessors=[],postprocessors=[]
function PromiseWrapper(s,c,co){return PromiseWrapper.is(this)?this.init(s,c,co):PromiseWrapper.F(s,c,co)};U.normalizeConstructor(PromiseWrapper);var W=PromiseWrapper;W.prototype.status=null;W.prototype.callable=null;W.prototype.context=null;W.prototype.init=function(status,callable,context){this.status=U.NEString(status,null);this.callable=U.isCallable(callable)?callable:null;this.context=U.isObject(context)?context:null;return this};W.prototype.isValid=function(){return(this.status&&this.callable)?true:false};W.prototype.run=function(){return EFO.EFOPromise.apply(null,[this.context?this.context:this,this.callable].concat(Array.prototype.slice.call(arguments)))}
function addWrapper(pw){if(W.is(statusProcessors[pw.status]))U.ERR("Cant replace statusWrapper. RemoveOldFirst");statusProcessors[pw.status]=pw}
function AbstractProcessor(co,ca){return AbstractProcessor.is(this)?this.init(co,ca):AbstractProcessor.F(co,ca)};U.FixCon(AbstractProcessor);var AP=AbstractProcessor;AP.prototype.callable=null;AP.prototype.context=null;AP.prototype.init=function(co,ca){this.callable=U.isCallable(ca)?ca:U.isCallable(co)?co:null;this.context=U.isObject(co)?co:U.isObject(ca)?ca:null;return this};AP.prototype.run=function(){return this.runArray(Array.prototype.slice.call(arguments))};AP.prototype.runArray=function(args){if(this.isValid())try{this.callable.apply(this.context?this.context:this,U.safeArray(args))}catch(e){U.TError(e)};return this};AP.prototype.isValid=function(){return this.callable?true:false};AP.prototype.pushValid=function(stor){U.isArray(stor)&&this.isValid()?stor.push(this):false;return this}
function RequestOptions(){return RequestOptions.is(H)?H:RequestOptions.is(this)?this.init():RequestOptions.F()};U.FixCon(RequestOptions);var O=RequestOptions;O.prototype.cross=true;O.prototype.statusSection='status';O.prototype.errorSection='error';O.prototype.init=function(){H=this;return this};O.prototype.addWrapper=function(status,processorFunc,context){var wrapper=PromiseWrapper(status,processorFunc,context);wrapper&&wrapper.isValid()?addWrapper(wrapper):false;return this};O.prototype.hasWrapper=function(status){return status&&(status in statusProcessors)&&(PromiseWrapper.is(statusProcessors[status]))?true:false};O.prototype.removeWrapper=function(status){if(this.hasWrapper(status))delete(statusProcessors[status]);return this};O.prototype.runWrapper=function(status){var args=Array.prototype.slice.call(arguments,1);return statusProcessors[status].run.apply(statusProcessors[status],args)};O.prototype.registerPreprocessor=function(co,ca){AbstractProcessor(co,ca).pushValid(preprocessors);return this};O.prototype.registerPostprocessor=function(co,ca){AbstractProcessor(co,ca).pushValid(postprocessors);return this};RO=O
function Request(method,url,data){return Request.is(this)?this.init(method,url,data):Request.F(method,url,data)};U.normalizeConstructor(Request);var F=Request;F.prototype.promise=null;F.prototype.xhr=null;F.prototype.method=null;F.prototype.url=null;F.prototype.data=null;F.prototype._promiseSuccess=null;F.prototype._promiseFail=null;F.prototype.cross=false;F.prototype.init=function(method,url,data){this.method=/^post$/.test(method)?'POST':'GET';this.url=U.NEString(url,window.location.href);this.data=U.safeObject(data);this.cross=RO().cross;this.runProcessors(preprocessors,this);this.promise=EFO.EFOPromise(this,this._run);return this};F.prototype.runProcessors=function(ppl){var args=Array.prototype.slice.call(arguments,1);ppl=U.safeArray(ppl);for(var i=0;i<ppl.length;i++)ppl[i].runArray(args);return this};F.prototype._run=function(success,fail){this._promiseSuccess=success;this._promiseFail=fail;this.runRequest();return this};F.prototype.runRequest=function(){var xhc=("onload"in new XMLHttpRequest())?XMLHttpRequest:XDomainRequest;this.xhr=new xhc();this.xhr.open(this.method,this.method==='POST'?this.url:this.encodeUrl());this.xhr.onreadystatechange=this.onreadystatechange.bindToObject(this);this.method==='POST'?this.xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded'):false;this.xhr.withCredentials=this.cross;this.method==='POST'?this.xhr.send(this.encodeData()):this.xhr.send();return this};F.prototype.onreadystatechange=function(){if(this.xhr.readyState===4){try{if(this.xhr.status===200){var d=JSON.parse(this.xhr.responseText);if(U.isObject(d)){if(d[RO().statusSection]==='ok'){this.runProcessors(postprocessors,this,d);this._promiseSuccess(d);return this.clear()};if(RO().hasWrapper(d[RO().statusSection])){RO().runWrapper(d[RO().statusSection],d).done(this,this.repeat).fail(this,this.failStatus);this.xhr=null;return this}else if(d[RO().statusSection]==='error')throw new Error(d[RO().errorSection])};throw new Error("MailformedResponce")}else throw new Error("NetworkError")}catch(e){this._promiseFail(e)};return this.clear()};return this};F.prototype.repeat=function(){this.runProcessors(preprocessors,this);return this.runRequest()};F.prototype.failStatus=function(){this._promiseFail(new Error("UnknownResponceStatus"));return this};F.prototype.clear=function(){this.xhr=null;return this};F.prototype.encodeUrl=function(){var urlData=this.encode(this.data);return[this.url,urlData.length?(this.url.indexOf('?')<0?'?':'&'):'',urlData].join('')};F.prototype.encodeData=function(){return this.encode(this.data)};F.prototype.encode=function(element,key,list){var list=list||[];if(typeof element==='object'){for(var idx in element)this.encode(element[idx],key?key+'['+idx+']':idx,list)}else list.push(key+'='+encodeURIComponent(element));return list.join('&')};F.prototype.done=function(){this.promise.done.apply(this.promise,Array.prototype.slice.call(arguments));return this};F.prototype.fail=function(){this.promise.fail.apply(this.promise,Array.prototype.slice.call(arguments));return this};F.prototype.always=function(){this.promise.always.apply(this.promise,Array.prototype.slice.call(arguments));return this};F.getRequestOptions=function(){return RO()};EFO.Request=F}})();
;/*========== INCLUDE @Com/ImageManager========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.ImageManager?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null
function ImageManager(){return ImageManager.is(H)?H:ImageManager.is(this)?this.init():ImageManager.F()};U.FixCon(ImageManager);var F=ImageManager;F.prototype.nodes=[];F.prototype.init=function(){H=this;this.nodes={};return this};F.prototype.install=function(tpl){if(!(tpl in this.nodes)){var node=document.createElement('div');node.style.display='none';node.innerHTML=EFO.TemplateManager().get(tpl);this.nodes[tpl]=node};this.getBody().appendChild(this.nodes[tpl]);return this};F.prototype.getBody=function(){if(!this.body){this.body=document.getElementsByTagName('body');this.body=this.body&&this.body.length?this.body[0]:document.documentElement};return this.body};F.prototype.uninstall=function(tpl){if(tpl in this.nodes)this.nodes[tpl].remove();return this};EFO.ImageManager=F}})();
;/*========== INCLUDE @Com/Com========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Com?false:initPlugin()
function initPlugin(){var EFO=window.Eve.EFO,U=EFO.U,H=null,c={},s={},j={},prefix='',head=null,postfix=".js"
function Com(){return Com.is(H)?H:Com.is(this)?this.init():Com.F()};U.normalizeConstructor(Com)
function getHead(){if(!head){head=document.getElementsByTagName('head');if(head&&head.length){head=head[0]}else{head=document.getElementsByTagName('body');if(head&&head.length){head=head[0]}else head=document.documentElement}};return head}
function findElement(tag,attr,val){var tags=document.getElementsByTagName(tag);for(var i=0;i<tags.length;i++)if(tags[i][attr]===val)return tags[i];return null}
function loadScript(succ,fail,url,id){var ps=findElement('script','src',url);if(ps){succ(ps,url,id)}else{var s=document.createElement('script');s.src=url;s.id=id;s.async=true;s.onload=function(){succ(s,url,id)};s.onerror=function(){fail(s,url,id)};getHead().appendChild(s)};return this}
function loadCom(cn,id){var R=EFO.Defer(),s=document.createElement('script');s.id=id;s.src=[prefix,cn,postfix].join('');s.async=true;s.onerror=function(){R.reject(new Error("LoadError"))};getHead().appendChild(s);return R}
function loadStyle(succ,fail,url,id){var ps=findElement('link','href',url);if(ps){succ(ps,url,id)}else{var s=document.createElement('link');s.href=url;s.rel="stylesheet";s.type="text/css";s.id=id;s.async=true;s.onload=function(){succ(s,url,id)};s.onerror=function(){fail(s,url,id)};getHead().appendChild(s)};return this};Com.prototype.LEM=null;Com.prototype.init=function(){H=this;this.LEM=EFO.Events.LEM();return this};Com.prototype.js=function(url){if(!(url in j)){var id=U.UID();j[url]=EFO.EFOPromise(this,loadScript,url,id).failAfter(this,function(tag,url,id){delete(j[url]);tag.remove()})};return j[url]};Com.prototype.css=function(url){if(!(url in s)){var id=U.UID();s[url]=EFO.EFOPromise(this,loadStyle,url).failAfter(this,function(tag,url,id){delete(s[url]);tag.remove()})};return s[url]};Com.prototype.load=function(cn){cn=this.prepareCn(cn);if(!(cn in c)){var id=U.UID();c[cn]=loadCom(cn,id).failAfter(this,function(){delete(c[cn])}).alwaysAfter(this,function(){try{document.getElementById(id).remove()}catch(e){}})};return c[cn]};Com.prototype.prepareCn=function(cn){cn=cn.replace(/\\/g,'.').replace(/\//g,'.').replace(/\.{2,}/g,'.');return cn.replace(/^\.{1,}/g,'').replace(/\.{1,}$/g,'')};Com.prototype.com=Com.prototype.load;Com.prototype.reportSuccess=function(FQCN,comObj){EFO.Defer.is(c[FQCN])?c[FQCN].resolve(comObj):c[FQCN]=EFO.Defer().resolve(comObj)};Com.prototype.reportFail=function(FQCN,error){EFO.Defer.is(c[FQCN])?c[FQCN].reject(U.safeError(error)):false};Com.prototype.reportBuilderFail=function(FQCN,error){EFO.Defer.is(c[FQCN])?c[FQCN].reject(U.safeError(error)):false};Com.prototype.setPrimaryUrl=function(x){prefix=x;return this};Com.prototype.setPostfix=function(x){postfix=x;return this};EFO.Com=Com}})();
;/*========== INCLUDE @Com/StyleDriver========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.StyleDriver?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null,TP=null,storage={}
function getTP(){if(!TP){TP=document.getElementsByTagName('head');TP=TP&&TP.length?TP[0]:null;if(!TP){TP=document.getElementsByTagName('body');TP=TP&&TP.length?TP[0]:document.documentElement}};return TP}
function StorageObject(id,key,text){return StorageObject.is(this)?this.init(id,key,text):StorageObject.F(id,key,text)};U.FixCon(StorageObject);var SO=StorageObject;SO.prototype.id=null;SO.prototype.handle=null;SO.prototype.key=null;SO.prototype.init=function(id,key,text){this.key=U.NEString(key);this.id=id;U.isObject(text)?text=this.prepare(text):false;text=U.NEString(text);if(this.key&&text){this.handle=document.createElement('style');this.handle.innerHTML=text;this.handle.type="text/css";this.handle.id=[this.id,this.key].join('___')};return this};SO.prototype.isValid=function(){return this.handle?true:false};SO.prototype.install=function(){getTP().appendChild(this.handle);return this};SO.prototype.uninstall=function(){this.handle.remove();return this};SO.prototype.prepare=function(x){if(x&&U.isArray(x.k)&&U.NEString(x.c))return EFO.TemplateManager()._runpreparer(x.k,x.c);return'/*--- Invalid Style ---*/'}
function StorageElement(id,data){return StorageElement.is(this)?this.init(id,data):StorageElement.F(id,data)};U.FixCon(StorageElement);var SE=StorageElement;SE.prototype.items=null;SE.prototype.id=null;SE.prototype.init=function(id,data){this.id=U.NEString(id);this.items={};data=U.safeObject(data);for(var k in data)if(data.hasOwnProperty(k)){var so=SO(this.id,k,data[k]);so&&so.isValid()?this.items[so.key]=so:false};return this};SE.prototype.isValid=function(){return this.id?true:false};SE.prototype.installAll=function(){for(var k in this.items)SO.is(this.items[k])?this.items[k].install():false;return this};SE.prototype.uninstallAll=function(){for(var k in this.items)SO.is(this.items[k])?this.items[k].uninstall():false;return this};SE.prototype.getElement=function(key){return(key in this.items)&&SO.is(this.items[key])?this.items[key]:null};SE.prototype.install=function(key){var s=this.getElement(key);s?s.install():false;return this};SE.prototype.uninstall=function(key){var s=this.getElement(key);s?s.uninstall():false;return this}
function StyleDriver(){return StyleDriver.is(H)?H:StyleDriver.is(this)?this.init():StyleDriver.F()};U.FixCon(StyleDriver);var F=StyleDriver;F.prototype.init=function(){H=this;return this};F.prototype.setStyles=function(id,data){var Z=SE(id,data);Z&&Z.isValid()?storage[Z.id]=Z:false;return this};F.prototype.getElement=function(id){return id&&(id in storage)&&SE.is(storage[id])?storage[id]:null};F.prototype.installStyles=function(id){var s=this.getElement(id);s?s.installAll():false;return this};F.prototype.uninstallStyles=function(id){var s=this.getElement(id);s?s.uninstallAll():false;return this};F.prototype.install=function(id,key){var s=this.getElement(id);s?s.install(key):false;return this};F.prototype.uninstall=function(id,key){var s=this.getElement(id);s?s.uninstall(key):false;return this};EFO.StyleDriver=F}})();
;/*========== INCLUDE @LD/LDriver2========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.LDriver2?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null,LD=null,skey='',def='',keepKey='',autoProp=null,loadUrl=null,reportUrl=null,file=null,listUrl=null,ldefer=null,rps=null
function LDriver2(){return LDriver2.is(H)?H:LDriver2.is(this)?this.init():LDriver2.F()};U.FixCon(LDriver2);var F=LDriver2;F.prototype.init=function(){H=this;this.loadStatic();this.overridePrototypes();this.updateElement();return this};F.prototype.overridePrototypes=function(){Object.defineProperty(Object.prototype,'_T',{enumerable:false,configurable:false,writeable:false,value:function(x){return H.T(x)}});Object.defineProperty(Object.prototype,'_TT',{enumerable:false,configurable:false,writeable:false,value:function(){return function(a,b){return H.T(b(a))}}})};F.prototype.setElement=function(x){this.element=x;if(this.isLoaded())this.updateElement();return this};F.prototype.updateElement=function(){this.element?this.element.innerHTML=LD.ln:false;return this};F.prototype.T=function(x){if(LD){if(LD.tokens.hasOwnProperty(x))return LD.tokens[x];LD.tokens[x]=x;this.report(x)};return x};F.prototype.report=function(x){window.clearTimeout(this.SRTO);(rps=U.safeArray(rps)).push(x);this.SRTO=window.setTimeout(this._sendData.bindToObject(this),1e4);return this};F.prototype._sendData=function(){window.clearTimeout(this.SRTO);var a=[].concat(U.safeArray(rps));rps=null;if(reportUrl&&a.length)EFO.Request('post',reportUrl,{ln:this.getCurrent(),file:file,tokens:a}).done(this,function(){this._update()});return this};F.prototype.setSKey=function(x){skey=U.NEString(x);return this};F.prototype.setDefault=function(x){def=U.NEString(x);return this};F.prototype.setAutoProp=function(x){autoProp=U.NEString(x);return this};F.prototype.setLoadUrl=function(x){loadUrl=U.NEString(x);return this};F.prototype.setReportUrl=function(x){reportUrl=U.NEString(x);return this};F.prototype.setFile=function(x){file=U.NEString(x);return this};F.prototype.setKeepKey=function(x){keepKey=U.NEString(x);return this};F.prototype.setListUrl=function(x){listUrl=U.NEString(x);return this};F.prototype.ready=function(){ldefer?false:ldefer=EFO.Defer();return ldefer};F.prototype.getCurrent=function(deflt){deflt=U.defined(deflt)?deflt:def;return U.NEString(localStorage.getItem(skey),deflt)};F.prototype.isSelected=function(){return this.getCurrent(null)?true:false};F.prototype.isLoaded=function(){return LD?true:false};F.prototype.setCurrent=function(x){localStorage.setItem(skey,x);localStorage.removeItem(keepKey);this.reloadPage()};F.prototype.loadStatic=function(){try{var lo=JSON.parse(localStorage.getItem(keepKey));U.isObject(lo)?false:lo=null;if(U.isObject(lo))if(this.checkObject(lo)&&lo.ln===this.getCurrent()){LD=lo;return this.updateElement()}}catch(e){};return this};F.prototype.getLoadUrl=function(){if(loadUrl&&file&&this.getCurrent())return[loadUrl,file,'_',this.getCurrent(),'.json'].join('');return null};F.prototype.loadRemote=function(){ldefer=new EFO.Defer();var url=this.getLoadUrl();if(url){EFO.Request('GET',url).done(this,this.onLoadRemote).fail(this,this.loadRemoteFail)}else U.TError("NoLoadUrl");return this};F.prototype.onLoadRemote=function(d){LD=this.checkObject(d.d)?d.d:null;if(LD){localStorage.setItem(skey,LD.ln);localStorage.setItem(keepKey,JSON.stringify(LD));this.setLastUpdated().updateElement()}else return this.loadRemoteFail();this.ready().resolve(this);return this};F.prototype.checkObject=function(x){if(U.isObject(x))if(U.NEString(x.ln)&&U.isObject(x.tokens)||U.isArray(x.tokens)&&!x.tokens.length){x.tokens=U.safeObject(x.tokens);return true};return false};F.prototype.loadRemoteFail=function(){localStorage.removeItem(skey);localStorage.removeItem(keepKey);return this.reloadPage()};F.prototype.reloadPage=function(){location.reload();return this};F.prototype.checkUpdates=function(){if(this.updateRequired()){window.clearTimeout(this.UPTOID);this.UPTOID=window.setTimeout(this._update.bindToObject(this),2e4)};return this};F.prototype.updateRequired=function(){var LS=this.getLastUpdated(),NS=this.getNowState();return(NS-LS)>(60*60*24*1e3)};F.prototype.getLastUpdated=function(){return U.IntMoreOr(localStorage.getItem('ldriverv2_u'),0,0)};F.prototype.setLastUpdated=function(){localStorage.setItem('ldriverv2_u',this.getNowState());return this};F.prototype.getNowState=function(){return(new Date()).getTime()};F.prototype._update=function(){var R=EFO.Defer(),url=this.getLoadUrl();if(url){EFO.Request('get',url).done(this,function(d){if(U.isObject(d)&&this.checkObject(d.d)){for(var k in d.d.tokens)if(d.d.tokens.hasOwnProperty(k))LD.tokens[k]=d.d.tokens[k];for(var k in LD.tokens)if(!(k in d.d.tokens))delete(LD.tokens[k]);localStorage.setItem(keepKey,JSON.stringify(LD));this.setLastUpdated();this.updateElement();this.updateNodes();R.resolve(this)};R.reject()}).fail(this,function(){R.reject()})}else R.reject();return R};F.prototype.updateNodes=function(x){if(autoProp){x=x?x:document.documentElement;if(x.dataset&&x.dataset[autoProp]){x.innerHTML=this.T(x.dataset[autoProp])}else if(x.children&&x.children.length)for(var i=0;i<x.children.length;i++)this.updateNodes(x.children[i])};return this};F.prototype.getList=function(){if(listUrl)return EFO.Request('get',listUrl);U.TError("noListUrl");return EFO.Defer().reject()};EFO.LDriver2=F}})();
;/*========== INCLUDE @LD/LangMonitor========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.LangMonitor?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null
function LangMonitor(){return LangMonitor.is(H)?H:LangMonitor.is(this)?this.init():LangMonitor.F()};U.FixCon(LangMonitor);var F=LangMonitor;F.prototype.current=null;F.prototype.init=function(){H=this;this.current=U.NEString(localStorage.getItem('content_ln'),'ru');this.setCookie();return this};F.prototype.setCookie=function(){var options={path:"/"},expires=1e5;if(typeof expires=="number"&&expires){var d=new Date();d.setTime(d.getTime()+expires*1e3);expires=options.expires=d};if(expires&&expires.toUTCString)options.expires=expires.toUTCString();var value=encodeURIComponent(this.current),updatedCookie='content_ln'+"="+value;for(var propName in options){updatedCookie+="; "+propName;var propValue=options[propName];if(propValue!==true)updatedCookie+="="+propValue};document.cookie=updatedCookie;return this};F.prototype.setElement=function(x){this.element=x;try{this.element.removeEventListener('click',this.onClick.bindToObject(this));this.element.addEventListener('click',this.onClick.bindToObject(this))}catch(e){};return this.updateElement()};F.prototype.updateElement=function(){if(this.element)this.element.innerHTML=this.current;return this};F.prototype.setCurrent=function(x){this.current=x;localStorage.setItem('content_ln',this.current);this.updateElement();this.setCookie();window.location.reload(true);return this};F.prototype.onClick=function(){EFO.Com().com('selector.language').done(this,this.onSelectorReady).fail(this,this.onSelectorError);return this};F.prototype.onSelectorReady=function(x){x.show().setAllowCancel(true).setReturnResult(true).setCallback(this,this.onSelected);return this};F.prototype.onSelectorError=function(x){U.TError(U.isError(x.message)?x:U.NEString(x)?x:"RequiredComponentFail");return this};F.prototype.onSelected=function(li){this.setCurrent(li);return this};window.Eve.EFO.LangMonitor=F}})();
;/*========== INCLUDE Filter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.Filter?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null,instances=null,FN=EFO.Filter
function iapplyChain(value,filters){var out=value;for(var i=0;i<filters.length;i++)out=this.applyFilter(out,filters[i]);return out}
function iapplyHash(input,filters){var o={};filters.each(this,function(fi){fi.applyTo(input,o)});return o}
function Filter(){return Filter.is(H)?H:(Filter.is(this)?this.init():Filter.F())};U.FixCon(Filter);var F=Filter;F.prototype.init=function(){H=this;instances={};return this};F.prototype.getInstance=function(x){return FN.FilterManager().get(x)};F.prototype.applyFilter=function(value,filter){var fo=this.getInstance(filter);fo?false:U.Error(["NoFilter`",filter,"`"].join(''));return fo.apply(value)};F.prototype.applyChain=function(value,filters){var fa=U.mkArray(filters,false,',');fa.length?false:U.Error("FilterChainIsEmpty");return iapplyChain.apply(this,[value,fa])};F.prototype.applyFiltersToHash=function(input,filters){input=U.isObject(input)?input:null;if(input){var fdef=this.getFilterDefiner(filters);return iapplyHash.apply(this,[input,fdef])};return null};F.prototype.applyFiltersToArray=function(input,filters,skipBad){skipBad=U.anyBool(skipBad,false);input=U.safeArray(input);var o=[];if(input.length){filters=U.mkArray(filters,false,',');var value=iapplyChain.apply(this,[value,filters]);(this.isValueValid(value)||!skipBad)?o.push(value):false};return o};F.prototype.applyFiltersToArrayOfHash=function(input,filters){input=U.safeArray(input);var out=[],fdef=this.getFilterDefiner(filters);for(var i=0;i<input.length;i++)if(U.isObject(input[i]))out.push(iapplyHash.aplly(this,input[i],fdef));return out};F.prototype.getFilterDefiner=function(x){return FN.FilterDefineFactory()(x)};F.prototype.isValid=function(x){return!FN.Values().BadValue.is(x)};F.prototype.isBad=function(x){return FN.Values().BadValue.is(x)};F.prototype.throwValuesErrors=function(x,tt,prefix){var c=0;prefix=U.NEString(prefix,'');if(U.isObject(x)){for(var k in x)if(x.hasOwnProperty(k))if(this.isBad(x[k])){c++;U.TError([prefix,"Filter fails on ",k,": ",x[k].getError()].join(''))}}else U.Error("ThrowValuesErrors requires an object");U.NEString(tt)&&c?U.Error(prefix+tt):false;return this};F.prototype.throwValuesError=function(x,tt,prefix){var c=0;prefix=U.NEString(prefix,'');if(U.isObject(x)){for(var k in x)if(x.hasOwnProperty(k))if(this.isBad(x[k])){c++;U.Error([prefix,"Filter fails on ",k,": ",x[k].getError()].join(''))}}else U.Error("ThrowValuesErrors requires an object");U.NEString(tt)&&c?U.Error(prefix+tt):false;return this};FN.Filter=F}})();
;/*========== INCLUDE FilterDefine.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.FilterDefineFactory?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null;FN.FilterDefineFactory=function(){if(R)return R
function FilterDefine(x){return FilterDefine.is(x)?x:(FilterDefine.is(this)?this.init(x):FilterDefine.F(x))};U.FixCon(FilterDefine);var F=R=FilterDefine;F.prototype.defs;F.prototype.init=function(x){this.defs=[];if(typeof x==='string'){return this.initFromString(x)}else if(U.isObject(x)){return this.initFromObject(x)}else if(U.isArray(x)){return this.initFromArray(x)}else if(window.DOMParser&&window.XMLDocument&&(x instanceof XMLDocument))return this.initXMLDoc(x);U.Error("CantInitFilterDefine")};F.prototype.initFromString=function(x){if(window.DOMParser){var doc=(new DOMParser()).parseFromString(x,"text/xml");if(doc&&(doc instanceof XMLDocument)){var e=doc.getElementsByTagName('parsererror');if(!e||e.length===0)return this.initXMLDoc(doc)}};try{var jso=JSON.parse(x);if(U.isObject(jso))return this.initFromObject(jso);if(U.isArray(jso))return this.initFromArray(jso)}catch(e){};var fd=x.split(';'),o=[];for(var i=0;i<fd.length;i++){var fdo=this.tryParseCSVElement(fd[i]);fdo?o.push(fdo):false};if(o.length)return this.initFromArray(o);U.Error("NoCompatibleFormatFoundForFilterString")};F.prototype.tryParseCSVElement=function(x){var xa=x.split(':');if(xa.length===2){var fns=xa[1].split(',');if(fns.length)return{inName:xa[0],filters:fns}};return null};F.prototype.initFromArray=function(x){x=U.safeArray(x);if(x.length){for(var i=0;i<x.length;i++){var t=U.safeObject(x[i]),def=Q(t.inName,t.outName,t.filters);def&&def.isValid()?this.defs.push(def):U.Error("IncorrectFilterDefinition")};return this};U.Error("FilterDefine:initFromArray fails:emptyArray/notArray")};F.prototype.initFromObject=function(x){x=U.safeObject(x);var o=[];for(var k in x)if(x.hasOwnProperty(k))if(typeof(x[k])==='string'){o.push({inName:k,filters:x[k]})}else if(U.isArray(x[k])){x[k].length?o.push({inName:k,filters:[].concat(x[k])}):U.Error("cantParse: filtersArrayisEmpty on key "+k)}else if(U.isObject(x[k])){o.push({inName:k,outName:x[k].outName,filters:x[k].filters})}else U.Error("Cant parse input object:key "+k);return this.initFromArray(o)};F.prototype.initXMLDoc=function(x){var r=[],props=x.getElementsByTagName('property');if(props&&props.length)for(var i=0;i<props.length;i++)r.push(this.initXMLProp(props[i]));return this.initFromArray(r)};F.prototype.initXMLProp=function(propNode){var iname=U.NEString(propNode.getAttribute('in')),oname=propNode.hasAttribute('out')?U.NEString(propNode.getAttribute('out')):void(0),filters=[];propNode.hasAttribute('filters')?filters.push(propNode.getAttribute('filters')):false;var fe=propNode.getElementsByTagName('filter');if(fe&&fe.length)for(var i=0;i<fe.length;i++)if(fe[i].childNodes&&fe[i].childNodes.length&&(fe[i].childNodes[0]instanceof Text))filters.push(fe[i].childNodes[0].nodeValue);return{inName:iname,outName:oname,filters:filters}};F.prototype.each=function(co,ca){if(U.isCallable(ca)){co=U.isObject(co)?co:this;for(var i=0;i<this.defs.length;i++)ca.apply(co,[this.defs[i],i])};return this}
function FilterDef(inName,outName,filters){return FilterDef.is(this)?this.init(inName,outName,filters):FilterDef.F(inName,outName,filters)};U.FixCon(FilterDef);var Q=FilterDef;Q.prototype.inName=null;Q.prototype.outName=null;Q.prototype.filters=null;Q.prototype.init=function(iname,oname,filters){iname=U.NEString(iname);oname=U.NEString(oname);filters=this.prepareFilters(filters);this.inName=iname?iname:U.Error("FilterDef error:no inName");this.outName=oname?oname:iname;this.filters=filters&&filters.length?filters:U.Error("FilterDef error: no filters");return this};Q.prototype.prepareFilters=function(x){x=U.mkArray(x,false);var fns=[];for(var i=0;i<x.length;i++)fns=fns.concat(U.mkArray(x[i],false));if(fns&&fns.length){var filters=[],FM=FN.FilterManager();for(var i=0;i<fns.length;i++)filters.push(FM.get(fns[i]));return filters};return null};Q.prototype.each=function(co,ca){if(U.isCallable(ca)){co=U.isObject(co)?co:this;for(var i=0;i<this.filters.length;i++)ca.apply(co,[this.filters[i],i])};return this};Q.prototype.extract=function(x){return(U.isObject(x)&&U.defined(x[this.inName]))?x[this.inName]:FN.FilterManage().emptyValue()};Q.prototype.applyTo=function(x,o){var val=x[this.inName];for(var i=0;i<this.filters.length;i++)val=this.filters[i].apply(val);o[this.outName]=val};Q.prototype.isValid=function(){return this.inName&&this.outName&&this.filters&&this.filters.length?true:false};return R}}})();
;/*========== INCLUDE FilterManager.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.FilterManager?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null,instances=null,FN=EFO.Filter
function FilterManager(){return FilterManager.is(H)?H:(FilterManager.is(this)?this.init():FilterManager.F())};U.FixCon(FilterManager);var F=FilterManager;F.prototype.values=null;F.prototype.init=function(){H=this;instances={};this.values=FN.Values();return this};F.prototype.getEmptyValue=function(){return this.values.EmptyValue()};F.prototype.getInvalidValue=function(err){return this.values.InvalidValue(err)};F.prototype.isBadValue=function(x){return this.values.BadValue.is(x)};F.prototype.instanceExists=function(x){return FN.AbstractFilter.is(instances[x])};F.prototype.get=function(x){if(!this.instanceExists(x))instances[x]=this.createInstance(x);return instances[x]};F.prototype.createInstance=function(x){var FC=FN.AbstractFilter.Factory(x);return U.isCallable(FC)?FC():U.Error("NonFilter:"+x)};FN.FilterManager=F}})();
;/*========== INCLUDE AbstractDefaultFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="AbstractDefault";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){U.AbstractError()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.apply=function(value){if(FN.Values().BadValue.is(value))return this.getDefaultValue();return value};F.prototype.getDefaultValue=function(){return"Override"};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE AbstractFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};window.Eve.EFO.Filter.AbstractFilter?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,FF=FN.factory
function AbstractFilter(){U.AbstractError()};U.FixCon(AbstractFilter);var F=AbstractFilter;F.prototype.init=function(){return this};F.prototype.apply=function(value){if(FN.Values().BadValue.is(value))return value;return U.defined(value)?this.applyFilter(value):this.getEmptyValue()};F.prototype.getEmptyValue=function(){return FN.Values().EmptyValue()};F.prototype.getInvalidValue=function(x){return FN.Values().InvalidValue(x)};F.prototype.applyFilter=function(x){U.AbstractError};FN.AbstractFilter=F;F.Factory=function(x){var fn=[U.UCFirst(x),'FilterFactory'].join('');if(U.isCallable(FF[fn])){var fc=FF[fn]();if(U.isCallable(fc)&&F.prototype.isPrototypeOf(fc.prototype))return fc;U.Error(["Filter constructor must inherit AbstractFilter (",x,")"].join(''))};U.Error(["Cant find factory for filter ",x].join(''))}}})();
;/*========== INCLUDE BooleanFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="Boolean";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){var r=U.anyBool(x,null);return r===null?this.getInvalidValue("NonBool"):r};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE DefaultFalseFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="DefaultFalse";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter.Factory('AbstractDefault'));var F=filter;F.prototype.getDefaultValue=function(){return false};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE DefaultNullFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="DefaultNull";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter.Factory('AbstractDefault'));var F=filter;F.prototype.getDefaultValue=function(){return null};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE DefaultTrueFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="DefaultTrue";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter.Factory('AbstractDefault'));var F=filter;F.prototype.getDefaultValue=function(){return true};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE EmailMatchFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="EmailMatch";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){return EFO.Checks.isEmail(x)?x:this.getInvalidValue("NotEmail")};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE IntMore0Filter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="IntMore0";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){var t=U.IntMoreOr(x,0,null);return t===null?this.getInvalidValue("IntMore0"):t};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE NEStringFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="NEString";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){var y=U.NEString(x);return y?y:this.getInvalidValue('NEString')};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE PasswordMatchFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="PasswordMatch";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){return/[a-z0-9]{6,}/i.test(x)?x:this.getInvalidValue("BadPassword")};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE RequiredTrueFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="RequiredTrue";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){return x===true?x:this.getInvalidValue("RequiredTrue")};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE StripFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="Strip";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){try{return x.replace(/<\/?[^>]+>/gi,'')}catch(ex){};return this.getInvalidValue('NonString')};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE TrimFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="Trim";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){return U.NEString(x,'')};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE UpperCaseFilter.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.factory=window.Eve.EFO.Filter.factory||{};var CN="UpperCase";window.Eve.EFO.Filter.factory[CN+"FilterFactory"]?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,FN=EFO.Filter,R=null,FF=FN.factory
function Factory(){if(R)return R
function filter(){return filter.is(this)?this.init():filter.F()};filter.xInheritE(FN.AbstractFilter);var F=filter;F.prototype.applyFilter=function(x){try{return x.toUpperCase()}catch(e){};return this.getInvalidValue("Not-a-String")};return R=F};FF[CN+"FilterFactory"]=Factory}})();
;/*========== INCLUDE Values.js========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.Filter=window.Eve.EFO.Filter||{};window.Eve.EFO.Filter.Values?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null,FN=EFO.Filter,R=null
function ValuesFactory(){if(R)return R
function BadValue(){U.AbstractError()};U.FixCon(BadValue);BadValue.prototype.getError=function(){return"abstractBadValue"}
function EmptyValue(){return EmptyValue.is(H)?H:(EmptyValue.is(this)?this.init():EmptyValue.F())};EmptyValue.xInheritE(BadValue);EmptyValue.prototype.init=function(){H=this;return this};EmptyValue.prototype.getError=function(){return"ValueIsEmpty"}
function InvalidValue(errVal){return InvalidValue.is(this)?this.init(errVal):InvalidValue.F(errVal)};InvalidValue.xInheritE(BadValue);InvalidValue.prototype.err=null;InvalidValue.prototype.init=function(err){this.err=err;return this};InvalidValue.prototype.getError=function(){return["ValueIsInvalid:",this.err].join('')};R={BadValue:BadValue,EmptyValue:EmptyValue,InvalidValue:InvalidValue};return R};FN.Values=ValuesFactory}})();
;/*========== INCLUDE @AuthCheck/AuthCheck========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};window.Eve.EFO.AuthCheck?false:initPlugin()
function initPlugin(){var E=window.Eve,EFO=E.EFO,U=EFO.U,H=null
function AuthCheck(eo,th){return AuthCheck.is(H)?H.run(eo,th):AuthCheck.is(this)?this.init(eo,th):AuthCheck.F(eo,th)};U.FixCon(AuthCheck);var F=AuthCheck;F.prototype.t=null;F.prototype.init=function(eo,th){H=this;this.t=[];return this.registerEvents().run(eo,th)};F.prototype.registerEvents=function(){EFO.Events.GEM().On('LOGIN_SUCCESS',this,this.onAuthSuccess);return this};F.prototype.run=function(eo,th){if(this.checkError(eo)){this.t.push(th);this.runLogin()};return this};F.prototype.runLogin=function(){EFO.Com().com('DAP.login').done(function(x){x.show()}).fail(function(){U.TError(this._T("RequiredComponentFail"))});return this};F.prototype.onAuthSuccess=function(){var ee=this.t;this.t=[];for(var i=0;i<ee.length;i++)ee[i].table.body.DataDriver.refresh();return this};F.prototype.checkError=function(x){if(U.isObject(x)&&U.isObject(x.responce)&&x.responce.s==='AuthRqrd')return true;return false};EFO.AuthCheck=F}})();
;/*========== INCLUDE @Utils/Ready========*/;
(function(){window.Eve=window.Eve||{};window.Eve.EFO=window.Eve.EFO||{};var E=window.Eve,EFO=E.EFO,U=EFO.U,c=[].concat(U.safeArray(window.Eve.EFO.Ready));EFO.Ready={push:function(x){if(U.isCallable(x))try{x()}catch(e){U.TError(e.message)}}};for(var i=0;i<c.length;i++)EFO.Ready.push(c[i])})();
/*=====INCLUDE TEMPLATES: =======*/;
window.Eve.EFO.TemplateManager().addObject({"Handlable.default":"{{=<% %>=}}{{getContent}}<%={{ }}=%>","Paginator.Content":"<div class=\"{{getCssClass}}Content\" data-role=\"items\">sddd<\/div>","Paginator.default":"{{=<% %>=}}<div class=\"<%getCssClass%>\" id=\"<%_uid%>\"><%{getContentTemplate}%><\/div><%={{ }}=%>","Paginator.item":"{{#separator}}<span class=\"{{getCssClass}}Element {{getCssClass}}Separator\" >{{text}}<\/span>{{\/separator}}{{^separator}}<span class=\"{{getCssClass}}Element {{#current}} {{getCssClass}}Current {{\/current}}\" data-page=\"{{i}}\" data-command=\"setPage\">{{text}}<\/span>{{\/separator}}","Paginator.items":"<span class=\"{{getCssClass}}HBtn {{getCssClass}}Prev  {{^hasPrev}} disabled {{\/hasPrev}}\" data-command=\"prevPage\"><\/span>{{#items}}{{>item}}{{\/items}}<span class=\"{{getCssClass}}HBtn {{getCssClass}}Next  {{^hasNext}} disabled {{\/hasNext}}\" data-command=\"nextPage\"><\/span>\n","TreeView.Content":"<div class=\"{{getCssClass}}Content\" data-role=\"items\">TreeView<\/div>","TreeView.Toolbar":"<div class=\"{{getCssClass}}Toolbar\" data-role=\"toolbar\">\n    {{#getCommandButtons}}\n    <div class=\"{{getCssClass}}CommandButton {{getCssClass}}Custom{{css}}\" data-command=\"{{command}}\">\n        <svg><use xlink:href=\"#{{getCssClass}}ButtonImage{{image}}\" \/><\/svg>\n    <\/div>\n    {{\/getCommandButtons}}        \n<\/div>","TreeView.default":"{{=<% %>=}}\n<div class=\"<%getCssClass%> <%#enableToolbar%><%getCssClass%>ToolbarEnabled<%\/enableToolbar%>\" id=\"<%_uid%>\">\n    <%#enableToolbar%><%{getToolbarTemplate}%><%\/enableToolbar%>\n    <%{getContentTemplate}%>\n    <div class=\"EFOWindowLoader {{getCssClass}}WindowLoader\" data-role=\"loader\" style=\"display:none;\"><\/div>\n<\/div>\n<%={{ }}=%>","TreeView.node":"{{#childs}}\n<div class=\"{{getCssClass}}NodeElement {{getCssClass}}NodeElementCustom{{css}} {{getCssClass}}NodeElementParent{{#hasChilds}}hasChilds{{\/hasChilds}}{{^hasChilds}}NoChilds{{\/hasChilds}} {{getCssClass}}NodeElementState{{#opened}}opened{{\/opened}}{{^opened}}closed{{\/opened}}\" data-id=\"{{id}}\" data-key=\"{{key}}\">\n    <div class=\"{{getCssClass}}NodeElementName {{#getIsDraggableBinded}}EFODraggable EFODropTarget{{\/getIsDraggableBinded}}\" {{#getIsDraggableBinded}}data-efodragtype=\"{{getDragTypeBinded}}\" data-efodroptypes=\"{{getDragTargetBinded}}\"{{\/getIsDraggableBinded}} data-node-element=\"itemHeader\">\n        <span class=\"{{getCssClass}}NodeElementIcon {{getCssClass}}NodeIconCollapsed\" data-node-element=\"itemIcon\"><svg><use xlink:href=\"#{{getCssClass}}Icon{{icon}}Collapsed\"\/><\/svg><\/span>\n        <span class=\"{{getCssClass}}NodeElementIcon {{getCssClass}}NodeIconExpanded\" data-node-element=\"itemIcon\"><svg><use xlink:href=\"#{{getCssClass}}Icon{{icon}}Expanded\"\/><\/svg><\/span>\n        <span class=\"{{getCssClass}}NodeElementText\">{{name}}<\/span>\n    <\/div>\n    {{#hasChilds}}\n    <div class=\"{{getCssClass}}NodeElementNodeBody\">\n        {{>element}}\n    <\/div>\n    {{\/hasChilds}}\n<\/div>\n{{\/childs}}","contextMenu.Content":"<div class=\"{{getCssClass}}Content\" data-role=\"items\">sddd<\/div>","contextMenu.default":"{{=<% %>=}}<div class=\"<%getCssClass%>\" id=\"<%_uid%>\"><%{getContentTemplate}%><\/div><%={{ }}=%>","contextMenu.items":"<ul class=\"{{getCssClass}}List {{getCssClass}}Custom{{customClass}}\">\n    {{#items}}\n    <li data-command=\"{{command}}\" >\n        <span class=\"{{getCssClassBind}}ItemIcon\"><svg><use xlink:href=\"#{{getCssClassBind}}{{customClass}}Icon{{icon}}\" \/><\/svg><\/span>\n        <span class=\"{{getCssClassBind}}ItemText\">{{title}}<\/span>\n    <\/li>\n    {{\/items}}\n<\/ul>","draghelper":"<div class=\"EFODragHelper\" style=\"display:none\">    \n    <svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" width=\"512px\" version=\"1.1\" height=\"512px\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\">\n        <g>\n            <path  d=\"m63.875,31.203c-0.102-0.246-0.248-0.467-0.435-0.652l-6.837-6.838c-0.783-0.783-2.051-0.783-2.834,0-0.781,0.781-0.781,2.05 0,2.832l3.42,3.42-23.16-.001 .002-23.155 3.568,3.57c0.393,0.392 0.904,0.588 1.418,0.588 0.512,0 1.025-0.196 1.416-0.588 0.783-0.781 0.783-2.051 0-2.834l-6.988-6.99c-0.186-0.186-0.406-0.332-0.652-0.434-0.49-0.203-1.041-0.203-1.531,0-0.244,0.101-0.463,0.246-0.646,0.429 0,0-0.002,0.002-0.004,0.003l-6.844,6.84c-0.781,0.783-0.781,2.051 0,2.834 0.393,0.391 0.904,0.587 1.418,0.587 0.512,0 1.025-0.196 1.416-0.587l3.422-3.42-.002,23.157-23.15-.001 3.417-3.418c0.781-0.782 0.781-2.051 0-2.832-0.783-0.783-2.051-0.783-2.834,0l-6.838,6.84c-0.393,0.391-0.588,0.903-0.588,1.416s0.195,1.025 0.588,1.417l6.988,6.989c0.392,0.393 0.904,0.588 1.417,0.588s1.025-0.195 1.417-0.588c0.782-0.783 0.782-2.051 0-2.833l-3.571-3.571 23.153,.001-.001,23.153-3.418-3.417c-0.783-0.78-2.051-0.782-2.834,0.001-0.781,0.783-0.781,2.052 0,2.834l6.844,6.839c0.391,0.392 0.904,0.587 1.416,0.587 0.513,0 1.025-0.195 1.416-0.587l6.99-6.991c0.783-0.783 0.783-2.053 0-2.834-0.783-0.783-2.051-0.783-2.834,0l-3.572,3.574 .002-23.159 23.16,.001-3.57,3.569c-0.781,0.782-0.781,2.05 0,2.833 0.393,0.393 0.904,0.588 1.418,0.588 0.512,0 1.025-0.195 1.416-0.588l6.989-6.989c0.004-0.005 0.006-0.012 0.012-0.017 0.177-0.182 0.321-0.396 0.421-0.633 0.102-0.246 0.154-0.506 0.154-0.768-0.001-0.259-0.053-0.52-0.155-0.765z\"\/>\n        <\/g>\n    <\/svg>\n<\/div>","flatController.default":"{{=<% %>=}}\n<div class=\"EFOFlatControllerWraper FlatController<%getCssClass%>Wrapper\" id=\"EFOController<%getControllerId%>\">\n    <div class=\"EFOWindowContent <%getCssClass%>WindowContent\" data-role=\"windowContent\">\n        <%{getContentTemplate}%>\n    <\/div>        \n    <div class=\"EFOWindowLoader <%getCssClass%>WindowLoader\" data-role=\"loader\"><\/div>\n<\/div>\n<%={{ }}=%>","windowController.default":"{{=<% %>=}}\n<div class=\"EFOBackdrop <%getCssClass%>Backdrop\" id=\"EFOController<%getControllerId%>\">    \n    <div class=\"EFOWindow <%getCssClass%>Window\" data-role=\"window\">\n        <% > WindowControllerTitle %>\n        <div class=\"EFOWindowContent <%getCssClass%>WindowContent\" data-role=\"windowContent\">\n            <%{getContentTemplate}%>\n        <\/div>\n        <% > WindowControllerFooter %>     \n        <div class=\"EFOWindowLoader <%getCssClass%>WindowLoader\" data-role=\"loader\"><\/div>\n    <\/div>\n<\/div>\n<%={{ }}=%>","windowController.footer":"{{=<% %>=}}\n<div class=\"EFOFooter <%getCssClass%>Footer\">\n    <%#getFooterButtons%>\n    <%> WindowControllerFooterButton%>\n    <%\/getFooterButtons%>\n    <div class=\"EFOWindowResizer <%getCssClass%>WindowResizer\" data-role=\"resizer\"><\/div>\n<\/div>\n<%={{ }}=%>","windowController.footerButton":"{{=<% %>=}}\n<span class=\"EFOFooterButton <%getCssClass%>FooterButton <%buttonClass%>\" data-command=\"<%command%>\"><%text%><\/span>\n<%={{ }}=%>","windowController.title":"{{=<% %>=}}\n<div class=\"EFOTitle <%getCssClass%>Title\">\n    <span class=\"EFOTitleText <%getCssClass%>TitleText\" data-role=\"titleText\">{{getDefaultTitle}}<\/span>\n    <div class=\"EFOTitleClose <%getCssClass%>Close\" data-command=\"cancel\"><\/div>\n<\/div>\n<%={{ }}=%>"});;
/*=====18 TEMPLATES ARE INCLUDED =======*/
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/queueStack.js ==== */
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EReady);

    function EReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.queueStack ? false : initPlugin();
        function initPlugin() {

            function queueStack() {
                return (queueStack.is(this) ? this.init : queueStack.F).apply(this, APS.call(arguments));
            }
            U.FixCon(queueStack);
            var F = queueStack;


            F.prototype._tasks = null;

            F.prototype.init = function () {
                this.clear();
                return this;
            };

            F.prototype.clear = function () {
                this._tasks = [];
                return this;
            };

            /**
             * ставит задание в очердь.
             * !задание может быть асинхронным, пожтому к следующему заданию не перходим, пока нет сигнала от самого задания
             * (оно должно выставить себе флажок "выполнено" и вызвать метод next)
             * @param {Object} context  -- контекст выполнения
             * @param {Function} callable -- функция задания
             * @param {Object|null} argobj  -- допаргументы - POJO.содержит номер ордера и други поля, понятные callable
             * @param {boolean} shift [false] - добавить задание в начало очереди
             * @returns {queueStack}
             */
            F.prototype.addTask = function (context, callable, argobj, shift) {
                var task = new Task(context, callable, U.safeObject(argobj));
                if (task && task.isValid()) {
                    U.anyBool(shift, false) ? this._shiftTask(task) : this._pushTask(task);
                    return task;
                }
                return null;
            };

            /**
             * 
             * @param {Task} task
             * @returns {EFO.queueStack}
             */
            F.prototype._shiftTask = function (task) {
                this._tasks = [task._setState(TASKSTATES.QUEUED)].concat(this._tasks);
                return this;
            };

            F.prototype._pushTask = function (task) {
                this._tasks.push(task._setState(TASKSTATES.QUEUED));
                return this;
            };

            F.prototype.next = function () {
                var lc = this._removeFinishedTasks();
                //queueStack - блокирован, все рано не работает
                if (true||lc === 0) { // если нет других запущенных
                    this._nextInternal();
                }
                return this;
            };

            F.prototype._nextInternal = function () {
                for (var i = 0; i < this._tasks.length; i++) {
                    if (this._tasks[i].state === TASKSTATES.QUEUED) {
                        this._tasks[i].run(this);
                        break;
                    }
                }
                return this;
            };

            F.prototype._removeFinishedTasks = function () {
                var ns = [];
                var lc = 0;
                for (var i = 0; i < this._tasks.length; i++) {
                    this._tasks[i].canRemove() ? this._tasks[i].onRemove() : ns.push(this._tasks[i]);
                    this._tasks[i].state === TASKSTATES.RUNNING ? lc++ : false;
                }
                this._tasks = ns;
                return lc;
            };






            var TASKSTATES = {
                "INITIAL": 0,
                "QUEUED": 100,
                "RUNNING": 200,
                "FINISHED": 300,
                "FINISHEDERROR": 400
            };
            function Task(co, ca, arg) {
                return (Task.is(this) ? this.init : Task.F).apply(this, APS.call(arguments));
            }
            U.FixCon(Task);

            Task.prototype.args = null;
            Task.prototype.context = null;
            Task.prototype.callable = null;
            Task.prototype.state = null;
            Task.prototype.queue = null; // родительская очередь (для отзывов)

            Task.prototype.init = function (co, ca, arg) {
                this.args = U.safeObject(arg);
                this.context = U.isObject(co) ? co : null;
                this.callable = U.isCallable(ca) ? ca : null;
                this.state = TASKSTATES.INITIAL;
                return this;
            };

            Task.prototype.isValid = function () {
                return this.context && this.callable && (this.state === TASKSTATES.INITIAL) ? true : false;
            };

            /**
             * запускает текущую задачу на выполнение
             * @param {EFO.queueStack} queue
             * @returns {undefined}
             */
            Task.prototype.run = function (queue) {
                queueStack.is(queue) ? false : U.Error('queueStack required');
                this.state === TASKSTATES.QUEUED ? false : U.Error('wrongState');
                this.queue = queue;
                this.state = TASKSTATES.RUNNING;
                try {
                    this._runInternal();
                } catch (e) {// в случае ошибки - пометить таск как завершенный, вызвать некст и выкинуть TError
                    this.state = TASKSTATES.FINISHEDERROR;
                    this.queue.next();
                    U.TError(e.message);
                }
                return this;
            };

            Task.prototype._runInternal = function () {
                this.callable.apply(this.context, [this]);
            };

            Task.prototype.canLaunch = function () {
                return this.state === TASKSTATES.QUEUED ? true : false;
            };

            Task.prototype.canRemove = function () {
                return (this.state === TASKSTATES.FINISHED || this.state === TASKSTATES.FINISHEDERROR) ? true : false;
            };

            Task.prototype.complete = function () {
                this.state = TASKSTATES.FINISHED;
                this.queue.next();
            };

            Task.prototype.error = function () {
                this.state = TASKSTATES.FINISHEDERROR;
                this.queue.next();
            };

            Task.prototype.getParam = function (n) {
                return this.args && (n in this.args) ? this.args[n] : void(0);
            };

            Task.prototype._setState = function (x) {
                U.IntMoreOr(x, 0, 0) > this.state ? false : U.Error("LowerState");
                this.state = x;
                return this;
            };

            /**
             * 
             * @param {Task} task
             * @returns {any}
             */
            Task.prototype.callback_signature = function (task) {
                U.Error("Abstract");
                task.complete();
                task.error();
            };

            Task.prototype.onRemove = function () {
                var c = this.getParam('onRemove');
                if (U.isCallable(c)) {
                    try {
                        c.apply(this.context, [this]);
                    } catch (e) {

                    }
                }
                this.callable = null;
                this.context = null;
                this.args = null;
                this.queue = null;
                return this;
            };






            F.task_class = Task;
            EFO.queueStack = F;
        }
    }
})();
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/config.js ==== */
(function () {

    /**** 
     *CONFIGURATION 
     */
    var DOMAIN = "mordobox.ironstar.pw";
    
    var HOST = "https://" + DOMAIN;
//    if(/^http.*/.test(window.location.href)){
//        HOST="//";
//    };
    if(!/^file/.test(window.location.href)){
        HOST="//";  
    }



    var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null;
    function Config() {
        return Config.is(H) ? H : Config.is(this) ? this.init() : Config.F();
    }
    U.FixCon(Config);

    var F = Config;

    F.prototype.stack = null;
    F.prototype.userInfo = null;
    F.prototype.mainurl = null;
    F.prototype.init = function () {
        H = this;
        this.mainurl = HOST.replace(/\/{1,}$/, '') + '/';
        this.registerListener();
        this.stack = [];
        return this;
    };

    F.prototype.getHost = function () {
        return HOST;
    };

    F.prototype.getDomain = function () {
        return DOMAIN;
    };

    F.prototype.getQueue = function () {
        if (!this.queue) {
            this.queue = EFO.queueStack();
        }
        return this.queue;
    };

    F.prototype.getCookieLifeTime = function () {
        var d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        d.toUTCString();
    };

    F.prototype.pad = function (x) {
        var c = x.toString();
        return c.length > 1 ? c : ['0', c].join('');
    };

    F.prototype.mkurl = function (x) {
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };

    F.prototype.mkurlfull = function (x) {
        //  var session = localStorage.getItem('session');
        // var token = localStorage.getItem('uiToken');
        //  var devid = device.uuid;
        //, '?session_name=', session, '&uiToken=', token
//        if(/192\.168/.test(window.location.href)){
//            return [this.mainurl, x.replace(/^\/{1,}/,''), '?uiToken=',token].join('');
//        }
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };
    F.prototype.mkurlfullvideo = function (x) {
        var session = localStorage.getItem('session');
        var token = localStorage.getItem('uiToken');
        var devid = device.uuid;
        //, '?session_name=', session, '&uiToken=', token
        if (/192\.168/.test(window.location.href)) {
            return [this.mainurl, x.replace(/^\/{1,}/, ''), '&uiToken=', token].join('');
        }
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };

    F.prototype.registerListener = function () {
        EFO.Request.getRequestOptions().registerPostprocessor(this, this.onPostprocessor);
        return this;

    };

    F.prototype.getLang = function () {
        return localStorage.getItem('lang');
    };

    F.prototype.getSlowSwitchPreset = function () {
        return U.anyBool(localStorage.getItem('slowswitch'), false);
    };

    F.prototype.setSlowSwitch = function (x) {
        localStorage.setItem('slowswitch', U.anyBool(x, false) ? "1" : "0");
        EFO.Events.GEM().Run('SLOWSWITCH_STATE');
        return this;
    };


    F.prototype.onPostprocessor = function (rq, d) {
        if (U.isObject(d) && U.isObject(d.d) && U.isObject(d.d.userInfo)) {
            this.userInfo = JSON.parse(JSON.stringify(d.d.userInfo));
            EFO.Events.GEM().Run('USERINFO_UPDT', this.userInfo);
        }
        return this;
    };

    E.Config = Config;

})();
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/stack.js ==== */
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        window.Eve.appStack ? false : initPlugin();
        function initPlugin() {
            var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null, APS = Array.prototype.slice;
            function AppStack() {
                return AppStack.is(H) ? H : ((AppStack.is(this) ? this.init : AppStack.F).apply(this, APS.call(arguments)));
            }
            U.FixCon(AppStack);
            var F = AppStack;

            F.prototype.s = null;
            F.prototype.menuInt = null; //интерцептор для меню - оно есть всегда

            F.prototype.init = function () {
                H = this;
                this.s = [];
                document.addEventListener('backbutton', this.onBackButton.bindToObject(this));
                return this;
            };

            //push - если текущий есть в стеке - очистить стек до текущего
            // если нет - вставить
            // pop - если текущий - последний - выйти
            // иначе - извлечь последний, спрятать, показать предыдущий
            // back - передать вержнему компоненту на обработку
            // если обработает сам - ничего
            //иначе - pop
            //remove - если переданный компонент есть в стеке - убрать.
            //если переданный был последним - выполнить те же действия что и при POP


            F.prototype.onBackButton = function () {                
                if (U.isCallable(this.menuInt)) {
                    this.menuInt();
                    return this; // если установлен перехватчик - вызвать его
                }
                var x = this.getTopComponent();
                if (x) {
                    var r = false;
                    try {
                        r = x.stackOnBackButton(); //спросить у компонента - не хочет ли он сам обработать
                    } catch (e) {
                        r = false;
                    }
                    if (r) {
                        //this.pop(); //если ок - ничего не делать
                        return this;
                    }
                }
                return this.pop(); //вытолкнуть верхний компонент
            };

            F.prototype.pop = function () {
                var x = this.s.pop();
                if (x) {
                    x.stackOnPopPushOver(); //уведомляем компонент, что он покинул вершину стека (вынут или перекрыт)
                    var y = this.getTopComponent();
                    if (y) {
                        y.onTopStack(); // уведомляем компонен что он на вершине стека
                        return this;
                    }
                }
                navigator.app.exitApp(); // если больше нет компонентов - выходим
                return this;
            };

            F.prototype.getTopComponent = function () { //возвращает верхний компонент, не извлекая его из стека
                if (U.isArray(this.s) && this.s.length) {
                    return this.s[this.s.length - 1];
                }
                return null;
            };

            F.prototype.push = function (x) { //засовываем компонент в стек                
                var f = null;
                //ищем предыдущий вариант этого компонента
                for (var i = 0; i < this.s.length; i++) {
                    if (this.s[i] === x) {
                        f = this.s[i];
                        break;
                    }
                }
                if (f) { //найдена педыдущая
                    while (this.getTopComponent() !== x) {
                        this.pop(); //извлекаем все вышележащие
                    }
                } else {
                    var lt = this.getTopComponent();
                    if (lt) {
                        lt.stackOnPopPushOver(); // предыдущий - покинул вершину
                    }
                    this.s.push(x);
                    x.onTopStack(); //текущий занял вершину
                }
                return this;
            };

            F.prototype.remove = function (x) {
                var tx = this.getTopComponent();
                if (tx === x) {
                    return this.pop();
                } //если удаляемый - на вершине - вызвать pop
                var ts = [];
                for (var i = 0; i < this.s.length; i++) {
                    if (this.s[i] !== x) {
                        ts.push(this.s[i]);
                    }
                }
                this.s = ts;
                /// если в результате стек опустел - выйти
                if (!this.s.length) {
                    navigator.app.exitApp();
                }
                return this;
            };


            F.prototype.setMenuInt = function (x) {
                this.menuInt = U.isCallable(x) ? x : null;
                return this;
            };
            
            /*
             * Интерфейс стека
             * компонент:
             * stackOnBackButton - ret false - default,true-no default. opt
             * stackOnPopPushOver = Компонент покинул вершину. спрятать
             * onTopStack - компонент на вершине стека. показать
             * 
             * стек:
             * setMenuInt - установить перехватчик меню
             * remove - удалить указанный компонент
             * push - указанный компонент - на вершину
             * pop - компонент с вершины - убрать и вернуть предыдущий
             * 
             */



              F(); //это чтобыстек стразу







            E.appStack = F;
            window.__testback = F().onBackButton.bindToObject(F());
        }
    }

})();
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/components/pack.js ==== */
;/*===COMPONENT:DAP.login========*/;
(function () {
    var H = null, MC = 'DAPLogin', MD = '8f324f1dce746772b75751bf8bf22630', FQCN = 'DAP.login';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"aerror":"<div class=\"{{getCssClass}}AError\">{{#_TT}}{{getCssClass}}{{rm}}{{\/_TT}}<\/div>","forgotFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>        \n<\/filterList>\n","icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"DAPLoginLock\" viewBox=\"0 0 512 512\">        \n        <path d=\"M469.333,85.333H249.75l-39.542-39.542c-2-2-4.708-3.125-7.542-3.125h-160C19.135,42.667,0,61.802,0,85.333v341.333 c0,23.531,19.135,42.667,42.667,42.667h426.667c23.531,0,42.667-19.135,42.667-42.667V128 C512,104.469,492.865,85.333,469.333,85.333z M490.667,426.667c0,11.76-9.573,21.333-21.333,21.333H42.667 c-11.76,0-21.333-9.573-21.333-21.333V85.333C21.333,73.573,30.906,64,42.667,64H198.25l39.542,39.542 c2,2,4.708,3.125,7.542,3.125h224c11.76,0,21.333,9.573,21.333,21.333V426.667z\"\/>\n        <path d=\"M405.333,234.667c0-35.292-28.708-64-64-64c-35.292,0-64,28.708-64,64c0,19.167,8.542,37.104,23.146,49.219 l-12.375,87.958c-0.427,3.063,0.49,6.156,2.51,8.49c2.031,2.333,4.969,3.667,8.052,3.667H384c3.083,0,6.021-1.333,8.052-3.667 c2.021-2.333,2.938-5.427,2.51-8.49l-12.375-87.958C396.792,271.771,405.333,253.833,405.333,234.667z M364.854,270.229 c-3.427,2.271-5.24,6.302-4.667,10.375l11.542,82.063h-60.792l11.542-82.063c0.573-4.073-1.24-8.104-4.667-10.375 c-11.99-7.958-19.146-21.25-19.146-35.563c0-23.531,19.135-42.667,42.667-42.667C364.865,192,384,211.135,384,234.667 C384,248.979,376.844,262.271,364.854,270.229z\"\/>\n    <\/symbol>\n<\/svg>","loginFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>    \n    <property in=\"password\" filters=\"Trim,NEString,PasswordMatch\" \/>    \n<\/filterList>\n","main":"<div class=\"EFOFullScreen {{getCssClass}}__moderegister {{getCssClass}}login_signin\" id=\"{{getCssClass}}login_signin\">\n    <div class=\"container\">        \n        <p class=\"{{getCssClass}}reg_text {{getCssClass}}RegisterOnlyVis\">{{#_TT}}{{getCssClass}}reg_text{{\/_TT}}<\/p>\n        <form  data-role=\"form\" class=\"{{getCssClass}}RegisterForm\">\n            <div class=\"input_fielda {{getCssClass}}RegisterOnly\">\n                <label for=\"a{{MD}}name\">{{#_TT}}{{getCssClass}}FieldNameLabel{{\/_TT}}<\/label>\n                <input type=\"text\" data-field=\"name\" id=\"a{{MD}}name\" placeholder=\"{{#_TT}}{{getCssClass}}FieldNamePlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fielda\">\n                <label for=\"a{{MD}}email\">{{#_TT}}{{getCssClass}}FieldEmailLabel{{\/_TT}}<\/label>\n                <input type=\"email\" data-field=\"email\" id=\"a{{MD}}email\" placeholder=\"{{#_TT}}{{getCssClass}}FieldEmailPlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fielda\">\n                <label for=\"a{{MD}}pass\">{{#_TT}}{{getCssClass}}FieldPasswordLabel{{\/_TT}}<\/label>\n                <input type=\"password\" data-field=\"password\" id=\"a{{MD}}pass\" placeholder=\"{{#_TT}}{{getCssClass}}FieldPasswordPlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fieldb {{getCssClass}}RegisterOnly\">\n                <input type=\"checkbox\" data-field=\"agreement\" id=\"a{{MD}}agreement\" class=\"filled-in\" data-fielddefault=\"1\">\n                <label for=\"a{{MD}}agreement\">{{#_TT}}{{getCssClass}}AgreementBeforeLink{{\/_TT}} <a data-command=\"agreement\" href=\"#\">{{#_TT}}{{getCssClass}}AgreementLinkText{{\/_TT}}<\/a> {{#_TT}}{{getCssClass}}AgreementAfterLink{{\/_TT}}<\/label>\n            <\/div>\n            <div class=\"input_fieldb {{getCssClass}}RegisterOnly\">\n                <input type=\"checkbox\" data-field=\"subscribe\" id=\"a{{MD}}subscribe\" class=\"filled-in\"  data-fielddefault=\"1\">\n                <label for=\"a{{MD}}subscribe\">{{#_TT}}{{getCssClass}}SubscribeLabel{{\/_TT}}<\/label>\n            <\/div>\n            <div class=\"input_fieldc {{getCssClass}}RegisterOnly\">\n                <a href=\"#\" data-command=\"doRegister\" class=\"{{getCssClass}}btn\">{{#_TT}}{{getCssClass}}RegisterButton{{\/_TT}}<\/a>\n            <\/div>\n            <div class=\"input_fieldc {{getCssClass}}LoginOnly\">\n                <a href=\"#\" data-command=\"doLogin\" class=\"{{getCssClass}}btn\">{{#_TT}}{{getCssClass}}LoginButton{{\/_TT}}<\/a>\n            <\/div>\n        <\/form>\n        <div class=\"{{getCssClass}}IHaveLoginLink\">\n            <a href=\"#\" class=\"{{getCssClass}}RegisterOnly\" data-command=\"setMode\" data-mode=\"login\">{{#_TT}}{{getCssClass}}IHaveLogin{{\/_TT}}<\/a>\n            <a href=\"#\" class=\"{{getCssClass}}LoginOnly\" data-command=\"setMode\" data-mode=\"register\">{{#_TT}}{{getCssClass}}INotHaveLogin{{\/_TT}}<\/a>\n            <a href=\"#\" class=\"{{getCssClass}}LoginOnly {{getCssClass}}ForgotLink\" data-command=\"forgotPassword\">{{#_TT}}{{getCssClass}}AForgotPassword{{\/_TT}}<\/a>\n        <\/div>\n    <\/div>\n    <div class=\"container {{getCssClass}}AgreementContainer\" style=\"display:none;\" data-role=\"awindow\">\n        <div class=\"{{getCssClass}}AgreementHeader\" data-role=\"aheader\">{{#_TT}}{{getCssClass}}AgreementTitle{{\/_TT}}<\/div>\n        <div class=\"{{getCssClass}}AgreementContent\" data-role=\"acontent\"><\/div>\n        <div class=\"EFOWindowLoader {{getCssClass}}AgreeLoader\" data-role=\"aloader\"><\/div>\n        <div class=\"{{getCssClass}}AgreementFooter\">\n            <div class=\"{{getCssClass}}AgreementButton\" data-command=\"closeAgreement\">{{#_TT}}{{getCssClass}}AgreementButton{{\/_TT}}<\/div>\n        <\/div>\n    <\/div>\n<\/div>\n","registerFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>\n    <property in=\"name\" filters=\"Strip,Trim,NEString\" \/>\n    <property in=\"password\" filters=\"Trim,NEString,PasswordMatch\" \/>\n    <property in=\"agreement\" filters=\"Boolean,RequiredTrue\" \/>\n    <property in=\"subscribe\" filters=\"Boolean,DefaultTrue\" \/>\n<\/filterList>\n"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".DAPLoginlogin_signin{background-color:#760000;position:absolute;width:100%;color:#fff}.DAPLoginlogin_signin input:not([type]):focus:not([readonly]),.DAPLoginlogin_signin input[type=text]:focus:not([readonly]),.DAPLoginlogin_signin input[type=password]:focus:not([readonly]),.DAPLoginlogin_signin input[type=email]:focus:not([readonly]),.DAPLoginlogin_signin input[type=url]:focus:not([readonly]),.DAPLoginlogin_signin input[type=time]:focus:not([readonly]),.DAPLoginlogin_signin input[type=date]:focus:not([readonly]),.DAPLoginlogin_signin input[type=datetime]:focus:not([readonly]),.DAPLoginlogin_signin input[type=datetime-local]:focus:not([readonly]),.DAPLoginlogin_signin input[type=tel]:focus:not([readonly]),.DAPLoginlogin_signin input[type=number]:focus:not([readonly]),.DAPLoginlogin_signin input[type=search]:focus:not([readonly]),.DAPLoginlogin_signin textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid #fff;box-shadow:0 1px 0 0 #fff}p.DAPLoginreg_text{text-align:center;margin:0;padding-top:30px;padding-bottom:20px;font-size:13px}.DAPLoginlogin_signin .input_fielda label{color:#fff}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"]:checked+label:before{border-right:2px solid #760000;border-bottom:2px solid #760000}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"].filled-in:checked+label:after{border:2px solid #fff;background-color:#fff}.DAPLoginlogin_signin .input_fieldc{margin-top:20px}a.DAPLoginbtn{text-align:center;width:auto;background-color:#fff;color:#760000;display:inline-block;padding:0 2em;line-height:2.5em}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"]+label{line-height:20px;height:auto;color:#eee}.DAPLoginlogin_signin .input_fieldb{margin-bottom:10px}.EFOFlatControllerWraper.FlatControllerDAPLoginWrapper{position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;overflow:hidden}.EFOWindowContent.DAPLoginWindowContent{box-sizing:border-box;height:100%;overflow:hidden}.DAPLoginlogin_signin{box-sizing:border-box;height:100%;overflow:auto}.DAPLoginmoderegister .DAPLoginLoginOnly{display:none}.input_fieldb.DAPLoginRegisterOnly a{color:white;font-weight:bold}.DAPLoginlogin_signin .input_fieldc{text-align:center}ul.DAPLoginTabMode{position:absolute;left:0;width:2em;top:0;margin:0;padding:0;height:100%;max-height:100%}ul.DAPLoginTabMode li{width:2em;height:50%;display:block;overflow:hidden}.DAPLoginmodelogin .DAPLoginRegisterOnly{display:none}div#DAPLoginlogin_signin .container{height:100%;box-sizing:border-box}.DAPLoginIHaveLoginLink{text-align:center;padding-top:2em}.DAPLoginIHaveLoginLink a{color:white}.DAPLoginmodelogin .DAPLoginRegisterOnlyVis{visibility:hidden}.container.DAPLoginAgreementContainer{position:fixed;background:white;box-sizing:border-box;width:100%;height:100%;top:0;left:0;z-index:2;padding-top:3em;padding-bottom:4em}.DAPLoginAgreementHeader{position:absolute;top:0;left:0;width:100%;height:3em;line-height:3em;box-sizing:border-box;padding:0 .5em;width:100%;background:#760000;color:white}.DAPLoginAgreementFooter{position:absolute;left:0;bottom:0;height:4em;max-height:4em;line-height:3em;padding:.5em 1em;box-sizing:border-box;text-align:center;border-top:1px solid #760000;width:100%}.DAPLoginAgreementButton{display:inline-block;box-sizing:border-box;height:3em;line-height:3em;width:100%;height:100%;background:#760000;color:white;text-align:center}.DAPLoginAgreementContent{box-sizing:border-box;padding:.5em;width:100%;height:100%;overflow:auto;max-height:100%}.DAPLoginAgreementContent{color:black}.DAPLoginAError{color:crimson;text-align:center}a.DAPLoginLoginOnly.DAPLoginForgotLink{display:block;margin-top:2em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable', 'Monitorable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            //this.LEM.On('NEED_POSITE', this, this.placeAtCenter);            
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('boxapp');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            //this.placeAtCenter();
            return this;
        };

        F.prototype.onAfterHide = function () {


            return PARP.onAfterHide.apply(this, Array.prototype.slice.call(arguments));
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            var c = U.NEString(window.localStorage.getItem(MC + "login"));
            c ? this.setMode('login') : this.setMode('register');
            c ? this.getField('email').val(c) : false;
            return this;
        };


        F.prototype.setMode = function (x) {

            this.handle.removeClass(MC + "moderegister").removeClass(MC + "modelogin");
            this.handle.addClass(MC + "mode" + x);
            return this;
        };


        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };



        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandSetMode = function (x) {
            this.setMode(x.data('mode'));
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="команды сохранения">
        F.prototype.onCommandApply = function () {
            this.save(false);
            return this;
        };
        F.prototype.onCommandSave = function () {
            this.save(false);
            return this;
        };


        F.prototype.onCommandDoRegister = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterRegister());
            EFO.Filter.Filter().throwValuesError(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Policy">

        F.prototype.onCommandAgreement = function () {
            this.getRole('awindow').show();
            this.showAgreementLoader();
            //return EFO.Request('get', E.Config().mkurl('/cache/Pages/about_'+E.Config().getLang()+'.json'));
            EFO.Request('Get', E.Config().mkurl('/cache/Pages/policy_' + E.Config().getLang() + '.json'))
                    .done(this, this.onAgreementLoaded)
                    .fail(this, this.onAgreementLoadFail)
                    .always(this, this.hideAgreementLoader);
            return this;
        };

        F.prototype.onCommandCloseAgreement = function () {
            this.getRole('awindow').hide();
            return this;
        };


        F.prototype.showAgreementLoader = function () {
            this.getRole('aloader').show();
            return this;
        };
        F.prototype.hideAgreementLoader = function () {
            this.getRole('aloader').hide();
        };

        F.prototype.onAgreementLoaded = function (d) {
            this.getRole('aheader').html(d.d.page.title);
            this.getRole('acontent').html(d.d.page.info);
            return this;
        };

        F.prototype.onAgreementLoadFail = function (x) {
            var rm = "ASomeError";
            if (U.isError(x)) {
                rm = "A" + x.message;
            } else if (U.NEString(x)) {
                rm = "A" + x;
            }
            this.rm = rm;
            this.getRole("acontent").html(Mustache.render(EFO.TemplateManager().get('aerror', MC), this));
            return this;
        };
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="forgot">
        F.prototype.onCommandForgotPassword = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterForgot());
            EFO.Filter.Filter().throwValuesError(data, "EmailRequired", MC + "_:FORGOT_");
            this.showLoader();
            EFO.Request('get', E.Config().mkurl('/API/Info/Restore/Index'), {email: data.email})
                    .done(this, this.onPasswordResetOne)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());

            return this;
        };
        F.prototype.onPasswordResetOne = function () {
            new EveFlash({cssclass: "blue", TITLE: this._T(MC + "PRMessageTitle"), "TEXT": this._T(MC + "PRTEXTMessageDone"), ICON: "ok", IMAGE: "ok", TO: false});
        };

        //</editor-fold>

        F.prototype.getFilterForgot = function () {
            return EFO.TemplateManager().get('forgotFilter', MC);
        };


        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };
        F.prototype.getFilterLogin = function () {
            return EFO.TemplateManager().get('loginFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            EFO.Events.GEM().Run('LOGIN_SUCCESS', d.d.userInfo);
            this.hide();
            window.localStorage.setItem(MC + 'login', this.getField('email').val());
            return this;
        };


        F.prototype.onCommandDoLogin = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterLogin());
            EFO.Filter.Filter().throwValuesError(data, "InvalidInput", MC + ":");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Auth'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.onSubmitError = function (x) {
            U.TError(U.isError(x) ? x.message : (U.NEString(x) ? x : "NetworkError"));
            return this;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Сохранятор">
        F.prototype.save = function (keepOpen) {
            this.keep_editor_open = false;
            try {
                var data = this.checkData();
            } catch (e) {
                this.threadErrorObject(e);
                return this;
            }
            this.showLoader();
            EFO.Request('post', '/API/DAP/Auth/Auth', data)
                    .done(this.onPostResponce.bindToObject(this))
                    .fail(this.onPostFail.bindToObject(this))
                    .always(this.hideLoader.bindToObject(this));
            return this;
        };
        F.prototype.onPostResponce = function (d) {
            if (U.isObject(d)) {
                EFO.Events.GEM().Run('LOGIN_SUCCESS', d.d);                
                return this.hide();

            }
            return this.threadError(this._T("NetworkError"));
        };

        F.prototype.onPostFail = function (x) {
            return U.isError(x) ? this.threadError(x.message) : (U.NEString(x) ? this.threadError(x) : this.threadError(this._T("NegotiationError")));
        };

        F.prototype.checkData = function () {
            var d = this.getFields();
            d.login = U.NEString(d.login, null);
            d.login ? false : U.ERR("LoginIsRequired");
            EFO.Checks.isEmail(d.login) ? false : U.ERR("LoginMustBeValidEmail");
            d.password = U.NEString(d.password);
            d.password ? false : U.ERR("PasswordIsRequired");
            d.password.length >= 6 ? false : U.ERR("PasswordTooShort");
            d.email = d.login;
            return d;
        };
        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };

        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnBackButton = function () {
            navigator.app.exitApp();
            return true;
        };
        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            if (E.appStack().s.length>1) {
                E.appStack().remove(this);
            }
        };
        
        F.prototype.removeStack = function(){
                E.appStack().remove(this);
        };
        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:FilteredView========*/;
(function () {
    var H = null, MC = 'FilteredView', MD = '5f0655875e2e5b3330684f4d2ef66ea8', FQCN = 'FilteredView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"col s12 m6 l4\" data-command=\"showExcersize\" data-id=\"{{id}}\" data-retid=\"{{get_chapter_id}}\">\n    <div class=\"card\">\n        <div class=\"big_image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>\n        <\/div>\n        <div class=\"title_card\">\n            <span class=\"{{getCssClass}}ExcersizeNameInnera\">{{#_TT}}{{getCssClass}}ExcersizeText{{\/_TT}} {{excnum}}. {{name}}<\/span>\n        <\/div>\n        <div class=\"price_card\">\n            {{#_TT}}{{getCssClass}}GoToText{{\/_TT}}\n        <\/div>\n    <\/div>\n<\/div>   ","icons":"","list":"","main":"<div class=\"{{getCssClass}}Wrapepr\" >\n    <div class=\"{{getCssClass}}InnerWrapper {{getCssClass}}Tabs3\" data-role=\"content\">\n        <div class=\"{{getCssClass}}TabWrapper\">\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN1 {{getCssClass}}opened\" data-role=\"toptab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TrainingTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewWrapper\">\n                        <div class=\"{{getCssClass}}FilteredViewVideoZone\" data-role=\"video\"><\/div>\n                        <div class=\"{{getCssClass}}FilteredViewFilterZone\" data-role=\"filter\"><\/div>\n                    <\/div>\n                <\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN2\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}DescriptionTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewText\" data-role=\"info\"><\/div>\n                <\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN3\" data-role=\"exitab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}ExVideoTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewExVideo\" data-role=\"exvideo\" data-comment=\"\u0412\u0441\u0435 \u0438 \u043f\u043e\u0445\u0443\u0439\"><\/div>\n                <\/div>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-retid=\"{{get_return_id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapterSelf\">\n    <div class=\"card {{getCssClass}}SubChapterRow\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>        \n    <\/div>\n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".FilteredViewWrapepr{box-sizing:border-box;overflow:hidden;height:100%;max-height:100%}.FilteredViewInnerWrapper{height:100%;max-height:100%;box-sizing:border-box}.FilteredViewTabWrapper{overflow:auto;box-sizing:border-box;height:100%}.FilteredViewTabHeader{line-height:3.5em;border:1px solid silver;box-sizing:border-box;border-top:1px solid transparent;padding:0 .5em;border-left:0 solid transparent;border-right:0 solid transparent;position:relative;cursor:pointer}.FilteredViewTabHeader:after{display:block;content:' ';position:absolute;width:1em;height:1em;border:1px solid #8c8b8b;top:1.25em;right:1.25em;transform:rotate(-45deg);margin-top:-.3em;border-top:0;border-right:0;transition:all .3s}.FilteredViewopened .FilteredViewTabHeader:after{transform:rotate(45deg);border-bottom:0;border-top:1px solid #8c8b8b;margin-top:.25em}.FilteredViewTabBody{overflow:hidden;display:none}.FilteredViewopened .FilteredViewTabBody{display:block}.FilteredViewInnerWrapper{padding-top:3.5em}.FilteredViewTabHeader{position:absolute;top:0;text-align:center;overflow:hidden;border-bottom:1px solid silver !important;border-top:0 !important;border-left:1px solid silver;box-sizing:border-box;max-height:3.5em;overflow:hidden}.FilteredViewTab.FilteredViewTabN1 .FilteredViewTabHeader{left:0;border-left:0}.FilteredViewTabHeader:after{display:none}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTabHeader{width:33.3333%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTabHeader{width:50%}.FilteredViewInnerWrapper.FilteredViewTabs1 .FilteredViewTabHeader{width:100%}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTab.FilteredViewTabN2 .FilteredViewTabHeader{left:33.333%}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTab.FilteredViewTabN3 .FilteredViewTabHeader{left:66.6666%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTab.FilteredViewTabN2 .FilteredViewTabHeader{left:50%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTab.FilteredViewTabN3 .FilteredViewTabHeader{display:none}.FilteredViewTab.FilteredViewopened .FilteredViewTabHeader{font-weight:bold;color:#760000}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        F.prototype.videoSwitch = null;
        //
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.videoSwitch = EFO.videoSwitch();
            this.videoSwitch.setContainer(this.getRole('video')).clear();
            this.videoSlider = EFO.videoSlider();
            this.videoSlider.setContainer(this.getRole('exvideo')).clear();
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                this.data ? d.setTitle(this.data.chapter.name) : false;
                d.setBackMode(true);
            });
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>        
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapterGroup/' + x + '_' + E.Config().getLang() + '.json'));
        };


        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d.responce;
            this.lastid = this.data.chapter.id;
            this.stamp = d.m._ts;
            //this.videoSwitch.setData(this.data.excersizes[0].imagemap,this.stamp);
            var exa = U.safeArray(this.data.excersizes);
            var exi = [];
            for (var i = 0; i < exa.length; i++) {
                var oexi = U.safeArray(exa[i].images);
                for (var j = 0; j < oexi.length; j++) {
                    oexi[j].excid = exa[i].info.id;
                    exi.push(oexi[j]);
                }
            }
            this.getRole('content').removeClass(MC + "Tabs1 " + MC + "Tabs1 " + MC + "Tabs2 " + MC + "Tabs3");
            if (exi.length) {
                this.getRole('exitab').show();
                this.videoSlider.setData(exi, this.stamp);
                this.getRole('content').addClass(MC + "Tabs3");
            } else {
                this.getRole('exitab').hide();
                this.videoSlider.setData([]);
                this.getRole('content').addClass(MC + "Tabs2");
            }

            this.filter ? this.filter.clear() : false;
            this.filter = null;

            var ff = window.Eve.ConFil[this.data.chapter.groupmode];

            if (U.isCallable(ff)) {
                this.filter = ff().setCallback(this, this.onFilterChanged).install(this.getRole('filter'), this.data.excersizes);
            } else {
                this.error = "contentFilterNotFound";
                this.getRole('filter').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            }
            this.getRole('info').html(this.data.chapter.info);

            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            this.onCommandSetTab(this.getRole('toptab'));
            //this.initFilter();
            //this.setGroupData();
            return this;
        };

        F.prototype.onFilterChanged = function (fv) {
            //debugger;
            var fv = U.IntMoreOr(fv, 0, 0);
            var cd = null;
            for (var i = 0; i < this.data.excersizes.length; i++) {
                if (this.data.excersizes[i].info.filter_value == fv) {
                    cd = this.data.excersizes[i];
                    break;
                }
            }
            if (cd) {
                this.videoSwitch.setData(cd.imagemap, this.stamp);
            }
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.excnum = function () {
            return (++H.counter);
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).show().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC)
                        //  ,'excersize': EFO.TemplateManager().get('excersize', MC)
                        //,'subchapter': EFO.TemplateManager().get('subchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.videoSlider.clear();
            this.videoSwitch.clear();
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };
        F.prototype.stackOnBackButton = function () {
            this.clear();
            return false;
        };

        F.prototype.onTopStack = function () {
            this.show();
            this.videoSlider ? this.videoSlider.onChanged() : false;
            this.videoSwitch ? this.videoSwitch.onChanged() : false;
            return this;
        };



        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).show().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandSetTab = function (t) {
            this.getRole('content').find('.' + MC + "opened").removeClass(MC + 'opened');
            t.closest('.' + MC + "Tab").addClass(MC + 'opened');
            this.videoSlider.onChanged();
            this.videoSwitch.onChanged();
            return this;
        };




        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:about========*/;
(function () {
    var H = null, MC = 'About', MD = '46b3931b9959c927df4fc65fdee94b07', FQCN = 'about';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"content":"<div id=\"{{getCssClass}}NewsWrapper\" class=\"{{getCssClass}}Block\">\n    <h4>{{data.page.title}}<\/h4>\n    {{{data.page.info}}}\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"\n","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>    \n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".AboutOuter{box-sizing:border-box;padding:1em;padding-right:0;height:100%;max-height:100%;overflow:hidden}.AboutWrapper{height:100%;max-height:100%;box-sizing:border-box;padding-right:1em;overflow:auto}div#AboutNewsWrapper>h4{font-size:1.7em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this._T(MC + "AboutTitle"));
            });
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            this.showLoader();
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/cache/Pages/about_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('content', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };



        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };



        F.prototype.onCommandReload = function () {
            return this.load(0);
        };



        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:book========*/;
(function () {
    var H = null, MC = 'Book', MD = '821f03288846297c2cf43c34766a38f7', FQCN = 'book';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"cchapter":"{{#childs}}\n{{#published}}\n{{registerSection}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapter\">\n    <div class=\"card\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>\n        <div class=\"price_card\">\n            {{{absolutePrice}}}\n        <\/div>\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/childs}}\n","cmain":"{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}Section container\">\n    <h2>{{name}}<\/h2>\n    <div class=\"{{getCssClass}}SectionContentV2 row\">\n        {{registerSection}}\n        {{>lessons}}\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n{{updateFullPrice}}\n","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"BookLabelBoughtItem\" viewBox=\"0 0 448.8 448.8\">        \n        <polygon points=\"142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55 \"\/>\n    <\/symbol>\n<\/svg>\n","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>\n    <div class=\"{{getCssClass}}ByAllButtonW\">\n        <div class=\"{{getCssClass}}ByAllAccess\" data-command=\"byAll\">{{#_TT}}{{getCssClass}}ByAllAccess{{\/_TT}} <span data-role=\"fullPrice\"><\/span><\/div>\n    <\/div>\n<\/div>","oklable":"<span class=\"BookBoughtLabel\">\n    <svg>\n    <use xlink:href=\"#BookLabelBoughtItem\"\/>\n    <\/svg>\n<\/span>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".BookOuter{box-sizing:border-box;overflow:hidden;padding:.5em;padding-right:0;height:100%;max-height:100%}.BookWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:auto;padding-right:.5em}.BookSection{padding:.5em 0;box-sizing:border-box}.SectionHeader{font-weight:bold;font-size:1.2em;margin-bottom:1em}.BookChapter{float:left;box-sizing:border-box;width:32%}.BookSectionContent{overflow:hidden;padding-bottom:1em}.BookChapter{margin-left:.6%;margin-right:.6%}.BookChapterPict{width:100%;box-sizing:border-box}.BookChapterPict img{max-width:100%;max-height:100%}.BookChapterPict{padding:.2em}.BookChapter{padding:.2em;border:1px solid silver;border-radius:3%;box-shadow:3px 3px 10px silver}.BookChapterName{padding:.2em}.BookchapterPrice{padding:.2em;font-weight:bold;margin:.3em 0}span.BookBoughtLabel{width:1.1em;height:1.1em;overflow:hidden;display:inline-block}span.BookBoughtLabel svg{width:100%;height:100%;fill:green}.BookchapterPrice{text-align:right;padding-right:.7em}.BookChapter{cursor:pointer}.BookchapterPrice{color:#760000}@media all and (max-width:450px){.BookChapter{width:45%;margin-left:2.5%;margin-right:2.5%}}.BookallowByAll .BookOuter{padding-bottom:5em}.BookByAllButtonW{position:absolute;bottom:0;left:0;text-align:center;height:5em;box-sizing:border-box;line-height:4em;width:100%;padding:.5em}.BookByAllAccess{cursor:pointer;font-size:1.4em;background:#760000;color:white;cursor:pointer}.BookByAllButtonW{display:none}.BookallowByAll .BookByAllButtonW{display:block}.BookChapter{max-width:300px}.BookChapterPict img{width:100%}.price_card{display:none}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            var self = this;
            this.registerSection = function () {
                return self._registerSection(this);
            };
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            this.handle[U.anyBool(E.Config().userInfo.ra, false) ? 'removeClass' : 'addClass'](MC + 'allowByAll');
            //E.Config().pushComponent(this);
             EFO.Com().com('toolbar').done(this, function (x) {                 
                x().setBackMode(false).setTitle(this._T(MC+"Encilopedy"));
            });            
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear();
            this.showLoader();

            this.getRequest()
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function () {
            return EFO.Request('get', E.Config().mkurl('/cache/Book/Tree_'+E.Config().getLang()+'.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.sections = {};
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.absolutePrice = function () {
            return H.getAbsolutePrice(this);
        };

        F.prototype.getAbsolutePrice = function (section) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return this.getBoughtMark();
            }
            var ptr = [];
            ptr.push(section.id);
            var n = section.parent;
            while (n) {
                var key = "N" + n;
                if (key in this.sections) {
                    ptr.push(n);
                    n = this.sections[key].parent;
                } else {
                    n = null;
                }
            }
            var price = null;
            for (var i = 0; i < ptr.length; i++) {
                if (this.hasAccess(ptr[i])) {
                    return this.getBoughtMark();
                }
                if (price === null && U.IntMoreOr(this.sections['N' + ptr[i]].cost, 0, 0)) {
                    price = this.sections['N' + ptr[i]].cost;
                }
            }

            return price ? [parseInt(price / 100), ' ', this._T(MC + "ValuteLabel")].join('') : this.getFreeMark();
        };

        F.prototype.hasAccess = function (x) {
            var A = U.safeArray(E.Config().userInfo.permissions);
            for (var i = 0; i < A.length; i++) {
                if (A[i] == x) {
                    return true;
                }
            }
            return false;
        };

        F.prototype.getFreeMark = function () {
            return this._T(MC + "FreeMark");
        };
        F.prototype.getBoughtMark = function () {
            return EFO.TemplateManager().get('oklable', MC);
        };



        F.prototype._registerSection = function (sec) {
            this.sections ? false : this.sections = {};
            this.sections[sec.key] = sec;
            return '';
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('cmain', MC),
                'lessons': EFO.TemplateManager().get('cchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandSetMode = function (x) {
            this.setMode(x.data('mode'));
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="команды сохранения">
        F.prototype.onCommandApply = function () {
            this.save(false);
            return this;
        };
        F.prototype.onCommandSave = function () {
            this.save(false);
            return this;
        };


        F.prototype.onCommandDoRegister = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterRegister());
            EFO.Filter.Filter().throwValuesErrors(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            debugger;
        };

        F.prototype.onSubmitError = function () {
            debugger;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


      //  F.prototype.install = function () {
           
      //      return this.show();
     //   };
        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };


        F.prototype.updateFullPrice = function () {
            H.setFullPrice();
        };

        F.prototype.setFullPrice = function () {
            var i = 0;
            for (var k in this.sections) {
                if (this.sections.hasOwnProperty(k) && U.isObject(this.sections[k])) {
                    if (this.sections[k].parent === null) {
                        i += U.IntMoreOr(this.sections[k].cost, 0, 0);
                    }
                }
            }
            this.getRole('fullPrice').html(['(', U.IntMoreOr(i / 100, 0, 0), ' ', this._T(MC + 'ValuetFull'), ')'].join(''));
        };

        F.prototype.hasAccessDeep = function (x) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return true;
            }
            var ca = [];
            var s = this.sections["N" + x];
            while (s) {
                if (this.hasAccess(s.id)) {
                    return true;
                }
                ca.push(U.IntMoreOr(s.cost,0,0));
                s = (s.parent) ? this.sections["N" + s.parent] : null;
            }
            var cx = Math.max.apply(Math,ca);
            return cx>0?false:true;
        };

        F.prototype.onCommandOpenChapter = function (t) {
            var chapterId = t.data('nid');
          
            if (this.hasAccessDeep(chapterId)) {
                EFO.Com().com('chapterView')
                        .done(function (x) {
                            x().load(chapterId).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            } else {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(chapterId).install().setCallback(this,this.load);
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load();
        };
        


        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:chapterView========*/;
(function () {
    var H = null, MC = 'ChapterView', MD = '6232d837aabc71ecfe4d23b8abc74b76', FQCN = 'chapterView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"col s12 m6 l4\" data-command=\"showExcersize\" data-id=\"{{id}}\" data-retid=\"{{get_chapter_id}}\">\n    <div class=\"card\">\n        <div class=\"big_image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>\n        <\/div>\n        <div class=\"title_card\">\n            <span class=\"{{getCssClass}}ExcersizeNameInnera\">{{#_TT}}{{getCssClass}}ExcersizeText{{\/_TT}} {{excnum}}. {{name}}<\/span>\n        <\/div>\n        <div class=\"price_card\">\n            {{#_TT}}{{getCssClass}}GoToText{{\/_TT}}\n        <\/div>\n    <\/div>\n<\/div>   ","icons":"","list":"\n<div class=\"container\">\n    <div class=\"{{getCssClass}}Header\" data-role=\"chptitle\">{{{data.chapter.name}}}<\/div>    \n    <div class=\"{{getCssClass}}Intro\" data-role=\"intro\">{{{data.chapter.info}}}<\/div>    \n    {{#hasSubChapters}}\n    <div class=\"row\">\n        {{#data.subchapters}}\n        {{>subchapter}}\n        {{\/data.subchapters}}\n    <\/div>\n    {{\/hasSubChapters}}\n    <div class=\"row\">\n        {{#data.excersizes}}\n        {{>excersize}}\n        {{\/data.excersizes}}\n        {{^data.excersizes}}\n        <div class=\"{{getCssClass}}ExcersizeError\">{{#_TT}}{{getCssClass}}NoExcersizes{{\/_TT}}<\/div>\n        {{\/data.excersizes}}\n    <\/div>\n<\/div>  \n","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper\" data-role=\"content\"><\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-retid=\"{{get_return_id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapterSelf\">\n    <div class=\"card {{getCssClass}}SubChapterRow\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>        \n    <\/div>\n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".ChapterViewWrapepr{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em}.ChapterViewInnerWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.ChapterViewInner{box-sizing:border-box;height:100%;max-height:100%;padding-right:.5em;overflow:auto}.ChapterViewHeader{font-size:1.4em;font-weight:bold}.ChapterViewIntro p{margin-top:0;margin-bottom:0}.ChapterViewIntro{margin-bottom:.8em}.ChapterViewExcersizeBlock{box-sizing:border-box;overflow:hidden;padding:.3em;border:1px solid silver;margin-bottom:1.5em;border-radius:1%}.ChapterViewImageWrapper{box-sizing:border-box}.ChapterViewImageWrapper img{max-width:100%;max-height:100%;width:100%}.ChapterViewExcersizeBlock{width:100%;float:left}.ChapterViewExcerizes{overflow:hidden}.ChapterViewExcersizeName{font-size:1.4em}.ChapterViewGoTo{line-height:1.7em;text-align:right;color:#760000;font-size:1.3em;padding-right:.5em;margin-bottom:.4em;font-weight:bold}.ChapterViewExcersizeName{height:4em;max-height:4em;line-height:1.3em;overflow:hidden}.ChapterViewExcersizeName{margin-top:.3em}.ChapterViewExcersizeBlock{max-width:750px}.ChapterViewWrapepr{padding:0 !important}.ChapterViewInnerWrapper{padding:0 !important;overflow:auto !important}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.hasSubChapters = this._hasSubChapters.bindToObject(this);
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                d.setBackMode(true);
                this.data ? d.setTitle(this.data.chapter.name) : false;
            });
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        F.prototype.returnStack = [];
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapter/' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d.chapterinfo;
            this.counter = 0;
            this.data.chapter.chapter_id = this.data.chapter.id;
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            return this;
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.excnum = function () {
            return (++H.counter);
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).install().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC),
                'excersize': EFO.TemplateManager().get('excersize', MC),
                'subchapter': EFO.TemplateManager().get('subchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


//        F.prototype.install = function () {
//
//            return this.show();
//        };

        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        F.prototype.displayFilteredContent = function (x) {
            this.showLoader();
            EFO.Com().com('FilteredView')
                    .done(this, function (c) {
                        c().load(x).install();
                    }).fail(this, this.onRequiredComponentFail)
                    .always(this, this.hideLoader);
            return this;

        };

        F.prototype.onCommandOpenChapterSelf = function (t) {
            if (U.NEString(t.data('filter'))) {
                return this.displayFilteredContent(t.data('nid'));
            }
            var chapterId = t.data('nid');
            this.returnStack.push(this.data.chapter_id);
            this.load(chapterId);
//            if (this.hasAccess(chapterId)) {
//                EFO.Com().com('chapterView')
//                        .done(function (x) {
//                            x().load(chapterId).show();
//                        })
//                        .fail(this, this.onRequiredComponentFail);
//            } else {
//                EFO.Com().com('paymentView')
//                        .done(function (x) {
//                            x().load(chapterId).show();
//                        })
//                        .fail(this, this.onRequiredComponentFail);
//            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).install().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype._hasSubChapters = function () {
            return U.isArray(this.data.subchapters) && this.data.subchapters.length ? true : false;
        };

        F.prototype.stackHide = function () {
            this.hide();
        };

        F.prototype.stackShow = function () {
            this.show();
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:excersizeView========*/;
(function () {
    var H = null, MC = 'ExcersizeView', MD = '848eb470cb1fb563644e8298a4b3260c', FQCN = 'excersizeView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"771":"<svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>","Navigation":"<div class=\"{{getCssClass}}NavigationBlock\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1m1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnm1\" data-command=\"navTo\" data-x=\"0\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1m1\" data-command=\"navTo\" data-x=\"1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1nn\" data-command=\"navTo\" data-x=\"-1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1nn\" data-command=\"navTo\" data-x=\"1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1p1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnp1\" data-command=\"navTo\" data-x=\"0\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1p1\" data-command=\"navTo\" data-x=\"1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","exc":"{{#data}}\n<div  class=\"close_block\">\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"map\">\n        {{#_TT}}{{getCssClass}}TrainingHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>\n    <div  class=\"one_acord {{getCssClass}}ImagesBlock {{getCssClass}}active\" data-role=\"block_map\">\n        <div class=\"big_image_block {{getCssClass}}TrainingViewImage {{getCssClass}}ImageMiddleMiddle\">\n            {{#imagemap}}\n            <div class=\"one_image\" data-textid=\"{{indexText}}\" data-xindex=\"{{xindex}}\"  data-yindex=\"{{yindex}}\" data-index=\"{{index}}\" id=\"{{#createPeloader}}{{{url}}}{{\/createPeloader}}\">  \n                <div class=\"{{getCssClass}}Preloader\" >\n                    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n                <\/div>                            \n            <\/div>   \n            {{\/imagemap}}\n            {{>navigation}}\n        <\/div>\n    <\/div>\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"text\">\n        {{#_TT}}{{getCssClass}}DescriptionHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>\n    <div  class=\"one_acord {{getCssClass}}TextBlock\" data-role=\"block_text\">\n        <div class=\"kick_text\">\n            {{{info.info}}}\n        <\/div>\n    <\/div>\n    {{#hasImages}}\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"images\">\n        {{#_TT}}{{getCssClass}}ExamplesHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>    \n    <div  class=\"one_acord {{getCssClass}}EximagesBlock\" data-role=\"block_images\">        \n        {{resetImageIndex}}\n        {{#images}}        \n        <div class=\"one_boy {{getCssClass}}Eximage {{#isFirst}}{{getCssClass}}ActiveImage{{\/isFirst}}\" data-index=\"{{#getExiIndex}}.{{\/getExiIndex}}\">\n            <div id=\"{{#preloadExt}}{{excid}}\/{{imageid}}{{\/preloadExt}}\">\n                <div class=\"{{getCssClass}}Preloader\" >\n                    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n                <\/div>\n            <\/div>            \n            <div class=\"{{getCssClass}}ImageInfo\">{{{info}}}<\/div>\n        <\/div>        \n        {{\/images}}\n        {{>sliderNavigation}}\n    <\/div>\n    {{\/hasImages}}\n<\/div>\n{{\/data}}","excview":"<div class=\"{{getCssClass}}Tab {{getCssClass}}TabOpen\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}TrainingTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        {{#images}}\n        <div class=\"{{getCssClass}}ImageWrapper\" data-xindex=\"{{xindex}}\" data-yindex=\"{{yindex}}\" data-index=\"{{index}}\">\n            <img src=\"{{#mkurl}}\/PImageFly\/EXC\/N{{id}}\/{{indexText}}\/600_450.gif\" \/>            \n        <\/div>\n        {{\/images}}        \n        {{>navigation}}\n    <\/div>\n<\/div>\n<div class=\"{{getCssClass}}Tab\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}InfoTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        \n    <\/div>\n<\/div>\n\n<div class=\"{{getCssClass}}Tab\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}ExamplesTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        \n    <\/div>\n<\/div>","icon":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!-- Created with Inkscape (http:\/\/www.inkscape.org\/) -->\n\n<svg style=\"display:none\" \n   xmlns:dc=\"http:\/\/purl.org\/dc\/elements\/1.1\/\"\n   xmlns:cc=\"http:\/\/creativecommons.org\/ns#\"\n   xmlns:rdf=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"\n   xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\"\n   xmlns=\"http:\/\/www.w3.org\/2000\/svg\"\n   xmlns:sodipodi=\"http:\/\/sodipodi.sourceforge.net\/DTD\/sodipodi-0.dtd\"\n   xmlns:inkscape=\"http:\/\/www.inkscape.org\/namespaces\/inkscape\"\n   width=\"210mm\"\n   height=\"297mm\"\n   >\n  <defs>\n    <symbol\n        viewBox=\"57 85 25 25\"\n       id=\"navigationArrow\">      \n      <path        \n         id=\"path3691\"\n         d=\"M 62.839121,103.78172 57.73297,98.666438 h 2.905853 2.905854 v -3.175002 -3.175 h 4.409722 4.409722 v 3.175 3.175002 h 2.822225 c 1.55222,0 2.82222,0.12119 2.82222,0.26931 0,0.29215 -9.596938,9.961242 -9.886907,9.961242 -0.09701,0 -2.474154,-2.30187 -5.282538,-5.11527 z m -5.579682,-14.904867 0.111627,-0.970139 10.671528,-0.09337 10.671532,-0.09337 v 1.063506 1.063506 H 67.930967 57.147812 Z\"\n          \/>\n    <\/symbol>\n  <\/defs>  \n<\/svg>","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper {{getCssClass}}Tabs3\" data-role=\"content\">\n        <div class=\"{{getCssClass}}TabWrapper\">\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN1  {{getCssClass}}TabOpened\" data-role=\"toptab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabVideoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"video\"><\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN2\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabInfoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"info\"><\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN3\" data-role=\"videotab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabExvideoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"exvideo\"><\/div>\n            <\/div>\n        <\/div>\n    <\/div>    \n<\/div>","sliderNavigation":"<div class=\"{{getCssClass}}SliderNavigation\">\n    <div class=\"{{getCssClass}}SliderArrow {{getCssClass}}SliderArrowLeft\" data-command=\"slideLeft\">\n        <svg ><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}SliderArrow {{getCssClass}}SliderArrowRight\" data-command=\"slideRight\">\n        <svg ><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","videotpl":"<video loop autoplay webkit-playsinline playsinline src=\"{{{xurl}}}\"><\/video>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".ExcersizeViewWrapepr{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.ExcersizeViewInnerWrapper{box-sizing:border-box;overflow:auto;padding-right:.5em}.ExcersizeViewInnerWrapper .close_block{display:block}.one_acord.ExcersizeViewactive{display:block}.big_image_block.ExcersizeViewTrainingViewImage .one_image{position:relative;text-align:center}.one_image img{height:auto !important;width:100%}.ExcersizeViewInnerWrapper{height:100%;max-height:100%}.one_image{display:none}.ExcersizeViewNavigationBlock{font-size:1.5em;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box}.ExcersizeViewArrow{width:2em;height:2em;overflow:hidden;position:absolute;cursor:pointer}.ExcersizeViewArrow svg{width:100%;height:100%}.one_acord.ExcersizeViewImagesBlock{position:relative}.big_image_block.ExcersizeViewTrainingViewImage{position:relative}.ExcersizeViewNavigationBlock{font-size:16px}.ExcersizeViewArrow.ExcersizeViewArrowTonnm1{top:0;left:50%;transform:rotate(-180deg) translateX(50%);margin-top:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1m1{top:0;right:0;transform:rotate(-135deg);margin-top:.3em;margin-right:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1nn{left:0;top:50%;transform:rotate(90deg) translateX(-50%);margin-left:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1nn{top:50%;right:0;transform:rotate(-90deg) translateX(50%);margin-right:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1p1{left:0;bottom:0;transform:rotate(45deg);margin-bottom:.3em;margin-left:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTonnp1{left:50%;bottom:0;transform:translateX(-50%);margin-bottom:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1p1{right:0;bottom:0;transform:rotate(-45deg);margin-right:.3em;margin-bottom:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1m1{left:0;top:0;transform:rotate(135deg);margin-top:.3em;margin-left:.3em}.ExcersizeViewArrow svg{fill:#760000}.ExcersizeViewArrow{animation:Excvwanm linear 1s infinite alternate;cursor:pointer}@keyframes Excvwanm{from{opacity:1}to{opacity:0}}.big_image_block.ExcersizeViewImageLeftUp .one_image[data-index=\"00\"]{display:block}.big_image_block.ExcersizeViewImageLeftMiddle .one_image[data-index=\"01\"]{display:block}.big_image_block.ExcersizeViewImageLeftDown .one_image[data-index=\"02\"]{display:block}.big_image_block.ExcersizeViewImageMiddleUp .one_image[data-index=\"10\"]{display:block}.big_image_block.ExcersizeViewImageMiddleMiddle .one_image[data-index=\"11\"]{display:block}.big_image_block.ExcersizeViewImageMiddleDown .one_image[data-index=\"12\"]{display:block}.big_image_block.ExcersizeViewImageRightUp .one_image[data-index=\"20\"]{display:block}.big_image_block.ExcersizeViewImageRightMiddle .one_image[data-index=\"21\"]{display:block}.big_image_block.ExcersizeViewImageRightDown .one_image[data-index=\"22\"]{display:block}.one_boy.ExcersizeViewEximage{display:none}.one_boy.ExcersizeViewEximage.ExcersizeViewActiveImage{display:block}.ExcersizeViewEximagesBlock{position:relative}.ExcersizeViewSliderNavigation{box-sizing:border-box;position:absolute;top:0;left:0;width:100%;height:100%;background:transparent}.ExcersizeViewSliderArrow{position:absolute;top:50%;width:4em;height:4em;margin-top:-2em;margin-left:1em;margin-right:1em;cursor:pointer;box-sizing:border-box;padding:.2em}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowLeft{left:0}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowRight{right:0}.ExcersizeViewSliderArrow svg{width:100%;height:100%;fill:#760000}.ExcersizeViewSliderArrow{padding:.5em}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowLeft svg{transform:rotate(90deg)}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowRight svg{transform:rotate(-90deg)}.ExcersizeViewTrainingViewImage video{width:100%}.ExcersizeViewWrapepr{padding-left:0;padding-right:0}.ExcersizeViewEximage video{width:100%;max-width:100%}.ExcersizeViewInnerWrapper{padding-right:0}.ExcersizeViewPreloader{background:whitesmoke;min-height:150px;position:relative}.ExcersizeViewPreloader svg{position:absolute;top:50%;left:50%;width:100px;height:100px;margin:-50px 0 0 -50px}.ExcersizeViewTabHeader{line-height:3.5em;height:3.5em;border:1px solid silver;border-left:0;border-right:0;position:relative;box-sizing:border-box;padding:0 .5em;border-top:0}.ExcersizeViewTabHeader:after{position:absolute;width:1.25em;height:1.25em;border:1px solid #8a8484;content:' ';top:50%;margin-top:-.75em;right:1em;transform:rotate(-45deg);border-top:0;border-right:0;transition:all .3s}.ExcersizeViewWrapepr{padding-top:0}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabHeader:after{transform:rotate(135deg);margin-top:-.3em}.ExcersizeViewTab.ExcersizeViewTabOpened+.ExcersizeViewTab .ExcersizeViewTabHeader{border-top:1px solid silver}.ExcersizeViewTabBody{display:none}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabBody{display:block}.ExcersizeViewInnerWrapper{position:relative;padding-top:3.5em}.ExcersizeViewTabHeader{position:absolute;top:0;border-top:0 !important;border-bottom:1px solid silver !important;border-left:1px solid silver;max-height:3.5em;overflow:hidden;text-align:center}.ExcersizeViewTabHeader:after{display:none}.ExcersizeViewTab.ExcersizeViewTabN1 .ExcersizeViewTabHeader{left:0;border-left:0}.ExcersizeViewTabHeader:after{display:none}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTabHeader{width:33.3333%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTabHeader{width:50%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs1 .ExcersizeViewTabHeader{width:100%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTab.ExcersizeViewTabN2 .ExcersizeViewTabHeader{left:33.333%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTab.ExcersizeViewTabN3 .ExcersizeViewTabHeader{left:66.6666%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTab.ExcersizeViewTabN2 .ExcersizeViewTabHeader{left:50%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTab.ExcersizeViewTabN3 .ExcersizeViewTabHeader{display:none}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabHeader{font-weight:bold;color:#760000}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icon'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.videoSwitch = EFO.videoSwitch();
            this.videoSwitch.setContainer(this.getRole('video')).clear();
            this.videoSlider = EFO.videoSlider();
            this.videoSlider.setContainer(this.getRole('exvideo')).clear();
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };





        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };
        F.prototype.loadAlias = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequestAlias(x)
                    .done(this, this.onMainResponceAlias)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequestAlias = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/Excersize/alias_' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/Excersize/' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.setReturnId = function (x) {
            this.returnId = x;
            return this;
        };
        F.prototype.onMainResponceAlias = function (d) {
            this.aload = d.d.excersize.info.id;
            return this.onMainResponce(d);
        };

        F.prototype.onMainResponce = function (d) {
            this.data = d.d.excersize;
            this.stamp = d.m._ts;
            this.data.excid = this.data.info.id;
            //this.getRole('content').html(Mustache.render(tp.main, this, tp));
            // порядковая расстановка
            this.videoSwitch.setData(this.data.imagemap, this.stamp);
            var exi = U.safeArray(this.data.images);
            this.getRole('content').removeClass(MC+"Tabs1 "+MC+"Tabs1 "+MC+"Tabs2 "+MC+"Tabs3");
            if (exi.length) {
                for (var i = 0; i < exi.length; i++) {
                    exi[i].excid = this.data.excid;
                }
                this.videoSlider.setData(exi, this.stamp);
                this.getRole('videotab').show();
                this.getRole('content').addClass(MC+"Tabs3");
                
            } else {
                this.videoSlider.setData([]);
                this.getRole('videotab').hide();
                this.getRole('content').addClass(MC+"Tabs2");
            }
            this.getRole('info').html(this.data.info.info);

            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.info.name);
            });
            this.onCommandSetTab(this.getRole('toptab'));
            return this;
        };






        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };


        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurlfull(b(a));
            };
        };


        F.prototype.onCommandOpenblock = function (t) {
            var block = t.data('block');
            this.handle.find('.one_acord').removeClass(MC + 'active');
            this.handle.find('[data-role="block_' + block + '"]').addClass(MC + 'active');
            this.onSwipeChange();
            return this;
        };

        F.prototype.onCommandSetTab = function (t) {
            this.handle.find('.' + MC + "TabOpened").removeClass(MC + "TabOpened");
            t.closest('.' + MC + "Tab").addClass(MC + 'TabOpened');
            this.videoSlider.onChanged();
            this.videoSwitch.onChanged();
            return this;
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).show().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };



        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.videoSlider.clear();
            this.videoSwitch.clear();
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {

            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            this.videoSlider ? this.videoSlider.onChanged() : false;
            this.videoSwitch ? this.videoSwitch.onChanged() : false;
            return this;
        };

        F.prototype.stackOnBackButton = function () {
            this.clear();
            return false;
        };


        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();

;/*===COMPONENT:langselect========*/;
(function () {
    var H = null, MC = 'Langselect', MD = 'f15fe88a9a81c841530d536f6d93d254', FQCN = 'langselect';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
//</editor-fold>
    function initPlugin() {        
        //<editor-fold defaultstate="collapsed" desc="Глобы и  статики">
        var EFO = window.Eve.EFO, U = EFO.U,PAR = EFO.windowController,PPT = PAR.prototype;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"main":"<div class=\"{{getCssClass}}MainWrap\">\n    <div class=\"{{getCssClass}}InnerWrap\">\n        <div class=\"{{getCssClass}}DataRow\">\n            <label for=\"a{{MD}}LangList\">Select language<\/label>\n            <select data-field=\"language\"><\/select>\n        <\/div>\n    <\/div>\n<\/div>","option":"{{#items}}<option value=\"{{token}}\">{{name}}  ({{eng_name}})<\/option>{{\/items}}"};
/*=====Templates<====*/
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        var ST = null;
        /*====>Styles=====*/
ST={"style":".EFOBackdrop.SelectorLanguageBackdrop{z-index:20}.EFOWindow.SelectorLanguageWindow{width:33em;height:15em}.EFOTitle.SelectorLanguageTitle{display:none}.EFOWindowResizer.SelectorLanguageWindowResizer{display:none}.SelectorLanguageMainWrap{box-sizing:border-box;height:100%;max-height:100%;padding:1em}.SelectorLanguageInnerWrap{box-sizing:border-box;height:100%;max-height:100%}.SelectorLanguageDataRow select{box-sizing:border-box;border-radius:0;height:3em;display:block;width:100%;margin-top:.5em;border:0;padding:0 .5em;outline:1px solid silver}span.EFOFooterButton.SelectorLanguageFooterButton.SelectorLanguageOnlyIfAllowCancel{display:none}.SelectorLanguageallowCancel span.EFOFooterButton.SelectorLanguageFooterButton.SelectorLanguageOnlyIfAllowCancel{display:inline-block}.EFOWindow.LangselectWindow{width:100%;height:100%;padding-top:0;padding:2em;background:#7f0000;box-sizing:border-box;padding-bottom:4em}.EFOTitle.LangselectTitle{display:none}.EFOFooter.LangselectFooter{background:#7f0000;border-top:1px solid white}span.EFOFooterButton.LangselectFooterButton.LangselectOnlyIfAllowCancel{display:none}span.EFOFooterButton.LangselectFooterButton,span.EFOFooterButton.LangselectFooterButton:hover{color:white;border:1px solid white}.EFOWindowResizer.LangselectWindowResizer{display:none}.LangselectMainWrap label{display:block;font-size:1.1em;color:white}.LangselectMainWrap select{display:block;border:0;border-radius:0;outline:1px solid silver;margin-top:.5em;-webkit-appearance:none;background:transparent;color:white;font-family:inherit;font-size:inherit;cursor:pointer}.LangselectMainWrap select option{color:black}.LangselectMainWrap select option::-moz-selection{color:white;background:#7f0000}.LangselectMainWrap select option::selection{color:white;background:#7f0000}.LangselectDataRow{padding:.1em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }

        U.FixCon(F);

        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable', 'Callbackable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            PPT.onInit.apply(this, Array.prototype.slice.call(arguments));
            H = this;
            //this.LEM.On('NEED_POSITE', this, this.placeAtCenter);
            return this;
        };
        F.prototype.onAfterShow = function () {
            PPT.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //this.placeAtCenter();
            return this;
        };

        F.prototype.show = function (cs) {
            this.current_selection = cs;
            this.load();
            this.handle.removeClass(MC + "allowCancel");
            this._retres = false;
            return PPT.show.apply(this, Array.prototype.slice.call(arguments));
        };


        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        F.prototype.getFooterButtons = function () {
            return [
                {'command': "cancel", 'text': "Cancel", buttonClass: MC + "OnlyIfAllowCancel"},
                {'command': "Save", 'text': "Apply"}
            ];
        };

        F.prototype.getDefaultTitle = function () {
            return "Select language";
        };
        //</editor-fold>            
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear().showLoader();
            EFO.LDriver2().getList()
                    .done(this.onLoadResponce.bindToObject(this))
                    .fail(this.onLoadFail.bindToObject(this))
                    .always(this.hideLoader.bindToObject(this));
            return this;
        };

        F.prototype.onLoadResponce = function (d) {            
            return this.setData(d);
        };
        F.prototype.onLoadFail = function (d) {
            //alert(['aa',JSON.stringify(arguments)].join(''));
            alert("cannot load langlist");

            return this.threadError("Ошибка связи с сервером");
        };

        F.prototype.setData = function (d) {
            d.d.items=d.d.list;
            this.getField('language').html(Mustache.render(EFO.TemplateManager().get([MC, 'option'].join('.')), d.d));
            return this;
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.clearCallbacks();
            return this;
        };

        F.prototype.forceZindex = function (x) {
            this.handle.css({'z-index': U.IntMoreOr(x, 0, 50) + 1});
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Комманды">

        F.prototype.onCommandSave = function () {
            if (!this._retres) {
                EFO.LDriver2().setCurrent(this.getField('language').val());
            } else {
                this.runCallback(this.getField('language').val());
                this.hide().clear();
            }
            return this;
        };

        F.prototype.onCommandCancel = function () {
            this.hide().clear();
            return this;
        };
        //</editor-fold>            
        F.prototype.setAllowCancel = function (x) {
            var b = U.anyBool(x, false);
            this.handle[b ? 'addClass' : 'removeClass'](MC + "allowCancel");
            return this;
        };

        F.prototype.setReturnResult = function (x) {
            this._retres = U.anyBool(x, false);
            return this;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, "Error while loading dependency");
            });

})();
;/*===COMPONENT:menu========*/;
(function () {
    var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null, MC = 'Menu', MD = '<$this->MD>', FQCN = 'menu';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        var PAR = EFO.Handlable, PARP = PAR.prototype;
        //<editor-fold defaultstate="collapsed" desc="Static">
        function F() {
            return F.is(H) ? H : F.is(this) ? this.init() : F.F();
        }
        F.xInheritE(PAR);

        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Main":"<div class=\"{{getCssClass}}MainMenu\">\n    <div class=\"{{getCssClass}}MenuHeaderPart\">\n        <div class=\"{{getCssClass}}MenuHeaderContent\">\n            <div class=\"{{getCssClass}}MenuHeaderLogo\">\n                <i class=\"mdi mdi-account\"><\/i>\n            <\/div>\n            <div class=\"{{getCssClass}}HeaderUserDisplay\" data-role=\"userDisplay\"><\/div>\n            <div class=\"{{getCssClass}}HeaderBrandDisplay\" data-role=\"emailDisplay\"><\/div>            \n        <\/div>\n        <div class=\"EFOWindowLoader {{getCssClass}}WindowLoader\" data-role=\"loader\"><\/div>\n    <\/div>\n    <div class=\"{{getCssClass}}MenuItemsPart\">\n        <ul class=\"{{getCssClass}}MenuList\">\n            <li id=\"enc\" data-command=\"menuitem\" data-menucommand=\"showBook\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIBook\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemEnciclopedy{{\/_TT}}<\/span><\/li>\n            <li id=\"nas\" data-command=\"menuitem\" data-menucommand=\"showPrefs\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIPrefs\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemPreferences{{\/_TT}}<\/span><\/li>\n            <li id=\"nov\" data-command=\"menuitem\" data-menucommand=\"showNews\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MINews\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemNews{{\/_TT}}<\/span><\/li>\n            <li id=\"abo\" data-command=\"menuitem\" data-menucommand=\"showAbout\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIAbout\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemAbout{{\/_TT}}<\/span><\/li>\n            <li id=\"exi\" data-command=\"menuitem\" data-menucommand=\"runQr\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIQR\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemQr{{\/_TT}}<\/span><\/li>            \n            <li id=\"exi\" data-command=\"menuitem\" data-menucommand=\"runExit\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIExit\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemExit{{\/_TT}}<\/span><\/li>            \n            \n        <\/ul>\n    <\/div>\n<\/div>","backdrop":"<div class=\"{{getCssClass}}LowUnderBackdrop\"><\/div>","brand_display":"<b>{{brand_name}}<\/b>","default":"{{=<% %>=}}\n<div class=\" <%getCssClass%>Backdrop\" id=\"EFOController{{getControllerId}}\" data-component=\"{{getCssClass}}\">     \n    <div class=\" <%getCssClass%>ComponentContent\" data-role=\"window\">        \n        <div class=\"EFOWindowContent <%getCssClass%>WindowContent\" data-role=\"windowContent\">\n            <%{getContentTemplate}%>\n        <\/div>               \n    <\/div>\n    <div class=\"<%getCssClass%>toggler\" data-command=\"toggle\" data-role=\"toggler\"><\/div>\n<\/div>\n<%={{ }}=%>","icons":"<div style=\"display:none\">\n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" >\n        <symbol id=\"MenuMIQR\" viewBox=\"0 0 512 512\">\n            <g>\n                <g>\n                    <path d=\"M189.17,50.363H96.28c-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545v-92.89C198.715,54.636,194.441,50.363,189.17,50.363z M179.625,143.252h-73.8v-73.8h73.8\n\t\t\tV143.252z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M454.327,94.288c5.271,0,9.545-4.274,9.545-9.545V59.908c0-5.271-4.274-9.545-9.545-9.545h-92.89\n\t\t\tc-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89c5.271,0,9.545-4.274,9.545-9.545v-36.875\n\t\t\tc0-5.271-4.274-9.545-9.545-9.545c-5.271,0-9.545,4.274-9.545,9.545v27.33h-73.8v-73.8h73.8v15.291\n\t\t\tC444.782,90.015,449.056,94.288,454.327,94.288z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M454.327,315.52h-92.89c-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545v-92.89C463.872,319.794,459.598,315.52,454.327,315.52z M444.782,408.41h-73.8v-73.8h73.8\n\t\t\tV408.41z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M502.455,2.228H48.143c-5.271,0-9.545,4.274-9.545,9.545v374.262c0,5.271,4.274,9.545,9.545,9.545\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545V21.318H492.91V456.54h-83.382c-5.271,0-9.545,4.274-9.545,9.545\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545h92.927c5.271,0,9.545-4.274,9.545-9.545V11.773C512,6.502,507.726,2.228,502.455,2.228z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M377.712,456.54H119.259c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h258.453\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545C387.257,460.814,382.983,456.54,377.712,456.54z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M271.485,116.032h-47.722c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h47.722\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545C281.03,120.305,276.756,116.032,271.485,116.032z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M420.378,243.926h-49.395v-47.721c0-5.271-4.274-9.545-9.545-9.545s-9.545,4.274-9.545,9.545v87.808\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545s9.545-4.274,9.545-9.545v-20.997h49.395c5.271,0,9.545-4.274,9.545-9.545\n\t\t\tC429.923,248.199,425.649,243.926,420.378,243.926z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M326.844,50.363h-103.08c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h74.446v90.484\n\t\t\tc-0.001,5.27,4.272,9.544,9.544,9.544c5.271,0,9.545-4.274,9.545-9.545V69.453h9.545c5.271,0,9.545-4.274,9.545-9.545\n\t\t\tC336.389,54.636,332.115,50.363,326.844,50.363z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M292.159,217.6c-24.393-24.394-56.827-37.828-91.326-37.828c-34.498,0-66.931,13.434-91.326,37.828\n\t\t\tc-24.394,24.393-37.828,56.827-37.828,91.326c0,34.498,13.434,66.931,37.828,91.326c2.95,2.949,6.018,5.735,9.192,8.359\n\t\t\tl-78.451,78.439c-4.836,4.835-12.704,4.836-17.542,0c-4.836-4.836-4.836-12.705,0-17.542L87.8,404.402\n\t\t\tc3.728-3.728,3.726-9.771-0.001-13.498c-3.728-3.728-9.771-3.728-13.498,0.001L9.209,456.01\n\t\t\tc-12.279,12.279-12.279,32.259,0,44.538c5.948,5.948,13.857,9.224,22.268,9.224c0.003,0,0.006,0,0.009,0\n\t\t\tc8.41-0.003,16.315-3.278,22.261-9.224l80.756-80.743c19.836,11.915,42.594,18.275,66.331,18.275\n\t\t\tc34.498,0,66.931-13.434,91.326-37.828s37.828-56.828,37.828-91.326C329.988,274.427,316.553,241.994,292.159,217.6z\n\t\t\t M278.66,386.752c-20.788,20.788-48.428,32.238-77.827,32.238s-57.038-11.449-77.827-32.238\n\t\t\tc-20.789-20.789-32.238-48.427-32.238-77.827s11.449-57.039,32.238-77.827s48.428-32.238,77.827-32.238\n\t\t\ts57.039,11.449,77.827,32.238c20.787,20.789,32.238,48.428,32.238,77.827S299.449,365.963,278.66,386.752z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M267.387,242.372c-36.697-36.697-96.409-36.698-133.107,0c-17.778,17.778-27.568,41.413-27.568,66.553\n\t\t\tc0,25.14,9.791,48.777,27.568,66.553c17.776,17.778,41.412,27.568,66.553,27.568c25.14,0,48.777-9.791,66.553-27.568\n\t\t\tC304.084,338.782,304.084,279.07,267.387,242.372z M253.888,361.98c-14.172,14.171-33.014,21.976-53.056,21.976\n\t\t\ts-38.883-7.805-53.054-21.976c-14.171-14.171-21.976-33.013-21.976-53.054s7.805-38.883,21.976-53.056\n\t\t\tc14.629-14.629,33.839-21.941,53.054-21.941c19.212,0,38.43,7.315,53.056,21.941C283.142,285.124,283.142,332.726,253.888,361.98z\n\t\t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M200.834,253.043c-5.271,0-9.545,4.274-9.545,9.545s4.274,9.545,9.545,9.545c20.287,0,36.792,16.505,36.792,36.792\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545c5.271,0,9.545-4.274,9.545-9.545C256.716,278.112,231.647,253.043,200.834,253.043z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g><\/g>\n            <g><\/g>\n            <g><\/g>\n            <g><\/g>\n        <\/symbol>    \n    <\/svg>\n\n    <?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n    <svg version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\"\n    >\n        <symbol id=\"MenuMIPrefs\" viewBox=\"0 0 54 54\">\n            <g>\n                <path d=\"M27,13c-7.72,0-14,6.28-14,14s6.28,14,14,14s14-6.28,14-14S34.72,13,27,13z M27,39c-6.617,0-12-5.383-12-12s5.383-12,12-12\n\t\ts12,5.383,12,12S33.617,39,27,39z\"\/>\n                <path d=\"M51.22,21h-2.018c-0.515-1.912-1.272-3.742-2.26-5.457l1.426-1.426c0.525-0.525,0.814-1.224,0.814-1.966\n\t\tc0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.049-2.881-1.051-3.933,0l-1.426,1.426C36.74,6.07,34.911,5.313,33,4.798\n\t\tV2.78C33,1.247,31.753,0,30.22,0H23.78C22.247,0,21,1.247,21,2.78v2.018c-1.911,0.515-3.74,1.272-5.457,2.26l-1.426-1.426\n\t\tc-1.051-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l1.426,1.426\n\t\tC6.07,17.258,5.312,19.088,4.798,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h2.018\n\t\tc0.515,1.911,1.272,3.74,2.26,5.457l-1.426,1.426c-0.525,0.525-0.814,1.224-0.814,1.966c0,0.743,0.289,1.441,0.814,1.967\n\t\tl4.553,4.553c1.05,1.051,2.882,1.052,3.933,0l1.426-1.426c1.717,0.987,3.546,1.745,5.457,2.26v2.018c0,1.533,1.247,2.78,2.78,2.78\n\t\th6.439c1.533,0,2.78-1.247,2.78-2.78v-2.018c1.911-0.515,3.74-1.272,5.457-2.26l1.426,1.426c1.052,1.052,2.882,1.05,3.933,0\n\t\tl4.553-4.553c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-1.426-1.426\n\t\tc0.987-1.717,1.745-3.546,2.26-5.457h2.018c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22\n\t\tC52,30.65,51.65,31,51.22,31h-3.592l-0.18,0.773c-0.521,2.237-1.399,4.36-2.613,6.311l-0.42,0.674l2.539,2.539\n\t\tc0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-2.539-2.539l-0.674,0.42\n\t\tc-1.95,1.214-4.073,2.093-6.311,2.613L31,47.628v3.592C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-3.592\n\t\tl-0.773-0.18c-2.237-0.521-4.36-1.399-6.311-2.613l-0.674-0.42l-2.539,2.539c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553\n\t\tc-0.305-0.305-0.305-0.8,0-1.104l2.539-2.539l-0.42-0.674c-1.214-1.95-2.093-4.073-2.613-6.311L6.372,31H2.78\n\t\tC2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h3.592l0.18-0.773c0.521-2.238,1.399-4.361,2.613-6.311l0.42-0.674\n\t\tl-2.539-2.539c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553c0.304-0.304,0.799-0.306,1.104,0l2.539,2.539l0.674-0.42\n\t\tc1.95-1.214,4.073-2.093,6.311-2.613L23,6.372V2.78C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v3.592l0.773,0.18\n\t\tc2.237,0.521,4.36,1.399,6.311,2.613l0.674,0.42l2.539-2.539c0.306-0.306,0.801-0.304,1.104,0l4.553,4.553\n\t\tc0.305,0.305,0.305,0.8,0,1.104l-2.539,2.539l0.42,0.674c1.214,1.949,2.093,4.072,2.613,6.311L47.628,23h3.592\n\t\tC51.65,23,52,23.35,52,23.78V30.22z\"\/>\n                <path d=\"M27,17c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S32.514,17,27,17z M27,35c-4.411,0-8-3.589-8-8s3.589-8,8-8\n\t\ts8,3.589,8,8S31.411,35,27,35z\"\/>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n\n   \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\">\n        <symbol id=\"MenuMIExit\" viewBox=\"0 0 512 512\" >\n            <g>\n                <g>\n                    <polygon points=\"325.502,52.833 325.502,68.377 409.816,68.377 409.816,443.623 400.633,443.623 400.633,117.138 385.089,117.138 \n\t\t\t385.089,443.623 325.502,443.623 325.502,459.167 425.361,459.167 425.361,52.833 \t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <rect x=\"86.644\" y=\"355.486\" width=\"15.544\" height=\"15.544\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <polygon points=\"86.639,54.494 86.639,337.866 102.184,337.866 102.184,66.717 295.693,19.766 295.693,492.234 102.184,445.283 \n\t\t\t102.184,389.68 86.639,389.68 86.639,457.506 311.237,512 311.237,0 \t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M255.762,254.446c-12.685,0-23.005,10.32-23.005,23.005s10.32,23.005,23.005,23.005\n\t\t\tc12.685,0.001,23.005-10.32,23.005-23.005S268.447,254.446,255.762,254.446z M255.761,284.912\n\t\t\tc-4.113,0.001-7.461-3.347-7.461-7.461s3.347-7.461,7.461-7.461c4.114,0,7.461,3.347,7.461,7.461S259.875,284.912,255.761,284.912\n\t\t\tz\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <rect x=\"385.093\" y=\"83.98\" width=\"15.544\" height=\"15.544\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" >\n        <symbol id=\"MenuMINews\" viewBox=\"0 0 470 470\" >\n            <g>\n                <path d=\"M430.809,30h-40.491c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h13.952c-2.827,4.673-4.457,10.148-4.457,15.997v354.509   c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V60.997c0-8.821,7.176-15.997,15.996-15.997c8.821,0,15.998,7.176,15.998,15.997   v354.509c0,21.777-17.717,39.494-39.494,39.494s-39.494-17.717-39.494-39.494V7.5c0-4.142-3.357-7.5-7.5-7.5H15.693   c-4.143,0-7.5,3.358-7.5,7.5v408.006C8.193,445.554,32.64,470,62.688,470h344.625c30.048,0,54.494-24.446,54.494-54.494V60.997   C461.807,43.905,447.901,30,430.809,30z M62.688,455c-21.777,0-39.494-17.717-39.494-39.494V15h329.625v400.506   c0,15.526,6.529,29.559,16.983,39.494H62.688z\"\/>\n                <path d=\"m320.318,40h-264.625c-4.143,0-7.5,3.358-7.5,7.5v75c0,4.142 3.357,7.5 7.5,7.5h264.625c4.143,0 7.5-3.358 7.5-7.5v-75c0-4.142-3.357-7.5-7.5-7.5zm-7.5,75h-249.625v-60h249.625v60z\"\/>\n                <path d=\"m320.318,145h-264.625c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h264.625c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,205h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,205h-117.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,235h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,235h-117.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,265h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m320.318,295h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m203.006,340h77.313c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-77.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5z\"\/>\n                <path d=\"m280.318,415h-77.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h77.313c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,385h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,265h-117.313c-4.143,0-7.5,3.358-7.5,7.5v150c0,4.142 3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5v-150c0-4.142-3.358-7.5-7.5-7.5zm-7.5,150h-102.313v-135h102.313v135z\"\/>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\"  >\n        <symbol id=\"MenuMIAbout\" viewBox=\"0 0 512 512\">\n            <g>\n                <g>\n                    <path d=\"M437.019,74.982C388.667,26.628,324.381,0,256,0S123.333,26.628,74.982,74.982C26.628,123.333,0,187.619,0,256\n\t\t\ts26.628,132.667,74.982,181.019C123.333,485.372,187.619,512,256,512s132.667-26.628,181.019-74.981\n\t\t\tC485.372,388.667,512,324.381,512,256S485.372,123.333,437.019,74.982z M256,491.602c-129.911,0-235.602-105.69-235.602-235.602\n\t\t\tS126.089,20.398,256,20.398S491.602,126.089,491.602,256S385.911,491.602,256,491.602z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M462.131,298.131c-5.464-1.392-11.012,1.907-12.4,7.367c-5.689,22.34-15.158,43.377-28.142,62.528\n\t\t\tc-3.161,4.663-1.943,11.004,2.719,14.166c1.753,1.188,3.744,1.758,5.715,1.758c3.268,0,6.48-1.568,8.451-4.478\n\t\t\tc14.313-21.11,24.751-44.306,31.024-68.94C470.888,305.073,467.591,299.52,462.131,298.131z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M466.104,245.801c-5.632,0-10.199,4.567-10.199,10.199c0,2.915-0.063,5.855-0.188,8.739\n\t\t\tc-0.244,5.628,4.121,10.387,9.749,10.63c0.15,0.007,0.299,0.01,0.448,0.01c5.43,0,9.945-4.282,10.182-9.759\n\t\t\tc0.138-3.176,0.207-6.412,0.207-9.62C476.303,250.368,471.736,245.801,466.104,245.801z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M256,172.877c-19.683,0-35.697,16.014-35.697,35.697V386.04c0,19.683,16.014,35.697,35.697,35.697\n\t\t\tc19.683,0,35.697-16.014,35.697-35.697V208.574C291.697,188.89,275.683,172.877,256,172.877z M271.299,386.04\n\t\t\tc0,8.436-6.863,15.299-15.299,15.299c-8.436,0-15.299-6.863-15.299-15.299V208.574c0-8.436,6.863-15.299,15.299-15.299\n\t\t\tc8.436,0,15.299,6.863,15.299,15.299V386.04z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M281.235,100.707c-6.652-6.638-15.851-10.444-25.235-10.444c-9.385,0-18.584,3.806-25.246,10.453\n\t\t\tc-6.642,6.644-10.451,15.844-10.451,25.244c0,9.384,3.806,18.583,10.46,25.251c6.652,6.639,15.851,10.446,25.237,10.446\n\t\t\tc9.385,0,18.584-3.807,25.251-10.461c6.639-6.652,10.446-15.851,10.446-25.236C291.697,116.56,287.888,107.359,281.235,100.707z\n\t\t\t M266.827,136.773c-2.858,2.85-6.804,4.486-10.827,4.486c-4.026,0-7.972-1.636-10.813-4.47c-2.85-2.858-4.486-6.805-4.486-10.828\n\t\t\tc0-4.032,1.633-7.976,4.469-10.813c2.858-2.85,6.805-4.486,10.83-4.486c4.024,0,7.971,1.636,10.819,4.478\n\t\t\tc2.847,2.847,4.479,6.79,4.479,10.82C271.299,129.985,269.663,133.931,266.827,136.773z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\">\n        <symbol id=\"MenuMIBook\" viewBox=\"0 0 60 60\">\n            <path d=\"M13,0c-1.547,0-3.033,0.662-4.078,1.817C7.895,2.954,7.389,4.476,7.525,6H7.5v48.958C7.5,57.738,9.762,60,12.542,60H52.5V11\n\tV9V0H13z M9.5,54.958V9.998c0.836,0.629,1.875,1.002,3,1.002v46.996C10.842,57.973,9.5,56.621,9.5,54.958z M50.5,58h-36V11h3v25.201\n\tc0,0.682,0.441,1.262,1.099,1.444c0.137,0.037,0.273,0.056,0.408,0.056c0.015,0,0.029-0.005,0.044-0.006\n\tc0.045-0.001,0.088-0.012,0.133-0.017c0.103-0.012,0.202-0.033,0.299-0.066c0.048-0.016,0.093-0.035,0.138-0.056\n\tc0.094-0.043,0.18-0.097,0.263-0.159c0.036-0.027,0.073-0.05,0.106-0.08c0.111-0.099,0.212-0.211,0.292-0.346l4.217-7.028\n\tl4.217,7.029c0.327,0.545,0.939,0.801,1.55,0.687c0.045-0.008,0.089-0.002,0.134-0.014c0.657-0.183,1.099-0.763,1.099-1.444V11h19\n\tV58z M29.64,9.483l-0.003,0.007L29.5,9.764v0.042l-0.1,0.23l0.1,0.152v0.112V34.39l-5-8.333l-5,8.333V10.236L21.118,7h9.764\n\tL29.64,9.483z M32.118,9l2-4H19.882l-2,4h-4.67c-1.894,0-3.516-1.379-3.693-3.14c-0.101-0.998,0.214-1.957,0.887-2.701\n\tC11.071,2.422,12.017,2,13,2h37.5v1h-5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5v1h-4c-0.553,0-1,0.447-1,1s0.447,1,1,1h4v1H32.118z\"\/>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n\n\n<\/div>\n\n\n\n\n","point_display":"{{point_address}}","user_display":"<b>{{user_name}}<\/b> ({{login}})"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".MenuBackdrop{position:fixed;top:0;left:0;z-index:10;box-sizing:border-box;padding-right:10px;width:0;max-width:80%;min-width:10px;height:100%;max-height:100%;overflow:hidden;transition:all .3s}.MenuBackdrop,.MenuBackdrop div,.MenuBackdrop ul,.MenuBackdrop span,.MenuBackdrop li,.MenuBackdrop svg,.MenuBackdrop img{user-select:none;-o-user-select:none;-ms-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}.MenuBackdrop.MenuOpened{width:20em}.MenuBackdrop.notransition{transition:none}.MenuComponentContent{position:relative;width:100%;max-width:19em;height:100%;max-height:100%;box-sizing:border-box}.MenuBackdrop.MenuOpened .MenuComponentContent{border-right:1px solid silver}.EFOWindowContent.MenuWindowContent{position:absolute;right:0;top:0;width:100%;max-width:100%;overflow:hidden;height:100%;max-height:100%;box-sizing:border-box;min-width:18.5em}.MenuMainMenu{height:100%;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}.MenuMenuHeaderPart{background:orange;position:relative}.MenuMenuHeaderContent{padding-top:.5em;padding-bottom:.5em;padding-left:1.6em;color:white;padding-right:1em;box-sizing:border-box}.MenuMenuHeaderLogo{height:110px}.MenuHeaderUserDisplay{height:1.3em;white-space:nowrap;line-height:1.3em}.MenuHeaderPointDisplay{line-height:1.3em;white-space:nowrap;overflow:hidden;height:1.3em}.EFOWindowLoader.MenuWindowLoader{font-size:.4em}.MenuMenuItemsPart{overflow:hidden;list-style:none}ul.MenuMenuList{margin:0;list-style:none;padding:0;padding-left:1.6em;box-sizing:border-box}ul.MenuMenuList .MenuMenuIcon{display:inline-block;overflow:hidden;width:1.5em;height:1.5em}ul.MenuMenuList .MenuMenuIcon svg{width:100%;height:100%;fill:#444343}ul.MenuMenuList li{white-space:nowrap;padding-left:3em;position:relative;display:block;width:100%;box-sizing:border-box;position:relative;overflow:hidden;line-height:2.5em;transition:all .3s;cursor:pointer;box-sizing:border-box}span.MenuMenuIcon{position:absolute;left:.25em;top:50%;margin-top:-.75em}.MenuLowUnderBackdrop{z-index:9;top:0;left:0;position:fixed;height:100%;max-height:100%;box-sizing:border-box;width:100%;background:rgba(0,0,0,.3);transition:all .3s;max-width:0}.MenuLowUnderBackdrop.MenuOpened{max-width:5000px}.MenuMainMenu{background:white}ul.MenuMenuList li:hover{background:whitesmoke}ul.MenuMenuList li:hover .MenuMenuIcon svg{width:100%;height:100%;fill:#442020}li.MenuShowOffline.OM-Online{display:none}li.MenuShowOnline.OM-Offline{display:none}.MenuMenuHeaderLogo{max-width:100px;max-height:100px;overflow:hidden;border-radius:50%;width:5.5em;height:5.5em}.MenuMenuHeaderLogo img{width:100%;height:100%;max-width:100%}.MenuHeaderUserDisplay{margin-top:.5em;line-height:1.5em;max-width:100%;overflow:hidden;height:1.5em;white-space:nowrap;font-size:.9em}.MenuHeaderBrandDisplay{height:1.5em;line-height:1.5em;max-height:1.5em;white-space:nowrap;overflow:hidden;font-size:.9em}.MenuHeaderPointDisplay{line-height:1.3em;white-space:nowrap;overflow:hidden;height:1.3em;font-size:.9em}.MenuBackdrop .MenuToggler{position:absolute;width:1.5em;top:0;right:0;height:3em;cursor:pointer}body .MenuBackdrop{min-width:1.5em;padding-right:1.5em}.Menutoggler{background:transparent;position:absolute;top:0;right:0;width:1.5em;height:3em;cursor:pointer}.MenuMenuHeaderPart{background:#760000 !important}ul.MenuMenuList li{padding-left:0;margin-top:.8em;margin-bottom:.5em}ul.MenuMenuList{padding-top:1em}ul.MenuMenuList li img{margin-right:1em;vertical-align:middle}.MenuMenuHeaderLogo i{font-size:3em;background:white;color:#760000;line-height:1.2em}.MenuMenuHeaderLogo{text-align:center;line-height:4em;background:white;width:4em;height:4em;margin-top:1em}ul.MenuMenuList li{position:relative;box-sizing:border-box;padding-left:3em}ul.MenuMenuList li .MenuImage{position:absolute;top:.25em;left:0;height:2em;width:2em}ul.MenuMenuList li .MenuImage svg{width:100%;height:100%;fill:#760000}.MenuImage{box-sizing:border-box;padding:.16em}.MenuBackdrop.MenuOpened{z-index:100}.MenuLowUnderBackdrop.MenuOpened{z-index:99}.Menutoggler{display:none}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable'];
        U.initMixines(F);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">        
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            EFO.Events.GEM().On('USERINFO_UPDT', this, this.actualize);
            this.actualize();
            return this.initEvents();
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        F.prototype.show = function () {
            return PARP.show.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.onBeforeShow = function () {
            //this.actualize();//считать данные по точке и текущему состоянию
            return PARP.onBeforeShow.apply(this, Array.prototype.slice.call(arguments));
        };

        /**
         * @override
         * @returns {string}
         */
        F.prototype.getWrapperTemplate = function () {
            return EFO.TemplateManager().get('default', MC);
        };

        F.prototype.getContainer = function () {
            return jQuery('body');
        };
        //</editor-fold>                

        //<editor-fold defaultstate="collapsed" desc="Комманды">
        /**
         * меню обрабатывает только команду menuitem -и передает ее приложению
         * @param {type} t
         * @param {type} e
         * @returns {_MenuL#1.initPlugin.F.prototype@call;hide}
         */
        F.prototype.onCommandMenuitem = function (t, e) {
            var cmd = U.NEString(U.UCFirst(U.trim(t.data('menucommand'))));
            if (cmd) {
                var fn = ["onCommand", cmd].join('');
                if (U.isCallable(this[fn])) {
                    this[fn](t, e);
                }
            }
            return this.closeMenu();
        };

        F.prototype.onCommandShowBook = function () {
            EFO.Com().com('newBook').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowPrefs = function () {
            EFO.Com().com('preferences').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowNews = function () {
            EFO.Com().com('news').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowAbout = function () {
            EFO.Com().com('about').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandRunExit = function () {
            localStorage.setItem("session","");
            localStorage.setItem("uiToken","y");
            localStorage.setItem("uitoken","y");
            localStorage.removeItem('cmark');
            window.location.reload(true);
            return this;
        };
        F.prototype.onCommandRunQr = function () {
            EFO.Com().com('qrreader').done(function (x) {
                x().install();
            });
            return this;
        };

        F.prototype.onCommandToggle = function () {
            this.toggle();
            return this;
        };

        //</editor-fold>


        F.prototype.initEvents = function () {
            this.handle.on('touchstart', this.touchStart.bindToObject(this));
            this.getRole('window').on('touchstart', function (e) {
                e.stopPropagation();
            });
            this.getRole('toggler').on('touchstart', function (e) {
                e.stopPropagation();
            });
            return this;
        };

        F.prototype.resetTouch = function () {
            this.handle.on('touchmove', this.touchMove.bindToObject(this));
            this.handle.on('touchend', this.touchEnd.bindToObject(this));
            this.handle.removeClass('notransition');
            this._touch = null;
            return this;
        };
        F.prototype.touchStart = function (e) {
            this.handle.addClass('notransition');
            this._touch ? this.resetTouch() : false;
            this._touch = e.originalEvent.targetTouches.item(0);
            this._startX = this._touch.clientX;
            this.handle.on('touchmove', this.touchMove.bindToObject(this));
            this.handle.on('touchend', this.touchEnd.bindToObject(this));
            return this;
        };

        F.prototype.touchMove = function (e) {
            var activeTouches = Array.prototype.slice.call(e.originalEvent.targetTouches);
            for (var i = 0; i < activeTouches.length; i++) {
                this._touch && (activeTouches[i].identifier === this._touch.identifier) ? this.processMove(activeTouches[i]) : false;
            }
            return this;
        };
        F.prototype.processMove = function (t) {
            this.handle.css({width: t.clientX + 'px'});
            return this;
        };
        F.prototype.processTouchEnd = function (t) {
            this.handle.removeClass('notransition');
            var delta = t.clientX - this._touch.clientX;
            if (delta === 0) {
                delta = t.clientX - this._startX;
            }
            var s = parseFloat(this.getRole('windowContent').outerWidth()) / 5;
            //window.Eve.bootstrap().getConfig()==='ios'?s=20:false;
            Math.abs(delta) > s ? false : delta = 0;
            if (delta !== 0) {
                delta < 0 ? this.closeMenu() : this.openMenu();
            }
            this.handle.css({width: ''});
            this.resetTouch();
        };

        F.prototype.toggle = function () {
            this.handle.hasClass('MenuOpened') ? this.closeMenu() : this.openMenu();
            return this;
        };


        F.prototype.openMenu = function () {         
            this.handle.addClass('MenuOpened');
            this.backdrop().addClass('MenuOpened');
            E.appStack().setMenuInt(this.onBackButton.bindToObject(this));
            return this;
        };
        F.prototype.closeMenu = function () {
            this.handle.removeClass('MenuOpened');
            this.backdrop().removeClass('MenuOpened');
            //E.Config().removeStack(this);
            E.appStack().setMenuInt(null);
            return this;
        };

        F.prototype.backdrop = function () {
            if (!this._backdrop) {
                this._backdrop = jQuery(Mustache.render(EFO.TemplateManager().get('backdrop', MC), this));
                this._backdrop.appendTo('body');
                this._backdrop.on('click', this.closeMenu.bindToObject(this));
            }
            return this._backdrop;
        };

        F.prototype.touchEnd = function (e) {
            var activeTouches = Array.prototype.slice.call(e.originalEvent.changedTouches);
            for (var i = 0; i < activeTouches.length; i++) {
                this._touch && (activeTouches[i].identifier === this._touch.identifier) ? this.processTouchEnd(activeTouches[i]) : false;
            }
            return this;
        };

        F.prototype.actualize = function () {
            var c = E.Config();
            if (c) {
                this.getRole('userDisplay').html(c.userInfo.name);
                this.getRole('emailDisplay').html(c.userInfo.email);
            }
            if(/^file/.test(window.location.href)){
                this.handle.find('[data-menucommand="runQr"]').hide();
            }
            return this;
        };

        F.prototype.install = function (co) {
            return this.show();
        };
        
        F.prototype.onBackButton = function(){
            return this.closeMenu();
        };

        


        F.prototype.onRequiredComponentFail = function (x) {
            U.TError(U.isError(x) ? x.message : U.NEString(x) ? x : "ComponentError");
            return this;
        };
        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });


})();
;/*===COMPONENT:navigator========*/;
(function () {
    var H = null, MC = 'Navigator', MD = 'c9f7198c57735fa7a7a8ac2cc18dd542', FQCN = 'navigator';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Empty":"<div class=\"{{getCssClass}}Empty\">{{#_TT}}{{getCssClass}}EmptyChapterMessage{{\/_TT}}<\/div>\n<div class=\"{{getCssClass}}EmptyActions\">\n    <div class=\"{{getCssClass}}EmptyActionButton\" data-command=\"return\">{{#_TT}}{{getCssClass}}ReturnButtonTitle{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}EmptyActionButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}ReloadButtonTitle{{\/_TT}}<\/div>\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"{{getCssClass}}ItemRow\" data-command=\"openExcersize\" data-id=\"{{id}}\">\n    <div class=\"{{getCssClass}}ItemRowImage\">\n        <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>    \n    <\/div>\n    <div class=\"{{getCssClass}}ChapterName\"><span class=\"{{getCssClass}}NameInner\">{{name}}<\/span><\/div>    \n<\/div>\n","icons":"","list":"\n<div class=\"container\">\n    <div class=\"{{getCssClass}}Header\" data-role=\"chptitle\">{{{data.chapter.name}}}<\/div>    \n    <div class=\"{{getCssClass}}Intro\" data-role=\"intro\">{{{data.chapter.info}}}<\/div>    \n    {{#hasSubChapters}}\n    <div class=\"row\">\n        {{#data.subchapters}}\n        {{>subchapter}}\n        {{\/data.subchapters}}\n    <\/div>\n    {{\/hasSubChapters}}\n    <div class=\"row\">\n        {{#data.excersizes}}\n        {{>excersize}}\n        {{\/data.excersizes}}       \n    <\/div>\n    {{^data.subchapters}}\n    {{^data.excersizes}}\n    {{>Empty}}\n    {{\/data.excersizes}}\n    {{\/data.subchapters}}\n\n\n<\/div>  \n","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper\" data-role=\"content\"><\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"{{getCssClass}}ItemRow\" data-command=\"openNavigator\" data-id=\"{{id}}\" data-filter=\"{{groupmode}}\">\n    <div class=\"{{getCssClass}}ItemRowImage\">\n        <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\" \/>    \n    <\/div>\n    <div class=\"{{getCssClass}}ChapterName\"><span class=\"{{getCssClass}}NameInner\">{{name}}<\/span><\/div>    \n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NavigatorIntro p{margin:0}.NavigatorEmpty{text-align:center;color:white;background:crimson;line-height:2.5em}.NavigatorWrapepr{box-sizing:border-box;padding:0 .5em;height:100%;max-height:100%;overflow:hidden}.NavigatorInnerWrapper{box-sizing:border-box;padding:0;margin:0;height:100%;max-height:100%;overflow:auto}.NavigatorInnerWrapper>.container{margin:0;width:100%}.NavigatorInnerWrapper .row{margin:0}.NavigatorEmptyActions{overflow:hidden;margin-top:2em}.NavigatorEmptyActionButton{float:left;width:48%;margin:0 1%;box-sizing:border-box;padding:0 .1em;overflow:hidden;border:1px solid #760000;line-height:2.5em;cursor:pointer;color:#760000;transition:all .3s;text-align:center}.NavigatorEmptyActionButton:hover{color:white;background:#760000}.EFOWindowContent.NavigatorWindowContent{user-select:none}.NavigatorItemRow{overflow:hidden}.NavigatorItemRowImage{width:5em;border-radius:50%;box-sizing:border-box;overflow:hidden;border:3px solid silver;line-height:0}.NavigatorItemRowImage img{width:100%;vertical-align:middle}.NavigatorItemRow{overflow:hidden;vertical-align:middle;border-bottom:1px solid whitesmoke;padding:.3em 0}.NavigatorItemRowImage{float:left;vertical-align:middle}.NavigatorChapterName{box-sizing:border-box;margin-left:5em;padding:.1em 1em;vertical-align:middle;height:5em}.NavigatorChapterName:before{content:' ';display:inline-block;width:0;height:5em;vertical-align:middle}span.NavigatorNameInner{display:inline-block;max-height:4.5em;max-width:100%;overflow:hidden;box-sizing:border-box;white-space:normal;vertical-align:middle}.NavigatorItemRow{overflow:hidden;vertical-align:middle;border-bottom:1px solid #ded8d8;padding:.3em 0;cursor:pointer}.NavigatorItemRowImage{height:5em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.hasSubChapters = this._hasSubChapters.bindToObject(this);
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                d.setBackMode(true);
                this.data ? d.setTitle(this.data.chapter.name) : false;
            });
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        F.prototype.returnStack = []; //стек обратных переходов
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        //<editor-fold defaultstate="collapsed" desc="main and mainwrapeer requests">
        F.prototype.load = function (x) {
            this.clear();
            return this.loadPush(x);
        };

        F.prototype.loadPush = function (id) {
            if (this.data) {
                this.data.st = this.getRole('content').scrollTop();
                this.returnStack.push(this.data);
                this.data = null;
            }
            this.showLoader();
            this.aload = id;
            this.getRequest(id)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);
            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapter/' + x + '_' + E.Config().getLang() + '.json'));
        };
        //</editor-fold>

        F.prototype.onMainResponce = function (d) {
            this.data = d.d.chapterinfo;
            this.data.chapter.chapter_id = this.data.chapter.id;
            return this.setDataInternal();
        };

        F.prototype.setDataInternal = function () {
            var tp = this.prepareTemplates();
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            if (this.data.st) {
                this.getRole('content').scrollTop(this.data.st);
            } else {
                this.getRole('content').scrollTop(0);
            }
            return this;
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load().install().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC),
                'excersize': EFO.TemplateManager().get('excersize', MC),
                'subchapter': EFO.TemplateManager().get('subchapter', MC),
                'Empty': EFO.TemplateManager().get('Empty', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.returnStack = [];
            this.data = null;
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };



        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.lst = this.getRole('content').scrollTop();
            this.hide();            
            return this;
        };

        F.prototype.onTopStack = function () {            
            this.show();            
            this.lst?this.getRole('content').scrollTop(this.lst):false;
            return this;
        };

        F.prototype.displayFilteredContent = function (x) {
            this.showLoader();
            EFO.Com().com('FilteredView')
                    .done(this, function (c) {
                        c().load(x).install();
                    }).fail(this, this.onRequiredComponentFail)
                    .always(this, this.hideLoader);
            return this;

        };

        F.prototype.onCommandOpenChapterSelf = function (t) {
            if (U.NEString(t.data('filter'))) {
                return this.displayFilteredContent(t.data('nid'));
            }
            var chapterId = t.data('nid');
            this.returnStack.push(this.data.chapter_id);
            this.load(chapterId);

            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).install().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype._hasSubChapters = function () {
            return U.isArray(this.data.subchapters) && this.data.subchapters.length ? true : false;
        };
        

        F.prototype.onCommandReturn = function () {
            window.Eve.appStack().onBackButton();
            return this;
        };

        F.prototype.onCommandOpenNavigator = function (t) {
            var id = U.IntMoreOr(t.data('id'), 0, null);
            var filter = U.NEString(t.data('filter'), null);
            if (id) {
                if (filter) {
                    return this.displayFilteredContent(id);
                } else {
                    this.loadPush(id);
                }
            }
            return this;
        };

        F.prototype.onCommandOpenExcersize = function (t) {
            var id = U.IntMoreOr(t.data('id'), 0, null);
            if (id) {
                EFO.Com().com('excersizeView')
                        .done(function (x) {
                            x().load(id).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.stackOnBackButton = function () {            
            if (!this.returnStack.length) {
                return false;
            }
            this.cm_popStack();
            return true;
        };

        F.prototype.cm_popStack = function () {
            this.data = this.returnStack.pop();
            this.setDataInternal();
            return this;
        };


        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:newBook========*/;
(function () {
    var H = null, MC = 'NewBook', MD = '8146a97b04f6bb1f40c3b234883fbe64', FQCN = 'newBook';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"cchapter":"{{#childs}}\n{{#published}}\n{{registerSection}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapter\">\n    <div class=\"card\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>\n        <div class=\"price_card\">\n            {{{absolutePrice}}}\n        <\/div>\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/childs}}\n","cmain":"{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}Section container\">\n    <h2>{{name}}<\/h2>\n    <div class=\"{{getCssClass}}SectionContentV2 row\">\n        {{registerSection}}\n        {{>lessons}}\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n{{updateFullPrice}}\n","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>\n    <div class=\"{{getCssClass}}ByAllButtonW\">\n        <div class=\"{{getCssClass}}ByAllAccess\" data-command=\"byAll\">{{#_TT}}{{getCssClass}}ByAllAccess{{\/_TT}} <span data-role=\"fullPrice\"><\/span><\/div>\n    <\/div>\n<\/div>","mainr":"<div class=\"{{getCssClass}}Items\" data-role=\"support\">\n{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}BookSection\" data-command=\"openNavigator\" data-root=\"{{id}}\" title=\"{{name}}\">\n    <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">    \n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n<div class=\"{{getCssClass}}Center\"><img src=\"img\/center.png\" \/><\/div>\n<\/div>\n{{updateFullPrice}}\n","oklable":"<span class=\"BookBoughtLabel\">\n    <svg>\n    <use xlink:href=\"#BookLabelBoughtItem\"\/>\n    <\/svg>\n<\/span>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NewBookWrapper{position:relative;box-sizing:border-box;height:100%;max-height:100%;padding:0}.NewBookOuter{box-sizing:border-box;width:100%;height:100%;padding:2em .5em}.NewBookBookSection{position:absolute;border:4px solid silver;border-radius:50%;box-sizing:border-box;overflow:hidden;transform:translate(-50%,-50%)}.NewBookBookSection img{width:100%}.NewBookOuter{background:#760000}.NewBookByAllButtonW{display:none}.NewBookCenter{position:absolute;left:50%;transform:translate(-50%,-50%);border-radius:50%;overflow:hidden}.NewBookCenter img{width:100%;max-width:100%}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            var self = this;
            this.registerSection = function () {
                return self._registerSection(this);
            };
            jQuery(window).on('resize', this.positeItems.bindToObject(this));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.loaded ? false : this.load();
            this.handle[U.anyBool(E.Config().userInfo.ra, false) ? 'removeClass' : 'addClass'](MC + 'allowByAll');
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(false).setTitle(this._T(MC + "Encilopedy"));
            });
            this.positeItems();
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear();
            this.showLoader();

            this.getRequest()
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function () {
            return EFO.Request('get', E.Config().mkurl('/cache/Book/Tree_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.sections = {};
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            this.positeItems();
            this.loaded = true;
            return this;
        };

        F.prototype.positeItems = function () {
           // debugger;
            var w = Math.min(this.getRole('content').innerWidth(), this.getRole('content').innerHeight());
            // внешний радиус
            var R = w / 2;
            //this.handle.find('.NewBookItems').css({width: w + "px", height: w + "px", "box-sizing": "border-box", border: "1px solid black", "border-radius": "50%"});
            var items = this.getRole('content').find('.' + MC + 'BookSection');
            if (!items.length) {
                return this;
            }
            var grad_step = 360 / items.length; //3-120,5- 72. 6 - 60 etc
            var grad_step_size = 360 / (0+items.length);
            var radK = Math.PI / 180;
            var osn = 2 * R * Math.sin(grad_step_size * radK / 2);
            var RI = osn / 2 * Math.sqrt((2 * R - osn) / (2 * R + osn));
            var iw = RI * 2;
            var RV = R - RI; //радиусвектор                        
            var zp = {x: this.getRole('content').innerWidth() / 2, y: this.getRole('content').innerHeight() / 2};
            zp.y = Math.min(zp.x, zp.y);
            for (var i = 0; i < items.length; i++) {
                var it = jQuery(items.get(i));
                var gsdr = (-90 + (grad_step * i)) * radK;
                var x = RV * Math.cos(gsdr);
                var y = RV * Math.sin(gsdr);
                it.css({width: iw + "px", height: iw + "px",
                    left: zp.x + x + "px", top: zp.y + y + "px"
                });
            }
            this.handle.find('.'+MC+"Center").css({
                 left:zp.x+"px",top:zp.y+"px",
                 width:iw*.8+"px",height:iw*.8+"px"
            });
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.absolutePrice = function () {
            return H.getAbsolutePrice(this);
        };

        F.prototype.getAbsolutePrice = function (section) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return this.getBoughtMark();
            }
            var ptr = [];
            ptr.push(section.id);
            var n = section.parent;
            while (n) {
                var key = "N" + n;
                if (key in this.sections) {
                    ptr.push(n);
                    n = this.sections[key].parent;
                } else {
                    n = null;
                }
            }
            var price = null;
            for (var i = 0; i < ptr.length; i++) {
                if (this.hasAccess(ptr[i])) {
                    return this.getBoughtMark();
                }
                if (price === null && U.IntMoreOr(this.sections['N' + ptr[i]].cost, 0, 0)) {
                    price = this.sections['N' + ptr[i]].cost;
                }
            }

            return price ? [parseInt(price / 100), ' ', this._T(MC + "ValuteLabel")].join('') : this.getFreeMark();
        };

        F.prototype.hasAccess = function (x) {
            var A = U.safeArray(E.Config().userInfo.permissions);
            for (var i = 0; i < A.length; i++) {
                if (A[i] == x) {
                    return true;
                }
            }
            return false;
        };

        F.prototype.getFreeMark = function () {
            return this._T(MC + "FreeMark");
        };
        F.prototype.getBoughtMark = function () {
            return EFO.TemplateManager().get('oklable', MC);
        };



        F.prototype._registerSection = function (sec) {
            this.sections ? false : this.sections = {};
            this.sections[sec.key] = sec;
            return '';
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('mainr', MC)
                        //,'lessons': EFO.TemplateManager().get('rchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandSetMode = function (x) {
            this.setMode(x.data('mode'));
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="команды сохранения">
        F.prototype.onCommandApply = function () {
            this.save(false);
            return this;
        };
        F.prototype.onCommandSave = function () {
            this.save(false);
            return this;
        };


        F.prototype.onCommandDoRegister = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterRegister());
            EFO.Filter.Filter().throwValuesErrors(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            debugger;
        };

        F.prototype.onSubmitError = function () {
            debugger;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


        //  F.prototype.install = function () {

        //      return this.show();
        //   };
        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };


        F.prototype.updateFullPrice = function () {
            H.setFullPrice();
        };

        F.prototype.setFullPrice = function () {
            var i = 0;
            for (var k in this.sections) {
                if (this.sections.hasOwnProperty(k) && U.isObject(this.sections[k])) {
                    if (this.sections[k].parent === null) {
                        i += U.IntMoreOr(this.sections[k].cost, 0, 0);
                    }
                }
            }
            this.getRole('fullPrice').html(['(', U.IntMoreOr(i / 100, 0, 0), ' ', this._T(MC + 'ValuetFull'), ')'].join(''));
        };

        F.prototype.hasAccessDeep = function (x) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return true;
            }
            var ca = [];
            var s = this.sections["N" + x];
            while (s) {
                if (this.hasAccess(s.id)) {
                    return true;
                }
                ca.push(U.IntMoreOr(s.cost, 0, 0));
                s = (s.parent) ? this.sections["N" + s.parent] : null;
            }
            var cx = Math.max.apply(Math, ca);
            return cx > 0 ? false : true;
        };

        F.prototype.onCommandOpenNavigator = function (t) {
            var id = U.IntMoreOr(t.data('root'), 0, null);
            if (id) {
                if (this.hasAccessDeep(id)) {
                    EFO.Com().com('navigator')
                            .done(function (x) {
                                x().load(id).install();
                            })
                            .fail(this, this.onRequiredComponentFail);
                } else {
                    EFO.Com().com('paymentView')
                            .done(function (x) {
                                x().load().install().setCallback(this, this.load);
                            })
                            .fail(this, this.onRequiredComponentFail);
                }
            }
            return this;
        };

        F.prototype.onCommandOpenChapter = function (t) {
            var chapterId = t.data('nid');

            if (this.hasAccessDeep(chapterId)) {
                EFO.Com().com('chapterView')
                        .done(function (x) {
                            x().load(chapterId).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            } else {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(chapterId).install().setCallback(this, this.load);
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load();
        };



        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:news========*/;
(function () {
    var H = null, MC = 'News', MD = '508c75c8507a2ae5223dfd2faeb98122', FQCN = 'news';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"content":"<div id=\"{{getCssClass}}NewsWrapper\" class=\"{{getCssClass}}Block\">\n    {{>items}}\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"\n","item":"{{#data.news}}\n<div class=\"{{getCssClass}}item\">\n    <h2>{{created}}<\/h2>\n    <h4>{{title}}<\/h4>\n    <div class=\"{{getCssClass}}Info\">{{{info}}}<\/div>\n<\/div>\n{{\/data.news}}","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>    \n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NewsOuter{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.NewsWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:auto;padding-right:.5em}.Newsitem>h4{font-size:1.4em;margin-top:0;margin-bottom:0}.NewsInfo p{margin-top:.3em;margin-bottom:.2em}.Newsitem{margin-bottom:1.8em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable','Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));            
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();            
            //E.Config().pushComponent(this);
             EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this._T(MC+"News"));
            });
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            x===0?this.getRole('content').html(''):false;            
            this.showLoader();
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            x = U.IntMoreOr(x,0,0);
            return EFO.Request('get', E.Config().mkurl('/cache/News/'+x+'_'+E.Config().getLang()+'.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.offset=d.d.page;
            this.data.length?false:this.disableLoad=true;
            this.offset>0
            ?this.handle.find('#'+MC+'NewsWrapper').append(Mustache.render(tp.items, this, tp))
            :this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('content', MC),
                'items': EFO.TemplateManager().get('item', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


       F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        
        F.prototype.onCommandReload = function () {
            return this.load(0);
        };
        
        
   

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:preferences========*/;
(function () {
    var H = null, MC = 'Preferences', MD = '1ce027fe3518cc64ef3570b50a9a7c10', FQCN = 'preferences';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"filters":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<root>\n    <property in=\"email\" filters=\"Strip,Trim,NEString,EmailMatch\" \/>\n    <property in=\"name\" filters=\"Strip,Trim,NEString\" \/>\n    <property in=\"spam\" filters=\"Boolean,DefaultTrue\" \/>\n    <property in=\"password\" filters=\"Trim,NEString,DefaultNull\"\/>    \n<\/root>\n","main":"<div class=\"{{getCssClass}}Wrapper\">\n    <div id=\"{{getCssClass}}nas_open\" class=\"{{getCssClass}}close_block\">\n        <div class=\"form_nas\">\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_lang\">{{#_TT}}{{getCssClass}}LangLabel{{\/_TT}}<\/label>\n                <select id=\"{{getCssClass}}nas_lang\" data-field=\"lang\"><\/select>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_user\">{{#_TT}}{{getCssClass}}NameLabel{{\/_TT}}<\/label>\n                <input type=\"text\" placeholder=\"{{#_TT}}{{getCssClass}}NamePlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_user\" data-field=\"name\" \/>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_uemail\">{{#_TT}}{{getCssClass}}EmailLabel{{\/_TT}}<\/label>\n                <input type=\"email\" data-field=\"email\" placeholder=\"{{#_TT}}{{getCssClass}}EmailPlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_email\" \/>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_pass\">{{#_TT}}{{getCssClass}}PasswordLubel{{\/_TT}}<\/label>\n                <input data-field=\"password\" type=\"password\" placeholder=\"{{#_TT}}{{getCssClass}}PasswordPlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_pass\" \/>\n            <\/div>\n            <div class=\"kilob\">\n                {{#_TT}}{{getCssClass}}PasswordHint{{\/_TT}}                    \n            <\/div>\n            <div class=\"kiloa\">\n                <input type=\"checkbox\" data-field=\"spam\" data-fielddefault=\"1\" id=\"{{getCssClass}}Spam\" \/>\n                <label for=\"{{getCssClass}}Spam\">{{#_TT}}{{getCssClass}}SpamLabel{{\/_TT}}<\/label>\n            <\/div>\n        <\/div>\n        <div class=\"{{getCssClass}}footer\">\n            <div class=\"pay_btn btn\" id=\"{{getCssClass}}Save\" data-command=\"save\">{{#_TT}}{{getCssClass}}SaveButton{{\/_TT}}<\/div>\n        <\/div>\n    <\/div>\n<\/div>","option":"{{#lang}}\n<option value=\"{{token}}\">{{name}} ({{eng_name}})<\/option>\n{{\/lang}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".PreferencesWrapper{box-sizing:border-box;padding:.5em;padding-right:0;padding-bottom:4em;height:100%;max-height:100%;overflow:hidden;position:relative}div#Preferencesnas_open{box-sizing:border-box;height:100%;max-height:100%;padding-right:.5em;overflow:auto}.PreferencesWrapper select{display:block;margin:0;box-sizing:border-box;border:0;-webkit-appearance:none;width:100%;outline:1px solid silver}.Preferencesfooter{position:absolute;bottom:0;height:4em;box-sizing:border-box;text-align:center;padding-right:.5em;width:100%;padding-top:.5em}.PreferencesWrapper .kilob{margin-bottom:1.5em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        //EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this._T(MC + "Preferences"));
            });
            return this;
        };

        F.prototype.onAfterHide = function () {
           // E.Config().removeStack(this);
           E.appStack().remove(this);
            return PARP.onAfterHide.apply(this, Array.prototype.slice.call(arguments));
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear();
            this.showLoader();
            this.getRequest()
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function () {
            return EFO.Request('get', E.Config().mkurl('/API/Client/User/GetMe'));
        };

        F.prototype.onMainResponce = function (d) {
            this.setMetadata(d.d.meta);
            this.setData(d.d.userInfo);
            this.getField('lang').val(E.Config().getLang());
            return this;
        };


        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            U.TError(this.err);
            this.hide();
            return this;
        };

        F.prototype.setMetadata = function (d) {
            this.getField('lang').html(Mustache.render(EFO.TemplateManager().get('option', MC), d));
            return this;
        };

        F.prototype.setData = function (d) {
            return this.setFields(d);
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };
       
        
        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        F.prototype.onCommandSave = function () {
            try {
                var data = this.getData();
            } catch (e) {
                U.TError(e);
                return this;
            }
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/Client/User/TouchMe'), {data: data})
                    .done(this, this.onPostSuccess)
                    .fail(this, this.onPostFail)
                    .always(this, this.hideLoader);
            return this;
        };
        
        F.prototype.getData = function(){
            var a = this.getFields();
            var fil = EFO.Filter.Filter().applyFiltersToHash(a,this.getFilters());
            EFO.Filter.Filter().throwValuesErrors(fil);
            fil.password && fil.password.length<6?U.ERR(MC+"PasswordMinLenIs6"):false;
            return fil;
        };
        
        F.prototype.onPostSuccess = function(){
            //данные пользака подхватятся автоматом
            if(this.getField('lang').val()!==E.Config().getLang()){
                EFO.LDriver2().setCurrent(this.getField('lang').val());
            }
            this.hide();
        };
        
        F.prototype.onPostFail = function(x){
            U.TError(U.isError(x)?x.message:(U.NEString(x)?x:"NetworkError"));
            return this;
        };
        
        
        F.prototype.getFilters = function(){
            return EFO.TemplateManager().get('filters',MC);
        };



        F.prototype.onCommandReload = function () {
           // debugger;
            return this.load(0);
        };

       

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:qrreader========*/;
(function () {
    var MC = 'Qrreader', MD = 'f6d6f3cf32d0ec0c3b33e9ec6da4ceaf', FQCN = 'qrreader';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>

    function initPlugin() {
        var MC = 'Qrreader', MD = 'f6d6f3cf32d0ec0c3b33e9ec6da4ceaf', FQCN = 'qrreader';
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Main":"<div class=\"{{getCssClass}}Wrapper\">\n    <div class=\"{{getCssClass}}FormWrapper\">\n        <div class=\"{{getCssClass}}PreviewWrapper\">\n            <div class=\"{{getCssClass}}Preview\" data-role=\"preview\">\n                <div class=\"{{getCssClass}}CamWrapper\"><canvas data-role=\"cp\" width=\"500\" height=\"500\"><\/canvas><\/div>\n                <div class=\"{{getCssClass}}CamSwitch\" data-role=\"camSwitch\" data-command=\"camSwitch\" style=\"\">\n                    <svg><use xlink:href=\"#SVG{{getCssClass}}Camera\"\/><\/svg>\n                <\/div>\n            <\/div>\n        <\/div>\n        <div class=\"{{getCssClass}}FooterWrapper\">\n            <span class=\"{{getCssClass}}Button\" data-command=\"cancel\">{{#_TT}}CancelButton{{\/_TT}}<\/span>\n        <\/div>\n    <\/div>    \n<\/div>\n<div style=\"display:none\">\n    <svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n        <symbol id=\"SVG{{getCssClass}}Camera\" viewBox=\"0 0 333.668 333.668\">        \n            <path d=\"M295.101,298.649H38.561C17.295,298.649,0,281.354,0,260.088V103.703c0-21.266,17.295-38.561,38.561-38.561h52.347 l4.582-15.457c1.87-8.458,9.602-14.666,18.696-14.666h105.297c8.837,0,16.658,6.176,18.728,14.743l0.122,0.527l4.177,14.852h52.597 c21.266,0,38.561,17.295,38.561,38.561v156.384C333.662,281.354,316.361,298.649,295.101,298.649z M38.561,77.996 c-14.178,0-25.707,11.53-25.707,25.707v156.384c0,14.178,11.53,25.707,25.707,25.707h256.54c14.178,0,25.707-11.53,25.707-25.707 V103.703c0-14.178-11.53-25.707-25.707-25.707h-62.327l-7.037-25.097c-0.649-2.918-3.278-5.032-6.26-5.032H114.179 c-3.027,0-5.598,2.069-6.26,5.039l-7.429,25.09H38.561z M166.841,259.798c-44.981,0-81.576-36.588-81.576-81.563 c0-44.981,36.594-81.569,81.576-81.569c44.969,0,81.557,36.594,81.557,81.569C248.397,223.204,211.809,259.798,166.841,259.798z M166.841,109.513c-37.893,0-68.722,30.823-68.722,68.716s30.83,68.709,68.722,68.709c37.886,0,68.703-30.823,68.703-68.709 C235.543,140.336,204.72,109.513,166.841,109.513z M286.804,101.852c-6.555,0-11.858,5.315-11.858,11.858 c0,6.549,5.302,11.857,11.858,11.857c6.549,0,11.851-5.309,11.851-11.857C298.649,107.167,293.346,101.852,286.804,101.852z\" \/>\n        <\/symbol>\n    <\/svg>\n<\/div>","camera_error":"<div class=\"{{getCssClass}}QrReaderCameraError\">{{#_TT}}Barista.CAMREA_ERROR{{\/_TT}}<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"QRReader":".QrreaderBackdrop{background:white;position:fixed;z-index:2;width:100%;height:100%;box-sizing:border-box;left:0;top:0}.QrreaderComponentContent{width:100%;height:100%;box-sizing:border-box;overflow:hidden}.QrreaderWrapper{width:100%;height:100%;box-sizing:border-box;overflow:hidden}.QrreaderFormWrapper{width:100%;height:100%;max-height:100%;overflow:hidden;box-sizing:border-box;width:35em;max-width:100%;margin:0 auto}.QrreaderFormWrapper{position:relative;padding-bottom:4em}.QrreaderFooterWrapper{height:4em;position:absolute;left:0;bottom:0;width:100%;box-sizing:border-box;text-align:center;line-height:4em}.QrreaderPreviewWrapper{width:100%;height:100%;box-sizing:border-box;max-height:100%;overflow:hidden}.QrreaderPreview{width:100% !important;height:100% !important;max-width:100%;max-height:100%;min-width:100%;min-height:100%}.QrreaderPreview video{width:100%;height:100%}span.QrreaderButton{background:#760000;color:white;line-height:2em;display:inline-block;padding:0 1.5em;cursor:pointer}.qrreaderPreview{position:relative}.QrreaderCamSwitch{position:absolute;top:0;right:0;width:4em;height:4em;background:white;box-sizing:border-box;border:1px solid #760000;padding:.3em;cursor:pointer}.QrreaderCamSwitch svg{width:100%;height:100%;fill:#760000}.QrreaderCamWrapper,.qrreaderCamWrapper{width:100%;height:100%}.qrreaderCamWrapper canvas,.QrreaderCamWrapper canvas{max-height:100%;-zz-max-width:100%;height:100%;margin:0 auto;display:block}.qrreaderCameraError{text-align:center;color:white;background:crimson;padding:2em}body.NATCAM_ACTIVE{background-color:transparent}body.NATCAM_ACTIVE>div,body.NATCAM_ACTIVE #boxapp>div,body.NATCAM_ACTIVE div#appContent>div{opacity:0 !important}body.NATCAM_ACTIVE div#appContent,body.NATCAM_ACTIVE #boxapp,body.NATCAM_ACTIVE div#appContent .qrreaderBackdrop{opacity:1 !important;background:transparent !important}body.NATCAM_ACTIVE #boxapp,body.NATCAM_ACTIVE div#appContent{opacity:1 !important}body.NATCAM_ACTIVE div#appContent>div{opacity:0 !important}body.NATCAM_ACTIVE div#appContent div.qrreaderBackdrop{opacity:1 !important;background:transparent}body.NATCAM_ACTIVE .qrreaderComponentContent{background:transparent}body.NATCAM_ACTIVE .qrreaderPreviewWrapper{background:transparent}body.NATCAM_ACTIVE .QrreaderFooterWrapper{background:white !important;opacity:1 !important}body.NATCAM_ACTIVE .qrreaderPreviewWrapper{display:block}body.NATCAM_ACTIVE .qrreaderCamWrapper{display:none}body.NATCAM_ACTIVE div#appContent .FlatControllerQrreaderWrapper{opacity:1 !important;background:transparent}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        //EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : F.is(this) ? this.init() : F.F();
        }
        F.xInheritE(PAR);

        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Callbackable'];
        U.initMixines(F);
        F.prototype.cama = false;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.selector = jQuery(document.createElement('select'));
            this.selector.on('change', this.doChangeCam.bindToObject(this));
            this.defaultSelected = EFO.GP().get('defCam', null);
            this.NATCAM = U.IntMoreOr(EFO.GP().get('natCam', 0), 0, 0);
            this.initReader();
            document.addEventListener('pause', this.clearHide.bindToObject(this));
            return this;
        };

        F.prototype.doChangeCam = function () {
            try {
                this.cameraStop().cameraStart();
            } catch (e) {

            }
        };
        F.prototype.onCommandCamSwitch = function () {

            //if (window.Eve.bootstrap().getConfig() !== 'browser') {
            return this.cameraSwapNAT();
            //}
            var cams = [];
            this.selector.find('option').each(function () {
                cams.push(jQuery(this).attr('value'));
            });
            var current = this.selector.val();
            var si = null;
            for (var i = 0; i < cams.length; i++) {
                cams[i] === current ? si = i : false;
            }
            if (si === null) {
                cams.length ? si = 0 : si = null;
            } else {
                si++;
                cams[si] ? false : si = 0;
            }
            si !== null && cams[si] ? this.selector.val(cams[si]).change() : false;
            EFO.GP().setSave('defCam', si === null ? null : si);
            return this;
        };

        F.prototype.initReader = function () {
            if (false && window.Eve.bootstrap().getConfig() === 'browser') {
                try {
                    this.reader = new WebCodeCamJS(this.getRole('cp').get(0));
                    this.reader.options.decoderWorker = '/DecoderWorker.js';
                    this.reader.options.DecodeQRCodeRate = 10;
                    this.reader.options.resultFunction = this.onCodeReaded.bindToObject(this);
                    this.reader.buildSelectMenu(this.selector.get(0), this.defaultSelected);
                    this.reader.init();
                } catch (e) {
                    this.reader = null;
                    this.renderCameraError();
                }
                return this;
            }
            return this;
        };
        F.prototype.renderCameraError = function () {
            this.getRole('preview').html(Mustache.render(EFO.TemplateManager().get('camera_error', MC), this));
            return this;
        };
        F.prototype.cameraStart = function () {
            if (false && window.Eve.bootstrap().getConfig() === 'browser') {
                try {
                    this.reader ? this.reader.play() : false;
                } catch (e) {
                    this.cameraStop();
                    this.renderCameraError();
                    this.reader = null;
                }
                return this;
            }
            return this.cameraStartNAT();
        };

        F.prototype.cameraStartNAT = function () {
            if (!this.cama) {
                try {
                    QRScanner.scan(this.onScannerNAT.bindToObject(this));
                    QRScanner.useCamera(this.NATCAM);
                    jQuery('body').addClass('NATCAM_ACTIVE');
                    QRScanner.show();
                    this.cama = true;
                } catch (e) {
                    this.cama = false;
                    this.renderCameraError();
                    jQuery('body').removeClass('NATCAM_ACTIVE');
                }
            }
            return this;
        };

        F.prototype.cameraStopNAT = function () {
            if (this.cama) {
                try {
                    this.cama = false;
                    QRScanner.destroy(function (status) {

                    });
                    jQuery('body').removeClass('NATCAM_ACTIVE');

                } catch (e) {
                    this.renderCameraError();
                    this.cama = false;
                    jQuery('body').removeClass('NATCAM_ACTIVE');
                }
            }
            return this;
        };

        F.prototype.cameraSwapNAT = function () {
            this.NATCAM === 1 ? this.NATCAM = 0 : this.NATCAM = 1;
            try {
                QRScanner.useCamera(this.NATCAM);
            } catch (e) {

            }
            EFO.GP().setSave('natCam', this.NATCAM);
            return this;
        };

        F.prototype.cameraStop = function () {
//            if (window.Eve.bootstrap().getConfig() === 'browser') {
//                try {
//                    this.reader ? this.reader.stop() : false;
//                } catch (e) {
//                    this.renderCameraError();
//                    this.reader = null;
//                }
//                return this;
//            }
            return this.cameraStopNAT();
        };

        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };
        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };

        F.prototype.xxxshow = function () {
            if (this.getContainer()) {
                return EFO.Handlable.prototype.show.apply(this, Array.prototype.slice.call(arguments));
            }
            return this;
        };


        F.prototype.setContainer = function (x) {
            this._container = x;
            return this.show();
        };
        F.prototype.onAfterShow = function () {
            this.cameraStart();
            //E.Config().pushComponent(this);
            return PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.onAfterHide = function () {
            E.appStack().remove(this);
            this.stopPreview();
            return PARP.onAfterHide.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.stopPreview = function () {
            this.cameraStop();
            //this.getRole('preview').html('');
            return this;
        };
//        F.prototype.onCodeReaderError = function () {
//            this.stopPreview();
//            this.getRole('preview').html(this._T('Barista', 'QRREADER_ERROR'));
//            return this;
//        };
        F.prototype.onCodeReaded = function (d) {
            try {
                var m = /^mordobox:\/\/excersize\/(.{1,})$/.exec(d.code);
                if (m) {
                    EFO.Com().com('excersizeView')
                            .done(function (x) {
                                x().loadAlias(m[1]).show();
                            })
                            .fail(this, this.onRequiredComponentFail);

                } else {
                    return null;
                }

            } catch (e) {

            }
            return this.hide().clear();
        };

        F.prototype.onScannerNAT = function (err, code) {
            if (!err && code) {
                return this.onCodeReaded({code: code});
            }
            return this;
        };

        /**
         * @override
         * @returns {string}
         */
        // F.prototype.getWrapperTemplate = function () {
        //     return EFO.TemplateManager().get('default', 'Component');
        // };

        // F.prototype.getContainer = function () {
        //      return this._container;
        // };
        //</editor-fold>
        //              
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.stopPreview();
            this.clearCallbacks();
            return this;
        };

        F.prototype.clearHide = function () {
            return this.hide().clear();
        };


        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">


        F.prototype.onCommandCancel = function () {
            return this.hide().clear();
        };


        F.prototype.install = function (co) {
            this.setContainer(co).load();
        };
        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        F.prototype.menuActive = function () {
            return false;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });

})();
;/*===COMPONENT:toolbar========*/;
(function () {
    var H = null, MC = 'Toolbar', MD = 'f50b3c2aa6125e65df874c95b2df8f9a', FQCN = 'toolbar';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.Handlable, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"Toolbarback\" viewBox=\"0 0 512 512\">        \n        <g> \n            <g> \n                <path d=\"M491.318,235.318H20.682C9.26,235.318,0,244.578,0,256c0,11.423,9.26,20.682,20.682,20.682h470.636 c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z\"\/> \n            <\/g> \n        <\/g>\n        <g> \n            <g> \n                <path d=\"M49.932,256L211.795,94.136c8.077-8.077,8.077-21.172,0-29.249c-8.077-8.076-21.172-8.076-29.249,0L6.058,241.375 c-8.077,8.077-8.077,21.172,0,29.249l176.488,176.488c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.625-6.058 c8.077-8.077,8.077-21.172,0-29.249L49.932,256z\"\/> \n            <\/g> \n        <\/g>\n    <\/symbol>\n<\/svg>\n","main":"<div class=\"navbar-fixed {{getCssClass}}ModeMenu\">\n    <nav>\n        <div id=\"open_menu_btn\" data-command=\"openmenu\">\n            <i class=\"mdi mdi-menu\"><\/i>\n        <\/div>\n        <div class=\"{{getCssClass}}BackButton\" data-command=\"doback\">\n            <svg><use xlink:href=\"#{{getCssClass}}back\" \/><\/svg>\n            <\/div>\n        <h1 class=\"truncate\" data-role=\"title\">{{#_TT}}{{getCssClass}}Title{{\/_TT}}<\/h1>        \n    <\/nav>\n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".navbar-fixed{z-index:1 !important}div#boxapp.ToolbarInstalld{padding-top:56px}.ToolbarBackButton{width:56px;height:56px;box-sizing:border-box;padding:1.2em;float:left;cursor:pointer;line-height:0}.ToolbarBackButton svg{width:100%;height:100%;fill:white}.ToolbarModeMenu .ToolbarBackButton{display:none}.ToolbarModeBack .ToolbarBackButton{display:block}.ToolbarModeBack #open_menu_btn{display:none}.ToolbarBackButton{position:relative;z-index:200}.navbar-fixed.ToolbarModeMenu{z-index:15 !important}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Commandable', 'Roleable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            var r = document.getElementById('boxapp');
            jQuery(r).addClass(MC + "Installd");
            return r;
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return '';//EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };
        F.prototype.getWrapperTemplate = function () {
            return EFO.TemplateManager().get('Main', MC);
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>            
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };

        F.prototype.setTitle = function (x) {
            this.getRole('title').html(x);
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandOpenmenu = function (x) {
            EFO.Com().com('menu').done(function (x) {
                x().toggle();
            });
            return this;
        };

        F.prototype.onCommandDoback = function (x) {
            window.Eve.appStack().onBackButton();
            return this;
        };
        //</editor-fold>

        //</editor-fold>


        F.prototype.install = function () {
            this.show();
            return this;
        };

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };

        F.prototype.setBackMode = function (x) {
            x = U.anyBool(x, false);
            this.handle.removeClass(MC + "ModeMenu "+ MC + "ModeBack");
            this.handle.addClass(MC + (!x ? "ModeMenu" : "ModeBack"));
            return this;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:videoSlider========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSlider ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = 'VideoSlider', MD = '35e20d8b1ad7f3625a03355758ff08c8', FQCN = 'videoSlider';
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}VideoError\">{{#_TT}}{{getCssClass}}VideoError{{error}}{{\/_TT}}<\/div>","images":"{{#images}}\n<div class=\"{{getCssClass}}owWrapper {{#ifZero}}{{getCssClass}}ActiveImage{{\/ifZero}}\" data-index=\"{{xxindex}}\" id=\"{{#createLoader}}{{excid}}\/{{imageid}}{{\/createLoader}}\">  \n    {{>loader}}                           \n<\/div>   \n{{\/images}}","loader":"<div class=\"{{getCssClass}}Preloader\" >\n    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n<\/div>                            \n","main":"<div class=\"{{getCssClass}}ExtVideoWrap {{getCssClass}}ExtViewVideo\" data-role=\"imap_vs_wrapper\">\n    <div class=\"{{getCssClass}}imapInner\">\n        <div class=\"{{getCssClass}}VideoContainer {{getCssClass}}VideoMiddleMiddle\" data-role=\"videoContainer\"><\/div>\n        {{>VideoSliderNavi}}\n    <\/div>\n    {{>VideoSliderSlowSwitch}}    \n<\/div>","navi":"<div class=\"{{getCssClass}}NavigationBlock\" data-role=\"navblock\" data-command=\"replay\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowLeft\" data-command=\"navTo\" data-x=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowRight\" data-command=\"navTo\" data-x=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>    \n<\/div>","slowSwitch":"<div class=\"{{getCssClass}}videoSlowSwitch\" data-role=\"slowContainer\">\n    <input type=\"checkbox\" id=\"a{{MD}}slowSwitch\" data-monitor=\"slowswitch\" data-role=\"slowswitch\" {{#slowSwitch}}checked=\"checked\"{{\/slowSwitch}} \/>\n           <label for=\"a{{MD}}slowSwitch\">{{#_TT}}{{getCssClass}}SlowPleaseIamWriting{{\/_TT}}<\/label>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerVideoSliderWrapper{position:static}.VideoSliderowWrapper{display:none}.VideoSliderowWrapper.VideoSliderActiveImage{display:block}.VideoSliderowWrapper video{width:100%}.VideoSliderimapInner{position:relative}.VideoSliderNavigationBlock{position:absolute;top:0;left:0;width:100%;height:100%}.VideoSliderArrow{width:2.5em;height:2.5em;position:absolute;top:50%;margin-top:-1.25em;cursor:pointer;z-index:11}.VideoSliderArrow svg{width:100%;height:100%;fill:#760000}.VideoSliderArrow.VideoSliderArrowLeft{left:0;transform:rotate(90deg)}.VideoSliderArrow.VideoSliderArrowRight{right:0;transform:rotate(-90deg)}.VideoSlidervideoSlowSwitch{text-align:center;margin:.3em 0}.VideoSlidervideoSlowSwitch label:after,.VideoSlidervideoSlowSwitch label:before{display:none}.VideoSlidervideoSlowSwitch label{color:#760000;line-height:2.5em;height:2.5em;border:1px solid #760000;padding:0 .5em;cursor:pointer;transition:all .3s}.VideoSlidervideoSlowSwitch input[type=checkbox]:checked+label{color:white;background:#760000}.VideoSliderPreloader{text-align:center;height:7em;box-sizing:border-box;padding:1em}.VideoSliderPreloader svg{width:100%;height:100%}"};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
           // EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            F.prototype.onCommandReplay = function(){
                this.onChanged();
                return this;
            };
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.enumSubTemplates = function () {
                var x = PARP.enumSubTemplates.apply(this, APS.call(arguments));
                return U.safeArray(x).concat([
                    MC + '.slowSwitch'
                            , MC + '.navi'
                ]);
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                EFO.Events.GEM().On('SLOWSWITCH_STATE', this, this.onSlowSwitchState);
                this.createLoader = this._createLoader.bindToObject(this);
                return this;
            };
            //</editor-fold>
            //компонент обеспечивает рендеринг и загрузку видео, наследуем от EFO.flatController
            //<editor-fold defaultstate="collapsed" desc="set-clear-control">
            F.prototype.clear = function () {
                this.images = null;
                this.getRole('navblock').hide();
                this.error = "noExtendedVideo";
                this.handle.find('video').each(function(){
                    window.clearTimeout(this.whto); 
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
                this.getRole('slowContainer').hide();
                return this;
            };

            F.prototype.setData = function ($images,stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    for(var i = 0;i<this.images.length;i++){
                        this.images[i].xxindex=i;
                    }
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.images.length>1?this.getRole('navblock').show():false;
                    this.getRole('slowContainer').show();
                }

                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                var current = this.handle.find('.'+MC+"ActiveImage");
                var index = parseInt(current.data('index'));
                var dir=parseInt(t.data('x'));
                if(dir===-1){
                   index--;    
                }else{
                    index++;
                }
                var next = this.handle.find('[data-index='+index+']');
                if(!next.length){
                    next = dir===-1?this.handle.find('.'+MC+"owWrapper:last"):this.handle.find('.'+MC+"owWrapper:first");
                }
                current.removeClass(MC+"ActiveImage");
                next.addClass(MC+"ActiveImage");
                return this.onChanged();
            };

            F.prototype.onChanged = function () {                
                var self= this;
                this.handle.find('video').each(function () {
                    try {
                        if (jQuery(this).is(':visible')) {
                            self.setVideoTagVisible(this);
                        } else {
                            self.setVideoTagInvisible(this);                            
                        }
                    } catch (e) {

                    }
                });
                return this;
            };
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="slowSwitch">
            F.prototype.onSlowSwitchState = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                this.getRole('slowswitch').prop('checked', cstate);
                this.handle.find('video').each(function () {
                    this.playbackRate = cstate ? .3 : 1;
                });
                return this;
            };
            F.prototype.onMonitorSlowswitch = function (t) {
                E.Config().setSlowSwitch(t.prop('checked'));
                return this;
            };
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };
            
            F.prototype.ifZero = function(){
                return this.xxindex===0?true:false;
            };
            
            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;               
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc)||(tc===0 && x.currentTime<1)) && !x.paused) {                    
                        x.oncanplaythrough = function () {
                            this.oncanplaythrough = null;
                            if (jQuery(this).is(':visible')) {
                                self.setVideoTagVisible(this);                                
                            } else {
                                self.setVideoTagInvisible(this);                               
                            }
                        };
                        x.load();
                    }
                }, 2000);
                var cstate = E.Config().getSlowSwitchPreset();
                x.play();
                x.playbackRate = cstate ? .3 : 1;
            };
            
            F.prototype.setVideoTagInvisible = function(x){
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {                
                //https://mordoboy.ironstar.pw/PVideoFly/EXCEXT/N104/A104N0P/500_500.mp4?a=a1508024353449
                var url = "/PVideoFly/EXCEXT/N"+b(a);
                var id = [MC, "videx", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "/600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                    window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    this.oncanplaythrough = null;
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    if (jQuery(this).is(':visible')) {                                        
////                                        this.play();
////                                        //jQuery(this).addClass(MC+'Playing');
////                                        this.playbackRate = cstate ? .3 : 1;
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                        //this.pause();
//                                        //jQuery(this).removeClass(MC+'Playing');
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                //alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([url, "/600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//                        var cstate = E.Config().getSlowSwitchPreset();
//                        if (jQuery(this).is(':visible')) {
//                             self.setVideoTagVisible(this);
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//               
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };
            
            
            F.prototype.mkVideoWithSource = function (url, containerId) {
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {  
                //alert('vitask launchd');                
                var vis = '<video loop  webkit-playsinline playsinline preload="auto" ></video>';
                var vij = jQuery(vis);
                var vid = vij.get(0);
                var ip = jQuery("#" + task.getParam('id'));
                vid.oncanplaythrough = function () {
                    jQuery("#" + task.getParam('id')).html('').append(this);
                    this.oncanplaythrough = null;
                    if (jQuery(this).is(':visible')) {
                        task.context.setVideoTagVisible(this);
                    } else {
                        task.context.setVideoTagInvisible(this);
                    }
                    //alert('vitaskComplete');
                    task.complete();
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    task.error();
                };                
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSlider = F;
        }
    }
})();
;/*===COMPONENT:videoSwitch========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSwitch ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = 'VideoSwitch', MD = '71ab262b0872b84d0a3d85dd5ce193b7', FQCN = 'videoSwitch';
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}VideoError\">{{#_TT}}{{getCssClass}}VideoError{{error}}{{\/_TT}}<\/div>","images":"{{#images}}\n<div class=\"{{getCssClass}}owWrapper\" data-textid=\"{{indexText}}\" data-xindex=\"{{xindex}}\"  data-yindex=\"{{yindex}}\" data-index=\"{{index}}\" id=\"{{#createLoader}}{{{url}}}{{\/createLoader}}\">  \n    {{>loader}}                           \n<\/div>   \n{{\/images}}","loader":"<div class=\"{{getCssClass}}Preloader\" >\n    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n<\/div>                            \n","main":"<div class=\"big_image_block {{getCssClass}}TrainingViewVideo\" data-role=\"imap_vs_wrapper\">\n    <div class=\"{{getCssClass}}imapInner\">\n        <div class=\"{{getCssClass}}VideoContainer {{getCssClass}}VideoMiddleMiddle\" data-role=\"videoContainer\"><\/div>\n        {{>VideoSwitchNavi}}\n    <\/div>\n    {{>VideoSwitchSlowSwitch}}    \n<\/div>","navi":"<div class=\"{{getCssClass}}NavigationBlock\" data-role=\"navblock\" data-command=\"replay\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1m1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnm1\" data-command=\"navTo\" data-x=\"0\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1m1\" data-command=\"navTo\" data-x=\"1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1nn\" data-command=\"navTo\" data-x=\"-1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1nn\" data-command=\"navTo\" data-x=\"1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1p1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnp1\" data-command=\"navTo\" data-x=\"0\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1p1\" data-command=\"navTo\" data-x=\"1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","select":"<div class=\"{{getCssClass}}PleaseSelect\">{{#_TT}}{{getCssClass}}noVideoInThis{{\/_TT}}<\/div>","slowSwitch":"<div class=\"{{getCssClass}}videoSlowSwitch\" data-role=\"slowContainer\">\n    <input type=\"checkbox\" id=\"a{{MD}}slowSwitch\" data-monitor=\"slowswitch\" data-role=\"slowswitch\" {{#slowSwitch}}checked=\"checked\"{{\/slowSwitch}} \/>\n           <label for=\"a{{MD}}slowSwitch\">{{#_TT}}{{getCssClass}}SlowPleaseIamWriting{{\/_TT}}<\/label>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerVideoSwitchWrapper{position:relative}.VideoSwitchowWrapper{width:100%;box-sizing:border-box;display:none}.VideoSwitchowWrapper video{width:100%}.VideoSwitchimapInner{position:relative}.VideoSwitchNavigationBlock{position:absolute;top:0;left:0;width:100%;height:100%;font-size:2em}.VideoSwitchNavigationBlock .VideoSwitchArrow{width:1.5em;height:1.5em;-qqq-background:yellow;position:absolute;animation:blikers .8s linear alternate infinite;cursor:pointer;z-index:11}.big_image_block.VideoSwitchTrainingViewVideo{font-size:inherit}@keyframes blikers{from{opacity:0}to{opacity:1}}.VideoSwitchArrow svg{width:100%;height:100%;fill:#760000}.VideoSwitchArrow.VideoSwitchArrowTonnm1{top:0;left:50%;margin-left:-.75em;transform:rotate(-180deg)}.VideoSwitchArrow.VideoSwitchArrowTop1m1{top:-.3em;right:-.3em;transform:rotate(-135deg)}.VideoSwitchArrow.VideoSwitchArrowTom1nn{left:0;top:50%;transform:rotate(90deg);margin-top:-.75em}.VideoSwitchArrow.VideoSwitchArrowTop1nn{top:50%;right:0;margin-top:-.75em;transform:rotate(-90deg)}.VideoSwitchArrow.VideoSwitchArrowTom1p1{left:-.3em;bottom:0;transform:rotate(45deg)}.VideoSwitchArrow.VideoSwitchArrowTonnp1{bottom:0;left:50%;margin-left:-.75em}.VideoSwitchArrow.VideoSwitchArrowTop1p1{bottom:0;right:-.3em;transform:rotate(-45deg)}.VideoSwitchArrow.VideoSwitchArrowTom1m1{top:-.3em;left:-.3em;transform:rotate(135deg)}.VideoSwitchVideoRightDown .VideoSwitchowWrapper[data-textid=\"RightDown\"]{display:block}.VideoSwitchVideoMiddleDown .VideoSwitchowWrapper[data-textid=\"MiddleDown\"]{display:block}.VideoSwitchVideoLeftDown .VideoSwitchowWrapper[data-textid=\"LeftDown\"]{display:block}.VideoSwitchVideoRightMiddle .VideoSwitchowWrapper[data-textid=\"RightMiddle\"]{display:block}.VideoSwitchVideoRightUp .VideoSwitchowWrapper[data-textid=\"RightUp\"]{display:block}.VideoSwitchVideoLeftUp .VideoSwitchowWrapper[data-textid=\"LeftUp\"]{display:block}.VideoSwitchVideoMiddleUp .VideoSwitchowWrapper[data-textid=\"MiddleUp\"]{display:block}.VideoSwitchVideoLeftMiddle .VideoSwitchowWrapper[data-textid=\"LeftMiddle\"]{display:block}.VideoSwitchVideoMiddleMiddle .VideoSwitchowWrapper[data-textid=\"MiddleMiddle\"]{display:block}.VideoSwitchvideoSlowSwitch label{display:inline-block;line-height:2.5em;color:#760000;border:1px solid #760000;margin:0;padding:0 .5em;position:static;height:2.5em;transition:all .3s}.VideoSwitchvideoSlowSwitch input[type=checkbox]:checked+label{background:#760000;color:white}.VideoSwitchvideoSlowSwitch label:before,.VideoSwitchvideoSlowSwitch label:after{display:none}.VideoSwitchvideoSlowSwitch{text-align:center}.FilteredViewTab.FilteredViewopened+.FilteredViewTab .FilteredViewTabHeader{border-top:1px solid silver}.VideoSwitchvideoSlowSwitch{margin:.3em 0}.VideoSwitchPreloader{text-align:center;height:7em;box-sizing:border-box;padding:1em}.VideoSwitchPreloader svg{width:100%;height:100%}.VideoSwitchPleaseSelect{line-height:3em;background:crimson;color:white;text-align:center}video.VideoSwitchPlaying{box-sizing:border-box;border:3px solid red}"};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            //  EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Monitorable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.enumSubTemplates = function () {
                var x = PARP.enumSubTemplates.apply(this, APS.call(arguments));
                return U.safeArray(x).concat([
                    MC + '.slowSwitch'
                            , MC + '.navi'
                ]);
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                EFO.Events.GEM().On('SLOWSWITCH_STATE', this, this.onSlowSwitchState);
                this.createLoader = this._createLoader.bindToObject(this);
                return this;
            };
            //</editor-fold>
            //компонент обеспечивает рендеринг и загрузку видео, наследуем от EFO.flatController
            //<editor-fold defaultstate="collapsed" desc="set-clear-control">
            F.prototype.clear = function () {
                this.images = null;
                this.getRole('navblock').hide();
                this.handle.find('video').each(function () {
                    window.clearTimeout(this.whto);
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('select', MC), this));
                this.getRole('slowContainer').hide();
                this.imageIndex = null;
                return this;
            };

            F.prototype.setData = function ($images, stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.indexImages();
                    this.updateNavigation();
                    this.getRole('navblock').show();
                    this.getRole('slowContainer').show();
                    this.setIndex(0, 0);
                }

                return this;
            };

            F.prototype.indexImages = function () {
                this.imageIndex = [null, null, null, //00 10 20    n = y*3+x
                    null, null, null, //01 11 21
                    null, null, null];//02 12 22
                for (var i = 0; i < this.images.length; i++) {
                    var x = this.images[i];
                    var co = x.yindex * 3 + parseInt(x.xindex);
                    this.imageIndex[co] = x;
                }
                this.currentIndex = [1, 1];
                return this;
            };

            F.prototype.updateNavigation = function () {
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var remap = {'m1m1': {x: -1, y: -1}, 'nnm1': {x: 0, y: -1}, 'p1m1': {x: +1, y: -1}, 'm1nn': {x: -1, y: 0}, 'p1nn': {x: +1, y: 0}, 'm1p1': {x: -1, y: +1}, 'nnp1': {x: 0, y: +1}, 'p1p1': {x: +1, y: +1}};
                this.handle.find('.' + MC + 'Arrow').hide().each(function () {
                    this.offsetWidth;
                });
                for (var k in remap) {
                    if (remap.hasOwnProperty(k)) {
                        var ofs = remap[k].x + remap[k].y * 3;
                        var tx = this.currentIndex[0] + remap[k].x;
                        var ty = this.currentIndex[1] + remap[k].y;
                        this.handle.find('.' + MC + 'ArrowTo' + k)[this.imageIndex[ci + ofs] && tx >= 0 && tx <= 2 && ty >= 0 && ty <= 2 ? 'show' : 'hide']();
                    }
                }
                this.onChanged();
                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                this.setIndex(t.data('x'), t.data('y'));
                return this;
            };


            F.prototype.setIndex = function (dx, dy) {
                var di = parseInt(dx) + 3 * dy;
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var tcx = this.currentIndex[0] + parseInt(dx);
                var tcy = this.currentIndex[1] + parseInt(dy);
                if (this.imageIndex[ci + di] && tcx >= 0 && tcx <= 2 && tcy >= 0 && tcy <= 2) {
                    var ofs = ci + di;
                    var classes = ['LeftUp', 'MiddleUp', 'RightUp', 'LeftMiddle', 'MiddleMiddle', 'RightMiddle', 'LeftDown', 'MiddleDown', 'RightDown'];
                    this.currentIndex[0] = this.currentIndex[0] + parseInt(dx);
                    this.currentIndex[1] = this.currentIndex[1] + parseInt(dy);
                    var ClassToRemove = [];
                    for (var i = 0; i < classes.length; i++) {
                        ClassToRemove.push(MC + 'Video' + classes[i]);
                    }
                    this.getRole('videoContainer')
                            .removeClass(ClassToRemove.join(' '))
                            .addClass(MC + 'Video' + classes[ofs]);
                    this.updateNavigation();
                }
                return this;
            };

            F.prototype.onChanged = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                var self = this;
                this.handle.find('video').each(function () {
                    try {
                        if (jQuery(this).is(':visible')) {
                            self.setVideoTagVisible(this);

                        } else {
                            self.setVideoTagInvisible(this);
                        }
                    } catch (e) {

                    }
                });
                return this;
            };
            //</editor-fold>
            F.prototype.onSlowSwitchState = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                this.getRole('slowswitch').prop('checked', cstate);
                this.handle.find('video').each(function () {
                    this.playbackRate = cstate ? .3 : 1;
                });
                return this;
            };
            F.prototype.onMonitorSlowswitch = function (t) {
                E.Config().setSlowSwitch(t.prop('checked'));
                return this;
            };
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };

            F.prototype.onCommandReplay = function () {
                this.onChanged();
                return this;
            };

            F.prototype.videoOnLoad = function (x) {

            };

            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc) || (tc === 0 && x.currentTime < 1)) && !x.paused) {
                        x.oncanplaythrough = function () {
                            this.oncanplaythrough = null;
                            if (jQuery(this).is(':visible')) {
                                self.setVideoTagVisible(this);
                            } else {
                                self.setVideoTagInvisible(this);
                            }
                        };
                        x.load();
                    }
                }, 2000);
                var cstate = E.Config().getSlowSwitchPreset();
                x.play();
                x.playbackRate = cstate ? .3 : 1;
            };

            F.prototype.setVideoTagInvisible = function (x) {
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {
                var url = b(a);
                var id = [MC, "vid", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                            window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success  
                                //alert('oaded,queueing');
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    this.oncanplaythrough = null;
//                                    if (jQuery(this).is(':visible')) {
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([b(a), "600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//
//                        if (jQuery(this).is(':visible')) {
//                            self.setVideoTagVisible(this);
//
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };

            F.prototype.mkVideoWithSource = function (url, containerId) {                
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                //alert('queued');
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {
                //alert('task launchd');
                var vis = '<video loop  webkit-playsinline playsinline preload="auto" ></video>';
                var vij = jQuery(vis);
                var vid = vij.get(0);
                var ip = jQuery("#" + task.getParam('id'));
                vid.oncanplaythrough = function () {
                    jQuery("#" + task.getParam('id')).html('').append(this);
                    this.oncanplaythrough = null;
                    if (jQuery(this).is(':visible')) {
                        task.context.setVideoTagVisible(this);
                    } else {
                        task.context.setVideoTagInvisible(this);
                    }
                    //alert('task complete');
                    console.log(E.Config().getQueue()._tasks);
                    task.complete();
                    
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    //alert('taskError');
                    task.error();
                    
                };
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSwitch = F;
        }
    }
})();
;/*===COMPONENT:AbstractFilter========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice, PAR = EFO.flatController, PARP = PAR.prototype;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        window.Eve.ConFil.AbstractFilter ? false : initPlugin();
        function initPlugin() {
            var MC = 'AbstractFilter', MD = '77c396e7ebe189202aaecffbb04818a8', FQCN = 'AbstractFilter';
            function AbstractFilter() {
                U.AbstractError();
            }
            AbstractFilter.xInheritE(PAR);
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"main":"<div class=\"{{getCssClass}}OutlineWrapper\">\n    <div class=\"{{getCssClass}}InsetWrapper\" data-role=\"filter_content\">\n    <\/div>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":""};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            var F = AbstractFilter;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable', 'Callbackable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                this.isZoneActive = this._isZoneActive.bindToObject(this);
                this.getNameForZone = this._getNameForZone.bindToObject(this);
                return this;
            };
            //</editor-fold>


            F.prototype.install = function (container, items) {
                var activeZones = [];
                items = U.safeArray(items);
                this.zoneNames={};
                for (var i = 0; i < items.length; i++) {
                    var xi = U.IntMoreOr(items[i].info.filter_value, 0, null);
                    xi ? activeZones.push(xi) : false;
                    this.zoneNames["P"+xi]=items[i].info.name;
                }
                
                this.setContainer(container);
                this.updateZonesContent(activeZones);
                
                if (activeZones.length) {
                    this.setZoneHilight(activeZones[0]);
                    this.runCallback(activeZones[0]);
                }
                return this;
            };

            F.prototype.updateZonesContent = function (activeZones) {                
                var t = this.getFilterTemplate();
                this.activeZones = activeZones;
                this.getRole('filter_content').html(Mustache.render(t, this));
                return this;
            };

            F.prototype.getFilterTemplate = function () {
                return '';
            };

            F.prototype.onCommandSetZone = function (t) {
                //репорт родителю                  
                var id = U.IntMoreOr(t.data('zoneId'));
                var fid = null;
                for (var i = 0; i < this.activeZones.length; i++) {
                    if (this.activeZones[i] === id) {
                        fid = this.activeZones[i];
                        break;
                    }
                }
                if (fid) {
                    this.setZoneHilight(fid);
                    this.runCallback(fid);

                }
            };

            F.prototype._isZoneActive = function () {
                return this.isZoneActiveReal.bindToObject(this);
            };
            F.prototype._getNameForZone = function(){
                return this.getNameForZoneReal.bindToObject(this);
            };
            
            F.prototype.getNameForZoneReal = function(a,b){
                var z = U.IntMoreOr(b(a));
                if (z) {
                    var P = "P"+z;
                    if(U.NEString(this.zoneNames[P],null)){
                        return U.NEString(this.zoneNames[P],null);
                    }
                }
                return "---";
            };

            F.prototype.isZoneActiveReal = function (a, b) {
                
                var z = U.IntMoreOr(b(a));
                if (z) {
                    for (var i = 0; i < this.activeZones.length; i++) {
                        if (this.activeZones[i] === z) {
                            return '';
                        }
                    }
                }
                return 'disabled';
            };

            F.prototype.clear = function () {
                this.activeZones = [];
                this.getRole('filter_content').html('');
                this.clearCallbacks();
                this.handle.remove();
                this.handle = null;
                return this;
            };

            F.prototype.setZoneHilight = function (fid) {
                this.handle.find('.' + this.getCssClass() + 'Hilighted').removeClass(this.getCssClass() + 'Hilighted');
                this.handle.find('.' + this.getCssClass() + 'ZoneX' + fid).addClass(this.getCssClass() + 'Hilighted');
                return this;
            };

            CF.AbstractFilter = F;








            if (U.isArray(CF.Ready)) {
                var i = [].concat(CF.Ready);
                CF.Ready = {
                    push: function (x) {
                        if (U.isCallable(x)) {
                            try {
                                x();
                            } catch (e) {
                                U.TError(e.message);
                            }
                        }
                    }
                };
                for (var j = 0; j < i.length; j++) {
                    CF.Ready.push(i[j]);
                }
            }

        }


    }
})();
;/*===COMPONENT:LeftRightFilter========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice ;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        CF.Ready.push(CFReady);
        function CFReady() {
            var PAR = CF.AbstractFilter, PARP = PAR.prototype;
            CF.leftRightFilter ? false : initPlugin();
            
            function initPlugin() {
                var MC = 'LeftRightFilter', MD = '4a01c0780a4be2aa8fee5557eb25ee79', FQCN = 'LeftRightFilter';
                function Filter() {
                    return (Filter.is(this)?this.init:Filter.F).apply(this,APS.call(arguments));
                }
                Filter.xInheritE(PAR);
                var TPLS = null;
                /*====>Templates=====*/
TPLS={"filter":"<div class=\"{{getCssClass}}FilterClassContent\">\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX1 {{getCssClass}}ActiveMarker{{#isZoneActive}}1{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"1\">{{#getNameForZone}}1{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX2 {{getCssClass}}ActiveMarker{{#isZoneActive}}2{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"2\">{{#getNameForZone}}2{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX3 {{getCssClass}}ActiveMarker{{#isZoneActive}}3{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"3\">{{#getNameForZone}}3{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX4 {{getCssClass}}ActiveMarker{{#isZoneActive}}4{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"4\">{{#getNameForZone}}4{{\/getNameForZone}}<\/div>\n<\/div>"};
/*=====Templates<====*/
                var ST = null;
                /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerLeftRightFilterWrapper{position:static;padding:.5em}.LeftRightFilterFilterClassContent{display:flex;flex-direction:row;justify-content:center}.LeftRightFilterXFilterZone{width:40%;overflow:hidden;margin:0 .5em;color:#760000;border:1px solid #760000;display:block;line-height:2.5em;box-sizing:border-box;padding:0 .5em;cursor:pointer;transition:all .3s}.LeftRightFilterXFilterZone:hover{color:white;background:#760000}.LeftRightFilterXFilterZone.LeftRightFilterHilighted{background:#760000;color:white}.LeftRightFilterFilterClassContent{flex-wrap:wrap}.LeftRightFilterXFilterZone{margin-bottom:.5em}.LeftRightFilterXFilterZone.LeftRightFilterActiveMarkerdisabled,.LeftRightFilterXFilterZone.LeftRightFilterActiveMarkerdisabled:hover{color:darkgray;border-color:darkgray;background:transparent;display:none}.LeftRightFilterXFilterZone{text-align:center}"};
/*=====Styles<====*/;
                EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
                EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
                var F = Filter; //миксины не наследубтся!
                F.mixines = ['Roleable', 'Commandable', 'Monitorable', 'Callbackable'];
                U.initMixines(F);
                F.prototype.MD = MD;
                //<editor-fold defaultstate="collapsed" desc="overrides">
                F.prototype.getCssClass = function () {
                    return MC;
                };
                F.prototype.getControllerAlias = function () {
                    return MC;
                };               
                //</editor-fold>


                

                F.prototype.getFilterTemplate = function () {
                    return EFO.TemplateManager().get('filter',MC);
                };

                
                CF.leftRightFilter =F;

            }
        }



    }
})();
/**=====inc /home/eve/GAP_PROJECTS/BOX/box/www/js/app.js ==== */
(function () {
    var initialized = false;
    var openurl = null;
    document.addEventListener('deviceready', devready, false);

    function devready() {
        window.handleOpenURL = function (url) {
            openurl = url;
        };
        jQuery(appready);
    }

    function appready() {
        if (initialized) {
            return;
        }
        initialized = true;
        var E = window.Eve, EFO = E.EFO, U = EFO.U;
        var t = Eve.EFO.Request.getRequestOptions();
        t.statusSection = 's';
        t.errorSection = 'e';
        t.registerPreprocessor(function (rq) {
            //rq.data.session_name = localStorage.getItem('session');
            //if (!U.NEString(rq.data.session_name) || rq.data.session_name.length < 10) {
            //   delete(rq.data.session_name);
            //}
            //rq.data.uiToken = localStorage.getItem('uiToken');
            //rq.data['lock-client-cookie'] = 1;
            //device.uuid ? rq.data.devid = device.uuid : false;
        });
        t.registerPostprocessor(function (rq, ro) {
            if (U.isObject(ro) && U.isObject(ro.m)) {
                if (!U.anyBool(ro.m.ignoreSession, false)) {
                    ('session' in ro.m) ? localStorage.setItem('session', U.NEString(ro.m.session, '')) : false;
                    ('token' in ro.m) ? localStorage.setItem('uiToken', U.NEString(ro.m.token, '')) : false;

                    window.cookieMaster ? cookieMaster.setCookieValue(E.Config().getHost(), 'uiDevId', device.uuid ? [device.uuid, "path=/", "domain=" + E.Config().getDomain(), "expires=" + E.Config().getCookieLifeTime()].join(';') : null,
                            function () {
                                //console.log('A cookie has been set');
                            },
                            function (error) {
                                //console.log('Error setting cookie: ' + error);
                                U.TError('cserror' + error);
                            }) : false;
                    window.cookieMaster ? cookieMaster.setCookieValue(E.Config().getHost(), 'uiToken', [ro.m.token, "path=/", "domain=" + E.Config().getDomain(), "expires=" + E.Config().getCookieLifeTime()].join(';')) : false;
                }
            }
        });
        ///перехват ошибки стстауса
        EFO.LoginMon().handleStatus = function (success, fail) {
            var ev = EFO.Events.GEM().On('LOGIN_SUCCESS', this, function (x) {
                success(x);
                EFO.Events.GEM().Off(ev);
            });
            EFO.Com().com('DAP.login').done(function (x) {
                x().install(); //показать, но отказ принимать как ошибку
            }).fail(function () {
                U.TError(this._T("RequiredComponentFail"));
                fail();
            });
            return this;
        };
        window.Eve.EFO.Com().setPrimaryUrl('/Com/');
        var LD = Eve.EFO.LDriver2();
        //зашить в дефолты и вызывать только по необходимости
        LD.setSKey('lang').setDefault('ru').setAutoProp('transtoken')
                .setLoadUrl(E.Config().mkurl('/Lang/'))
                .setReportUrl(E.Config().mkurl('/API/Info/Lang/ReportLangError'))
                .setFile('client')
                .setKeepKey('langObject')
                .setListUrl(E.Config().mkurl('/Lang/list_active.json'))
                .setElement(document.createElement('div'));
        LD.loadStatic();
        if (LD.isLoaded()) {
            LD.updateNodes().checkUpdates();
            runApp();
        } else if (LD.isSelected()) {
            LD.loadRemote().ready().done(this, function () {
                LD.updateNodes();//CU не надо - он только что загружен
                runApp();
            });
        } else {
            showSelector();//селектор - отдельный компонент
        }


        function showSelector() {
            EFO.Com().com('langselect')
                    .done(function (x) {
                        x().show(); //дальше он все сам
                        // стек пустой
                    })
                    .fail(function () {
                        alert("ErrorLoadingComponent");
                    });
        }

        function appShowLoader() {
            document.getElementById('appLoader').style.display = 'block';
        }

        function appHideLoader() {
            document.getElementById('appLoader').style.display = 'none';
        }
        function hour() {
            var m = /^mordobox:\/\/excersize\/(.{1,})$/.exec(openurl);
            if (m) {
                EFO.Com().com('excersizeView')
                        .done(function (x) {
                            x().loadAlias(m[1]).show();
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            openurl = null;
        }

        function runApp() {
            EFO.Request('get', E.Config().mkurl('/API/Client/Ping/Ping'))
                    .done(function () {
                        EFO.Promise.waitForArray([
                            EFO.Com().com('toolbar').done(function (x) {
                                x().install();
                            }),
                            EFO.Com().com('menu').done(function (x) {
                                x().install();
                            }),
                            EFO.Com().com('newBook').done(function (x) {
                                x().install();
                                EFO.Com().com('DAP.login').done(function (y) {
                                    y().removeStack(); //убрать логин из стека
                                });
                                //E.Config().removeStack(x());//последний
                            })
                        ]).done(function () {
                            if (openurl) {
                                hour();
                            }
                            appHideLoader();
                        });
                    })
                    .fail(function () {
                        debugger;
                    });
        }

        window.onerror = function (m) {
            new EveFlash({ICON: "!", IMAGE: "stop", cssclass: "crimson", TITLE: {}._T("ErrorMessageTitle"), TEXT: {}._T(m), CLOSE: false, TO: 7500});
        };

    }

})();