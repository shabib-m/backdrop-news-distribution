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
