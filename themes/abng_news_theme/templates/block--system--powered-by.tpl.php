<?php
/**
 * @file
 * Template for outputting the default block styling within a Layout.
 *
 * Variables available:
 * - $classes: Array of classes that should be displayed on the block's wrapper.
 * - $title: The title of the block.
 * - $title_prefix/$title_suffix: A prefix and suffix for the title tag. This
 *   is important to print out as administrative links to edit this block are
 *   printed in these variables.
 * - $content: The actual content of the block.
 */
?>
<div class=" <?php print implode(' ', $classes); ?>"<?php print backdrop_attributes($attributes); ?>>

<?php print render($title_prefix); ?>
<?php if ($title): ?>
  <!-- تحويل العنوان إلى المنتصف وتنسيق الخطوط لتتوسط الصندوق -->
  <h2 class="block-title w-full text-center flex justify-center mb-1 pb-3 text-xl font-bold text-[#4b5563]">
    <span class="relative px-4 mb-2 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-16 after:h-[3px] after:bg-[#307c67]">
      <?php print $title; ?>
    </span>
  </h2>
<?php endif; ?>
<?php print render($title_suffix); ?>

  <!-- حاوية المحتوى ممركزة بالكامل لأي قوائم أو أزرار بداخلها -->
  <div class="block-content w-full flex justify-center items-center">
    <?php print render($content); ?>
  </div>
</div>

