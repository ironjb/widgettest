/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />
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
	// fieldType?: string;
	// fieldOptions?: IWidgetFieldOptions;
	instanceOptions?: IFieldEditModalInstanceOptions;
	saveForm?(updatedBuildObject: IWidgetFormBuildObject): void;
}

interface IFieldEditModalInstanceOptions {
	// fieldType?: string;
	fieldOptions?: IWidgetFieldOptions;
	currentForm: IWidgetFormObject;
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
				// window.console && console.log('scope.toolInfo', scope.toolInfo);
				var currentBuildObj: IWidgetFormBuildObject = angular.copy(scope.toolInfo.currentForm[scope.toolInfo.formObjectType]);
				scope.EditWidgetForm = function () {
					var formEditOptions: IFormEditOptions = {
						instanceOptions: {
							currentBuildObject: currentBuildObj
							// currentForm: angular.copy(scope.toolInfo.currentForm)
							// , formObjectType: scope.toolInfo.formObjectType
						}
						, saveForm: function (updatedBuildObject) {
							scope.toolInfo.currentForm[scope.toolInfo.formObjectType] = updatedBuildObject;
							scope.toolInfo.currentForm.name = 'modified';
							scope.toolInfo.setCurrentForm(scope.toolInfo.currentForm);
							scope.toolInfo.clearSelectedForm();
							scope.toolInfo.buildScript(scope.toolInfo.currentForm);
							// scope.toolInfo.setCurrentForm(updatedForm);
							// scope.toolInfo.clearSelectedForm();
							// scope.toolInfo.buildScript(updatedForm);
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
				var currentObject = scope.toolInfo.channel === 'form'? 'buildObject' : 'resultObject';
				scope.currentFieldName = scope.fieldData.currentForm[currentObject].fields[scope.toolInfo.index].field;
				// window.console && console.log('currentFieldName', scope.currentFieldName);

				// if (scope.fieldData.widgetTypeLower === 'quotewidget') {
				// 	// get quotewidget fields
				// } else if (scope.fieldData.widgetTypeLower === 'ratewidget') {
				// 	// get ratewidget fields
				// } else if (scope.fieldData.widgetTypeLower === 'depositwidget') {
				// 	if (currentObject === 'resultObject') {
				// 		scope.currentFieldOptions = lth.depositResultFields[scope.currentFieldName];
				// 	} else {
				// 		scope.currentFieldOptions = lth.depositFields[scope.currentFieldName];
				// 	}
				// } else {
				// 	scope.currentFieldOptions = lth.contactFields[scope.currentFieldName];
				// }
				scope.currentFieldOptions = lth.GetFieldOptionsForWidgetType(scope.fieldData.widgetTypeLower, scope.currentFieldName, currentObject);

				scope.showRemove = false;
				if (!scope.currentFieldOptions.isLTRequired) {
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
					// window.console && console.log('scope.toolInfo.channel', scope.toolInfo.channel);
					// window.console && console.log('scoob', scope.fieldData.currentForm[currentObject].fields[scope.toolInfo.index]);
					// window.console && console.log('currentFieldOptions', scope.currentFieldOptions);
					var fieldEditOptions: IFieldEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.fieldData.currentForm)
							, currentFieldIndex: scope.toolInfo.index
							, formObjectType: currentObject
							, fieldOptions: scope.currentFieldOptions
						}
						// , fieldOptions: scope.currentFieldOptions
						, saveForm: (updatedForm) => {
							scope.fieldData.setCurrentForm(updatedForm);
							scope.fieldData.clearSelectedForm();
							scope.fieldData.buildScript(updatedForm);
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
})();
