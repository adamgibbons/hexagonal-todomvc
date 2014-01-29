'user strict'

module.exports = (grunt) ->
  # Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    watch:
      core:
        files: ['todo/*.js', '!todo/*.spec.js']
        tasks: ['concat:core']
      livereload:
        options:
          livereload: '<%= connect.options.livereload %>'
        files:
          'public/**/*.{html,css.js}'

    concat:
      core:
        files:
          '.tmp/todomvc.js': ['todo/index.js', 'todo/*.js', '!todo/*.spec.js']
          '.tmp/todomvc.storage.js': ['todo/storage/*.js']

    connect:
      options:
        port: 9000
        hostname: '*'
        livereload: 35729
      livereload:
        options:
          open: true
          base: [ '.tmp', 'public', '.' ]

    karma:
      options:
        browsers: ['Chrome', 'Firefox', 'Safari']
        files: [
          'bower_components/expect/expect.js'
          'todo/index.js'
          'todo/storage/localstorage.js'
          'todo/*.js'
          'todo/*.spec.js'
        ]
        frameworks: ['mocha']
      continuous:
        singleRun: true
      dev:
        reporters: 'dots'

  grunt.registerTask('serve', [
    'concat:core'
    'connect:livereload'
    'watch'
  ])

  grunt.registerTask('test', [
    'karma:continuous'
  ])
