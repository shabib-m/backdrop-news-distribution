/*!
 * jQuery UI Button 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./controlgroup","./checkboxradio","../keycode","../widget"],t):t(jQuery)})(function(e){var h;return e.widget("ui.button",{version:"1.14.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,i=this._super()||{};return this.isInput=this.element.is("input"),null!=(t=this.element[0].disabled)&&(i.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(i.label=this.originalLabel),i},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(t){t.keyCode===e.ui.keyCode.SPACE&&(t.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(t,i){var t="iconPosition"!==t,o=t?this.options.iconPosition:i,s="top"===o||"bottom"===o;this.icon?t&&this._removeClass(this.icon,null,this.options.icon):(this.icon=e("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),t&&this._addClass(this.icon,null,i),this._attachIcon(o),s?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(o))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var i=(void 0===t.showLabel?this.options:t).showLabel,o=(void 0===t.icon?this.options:t).icon;i||o||(t.showLabel=!0),this._super(t)},_setOption:function(t,i){"icon"===t&&(i?this._updateIcon(t,i):this.icon&&(this.icon.remove(),this.iconSpace)&&this.iconSpace.remove()),"iconPosition"===t&&this._updateIcon(t,i),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!i),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(i):(this.element.html(i),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,i),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",i),this.element[0].disabled=i)&&this.element.trigger("blur")},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),!0===e.uiBackCompat&&(e.widget("ui.button",e.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,i){"text"===t?this._super("showLabel",i):("showLabel"===t&&(this.options.text=i),"icon"===t&&(this.options.icons.primary=i),"icons"===t&&(i.primary?(this._super("icon",i.primary),this._super("iconPosition","beginning")):i.secondary&&(this._super("icon",i.secondary),this._super("iconPosition","end"))),this._superApply(arguments))}}),e.fn.button=(h=e.fn.button,function(o){var t="string"==typeof o,s=Array.prototype.slice.call(arguments,1),n=this;return t?this.length||"instance"!==o?this.each(function(){var t,i=e(this).attr("type"),i=e.data(this,"ui-"+("checkbox"!==i&&"radio"!==i?"button":"checkboxradio"));return"instance"===o?(n=i,!1):i?"function"!=typeof i[o]||"_"===o.charAt(0)?e.error("no such method '"+o+"' for button widget instance"):(t=i[o].apply(i,s))!==i&&void 0!==t?(n=t&&t.jquery?n.pushStack(t.get()):t,!1):void 0:e.error("cannot call methods on button prior to initialization; attempted to call method '"+o+"'")}):n=void 0:(s.length&&(o=e.widget.extend.apply(null,[o].concat(s))),this.each(function(){var t=e(this).attr("type"),t="checkbox"!==t&&"radio"!==t?"button":"checkboxradio",i=e.data(this,"ui-"+t);i?(i.option(o||{}),i._init&&i._init()):"button"==t?h.call(e(this),o):e(this).checkboxradio(e.extend({icon:!1},o))})),n}),e.fn.buttonset=function(){return e.ui.controlgroup||e.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),e.ui.button});;
/*!
 * jQuery UI Position 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 * https://api.jqueryui.com/position/
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)})(function(b){function x(t,i,o){return[parseFloat(t[0])*(r.test(t[0])?i/100:1),parseFloat(t[1])*(r.test(t[1])?o/100:1)]}function T(t,i){return parseInt(b.css(t,i),10)||0}function l(t){return null!=t&&t===t.window}var e,L,P,n,f,s,h,r,o;return L=Math.max,P=Math.abs,n=/left|center|right/,f=/top|center|bottom/,s=/[\+\-]\d+(\.[\d]+)?%?/,h=/^\w+/,r=/%$/,o=b.fn.position,b.position={scrollbarWidth:function(){var t,i,o;return void 0!==e?e:(o=(i=b("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>")).children()[0],b("body").append(i),t=o.offsetWidth,i.css("overflow","scroll"),t===(o=o.offsetWidth)&&(o=i[0].clientWidth),i.remove(),e=t-o)},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),o=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),i="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth;return{width:"scroll"===o||"auto"===o&&t.height<t.element[0].scrollHeight?b.position.scrollbarWidth():0,height:i?b.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=b(t||window),o=l(i[0]),e=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:o,isDocument:e,offset:!o&&!e?b(t).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},b.fn.position=function(c){var a,d,g,u,m,w,W,v,y,H,t,i;return c&&c.of?(w="string"==typeof(c=b.extend({},c)).of?b(document).find(c.of):b(c.of),W=b.position.getWithinInfo(c.within),v=b.position.getScrollInfo(W),y=(c.collision||"flip").split(" "),H={},i=9===(i=(t=w)[0]).nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:l(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()},w[0].preventDefault&&(c.at="left top"),d=i.width,g=i.height,m=b.extend({},u=i.offset),b.each(["my","at"],function(){var t,i,o=(c[this]||"").split(" ");(o=1===o.length?n.test(o[0])?o.concat(["center"]):f.test(o[0])?["center"].concat(o):["center","center"]:o)[0]=n.test(o[0])?o[0]:"center",o[1]=f.test(o[1])?o[1]:"center",t=s.exec(o[0]),i=s.exec(o[1]),H[this]=[t?t[0]:0,i?i[0]:0],c[this]=[h.exec(o[0])[0],h.exec(o[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===c.at[0]?m.left+=d:"center"===c.at[0]&&(m.left+=d/2),"bottom"===c.at[1]?m.top+=g:"center"===c.at[1]&&(m.top+=g/2),a=x(H.at,d,g),m.left+=a[0],m.top+=a[1],this.each(function(){var o,t,f=b(this),s=f.outerWidth(),h=f.outerHeight(),i=T(this,"marginLeft"),e=T(this,"marginTop"),l=s+i+T(this,"marginRight")+v.width,n=h+e+T(this,"marginBottom")+v.height,r=b.extend({},m),p=x(H.my,f.outerWidth(),f.outerHeight());"right"===c.my[0]?r.left-=s:"center"===c.my[0]&&(r.left-=s/2),"bottom"===c.my[1]?r.top-=h:"center"===c.my[1]&&(r.top-=h/2),r.left+=p[0],r.top+=p[1],o={marginLeft:i,marginTop:e},b.each(["left","top"],function(t,i){b.ui.position[y[t]]&&b.ui.position[y[t]][i](r,{targetWidth:d,targetHeight:g,elemWidth:s,elemHeight:h,collisionPosition:o,collisionWidth:l,collisionHeight:n,offset:[a[0]+p[0],a[1]+p[1]],my:c.my,at:c.at,within:W,elem:f})}),c.using&&(t=function(t){var i=u.left-r.left,o=i+d-s,e=u.top-r.top,l=e+g-h,n={target:{element:w,left:u.left,top:u.top,width:d,height:g},element:{element:f,left:r.left,top:r.top,width:s,height:h},horizontal:o<0?"left":0<i?"right":"center",vertical:l<0?"top":0<e?"bottom":"middle"};d<s&&P(i+o)<d&&(n.horizontal="center"),g<h&&P(e+l)<g&&(n.vertical="middle"),L(P(i),P(o))>L(P(e),P(l))?n.important="horizontal":n.important="vertical",c.using.call(this,t,n)}),f.offset(b.extend(r,{using:t}))})):o.apply(this,arguments)},b.ui.position={fit:{left:function(t,i){var o,e=i.within,l=e.isWindow?e.scrollLeft:e.offset.left,e=e.width,n=t.left-i.collisionPosition.marginLeft,f=l-n,s=n+i.collisionWidth-e-l;e<i.collisionWidth?0<f&&s<=0?(o=t.left+f+i.collisionWidth-e-l,t.left+=f-o):t.left=!(0<s&&f<=0)&&s<f?l+e-i.collisionWidth:l:0<f?t.left+=f:0<s?t.left-=s:t.left=L(t.left-n,t.left)},top:function(t,i){var o,e=i.within,e=e.isWindow?e.scrollTop:e.offset.top,l=i.within.height,n=t.top-i.collisionPosition.marginTop,f=e-n,s=n+i.collisionHeight-l-e;l<i.collisionHeight?0<f&&s<=0?(o=t.top+f+i.collisionHeight-l-e,t.top+=f-o):t.top=!(0<s&&f<=0)&&s<f?e+l-i.collisionHeight:e:0<f?t.top+=f:0<s?t.top-=s:t.top=L(t.top-n,t.top)}},flip:{left:function(t,i){var o=i.within,e=o.offset.left+o.scrollLeft,l=o.width,o=o.isWindow?o.scrollLeft:o.offset.left,n=t.left-i.collisionPosition.marginLeft,f=n-o,n=n+i.collisionWidth-l-o,s="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,h="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,r=-2*i.offset[0];f<0?((l=t.left+s+h+r+i.collisionWidth-l-e)<0||l<P(f))&&(t.left+=s+h+r):0<n&&(0<(e=t.left-i.collisionPosition.marginLeft+s+h+r-o)||P(e)<n)&&(t.left+=s+h+r)},top:function(t,i){var o=i.within,e=o.offset.top+o.scrollTop,l=o.height,o=o.isWindow?o.scrollTop:o.offset.top,n=t.top-i.collisionPosition.marginTop,f=n-o,n=n+i.collisionHeight-l-o,s="top"===i.my[1]?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,h="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,r=-2*i.offset[1];f<0?((l=t.top+s+h+r+i.collisionHeight-l-e)<0||l<P(f))&&(t.top+=s+h+r):0<n&&(0<(e=t.top-i.collisionPosition.marginTop+s+h+r-o)||P(e)<n)&&(t.top+=s+h+r)}},flipfit:{left:function(){b.ui.position.flip.left.apply(this,arguments),b.ui.position.fit.left.apply(this,arguments)},top:function(){b.ui.position.flip.top.apply(this,arguments),b.ui.position.fit.top.apply(this,arguments)}}},b.ui.position});;
/*!
 * jQuery UI Resizable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./mouse","../disable-selection","../plugin","../version","../widget"],t):t(jQuery)})(function(z){return z.widget("ui.resizable",z.ui.mouse,{version:"1.14.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(t,e){var i=!1,s=z(t).css("overflow");if("hidden"===s)return!1;if("scroll"===s)return!0;if(0<t[s=e&&"left"===e?"scrollLeft":"scrollTop"])return!0;try{t[s]=1,i=0<t[s],t[s]=0}catch(t){}return i},_create:function(){var t,e=this.options,i=this;this._addClass("ui-resizable"),z.extend(this,{_aspectRatio:!!e.aspectRatio,aspectRatio:e.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:e.helper||e.ghost||e.animate?e.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(z("<div class='ui-wrapper'></div>").css({overflow:"hidden",position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,t={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(t),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this._proportionallyResize()),this._setupHandles(),e.autoHide&&z(this.element).on("mouseenter",function(){e.disabled||(i._removeClass("ui-resizable-autohide"),i._handles.show())}).on("mouseleave",function(){e.disabled||i.resizing||(i._addClass("ui-resizable-autohide"),i._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy(),this._addedHandles.remove();function t(t){z(t).removeData("resizable").removeData("ui-resizable").off(".resizable")}var e;return this.elementIsWrapper&&(t(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;case"aspectRatio":this._aspectRatio=!!e}},_setupHandles:function(){var t,e,i,s,h,n=this.options,o=this;if(this.handles=n.handles||(z(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=z(),this._addedHandles=z(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),i=this.handles.split(","),this.handles={},e=0;e<i.length;e++)s="ui-resizable-"+(t=String.prototype.trim.call(i[e])),h=z("<div>"),this._addClass(h,"ui-resizable-handle "+s),h.css({zIndex:n.zIndex}),this.handles[t]=".ui-resizable-"+t,this.element.children(this.handles[t]).length||(this.element.append(h),this._addedHandles=this._addedHandles.add(h));this._renderAxis=function(t){var e,i,s;for(e in t=t||this.element,this.handles)this.handles[e].constructor===String?this.handles[e]=this.element.children(this.handles[e]).first().show():(this.handles[e].jquery||this.handles[e].nodeType)&&(this.handles[e]=z(this.handles[e]),this._on(this.handles[e],{mousedown:o._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=z(this.handles[e],this.element),s=/sw|ne|nw|se|n|s/.test(e)?s.outerHeight():s.outerWidth(),i=["padding",/ne|nw|n/.test(e)?"Top":/se|sw|s/.test(e)?"Bottom":/^e$/.test(e)?"Right":"Left"].join(""),t.css(i,s),this._proportionallyResize()),this._handles=this._handles.add(this.handles[e])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){o.resizing||(this.className&&(h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=h&&h[1]?h[1]:"se")}),n.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._addedHandles.remove()},_mouseCapture:function(t){var e,i,s=!1;for(e in this.handles)(i=z(this.handles[e])[0])!==t.target&&!z.contains(i,t.target)||(s=!0);return!this.options.disabled&&s},_mouseStart:function(t){var e,i,s,h=this.options,n=this.element;return this.resizing=!0,this._renderProxy(),e=this._num(this.helper.css("left")),i=this._num(this.helper.css("top")),h.containment&&(e+=z(h.containment).scrollLeft()||0,i+=z(h.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:e,top:i},this._helper||(s=this._calculateAdjustedElementDimensions(n)),this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:s.width,height:s.height},this.originalSize=this._helper?{width:n.outerWidth(),height:n.outerHeight()}:{width:s.width,height:s.height},this.sizeDiff={width:n.outerWidth()-n.width(),height:n.outerHeight()-n.height()},this.originalPosition={left:e,top:i},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof h.aspectRatio?h.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=z(".ui-resizable-"+this.axis).css("cursor"),z("body").css("cursor","auto"===s?this.axis+"-resize":s),this._addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var e=this.originalMousePosition,i=this.axis,s=t.pageX-e.left||0,e=t.pageY-e.top||0,i=this._change[i];return this._updatePrevProperties(),i&&(i=i.apply(this,[t,s,e]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),z.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges())),!1},_mouseStop:function(t){this.resizing=!1;var e,i,s,h=this.options,n=this;return this._helper&&(i=(e=(i=this._proportionallyResizeElements).length&&/textarea/i.test(i[0].nodeName))&&this._hasScroll(i[0],"left")?0:n.sizeDiff.height,e=e?0:n.sizeDiff.width,e={width:n.helper.width()-e,height:n.helper.height()-i},i=parseFloat(n.element.css("left"))+(n.position.left-n.originalPosition.left)||null,s=parseFloat(n.element.css("top"))+(n.position.top-n.originalPosition.top)||null,h.animate||this.element.css(z.extend(e,{top:s,left:i})),n.helper.height(n.size.height),n.helper.width(n.size.width),this._helper)&&!h.animate&&this._proportionallyResize(),z("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.helper.css(t),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px",this.helper.width(t.width)),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px",this.helper.height(t.height)),t},_updateVirtualBoundaries:function(t){var e,i,s,h=this.options,h={minWidth:this._isNumber(h.minWidth)?h.minWidth:0,maxWidth:this._isNumber(h.maxWidth)?h.maxWidth:1/0,minHeight:this._isNumber(h.minHeight)?h.minHeight:0,maxHeight:this._isNumber(h.maxHeight)?h.maxHeight:1/0};(this._aspectRatio||t)&&(t=h.minHeight*this.aspectRatio,i=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,s=h.maxWidth/this.aspectRatio,h.minWidth<t&&(h.minWidth=t),h.minHeight<i&&(h.minHeight=i),e<h.maxWidth&&(h.maxWidth=e),s<h.maxHeight)&&(h.maxHeight=s),this._vBoundaries=h},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,h=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,n=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,o=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,a=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,r=/sw|nw|w/.test(i),i=/nw|ne|n/.test(i);return n&&(t.width=e.minWidth),o&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),h&&(t.height=e.maxHeight),n&&r&&(t.left=a-e.minWidth),s&&r&&(t.left=a-e.maxWidth),o&&i&&(t.top=l-e.minHeight),h&&i&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],h=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];e<4;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(h[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_calculateAdjustedElementDimensions:function(t){var e,i,s=t.get(0);return"content-box"!==t.css("box-sizing")||!this._hasScroll(s)&&!this._hasScroll(s,"left")?{height:parseFloat(t.css("height")),width:parseFloat(t.css("width"))}:(e=parseFloat(s.style.width),s=parseFloat(s.style.height),i=this._getPaddingPlusBorderDimensions(t),e=isNaN(e)?this._getElementTheoreticalSize(t,i,"width"):e,{height:isNaN(s)?this._getElementTheoreticalSize(t,i,"height"):s,width:e})},_getElementTheoreticalSize:function(t,e,i){return Math.max(0,Math.ceil(t.get(0)["offset"+i[0].toUpperCase()+i.slice(1)]-e[i]-.5))||0},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;e<this._proportionallyResizeElements.length;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,e=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||z("<div></div>").css({overflow:"hidden"}),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++e.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize;return{left:this.originalPosition.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize;return{top:this.originalPosition.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(t,e,i){return z.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,e,i]))},sw:function(t,e,i){return z.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,e,i]))},ne:function(t,e,i){return z.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,e,i]))},nw:function(t,e,i){return z.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,e,i]))}},_propagate:function(t,e){z.ui.plugin.call(this,t,[e,this.ui()]),"resize"!==t&&this._trigger(t,e,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),z.ui.plugin.add("resizable","animate",{stop:function(e){var i=z(this).resizable("instance"),t=i.options,s=i._proportionallyResizeElements,h=s.length&&/textarea/i.test(s[0].nodeName),n=h&&i._hasScroll(s[0],"left")?0:i.sizeDiff.height,h=h?0:i.sizeDiff.width,h={width:i.size.width-h,height:i.size.height-n},n=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,o=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(z.extend(h,o&&n?{top:o,left:n}:{}),{duration:t.animateDuration,easing:t.animateEasing,step:function(){var t={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};s&&s.length&&z(s[0]).css({width:t.width,height:t.height}),i._updateCache(t),i._propagate("resize",e)}})}}),z.ui.plugin.add("resizable","containment",{start:function(){var i,s,t,e,h=z(this).resizable("instance"),n=h.options,o=h.element,n=n.containment,o=n instanceof z?n.get(0):/parent/.test(n)?o.parent().get(0):n;o&&(h.containerElement=z(o),/document/.test(n)||n===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:z(document),left:0,top:0,width:z(document).width(),height:z(document).height()||document.body.parentNode.scrollHeight}):(i=z(o),s=[],z(["Top","Right","Left","Bottom"]).each(function(t,e){s[t]=h._num(i.css("padding"+e))}),h.containerOffset=i.offset(),h.containerPosition=i.position(),h.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=h.containerOffset,e=h.containerSize.height,t=h.containerSize.width,t=h._hasScroll(o,"left")?o.scrollWidth:t,e=h._hasScroll(o)?o.scrollHeight:e,h.parentData={element:o,left:n.left,top:n.top,width:t,height:e}))},resize:function(t){var e=z(this).resizable("instance"),i=e.options,s=e.containerOffset,h=e.position,t=e._aspectRatio||t.shiftKey,n={top:0,left:0},o=e.containerElement,a=!0;o[0]!==document&&/static/.test(o.css("position"))&&(n=s),h.left<(e._helper?s.left:0)&&(e.size.width=e.size.width+(e._helper?e.position.left-s.left:e.position.left-n.left),t&&(e.size.height=e.size.width/e.aspectRatio,a=!1),e.position.left=i.helper?s.left:0),h.top<(e._helper?s.top:0)&&(e.size.height=e.size.height+(e._helper?e.position.top-s.top:e.position.top),t&&(e.size.width=e.size.height*e.aspectRatio,a=!1),e.position.top=e._helper?s.top:0),o=e.containerElement.get(0)===e.element.parent().get(0),i=/relative|absolute/.test(e.containerElement.css("position")),o&&i?(e.offset.left=e.parentData.left+e.position.left,e.offset.top=e.parentData.top+e.position.top):(e.offset.left=e.element.offset().left,e.offset.top=e.element.offset().top),h=Math.abs(e.sizeDiff.width+(e._helper?e.offset.left-n.left:e.offset.left-s.left)),o=Math.abs(e.sizeDiff.height+(e._helper?e.offset.top-n.top:e.offset.top-s.top)),h+e.size.width>=e.parentData.width&&(e.size.width=e.parentData.width-h,t)&&(e.size.height=e.size.width/e.aspectRatio,a=!1),o+e.size.height>=e.parentData.height&&(e.size.height=e.parentData.height-o,t)&&(e.size.width=e.size.height*e.aspectRatio,a=!1),a||(e.position.left=e.prevPosition.left,e.position.top=e.prevPosition.top,e.size.width=e.prevSize.width,e.size.height=e.prevSize.height)},stop:function(){var t=z(this).resizable("instance"),e=t.options,i=t.containerOffset,s=t.containerPosition,h=t.containerElement,n=z(t.helper),o=n.offset(),a=n.outerWidth()-t.sizeDiff.width,n=n.outerHeight()-t.sizeDiff.height;t._helper&&!e.animate&&/relative/.test(h.css("position"))&&z(this).css({left:o.left-s.left-i.left,width:a,height:n}),t._helper&&!e.animate&&/static/.test(h.css("position"))&&z(this).css({left:o.left-s.left-i.left,width:a,height:n})}}),z.ui.plugin.add("resizable","alsoResize",{start:function(){var i=z(this).resizable("instance"),t=i.options;z(t.alsoResize).each(function(){var t=z(this),e=i._calculateAdjustedElementDimensions(t);t.data("ui-resizable-alsoresize",{width:e.width,height:e.height,left:parseFloat(t.css("left")),top:parseFloat(t.css("top"))})})},resize:function(t,i){var e=z(this).resizable("instance"),s=e.options,h=e.originalSize,n=e.originalPosition,o={height:e.size.height-h.height||0,width:e.size.width-h.width||0,top:e.position.top-n.top||0,left:e.position.left-n.left||0};z(s.alsoResize).each(function(){var t=z(this),s=z(this).data("ui-resizable-alsoresize"),h={},e=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];z.each(e,function(t,e){var i=(s[e]||0)+(o[e]||0);i&&0<=i&&(h[e]=i||null)}),t.css(h)})},stop:function(){z(this).removeData("ui-resizable-alsoresize")}}),z.ui.plugin.add("resizable","ghost",{start:function(){var t=z(this).resizable("instance"),e=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}),t._addClass(t.ghost,"ui-resizable-ghost"),!0===z.uiBackCompat&&"string"==typeof t.options.ghost&&t.ghost.addClass(this.options.ghost),t.ghost.appendTo(t.helper)},resize:function(){var t=z(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=z(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),z.ui.plugin.add("resizable","grid",{resize:function(){var t,e=z(this).resizable("instance"),i=e.options,s=e.size,h=e.originalSize,n=e.originalPosition,o=e.axis,a="number"==typeof i.grid?[i.grid,i.grid]:i.grid,l=a[0]||1,r=a[1]||1,p=Math.round((s.width-h.width)/l)*l,s=Math.round((s.height-h.height)/r)*r,d=h.width+p,g=h.height+s,u=i.maxWidth&&i.maxWidth<d,c=i.maxHeight&&i.maxHeight<g,f=i.minWidth&&i.minWidth>d,m=i.minHeight&&i.minHeight>g;i.grid=a,f&&(d+=l),m&&(g+=r),u&&(d-=l),c&&(g-=r),/^(se|s|e)$/.test(o)?(e.size.width=d,e.size.height=g):/^(ne)$/.test(o)?(e.size.width=d,e.size.height=g,e.position.top=n.top-s):/^(sw)$/.test(o)?(e.size.width=d,e.size.height=g,e.position.left=n.left-p):((g-r<=0||d-l<=0)&&(t=e._getPaddingPlusBorderDimensions(this)),0<g-r?(e.size.height=g,e.position.top=n.top-s):(g=r-t.height,e.size.height=g,e.position.top=n.top+h.height-g),0<d-l?(e.size.width=d,e.position.left=n.left-p):(d=l-t.width,e.size.width=d,e.position.left=n.left+h.width-d))}}),z.ui.resizable});;
/*!
 * jQuery UI Dialog 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(i=>{"function"==typeof define&&define.amd?define(["jquery","./button","./draggable","./mouse","./resizable","../focusable","../keycode","../position","../tabbable","../unique-id","../version","../widget"],i):i(jQuery)})(function(l){return l.widget("ui.dialog",{version:"1.14.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(i){var t=l(this).css(i).offset().top;t<0&&l(this).css("top",i.top-t)}},resizable:!0,show:null,title:null,uiDialogTitleHeadingLevel:0,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&l.fn.draggable&&this._makeDraggable(),this.options.resizable&&l.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var i=this.options.appendTo;return i&&(i.jquery||i.nodeType)?l(i):this.document.find(i||"body").eq(0)},_destroy:function(){var i,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(i=t.parent.children().eq(t.index)).length&&i[0]!==this.element[0]?i.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:l.noop,enable:l.noop,close:function(i){var t=this;this._isOpen&&!1!==this._trigger("beforeClose",i)&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||l(this.document[0].activeElement).trigger("blur"),this._hide(this.uiDialog,this.options.hide,function(){t._trigger("close",i)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(i,t){var e=!1,o=this.uiDialog.siblings(".ui-front:visible").map(function(){return+l(this).css("z-index")}).get(),o=Math.max.apply(null,o);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),e=!0),e&&!t&&this._trigger("focus",i),e},open:function(){var i=this;this._isOpen?this._moveToTop()&&this._focusTabbable():(this._isOpen=!0,this.opener=l(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){i._focusTabbable(),i._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"))},_focusTabbable:function(){var i=this._focusedElement;(i=(i=(i=(i=(i=i||this.element.find("[autofocus]")).length?i:this.element.find(":tabbable")).length?i:this.uiDialogButtonPane.find(":tabbable")).length?i:this.uiDialogTitlebarClose.filter(":tabbable")).length?i:this.uiDialog).eq(0).trigger("focus")},_restoreTabbableFocus:function(){var i=this.document[0].activeElement;this.uiDialog[0]===i||l.contains(this.uiDialog[0],i)||this._focusTabbable()},_keepFocus:function(i){i.preventDefault(),this._restoreTabbableFocus()},_createWrapper:function(){this.uiDialog=l("<div>").hide().attr({tabIndex:-1,role:"dialog","aria-modal":this.options.modal?"true":null}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(i){var t,e,o;this.options.closeOnEscape&&!i.isDefaultPrevented()&&i.keyCode&&i.keyCode===l.ui.keyCode.ESCAPE?(i.preventDefault(),this.close(i)):i.keyCode!==l.ui.keyCode.TAB||i.isDefaultPrevented()||(t=this.uiDialog.find(":tabbable"),e=t.first(),o=t.last(),i.target!==o[0]&&i.target!==this.uiDialog[0]||i.shiftKey?i.target!==e[0]&&i.target!==this.uiDialog[0]||!i.shiftKey||(this._delay(function(){o.trigger("focus")}),i.preventDefault()):(this._delay(function(){e.trigger("focus")}),i.preventDefault()))},mousedown:function(i){this._moveToTop(i)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){this.uiDialogTitlebar=l("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(i){l(i.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=l("<button type='button'></button>").button({label:l("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(i){i.preventDefault(),this.close(i)}});var i=Number.isInteger(this.options.uiDialogTitleHeadingLevel)&&0<this.options.uiDialogTitleHeadingLevel&&this.options.uiDialogTitleHeadingLevel<=6?"h"+this.options.uiDialogTitleHeadingLevel:"span",i=l("<"+i+">").uniqueId().prependTo(this.uiDialogTitlebar);this._addClass(i,"ui-dialog-title"),this._title(i),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":i.attr("id")})},_title:function(i){this.options.title?i.text(this.options.title):i.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=l("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=l("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var o=this,i=this.options.buttons;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),l.isEmptyObject(i)||Array.isArray(i)&&!i.length?this._removeClass(this.uiDialog,"ui-dialog-buttons"):(l.each(i,function(i,t){var e;t=l.extend({type:"button"},t="function"==typeof t?{click:t,text:i}:t),e=t.click,i={icon:t.icon,iconPosition:t.iconPosition,showLabel:t.showLabel,icons:t.icons,text:t.text},delete t.click,delete t.icon,delete t.iconPosition,delete t.showLabel,delete t.icons,"boolean"==typeof t.text&&delete t.text,l("<button></button>",t).button(i).appendTo(o.uiButtonSet).on("click",function(){e.apply(o.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){var s=this,n=this.options;function a(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(i,t){s._addClass(l(this),"ui-dialog-dragging"),s._blockFrames(),s._trigger("dragStart",i,a(t))},drag:function(i,t){s._trigger("drag",i,a(t))},stop:function(i,t){var e=t.offset.left-s.document.scrollLeft(),o=t.offset.top-s.document.scrollTop();n.position={my:"left top",at:"left"+(0<=e?"+":"")+e+" top"+(0<=o?"+":"")+o,of:s.window},s._removeClass(l(this),"ui-dialog-dragging"),s._unblockFrames(),s._trigger("dragStop",i,a(t))}})},_makeResizable:function(){var s=this,n=this.options,i=n.resizable,t=this.uiDialog.css("position"),i="string"==typeof i?i:"n,e,s,w,se,sw,ne,nw";function a(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:n.maxWidth,maxHeight:n.maxHeight,minWidth:n.minWidth,minHeight:this._minHeight(),handles:i,start:function(i,t){s._addClass(l(this),"ui-dialog-resizing"),s._blockFrames(),s._trigger("resizeStart",i,a(t))},resize:function(i,t){s._trigger("resize",i,a(t))},stop:function(i,t){var e=s.uiDialog.offset(),o=e.left-s.document.scrollLeft(),e=e.top-s.document.scrollTop();n.height=s.uiDialog.height(),n.width=s.uiDialog.width(),n.position={my:"left top",at:"left"+(0<=o?"+":"")+o+" top"+(0<=e?"+":"")+e,of:s.window},s._removeClass(l(this),"ui-dialog-resizing"),s._unblockFrames(),s._trigger("resizeStop",i,a(t))}}).css("position",t)},_trackFocus:function(){this._on(this.widget(),{focusin:function(i){this._makeFocusTarget(),this._focusedElement=l(i.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var i=this._trackingInstances(),t=l.inArray(this,i);-1!==t&&i.splice(t,1)},_trackingInstances:function(){var i=this.document.data("ui-dialog-instances");return i||this.document.data("ui-dialog-instances",i=[]),i},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(){var i=this.uiDialog.is(":visible");i||this.uiDialog.show(),this.uiDialog.position(this.options.position),i||this.uiDialog.hide()},_setOptions:function(i){var e=this,o=!1,s={};l.each(i,function(i,t){e._setOption(i,t),i in e.sizeRelatedOptions&&(o=!0),i in e.resizableRelatedOptions&&(s[i]=t)}),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(i,t){var e,o=this.uiDialog;"disabled"!==i&&(this._super(i,t),"appendTo"===i&&this.uiDialog.appendTo(this._appendTo()),"buttons"===i&&this._createButtons(),"closeText"===i&&this.uiDialogTitlebarClose.button({label:l("<a>").text(""+this.options.closeText).html()}),"draggable"===i&&((e=o.is(":data(ui-draggable)"))&&!t&&o.draggable("destroy"),!e)&&t&&this._makeDraggable(),"position"===i&&this._position(),"resizable"===i&&((e=o.is(":data(ui-resizable)"))&&!t&&o.resizable("destroy"),e&&"string"==typeof t&&o.resizable("option","handles",t),e||!1===t||this._makeResizable()),"title"===i&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")),"modal"===i)&&o.attr("aria-modal",t?"true":null)},_size:function(){var i,t,e,o=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),o.minWidth>o.width&&(o.width=o.minWidth),i=this.uiDialog.css({height:"auto",width:o.width}).outerHeight(),t=Math.max(0,o.minHeight-i),e="number"==typeof o.maxHeight?Math.max(0,o.maxHeight-i):"none","auto"===o.height?this.element.css({minHeight:t,maxHeight:e,height:"auto"}):this.element.height(Math.max(0,o.height-i)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var i=l(this);return l("<div>").css({position:"absolute",width:i.outerWidth(),height:i.outerHeight()}).appendTo(i.parent()).offset(i.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(i){return!!l(i.target).closest(".ui-dialog").length||!!l(i.target).closest(".ui-datepicker").length},_createOverlay:function(){var e;this.options.modal&&(e=!0,this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this.document.on("focusin.ui-dialog",function(i){var t;e||(t=this._trackingInstances()[0])._allowInteraction(i)||(i.preventDefault(),t._focusTabbable())}.bind(this)),this.overlay=l("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1))},_destroyOverlay:function(){var i;this.options.modal&&this.overlay&&((i=this.document.data("ui-dialog-overlays")-1)?this.document.data("ui-dialog-overlays",i):(this.document.off("focusin.ui-dialog"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null)}}),!0===l.uiBackCompat&&l.widget("ui.dialog",l.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(i,t){"dialogClass"===i&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}}),l.ui.dialog});;
/**
 * @file
 * Fix conflict with jquery.ui focusin event handling in dialogs.
 */
(function ($) {

  'use strict';

  /**
   * Override the _allowInteraction() extension point.
   *
   * @see https://api.jqueryui.com/dialog/#method-_allowInteraction
   * @see https://bugs.jqueryui.com/ticket/9087/
   */
  $.widget('ui.dialog', $.ui.dialog, {
    _allowInteraction: function _allowInteraction(event) {
      // The CKEditor 5 balloon toolbar is outside the modal container, by
      // specifying CKEditor elements as allowed-interaction outside the modal,
      // the balloon buttons can be clicked. All editor form elements, like
      // buttons in balloon toolbars get the "ck" class.
      if ($(event.target).hasClass('ck')) {
        return true;
      }
      return this._super(event);
    }
  });

})(jQuery);
;
/**
 * @file
 *
 * Dialog API inspired by HTML5 dialog element:
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#the-dialog-element
 */
(function ($) {

"use strict";

Backdrop.settings.dialog = {
  // This option will turn off resizable and draggable.
  autoResize: true,
  // jQuery UI does not support percentage heights, but we convert this property
  // in the resetPosition() function.
  maxHeight: '95%',
  // jQuery UI defaults to 300px, use 100% width to allow for responsive
  // dialogs. CSS can override by specifying a max-width.
  width: '100%',
  position: { my: "center", at: "center", of: window },
  close: function (e) {
    Backdrop.detachBehaviors(e.target, null, 'unload');
  }
};

Backdrop.dialog = function (element, options) {

  function openDialog (settings) {
    settings = $.extend({}, Backdrop.settings.dialog, options, settings);
    settings.beforeClose = beforeClose;

    // Add class to the page to modify overall page display.
    $('html').addClass('dialog-open');

    // Trigger a global event to allow scripts to bind events to the dialog.
    $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
    $element.dialog(settings);

    if (settings.autoResize === true || settings.autoResize === 'true') {
      // Add a class specifically to help to lock scrolling.
      $('html').addClass('dialog-auto-resize');

      // Callback function for positioning the dialog on resize/scroll.
      var resetPosition = function() {
        var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'];
        var windowHeight = $(window).height();
        var adjustedOptions = {};
        var option, optionValue, adjustedValue;
        for (var n = 0; n < positionOptions.length; n++) {
          option = positionOptions[n];
          optionValue = settings[option];
          if (optionValue) {
            // jQuery UI does not support percentages on heights, convert to pixels.
            if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
              adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);
              // Don't force the dialog to be bigger vertically than needed.
              if (option === 'height' && $element.parent().outerHeight() < adjustedValue) {
                adjustedValue = 'auto';
              }
              adjustedOptions[option] = adjustedValue;
            }
            else {
              adjustedOptions[option] = optionValue;
            }
          }
        }
        $element.dialog('option', adjustedOptions);
      };

      // If auto-resized, it can't be manually resized or moved.
      $element
        .dialog('option', {
            resizable: false,
            draggable: false
        })
        .dialog('widget').css('position', 'fixed');
      Backdrop.optimizedResize.add(resetPosition, 'dialogResize.' + dialogId);

      // Because of Chromium's behavior, we must wait until the ajax-loaded
      // jquery.ui.dialog.css is applied.
      var computedStyle = getComputedStyle($element[0]);
      var waitForCss = function(counter) {
        var cssOverflowProperty = computedStyle.getPropertyValue('overflow');
        // If the overflow is not 'auto' or 'hidden' yet, schedule this function
        // again, but prevent infinite loops for dialogs that use a different
        // overflow. 
        if (cssOverflowProperty != 'auto' && cssOverflowProperty != 'hidden' && counter < 10) {
          setTimeout(waitForCss, 10, ++counter);
        }
        else {
          resetPosition();
        }
      }
      setTimeout(waitForCss, 0, 0);
    }
    dialog.open = true;
    $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
  }

  function closeDialog (value) {
    $(window).trigger('dialog:beforeclose', [dialog, $element]);
    $element.dialog('close');
    dialog.returnValue = value;
    dialog.open = false;
    $(window).trigger('dialog:afterclose', [dialog, $element]);
  }

  /**
   * jQuery UI callback fired just before closing the dialog.
   *
   * This callback fires in all situations where the modal is closed, rather
   * than only through the Backdrop dialog API. For example hitting the escape
   * key or using the close button, which are triggered by jQuery UI directly.
   */
  function beforeClose (event, ui) {
    $('html').removeClass('dialog-open dialog-auto-resize');
    Backdrop.optimizedResize.remove('dialogResize.' + dialogId);
  }

  var undef;
  var $element = $(element);

  // Generate a dialog ID based on the microsecond the dialog was created.
  // When binding and unbinding window resize events, we use this ID to track
  // each individual dialog.
  var dialogId = Date.now().toString();

  var dialog = {
    open: false,
    returnValue: undef,
    show: function () {
      openDialog({modal: false});
    },
    showModal: function () {
      openDialog({modal: true});
    },
    close: closeDialog
  };

  return dialog;
};

})(jQuery);
;
/**
 * @file
 * Extends the Backdrop AJAX functionality to integrate the dialog API.
 */

(function ($) {

"use strict";

Backdrop.behaviors.dialog = {
  attach: function (context) {
    // Provide a known 'backdrop-modal' DOM element for Backdrop-based modal
    // dialogs. Non-modal dialogs are responsible for creating their own
    // elements, since there can be multiple non-modal dialogs at a time.
    if (!$('#backdrop-modal').length) {
      $('<div id="backdrop-modal" />').hide().appendTo('body');
    }

    // Special behaviors specific when attaching content within a dialog.
    // These behaviors usually fire after a validation error inside a dialog.
    var $dialog = $(context).closest('.ui-dialog-content');
    if ($dialog.length) {
      // Remove and replace the dialog buttons with those from the new form.
      if ($dialog.dialog('option', 'backdropAutoButtons')) {
        // Trigger an event to detect/sync changes to buttons.
        $dialog.trigger('dialogButtonsChange');
      }

      // Force focus on the modal when the behavior is run.
      $dialog.dialog('widget').trigger('focus');
    }
  },

  /**
   * Scan a dialog for any primary buttons and move them to the button area.
   *
   * @param $dialog
   *   An jQuery object containing the element that is the dialog target.
   * @return
   *   An array of buttons that need to be added to the button area.
   */
  prepareDialogButtons: function ($dialog) {
    var buttons = [];
    var $buttons = $dialog.find('.form-actions input[type=submit], .form-actions a.button');
    $buttons.each(function () {
      // Hidden form buttons need special attention. For browser consistency,
      // the button needs to be "visible" in order to have the enter key fire
      // the form submit event. So instead of a simple "hide" or
      // "display: none", we set its dimensions to zero.
      // See http://mattsnider.com/how-forms-submit-when-pressing-enter/
      var $originalButton = $(this).css({
        width: 0,
        height: 0,
        padding: 0,
        border: 0,
        overflow: 'hidden'
      });
      buttons.push({
        'text': $originalButton.html() || $originalButton.attr('value'),
        'class': $originalButton.attr('class'),
        'click': function (e) {
          $originalButton.trigger('mousedown').trigger('click').trigger('mouseup');
          e.preventDefault();
        }
      });
    });
    return buttons;
  }
};

/**
 * Command to open a dialog.
 */
Backdrop.ajax.prototype.commands.openDialog = function (ajax, response, status) {
  if (!response.selector) {
    return false;
  }
  var $dialog = $(response.selector);
  if (!$dialog.length) {
    // Create the element if needed.
    $dialog = $('<div id="' + response.selector.replace(/^#/, '') + '"/>').appendTo('body');
  }
  // Set up the wrapper, if there isn't one.
  if (!ajax.wrapper) {
    ajax.wrapper = $dialog.attr('id');
  }

  // Use the ajax.js insert command to populate the dialog contents.
  response.command = 'insert';
  response.method = 'html';
  ajax.commands.insert(ajax, response, status);

  // Move the buttons to the jQuery UI dialog buttons area.
  if (!response.dialogOptions.buttons) {
    response.dialogOptions.backdropAutoButtons = true;
    response.dialogOptions.buttons = Backdrop.behaviors.dialog.prepareDialogButtons($dialog);
  }

  // Bind dialogButtonsChange
  $dialog.on('dialogButtonsChange', function () {
    var buttons = Backdrop.behaviors.dialog.prepareDialogButtons($dialog);
    $dialog.dialog('option', 'buttons', buttons);
  });

  // Open the dialog itself.
  response.dialogOptions = response.dialogOptions || {};
  var dialog = Backdrop.dialog($dialog, response.dialogOptions);
  if (response.dialogOptions.modal) {
    dialog.showModal();
  }
  else {
    dialog.show();
  }

  // Add the standard Backdrop class for buttons for style consistency.
  $dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions');
};

/**
 * Command to close a dialog.
 *
 * If no selector is given, it defaults to trying to close the modal.
 */
Backdrop.ajax.prototype.commands.closeDialog = function (ajax, response, status) {
  var $dialog = $(response.selector);
  if ($dialog.length) {
    Backdrop.dialog($dialog).close();
  }

  // Unbind dialogButtonsChange
  $dialog.off('dialogButtonsChange');
};

/**
 * Command to set a dialog property.
 *
 * jQuery UI specific way of setting dialog options.
 */
Backdrop.ajax.prototype.commands.setDialogOption = function (ajax, response, status) {
  var $dialog = $(response.selector);
  if ($dialog.length) {
    $dialog.dialog('option', response.optionName, response.optionValue);
  }
};

/**
 * Binds a listener on dialog creation to handle the cancel link.
 */
$(window).on('dialog:aftercreate', function (e, dialog, $element, settings) {
  $element.on('click.dialog', '.dialog-cancel', function (e) {
    dialog.close('cancel');
    e.preventDefault();
    e.stopPropagation();
  });
});

/**
 * Removes all 'dialog' listeners.
 */
$(window).on('dialog:beforeclose', function (e, dialog, $element) {
  $element.off('.dialog');
});

})(jQuery);;
