/// <reference path="../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

declare namespace IW {
	interface IWidgetEditFormNgScope extends ng.IScope {
		modForm: IW.IWidgetFormObject;
		isBorderTypeNone: boolean;
		isBorderTypePanel: boolean;
		previewStyles: string;
		fieldSizeClass: string;
		buttonSizeClass: string;
		// borderTypeArray: Object[];
		modelOptions: Object;
		borderType: Object;
		formWidthUnits: Object;
		fieldSizeUnits: Object;
		changeFormWidthUnit($event: any, unit: any): void;
		borderTypeChange(): void;
		fieldSizeChange(): void;
		saveClick(): void;
		cancelClick(): void;
		// removeFormBorderColor(): void;
		// removeFormTitleColor(): void;
		removeFormItem(itemName: string): void;
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
	}

	interface IWidgetEditFieldNgScope extends ng.IScope {
		fieldSizeClass: string;
		buttonSizeClass: string;
		previewStyles: string;
		fieldStyle: IW.IWidgetFieldStyle;
		modForm: IW.IWidgetFormObject;
		modField: IW.IWidgetField;
		fieldOptions: IW.IWidgetFieldOptions;
		modelOptions: Object;
		fieldSizeUnits: Object;
		gridColumnsArray: IW.IHelperNameNumId[];
		headingArray: IW.IHelperNameNumId[];
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

	interface IWidgetNgServices {
		editForm?(options): void;
		editField?(options: IW.IFieldEditOptions): void;
		dataProcessingModal?(optionsArray: any[], staticOptions?): void;
		okModal?(okInfo): void;
		confirmModal?(confirmInfo): void;
	}
}

var LoanTekWidgetHelperTest = LoanTekWidgetHelperTest || new LoanTekWidgetTest.helpers(jQuery);
(function() {
	var lth: LoanTekWidgetTest.helpers = LoanTekWidgetHelperTest;
	var ltWidgetServices = angular.module('ltw.services', ['ngSanitize']);
	ltWidgetServices.factory('widgetServices', ['$uibModal', ($uibModal) => {
		var widgetMethods: IW.IWidgetNgServices = {};
		widgetMethods.editForm = (options) => {
			var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
			angular.extend(settings, options);

			var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', ($scope: IW.IWidgetEditFormNgScope, $uibModalInstance, instanceOptions) => {

				$scope.modForm = angular.copy(instanceOptions.currentForm);
				// $scope.borderTypeArray = angular.copy(lth.formBorderTypeArray);
				$scope.borderType = angular.copy(lth.formBorderType);
				$scope.formWidthUnits = angular.copy(lth.widthUnit);
				$scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
				$scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };

				$scope.changeFormWidthUnit = ($event, unit) => {
					$event.preventDefault();
					$scope.modForm.formWidthUnit = unit.id;
					// window.console && console.log(unit, $scope.modForm.formWidthUnit);
				};

				// window.console && console.log(lth.bootstrap.gridColumns.asArray());

				$scope.borderTypeChange = () => {
					if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
						$scope.isBorderTypeNone = true;
					} else {
						$scope.isBorderTypeNone = false;
					}

					if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.panel.id) {
						$scope.isBorderTypePanel = true;
					} else {
						$scope.isBorderTypePanel = false;
					}
				};

				$scope.fieldSizeChange = function() {
					if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.sm.id) {
						$scope.fieldSizeClass = 'form-group-sm';
						$scope.buttonSizeClass = 'btn-sm';
					}
					else if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.lg.id) {
						$scope.fieldSizeClass = 'form-group-lg';
						$scope.buttonSizeClass = 'btn-lg';
					} else {
						$scope.fieldSizeClass = '';
						$scope.buttonSizeClass = '';
					}
				};

				if (lth.isStringNullOrEmpty($scope.modForm.buildObject.fieldSize)) {
					$scope.modForm.buildObject.fieldSize = lth.bootstrap.inputSizing.getDefault().id;
				}

				if (!$scope.modForm.formWidthUnit) {
					$scope.modForm.formWidthUnit = lth.widthUnit.getDefault().id;
				}

				if (!$scope.modForm.buildObject.formBorderType) {
					$scope.modForm.buildObject.formBorderType = lth.formBorderType.none.id;
				}
				$scope.borderTypeChange();
				$scope.fieldSizeChange();

				var watchGroups = [
					'modForm.buildObject.formBorderType'
					, 'modForm.buildObject.fieldSize'
					, 'modForm.formBg'
					, 'modForm.formBorderColor'
					, 'modForm.formBorderRadius'
					, 'modForm.formTitleColor'
					, 'modForm.formTitleBgColor'
					, 'modForm.formGroupSpacing'
					, 'modForm.formFieldBorderRadius'
					, 'modForm.formButtonBorderRadius'
				];

				$scope.$watchGroup(watchGroups, (newValue, oldValue) => {
					var applyFormStyles: LoanTekWidgetTest.ApplyFormStyles = new LoanTekWidgetTest.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
					var previewStyles: string = applyFormStyles.getStyles();

					// window.console && console.log('isBorderTypePanel: ', $scope.isBorderTypePanel);

					// Style Overrides
					if (!lth.isNumber($scope.modForm.formBorderRadius)) {
						// window.console && console.log('border rad is null so needs to apply default border rad', $scope.modForm.formBorderRadius);
						// previewStyles += applyFormStyles.formBorderRadius(lth.defaultBorderRadius);
					}

					// if (!$scope.isBorderTypePanel) {
					// 	$scope.removeFormItem('formTitleBgColor');
					// }

					$scope.previewStyles = previewStyles;
				});

				// $scope.removeFormBorderColor = () => {
				// 	delete $scope.modForm.formBorderColor;
				// };

				// $scope.removeFormTitleColor = () => {
				// 	delete $scope.modForm.formTitleColor;
				// };

				$scope.removeFormItem = (itemName) => {
					switch (itemName) {
						case "value":
							// code...
							break;

						default:
							delete $scope.modForm[itemName];
							break;
					}
				};

				$scope.saveClick = () => {
					var newForm: IW.IWidgetFormObject = angular.copy($scope.modForm);
					newForm.name = 'modified';

					// window.console && console.log('newForm.formBorderRadius', newForm.formBorderRadius);
					if (!lth.isNumber(newForm.formBorderRadius) || newForm.formBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
						delete newForm.formBorderRadius;
					}

					if (lth.isStringNullOrEmpty(newForm.buildObject.panelTitle)) {
						delete newForm.buildObject.panelTitle;
						delete newForm.formTitleColor;
						delete newForm.formTitleBgColor;
					}

					if (!lth.isNumber(newForm.formWidth)) {
						delete newForm.formWidth;
						delete newForm.formWidthUnit;
					}

					if (newForm.formWidthUnit === lth.widthUnit.getDefault().id) {
						delete newForm.formWidthUnit;
					}

					if (newForm.formGroupSpacing === lth.defaultVerticalSpacing) {
						delete newForm.formGroupSpacing;
					}

					if (newForm.formFieldBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
						delete newForm.formFieldBorderRadius;
					}

					if (newForm.formButtonBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
						delete newForm.formButtonBorderRadius;
					}

					if (newForm.buildObject.fieldSize === lth.bootstrap.inputSizing.getDefault().id) {
						delete newForm.buildObject.fieldSize;
					}

					if (newForm.buildObject.formBorderType === lth.formBorderType.well.id) {
						// delete newForm.formTitleBgColor;
					}

					if (!newForm.buildObject.formBorderType || newForm.buildObject.formBorderType === lth.formBorderType.none.id) {
						delete newForm.buildObject.formBorderType;
						// delete newForm.formTitleBgColor;
						delete newForm.formBg;
						delete newForm.formBorderRadius;
						delete newForm.formBorderColor;
					}
					$uibModalInstance.close(newForm);
				};

				$scope.cancelClick = () => {
					$uibModalInstance.dismiss();
				};
			}];

			var modalInstance = $uibModal.open({
				templateUrl: 'template/modal/editForm.html'
				// templateUrl: '/template.html?t=' + new Date().getTime()
				, controller: modalCtrl
				, size: settings.modalSize
				, resolve: {
					instanceOptions: () => { return settings.instanceOptions }
				}
			});

			modalInstance.result.then((result) => {
				// window.console && console.log('modal save result', result);
				settings.saveForm(result);
			}, (error) => {
				// window.console && console.log('modal close');
			});
		};
		widgetMethods.editField = (options: IW.IFieldEditOptions) => {
			var settings: IW.IFieldEditOptions = { modalSize: 'lg' };
			angular.extend(settings, options);
			// var templateUrl: string;
			var modalCtrl: [string | Function];
			var modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
			var removeFieldItem = function(field: IW.IWidgetField, itemName: string) {
				switch (itemName) {
					case "value":
						// code...
						break;

					default:
						delete field[itemName];
						break;
				}
			};
			settings.instanceOptions.fieldOptions = settings.fieldOptions;

			// templateUrl = '/template.html?t=' + new Date().getTime();
			// templateUrl = 'template/modal/editField.html';
			modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', ($scope: IW.IWidgetEditFieldNgScope, $uibModalInstance, instanceOptions: IFieldEditModalInstanceOptions) => {
				$scope.modelOptions = modelOptions;
				$scope.modForm = angular.copy(instanceOptions.currentForm);
				$scope.modField = $scope.modForm.buildObject.fields[instanceOptions.currentFieldIndex];
				$scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);

				var applyFormStyles: LoanTekWidgetTest.ApplyFormStyles = new LoanTekWidgetTest.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
				var previewStyles: string = applyFormStyles.getStyles();
				var el = instanceOptions.fieldOptions.fieldTemplate.element;
				var ty = instanceOptions.fieldOptions.fieldTemplate.type;
				$scope.fieldOptions = instanceOptions.fieldOptions;
				$scope.previewStyles = previewStyles;
				$scope.gridColumnsArray = lth.bootstrap.gridColumns.asArray();
				$scope.headingArray = lth.hsize.asArray();

				// window.console && console.log($scope.modField.size, $scope.modForm.buildObject.fieldSize);
				if (!$scope.modField.size && $scope.modForm.buildObject.fieldSize) {
					$scope.modField.size = $scope.modForm.buildObject.fieldSize;
				}

				if (!$scope.modField.cols) {
					$scope.modField.cols = lth.bootstrap.gridColumns.getDefault().id;
				}

				if (lth.isStringNullOrEmpty($scope.modField.size)) {
					// window.console && console.log('set size');
					$scope.modField.size = lth.bootstrap.inputSizing.getDefault().id;
				}

				if (el === 'title' && !lth.isNumber($scope.modField.nsize)) {
					$scope.modField.nsize = lth.hsize.getDefault().id;
				}

				$scope.fieldSizeChange = function() {
					if ($scope.modField.size === lth.bootstrap.inputSizing.sm.id) {
						$scope.fieldSizeClass = 'input-sm';
						$scope.buttonSizeClass = 'btn-sm';
					}
					else if ($scope.modField.size === lth.bootstrap.inputSizing.lg.id) {
						$scope.fieldSizeClass = 'input-lg';
						$scope.buttonSizeClass = 'btn-lg';
					} else {
						// if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.sm.id) {
						// 	$scope.fieldSizeClass = 'input-sm';
						// 	$scope.buttonSizeClass = 'btn-sm';
						// } else if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.lg.id) {
						// 	$scope.fieldSizeClass = 'input-lg';
						// 	$scope.buttonSizeClass = 'btn-lg';
						// } else {
							$scope.fieldSizeClass = 'input-md';
							$scope.buttonSizeClass = 'btn-md';
						// }
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
				];
				$scope.$watchGroup(watchList, (newValue) => {
					// window.console && console.log('modField updated', newValue);
					var newStyle: IW.IWidgetFieldStyle = {};

					if ($scope.modField.fontSize) {
						newStyle.fontSize = $scope.modField.fontSize + 'px';
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
					if ((el === 'p' || el === 'div') && newStyle.borderColor) {
						newStyle.borderWidth = '1px';
						newStyle.borderStyle = 'solid';
					}

					// window.console && console.log('newStyle', newStyle);
					$scope.fieldStyle = newStyle;
				});

				$scope.removeFieldItem = (itemName) => { removeFieldItem($scope.modField, itemName); };

				$scope.saveClick = () => {
					if ($scope.modField.cols === lth.bootstrap.gridColumns.getDefault().id) {
						delete $scope.modField.cols;
					}
					if ($scope.modField.size === $scope.modForm.buildObject.fieldSize) {
						delete $scope.modField.size;
					}
					if ($scope.modField.size === lth.bootstrap.inputSizing.getDefault().id && !$scope.modForm.buildObject.fieldSize) {
						delete $scope.modField.size;
					}
					if ($scope.modField.nsize === lth.hsize.getDefault().id) {
						delete $scope.modField.nsize;
					}
					if (lth.isStringNullOrEmpty($scope.modField.placeholder)) {
						delete $scope.modField.placeholder;
					}
					var newForm: IW.IWidgetFormObject = angular.copy($scope.modForm);
					$uibModalInstance.close(newForm);
				};

				$scope.cancelClick = () => {
					$uibModalInstance.dismiss();
				};
			}];

			var modalInstance = $uibModal.open({
				// templateUrl: templateUrl
				// templateUrl: '/template.html?t=' + new Date().getTime()
				templateUrl: 'template/modal/editField.html'
				, controller: modalCtrl
				, size: settings.modalSize
				, resolve: {
					instanceOptions: () => { return settings.instanceOptions }
				}
			});

			modalInstance.result.then((result) => {
				// window.console && console.log('modal save result', result);
				settings.saveForm(result);
			}, (error) => {
				// window.console && console.log('modal close');
			});
		};
		/**
		 * Displays spinner in modal screen while data is processed
		 *
		 * @param  {array of objects} optionsArray		// An array of objects. See below for example of object
			{
				httpOptions: {
					// This object should contain what you wish to pass to the angular $http() service.
				},
				onSuccessFunction:  function (result) {
					// Optional: code you wish to perform after success of the $http() service.
				},
				onErrorFunction: function (error) {
					// Optional: code you wish to perform after error of the $http() service.
				}
			}
		 * @param  {object} staticOptions				// [Optional] Object that contains final instructions after all data processing. See below
			{
				modalCloseDelay: 200		// number of milliseconds to delay modal close
				finalFunction: function() {
					// [Optional] code you wish to perform after ALL the $http() services have been completed successfully.
				}
			}
		 * @return {none}								// no return type
		 */
		widgetMethods.dataProcessingModal = function (optionsArray, staticOptions) {
			if (!$.isArray(optionsArray)) {
				optionsArray = [optionsArray];
			}
			var settings = { modalCloseDelay: 200 };
			angular.extend(settings, staticOptions);

			var _thisController = ['$scope', '$uibModalInstance', '$http', '$timeout', 'httpOptionsArray', function ($scope, $uibModalInstance, $http, $timeout, httpOptionsArray) {
				var index = 0;
				var arrLength = httpOptionsArray.length;

				var httpProcess = function (index) {

					$http(httpOptionsArray[index].httpOptions).then(function (result) {
						//Calls success function if it exists
						httpOptionsArray[index].onSuccessFunction && httpOptionsArray[index].onSuccessFunction(result);

						//Calls this function again if current index is less than the array length
						index++;
						if (index < arrLength) {
							httpProcess(index);
						} else {
							//closes modal after final loop
							$timeout(function () {
								//Calls a final function after closing
								staticOptions && staticOptions.finalFunction && staticOptions.finalFunction();

								$uibModalInstance.close(result);
							},settings.modalCloseDelay);
						}
					}, function (error) {
						$timeout(function () {
							httpOptionsArray[index].onErrorFunction && httpOptionsArray[index].onErrorFunction(error);
							$uibModalInstance.dismiss(error);
						},settings.modalCloseDelay);
					});
				};
				httpProcess(index);
			}];
			var modalInstance = $uibModal.open({
				animation: true,
				windowTemplateUrl: 'template/modal-template/empty.html',
				templateUrl: 'template/modal/spinner.html',
				controller: _thisController,
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					httpOptionsArray: function () { return optionsArray; }
				}
			});
		};
		/**
		 * Displays an information window with only an OK button
		 *
		 * @param  {object} okInfo						// Pass object to control the modal
		 {
			okOptions: {
				okTitle: ''								// [text only allowed], default: $rootScope.strings.heading_ok_modal_title
				, okMessage: ''							// [text or html allowed], default: '_'
				, okStyle: 'alert alert-warning'		// options: ['alert alert-success' | 'alert alert-info' | 'alert alert-warning' | 'alert alert-danger'], default 'alert alert-warning'
				, okButtonText: 'OK'					// [text only], default: $rootScope.strings.button_ok
			},
			onOk: function() {
				// code to perform on close of okModal
			}
		 }
		 * @return {none}							// no return type
		 */
		widgetMethods.okModal = function (okInfo) {
			var okInfoDefaults = { okModelSize: 'sm'};
			var okInfoSettings = angular.extend(okInfoDefaults, okInfo);

			var _thisController = ['$scope', '$uibModalInstance', 'okOptions', function ($scope, $uibModalInstance, okOptions) {
				var okOptdefaults = {
					okMessage: '_'
					, okTitle: 'Notice:'
					, okStyle: 'alert alert-warning'
					, okButtonText: 'Ok'
				};
				$scope.settings = angular.extend(okOptdefaults,okOptions);

				$scope.okClick = function () {
					$uibModalInstance.close();
				};
			}];
			var modelInstance = $uibModal.open({
				templateUrl: 'template/modal/ok.html',
				controller: _thisController,
				size: okInfoSettings.okModelSize,
				resolve: {
					okOptions: function () { return okInfo.okOptions; }
				}
			});
			modelInstance.result.then(function (result) {
				okInfo.onOk();
			}, function (error) {
				okInfo.onOk();
			});
		};
		/**
		 * Confirm Modal: Based off the Angular UI Bootstrap modal (http://angular-ui.github.io/bootstrap/#/modal)
		 * Allows the creation of a popup modal to make a confirmation similar to window.confirm()
		 * @param  {object} confirmInfo [the following object is an example of what can be passed for confirmInfo]
		 	{
				confirmSize: 'sm',									// options: ['sm' | 'md' | 'lg'], default: 'sm'
				backdrop: true,										// options: [true | false | 'static'], default: true		('static' - backdrop is present but modal window is not closed when clicking outside of the modal window)
				confirmOptions: {
					message: '',									// [text or html allowed], default: ''
					title: 'Confirm:',								// [text only allowed], default: 'Conform:'
					headerStyle: 'alert alert-warning',				// options: ['alert alert-success' | 'alert alert-info' | 'alert alert-warning' | 'alert alert-danger'], default 'alert alert-warning'
					okBtnText: 'OK',								// [text only], default: 'OK'
					cancelBtnText: 'Cancel'							// [text only], default: 'Cancel'
				},
				onConfirm: function () {
					// code to perform on Confirm
				},
				onCancel: function () {
					// code to perform on Cancel
				}
			}
		 *
		 * @return {none}             no return type
		 */
		widgetMethods.confirmModal = function(confirmInfo) {
			window.console && console.log(confirmInfo);
			var settings = { confirmSize: 'sm', backdrop: true, onConfirm: null, onCancel: null };
			angular.extend(settings, confirmInfo);

			var _thisController = ['$scope', '$uibModalInstance', 'confirmOptions', function($scope, $uibModalInstance, confirmOptions) {
				var confirmOptDefaults = { message: '', title: 'Confirm:', headerStyle: 'alert alert-warning', okBtnText: 'OK', cancelBtnText: 'Cancel' };
				$scope.mdlSettings = angular.extend(confirmOptDefaults, confirmOptions)
				$scope.okClick = function() {
					$uibModalInstance.close();
				};
				$scope.cancelClick = function() {
					$uibModalInstance.dismiss();
				};
			}];
			var modalInstance = $uibModal.open({
				// templateUrl: '/IgcConstruction/Home/AngularTemplates/confirmModal',
				templateUrl: 'template/modal/confirm.html',
				controller: _thisController,
				size: settings.confirmSize,
				backdrop: settings.backdrop,
				resolve: {
					confirmOptions: function() { return confirmInfo.confirmOptions }
				}
			});

			modalInstance.result.then(function() {
				settings.onConfirm();
			}, function() {
				settings.onCancel();
			});
		};
		return widgetMethods;
	}]);
})();
