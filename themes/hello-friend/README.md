# Hello Friend Theme for Zola (WIP)

This theme is a Zola port of [hello friend theme for hugo](https://github.com/panr/hugo-theme-hello-friend).

## Installation

```
cd themes
# git clone [repo-url]
```

then set `config.toml` to use this theme:

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

# insert google analytics code inside the `<head></head>` of every page
hello_friend_analytics_code = """
<!-- paste google analytics code here -->
"""

# insert comments on bottom of every posts
hello_friend_comment_code = """
<!-- paste code for comments here, for example disqus -->
"""
```
