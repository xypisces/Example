var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
 
//定义css、js源文件路径
var cssSrc = './dist/*.css',
    jsSrc = './dist/*.js',
    Static = './dist/static/*.*';
 

gulp.task('Static', function(){
  return gulp.src(Static)
      .pipe(gulp.dest('./dest/static'));
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(gulp.dest('./dest/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dest/css'));
});
 
 
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())                                //给文件添加hash编码
        .pipe(gulp.dest('./dest/'))
        .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录
        .pipe(gulp.dest('./dest/js'));
});
 
 
//Html替换css、js文件版本
gulp.task('revHtmlCss', function () {
    return gulp.src(['./dest/css/*.json', './dist/index.html'])
        .pipe(revCollector())                         //替换html中对应的记录
        .pipe(gulp.dest('./dest'));                     //输出到该文件夹中
});
gulp.task('revHtmlJs', function () {
    return gulp.src(['./dest/js/*.json', './dest/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dest'));
});
 
 
//开发构建
gulp.task('dev', function (done) {
    condition = false;
    //依次顺序执行
    runSequence(
        ['Static'],
        ['revCss'],
        ['revHtmlCss'],
        ['revJs'],
        ['revHtmlJs'],
        done);
})