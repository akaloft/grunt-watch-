module.exports = function (grunt) {
    'use strict';

    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                options: {
                    separator: '\n\r',
                    sourceMap: true,
                    banner: ''
                },
                src: [
                    'app/static/js/jquery.min.js',
                    'app/static/js/plugins/**/*.js',
                    'app/static/js/modules/**/*.js',
                    'app/static/js/pages/**/*.js'
                ],
                dest: 'app/static/dist/app.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourceMap: true,
                    implementation: sass
                },
                files: {
                    'app/static/dist/app.css': 'app/static/css/project.scss'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                sourceMapIn: 'app/static/dist/app.js.map'
            },
            build: {
                src: ['app/static/dist/app.js'],
                dest: 'app/static/dist/app.min.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/static/dist',
                    src: ['app.css'],
                    dest: 'app/static/dist',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            css: {
                files: ['app/static/dist/app.css', 'app/static/css/project.scss'],
                tasks: ['cssmin', 'sass']
            },
            js: {
                files: ['app/static/**/*.js'],
                tasks: ['uglify', 'concat']
            }

        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['watch', 'cssmin', 'concat', 'uglify', 'sass']);
};