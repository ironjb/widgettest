/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetModelData {
	WidgetType: string;
	Id?: number;
}

interface IWidget {
	allAvailableFields: IWidgetAvailableField[];
	prebuiltForms?: IWidgetFormObject[];
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

interface IWidgetBuilderNgScope extends ng.IScope {
	currentForm?: IWidgetFormObject;
	UsePrebuiltForm?(): void;
	UpdateWidgetDisplay?(): void;
	WidgetScriptBuild?(widgetFormObject: IWidgetFormObject): void;
	selectedForm?: IWidgetFormObject;
	widgetObject?: IWidget;
	widgetScript?: string;
	widgetScriptDisplay?: string;
	scriptChangedClass?: string;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);

namespace LoanTekWidget {
	export class WidgetBuilder {

		constructor($: JQueryStatic, widgetData: IWidgetModelData) {
			var _thisC = this;
			var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
			var el = lth.CreateElement();

			$('input textarea').placeholder();

			var widgetObj: IWidget = { allAvailableFields: null, prebuiltForms: null };

			if (widgetData.WidgetType.toLowerCase() === 'quotewidget') {
				// TODO: code for quote widget
			} else if (widgetData.WidgetType.toLowerCase() === 'ratewidget') {
				// TODO: code for rate widget
			} else {
				widgetObj.allAvailableFields = lth.contactFieldsArray;
				// TODO: 'prebuiltForms' should eventually get it's data from 'widgetData' that is passed in from the MVC Model.
				widgetObj.prebuiltForms = [
					{
						name: 'Default Contact Widget',
						// formFieldBorderRadius: 12,
						buildObject: {
							// fieldSize: ltm.bootstrap.inputSizing.sm,
							panelTitle: 'Contact Us',
							fields: [
								{ field: 'clientid' }
								, { field: 'userid' }
								// , { field: 'title', value: 'Contact Us', nsize: 5 }
								, { field: 'firstname', cols: 2 }
								, { field: 'lastname' }
								, { field: 'email' }
								, { field: 'phone' }
								, { field: 'company' }
								, { field: 'state' }
								, { field: 'comments' }
								, { field: 'paragraph', value: 'This is a paragraph<br />This is a paragraph' }
								// , { element: 'input', type: 'file' }
								, { field: 'captcha' }
								, { field: 'submit' }
							]
						}
					},
					{
						name: 'Small Contact Widget',
						formWidth: 380,
						formWidthUnit: 'px',
						formBg: '#def',
						formBorderRadius: 0,
						formBorderColor: '#08f',
						formTitleColor: '#ddf',
						formTitleBgColor: '#06d',
						formGroupSpacing: 4,
						formFieldBorderRadius: 0,
						formButtonBorderRadius: 0,
						buildObject: {
							// formBorderType: ltm.formBorderType.well.id,
							formBorderType: 'panel',
							panelTitle: 'Contact Us',
							fieldSize: 'sm',
							fields: [
								{ field: 'clientid' }
								, { field: 'userid' }
								, { field: 'firstname', cols: 12 }
								, { field: 'lastname', cols: 12 }
								, { field: 'email', cols: 12 }
								, { field: 'phone', cols: 12 }
								, { field: 'company', cols: 12 }
								, { field: 'state', cols: 12 }
								, { field: 'comments' }
								, { field: 'captcha' }
								, { field: 'submit' }
							]
						}
					}
				];
			}

			// Angular App
			var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);

			// Angular Widget Controller
			widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', function($scope: IWidgetBuilderNgScope, $timeout) {
				// window.console && console.log('widgetData: ', widgetData);
				// window.console && console.log('formBorderTypeArray', lth.contactFieldsArray);
				var wwwRoot = window.location.port === '8080' ? '' : '//www.loantek.com';
				var ltWidgetCSS: string[] = [
					'/css/widget.css'
				];
				var scriptsLocation = '/js/';
				var widgetScripts: string[] = [
					scriptsLocation + 'lib/jquery-1/jquery.min.js'
					, scriptsLocation + 'lib/jquery/jquery.placeholder.min.js'
					, scriptsLocation + 'common/lt-captcha.js'
					, scriptsLocation + 'common/widget-helpers.js'
					, scriptsLocation + 'widget/widget.js'
				];
				var scriptHelpersCode = `
					/*window.console && console.log('jquery no conflict', jQuery.fn.jquery, jQuery);*/
					var ltjq = ltjq || jQuery.noConflict(true);
					var lthlpr = new LoanTekWidget.helpers(ltjq);`;

				var scriptLoader = function() {
					// var body = document.getElementsByTagName('body')[0];
					// for (var i = 0, l = widgetScripts.length; i < l; i++) {
					// 	var scriptSrc = widgetScripts[i];
					// 	// var script = document.createElement('script');
					// 	// script.type = 'text/javascript';
					// 	// script.src = wwwRoot + scriptSrc;
					// 	var script = el.script(wwwRoot + scriptSrc)[0];
					// 	body.appendChild(script);
					// }
					// var scriptHelpers = el.script().html(scriptHelpersCode)[0];
					// body.appendChild(scriptHelpers);
					// function scriptLoader() {
					// 	window.console && console.log('scripts should already be loaded');
					// }

					// var body = document.getElementsByTagName('body')[0];
					// var currentIndex = 0;
					// var lastIndex = widgetScripts.length - 1;
					// function loadScript(i) {
					// 	window.console && console.log('\n\n\ncurrent index is: ', currentIndex);
					// 	var scriptSrc = widgetScripts[i];
					// 	var script = el.script(wwwRoot + scriptSrc)[0];
					// 	script.onload = function() {
					// 		window.console && console.log('script loaded: ', script);
					// 		if (currentIndex < lastIndex) {
					// 			currentIndex += 1;
					// 			// setTimeout(function() {
					// 				window.console && console.log('going to load next script of index: ', currentIndex);
					// 				loadScript(currentIndex);
					// 			// }, 4000);
					// 		} else {
					// 			window.console && console.log('not looping now. lastIndex is: ', lastIndex, currentIndex);
					// 			window.console && console.log('this is where you would put callback');
					// 		}
					// 	};
					// 	window.console && console.log('appended to body: ', script);
					// 	body.appendChild(script);
					// }
					// loadScript(currentIndex);

					var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function() {
						var body = $('body')[0];
						var script = el.script().html(scriptHelpersCode)[0];
						body.appendChild(script);
						$scope.UpdateWidgetDisplay();
					});

					// loadScripts.addSrc('test.js');

					// window.console && console.log('pre run loadScripts run to load ALL needed widget scripts', this);
					loadScripts.run();
					// window.console && console.log('loadScripts run to load ALL needed widget scripts', this);
				};
				$scope.WidgetScriptBuild = WidgetScriptBuild;
				$scope.UsePrebuiltForm = UsePrebuildForm;
				BuilderInit();

				function UsePrebuildForm() {
					$scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];		// selects first template if not selected already
					$scope.currentForm = angular.copy($scope.selectedForm);
					$scope.WidgetScriptBuild($scope.currentForm);
				}

				function BuilderInit() {
					$scope.widgetObject = angular.copy(widgetObj);
					$scope.UsePrebuiltForm();
				}


				function WidgetScriptBuild(currentFormObj: IWidgetFormObject) {
					var cfo: IWidgetFormObject = angular.copy(currentFormObj);
					var cbo: IWidgetFormBuildObject = angular.copy(cfo.buildObject);
					var cbod: IWidgetFormBuildObject = angular.copy(cfo.buildObject);
					var wScript: string = '<style type="text/css">.ltw {display:none;}</style>';
					var wScriptDisplay: string = wScript;
					var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') >= 0;
					var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
					var formStyles = '';
					cbod.showBuilderTools = true;
					cbo.postDOMCallback = '#fn{postDOMFunctions}';
					cbod.postDOMCallback = '#fn{postDOMFunctions}';

					// Add CSS files
					for (var iCss = 0, lCss = ltWidgetCSS.length; iCss < lCss; iCss++) {
						var cssHref = ltWidgetCSS[iCss];
						var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
						wScript += cssLink;
						wScriptDisplay += cssLink;
					}

					// Add styles
					var styleWrap = '\n<style type="text/css">#{styles}\n</style>';
					formStyles = new ApplyFormStyles(cfo, !hasCaptchaField).getStyles();
					if (formStyles) {
						wScript += lth.Interpolate(styleWrap, { styles: formStyles });
						wScriptDisplay += lth.Interpolate(styleWrap, { styles: formStyles });
					}

					// Add Widget Wrapper
					var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
					wScript += widgetWrapper;
					wScriptDisplay += widgetWrapper;

					// Add scripts
					for (var iScript = 0, lScript = widgetScripts.length; iScript < lScript; iScript++) {
						var scriptSrc = widgetScripts[iScript];
						// window.console && console.log('scriptSrc', scriptSrc);
						var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
						wScript += scriptLink;

						// DO NOT ADD to wScriptDisplay, it will cause a "Synchronous XMLHttpRequest..." error
						// Instead, each of these scripts should be added already to the builder page.
						// wScriptDisplay += scriptLink;
					}

					// var sTest = el.script();
					// window.console && console.log('stest', sTest);

					// Build Main Script
					var mainScript = '';
					var mainScriptDisplay = '';

					// Add jQuery and LoanTek Widget Helpers
					mainScript += scriptHelpersCode;
					// mainScriptDisplay += scriptHelpersCode;

					// Captcha var
					var captchaVar = `
						var ltCap;`;
					if (hasCaptchaField) {
						mainScript += captchaVar;
						mainScriptDisplay += captchaVar;
					}

					// PostDOMFunctions
					var postDomCode = '/*code ran after DOM created*/', postDomFn = `
						var pdfun = function () {
							#{code}
						};`;
					if (hasCaptchaField) {
						postDomCode += `
							ltCap = new LoanTekCaptcha(ltjq);`;
					}
					mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
					mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });

					// External Validator
					var extValid = `
						var ev = function () {
							#{validReturn}
						};`;
					if (hasCaptchaField) {
						extValid = lth.Interpolate(extValid, { validReturn: 'return ltCap.IsValidEntry();' });
					} else {
						extValid = lth.Interpolate(extValid, { validReturn: 'return true;' });
					}
					mainScript += extValid;
					mainScriptDisplay += extValid;

					// Add buildObject to mainScript
					var buildObjectWrap = `
						var ltwbo = #{bow};`;
					var cboString = JSON.stringify(cbo/*, null, 2*/);
					var cbodString = JSON.stringify(cbod/*, null, 2*/);
					mainScript += lth.Interpolate(buildObjectWrap, { bow: cboString });
					mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cbodString });

					// Widget Options Object setup
					var ltWidgetOptions = {
						// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
						postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
						// redirectUrl: 'http://www.google.com',
						externalValidatorFunction: '#fn{externalValidators}',
						successMessage: 'Yay!!! Successful POST'
					};

					var ltWidgetOptionsWrap = `
						var ltwo = #{cwow};`;
					mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });
					mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });

					// Add Execution of Widget
					var contactWidget = `
						var ltwfb = new LoanTekWidget.FormBuild(ltjq, lthlpr, ltwbo, ltwo);`;
					mainScript += contactWidget;
					mainScriptDisplay += contactWidget;

					mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
					mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);

					// Wrap Main Script
					var mainScriptWrap = `
						<script type="text/javascript">
						(function () {#{m}
						})();
						</script>`;
					mainScript = lth.Interpolate(mainScriptWrap, { m: mainScript });
					mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });

					// Add Main Script to rest of code
					wScript += mainScript;
					wScriptDisplay += mainScriptDisplay;
					wScript = wScript.replace(/\s+/gm, ' ');

					// Updates the page display and Script textbox
					$scope.UpdateWidgetDisplay = function() {
						// window.console && console.log('updateSCripts');
						$timeout(function() {
							$scope.widgetScript = wScript;
							$scope.widgetScriptDisplay = wScriptDisplay;

							// Scroll to top and indicate change
							lth.ScrollToAnchor('widgetTop');
							$scope.scriptChangedClass = 't' + new Date().getTime();
						});
					};

					scriptLoader();

					// Redifine 'scriptLoader' after it places needed script tags on page
					scriptLoader = function() {
						// window.console && console.log('loadScripts now ONLY loads updated scripts');
						$scope.UpdateWidgetDisplay();
					};

					// $scope.UpdateWidgetScripts();
				}
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

