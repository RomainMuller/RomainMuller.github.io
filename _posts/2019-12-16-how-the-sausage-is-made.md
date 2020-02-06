---
excerpt_separator: <!-- MORE -->
tags: [meta, github]
title: How the sausage is made...
---
I've entirely re-written the blog generation with Jekyll and doing the rendering
and publishing directly through [GitHub Actions]. It was a nice ride - rather
easy all the way though, and leaving a magical sense of "It Does Just Work".

It basically involves a set-up with two branches:
- `source` is the branch containing the Jekyll source for the blog
- `master` which is the branch [GitHub Pages] publishes user pages from (it may
  be `gh-pages` or something else in different contexts)

<!-- MORE -->

The blog is a vanialla [Jekyll] project with nothing special to it. The upsides
from using it in this setup however is that I am not limited to what [GitHub
Pages] allows: I can use any plug-in I want, such as using a HAML preprocessor!

Then, everything is glued up using the [GitHub Actions] workflow:

{% gist '92a26ffcad4cabc2fc5ef93abf2eaca4' %}

[GitHub Actions]: https://github.com/features/actions
[GitHub Pages]: https://pages.github.com
[Jekyll]: https://jekyllrb.com
