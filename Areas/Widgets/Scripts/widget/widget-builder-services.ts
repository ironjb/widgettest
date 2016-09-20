/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetNgServices {
	removeFieldItem?(field: IWidgetField, itemName: string): void;
	editForm?(options: IFormEditOptions): void;
	editField?(options: IFieldEditOptions): void;
	editRepeatField?(options: IFieldEditOptions): void;
}

interface IFormEditOptions {
	instanceOptions?: IFormEditModalInstanceOptions;
	saveForm?(updateForm: LTWidget.IFormObject): void;
}

interface IFormEditModalInstanceOptions {
	currentBuildObject: LTWidget.IBuildOptions;
}

interface IWidgetEditFormNgScope extends ng.IScope {
	modBuildOptions: LTWidget.IBuildOptions;
	isBorderTypeNone: boolean;
	isBorderTypePanel: boolean;
	previewStyles: string;
	fieldSizeClass: string;
	buttonSizeClass: string;
	modelOptions: Object;
	borderType: Object;
	formWidthUnits: Object;
	fieldSizeUnits: Object;
	changeFormWidthUnit($event: any, unit: any): void;
	borderTypeChange(): void;
	fieldSizeChange(): void;
	saveClick(): void;
	cancelClick(): void;
	removeBuildObjectItem(itemName: string): void;
}

interface IWidgetFieldStyle {
	fontSize?: string;
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
	borderRadius?: string;
	borderWidth?: string;
	borderStyle?: string;
	padding?: string
	marginTop?: string;
	marginBottom?: string;
	textAlign?: string;
}

interface IWidgetEditFieldNgScope extends ng.IScope {
	fieldSizeClass: string;
	buttonSizeClass: string;
	previewStyles: string;
	valuePlaceholder: string;
	customFieldKeyValue: string;
	fieldStyle: IWidgetFieldStyle;
	modBuildObject: LTWidget.IBuildOptions
	modField: IWidgetField;
	fieldOptions: IWidgetFieldOptions;
	modelOptions: Object;
	fieldSizeUnits: Object;
	gridColumnsArray: IHelperNameNumId[];
	offsetColumnsArray: IHelperNameNumId[];
	headingArray: IHelperNameNumId[];
	fieldSizeChange(): void;
	removeFieldItem(itemName: string): void;
	saveClick(): void;
	cancelClick(): void;
	showTextFieldPreview: boolean;
	showTextareaPreview: boolean;
	showSelectPreview: boolean;
	showParagraphPreview: boolean;
	showButtonPreview: boolean;
	showLabelPreview: boolean;
	showTitlePreview: boolean;
}

interface IWidgetEditRepeatFieldNgScope extends ng.IScope {
	modBuildObject: IWidgetFormBuildObject;
	modelOptions: Object;
	modField: IWidgetField;
	allRepeatDataFieldsObject: Object;
	allRepeatDataFieldsOptionsArray: IWidgetFieldOptions[];
	repeatFormDisplay: string;
	previewDataFieldStyles: string;
	saveWidget?(): void;
	cancelClick?(): void;
	editDataForm?(): void;
	buildDisplay?(): void;
	editFieldData: IWidgetEditFieldData;
	addField?(fieldId: string, channel: string): void;
	onDragStart: IWidgetOnDragStart;
	dragData?: IWidgetOnDragStartData;
	onDrop?: IWidgetOnDrop;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
	var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
	var ltbh: LoanTekWidget.BuilderHelpers = new LoanTekWidget.BuilderHelpers();
	var ltWidgetServices = angular.module('ltw.services', ['ngSanitize']);
	var ngModelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
	ltWidgetServices.factory('widgetServices', ['$uibModal', function ($uibModal: ng.ui.bootstrap.IModalService) {
		var widgetMethods: IWidgetNgServices = {};

		widgetMethods.removeFieldItem = function (field: IWidgetField, itemName: string) {
			switch (itemName) {
				case "value":
					// code...
					break;

				default:
					delete field[itemName];
					break;
			}
		};

		widgetMethods.editForm = function (options: IFormEditOptions) {
			var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
			angular.extend(settings, options);

			var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope: IWidgetEditFormNgScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, instanceOptions: IFormEditModalInstanceOptions) {

				$scope.modBuildOptions = angular.copy(instanceOptions.currentBuildObject);
				$scope.borderType = angular.copy(lth.formBorderType);
				$scope.formWidthUnits = angular.copy(lth.widthUnit);
				$scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
				$scope.modelOptions = ngModelOptions;

				$scope.changeFormWidthUnit = ($event, unit) => {
					$event.preventDefault();
					$scope.modBuildOptions.formWidthUnit = unit.id;
				};

				$scope.borderTypeChange = () => {
					if ($scope.modBuildOptions.formBorderType === lth.formBorderType.none.id) {
						$scope.isBorderTypeNone = true;
					} else {
						$scope.isBorderTypeNone = false;
					}

					if ($scope.modBuildOptions.formBorderType === lth.formBorderType.panel.id) {
						$scope.isBorderTypePanel = true;
					} else {
						$scope.isBorderTypePanel = false;
					}
				};

				$scope.fieldSizeChange = function () {
					if ($scope.modBuildOptions.fieldSize === lth.bootstrap.inputSizing.sm.id) {
						$scope.fieldSizeClass = 'form-group-sm';
						$scope.buttonSizeClass = 'btn-sm';
					}
					else if ($scope.modBuildOptions.fieldSize === lth.bootstrap.inputSizing.lg.id) {
						$scope.fieldSizeClass = 'form-group-lg';
						$scope.buttonSizeClass = 'btn-lg';
					} else {
						$scope.fieldSizeClass = '';
						$scope.buttonSizeClass = '';
					}
				};

				if (lth.isStringNullOrEmpty($scope.modBuildOptions.fieldSize)) {
					$scope.modBuildOptions.fieldSize = lth.bootstrap.inputSizing.getDefault().id;
				}

				if (!$scope.modBuildOptions.formWidthUnit) {
					$scope.modBuildOptions.formWidthUnit = lth.widthUnit.getDefault().id;
				}

				if (!$scope.modBuildOptions.formBorderType) {
					$scope.modBuildOptions.formBorderType = lth.formBorderType.none.id;
				}
				$scope.borderTypeChange();
				$scope.fieldSizeChange();

				var watchGroups = [
					'modBuildOptions.formBorderType'
					, 'modBuildOptions.fieldSize'
					, 'modBuildOptions.formBg'
					, 'modBuildOptions.formFontColor'
					, 'modBuildOptions.formBorderColor'
					, 'modBuildOptions.formBorderRadius'
					, 'modBuildOptions.formTitleColor'
					, 'modBuildOptions.formTitleBgColor'
					, 'modBuildOptions.formGroupSpacing'
					, 'modBuildOptions.formFieldBorderRadius'
					, 'modBuildOptions.formButtonBorderRadius'
				];

				$scope.$watchGroup(watchGroups, (newValue, oldValue) => {
					var applyFormStyles: LoanTekWidget.ApplyFormStyles = new LoanTekWidget.ApplyFormStyles(lth, $scope.modBuildOptions, true, '.ltw-preview');
					var previewStyles: string = applyFormStyles.getStyles();

					$scope.previewStyles = previewStyles;
				});

				$scope.removeBuildObjectItem = (itemName) => {
					switch (itemName) {
						case "value":
							// code...
							break;

						default:
							delete $scope.modBuildOptions[itemName];
							break;
					}
				};

				$scope.saveClick = () => {
					var newBuildOptions: LTWidget.IBuildOptions = angular.copy($scope.modBuildOptions);

					if (!lth.isNumber(newBuildOptions.formBorderRadius) || newBuildOptions.formBorderRadius === lth.getDefaultBorderRadius(newBuildOptions.fieldSize)) {
						delete newBuildOptions.formBorderRadius;
					}

					if (lth.isStringNullOrEmpty(newBuildOptions.formFontColor)) {
						delete newBuildOptions.formFontColor;
					}

					if (lth.isStringNullOrEmpty(newBuildOptions.panelTitle)) {
						delete newBuildOptions.panelTitle;
						delete newBuildOptions.formTitleColor;
						delete newBuildOptions.formTitleBgColor;
					}

					if (!lth.isNumber(newBuildOptions.formWidth)) {
						delete newBuildOptions.formWidth;
						delete newBuildOptions.formWidthUnit;
					}

					if (newBuildOptions.formWidthUnit === lth.widthUnit.getDefault().id) {
						delete newBuildOptions.formWidthUnit;
					}

					if (newBuildOptions.formGroupSpacing === lth.defaultVerticalSpacing) {
						delete newBuildOptions.formGroupSpacing;
					}

					if (newBuildOptions.formFieldBorderRadius === lth.getDefaultBorderRadius(newBuildOptions.fieldSize)) {
						delete newBuildOptions.formFieldBorderRadius;
					}

					if (newBuildOptions.formButtonBorderRadius === lth.getDefaultBorderRadius(newBuildOptions.fieldSize)) {
						delete newBuildOptions.formButtonBorderRadius;
					}

					if (newBuildOptions.fieldSize === lth.bootstrap.inputSizing.getDefault().id) {
						delete newBuildOptions.fieldSize;
					}

					if (!newBuildOptions.formBorderType || newBuildOptions.formBorderType === lth.formBorderType.none.id) {
						delete newBuildOptions.formBorderType;
						delete newBuildOptions.formBg;
						delete newBuildOptions.formBorderRadius;
						delete newBuildOptions.formBorderColor;
					}

					$uibModalInstance.close(newBuildOptions);
				};

				$scope.cancelClick = () => {
					$uibModalInstance.dismiss();
				};
			}];

			var modalInstance = $uibModal.open({
				templateUrl: 'template/modal/editForm.html'
				// templateUrl: '/Widgets/Home/AngularTemplates/modalEditForm?t=' + new Date().getTime()
				, controller: modalCtrl
				, size: settings.modalSize
				, resolve: {
					instanceOptions: () => { return settings.instanceOptions }
				}
			});

			modalInstance.result.then((result) => {
				settings.saveForm(result);
			}, (error) => {
			});
		};

		widgetMethods.editField = function (options: IFieldEditOptions) {
			var modalCtrl: [string | Function];
			var settings: IFieldEditOptions = { modalSize: 'lg' };
			angular.extend(settings, options);

			modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope: IWidgetEditFieldNgScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, instanceOptions: IFieldEditModalInstanceOptions) {
				$scope.modelOptions = ngModelOptions;
				$scope.modBuildObject = angular.copy(instanceOptions.currentBuildObject);
				$scope.modField = $scope.modBuildObject.fields[instanceOptions.currentFieldIndex];
				$scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);

				var applyFormStyles: LoanTekWidget.ApplyFormStyles = new LoanTekWidget.ApplyFormStyles(lth, $scope.modBuildObject, true, '.ltw-preview');
				var previewStyles: string = applyFormStyles.getStyles();
				var ft = instanceOptions.fieldOptions.fieldTemplate;
				var el = ft.element;
				var ty = ft.type;
				var customFieldNameIndex: number = null;
				$scope.fieldOptions = instanceOptions.fieldOptions;
				$scope.previewStyles = previewStyles;
				$scope.gridColumnsArray = lth.bootstrap.gridColumns.asArray();
				$scope.offsetColumnsArray = lth.bootstrap.offsetColumns.asArray();
				$scope.headingArray = lth.hsize.asArray();
				$scope.modField.attrs = $scope.modField.attrs || [];

				if (!$scope.modField.size && $scope.modBuildObject.fieldSize) {
					$scope.modField.size = $scope.modBuildObject.fieldSize;
				}

				if (!$scope.modField.cols) {
					$scope.modField.cols = lth.bootstrap.gridColumns.getDefault().id;
				}

				if (lth.isStringNullOrEmpty($scope.modField.size)) {
					$scope.modField.size = lth.bootstrap.inputSizing.getDefault().id;
				}

				if (el === 'title' && !lth.isNumber($scope.modField.nsize)) {
					$scope.modField.nsize = lth.hsize.getDefault().id;
				}

				if (!$scope.modField.offsetCols) {
					$scope.modField.offsetCols = 0;
				}

				if(['p','div','title','label','textarea'].indexOf(el) >= 0 || ['successmessage','submit'].indexOf(ty) >= 0) {
					$scope.valuePlaceholder = $scope.fieldOptions.fieldTemplate.value + '' || '';
				} else if (el === 'input' && ['text','number'].indexOf(ty) !== -1) {
					$scope.valuePlaceholder = 'Enter default value';
				}

				if ($scope.modField.field === 'custominput') {
					customFieldNameIndex = lth.GetIndexOfFirstObjectInArray($scope.modField.attrs,'name', 'data-lt-additional-info-key');
					if (customFieldNameIndex !== -1) {
						$scope.customFieldKeyValue = $scope.modField.attrs[customFieldNameIndex].value;
					} else {
						$scope.modField.attrs.push({ name: 'data-lt-additional-info-key', value: '' });
						customFieldNameIndex = lth.GetIndexOfFirstObjectInArray($scope.modField.attrs,'name', 'data-lt-additional-info-key');
					}
				}

				$scope.fieldSizeChange = function () {
					if ($scope.modField.size === lth.bootstrap.inputSizing.sm.id) {
						$scope.fieldSizeClass = 'input-sm';
						$scope.buttonSizeClass = 'btn-sm';
					}
					else if ($scope.modField.size === lth.bootstrap.inputSizing.lg.id) {
						$scope.fieldSizeClass = 'input-lg';
						$scope.buttonSizeClass = 'btn-lg';
					} else {
						$scope.fieldSizeClass = 'input-md';
						$scope.buttonSizeClass = 'btn-md';
					}
				};
				$scope.fieldSizeChange();

				var watchList = [
					'modField.fontSize'
					, 'modField.color'
					, 'modField.backgroundColor'
					, 'modField.backgroundColor'
					, 'modField.borderColor'
					, 'modField.borderRadius'
					, 'modField.padding'
					, 'modField.marginTopBottom'
					, 'modField.align'
				];
				$scope.$watchGroup(watchList, function (newValue) {
					var newStyle: IWidgetFieldStyle = {};

					if ($scope.modField.fontSize) {
						newStyle.fontSize = $scope.modField.fontSize + 'px';
					} else if (ty === 'successmessage' || ty === 'nodatamessage') {
						newStyle.fontSize = ft.fontSize ? ft.fontSize + 'px' : '20px';
					}
					if ($scope.modField.color) {
						newStyle.color = $scope.modField.color;
					}
					if ($scope.modField.backgroundColor) {
						newStyle.backgroundColor = $scope.modField.backgroundColor;
					}
					if ($scope.modField.borderColor) {
						newStyle.borderColor = $scope.modField.borderColor;
					}
					if (lth.isNumber($scope.modField.borderRadius)) {
						newStyle.borderRadius = $scope.modField.borderRadius + 'px';
					}
					if (lth.isNumber($scope.modField.padding)) {
						newStyle.padding = $scope.modField.padding + 'px';
					}
					if (lth.isNumber($scope.modField.marginTopBottom)) {
						newStyle.marginTop = $scope.modField.marginTopBottom + 'px';
						newStyle.marginBottom = $scope.modField.marginTopBottom + 'px';
					}
					if ((el === 'p' || el === 'div') && newStyle.borderColor) {
						newStyle.borderWidth = '1px';
						newStyle.borderStyle = 'solid';
					}
					if (!lth.isStringNullOrEmpty($scope.modField.align)) {
						newStyle.textAlign = $scope.modField.align;
					}

					$scope.fieldStyle = newStyle;
				});

				$scope.removeFieldItem = function (itemName) { widgetMethods.removeFieldItem($scope.modField, itemName); };

				$scope.saveClick = function () {
					if ($scope.modField.cols === lth.bootstrap.gridColumns.getDefault().id) {
						delete $scope.modField.cols;
					}
					if ($scope.modField.size === $scope.modBuildObject.fieldSize) {
						delete $scope.modField.size;
					}
					if ($scope.modField.size === lth.bootstrap.inputSizing.getDefault().id && !$scope.modBuildObject.fieldSize) {
						delete $scope.modField.size;
					}
					if ($scope.modField.nsize === lth.hsize.getDefault().id) {
						delete $scope.modField.nsize;
					}
					if (lth.isStringNullOrEmpty($scope.modField.placeholder)) {
						delete $scope.modField.placeholder;
					}
					if (lth.isStringNullOrEmpty($scope.modField.value + '')) {
						delete $scope.modField.value;
					}
					if (!lth.isNumber($scope.modField.fontSize)) {
						delete $scope.modField.fontSize;
					} else if ((ty === 'successmessage' || ty === 'nodatamessage') && ft.fontSize && ft.fontSize === $scope.modField.fontSize) {
						delete $scope.modField.fontSize;
					}
					if (!$scope.modField.offsetCols) {
						delete $scope.modField.offsetCols;
					}
					if ($scope.modField.required === false) {
						delete $scope.modField.required;
					}
					if (!lth.isNumber($scope.modField.marginTopBottom)) {
						delete $scope.modField.marginTopBottom;
					}
					if (lth.isStringNullOrEmpty($scope.modField.align)) {
						delete $scope.modField.align;
					}
					if (!lth.isNumber($scope.modField.padding)) {
						delete $scope.modField.padding;
					}
					if (!lth.isNumber($scope.modField.borderRadius)) {
						delete $scope.modField.borderRadius;
					}
					if (lth.isNumber(customFieldNameIndex) && customFieldNameIndex !== -1) {
						window.console && console.log('apply customFieldKeyValue:', $scope.customFieldKeyValue, ' index: ', customFieldNameIndex);
						$scope.modField.attrs[customFieldNameIndex].value = $scope.customFieldKeyValue;
					}
					if ($scope.modField.attrs.length === 0) {
						delete $scope.modField.attrs;
					}
					var newBuildObject: LTWidget.IFormObject = angular.copy($scope.modBuildObject);
					$uibModalInstance.close(newBuildObject);
				};

				$scope.cancelClick = function () {
					$uibModalInstance.dismiss();
				};
			}];

			var modalInstance = $uibModal.open({
				// templateUrl: '/Widgets/Home/AngularTemplates/modalEditField?t=' + new Date().getTime()
				templateUrl: 'template/modal/editField.html'
				// templateUrl: '/template.html?v=' + new Date().getTime()
				, controller: modalCtrl
				, size: settings.modalSize
				, resolve: {
					instanceOptions: function () { return settings.instanceOptions; }
				}
			});

			modalInstance.result.then(function (result) {
				settings.saveForm(result);
			}, function (error) {
				// window.console && console.error('EditField Error:', error);
			});
		};

		widgetMethods.editRepeatField = function (options: IFieldEditOptions) {
			var modalCtrl: [string | Function];
			var settings: IFieldEditOptions = { modalSize: 'lg' };
			angular.extend(settings, options);

			modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function($scope: IWidgetEditRepeatFieldNgScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, instanceOptions: IFieldEditModalInstanceOptions) {
				$scope.modelOptions = ngModelOptions;
				$scope.modBuildObject = angular.copy(instanceOptions.currentBuildObject);
				$scope.modField = $scope.modBuildObject.fields[instanceOptions.currentFieldIndex];
				$scope.addField = addField;
				$scope.onDragStart = onDragStart;
				$scope.onDrop = onDrop;
				$scope.buildDisplay = buildDisplay;

				var buildTool = new LoanTekWidget.BuildTools(lth);
				var el = lth.CreateElement();
				var fakeData: any;
				var repeatFieldHelperType = lth.GetSubFieldHelperType(instanceOptions.fieldOptions.id);
				$scope.allRepeatDataFieldsObject = angular.copy(lth[repeatFieldHelperType]);
				$scope.allRepeatDataFieldsOptionsArray = angular.copy(lth[repeatFieldHelperType].asArray());

				fakeData = lth.FakeData().deposit;

				// Initialize display
				$scope.buildDisplay();

				$scope.saveWidget = function () {
					var newBuildObject: LTWidget.IFormObject = angular.copy($scope.modBuildObject);
					$uibModalInstance.close(newBuildObject);
				};

				$scope.cancelClick = function () {
					$uibModalInstance.dismiss();
				};

				$scope.editDataForm = function () {
					var dataFormEditOptions: IFormEditOptions = {
						instanceOptions: {
							currentBuildObject: $scope.modField.fieldListOptions
						}
						, saveForm: function (updatedBuildObject: IWidgetFormBuildObject) {
							$scope.modField.fieldListOptions = updatedBuildObject;
							buildDisplay();
						}
					};
					widgetMethods.editForm(dataFormEditOptions);
				};

				function addField(fieldId: string) {
					var fieldToAdd: Object = { field: $scope.allRepeatDataFieldsObject[fieldId].id };
					$scope.modField.fieldListOptions.fields.push(fieldToAdd);
					$scope.buildDisplay();
				};

				function onDragStart(event: Event, ui: JQueryUI.DraggableEventUIParams, data: IWidgetOnDragStartData) {
					$scope.dragData = data;
				}

				function onDrop(event: Event, ui: JQueryUI.DroppableEventUIParam, dropIndex: number, channel?: string, columns?: number, isPlaceholder?: boolean) {
					if ($scope.dragData.field) {
						var newField: IWidgetField = { field: $scope.dragData.field };
						if (columns) {
							newField.cols = columns;
						}
						$scope.modField.fieldListOptions.fields.splice(dropIndex + 1, 0, newField);
						$scope.buildDisplay();
					} else if (lth.isNumber($scope.dragData.index)) {
						var previousIndex = $scope.dragData.index;
						if (previousIndex > dropIndex && isPlaceholder) {
							dropIndex += 1;
						}

						ltbh.arrayMove($scope.modField.fieldListOptions.fields, previousIndex, dropIndex);

						if (columns) {
							$scope.modField.fieldListOptions.fields[dropIndex].cols = columns;
						}

						$scope.buildDisplay();
					} else {
						window.console && console.error('EditRepeatField Error: No Data Passed from Draggable!!');
					}
				}

				function buildDisplay () {
					$scope.editFieldData = {
						widgetTypeLower: instanceOptions.fieldOptions.id.toLowerCase()
						, currentForm: $scope.modBuildObject.fields[instanceOptions.currentFieldIndex]			// should be depositdatalist field which contains 'fieldListOptions' instead of 'buildObject' and 'resultObject'
						, clearSelectedForm: ()=>{}																// not sure this needs to happen at this level???
						, onDragStart: $scope.onDragStart														//
						, setCurrentForm: ()=>{}																// does not need to do anything here
						, buildScript: $scope.buildDisplay														// should be used to run buildDisplay
					};

					var modFieldForEditDataForm = angular.copy($scope.modField);
					modFieldForEditDataForm.fieldListOptions.fieldHelperType = lth.GetSubFieldHelperType(instanceOptions.fieldOptions.id);
					modFieldForEditDataForm.fieldListOptions.widgetChannel = 'repeat';
					modFieldForEditDataForm.fieldListOptions.showBuilderTools = true;

					var rFormWrapper = el.div();
					var resultForm = el.div().append(buildTool.BuildFields(rFormWrapper, angular.copy(modFieldForEditDataForm.fieldListOptions), fakeData));

					var applyFormStyles: LoanTekWidget.ApplyFormStyles = new LoanTekWidget.ApplyFormStyles(lth, modFieldForEditDataForm.fieldListOptions, true, '.ltw-repeatpreview');
					var previewDataFieldStyles: string = applyFormStyles.getStyles();

					$scope.previewDataFieldStyles = previewDataFieldStyles;

					$scope.repeatFormDisplay = resultForm.html();
				};
			}];

			var modalInstance = $uibModal.open({
				// templateUrl: '/Widgets/Home/AngularTemplates/modalEditRepeatField?t=' + new Date().getTime()
				templateUrl: 'template/modal/editRepeatField.html'
				// templateUrl: '/template.html?v=' + new Date().getTime()
				, controller: modalCtrl
				, size: settings.modalSize
				, resolve: {
					instanceOptions: function () { return settings.instanceOptions; }
				}
			});

			modalInstance.result.then(function (result) {
				settings.saveForm(result);
			}, function (error) {
				//
			});
		};

		return widgetMethods;
	}]);
})();
