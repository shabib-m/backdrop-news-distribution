<?php
/**
 * @file
 * قالب مخصص ومطور لحقول رؤية المقال الرئيسي الكبير.
 * تثبيت الشارة أعلى اليمين وهبوط كامل النصوص للقاع.
 */

$title = $fields['title']->content;
$body = $fields['body']->content;
$node_url = $row->nid; 

// جلب حقل الصورة وفحصه برمجياً
$image_html = trim($fields['field_swrt_alkhbr_alryysyt']->content);
if (strpos($image_html, 'src="') !== FALSE) {
  preg_match('/src="([^"]+)"/', $image_html, $matches);
  $image_url = !empty($matches[1]) ? $matches[1] : '';
} else {
  $image_url = strip_tags($image_html);
}
?>

<!-- جسم الكرت الإخباري الرئيسي الكبير بارتفاع ثابت -->
<div class="card bg-base-100 image-full h-[450px] shadow-2xl relative overflow-hidden group rounded-2xl w-full">
  
  <!-- 1. طباعة الصورة البارزة في الخلفية بكامل المساحة -->
  <?php if (!empty($image_url)): ?>
    <figure class="w-full h-full absolute inset-0 z-0">
      <img src="<?php print $image_url; ?>" 
      alt="<?php print strip_tags($title); ?>" 
      class="w-full h-full object-cover object-center rendering-auto contrast-[1.05] brightness-[0.95] transition-transform duration-500 group-hover:scale-105" />
   </figure>
  <?php else: ?>
    <div class="absolute inset-0 bg-gradient-to-br from-[#307c67] to-[#054533] opacity-85 z-0"></div>
  <?php endif; ?>

  <!-- 2. التعديل السحري الأول: فصل شارة أهم الأخبار وتثبيتها مطلقاً أعلى يمين الزاوية -->
  <div class="absolute top-4 right-4 z-20">
    <span class="badge badge-error p-3 font-bold text-white text-1 shadow-md rounded-lg">أهم الأخبار</span>
  </div>

  <!-- 3. حاوية المحتوى الممتدة بالكامل والمثبتة للكتلة النصية في أقصى القاع -->
  <div class="card-body flex flex-col justify-end p-6 lg:p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-right z-10 absolute inset-0 w-full h-full pb-6" dir="rtl">
    
    <!-- عنوان المقال: هبط بالكامل ولم يعد مقيداً بالشارة العلوية -->
    <h2 class="card-title text-xl lg:text-2xl font-black text-white leading-snug mb-2 line-clamp-2 hover:text-[#307c67] transition-colors duration-200">
      <a href="<?php print url('node/' . $node_url); ?>"><?php print strip_tags($title); ?></a>
    </h2>
    
    <!-- نص المحتوى والمقتطف -->
    <p class="text-gray-200 text-sm max-w-2xl line-clamp-3 leading-relaxed mb-4 flex-grow-0">
      <?php print strip_tags($body); ?>
    </p>
    
    <!-- زر اقرأ المزيد -->
    <div class="card-actions justify-start">
      <a href="<?php print url('node/' . $node_url); ?>" class="btn bg-[#307c67] hover:bg-[#307c67] btn-sm rounded-xl text-white font-bold px-5">
        اقرأ المزيد
      </a>
    </div>

  </div>
</div>
