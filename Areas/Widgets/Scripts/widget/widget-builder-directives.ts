/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

declare namespace IWidgetDirectives {
	interface AssignAdditionalInfoKey extends ng.IScope {
		toolInfo: {
			fieldIndex: number;
			editInfo: IWidgetEditFormInfo;
		}
	}
}

interface IWidgetDirectiveFormEditToolNgScope extends ng.IScope {
	EditWidgetForm?(): void;
	toolInfo: IWidgetEditFormInfo;
}

interface IWidgetDirectiveFieldEditToolNgScope extends ng.IScope {
	currentFieldName?: string;
	toolInfo?: {
		index: number;
		channel: string;
	}
	fieldData?: IWidgetEditFieldData;
	currentFieldOptions?: IWidgetFieldOptions;
	showRemove?: boolean;
	RemoveWidgetField?(): void;
	EditWidgetField?(): void;
	onDragStartDir: IWidgetOnDragStart;
}

interface IFieldEditOptions {
	modalSize?: string;
	instanceOptions?: IFieldEditModalInstanceOptions;
	saveForm?(updatedBuildObject: IWidgetFormBuildObject): void;
}

interface IFieldEditModalInstanceOptions {
	fieldOptions?: IWidgetFieldOptions;
	currentBuildObject: IWidgetFormBuildObject;
	currentFieldIndex?: number;
	formObjectType?: string;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
	var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
	var widgetDirectives = angular.module('ltw.directives', []);

	widgetDirectives.directive('ltCompileCode', ['$compile', function ($compile) {
		return {
			restrict: 'A'
			, link: function (scope: ng.IScope, elem, attrs) {
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
			, scope: {
				toolInfo: '=ltFormEditTool'
			}
			// , templateUrl: 'http://localhost:58477/Widgets/Home/AngularTemplates/modalEditForm?t=' + new Date().getTime()
			, templateUrl: 'template/widgetFormEditButton.html'
			, link: function (scope: IWidgetDirectiveFormEditToolNgScope, elem, attrs) {
				var currentBuildObj: IWidgetFormBuildObject = angular.copy(scope.toolInfo.currentForm[scope.toolInfo.formObjectType]);
				scope.EditWidgetForm = function () {
					var formEditOptions: IFormEditOptions = {
						instanceOptions: {
							currentBuildObject: currentBuildObj
						}
						, saveForm: function (updatedBuildObject) {
							scope.toolInfo.currentForm[scope.toolInfo.formObjectType] = updatedBuildObject;
							scope.toolInfo.currentForm.name = 'modified';
							scope.toolInfo.setCurrentForm(scope.toolInfo.currentForm);
							scope.toolInfo.clearSelectedForm();
							scope.toolInfo.buildScript(scope.toolInfo.currentForm);
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

				scope.toolInfo.channel = scope.toolInfo.channel || 'form';
				var currentObject: string;
				if (scope.toolInfo.channel === 'result') {
					currentObject = 'resultObject';
				} else if (scope.toolInfo.channel === 'repeat') {
					currentObject = 'fieldListOptions';
				} else {
					currentObject = 'buildObject';
				}

				scope.currentFieldName = scope.fieldData.currentForm[currentObject].fields[scope.toolInfo.index].field;
				scope.currentFieldOptions = lth.GetFieldOptionsForWidgetType(scope.fieldData.widgetTypeLower, scope.currentFieldName, currentObject);

				scope.showRemove = false;
				if (!scope.currentFieldOptions.isLTRequired || scope.currentFieldOptions.groupName) {
					scope.showRemove = true;
				}

				scope.RemoveWidgetField = () => {
					var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
					confirmInfo.onConfirm = function () {
						delete scope.fieldData.currentForm[currentObject].fields.splice(scope.toolInfo.index, 1);

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
							currentBuildObject: angular.copy(scope.fieldData.currentForm[currentObject])
							, currentFieldIndex: scope.toolInfo.index
							, formObjectType: currentObject
							, fieldOptions: scope.currentFieldOptions
						}
						, saveForm: function (updatedBuildObject: IWidgetFormBuildObject) {
							scope.fieldData.currentForm[currentObject] = updatedBuildObject;
							scope.fieldData.setCurrentForm(scope.fieldData.currentForm);
							scope.fieldData.clearSelectedForm();
							scope.fieldData.buildScript(scope.fieldData.currentForm);
						}
					};
					if (scope.currentFieldOptions.fieldTemplate.element === 'repeat') {
						widgetServices.editRepeatField(fieldEditOptions);
					} else {
						widgetServices.editField(fieldEditOptions);
					}
				};
			}
		};
	}]);

	widgetDirectives.directive('ltAssignAdditionalInfoKey', ['commonServices', function (commonServices: ICommonNgServices) {
		return {
			restrict: 'A'
			, scope: {
				toolInfo: '=ltAssignAdditionalInfoKey'
			}
			, link: function (scope: IWidgetDirectives.AssignAdditionalInfoKey, elem, attrs) {
				var field: IWidgetField = scope.toolInfo.editInfo.currentForm[scope.toolInfo.editInfo.formObjectType].fields[scope.toolInfo.fieldIndex];
				var promptInfo: CommonNgServices.IModalPromptInfo = {
					promptSize: 'md'
					, promptOptions: {
						title: 'Enter a Name:'
						, message: 'Please choose a Name for the Custom Input field:'
						, promptTextRequired: true
					}
					, onOk: function (result) {
						field.attrs = field.attrs || [];
						field.attrs.push({ name: 'data-lt-additional-info-key', value: result });
						scope.toolInfo.editInfo.buildScript(scope.toolInfo.editInfo.currentForm);
						scope.toolInfo.editInfo.clearSelectedForm();
					}
				};
				commonServices.promptModal(promptInfo);
			}
		};
	}]);
})();
