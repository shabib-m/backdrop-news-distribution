CKEditor 5 Font Plugin
======================

This module enables the font plugin for CKEditor 5, which
allows editors to change font family, size, color, and background color.

**Important caveat:** due to the way the Filter system works, the font family,
color, and background color options will only work if **Limit allowed HTML tags** 
is turned off.

The plan is to also port over either the WYSIWYG Filter or the HTML Purifier Filter
modules to relieve this constraint.

![Screenshot of module](https://raw.githubusercontent.com/backdrop-contrib/ckeditor5_font_plugin/refs/heads/1.x-1.x/screenshots/screen1.png)


Installation
------------

- Install this module using the [official Backdrop CMS instructions](https://docs.backdropcms.org/documentation/extend-with-modules).

- Visit admin/config/content/formats to add the new Font, Font Size, Font Color, and Font Background buttons to
  your editor's toolbar.

- **Turn off the Limit allowed HTML tags** option.


Current Maintainers
-------------------

- [Richard Peacock](https://github.com/swampopus) (original creator for Backdrop CMS)
- Seeking additional maintainers.


License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.
