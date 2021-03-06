let gulp = require('gulp');
let sync = require('browser-sync').create();
let nodemon = require('gulp-nodemon');

let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let prefix = require('gulp-autoprefixer');
let sourcemap = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');


gulp.task('cpscripts',() => {
    return gulp.src(
        ["./node_modules/bootstrap/dist/js/bootstrap.min.js",
            "./node_modules/jquery/dist/jquery.min.js",
            "./node_modules/moment/min/moment.min.js"
        ])
        .pipe(gulp.dest("./public/scripts/"));
});

gulp.task('tinymce',() => {
    return gulp.src("./node_modules/tinymce/**/*")
        .pipe(gulp.dest("./public/scripts/tinymce"));
});

gulp.task('scripts',() => {
    return gulp.src("./src/assets/scripts/*")
        .pipe(sourcemap.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/assets/css/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(cssnano()) // Minify CSS
        .pipe(rename({suffix: '.min'})) // Minify CSS
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest( './public/css' ));
});


gulp.task('serve',gulp.series(['sass','cpscripts','scripts','tinymce'],() => {
    sync.init({
        proxy: {
            target: "localhost:3500",
            ws: true
        },
    });
    nodemon({
        // the script to run the app
        script: './src/index.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["src/*.js",'src/**/*.js'],
        ignore: ["src/assets/**/*"],
        env: {
            "COOKIE_SECRET": "1245",
            "DATABASE":"forum",
            "DB_USER":"datauser",
            "DB_PASSWORD":"toto",
            "DB_HOST":"localhost",
            "DB_DIALECT":"mysql",
            "SRV_PORT":3500
        },
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart',(f) => {
        sync.reload();
    });
    gulp.watch("views/*.pug").on('change', sync.reload);
    gulp.watch("public/images/*").on('change', sync.reload);
    gulp.watch("src/assets/css/*.scss").on('change',gulp.series('sass',sync.reload));
    gulp.watch("src/assets/scripts/*.js").on('change',gulp.series('scripts',sync.reload));
}));

