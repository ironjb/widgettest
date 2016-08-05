/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetDirectiveFieldEditToolNgScope extends ng.IScope {
	currentFieldName?: string;
	toolInfo?: { index: number; }
	fieldData?: IWidgetEditFieldData;
	currentFieldOptions?: IWidgetFieldOptions;
	showRemove?: boolean;
	RemoveWidgetField?(): void;
	EditWidgetField?(): void;
	onDragStartDir: IWidgetOnDragStart;
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
(function () {
	var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
	var widgetDirectives = angular.module('ltw.directives', []);
	widgetDirectives.directive('ltCompileCode', ['$compile', function ($compile) {
		return {
			restrict: 'A'
			, link: (scope, elem, attrs) => {
				scope.$watch(attrs.ltCompileCode, function (value) {
					elem.html(value);
					$compile(elem.contents())(scope);
				});
			}
		};
	}]);
	widgetDirectives.directive('ltFormEditTool', ['widgetServices', function (widgetServices: IWidgetNgServices) {
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
	widgetDirectives.directive('ltFieldEditTool', ['$timeout', 'commonServices', 'widgetServices', function ($timeout, commonServices: ICommonNgServices, widgetServices: IWidgetNgServices) {
		return {
			restrict: 'A'
			, scope: {
				toolInfo: '=ltFieldEditTool'
				, fieldData: '=ltFieldEditToolData'
			}
			, templateUrl: 'template/widgetFieldEditButtons.html'
			, link: (scope: IWidgetDirectiveFieldEditToolNgScope, elem, attrs) => {
				scope.onDragStartDir = scope.fieldData.onDragStart;

				scope.currentFieldName = scope.fieldData.currentForm.buildObject.fields[scope.toolInfo.index].field;

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

				scope.RemoveWidgetField = () => {
					var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
					confirmInfo.onConfirm = function () {
						delete scope.fieldData.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);

						scope.fieldData.setCurrentForm(angular.copy(scope.fieldData.currentForm));
						scope.fieldData.clearSelectedForm();
						scope.fieldData.buildScript(scope.fieldData.currentForm);
					};
					confirmInfo.onCancel = function () { };

					commonServices.confirmModal(confirmInfo);
				};

				scope.EditWidgetField = () => {
					var fieldEditOptions: IFieldEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.fieldData.currentForm),
							currentFieldIndex: scope.toolInfo.index
						}
						, fieldOptions: scope.currentFieldOptions
						, saveForm: (updatedForm) => {
							scope.fieldData.setCurrentForm(updatedForm);
							scope.fieldData.clearSelectedForm();
							scope.fieldData.buildScript(updatedForm);
						}
					};
					widgetServices.editField(fieldEditOptions);
				};
			}
		};
	}]);
})();
