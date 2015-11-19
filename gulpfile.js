'use strict';
var gulp = require('gulp');
var minimist = require('minimist');
var requireDir = require('require-dir');
var chalk = require('chalk');
var fs = require('fs');

// config
gulp.paths = {
  dist: 'www',
  jsFiles: ['app/**/*.js', '!app/bower_components/**/*.js', '!app/**/*.spec.js'],
  jsonFiles: ['app/**/*.json', '!app/bower_components/**/*.json'],
  templates: ['app/*/templates/**/*', 'app/*/directives/**/*.html'],
  karma: ['test/karma/**/*.js'],
  protractor: ['test/protractor/**/*.js']
};

// OPTIONS
var options = gulp.options = minimist(process.argv.slice(2));

// set defaults
var task = options._[0]; // only for first task
var gulpSettings;
if (fs.existsSync('./gulp/.gulp_settings.json')) {
  gulpSettings = require('./gulp/.gulp_settings.json');
  var defaults = gulpSettings.defaults;
  if (defaults) {
    // defaults present for said task?
    if (task && task.length && defaults[task]) {
      var taskDefaults = defaults[task];
      // copy defaults to options object
      for (var key in taskDefaults) {
        // only if they haven't been explicitly set
        if (options[key] === undefined) {
          options[key] = taskDefaults[key];
        }
      }
    }
  }
}

// environment
options.env = options.env || 'dev';
// print options
if (defaults && defaults[task]) {
  console.log(chalk.green('defaults for task \'' + task + '\': '), defaults[task]);
}
// cordova command one of cordova's build commands?
if (options.cordova) {
  var cmds = ['build', 'run', 'emulate', 'prepare', 'serve'];
  for (var i = 0, cmd; ((cmd = cmds[i])); i++) {
    if (options.cordova.indexOf(cmd) >= 0) {
      options.cordovaBuild = true;
      break;
    }
  }
}

options.socketIoUrl = {
  'dev' : 'http://localhost:3000/socket.io/socket.io.js',
  'prod': 'http://www.wildwordwest.com:3001/socket.io/socket.io.js'
}

// load tasks
requireDir('./gulp');

// default task
gulp.task('default', function () {
  // cordova build command & gulp build
  if (options.cordovaBuild && options.build !== false) {
    return gulp.start('cordova-with-build');
  }
  // cordova build command & no gulp build
  else if (options.cordovaBuild && options.build === false) {
    return gulp.start('cordova-only-resources');
  }
  // cordova non-build command
  else if (options.cordova) {
    return gulp.start('cordova');
  }
  // just watch when cordova option not present
  else {
    return gulp.start('watch');
  }
});
