/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetDirectiveFieldEditToolNgScope extends ng.IScope {
	toolInfo?: { index: number; }
	fieldData?: IWidgetEditFieldData;
	showRemove?: boolean;
	RemoveWidgetField?(): void;
	EditWidgetField?(): void;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function() {
	var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
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
				, fieldData: '=ltFieldEditToolData'
				// , currentForm: '=ltEditToolCurrentForm'
				// , buildScript: '=ltEditToolBuildScript'
			}
			, templateUrl: 'template/widgetFieldEditButtons.html'
			, link: (scope: IWidgetDirectiveFieldEditToolNgScope, elem, attrs) => {
				// var _ltFieldsEditTool = $parse(attrs.toolInfo);
				// var ltFieldsEditTool = _ltFieldsEditTool(scope);
				// window.console && console.log(ltFieldsEditTool);

				// scope.fieldIndex = ltFieldsEditTool.index;

				// window.console && console.log('toolInfo', scope.toolInfo);
				// window.console && console.log('fieldData', scope.fieldData);
				// window.console && console.log('buildScript', scope.buildScript);
				var currentFieldName: string = scope.fieldData.currentForm.buildObject.fields[scope.toolInfo.index].field;
				var currentField: IWidgetAvailableField;

				if (scope.fieldData.widgetTypeLower === 'quotewidget') {
					// get quotewidget fields
				} else if (scope.fieldData.widgetTypeLower === 'ratewidget') {
					// get ratewidget fields
				} else {
					currentField = lth.contactFields[currentFieldName];
				}

				scope.showRemove = false;
				if (!currentField.isLTRequired) {
					scope.showRemove = true;
				}

				// window.console && console.log(currentField);

				scope.RemoveWidgetField = () => {
					var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
					confirmInfo.onConfirm = function() {
						// TODO: code to remove this field
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);
						delete scope.fieldData.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);

						scope.fieldData.buildScript(scope.fieldData.currentForm);
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