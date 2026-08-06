Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Configure":"\u0636\u0628\u0637","Select all rows in this table":"\u0627\u062e\u062a\u0631 \u0643\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644","Deselect all rows in this table":"\u0623\u0644\u063a \u0627\u062e\u062a\u064a\u0627\u0631 \u0643\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644"}} };;
(function ($) {

Backdrop.behaviors.tableSelect = {
  attach: function (context, settings) {
    // Select the inner-most table in case of nested tables.
    $('th.select-all', context).closest('table').once('table-select', Backdrop.tableSelect);
  }
};

Backdrop.tableSelect = function () {
  // Do not add a "Select all" checkbox if there are no rows with checkboxes in the table
  if ($(this).find('td input[type="checkbox"]').length == 0) {
    return;
  }

  // Keep track of the table, which checkbox is checked and alias the settings.
  var table = this, checkboxes, lastChecked;
  var strings = { 'selectAll': Backdrop.t('Select all rows in this table'), 'selectNone': Backdrop.t('Deselect all rows in this table') };
  var updateSelectAll = function (state) {
    // Update table's select-all checkbox (and sticky header's if available).
    $(table).prev('table.sticky-header').addBack().find('th.select-all input[type="checkbox"]').each(function() {
      this.checked = state;
      $(this).attr('title', state ? strings.selectNone : strings.selectAll).trigger('change');
    });
  };

  // Find all <th> with class select-all, and insert the check all checkbox.
  $('th.select-all', table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title', strings.selectAll)).on('click', function (event) {
    if ($(event.target).is('input[type="checkbox"]')) {
      // Loop through all checkboxes and set their state to the select all checkbox' state.
      checkboxes.each(function () {
        this.checked = event.target.checked;
        // Either add or remove the selected class based on the state of the check all checkbox.
        $(this).closest('tr').toggleClass('selected', this.checked);
      });
      // Update the title and the state of the check all box.
      updateSelectAll(event.target.checked);
    }
  });

  // For each of the checkboxes within the table that are not disabled.
  checkboxes = $('td input[data-tableselect-id]:enabled', table);
  $(table).on('click', checkboxes, function (e) {
    // Either add or remove the selected class based on the state of the check all checkbox.
    $(this).closest('tr').toggleClass('selected', this.checked);

    // If this is a shift click, we need to highlight everything in the range.
    // Also make sure that we are actually checking checkboxes over a range and
    // that a checkbox has been checked or unchecked before.
    if (e.shiftKey && lastChecked && lastChecked != e.target) {
      // We use the checkbox's parent TR to do our range searching.
      Backdrop.tableSelectRange($(e.target).closest('tr')[0], $(lastChecked).closest('tr')[0], e.target.checked);
    }

    // If all checkboxes are checked, make sure the select-all one is checked too, otherwise keep unchecked.
    updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));

    // Keep track of the last checked checkbox.
    lastChecked = e.target;
  });

  // Explicitly update the select-all checkbox at page load time.
  updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));
};

Backdrop.tableSelectRange = function (from, to, state) {
  // We determine the looping mode based on the the order of from and to.
  var mode = from.rowIndex > to.rowIndex ? 'previousSibling' : 'nextSibling';

  // Traverse through the sibling nodes.
  for (var i = from[mode], $i; i; i = i[mode]) {
    // Make sure that we're only dealing with elements.
    if (i.nodeType != 1) {
      continue;
    }

    // Either add or remove the selected class based on the state of the target checkbox.
    $i = $(i);
    $i.toggleClass('selected', state);
    $i.find('input[type="checkbox"]').prop('checked', state);

    if (to.nodeType) {
      // If we are at the end of the range, stop.
      if (i == to) {
        break;
      }
    }
    // A faster alternative to doing $(i).filter(to).length.
    else if ($.filter(to, [i]).r.length) {
      break;
    }
  }
};

})(jQuery);
;
(function ($) {

"use strict";

Backdrop.behaviors.viewsBulkForm = {
  attach: function(context) {
    $('.views-form', context).each(function() {
      Backdrop.viewsBulkForm.initTableBehaviors(this);
      Backdrop.viewsBulkForm.initGenericBehaviors(this);
    });
  }
};

Backdrop.viewsBulkForm = Backdrop.viewsBulkForm || {};
Backdrop.viewsBulkForm.initTableBehaviors = function(form) {
  // If the table is not grouped, "Select all on this page / all pages"
  // markup gets inserted below the table header.
  var $selectAllElement = $('.views-select-all-pages--wrapper', form);
  if ($selectAllElement.length) {
    $('.views-table > tbody', form).prepend('<tr class="views-select-all-pages--row even"></tr>');
    var colspan = $('table th', form).length;

    // Add the select all pages markup as the first row spanning all columns.
    $('.views-select-all-pages--row', form).html('<td colspan="' + colspan + '"></td>');
    $('.views-select-all-pages--row td', form).prepend($selectAllElement);

    $('.views-select-all-pages--all-pages-button', form).on('click', function() {
      Backdrop.viewsBulkForm.tableSelectAllPages(form);
      return false;
    });
    $('.views-select-all-pages--this-page-button', form).on('click', function() {
      Backdrop.viewsBulkForm.tableSelectThisPage(form);
      return false;
    });
  }

  // This is the "select all" checkbox in (each) table header.
  $('th.select-all input:checkbox', form).on('change', function() {
    var table = $(this).closest('table:not(.sticky-header)')[0];

    // Toggle the visibility of the "select all" row (if any).
    if (this.checked) {
      $('.views-select-all-pages--row', table).show();
    }
    else {
      $('.views-select-all-pages--row', table).hide();
      // Disable "select all across pages".
      Backdrop.viewsBulkForm.tableSelectThisPage(form);
    }
  });
};

/**
 * Prepares the select all across pages functionality.
 */
Backdrop.viewsBulkForm.tableSelectAllPages = function(form) {
  $('.views-select-all-pages--this-page', form).hide();
  $('.views-select-all-pages--all-pages', form).show();
  // Modify the value of the hidden form flag field.
  $('input[name="select_all_pages"]', form).val('1');
};

/**
 * Prepares the select all on this page functionality.
 */
Backdrop.viewsBulkForm.tableSelectThisPage = function(form) {
  $('.views-select-all-pages--all-pages', form).hide();
  $('.views-select-all-pages--this-page', form).show();
  // Modify the value of the hidden form field.
  $('input[name="select_all_pages"]', form).val('0');
};

Backdrop.viewsBulkForm.initGenericBehaviors = function(form) {
  // Show the "select all" fieldset for non-tables.
  $('.views-select-all-pages--wrapper', form).show();

  // Listener for the non-table page-wise "select all" checkbox.
  $('.views-select-all-pages--this-page-checkbox', form).on('change', function() {
    // Check or uncheck all checkbox within this page.
    $('input:checkbox[name^="bulk_form"]', form).prop('checked', this.checked);

    // Uncheck the "select all items in all pages" checkbox.
    $('.views-select-all-pages--all-pages-checkbox', form).prop('checked', false);

    // Toggle the "select all" checkbox in grouped tables (if any).
    $('.bulk-form-table-select-all', form).prop('checked', this.checked);
  });

  // Listener for the non-table "select all in all pages" checkbox.
  $('.views-select-all-pages--all-pages-checkbox', form).on('change', function() {
    $('input:checkbox[name^="bulk_form"]', form).prop('checked', this.checked);

    // Uncheck the "select all" checkbox.
    $('.views-select-all-pages--this-page-checkbox', form).prop('checked', false);

    // Toggle the "select all" checkbox in grouped tables (if any).
    $('.views-select-all-pages--all-pages-checkbox', form).prop('checked', this.checked);

    // Modify the value of the hidden form field.
    $('input[name="select_all_pages"]', form).val(this.checked ? '1' : '0');
  });

  $('input:checkbox[name^="bulk_form"]', form).on('change', function() {
    // If a checkbox was deselected, uncheck any "select all" checkboxes.
    if (!this.checked) {
      // Uncheck the select all checkboxes for non-tables.
      $('.views-select-all-pages--this-page-checkbox', form).prop('checked', false);
      $('.views-select-all-pages--all-pages-checkbox', form).prop('checked', false);

      // Modify the value of the hidden form field.
      $('input[name="select_all_pages"]', form).val('0');

      var table = $(this).closest('table')[0];
      if (table) {
        // If there's a "select all" row, hide it.
        if ($('.views-select-all-pages--row', table).length) {
          $('.views-select-all-pages--row', table).hide();
          // Disable "select all across pages".
          Backdrop.viewsBulkForm.tableSelectThisPage(form);
        }
      }
    }

  });
};

})(jQuery);
;
