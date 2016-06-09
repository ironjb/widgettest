/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function() {
	var widgetDirectives = angular.module('ltw.directives', []);
	widgetDirectives.directive('ltCompileCode', [/*'$parse', */'$compile', function(/*$parse, */$compile) {
		return {
			restrict: 'A'
			, link: (scope, elem, attrs) => {
				scope.$watch(attrs.ltCompileCode, function(value) {
					elem.html(value);
					$compile(elem.contents())(scope);
				});
			}
		};
	}]);
	widgetDirectives.directive('ltFormEditTool', ['widgetServices', function(widgetServices) {
		return {
			restrict: 'A'
			, templateUrl: 'template/widgetFormEditButton.html'
			, link: (scope, elem, attrs) => {
				scope.EditWigetForm = () => {
					var formEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.currentForm)
						}
						, saveForm: (updatedForm) => {
							scope.currentForm = updatedForm;
							scope.selectedForm = {};
							scope.RunWidgetScriptBuild(scope.currentForm);
						}
					};
					widgetServices.editForm(formEditOptions);
				};
			}
		};
	}]);
})();