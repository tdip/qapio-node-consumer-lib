const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsc = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tsc())
        .pipe(gulp.dest('dist/src'));
});