<?php
/**
 * @file
 * قالب مخصص بالكامل لروابط وحقول أرشيف الأقسام (Taxonomy Term) بنوع المحتوى Card.
 * يتضمن كلاسات تايلوند لشبكة الكروت العمودية ويحل مشكلة تكرار الصور برمجياً.
 */

// 1. استخراج المتغيرات الأساسية للكارت الإخباري
$title      = strip_tags($fields['title']->content);
$node_nid   = $row->nid; 
$node_url   = url('node/' . $node_nid);

// قيم افتراضية لحماية الواجهة من السقوط البصري

$image_url     = '';

// 2. الوصول الآمن لكائن النود الفعلي المستهدف المستدعى في الـ Views
if (isset($row->_field_data['nid']['entity'])) {
  $node_object = $row->_field_data['nid']['entity'];
} else {
  $node_object = node_load($node_nid); 
}



  // 4. الحل الحاسم لعدم تكرار الصور: جلب أول صورة فقط (Index 0) من حقل الملفات/الصور
  // استخدمنا اسم الحقل 'field_image' بناءً على لقطة شاشتك الإدارية الكلمة المكتوبة باللون الأصفر
  $imagealkhbr_items = field_get_items('node', $node_object, 'field_swrt_alkhbr_alryysyt');
  if (!empty($imagealkhbr_items) && isset($imagealkhbr_items[0]['uri'])) {
    // توليد رابط مخصص عالي الدقة 'medium' لسرعة تصفح الأقسام على الجوال والكمبيوتر
    $imagealkhbr_url = image_style_url('medium', $imagealkhbr_items[0]['uri']);
  }
  $image_items = field_get_items('node', $node_object, 'field_image');
  if (!empty($image_items) && isset($image_items[0]['uri'])) {
    // توليد رابط مخصص عالي الدقة 'medium' لسرعة تصفح الأقسام على الجوال والكمبيوتر
    $image_url = image_style_url('medium', $image_items[0]['uri']);
  }

// حل احتياطي (Fallback) في حال كان الحقل يمتلك اسماً برمجياً مختلفاً
if (empty($image_url) && !empty($fields['field_image']->content)) {
  $image_html = trim($fields['field_image']->content);
  if (strpos($image_html, 'src="') !== FALSE) {
    preg_match('/src="([^"]+)"/', $image_html, $matches);
    $image_url = !empty($matches[1]) ? $matches[1] : '';
  }
}
?>

<!-- جسم الكارت العمودي للأقسام المطور والمتناسق 100% مع الهوية البصرية لموقعك -->
<div class="card bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-gray-100/50 dark:border-slate-800 overflow-hidden flex flex-col w-full group transition-all duration-300 hover:shadow-2xl" dir="rtl">
  
  <!-- أولاً: منطقة الصورة البارزة في الأعلى بأبعاد متناسقة وأول صورة فريدة فقط -->
  <div class="w-full h-48 md:h-52 overflow-hidden relative bg-gray-100 dark:bg-slate-800 flex-shrink-0">
    <?php if (!empty($imagealkhbr_url)): ?>
      <img src="<?php print $imagealkhbr_url; ?>" alt="<?php print $title; ?>" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
    
   <?php elseif (!empty($image_url)): ?>
      <img src="<?php print $image_url; ?>" alt="<?php print $title; ?>" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
    <?php else: ?>
      <!-- تدرج لوني يحمل شعار الهوية الإخبارية في حال غياب الصورة تماماً عن المقال -->
      <div class="w-full h-full bg-gradient-to-br from-[#307c67] to-[#054533] flex items-center justify-center text-white/30 font-black text-sm tracking-widest">NEWS</div>
    <?php endif; ?>
  </div>

  <!-- ثانياً: منطقة المحتوى النصي المبطنة المنظمة للعناصر -->
  <div class="p-3 flex flex-col justify-between flex-grow text-right bg-white dark:bg-slate-900">
    
    <!-- عنوان المقال الإخباري البارز بخط عريض ونظيف يختصر تلقائياً عند زيادة طول النص لسطرين -->
    <h3 class="text-base lg:text-lg font-bold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 hover:text-[#307c67] dark:hover:text-[#307c67] transition-colors duration-150 mb-6">
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h3>

    <!-- القسم السفلي: تاريخ نشر الخبر الفعلي يفصله خط أفقي ناعم جداً -->
    <div class="flex justify-start items-center border-t border-gray-100 dark:border-slate-800/60 pt-4 mt-auto">
      <span class="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">
        <?php 
          if (!empty($node_object->created)) {
            print format_date($node_object->created, 'custom', 'j F Y'); 
          } else {
            print 'اليوم';
          }
        ?>
      </span>
    </div>

  </div>

</div>
