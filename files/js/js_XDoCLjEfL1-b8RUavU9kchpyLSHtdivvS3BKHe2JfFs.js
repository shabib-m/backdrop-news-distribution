Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Add":"\u0625\u0636\u0627\u0641\u0629","Configure":"\u0636\u0628\u0637","This field is required.":"\u0647\u0630\u0627 \u0627\u0644\u062d\u0642\u0644 \u0636\u0631\u0648\u0631\u064a.","Hidden":"\u0645\u062e\u0641\u064a","Show":"\u0639\u0631\u0636","Please wait...":"\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...","Hide":"\u0625\u062e\u0641\u0627\u0621","By @name on @date":"\u0645\u0646 @name \u0628\u062a\u0627\u0631\u064a\u062e \u00a0@date","By @name":"\u0645\u0646 %name","Alias: @alias":"\u0627\u0644\u0628\u062f\u064a\u0644: @alias","No alias":"\u0644\u0627 \u064a\u0648\u062c\u062f \u0628\u062f\u0627\u0626\u0644","New revision":"\u0645\u0631\u0627\u062c\u0639\u0629 \u062c\u062f\u064a\u062f\u0629","Drag to re-order":"\u0627\u0633\u062d\u0628 \u0644\u062a\u063a\u064a\u0631 \u0627\u0644\u062a\u0631\u062a\u064a\u0628","Changes made in this table will not be saved until the form is submitted.":"\u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u062f\u062b\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u0646 \u062a\u064f\u062d\u0641\u0638 \u0625\u0644\u0627 \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0631\u0629.","Uploading... (@current of @total)":"\u062c\u0627\u0631\u064a \u0627\u0644\u0631\u0641\u0639... (@current \u0645\u0646 @total)","No revision":"\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u064a \u0645\u0631\u0627\u062c\u0639\u0629","@number comments per page":"@number \u062a\u0639\u0644\u064a\u0642 \u0641\u064a \u0627\u0644\u0635\u0641\u062d\u0629","(active tab)":"(\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u0628\u0648\u064a\u0628 \u0627\u0644\u0646\u0634\u0637\u0629)","Flat list":"\u0642\u0627\u0626\u0645\u0629 \u0645\u0633\u0637\u062d\u0629","Hide summary":"\u0625\u062e\u0641\u0627\u0621 \u0627\u0644\u0645\u0648\u062c\u0632","Edit summary":"\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0645\u0644\u062e\u0635","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"\u0644\u0627 \u064a\u0645\u0643\u0646 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u062d\u062f\u062f %filename. \u064a\u0633\u0645\u062d \u0641\u0642\u0637 \u0628\u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0630\u0627\u062a \u0627\u0644\u0644\u0648\u0627\u062d\u0642 \u0627\u0644\u062a\u0627\u0644\u064a\u0629: %extensions.","Re-order rows by numerical weight instead of dragging.":"\u0625\u0639\u0627\u062f\u0629 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0633\u0637\u0648\u0631 \u062d\u0633\u0628 \u0648\u0632\u0646 \u0631\u0642\u0645\u064a \u0628\u062f\u0644\u0627 \u0645\u0646 \u0633\u062d\u0628\u0647\u0627.","Show row weights":"\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0623\u0633\u0637\u0631","Hide row weights":"\u0625\u062e\u0641\u0627\u0621 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0633\u0637\u0648\u0631","Autocomplete popup":"\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a","Searching for matches...":"\u062c\u0627\u0631\u064a \u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629...","Loading...":"\u062a\u062d\u0645\u064a\u0644...","Apply":"\u062a\u0637\u0628\u064a\u0642","Apply (all displays)":"\u062a\u0637\u0628\u064a\u0642 (\u0643\u0644 \u0627\u0644\u0639\u0631\u0648\u0636)","Apply (this display)":"\u062a\u0637\u0628\u064a\u0642 (\u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636)"}} };;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Backdrop.Views = {};

/**
 * Keep the original beforeSubmit method to be available for overrides.
 */
Backdrop.Views.beforeSubmit = Backdrop.ajax.prototype.beforeSubmit;

/**
 * Keep the original beforeSerialize method to be available for overrides.
 */
Backdrop.Views.beforeSerialize = Backdrop.ajax.prototype.beforeSerialize;

/**
 * Keep the original beforeSend method to be available for overrides.
 */
Backdrop.Views.beforeSend = Backdrop.ajax.prototype.beforeSend;

/**
 * Helper function to parse a querystring.
 */
Backdrop.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pair;
  var pairs = query.split('&');
  var pair, key, value;
  for (var i in pairs) {
    if (typeof (pairs[i]) == 'string') {
      pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
        value = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        // Field name ends with [], it's multi-values.
        if (/\[\]$/.test(key)) {
          if (!(key in args)) {
            args[key] = [value];
          }
          // Don't duplicate values.
          else if (!$.inArray(value, args[key]) !== -1) {
            args[key].push(value);
          }
        }
        else {
          args[key] = value;
        }
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Backdrop.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Backdrop.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Backdrop.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Backdrop path portion of an href.
 */
Backdrop.Views.getPath = function (href) {
  href = Backdrop.Views.pathPortion(href);
  href = href.substring(Backdrop.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i = 0; i < chars.length; i++) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

/**
 * Strip views values and duplicates from URL.
 *
 * @param url
 *   String with the full URL to clean up.
 * @param viewArgs
 *   Object containing field values from views.
 *
 * @return url
 *   String URL with views values and reduced duplicates.
 */
Backdrop.Views.cleanURL = function (url, viewArgs) {
  var args = ('reset' in viewArgs) ? {} : Backdrop.Views.parseQueryString(url);
  var query = [];

  // With clean urls off we need to add the 'q' parameter.
  if (/\?/.test(Backdrop.settings.views.ajax_path)) {
    query.push('q=' + Backdrop.Views.getPath(url));
  }

  $.each(args, function (name, value) {
    // Use values from viewArgs if they exists.
    if (name in viewArgs) {
      value = viewArgs[name];
    }
    if (Array.isArray(value)) {
      $.merge(query, $.map($.uniqueSort(value), function (sub) {
        return encodeURIComponent(name) + '=' + encodeURIComponent(sub);
      }));
    }
    else {
      query.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
  });

  url = window.location.href.split('?');
  return url[0] + (query.length ? '?' + query.join('&') : '');
};

/**
 * Remove the functions from the state. They can't be pushed into the history.
 *
 * @param state
 *  Object containing the state to be cleaned.
 *
 * @return state
 *  Object that has been cleaned up.
 */
Backdrop.Views.cleanStateForHistory = function (state) {
  var stateWithNoFunctions = {};
  for (var key in state) {
    if (typeof state[key] !== "function") {
      stateWithNoFunctions[key] = state[key];
    }
  }
  return stateWithNoFunctions;
};

/**
 * Parse a URL query string.
 *
 * @param queryString
 *   String containing the query to parse.
 */
Backdrop.Views.parseQuery = function (queryString) {
  var query = {};
  $.map(queryString.split('&'), function (val) {
    var s = val.split('=');
    query[s[0]] = s[1];
  });
  return query;
};

/**
 * Remove 'popstate' handler when adding a new state to avoid an infinite loop.
 *
 * We only use the 'popstate' event to trigger refresh on back or forward click.
 *
 * @param options
 *   Object containing the values from views' AJAX call.
 * @param url
 *   String with the current URL to be cleaned up.
 */
Backdrop.Views.addState = function (options, url) {
  // The data in the history state must be serializable.
  var historyOptions = $.extend({}, options);

  // Store the actual view's dom id.
  Backdrop.settings.lastViewDomID = options.data.view_dom_id;
  $(window).off('popstate', Backdrop.Views.loadView);
  history.pushState(Backdrop.Views.cleanStateForHistory(historyOptions), document.title, Backdrop.Views.cleanURL(url, options.data));
  $(window).on('popstate', Backdrop.Views.loadView);
};

/**
 * Make an AJAX request to update the view when navigating back and forth.
 */
Backdrop.Views.loadView = function () {
  var options;

  // This should be the first loaded page, so init the options object.
  if (history.state === null) {
    var viewsAjaxSettingsKey = 'views_dom_id:' + Backdrop.settings.lastViewDomID;
    if (Backdrop.settings.views.ajaxViews.hasOwnProperty(viewsAjaxSettingsKey)) {
      var viewsAjaxSettings = Backdrop.settings.views.ajaxViews[viewsAjaxSettingsKey];
      var initial_ajax_exposed_input = Backdrop.settings.initial_ajax_exposed_input[viewsAjaxSettingsKey];
      $.extend(viewsAjaxSettings, initial_ajax_exposed_input);
      viewsAjaxSettings.page = Backdrop.settings.views.ajaxViews.onload_page_item;
      options = {
        data: viewsAjaxSettings,
        url: Backdrop.settings.views.ajax_path
      };
    }
  }
  else {
    options = history.state;
  }

  // Need an element to trigger Backdrop's AJAX call.
  var $trigger = $('<div class="ajax-history-trigger"/>');

  // Backdrop's AJAX options.
  var settings = $.extend({
    submit: options.data,
    setClick: true,
    event: 'click',
    selector: '.view-dom-id-' + options.data.view_dom_id,
    progress: { type: 'throbber' },
    httpMethod: 'GET',
  }, options);

  new Backdrop.ajax(false, $trigger[0], settings);
  // Trigger ajax call.
  // @todo check there is no leak, $trigger is never destroyed.
  $trigger.trigger('click');
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Backdrop.progressBar = function (id, updateCallback, method, errorCallback) {
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Backdrop.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Backdrop.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Backdrop.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Backdrop.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Backdrop.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Backdrop.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX submission and response in Views UI.
 */
(function ($) {
  "use strict";

  Backdrop.ajax.prototype.commands.viewsHilite = function (ajax, response, status) {
    $('.hilited').removeClass('hilited');
    $(response.selector).addClass('hilited');
  };

  Backdrop.ajax.prototype.commands.viewsAddTab = function (ajax, response, status) {
    var id = '#views-tab-' + response.id;
    $('#views-tabset').viewsAddTab(id, response.title, 0);
    $(id).html(response.body).addClass('views-tab');

    // Update the preview widget to preview the new tab.
    var display_id = id.replace('#views-tab-', '');
    $("#preview-display-id").append('<option selected="selected" value="' + display_id + '">' + response.title + '</option>');

    Backdrop.attachBehaviors(id);
    var instance = $.viewsUi.tabs.instances[$('#views-tabset').get(0).UI_TABS_UUID];
    $('#views-tabset').viewsClickTab(instance.$tabs.length);
  };

  Backdrop.ajax.prototype.commands.viewsShowButtons = function (ajax, response, status) {
    $('div.views-edit-view div.view-changed.messages').removeClass('js-hide');
  };

  Backdrop.ajax.prototype.commands.viewsTriggerPreview = function (ajax, response, status) {
    if ($('input#edit-displays-live-preview').is(':checked')) {
      $('#preview-submit').trigger('click');
    }
  };

  Backdrop.ajax.prototype.commands.viewsReplaceTitle = function (ajax, response, status) {
    // In case we're in the overlay, get a reference to the underlying window.
    var doc = parent.document;
    // For the <title> element, make a best-effort attempt to replace the page
    // title and leave the site name alone. If the theme doesn't use the site
    // name in the <title> element, this will fail.
    var oldTitle = doc.title;
    // Escape the site name, in case it has special characters in it, so we can
    // use it in our regex.
    var escapedSiteName = response.siteName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var re = new RegExp('.+ (.) ' + escapedSiteName);
    doc.title = oldTitle.replace(re, response.title + ' $1 ' + response.siteName);

    $('h1.page-title').text(response.title);
    $('h1#overlay-title').text(response.title);
  };

  /**
   * Get rid of irritating tabledrag messages
   */
  Backdrop.theme.tableDragChangedWarning = function () {
    return [];
  };

  /**
   * Trigger preview when the "live preview" checkbox is checked.
   */
  Backdrop.behaviors.livePreview = {
    attach: function (context) {
      $('input#edit-displays-live-preview', context).once('views-ajax-processed').on('click', function() {
        if ($(this).is(':checked')) {
          $('#preview-submit').trigger('click');
        }
      });
    }
  };

  /**
   * Sync preview display.
   */
  Backdrop.behaviors.syncPreviewDisplay = {
    attach: function (context) {
      $("#views-tabset a").once('views-ajax-processed').on('click', function() {
        var href = $(this).attr('href');
        // Cut of #views-tabset.
        var display_id = href.substr(11);
        // Set the form element.
        $("#views-live-preview #preview-display-id").val(display_id);
      }).addClass('views-ajax-processed');
    }
  }

  Backdrop.behaviors.viewsAjax = {
    collapseReplaced: false,
    attach: function (context, settings) {
      var base_element_settings = {
        'event': 'click',
        'progress': { 'type': 'throbber' }
      };
      // Bind AJAX behaviors to all items showing the class.
      $('a.views-ajax-link', context).once('views-ajax-processed').each(function () {
        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        if ($(this).attr('href')) {
          element_settings.url = $(this).attr('href');
        }
        var base = $(this).attr('id');
        Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
      });

      $('div#views-live-preview a')
        .once('views-ajax-processed').each(function () {
        // We don't bind to links without a URL.
        if (!$(this).attr('href')) {
          return true;
        }

        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        element_settings.url = $(this).attr('href');
        if (Backdrop.Views.getPath(element_settings.url).substring(0, 21) != 'admin/structure/views') {
          return true;
        }

        element_settings.wrapper = 'views-live-preview';
        element_settings.method = 'html';
        var base = $(this).attr('id');
        Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
      });

      // Within a live preview, make exposed widget form buttons re-trigger the
      // Preview button.
      // @todo Revisit this after fixing Views UI to display a Preview outside
      //   of the main Edit form.
      $('div#views-live-preview input[type=submit]')
        .once('views-ajax-processed').each(function(event) {
        $(this).on('click', function () {
          this.form.clk = this;
          return true;
        });
        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        element_settings.url = $(this.form).attr('action');
        if (Backdrop.Views.getPath(element_settings.url).substring(0, 21) != 'admin/structure/views') {
          return true;
        }

        element_settings.wrapper = 'views-live-preview';
        element_settings.method = 'html';
        element_settings.event = 'click';

        var base = $(this).attr('id');
        Backdrop.ajax[base] = new Backdrop.ajax(base, this, element_settings);
      });
    }
  };

})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views UI.
 */
(function ($) {

"use strict";

Backdrop.viewsUi = {};

/**
 * Improve the user experience of the views edit interface.
 */
Backdrop.behaviors.viewsUiEditView = {
  attach: function () {
    // Only show the SQL rewrite warning when the user has chosen the
    // corresponding checkbox.
    $('#edit-query-options-disable-sql-rewrite').on('click', function () {
      $('.sql-rewrite-warning').toggleClass('js-hide');
    });
  }
};

/**
 * In the add view wizard, use the view name to prepopulate form fields such as
 * page title and menu link.
 */
Backdrop.behaviors.viewsUiAddView = {
  attach: function (context) {
    var $context = $(context);
    var replace = '-';
    var suffix;

    // The page title, block title, and menu link fields can all be prepopulated
    // with the view name - no regular expression needed.
    var $fields = $context.find('[id^="edit-page-title"], [id^="edit-block-title"], [id^="edit-page-link-properties-title"]');
    if ($fields.length) {
      if (!this.fieldsFiller) {
        this.fieldsFiller = new Backdrop.viewsUi.FormFieldFiller($fields);
      }
      else {
        // After an AJAX response, this.fieldsFiller will still have event
        // handlers bound to the old version of the form fields (which don't exist
        // anymore). The event handlers need to be unbound and then rebound to the
        // new markup. Note that jQuery.live is difficult to make work in this
        // case because the IDs of the form fields change on every AJAX response.
        this.fieldsFiller.rebind($fields);
      }
    }
    // Prepopulate the path field with a URLified version of the view name.
    var $pathField = $context.find('[id^="edit-page-path"]');
    if ($pathField.length) {
      if (!this.pathFiller) {
        this.pathFiller = new Backdrop.viewsUi.FormFieldFiller($pathField, replace);
      }
      else {
        this.pathFiller.rebind($pathField);
      }
    }
    // Populate the RSS feed field with a URLified version of the view name, and
    // an .xml suffix (to make it unique).
    var $feedField = $context.find('[id^="edit-page-feed-properties-path"]');
    if ($feedField.length) {
      if (!this.feedFiller) {
        suffix = '.xml';
        this.feedFiller = new Backdrop.viewsUi.FormFieldFiller($feedField, replace, suffix);
      }
      else {
        this.feedFiller.rebind($feedField);
      }
    }
  }
};

/**
 * Constructor for the Backdrop.viewsUi.FormFieldFiller object.
 *
 * Prepopulates a form field based on the view name.
 *
 * @param $target
 *   A jQuery object representing the form field to prepopulate.
 * @param replace
 *   Optional. A string to use as the replacement value for disallowed
 *   characters.
 * @param suffix
 *   Optional. A suffix to append at the end of the target field content.
 */
Backdrop.viewsUi.FormFieldFiller = function ($target, replace, suffix) {
  this.source = $('#edit-human-name');
  this.target = $target;
  this.replace = replace || '';
  this.suffix = suffix || '';

  // Copy the transliteration options from the machine name element.
  var machineNameData = $('[data-machine-name]').data('machine-name');
  this.transliterationOptions = {
    replace: machineNameData.replace,
    replace_pattern: machineNameData.replace_pattern,
    replace_token: machineNameData.replace_token,
    langcode: machineNameData.langcode
  };

  // Create bound versions of this instance's object methods to use as event
  // handlers. This will let us unbind those specific handlers later on.
  // NOTE: $.proxy will not work for this because it assumes we want only
  // one bound version of an object method, whereas we need one version per
  // object instance.
  var self = this;
  this.populate = function () {return self._populate.call(self);};
  this.unbind = function () {return self._unbind.call(self);};

  this.bind();
  // Object constructor; no return value.
};

$.extend(Backdrop.viewsUi.FormFieldFiller.prototype, {
  /**
   * Bind the form-filling behavior.
   */
  bind: function () {
    this.unbind();
    // Populate the form field when the source changes.
    this.source.on('keyup.viewsUi change.viewsUi', this.populate);
    // Quit populating the field as soon as it gets focus.
    this.target.on('focus.viewsUi', this.unbind);
  },

  /**
   * Get the source form field value as altered by the passed-in parameters.
   */
  getTransliterated: function () {
    var self = this;
    return $.ajax({
      url: Backdrop.settings.basePath + "?q=" + Backdrop.encodePath("system/transliterate/" + self.source.val().toLowerCase()),
      data: self.transliterationOptions,
      dataType: "text"
    });
  },

  /**
   * Use the title for populating the fields, or send a request
   * for a transliterated version of the source field value when needed.
   */
  _populate: function () {
    if (this.replace == '') {
      this.target.val(this.source.val() + this.suffix);
    }
    else {
      var transliterated = this.getTransliterated();
      var self = this;
      transliterated.done(function(machine) {
        // Replace the machine name placeholder with the specific one for this
        // field. e.g. A hyphen instead of an underscore for the path.
        machine = machine.replace(new RegExp(self.transliterationOptions.replace,  'g'), self.replace);
        self.target.val(machine + self.suffix);
      });
    }
  },

  /**
   * Stop prepopulating the form fields.
   */
  _unbind: function () {
    this.source.off('keyup.viewsUi change.viewsUi', this.populate);
    this.target.off('focus.viewsUi', this.unbind);
  },

  /**
   * Bind event handlers to the new form fields, after they're replaced via AJAX.
   */
  rebind: function ($fields) {
    this.target = $fields;
    this.bind();
  }
});

Backdrop.behaviors.addItemForm = {
  attach: function (context) {
    // The add item form may have an id of views-ui-add-item-form--n.
    var $form = $(context).find('form[id^="views-ui-add-item-form"]').addBack('form[id^="views-ui-add-item-form"]').first();
    // Make sure we don't add more than one event handler to the same form.
    $form.once('views-ui-add-item-form', function() {
      new Backdrop.viewsUi.AddItemForm($form);
    });
  }
};

Backdrop.viewsUi.AddItemForm = function ($form) {
  $form.on('click', '.views-filterable-options :checkbox', $.proxy(this.handleCheck, this));

  // Find the wrapper of the displayed text and hide it until items are checked.
  this.$form = $form;
  this.$selected_div = this.$form.find('.views-selected-options').parent();
  this.$selected_div.hide();
  this.checkedItems = [];
};

Backdrop.viewsUi.AddItemForm.prototype.handleCheck = function (event) {
  var $target = $(event.target);
  var label = $target.closest('td').next().text().trim();
  // Add/remove the checked item to the list.
  if ($target.is(':checked')) {
    this.$selected_div.css('display', 'block');
    this.checkedItems.push(Backdrop.checkPlain(label));
  }
  else {
    var position = $.inArray(Backdrop.checkPlain(label), this.checkedItems);
    // Delete the item from the list and take sure that the list doesn't have undefined items left.
    for (var i = 0; i < this.checkedItems.length; i++) {
      if (i == position) {
        this.checkedItems.splice(i, 1);
        i--;
        break;
      }
    }
    // Hide it again if none item is selected.
    if (this.checkedItems.length == 0) {
      this.$selected_div.hide();
    }
  }
  this.refreshCheckedItems();
};

/**
 * Refresh the display of the checked items.
 */
Backdrop.viewsUi.AddItemForm.prototype.refreshCheckedItems = function () {
  // Perhaps we should pre-cache the text div, too.
  this.$selected_div.find('.views-selected-options')
    .html(this.checkedItems.join(', '))
    .trigger('dialogContentResize');
};

/**
 * The input field items that add displays must be rendered as <input> elements.
 * The following behavior detaches the <input> elements from the DOM, wraps them
 * in an unordered list, then appends them to the list of tabs.
 */
Backdrop.behaviors.viewsUiRenderAddViewButton = {
  attach: function (context) {
    // Build the add display menu and pull the display input buttons into it.
    var $menu = $(context).find('#views-display-menu-tabs').once('views-ui-render-add-view-button-processed');
    if (!$menu.length) {
      return;
    }
    var $addDisplayDropdown = $('<li class="add"><a href="#"><span class="icon add"></span>' + Backdrop.t('Add') + '</a><ul class="action-list" style="display:none;"></ul></li>');
    var $displayButtons = $menu.nextAll('input.add-display').detach();
    $displayButtons.appendTo($addDisplayDropdown.find('.action-list')).wrap('<li>')
      .parent().first().addClass('first').end().last().addClass('last');
    // Remove the 'Add ' prefix from the button labels since they're being
    // placed in an 'Add' dropdown.
    // @todo This assumes English, but so does $addDisplayDropdown above. Add
    //   support for translation.
    $displayButtons.each(function () {
      var label = $(this).val();
      if (label.substr(0, 4) === 'Add ') {
        $(this).val(label.substr(4));
      }
    });
    $addDisplayDropdown.appendTo($menu);

    // Add the click handler for the add display button
    $menu.find('li.add > a').on('click', function (event) {
      event.preventDefault();
      var $trigger = $(this);
      Backdrop.behaviors.viewsUiRenderAddViewButton.toggleMenu($trigger);
    });
    // Add a mouseleave handler to close the dropdown when the user mouses
    // away from the item. We use mouseleave instead of mouseout because
    // the user is going to trigger mouseout when she moves from the trigger
    // link to the sub menu items.
    // We use the live binder because the open class on this item will be
    // toggled on and off and we want the handler to take effect in the cases
    // that the class is present, but not when it isn't.
    $('li.add', $menu).on('mouseleave', function (event) {
      var $this = $(this);
      var $trigger = $this.children('a[href="#"]');
      if ($this.children('.action-list').is(':visible')) {
        Backdrop.behaviors.viewsUiRenderAddViewButton.toggleMenu($trigger);
      }
    });
  }
};

Backdrop.behaviors.viewsUiRenderAddViewButton.toggleMenu = function ($trigger) {
  $trigger.parent().toggleClass('open');
  $trigger.next().toggle();
};

Backdrop.behaviors.viewsUiSearchOptions = {
  attach: function (context) {
    // The add item form may have an id of views-ui-add-item-form--n.
    var $form = $(context).find('form[id^="views-ui-add-item-form"]').addBack('form[id^="views-ui-add-item-form"]').first();
    // Make sure we don't add more than one event handler to the same form.
    $form.once('views-ui-filter-options', function() {
      new Backdrop.viewsUi.OptionsSearch($form);
    });
  }
};

  /**
   * Constructor for the viewsUi.OptionsSearch object.
   *
   * The OptionsSearch object filters the available options on a form according
   * to the user's search term. Typing in "taxonomy" will show only those options
   * containing "taxonomy" in their label.
   */
  Backdrop.viewsUi.OptionsSearch = function ($form) {
    /**
     *
     * @type {jQuery}
     */
    this.$form = $form;

    const searchBoxSelector = '#edit-options-search';
    const controlGroupSelector = 'select[name="group"]';
    this.$form.on(
      'formUpdated',
      `${searchBoxSelector},${controlGroupSelector}`,
      $.proxy(this.handleFilter, this),
    );

    this.$searchBox = this.$form.find(searchBoxSelector);
    this.$controlGroup = this.$form.find(controlGroupSelector);

    /**
     * Get a list of option labels and their corresponding DIV tags and maintain
     * it in memory, so we have as little overhead as possible at keyup time.
     */
    this.options = this.getOptions(this.$form.find('.views-filterable-option'));

    // Trap the ENTER key in the search box so that it doesn't submit the form.
    this.$searchBox.on('keypress', (event) => {
      if (event.which === 13) {
        event.preventDefault();
      }
    });
  };

  $.extend(
    Backdrop.viewsUi.OptionsSearch.prototype,
  /** @lends Backdrop.viewsUi.OptionsSearch# */ {
      /**
       * Assemble a list of all the filterable options on the form.
       *
       * @param {jQuery} $allOptions
       *   A jQuery object representing the rows of filterable options to be
       *   shown and hidden depending on the user's search terms.
       *
       * @return {Array}
       *   An array of all the filterable options.
       */
      getOptions($allOptions) {
        let $title;
        let $description;
        let $option;
        let $group;
        const options = [];
        const length = $allOptions.length;
        for (let i = 0; i < length; i++) {
          $option = $($allOptions[i]);
          $title = $option.find('.title');
          $description = $option.find('.description');
          $group = $option.find('.group');
          options[i] = {
            // Search on the lowercase version of the title text + description.
            searchText: `${$title[0].textContent.toLowerCase()} ${$description[0].textContent.toLowerCase()} ${$group[0].textContent.toLowerCase()}
            .toLowerCase()}`,
            // Maintain a reference to the jQuery object for each row, so we don't
            // have to create a new object inside the performance-sensitive keyup
            // handler.
            $div: $option,
          };
        }
        return options;
      },

      /**
       * Filter handler for the search box and type select that hides or shows the
       * relevant options.
       *
       * @param {jQuery.Event} event
       *   The formUpdated event.
       */
      handleFilter(event) {
        // Determine the user's search query. The search text has been converted
        // to lowercase.
        const search = this.$searchBox[0].value.toLowerCase();
        const words = search.split(' ');
        // Get selected Group
        const group = this.$controlGroup[0].value;

        // Search through the search texts in the form for matching text.
        this.options.forEach((option) => {
          function hasWord(word) {
            return option.searchText.indexOf(word) !== -1;
          }

          let found = true;
          // Each word in the search string has to match the item in order for
          // the item to be shown.
          if (search) {
            found = words.every(hasWord);
          }
          if (found && group !== 'all') {
            found = option.$div.hasClass(group);
          }

          option.$div.toggle(found);
        });

        // Adapt dialog to content size.
        $(event.target).trigger('dialogContentResize');
      },
    },
  );

Backdrop.behaviors.viewsUiPreview = {
 attach: function (context) {
   // Only act on the edit view form.
   var $contextualFiltersBucket = $(context).find('.views-display-column .views-ui-display-tab-bucket.contextual-filters');
   if ($contextualFiltersBucket.length === 0) {
     return;
   }

   // If the display has no contextual filters, hide the form where you enter
   // the contextual filters for the live preview. If it has contextual filters,
   // show the form.
   var $contextualFilters = $contextualFiltersBucket.find('.views-display-setting a');
   if ($contextualFilters.length) {
     $('#preview-args').parent().show();
   }
   else {
     $('#preview-args').parent().hide();
   }

   // Executes an initial preview.
   if ($('#edit-displays-live-preview').once('edit-displays-live-preview').is(':checked')) {
     $('#preview-submit').once('edit-displays-live-preview').trigger('click');
    }
  }
};

/**
 * Remove links when rearranging fields.
 */
Backdrop.behaviors.viewsUiRemoveLink = {
  attach: function (context) {
    $('a.views-remove-link').once('views-processed').on('click', function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
    });
  }
};

Backdrop.behaviors.viewsUiRearrangeFilter = {
  attach: function (context) {
    // Only act on the rearrange filter form.
    if (typeof Backdrop.tableDrag === 'undefined' || typeof Backdrop.tableDrag['views-rearrange-filters'] === 'undefined') {
      return;
    }
    var $context = $(context);
    var $table = $context.find('#views-rearrange-filters').once('views-rearrange-filters');
    var $operator = $context.find('.form-item-filter-groups-operator').once('views-rearrange-filters');
    if ($table.length) {
      new Backdrop.viewsUi.RearrangeFilterHandler($table, $operator);
    }
  }
};

/**
 * Improve the UI of the rearrange filters dialog box.
 */
Backdrop.viewsUi.RearrangeFilterHandler = function ($table, $operator) {
  // Keep a reference to the <table> being altered and to the div containing
  // the filter groups operator dropdown (if it exists).
  this.table = $table;
  this.operator = $operator;
  this.hasGroupOperator = this.operator.length > 0;

  // Keep a reference to all draggable rows within the table.
  this.draggableRows = $table.find('.draggable');

  // Keep a reference to the buttons for adding and removing filter groups.
  this.addGroupButton = $('input#views-add-group');
  this.removeGroupButtons = $table.find('input.views-remove-group');

  // Add links that duplicate the functionality of the (hidden) add and remove
  // buttons.
  this.insertAddRemoveFilterGroupLinks();

  // When there is a filter groups operator dropdown on the page, create
  // duplicates of the dropdown between each pair of filter groups.
  if (this.hasGroupOperator) {
    this.dropdowns = this.duplicateGroupsOperator();
    this.syncGroupsOperators();
  }

  // Add methods to the tableDrag instance to account for operator cells (which
  // span multiple rows), the operator labels next to each filter (e.g., "And"
  // or "Or"), the filter groups, and other special aspects of this tableDrag
  // instance.
  this.modifyTableDrag();

  // Initialize the operator labels (e.g., "And" or "Or") that are displayed
  // next to the filters in each group, and bind a handler so that they change
  // based on the values of the operator dropdown within that group.
  var self = this;
  window.setTimeout(function() {
    self.redrawOperatorLabels();
  }, 100);

  $table.find('.views-group-title select')
    .once('views-rearrange-filter-handler')
    .on('change.views-rearrange-filter-handler', $.proxy(this, 'redrawOperatorLabels'));

  // Bind handlers so that when a "Remove" link is clicked, we:
  // - Update the rowspans of cells containing an operator dropdown (since they
  //   need to change to reflect the number of rows in each group).
  // - Redraw the operator labels next to the filters in the group (since the
  //   filter that is currently displayed last in each group is not supposed to
  //   have a label display next to it).
  $table.find('a.views-groups-remove-link')
    .once('views-rearrange-filter-handler')
    .on('click.views-rearrange-filter-handler', $.proxy(this, 'updateRowspans'))
    .on('click.views-rearrange-filter-handler', $.proxy(this, 'redrawOperatorLabels'));
};

$.extend(Backdrop.viewsUi.RearrangeFilterHandler.prototype, {
  /**
   * Insert links that allow filter groups to be added and removed.
   */
  insertAddRemoveFilterGroupLinks: function () {
    // Insert a link for adding a new group at the top of the page, and make it
    // match the action links styling used in a typical page.tpl.php. Note that
    // Backdrop does not provide a theme function for this markup, so this is the
    // best we can do.
    $('<ul class="action-links"><li><a id="views-add-group-link" href="#">' + this.addGroupButton.val() + '</a></li></ul>')
      .prependTo(this.table.parent())
      // When the link is clicked, dynamically click the hidden form button for
      // adding a new filter group.
      .once('views-rearrange-filter-handler')
      .on('click.views-rearrange-filter-handler', $.proxy(this, 'clickAddGroupButton'));

    // Find each (visually hidden) button for removing a filter group and insert
    // a link next to it.
    var length = this.removeGroupButtons.length;
    var i;
    for (i = 0; i < length; i++) {
      var $removeGroupButton = $(this.removeGroupButtons[i]);
      var buttonId = $removeGroupButton.attr('id');
      $('<a href="#" class="views-remove-group-link">' + Backdrop.t('Remove group') + '</a>')
        .insertBefore($removeGroupButton)
        // When the link is clicked, dynamically click the corresponding form
        // button.
        .once('views-rearrange-filter-handler')
        .on('click.views-rearrange-filter-handler', { buttonId: buttonId }, $.proxy(this, 'clickRemoveGroupButton'));
    }
  },

  /**
   * Dynamically click the button that adds a new filter group.
   */
  clickAddGroupButton: function (event) {
    // Due to conflicts between Backdrop core's AJAX system and the Views AJAX
    // system, the only way to get this to work seems to be to trigger both the
    // .mousedown() and .submit() events.
    this.addGroupButton
      .trigger('mousedown')
      .trigger('submit');
    event.preventDefault();
  },

  /**
   * Dynamically click a button for removing a filter group.
   *
   * @param event
   *   Event being triggered, with event.data.buttonId set to the ID of the
   *   form button that should be clicked.
   */
  clickRemoveGroupButton: function (event) {
    this.table.find('#' + event.data.buttonId).trigger('mousedown').trigger('submit');
    event.preventDefault();
  },

  /**
   * Move the groups operator so that it's between the first two groups, and
   * duplicate it between any subsequent groups.
   */
  duplicateGroupsOperator: function () {
    var $dropdowns, $newRow, $titleRow;
    var $titleRows = $('tr.views-group-title');

    // Get rid of the explanatory text around the operator; its placement is
    // explanatory enough.
    this.operator.find('label').add('div.description').addClass('element-invisible');
    this.operator.find('select').addClass('form-select');

    // Keep a list of the operator dropdowns, so we can sync their behavior later.
    $dropdowns = this.operator;

    // Move the operator to a new row just above the second group.
    $titleRow = $('tr#views-group-title-2');
    $newRow = $('<tr class="filter-group-operator-row"><td colspan="5"></td></tr>');
    $newRow.find('td').append(this.operator);
    $newRow.insertBefore($titleRow);
    var $fakeOperator, i, length = $titleRows.length;
    // Starting with the third group, copy the operator to a new row above the
    // group title.
    for (i = 2; i < length; i++) {
      $titleRow = $($titleRows[i]);
      // Make a copy of the operator dropdown and put it in a new table row.
      $fakeOperator = this.operator.clone();
      $fakeOperator.attr('id', '');
      $newRow = $newRow.clone();
      $newRow.find('td').html($fakeOperator);
      $newRow.insertBefore($titleRow);
      $dropdowns = $dropdowns.add($fakeOperator);
    }

    return $dropdowns;
  },

  /**
   * Make the duplicated groups operators change in sync with each other.
   */
  syncGroupsOperators: function () {
    if (this.dropdowns.length < 2) {
      // We only have one dropdown (or none at all), so there's nothing to sync.
      return;
    }

    this.dropdowns.on('change', $.proxy(this, 'operatorChangeHandler'));
  },
  /**
   * Click handler for the operators that appear between filter groups.
   * Forces all operator dropdowns to have the same value.
   */
  operatorChangeHandler: function (event) {
    var $target = $(event.target);
    var operators = this.dropdowns.find('select').not($target);

    // Change the other operators to match this new value.
    operators.val($target.val());
  },

  modifyTableDrag: function () {
    var tableDrag = Backdrop.tableDrag['views-rearrange-filters'];
    var filterHandler = this;

    /**
     * Override the row.onSwap method from tabledrag.js.
     *
     * When a row is dragged to another place in the table, several things need
     * to occur.
     * - The row needs to be moved so that it's within one of the filter groups.
     * - The operator cells that span multiple rows need their rowspan attributes
     *   updated to reflect the number of rows in each group.
     * - The operator labels that are displayed next to each filter need to be
     *   redrawn, to account for the row's new location.
     */
    tableDrag.row.prototype.onSwap = function () {
      if (filterHandler.hasGroupOperator) {
        // Make sure the row that just got moved (this.group) is inside one of
        // the filter groups (i.e. below an empty marker row or a draggable). If
        // it isn't, move it down one.
        var thisRow = $(this.group);
        var previousRow = thisRow.prev('tr');
        if (previousRow.length && !previousRow.hasClass('group-message') && !previousRow.hasClass('draggable')) {
          // Move the dragged row down one.
          var next = thisRow.next();
          if (next.is('tr')) {
            this.swap('after', next);
          }
        }
        filterHandler.updateRowspans();
      }
      // Redraw the operator labels that are displayed next to each filter, to
      // account for the row's new location.
      filterHandler.redrawOperatorLabels();
    };

    /**
     * Override the onDrop method from tabledrag.js.
     */
    tableDrag.onDrop = function () {
      // If the tabledrag change marker (i.e., the "*") has been inserted inside
      // a row after the operator label (i.e., "And" or "Or") rearrange the items
      // so the operator label continues to appear last.
      var changeMarker = $(this.oldRowElement).find('.tabledrag-changed');
      if (changeMarker.length) {
        // Search for occurrences of the operator label before the change marker,
        // and reverse them.
        var operatorLabel = changeMarker.prevAll('.views-operator-label');
        if (operatorLabel.length) {
          operatorLabel.insertAfter(changeMarker);
        }
      }
      // Make sure the "group" dropdown is properly updated when rows are dragged
      // into an empty filter group. This is borrowed heavily from the block.js
      // implementation of tableDrag.onDrop().
      var groupRow = $(this.rowObject.element).prevAll('tr.group-message').get(0);
      var groupName = groupRow.className.replace(/([^ ]+[ ]+)*group-([^ ]+)-message([ ]+[^ ]+)*/, '$2');
      var groupField = $('select.views-group-select', this.rowObject.element);
      if ($(this.rowObject.element).prev('tr').is('.group-message') && !groupField.is('.views-group-select-' + groupName)) {
        var oldGroupName = groupField.attr('class').replace(/([^ ]+[ ]+)*views-group-select-([^ ]+)([ ]+[^ ]+)*/, '$2');
        groupField.removeClass('views-group-select-' + oldGroupName).addClass('views-group-select-' + groupName);
        groupField.val(groupName);
      }
    };
  },

  /**
   * Redraw the operator labels that are displayed next to each filter.
   */
  redrawOperatorLabels: function () {
    for (var i = 0; i < this.draggableRows.length; i++) {
      // Within the row, the operator labels are displayed inside the first table
      // cell (next to the filter name).
      var $draggableRow = $(this.draggableRows[i]);
      var $firstCell = $draggableRow.find('td:first');
      if ($firstCell.length) {
        // The value of the operator label ("And" or "Or") is taken from the
        // first operator dropdown we encounter, going backwards from the current
        // row. This dropdown is the one associated with the current row's filter
        // group.
        var operatorValue = $draggableRow.prevAll('.views-group-title').find('option:selected').last().html();
        var operatorLabel = '<span class="views-operator-label">' + operatorValue + '</span>';
        // If the next visible row after this one is a draggable filter row,
        // display the operator label next to the current row. (Checking for
        // visibility is necessary here since the "Remove" links hide the removed
        // row but don't actually remove it from the document).
        var $nextRow = $draggableRow.nextAll(':visible').eq(0);
        var $existingOperatorLabel = $firstCell.find('.views-operator-label');
        if ($nextRow.hasClass('draggable')) {
          // If an operator label was already there, replace it with the new one.
          if ($existingOperatorLabel.length) {
            $existingOperatorLabel.replaceWith(operatorLabel);
          }
          // Otherwise, append the operator label to the end of the table cell.
          else {
            $firstCell.append(operatorLabel);
          }
        }
        // If the next row doesn't contain a filter, then this is the last row
        // in the group. We don't want to display the operator there (since
        // operators should only display between two related filters, e.g.
        // "filter1 AND filter2 AND filter3"). So we remove any existing label
        // that this row has.
         else {
           $existingOperatorLabel.remove();
         }
       }
     }
   },
   /**
   * Update the rowspan attribute of each cell containing an operator dropdown.
   */
  updateRowspans: function () {
    var i, $row, $currentEmptyRow, draggableCount, $operatorCell;
    var rows = $(this.table).find('tr');
    var length = rows.length;
    for (i = 0; i < length; i++) {
      $row = $(rows[i]);
      if ($row.hasClass('views-group-title')) {
        // This row is a title row.
        // Keep a reference to the cell containing the dropdown operator.
        $operatorCell = $row.find('td.group-operator');
        // Assume this filter group is empty, until we find otherwise.
        draggableCount = 0;
        $currentEmptyRow = $row.next('tr');
        $currentEmptyRow.removeClass('group-populated').addClass('group-empty');
        // The cell with the dropdown operator should span the title row and
        // the "this group is empty" row.
        $operatorCell.attr('rowspan', 2);
      }
      else if ($row.hasClass('draggable') && $row.is(':visible')) {
        // We've found a visible filter row, so we now know the group isn't empty.
        draggableCount++;
        $currentEmptyRow.removeClass('group-empty').addClass('group-populated');
        // The operator cell should span all draggable rows, plus the title.
        $operatorCell.attr('rowspan', draggableCount + 1);
      }
    }
  }
});

/**
 * Add a select all checkbox, which checks each checkbox at once.
 */
Backdrop.behaviors.viewsFilterConfigSelectAll = {
  attach: function (context) {
    // Show the select all checkbox.
    $(context).find('#views-ui-config-item-form div.form-item-options-value-all').once('filterConfigSelectAll')
      .show()
      .find('input[type=checkbox]')
      .on('click', function () {
        var checked = $(this).is(':checked');
        // Update all checkbox beside the select all checkbox.
        $(this).parents('.form-checkboxes').find('input[type=checkbox]').each(function () {
          $(this).attr('checked', checked);
        });
      });
    // Uncheck the select all checkbox if any of the others are unchecked.
    $('#views-ui-config-item-form').find('div.form-type-checkbox').not($('.form-item-options-value-all'))
      .find('input[type=checkbox]')
      .on('click', function () {
        if ($(this).is('checked') === false) {
          $('#edit-options-value-all').prop('checked', false);
        }
      });
  }
};

/**
 * Ensure the desired default button is used when a form is implicitly submitted via an ENTER press on textfields, radios, and checkboxes.
 *
 * @see http://www.w3.org/TR/html5/association-of-controls-and-forms.html#implicit-submission
 */
Backdrop.behaviors.viewsImplicitFormSubmission = {
  attach: function (context, settings) {
    $(':text, :password, :radio, :checkbox', context).once('viewsImplicitFormSubmission', function() {
      $(this).on('keypress', function(event) {
        if (event.which == 13) {
          var formId = this.form.id;
          if (formId && settings.viewsImplicitFormSubmission && settings.viewsImplicitFormSubmission[formId] && settings.viewsImplicitFormSubmission[formId].defaultButton) {
            event.preventDefault();
            var buttonId = settings.viewsImplicitFormSubmission[formId].defaultButton;
            var $button = $('#' + buttonId, this.form);
            if ($button.length == 1 && $button.is(':enabled')) {
              if (Backdrop.ajax && Backdrop.ajax[buttonId]) {
                $button.trigger(Backdrop.ajax[buttonId].element_settings.event);
              }
              else {
                $button.trigger('click');
              }
            }
          }
        }
      });
    });
  }
};

/**
 * Remove icon class from elements that are themed as buttons or dropbuttons.
 */
Backdrop.behaviors.viewsRemoveIconClass = {
  attach: function (context) {
    $(context).find('.dropbutton').once('dropbutton-icon', function () {
      $(this).find('.icon').removeClass('icon');
    });
  }
};

/**
 * Change "Expose filter" buttons into checkboxes.
 */
Backdrop.behaviors.viewsUiCheckboxify = {
  attach: function (context, settings) {
    var $buttons = $('#edit-options-expose-button-button, #edit-options-group-button-button').once('views-ui-checkboxify');
    var length = $buttons.length;
    var i;
    for (i = 0; i < length; i++) {
      new Backdrop.viewsUi.Checkboxifier($buttons[i]);
    }
  }
};

/**
 * Change the default widget to select the default group according to the
 * selected widget for the exposed group.
 */
Backdrop.behaviors.viewsUiChangeDefaultWidget = {
  attach: function () {
    function changeDefaultWidget (event) {
      if ($(event.target).prop('checked')) {
        $('input.default-radios').hide();
        $('td.any-default-radios-row').parent().hide();
        $('input.default-checkboxes').show();
      }
      else {
        $('input.default-checkboxes').hide();
        $('td.any-default-radios-row').parent().show();
        $('input.default-radios').show();
      }
    }
    // Update on widget change.
    $('input[name="options[group_info][multiple]"]')
      .on('change', changeDefaultWidget)
      // Update the first time the form is rendered.
      .trigger('change');
  }
};

/**
 * Attaches an expose filter button to a checkbox that triggers its click event.
 *
 * @param button
 *   The DOM object representing the button to be checkboxified.
 */
Backdrop.viewsUi.Checkboxifier = function (button) {
  this.$button = $(button);
  this.$parent = this.$button.parent('div.views-expose, div.views-grouped');
  this.$input = this.$parent.find('input:checkbox, input:radio');
  // Hide the button and its description.
  this.$button.hide();
  this.$parent.find('.exposed-description, .grouped-description').hide();

  this.$input.on('click', $.proxy(this, 'clickHandler'));
};

/**
 * When the checkbox is checked or unchecked, simulate a button press.
 */
Backdrop.viewsUi.Checkboxifier.prototype.clickHandler = function (e) {
  this.$button.trigger('mousedown');
  this.$button.trigger('submit');
};

/**
 * Change the Apply button text based upon the override select state.
 */
Backdrop.behaviors.viewsUiOverrideSelect = {
  attach: function (context) {
    $(context).find('#edit-override-dropdown').once('views-ui-override-button-text', function () {
      var $select = $(this);
      var $submit = $select.closest('form').find('.form-submit[value="' + Backdrop.t('Apply') + '"]');
      var old_value = $submit.val();

      $submit.once('views-ui-override-button-text')
        .on('mouseup', function () {
            $submit.val(old_value);
          return true;
        });

      $select.on('change', function () {
        if ($select.val() === 'default') {
          $submit.val(Backdrop.t('Apply (all displays)'));
        }
        else if ($select.val() === 'default_revert') {
          $submit.val(Backdrop.t('Revert to default'));
        }
        else {
          $submit.val(Backdrop.t('Apply (this display)'));
        }

        // Update dialog copies of buttons if present.
        $submit.closest('.ui-dialog-content').trigger('dialogButtonsChange');
      }).trigger('change');
    });
  }
};

Backdrop.behaviors.viewsModalContent = {
  attach: function (context) {
    $('body').once('viewsDialog').on('dialogContentResize.viewsDialog', '.ui-dialog-content', Backdrop.behaviors.viewsModalContent.handleDialogResize);
    // When expanding details, make sure the modal is resized.
    $(context).find('.scroll').once('detailsUpdate').on('click', 'summary', function (e) {
      $(e.currentTarget).trigger('dialogContentResize');
    });
  },
  detach: function (context, settings, trigger) {
    if (trigger === 'unload') {
      $('body').removeOnce('viewsDialog').off('.viewsDialog');
    }
  },
  handleDialogResize: function (e) {
    var $modal = $(e.currentTarget);
    var $viewsOverride = $modal.find('[data-views-offset]');
    var $scroll = $modal.find('[data-backdrop-views-scroll]');
    var offset = 0;
    var modalHeight;
    if ($viewsOverride.length && $scroll.length) {
      // Add a class to do some styles adjustments.
      $modal.closest('.views-ui-dialog').addClass('views-ui-dialog-scroll');
      // Let scroll element take all the height available.
      $scroll.css({ overflow: 'visible', height: 'auto' });
      modalHeight = $modal.height();
      $viewsOverride.each(function () { offset += $(this).outerHeight(); });

      // Take internal padding into account.
      var scrollOffset = $scroll.outerHeight() - $scroll.height();
      $scroll.height(modalHeight - offset - scrollOffset);
      // Reset scrolling properties.
      $modal.css('overflow', 'hidden');
      $scroll.css('overflow', 'auto');
    }
  }
};

})(jQuery);
;
