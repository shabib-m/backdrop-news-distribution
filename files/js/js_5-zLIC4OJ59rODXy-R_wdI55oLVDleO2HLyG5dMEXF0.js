Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Add":"\u0625\u0636\u0627\u0641\u0629","Configure":"\u0636\u0628\u0637","Please wait...":"\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...","Drag to re-order":"\u0627\u0633\u062d\u0628 \u0644\u062a\u063a\u064a\u0631 \u0627\u0644\u062a\u0631\u062a\u064a\u0628","Changes made in this table will not be saved until the form is submitted.":"\u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u062f\u062b\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u0646 \u062a\u064f\u062d\u0641\u0638 \u0625\u0644\u0627 \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0631\u0629.","Uploading... (@current of @total)":"\u062c\u0627\u0631\u064a \u0627\u0644\u0631\u0641\u0639... (@current \u0645\u0646 @total)","Re-order rows by numerical weight instead of dragging.":"\u0625\u0639\u0627\u062f\u0629 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0633\u0637\u0648\u0631 \u062d\u0633\u0628 \u0648\u0632\u0646 \u0631\u0642\u0645\u064a \u0628\u062f\u0644\u0627 \u0645\u0646 \u0633\u062d\u0628\u0647\u0627.","Show row weights":"\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0623\u0633\u0637\u0631","Hide row weights":"\u0625\u062e\u0641\u0627\u0621 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0633\u0637\u0648\u0631","Apply":"\u062a\u0637\u0628\u064a\u0642","Apply (all displays)":"\u062a\u0637\u0628\u064a\u0642 (\u0643\u0644 \u0627\u0644\u0639\u0631\u0648\u0636)","Apply (this display)":"\u062a\u0637\u0628\u064a\u0642 (\u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636)"}} };;
(function ($) {

"use strict";

/**
 * Attaches sticky table headers.
 */
Backdrop.behaviors.tableHeader = {
  attach: function (context) {
    if (!$.support.positionFixed) {
      return;
    }
    var $tables = $(context).find('table.sticky-enabled:not(.sticky-processed)').addClass('sticky-processed');
    for (var i = 0, il = $tables.length; i < il; i++) {
      TableHeader.tables.push(new TableHeader($tables[i]));
    }
  }
};

function scrollValue(position) {
  return document.documentElement[position] || document.body[position];
}

// Helper method to loop through tables and execute a method.
function forTables(method, arg) {
  var tables = TableHeader.tables;
  for (var i = 0, il = tables.length; i < il; i++) {
    tables[i][method](arg);
  }
}

function tableHeaderResizeHandler() {
  forTables('recalculateSticky');
}

var scrollTimer;
function tableHeaderOnScrollHandler() {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(function() {
    forTables('onScroll');
  }, 50);
}

function tableHeaderOffsetChangeHandler() {
  // Compute the new offset value.
  TableHeader.computeOffsetTop();
  forTables('stickyPosition', TableHeader.offsetTop);
}

// Bind event that need to change all tables.
$(window).on({
  /**
   * Bind only one event to take care of calling all scroll callbacks.
   */
  'scroll.TableHeader': tableHeaderOnScrollHandler
});

/**
 * When resizing table width and offset top can change, recalculate everything.
 */
Backdrop.optimizedResize.add(tableHeaderResizeHandler);

// Bind to custom Backdrop events.
$(document).on({
  /**
   * Recalculate columns width when window is resized and when show/hide
   * weight is triggered.
   */
  'columnschange.TableHeader': tableHeaderResizeHandler,

  /**
   * Offset value vas changed by a third party script.
   */
  'offsettopchange.TableHeader': tableHeaderOffsetChangeHandler
});

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 * TableHeader will make the current table header stick to the top of the page
 * if the table is very long.
 *
 * Fire a custom "offsettopchange" event to make TableHeader compute the
 * new offset value from the "data-offset-top" attributes of relevant elements.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.*
 * @constructor
 */
function TableHeader(table) {
  var $table = $(table);
  this.$originalTable = $table;
  this.$originalHeader = $table.children('thead');
  this.$originalHeaderCells = this.$originalHeader.find('> tr > th');
  this.displayWeight = null;

  this.$originalTable.addClass('sticky-table');
  this.tableHeight = $table[0].clientHeight;
  this.tableOffset = this.$originalTable.offset();

  // React to columns change to avoid making checks in the scroll callback.
  this.$originalTable.on('columnschange', {tableHeader: this}, function (e, display) {
    var tableHeader = e.data.tableHeader;
    if (tableHeader.displayWeight === null || tableHeader.displayWeight !== display) {
      tableHeader.recalculateSticky();
    }
    tableHeader.displayWeight = display;
  });

  // Create and display sticky header.
  this.createSticky();
}

/**
 * Store the state of TableHeader.
 */
$.extend(TableHeader, {
   /**
    * This will store the state of all processed tables.
    *
    * @type {Array}
    */
   tables: [],

   /**
    * Cache of computed offset value.
    *
    * @type {Number}
    */
   offsetTop: 0,

  /**
   * Sum all [data-offset-top] values and cache it.
   */
  computeOffsetTop: function () {
    var $offsets = $('[data-offset-top]').not('.sticky-header');
    var value, sum = 0;
    for (var i = 0, il = $offsets.length; i < il; i++) {
      value = parseInt($offsets[i].getAttribute('data-offset-top'), 10);
      sum += !isNaN(value) ? value : 0;
    }
    this.offsetTop = sum;
    return sum;
  }
});

/**
 * Extend TableHeader prototype.
 */
$.extend(TableHeader.prototype, {
  /**
   * Minimum height in pixels for the table to have a sticky header.
   */
  minHeight: 100,

  /**
   * Absolute position of the table on the page.
   */
  tableOffset: null,

  /**
   * Absolute position of the table on the page.
   */
  tableHeight: null,

  /**
   * Boolean storing the sticky header visibility state.
   */
  stickyVisible: false,

  /**
   * Create the duplicate header.
   */
  createSticky: function () {
    // Clone the table header so it inherits original jQuery properties.
    var $stickyHeader = this.$originalHeader.clone(true);
    // Hide the table to avoid a flash of the header clone upon page load.
    this.$stickyTable = $('<table class="sticky-header"/>')
      .css({
        visibility: 'hidden',
        position: 'fixed',
        top: '0px'
      })
      .append($stickyHeader)
      .insertBefore(this.$originalTable);

    this.$stickyHeaderCells = $stickyHeader.find('> tr > th');

    // Initialize all computations.
    this.recalculateSticky();
  },

  /**
   * Set absolute position of sticky.
   *
   * @param offsetTop
   * @param offsetLeft
   */
  stickyPosition: function (offsetTop, offsetLeft) {
    var css = {};
    if (!isNaN(offsetTop) && offsetTop !== null) {
      css.top = offsetTop + 'px';
    }
    if (!isNaN(offsetLeft) && offsetTop !== null) {
      css.left = offsetLeft + 'px';
    }
    return this.$stickyTable.css(css);
  },

  /**
   * Returns true if sticky is currently visible.
   */
  checkStickyVisible: function () {
    var scrollTop = scrollValue('scrollTop');
    var tableTop = this.tableOffset.top - TableHeader.offsetTop;
    var tableBottom = tableTop + this.tableHeight;
    var visible = false;

    if (tableTop < scrollTop && scrollTop < (tableBottom - this.minHeight)) {
      visible = true;
    }

    this.stickyVisible = visible;
    return visible;
  },

  /**
   * Check if sticky header should be displayed.
   *
   * This function is throttled to once every 250ms to avoid unnecessary calls.
   */
  onScroll: function () {
    // Track horizontal positioning relative to the viewport.
    this.stickyPosition(null, scrollValue('scrollLeft'));
    this.$stickyTable.css('visibility', this.checkStickyVisible() ? 'visible' : 'hidden');
  },

  /**
   * Event handler: recalculates position of the sticky table header.
   */
  recalculateSticky: function () {
    // Update table size.
    this.tableHeight = this.$originalTable[0].clientHeight;

    // Update offset.
    TableHeader.computeOffsetTop();
    this.tableOffset = this.$originalTable.offset();
    var leftOffset = parseFloat(this.$originalTable.offset().left);
    this.stickyPosition(TableHeader.offsetTop, leftOffset);

    // Update columns width.
    var $that = null;
    var $stickyCell = null;
    var display = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.$originalHeaderCells.length; i < il; i++) {
      $that = $(this.$originalHeaderCells[i]);
      $stickyCell = this.$stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        $stickyCell.css({'width': $that.outerWidth(), 'display': display, 'box-sizing': 'border-box'});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.$stickyTable.css('width', this.$originalTable.width());
  }
});

// Calculate the table header positions on page load.
window.setTimeout(function() {
  $(window).triggerHandler('scroll.TableHeader');
}, 100);

// Expose constructor in the public space.
Backdrop.TableHeader = TableHeader;

}(jQuery));
;
