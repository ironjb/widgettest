(function () {
	var gulp = require('gulp');

	gulp.task('copy', function () {
		gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/angular/angular.min.js',
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
	})
})();