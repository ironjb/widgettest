/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetDirectiveFieldEditToolNgScope extends ng.IScope {
	currentFieldName?: string;
	toolInfo?: { index: number; }
	fieldData?: IWidgetEditFieldData;
	currentFieldOptions?: IWidgetFieldOptions;
	showRemove?: boolean;
	RemoveWidgetField?(): void;
	EditWidgetField?(): void;
}

interface IFieldEditOptions {
	modalSize?: string;
	// fieldType?: string;
	fieldOptions?: IWidgetFieldOptions;
	instanceOptions?: IFieldEditModalInstanceOptions;
	saveForm?(updatedForm: IWidgetFormObject): void;
}

interface IFieldEditModalInstanceOptions {
	// fieldType?: string;
	fieldOptions?: IWidgetFieldOptions;
	currentForm: IWidgetFormObject;
	currentFieldIndex?: number;
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
	widgetDirectives.directive('ltFieldEditTool', [/*'$parse', */'$timeout', 'widgetServices', function(/*$parse, */$timeout, widgetServices) {
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
				scope.currentFieldName = scope.fieldData.currentForm.buildObject.fields[scope.toolInfo.index].field;
				// scope.currentFieldOptions;

				if (scope.fieldData.widgetTypeLower === 'quotewidget') {
					// get quotewidget fields
				} else if (scope.fieldData.widgetTypeLower === 'ratewidget') {
					// get ratewidget fields
				} else {
					scope.currentFieldOptions = lth.contactFields[scope.currentFieldName];
				}

				scope.showRemove = false;
				if (!scope.currentFieldOptions.isLTRequired) {
					scope.showRemove = true;
				}

				// window.console && console.log(currentFieldOptions);

				scope.RemoveWidgetField = () => {
					var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
					confirmInfo.onConfirm = function() {
						// TODO: code to remove this field
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);
						delete scope.fieldData.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);
						// window.console && console.log('ok to remove', scope.currentForm.buildObject.fields);

						scope.fieldData.clearSelectedForm();
						scope.fieldData.buildScript(scope.fieldData.currentForm);
					};
					confirmInfo.onCancel = function() { };

					widgetServices.confirmModal(confirmInfo);
				};

				scope.EditWidgetField = () => {
					var fieldEditOptions: IFieldEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.fieldData.currentForm),
							currentFieldIndex: scope.toolInfo.index
						}
						, fieldOptions: scope.currentFieldOptions
						, saveForm: (updatedForm) => {
							// $timeout(function () {
								// scope.fieldData.currentForm = updatedForm;  // < - update this to a call a function from WidgetBuilder that will set the currentForm
								scope.fieldData.setCurrentForm(updatedForm);
								scope.fieldData.clearSelectedForm();
								scope.fieldData.buildScript(updatedForm);
							// }, 500);
						}
					};
					// var currentFieldOptions = scope.fieldData.currentForm.buildObject.fields[scope.toolInfo.index];
					// var cf
					// window.console && console.log('cf', cf);

					// var el = scope.currentFieldOptions.fieldTemplate.element;
					// var ty = scope.currentFieldOptions.fieldTemplate.type;
					// // window.console && console.log('el', el, 'ty', ty);

					// if (el === 'input') {
					// 	// TODO: modal for updating input fields
					// 	if (ty === 'button') {
					// 		fieldEditOptions.fieldType = 'input_button';
					// 	} else {
					// 		fieldEditOptions.fieldType = 'input_text';
					// 	}
					// // } else if (el === 'p') {
					// // 	fieldEditOptions.fieldType = 'paragraph';
					// } else {
					// 	fieldEditOptions.fieldType = el;
					// }

					// window.console && console.log(fieldEditOptions.fieldType);
					widgetServices.editField(fieldEditOptions);
				};
			}
		};
	}]);
})();