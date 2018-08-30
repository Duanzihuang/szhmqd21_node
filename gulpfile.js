/**
 * 它的作用:就是写一些代码来压缩和混淆我们src下面的源代码
 */

'use strict'

//1.0 导入需要的资源
var gulp = require('gulp')
// 保证任务执行的顺序
const runSequence = require('run-sequence')
// 运行之前，把dist目录干掉
const clean = require('gulp-clean')

//2.0 gulp来执行任务，默认会执行defalut的任务
//定义任务,gulp默认执行名称为default的任务
//将来我们只需要执行：gulp所有任务全部搞定
gulp.task('default', () => {
  console.log('default执行完毕!')

  // 先执行 clean ，再执行压缩js，css，html等任务
  runSequence('clean', ['es6toes5anduglify', 'mincss','htmlmin'])
})

//3.0 es6转es5的任务,及压缩js的任务
//导入各自需要的包
/**
    注意事项:
        1.uglify是不支持es6语法的，所以必须先调用babel({"presets": ["es2015"]})，将其转成es5语法，然后再调用
         uglify()进行js压缩

        2.gulp.src中的第二个参数必须要写,否则不会将src中的目录结构生成到dist中去
*/
const babel = require('gulp-babel') //es6转es5需要的包
const uglify = require('gulp-uglify') //js压缩需要的包

gulp.task('es6toes5anduglify', () => {
  gulp
    .src(
      [
        './src/controllers/*.js',
        './src/routers/*.js',
        './src/tools/*.js',
        './src/app.js'
      ],
      { base: 'src' }
    ) // base就是js 源码存放的路径
    .pipe(babel({ presets: ['env'] })) //转成es5语法
    .pipe(uglify()) //压缩js
    .pipe(gulp.dest('dist')) //转换成 ES5 存放的路径,最终存放的路径
})

//4.0 压缩css
//导入需要的包
const mincss = require('gulp-clean-css') //压缩css的包

gulp.task('mincss', () => {
  gulp
    .src(['./src/statics/css/*.css'], { base: 'src' })
    .pipe(mincss({ compatibility: 'ie8' })) //兼容IE8
    .pipe(gulp.dest('dist'))
})

//5.0 对html进行压缩
const htmlmin = require('gulp-htmlmin') //压缩html的

gulp.task('htmlmin', () => {
  gulp
    .src(['./dist/rev/*.json','./src/statics/views/*.html'], { base: 'src' })
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true
      })
    ) //表示将空白行及换行都压缩掉
    .pipe(gulp.dest('dist'))
})

//6.0 执行清楚任务，删除掉dist,rev目录
gulp.task('clean', function() {
  return gulp.src(['dist']).pipe(clean())
})
