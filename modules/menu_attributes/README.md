# Menu Attributes

This simple module allows you to specify some additional attributes for menu
items such as id, name, class, style, and rel.

You should use this module when:

* You want to "nofollow" certain menu items to sculpt the flow of PageRank
  through your site.
* You want to give a menu item an ID so you can easily select
  it using jQuery.
* You want to add additional classes or styles to a menu item.

The module currently allows you to set the following attributes for each menu
item or menu link:

* id
* name
* target
* rel
* class
* style
* accesskey

## Installation

1. To install the module copy the 'menu_attributes' folder to your
   */modules* directory.
2. Go to admin/modules. Filter for 'Menu Attributes' and enable the module.

## Configuration

1. Go to *admin/config/people/permissions*. Filter for the 'Menu Attributes'
   section. Set appropriate permissions.
2. Go to *admin/structure/menu/attributes* to configure which attributes should
   be available when configuring a menu. By default only "title" and "class"
   attributes are enabled.
3. Select the menu links you want to edit (In this example we will edit the menu
   'Primary Navigation').
5. Under operations for that menu, click 'Edit links'.
6. Click on any 'Edit' link under the 'Operations' column.
7. Scroll down the page to find the 'Menu link attributes' and 'Menu item
   attributes' sections. Expand either section by clicking on it.

    a. **Menu link attributes** are added to the `<a>` link element. Follow
       instructions on screen.

    b. **Menu item attributes** are added to the `<li>` list element for that
       link. Follow instructions on screen.

10. Click the 'Save' button.

Another way of setting menu attributes is to edit any page, scroll to 'Menu
settings' and click the checkbox for 'Provide a menu link'. This will reveal the
options for this menu item, including 'Menu link attributes' and 'Menu item
attributes'. Follow instructions on screen.

License
-------

This project is GPL v2 or higher software. See the LICENSE.txt file in this
directory for complete text.

Current Maintainers
-------------------

- [Nate Lampton](https://backdropcms.org/account/quicksketch)
- [Greg Netsas](https://backdropcms.org/account/klonos)
- Seeking additional maintainers.

Credits
-------

This module is based on the Menu Attributes module for Drupal, originally
written and maintained by the following contributors:

- [Joel Pittet (joelpittet)](https://www.drupal.org/u/joelpittet)
- [Andrei Mateescu (amateescu)](https://www.drupal.org/u/amateescu)
- [Dave Reid (dave-reid)](https://www.drupal.org/u/dave-reid)
- [Nick Schoonens (Schoonzie)](https://www.drupal.org/u/schoonzie)
