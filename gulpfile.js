(function () {
	var gulp = require('gulp');
	var ts = require('gulp-typescript');
	var cleanCSS = require('gulp-clean-css');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
	// var foreach = require('gulp-foreach');
	// var debug = require('gulp-debug');
	// var flatmap = require('gulp-flatmap');

	gulp.task('copy', function () {
		gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/jquery-placeholder/jquery.placeholder.min.js'
			])
		.pipe(gulp.dest('js/lib/jquery'));

		gulp.src([
			'bower_components/jquery-1/dist/jquery.min.js'
			])
		.pipe(gulp.dest('js/lib/jquery-1'));

		gulp.src([
			'bower_components/bootstrap/dist/js/bootstrap.min.js'
			])
		.pipe(gulp.dest('js/lib/bootstrap'));

		gulp.src([
			'bower_components/angular/angular.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
			])
		.pipe(gulp.dest('js/lib/angular'));

		gulp.src([
			'bower_components/bootstrap/dist/fonts/*'
			])
		.pipe(gulp.dest('fonts'));

		gulp.src([
			'bower_components/bootstrap/less/**'
			])
		.pipe(gulp.dest('css/less/bootstrap'));
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
		// Widget Builder
		var tsResult = tsProject.src()
		.pipe(ts(tsProject));

		// Contact Widget

		// dest() should be same as direcotry tsconfig.json is in since the tsconfig.json file is using "outFile"
		return tsResult.js.pipe(gulp.dest('./'));
	});

	// gulp.task('ts:compile', function () {
	// 	var tsWidgetBuilderProject = ts.createProject('js/ts/tsconfig.json');
	// 	var tsWidgetBuilder = tsWidgetBuilderProject.src()
	// 	.pipe(ts(tsWidgetBuilderProject));

	// 	// dest() should be same as direcotry tsconfig.json is in since the tsconfig.json file is using "outFile"
	// 	tsWidgetBuilder.js.pipe(gulp.dest('js/ts'));


	// 	// return gulp.src('js/ts/**/tsconfig.json')
	// 	// .pipe(foreach(function(stream, file) {
	// 	// 	console.log('file++++++++++++++++++++++++++++++++++++++++++++++++', stream);
	// 	// 	// var tsProject = ts.createProject();
	// 	// 	return stream
	// 	// 	// .pipe(debug())
	// 	// 	.pipe(rename({suffix: '.minblah_' + file}));
	// 	// 	// .pipe(doSomethingWithEachFileIndividually());
	// 	// 	// .pipe(concat(file.name));
	// 	// }))
	// 	// .pipe(gulp.dest('js/ts'));

	// 	// return gulp.src('js/ts/**/tsconfig.json')
	// 	// .pipe(foreach(function(stream, file) {
	// 	// 	console.log('file++++++++++++++++++++++++++++++++++++++++++++++++', file.path);
	// 	// 	var tsProject = ts.createProject(file.path);
	// 	// 	console.log(tsProject.config);
	// 	// 	// var tsResult = tsProject.src()
	// 	// 	// .pipe(ts(tsProject));
	// 	// 	return stream
	// 	// 	// .pipe(debug())
	// 	// 	// .pipe(rename({suffix: '.minblah_' + file}));
	// 	// 	.pipe(ts(tsProject));
	// 	// 	// .pipe(doSomethingWithEachFileIndividually());
	// 	// 	// .pipe(concat(file.name));
	// 	// }))
	// 	// .pipe(gulp.dest('js/ts/test2'));

	// 	// return gulp.src('js/ts/**/tsconfig.json')
	// 	// .pipe(debug())
	// 	// pipe(gulp.dest('dist/test1/test2'));
	// 	// return gulp.src('js/ts/**.ts')
	// 	// .pipe(foreach(function(stream, file){
	// 	//  	return stream
	// 	// 	// .pipe(compileTypescript(file.name))
	// 	// 	.pipe(concat(file.name));
	// 	// }))
	// 	// .pipe(gulp.dest('dist/test1/tes2/test3'));

	// 	// function compileTypescript(filename) {
	// 	// 	return filename;
	// 	// }

	// 	// return gulp.src('js/ts/**/tsconfig.json')
	// 	// .pipe(foreach(function(stream, file) {
	// 	// 	return stream;
	// 	// 	// .pipe(compileTypescript())
	// 	// 	// .pipe(file.name);
	// 	// }))
	// 	// .pipe(gulp.dest('dist/js/ts'));

	// 	// function compileTypescript() {
	// 	// 	// console.log(filename);
	// 	// }

	// 	// var tsProject = ts.createProject('js/ts/**/tsconfig.json');
	// 	// var tsWidgetBuilder = tsProject.src()
	// 	// .pipe(ts(tsProject));

	// 	// // dest() should be same as direcotry tsconfig.json is in since the tsconfig.json file is using "outFile"
	// 	// tsWidgetBuilder.js.pipe(gulp.dest('js/ts'));
	// });

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
})();
