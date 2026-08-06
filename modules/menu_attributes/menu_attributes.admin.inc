<?php
/**
 * @file
 * Administrative settings forms for Menu Attributes module.
 */


/**
 * Form callback; Displays settings for Menu Attributes module.
 */
function menu_attributes_settings_form($form, $form_state) {
  $form['help'] = array(
    '#type' => 'help',
    '#markup' => t('These settings affect links created in all menus. Menu attributes may be added to both the menu link itself, as well as the surrounding list item.'),
  );

  $form['#config'] = 'menu_attributes.settings';

  $form['attributes_title'] = array(
    '#type' => 'item',
    '#title' => t('Menu item attribute options'),
  );
  $form['attributes_vertical_tabs'] = array(
    '#type' => 'vertical_tabs',
    '#attached' => array(
      'js' => array(backdrop_get_path('module', 'menu_attributes') . '/js/menu_attributes.js'),
    ),
  );

  $attributes = menu_attributes_get_menu_attribute_info();
  foreach ($attributes as $attribute => $info) {
    $form[$attribute] = array(
      '#type' => 'fieldset',
      '#title' => $info['label'],
      '#group' => 'attributes_vertical_tabs',
      '#description' => $info['form']['#description'],
    );
    $form[$attribute]["{$attribute}_enable"] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable the @attribute attribute.', array('@attribute' => $info['label'])),
      '#default_value' => $info['enabled'],
    );
    $form[$attribute]["{$attribute}_default"] = array(
        '#title' => t('Default'),
        '#description' => '',
        '#states' => array(
          'invisible' => array(
            'input[name="' . $attribute . '_enable"]' => array('checked' => FALSE),
          ),
        ),
      ) + $info['form'];
  }

  return system_settings_form($form);
}

function menu_attributes_form_menu_edit_menu_submit(&$form, &$form_state) {
  $config = config('menu_attributes.settings');
  $config->setData($form_state['values']['menu_attributes']);
  $config->save();
}
