(function () {
	var gulp = require('gulp');
	var ts = require('gulp-typescript');
	var cleanCSS = require('gulp-clean-css');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');

	gulp.task('copy', function () {
		// Copy jQuery
		gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/jquery-placeholder/jquery.placeholder.min.js',
			'bower_components/jQuery-ui/jquery-ui.min.js'
			])
		.pipe(gulp.dest('js/lib/jquery'));

		// Copy jQuery 1.X
		gulp.src([
			'bower_components/jquery-1/dist/jquery.min.js'
			])
		.pipe(gulp.dest('js/lib/jquery-1'));

		// Copy bootstrap .js
		gulp.src([
			'bower_components/bootstrap/dist/js/bootstrap.min.js'
			])
		.pipe(gulp.dest('js/lib/bootstrap'));

		// Copy Angular
		gulp.src([
			'bower_components/angular/angular.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'bower_components/angular-dragdrop/src/angular-dragdrop.min.js'
			])
		.pipe(gulp.dest('js/lib/angular'));

		// Copy angular-bootstrap-colorpicker .js file
		gulp.src([
			'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js'
			])
		.pipe(gulp.dest('js/lib/angular-bootstrap-colorpicker'));

		// Copy angular-bootstrap-colorpicker css file
		gulp.src([
			'bower_components/angular-bootstrap-colorpicker/css/colorpicker.min.css'
			])
		.pipe(gulp.dest('css/lib/angular-bootstrap-colorpicker/css'));

		// Copy angular-bootstrap-colorpicker img files
		gulp.src([
			'bower_components/angular-bootstrap-colorpicker/img/*'
			])
		.pipe(gulp.dest('css/lib/angular-bootstrap-colorpicker/img'));

		// Copy bootstrap fonts
		gulp.src([
			'bower_components/bootstrap/dist/fonts/*'
			])
		.pipe(gulp.dest('fonts'));

		// Copy bootstrap LESS files
		gulp.src([
			'bower_components/bootstrap/less/**'
			])
		.pipe(gulp.dest('css/less/bootstrap'));

		// // Copy angular-native-dragdrop .js file
		// gulp.src([
		// 	// 'bower_components/angular-native-dragdrop/draganddrop.js',
		// 	'bower_components/angular-native-dragdrop/draganddrop.min.js'
		// 	])
		// .pipe(gulp.dest('js/lib/angular-native-dragdrop'));
	});

	gulp.task('ts:compilewidget', function () {
		var tsWidgetBuilderProject = ts.createProject('js/ts/widget-builder/tsconfig.json');
		var tsContactWidgetProject = ts.createProject('js/ts/contact-widget/tsconfig.json');
		// Widget Builder
		var tsWidgetBuilder = tsWidgetBuilderProject.src()
		.pipe(ts(tsWidgetBuilderProject));

		// Contact Widget
		var tsContactWidget = tsContactWidgetProject.src()
		.pipe(ts(tsContactWidgetProject));

		// dest() should be same as direcotry tsconfig.json is in since the tsconfig.json file is using "outFile"
		tsWidgetBuilder.js.pipe(gulp.dest('js/ts/widget-builder'));
		tsContactWidget.js.pipe(gulp.dest('js/ts/contact-widget'));
	});

	gulp.task('ts:compile', function () {
		var tsProject = ts.createProject('./tsconfig.json');
		var tsResult = tsProject.src()
		.pipe(ts(tsProject));

		// dest() should be same as direcotry tsconfig.json. Should also have "outDir" in tsconfig.json file to help output files to correct directories.
		return tsResult.js.pipe(gulp.dest('./'));
	});

	gulp.task('ts:watchwidget', ['ts:compilewidget'], function() {
		var watcher = gulp.watch('js/ts/**/*.ts', ['ts:compile']);
		watcher.on('change', function(event) {
			console.log('File [' + event.path + '] was ' + event.type + '!');
		});
	});

	gulp.task('ts:watch', ['ts:compile'], function() {
		var watcher = gulp.watch('js/**/*.ts', ['ts:compile']);
		watcher.on('change', function(event) {
			console.log('File [' + event.path + '] was ' + event.type + '!');
		});
	});

	gulp.task('css:minify', function (details) {
		return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css'));
	});

	gulp.task('js:minify', function() {
		gulp.src(['js/**/*.js', '!js/**/*.min.js', '!js/lib/**'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js'));
	});

	gulp.task('default', function () {
		// place code for your default task here
	});
})();
