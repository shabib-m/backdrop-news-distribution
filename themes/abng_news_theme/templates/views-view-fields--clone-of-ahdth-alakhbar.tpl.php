<?php
/**
 * @file
 * قالب مخصص لحقول رؤية أحدث المستجدات الجانبية - يعتمد فقط على صور الموقع الحقيقية.
 */

$title = $fields['title']->content;
$date = $fields['created']->content;
$node_url = $row->nid;

// 1. جلب محتوى حقل الصورة الصافي من قاعدة البيانات للكرت الصغير
$image_html = trim($fields['field_swrt_alkhbr_alryysyt']->content);

// 2. الفحص الذكي المتوافق لقص رابط السورس أو اعتماده إذا كان نقياً
if (strpos($image_html, 'src="') !== FALSE) {
  preg_match('/src="([^"]+)"/', $image_html, $matches);
  $image_url = !empty($matches[1]) ? $matches[1] : '';
} else {
  $image_url = strip_tags($image_html);
}
?>

<!-- كرت جانبي صغير متجاوب ومتناسق تماماً مع الهوية البصرية -->
<div class="card card-side bg-base-100 shadow-md compact rounded-xl border border-[#d3d3d3] overflow-hidden text-right mb-3" dir="rtl">
  
  <!-- طباعة مربع الصورة فقط إذا كانت مرفوعة للمقال في السيرفر -->
  <?php if (!empty($image_url)): ?>
    <figure class="w-24 h-24 shrink-0">
      <img src="<?php print $image_url; ?>" class="w-full h-full object-cover" alt="<?php print strip_tags($title); ?>"/>
    </figure>
  <?php else: ?>
    <!-- مساحة ملونة صغيرة جذابة تعتمد على لون هويتك الزمردية كبديل فخم في غياب الصورة -->
    <div class="w-24 h-24 shrink-0 bg-gradient-to-br from-[#307c67] to-[#054533] flex items-center justify-center text-white opacity-85">
      <svg xmlns="http://w3.org" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v4a1 1 0 001 1h4" />
      </svg>
    </div>
  <?php endif; ?>

  <!-- جسم الكرت الجانبي الصغير -->
  <div class="card-body justify-between p-3 flex-1">
    <h4 class="font-bold text-sm line-clamp-2 hover:text-primary cursor-pointer leading-tight">
      <a href="<?php print url('node/' . $node_url); ?>"><?php print $title; ?></a>
    </h4>
    <div class="text-xs text-gray-400">
      <?php print $date; ?>
    </div>
  </div>

</div>
