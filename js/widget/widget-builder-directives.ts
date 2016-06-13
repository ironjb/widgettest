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
				scope.EditWidgetForm = () => {
					var formEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.currentForm)
						}
						, saveForm: (updatedForm) => {
							scope.currentForm = updatedForm;
							scope.selectedForm = {};
							scope.WidgetScriptBuild(scope.currentForm);
						}
					};
					widgetServices.editForm(formEditOptions);
				};
			}
		};
	}]);
	widgetDirectives.directive('ltFieldEditTool', [/*'$parse', */'widgetServices', function(/*$parse, */widgetServices) {
		return {
			restrict: 'A'
			, scope: {
				toolInfo: '=ltFieldEditTool'
				, currentForm: '=ltEditToolCurrentForm'
				, buildScript: '=ltEditToolBuildScript'
			}
			, templateUrl: 'template/widgetFieldEditButtons.html'
			, link: (scope, elem, attrs) => {
				// var _ltFieldsEditTool = $parse(attrs.toolInfo);
				// var ltFieldsEditTool = _ltFieldsEditTool(scope);
				// window.console && console.log(ltFieldsEditTool);

				// scope.fieldIndex = ltFieldsEditTool.index;

				// window.console && console.log('toolInfo', scope.toolInfo);
				// window.console && console.log('currentForm', scope.currentForm);
				// window.console && console.log('buildScript', scope.buildScript);

				scope.RemoveWidgetField = () => {
					var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
					confirmInfo.onConfirm = function() {
						// TODO: code to remove this field
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);
						delete scope.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);

						scope.buildScript(scope.currentForm);
					};
					confirmInfo.onCancel = function() { };

					widgetServices.confirmModal(confirmInfo);
				};

				scope.EditWidgetField = () => {
					// window.console && console.log('scope.toolInfo', scope.toolInfo);
					// var formEditOptions = {
					// 	instanceOptions: {
					// 		currentForm: angular.copy(scope.currentForm)
					// 	}
					// 	, saveForm: (updatedForm) => {
					// 		scope.currentForm = updatedForm;
					// 		scope.selectedForm = {};
					// 		scope.WidgetScriptBuild(scope.currentForm);
					// 	}
					// };
					// widgetServices.editForm(formEditOptions);
				};
			}
		};
	}]);
})();