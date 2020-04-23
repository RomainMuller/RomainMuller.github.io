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

gulp.task('jekyll', done => {
  const process = spawn('bundle', ['exec', 'jekyll', 'build']);

  const logger = buffer => buffer.toString().split(/\n/).forEach(msg => log(`Jekyll: ${msg}`));
  process.stdout.on('data', logger);
  process.stderr.on('data', logger);

  process.on('exit', (code, signal) => {
    if (code !== 0) {
      return done(`Process ${code != null ? `exited with ${code}` : `killed by ${signal}`}`);
    }
    return done();
  });
});

gulp.task('watch', () =>
  gulp.watch('_assets/**/*', ['assets'])
);

gulp.task('default', gulp.series(['assets', 'jekyll']));
