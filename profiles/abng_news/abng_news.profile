<?php
/**
 * @file
 * Enables modules and site configuration for a abng_news site installation.
 */

/**
 * Implements hook_install_tasks().
 * هذه هي الدالة الصحيحة والمستقلة لجدولة مهمة استيراد المحتوى.
 */
function abng_news_install_tasks(&$install_state) {
  $tasks['abng_news_import_default_terms'] = array(
    'display_name' => st('استيراد المحتوى الافتراضي'),
    'type' => 'normal',
    'run' => INSTALL_TASK_RUN_IF_NOT_COMPLETED,
  );
  return $tasks;
}

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 */
function abng_news_form_install_configure_form_alter(&$form, $form_state) {
  // Pre-populate the site name.
  $form['site_information']['site_name']['#default_value'] = st('My Backdrop Site');
  $form['#submit'][] = 'abng_news_form_install_configure_submit';
}
/**
 * Extra submit handler install_configure_form().
 */
function abng_news_form_install_configure_submit($form, &$form_state) {
  // Update the home page hero block to use the site name.
  $layout = layout_load('home');
  foreach ($layout->content as &$block) {
    if ($block->delta === 'hero') {
      $block->settings['title'] = st('Welcome to !sitename!', array('!sitename' => $form_state['values']['site_name']));
      break;
    }
  }
  $layout->save();
}
/**
 * دالة استيراد مصطلحات المعاجم الافتراضية من ملف JSON.
 */
function abng_news_import_default_terms() {
  $profile_path = backdrop_get_path('profile', 'abng_news');
  $terms_file = $profile_path . '/content/default_terms.json';

  if (file_exists($terms_file)) {
    $json_data = file_get_contents($terms_file);
    $terms_data = json_decode($json_data, TRUE);

    if (!empty($terms_data)) {
      foreach ($terms_data as $data) {
        // التأكد أولاً من أن المعجم المستهدف مبني وموجود في النظام
        $vocabulary = taxonomy_vocabulary_load($data['vocabulary']);
        
        if ($vocabulary) {
          // بناء كائن المصطلح القياسي لنواة Backdrop
          $term = entity_create('taxonomy_term', array(
            'name' => $data['name'],
            'description' => $data['description'],
            'vocabulary' => $data['vocabulary'],
            'weight' => $data['weight'],
            'langcode' => LANGUAGE_NONE,
          ));
          
          // حفظ المصطلح في قاعدة البيانات
          taxonomy_term_save($term);
        }
      }
    }
    // الترتيب الصحيح: الآن بعد استقرار التصنيفات، ننتقل لجلب المحتوى
    abng_news_import_default_content(); 
  }
}
/**
 * دالة استيراد المحتوى بعد استقرار النظام والحقول بالكامل.
 */
function abng_news_import_default_content() {
  $field_image_dir = 'public://field/image';
  file_prepare_directory($field_image_dir, FILE_CREATE_DIRECTORY);

  $profile_path = backdrop_get_path('profile', 'abng_news');
  $content_file = $profile_path . '/content/default_post.json';

  if (file_exists($content_file)) {
    $json_data = file_get_contents($content_file);
    $nodes_data = json_decode($json_data, TRUE);

    if (!empty($nodes_data)) {
      foreach ($nodes_data as $data) {
        
        // 1. بناء الكائن الأساسي الخفيف للمنشور أولاً لضمان عدم حدوث تكرار SQL
        $node = entity_create('node', array(
          'title' => $data['title'],
          'type' => $data['type'],
          'status' => $data['status'],
          'promote' => $data['promote'],
          'uid' => $data['uid'],
          'langcode' => LANGUAGE_NONE,
        ));
        // 2. إضافة حقل العنوان البارز (Boolean 0 أو 1) المجلوب من الـ JSON
        // نستخدم isset للتأكد من وجود المفتاح في ملف الـ JSON لمنع ظهور تحذيرات برمجية
        if (isset($data['field_promoted_headline'])) {
          $node->field_promoted_headline[LANGUAGE_NONE][0] = array(
            'value' => (int) $data['field_promoted_headline'], // تحويل القيمة إلى رقم صحيح (0 أو 1)
          );
        }
        // 2. إسناد حقل الـ Body للكائن بشكل منفصل ومحمي
        $node->body[LANGUAGE_NONE][0] = array(
          'value' => $data['body'],
          'summary' => '',
          'format' => 'filtered_html',
        );

        // 3. معالجة حقل ربط التصنيفات الصريح إذا توفر في الـ JSON
        if (!empty($data['category_tid'])) {
          $node->field_term_news[LANGUAGE_NONE][0] = array(
            'tid' => (int) $data['category_tid'],
          );
        }

        // 4. معالجة وحماية الصور (لضمان عدم فقدانها مجدداً)
        if (!empty($data['image_filename'])) {
          $image_filename = $data['image_filename'];
          $image_url = BACKDROP_ROOT . '/' . $profile_path . '/images/' . $image_filename;

          if (file_exists($image_url)) {
            $moved_file = file_unmanaged_copy($image_url, $field_image_dir, FILE_EXISTS_REPLACE);

            $file = entity_create('file', array(
              'filename' => $image_filename,
              'uri' => $moved_file,
              'uid' => 1,
              'status' => 1,
            ));
            $file->save();

            // إسناد كائن الصورة المرفقة للـ Node (الحقل الرئيسي)
            $node->field_image[LANGUAGE_NONE][0] = array(
              'fid' => $file->fid,
              'filename' => $file->filename,
              'uri' => $file->uri,
              'filemime' => $file->filemime,
              'status' => 1,
            );
          }
        }

        // ==================== الحقل الثاني: الصورة الثانوية ====================
        if (!empty($data['secondary_image_filename'])) {
          $sec_image_filename = $data['secondary_image_filename'];
          $sec_image_url = BACKDROP_ROOT . '/' . $profile_path . '/images/' . $sec_image_filename;

          if (file_exists($sec_image_url)) {
            $moved_file_sec = file_unmanaged_copy($sec_image_url, $field_swrt_alkhbr_alryysyt_dir, FILE_EXISTS_REPLACE);
            
            $file_sec = entity_create('file', array(
              'filename' => $sec_image_filename,
              'uri' => $moved_file_sec,
              'uid' => 1,
              'status' => 1,
            ));
            $file_sec->save();

            // ربط الحقل الثانوي باسمه المخصص المعتمد في أنواع المحتوى لديك (مثال: field_secondary_image)
            // تنبيه: تأكد من تطابق اسم الحقل البرمجي تماماً مع الإعدادات في لوحة التحكم
            $node->field_swrt_alkhbr_alryysyt[LANGUAGE_NONE][0] = array(
              'fid' => $file_sec->fid,
              'filename' => $file_sec->filename,
              'uri' => $file_sec->uri,
              'filemime' => $file_sec->filemime,
              'status' => 1,
            );
          }
        }


        // 5. حفظ الـ Node بالكامل دفعة واحدة وبأمان
        node_save($node);
      }
    }
    
    // استدعاء استيراد القوائم تلقائياً كخطوة أخيرة
    abng_news_import_default_menus();
  }
}


/**
 * دالة استيراد قوائم الموقع الافتراضية من ملف JSON مع دعم خصائص menu_attributes.
 */
function abng_news_import_default_menus() {
  $profile_path = backdrop_get_path('profile', 'abng_news');
  $menu_file = $profile_path . '/content/menu.json';

  if (file_exists($menu_file)) {
    $json_data = file_get_contents($menu_file);
    $menu_links = json_decode($json_data, TRUE);

    if (!empty($menu_links)) {
      foreach ($menu_links as $link_data) {
        // بناء مصفوفة رابط القائمة القياسية لنواة Backdrop
        $item = array(
          'link_path' => $link_data['link_path'],
          'link_title' => $link_data['link_title'],
          'weight' => $link_data['weight'],
          'menu_name' => $link_data['menu_name'],
          'language' => LANGUAGE_NONE,
          'options' => array(),
        );

        // [تحديث] التحقق من وجود خصائص menu_attributes وإسنادها (للرابط وللعنصر الخارجي)
        if (!empty($link_data['attributes'])) {
          // 1️⃣ إعداد خصائص الرابط نفسه (Menu link attributes) كما فعلنا سابقاً
          $item['options']['attributes'] = array();
          if (!empty($link_data['attributes']['class'])) {
            $item['options']['attributes']['class'] = is_array($link_data['attributes']['class']) 
              ? $link_data['attributes']['class'] 
              : explode(' ', $link_data['attributes']['class']);
          }

          // 2️⃣ [جديد] إعداد خصائص عنصر القائمة الخارجي <li> (Menu item attributes)
          if (!empty($link_data['item_attributes'])) {
            $item['options']['item_attributes'] = array();
            
            // معالجة كلاسات عنصر القائمة الخارجي <li>
            if (!empty($link_data['item_attributes']['class'])) {
              $item['options']['item_attributes']['class'] = is_array($link_data['item_attributes']['class']) 
                ? $link_data['item_attributes']['class'] 
                : explode(' ', $link_data['item_attributes']['class']);
            }

            // دعم بقية الخصائص لعنصر الـ <li> مثل id أو style أو id المخصص للعنصر
            $supported_item_attrs = array('id', 'style', 'title');
            foreach ($supported_item_attrs as $attr) {
              if (isset($link_data['item_attributes'][$attr])) {
                $item['options']['item_attributes'][$attr] = $link_data['item_attributes'][$attr];
              }
            }
          }

          // دعم بقية خصائص الرابط القياسية السابقة
          $supported_attributes = array('id', 'target', 'rel', 'title', 'name', 'style');
          foreach ($supported_attributes as $attr) {
            if (isset($link_data['attributes'][$attr])) {
              $item['options']['attributes'][$attr] = $link_data['attributes'][$attr];
            }
          }
        }

        
        // حفظ الرابط في قاعدة البيانات برمجياً وبأمان
        menu_link_save($item);
      }
      
      // تحديث كاش القوائم لتظهر الروابط فوراً في الموقع (تم إزالة التكرار)
      state_set('menu_rebuild_needed', TRUE);
    } 
  
    // مسح شامل لكاش الحقول والمحتوى لضمان ظهور الأقسام والصور فوراً دون تدخل يدوي
    cache_clear_all('*', 'cache_field', TRUE);
    entity_get_controller('node')->resetCache();

    abng_news_force_default_layout_config();
  }

  
}

/**
 * دالة قسرية لفرض تعديلات الأنساق والصناديق وتطهير قاعدة البيانات فور التثبيت.
 */

function abng_news_force_default_layout_config() {
  $profile_path = backdrop_get_path('profile', 'abng_news');
  $json_file_path = $profile_path . '/config/layout.layout.default.json';

  if (file_exists($json_file_path)) {
    $json_content = file_get_contents($json_file_path);
    $layout_data = json_decode($json_content, TRUE);

    if (!empty($layout_data)) {
      // 1. فتح نظام إعدادات النسق الافتراضي القياسي للنظام
      $config = config('layout.layout.default');
      
      // 2. دمج وفرض كامل البيانات والمكونات المجلوبة من ملف الـ JSON الخاص بتوزيعتك
      foreach ($layout_data as $key => $value) {
        $config->set($key, $value);
      }
      
      // 3. حفظ التعديلات نهائياً وتفعيلها
      $config->save();
      
      // 4. [البديل الصحيح]: تفريغ ومسح الكاش العميق للأنساق لفرض إعادة البناء والتحديث
      layout_reset_caches();
      cache_clear_all('*', 'cache_layout', TRUE);
      cache_clear_all('*', 'cache_block', TRUE);
      
      // إنعاش السجل لتحديث القوالب ومسارات ظهور الصناديق فوراً
      cache_clear_all('theme_registry', 'cache');
    }
  }
}





