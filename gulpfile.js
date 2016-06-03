(function () {
	var gulp = require('gulp');
	var ts = require('gulp-typescript');
	var cleanCSS = require('gulp-clean-css');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');

	gulp.task('copy', function () {
		gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/jquery-placeholder/jquery.placeholder.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
			])
		.pipe(gulp.dest('js/lib'));
		gulp.src([
			'bower_components/bootstrap/dist/fonts/*'
			])
		.pipe(gulp.dest('fonts'));
		gulp.src([
			'bower_components/bootstrap/less/**'
			])
		.pipe(gulp.dest('css/less/bootstrap'));
	});

	gulp.task('ts:compile', function () {
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

	gulp.task('ts:watch', ['ts:compile'], function() {
		var watcher = gulp.watch('js/ts/**/*.ts', ['ts:compile']);
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
})();
