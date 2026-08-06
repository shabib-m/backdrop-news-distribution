<?php
/**
 * @file
 * قالب مخصص ومطور بالكامل لوسط الصفحة الرئيسية بالتوزيعة الإخبارية.
 * مصحح لقرأة الحقول وإظهار الأقسام الحقيقية بروابطها الأصلية.
 */

// 1. استخراج المتغيرات النصية الأساسية
$title    = strip_tags($fields['title']->content);
$node_url = $row->nid; 

// تعريف القيم الافتراضية لحماية الواجهة من السقوط
$category_name = 'أخبار';
$category_url  = '#';
$image_url     = '';

// 2. الحل الحاسم لجلب كائن النود الفعلي المستهدف داخل قالب الـ Views
if (isset($row->_field_data['nid']['entity'])) {
  $node_object = $row->_field_data['nid']['entity'];
} else {
  $node_object = node_load($node_url); // حل احتياطي في حال اختلاف إعدادات العرض
}

// 3. التحقق الآمن وقراءة اسم ورابط القسم الحقيقي (Taxonomy Term)
if (!empty($node_object) && isset($node_object->type)) {
  
  // استخدام دالة النواة لجلب عناصر الحقل متخطية تضارب اللغات والفهارس
  $term_items = field_get_items('node', $node_object, 'field_term_news');

  if (!empty($term_items) && isset($term_items[0]['tid'])) {
    $term_tid = $term_items[0]['tid'];
    $term_loaded = taxonomy_term_load($term_tid); // تحميل بيانات المصطلح من قاعدة البيانات
    
    if ($term_loaded) {
      $category_name = $term_loaded->name; // سحب المسمى الفعلي (مثل: اقتصاد، رياضة)
      $category_url  = url('taxonomy/term/' . $term_tid); // توليد الرابط الحقيقي للقسم
    }
  }

  // 4. جلب حقل الصورة البارزة وتوليد رابط عالي الدقة متوافق مع أبعاد الكارت
  $image_items = field_get_items('node', $node_object, 'field_swrt_alkhbr_alryysyt');
  if (!empty($image_items) && isset($image_items[0]['uri'])) {
    // استخدام نمط الصورة المتوسط 'medium' لضمان الدقة العالية وسرعة الأداء
    $image_url = image_style_url('medium', $image_items[0]['uri']);
  }
}

// حل احتياطي أخير (Fallback) للصورة عبر الـ HTML المستخرج من الـ Views
if (empty($image_url) && !empty($fields['field_swrt_alkhbr_alryysyt']->content)) {
  $image_html = trim($fields['field_swrt_alkhbr_alryysyt']->content);
  if (strpos($image_html, 'src="') !== FALSE) {
    preg_match('/src="([^"]+)"/', $image_html, $matches);
    $image_url = !empty($matches[1]) ? $matches[1] : '';
  }
}
?>

<!-- جسم الكارت العمودي المصمم ليطابق الصورة بدقة عالية -->
<div class="card bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-md compact border border-[#d3d3d3] dark:border-slate-800 overflow-hidden flex flex-col w-full group transition-all duration-300 hover:shadow-2xl" dir="rtl">
  
  <!-- أولاً: منطقة الصورة البارزة في الأعلى بأبعاد متناسقة وألوان حية -->
  <div class="w-full h-48 md:h-52 overflow-hidden relative bg-gray-100 dark:bg-slate-800 flex-shrink-0">
    <?php if (!empty($image_url)): ?>
      <img src="<?php print $image_url; ?>" alt="<?php print $title; ?>" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
    <?php else: ?>
      <!-- تدرج لوني احترافي يحمل شعار الهوية الإخبارية في حال غياب الصورة -->
      <div class="w-full h-full bg-gradient-to-br from-[#307c67] to-[#054533] flex items-center justify-center text-white/30 font-black text-sm tracking-widest">NEWS</div>
    <?php endif; ?>
  </div>

  <!-- ثانياً: منطقة المحتوى النصي المبطنة المنظمة للعناصر -->
  <div class="p-6 flex flex-col justify-between flex-grow text-right bg-white dark:bg-slate-900">
    
    <!-- القسم العلوي: تحويل اسم التصنيف إلى رابط نشط وتفاعلي مضيء عند التمرير -->
    <div class="flex justify-start mb-3">
      <a href="<?php print $category_url; ?>" class="bg-[#c5df93] text-xs font-black text-[#307c67] dark:text-purple-400 dark:bg-purple-950/40 px-3 py-1 rounded-tr-lg rounded-bl-lg border border-[#7c8d5c] transition-colors duration-150 hover:bg-[#b3d17d] dark:hover:bg-purple-900/60 shadow-sm">
        <?php print $category_name; ?>
      </a>
    </div>

    <!-- عنوان المقال الإخباري البارز بخط عريض وجاف ونظيف يختصر تلقائياً عند زيادة طول النص -->
    <h3 class="text-[#307c67] lg:text-lg font-bold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 hover:text-[#307c67] dark:hover:text-[#307c67] transition-colors duration-150 mb-3">
      <a class="text-[#307c67] hover:text-[#307c67]" href="<?php print url('node/' . $node_url); ?>"><?php print $title; ?></a>
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
