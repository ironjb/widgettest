/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

interface IWidgetModelData {
	WidgetType: string;
	Id?: number;
}

interface IWidget {
	allAvailableFieldsObject?: Object;
	allAvailableFieldsArray: IWidgetAvailableField[];
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

interface IWidgetEditFieldData {
	widgetTypeLower?: string;
	currentForm?: IWidgetFormObject;
	clearSelectedForm?(): void;
	buildScript?(widgetFormObject: IWidgetFormObject): void;
}

interface IWidgetBuilderNgScope extends ng.IScope {
	currentForm?: IWidgetFormObject;
	UsePrebuiltForm?(): void;
	UpdateWidgetDisplay?(): void;
	WidgetScriptBuild?(widgetFormObject: IWidgetFormObject): void;
	ClearSelectedForm?(): void;
	isAvailableFieldShown?(fieldId: string): boolean;
	addField?(fieldId: string): void;
	selectedForm?: IWidgetFormObject;
	widgetObject?: IWidget;
	widgetScript?: string;
	// WidgetType?: string;
	widgetScriptDisplay?: string;
	scriptChangedClass?: string;
	editFieldData?: IWidgetEditFieldData;
	allAvailableFieldsObject?: Object;
	allAvailableFieldsArray?: IWidgetAvailableField[];
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);

namespace LoanTekWidget {
	export class WidgetBuilder {

		constructor($: JQueryStatic, widgetData: IWidgetModelData) {
			var _thisC = this;
			var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
			var el = lth.CreateElement();

			$('input textarea').placeholder();

			var widgetObj: IWidget = { allAvailableFieldsObject:null, allAvailableFieldsArray: null, prebuiltForms: null };

			if (widgetData.WidgetType.toLowerCase() === 'quotewidget') {
				// TODO: code for quote widget
			} else if (widgetData.WidgetType.toLowerCase() === 'ratewidget') {
				// TODO: code for rate widget
			} else {
				widgetObj.allAvailableFieldsObject = lth.contactFields;
				widgetObj.allAvailableFieldsArray = lth.contactFieldsArray;
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
								, { field: 'comments' }
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
			var widgetBuilderApp = angular.module('WidgetBuilderApp', ['ui.bootstrap', 'colorpicker.module', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);

			// Angular Widget Controller
			widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', function($scope: IWidgetBuilderNgScope, $timeout) {
				// window.console && console.log('widgetData: ', widgetData);
				// window.console && console.log('formBorderTypeArray', lth.contactFieldsArray);
				var wwwRoot = window.location.port === '8080' || window.location.port === '58477' ? '' : '//clients.loantek.com';
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
					var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function() {
						var body = $('body')[0];
						var script = el.script().html(scriptHelpersCode)[0];
						body.appendChild(script);
						$scope.UpdateWidgetDisplay();
					});

					loadScripts.run();
				};
				// $scope.WidgetType = widgetData.WidgetType.toLowerCase();
				$scope.allAvailableFieldsObject = angular.copy(widgetObj.allAvailableFieldsObject);
				$scope.allAvailableFieldsArray = angular.copy(widgetObj.allAvailableFieldsArray);

				$scope.WidgetScriptBuild = WidgetScriptBuild;
				$scope.UsePrebuiltForm = UsePrebuildForm;
				$scope.ClearSelectedForm = ClearSelectedForm;
				$scope.addField = addField;
				$scope.isAvailableFieldShown = isAvailableFieldShown;
				BuilderInit();

				function addField(fieldId: string) {
					// window.console && console.log('fieldId', fieldId, $scope.allAvailableFieldsObject[fieldId]);
					var fieldToAdd = { field: $scope.allAvailableFieldsObject[fieldId].id };
					// window.console && console.log(fieldToAdd);
					// var newForm: IWidgetFormObject = angular.copy($scope.currentForm);
					// window.console && console.log('newForm.buildObject.fields', newForm.buildObject.fields);
					// newForm.buildObject.fields.push(fieldToAdd);
					// window.console && console.log('newForm.buildObject.fields', newForm.buildObject.fields);
					// // window.console && console.log(newForm);
					// $scope.currentForm = angular.copy(newForm);
					$scope.currentForm.buildObject.fields.push(fieldToAdd);
					$scope.WidgetScriptBuild($scope.currentForm);
				}

				function isAvailableFieldShown(fieldId: string): boolean {
					return !$scope.allAvailableFieldsObject[fieldId].hideFromList;
				}

				function UsePrebuildForm() {
					$scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];		// selects first template if not selected already
					$scope.currentForm = angular.copy($scope.selectedForm);
					$scope.WidgetScriptBuild($scope.currentForm);
				}

				function BuilderInit() {
					$scope.widgetObject = angular.copy(widgetObj);
					$scope.UsePrebuiltForm();
				}

				function ClearSelectedForm() {
					$scope.selectedForm = { name: 'modified' };
				}

				function WidgetScriptBuild(currentFormObj: IWidgetFormObject) {
					$scope.editFieldData = {
						widgetTypeLower: widgetData.WidgetType.toLowerCase()
						, currentForm: $scope.currentForm
						, clearSelectedForm: $scope.ClearSelectedForm
						, buildScript: $scope.WidgetScriptBuild
					};
					window.console && console.log('in widgetscriptbuild', currentFormObj);
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
							// lth.ScrollToAnchor('widgetTop');
							$scope.scriptChangedClass = 't' + new Date().getTime();
						});
					};

					scriptLoader();

					// Redifine 'scriptLoader' after it places needed script tags on page
					scriptLoader = function() {
						// window.console && console.log('loadScripts now ONLY loads updated scripts');
						$scope.UpdateWidgetDisplay();
					};
				}
			}]);
		}
	}
}
