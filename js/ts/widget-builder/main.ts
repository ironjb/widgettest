/// <reference path="../../../typings/angularjs/angular.d.ts" />

'use strict';

var widgetBuilderApp = angular.module('WidgetBuilder', []);

widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function($scope) {
	window.console && console.log('controller');
}]);