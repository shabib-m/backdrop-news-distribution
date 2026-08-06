<?php
/**
 * تعديل مخرجات القائمة الرئيسية لإضافة classes مخصصة.
 */
/**
 * تصحيح وتنسيق القائمة الرئيسية (Main Menu)
 */
function abng_news_theme_menu_tree__main_menu($variables) {
  // استخدام Flexbox لضمان استقامة الروابط أفقياً وعمودياً بشكل مثالي
  return '<ul class="main-menu-ul flex items-center gap-2 font-semibold">' . $variables['tree'] . '</ul>';
}

function abng_news_theme_menu_link__main_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = backdrop_render($element['#below']);
  }
  
  // تنظيف الـ <li> وجعله مرناً ومتناسقاً في التوزيع
  $element['#attributes']['class'][] = 'flex items-center';

  // نقل التنسيقات الجمالية والحدود الملونة مباشرة إلى الرابط <a> بدون أي تعارض
  $element['#localized_options']['attributes']['class'] = array(
    'px-4',
    'py-2',
    'mx-2',
    'text-[#4b5563]',
    'text-base',
    'border-b-4',
    'border-x-0',
    'border-t-0',
    'border-[#307c67]',        /* تثبيت اللون الأخضر الزيتي للإطار السفلي */
    'rounded-br-[1.125rem]',   /* انحناء الزاوية السفلية اليمنى كما طلبت */
    'hover:text-black',        /* تغيير لون النص للأسود عند مرور الماوس */
    'hover:bg-base-200',       /* إضافة خلفية خفيفة جداً عند التمرير (اختياري وجميل) */
    'transition-all',
    'duration-200'
  );

  // إذا كان الرابط هو الصفحة الحالية النشطة (Active)، نثبت اللون الأخضر للحد السفلي
  if (in_array('active', $element['#attributes']['class']) || !empty($element['#localized_options']['attributes']['class']['active'])) {
    // استبدال الشفاف باللون الفعلي للرابط النشط
    $element['#localized_options']['attributes']['class'][] = 'border-[#307c67] font-bold text-black';
  }

  // طباعة الرابط المطور
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  
  return '<li' . backdrop_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * تصحيح وتنسيق القائمة تسجيل الدخول والخروج والحساب (USER Menu)
 */
function abng_news_theme_menu_tree__user_menu($variables) {
  // الحاوية الأساسية للقائمة مع ضبط التدفق الأفقي والمحاذاة الرأسية
  return '<ul class="flex flex-row items-center gap-2 font-semibold">' . $variables['tree'] . '</ul>';
}

function abng_news_theme_menu_link__user_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = backdrop_render($element['#below']);
  }
  
  // إزالة الكلاسات المخلة بالمظهر من الـ <li> وتركها كعنصر قائمة طبيعي ومحاذٍ
  $element['#attributes']['class'][] = 'flex items-center';

  // التعديل النهائي المصحح لقائمة المستخدم لفرض الألوان المخصصة بنجاح
  $element['#localized_options']['attributes']['class'] = array(
    'btn',
    'btn-sm',
    'hover:bg-[#307c67]', 
    'btn-outline',
    'rounded-btn',
    'text-[#307c67]',           /* تطبيق درجتك اللونية المخصصة على النص */
    'border-[#307c67]',         /* تطبيق درجتك اللونية المخصصة على الإطار */      /* عند تمرير الماوس يمتلئ الزر باللون الأخضر الزيتي */
    'hover:border-[#307c67]',   /* يظل الإطار أخضر زيتي عند التمرير */
    'hover:text-white',         /* يتحول النص للأبيض بوضوح عند التمرير */
    'transition-all',
    'duration-200'
  );

  // طباعة الرابط مع كلاسات الزر الجديدة
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  
  return '<li' . backdrop_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * تصحيح وتنسيق القائمة اتبعنا (menu_tab_na_ly)
 */
function abng_news_theme_menu_tree__menu_tab_na_ly($variables) {
  // استخدام Flexbox لضمان استقامة الروابط أفقياً وعمودياً بشكل مثالي
  return '<ul class="flex gap-3 mt-1">' . $variables['tree'] . '</ul>';
}
function abng_news_theme_menu_link__menu_alaqsam_alakhbaryt(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = backdrop_render($element['#below']);
  }
  
  // تنظيف الـ <li> وجعله مرناً ومتناسقاً في التوزيع
  $element['#attributes']['class'][] = '';

  // 1. جلب الكلاسات المضافة من لوحة التحكم (Menu attributes) إن وجدت وتحويلها لمصفوفة
  $custom_classes = array();
  if (isset($element['#localized_options']['attributes']['class'])) {
    if (is_string($element['#localized_options']['attributes']['class'])) {
      $custom_classes = array_filter(explode(' ', $element['#localized_options']['attributes']['class']));
    } elseif (is_array($element['#localized_options']['attributes']['class'])) {
      $custom_classes = $element['#localized_options']['attributes']['class'];
    }
  }

  // 2. كلاسات التصميم الافتراضية الخاصة بالقالب
  $theme_classes = array(
    'px-4',
    'py-2',
    'mx-2',
    'text-[#4b5563]',
    'text-base',
    'rounded-br-[1.125rem]',   /* انحناء الزاوية السفلية اليمنى */
    'footer-menu',   /* انحناء الزاوية السفلية اليمنى */
  );

  // 3. دمج كلاسات القالب مع الكلاسات المخصصة من لوحة التحكم في مصفوفة واحدة
  $element['#localized_options']['attributes']['class'] = array_merge($theme_classes, $custom_classes);

  // إذا كان الرابط هو الصفحة الحالية النشطة (Active)، نثبت اللون الأخضر للحد السفلي
  if (in_array('active', $element['#attributes']['class']) || in_array('active', $element['#localized_options']['attributes']['class'])) {
    $element['#localized_options']['attributes']['class'][] = 'border-[#307c67] font-bold text-black';
  }

  // طباعة الرابط المطور
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  
  return '<li' . backdrop_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
