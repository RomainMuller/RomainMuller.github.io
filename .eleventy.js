const crypto = require('node:crypto');
const fs = require('node:fs').promises;
const sync = require('node:fs');
const path = require('node:path');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const rss = require('@11ty/eleventy-plugin-rss');
const md = require('markdown-it');
const mdAnchor = require('markdown-it-anchor');
const sass = require('sass');

module.exports = function (/** @type import('@11ty/eleventy').UserConfig */ eleventyConfig) {
  const cname = 'www.romainmuller.dev';
  eleventyConfig.addGlobalData('site', {
    author: 'Romain Marcadier',
    cname,
    description: `GeekyThoughts is Romain Marcadier's personal blog, which discusses software engineering, computer science, and other geeky topics.`,
    name: 'GeekyThoughts',
    url: `https://${cname}`,
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(rss);

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });

  const date = (date, month = 'short') => {
    const human = Intl.DateTimeFormat(
      'en-US',
      {
        day: 'numeric',
        month,
        year: 'numeric',
      },
    ).format(date);
    return `<time datetime="${date.toISOString().slice(0, 10)}">${human}</time>`;
  };
  eleventyConfig.addShortcode('date', date);

  eleventyConfig.addShortcode('mdate', ({ inputPath }, month) => {
    const stat = sync.statSync(path.resolve(inputPath));
    return date(stat.mtime, month);
  });

  eleventyConfig.addShortcode('mtime', async ({ inputPath }) => {
    const stat = await fs.stat(path.resolve(inputPath));
    return stat.mtime.toISOString();
  });

  eleventyConfig.addAsyncShortcode('link', async (rel, href) => {
    // May need to wait for the file to be re-compiled...
    await upToDate(eleventyConfig, href);

    const content = await fs.readFile(path.join(eleventyConfig.dir.output, href));
    const hash = crypto.createHash('sha512')
      .update(content)
      .digest('hex');

    return `<link rel="${rel}" href="${href}?v=${hash}">`
  });
  eleventyConfig.addAsyncShortcode('script', async (src) => {
    // May need to wait for the file to be re-compiled...
    await upToDate(eleventyConfig, src);

    const content = await retry(fs.readFile)(path.join(eleventyConfig.dir.output, src));
    const hash = crypto.createHash('sha512')
      .update(content)
      .digest('hex');

    return `<script src="${src}?v=${hash}"></script>`
  });

  eleventyConfig.addShortcode('icon', (name, width = '1.1em', height = width, ...classes) => {
    const clazz = ['bi', ...classes].join(' ');
    return `<svg class="${clazz}" width="${width}" height="${height}" fill="currentColor" aria-hidden="true"><use xlink:href="/img/bootstrap-icons.svg#${name}"></use></svg>`;
  });

  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    compile: function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith('_')) {
        return undefined;
      }

      const result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || '.',
          this.config.dir.includes,
          path.join(this.config.dir.input, 'node_modules'),
        ],
      });
      this.addDependencies(inputPath, result.loadedUrls);
      return () => Promise.resolve(result.css);
    },
    getData: () => ({ eleventyExcludeFromCollections: true }),
    outputFileExtension: 'css',
  });

  eleventyConfig.addPassthroughCopy('img/**/*.svg', { expand: true });
  eleventyConfig.addPassthroughCopy('img/**/*.jpg', { expand: true });
  eleventyConfig.addPassthroughCopy('img/**/*.png', { expand: true });
  eleventyConfig.addPassthroughCopy('.gitattributes');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('robots.txt');

  eleventyConfig.setLibrary('md',
    md({
      html: true,
    }).use(mdAnchor, {
      level: 1,
    }));

  eleventyConfig.addTransform('stip-source-map', function (content) {
    if (!this.outputPath.endsWith('.js')) {
      return content;
    }
    return content.replaceAll(/^[/]{2}#\s*sourceMappingURL=.+$/gm, '').trim();
  });

  return {
    markdownTemplateEngine: 'njk',
  };
};

async function upToDate(config, href) {
  switch (path.extname(href)) {
    case '.css':
      const source = path.join(config.dir.input, href.replace(/\.css$/, '.scss'));
      if (!await exists(source)) {
        return;
      }
      const dest = path.join(config.dir.output, href);
      const srcTime = await fs.stat(source).then(stat => stat.mtimeMs);
      let dstTime = await fs.stat(source).then(stat => stat.mtimeMs);
      while (dstTime < srcTime) {
        await new Promise((ok) => setTimeout(ok, 150));
        dstTime = await fs.stat(source).then(stat => stat.mtimeMs);
      }
    default:
      return;
  }
}

async function exists(file) {
  try {
    await fs.stat(file);
    return true;
  } catch {
    return false;
  }
}

function retry(attempt) {
  return async (...args) => {
    const errors = [];
    while (errors.length < 3) {
      try {
        return await attempt(...args);
      } catch (err) {
        errors.push(err);
        await new Promise((ok) => setTimeout(ok, 150));
      }
    }
    throw new Error(`Failed after ${errors.length} retries:\n- ${errors.join('\n- ')}`);
  };
}