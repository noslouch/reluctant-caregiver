// generated on 2016-04-20 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import mainBowerFiles from 'main-bower-files';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('source/sass/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('source/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('scripts.min.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

gulp.task('vendor:js', () => {
  return gulp.src(mainBowerFiles('**/*.js'))
    .pipe($.concat('vendor.min.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('vendor:css', () => {
  return gulp.src(mainBowerFiles('**/*.css'))
    .pipe($.concat('vendor.min.css'))
    .pipe(gulp.dest('.tmp'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('source/js/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('minify', ['vendor:js', 'vendor:css', 'styles', 'scripts'], () => {
  return gulp.src(['.tmp/**/*.js', '.tmp/**/*.css'])
    .pipe($.if(/.*js/, $.uglify()))
    .pipe($.if(/.*css/, $.cssnano()))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('images', () => {
  return gulp.src('source/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('public/dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(mainBowerFiles('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('source/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'public/dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('source/sass/**/*.scss', ['styles']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  gulp.watch('source/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('watch', ['vendor:js', 'vendor:css', 'styles', 'scripts', 'fonts'], () => {
  let sources = [
    '.tmp/caregiver.css',
    '.tmp/scripts.min.js',
    '.tmp/scripts.min.js.map',
    '.tmp/vendor.min.css',
    '.tmp/vendor.min.js'
  ];

  gulp.src(sources)
    .pipe(gulp.dest('public/dist'));

  gulp.watch(sources)
    .on('change', ({ path }) => {
      gulp.src(path)
        .pipe(gulp.dest('public/dist'));
    });

  gulp.watch('source/sass/**/*.scss', ['styles']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  gulp.watch('source/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['vendor:js', 'vendor:css', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['lint', 'minify', 'images', 'fonts'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
