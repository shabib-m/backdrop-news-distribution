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
/**
 * @file
 * Attaches behavior for the Filter module.
 */

(function ($) {

/**
 * Initialize an empty object where editors can place their attachment code.
 */
Backdrop.editors = {};

/**
 * Horizontal offset while the image browser window is open.
 */
Backdrop.filterModalLeft = undefined;

/**
 * Displays the guidelines of the selected text format automatically.
 */
Backdrop.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .on('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .trigger('change');
  }
};

/**
 * Enables an editor (if any) when the matching format is selected.
 */
Backdrop.behaviors.filterEditors = {
  attach: function (context, settings) {
    // If there are no filter settings, there are no editors to enable.
    if (!settings.filter) {
      return;
    }

    var $context = $(context);
    $context.find('.filter-list:input').once('filterEditors', function () {
      var $this = $(this);
      var activeEditor = $this.val();
      var field = $this.closest('.text-format-wrapper').find('textarea').get(-1);

      // No textarea found. This may happen on long text elements that use a
      // single-line text field widget.
      if (!field) {
        return;
      }

      // Directly attach this editor, if the input format is enabled or there is
      // only one input format at all.
      if ($this.is(':input')) {
        if (Backdrop.settings.filter.formats[activeEditor]) {
          Backdrop.filterEditorAttach(field, Backdrop.settings.filter.formats[activeEditor]);
        }
      }
      // Attach onChange handlers to input format selector elements.
      if ($this.is('select')) {
        $this.on('change', function() {
          // Detach the current editor (if any) and attach a new editor.
          if (Backdrop.settings.filter.formats[activeEditor]) {
            Backdrop.filterEditorDetach(field, Backdrop.settings.filter.formats[activeEditor]);
          }
          activeEditor = $this.val();
          if (Backdrop.settings.filter.formats[activeEditor]) {
            Backdrop.filterEditorAttach(field, Backdrop.settings.filter.formats[activeEditor]);
          }
        });
      }
      // Detach any editor when the containing form is submitted.
      $this.parents('form').on('submit', function (event) {
        // Do not detach if the event was canceled.
        if (event.isDefaultPrevented()) {
          return;
        }
        // Detach the editor with "submit" when doing a non-AJAX submit.
        Backdrop.filterEditorDetach(field, Backdrop.settings.filter.formats[activeEditor], 'submit');
      });
    });
  },
  detach: function (context, settings, trigger) {
    var $context = $(context);
    $context.find('.filter-list:input').each(function () {
      var $this = $(this);
      var activeEditor = $this.val();
      var field = $this.closest('.text-format-wrapper').find('textarea').get(-1);
      if (trigger !== 'serialize') {
        $this.removeOnce('filterEditors');
      }
      if (field && Backdrop.settings.filter.formats[activeEditor]) {
        Backdrop.filterEditorDetach(field, Backdrop.settings.filter.formats[activeEditor], trigger);
      }
    });
  }
};

/**
 * Attach an editor to a textarea field.
 *
 * @param {Element} field
 *   The original textarea DOM element.
 * @param {Object} format
 *   The text format information.
 */
Backdrop.filterEditorAttach = function(field, format) {
  if (format.editor && Backdrop.editors[format.editor]) {
    Backdrop.editors[format.editor].attach(field, format);
  }
};

  /**
   * Detach an editor from the page.
   *
   * @param {Element} field
   *   The original textarea DOM element.
   * @param {Object} format
   *   The text format information.
   * @param {string} trigger
   *   A string with the value "unload", "move", "serialize" (see
   *   Backdrop.detachBehaviors() for more information on these), or "submit".
   *   Submit is used to detach editors when the complete form is submitted
   *   with non-AJAX behavior, which may be useful to let the browser clean up
   *   the editor's events and memory.
   *
   * @see Backdrop.detachBehaviors()
   */
  Backdrop.filterEditorDetach = function(field, format, trigger) {
  trigger = trigger || 'unload';
  if (format.editor && Backdrop.editors[format.editor]) {
    Backdrop.editors[format.editor].detach(field, format, trigger);
  }
};

/**
 * Provides summary text for the "Formatting options" fieldset, under each
 * textarea field with a text editor.
 */
Backdrop.behaviors.filterFieldsetSummaries = {
  attach: function (context) {
    $(context).find('fieldset.filter-wrapper').backdropSetSummary(function (element) {
      var summary = '';
      // Look for a select list of text formats.
      var $select_list = $(element).find('select.filterEditors-processed :selected');
      // Otherwise look for a hidden input element (when the current user has
      // access to only a single text format).
      var $input_element = $(element).find('input.filterEditors-processed');

      if ($select_list.length) {
        summary = $select_list.text();
      }
      else if ($input_element.length) {
        summary = $input_element.attr('data-text-format-name');
      }

      return summary;
    });
  }
};

/**
 * Provides toggles for uploading an image, whether by URL or upload.
 */
Backdrop.behaviors.editorImageDialog = {
  attach: function (context, settings) {
    var $newToggles = $('[data-editor-image-toggle]', context).once('editor-image-toggle');
    $newToggles.each(function() {
      var $toggleItems = $('[data-editor-image-toggle]');

      // Remove any previous toggles next to all labels.
      $toggleItems.find('label').siblings('.editor-image-toggle').remove();

      // Add toggles next to all labels.
      var $toggleLink, toggleLabel;
      $toggleItems.each(function(n) {
        $toggleItems.eq(n).find('label:first').addClass('editor-image-toggle');
        $toggleItems.each(function(m) {
          toggleLabel = $toggleItems.eq(m).attr('data-editor-image-toggle');
          $toggleLink = $('<a class="editor-image-toggle" href="#"></a>').text(toggleLabel);
          if (n > m) {
            $toggleItems.eq(n).find('label:first').before($toggleLink);
          }
          else if (n < m) {
            $toggleItems.eq(n).find('label:first').after($toggleLink);
          }
        });

        // Because these elements are not the first and last elements of their
        // parent (the form-element wrapper), we need specific classes to target
        // them instead of using :first-child and :last-child in CSS.
        $toggleItems.eq(n).find('.editor-image-toggle').removeClass('first last')
          .filter(':first').addClass('first').end()
          .filter(':last').addClass('last').end();
      });
    });

    // Initialize styles of Dialog.
    if ($newToggles.length) {
      // Hide the library image browser on load.
      $(".editor-dialog").removeClass("editor-dialog-with-library");
      // Set the class for the left-hand part.
      $(".editor-image-fields").addClass("editor-image-fields-full");
    }

    $newToggles.on('click', function(e) {
      var $link = $(e.target);
      if ($link.is('.editor-image-toggle') === false) {
        return;
      }

      // Find the first ancestor of link.
      var $currentItem = $link.closest('[data-editor-image-toggle]');
      var $allItems = $('[data-editor-image-toggle]');
      var offset = $currentItem.find('.editor-image-toggle').index($link);
      var $shownItem = $allItems.eq(offset);
      $allItems.not($shownItem).filter(':visible').hide().trigger('editor-image-hide');
      var $newItem = $allItems.eq(offset).show();
      // Focus the first shown new element. This keeps focus on the dialog and
      // allows it to be closed with the escape key.
      $newItem.find('input, textarea, select').filter(':focusable').first().trigger('focus');
      $newItem.trigger('editor-image-show');

      return false;
    });

    $newToggles.on('editor-image-hide', function() {
      var $input;
      $(this).find('input[type="url"], input[type="text"], textarea').each(function() {
        $input = $(this);
        $input.data('editor-previous-value', $input.val());
        $input.val('');
      });
    });

    $newToggles.on('editor-image-show', function() {
      var $input, previousValue;
      $(this).find('input[type="url"], input[type="text"], textarea').each(function() {
        $input = $(this);
        previousValue = $input.data('editor-previous-value');
        if (previousValue && previousValue.length) {
          $input.val(previousValue);
        }
      });

      var libraryShown = $('.editor-image-fields').find('[name="attributes[src]"]').is(':visible');
      if (libraryShown) {
        // Image library already open.
        if ($('.library-view').length) {
          return;
        }
        // Toggle state is set to show 'select an image'
        // so add library view to dialog display.
        // But only for filter-format-edit-image-form.
        if ($('form').hasClass('filter-format-editor-image-form')) {
          // Remove the dialog position, let the filter.css CSS for a
          // percentage-based width take precedence.
          Backdrop.filterModalLeft = $('.editor-dialog').position().left;
          $('.editor-dialog').css('left', '');
          // Re-center the dialog by triggering a window resize.
          window.setTimeout(function() {
            Backdrop.optimizedResize.trigger();
          }, 500);
          // Increase width of dialog form.
          $('.editor-dialog').addClass('editor-dialog-with-library');

          // Display the library view.
          $('.editor-image-fields').removeClass('editor-image-fields-full');
          $('form.filter-format-editor-image-form').append('<div class="editor-image-library"></div>');
          $('[name=library_open]').trigger('click');
        }
      }
      else {
        // Remove the library part of the dialog form.
        $('.editor-image-library').each(function() {
          Backdrop.detachBehaviors(this);
          $(this).remove();
        });

        // Restore the previous dialog position.
        if (Backdrop.filterModalLeft) {
          $(".editor-dialog").css('left', Backdrop.filterModalLeft + 'px');
          // Re-center the dialog by triggering a window resize.
          window.setTimeout(function() {
            Backdrop.optimizedResize.trigger();
          }, 500);
        }
        $('.editor-dialog').removeClass('editor-dialog-with-library');
        // Set the class for the dialog part.
        $('.editor-image-fields').addClass('editor-image-fields-full');
      }
    });
  }
};

/**
 * Provides behavior for clicking on images within the library browser.
 */
Backdrop.behaviors.editorImageLibrary = {
  attach: function (context, settings) {
    // The context may be the image library div itself, so include the context
    // element in the selector.
    $('[data-editor-library-view]')
      .once('editor-library-view')
      .on('click', '.image-library-choose-file', function() {
        var $libraryFile = $(this);
        var $selectedImg = $libraryFile.find('img');
        var absoluteImgSrc = $selectedImg.data('file-url');
        var relativeImgSrc = Backdrop.relativeUrl(absoluteImgSrc);

        var $form = $('.filter-format-editor-image-form');
        $form.find('[name="attributes[src]"]').val(relativeImgSrc);
        $form.find('[name="fid[fid]"]').val($selectedImg.data('fid'));

        // Reset width and height so image is not stretched to the any
        // previous image's dimensions.
        $form.find('[name="attributes[width]"]').val('');
        $form.find('[name="attributes[height]"]').val('');
        // Remove style from previous selection.
        $('.image-library-image-selected').removeClass('image-library-image-selected');
        // Add style to this selection.
        $libraryFile.addClass('image-library-image-selected');
      })
      .on('dblclick', '.image-library-choose-file', function() {
        var $libraryFile = $(this);
        $libraryFile.trigger('click');
        var $form = $libraryFile.closest('.ui-dialog-content').find('form');
        var $submit = $form.find('.form-actions input[type=submit]:first');
        $submit.trigger('mousedown').trigger('click').trigger('mouseup');
      });

    // Empty width and height input fields, when an existing file is removed,
    // so a newly uploaded one does not inherit dimensions.
    // See Backdrop.behaviors.fileButtons, which triggers mousedown.
    const $imageForm = $('.image-form-wrapper');
    $imageForm.find('.file-remove-button').once('remove-button-listener').on('mousedown', function () {
      $imageForm.find('[name="attributes[width]"]').val('');
      $imageForm.find('[name="attributes[height]"]').val('');
    });
  }
};

/**
 * Command to save the contents of an editor-provided dialog.
 *
 * This command does not close the open dialog. It should be followed by a call
 * to Drupal.AjaxCommands.prototype.closeDialog. Editors that are integrated
 * with dialogs must independently listen for an editor:dialogsave event to save
 * the changes into the contents of their interface.
 */
Backdrop.ajax.prototype.commands.editorDialogSave = function (ajax, response, status) {
  $(window).trigger('editor:dialogsave', [response.values]);
};

$(window).on('dialog:aftercreate', function () {
  // Determine which tab should be shown.
  var $visibleItems = $('[data-editor-image-toggle]').filter(':visible');
  if ($visibleItems.length > 1) {
    var $fidField = $visibleItems.find('[name="fid[fid]"]');
    var $srcField = $visibleItems.find('[name="attributes[src]"]');
    var $srcItem = $visibleItems.find($srcField).closest('[data-editor-image-toggle]');
    var $errorItem = $visibleItems.find('.error').closest('[data-editor-image-toggle]');

    // If any errors are present in the form, pre-select that tab.
    if ($errorItem.length) {
      $visibleItems.not($errorItem).hide().trigger('editor-image-hide');
      $errorItem.find('input, textarea, select').filter(':focusable').first().trigger('focus');
      $errorItem.trigger('editor-image-show');
    }
    // If an FID is not provided but a src attribute is, highlight the tab
    // that contains the src attribute field.
    if (($fidField.val() === '0' || !$fidField.val()) && $srcField.length > 0 && $srcField.val().length > 0) {
      $visibleItems.not($srcItem).hide().trigger('editor-image-hide');
      $srcItem.find('input, textarea, select').filter(':focusable').first().trigger('focus');
      $srcItem.trigger('editor-image-show');
    }
    // Otherwise, show the first tab and hide all the others.
    else {
      $visibleItems.not(':first').hide().trigger('editor-image-hide');
      $visibleItems.first().find('input, textarea, select').filter(':focusable').first().trigger('focus');
      $visibleItems.first().trigger('editor-image-show');
    }
  }
  // If no element is visible show the first tab.
  else {
    $('[data-editor-image-toggle]').not(':first').hide().trigger('editor-image-hide');
    $('[data-editor-image-toggle]').first().show().find('input, textarea, select').filter(':focusable').first().trigger('focus');
    $('[data-editor-image-toggle]').first().trigger('editor-image-show');
  }
});

})(jQuery);
;
(function (CKEditor5) {

"use strict";

/**
 * Backdrop-specific plugin to alter the CKEditor 5 basic tags.
 */
class BackdropBasicStyles extends CKEditor5.Plugin {
  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'BackdropBasicStyles';
  }

  /**
   * @inheritdoc
   */
  init() {
    const editor = this.editor;

    // CKEditor prefers <i> but Backdrop prefers <em>.
    editor.conversion.for('downcast').attributeToElement({
      model: 'italic',
      view: 'em',
      converterPriority: 'high',
    });
    // CKEditor prefers <s> but Backdrop prefers <del>.
    editor.conversion.for('downcast').attributeToElement({
      model: 'strikethrough',
      view: 'del',
      converterPriority: 'high',
    });
    // Backdrop previously preferred <span class="underline">. This converts it
    // to <u> tags preferred by CKEditor 5.
    editor.conversion.for('upcast').elementToAttribute({
      model: 'underline',
      view: {
        name: 'span',
        classes: ['underline'],
      },
      converterPriority: 'low',
    });

    // Support a minimum height option on the editor.
    // See https://stackoverflow.com/a/56550285/845793
    // @todo: Move this functionality or rename the entire plugin?
    const minHeight = editor.config.get('minHeight');
    if (minHeight) {
      editor.ui.view.editable.extendTemplate({
        attributes: {
          style: {
            minHeight: minHeight,
          }
        }
      });
    }
  }
}

// Expose the plugin to the CKEditor5 namespace.
CKEditor5.backdropBasicStyles = {
  'BackdropBasicStyles': BackdropBasicStyles
};

})(CKEditor5);
;
(function (Backdrop, CKEditor5) {

"use strict";

/**
 * A plugin that overrides the CKEditor HTML writer.
 *
 * Overrides the CKEditor 5 HTML writer to properly escape HTML attributes.
 *
 * In particular this makes it so that `<` and `>` characters are escaped when
 * used within the data-caption attribute, allowing caption text to be linked
 * or styled as bold, italic, etc.
 *
 * @see https://github.com/ckeditor/ckeditor5/issues/15293
 * @see https://github.com/backdrop-contrib/ckeditor5/issues/68
 */
class BackdropHtmlEngine extends CKEditor5.Plugin {
  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'BackdropHtmlEngine';
  }

  /**
   * @inheritdoc
   */
  init() {
    this.editor.data.processor.htmlWriter = new BackdropHtmlWriter();
  }
}

// Expose the plugin to the CKEditor5 namespace.
CKEditor5.backdropHtmlEngine = {
  'BackdropHtmlEngine': BackdropHtmlEngine
};

/**
 * Custom HTML writer. It creates HTML by traversing DOM nodes.
 *
 * It differs to CKEditor's core BasicHtmlWriter in the way it encodes entities
 * in element attributes.
 *
 * @see https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_dataprocessor_basichtmlwriter-BasicHtmlWriter.html
 */
class BackdropHtmlWriter {
  /**
   * Returns an HTML string created from the document fragment.
   *
   * @param {Element} fragment
   * @return {String}
   */
  getHtml(fragment) {
    return Backdrop.ckeditor5.elementGetHtml(fragment);
  }
}

})(Backdrop, CKEditor5);
;
/**
 * @file
 * Contains BackdropImage CKEditor 5 plugin and its dependent classes.
 */
(function (CKEditor5) {

"use strict";

/**
 * BackdropImage CKEditor 5 plugin.
 *
 * This complex plugin provides several pieces of key functionality:
 *
 * - Provides an image upload adapter to save images to Backdrop's file system.
 * - Saves data-file-id attributes on img tags which Backdrop uses to track
 *   where files are being used.
 * - Connects to a Backdrop-native dialog via an AJAX request.
 *
 * If this were developed under the normal CKEditor build process, this would
 * likely be split into multiple plugins and files. Backdrop does not use a
 * compilation step, so what is normally 5-8 files is all done in a single file.
 */
class BackdropImage extends CKEditor5.Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return ['ImageUtils', 'FileRepository', 'Image', 'WidgetToolbarRepository', 'ContextualBalloon'];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'BackdropImage';
  }

  /**
   * @inheritdoc
   */
  init() {
    const editor = this.editor;
    const { conversion } = editor;
    const { schema } = editor.model;
    const config = editor.config.get('backdropImage');
    const editLabel = config.editLabel || 'Edit Image';
    const insertLabel = config.insertLabel || 'Insert Image';

    if (!config.extraAttributes) {
      return;
    }

    // Add extra supported attributes to the image models.
    if (schema.isRegistered('imageInline')) {
      schema.extend('imageInline', {
        allowAttributes: Object.keys(config.extraAttributes)
      });
    }
    if (schema.isRegistered('imageBlock')) {
      schema.extend('imageBlock', {
        allowAttributes: Object.keys(config.extraAttributes)
      });
    }

    // Upcast from the raw <img> element to the CKEditor model.
    conversion
      .for('upcast')
      .add(viewImageToModelImage(editor));

    // Upcast any wrapping <a> element to be part of the CKEditor model.
    if (editor.plugins.has('DataFilter')) {
      const dataFilter = editor.plugins.get('DataFilter');
      conversion
        .for('upcast')
        .add(upcastImageBlockLinkGhsAttributes(dataFilter));
    }

    // Downcast from the CKEditor model to an HTML <img> element. This generic
    // downcast runs both while editing and when saving the final HTML.
    conversion
      .for('downcast')
      // Convert the FileId to data-file-id attribute.
      .add(modelFileIdToDataAttribute());

    // Downcast from the CKEditor model to an HTML <img> element. A dataDowncast
    // conversion like this only runs on saving the final HTML, not while the
    // editor is being used.
    conversion
      .for('dataDowncast')
      // Pull out the caption if present. This needs to be done before other
      // conversions because afterward the caption element is eliminated.
      .add(viewCaptionToCaptionAttribute(editor))
      // Create a blank image element, removing any wrapping figure element.
      .elementToElement({
        model: 'imageBlock',
        view: (modelElement, { writer }) => {
          return writer.createEmptyElement('img');
        },
        converterPriority: 'high',
      })
      .elementToElement({
        model: 'imageInline',
        view: (modelElement, { writer }) => {
          return writer.createEmptyElement('img');
        },
        converterPriority: 'high',
      })
      // Convert ImageStyle to data-align attribute.
      .add(modelImageStyleToDataAttribute(editor))
      // Convert height and width attributes.
      .add(modelImageWidthAndHeightToAttributes(editor))
      // Convert any link to wrap the <img> tag.
      .add(downcastBlockImageLink());

    // Add the backdropImage command.
    editor.commands.add('backdropImage', new BackdropImageCommand(editor));

    // Add the editBackdropImage button, for use in the balloon toolbar.
    // This button has a different icon than the main toolbar button.
    editor.ui.componentFactory.add('editBackdropImage', (locale) => {
      const command = editor.commands.get('backdropImage');
      const buttonView = new CKEditor5.ButtonView(locale);
      buttonView.set({
        label: editLabel,
        icon: CKEditor5.IconPencil,
        tooltip: true
      });

      // When clicking the balloon button, execute the backdropImage command.
      buttonView.on('execute', () => {
        // See BackdropImageCommand::execute().
        command.execute();
      });

      return buttonView;
    });

    // Add the backdropImage button for use in the main toolbar. This can
    // insert a new image or edit an existing one if selected.
    editor.ui.componentFactory.add('backdropImage', (locale) => {
      const buttonView = new CKEditor5.ButtonView(locale);
      const command = editor.commands.get('backdropImage');

      buttonView.set({
        label: insertLabel,
        icon: CKEditor5.IconImage,
        tooltip: true
      });

      // Highlight the image button when an image is selected.
      buttonView.bind('isOn').to(command, 'value');

      // Change the label when an image is selected.
      buttonView.bind('label').to(command, 'value', (value) => {
        return value ? editLabel : insertLabel
      });

      // Disable the button when the command is disabled by source mode.
      buttonView.bind('isEnabled').to(command, 'isEnabled');

      // When clicking the toolbar button, execute the backdropImage command.
      buttonView.on('execute', () => {
        // Remove focus from the toolbar button when opening the dialog.
        // Otherwise, the button may receive focus again after closing the
        // dialog.
        buttonView.element.blur();
        // See BackdropImageCommand::execute().
        command.execute();
      });

      return buttonView;
    });

    // Attach the file upload adapter to handle saving files.
    if (!config.uploadUrl) {
      throw new Error('Missing backdropImage.uploadUrl configuration option.');
    }
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new BackdropImageUploadAdapter(loader, editor, config);
    };

    // Upon completing an uploaded file, save the returned File ID.
    const imageUploadEditing = editor.plugins.get('ImageUploadEditing');
    imageUploadEditing.on('uploadComplete', (evt, { data, imageElement }) => {
      editor.model.change((writer) => {
        writer.setAttribute('dataFileId', data.response.fileId, imageElement);
      });
    });
  }

}

// Expose the plugin to the CKEditor5 namespace.
CKEditor5.backdropImage = {
  'BackdropImage': BackdropImage
};

/**
 * Helper function for the downcast converter.
 *
 * Sets attributes on the given view element. This function is copied from
 * the General HTML Support plugin.
 * See https://ckeditor.com/docs/ckeditor5/latest/api/module_html-support_conversionutils.html#function-setViewAttributes
 *
 * @param writer The view writer.
 * @param viewAttributes The GHS attribute value.
 * @param viewElement The view element to update.
 */
function setViewAttributes(writer, viewAttributes, viewElement) {
  if (viewAttributes.attributes) {
    for (const [key, value] of Object.entries(viewAttributes.attributes)) {
      writer.setAttribute(key, value, viewElement);
    }
  }

  if (viewAttributes.styles) {
    writer.setStyle(viewAttributes.styles, viewElement);
  }

  if (viewAttributes.classes ) {
    writer.addClass(viewAttributes.classes, viewElement);
  }
}

/**
 * Generates a callback that saves the File ID to an attribute on downcast.
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function modelFileIdToDataAttribute() {
  /**
   * Callback for the attribute:dataFileId event.
   *
   * Saves the File ID value to the data-file-id attribute.
   *
   * @param {Event} event
   * @param {object} data
   * @param {module:engine/conversion/downcastdispatcher~DowncastConversionApi} conversionApi
   */
  function converter(event, data, conversionApi) {
    const { item } = data;
    const { consumable, writer } = conversionApi;

    if (!consumable.consume(item, event.name)) {
      return;
    }

    const viewElement = conversionApi.mapper.toViewElement(item);
    const imageInFigure = Array.from(viewElement.getChildren()).find(
      (child) => child.name === 'img',
    );

    writer.setAttribute(
      'data-file-id',
      data.attributeNewValue,
      imageInFigure || viewElement,
    );
  }

  return (dispatcher) => {
    dispatcher.on('attribute:dataFileId', converter);
  };
}

/**
 * A mapping between the CKEditor model names and the data-align attribute.
 *
 * @type {Array.<{dataValue: string, modelValue: string}>}
 */
const alignmentMapping = [
  {
    modelValue: 'alignCenter',
    dataValue: 'center',
  },
  {
    modelValue: 'alignRight',
    dataValue: 'right',
  },
  {
    modelValue: 'alignLeft',
    dataValue: 'left',
  },
];

/**
 * Given an imageStyle, return the associated Backdrop data-align attribute.
 *
 * @param string imageStyle
 *   The image style such as alignLeft, alignCenter, or alignRight.
 * @returns {string|undefined}
 *   The data attribute value such as left, center, or right.
 * @private
 */
function _getDataAttributeFromModelImageStyle(imageStyle) {
  const mappedAlignment = alignmentMapping.find(
    (value) => value.modelValue === imageStyle,
  );
  return mappedAlignment ? mappedAlignment.dataValue : undefined;
}

/**
 * Given a data-attribute, return the associated CKEditor image style.
 *
 * @param string dataAttribute
 *   The data attribute value such as left, center, or right.
 * @returns {string|undefined}
 *   The image style such as alignLeft, alignCenter, or alignRight.
 * @private
 */
function _getModelImageStyleFromDataAttribute(dataAttribute) {
  const mappedAlignment = alignmentMapping.find(
    (value) => value.dataValue === dataAttribute,
  );
  return mappedAlignment ? mappedAlignment.modelValue : undefined;
}

/**
 * Given width, height, and resizedWidth, return updated width and height.
 *
 * @param string width
 *   The image attribute width in pixels, may contain a 'px' suffix.
 * @param string height
 *   The image attribute height in pixels, may contain a 'px' suffix.
 * @param string resizedWidth
 *   The displayed width after resizing, may contain a 'px' suffix.
 * @returns {Array}
 *   The calculated width and height based on the ratio from the resizedWidth.
 * @private
 */
function _getResizedWidthHeight(width, height, resizedWidth) {
  // Normalize each of the attributes.
  width = Number(width.toString().replace('px', ''));
  height = Number(height.toString().replace('px', ''));
  resizedWidth = Number(resizedWidth.toString().replace('px', ''));

  const ratio = width / resizedWidth;
  const newWidth = resizedWidth.toString();
  const newHeight = Math.round(height / ratio).toString();
  return [newWidth, newHeight];
}

/**
 * Downcasts `caption` model to `data-caption` attribute with its content
 * downcasted to plain HTML.
 *
 * This is needed because CKEditor 5 uses the `<caption>` element internally in
 * various places, which differs from Backdrop which uses an attribute. For now
 * to support that we have to manually repeat work done in the
 * DowncastDispatcher's private methods.
 *
 * @param {module:core/editor/editor~Editor} editor
 *  The editor instance to use.
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function viewCaptionToCaptionAttribute(editor) {
  /**
   * Callback for the insert:caption event.
   */
  function converter(event, data, conversionApi) {
    const { consumable, writer, mapper } = conversionApi;
    const imageUtils = editor.plugins.get('ImageUtils');

    if (
      !imageUtils.isImage(data.item.parent) ||
      !consumable.consume(data.item, 'insert')
    ) {
      return;
    }

    const range = editor.model.createRangeIn(data.item);
    const viewDocumentFragment = writer.createDocumentFragment();

    // Bind caption model element to the detached view document fragment so
    // all content of the caption will be downcasted into that document
    // fragment.
    mapper.bindElements(data.item, viewDocumentFragment);

    // eslint-disable-next-line no-restricted-syntax
    for (const { item } of Array.from(range)) {
      const itemData = {
        item,
        range: editor.model.createRangeOn(item),
      };

      // The following lines are extracted from
      // DowncastDispatcher._convertInsertWithAttributes().
      const eventName = `insert:${item.name || '$text'}`;

      editor.data.downcastDispatcher.fire(
        eventName,
        itemData,
        conversionApi,
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const key of item.getAttributeKeys()) {
        Object.assign(itemData, {
          attributeKey: key,
          attributeOldValue: null,
          attributeNewValue: itemData.item.getAttribute(key),
        });

        editor.data.downcastDispatcher.fire(
          `attribute:${key}`,
          itemData,
          conversionApi,
        );
      }
    }

    // Unbind all the view elements that were downcast to the document fragment.
    // eslint-disable-next-line no-restricted-syntax
    for (const child of writer
      .createRangeIn(viewDocumentFragment)
      .getItems()) {
      mapper.unbindViewElement(child);
    }

    mapper.unbindViewElement(viewDocumentFragment);

    // Stringify view document fragment to HTML string.
    const captionText = editor.data.processor.toData(viewDocumentFragment);

    if (captionText) {
      const imageViewElement = mapper.toViewElement(data.item.parent);

      writer.setAttribute('data-caption', captionText, imageViewElement);
    }
  }

  return (dispatcher) => {
    dispatcher.on('insert:caption', converter, { priority: 'high' });
  };
}

/**
 * Generates a callback that saves data-align attribute on data downcast.
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function modelImageStyleToDataAttribute(editor) {
  /**
   * Callback for the attribute:imageStyle event.
   *
   * Saves the alignment value to the data-align attribute.
   */
  function converter(event, data, conversionApi) {
    const { item } = data;
    const { consumable, writer } = conversionApi;
    const alignAttribute = _getDataAttributeFromModelImageStyle(data.attributeNewValue);

    // Consume only for the values that can be converted into data-align.
    if (!alignAttribute || !consumable.consume(item, event.name)) {
      return;
    }

    const imageUtils = editor.plugins.get('ImageUtils');
    const viewElement = conversionApi.mapper.toViewElement(item);
    const img = imageUtils.findViewImgElement(viewElement);

    writer.setAttribute(
      'data-align',
      alignAttribute,
      img,
    );
  }

  return (dispatcher) => {
    dispatcher.on('attribute:imageStyle', converter, { priority: 'high' });
  };
}

/**
 * Generates a callback that handles the data downcast for img width and height.
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function modelImageWidthAndHeightToAttributes(editor) {
  /**
   * Callback for the downcast event.
   *
   * This gets called once for every width, height, or resizedWidth attribute
   * that needs to be saved.
   */
  function converter(event, data, conversionApi) {
    const { item } = data;
    const { consumable, writer } = conversionApi;

    if (!consumable.consume(item, event.name)) {
      return;
    }
    const imageUtils = editor.plugins.get('ImageUtils');
    const viewElement = conversionApi.mapper.toViewElement(item);
    const img = imageUtils.findViewImgElement(viewElement);

    // For width and height, update the saved value, removing 'px' value.
    if (data.attributeKey === 'width' || data.attributeKey === 'height') {
      writer.setAttribute(
        data.attributeKey,
        data.attributeNewValue.toString().replace('px', ''),
        img,
      );
    }

    // For a resized image, only the width event fires and the height derives
    // from the width.
    if (data.attributeKey === 'resizedWidth') {
      const resizedWidth = data.attributeNewValue;
      const originalWidth = item.getAttribute('width');
      const originalHeight = item.getAttribute('height');
      const [newWidth, newHeight] = _getResizedWidthHeight(originalWidth, originalHeight, resizedWidth);
      writer.removeAttribute('resizedWidth', img);
      writer.setAttribute('width', newWidth, img);
      writer.setAttribute('height', newHeight, img);
    }
  }

  return (dispatcher) => {
    const listenerAttributes = [
      'width',
      'height',
      'resizedWidth',
      // CKEditor only fires resizedWidth changes when using resizing handles.
      //'resizedHeight',
    ];
    listenerAttributes.forEach((attributeName) => {
      dispatcher.on('attribute:' + attributeName + ':imageInline', converter, {
        priority: 'high',
      });
      dispatcher.on('attribute:' + attributeName + ':imageBlock', converter, {
        priority: 'high',
      });
    });
  };
}

/**
 * Generates a callback that handles the data upcast for the img element.
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function viewImageToModelImage(editor) {
  /**
   * Callback for the element:img event.
   *
   * Handles the Backdrop specific attributes.
   */
  function converter(event, data, conversionApi) {
    const { viewItem } = data;
    const { writer, consumable, safeInsert, updateConversionResult, schema } =
      conversionApi;
    const attributesToConsume = [];

    let image;

    // Not only check if a given `img` view element has been consumed, but also
    // verify it has `src` attribute present.
    if (!consumable.test(viewItem, { name: true, attributes: 'src' })) {
      return;
    }

    const hasDataCaption = consumable.test(viewItem, {
      name: true,
      attributes: 'data-caption',
    });

    // Create image that's allowed in the given context. If the image has a
    // caption, the image must be created as a block image to ensure the caption
    // is not lost on conversion. This is based on the assumption that
    // preserving the image caption is more important to the content creator
    // than preserving the wrapping element that doesn't allow block images.
    if (schema.checkChild(data.modelCursor, 'imageInline') && !hasDataCaption) {
      image = writer.createElement('imageInline', {
        src: viewItem.getAttribute('src'),
      });
    } else {
      image = writer.createElement('imageBlock', {
        src: viewItem.getAttribute('src'),
      });
    }

    // If the view element has a `data-align` attribute, convert that to a
    // CKEditor 5 Image Style. Note these are not related to Backdrop Image
    // Styles provided by Image module.
    // See https://ckeditor.com/docs/ckeditor5/latest/features/images/images-styles.html
    if (
      editor.plugins.has('ImageStyleEditing') &&
      consumable.test(viewItem, { name: true, attributes: 'data-align' })
    ) {
      const dataAlign = viewItem.getAttribute('data-align');
      const imageStyle = _getModelImageStyleFromDataAttribute(dataAlign);

      if (imageStyle) {
        writer.setAttribute('imageStyle', imageStyle, image);

        // Make sure the attribute can be consumed after successful `safeInsert`
        // operation.
        attributesToConsume.push('data-align');
      }
    }

    // Check if the view element has still unconsumed `data-caption` attribute.
    if (hasDataCaption) {
      // Create `caption` model element. Thanks to that element the rest of the
      // `ckeditor5-plugin` converters can recognize this image as a block image
      // with a caption.
      const caption = writer.createElement('caption');

      // Parse HTML from data-caption attribute and upcast it to model fragment.
      const viewFragment = editor.data.processor.toView(
        viewItem.getAttribute('data-caption'),
      );

      // Consumable must know about those newly parsed view elements.
      conversionApi.consumable.constructor.createFrom(
        viewFragment,
        conversionApi.consumable,
      );
      conversionApi.convertChildren(viewFragment, caption);

      // Insert the caption element into image, as a last child.
      writer.append(caption, image);

      // Make sure the attribute can be consumed after successful `safeInsert`
      // operation.
      attributesToConsume.push('data-caption');
    }

    // Save the file ID to the model.
    if (
      consumable.test(viewItem, { name: true, attributes: 'data-file-id' })
    ) {
      writer.setAttribute(
        'dataFileId',
        viewItem.getAttribute('data-file-id'),
        image,
      );
      attributesToConsume.push('data-file-id');
    }

    // If the view src is updated, also update the model.
    if (consumable.test(viewItem, { name: true, attributes: 'src' })) {
      writer.setAttribute(
        'src',
        viewItem.getAttribute('src'),
        image,
      );
      attributesToConsume.push('src');
    }

    // Try to place the image in the allowed position.
    if (!safeInsert(image, data.modelCursor)) {
      return;
    }

    // Mark given element as consumed. Now other converters will not process it
    // anymore.
    consumable.consume(viewItem, {
      name: true,
      attributes: attributesToConsume,
    });

    // Make sure `modelRange` and `modelCursor` is up-to-date after inserting
    // new nodes into the model.
    updateConversionResult(image, data);
  }

  return (dispatcher) => {
    dispatcher.on('element:img', converter, { priority: 'high' });
  };
}

/**
 * General HTML Support integration for attributes on links wrapping images.
 *
 * This plugin needs to integrate with GHS manually because upstream image link
 * plugin GHS integration assumes that the `<a>` element is inside the
 * `<imageBlock>` which is not true in the case of Backdrop.
 *
 * @param {module:html-support/datafilter~DataFilter} dataFilter
 *   The General HTML support data filter.
 *
 * @return {function}
 *   Callback that binds an event to its parameter.
 */
function upcastImageBlockLinkGhsAttributes(dataFilter) {
  /**
   * Callback for the element:img upcast event.
   *
   * @type {converterHandler}
   */
  function converter(event, data, conversionApi) {
    if (!data.modelRange) {
      return;
    }

    const viewImageElement = data.viewItem;
    const viewContainerElement = viewImageElement.parent;

    if (!viewContainerElement.is('element', 'a')) {
      return;
    }
    if (!data.modelRange.getContainedElement().is('element', 'imageBlock')) {
      return;
    }

    const viewAttributes = dataFilter.processViewAttributes(
      viewContainerElement,
      conversionApi,
    );

    if (viewAttributes) {
      conversionApi.writer.setAttribute(
        'htmlLinkAttributes',
        viewAttributes,
        data.modelRange,
      );
    }
  }

  return (dispatcher) => {
    dispatcher.on('element:img', converter, {
      priority: 'high',
    });
  };
}

/**
 * Modified implementation of the linkimageediting.js downcastImageLink().
 *
 * @return {function}
 *  Callback that binds an event to its parameter.
 *
 * @private
 */
function downcastBlockImageLink() {
  /**
   * Callback for the attribute:linkHref event.
   */
  function converter(event, data, conversionApi) {
    if (!conversionApi.consumable.consume(data.item, event.name)) {
      return;
    }

    // The image will be already converted - so it will be present in the view.
    const image = conversionApi.mapper.toViewElement(data.item);
    const writer = conversionApi.writer;

    // 1. Create an empty link element.
    const linkElement = writer.createContainerElement('a', {
      href: data.attributeNewValue,
    });
    // 2. Insert link before the associated image.
    writer.insert(writer.createPositionBefore(image), linkElement);
    // 3. Move the image into the link.
    writer.move(
      writer.createRangeOn(image),
      writer.createPositionAt(linkElement, 0),
    );

    // Modified alternative implementation of Generic HTML Support's
    // addBlockImageLinkAttributeConversion(). This is happening here as well to
    // avoid a race condition with the link element not yet existing.
    if (conversionApi.consumable.consume(data.item, 'attribute:htmlLinkAttributes:imageBlock')) {
      setViewAttributes(
        conversionApi.writer,
        data.item.getAttribute('htmlLinkAttributes'),
        linkElement,
      );
    }
  }

  return (dispatcher) => {
    dispatcher.on('attribute:linkHref:imageBlock', converter, {
      // downcastImageLink specifies 'high', so we need to go higher.
      priority: 'highest',
    });
  };
}

/**
 * CKEditor command that opens the Backdrop image editing dialog.
 */
class BackdropImageCommand extends CKEditor5.Command {
  /**
   * @inheritdoc
   */
  refresh() {
    const editor = this.editor;
    const imageUtils = editor.plugins.get('ImageUtils');
    const element = imageUtils.getClosestSelectedImageElement(this.editor.model.document.selection);
    this.isEnabled = true;
    this.value = !!element;
  }

  /**
   * Executes the command.
   */
  execute() {
    const editor = this.editor;
    const config = editor.config.get('backdropImage');
    const imageUtils = editor.plugins.get('ImageUtils');
    const ImageCaptionUtils = editor.plugins.get('ImageCaptionUtils');
    const model = editor.model;
    const imageElement = imageUtils.getClosestSelectedImageElement(model.document.selection);

    // Convert attributes to map for easier looping.
    const extraAttributes = new Map(Object.entries(config.extraAttributes));

    const uploadsEnabled = true; // @todo Set dynamically.
    let existingValues = {};

    if (imageElement) {
      // Most attributes can be directly mapped from the model.
      extraAttributes.forEach((attributeName, modelName) => {
        existingValues[attributeName] = imageElement.getAttribute(modelName);
      });

      // Convert the 'resizedWidth' internal attribute to be the 'width'
      // attribute. Also update 'height' to match.
      const resizedWidth = imageElement.getAttribute('resizedWidth');
      if (existingValues['width'] && existingValues['height'] && resizedWidth) {
        const [newWidth, newHeight] = _getResizedWidthHeight(existingValues['width'], existingValues['height'], resizedWidth);
        existingValues['width'] = newWidth;
        existingValues['height'] = newHeight;
      }

      // Alignment is stored as a CKEditor Image Style.
      const imageStyle = imageElement.getAttribute('imageStyle');
      const alignAttribute = _getDataAttributeFromModelImageStyle(imageStyle);
      existingValues['data-align'] = alignAttribute;

      // The image caption is stored outside the imageElement model and must
      // be retrieved to get its value.
      const imageCaption = ImageCaptionUtils.getCaptionFromImageModelElement(imageElement);
      // Inform the image dialog, that there is a caption and the checkbox in
      // the form should be ticked. The value for data-caption isn't relevant.
      // @see filter_format_editor_image_form()
      existingValues['data-has-caption'] = !!imageCaption;
    }

    const saveCallback = (dialogValues) => {
      // Map the submitted form values to the CKEditor image model.
      let imageAttributes = {};
      extraAttributes.forEach((attributeName, modelName) => {
        if (dialogValues.attributes[attributeName] !== undefined) {
          imageAttributes[modelName] = dialogValues.attributes[attributeName];
        }
      });

      // Set CKEditor Image Style from the data-align attribute as imageStyle.
      const imageStyle = _getModelImageStyleFromDataAttribute(dialogValues.attributes['data-align']);
      imageAttributes['imageStyle'] = imageStyle;
      if (imageAttributes.hasOwnProperty('dataAlign')) {
        delete imageAttributes['dataAlign'];
      }

      // For updating an existing element:
      if (imageElement) {
        model.change((writer) => {
          writer.removeAttribute('resizedWidth', imageElement);
          writer.setAttributes(imageAttributes, imageElement);
        });

        // If width/height are empty, set to their natural values.
        if (imageAttributes['width'] === '' && imageAttributes['height'] === '') {
          imageUtils.setImageNaturalSizeAttributes(imageElement);
        }

        const imageCaption = ImageCaptionUtils.getCaptionFromImageModelElement(imageElement);
        // Remove an existing caption if disabled.
        if (imageCaption && !dialogValues.attributes['data-has-caption']) {
          editor.execute('toggleImageCaption');
        }
        // Add a caption if enabled and none yet exists.
        if (!imageCaption && dialogValues.attributes['data-has-caption']) {
          editor.execute('toggleImageCaption', { focusCaptionOnShow: true });
        }
      }
      // Inserting a new element:
      else {
        // An imageStyle key (even if undefined) on image insert will cause
        // conflicts in the Image Style plugin, so remove the attribute entirely
        // from the object.
        if (imageAttributes.hasOwnProperty('imageStyle') && !imageAttributes['imageStyle']) {
          delete imageAttributes['imageStyle'];
        }

        // Inserting an image has an unusual way of passing the attributes.
        // See https://ckeditor.com/docs/ckeditor5/latest/api/module_image_image_insertimagecommand-InsertImageCommand.html
        editor.execute('insertImage', { source: [imageAttributes] });

        // Toggle showing the caption after the image is inserted.
        if (dialogValues.attributes['data-has-caption']) {
          editor.execute('toggleImageCaption', { focusCaptionOnShow: true });
        }
      }
    };

    const dialogSettings = {
      title: config.insertLabel || 'Insert Image',
      uploads: uploadsEnabled,
      classes: {'ui-dialog': 'editor-image-dialog'}
    };
    Backdrop.ckeditor5.openDialog(editor, config.dialogUrl, existingValues, saveCallback, dialogSettings);
  }
}

/**
 * CKEditor upload adapter that sends a request to Backdrop on file upload.
 *
 * Adapted from @ckeditor5/ckeditor5-upload/src/adapters/simpleuploadadapter
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class BackdropImageUploadAdapter {
  /**
   * Creates a new adapter instance.
   *
   * @param {module:upload/filerepository~FileLoader} loader
   *   The file loader.
   * @param {module:core/editor/editor~Editor} editor
   *  The editor instance.
   * @param {module:upload/adapters/simpleuploadadapter~SimpleUploadConfig} options
   *   The upload options.
   */
  constructor(loader, editor, options) {
    /**
     * FileLoader instance to use during the upload.
     *
     * @member {module:upload/filerepository~FileLoader} #loader
     */
    this.loader = loader;

    /**
     * The configuration of the adapter.
     *
     * @member {module:core/editor/editor~Editor} #editor
     */
    this.editor = editor;

    /**
     * The configuration of the adapter.
     *
     * @member {module:upload/adapters/simpleuploadadapter~SimpleUploadConfig} #options
     */
    this.options = options;
  }

  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   * @return {Promise}
   *   Promise that the upload will be processed.
   */
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  /**
   * Aborts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#abort
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  /**
   * Initializes the `XMLHttpRequest` object using the URL specified as
   *
   * {@link module:upload/adapters/simpleuploadadapter~SimpleUploadConfig#uploadUrl `simpleUpload.uploadUrl`} in the editor's
   * configuration.
   */
  _initRequest() {
    this.xhr = new XMLHttpRequest();

    this.xhr.open('POST', this.options.uploadUrl, true);
    this.xhr.responseType = 'json';
  }

  /**
   * Initializes XMLHttpRequest listeners
   *
   * @private
   *
   * @param {Function} resolve
   *  Callback function to be called when the request is successful.
   * @param {Function} reject
   *  Callback function to be called when the request cannot be completed.
   * @param {File} file
   *  Native File object.
   */
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const editor = this.editor;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    const notification = editor.plugins.get('Notification');

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || !response.uploaded) {
        return reject(
          response && response.error && response.error.message
            ? response.error.message
            : genericErrorText,
        );
      }
      // There still may be notifications on upload, like resized images.
      if (response.error && response.error.message) {
        // The warning from Backdrop may contain <em> tags for placeholders.
        const markup = new DOMParser().parseFromString(response.error.message, 'text/html');

        // Set a warning for remaining notifications. This currently renders
        // as a window.alert() call, but may change to be better presented in
        // future versions of CKEditor 5.
        // See https://github.com/ckeditor/ckeditor5/issues/8934
        notification.showWarning(markup.body.textContent, {
          namespace: 'upload:image',
        });
      }

      // Resolve with the `urls` property and pass the response
      // to allow customizing the behavior of features relying on the upload
      // adapters.
      resolve({
        response,
        urls: { default: response.url },
      });
    });

    // Upload progress when it is supported.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  /**
   * Prepares the data and sends the request.
   *
   * @param {File} file
   *   File instance to be uploaded.
   */
  _sendRequest(file) {
    // Set headers if specified.
    const headers = this.options.headers || {};

    // Use the withCredentials flag if specified.
    const withCredentials = this.options.withCredentials || false;

    Object.keys(headers).forEach((headerName) => {
      this.xhr.setRequestHeader(headerName, headers[headerName]);
    });

    this.xhr.withCredentials = withCredentials;

    // Prepare the form data.
    const data = new FormData();

    data.append('upload', file);

    // Send the request.
    this.xhr.send(data);
  }
}

})(CKEditor5);
;
/**
 * @file
 * Backdrop Link plugin.
 */

(function (Backdrop, CKEditor5) {

"use strict";

/**
 * The BackdropLink plugin replaces and extends the CKEditor core Link plugin.
 *
 * - Adds its own buttons for backdropLink (main toolbar) and backdropLinkImage
 *   (in the image balloon toolbar).
 * - Modifies the balloon toolbar for links. Instead of the edit action using
 *   the balloon to enter the URL, the Backdrop link dialog is used instead.
 * - Extends the editor.execute('link') function to take a 3rd parameter to
 *   apply attributes such as id, rel, and class to links.
 */
class BackdropLink extends CKEditor5.Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return ['Link'];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'BackdropLink';
  }

  /**
   * @inheritdoc
   */

  init() {
    const editor = this.editor;
    const config = editor.config.get('backdropLink');

    if (!config.extraAttributes) {
      return;
    }
    // Convert attributes to map for easier looping.
    const extraAttributes = new Map(Object.entries(config.extraAttributes));

    extraAttributes.forEach((attributeName, modelName) => {
      this._allowAndConvertExtraAttribute(modelName, attributeName);
      this._removeExtraAttributeOnUnlinkCommandExecute(modelName);
      this._refreshExtraAttributeValue(modelName);
    });

    this._addExtraAttributeOnLinkCommandExecute(extraAttributes);
    this._addBackdropLinkButtons();
    this._bindBalloon(extraAttributes);
  }

  _allowAndConvertExtraAttribute(modelName, viewName) {
    const editor = this.editor;

    editor.model.schema.extend('$text', { allowAttributes: modelName });

    // Model -> View (DOM)
    editor.conversion.for('downcast').attributeToElement({
      model: modelName,
      view: (value, { writer }) => {
        const linkViewElement = writer.createAttributeElement('a', {
          [ viewName ]: value
        }, { priority: 5 });

        // Without it the isLinkElement() will not recognize the link and the UI
        // will not show up when the user clicks a link.
        writer.setCustomProperty('link', true, linkViewElement);

        return linkViewElement;
      }
    });

    // View (DOM/DATA) -> Model
    // The class attribute should be passed using the special selector 'classes'
    // rather than attributes['class'].
    // See https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-matcher-pattern-deprecated-attributes-class-key
    const upcastView = { name: 'a' };
    if (viewName === 'class') {
      upcastView['classes'] = true;
    }
    else {
      upcastView['attributes'] = { [ viewName ]: true }
    }
    editor.conversion.for('upcast').elementToAttribute({
      view: upcastView,
      model: {
        key: modelName,
        value: viewElement => viewElement.getAttribute(viewName)
      }
    });
  }

  _addExtraAttributeOnLinkCommandExecute(extraAttributes) {
    const editor = this.editor;
    const linkCommand = editor.commands.get( 'link' );
    let linkCommandExecuting = false;

    linkCommand.on('execute', (evt, args) => {
      // Custom handling is only required if an extra attribute was passed into
      // editor.execute('link', ...).
      if (args.length < 4) {
        return;
      }
      if (linkCommandExecuting) {
        linkCommandExecuting = false;
        return;
      }

      // If the additional attribute was passed, we stop the default execution
      // of the LinkCommand. We're going to create Model#change() block for undo
      // and execute the LinkCommand together with setting the extra attribute.
      evt.stop();

      // Prevent infinite recursion by keeping records of when link command is
      // being executed by this function.
      linkCommandExecuting = true;
      const extraAttributeValues = args[args.length - 1];
      const model = this.editor.model;
      const selection = model.document.selection;
      const imageUtils = editor.plugins.get('ImageUtils');
      const closestImage = imageUtils.getClosestSelectedImageElement(selection);

      // Wrapping the original command execution in a model.change() block to
      // make sure there's a single undo step when the extra attribute is added.
      model.change((writer) => {
        editor.execute('link', ...args);

        // If there is an image within this link, apply the link attributes to
        // the image model's htmlLinkAttributes attribute.
        if (closestImage) {
          const htmlLinkAttributes = { attributes: extraAttributeValues };
          writer.setAttribute('htmlLinkAttributes', htmlLinkAttributes, closestImage);
        }
        // Otherwise find the selected link and apply each attribute.
        else {
          extraAttributes.forEach((attributeName, modelName) => {
            let ranges = [];
            if (selection.isCollapsed) {
              const firstPosition = selection.getFirstPosition();
              const node = firstPosition.textNode || firstPosition.nodeBefore;
              ranges = [ writer.createRangeOn(node) ];
            }
            else {
              ranges = model.schema.getValidRanges(selection.getRanges(), modelName);
            }

            for (const range of ranges) {
              if (extraAttributeValues[attributeName]) {
                writer.setAttribute(modelName, extraAttributeValues[attributeName], range);
              } else {
                writer.removeAttribute(modelName, range);
              }
            }
            writer.removeSelectionAttribute(modelName);
          });
        }
      });
    }, { priority: 'highest' } );
  }

  _removeExtraAttributeOnUnlinkCommandExecute(modelName) {
    const editor = this.editor;
    const unlinkCommand = editor.commands.get('unlink');
    const model = this.editor.model;
    const selection = model.document.selection;

    let isUnlinkingInProgress = false;

    // Make sure all changes are in a single undo step so cancel the original unlink first in the high priority.
    unlinkCommand.on('execute', evt => {
      if (isUnlinkingInProgress) {
        return;
      }

      evt.stop();

      // This single block wraps all changes that should be in a single undo step.
      model.change(() => {
        // Now, in this single "undo block" let the unlink command flow naturally.
        isUnlinkingInProgress = true;

        // Do the unlinking within a single undo step.
        editor.execute('unlink');

        // Let's make sure the next unlinking will also be handled.
        isUnlinkingInProgress = false;

        // The actual integration that removes the extra attribute.
        model.change(writer => {
          // Get ranges to unlink.
          let ranges;

          if (selection.isCollapsed) {
            ranges = [CKEditor5.findAttributeRange(
              selection.getFirstPosition(),
              modelName,
              selection.getAttribute( modelName ),
              model
            )];
          }
          else {
            ranges = model.schema.getValidRanges(selection.getRanges(), modelName);
          }

          // Remove the extra attribute from specified ranges.
          for (const range of ranges) {
            writer.removeAttribute(modelName, range);
          }
        });
      });
    }, { priority: 'high' });
  }

  _refreshExtraAttributeValue(modelName) {
    const editor = this.editor;
    const linkCommand = editor.commands.get('link');
    const model = this.editor.model;
    const selection = model.document.selection;

    linkCommand.set(modelName, null);

    model.document.on('change', () => {
      linkCommand[modelName] = selection.getAttribute(modelName);
    });
  }

  _addBackdropLinkButtons() {
    const editor = this.editor;
    const config = editor.config.get('backdropLink');
    const editLabel = config.editLabel || 'Edit Link';
    const insertLabel = config.insertLabel || 'Insert Link';

    // Add the backdropLink command.
    editor.commands.add('backdropLink', new BackdropLinkCommand(editor));
    const backdropLinkCommand = editor.commands.get('backdropLink');

    // Add the backdropLink button for use in the main toolbar. This can
    // insert a new link or edit an existing one if selected.
    editor.ui.componentFactory.add('backdropLink', (locale) => {
      const buttonView = new CKEditor5.ButtonView(locale);

      buttonView.set({
        label: insertLabel,
        icon: CKEditor5.IconLink,
        tooltip: true
      });

      // Highlight the link button when a link is selected.
      buttonView.bind('isOn').to(backdropLinkCommand, 'value');

      // Change the label when an image is selected.
      buttonView.bind('label').to(backdropLinkCommand, 'value', (value) => {
        return value ? editLabel : insertLabel
      });

      // Disable the button when the command is disabled by source mode.
      buttonView.bind('isEnabled').to(backdropLinkCommand, 'isEnabled');

      // When clicking the toolbar button, execute the backdropLink command.
      buttonView.on('execute', () => {
        // Remove focus from the toolbar button when opening the dialog.
        // Otherwise, the button may receive focus again after closing the
        // dialog.
        buttonView.element.blur();
        // See BackdropLinkCommand::execute().
        backdropLinkCommand.execute();
      });

      return buttonView;
    });

    // Add the backdropLinkImage button for use in the image toolbar. This can
    // insert a new link or edit an existing one if selected.
    editor.ui.componentFactory.add('backdropLinkImage', (locale) => {
      const buttonView = new CKEditor5.ButtonView(locale);
      const backdropLinkCommand = editor.commands.get('backdropLink');
      buttonView.set( {
        isEnabled: true,
        // Translation provided by CKEditor link plugin:
        label: editor.t('Link image'),
        icon: CKEditor5.IconLink,
        keystroke: 'Ctrl+K',
        tooltip: true,
        isToggleable: true
      });

      // Bind button to the command.
      buttonView.bind('isEnabled').to(backdropLinkCommand, 'isEnabled');
      buttonView.bind('isOn').to(backdropLinkCommand, 'value');

      this.listenTo(buttonView, 'execute', () => {
        // Show the normal link UI balloon if an image already has a link.
        // This allows unlinking an image or previewing the link URL.
        const selectedModelElement = editor.model.document.selection.getSelectedElement();
        const imageUtils = editor.plugins.get('ImageUtils');
        const linkUI = editor.plugins.get('LinkUI');
        if (imageUtils.isImage(selectedModelElement) && selectedModelElement.hasAttribute('linkHref')) {
          // This is not ideal to call an internal method to show the balloon,
          // but this is the same approach used by LinkImageUI.
          // See https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-link/src/linkimageui.ts
          linkUI._addToolbarView();
        }
        // For new links, open the link dialog directly.
        else {
          backdropLinkCommand.execute();
        }
      });

      return buttonView;
    });

    // Claim the keyboard shortcut for making a link to open the dialog rather
    // than CKEditor's bubble toolbar.
    editor.keystrokes.set('Ctrl+K', (keyEvtData, cancel) => {
      // Prevent focusing the search bar in FF, Chrome and Edge. See https://github.com/ckeditor/ckeditor5/issues/4811.
      cancel();
      if (editor.commands.get('backdropLink').isEnabled) {
        backdropLinkCommand.execute();
      }
    }, { priority: 'high' });
  }

  _bindBalloon() {
    const editor = this.editor;
    const contextualBalloonPlugin = editor.plugins.get('ContextualBalloon');
    const linkUI = editor.plugins.get('LinkUI');
    const backdropLinkCommand = editor.commands.get('backdropLink');
    let linkUiModified = false;

    // Bind to the balloon being shown and check for the link UI.
    this.listenTo(contextualBalloonPlugin, 'change:visibleView', (evt, name, visibleView) => {
      const toolbarView = linkUI.toolbarView;
      if (toolbarView && visibleView === toolbarView) {
        if (!linkUiModified) {
          linkUiModified = true;
          // Turn off the normal link editing action.
          // See LinkUI::_registerComponents().
          const linkButtonView = toolbarView.items.get(2);
          linkUI.stopListening(linkButtonView, 'execute');
          // Replace with firing the backdropLink action instead.
          this.listenTo(linkButtonView, 'execute', () => {
            contextualBalloonPlugin.remove(toolbarView);
            backdropLinkCommand.execute();
          });
        }
      }
    });
  }
}

// Expose the plugin to the CKEditor5 namespace.
CKEditor5.backdropLink = {
  'BackdropLink': BackdropLink
};

/**
 * CKEditor command that opens the Backdrop link editing dialog.
 */
class BackdropLinkCommand extends CKEditor5.Command {
  /**
   * @inheritdoc
   */
  refresh() {
    const editor = this.editor;
    const linkCommand = editor.commands.get('link');
    this.isEnabled = linkCommand.isEnabled;
    this.value = linkCommand.value;
  }

  /**
   * @inheritdoc
   */
  execute() {
    const editor = this.editor;
    const config = editor.config.get('backdropLink');
    const selection = editor.model.document.selection;
    const linkCommand = editor.commands.get('link');
    const imageUtils = editor.plugins.get('ImageUtils');

    const closestImage = imageUtils.getClosestSelectedImageElement(selection);
    const extraAttributes = new Map(Object.entries(config.extraAttributes));
    const dialogSettings = {
      classes: {'ui-dialog': 'editor-link-dialog'}
    };

    // Pull in existing value from linkCommand to be sent to the dialog.
    let existingValues = {
      'href': linkCommand.value
    };

    // Images store link values in a special 'htmlLinkAttributes' attribute.
    if (closestImage) {
      const htmlLinkAttributes = closestImage.getAttribute('htmlLinkAttributes');
      if (htmlLinkAttributes && htmlLinkAttributes.attributes) {
        existingValues = Object.assign(existingValues, htmlLinkAttributes.attributes);
      }
    }
    // For normal links, pull link values from individual attributes.
    else {
      extraAttributes.forEach((attributeName, modelName) => {
        existingValues[attributeName] = linkCommand[modelName];
      });
    }

    // Prepare a save callback to be used upon saving the dialog.
    const saveCallback = function(returnValues) {
      const linkCommand = editor.commands.get('link');
      const newHref = returnValues.attributes.href;
      delete returnValues.href;
      // Ignore a disabled target attribute.
      if (returnValues.attributes.target === 0) {
        delete returnValues.attributes.target;
      }
      // Remove empty file IDs.
      if (!returnValues.attributes['data-file-id']) {
        delete returnValues.attributes['data-file-id'];
      }
      // Remove "text" key intended to update the link text (not supported).
      if (returnValues.attributes.hasOwnProperty('text')) {
        delete returnValues.attributes['text'];
      }

      // The normal link command does not support a 4th argument natively.
      // This has been extended in _addExtraAttributeOnLinkCommandExecute()
      // to also accept an array of attributes to be saved.
      // See https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-link/src/linkcommand.ts
      // There is also a feature request to make this native to CKEditor
      // here: https://github.com/ckeditor/ckeditor5/issues/9730
      linkCommand.execute(newHref, {}, null, returnValues.attributes);
    }

    Backdrop.ckeditor5.openDialog(editor, config.dialogUrl, existingValues, saveCallback, dialogSettings);
  }
}

})(Backdrop, CKEditor5);
;
/**
 * @file
 * Backdrop maximize plugin.
 */
(function (Backdrop, CKEditor5) {

  "use strict";

  class Maximize extends CKEditor5.Plugin {
    init() {
      const editor = this.editor;

      editor.ui.componentFactory.add( 'maximize', () => {
        const button = new CKEditor5.ButtonView();
        const activeClass = 'ck-maximize-active';

        button.set( {
          label: editor.config.get('maximizeLabel'),
          tooltip: true,
          icon: '<svg width="20" height="20" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m7 2h-5v5l1.8-1.8 2.7 2.8 1.5-1.5-2.8-2.7zm6 0 1.8 1.8-2.8 2.7 1.5 1.5 2.7-2.7 1.8 1.7v-5zm.5 10-1.5 1.5 2.7 2.7-1.7 1.8h5v-5l-1.8 1.8zm-7 0-2.7 2.7-1.8-1.7v5h5l-1.8-1.8 2.8-2.7z"/></svg>',
          isToggleable: true,
          isOn: false
        });

        button.on( 'execute', () => {
          // Applying the class to the parent keeps the sticky toolbar working.
          const editorParent = editor.ui.view.element.parentNode;

          if (editorParent.classList.contains(activeClass)) {
            editorParent.classList.remove(activeClass);
            document.body.classList.remove('ck-scroll-prevented');
            button.isOn = false;
          }
          else {
            editorParent.classList.add(activeClass);
            document.body.classList.add('ck-scroll-prevented');
            button.isOn = true;
          }
          window.dispatchEvent(new Event('resize'));
          editor.editing.view.focus();
          editor.editing.view.scrollToTheSelection();
        });

        return button;
      });
    }
  }

  // Expose the plugin to the CKEditor5 namespace.
  CKEditor5.backdropMaximize = {
    'Maximize': Maximize
  };

})(Backdrop, CKEditor5);
;
(function (Backdrop, CKEditor5, $) {

  "use strict";

  Backdrop.editors.ckeditor5 = {

    attach: function (element, format) {
      // Bail out if the editor has already been attached to the element.
      if (typeof element.ckeditor5Processed !== 'undefined') {
        return;
      }

      if (!$('#ckeditor5-modal').length) {
        $('<div id="ckeditor5-modal" />').hide().appendTo('body');
      }

      // Set a title on the CKEditor instance that includes the text field's
      // label so that screen readers say something that is understandable
      // for end users.
      const label = $('label[for=' + element.getAttribute('id') + ']').text();
      const editorSettings = format.editorSettings;
      editorSettings.title = Backdrop.t("Rich Text Editor, !label field", {'!label': label});

      // CKEditor initializes itself in a read-only state if the 'disabled'
      // attribute is set. It does not respect the 'readonly' attribute,
      // however, so we set the 'readOnly' configuration property manually in
      // that case, for the CKEditor instance that's about to be created.
      editorSettings.readOnly = element.hasAttribute('readonly');

      // Try to match the textarea height on which we're replacing. Note this
      // minHeight property is enforced by the BackdropBasicStyles plugin.
      editorSettings.minHeight = $(element).height() + 'px';

      // The source element value is managed manually to apply code formatting.
      editorSettings.updateSourceElementOnDestroy = false;

      editorSettings.licenseKey = 'GPL';

      // If filter_html is turned on, and the htmlSupport plugin is available,
      // we prevent on* attributes.
      if (editorSettings.pluginList.includes('htmlSupport.GeneralHtmlSupport')) {
        if (editorSettings.htmlSupport.allow.length) {
          let onEventsPattern = {
            'name': /.*/,
            'attributes': /^on.*/
          };
          editorSettings.htmlSupport.disallow.push(onEventsPattern);
        }
        // If filter_html if off, allow all elements and attributes to be used.
        else {
          let patternAllowAll = {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
          };
          editorSettings.htmlSupport.allow.push(patternAllowAll);
        }
      }

      // Convert the plugin list from strings to variable names.
      editorSettings.plugins = [];
      editorSettings.pluginList.forEach(function(pluginItem) {
        const [packageName,moduleName] = pluginItem.split('.');
        // In UMD builds, native plugins are direct children of the global
        // CKEditor object, this has changed compared to DLL.
        if (typeof CKEditor5[moduleName] != 'undefined' && CKEditor5[moduleName].hasOwnProperty('pluginName')) {
          editorSettings.plugins.push(CKEditor5[moduleName]);
        }
        // Backwards compatible to how plugins were defined for DLL - and how
        // existing custom plugins still define it.
        else if (typeof CKEditor5[packageName] != 'undefined') {
          editorSettings.plugins.push(CKEditor5[packageName][moduleName]);
        }
      });

      // Indicate that this element is about to receive an editor. This prevents
      // double-binding if the .attach() method is called twice very quickly.
      element.ckeditor5Processed = true;

      const beforeAttachValue = element.value;
      CKEditor5.ClassicEditor
        .create(element, editorSettings)
        .then(editor => {
          Backdrop.ckeditor5.setEditorOffset(editor);
          Backdrop.ckeditor5.instances.set(editor.id, editor);
          Backdrop.ckeditor5.watchEditorChanges(editor, element);
          Backdrop.ckeditor5.trackActiveEditor(editor);
          element.ckeditor5AttachedEditor = editor;
          const valueModified = Backdrop.ckeditor5.checkValueModified(beforeAttachValue, editor.getData({ skipListItemIds: true }));
          if (valueModified && !Backdrop.ckeditor5.bypassContentWarning) {
            Backdrop.ckeditor5.detachWithWarning(element, format, beforeAttachValue);
          }
          return true;
        })
        .catch(error => {
          element.ckeditor5Processed = false;
          console.error('The CKEditor instance could not be initialized.');
          console.error(error);
          return false;
        });
    },

    detach: function (element, format, trigger) {
      // Remove any content modification warning.
      if (element.ckeditor5AttachedWarning && trigger !== 'serialize') {
        element.ckeditor5AttachedWarning.remove();
        delete element.ckeditor5AttachedWarning;
      }

      // Save content and remove any CKEditor 5 instances.
      const editor = element.ckeditor5AttachedEditor;
      if (!editor) {
        return false;
      }

      // CKEditor 5 does not pretty-print HTML source. Format the source
      // before saving it into the source field.
      let newData = editor.getData({ skipListItemIds: true });
      newData = Backdrop.ckeditor5.formatHtml(newData);

      // Destroy the instance if fully detaching.
      if (trigger !== 'serialize') {
        // If submitting the entire form, skip destroying the editor and let it
        //  be unloaded by the browser leaving the page.
        if (trigger !== 'submit') {
          editor.destroy();
        }
        Backdrop.ckeditor5.instances.delete(editor.id);
        delete element.ckeditor5AttachedEditor;
        delete element.ckeditor5Processed;
      }

      // Save formatted value after destroying the editor, which can also
      // update the element value.
      element.value = newData;

      return !!editor;
    },

    onChange: function (element, callback) {
      const editor = element.ckeditor5AttachedEditor;
      if (editor) {
        const debouncedCallback = Backdrop.debounce(callback, 400);
        editor.model.document.on('change:data', function() {
          debouncedCallback(editor.getData({ skipListItemIds: true }));
        });
      }
      return !!editor;
    }
  };

  Backdrop.ckeditor5 = {
    /**
     * Variable storing the current dialog's save callback.
     */
    saveCallback: null,

    /**
     * Key-value map of all active instances of CKEditor 5.
     */
    instances: new Map(),

    /**
     * The last-active CKEditor 5 instance.
     */
    activeEditor: null,

    /**
     * Boolean indicating if CKEditor instances should be attached even if they
     * modify content by the act of initializing the editor.
     */
    bypassContentWarning: false,

    /**
     * Open a dialog for a Backdrop-based plugin.
     *
     * This dynamically loads jQuery UI (if necessary) using the Backdrop AJAX
     * framework, then opens a dialog at the specified Backdrop path.
     *
     * @param {Editor} editor
     *   The CKEditor instance that is opening the dialog.
     * @param {String} url
     *   The URL that contains the contents of the dialog.
     * @param {Object} existingValues
     *   Existing values that will be sent via POST to the url for the dialog
     *   contents.
     * @param {Function} saveCallback
     *   A function to be called upon saving the dialog.
     * @param {Object} dialogSettings
     *   An object containing settings to be passed to the jQuery UI.
     */
    openDialog: function (editor, url, existingValues, saveCallback, dialogSettings) {
      // Locate a suitable place to display our loading indicator.
      const $toolbar = $(editor.ui.view.toolbar.element);

      // Remove any previous loading indicator.
      $toolbar.find('.ckeditor5-dialog-loading').remove();

      // Add a consistent dialog class.
      dialogSettings.classes = dialogSettings.classes || {};
      var classes = dialogSettings.classes['ui-dialog'] ? dialogSettings.classes['ui-dialog'].split(' ') : [];
      classes.push('editor-dialog');
      dialogSettings.classes['ui-dialog'] = classes.join(' ');
      dialogSettings.autoResize = true;
      dialogSettings.modal = true;
      dialogSettings.target = '#ckeditor5-modal';

      // Add a "Loading…" message, hide it underneath the CKEditor toolbar, create
      // a Backdrop.ajax instance to load the dialog and trigger it.
      const $content = $('<div class="ck-reset_all-excluded ckeditor5-dialog-loading-wrapper" style="display: none;"><div class="ckeditor5-dialog-loading"><span class="ckeditor5-dialog-loading-link"><a>' + Backdrop.t('Loading...') + '</a></span></div></div>');
      $toolbar.append($content);
      new Backdrop.ajax('ckeditor5-dialog', $content.find('a').get(0), {
        accepts: 'application/vnd.backdrop-dialog',
        dialog: dialogSettings,
        selector: '.ckeditor5-dialog-loading-link',
        url: url,
        event: 'ckeditor5-internal.ckeditor5',
        progress: {'type': 'throbber'},
        submit: {
          editor_object: existingValues
        }
      });
      $content.find('a')
          .on('click', function () { return false; })
          .trigger('ckeditor5-internal.ckeditor5');

      // After a short delay, show "Loading…" message.
      window.setTimeout(function () {
        $content.css('display', 'block');
      }, 500);

      // Store the save callback to be executed when this dialog is closed.
      Backdrop.ckeditor5.saveCallback = saveCallback;
    },

    /**
     * Calculates the top of window offset.
     *
     * The "data-offset-top" attribute is used on the admin toolbar and sticky
     * table headers. Add up the offsets to determine the editor toolbar offset.
     *
     * @returns
     *   The vertical offset in pixels.
     */
    computeOffsetTop: function () {
      const $offsets = $('[data-offset-top]');
      let value, sum = 0;
      for (let i = 0, il = $offsets.length; i < il; i++) {
        value = parseInt($offsets[i].getAttribute('data-offset-top'), 10);
        sum += !isNaN(value) ? value : 0;
      }
      this.offsetTop = sum;
      return sum;
    },

    /**
     * Sets the CKEditor 5 toolbar offset.
     *
     * Setting the offset makes the editor toolbar floats below the admin
     * toolbar and any sticky table headers.
     *
     * @param editor
     *   The CKEditor 5 instance.
     */
    setEditorOffset: function (editor) {
      editor.ui.viewportOffset = {
        'bottom': 0,
        'left': 0,
        'right': 0,
        'top': Backdrop.ckeditor5.computeOffsetTop()
      };
    },

    /**
     * Binds an on change event to the editor to watch for value changes.
     *
     * Updating the source element regularly can prevent data-loss when a
     * browser window is closed or reloaded.
     *
     * @param editor
     *   The CKEditor 5 instance.
     * @param {Element} element
     *   The underlying textarea DOM element.
     */
    watchEditorChanges: function (editor, element) {
      // Create a debounced callback that only fires intermittently, since
      // editor changes can happen on every key up.
      const updateValue = Backdrop.debounce(() => {
        const newData = editor.getData({ skipListItemIds: true });
        element.value = Backdrop.ckeditor5.formatHtml(newData);
      }, 1000);
      editor.model.document.on('change:data', updateValue);
    },

    /**
     * Binds an on change event to the editor to watch for focus changes.
     *
     * The Backdrop.ckeditor5.activeEditor variable can be used by other modules
     * to insert content into the editor, or provide other outside integrations.
     *
     * @param editor
     *   The CKEditor 5 instance.
     */
    trackActiveEditor: function (editor) {
      // If no editor has been set yet, set the first one as the active.
      if (!Backdrop.ckeditor5.activeEditor) {
        Backdrop.ckeditor5.activeEditor = editor;
      }
      // Track when focus is set on a new editor.
      // See https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/ui/focus-tracking.html#a-note-about-the-global-focus-tracker
      editor.ui.focusTracker.on('change:isFocused', (evt, data, isFocused) => {
        if (isFocused) {
          Backdrop.ckeditor5.activeEditor = editor;
        }
      });
    },

    /**
     * Compare the data before CKEditor 5 is attached vs. after it is attached.
     *
     * This comparison reformats both the before and after values to the same
     * consistent format before doing a string comparison.
     *
     * @param beforeAttachValue
     *   The element value before CKEditor was attached.
     * @param afterAttachValue
     *   The element value after CKEditor was attached.
     *
     * @return {boolean}
     *   Returns true if values have been modified, false if unchanged.
     */
    checkValueModified: function (beforeAttachValue, afterAttachValue) {
      // Create a sandboxed document within an iframe.
      const sandboxIframe = document.createElement('iframe');
      sandboxIframe.setAttribute('sandbox', 'allow-same-origin');
      sandboxIframe.srcdoc = "<!doctype html>";
      document.body.append(sandboxIframe);
      const sandboxDocument = sandboxIframe.contentDocument;

      // Pass the before value through elementGetHtml() to standardize
      // attribute order and self-closing tags. For example, two <img> tags with
      // src, width, and height attributes should be equal, even if one uses the
      // order height, src, width. Similarly, <hr /> and <hr> should be
      // considered the same. Passing in an out of the DOM makes these two
      // values use the same order and tag closing.
      const beforeElement = sandboxDocument.createElement('template');
      beforeElement.innerHTML = beforeAttachValue;
      beforeAttachValue = Backdrop.ckeditor5.elementGetHtml(beforeElement.content);

      // Then run both strings through the same whitespace formatting, using
      // formatHtml(). Wrap both strings with a temporary <div> tag, to allow
      // childNodes (which is used later when comparing the two strings) to work
      // on them.
      const formattedBeforeValue = sandboxDocument.createElement('div');
      formattedBeforeValue.innerHTML = Backdrop.ckeditor5.formatHtml(beforeAttachValue);
      const formattedAfterValue = sandboxDocument.createElement('div');
      formattedAfterValue.innerHTML = Backdrop.ckeditor5.formatHtml(afterAttachValue);

      // Get all Nodes for each string.
      let formattedBeforeValueNodes = formattedBeforeValue.childNodes;
      let formattedAfterValueNodes = formattedAfterValue.childNodes;

      // If the number of Nodes differs, then the values have been modified.
      // Bail early in that case.
      if (formattedBeforeValueNodes.length !== formattedAfterValueNodes.length) {
        sandboxIframe.remove();
        return true;
      }

      // If the number of Nodes is the same between the two strings, start
      // comparing each pair of respective Nodes one-by-one.
      for (let i = 0; i < formattedBeforeValueNodes.length; i++) {
        // Check if each pair of Nodes is identical between the two strings.
        if (formattedBeforeValueNodes[i] !== formattedAfterValueNodes[i]) {
          // The respective Nodes are not the same. This may be because despite
          // all attributes being the same, they are in a different order. Do a
          // final check about that, to determine whether they are really
          // different. isEqualNode() doesn't care about the order of attributes
          // each Node has - it only expects the same attributes with the same
          // values.
          if (!formattedBeforeValueNodes[i].isEqualNode(formattedAfterValueNodes[i])) {
            // Bail on the first pair of Nodes that is found to have different
            // attributes/values regardless of their order.
            sandboxIframe.remove();
            return true;
          }
        }
      }

      // If all previous checks for modified values failed, assume that the two
      // strings have not been modified.
      sandboxIframe.remove();
      return false;
    },

    /**
     * Attach an alert to the editor if the value has been modified.
     *
     * This disables the editor and restores the plain textarea element. The
     * warning can be dismissed to load the editor anyway.
     *
     * @param element
     *   The DOM element to which the editor was attached.
     * @param format
     *   The text format configuration with which the editor was attached.
     * @param beforeAttachValues
     *   The element value before CKEditor was attached.
     *
     * @return {boolean}
     *   Returns true if values have been modified, false if unchanged.
     */
    detachWithWarning: function (element, format, beforeAttachValues) {
      // Detach the editor.
      Backdrop.filterEditorDetach(element, format);
      // Restore the value to what it was previously.
      element.value = beforeAttachValues;
      // Attach a warning before the field.
      const $warning = $($.parseHTML(Backdrop.theme('ckeditor5ContentModifiedWarning')));
      $warning.insertBefore(element);
      // On click of the link within the warning, attach the editor anyway and
      // remove the warning.
      $warning.find('a').on('click', function(e) {
        // Setting this bypass flag prevents the warning from being re-added.
        Backdrop.ckeditor5.bypassContentWarning = true;
        Backdrop.filterEditorAttach(element, format);
        $warning.remove();
        e.preventDefault();
      });
      element.ckeditor5AttachedWarning = $warning[0];
    }
  };

  // Respond to new dialogs that are opened by CKEditor, closing the AJAX loader.
  $(window).on('dialog:beforecreate', function (e, dialog, $element, settings) {
    $('.ckeditor5-dialog-loading-wrapper').remove();
  });

  // Respond to dialogs that are saved, sending data back to CKEditor.
  $(window).on('editor:dialogsave', function (e, values) {
    if (Backdrop.ckeditor5.saveCallback) {
      Backdrop.ckeditor5.saveCallback(values);
    }
  });

  // Respond to dialogs that are closed, removing the current save handler.
  $(window).on('dialog:afterclose', function (e, dialog, $element) {
    if (Backdrop.ckeditor5.saveCallback) {
      Backdrop.ckeditor5.saveCallback = null;
    }
  });

  // Set the offset to account for admin toolbar.
  $(document).on('offsettopchange', function() {
    Backdrop.ckeditor5.instances.forEach(function(instance) {
      Backdrop.ckeditor5.setEditorOffset(instance);
    });
  });

  /**
   * Display a warning message that loading the editor may modify content.
   */
  Backdrop.theme.prototype.ckeditor5ContentModifiedWarning = function() {
    let warningMessage = '';
    warningMessage += '<div class="ckeditor5-content-modified-warning messages warning">';
    warningMessage += '<span class="ckeditor5-content-modified-message">' + Backdrop.t('Activating CKEditor 5 will reformat the content of this field. Review content carefully after activating.') + '</span> ';
    warningMessage += '<a class="ckeditor5-content-modified-activate" href="#">' + Backdrop.t('Click to activate editor') + '</a>.';
    warningMessage += '</div>';
    return warningMessage;
  }

})(Backdrop, CKEditor5, jQuery);
;
/**
 * @file
 *
 * Contains HTML exporting and formatting code for CKEditor 5 module.
 */
(function (Backdrop) {
  "use strict";

  /**
   * A simple (and naive) HTML code formatter that returns a formatted HTML
   * markup that can be easily parsed by human eyes. It beautifies the HTML code
   * by adding new lines between elements that behave like block elements
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
   * and a few more like `tr`, `td`, and similar ones) and inserting indents for
   * nested content.
   *
   * WARNING: This function works only on a text that does not contain any
   * indentations or new lines. Calling this function on the already formatted
   * text will damage the formatting.
   *
   * @param {String} input
   *   An HTML string to format.
   * @param {String} input
   *   A chunk of unformatted HTML.
   * @returns {String}
   *   The same HTML formatted for easier readability and diffing.
   */
  Backdrop.ckeditor5.formatHtml = function(input) {
    const htmlFormatter = new BackdropHtmlFormatter();
    return htmlFormatter.formatHtml(input);
  };

  /**
   * Convert an Element into an HTML string, with attributes properly escaped.
   *
   * In some cases, the value returned from this function may want to be
   * formatted using Backdrop.ckeditor5.formatHtml().
   *
   * @param {Element|DocumentFragment} element
   *   The DOM Element from which HTML should be exported.
   * @returns {String}
   *   An unformatted HTML string.
   */
  Backdrop.ckeditor5.elementGetHtml = function(element) {
    const htmlBuilder = new BackdropHtmlBuilder();
    htmlBuilder.appendNode(element);
    return htmlBuilder.build();
  };

  /**
   * HTML formatting utility for use by Backdrop's CKEditor 5 integration.
   *
   * This formatter is based off CKEditor 5 source code for HTML Source Editing.
   *
   * See https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-source-editing/src/utils/formathtml.ts
   *
   * Eventually the code in this file may not be necessary, in the event that
   * CKEditor 5 allows public API access to the HTML formatter.
   *
   * See https://github.com/ckeditor/ckeditor5/issues/8668
   */
  class BackdropHtmlFormatter {
    /**
     * Constructs a new object.
     */
    constructor() {
      // A list of block-like elements around which the new lines should be
      // inserted, and within which the indentation of their children should be
      // increased. The list is partially based on
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
      // that contains a full list of HTML block-level elements.
      // A void element is an element that cannot have any child:
      // https://html.spec.whatwg.org/multipage/syntax.html#void-elements.
      // Note that <pre> element is not listed on this list to avoid breaking
      // whitespace formatting.
      // Note that <br> element is not listed and handled separately so no
      // additional white spaces are injected.
      this.elementsToFormat = [
        { name: 'address', isVoid: false },
        { name: 'article', isVoid: false },
        { name: 'aside', isVoid: false },
        { name: 'blockquote', isVoid: false },
        { name: 'details', isVoid: false },
        { name: 'dialog', isVoid: false },
        { name: 'dd', isVoid: false },
        { name: 'div', isVoid: false },
        { name: 'dl', isVoid: false },
        { name: 'dt', isVoid: false },
        { name: 'fieldset', isVoid: false },
        { name: 'figcaption', isVoid: false },
        { name: 'figure', isVoid: false },
        { name: 'footer', isVoid: false },
        { name: 'form', isVoid: false },
        { name: 'h1', isVoid: false },
        { name: 'h2', isVoid: false },
        { name: 'h3', isVoid: false },
        { name: 'h4', isVoid: false },
        { name: 'h5', isVoid: false },
        { name: 'h6', isVoid: false },
        { name: 'header', isVoid: false },
        { name: 'hgroup', isVoid: false },
        { name: 'hr', isVoid: true },
        { name: 'li', isVoid: false },
        { name: 'main', isVoid: false },
        { name: 'nav', isVoid: false },
        { name: 'ol', isVoid: false },
        { name: 'p', isVoid: false },
        { name: 'section', isVoid: false },
        { name: 'table', isVoid: false },
        { name: 'tbody', isVoid: false },
        { name: 'td', isVoid: false },
        { name: 'th', isVoid: false },
        { name: 'thead', isVoid: false },
        { name: 'tr', isVoid: false },
        { name: 'ul', isVoid: false }
      ];
    }

    /**
     * Format an HTML string with indentation and newlines for readability.
     * @param {String} input
     *   A chunk of unformatted HTML.
     * @returns {String}
     *   The same HTML formatted for easier readability and diffing.
     */
    formatHtml(input) {
      const elementNamesToFormat = this.elementsToFormat.map(element => element.name).join('|');

      // It is not the fastest way to format the HTML markup but the performance
      // should be good enough.
      const lines = input
        // Add new line before and after `<tag>` and `</tag>`. It may separate
        // individual elements with two new lines, but this will be fixed below.
        .replace(new RegExp( `</?(${ elementNamesToFormat })( .*?)?>`, 'g' ), '\n$&\n')
        // Keep `<br>`s at the end of line to avoid adding additional whitespaces
        // before `<br>`.
        .replace(/<br[^>]*>/g, '$&\n')
        // Divide input string into lines, which start with either an opening tag,
        // a closing tag, or just a text.
        .split('\n');

      let indentCount = 0;
      let isPreformattedLine = false;

      return lines
        .filter((line) => {
          isPreformattedLine = this._isPreformattedBlockLine(line, isPreformattedLine);
          return isPreformattedLine || line.trim().length;
        })
        .map((line) => {
          isPreformattedLine = this._isPreformattedBlockLine(line, isPreformattedLine);
          if (this._isNonVoidOpeningTag(line)) {
            return this._indentLine(line, indentCount++);
          }

          if (this._isClosingTag(line)) {
            return this._indentLine(line, --indentCount);
          }

          if (isPreformattedLine === 'middle' || isPreformattedLine === 'last') {
            return line;
          }

          return this._indentLine(line, indentCount);
        })
        .join('\n');
    }

    /**
     * Checks if an argument is an opening tag of a non-void element.
     *
     * @param {String} line
     *   String to check.
     */
    _isNonVoidOpeningTag(line) {
      return this.elementsToFormat.some((element) => {
        if (element.isVoid) {
          return false;
        }

        if (!new RegExp('<' + element.name  + '( .*?)?>').test(line)) {
          return false;
        }

        return true;
      });
    }

    /**
     * Checks if an argument is a closing tag.
     *
     * @param {String} line
     *   String to check.
     */
    _isClosingTag(line) {
      return this.elementsToFormat.some((element) => {
        return new RegExp('</' + element.name + '>').test(line);
      });
    }

    /**
     * Indents a line by a specified number of characters.
     *
     * @param {String} line
     *   Line to indent.
     * @param {Number} indentCount
     *   Number of characters to use for indentation.
     * @param {String} indentChar
     *   Indentation character(s). 4 spaces by default.
     */
    _indentLine(line, indentCount, indentChar = '    ' ) {
      // More about Math.max() here in https://github.com/ckeditor/ckeditor5/issues/10698.
      return indentChar.repeat(Math.max(0, indentCount)) + line.trim();
    }

    /**
     * Checks whether a line belongs to a preformatted (`<pre>`) block.
     *
     * @param {String} line
     *   String to check.
     * @param {String|false} isPreviousLinePreFormatted
     *   Information on whether the previous line was preformatted (and how).
     */
    _isPreformattedBlockLine(line, isPreviousLinePreFormatted) {
      let preLineType = false;
      if (new RegExp('<pre( .*?)?>').test(line)) {
        preLineType = 'first';
      }
      if (new RegExp('</pre>').test(line)) {
        // If both an opening and closing a <pre> tag, no special treatment needed.
        if (preLineType === 'first') {
          preLineType = false;
        }
        else {
          preLineType = 'last';
        }
      }
      if (!preLineType && (isPreviousLinePreFormatted === 'first' || isPreviousLinePreFormatted === 'middle')) {
        preLineType = 'middle';
      }
      return preLineType;
    }
  }

  /**
   * HTML builder that converts document fragments into strings.
   *
   * Escapes ampersand characters (`&`) and angle brackets (`<` and `>`) when
   * transforming data to HTML. This is required because filter_xss() fails to
   * parse element attributes values containing unescaped HTML entities.
   */
  class BackdropHtmlBuilder {
    /**
     * Constructs a new object.
     */
    constructor() {
      this.chunks = [];
      // @see https://html.spec.whatwg.org/multipage/syntax.html#elements-2
      this.selfClosingTags = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
      ];
    }

    /**
     * Returns the current HTML string built from document fragments.
     *
     * @return {string}
     *   The HTML string built from document fragments.
     */
    build() {
      return this.chunks.join('');
    }

    /**
     * Converts a document fragment into an HTML string appended to the value.
     *
     * @param {Element|DocumentFragment} node
     *   A DOM element to be appended to the value.
     */
    appendNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        this._appendText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        this._appendElement(node);
      } else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        this._appendChildren(node);
      }
    }

    /**
     * Appends an element node to the value.
     *
     * @param {Element} node
     *   A DOM element to be appended to the value.
     */
    _appendElement(node) {
      const nodeName = node.nodeName.toLowerCase();

      this._append('<');
      this._append(nodeName);
      this._appendAttributes(node);
      this._append('>');
      if (!this.selfClosingTags.includes(nodeName)) {
        this._appendChildren(node);
        this._append('</');
        this._append(nodeName);
        this._append('>');
      }
    }

    /**
     * Appends child nodes to the value.
     *
     * @param {Element|DocumentFragment} node
     *  A DOM element to be appended to the value.
     */
    _appendChildren(node) {
      Object.keys(node.childNodes).forEach((child) => {
        this.appendNode(node.childNodes[child]);
      });
    }

    /**
     * Appends attributes to the value.
     *
     * @param {Element} node
     *  A DOM element to be appended to the value.
     */
    _appendAttributes(node) {
      // Sort attributes alphabetically for consistent output across browsers.
      const sortedAttributes = Object.values(node.attributes).sort((a, b) => {
        return a.name > b.name;
      });
      sortedAttributes.forEach((attribute) => {
        this._append(' ');
        this._append(attribute.name);
        this._append('="');
        this._append(
          this._escapeAttribute(attribute.value),
        );
        this._append('"');
      });
    }

    /**
     * Appends text to the value.
     *
     * @param {Element} node
     *  A DOM element to be appended to the value.
     */
    _appendText(node) {
      // Repack the text into another node and extract using innerHTML. This
      // works around text nodes not having an innerHTML property and textContent
      // not encoding entities.
      // entities. That's why the text is repacked into another node and extracted
      // using innerHTML.
      const doc = document.implementation.createHTMLDocument('');
      const container = doc.createElement('p');
      container.textContent = node.textContent;

      this._append(container.innerHTML);
    }

    /**
     * Appends a string to the value.
     *
     * @param {string} str
     *  A string to be appended to the value.
     */
    _append(str) {
      this.chunks.push(str);
    }

    /**
     * Escapes attribute value for compatibility with Backdrop's XSS filtering.
     *
     * Backdrop's XSS filtering does not handle entities inside element attribute
     * values. The XSS filtering was written based on W3C XML recommendations
     * which constituted that the ampersand character (&) and the angle
     * brackets (< and >) must not appear in their literal form in attribute
     * values. This differs from the HTML living standard which permits (but
     * discourages) unescaped angle brackets.
     *
     * @param {string} text
     *  A string to be escaped.
     *
     * @return {string}
     *  Escaped string.
     *
     * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-AttValue
     * @see https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(single-quoted)-state
     * @see https://github.com/whatwg/html/issues/6235
     */
    _escapeAttribute(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\r\n/g, '&#13;')
        .replace(/[\r\n]/g, '&#13;');
    }
  }

})(Backdrop);
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

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
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
(function ($) {

/**
 * This script transforms a set of fieldsets into a stack of vertical
 * tabs. Another tab pane can be selected by clicking on the respective
 * tab.
 *
 * Each tab may have a summary which can be updated by another
 * script. For that to work, each fieldset has an associated
 * 'verticalTabCallback' (with jQuery.data() attached to the fieldset),
 * which is called every time the user performs an update to a form
 * element inside the tab pane.
 */
Backdrop.behaviors.verticalTabs = {
  attach: function (context) {
    $('.vertical-tabs-panes', context).once('vertical-tabs', function () {
      var focusID = $(':hidden.vertical-tabs-active-tab', this).val();
      var tab_focus;

      // Check if there are some fieldsets that can be converted to vertical-tabs
      var $fieldsets = $('> fieldset', this);
      if ($fieldsets.length <= 1) {
        return;
      }

      // Create the tab column.
      var tab_list = $('<ul class="vertical-tabs-list"></ul>');
      $(this).wrap('<div class="vertical-tabs clearfix"></div>').before(tab_list);

      // Transform each fieldset into a tab.
      $fieldsets.each(function () {
        var vertical_tab = new Backdrop.verticalTab({
          title: $('> legend', this).text(),
          fieldset: $(this),
        });
        tab_list.append(vertical_tab.item);
        $(this)
          .removeClass('collapsible collapsed')
          .addClass('vertical-tabs-pane')
          .data('verticalTab', vertical_tab);
        if (this.id == focusID) {
          tab_focus = $(this);
        }
      });

      $('> li:first', tab_list).addClass('first');
      $('> li:last', tab_list).addClass('last');

      if (!tab_focus) {
        // If the current URL has a fragment and one of the tabs contains an
        // element that matches the URL fragment, activate that tab.
        if (window.location.hash && $(this).find(window.location.hash).length) {
          tab_focus = $(this).find(window.location.hash).closest('.vertical-tabs-pane');
        }
        else {
          tab_focus = $fieldsets.first();
        }
      }
      if (tab_focus.length) {
        tab_focus.data('verticalTab').focus();
      }
    });
  }
};

/**
 * The vertical tab object represents a single tab within a tab group.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 *   - fieldset: The jQuery object of the fieldset that is the tab pane.
 */
Backdrop.verticalTab = function (settings) {
  var self = this;
  $.extend(this, settings, Backdrop.theme('verticalTab', settings));

  this.link.on('click', function () {
    self.focus();
    return false;
  });

  this.fieldset.children('legend').on('click', function () {
    self.focus();
    return false;
  });

  // Keyboard events added:
  // Pressing the Enter key will open the tab pane.
  this.link.on('keydown', function(event) {
    if (event.keyCode == 13) {
      self.focus();
      // Set focus on the first input field of the visible fieldset/tab pane.
      $("fieldset.vertical-tabs-pane :input:visible:enabled:first").focus();
      return false;
    }
  });

  // Add summary to legend which is seen on smaller breakpoints
  var $legend = this.fieldset.children('legend');
  $legend.append(this.legendSummary = $('<span class="summary"></span>'));
  $legend.addClass('vertical-tab-link');

  this.fieldset
    .on('summaryUpdated', function () {
      self.updateSummary();
    })
    .trigger('summaryUpdated');
};

Backdrop.verticalTab.prototype = {
  /**
   * Displays the tab's content pane.
   */
  focus: function () {
    // Update tab control for desktop
    this.item.siblings('.vertical-tab-selected').removeClass('vertical-tab-selected');
    this.item
      .addClass('vertical-tab-selected')
      .siblings(':hidden.vertical-tabs-active-tab')
        .val(this.fieldset.attr('id'));
    // Update classes on previous active and new active pane
    this.fieldset.siblings('.vertical-tab-selected').removeClass('vertical-tab-selected');
    this.fieldset.addClass('vertical-tab-selected');
    // Mark the active tab for screen readers.
    $('#active-vertical-tab').remove();
    this.link.append('<span id="active-vertical-tab" class="element-invisible">' + Backdrop.t('(active tab)') + '</span>');
  },

  /**
   * Updates the tab's summary.
   */
  updateSummary: function () {
    var summaryText = this.fieldset.backdropGetSummary();
    this.summary.html(summaryText);
    this.legendSummary.html(summaryText);
  },

  /**
   * Shows a vertical tab pane.
   */
  tabShow: function () {
    // Show the tab.
    this.item.show();

    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    var $allTabs = this.item.parent().children('.vertical-tab-item');
    $allTabs.removeClass('first').filter(':visible:first').addClass('first');

    // Remove hidden class, in case tabHide was run on this tab.
    this.fieldset.removeClass('vertical-tab-hidden').show();

    // Focus this tab if it is the only one.
    if ($allTabs.length === 1) {
      $allTabs.first().data('verticalTab').focus();
    }

    return this;
  },

  /**
   * Hides a vertical tab pane.
   */
  tabHide: function () {
    // Hide the tab.
    this.item.hide();

    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-item').removeClass('first')
      .filter(':visible:first').addClass('first');

    // Hide the fieldset.
    this.fieldset.addClass('vertical-tab-hidden').hide();

    // Focus the first visible tab (if there is one).
    var $firstTab = this.fieldset.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
    if ($firstTab.length) {
      $firstTab.data('verticalTab').focus();
    }
    return this;
  }
};

/**
 * Theme function for a vertical tab.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 * @return
 *   This function has to return an object with at least these keys:
 *   - item: The root tab jQuery element
 *   - link: The anchor tag that acts as the clickable area of the tab
 *       (jQuery version)
 *   - summary: The jQuery element that contains the tab summary
 */
Backdrop.theme.prototype.verticalTab = function (settings) {
  var tab = {};
  // Calculating height in em so CSS has a chance to update height
  tab.item = $('<li class="vertical-tab-item" tabindex="-1"></li>')
    .append(tab.link = $('<a href="#" class="vertical-tab-link"></a>')
      .append(tab.title = $('<strong></strong>').text(settings.title))
      .append(tab.summary = $('<span class="summary"></span>')
    )
  );
  return tab;
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
(function ($) {

/**
 * The base States namespace.
 *
 * Having the local states variable allows us to use the States namespace
 * without having to always declare "Backdrop.states".
 */
var states = Backdrop.states = {
  // An array of functions that should be postponed.
  postponed: []
};

/**
 * Attaches the states.
 */
Backdrop.behaviors.states = {
  attach: function (context, settings) {
    var $context = $(context);
    for (var selector in settings.states) {
      if (settings.states.hasOwnProperty(selector)) {
        for (var state in settings.states[selector]) {
          if (settings.states[selector].hasOwnProperty(state)) {
            new states.Dependent({
              element: $context.find(selector),
              state: states.State.sanitize(state),
              constraints: settings.states[selector][state]
            });
          }
        }
      }
    }

    // Execute all postponed functions now.
    while (states.postponed.length) {
      (states.postponed.shift())();
    }
  }
};

/**
 * Object representing an element that depends on other elements.
 *
 * @param args
 *   Object with the following keys (all of which are required):
 *   - element: A jQuery object of the dependent element
 *   - state: A State object describing the state that is dependent
 *   - constraints: An object with dependency specifications. Lists all elements
 *     that this element depends on. It can be nested and can contain arbitrary
 *     AND and OR clauses.
 */
states.Dependent = function (args) {
  $.extend(this, { values: {}, oldValue: null }, args);

  this.dependees = this.getDependees();
  for (var selector in this.dependees) {
    if (this.dependees.hasOwnProperty(selector)) {
      this.initializeDependee(selector, this.dependees[selector]);
    }
  }
};

/**
 * Comparison functions for comparing the value of an element with the
 * specification from the dependency settings. If the object type can't be
 * found in this list, the === operator is used by default.
 */
states.Dependent.comparisons = {
  'RegExp': function (reference, value) {
    return reference.test(value);
  },
  'Function': function (reference, value) {
    // The "reference" variable is a comparison function.
    return reference(value);
  },
  'Number': function (reference, value) {
    // If "reference" is a number and "value" is a string, then cast reference
    // as a string before applying the strict comparison in compare(). Otherwise
    // numeric keys in the form's #states array fail to match string values
    // returned from jQuery's val().
    return (typeof value === 'string') ? compare(reference.toString(), value) : compare(reference, value);
  }
};

states.Dependent.prototype = {
  /**
   * Initializes one of the elements this dependent depends on.
   *
   * @param selector
   *   The CSS selector describing the dependee.
   * @param dependeeStates
   *   The list of states that have to be monitored for tracking the
   *   dependee's compliance status.
   */
  initializeDependee: function (selector, dependeeStates) {
    var state, self = this;

    function stateEventHandler(e) {
      self.update(e.data.selector, e.data.state, e.value);
    }

    // Cache for the states of this dependee.
    this.values[selector] = {};

    for (var i in dependeeStates) {
      if (dependeeStates.hasOwnProperty(i)) {
        state = dependeeStates[i];
        // Make sure we're not initializing this selector/state combination twice.
        if ($.inArray(state, dependeeStates) === -1) {
          continue;
        }

        state = states.State.sanitize(state);

        // Initialize the value of this state.
        this.values[selector][state.name] = null;

        // Monitor state changes of the specified state for this dependee.
        $(selector).on('state:' + state, {selector: selector, state: state}, stateEventHandler);

        // Make sure the event we just bound ourselves to is actually fired.
        new states.Trigger({ selector: selector, state: state });
      }
    }
  },

  /**
   * Compares a value with a reference value.
   *
   * @param reference
   *   The value used for reference.
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   *
   * @return
   *   true or false.
   */
  compare: function (reference, selector, state) {
    var value = this.values[selector][state.name];
    if (reference.constructor.name in states.Dependent.comparisons) {
      // Use a custom compare function for certain reference value types.
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }
    else {
      // Do a plain comparison otherwise.
      return compare(reference, value);
    }
  },

  /**
   * Update the value of a dependee's state.
   *
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   * @param value
   *   The new value for the dependee's updated state.
   */
  update: function (selector, state, value) {
    // Only act when the 'new' value is actually new.
    if (value !== this.values[selector][state.name]) {
      this.values[selector][state.name] = value;
      this.reevaluate();
    }
  },

  /**
   * Triggers change events in case a state changed.
   */
  reevaluate: function () {
    // Check whether any constraint for this dependent state is satisfied.
    var value = this.verifyConstraints(this.constraints);

    // Only invoke a state change event when the value actually changed.
    if (value !== this.oldValue) {
      // Store the new value so that we can compare later whether the value
      // actually changed.
      this.oldValue = value;

      // Normalize the value to match the normalized state name.
      value = invert(value, this.state.invert);

      // By adding "trigger: true", we ensure that state changes don't go into
      // infinite loops.
      this.element.trigger({ type: 'state:' + this.state, value: value, trigger: true });
    }
  },

  /**
   * Evaluates child constraints to determine if a constraint is satisfied.
   *
   * @param constraints
   *   A constraint object or an array of constraints.
   * @param selector
   *   The selector for these constraints. If undefined, there isn't yet a
   *   selector that these constraints apply to. In that case, the keys of the
   *   object are interpreted as the selector if encountered.
   *
   * @return
   *   true or false, depending on whether these constraints are satisfied.
   */
  verifyConstraints: function(constraints, selector) {
    var result;
    if (Array.isArray(constraints)) {
      // This constraint is an array (OR or XOR).
      var hasXor = $.inArray('xor', constraints) === -1;
      for (var i = 0, len = constraints.length; i < len; i++) {
        if (constraints[i] != 'xor') {
          var constraint = this.checkConstraints(constraints[i], selector, i);
          // Return if this is OR and we have a satisfied constraint or if this
          // is XOR and we have a second satisfied constraint.
          if (constraint && (hasXor || result)) {
            return hasXor;
          }
          result = result || constraint;
        }
      }
    }
    // Make sure we don't try to iterate over things other than objects. This
    // shouldn't normally occur, but in case the condition definition is bogus,
    // we don't want to end up with an infinite loop.
    else if ($.isPlainObject(constraints)) {
      // This constraint is an object (AND).
      for (var n in constraints) {
        if (constraints.hasOwnProperty(n)) {
          result = ternary(result, this.checkConstraints(constraints[n], selector, n));
          // False and anything else will evaluate to false, so return when any
          // false condition is found.
          if (result === false) { return false; }
        }
      }
    }
    return result;
  },

  /**
   * Checks whether the value matches the requirements for this constraint.
   *
   * @param value
   *   Either the value of a state or an array/object of constraints. In the
   *   latter case, resolving the constraint continues.
   * @param selector
   *   The selector for this constraint. If undefined, there isn't yet a
   *   selector that this constraint applies to. In that case, the state key is
   *   propagates to a selector and resolving continues.
   * @param state
   *   The state to check for this constraint. If undefined, resolving
   *   continues.
   *   If both selector and state aren't undefined and valid non-numeric
   *   strings, a lookup for the actual value of that selector's state is
   *   performed. This parameter is not a State object but a pristine state
   *   string.
   *
   * @return
   *   true or false, depending on whether this constraint is satisfied.
   */
  checkConstraints: function(value, selector, state) {
    // Normalize the last parameter. If it's non-numeric, we treat it either as
    // a selector (in case there isn't one yet) or as a trigger/state.
    if (typeof state !== 'string' || (/[0-9]/).test(state[0])) {
      state = null;
    }
    else if (typeof selector === 'undefined') {
      // Propagate the state to the selector when there isn't one yet.
      selector = state;
      state = null;
    }

    if (state !== null) {
      // constraints is the actual constraints of an element to check for.
      state = states.State.sanitize(state);
      return invert(this.compare(value, selector, state), state.invert);
    }
    else {
      // Resolve this constraint as an AND/OR operator.
      return this.verifyConstraints(value, selector);
    }
  },

  /**
   * Gathers information about all required triggers.
   */
  getDependees: function() {
    var cache = {};
    // Swivel the lookup function so that we can record all available selector-
    // state combinations for initialization.
    var _compare = this.compare;
    this.compare = function(reference, selector, state) {
      (cache[selector] || (cache[selector] = [])).push(state.name);
      // Return nothing (=== undefined) so that the constraint loops are not
      // broken.
    };

    // This call doesn't actually verify anything but uses the resolving
    // mechanism to go through the constraints array, trying to look up each
    // value. Since we swivelled the compare function, this comparison returns
    // undefined and lookup continues until the very end. Instead of lookup up
    // the value, we record that combination of selector and state so that we
    // can initialize all triggers.
    this.verifyConstraints(this.constraints);
    // Restore the original function.
    this.compare = _compare;

    return cache;
  }
};

states.Trigger = function (args) {
  $.extend(this, args);

  if (this.state in states.Trigger.states) {
    this.element = $(this.selector);

    // Only call the trigger initializer when it wasn't yet attached to this
    // element. Otherwise we'd end up with duplicate events.
    if (!this.element.data('trigger:' + this.state)) {
      this.initialize();
    }
  }
};

states.Trigger.prototype = {
  initialize: function () {
    var trigger = states.Trigger.states[this.state];

    if (typeof trigger == 'function') {
      // We have a custom trigger initialization function.
      trigger.call(window, this.element);
    }
    else {
      for (var event in trigger) {
        if (trigger.hasOwnProperty(event)) {
          this.defaultTrigger(event, trigger[event]);
        }
      }
    }

    // Mark this trigger as initialized for this element.
    this.element.data('trigger:' + this.state, true);
  },

  defaultTrigger: function (event, valueFn) {
    var oldValue = valueFn.call(this.element);

    // Attach the event callback.
    this.element.on(event, $.proxy(function (e) {
      var value = valueFn.call(this.element, e);
      // Only trigger the event if the value has actually changed.
      if (oldValue !== value) {
        this.element.trigger({ type: 'state:' + this.state, value: value, oldValue: oldValue });
        oldValue = value;
      }
    }, this));

    states.postponed.push($.proxy(function () {
      // Trigger the event once for initialization purposes.
      this.element.trigger({ type: 'state:' + this.state, value: oldValue, oldValue: null });
    }, this));
  }
};

/**
 * This list of states contains functions that are used to monitor the state
 * of an element. Whenever an element depends on the state of another element,
 * one of these trigger functions is added to the dependee so that the
 * dependent element can be updated.
 */
states.Trigger.states = {
  // 'empty' describes the state to be monitored
  empty: {
    // 'keyup' is the (native DOM) event that we watch for.
    'keyup': function () {
      // The function associated to that trigger returns the new value for the
      // state.
      return this.val() == '';
    }
  },

  checked: {
    'change': function () {
      // prop() and attr() only takes the first element into account. To support
      // selectors matching multiple checkboxes, iterate over all and return
      // whether any is checked.
      var checked = false;
      this.each(function () {
        // Use prop() here as we want a boolean of the checkbox state.
        // @see http://api.jquery.com/prop/
        checked = $(this).prop('checked');
        // Break the each() loop if this is checked.
        return !checked;
      });
      return checked;
    }
  },

  // For radio buttons, only return the value if the radio button is selected.
  value: {
    'keyup': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    },
    'change': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    }
  },

  collapsed: {
    'collapsed': function(e) {
      return (typeof e !== 'undefined' && 'value' in e) ? e.value : this.is('.collapsed');
    }
  }
};


/**
 * A state object is used for describing the state and performing aliasing.
 */
states.State = function(state) {
  // We may need the original unresolved name later.
  this.pristine = this.name = state;

  // Normalize the state name.
  while (true) {
    // Iteratively remove exclamation marks and invert the value.
    while (this.name.charAt(0) == '!') {
      this.name = this.name.substring(1);
      this.invert = !this.invert;
    }

    // Replace the state with its normalized name.
    if (this.name in states.State.aliases) {
      this.name = states.State.aliases[this.name];
    }
    else {
      break;
    }
  }
};

/**
 * Creates a new State object by sanitizing the passed value.
 */
states.State.sanitize = function (state) {
  if (state instanceof states.State) {
    return state;
  }
  else {
    return new states.State(state);
  }
};

/**
 * This list of aliases is used to normalize states and associates negated names
 * with their respective inverse state.
 */
states.State.aliases = {
  'enabled': '!disabled',
  'invisible': '!visible',
  'invalid': '!valid',
  'untouched': '!touched',
  'optional': '!required',
  'filled': '!empty',
  'unchecked': '!checked',
  'irrelevant': '!relevant',
  'expanded': '!collapsed',
  'readwrite': '!readonly'
};

states.State.prototype = {
  invert: false,

  /**
   * Ensures that just using the state object returns the name.
   */
  toString: function() {
    return this.name;
  }
};

/**
 * Global state change handlers. These are bound to "document" to cover all
 * elements whose state changes. Events sent to elements within the page
 * bubble up to these handlers. We use this system so that themes and modules
 * can override these state change handlers for particular parts of a page.
 */

$(document).on('state:disabled', function(e) {
  // Only act when this change was triggered by a dependency and not by the
  // element monitoring itself.
  if (e.trigger) {
    $(e.target)
      .prop('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea').prop('disabled', e.value);

    // Note: WebKit nightlies don't reflect that change correctly.
    // See https://bugs.webkit.org/show_bug.cgi?id=23789
  }
});

$(document).on('state:required', function(e) {
  if (e.trigger) {
    if (e.value) {
      var $label = $(e.target).closest('.form-item, .form-wrapper').find('label');
      // Avoids duplicate required markers on initialization.
      if (!$label.find('.form-required').length) {
        $label.append('<abbr class="form-required" title="' + Backdrop.t('This field is required.') + '">*</abbr>');
      }
    }
    else {
      $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove();
    }
  }
});

$(document).on('state:visible', function(e) {
  if (e.trigger) {
    $(e.target).closest('.form-item, .form-submit, .form-wrapper').toggle(e.value);
  }
});

$(document).on('state:checked', function(e) {
  if (e.trigger) {
    $(e.target).prop('checked', e.value);
  }
});

$(document).on('state:collapsed', function(e) {
  if (e.trigger) {
    if ($(e.target).is('.collapsed') !== e.value) {
      $('> legend a', e.target).trigger('click');
    }
  }
});


/**
 * These are helper functions implementing addition "operators" and don't
 * implement any logic that is particular to states.
 */

// Bitwise AND with a third undefined state.
function ternary (a, b) {
  return typeof a === 'undefined' ? b : (typeof b === 'undefined' ? a : a && b);
}

// Inverts a (if it's not undefined) when invertState is true.
function invert (a, invertState) {
  return (invertState && typeof a !== 'undefined') ? !a : a;
}

// Compares two values while ignoring undefined values.
function compare (a, b) {
  return (a === b) ? (typeof a === 'undefined' ? a : true) : (typeof a === 'undefined' || typeof b === 'undefined');
}

})(jQuery);
;
