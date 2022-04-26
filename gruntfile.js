/**
 * @author: Raja
 * @description: <grunt file description>
 * @requires: <grunt packages lists>
 */
 module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// all files destination (example)
	const backupsDestination = './backups/';
	const sassDistDestination = './src/dist/';

	// node-glob syntax
	const includeAllFiles = ['**/*', '.*/**/*', '**/.*', '**/.*/**/*'];

	/**
	 * ~ ALL GRUNT PLUGINS CONFIG ~
	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		/**
		 * Conatenate files
		 */
		concat: {
			dev: {
				// example
				src: ['./src/file-a', './src/file-b'], // all files to concat
				dest: './src/file-c', // output
			},
		},

		/**
		 * Validate js files
		 */
		jshint: {
			options: {
				esversion: 11, // ecmascript version to use
				strict: false, // strict mode
			},
			dev: ['./gruntfile.js', './src/index.js', './src/components/**/*.js'], // js files to verify
		},

		/**
		 * Replace text in files using strings, regexs or functions.
		 */
		replace: {
			// example
			dev: {
				src: ['./src/test-replace'], // working file
				overwrite: true,
				replacements: [
					{
						from: 'red',
						to: 'blue',
					},
				],
			},
		},

		/**
		 * Compile sass to css
		 */
		sass: {
			dist: {
				options: {
					style: 'compressed',
				},
				files: [
					// scss file list
					{
						src: ['./src/index.scss'],
						dest: sassDistDestination + 'index.min.css',
					},
					{
						src: ['./src/components/editor/editor.scss'],
						dest: sassDistDestination + 'editor.min.css',
					},
				],
			},
		},

		babel: {
			// example
			options: {
				sourceMap: false,
				presets: ['@babel/preset-react'], // for react env
			},
			dist: {
				files: {
					'test/myfile.js': 'dist/myfiles.js',
				},
			},
		},

		/**
		 * Run shell commands
		 */
		shell: {
			test: {
				command: ['echo ""'].join('&&'),
			},
		},

		/**
		 * Compress files and folders (incremental backup)
		 */
		compress: {
			main: {
				options: {
					archive: backupsDestination + 'main.tar.gz',
				},
				files: [{ src: ['./*', './.*'] }],
				filter: 'isFile',
			},
			config: {
				options: {
					archive: backupsDestination + 'config.tar.gz',
				},
				expand: true,
				cwd: './config/',
				src: includeAllFiles,
				dest: 'config',
			},
			docs: {
				options: {
					archive: backupsDestination + 'docs.tar.gz',
				},
				expand: true,
				cwd: './docs/',
				src: includeAllFiles,
				dest: 'docs',
			},
			extension: {
				options: {
					archive: backupsDestination + 'extension.tar.gz',
				},
				expand: true,
				cwd: './extension/',
				src: includeAllFiles,
				dest: 'extension',
			},
			modules: {
				options: {
					archive: backupsDestination + 'modules.tar.gz',
				},
				expand: true,
				cwd: './modules/',
				src: includeAllFiles,
				dest: 'modules',
			},
			node_modules: {
				options: {
					archive: backupsDestination + 'node_modules.tar.gz',
				},
				expand: true,
				cwd: './node_modules/',
				src: includeAllFiles,
				dest: 'node_modules',
			},
			scripts: {
				options: {
					archive: backupsDestination + 'scripts.tar.gz',
				},
				expand: true,
				cwd: './scripts/',
				src: includeAllFiles,
				dest: 'scripts',
			},
			src: {
				options: {
					archive: backupsDestination + 'src.tar.gz',
				},
				expand: true,
				cwd: './src/',
				src: includeAllFiles,
				dest: 'src',
			},
			test: {
				options: {
					archive: backupsDestination + 'test.tar.gz',
				},
				expand: true,
				cwd: './test/',
				src: includeAllFiles,
				dest: 'test',
			},
			public: {
				options: {
					archive: backupsDestination + 'public.tar.gz',
				},
				expand: true,
				cwd: './public/',
				src: includeAllFiles,
				dest: 'public',
			},
		},

		/**
		 * Run predefined tasks whenever watched file patterns are added, changed or deleted
		 */
		watch: {
			sass: {
				files: ['*.scss'], // src listening
				tasks: ['sass-task'], // default task to execute
				options: { spawn: false }, // watch optimization
			},
		},
	});

	// all grunt register tasks
	grunt.registerTask('compress-all', [
		'compress:main',
		'compress:config',
		'compress:docs',
		'compress:extension',
		'compress:modules',
		'compress:node_modules',
		'compress:scripts',
		'compress:src',
		'compress:test',
		'compress:public',
	]);
	grunt.registerTask('concat-task', ['concat:dev']);
	grunt.registerTask('jshint-task', ['jshint:dev']);
	grunt.registerTask('replace-task', ['replace:dev']);
	grunt.registerTask('sass-task', ['sass:dist']);
	grunt.registerTask('shell-task', ['shell:test']);
	grunt.registerTask('babel-task', ['babel:dist']);
	grunt.registerTask('watch-sass', ['watch:sass']);

	// all tasks lists
	const myTasksNames = [
		'compress-all',
		'concat-task',
		'jshint-task',
		'replace-task',
		'sass-task',
		'babel-task',
		'shell-task',
		'watch-sass',
	];

	// tasks status (description)
	const myTasksStatus = [
		'compress: main | config | docs | extension | modules | node_modules | scripts | src | test | public',
		'concatenate files',
		'validate js files',
		'replace text in files using strings, regexs or fuctions',
		'compile sass to css',
		'run shell commads',
		'watch files change',
	];

	// default tasks
	grunt.registerTask('default', () => {
		console.log(
			'\nHere are the lists of plugins (tasks) you can run with grunt:'.green,
		);

		/**
		 *
		 * @param {string} taskTitle - task title (Eg: basics tasks)
		 * @param {array} taskNames - task names (Eg: basicsTaskNames)
		 * @param {array} taskStatus - task status (Eg: basicsTaskStatus)
		 * @param {string} taskTheme - colors of theme (Eg: black ,red ,green ,yellow ,blue ,magenta ,cyan ,white ,gray ,grey)
		 */
		function getTaskResume(taskTitle, taskNames, taskStatus, taskTheme) {
			switch (taskTheme) {
				case 'cyan':
					console.log(`\n${taskTitle}`.cyan.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.cyan + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'magenta':
					console.log(`\n${taskTitle}`.magenta.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.magenta + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'yellow':
					console.log(`\n${taskTitle}`.yellow.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.yellow + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'blue':
					console.log(`\n${taskTitle}`.blue.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.blue + ` -> ${taskStatus[index]}`);
					});
					break;

				default:
					null;
					break;
			}
		}

		// task resume
		getTaskResume(
			'<TASK TITLE>',
			myTasksNames,
			myTasksStatus,
			'yellow', // color theme
		);
	});
};
