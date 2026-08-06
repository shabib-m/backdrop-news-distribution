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
<div class="lg:col-span-1 w-full flex flex-col justify-full <?php print implode(' ', $classes); ?>"<?php print backdrop_attributes($attributes); ?>>

<?php print render($title_prefix); ?>
<?php if ($title): ?>
  <h2 class="block-title w-40 mb-6  pb-3 text-xl font-bold text-[#4b5563]">
    <span class="relative pr-4 mr-2 mb-2 after:absolute after:right-0 after:top-1/3 after:-translate-y-1/4 after:w-[0.4vw] after:h-[80%] after:bg-[#307c67]">
      <?php print $title; ?></span>
  </h2>
<?php endif; ?>
<?php print render($title_suffix); ?>

  <div class="block-content">
    <?php print render($content); ?>
  </div>
</div>
