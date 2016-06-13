/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetEditFormNgScope extends ng.IScope {
	modForm: IWidgetFormObject;
	showBorderRadius: boolean;
	previewStyles: string;
	fieldSizeClass: string;
	buttonSizeClass: string;
	borderTypeArray: Object[];
	modelOptions: Object;
	borderType: Object;
	formWidthUnits: Object;
	fieldSizeUnits: Object;
	changeFormWidthUnit($event: any, unit: any): void;
	borderTypeChange(): void;
	fieldSizeChange(): void;
	saveClick(): void;
	cancelClick(): void;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function() {
	var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
	var ltWidgetServices = angular.module('ltw.services', ['ngSanitize']);
	ltWidgetServices.factory('widgetServices', ['$uibModal', ($uibModal) => {
		var widgetMethods = {
			editForm: (options) => {
				var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
				angular.extend(settings, options);

				var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', ($scope: IWidgetEditFormNgScope, $uibModalInstance, intanceOptions) => {

					$scope.modForm = angular.copy(intanceOptions.currentForm);
					$scope.borderTypeArray = angular.copy(lth.formBorderTypeArray);
					$scope.borderType = angular.copy(lth.formBorderType);
					$scope.formWidthUnits = angular.copy(lth.widthUnit);
					$scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
					$scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };

					$scope.changeFormWidthUnit = ($event, unit) => {
						$event.preventDefault();
						$scope.modForm.formWidthUnit = unit.id;
						// window.console && console.log(unit, $scope.modForm.formWidthUnit);
					};

					$scope.borderTypeChange = () => {
						if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
							$scope.showBorderRadius = false;
						} else {
							$scope.showBorderRadius = true;
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
						, 'modForm.formBorderRadius'
						, 'modForm.formGroupSpacing'
						, 'modForm.formFieldBorderRadius'
						, 'modForm.formButtonBorderRadius'
					];

					$scope.$watchGroup(watchGroups, (newValue, oldValue) => {
						var applyFormStyles: LoanTekWidget.ApplyFormStyles = new LoanTekWidget.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
						var previewStyles: string = applyFormStyles.getStyles();

						// Style Overrides
						if (!lth.isNumber($scope.modForm.formBorderRadius)) {
							// window.console && console.log('border rad is null so needs to apply default border rad', $scope.modForm.formBorderRadius);
							// previewStyles += applyFormStyles.formBorderRadius(lth.defaultBorderRadius);
						}

						$scope.previewStyles = previewStyles;
					});

					$scope.saveClick = () => {
						var newForm: IWidgetFormObject = angular.copy($scope.modForm);
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

						if (!newForm.buildObject.formBorderType || newForm.buildObject.formBorderType === lth.formBorderType.none.id) {
							delete newForm.buildObject.formBorderType;
							delete newForm.formTitleBgColor;
							delete newForm.formBorderRadius;
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
			},
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
			confirmModal: function(confirmInfo) {
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
					templateUrl: 'template/widget/confirmModal.html',
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
			}
		};
		return widgetMethods;
	}]);
})();
