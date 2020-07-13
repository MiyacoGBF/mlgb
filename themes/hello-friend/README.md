# Hello Friend Theme for Zola (WIP)

This theme is a Zola port of [hello friend theme for hugo](https://github.com/panr/hugo-theme-hello-friend).

This theme only supports Zola v0.12.0 (currently on `next` branch) or newer.

## Installation

```
cd themes
# git clone [repo-url]
```

Then edit `config.toml` to use this theme:

```
theme = "hello-friend"
```

## Configuration

This theme supports `tags` taxonomy by default:

```toml
taxonomies = {
    {name = "tags", paginate_by = 5}
}
```

Other configurations:

```toml
[extra]
# author name on the page footer with copyright, and default author for posts
author = "your-name"

# menus on the page header
hello_friend_menu = [
  {url = "$BASE_URL", name = "Home"},
  {url = "$BASE_URL/about", name = "About"},
  {url = "$BASE_URL/tags", name = "Tags"},
  {url = "$BASE_URL/contact", name = "Contact"},
]

# change cursor color on page header and footer
hello_friend_cursor_color = "#fe5186"
```

## Extending Theme

This theme has some user extensible templates.

Available templates are:

* `templates/shortcodes/prepended_head.html`
    * insert custom html at the beginning of the `<head>` section in all pages/sections
* `templates/shortcodes/extended_head.html`
    * insert custom html at the end of the `<head>` section in all pages/sections
* `templates/shortcodes/extended_page.html`
    * insert custom html at the bottom of each *page* (useful for comment script)
* `templates/shortcodes/extra_scripts.html`
    * insert custom html at the end of the `<body>` section in all pages/sections

## Additional Shortcode

This theme provides a shortcode `modal_image(id, path, width)`, which inserts a clickable image thumbnail to the page and when clicked it, show large image which covers the page.

Example usage:

```
modal_image(id="sample-1", path="path/to/image", width="50%")
```

Parameters:

* `id` (mandatory): ID for the image. Should not duplicate in the same page.
* `path` (mandatory): Path to the image to show.
* `width` (optional): width of the thumbnail image. Defaults to `100%`.
