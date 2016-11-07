const gulp = require('gulp')
const less = require('gulp-less')

// Instance of ProcessManager
const processManager = require('electron-connect').server.create()
const args = process.argv.splice(2) || []

gulp.task('default', ['less'], () => {
  // Start browser process
  processManager.start(args)
  // Restart browser process
  gulp.watch([
    './src/main.js',
    './src/main-process/**/*.js'
  ], () => {
    processManager.restart(args)
  })
  // Reload renderer process
  gulp.watch([
    './src/index.js',
    './src/renderer-process/**/*.js',
    './src/windows/**/*.html',
    './src/assets/**/*.{less,js,css}'
  ], processManager.reload)
})

gulp.task('less', () => {
  gulp.watch([
    './src/assets/**/*.less'
  ], () => {
    console.log('compile less files')
    gulp.src('./src/assets/less/index.less')
      .pipe(less())
      .pipe(gulp.dest('./src/assets/css'))
  })
})
