Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Configure":"\u0636\u0628\u0637","Please wait...":"\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...","Uploading... (@current of @total)":"\u062c\u0627\u0631\u064a \u0627\u0644\u0631\u0641\u0639... (@current \u0645\u0646 @total)"}} };;
(function ($) {

"use strict";

/**
 * Add buttons to messages to allow users to dismiss them.
 */
Backdrop.behaviors.dismiss = {
  attach: function (context, settings) {

    $('.messages a.dismiss').on('click', function(event) {
      event.preventDefault();

      $(this).parent().fadeOut('fast', function() {
        if ($('.l-messages').children(':visible').length == 0) {
          $('.l-messages').hide();
        }
      });
    });

  }
};

})(jQuery);
;
