Backdrop.locale = { 'pluralFormula': function ($n) { return Number((($n==1)?(0):(($n==0)?(1):(($n==2)?(2):(((($n%100)>=3)&&(($n%100)<=10))?(3):(((($n%100)>=11)&&(($n%100)<=99))?(4):5)))))); }, 'strings': {"":{"@size KB":"@size \u0643\u064a\u0644\u0648\u0628\u0627\u064a\u062a","@size MB":"@size \u0645\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size GB":"@size \u062c\u064a\u063a\u0627\u0628\u0627\u064a\u062a","@size TB":"@size \u062a\u064a\u0631\u0627\u0628\u0627\u064a\u062a","An AJAX HTTP error occurred.":"\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062c\u0627\u0643\u0633 HTTP.","HTTP Result Code: !status":"\u0646\u062a\u064a\u062c\u0629 \u0643\u0648\u062f PHP: !status","An AJAX HTTP request terminated abnormally.":"\u062a\u0645 \u0625\u0646\u0647\u0627\u0621 \u0637\u0644\u0628 AJAX HTTP \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0639\u0627\u062f\u064a.","Debugging information follows.":"\u064a\u0644\u064a\u0647 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0642\u064a\u062d.","Path: !uri":"\u0627\u0644\u0645\u0633\u0627\u0631: !uri","StatusText: !statusText":"\u0646\u0635 \u0627\u0644\u062d\u0627\u0644\u0629: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","More":"\u0627\u0644\u0645\u0632\u064a\u062f","Configure":"\u0636\u0628\u0637","This field is required.":"\u0647\u0630\u0627 \u0627\u0644\u062d\u0642\u0644 \u0636\u0631\u0648\u0631\u064a.","Show":"\u0639\u0631\u0636","Hide":"\u0625\u062e\u0641\u0627\u0621","Drag to re-order":"\u0627\u0633\u062d\u0628 \u0644\u062a\u063a\u064a\u0631 \u0627\u0644\u062a\u0631\u062a\u064a\u0628","Changes made in this table will not be saved until the form is submitted.":"\u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u062f\u062b\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u0646 \u062a\u064f\u062d\u0641\u0638 \u0625\u0644\u0627 \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0631\u0629.","Re-order rows by numerical weight instead of dragging.":"\u0625\u0639\u0627\u062f\u0629 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0633\u0637\u0648\u0631 \u062d\u0633\u0628 \u0648\u0632\u0646 \u0631\u0642\u0645\u064a \u0628\u062f\u0644\u0627 \u0645\u0646 \u0633\u062d\u0628\u0647\u0627.","Show row weights":"\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0623\u0633\u0637\u0631","Hide row weights":"\u0625\u062e\u0641\u0627\u0621 \u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0633\u0637\u0648\u0631"}} };;
(function ($) {

"use strict";

  /**
 * Attaches menu styles to menu blocks. Currently only the "dropdown" style.
 */
Backdrop.behaviors.menuStyles = {
  attach: function(context, settings) {
    var $menus = $(context).find('[data-menu-style]').once('menu-style');
    $menus.each(function() {
      var element = this;
      var $menu = $(element);
      var style = $menu.data('menuStyle');
      var menuSettings = $menu.data('menuSettings');
      if ($menu.data('clickdown')) {
        menuSettings = $.extend(menuSettings, {
          noMouseOver: true
        });
      }
      menuSettings = $.extend(menuSettings, {
        collapsibleBehavior: ($menu.data('collapse')) ? ($menu.data('collapse')) : 'default'
      });
      if (Backdrop.menuStyles[style]) {
        Backdrop.menuStyles[style].attach(element, menuSettings);
      }
    });
  },
  detach: function(context, settings) {
    var $menus = $(context).find('[data-menu-style]').once('menu-style');
    $menus.each(function() {
      var element = this;
      var $menu = $(element);
      var style = $menu.data('menuStyle');
      var menuSettings = $menu.data('menuSettings');
      if (Backdrop.menuStyles[style] && Backdrop.menuStyles[style].detach) {
        Backdrop.menuStyles[style].detach(element, menuSettings);
      }
    });
  }
};

Backdrop.menuStyles = {};
Backdrop.menuStyles.dropdown = {
  attach: function(element, settings) {
    // Set defaults for the settings.
    settings = $.extend(settings, {
      subIndicatorsPos: 'append',
      subIndicatorsText: ''
    });
    $(element).addClass('sm').smartmenus(settings);
  }
};

/**
 * Adds a collapsible "hamburger" button to toggle links if enabled on a menu.
 */
Backdrop.behaviors.menuToggles = {
  attach: function(context, settings) {
    var $menus = $(context).find('[data-menu-toggle-id]').once('menu-toggles');
    $menus.each(function() {
      var element = this;
      var $menu = $(element);
      var id = $menu.data('menuToggleId');
      var $menuToggleState = $('#' + id);
      $menuToggleState.on('change', function(e) {
        // Animate mobile menu.
        if (this.checked) {
          $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
        } else {
          $menu.show().slideUp(250, function() { $menu.css('display', ''); });
        }
      });
      // Hide mobile menu beforeunload.
      $(window).on('beforeunload unload', function() {
        if ($menuToggleState[0].checked) {
          $menuToggleState[0].click();
        }
      });
    });
  }
};

})(jQuery);
;
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
