---
title: How the sausage is made...
render_with_liquid: false
---
I've entirely re-written the blog generation with Jekyll and doing the rendering
and publishing directly through [GitHub Actions]. It was a nice ride - rather
easy all the way though, and leaving a magical sense of "It Does Just Work".

It basically involves a set-up with two branches:
- `source` is the branch containing the Jekyll source for the blog
- `master` which is the branch [GitHub Pages] publishes user pages from (it may
  be `gh-pages` or something else in different contexts)

The blog is a vanialla [Jekyll] project with nothing special to it. The upsides
from using it in this setup however is that I am not limited to what [GitHub
Pages] allows: I can use any plug-in I want, such as using a HAML preprocessor!

Then, everything is glued up using the [GitHub Actions] workflow:

```yaml
---
name: Continuous Delivery

on:
  pull_request:
    branches:
      - source
  push:
    branches:
      - source

jobs:
  CI-CD:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout source
        uses: actions/checkout@v2
        with:
          path: source
      - name: Setup Ruby
        uses: actions/setup-ruby@v1
        with:
          ruby-version: ^2.6.x
      - name: Gem Cache
        uses: actions/cache@v1
        with:
          path: source/vendor/bundle
          key: ${{ runner.os }}-gem-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gem-
      - name: Install Dependencies
        working-directory: ./source
        run: |
          gem install bundler
          bundle config path vendor/bundle
          bundle install --jobs 4 --retry 3
      - name: Jekyll Build
        working-directory: ./source
        run: bundle exec jekyll build
      - name: Checkout master
        uses: actions/checkout@v2
        with:
          path: master
          ref: master
          token: ${{secrets.GITHUB_PAT}}
      - name: Configure Git
        working-directory: ./master
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Actions"
      - name: Preparing Release
        working-directory: ./master
        run: |
          rsync --delete --exclude=.git --recursive --verbose ../source/_site/ ./
          touch .nojekyll
          git add .
          git diff --exit-code --quiet HEAD || git commit -m "chore: publish from ${GITHUB_SHA}"
      - name: Release
        if: github.event_name == 'push'
        working-directory: ./master
        run: |
          git push origin master
```

[GitHub Actions]: https://github.com/features/actions
[GitHub Pages]: https://pages.github.com
[Jekyll]: https://jekyllrb.com
