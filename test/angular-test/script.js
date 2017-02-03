(function () {
	var app = angular.module('myApp', []);
	app.controller('myController', ['$scope', function($scope) {
		var message = 'Hello World!';
	}]);
})();