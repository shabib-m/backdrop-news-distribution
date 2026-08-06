Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Add":"\u0625\u0636\u0627\u0641\u0629","Configure":"\u0636\u0628\u0637","This field is required.":"\u0647\u0630\u0627 \u0627\u0644\u062d\u0642\u0644 \u0636\u0631\u0648\u0631\u064a.","Show":"\u0639\u0631\u0636","Please wait...":"\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...","Hide":"\u0625\u062e\u0641\u0627\u0621","Drag to re-order":"\u0627\u0633\u062d\u0628 \u0644\u062a\u063a\u064a\u0631 \u0627\u0644\u062a\u0631\u062a\u064a\u0628","Changes made in this table will not be saved until the form is submitted.":"\u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u062f\u062b\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u0646 \u062a\u064f\u062d\u0641\u0638 \u0625\u0644\u0627 \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0631\u0629.","Uploading... (@current of @total)":"\u062c\u0627\u0631\u064a \u0627\u0644\u0631\u0641\u0639... (@current \u0645\u0646 @total)","Re-order rows by numerical weight instead of dragging.":"\u0625\u0639\u0627\u062f\u0629 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0633\u0637\u0648\u0631 \u062d\u0633\u0628 \u0648\u0632\u0646 \u0631\u0642\u0645\u064a \u0628\u062f\u0644\u0627 \u0645\u0646 \u0633\u062d\u0628\u0647\u0627.","Show row weights":"\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0623\u0633\u0637\u0631","Hide row weights":"\u0625\u062e\u0641\u0627\u0621 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0633\u0637\u0648\u0631","Apply":"\u062a\u0637\u0628\u064a\u0642","Apply (all displays)":"\u062a\u0637\u0628\u064a\u0642 (\u0643\u0644 \u0627\u0644\u0639\u0631\u0648\u0636)","Apply (this display)":"\u062a\u0637\u0628\u064a\u0642 (\u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636)"}} };;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Backdrop.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    var insideDialog = Boolean($fieldset.parents('.ui-dialog-content').length);
    $fieldset
      .removeClass('collapsed')
      .find('> legend span.fieldset-legend-prefix').html(Backdrop.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        $fieldset.trigger({ type: 'collapsed', value: false });
        $(window).triggerHandler('resize');
        Backdrop.optimizedResize.trigger();
        if (insideDialog === false) {
          Backdrop.collapseScrollIntoView(fieldset);
        }
        fieldset.animating = false;
      }
    });
  }
  else {
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Backdrop.t('Show'));
      $fieldset.trigger({ type: 'collapsed', value: true });
      $(window).triggerHandler('resize');
      Backdrop.optimizedResize.trigger();
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Backdrop.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  if (posY + node.offsetHeight > h + offset) {
    if (node.offsetHeight > h) {
      node.scrollIntoView({behavior: "smooth"});
    }
    else {
      node.scrollIntoView({behavior: "smooth", block: "end"});
    }
  }
};

Backdrop.behaviors.collapse = {
  attach: function (context, settings) {
    var hasHash = location.hash && location.hash != '#' && $(window).find(location.hash).length;
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = hasHash ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        on('summaryUpdated', function () {
          var text = $fieldset.backdropGetSummary();
          summary.html(text ? text : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Backdrop.t('Show') : Backdrop.t('Hide'))
        .prependTo($legend)
        .after(document.createTextNode(' '));

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .on('click', function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Backdrop.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
