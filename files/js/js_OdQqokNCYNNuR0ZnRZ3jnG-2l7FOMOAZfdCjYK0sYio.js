Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Edit":"\u062a\u062d\u0631\u064a\u0631","Configure":"\u0636\u0628\u0637","This field is required.":"\u0647\u0630\u0627 \u0627\u0644\u062d\u0642\u0644 \u0636\u0631\u0648\u0631\u064a.","Show":"\u0639\u0631\u0636","Please wait...":"\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...","Hide":"\u0625\u062e\u0641\u0627\u0621","Uploading... (@current of @total)":"\u062c\u0627\u0631\u064a \u0627\u0644\u0631\u0641\u0639... (@current \u0645\u0646 @total)"}} };;
(function ($) {

/**
 * Attach the machine-readable name form element behavior.
 */
Backdrop.behaviors.machineName = {
  /**
   * Attaches the behavior on elements with a data-machine-name attribute.
   */
  attach: function (context, settings) {
    var self = this;
    var machine, eventData;
    var $context = $(context);

     function clickEditHandler(e) {
       var data = e.data;
       e.preventDefault();
       data.$wrapper.show();
       data.$target.trigger('focus');
       data.$suffix.hide();
       data.$source.off('.machineName');
     }

     function machineNameHandler(e) {
       var data = e.data;
       var value = $(e.target).val();
       if (value.length === 0) {
         showMachineName('', data);
       }
       else {
         self.transliterate(value, data.options).done(function (transliteratedText) {
           showMachineName(transliteratedText, data);
         });
       }
     }

     function showMachineName(machine, data) {
       // Set the machine name to the transliterated value.
       if (machine !== '') {
         if (machine !== data.options.replace) {
           data.$target.val(machine);
           data.$preview.html(data.options.field_prefix + Backdrop.checkPlain(machine) + data.options.field_suffix);
         }
         data.$suffix.show();
       }
       else {
         data.$suffix.hide();
         data.$target.val(machine);
         data.$preview.empty();
       }
     }

     // Each machine name element should have the following properties:
     // - source: The selector of the source form element.
     // - suffix: The selector of a container to show the machine name preview in
     //   (usually a field suffix after the human-readable name form element).
     // - label: The label to show for the machine name preview.
     // - replace_pattern: A regular expression (without modifiers) matching
     //   disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
     // - replace: A character to replace disallowed characters with; e.g., '_'
     //   or '-'.
     // - standalone: Whether the preview should stay in its own element rather
     //   than the suffix of the source element.
     // - field_prefix: The #field_prefix of the form element.
     // - field_suffix: The #field_suffix of the form element.
     $(context).find('[data-machine-name]').each(function() {
       var $target = $(this);
       var options = $target.data('machine-name');
       var $source = $context.find(options.source);
       var $suffix = $context.find(options.suffix);
       var $wrapper = $target.closest('.form-item');
       // All elements have to exist.
       if (!$source.length || !$target.length || !$suffix.length || !$wrapper.length) {
         return;
       }
       // Skip processing upon a form validation error on the machine name.
       if ($target.hasClass('error')) {
         return;
       }
       // Figure out the maximum length for the machine name.
       options.maxlength = $target.attr('maxlength');
       // Hide the form item container of the machine name form element.
       $wrapper.hide();
       // Determine the initial machine name value. Unless the machine name form
       // element is disabled or not empty, the initial default value is based on
       // the human-readable form element value.
       var field_needs_transliteration = false;
       if ($target.is(':disabled') || $target.val() !== '') {
         machine = $target.val();
       }
       else {
         machine = $source.val();
         field_needs_transliteration = true;
       }
       // Append the machine name preview to the source field.
       var $preview = $('<span class="machine-name-value">' + options.field_prefix + Backdrop.checkPlain(machine) + options.field_suffix + '</span>');
       $suffix.empty();
       if (options.label) {
         $suffix.append(' ').append('<span class="machine-name-label">' + options.label + ':</span>');
       }
       $suffix.append(' ').append($preview);

       // If the machine name cannot be edited, stop further processing.
       if ($target.is(':disabled')) {
         return;
       }

      eventData = {
        $source: $source,
        $target: $target,
        $suffix: $suffix,
        $wrapper: $wrapper,
        $preview: $preview,
        options: options
      };

      if (field_needs_transliteration) {
        if (machine.length === 0) {
          showMachineName('', eventData);
        }
        else {
          self.transliterate(machine, options).done(function (machine) {
            showMachineName(machine, eventData);
          });
        }
      }

      // If it is editable, append an edit link.
      var $link = $('<span class="admin-link"><a href="#">' + Backdrop.t('Edit') + '</a></span>').on('click', eventData, clickEditHandler);
      $suffix.append(' ').append($link);

      // Preview the machine name in realtime when the human-readable name
      // changes, but only if there is no machine name yet; i.e., only upon
      // initial creation, not when editing.
      if ($target.val() === '') {
        $source.on('keyup.machineName change.machineName', eventData, machineNameHandler)
        // Initialize machine name preview.
        .trigger('keyup');
      }
    });
  },

  /**
   * Transliterate a human-readable name to a machine name.
   *
   * @param source
   *   A string to transliterate.
   * @param settings
   *   The machine name settings for the corresponding field, containing:
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - replace_token: A token to validate the regular expression.
   *   - maxlength: The maximum length of the machine name.
   *   - langcode: The language of the source string with which transliteration
   *     should be performed.
   *
   * @return
   *   The transliterated source string.
   */
  transliterate: function (source, settings) {
    // Expand the settings to match the callback's input.
    // See system_transliterate_ajax().
    var transliterationOptions = {};
    var copyOptions = ['replace', 'langcode', 'maxlength', 'replace_pattern', 'replace_token'];
    for (var n = 0; n < copyOptions.length; n++) {
      if (settings.hasOwnProperty(copyOptions[n])) {
        transliterationOptions[copyOptions[n]] = settings[copyOptions[n]];
      }
    }
    var urlAppend = encodeURIComponent(source.toLowerCase());
    return $.ajax({
      url: Backdrop.settings.basePath + "?q=" + Backdrop.encodePath("system/transliterate/" + urlAppend),
      data: transliterationOptions,
      dataType: "text"
    }); 
  }
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
