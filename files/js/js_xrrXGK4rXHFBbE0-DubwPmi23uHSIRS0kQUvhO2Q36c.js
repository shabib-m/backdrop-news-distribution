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
Backdrop.behaviors.layoutList = {
  attach: function(context) {
    var $element = $(context).find('.layout-options');
    if ($element.length) {
      if (Backdrop.featureDetect.flexbox()) {
        $element.addClass('flexbox');
      }
      else {
        $element.addClass('no-flexbox');
      }
    }
  }
};

/**
 * Behavior for creating/configuring layout settings.
 */
Backdrop.behaviors.layoutConfigure = {
  attach: function(context) {

    /**
     * Toggle handler for the examples.
     */
    function examples_toggle_handler(e) {
      var $examples = $(this).next().toggle();
      if ($examples.is(':visible')) {
        $(this).text(Backdrop.t('Hide examples')).append('<span class="arrow close"></span>');
      }
      else {
        $(this).text(Backdrop.t('Show examples')).append('<span class="arrow"></span>');
      }
      e.preventDefault();
      e.stopPropagation();
    }

    var $form = $('.layout-settings-form');
    if ($form.length && Backdrop.ajax) {
      var ajax = Backdrop.ajax['edit-path-update'];
      var updateContexts = function() {
        // Cancel existing AJAX requests and start a new one.
        for (var n = 0; n < ajax.currentRequests.length; n++) {
          ajax.currentRequests[n].abort();
          ajax.cleanUp(ajax.currentRequests[n]);
        }
        $('input[data-layout-path-update]').triggerHandler('mousedown');
      };

      // Update contexts after a slight typing delay.
      var timer = 0;
      $('input.data-layout-additional-path, input[name="path"]').once('update-contexts').on('keyup', function(e) {
        clearTimeout(timer);
        timer = setTimeout(updateContexts, 200);
      });
    }

    // Handle toggling the examples.
    var $examplesToggle = $('a.layout-placeholder-examples-toggle').once('examples-toggle');
    if ($examplesToggle.length) {
      $examplesToggle.on('click', examples_toggle_handler);
      $form.find('.layout-placeholder-examples').hide();
    }

    // Convert AJAX buttons to links.
    var $linkButtons = $(context).find('.layout-link-button').once('link-button');
    if ($linkButtons.length) {
      $linkButtons.each(function() {
        var $self = $(this).addClass('js-hide');
        $('<a class="layout-button-link" href="#"></a>')
          .insertBefore(this)
          // Copy over the title of the button as the link text.
          .text(this.value)
          // Copy over classes.
          .addClass(this.className)
          .removeClass('layout-link-button form-submit ajax-processed link-button-processed js-hide')
          .on('click', function(event) {
            $self.triggerHandler('mousedown');
            event.preventDefault();
          });
      });
    }
  }
};

/**
 * Behavior for editing layouts.
 */
Backdrop.behaviors.layoutDisplayEditor = {
  attach: function(context) {
    // Apply drag and drop to regions.
    var $regions = $('.layout-editor-region-content').once('layout-sortable');
    if ($regions.length) {
      $regions.sortable({
        connectWith: '.layout-editor-region-content',
        tolerance: 'pointer',
        update: Backdrop.behaviors.layoutDisplayEditor.updateLayout,
        items: '.layout-editor-block',
        placeholder: 'layout-editor-placeholder layout-editor-block',
        forcePlaceholderSize: true
      });

      // Allow keyboard navigation
      // Get the list of droppables, that is regions where we can drop blocks.
      var droppables = $.map($('.layout-editor-region'), function (item) {return $(item).attr('id')});

      // Find the next region.
      var findNextDroppable = function (current, arr) {
        var index = arr.indexOf(current);
        if (index >= 0 && index < arr.length - 1) {
          return arr[index + 1]
        }
        return false;
      }

      // Find the previous region.
      var findPreviousDroppable = function (current, arr) {
        var index = arr.indexOf(current);
        if (index > 0 && index <= arr.length - 1) {
          return arr[index - 1]
        }
        return false;
      }

      // Check if an element is in the viewport.
      $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      }

      // Scroll to a droppable if it's not visible.
      var scrollIfNotVisible = function (nextDroppableId) {
        if ($('#' + nextDroppableId).isInViewport() === false) {
          var $nextDroppable = $('#' + nextDroppableId);
          var _offset = $nextDroppable.offset();
          $('html, body').animate({
            scrollTop: _offset.top,
            scrollLeft: _offset.left
          });
        }
      }

      $('#layout-edit-main').on('keydown', '.layout-editor-block', function(event) {
        var currentDroppable = $(this).closest('.layout-editor-region');
        var currentDroppableId = currentDroppable.attr('id');
        var that = $(this);

        // Announce on block movement.
        var announceBlock = function (changedRegion, newDroppable) {
          var blockTitle = that.find('span.text').html();
          var regionTitle = newDroppable.find('h2.label').html();
          var newDroppableId = newDroppable.attr('id');
          var countBlocks = $('#' + newDroppableId + ' .layout-editor-block').length;
          var blockPosition = that.index() + 1;
          var announceMessage = '';
          if (changedRegion) {
            announceMessage = Backdrop.t('Block moved to region !region_title', {
              '!region_title': regionTitle
            });
          }
          else {
            announceMessage = Backdrop.t('Block moved.');
          }
          announceMessage += Backdrop.t('Now in position !block_position of !count_blocks', {
            '!block_position': blockPosition,
            '!count_blocks': countBlocks,
          });
          Backdrop.announce(announceMessage);
        }

        // Press right arrow to move block to next region.
        if (event.which == 39) {
          var nextDroppableId = findNextDroppable(currentDroppableId, droppables);

          if (!nextDroppableId) {
            return;
          }

          scrollIfNotVisible(nextDroppableId);

          var droppableParentId = '#' + nextDroppableId;
          var droppable = $(droppableParentId + ' .layout-editor-region-content');
          droppable.append($(this));
          $(this).focus();
          announceBlock(true, $(droppableParentId));
        }

        // Press left arrow to move block to previous region.
        if (event.which == 37) {
          var nextDroppableId = findPreviousDroppable(currentDroppableId, droppables);

          if (!nextDroppableId) {
            return;
          }

          scrollIfNotVisible(nextDroppableId);

          var droppableParentId = '#' + nextDroppableId;
          var droppable = $(droppableParentId + ' .layout-editor-region-content');
          droppable.append($(this));
          $(this).focus();
          announceBlock(true, $(droppableParentId));
        }

        // Press up to move block up by one position.
        if (event.which == 38) {
          $(this).insertBefore($(this).prev());
          $(this).focus();
          announceBlock(false, currentDroppable);
        }
        // Press down to move block down by one position.
        if (event.which == 40) {
          $(this).insertAfter($(this).next());
          $(this).focus();
          announceBlock(false, currentDroppable);
        }
        // Press t or "page up" to move block to top of region.
        if (event.which == 84 || event.which == 33) {
          $(this).parent().prepend($(this));
          $(this).focus();
          announceBlock(false, currentDroppable);
        }
        // Press b or "page down" to move block to bottom of region.
        if (event.which == 66 || event.which == 34) {
          $(this).parent().append($(this));
          $(this).focus();
          announceBlock(false, currentDroppable);
        }

        var region = $(this).closest('.layout-editor-region');
        updateLayoutOnKeyInput(region);

        if (currentDroppable) {
          updateLayoutOnKeyInput(currentDroppable);
        }
      });

      // Update block list on hidden input element.
      var updateLayoutOnKeyInput = function (region) {
        var regionName = region.data('regionName');
        var blockList = [];
        region.find('.layout-editor-block').each(function(index) {
          blockList.push($(this).data('blockId'));
        });
        $('input[name="content[positions][' + regionName + ']"]').val(blockList.join(','));
      }

      // Open a dialog if editing a particular block.
      var blockUuid = window.location.hash.replace(/#configure-block:/, '');
      if (blockUuid) {
        window.setTimeout(function() {
          $('[data-block-id="' + blockUuid + '"]').find('li.configure > a').triggerHandler('click');
          // Clear out the hash. Use history if available, preventing another
          // entry (which would require two back button clicks). Fallback to
          // directly updating the URL in the location bar.
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, '', '#');
          }
          else {
            window.location.hash = '';
          }
        }, 100);
      }
    }

    var $flexible_regions = $('.layout-flexible-editor').once('layout-sortable');
    if ($flexible_regions.length) {
      $flexible_regions.sortable({
        connectWith: '.layout-flexible-content',
        tolerance: 'pointer',
        update: Backdrop.behaviors.layoutDisplayEditor.updateFlexibleLayout,
        items: '.flexible-row',
        placeholder: 'layout-editor-placeholder layout-editor-block',
        forcePlaceholderSize: true
      });
    }

    // Detect the addition of new blocks.
    if ($(context).hasClass('layout-editor-block')) {
      var regionName = $(context).closest('.layout-editor-region').data('regionName');
      var positions = $('input[name="content[positions][' + regionName + ']"]').get(0);
      var blockId = $(context).data('blockId');
      if (positions.value.indexOf(blockId) === -1) {
        positions.value += ',' + $(context).data('blockId');
      }
    }

    // Disable the machine name field on text blocks if reusable is checked.
    if ($('input[name="reusable"]').prop('checked')) {
      $('span.field-suffix').show();
    } else {
      $('span.field-suffix').hide();
    }
    $('input[name="reusable"]').on('change', function() {
      $('span.field-suffix').toggle();
    });
  },

  /**
   * jQuery UI sortable update callback.
   */
  updateLayout: function(event, ui) {
    var regionName = $(this).closest('.layout-editor-region').data('regionName');
    var blockList = [];
    $(this).find('.layout-editor-block').each(function() {
      blockList.push($(this).data('blockId'));
    });
    $('input[name="content[positions][' + regionName + ']"]').val(blockList.join(','));
  },
  /**
   * jQuery UI sortable update callback.
   */
  updateFlexibleLayout: function(event, ui) {
    var blockList = [];
    $(this).find('.flexible-row').each(function() {
      blockList.push($(this).data('rowId'));
    });
    $('input[name="row_positions"]').val(blockList.join(','));
  }
};

/**
 * Filters the 'Add block' list by a text input search string.
 */
Backdrop.behaviors.blockListFilterByText = {
  attach: function (context, settings) {
    var $input = $('input#layout-block-list-search').once('layout-block-list-search');
    var $form = $('.layout-block-list');
    var $rows, zebraClass;
    var zebraCounter = 0;

    // Filter the list of layouts by provided search string.
    function filterBlockList() {
      var query = $input.val().toLowerCase();

      function showBlockItem(index, row) {
        var $row = $(row);
        var $sources = $row.find('.block-item, .description');
        var textMatch = $sources.text().toLowerCase().indexOf(query) !== -1;
        var $match = $row.closest('div.layout-block-add-row');
        $match.toggle(textMatch);
        if (textMatch) {
          stripeRow($match);
        }
      }

      // Reset the zebra striping for consistent even/odd classes.
      zebraCounter = 0;
      $rows.each(showBlockItem);

      if ($('div.layout-block-add-row:visible').length === 0) {
        if ($('.filter-empty').length === 0) {
          $('.layout-block-list').append('<p class="filter-empty">' + Backdrop.t('No blocks match your search.') + '</p>');
        }
      }
      else {
        $('.filter-empty').remove();
      }
    }

    function stripeRow($match) {
      zebraClass = (zebraCounter % 2) ? 'odd' : 'even';
      $match.removeClass('even odd');
      $match.addClass(zebraClass);
      zebraCounter++;
    }

    if ($form.length && $input.length) {
      $rows = $form.find('div.layout-block-add-row');
      $rows.each(function () {
        stripeRow($(this));
      });

      // @todo Use autofocus attribute when possible.
      $input.trigger('focus').on('keyup', filterBlockList);
    }
  }
}

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
