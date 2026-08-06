(function ($) {

  /**
   * Makes icons available to JavaScript and CSS files.
   */
  Backdrop.behaviors.icons = {
    attach: function (context, settings) {
      if (!Backdrop.icons) {
        Backdrop.icons = [];
      }
      if (settings.icons) {
        for (const iconName in settings.icons) {
          const iconPath = settings.icons[iconName];
          Backdrop.addIcon(iconName, iconPath);
        }
      }
    }
  };

  /**
   * Add an individual icon to the Backdrop.icons namespace.
   *
   * This also makes the icon path available within CSS files via a CSS
   * variable by the name --icon-[icon-name].
   */
  Backdrop.addIcon = function (iconName, iconPath) {
    Backdrop.icons[iconName] = iconPath;
    document.documentElement.style.setProperty('--icon-' + iconName, 'url(' + iconPath + ')');
  };

})(jQuery);
;
/**
 * @file
 * Sets the compatibility flag for jQuery UI back to true.
 *
 * Core still uses "dialogClass" option, which is deprecated and since jQuery UI
 * version 1.14.0 this flag defaults to false.
 */
(function ($) {
  $.uiBackCompat = true;
})(jQuery);
;
/*!
 * jQuery UI :data 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(r){return r.extend(r.expr.pseudos,{data:r.expr.createPseudo(function(n){return function(e){return!!r.data(e,n)}})})});;
/*!
 * jQuery UI Disable Selection 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(e){return e.fn.extend({disableSelection:(n="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(n+".ui-disableSelection",function(e){e.preventDefault()})}),enableSelection:function(){return this.off(".ui-disableSelection")}});var n});;
/*!
 * jQuery UI Labels 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)})(function(t){return t.fn.labels=function(){var t,e,s;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),(t=this.attr("id"))&&(s=(s=this.eq(0).parents().last()).add((s.length?s:this).siblings()),t="label[for='"+CSS.escape(t)+"']",e=e.add(s.find(t).addBack(t))),this.pushStack(e)):this.pushStack([])}});;
/*!
 * jQuery UI Scroll Parent 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(s){return s.fn.scrollParent=function(e){var t=this.css("position"),n="absolute"===t,o=e?/(auto|scroll|hidden)/:/(auto|scroll)/,e=this.parents().filter(function(){var e=s(this);return(!n||"static"!==e.css("position"))&&o.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==t&&e.length?e:s(this[0].ownerDocument||document)}});;
/*!
 * jQuery UI Tabbable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version","./focusable"],e):e(jQuery)})(function(t){return t.extend(t.expr.pseudos,{tabbable:function(e){var n=t.attr(e,"tabindex"),u=null!=n;return(!u||0<=n)&&t.ui.focusable(e,u)}})});;
/*!
 * jQuery UI Unique ID 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(i=>{"function"==typeof define&&define.amd?define(["jquery","./version"],i):i(jQuery)})(function(i){return i.fn.extend({uniqueId:(e=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&i(this).removeAttr("id")})}});var e});;
(e=>{"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){return e.ui=e.ui||{},e.ui.version="1.14.1"});;
/*!
 * jQuery UI Legacy jQuery Core patches 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(e){e.escapeSelector||(e.escapeSelector=function(e){return CSS.escape(e+"")}),e.fn.even&&e.fn.odd||e.fn.extend({even:function(){return this.filter(function(e){return e%2==0})},odd:function(){return this.filter(function(e){return e%2==1})}})});;
/*!
 * jQuery UI Focusable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(o){return o.ui.focusable=function(e,i){var t,n,s,a=e.nodeName.toLowerCase();return"area"===a?(s=(t=e.parentNode).name,!(!e.href||!s||"map"!==t.nodeName.toLowerCase())&&0<(t=o("img[usemap='#"+s+"']")).length&&t.is(":visible")):(/^(input|select|textarea|button|object)$/.test(a)?(n=!e.disabled)&&(s=o(e).closest("fieldset")[0])&&(n=!s.disabled):n="a"===a&&e.href||i,n&&o(e).is(":visible")&&"visible"===o(e).css("visibility"))},o.extend(o.expr.pseudos,{focusable:function(e){return o.ui.focusable(e,null!=o.attr(e,"tabindex"))}}),o.ui.focusable});;
/*!
 * jQuery UI Form Reset Mixin 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(r){return r.ui.formResetMixin={_formResetHandler:function(){var t=r(this);setTimeout(function(){var e=t.data("ui-form-reset-instances");r.each(e,function(){this.refresh()})})},_bindFormResetHandler:function(){var e;this.form=r(this.element.prop("form")),this.form.length&&((e=this.form.data("ui-form-reset-instances")||[]).length||this.form.on("reset.ui-form-reset",this._formResetHandler),e.push(this),this.form.data("ui-form-reset-instances",e))},_unbindFormResetHandler:function(){var e;this.form.length&&((e=this.form.data("ui-form-reset-instances")).splice(r.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))}}});;
/*!
 * jQuery UI Keycode 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(E=>{"function"==typeof define&&define.amd?define(["jquery","./version"],E):E(jQuery)})(function(E){return E.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});;
(e=>{"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)})(function(t){return t.ui.plugin={add:function(e,n,i){var o,p=t.ui[e].prototype;for(o in i)p.plugins[o]=p.plugins[o]||[],p.plugins[o].push([n,i[o]])},call:function(e,n,i,o){var p,t=e.plugins[n];if(t&&(o||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(p=0;p<t.length;p++)e.options[t[p][0]]&&t[p][1].apply(e.element,i)}}});;
/*!
 * jQuery UI Widget 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)})(function(u){var n,i=0,a=Array.prototype.hasOwnProperty,r=Array.prototype.slice;return u.cleanData=(n=u.cleanData,function(t){for(var e,i,s=0;null!=(i=t[s]);s++)(e=u._data(i,"events"))&&e.remove&&u(i).triggerHandler("remove");n(t)}),u.widget=function(t,i,e){var s,n,o,a,r={},l=t.split(".")[0];return"__proto__"===(t=t.split(".")[1])||"constructor"===t?u.error("Invalid widget name: "+t):(a=l+"-"+t,e||(e=i,i=u.Widget),Array.isArray(e)&&(e=u.extend.apply(null,[{}].concat(e))),u.expr.pseudos[a.toLowerCase()]=function(t){return!!u.data(t,a)},u[l]=u[l]||{},s=u[l][t],n=u[l][t]=function(t,e){if(!this||!this._createWidget)return new n(t,e);arguments.length&&this._createWidget(t,e)},u.extend(n,s,{version:e.version,_proto:u.extend({},e),_childConstructors:[]}),(o=new i).options=u.widget.extend({},o.options),u.each(e,function(e,s){function n(){return i.prototype[e].apply(this,arguments)}function o(t){return i.prototype[e].apply(this,t)}r[e]="function"!=typeof s?s:function(){var t,e=this._super,i=this._superApply;return this._super=n,this._superApply=o,t=s.apply(this,arguments),this._super=e,this._superApply=i,t}}),n.prototype=u.widget.extend(o,{widgetEventPrefix:s&&o.widgetEventPrefix||t},r,{constructor:n,namespace:l,widgetName:t,widgetFullName:a}),s?(u.each(s._childConstructors,function(t,e){var i=e.prototype;u.widget(i.namespace+"."+i.widgetName,n,e._proto)}),delete s._childConstructors):i._childConstructors.push(n),u.widget.bridge(t,n),n)},u.widget.extend=function(t){for(var e,i,s=r.call(arguments,1),n=0,o=s.length;n<o;n++)for(e in s[n])i=s[n][e],a.call(s[n],e)&&void 0!==i&&(u.isPlainObject(i)?t[e]=u.isPlainObject(t[e])?u.widget.extend({},t[e],i):u.widget.extend({},i):t[e]=i);return t},u.widget.bridge=function(o,e){var a=e.prototype.widgetFullName||o;u.fn[o]=function(i){var t="string"==typeof i,s=r.call(arguments,1),n=this;return t?this.length||"instance"!==i?this.each(function(){var t,e=u.data(this,a);return"instance"===i?(n=e,!1):e?"function"!=typeof e[i]||"_"===i.charAt(0)?u.error("no such method '"+i+"' for "+o+" widget instance"):(t=e[i].apply(e,s))!==e&&void 0!==t?(n=t&&t.jquery?n.pushStack(t.get()):t,!1):void 0:u.error("cannot call methods on "+o+" prior to initialization; attempted to call method '"+i+"'")}):n=void 0:(s.length&&(i=u.widget.extend.apply(null,[i].concat(s))),this.each(function(){var t=u.data(this,a);t?(t.option(i||{}),t._init&&t._init()):u.data(this,a,new e(i,this))})),n}},u.Widget=function(){},u.Widget._childConstructors=[],u.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,e){e=u(e||this.defaultElement||this)[0],this.element=u(e),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=u(),this.hoverable=u(),this.focusable=u(),this.classesElementLookup={},e!==this&&(u.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=u(e.style?e.ownerDocument:e.document||e),this.window=u(this.document[0].defaultView||this.document[0].parentWindow)),this.options=u.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:u.noop,_create:u.noop,_init:u.noop,destroy:function(){var i=this;this._destroy(),u.each(this.classesElementLookup,function(t,e){i._removeClass(e,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:u.noop,widget:function(){return this.element},option:function(t,e){var i,s,n,o=t;if(0===arguments.length)return u.widget.extend({},this.options);if("string"==typeof t)if(o={},t=(i=t.split(".")).shift(),i.length){for(s=o[t]=u.widget.extend({},this.options[t]),n=0;n<i.length-1;n++)s[i[n]]=s[i[n]]||{},s=s[i[n]];if(t=i.pop(),1===arguments.length)return void 0===s[t]?null:s[t];s[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=e}return this._setOptions(o),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,s;for(e in t)s=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&s&&s.length&&(i=u(s.get()),this._removeClass(s,e),i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(n){var o=[],a=this;function t(t,e){for(var i,s=0;s<t.length;s++)i=a.classesElementLookup[t[s]]||u(),i=n.add?((()=>{var i=[];n.element.each(function(t,e){u.map(a.classesElementLookup,function(t){return t}).some(function(t){return t.is(e)})||i.push(e)}),a._on(u(i),{remove:"_untrackClassesElement"})})(),u(u.uniqueSort(i.get().concat(n.element.get())))):u(i.not(n.element).get()),a.classesElementLookup[t[s]]=i,o.push(t[s]),e&&n.classes[t[s]]&&o.push(n.classes[t[s]])}return(n=u.extend({element:this.element,classes:this.options.classes||{}},n)).keys&&t(n.keys.match(/\S+/g)||[],!0),n.extra&&t(n.extra.match(/\S+/g)||[]),o.join(" ")},_untrackClassesElement:function(i){var s=this;u.each(s.classesElementLookup,function(t,e){-1!==u.inArray(i.target,e)&&(s.classesElementLookup[t]=u(e.not(i.target).get()))}),this._off(u(i.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){var n="string"==typeof t||null===t,e={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s="boolean"==typeof s?s:i};return e.element.toggleClass(this._classes(e),s),this},_on:function(n,o,t){var a,r=this;"boolean"!=typeof n&&(t=o,o=n,n=!1),t?(o=a=u(o),this.bindings=this.bindings.add(o)):(t=o,o=this.element,a=this.widget()),u.each(t,function(t,e){function i(){if(n||!0!==r.options.disabled&&!u(this).hasClass("ui-state-disabled"))return("string"==typeof e?r[e]:e).apply(r,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||u.guid++);var t=t.match(/^([\w:-]*)\s*(.*)$/),s=t[1]+r.eventNamespace,t=t[2];t?a.on(s,t,i):o.on(s,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e),this.bindings=u(this.bindings.not(t).get()),this.focusable=u(this.focusable.not(t).get()),this.hoverable=u(this.hoverable.not(t).get())},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(u(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(u(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(u(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(u(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var s,n,o=this.options[t];if(i=i||{},(e=u.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],n=e.originalEvent)for(s in n)s in e||(e[s]=n[s]);return this.element.trigger(e,i),!("function"==typeof o&&!1===o.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},u.each({show:"fadeIn",hide:"fadeOut"},function(o,a){u.Widget.prototype["_"+o]=function(e,t,i){var s,n=(t="string"==typeof t?{effect:t}:t)?!0!==t&&"number"!=typeof t&&t.effect||a:o;"number"==typeof(t=t||{})?t={duration:t}:!0===t&&(t={}),s=!u.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),s&&u.effects&&u.effects.effect[n]?e[o](t):n!==o&&e[n]?e[n](t.duration,t.easing,i):e.queue(function(t){u(this)[o](),i&&i.call(e[0]),t()})}}),u.widget});;
/**
 * @file layout.admin.js
 *
 * Behaviors for editing a layout.
 */

(function ($) {

"use strict";

/**
 * Behavior for showing a list of layouts.
 *
 * Detect flexbox support for displaying our list of layouts with vertical
 * height matching for each row of layout template icons.
 */
Backdrop.behaviors.gridFloatFallback = {
  attach: function() {
    var $body = $('body');
    if (!$body.hasClass('grid-float-fallback-processed') && !Backdrop.featureDetect.flexbox()) {
      $('head').append('<link rel="stylesheet" type="text/css" href="/core/modules/layout/css/grid-float.css">');
      $body.addClass('grid-float-fallback-processed');
    }
  }
};

})(jQuery);
;
(function ($, window) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Backdrop uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Backdrop.ajax = Backdrop.ajax || {};

Backdrop.settings.urlIsAjaxTrusted = Backdrop.settings.urlIsAjaxTrusted || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Backdrop.behaviors.AJAX = {
  attach: function (context, settings) {

     function loadAjaxBehaviour(base) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (settings.ajax.hasOwnProperty(base)) {
        loadAjaxBehaviour(base);
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      // Allow any AJAX link to set the HTTP "Accept" header.
      element_settings.accepts = $(this).data('accepts');

      // Special handling if the data-dialog attribute is TRUE.
      if ($(this).data('dialog')) {
        element_settings.dialog = $(this).data('dialog-options') || {};
        element_settings.accepts = 'application/vnd.backdrop-dialog';
      }

      var base = $(this).attr('id');
      Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Backdrop.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Backdrop.behaviors attach block):
 * @code
 *    Backdrop.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Backdrop.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 *
 * @param string base
 *   The unique identifier for this AJAX object. Usually this is the ID of the
 *   HTML element receiving the newly generated HTML content.
 * @param DOMElement element
 *   The HTML DOM element that triggers the AJAX behavior. Usually this is an
 *   anchor tag or submit button, but it may be any type of DOM element.
 * @param object element_settings
 *   An object containing configuration for the AJAX behavior.
 */
Backdrop.ajax = function (base, element, element_settings) {
  var defaults = {
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Backdrop.t('Please wait...'),
      object: null,
      element: null
    },
    submit: {
      'js': true
    },
    currentRequests: []
  };

  $.extend(this, defaults, element_settings);

  // @todo Remove this after refactoring the PHP code to:
  //   - Call this 'selector'.
  //   - Include the '#' for ID-based selectors.
  //   - Support non-ID-based selectors.
  if (this.wrapper) {
    this.wrapper = '#' + this.wrapper;
  }

  // Ensure element is a DOM element (and not a jQuery object).
  if (element instanceof jQuery) {
    element = element.get(0);
  }

  this.element = element;
  this.element_settings = element_settings;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element && this.element.form) {
    this.form = $(this.element.form);
  }

  // If no Ajax callback URL was given, use the link href or form action.
  if (!this.url) {
    if ($(element).is('a')) {
      this.url = $(element).attr('href');
    }
    else if (element.form) {
      this.url = this.form.attr('action');
    }
  }

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (e.g. path/nojs?destination=foobar).
  // 4. /nojs# - Followed by a fragment (e.g.: path/nojs#myfragment).
  this.url = this.url.replace(/\/nojs(\/|$|\?|#)/g, '/ajax$1');

  // If the 'nojs' version of the URL is trusted, also trust the 'ajax' version.
  if (Backdrop.settings.urlIsAjaxTrusted[element_settings.url]) {
    Backdrop.settings.urlIsAjaxTrusted[this.url] = true;
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var currentAjaxRequestNumber = 0;
  var ajax = this;
  ajax.options = {
    url: Backdrop.sanitizeAjaxUrl(ajax.url),
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (jqXHR, options) {
      jqXHR.ajaxRequestNumber = ++currentAjaxRequestNumber;
      return ajax.beforeSend(jqXHR, options);
    },
    uploadProgress: function (event, position, total, percentComplete) {
      ajax.uploadProgress(event, position, total, percentComplete);
    },
    success: function (response, status, jqXHR) {
      // Skip success if this request has been superseded by a later request.
      if (jqXHR.ajaxRequestNumber < currentAjaxRequestNumber) {
        return false;
      }
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = JSON.parse(response);

        // Prior to invoking the response's commands, verify that they can be
        // trusted by checking for a response header. See
        // ajax_set_verification_header() for details.
        // - Empty responses are harmless so can bypass verification. This avoids
        //   an alert message for server-generated no-op responses that skip Ajax
        //   rendering.
        // - Ajax objects with trusted URLs (e.g., ones defined server-side via
        //   #ajax) can bypass header verification. This is especially useful for
        //   Ajax with multipart forms. Because IFRAME transport is used, the
        //   response headers cannot be accessed for verification.
        if (response !== null && !Backdrop.settings.urlIsAjaxTrusted[ajax.url]) {
          if (jqXHR.getResponseHeader('X-Backdrop-Ajax-Token') !== '1') {
            var customMessage = Backdrop.t("The response failed verification so will not be processed.");
            return ajax.error(jqXHR, ajax.url, customMessage);
          }
        }

      }
      return ajax.success(response, status, jqXHR);
    },
    complete: function (jqXHR, status) {
      ajax.cleanUp(jqXHR);
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(jqXHR, ajax.url);
      }
    },
    dataType: 'json',
    jsonp: false,
    accepts: {
      json: element_settings.accepts || 'application/vnd.backdrop-ajax'
    },
    type: 'POST'
  };
  if (element_settings.dialog) {
    ajax.options.data.dialogOptions = element_settings.dialog;
  }

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).on(element_settings.event, function (event) {
    if (!Backdrop.settings.urlIsAjaxTrusted[ajax.url] && !Backdrop.urlIsLocal(ajax.url)) {
      throw new Error(Backdrop.t('The callback URL is not local and not trusted: !url', {'!url': ajax.url}));
    }
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).on('keypress', function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).on(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and
 * SPACE is often used to activate an element without submitting.
 */
Backdrop.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Backdrop.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    $.error("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Backdrop.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Backdrop.settings;
    Backdrop.detachBehaviors(this.form, settings, 'serialize');

    // Ensure Backdrop isn't vulnerable to the bugs disclosed in the unmerged
    // pull request: https://github.com/jquery-form/form/pull/586.
    // - Under normal circumstances, the first if statement doesn't evaluate
    //   to true, because options.dataType is initialized in the Drupal.ajax()
    //   constructor.
    // - Under normal circumstances, the second if statement doesn't evaluate
    //   to true, because $.parseJSON is initialized by jQuery.
    if (!options.dataType && options.target) {
      delete options.target;
    }
    if (!$.parseJSON) {
      $.parseJSON = JSON.parse;
    }
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see backdrop_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Backdrop to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see backdrop_get_css()
  // @see backdrop_get_js()
  var pageState = Backdrop.settings.ajaxPageState;
  options.data['ajax_page_state[theme]'] = pageState.theme;
  options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
  for (var cssFile in pageState.css) {
    if (pageState.css.hasOwnProperty(cssFile)) {
      options.data['ajax_page_state[css][' + cssFile + ']'] = 1;
    }
  }
  for (var jsFile in pageState.js) {
    if (pageState.js.hasOwnProperty(jsFile)) {
      options.data['ajax_page_state[js][' + jsFile + ']'] = 1;
    }
  }

  // Provide an error if the dialog options can't be parsed.
  if (this.options.data.dialogOptions && typeof this.options.data.dialogOptions !== 'object') {
    $.error(Backdrop.t('The data-dialog-options property on this link is not valid JSON.'));
  }
};

/**
 * Modify form values prior to form submission.
 */
Backdrop.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Backdrop.ajax.prototype.beforeSend = function (jqXHR, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Backdrop.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress.
  if (this.disable !== false) {
    $(this.element).addClass('progress-disabled').prop('disabled', true);
  }

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Backdrop.progressBar('ajax-progress-' + this.element.id, $.noop, this.progress.method, $.noop);
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }

  // Register the AJAX request so it can be cancelled if needed.
  this.currentRequests.push(jqXHR);
};

/**
 * Handler for the updateProgress form event.
 */
Backdrop.ajax.prototype.uploadProgress = function (jqXHR, position, total, percentComplete) {
  if (this.progress.object) {
    var message = Backdrop.t('Uploading... (@current of @total)', {
      '@current': Backdrop.formatSize(position),
      '@total': Backdrop.formatSize(total)
    });
    this.progress.object.setProgress(percentComplete, message);
  }
};

/**
 * Handler for the form redirection completion.
 */
Backdrop.ajax.prototype.success = function (response, status, jqXHR) {
  // Remove the throbber and progress elements.
  this.cleanUp(jqXHR);

  // Process the response.
  Backdrop.freezeHeight();
  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i].command && this.commands[response[i].command]) {
       this.commands[response[i].command](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Backdrop.settings;
    Backdrop.attachBehaviors(this.form, settings);
  }

  Backdrop.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Clean up after an AJAX response, success or failure.
 */
Backdrop.ajax.prototype.cleanUp = function (jqXHR) {
  // Remove the AJAX request from the current list.
  var index = this.currentRequests.indexOf(jqXHR);
  if (index > -1) {
    this.currentRequests.splice(index, 1);
  }

  // Remove the progress element (bar or throbber).
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  // Stop monitoring of the progress bar if present (bar only).
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
    this.progress.object = null;
  }

  // Reactivate the triggering element.
  if (this.disable !== false) {
    $(this.element).removeClass('progress-disabled').prop('disabled', false);
  }
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Backdrop.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Backdrop.ajax.prototype.error = function (jqXHR, uri) {
  this.cleanUp(jqXHR);

  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = this.settings || Backdrop.settings;
    Backdrop.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Backdrop.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);
    var settings;

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly interpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data.replace(/^\s+|\s+$/g, ''));
    var new_content = new_content_wrapped.children();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        settings = response.settings || ajax.settings || Backdrop.settings;
        Backdrop.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was
    // successfully added to the page and the elements not part of a larger form
    // (in which case they'll be processed all at once in
    // Drupal.ajax.prototype.success). The body parent check allows
    // #ajax['wrapper'] to be optional.
    var alreadyAttached = ajax.form && ajax.form.has(new_content).length > 0;
    if (!alreadyAttached && new_content.parents('body').length > 0) {
      // Apply any settings from the returned JSON if available.
      settings = response.settings || ajax.settings || Backdrop.settings;
      Backdrop.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Backdrop.settings;
    Backdrop.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <abbr class="ajax-changed" title="' + Backdrop.t('Changed') + '">*</abbr> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    window.alert(response.text, response.title);
  },

  /**
   * Command to set the window.location, redirecting the browser.
   */
  redirect: function (ajax, response, status) {
    window.location = response.url;
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Backdrop.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.args);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  addCss: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery, this);
;
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(r){"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),r(t),t}:r(jQuery)}(function(q){"use strict";var m=/\r?\n/g,S={};S.fileapi=void 0!==q('<input type="file">').get(0).files,S.formdata=void 0!==window.FormData;var _=!!q.fn.prop;function o(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),q(e.target).closest("form").ajaxSubmit(t))}function i(e){var t=e.target,r=q(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n,o=t.form;"image"===(o.clk=t).type&&(void 0!==e.offsetX?(o.clk_x=e.offsetX,o.clk_y=e.offsetY):"function"==typeof q.fn.offset?(n=r.offset(),o.clk_x=e.pageX-n.left,o.clk_y=e.pageY-n.top):(o.clk_x=e.pageX-t.offsetLeft,o.clk_y=e.pageY-t.offsetTop)),setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function N(){var e;q.fn.ajaxSubmit.debug&&(e="[jquery.form] "+Array.prototype.join.call(arguments,""),window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e))}q.fn.attr2=function(){if(!_)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},q.fn.ajaxSubmit=function(M,e,t,r){if(!this.length)return N("ajaxSubmit: skipping submit process - no element selected"),this;var O,a,n,o,X=this;"function"==typeof M?M={success:M}:"string"==typeof M||!1===M&&0<arguments.length?(M={url:M,data:e,dataType:t},"function"==typeof r&&(M.success=r)):void 0===M&&(M={}),O=M.method||M.type||this.attr2("method"),n=(n=(n="string"==typeof(a=M.url||this.attr2("action"))?q.trim(a):"")||window.location.href||"")&&(n.match(/^([^#]+)/)||[])[1],o=/(MSIE|Trident)/.test(navigator.userAgent||"")&&/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",M=q.extend(!0,{url:n,success:q.ajaxSettings.success,type:O||q.ajaxSettings.type,iframeSrc:o},M);var i={};if(this.trigger("form-pre-serialize",[this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(M.beforeSerialize&&!1===M.beforeSerialize(this,M))return N("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var s=M.traditional;void 0===s&&(s=q.ajaxSettings.traditional);var u,c,C=[],l=this.formToArray(M.semantic,C,M.filtering);if(M.data&&(c=q.isFunction(M.data)?M.data(l):M.data,M.extraData=c,u=q.param(c,s)),M.beforeSubmit&&!1===M.beforeSubmit(l,this,M))return N("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[l,this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var f=q.param(l,s);u&&(f=f?f+"&"+u:u),"GET"===M.type.toUpperCase()?(M.url+=(0<=M.url.indexOf("?")?"&":"?")+f,M.data=null):M.data=f;var d,m,p,h=[];M.resetForm&&h.push(function(){X.resetForm()}),M.clearForm&&h.push(function(){X.clearForm(M.includeHidden)}),!M.dataType&&M.target?(d=M.success||function(){},h.push(function(e,t,r){var a=arguments,n=M.replaceTarget?"replaceWith":"html";q(M.target)[n](e).each(function(){d.apply(this,a)})})):M.success&&(q.isArray(M.success)?q.merge(h,M.success):h.push(M.success)),M.success=function(e,t,r){for(var a=M.context||this,n=0,o=h.length;n<o;n++)h[n].apply(a,[e,t,r||X,X])},M.error&&(m=M.error,M.error=function(e,t,r){var a=M.context||this;m.apply(a,[e,t,r,X])}),M.complete&&(p=M.complete,M.complete=function(e,t){var r=M.context||this;p.apply(r,[e,t,X])});var v=0<q("input[type=file]:enabled",this).filter(function(){return""!==q(this).val()}).length,g="multipart/form-data",x=X.attr("enctype")===g||X.attr("encoding")===g,y=S.fileapi&&S.formdata;N("fileAPI :"+y);var b,T=(v||x)&&!y;!1!==M.iframe&&(M.iframe||T)?M.closeKeepAlive?q.get(M.closeKeepAlive,function(){b=w(l)}):b=w(l):b=(v||x)&&y?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(M.extraData){var a=function(e){var t,r,a=q.param(e,M.traditional).split("&"),n=a.length,o=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),o.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return o}(M.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}M.data=null;var n=q.extend(!0,{},q.ajaxSettings,M,{contentType:!1,processData:!1,cache:!1,type:O||"POST"});M.uploadProgress&&(n.xhr=function(){var e=q.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),M.uploadProgress(e,r,a,t)},!1),e});n.data=null;var o=n.beforeSend;return n.beforeSend=function(e,t){M.formData?t.data=M.formData:t.data=r,o&&o.call(this,e,t)},q.ajax(n)}(l):q.ajax(M),X.removeData("jqxhr").data("jqxhr",b);for(var j=0;j<C.length;j++)C[j]=null;return this.trigger("form-submit-notify",[this,M]),this;function w(e){var t,r,l,f,o,d,m,p,a,n,h,v,i=X[0],g=q.Deferred();if(g.abort=function(e){p.abort(e)},e)for(r=0;r<C.length;r++)t=q(C[r]),_?t.prop("disabled",!1):t.removeAttr("disabled");(l=q.extend(!0,{},q.ajaxSettings,M)).context=l.context||l,o="jqFormIO"+(new Date).getTime();var s=i.ownerDocument,u=X.closest("body");if(l.iframeTarget?(n=(d=q(l.iframeTarget,s)).attr2("name"))?o=n:d.attr2("name",o):(d=q('<iframe name="'+o+'" src="'+l.iframeSrc+'" />',s)).css({position:"absolute",top:"-1000px",left:"-1000px"}),m=d[0],p={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";N("aborting upload... "+t),this.aborted=1;try{m.contentWindow.document.execCommand&&m.contentWindow.document.execCommand("Stop")}catch(e){}d.attr("src",l.iframeSrc),p.error=t,l.error&&l.error.call(l.context,p,t,e),f&&q.event.trigger("ajaxError",[p,l,t]),l.complete&&l.complete.call(l.context,p,t)}},(f=l.global)&&0==q.active++&&q.event.trigger("ajaxStart"),f&&q.event.trigger("ajaxSend",[p,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,p,l))return l.global&&q.active--,g.reject(),g;if(p.aborted)return g.reject(),g;(a=i.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"===a.type&&(l.extraData[n+".x"]=i.clk_x,l.extraData[n+".y"]=i.clk_y));var x=1,y=2;function b(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){N("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){N("cannot get iframe.contentDocument: "+e),r=t.document}return r}var c=q("meta[name=csrf-token]").attr("content"),T=q("meta[name=csrf-param]").attr("content");function j(){var e=X.attr2("target"),t=X.attr2("action"),r=X.attr("enctype")||X.attr("encoding")||"multipart/form-data";i.setAttribute("target",o),O&&!/post/i.test(O)||i.setAttribute("method","POST"),t!==l.url&&i.setAttribute("action",l.url),l.skipEncodingOverride||O&&!/post/i.test(O)||X.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,A(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(q.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(q('<input type="hidden" name="'+l.extraData[n].name+'">',s).val(l.extraData[n].value).appendTo(i)[0]):a.push(q('<input type="hidden" name="'+n+'">',s).val(l.extraData[n]).appendTo(i)[0]));l.iframeTarget||d.appendTo(u),m.attachEvent?m.attachEvent("onload",A):m.addEventListener("load",A,!1),setTimeout(function e(){try{var t=b(m).readyState;N("state = "+t),t&&"uninitialized"===t.toLowerCase()&&setTimeout(e,50)}catch(e){N("Server abort: ",e," (",e.name,")"),A(y),v&&clearTimeout(v),v=void 0}},15);try{i.submit()}catch(e){document.createElement("form").submit.apply(i)}}finally{i.setAttribute("action",t),i.setAttribute("enctype",r),e?i.setAttribute("target",e):X.removeAttr("target"),q(a).remove()}}T&&c&&(l.extraData=l.extraData||{},l.extraData[T]=c),l.forceSync?j():setTimeout(j,10);var w,S,k,D=50;function A(e){if(!p.aborted&&!k){if((S=b(m))||(N("cannot access response document"),e=y),e===x&&p)return p.abort("timeout"),void g.reject(p,"timeout");if(e===y&&p)return p.abort("server abort"),void g.reject(p,"error","server abort");if(S&&S.location.href!==l.iframeSrc||h){m.detachEvent?m.detachEvent("onload",A):m.removeEventListener("load",A,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"===l.dataType||S.XMLDocument||q.isXMLDoc(S);if(N("isXml="+a),!a&&window.opera&&(null===S.body||!S.body.innerHTML)&&--D)return N("requeing onLoad callback, DOM not available"),void setTimeout(A,250);var n=S.body?S.body:S.documentElement;p.responseText=n?n.innerHTML:null,p.responseXML=S.XMLDocument?S.XMLDocument:S,a&&(l.dataType="xml"),p.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(p.status=Number(n.getAttribute("status"))||p.status,p.statusText=n.getAttribute("statusText")||p.statusText);var o,i,s,u=(l.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);c||l.textarea?(o=S.getElementsByTagName("textarea")[0])?(p.responseText=o.value,p.status=Number(o.getAttribute("status"))||p.status,p.statusText=o.getAttribute("statusText")||p.statusText):c&&(i=S.getElementsByTagName("pre")[0],s=S.getElementsByTagName("body")[0],i?p.responseText=i.textContent?i.textContent:i.innerText:s&&(p.responseText=s.textContent?s.textContent:s.innerText)):"xml"===u&&!p.responseXML&&p.responseText&&(p.responseXML=F(p.responseText));try{w=E(p,u,l)}catch(e){r="parsererror",p.error=t=e||r}}catch(e){N("error caught: ",e),r="error",p.error=t=e||r}p.aborted&&(N("upload aborted"),r=null),p.status&&(r=200<=p.status&&p.status<300||304===p.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,w,"success",p),g.resolve(p.responseText,"success",p),f&&q.event.trigger("ajaxSuccess",[p,l])):r&&(void 0===t&&(t=p.statusText),l.error&&l.error.call(l.context,p,r,t),g.reject(p,"error",t),f&&q.event.trigger("ajaxError",[p,l,t])),f&&q.event.trigger("ajaxComplete",[p,l]),f&&!--q.active&&q.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,p,r),k=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?d.attr("src",l.iframeSrc):d.remove(),p.responseXML=null},100)}}}var F=q.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},L=q.parseJSON||function(e){return window.eval("("+e+")")},E=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n=("xml"===t||!t)&&0<=a.indexOf("xml"),o=n?e.responseXML:e.responseText;return n&&"parsererror"===o.documentElement.nodeName&&q.error&&q.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,t)),"string"==typeof o&&(("json"===t||!t)&&0<=a.indexOf("json")?o=L(o):("script"===t||!t)&&0<=a.indexOf("javascript")&&q.globalEval(o)),o};return g}},q.fn.ajaxForm=function(e,t,r,a){if(("string"==typeof e||!1===e&&0<arguments.length)&&(e={url:e,data:t,dataType:r},"function"==typeof a&&(e.success=a)),(e=e||{}).delegation=e.delegation&&q.isFunction(q.fn.on),e.delegation||0!==this.length)return e.delegation?(q(document).off("submit.form-plugin",this.selector,o).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,e,o).on("click.form-plugin",this.selector,e,i),this):(e.beforeFormUnbind&&e.beforeFormUnbind(this,e),this.ajaxFormUnbind().on("submit.form-plugin",e,o).on("click.form-plugin",e,i));var n={s:this.selector,c:this.context};return!q.isReady&&n.s?(N("DOM not ready, queuing ajaxForm"),q(function(){q(n.s,n.c).ajaxForm(e)})):N("terminating; zero elements found by selector"+(q.isReady?"":" (DOM not ready)")),this},q.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},q.fn.formToArray=function(e,t,r){var a=[];if(0===this.length)return a;var n,o,i,s,u,c,l,f,d,m,p=this[0],h=this.attr("id"),v=(v=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements)&&q.makeArray(v);if(h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(n=q(':input[form="'+h+'"]').get()).length&&(v=(v||[]).concat(n)),!v||!v.length)return a;for(q.isFunction(r)&&(v=q.map(v,r)),o=0,c=v.length;o<c;o++)if((m=(u=v[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(a.push({name:m,value:q(u).val(),type:u.type}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y}));else if((s=q.fieldValue(u,!0))&&s.constructor===Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)a.push({name:m,value:s[i]});else if(S.fileapi&&"file"===u.type){t&&t.push(u);var g=u.files;if(g.length)for(i=0;i<g.length;i++)a.push({name:m,value:g[i],type:u.type});else a.push({name:m,value:"",type:u.type})}else null!=s&&(t&&t.push(u),a.push({name:m,value:s,type:u.type,required:u.required}));return e||!p.clk||(m=(d=(f=q(p.clk))[0]).name)&&!d.disabled&&"image"===d.type&&(a.push({name:m,value:f.val()}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y})),a},q.fn.formSerialize=function(e){return q.param(this.formToArray(e))},q.fn.fieldSerialize=function(n){var o=[];return this.each(function(){var e=this.name;if(e){var t=q.fieldValue(this,n);if(t&&t.constructor===Array)for(var r=0,a=t.length;r<a;r++)o.push({name:e,value:t[r]});else null!=t&&o.push({name:this.name,value:t})}}),q.param(o)},q.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],o=q.fieldValue(n,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?q.merge(t,o):t.push(o))}return t},q.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"===a||"button"===a||("checkbox"===a||"radio"===a)&&!e.checked||("submit"===a||"image"===a)&&e.form&&e.form.clk!==e||"select"===n&&-1===e.selectedIndex))return null;if("select"!==n)return q(e).val().replace(m,"\r\n");var o=e.selectedIndex;if(o<0)return null;for(var i=[],s=e.options,u="select-one"===a,c=u?o+1:s.length,l=u?o:0;l<c;l++){var f=s[l];if(f.selected&&!f.disabled){var d=(d=f.value)||(f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value);if(u)return d;i.push(d)}}return i},q.fn.clearForm=function(e){return this.each(function(){q("input,select,textarea",this).clearFields(e)})},q.fn.clearFields=q.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"===t?this.value="":"checkbox"===e||"radio"===e?this.checked=!1:"select"===t?this.selectedIndex=-1:"file"===e?/MSIE/.test(navigator.userAgent)?q(this).replaceWith(q(this).clone(!0)):q(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&q(this).is(r))&&(this.value="")})},q.fn.resetForm=function(){return this.each(function(){var t=q(this),e=this.tagName.toLowerCase();switch(e){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=t.parents("select");return r.length&&r[0].multiple?"option"===e?this.selected=this.defaultSelected:t.find("option").resetForm():r.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var a=q(t.attr("for")),n=t.find("input,select,textarea");return a[0]&&n.unshift(a[0]),n.resetForm(),!0;case"form":return"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},q.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},q.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e,t=this.type;"checkbox"===t||"radio"===t?this.checked=r:"option"===this.tagName.toLowerCase()&&(e=q(this).parent("select"),r&&e[0]&&"select-one"===e[0].type&&e.find("option").selected(!1),this.selected=r)})},q.fn.ajaxSubmit.debug=!1});
;
(function ($) {

"use strict";

/**
 * Process elements with the .dropbutton class on page load.
 */
Backdrop.behaviors.dropButton = {
  attach: function (context, settings) {
    var $dropbuttons = $(context).find('.dropbutton-wrapper').once('dropbutton');
    if ($dropbuttons.length) {
      // Adds the delegated handler that will toggle dropdowns on click.
      var $body = $('body').once('dropbutton-click');
      if ($body.length) {
        $body.on('click', '.dropbutton-toggle', dropbuttonClickHandler);
      }
      // Initialize all buttons.
      for (var i = 0, il = $dropbuttons.length; i < il; i++) {
        DropButton.dropbuttons.push(new DropButton($dropbuttons[i], settings.dropbutton));
      }
    }
  }
};

/**
 * Set the min-width of dropbuttons (and their parent) to handle all of the
 * link widths.
 */
Backdrop.behaviors.dropButtonWidths = {
  attach: function(context, settings) {
    function adjustDropButtonWidths() {
      var $dropbutton = $(this);

      // Get widest item width.
      var widestItem = 0, $item;
      $dropbutton.find('li:hidden').each(function() {
        // Use a clone element to avoid altering element CSS properties.
        $item = $(this).clone().insertAfter($(this)).show().css('visibility', 'hidden');
        widestItem = Math.max($item.outerWidth(), widestItem);
        $item.remove();
      });

      // Set dropbutton list (<ul>) as wide as its widest child.
      $dropbutton.find('.dropbutton').css('min-width', widestItem + 'px');

      // Set parent element min-width, like <td class="operations"> to prevent
      // overflow issue (See #2806).
      $dropbutton.parent().css('min-width', $dropbutton.find('.dropbutton-widget').outerWidth() + 'px');
    }

    // Get the font size and family for an element in a dropbutton if one
    // exists. If none exist, then we don't need to do any processing.
    var $link = $('.dropbutton li a').first();
    if ($link.length == 0) {
      return;
    }
    var fontSize = $link.css('font-size');
    var fontList = $link.css('font-family').split(', ');
    var actualFont = fontList.find(font => document.fonts.check(fontSize + ` ${font}`));

    // Calculate dropbutton elements width once the font is loaded.
    Backdrop.isFontLoaded(actualFont, function() {
      $(context).find('.dropbutton-wrapper').once('dropbutton-width', adjustDropButtonWidths);
    });

  }
};

/**
 * Delegated callback for opening and closing dropbutton secondary actions.
 */
function dropbuttonClickHandler (e) {
  e.preventDefault();
  $(e.target).closest('.dropbutton-wrapper').toggleClass('open');
}

/**
 * A DropButton presents an HTML list as a button with a primary action.
 *
 * All secondary actions beyond the first in the list are presented in a
 * dropdown list accessible through a toggle arrow associated with the button.
 *
 * @param DOMElement dropbutton
 *   A DOM element.
 *
 * @param {Object} settings
 *   A list of options including:
 *    - {String} title: The text inside the toggle link element. This text is
 *      hidden from visual UAs.
 */
function DropButton (dropbutton, settings) {
  // Merge defaults with settings.
  var options = $.extend({'title': Backdrop.t('List additional actions')}, settings);
  var $dropbutton = $(dropbutton);
  this.$dropbutton = $dropbutton;
  this.$list = $dropbutton.find('.dropbutton');
  // Find actions and mark them.
  this.$actions = this.$list.find('li').addClass('dropbutton-action');

  // Add the special dropdown only if there are hidden actions.
  if (this.$actions.length > 1) {
    // Identify the first element of the collection.
    var $primary = this.$actions.slice(0,1);
    // Identify the secondary actions.
    var $secondary = this.$actions.slice(1);
    $secondary.addClass('secondary-action');
    // Add toggle link.
    $primary.after(Backdrop.theme('dropbuttonToggle', options));
    // Bind mouse events.
    this.$dropbutton
      .addClass('dropbutton-multiple')
      .on({
        /**
         * Adds a timeout to close the dropdown on mouseleave.
         */
        'mouseleave.dropbutton': $.proxy(this.hoverOut, this),
        /**
         * Clears timeout when mouseout of the dropdown.
         */
        'mouseenter.dropbutton': $.proxy(this.hoverIn, this),
        /**
         * Similar to mouseleave/mouseenter, but for keyboard navigation.
         */
        'focusout.dropbutton': $.proxy(this.focusOut, this),
        'focusin.dropbutton': $.proxy(this.focusIn, this)
      });
  }
  else {
    this.$dropbutton.addClass('dropbutton-single');
  }
}

/**
 * Extend the DropButton constructor.
 */
$.extend(DropButton, {
  /**
   * Store all processed DropButtons.
   *
   * @type {Array}
   */
  dropbuttons: []
});

/**
 * Extend the DropButton prototype.
 */
$.extend(DropButton.prototype, {
  /**
   * Toggle the dropbutton open and closed.
   *
   * @param {Boolean} show
   *   (optional) Force the dropbutton to open by passing true or to close by
   *   passing false.
   */
  toggle: function (show) {
    var isBool = typeof show === 'boolean';
    show = isBool ? show : !this.$dropbutton.hasClass('open');
    this.$dropbutton.toggleClass('open', show);
  },

  hoverIn: function () {
    // Clear any previous timer we were using.
    if (this.timerID) {
      window.clearTimeout(this.timerID);
    }
  },

  hoverOut: function () {
    // Wait half a second before closing.
    this.timerID = window.setTimeout($.proxy(this, 'close'), 500);
  },

  open: function () {
    this.toggle(true);
  },

  close: function () {
    this.toggle(false);
  },

  focusOut: function(e) {
    this.hoverOut.call(this, e);
  },

  focusIn: function(e) {
    this.hoverIn.call(this, e);
  }
});

/**
 * A toggle is an interactive element often bound to a click handler.
 *
 * @param {Object} options
 *   - {String} title: (optional) The HTML anchor title attribute and
 *     text for the inner span element.
 *
 * @return {String}
 *   A string representing a DOM fragment.
 */
Backdrop.theme.prototype.dropbuttonToggle = function (options) {
  return '<li class="dropbutton-toggle"><button type="button" role="button"><span class="dropbutton-arrow"><span class="visually-hidden">' + options.title + '</span></span></button></li>';
};

// Expose constructor in the public space.
Backdrop.DropButton = DropButton;

})(jQuery);
;
/*!
 * jQuery UI Tabs 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","../keycode","../unique-id","../version","../widget"],t):t(jQuery)})(function(o){var a;return o.widget("ui.tabs",{version:"1.14.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:(a=/#.*$/,function(t){var e=t.href.replace(a,""),i=location.href.replace(a,"");try{e=decodeURIComponent(e)}catch(t){}try{i=decodeURIComponent(i)}catch(t){}return 1<t.hash.length&&e===i}),_create:function(){var e=this,t=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,t.collapsible),this._processTabs(),t.active=this._initialActive(),Array.isArray(t.disabled)&&(t.disabled=o.uniqueSort(t.disabled.concat(o.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),!1!==this.options.active&&this.anchors.length?this.active=this._findActive(t.active):this.active=o(),this._refresh(),this.active.length&&this.load(t.active)},_initialActive:function(){var i=this.options.active,t=this.options.collapsible,a=decodeURIComponent(location.hash.substring(1));return null===i&&(a&&this.tabs.each(function(t,e){if(o(e).attr("aria-controls")===a)return i=t,!1}),null!==(i=null===i?this.tabs.index(this.tabs.filter(".ui-tabs-active")):i)&&-1!==i||(i=!!this.tabs.length&&0)),!1!==i&&-1===(i=this.tabs.index(this.tabs.eq(i)))&&(i=!t&&0),i=!t&&!1===i&&this.anchors.length?0:i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):o()}},_tabKeydown:function(t){var e=o(this.document[0].activeElement).closest("li"),i=this.tabs.index(e),a=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case o.ui.keyCode.RIGHT:case o.ui.keyCode.DOWN:i++;break;case o.ui.keyCode.UP:case o.ui.keyCode.LEFT:a=!1,i--;break;case o.ui.keyCode.END:i=this.anchors.length-1;break;case o.ui.keyCode.HOME:i=0;break;case o.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),void this._activate(i);case o.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),void this._activate(i!==this.options.active&&i);default:return}t.preventDefault(),clearTimeout(this.activating),i=this._focusNextTab(i,a),t.ctrlKey||t.metaKey||(e.attr("aria-selected","false"),this.tabs.eq(i).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",i)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===o.ui.keyCode.UP&&(t.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(t){return t.altKey&&t.keyCode===o.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===o.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,e){var i=this.tabs.length-1;for(;-1!==o.inArray(t=(t=i<t?0:t)<0?i:t,this.options.disabled);)t=e?t+1:t-1;return t},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){"active"===t?this._activate(e):(this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),e||!1!==this.options.active||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e))},refresh:function(){var t=this.options,e=this.tablist.children(":has(a[href])");t.disabled=o.map(e.filter(".ui-state-disabled"),function(t){return e.index(t)}),this._processTabs(),!1!==t.active&&this.anchors.length?this.active.length&&!o.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=o()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=o()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var r=this,t=this.tabs,e=this.anchors,i=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(t){o(this).is(".ui-state-disabled")&&t.preventDefault()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return o("a",this)[0]}).attr({tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=o(),this.anchors.each(function(t,e){var i,a,s=o(e).uniqueId().attr("id"),n=o(e).closest("li"),h=n.attr("aria-controls");r._isLocal(e)?(a=decodeURIComponent(e.hash).substring(1),i=r.element.find("#"+CSS.escape(a))):(a=n.attr("aria-controls")||o({}).uniqueId()[0].id,(i=r.element.find("#"+a)).length||(i=r._createPanel(a)).insertAfter(r.panels[t-1]||r.tablist),i.attr("aria-live","polite")),i.length&&(r.panels=r.panels.add(i)),h&&n.data("ui-tabs-aria-controls",h),n.attr({"aria-controls":a,"aria-labelledby":s}),i.attr("aria-labelledby",s)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),t&&(this._off(t.not(this.tabs)),this._off(e.not(this.anchors)),this._off(i.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(t){return o("<div>").attr("id",t).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(t){var e,i;for(Array.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1),i=0;e=this.tabs[i];i++)e=o(e),!0===t||-1!==o.inArray(i,t)?(e.attr("aria-disabled","true"),this._addClass(e,null,"ui-state-disabled")):(e.removeAttr("aria-disabled"),this._removeClass(e,null,"ui-state-disabled"));this.options.disabled=t,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!0===t)},_setupEvents:function(t){var i={};t&&o.each(t.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,e=this.element.parent();"fill"===t?(i=e.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=o(this),e=t.css("position");"absolute"!==e&&"fixed"!==e&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=o(this).outerHeight(!0)}),this.panels.each(function(){o(this).height(Math.max(0,i-o(this).innerHeight()+o(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,o(this).height("").height())}).height(i))},_eventHandler:function(t){var e=this.options,i=this.active,a=o(t.currentTarget).closest("li"),s=a[0]===i[0],n=s&&e.collapsible,h=n?o():this._getPanelForTab(a),r=i.length?this._getPanelForTab(i):o(),i={oldTab:i,oldPanel:r,newTab:n?o():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||s&&!e.collapsible||!1===this._trigger("beforeActivate",t,i)||(e.active=!n&&this.tabs.index(a),this.active=s?o():a,this.xhr&&this.xhr.abort(),r.length||h.length||o.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,i))},_toggle:function(t,e){var i=this,a=e.newPanel,s=e.oldPanel;function n(){i.running=!1,i._trigger("activate",t,e)}function h(){i._addClass(e.newTab.closest("li"),"ui-tabs-active","ui-state-active"),a.length&&i.options.show?i._show(a,i.options.show,n):(a.show(),n())}this.running=!0,s.length&&this.options.hide?this._hide(s,this.options.hide,function(){i._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),h()}):(this._removeClass(e.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),s.hide(),h()),s.attr("aria-hidden","true"),e.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),a.length&&s.length?e.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===o(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr("aria-hidden","false"),e.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var t=this._findActive(t);t[0]!==this.active[0]&&(t=(t=t.length?t:this.active).find(".ui-tabs-anchor")[0],this._eventHandler({target:t,currentTarget:t,preventDefault:o.noop}))},_findActive:function(t){return!1===t?o():this.tabs.eq(t)},_getIndex:function(t){return t="string"==typeof t?this.anchors.index(this.anchors.filter("[href$='"+CSS.escape(t)+"']")):t},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){o.data(this,"ui-tabs-destroy")?o(this).remove():o(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var t=o(this),e=t.data("ui-tabs-aria-controls");e?t.attr("aria-controls",e).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var t=this.options.disabled;!1!==t&&(t=void 0!==i&&(i=this._getIndex(i),Array.isArray(t)?o.map(t,function(t){return t!==i?t:null}):o.map(this.tabs,function(t,e){return e!==i?e:null})),this._setOptionDisabled(t))},disable:function(t){var e=this.options.disabled;if(!0!==e){if(void 0===t)e=!0;else{if(t=this._getIndex(t),-1!==o.inArray(t,e))return;e=Array.isArray(e)?o.merge([t],e).sort():[t]}this._setOptionDisabled(e)}},load:function(t,a){t=this._getIndex(t);function s(t,e){"abort"===e&&n.panels.stop(!1,!0),n._removeClass(i,"ui-tabs-loading"),h.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr}var n=this,i=this.tabs.eq(t),t=i.find(".ui-tabs-anchor"),h=this._getPanelForTab(i),r={tab:i,panel:h};this._isLocal(t[0])||(this.xhr=o.ajax(this._ajaxSettings(t,a,r)),"canceled"!==this.xhr.statusText&&(this._addClass(i,"ui-tabs-loading"),h.attr("aria-busy","true"),this.xhr.done(function(t,e,i){h.html(t),n._trigger("load",a,r),s(i,e)}).fail(function(t,e){s(t,e)})))},_ajaxSettings:function(t,i,a){var s=this;return{url:t.attr("href"),beforeSend:function(t,e){return s._trigger("beforeLoad",i,o.extend({jqXHR:t,ajaxSettings:e},a))}}},_getPanelForTab:function(t){t=o(t).attr("aria-controls");return this.element.find("#"+CSS.escape(t))}}),!0===o.uiBackCompat&&o.widget("ui.tabs",o.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),o.ui.tabs});;
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
 * jQuery UI Mouse 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(e=>{"function"==typeof define&&define.amd?define(["jquery","../version","../widget"],e):e(jQuery)})(function(o){var n=!1;return o(document).on("mouseup",function(){n=!1}),o.widget("ui.mouse",{version:"1.14.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.on("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).on("click."+this.widgetName,function(e){if(!0===o.data(e.target,t.widgetName+".preventClickEvent"))return o.removeData(e.target,t.widgetName+".preventClickEvent"),e.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){var t,s,i;if(!n)return this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),s=1===(this._mouseDownEvent=e).which,i="string"==typeof(t=this).options.cancel&&o(e.target).closest(this.options.cancel).length,s&&!i&&this._mouseCapture(e)&&(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){t.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(e),!this._mouseStarted)?e.preventDefault():(!0===o.data(e.target,this.widgetName+".preventClickEvent")&&o.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return t._mouseMove(e)},this._mouseUpDelegate=function(e){return t._mouseUp(e)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),n=!0)),!0},_mouseMove:function(e){if(this._mouseMoved&&!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e);return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,e),this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&o.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,n=!1,e.preventDefault()},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})});;
/*!
 * jQuery UI Touch Punch 1.1.5 as modified by RWAP Software
 * based on original touchpunch v0.2.3 which has not been updated since 2014
 *
 * Updates by RWAP Software to take account of various suggested changes on the original code issues
 *
 * Original: https://github.com/furf/jquery-ui-touch-punch
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Fork: https://github.com/RWAP/jquery-ui-touch-punch
 *
 * Depends:
 * jquery.ui.widget.js
 * jquery.ui.mouse.js
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define([ "jquery", "jquery-ui" ], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
}(function ($) {

  // Detect touch support - Windows Surface devices and other touch devices
  $.mspointer = window.navigator.msPointerEnabled;		
  $.touch = ( 'ontouchstart' in document
   	|| 'ontouchstart' in window
   	|| window.TouchEvent
   	|| (window.DocumentTouch && document instanceof DocumentTouch)
   	|| navigator.maxTouchPoints > 0
   	|| navigator.msMaxTouchPoints > 0
  );

  // Ignore browsers without touch or mouse support
  if ((!$.touch && !$.mspointer) || !$.ui.mouse) {
	return;
  }

  let mouseProto = $.ui.mouse.prototype,
      _mouseInit = mouseProto._mouseInit,
      _mouseDestroy = mouseProto._mouseDestroy,
      touchHandled, lastClickTime  = 0;

    /**
    * Get the x,y position of a touch event
    * @param {Object} event A touch event
    */
    function getTouchCoords (event) {
        return {
            x: event.originalEvent.changedTouches[0].pageX,
            y: event.originalEvent.changedTouches[0].pageY
        };
    }

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    //Ignore input or textarea elements so user can still enter text
    if ($(event.target).is("input") || $(event.target).is("textarea")) {
      return;
    }

    // Prevent "Ignored attempt to cancel a touchmove event with cancelable=false" errors
    if (event.cancelable) {
      event.preventDefault();
    }

    let touch = event.originalEvent.changedTouches[0],
        simulatedEvent = new MouseEvent(simulatedType, {
          bubbles: true,
          cancelable: true,
          view:window,
          screenX:touch.screenX,
          screenY:touch.screenY,
          clientX:touch.clientX,
          clientY:touch.clientY
        });

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    let self = this;

    // Interaction time
    this._startedMove = event.timeStamp;

    // Track movement to determine if interaction was a click
    self._startPos = getTouchCoords(event);

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was moved
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    // Check for this in two ways - length of time of simulation and distance moved
    // Allow for Apple Stylus to be used also
    let timeMoving = event.timeStamp - this._startedMove;
    if (!this._touchMoved || timeMoving < 500) {
        // Simulate the click event
        if( event.timeStamp - lastClickTime < 400 )
            simulateMouseEvent(event, 'dblclick');
        else
            simulateMouseEvent(event, 'click');
        lastClickTime = event.timeStamp;	    
    } else {
      let endPos = getTouchCoords(event);
      if ((Math.abs(endPos.x - this._startPos.x) < 10) && (Math.abs(endPos.y - this._startPos.y) < 10)) {

          // If the touch interaction did not move, it should trigger a click
          if (!this._touchMoved || event.originalEvent.changedTouches[0].touchType === 'stylus') {
              // Simulate the click event
              simulateMouseEvent(event, 'click');
          }
      }
    }

    // Unset the flag to determine the touch movement stopped
    this._touchMoved = false;

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  let _touchStartBound;
  let _touchMoveBound;
  let _touchEndBound

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {

    let self = this;
	  
    // Microsoft Surface Support = remove original touch Action
    if ($.support.mspointer) {
      self.element[0].style.msTouchAction = 'none';
    }	

    _touchStartBound = mouseProto._touchStart.bind(self);
    _touchMoveBound  = mouseProto._touchMove.bind(self);
    _touchEndBound   = mouseProto._touchEnd.bind(self);	  

    // Delegate the touch handlers to the widget's element
    self.element.on({
      touchstart: _touchStartBound,
      touchmove: _touchMoveBound,
      touchend: _touchEndBound
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {

    let self = this;

    // Delegate the touch handlers to the widget's element
    self.element.off({
      touchstart: _touchStartBound,
      touchmove: _touchMoveBound,
      touchend: _touchEndBound
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };

}));
;
/*!
 * jQuery UI Draggable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
(t=>{"function"==typeof define&&define.amd?define(["jquery","./mouse","../data","../plugin","../scroll-parent","../version","../widget"],t):t(jQuery)})(function(P){return P.widget("ui.draggable",P.ui.mouse,{version:"1.14.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){(this.helper||this.element).is(".ui-draggable-dragging")?this.destroyOnClear=!0:(this._removeHandleClassName(),this._mouseDestroy())},_mouseCapture:function(t){var e=this.options;return!(this.helper||e.disabled||0<P(t.target).closest(".ui-resizable-handle").length||(this.handle=this._getHandle(t),!this.handle)||(this._blurActiveElement(t),this._blockFrames(!0===e.iframeFix?"iframe":e.iframeFix),0))},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=P(this);return P("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var e=this.document[0].activeElement;P(t.target).closest(e).length||P(e).trigger("blur")},_mouseStart:function(t){var e=this.options;return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),P.ui.ddmanager&&(P.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=0<this.helper.parents().filter(function(){return"fixed"===P(this).css("position")}).length,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this._setContainment(),!1===this._trigger("start",t)?(this._clear(),!1):(this._cacheHelperProportions(),P.ui.ddmanager&&!e.dropBehaviour&&P.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),P.ui.ddmanager&&P.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(t,e){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!e){e=this._uiHash();if(!1===this._trigger("drag",t,e))return this._mouseUp(new P.Event("mouseup",t)),!1;this.position=e.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",P.ui.ddmanager&&P.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var e=this,s=!1;return P.ui.ddmanager&&!this.options.dropBehaviour&&(s=P.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||!0===this.options.revert||"function"==typeof this.options.revert&&this.options.revert.call(this.element,s)?P(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==e._trigger("stop",t)&&e._clear()}):!1!==this._trigger("stop",t)&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),P.ui.ddmanager&&P.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),P.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new P.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!P(t.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(t){var e=this.options,s="function"==typeof e.helper,t=s?P(e.helper.apply(this.element[0],[t])):"clone"===e.helper?this.element.clone().removeAttr("id"):this.element;return t.parents("body").length||t.appendTo("parent"===e.appendTo?this.element[0].parentNode:e.appendTo),s&&t[0]===this.element[0]&&this._setPositionRelative(),t[0]===this.element[0]||/(fixed|absolute)/.test(t.css("position"))||t.css("position","absolute"),t},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),"left"in(t=Array.isArray(t)?{left:+t[0],top:+t[1]||0}:t)&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),e=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==e&&P.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),{top:(t=this._isRootNode(this.offsetParent[0])?{top:0,left:0}:t).top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){var t,e;return"relative"!==this.cssPosition?{top:0,left:0}:(t=this.element.position(),e=this._isRootNode(this.scrollParent[0]),{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())})},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e=this.options,s=this.document[0];this.relativeContainer=null,e.containment?"window"===e.containment?this.containment=[P(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,P(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,P(window).scrollLeft()+P(window).width()-this.helperProportions.width-this.margins.left,P(window).scrollTop()+(P(window).height()||s.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:"document"===e.containment?this.containment=[0,0,P(s).width()-this.helperProportions.width-this.margins.left,(P(s).height()||s.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:e.containment.constructor===Array?this.containment=e.containment:("parent"===e.containment&&(e.containment=this.helper[0].parentNode),(e=(s=P(e.containment))[0])&&(t=/(scroll|auto)/.test(s.css("overflow")),this.containment=[(parseInt(s.css("borderLeftWidth"),10)||0)+(parseInt(s.css("paddingLeft"),10)||0),(parseInt(s.css("borderTopWidth"),10)||0)+(parseInt(s.css("paddingTop"),10)||0),(t?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(s.css("borderRightWidth"),10)||0)-(parseInt(s.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(s.css("borderBottomWidth"),10)||0)-(parseInt(s.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=s)):this.containment=null},_convertPositionTo:function(t,e){e=e||this.position;var t="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*t+this.offset.parent.top*t-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*t,left:e.left+this.offset.relative.left*t+this.offset.parent.left*t-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*t}},_generatePosition:function(t,e){var s,i=this.options,o=this._isRootNode(this.scrollParent[0]),n=t.pageX,r=t.pageY;return o&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),{top:(r=e&&(this.containment&&(s=this.relativeContainer?(e=this.relativeContainer.offset(),[this.containment[0]+e.left,this.containment[1]+e.top,this.containment[2]+e.left,this.containment[3]+e.top]):this.containment,t.pageX-this.offset.click.left<s[0]&&(n=s[0]+this.offset.click.left),t.pageY-this.offset.click.top<s[1]&&(r=s[1]+this.offset.click.top),t.pageX-this.offset.click.left>s[2]&&(n=s[2]+this.offset.click.left),t.pageY-this.offset.click.top>s[3])&&(r=s[3]+this.offset.click.top),i.grid&&(e=i.grid[1]?this.originalPageY+Math.round((r-this.originalPageY)/i.grid[1])*i.grid[1]:this.originalPageY,r=!s||e-this.offset.click.top>=s[1]||e-this.offset.click.top>s[3]?e:e-this.offset.click.top>=s[1]?e-i.grid[1]:e+i.grid[1],t=i.grid[0]?this.originalPageX+Math.round((n-this.originalPageX)/i.grid[0])*i.grid[0]:this.originalPageX,n=!s||t-this.offset.click.left>=s[0]||t-this.offset.click.left>s[2]?t:t-this.offset.click.left>=s[0]?t-i.grid[0]:t+i.grid[0]),"y"===i.axis&&(n=this.originalPageX),"x"===i.axis)?this.originalPageY:r)-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:o?0:this.offset.scroll.top),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:o?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(t,e,s){return s=s||this._uiHash(),P.ui.plugin.call(this,t,[e,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),P.Widget.prototype._trigger.call(this,t,e,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),P.ui.plugin.add("draggable","connectToSortable",{start:function(e,t,s){var i=P.extend({},t,{item:s.element});s.sortables=[],P(s.options.connectToSortable).each(function(){var t=P(this).sortable("instance");t&&!t.options.disabled&&(s.sortables.push(t),t.refreshPositions(),t._trigger("activate",e,i))})},stop:function(e,t,s){var i=P.extend({},t,{item:s.element});s.cancelHelperRemoval=!1,P.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,i))})},drag:function(s,i,o){P.each(o.sortables,function(){var t=!1,e=this;e.positionAbs=o.positionAbs,e.helperProportions=o.helperProportions,e.offset.click=o.offset.click,e._intersectsWith(e.containerCache)&&(t=!0,P.each(o.sortables,function(){return this.positionAbs=o.positionAbs,this.helperProportions=o.helperProportions,this.offset.click=o.offset.click,t=this!==e&&this._intersectsWith(this.containerCache)&&P.contains(e.element[0],this.element[0])?!1:t})),t?(e.isOver||(e.isOver=1,o._parent=i.helper.parent(),e.currentItem=i.helper.appendTo(e.element).data("ui-sortable-item",!0),e.options._helper=e.options.helper,e.options.helper=function(){return i.helper[0]},s.target=e.currentItem[0],e._mouseCapture(s,!0),e._mouseStart(s,!0,!0),e.offset.click.top=o.offset.click.top,e.offset.click.left=o.offset.click.left,e.offset.parent.left-=o.offset.parent.left-e.offset.parent.left,e.offset.parent.top-=o.offset.parent.top-e.offset.parent.top,o._trigger("toSortable",s),o.dropped=e.element,P.each(o.sortables,function(){this.refreshPositions()}),o.currentItem=o.element,e.fromOutside=o),e.currentItem&&(e._mouseDrag(s),i.position=e.position)):e.isOver&&(e.isOver=0,e.cancelHelperRemoval=!0,e.options._revert=e.options.revert,e.options.revert=!1,e._trigger("out",s,e._uiHash(e)),e._mouseStop(s,!0),e.options.revert=e.options._revert,e.options.helper=e.options._helper,e.placeholder&&e.placeholder.remove(),i.helper.appendTo(o._parent),o._refreshOffsets(s),i.position=o._generatePosition(s,!0),o._trigger("fromSortable",s),o.dropped=!1,P.each(o.sortables,function(){this.refreshPositions()}))})}}),P.ui.plugin.add("draggable","cursor",{start:function(t,e,s){var i=P("body"),s=s.options;i.css("cursor")&&(s._cursor=i.css("cursor")),i.css("cursor",s.cursor)},stop:function(t,e,s){s=s.options;s._cursor&&P("body").css("cursor",s._cursor)}}),P.ui.plugin.add("draggable","opacity",{start:function(t,e,s){e=P(e.helper),s=s.options;e.css("opacity")&&(s._opacity=e.css("opacity")),e.css("opacity",s.opacity)},stop:function(t,e,s){s=s.options;s._opacity&&P(e.helper).css("opacity",s._opacity)}}),P.ui.plugin.add("draggable","scroll",{start:function(t,e,s){s.scrollParentNotHidden||(s.scrollParentNotHidden=s.helper.scrollParent(!1)),s.scrollParentNotHidden[0]!==s.document[0]&&"HTML"!==s.scrollParentNotHidden[0].tagName&&(s.overflowOffset=s.scrollParentNotHidden.offset())},drag:function(t,e,s){var i=s.options,o=!1,n=s.scrollParentNotHidden[0],r=s.document[0];n!==r&&"HTML"!==n.tagName?(i.axis&&"x"===i.axis||(s.overflowOffset.top+n.offsetHeight-t.pageY<i.scrollSensitivity?n.scrollTop=o=n.scrollTop+i.scrollSpeed:t.pageY-s.overflowOffset.top<i.scrollSensitivity&&(n.scrollTop=o=n.scrollTop-i.scrollSpeed)),i.axis&&"y"===i.axis||(s.overflowOffset.left+n.offsetWidth-t.pageX<i.scrollSensitivity?n.scrollLeft=o=n.scrollLeft+i.scrollSpeed:t.pageX-s.overflowOffset.left<i.scrollSensitivity&&(n.scrollLeft=o=n.scrollLeft-i.scrollSpeed))):(i.axis&&"x"===i.axis||(t.pageY-P(r).scrollTop()<i.scrollSensitivity?o=P(r).scrollTop(P(r).scrollTop()-i.scrollSpeed):P(window).height()-(t.pageY-P(r).scrollTop())<i.scrollSensitivity&&(o=P(r).scrollTop(P(r).scrollTop()+i.scrollSpeed))),i.axis&&"y"===i.axis||(t.pageX-P(r).scrollLeft()<i.scrollSensitivity?o=P(r).scrollLeft(P(r).scrollLeft()-i.scrollSpeed):P(window).width()-(t.pageX-P(r).scrollLeft())<i.scrollSensitivity&&(o=P(r).scrollLeft(P(r).scrollLeft()+i.scrollSpeed)))),!1!==o&&P.ui.ddmanager&&!i.dropBehaviour&&P.ui.ddmanager.prepareOffsets(s,t)}}),P.ui.plugin.add("draggable","snap",{start:function(t,e,s){var i=s.options;s.snapElements=[],P(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var t=P(this),e=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:e.top,left:e.left})})},drag:function(t,e,s){for(var i,o,n,r,l,a,h,p,c,f=s.options,d=f.snapTolerance,g=e.offset.left,u=g+s.helperProportions.width,m=e.offset.top,v=m+s.helperProportions.height,_=s.snapElements.length-1;0<=_;_--)a=(l=s.snapElements[_].left-s.margins.left)+s.snapElements[_].width,p=(h=s.snapElements[_].top-s.margins.top)+s.snapElements[_].height,u<l-d||a+d<g||v<h-d||p+d<m||!P.contains(s.snapElements[_].item.ownerDocument,s.snapElements[_].item)?(s.snapElements[_].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,P.extend(s._uiHash(),{snapItem:s.snapElements[_].item})),s.snapElements[_].snapping=!1):("inner"!==f.snapMode&&(i=Math.abs(h-v)<=d,o=Math.abs(p-m)<=d,n=Math.abs(l-u)<=d,r=Math.abs(a-g)<=d,i&&(e.position.top=s._convertPositionTo("relative",{top:h-s.helperProportions.height,left:0}).top),o&&(e.position.top=s._convertPositionTo("relative",{top:p,left:0}).top),n&&(e.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r)&&(e.position.left=s._convertPositionTo("relative",{top:0,left:a}).left),c=i||o||n||r,"outer"!==f.snapMode&&(i=Math.abs(h-m)<=d,o=Math.abs(p-v)<=d,n=Math.abs(l-g)<=d,r=Math.abs(a-u)<=d,i&&(e.position.top=s._convertPositionTo("relative",{top:h,left:0}).top),o&&(e.position.top=s._convertPositionTo("relative",{top:p-s.helperProportions.height,left:0}).top),n&&(e.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r)&&(e.position.left=s._convertPositionTo("relative",{top:0,left:a-s.helperProportions.width}).left),!s.snapElements[_].snapping&&(i||o||n||r||c)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,P.extend(s._uiHash(),{snapItem:s.snapElements[_].item})),s.snapElements[_].snapping=i||o||n||r||c)}}),P.ui.plugin.add("draggable","stack",{start:function(t,e,s){var i,s=s.options,s=P.makeArray(P(s.stack)).sort(function(t,e){return(parseInt(P(t).css("zIndex"),10)||0)-(parseInt(P(e).css("zIndex"),10)||0)});s.length&&(i=parseInt(P(s[0]).css("zIndex"),10)||0,P(s).each(function(t){P(this).css("zIndex",i+t)}),this.css("zIndex",i+s.length))}}),P.ui.plugin.add("draggable","zIndex",{start:function(t,e,s){e=P(e.helper),s=s.options;e.css("zIndex")&&(s._zIndex=e.css("zIndex")),e.css("zIndex",s.zIndex)},stop:function(t,e,s){s=s.options;s._zIndex&&P(e.helper).css("zIndex",s._zIndex)}}),P.ui.draggable});;
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
(function ($) {

/**
 * Drag and drop table rows with field manipulation.
 *
 * Using the backdrop_add_tabledrag() function, any table with weights or parent
 * relationships may be made into draggable tables. Columns containing a field
 * may optionally be hidden, providing a better user experience.
 *
 * Created tableDrag instances may be modified with custom behaviors by
 * overriding the .onDrag, .onDrop, .row.onSwap, and .row.onIndent methods.
 * See blocks.js for an example of adding additional functionality to tableDrag.
 */
Backdrop.behaviors.tableDrag = {
  attach: function (context, settings) {
    function initTableDrag(table, base) {
      if (table.length) {
        // Create the new tableDrag instance. Save in the Backdrop variable
        // to allow other scripts access to the object.
        Backdrop.tableDrag[base] = new Backdrop.tableDrag(table[0], settings.tableDrag[base]);
       }
     }

     for (var base in settings.tableDrag) {
       if (settings.tableDrag.hasOwnProperty(base)) {
         initTableDrag($(context).find('#' + base).once('tabledrag'), base);
       }
    }
  }
};

/**
 * Constructor for the tableDrag object. Provides table and field manipulation.
 *
 * @param table
 *   DOM object for the table to be made draggable.
 * @param tableSettings
 *   Settings for the table added via backdrop_add_tabledrag().
 */
Backdrop.tableDrag = function (table, tableSettings) {
  var self = this;

  // Required object variables.
  this.table = table;
  this.tableSettings = tableSettings;
  this.dragObject = null; // Used to hold information about a current drag operation.
  this.rowObject = null; // Provides operations for row manipulation.
  this.oldRowElement = null; // Remember the previous element.
  this.oldY = 0; // Used to determine up or down direction from last pointer move.
  this.changed = false; // Whether anything in the entire table has changed.
  this.maxDepth = 0; // Maximum amount of allowed parenting.
  this.rtl = $(this.table).css('direction') == 'rtl' ? -1 : 1; // Direction of the table.

  // Touch support, borrowed from Modernizer.touch.
  this.touchSupport = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  // Configure the scroll settings.
  this.scrollSettings = { amount: 4, interval: 50, trigger: 70 };
  this.scrollInterval = null;
  this.scrollY = 0;
  this.windowHeight = 0;

  // Check this table's settings to see if there are parent relationships in
  // this table. For efficiency, large sections of code can be skipped if we
  // don't need to track horizontal movement and indentations.
  this.indentEnabled = false;
  for (var group in tableSettings) {
    if (tableSettings.hasOwnProperty(group)) {
       for (var n in tableSettings[group]) {
         if (tableSettings[group].hasOwnProperty(n)) {
           if (tableSettings[group][n].relationship === 'parent') {
             this.indentEnabled = true;
           }
           if (tableSettings[group][n].limit > 0) {
             this.maxDepth = tableSettings[group][n].limit;
           }
         }
      }
    }
  }
  if (this.indentEnabled) {
    this.indentCount = 1; // Total width of indents, set in makeDraggable.
    // Find the width of indentations to measure pointer movements against.
    // Because the table doesn't need to start with any indentations, we
    // manually append 2 indentations in the first draggable row, measure
    // the offset, then remove.
    var indent = Backdrop.theme('tableDragIndentation');
    var testRow = $('<tr/>').addClass('draggable').appendTo(table);
    var testCell = $('<td/>').appendTo(testRow).prepend(indent).prepend(indent);
    this.indentAmount = $('.indentation', testCell).get(1).offsetLeft - $('.indentation', testCell).get(0).offsetLeft;
    testRow.remove();
  }

  // Make each applicable row draggable.
  // Match immediate children of the parent element to allow nesting.
  $('> tr.draggable, > tbody > tr.draggable', table).each(function () { self.makeDraggable(this); });

  // Add a link before the table for users to show or hide weight columns.
  $(table).before($('<a href="#" class="tabledrag-toggle-weight"></a>')
    .attr('title', Backdrop.t('Re-order rows by numerical weight instead of dragging.'))
    .on('click', function () {
      if (localStorage.getItem('Backdrop.tableDrag.showWeight') === '1') {
        localStorage.removeItem('Backdrop.tableDrag.showWeight');
        self.hideColumns();
      }
      else {
        localStorage.setItem('Backdrop.tableDrag.showWeight', '1');
        self.showColumns();
      }
      return false;
    })
    .wrap('<div class="tabledrag-toggle-weight-wrapper"></div>')
    .parent()
  );

  // Initialize the specified columns (for example, weight or parent columns)
  // to show or hide according to user preference. This aids accessibility
  // so that, e.g., screen reader users can choose to enter weight values and
  // manipulate form elements directly, rather than using drag-and-drop..
  self.initColumns();

  // Add event bindings to the document. The self variable is passed along
  // as event handlers do not have direct access to the tableDrag object.
  $(document).on('touchmove', function (event) { return self.dragRow(event.originalEvent.touches[0], self); });
  $(document).on('touchend', function (event) { return self.dropRow(event.originalEvent.touches[0], self); });
  $(document).on('mousemove pointermove', function (event) { return self.dragRow(event, self); });
  $(document).on('mouseup pointerup', function (event) { return self.dropRow(event, self); });
};

/**
 * Initialize columns containing form elements to be hidden by default,
 * according to the settings for this tableDrag instance.
 *
 * Identify and mark each cell with a CSS class so we can toggle show/hide it.
 * Finally, hide columns if user does not have a 'Backdrop.tableDrag.showWeight'
 * in localStorage.
 */
Backdrop.tableDrag.prototype.initColumns = function () {
  var $table = $(this.table), hidden, cell, columnIndex;
  for (var group in this.tableSettings) {
    if (this.tableSettings.hasOwnProperty(group)) { // Find the first field in this group.
      for (var d in this.tableSettings[group]) {
        if (this.tableSettings[group].hasOwnProperty(d)) {
          var field = $table.find('.' + this.tableSettings[group][d].target + ':first');
          if (field.length && this.tableSettings[group][d].hidden) {
            hidden = this.tableSettings[group][d].hidden;
            cell = field.closest('td');
            break;
          }
        }
      }

     // Mark the column containing this field so it can be hidden.
     if (hidden && cell[0]) {
       // Add 1 to our indexes. The nth-child selector is 1 based, not 0 based.
       // Match immediate children of the parent element to allow nesting.
       columnIndex = cell.parent().find('> td').index(cell.get(0)) + 1;
       $table.find('> thead > tr, > tbody > tr, > tr').each(this.addColspanClass(columnIndex));
      }
    }
  }

  // Now hide cells and reduce colspans unless localStorage indicates previous
  // choice.
  if (localStorage.getItem('Backdrop.tableDrag.showWeight') === null) {
    this.hideColumns();
  }
  // Check localStorage value and show/hide weight columns accordingly.
  else {
    if (localStorage.getItem('Backdrop.tableDrag.showWeight') === '1') {
      this.showColumns();
    }
    else {
      this.hideColumns();
    }
  }

  // Add event listener to storage events in other windows on the same domain.
  window.addEventListener('storage', function (event) {
    if (event.key === 'Backdrop.tableDrag.showWeight') {
      if (event.newValue === '1') {
        Backdrop.tableDrag.prototype.showColumns();
      }
      else {
        Backdrop.tableDrag.prototype.hideColumns();
      }
    }
  });
};

/**
 * Mark cells that have colspan so we can adjust the colspan
 * instead of hiding them altogether.
 */
Backdrop.tableDrag.prototype.addColspanClass = function(columnIndex) {
  return function () {
    // Get the columnIndex and adjust for any colspans in this row.
    var $row = $(this);
    var index = columnIndex;
    var cells = $row.children();
    var cell;
    cells.each(function (n) {
      if (n < index && this.colSpan && this.colSpan > 1) {
        index -= this.colSpan - 1;
      }
    });
    if (index > 0) {
      cell = cells.filter(':nth-child(' + index + ')');
      if (cell[0].colSpan && cell[0].colSpan > 1) {
        // If this cell has a colspan, mark it so we can reduce the colspan.
        cell.addClass('tabledrag-has-colspan');
      }
      else {
        // Mark this cell so we can hide it.
        cell.addClass('tabledrag-hide');
      }
    }
  };
};

/**
 * Hide the columns containing weight/parent form elements.
 * Undo showColumns().
 */
Backdrop.tableDrag.prototype.hideColumns = function () {
  // Hide weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', 'none');
  $('table.tabledrag-processed').addClass('tabledrag-handles-shown');
  // Show TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', '');
  // Reduce the colspan of any effected multi-span columns.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan - 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Backdrop.t('Show row weights'));
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'hide');
};

/**
 * Show the columns containing weight/parent form elements
 * Undo hideColumns().
 */
Backdrop.tableDrag.prototype.showColumns = function () {
  // Show weight/parent cells and headers.
  $('.tabledrag-hide', 'table.tabledrag-processed').css('display', '');
  $('table.tabledrag-processed').removeClass('tabledrag-handles-shown');
  // Hide TableDrag handles.
  $('.tabledrag-handle', 'table.tabledrag-processed').css('display', 'none');
  // Increase the colspan for any columns where it was previously reduced.
  $('.tabledrag-has-colspan', 'table.tabledrag-processed').each(function () {
    this.colSpan = this.colSpan + 1;
  });
  // Change link text.
  $('.tabledrag-toggle-weight').text(Backdrop.t('Hide row weights'));
  // Trigger an event to allow other scripts to react to this display change.
  $('table.tabledrag-processed').trigger('columnschange', 'show');
};

/**
 * Find the target used within a particular row and group.
 */
Backdrop.tableDrag.prototype.rowSettings = function (group, row) {
  var field = $('.' + group, row);
  var tableSettingsGroup = this.tableSettings[group];
   for (var delta in tableSettingsGroup) {
     if (tableSettingsGroup.hasOwnProperty(delta)) {
       var targetClass = tableSettingsGroup[delta].target;
       if (field.is('.' + targetClass)) {
         // Return a copy of the row settings.
         var rowSettings = {};
         for (var n in tableSettingsGroup[delta]) {
           if (tableSettingsGroup[delta].hasOwnProperty(n)) {
             rowSettings[n] = tableSettingsGroup[delta][n];
           }
         }
         return rowSettings;
      }
    }
  }
};

/**
 * Take an item and add event handlers to make it become draggable.
 */
Backdrop.tableDrag.prototype.makeDraggable = function (item) {
  var self = this;
  var $item = $(item);

  // Create the handle.
  var handle = $(Backdrop.theme('tableDragHandle'));
  if (this.indentEnabled !== true) {
    handle.addClass('tabledrag-handle-y');
  }
  // Insert the handle after indentations (if any).
  var $indentationLast = $item.find('td:first .indentation:last');
  if ($indentationLast.length) {
    $indentationLast.after(handle);
    // Update the total width of indentation in this entire table.
    self.indentCount = Math.max($item.find('.indentation').length, self.indentCount);
  }
  else {
    $item.find('td:first').prepend(handle);
  }

  // Add hover action for the handle.
  handle.on('mouseenter', function () {
    self.dragObject == null ? $(this).addClass('tabledrag-handle-hover') : null;
  });
  handle.on('mouseleave', function () {
    self.dragObject == null ? $(this).removeClass('tabledrag-handle-hover') : null;
  });

  // Add event handler to start dragging when a handle is clicked or touched
  handle.on('mousedown touchstart pointerdown', function (event) {
    event.preventDefault();
    if (event.type == "touchstart") {
      event = event.originalEvent.touches[0];
    }
    self.dragStart(event, self, item);
  });

  // Prevent the anchor tag from jumping us to the top of the page.
  handle.on('click', function (e) {
    e.preventDefault();
  });

  // Set blur cleanup when a handle is focused.
  handle.on('focus', function () {
    $(this).addClass('tabledrag-handle-hover');
    self.safeBlur = true;
  });

  // On blur, fire the same function as a touchend/mouseup. This is used to
  // update values after a row has been moved through the keyboard support.
  handle.on('blur', function (event) {
    $(this).removeClass('tabledrag-handle-hover');
    if (self.rowObject && self.safeBlur) {
      self.dropRow(event, self);
    }
  });

  // Add arrow-key support to the handle.
  handle.on('keydown', function (event) {
    // If a rowObject doesn't yet exist and this isn't the tab key.
    if (event.keyCode !== 9 && !self.rowObject) {
      self.rowObject = new self.row(item, 'keyboard', self.indentEnabled, self.maxDepth, true);
    }

    var keyChange = false;
    var groupHeight;
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 63234: // Safari left arrow.
        keyChange = true;
        self.rowObject.indent(-1 * self.rtl);
        break;
      case 38: // Up arrow.
      case 63232: // Safari up arrow.
        var $previousRow = $(self.rowObject.element).prev('tr').eq(0);
        var previousRow = $previousRow.get(0);
        while (previousRow && $previousRow.is(':hidden')) {
          $previousRow = $(previousRow).prev('tr').eq(0);
          previousRow = $previousRow.get(0);
        }
        if (previousRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'up';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the previous top-level row.
            groupHeight = 0;
            while (previousRow && $previousRow.find('.indentation').length) {
              $previousRow = $(previousRow).prev('tr').eq(0);
              previousRow = $previousRow.get(0);
              groupHeight += $previousRow.is(':hidden') ? 0 : previousRow.offsetHeight;
            }
            if (previousRow) {
              self.rowObject.swap('before', previousRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, -groupHeight);
            }
          }
          else if (self.table.tBodies[0].rows[0] !== previousRow || $previousRow.is('.draggable')) {
            // Swap with the previous row (unless previous row is the first one
            // and undraggable).
            self.rowObject.swap('before', previousRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, -parseInt(item.offsetHeight, 10));
          }
          handle.trigger('focus'); // Regain focus after the DOM manipulation.
        }
        break;
      case 39: // Right arrow.
      case 63235: // Safari right arrow.
        keyChange = true;
        self.rowObject.indent(self.rtl);
        break;
      case 40: // Down arrow.
      case 63233: // Safari down arrow.
        var $nextRow = $(self.rowObject.group).filter(':last').next('tr').eq(0);
        var nextRow = $nextRow.get(0);
        while (nextRow && $nextRow.is(':hidden')) {
          $nextRow = $(nextRow).next('tr').eq(0);
          nextRow = $nextRow.get(0);
        }
        if (nextRow) {
          self.safeBlur = false; // Do not allow the onBlur cleanup.
          self.rowObject.direction = 'down';
          keyChange = true;

          if ($(item).is('.tabledrag-root')) {
            // Swap with the next group (necessarily a top-level one).
            groupHeight = 0;
            var nextGroup = new self.row(nextRow, 'keyboard', self.indentEnabled, self.maxDepth, false);
            if (nextGroup) {
              $(nextGroup.group).each(function () {
                groupHeight += $(this).is(':hidden') ? 0 : this.offsetHeight;
              });
              var nextGroupRow = $(nextGroup.group).filter(':last').get(0);
              self.rowObject.swap('after', nextGroupRow);
              // No need to check for indentation, 0 is the only valid one.
              window.scrollBy(0, parseInt(groupHeight, 10));
            }
          }
          else {
            // Swap with the next row.
            self.rowObject.swap('after', nextRow);
            self.rowObject.interval = null;
            self.rowObject.indent(0);
            window.scrollBy(0, parseInt(item.offsetHeight, 10));
          }
          handle.trigger('focus'); // Regain focus after the DOM manipulation.
        }
        break;
    }

    if (self.rowObject && self.rowObject.changed === true) {
      $(item).addClass('drag');
      if (self.oldRowElement) {
        $(self.oldRowElement).removeClass('drag-previous');
      }
      self.oldRowElement = item;
      self.restripeTable();
      self.onDrag();
    }

    // Returning false if we have an arrow key to prevent scrolling.
    if (keyChange) {
      return false;
    }
  });

  // Compatibility addition, return false on keypress to prevent unwanted scrolling.
  // IE and Safari will suppress scrolling on keydown, but all other browsers
  // need to return false on keypress. http://www.quirksmode.org/js/keys.html
  handle.on('keypress', function (event) {
    switch (event.keyCode) {
      case 37: // Left arrow.
      case 38: // Up arrow.
      case 39: // Right arrow.
      case 40: // Down arrow.
        return false;
    }
  });
};

/**
 * Pointer event initiator, creates drag object and information.
 *
 * @param jQuery.Event event
 *   The event object that trigger the drag.
 * @param Backdrop.tableDrag self
 *   The drag handle.
 * @param DOM item
 *   The item that that is being dragged.
 */
Backdrop.tableDrag.prototype.dragStart = function (event, self, item) {
  // Create a new dragObject recording the pointer information.
  self.dragObject = {};
  self.dragObject.initOffset = self.getPointerOffset(item, event);
  self.dragObject.initPointerCoords = self.pointerCoords(event);
  if (self.indentEnabled) {
    self.dragObject.indentPointerPos = self.dragObject.initPointerCoords;
  }

  // If there's a lingering row object from the keyboard, remove its focus.
  if (self.rowObject) {
    $(self.rowObject.element).find('a.tabledrag-handle').trigger('blur');
  }

  // Create a new rowObject for manipulation of this row.
  self.rowObject = new self.row(item, 'pointer', self.indentEnabled, self.maxDepth, true);

  // Save the position of the table.
  self.table.topY = $(self.table).offset().top;
  self.table.bottomY = self.table.topY + self.table.offsetHeight;

  // Add classes to the handle and row.
  $(item).addClass('drag');

  // Set the document to use the move cursor during drag.
  $('body').addClass('drag');
  if (self.oldRowElement) {
    $(self.oldRowElement).removeClass('drag-previous');
  }
};

/**
 * Pointer movement handler, bound to document.
 */
Backdrop.tableDrag.prototype.dragRow = function (event, self) {
  if (self.dragObject) {
    self.currentPointerCoords = self.pointerCoords(event);
    var y = self.currentPointerCoords.y - self.dragObject.initOffset.y;
    var x = self.currentPointerCoords.x - self.dragObject.initOffset.x;

    // Check for row swapping and vertical scrolling.
    if (y !== self.oldY) {
      self.rowObject.direction = y > self.oldY ? 'down' : 'up';
      self.oldY = y; // Update the old value.

      // Check if the window should be scrolled (and how fast).
      var scrollAmount = self.checkScroll(self.currentPointerCoords.y);
      // Stop any current scrolling.
      clearInterval(self.scrollInterval);
      // Continue scrolling if the pointer has moved in the scroll direction.
      if (scrollAmount > 0 && self.rowObject.direction === 'down' || scrollAmount < 0 && self.rowObject.direction === 'up') {
        self.setScroll(scrollAmount);
      }

      // If we have a valid target, perform the swap and restripe the table.
      var currentRow = self.findDropTargetRow(x, y);
      if (currentRow) {
        if (self.rowObject.direction === 'down') {
          self.rowObject.swap('after', currentRow, self);
        }
        else {
          self.rowObject.swap('before', currentRow, self);
        }
        self.restripeTable();
      }
    }

    // Similar to row swapping, handle indentations.
    if (self.indentEnabled) {
      var xDiff = self.currentPointerCoords.x - self.dragObject.indentPointerPos.x;
      // Set the number of indentations the pointer has been moved left or right.
      var indentDiff = Math.round(xDiff / self.indentAmount);
      // Indent the row with our estimated diff, which may be further
      // restricted according to the rows around this row.
      var indentChange = self.rowObject.indent(indentDiff);
      // Update table and pointer indentations.
      self.dragObject.indentPointerPos.x += self.indentAmount * indentChange;
      self.indentCount = Math.max(self.indentCount, self.rowObject.indents);
    }

    return false;
  }
};

/**
 * Pointerup behavior.
 */
Backdrop.tableDrag.prototype.dropRow = function (event, self) {
  var droppedRow, $droppedRow;

  // Drop row functionality.
  if (self.rowObject !== null) {
    droppedRow = self.rowObject.element;
    $droppedRow = $(droppedRow);
    // The row is already in the right place so we just release it.
    if (self.rowObject.changed === true) {
      // Update the fields in the dropped row.
      self.updateFields(droppedRow);

      // If a setting exists for affecting the entire group, update all the
      // fields in the entire dragged group.
      for (var group in self.tableSettings) {
        if (self.tableSettings.hasOwnProperty(group)) {
          var rowSettings = self.rowSettings(group, droppedRow);
          if (rowSettings.relationship === 'group') {
            for (var n in self.rowObject.children) {
              if (self.rowObject.children.hasOwnProperty(n)) {
                self.updateField(self.rowObject.children[n], group);
              }
            }
          }
        }
      }

      self.rowObject.markChanged();
      if (self.changed === false) {
        $(Backdrop.theme('tableDragChangedWarning')).insertBefore(self.table).hide().fadeIn('slow');
        self.changed = true;
      }
    }

    if (self.indentEnabled) {
      self.rowObject.removeIndentClasses();
    }
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }
    $droppedRow.removeClass('drag').addClass('drag-previous');
    self.oldRowElement = droppedRow;
    self.onDrop();
    self.rowObject = null;
  }

  // Functionality specific only to pointerup events.
  if (self.dragObject !== null) {
    $('.tabledrag-handle', droppedRow).removeClass('tabledrag-handle-hover');

    self.dragObject = null;
    $('body').removeClass('drag');
    clearInterval(self.scrollInterval);
  }
};


/**
 * Get the coordinates from the event (allowing for browser differences).
 */
Backdrop.tableDrag.prototype.pointerCoords = function (event) {
  // Complete support for pointer events was only introduced to jQuery in
  // version 1.11.1; between versions 1.7 and 1.11.0 pointer events have the
  // clientX and clientY properties undefined. In those cases, the properties
  // must be retrieved from the event.originalEvent object instead.
  var clientX = event.clientX || event.originalEvent.clientX;
  var clientY = event.clientY || event.originalEvent.clientY;

  if (event.pageX || event.pageY) {
    return { x: event.pageX, y: event.pageY };
  }

  return {
    x: clientX + document.body.scrollLeft - document.body.clientLeft,
    y: clientY + document.body.scrollTop  - document.body.clientTop
  };
};

/**
 * Given a target element and a pointer event, get the event offset from that
 * element. To do this we need the element's position and the target position.
 */
Backdrop.tableDrag.prototype.getPointerOffset = function (target, event) {
  var docPos   = $(target).offset();
  var pointerPos = this.pointerCoords(event);
  return { x: pointerPos.x - docPos.left, y: pointerPos.y - docPos.top };
};

/**
 * Find the row the pointer is currently over. This row is then taken and
 * swapped with the one being dragged.
 *
 * @param x
 *   The x coordinate of the pointer on the page (not the screen).
 * @param y
 *   The y coordinate of the pointer on the page (not the screen).
 */
Backdrop.tableDrag.prototype.findDropTargetRow = function (x, y) {
  var rows = $(this.table.tBodies[0].rows).not(':hidden');
  for (var n = 0; n < rows.length; n++) {
    var row = rows[n];
    var rowY = $(row).offset().top;
    var rowHeight;
    // Because Safari does not report offsetHeight on table rows, but does on
    // table cells, grab the firstChild of the row and use that instead.
    // http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari.
    if (row.offsetHeight == 0) {
      rowHeight = parseInt(row.firstChild.offsetHeight, 10) / 2;
    }
    // Other browsers.
    else {
      rowHeight = parseInt(row.offsetHeight, 10) / 2;
    }

    // Because we always insert before, we need to offset the height a bit.
    if ((y > (rowY - rowHeight)) && (y < (rowY + rowHeight))) {
      if (this.indentEnabled) {
        // Check that this row is not a child of the row being dragged.
        for (n in this.rowObject.group) {
          if (this.rowObject.group[n] == row) {
            return null;
          }
        }
      }
      else {
        // Do not allow a row to be swapped with itself.
        if (row == this.rowObject.element) {
          return null;
        }
      }

      // Check that swapping with this row is allowed.
      if (!this.rowObject.isValidSwap(row)) {
        return null;
      }

      // We may have found the row the pointer just passed over, but it doesn't
      // take into account hidden rows. Skip backwards until we find a draggable
      // row.
      while ($(row).is(':hidden') && $(row).prev('tr').is(':hidden')) {
        row = $(row).prev('tr').get(0);
      }
      return row;
    }
  }
  return null;
};

/**
 * After the row is dropped, update the table fields according to the settings
 * set for this table.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 */
Backdrop.tableDrag.prototype.updateFields = function (changedRow) {
  for (var group in this.tableSettings) {
    if (this.tableSettings.hasOwnProperty(group)) {
      // Each group may have a different setting for relationship, so we find
      // the source rows for each separately.
      this.updateField(changedRow, group);
    }
  }
};

/**
 * After the row is dropped, update a single table field according to specific
 * settings.
 *
 * @param changedRow
 *   DOM object for the row that was just dropped.
 * @param group
 *   The settings group on which field updates will occur.
 */
Backdrop.tableDrag.prototype.updateField = function (changedRow, group) {
  var rowSettings = this.rowSettings(group, changedRow);
  var sourceRow, nextRow, previousRow, useSibling;

  // Set the row as its own target.
  if (rowSettings.relationship == 'self' || rowSettings.relationship == 'group') {
    sourceRow = changedRow;
  }
  // Siblings are easy, check previous and next rows.
  else if (rowSettings.relationship == 'sibling') {
    previousRow = $(changedRow).prev('tr').get(0);
    nextRow = $(changedRow).next('tr').get(0);
    sourceRow = changedRow;
    if ($(previousRow).is('.draggable') && $('.' + group, previousRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', previousRow).length == $('.indentations', changedRow)) {
          sourceRow = previousRow;
        }
      }
      else {
        sourceRow = previousRow;
      }
    }
    else if ($(nextRow).is('.draggable') && $('.' + group, nextRow).length) {
      if (this.indentEnabled) {
        if ($('.indentations', nextRow).length == $('.indentations', changedRow)) {
          sourceRow = nextRow;
        }
      }
      else {
        sourceRow = nextRow;
      }
    }
  }
  // Parents, look up the tree until we find a field not in this group.
  // Go up as many parents as indentations in the changed row.
  else if (rowSettings.relationship == 'parent') {
    previousRow = $(changedRow).prev('tr');
    while (previousRow.length && $('.indentation', previousRow).length >= this.rowObject.indents) {
      previousRow = previousRow.prev('tr');
    }
    // If we found a row.
    if (previousRow.length) {
      sourceRow = previousRow[0];
    }
    // Otherwise we went all the way to the left of the table without finding
    // a parent, meaning this item has been placed at the root level.
    else {
      // Use the first row in the table as source, because it's guaranteed to
      // be at the root level. Find the first item, then compare this row
      // against it as a sibling.
      sourceRow = $(this.table).find('tr.draggable:first').get(0);
      if (sourceRow == this.rowObject.element) {
        sourceRow = $(this.rowObject.group[this.rowObject.group.length - 1]).next('tr.draggable').get(0);
      }
      useSibling = true;
    }
  }

  // Because we may have moved the row from one category to another,
  // take a look at our sibling and borrow its sources and targets.
  this.copyDragClasses(sourceRow, changedRow, group);
  rowSettings = this.rowSettings(group, changedRow);

  // In the case that we're looking for a parent, but the row is at the top
  // of the tree, copy our sibling's values.
  if (useSibling) {
    rowSettings.relationship = 'sibling';
    rowSettings.source = rowSettings.target;
  }

  var targetClass = '.' + rowSettings.target;
  var targetElement = $(targetClass, changedRow).get(0);

  // Check if a target element exists in this row.
  if (targetElement) {
    var sourceClass = '.' + rowSettings.source;
    var sourceElement = $(sourceClass, sourceRow).get(0);
    switch (rowSettings.action) {
      case 'depth':
        // Get the depth of the target row.
        targetElement.value = $('.indentation', $(sourceElement).closest('tr')).length;
        break;
      case 'match':
        // Update the value.
        targetElement.value = sourceElement.value;
        break;
      case 'order':
        var siblings = this.rowObject.findSiblings(rowSettings);
        if ($(targetElement).is('select')) {
          // Get a list of acceptable values.
          var values = [];
          $('option', targetElement).each(function () {
            values.push(this.value);
          });
          var maxVal = values[values.length - 1];
          // Populate the values in the siblings.
          $(targetClass, siblings).each(function () {
            // If there are more items than possible values, assign the maximum value to the row.
            if (values.length > 0) {
              this.value = values.shift();
            }
            else {
              this.value = maxVal;
            }
          });
        }
        else {
          // Assume a numeric input field.
          var weight = parseInt($(targetClass, siblings[0]).val(), 10) || 0;
          $(targetClass, siblings).each(function () {
            this.value = weight;
            weight++;
          });
        }
        break;
    }
  }
};

/**
 * Copy all special tableDrag classes from one row's form elements to a
 * different one, removing any special classes that the destination row
 * may have had.
 */
Backdrop.tableDrag.prototype.copyDragClasses = function (sourceRow, targetRow, group) {
  var sourceElement = $('.' + group, sourceRow);
  var targetElement = $('.' + group, targetRow);
  if (sourceElement.length && targetElement.length) {
    targetElement[0].className = sourceElement[0].className;
  }
};

Backdrop.tableDrag.prototype.checkScroll = function (cursorY) {
  var de  = document.documentElement;
  var b  = document.body;

  var windowHeight = this.windowHeight = window.innerHeight || (de.clientHeight && de.clientWidth != 0 ? de.clientHeight : b.offsetHeight);
  var scrollY = this.scrollY = (document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY));
  var trigger = this.scrollSettings.trigger;
  var delta = 0;

  // Return a scroll speed relative to the edge of the screen.
  if (cursorY - scrollY > windowHeight - trigger) {
    delta = trigger / (windowHeight + scrollY - cursorY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return delta * this.scrollSettings.amount;
  }
  else if (cursorY - scrollY < trigger) {
    delta = trigger / (cursorY - scrollY);
    delta = (delta > 0 && delta < trigger) ? delta : trigger;
    return -delta * this.scrollSettings.amount;
  }
};

Backdrop.tableDrag.prototype.setScroll = function (scrollAmount) {
  var self = this;

  this.scrollInterval = setInterval(function () {
    // Update the scroll values stored in the object.
    self.checkScroll(self.currentPointerCoords.y);
    var aboveTable = self.scrollY > self.table.topY;
    var belowTable = self.scrollY + self.windowHeight < self.table.bottomY;
    if (scrollAmount > 0 && belowTable || scrollAmount < 0 && aboveTable) {
      window.scrollBy(0, scrollAmount);
    }
  }, this.scrollSettings.interval);
};

Backdrop.tableDrag.prototype.restripeTable = function () {
  // :even and :odd are reversed because jQuery counts from 0 and
  // we count from 1, so we're out of sync.
  // Match immediate children of the parent element to allow nesting.
  $('> tbody > tr.draggable:visible, > tr.draggable:visible', this.table)
    .removeClass('odd even')
    .filter(':odd').addClass('even').end()
    .filter(':even').addClass('odd');
};

/**
 * Stub function. Allows a custom handler when a row begins dragging.
 */
Backdrop.tableDrag.prototype.onDrag = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is dropped.
 */
Backdrop.tableDrag.prototype.onDrop = function () {
  return null;
};

/**
 * Constructor to make a new object to manipulate a table row.
 *
 * @param tableRow
 *   The DOM element for the table row we will be manipulating.
 * @param method
 *   The method in which this row is being moved. Either 'keyboard' or 'pointer'.
 * @param indentEnabled
 *   Whether the containing table uses indentations. Used for optimizations.
 * @param maxDepth
 *   The maximum amount of indentations this row may contain.
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Backdrop.tableDrag.prototype.row = function (tableRow, method, indentEnabled, maxDepth, addClasses) {
  var $tableRow = $(tableRow)
  this.element = tableRow;
  this.method = method;
  this.group = [tableRow];
  this.groupDepth = $tableRow.find('.indentation').length;
  this.changed = tableRow;
  this.table = $tableRow.closest('table')[0];
  this.indentEnabled = indentEnabled;
  this.maxDepth = maxDepth;
  this.direction = ''; // Direction the row is being moved.

  if (this.indentEnabled) {
    this.indents = this.groupDepth;
    this.children = this.findChildren(addClasses);
    this.group = $.merge(this.group, this.children);
    // Find the depth of this entire group.
    for (var n = 0; n < this.group.length; n++) {
      this.groupDepth = Math.max($('.indentation', this.group[n]).length, this.groupDepth);
    }
  }
};

/**
 * Find all children of rowObject by indentation.
 *
 * @param addClasses
 *   Whether we want to add classes to this row to indicate child relationships.
 */
Backdrop.tableDrag.prototype.row.prototype.findChildren = function (addClasses) {
  var parentIndentation = this.indents;
  var $currentRow = $(this.element, this.table).next('tr.draggable');
  var rows = [];
  var child = 0;
  var rowIndentation;
  while ($currentRow.length) {
    rowIndentation = $currentRow.find('.indentation').length;
    // A greater indentation indicates this is a child.
    if (rowIndentation > parentIndentation) {
      child++;
      rows.push($currentRow[0]);
      if (addClasses) {
        $currentRow.find('.indentation').each(function (indentNum) {
          if (child == 1 && (indentNum == parentIndentation)) {
            $(this).addClass('tree-child-first');
          }
          if (indentNum == parentIndentation) {
            $(this).addClass('tree-child');
          }
          else if (indentNum > parentIndentation) {
            $(this).addClass('tree-child-horizontal');
          }
        });
      }
    }
    else {
      break;
    }
    $currentRow = $currentRow.next('tr.draggable');
  }
  if (addClasses && rows.length) {
    $('.indentation:nth-child(' + (parentIndentation + 1) + ')', rows[rows.length - 1]).addClass('tree-child-last');
  }
  return rows;
};

/**
 * Ensure that two rows are allowed to be swapped.
 *
 * @param row
 *   DOM object for the row being considered for swapping.
 */
Backdrop.tableDrag.prototype.row.prototype.isValidSwap = function (row) {
  if (this.indentEnabled) {
    var prevRow, nextRow;
    if (this.direction == 'down') {
      prevRow = row;
      nextRow = $(row).next('tr').get(0);
    }
    else {
      prevRow = $(row).prev('tr').get(0);
      nextRow = row;
    }
    this.interval = this.validIndentInterval(prevRow, nextRow);

    // We have an invalid swap if the valid indentations interval is empty.
    if (this.interval.min > this.interval.max) {
      return false;
    }
  }

  // Do not let an un-draggable first row have anything put before it.
  if (this.table.tBodies[0].rows[0] == row && $(row).is(':not(.draggable)')) {
    return false;
  }

  return true;
};

/**
 * Perform the swap between two rows.
 *
 * @param position
 *   Whether the swap will occur 'before' or 'after' the given row.
 * @param row
 *   DOM element what will be swapped with the row group.
 */
Backdrop.tableDrag.prototype.row.prototype.swap = function (position, row) {
  Backdrop.detachBehaviors(this.group, Backdrop.settings, 'move');
  $(row)[position](this.group);
  Backdrop.attachBehaviors(this.group, Backdrop.settings);
  this.changed = true;
  this.onSwap(row);
};

/**
 * Determine the valid indentations interval for the row at a given position
 * in the table.
 *
 * @param prevRow
 *   DOM object for the row before the tested position
 *   (or null for first position in the table).
 * @param nextRow
 *   DOM object for the row after the tested position
 *   (or null for last position in the table).
 */
Backdrop.tableDrag.prototype.row.prototype.validIndentInterval = function (prevRow, nextRow) {
  var minIndent, maxIndent;

  // Minimum indentation:
  // Do not orphan the next row.
  minIndent = nextRow ? $('.indentation', nextRow).length : 0;

  // Maximum indentation:
  if (!prevRow || $(prevRow).is(':not(.draggable)') || $(this.element).is('.tabledrag-root')) {
    // Do not indent:
    // - the first row in the table,
    // - rows dragged below a non-draggable row,
    // - 'root' rows.
    maxIndent = 0;
  }
  else {
    // Do not go deeper than as a child of the previous row.
    maxIndent = $('.indentation', prevRow).length + ($(prevRow).is('.tabledrag-leaf') ? 0 : 1);
    // Limit by the maximum allowed depth for the table.
    if (this.maxDepth) {
      maxIndent = Math.min(maxIndent, this.maxDepth - (this.groupDepth - this.indents));
    }
  }

  return { 'min': minIndent, 'max': maxIndent };
};

/**
 * Indent a row within the legal bounds of the table.
 *
 * @param indentDiff
 *   The number of additional indentations proposed for the row (can be
 *   positive or negative). This number will be adjusted to nearest valid
 *   indentation level for the row.
 */
Backdrop.tableDrag.prototype.row.prototype.indent = function (indentDiff) {
  // Determine the valid indentations interval if not available yet.
  if (!this.interval) {
    var prevRow = $(this.element).prev('tr').get(0);
    var nextRow = $(this.group).filter(':last').next('tr').get(0);
    this.interval = this.validIndentInterval(prevRow, nextRow);
  }

  // Adjust to the nearest valid indentation.
  var indent = this.indents + indentDiff;
  indent = Math.max(indent, this.interval.min);
  indent = Math.min(indent, this.interval.max);
  indentDiff = indent - this.indents;

  for (var n = 1; n <= Math.abs(indentDiff); n++) {
    // Add or remove indentations.
    if (indentDiff < 0) {
      $('.indentation:first', this.group).remove();
      this.indents--;
    }
    else {
      $('td:first', this.group).prepend(Backdrop.theme('tableDragIndentation'));
      this.indents++;
    }
  }
  if (indentDiff) {
    // Update indentation for this row.
    this.changed = true;
    this.groupDepth += indentDiff;
    this.onIndent();
  }

  return indentDiff;
};

/**
 * Find all siblings for a row, either according to its subgroup or indentation.
 * Note that the passed-in row is included in the list of siblings.
 *
 * @param settings
 *   The field settings we're using to identify what constitutes a sibling.
 */
Backdrop.tableDrag.prototype.row.prototype.findSiblings = function (rowSettings) {
  var siblings = [];
  var directions = ['prev', 'next'];
  var rowIndentation = this.indents;
  var checkRowIndentation;
  for (var d = 0; d < directions.length; d++) {
    var checkRow = $(this.element)[directions[d]]();
    while (checkRow.length) {
      // Check that the sibling contains a similar target field.
      if ($('.' + rowSettings.target, checkRow)) {
        // Either add immediately if this is a flat table, or check to ensure
        // that this row has the same level of indentation.
        if (this.indentEnabled) {
          checkRowIndentation = checkRow.find('.indentation').length;
        }

        if (!(this.indentEnabled) || (checkRowIndentation == rowIndentation)) {
          siblings.push(checkRow[0]);
        }
        else if (checkRowIndentation < rowIndentation) {
          // No need to keep looking for siblings when we get to a parent.
          break;
        }
      }
      else {
        break;
      }
      checkRow = $(checkRow)[directions[d]]();
    }
    // Since siblings are added in reverse order for previous, reverse the
    // completed list of previous siblings. Add the current row and continue.
    if (directions[d] == 'prev') {
      siblings.reverse();
      siblings.push(this.element);
    }
  }
  return siblings;
};

/**
 * Remove indentation helper classes from the current row group.
 */
Backdrop.tableDrag.prototype.row.prototype.removeIndentClasses = function () {
  for (var n in this.children) {
    if (this.children.hasOwnProperty(n)) {
       $(this.children[n]).find('.indentation')
         .removeClass('tree-child')
         .removeClass('tree-child-first')
         .removeClass('tree-child-last')
         .removeClass('tree-child-horizontal');
     }
  }
};

/**
 * Add an asterisk or other marker to the changed row.
 */
Backdrop.tableDrag.prototype.row.prototype.markChanged = function () {
  var marker = Backdrop.theme('tableDragChangedMarker');
  var cell = $('td:first', this.element);
  if ($('abbr.tabledrag-changed', cell).length == 0) {
    cell.append(marker);
  }
};

/**
 * Stub function. Allows a custom handler when a row is indented.
 */
Backdrop.tableDrag.prototype.row.prototype.onIndent = function () {
  return null;
};

/**
 * Stub function. Allows a custom handler when a row is swapped.
 */
Backdrop.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
  return null;
};

Backdrop.theme.prototype.tableDragHandle = function () {
  return '<a href="#" title="' + Backdrop.t('Drag to re-order') + '" class="tabledrag-handle"><div class="handle">&nbsp;</div></a>';
};

Backdrop.theme.prototype.tableDragChangedMarker = function () {
  return '<abbr class="warning tabledrag-changed" title="' + Backdrop.t('Changed') + '">*</abbr>';
};

Backdrop.theme.prototype.tableDragIndentation = function () {
  return '<div class="indentation">&nbsp;</div>';
};

Backdrop.theme.prototype.tableDragChangedWarning = function () {
  return '<div class="tabledrag-changed-warning messages warning">' + Backdrop.theme('tableDragChangedMarker') + ' ' + Backdrop.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
};

})(jQuery);
;
/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Backdrop.contextualLinks = Backdrop.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Backdrop.behaviors.contextualLinks = {
  attach: function (context) {
    $('.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Backdrop.t('Configure')).on('click',
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );

      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).on('mouseenter', function () {
        $region.addClass('contextual-links-region-active');
      });
      $trigger.add($links).on('mouseleave', function () {
        $region.removeClass('contextual-links-region-active');
      });

      // Hide the contextual links when user clicks a link or rolls out of the
      // .contextual-links-region.
      $region.on('mouseleave click', Backdrop.contextualLinks.mouseleave);
      $region.on('mouseenter', function() {
        $trigger.addClass('contextual-links-trigger-active');
      });
      $region.on('mouseleave', function() {
        $trigger.removeClass('contextual-links-trigger-active');
      });

      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });

    /**
     * Adjusts trigger positions in contextual links to avoid overlaps.
     */
    function adjustContextualLinks() {
      // Get all wrappers anywhere on the page and some info about each.
      var allWrappers = [];
      $('.contextual-links-wrapper', context).each(function() {
        allWrappers.push({
          '$wrapper': $(this),
          'regionOffsetBottom': $(this).parent().offset().top + $(this).parent().height(),
          'hShift': 0,
          'vShift': 0
        });
      });

      // Reset margins on all wrappers.
      allWrappers.forEach(function(info) {
        info.$wrapper.css('margin', '0');
      });

      // Recalculate margins to avoid collisions.
      var dir = $('html').attr('dir');
      const hSize = 28; // width of trigger wrapper
      const vSize = 19; // height of trigger wrapper
      var n = allWrappers.length;
      for (let i = 0; i < n; i++) {
        var follower = allWrappers[i];
        // Compare follower against all of its predecessors in the list (any of
        // which may have already been adjusted).
        for (let j = 0; j < i; j++) {
          var leader = allWrappers[j];
          // Adjust the position of follower if necessary to avoid collision
          // with leader.
          var leaderOffset = leader.$wrapper.offset();
          var followerOffset = follower.$wrapper.offset();
          // Check vertical overlap.
          if (!(followerOffset.top >= leaderOffset.top && followerOffset.top < leaderOffset.top + vSize)) {
            continue;
          }
          if (dir == 'ltr') {
            // Check horizontal overlap.
            if (followerOffset.left >= leaderOffset.left - hSize && followerOffset.left < leaderOffset.left + hSize) {
              // We have a collision; shift the follower down if there's room,
              // otherwise left.
              if (followerOffset.top + 2 * vSize <= follower.regionOffsetBottom) {
                // Shift down
                follower.vShift += vSize;
                follower.$wrapper.css('margin-top', follower.vShift);
              }
              else {
                // Shift left and start a new column.
                follower.vShift = 0;
                follower.hShift += hSize;
                follower.$wrapper.css('margin-top', follower.vShift);
                follower.$wrapper.css('margin-right', follower.hShift);
              }
            }
          }
          else { // rtl
            // Check horizontal overlap.
            if (followerOffset.left > leaderOffset.left - hSize && followerOffset.left <= leaderOffset.left + hSize) {
              // We have a collision; shift the follower down if there's room,
              // otherwise right.
              if (followerOffset.top + 2 * vSize <= follower.regionOffsetBottom) {
                // Shift down
                follower.vShift += vSize;
                follower.$wrapper.css('margin-top', follower.vShift);
              }
              else {
                // Shift right and start a new column.
                follower.vShift = 0;
                follower.hShift += hSize;
                follower.$wrapper.css('margin-top', follower.vShift);
                follower.$wrapper.css('margin-left', follower.hShift);
              }
            }
          }
        }
      }
    }
    $(document).ready(adjustContextualLinks);

    // Usually Backdrop.optimizedResize() would be used for a window resize
    // event, but this potentially expensive operation should be limited to
    // firing infrequently, so Backdrop.debounce() is used here instead.
    $(window).on('resize', Backdrop.debounce(adjustContextualLinks, 500));
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Backdrop.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.backdropGetSummary = function () {
  var callback = this.data('summaryCallback');
  var returnValue = (this[0] && callback) ? callback(this[0]) : '';
  return typeof returnValue === 'string' ? returnValue.trim() : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.backdropSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .off('formUpdated.summary')
    .on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Backdrop.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').addBack().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .off(events).on(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prevents consecutive form submissions of identical form values.
 *
 * Repetitive form submissions that would submit the identical form values are
 * prevented, unless the form values are different from the previously
 * submitted values.
 *
 * This is a simplified re-implementation of a user-agent behavior that should
 * be natively supported by major web browsers, but at this time, only Firefox
 * has a built-in protection.
 *
 * A form value-based approach ensures that the constraint is triggered for
 * consecutive, identical form submissions only. Compared to that, a form
 * button-based approach would (1) rely on [visible] buttons to exist where
 * technically not required and (2) require more complex state management if
 * there are multiple buttons in a form.
 *
 * This implementation is based on form-level submit events only, and relies on
 * jQuery's serialize() method to determine submitted form values. As such, the
 * following limitations exist:
 *
 * - Event handlers on form buttons that preventDefault() do not receive a
 *   double-submit protection. That is deemed to be fine, since such button
 *   events typically trigger reversible client-side or server-side operations
 *   that are local to the context of a form only.
 * - Changed values in advanced form controls, such as file inputs, are not part
 *   of the form values being compared between consecutive form submits (due to
 *   limitations of jQuery.serialize()). That is deemed to be acceptable,
 *   because if the user forgot to attach a file, then the size of HTTP payload
 *   will most likely be small enough to be fully passed to the server endpoint
 *   within (milli)seconds. If a user mistakenly attached a wrong file and is
 *   technically versed enough to cancel the form submission (and HTTP payload)
 *   in order to attach a different file, then that edge-case is not supported
 *   here.
 *
 * Lastly, all forms submitted via HTTP GET are idempotent by definition of HTTP
 * standards, so excluded in this implementation.
 */
Backdrop.behaviors.formSingleSubmit = {
  attach: function () {
    function onFormSubmit (e) {
      // Prevent this from firing multiple times per request.
      e.stopImmediatePropagation();
      if (e.isDefaultPrevented()) {
        // Don't act on form submissions that have been prevented by other JS.
        return;
      }
      var $form = $(e.currentTarget);
      var formValues = $form.serialize();
      var previousValues = $form.attr('data-backdrop-form-submit-last');
      if (previousValues === formValues) {
        e.preventDefault();
      }
      else {
        $form.attr('data-backdrop-form-submit-last', formValues);
      }
    }

    $('body').once('form-single-submit')
      .on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);

  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Backdrop.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Backdrop.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
