const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const { reload } = require('browser-sync');
const browseSync = require('browser-sync').create();
const { path } = require('./gulp/const')

function cleanDist() {
    return src(path.dest, { read: false, allowEmpty: true }).pipe(clean());
}

function copyJs() {
    return src(path.srcJs)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dest));
}

function copyHtml() {
    return src(path.srcHtml).pipe(dest(path.dest));
}

function copyImage() {
    return src(path.srcImage)
        .pipe(dest('dist/image'))
}

function copyFonts() {
    return src(path.srcFonts)
        .pipe(dest('dist/fonts'))
}

function copyStyle() {
    return src(path.srcStyle)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            {
                overrideBrowserslist: ['last 8 versions'],
                browsers: [
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24',
                    'Explorer >= 11',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6',
                ],
            }
        ))
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.dest));
}

function build() {
    return series(
        cleanDist,
        parallel(
            copyHtml,
            copyJs,
            copyStyle,
            copyImage,
            copyFonts
        )
    );
}

function server(done) {
    browseSync.init({
        server: {
            baseDir: path.dest,
        }
    });

    watch('./src/index.html', series(copyHtml, reloadBrowser));
    watch('./src/scripts/**/*.js', series(copyJs, reloadBrowser));
    watch('./src/style/**/*.scss', series(copyStyle, reloadBrowser));
    watch('./src/image/**/*.*', series(copyImage, reloadBrowser));

    done();
}

function reloadBrowser(done) {
    browseSync.reload();
    done()
}

function serve() {
    return series(build(), server);
}

module.exports.build = build();
module.exports.serve = serve();