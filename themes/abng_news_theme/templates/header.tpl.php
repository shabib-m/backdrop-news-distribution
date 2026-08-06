<?php
/**
 * @file
 * Display generic site information such as logo, site name, etc.
 *
 * Available variables:
 *
 * - $base_path: The base path of the Backdrop installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the home page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $front_page: The URL of the home page. Use this instead of $base_path, when
 *   linking to the home page. This includes the language domain or prefix.
 * - $site_name: The name of the site, empty when display has been disabled.
 * - $site_slogan: The site slogan, empty when display has been disabled.
 * - $menu: The menu for the header (if any), as an HTML string.
 */
?>


<div class="flex items-center gap-3">
  
  <!-- 2. طباعة اللوجو المرفوع من لوحة التحكم (إن وجد) -->
  <?php if ($logo): ?>
    <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="logo shrink-0 flex items-center">
      <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="h-10 w-auto" />
    </a>
  <?php endif; ?>

  <!-- 3. طباعة اسم الموقع والشعار البرمجي المتجاوب -->
  <?php if ($site_name || $site_slogan): ?>
    <div class="name-and-slogan flex flex-col justify-center">
      <?php if ($site_name): ?>
        <?php if (!$is_front): ?>
          <!-- المظهر في الصفحات الداخلية -->
          <div class="site-name font-black text-xl md:text-2xl text-[#307c67] tracking-tight whitespace-nowrap">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
          </div>
        <?php else: ?>
          <!-- المظهر في الصفحة الرئيسية لتحسين الـ SEO (H1) -->
          <h1 class="site-name">
            <a class="text-xl md:text-2xl font-black text-[rgba(3,95,69,0.82)] tracking-tight whitespace-nowrap" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
          </h1>
        <?php endif; ?>
      <?php endif; ?>
      
      <!-- طباعة الشعار أو الوصف الصغير أسفل اسم الموقع (إن وجد) -->
      <?php if ($site_slogan): ?>
        <div class="site-slogan text-xs text-gray-400 opacity-80 whitespace-nowrap"><?php print $site_slogan; ?></div>
      <?php endif; ?>
    </div>
  <?php endif; ?>

</div>

<!-- تعطيل طباعة القائمة المدمجة القديمة لأننا نقوم برندرتها بشكل منفصل في السنتر -->
<?php if (FALSE && $menu): ?>
  <nav class="header-menu"><?php print $menu; ?></nav>
<?php endif; ?>
