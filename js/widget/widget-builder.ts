/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetModelData {
	WidgetType: string;
	Id?: number;
}

interface IWidgetFormObject {
	name: string;
	formWidth?: number;
	formWidthUnit?: string;
	formBg?: string;
	formBorderRadius?: number;
	formBorderColor?: string;
	formTitleColor?: string;
	formTitleBgColor?: string;
	formGroupSpacing?: number;
	formFieldBorderRadius?: number;
	formButtonBorderRadius?: number;
	buildObject?: IWidgetFormBuildObject;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);

namespace LoanTekWidget {
	export class WidgetBuilder {

		constructor($: JQueryStatic, widgetData: IWidgetModelData) {
			var _thisC = this;
			var lth = LoanTekWidgetHelper;
			var el = lth.CreateElement();
			var wwwRoot = window.location.port === '8080' ? '' : '//www.loantek.com';
			var ltWidgetCSS: string[] = [
				'/css/widget.css'
			];
			var scriptLibLocation = '/js/lib/';
			var widgetScripts: string[] = [
				scriptLibLocation + 'jquery.min.js'
				, scriptLibLocation + 'jquery.placeholder.min.js'
				, '/js/widget/widget.js'
			];

			$('input textarea').placeholder();

			// Angular App
			var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);

			// Angular Widget Controller
			widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function($scope) {
				window.console && console.log('widgetData: ', widgetData);
			}]);
		}
	}
	// var wbuilder = new WidgetBuilder(jQuery);
}

namespace LoanTekWidget {
	// export class ApplyFormStyles {
	// 	private _returnStyles: string;
	// 	private _specifier: string;
	// 	private _borderType: string;
	// 	private _lth: LoanTekWidget.helpers;

	// 	constructor(currentFormObject: IWidgetFormObject, excludeCaptchaField?: boolean, specifier?: string) {
	// 		var _thisC = this;
	// 		var lth = LoanTekWidgetHelper;
	// 		specifier = specifier || '';
	// 		_thisC._specifier = specifier;
	// 		_thisC._borderType = currentFormObject.buildObject.formBorderType;
	// 		excludeCaptchaField = excludeCaptchaField || true;
	// 		var returnStyles = '';

	// 		if (currentFormObject.formWidth) {
	// 			currentFormObject.formWidthUnit = currentFormObject.formWidthUnit || lth.defaultFormWidthUnit.id;
	// 			returnStyles += '\n' + specifier + '.ltw  { width: ' + currentFormObject.formWidth + currentFormObject.formWidthUnit + '; }';
	// 		}

	// 		if (currentFormObject.formBg) {
	// 			returnStyles += '\n' + specifier + '.ltw  .lt-widget-border { background-color: ' + currentFormObject.formBg + '; }';
	// 		}

	// 		if (lth.isNumber(currentFormObject.formBorderRadius)) {
	// 			returnStyles += _thisC.formBorderRadius(currentFormObject.formBorderRadius, _thisC._borderType);
	// 		}

	// 		if (currentFormObject.formBorderColor) {
	// 			returnStyles += '\n' + specifier + '.ltw  .lt-widget-border, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading { border-color: ' + currentFormObject.formBorderColor + '; }';
	// 		}

	// 		if (currentFormObject.formTitleColor) {
	// 			returnStyles += '\n' + specifier + '.ltw  .lt-widget-heading, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading  { color: ' + currentFormObject.formTitleColor + '; }';
	// 		}

	// 		if (currentFormObject.formTitleBgColor) {
	// 			returnStyles += '\n' + specifier + '.ltw  .lt-widget-heading, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading  { background-color: ' + currentFormObject.formTitleBgColor + '; }';
	// 		}

	// 		if (lth.isNumber(currentFormObject.formGroupSpacing)) {
	// 			returnStyles += '\n' + specifier + '.ltw  .form-group, ' + specifier + '.ltw  .alert { margin-bottom: ' + currentFormObject.formGroupSpacing + 'px; }';
	// 		}

	// 		if (lth.isNumber(currentFormObject.formFieldBorderRadius)) {
	// 			var ffbr = currentFormObject.formFieldBorderRadius + '';
	// 			var ffbhr = currentFormObject.formFieldBorderRadius - 1 < 0 ? '0' : (currentFormObject.formFieldBorderRadius - 1) + '';
	// 			returnStyles += '\n' + specifier + '.ltw  .form-group .form-control, ' + specifier + '.ltw  .alert { border-radius: ' + ffbr + 'px; }';
	// 			if (!excludeCaptchaField) {
	// 				returnStyles += '\n' + specifier + '.ltw  .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
	// 				returnStyles += '\n' + specifier + '.ltw  .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
	// 			}
	// 		}

	// 		if (lth.isNumber(currentFormObject.formButtonBorderRadius)) {
	// 			returnStyles += '\n' + specifier + '.ltw  .btn { border-radius: ' + currentFormObject.formButtonBorderRadius + 'px; }';
	// 		}
	// 		_thisC._returnStyles = returnStyles;
	// 		// return returnStyles;
	// 	}

	// 	getStyles(): string {
	// 		return this._returnStyles;
	// 	}

	// 	formBorderRadius(borderRadius: number, borderType?: string, specifier?: string): string {
	// 		var _thisM = this;
	// 		var br = '';
	// 		var fbr = borderRadius + '';
	// 		var fbhr = borderRadius - 1 < 0 ? '0' : (borderRadius - 1) + '';
	// 		specifier = specifier || _thisM._specifier;
	// 		borderType = borderType || _thisM._borderType;
	// 		br += '\n' + specifier + '.ltw  .lt-widget-border { border-radius: ' + fbr + 'px; }';
	// 		if (borderType === _thisM._lth.formBorderType.panel.id) {
	// 			br += '\n' + specifier + '.ltw  .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
	// 		}
	// 		return br;
	// 	}
	// }

	// export class WidgetBuilderServices {
	// 	constructor(ng: angular.IAngularStatic, lth: LoanTekWidget.helpers) {
	// 		var ltWidgetServices = ng.module('ltw.services', []);
	// 		ltWidgetServices.factory('widgetServices', ['$uibModal', ($uibModal) => {
	// 			var widgetMethods = {
	// 				editForm: (/*currentForm: IWidgetObject, */options) => {
	// 					// window.console && console.log('service editForm currentForm: ', currentForm);
	// 					var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
	// 					angular.extend(settings, options);
	// 					// window.console && console.log('settings', settings);

	// 					var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', ($scope, $uibModalInstance, intanceOptions) => {

	// 						$scope.modForm = angular.copy(intanceOptions.currentForm);
	// 						$scope.borderTypeArray = angular.copy(lth.formBorderTypeArray);
	// 						$scope.borderType = angular.copy(lth.formBorderType);
	// 						$scope.formWidthUnits = angular.copy(lth.widthUnit);
	// 						$scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
	// 						// window.console && console.log('$scope.borderTypeArray', $scope.borderTypeArray);
	// 						// $scope.borderTypeArray.push({ id: '', name: 'None' });

	// 						$scope.changeFormWidthUnit = ($event, unit) => {
	// 							$event.preventDefault();
	// 							$scope.modForm.formWidthUnit = unit.id;
	// 							window.console && console.log(unit, $scope.modForm.formWidthUnit);
	// 						};

	// 						$scope.borderTypeChange = () => {
	// 							// window.console && console.log('change: ', $scope.modForm.buildObject.formBorderType);
	// 							if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
	// 								$scope.showBorderRadius = false;
	// 							} else {
	// 								$scope.showBorderRadius = true;
	// 							}
	// 						};

	// 						if (!$scope.modForm.formWidthUnit) {
	// 							$scope.modForm.formWidthUnit = lth.defaultFormWidthUnit.id;
	// 						}

	// 						if (!$scope.modForm.buildObject.formBorderType) {
	// 							$scope.modForm.buildObject.formBorderType = lth.formBorderType.none.id;
	// 						}
	// 						$scope.borderTypeChange();

	// 						var watchGroups = [
	// 							'modForm.buildObject.formBorderType'
	// 							, 'modForm.formBorderRadius'
	// 						];

	// 						$scope.$watchGroup(watchGroups, (newValue, oldValue) => {
	// 							var applyFormStyles: ApplyFormStyles = new ApplyFormStyles($scope.modForm, true, '.ltw-preview');
	// 							var previewStyles: string = applyFormStyles.getStyles();
	// 							// window.console && console.log('old/new', oldValue, newValue);
	// 							// window.console && console.log('previewStyles', previewStyles);
	// 							// var s2 = newValue;
	// 							// window.console && console.log('watching: ', s2, oldValue);

	// 							// Style Overrides
	// 							if (!lth.isNumber($scope.modForm.formBorderRadius)/*isNaN($scope.modForm.formBorderRadius) || $scope.modForm.formBorderRadius === null*/) {
	// 								window.console && console.log('border rad is null so needs to apply default border rad', $scope.modForm.formBorderRadius);
	// 								previewStyles += applyFormStyles.formBorderRadius(lth.defaultBorderRadius);
	// 							}

	// 							$scope.previewStyles = previewStyles;
	// 						});

	// 						$scope.saveClick = () => {
	// 							var newForm: IWidgetFormObject = angular.copy($scope.modForm);
	// 							newForm.name = 'modified';
	// 							// lth.hn.h2

	// 							window.console && console.log('newForm.formBorderRadius', newForm.formBorderRadius);
	// 							if (!lth.isNumber(newForm.formBorderRadius)/*isNaN(newForm.formBorderRadius) || newForm.formBorderRadius === null*/) {
	// 								// window.console && console.log('remove formBorderRadius');
	// 								delete newForm.formBorderRadius;
	// 							}

	// 							if (lth.isStringNullOrEmpty(newForm.buildObject.panelTitle)) {
	// 								delete newForm.buildObject.panelTitle;
	// 								delete newForm.formTitleColor;
	// 								delete newForm.formTitleBgColor;
	// 							}

	// 							if (!newForm.formWidth) {
	// 								delete newForm.formWidth;
	// 								delete newForm.formWidthUnit;
	// 							}

	// 							if (newForm.formWidthUnit === lth.defaultFormWidthUnit.id) {
	// 								delete newForm.formWidthUnit;
	// 							}

	// 							if (!newForm.buildObject.formBorderType || newForm.buildObject.formBorderType === lth.formBorderType.none.id) {
	// 								delete newForm.buildObject.formBorderType;
	// 								delete newForm.formTitleBgColor;
	// 								delete newForm.formBorderRadius;
	// 							}
	// 							// intanceOptions.saveForm(newForm);
	// 							// cWidget = angular.copy($scope.modForm);
	// 							// $scope.WidgetScriptBuild(cWidget);
	// 							$uibModalInstance.close(newForm);
	// 						};

	// 						$scope.cancelClick = () => {
	// 							$uibModalInstance.dismiss();
	// 						};
	// 					}];

	// 					var modalInstance = $uibModal.open({
	// 						// templateUrl: 'template/modal/editForm.html'
	// 						templateUrl: '/template.html?t=' + new Date().getTime()
	// 						, controller: modalCtrl
	// 						, size: settings.modalSize
	// 						, resolve: {
	// 							instanceOptions: () => { return settings.instanceOptions }
	// 						}
	// 					});

	// 					modalInstance.result.then((result) => {
	// 						// window.console && console.log('modal save result', result);
	// 						settings.saveForm(result);
	// 					}, (error) => {
	// 						// window.console && console.log('modal close');
	// 					});
	// 				}
	// 			};
	// 			return widgetMethods;
	// 		}]);
	// 	}
	// }
}

