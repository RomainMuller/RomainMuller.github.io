const { spawn } = require('child_process');
const log = require('fancy-log');
const gulp = require('gulp');
const filter = require('gulp-filter');
const hash = require('gulp-hash');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

gulp.task('css', () =>
  gulp.src('_assets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: path.join(__dirname, '_sass'),
    }))
    .pipe(hash({ algorithm: 'sha256', hashLength: 8 }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets'))
    .pipe(hash.manifest('assets/manifest.json', {
      append: true,
      space: 2,
      deleteOld: true,
    }))
    .pipe(gulp.dest('.'))
);

gulp.task('images', () =>
  gulp.src('_assets/**/*')
    .pipe(filter(['**', '!**/*.scss']))
    .pipe(hash({ algorithm: 'sha256', hashLength: 8 }))
    .pipe(gulp.dest('assets'))
    .pipe(hash.manifest('assets/manifest.json', {
      append: true,
      space: 2,
      deleteOld: true,
    }))
    .pipe(gulp.dest('.'))
);

gulp.task('assets', gulp.series(['css', 'images']));

gulp.task('jekyll', () => {
  const jekyll = spawn('bundle', ['exec', 'jekyll', 'build']);
  const logger = buffer => buffer.toString().split(/\n/).forEach(msg => log(`Jekyll: ${msg}`));
  jekyll.stdout.on('data', logger);
  jekyll.stderr.on('data', logger);
  return jekyll;
});

gulp.task('watch', () =>
  gulp.watch('_assets/**/*', ['assets'])
);

gulp.task('default', gulp.series(['assets', 'jekyll']));
