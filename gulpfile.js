(function () {
	var gulp = require('gulp');
	var ts = require('gulp-typescript');

	gulp.task('copy', function () {
		gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
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

	var tsWidgetBuilderProject = ts.createProject('js/ts/widget-builder/tsconfig.json');
	var tsContactWidgetProject = ts.createProject('js/ts/contact-widget/tsconfig.json');
	gulp.task('ts:compile', function () {
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
		gulp.watch('js/ts/**/*.ts', ['ts:compile']);
	});
})();
