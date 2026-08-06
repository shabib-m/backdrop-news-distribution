<?php
/**
 * @file
 * قالب مخصص ومتكامل لبلوك قائمة المستخدم (User Menu) لشاشات الكمبيوتر.
 */
// فحص ما إذا كان الزائر مسجلاً لدخوله في الموقع أم لا
global $user;
$is_logged_in = $user->uid > 0;
?>

<!-- يظهر البلوك فقط في الكمبيوتر ويختفي في الجوال لمنع التكرار البصري -->
<div class="<?php print implode(' ', $classes); ?> hidden lg:flex items-center gap-4"<?php print backdrop_attributes($attributes); ?>>
  
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <h2 class="sr-only"><?php print $title; ?></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <!-- 1. زر تبديل المظهر (Dark / Light) المستقر -->
  <label class="btn btn-ghost btn-circle swap swap-rotate shrink-0">
    <input type="checkbox" id="theme-toggle" class="theme-controller" />
    <div class="swap-off fill-current w-6 h-6">
      <svg xmlns="http://w3.org" viewBox="0 0 24 24" class="w-full h-full"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.36Zm12.72,9.9a1,1,0,0,0-.71.29l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,18.36,16.95ZM12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4,4,0,0,0,12,16Zm7-5H18a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM13.76,4.78a1,1,0,0,0-1.41,0l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,13.76,4.78Z"/></svg>
    </div>
    <div class="swap-on fill-current w-6 h-6">
      <svg xmlns="http://w3.org" viewBox="0 0 24 24" class="w-full h-full"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,11.75A1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/></svg>
    </div>
  </label>

  <!-- 2. عرض القائمة بناءً على حالة العضو (مسجل دخول أم زائر) -->
  <?php if ($is_logged_in): ?>
    <!-- إذا كان مسجل الدخول: تظهر قائمة منسدلة أنيقة للملف الشخصي -->
    <div class="dropdown dropdown-end dropdown-hover">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-base-300">
        <div class="w-10 rounded-full bg-[#307c67] text-white flex items-center justify-center font-bold text-lg">
          <!-- طباعة أول حرف من اسم المستخدم كصورة رمزية مؤقتة -->
          <?php print mb_strtoupper(mb_substr($user->name, 0, 1, 'utf-8'), 'utf-8'); ?>
        </div>
      </div>
      
      <!-- الصندوق المنسدلة للروابط المحقونة من قاعدة البيانات -->
      <div tabindex="0" class="dropdown-content z-[60] menu p-2 shadow-2xl bg-base-100 rounded-xl w-52 border border-base-200 mt-2 text-right user-desktop-dropdown">
        <div class="px-4 py-2 font-bold text-xs text-gray-400 border-b border-base-200 mb-1">
          مرحباً، <?php print check_plain($user->name); ?>
        </div>
        <?php print render($content); ?>
      </div>
    </div>

  <?php else: ?>
    <!-- إذا كان زائر مجهول: تظهر أزرار تسجيل الدخول المفرغة المنسقة مسبقاً -->
    <div class="user-guest-buttons flex items-center gap-2">
      <?php print render($content); ?>
    </div>
  <?php endif; ?>

</div>
