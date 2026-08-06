(function ($) {
  document.addEventListener('DOMContentLoaded', function () {
    
    // 1. كود تبديل المظهر المحمي والمزامن للكمبيوتر والجوال معاً
    const toggleDesktop = document.getElementById('theme-toggle');
    const toggleMobile = document.getElementById('theme-toggle-mobile');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // تطبيق الثيم المحفوظ فوراً
    htmlEl.setAttribute('data-theme', savedTheme);
    
    // ضبط وضعية الـ Checkbox للزرين بناءً على الثيم المحفوظ
    if (savedTheme === 'dark') {
      if (toggleDesktop) toggleDesktop.checked = true;
      if (toggleMobile) toggleMobile.checked = true;
    }

    // دالة موحدة لتغيير الثيم ومزامنة الأزرار
    function updateTheme(isDark) {
      const targetTheme = isDark ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      
      // مزامنة أزرار الحركية لتتحرك معاً في نفس اللحظة
      if (toggleDesktop) toggleDesktop.checked = isDark;
      if (toggleMobile) toggleMobile.checked = isDark;
    }

    if (toggleDesktop) {
      toggleDesktop.addEventListener('change', function () { updateTheme(this.checked); });
    }
    if (toggleMobile) {
      toggleMobile.addEventListener('change', function () { updateTheme(this.checked); });
    }

    // 2. التحكم الذكي بفتح وإغلاق زر الثلاث شرطات في الموبايل
    $(document).on('click', '.dropdown label.btn-circle', function (e) {
      const $dropdown = $(this).closest('.dropdown');
      if ($dropdown.css('pointer-events') === 'auto' && !$dropdown.hasClass('menu-open')) {
        $dropdown.addClass('menu-open');
        $(this).focus();
      } else {
        $(this).blur();
        $dropdown.removeClass('menu-open');
        if (document.activeElement) {
          document.activeElement.blur();
        }
      }
    });

    $(document).on('click', '.mobile-menu-wrapper a', function () {
      $('.dropdown').removeClass('menu-open');
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.dropdown').length) {
        $('.dropdown').removeClass('menu-open');
      }
    });

  });
})(jQuery);
