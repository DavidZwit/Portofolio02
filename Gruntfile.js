module.exports = function(grunt) {
  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* For creating a server to test on */
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: ['tools', '_build/dev']
                }
            }
        },
        /* For typescript transpiling */
        ts: {
            options: {
                module: 'amd',
                target: 'es5',
                sourceMap: false,
                declaration: false,
                allowJS: true,
                outFile: "_build/dev/logic.min.js"
            },            
            dev: {
                src: ['node_modules/pixi.js/dist/pixi.min.js', 'workspace/ts/**/*.ts'],
                dest: '_build/dev/logic.min.js'
            }
        },
        /* For live reloading */
        watch: {
            options: {
                livereload: true
            },

            typescript: {
                files: ['workspace/ts/**/*.ts'],
                tasks: ['ts:dev']
            },
            assets: {
                files: ['workspace/assets/**/*.*', 'workspace/index.html'],
                tasks: ['copy:dev', 'ts:dev']
            },
            css: {
                files: ['workspace/css/main.css'],
                task: ['copy:dev', 'ts:dev']
            },
            sass: {
                files: ['workspace/sass/**/*.sass', 'workspace/sass/**/*.scss'],
                task: ['sass:dev']
            }
        },
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'workspace/assets', dest: '_build/dev/assets', src: ['**/*']},
                    {expand: true, cwd: 'workspace', dest: '_build/dev', src: ['index.html']},
                    {expand: true, cwd: 'workspace/css', dest: '_build/dev', src: ['main.css']},
                ]
            }
        }, 
        sass: {
            dev: {
                files: {
                    './_build/dev/min.css': './workspace/sass/main.scss'
                },
                options: {
                    style: 'expended'
                    
                }
            }
        }
    });

    /* plugins */
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-ts');

    /* default tasks */
    grunt.registerTask('dev', [
        'copy:dev',
        'ts:dev',
        'sass:dev',
        'connect:server',
        'watch'
    ]);

};