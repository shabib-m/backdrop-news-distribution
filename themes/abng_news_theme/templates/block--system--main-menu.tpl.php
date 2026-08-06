<?php
/**
 * @file
 * قالب مخصص ومتجاوب لبلوك القائمة الرئيسية (Main Menu).
 * يدمج روابط الكمبيوتر، قائمة الموبايل، وزر المظهر المتواجد دائماً في الجوال.
 */
?>
<div class="<?php print implode(' ', $classes); ?> w-full flex items-center justify-center mx-auto"<?php print backdrop_attributes($attributes); ?>>
  
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <h2 class="sr-only"><?php print $title; ?></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <!-- 1. شاشات الكمبيوتر (Desktop): تظهر روابط الأقسام الأفقية بالمنتصف -->
  <div class="hidden lg:flex items-center justify-center w-full main-desktop-menu">
    <?php print render($content); ?>
  </div>

  <!-- 2. شاشات الموبايل (Mobile): تجمع زر المظهر الخارجي مع زر الهامبرغر المنبثق -->
  <div class="flex items-center gap-2 lg:hidden w-auto">
    
    <!-- زر تبديل المظهر (Light/Dark Mode) المخصص والمتاح دائماً على شريط الموبايل -->
    <label class="btn btn-ghost btn-circle swap swap-rotate shrink-0">
      <!-- يربط بنفس معرّف الجافا سكريبت الافتراضي لتغيير السمة تلقائياً -->
      <input type="checkbox" id="theme-toggle-mobile" class="theme-controller" />
      
      <!-- أيقونة الشمس -->
      <div class="swap-off fill-current w-6 h-6">
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" class="w-full h-full">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.36Zm12.72,9.9a1,1,0,0,0-.71.29l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,18.36,16.95ZM12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4,4,0,0,0,12,16Zm7-5H18a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM13.76,4.78a1,1,0,0,0-1.41,0l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,13.76,4.78Z"/>
        </svg>
      </div>
      
      <!-- أيقونة القمر -->
      <div class="swap-on fill-current w-6 h-6">
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" class="w-full h-full">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,11.75A1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/>
        </svg>
      </div>
    </label>

    <!-- حاوية الـ dropdown القياسية للثلاث شرطات -->
    <div class="dropdown dropdown-bottom dropdown-end w-auto">
      <label tabindex="0" class="btn btn-ghost btn-circle flex items-center justify-center cursor-pointer" aria-label="Open Menu">
        <svg xmlns="http://w3.org" class="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      
      <div tabindex="0" class="dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-100 rounded-box w-56 border border-base-200 text-right mobile-menu-wrapper flex flex-col gap-2">
        <!-- أ) روابط الأقسام الرئيسية -->
        <div class="mobile-main-links-container">
          <?php 
            $main_menu_tree = menu_tree_page_data('main-menu');
            print backdrop_render(menu_tree_output($main_menu_tree));
          ?>
        </div>
        
        <div class="divider my-1 opacity-40"></div>
        
        <!-- ب) روابط الحساب المدمجة -->
        <div class="mobile-user-links">
          <?php 
            $user_menu_tree = menu_tree_page_data('user-menu');
            print backdrop_render(menu_tree_output($user_menu_tree)); 
          ?>
        </div>
      </div>
    </div>

  </div>

</div>
